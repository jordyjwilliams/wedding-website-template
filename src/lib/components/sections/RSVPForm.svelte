<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Spinner } from '$lib/components/ui/spinner';
  import * as Alert from '$lib/components/ui/alert';
  import * as Select from '$lib/components/ui/select';
  import { SectionHeader, AnimatedSection } from '$lib/components';
  import Confetti from '$lib/components/Confetti.svelte';
  import { RSVP_LIMITS } from '$lib/constants';
  import { COPY } from '$lib/content';
  import ContactUs from '$lib/components/ContactUs.svelte';
  import {
    createYesNoOptions,
    getNormalizedGuestCount,
    getMissingRequiredWeekendField,
    isYesNoResponse,
    optionalYesNoToBoolean,
    parseGuestCount,
    RSVP_WEEKEND_TRIGGER_IDS,
    validatePhone,
    yesNoToBoolean,
  } from '$lib/rsvp/utils';
  import type {
    RsvpFormData,
    RsvpSubmitData,
    RsvpWeekendFieldKey,
    YesNoOption,
    YesNoResponse,
  } from '$lib/rsvp/types';

  const DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === 'true';
  type FormMessageType = 'success' | 'error' | '';
  const GUEST_COUNT_MIN = RSVP_LIMITS.guestCountMin;
  const GUEST_COUNT_MAX = RSVP_LIMITS.guestCountMax;

  let launchConfetti: () => void = $state(() => {});

  const attendanceOptions: YesNoOption[] = createYesNoOptions(COPY.rsvp.form.attending);

  const yesNoOptions: YesNoOption[] = createYesNoOptions(COPY.rsvp.form.common);

  const INITIAL_FORM_DATA: RsvpFormData = {
    attendance: undefined,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guestCount: '1',
    dietaryRestrictions: '',
    message: '',
    fridayEveningBbq: undefined,
    sundayRecoveryBreakfast: undefined,
    stayingOnSite: undefined,
  };

  let formData = $state<RsvpFormData>({ ...INITIAL_FORM_DATA });

  let isLoading = $state(false);
  let formMessage = $state('');
  let messageType = $state<FormMessageType>('');
  let phoneError = $state('');
  let attendanceError = $state('');
  let guestCountError = $state('');
  let additionalGuestNamesError = $state('');
  let successWasAttending = $state<boolean | null>(null);
  let additionalGuestNames = $state<string[]>([]);

  let showGuestCount = $derived(selectedAttendance === 'yes');
  // Max of 4 additional guests (5 total including the main guest)
  let additionalGuestCount = $derived(
    showGuestCount
      ? Math.max(
          0,
          getNormalizedGuestCount(formData.guestCount, GUEST_COUNT_MIN, GUEST_COUNT_MAX) - 1
        )
      : 0
  );

  let selectedAttendanceLabel = $derived(
    attendanceOptions.find((opt) => opt.value === selectedAttendance)?.label ||
      COPY.rsvp.form.attending.placeholder
  );

  $effect(() => {
    if (!showGuestCount) {
      additionalGuestNames = [];
      additionalGuestNamesError = '';
      return;
    }

    const targetCount = additionalGuestCount;
    if (additionalGuestNames.length === targetCount) return;

    additionalGuestNames = Array.from({ length: targetCount }, (_, index) => {
      return additionalGuestNames[index] || '';
    });
  });

  function getSuccessMessage(attendance: AttendanceResponse): string {
    return attendance === 'yes' ? COPY.rsvp.success.attending : COPY.rsvp.success.notAttending;
  }

  function updateAdditionalGuestName(index: number, value: string): void {
    additionalGuestNames[index] = value;
    additionalGuestNames = [...additionalGuestNames];

    if (value.trim() !== '') {
      additionalGuestNamesError = '';
    }
  }

  function handlePhoneInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (value && !validatePhone(value)) {
      phoneError = COPY.rsvp.form.phone.error;
    } else {
      phoneError = '';
    }
  }

  function handleGuestCountInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    formData.guestCount = target.value;
    guestCountError = '';
  }

  async function handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    if (!selectedAttendance) {
      attendanceError = COPY.rsvp.form.attending.errorRequired;
      document.getElementById('attendance-trigger')?.focus();
      return;
    }

    attendanceError = '';

    if (showGuestCount) {
      const guestCount = parseGuestCount(formData.guestCount);
      const isInvalidGuestCount =
        guestCount === null || guestCount < GUEST_COUNT_MIN || guestCount > GUEST_COUNT_MAX;

      if (isInvalidGuestCount) {
        guestCountError = `Please enter a guest count between ${GUEST_COUNT_MIN} and ${GUEST_COUNT_MAX}.`;
        document.getElementById('guestCount')?.focus();
        return;
      }
    }

    guestCountError = '';

    if (showGuestCount && additionalGuestCount > 0) {
      const missingGuestIndex = additionalGuestNames.findIndex((name) => name.trim() === '');
      if (missingGuestIndex >= 0) {
        additionalGuestNamesError = COPY.rsvp.form.guests.additionalNamesRequired;
        document.getElementById(`guest-name-${missingGuestIndex + 2}`)?.focus();
        return;
      }
    }

    additionalGuestNamesError = '';

    // Validate phone before submitting
    if (formData.phone && !validatePhone(formData.phone)) {
      phoneError = COPY.rsvp.form.phone.errorRequired;
      document.getElementById('phone')?.focus();
      return;
    }

    isLoading = true;
    formMessage = '';
    messageType = '';
    successWasAttending = null;

    // TODO: Create the actual script and test this functionality
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

    // Simulate network delay until we validate form.
    if (DEBUG_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Simulated network delay for debugging');
    }
    // Check if URL is configured
    if (!GOOGLE_SCRIPT_URL) {
      console.error('Google Script URL not configured');
      messageType = 'error';
      formMessage = `❌ ${COPY.rsvp.error.message}`;
      successWasAttending = null;
      isLoading = false;
      return;
    }

    const attendanceResponse = selectedAttendance;
    const normalizedGuestCount = getNormalizedGuestCount(
      formData.guestCount,
      GUEST_COUNT_MIN,
      GUEST_COUNT_MAX
    );
    const normalizedAdditionalGuestNames = additionalGuestNames
      .map((name) => name.trim())
      .filter(Boolean);

    const submitData: SubmitData = {
      ...formData,
      attendance: attendanceResponse,
      guestCount: attendanceResponse === 'yes' ? String(normalizedGuestCount) : '0',
      dietaryRestrictions: formData.dietaryRestrictions || 'None',
      message: formData.message || 'None',
      additionalGuestNames: attendanceResponse === 'yes' ? normalizedAdditionalGuestNames : [],
      timestamp: new Date().toISOString(),
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      // TODO: when this is linked up and tested - ensure `cors` mode is handled correctly.
      // It could be that we need to use `no-cors` here - Address when testing.
      // Unsure if Google Apps Script returns CORS headers for browser-origin requests.
      // Ensure we can get response status on submission etc. EG do we need to infer - or can we set this nicely.
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
        signal: controller.signal,
      });

      void response;

      // Success
      messageType = 'success';
      successWasAttending = attendanceResponse === 'yes';
      formMessage = getSuccessMessage(attendanceResponse);

      if (attendanceResponse === 'yes') {
        launchConfetti();
      }

      // Reset form
      formData = { ...INITIAL_FORM_DATA };
      selectedAttendance = undefined;
      attendanceError = '';
      guestCountError = '';
      additionalGuestNames = [];
      additionalGuestNamesError = '';

      // Scroll to message
      setTimeout(() => {
        document.querySelector('.form-message')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    } catch (error) {
      console.error('Error:', error);
      messageType = 'error';
      successWasAttending = null;

      if (error instanceof Error && error.name === 'AbortError') {
        formMessage = `❌ ${COPY.rsvp.error.timeout}`;
      } else {
        formMessage = `❌ ${COPY.rsvp.error.submitFailed}`;
      }
    } finally {
      clearTimeout(timeoutId);
      isLoading = false;
    }
  }
</script>

<Confetti onReady={(launch) => (launchConfetti = launch)} />

<AnimatedSection class="rsvp-section">
  <div class="container">
    <SectionHeader title={COPY.rsvp.title} emoji={COPY.rsvp.emoji} intro={COPY.rsvp.intro} />

    <div class="rsvp-container">
      <form onsubmit={handleSubmit} class="glass rsvp-form rounded-3xl p-12">
        <div class="form-row">
          <div class="form-group-wrapper">
            <Label for="firstName">{COPY.rsvp.form.name.firstNameLabel} *</Label>
            <Input
              type="text"
              id="firstName"
              bind:value={formData.firstName}
              required
              disabled={isLoading}
              placeholder={COPY.rsvp.form.name.firstNamePlaceholder}
            />
          </div>

          <div class="form-group-wrapper">
            <Label for="lastName">{COPY.rsvp.form.name.lastNameLabel} *</Label>
            <Input
              type="text"
              id="lastName"
              bind:value={formData.lastName}
              required
              disabled={isLoading}
              placeholder={COPY.rsvp.form.name.lastNamePlaceholder}
            />
          </div>
        </div>

        <div class="form-group-wrapper">
          <Label for="email">{COPY.rsvp.form.email.label} *</Label>
          <Input
            type="email"
            id="email"
            bind:value={formData.email}
            required
            disabled={isLoading}
            placeholder={COPY.rsvp.form.email.placeholder}
          />
        </div>

        <div class="form-group-wrapper">
          <Label for="phone">{COPY.rsvp.form.phone.label}</Label>
          <Input
            type="tel"
            id="phone"
            bind:value={formData.phone}
            oninput={handlePhoneInput}
            disabled={isLoading}
            placeholder={COPY.rsvp.form.phone.placeholder}
            class={phoneError ? 'border-destructive' : ''}
          />
          {#if phoneError}
            <p class="text-destructive mt-1 text-sm">{phoneError}</p>
          {/if}
        </div>

        <div class="form-group-wrapper">
          <Label for="attendance-trigger">{COPY.rsvp.form.attending.label} *</Label>
          <Select.Root
            type="single"
            value={selectedAttendance}
            onValueChange={(v) => {
              selectedAttendance = isAttendanceResponse(v) ? v : undefined;
              attendanceError = '';
            }}
            items={attendanceOptions}
          >
            <Select.Trigger
              id="attendance-trigger"
              class="w-full {attendanceError ? 'border-destructive' : ''}"
            >
              {selectedAttendanceLabel}
            </Select.Trigger>
            <Select.Content>
              {#each attendanceOptions as option (option.value)}
                <Select.Item value={option.value} label={option.label} />
              {/each}
            </Select.Content>
          </Select.Root>
          {#if attendanceError}
            <p class="text-destructive mt-1 text-sm">{attendanceError}</p>
          {/if}
        </div>

        {#if showGuestCount}
          <div class="form-group-wrapper guest-count-animate">
            <Label for="guestCount">{COPY.rsvp.form.guests.label} *</Label>
            <Input
              type="number"
              id="guestCount"
              value={formData.guestCount}
              oninput={handleGuestCountInput}
              min={GUEST_COUNT_MIN}
              max={GUEST_COUNT_MAX}
              required={showGuestCount}
              disabled={isLoading}
              placeholder="1"
              class={guestCountError ? 'border-destructive' : ''}
            />
            {#if guestCountError}
              <p class="text-destructive mt-1 text-sm">{guestCountError}</p>
            {/if}
          </div>
        {/if}

        {#if showGuestCount && additionalGuestCount > 0}
          <div class="form-group-wrapper guest-count-animate">
            <Label>{COPY.rsvp.form.guests.additionalNamesLabel} *</Label>
            <div class="mt-2 space-y-3">
              {#each additionalGuestNames as guestName, index (`guest-name-${index}`)}
                <Input
                  type="text"
                  id={`guest-name-${index + 2}`}
                  value={guestName}
                  required
                  disabled={isLoading}
                  oninput={(event) => {
                    const target = event.target as HTMLInputElement;
                    updateAdditionalGuestName(index, target.value);
                  }}
                  placeholder={`${COPY.rsvp.form.guests.additionalNamePlaceholderPrefix} ${index + 2} full name`}
                />
              {/each}
            </div>
            {#if additionalGuestNamesError}
              <p class="text-destructive mt-1 text-sm">{additionalGuestNamesError}</p>
            {/if}
          </div>
        {/if}

        {#if showGuestCount}
          <div class="form-group-wrapper">
            <Label for="dietaryRestrictions">{COPY.rsvp.form.dietary.label}</Label>
            <Textarea
              id="dietaryRestrictions"
              bind:value={formData.dietaryRestrictions}
              rows={3}
              placeholder={COPY.rsvp.form.dietary.placeholder}
              disabled={isLoading}
            />
          </div>
        {/if}

        <div class="form-group-wrapper">
          <Label for="message">{COPY.rsvp.form.message.label}</Label>
          <Textarea
            id="message"
            bind:value={formData.message}
            rows={4}
            placeholder={COPY.rsvp.form.message.placeholder}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" disabled={isLoading} class="mt-4 w-full" size="lg">
          {#if isLoading}
            <Spinner />
            {COPY.rsvp.form.submitting}
          {:else}
            {COPY.rsvp.form.submit}
          {/if}
        </Button>

        {#if formMessage}
          <div class="form-message mt-4">
            {#if messageType === 'success'}
              <Alert.Root
                variant="default"
                class={successWasAttending
                  ? 'border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-950/50'
                  : 'border-border bg-card/90 dark:border-border/80 dark:bg-card/70'}
              >
                <Icon
                  icon="ph:check-circle-fill"
                  width="20"
                  class={successWasAttending
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-foreground/70 dark:text-foreground/80'}
                />
                <Alert.Title>{COPY.rsvp.success.title}</Alert.Title>
                <Alert.Description>{formMessage}</Alert.Description>
              </Alert.Root>
            {:else}
              <Alert.Root variant="destructive">
                <Icon icon="ph:warning-circle-fill" width="20" />
                <Alert.Title>{COPY.rsvp.error.title}</Alert.Title>
                <Alert.Description>{formMessage}</Alert.Description>
              </Alert.Root>
            {/if}
          </div>
        {/if}
      </form>
      <ContactUs title={COPY.rsvp.contact.title} content={COPY.rsvp.contact.description} />
    </div>
  </div>
</AnimatedSection>

<style>
  :global(.rsvp-section) {
    padding: 6rem 0;
    min-height: 100vh;
  }

  .rsvp-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      max-height: 200px;
      transform: translateY(0);
    }
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-group-wrapper {
    margin-bottom: 1.5rem;
  }

  .guest-count-animate {
    animation: slideDown calc(var(--duration-item-stagger, 0.2s) * 1.5)
      var(--easing-entrance, ease-out);
  }

  @media (max-width: 1024px) {
    .rsvp-container {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    :global(.rsvp-section) {
      padding: 4rem 0;
    }

    .rsvp-form {
      padding: 2rem 1.5rem;
    }

    .form-row {
      grid-template-columns: 1fr;
      gap: 0;
    }
  }
</style>
