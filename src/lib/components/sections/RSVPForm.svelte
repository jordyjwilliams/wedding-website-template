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
  import * as ToggleGroup from '$lib/components/ui/toggle-group';
  import Confetti from '$lib/components/Confetti.svelte';
  import { RSVP_LIMITS } from '$lib/constants';
  import { COPY } from '$lib/content';
  import ContactUs from '$lib/components/ContactUs.svelte';
  import {
    createWeekendAnswers,
    createYesNoOptions,
    getNormalizedGuestCount,
    getMissingRequiredWeekendField,
    isYesNoResponse,
    optionalYesNoToBoolean,
    parseGuestCount,
    RSVP_WEEKEND_QUESTIONS_BY_KEY,
    selectYesNoQuestions,
    RSVP_WEEKEND_TRIGGER_IDS,
    type RsvpWeekendFieldKey,
    validatePhone,
  } from '$lib/rsvp/utils';
  import type { RsvpFormData, RsvpSubmitData, YesNoOption, YesNoResponse } from '$lib/rsvp/types';

  const DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === 'true';
  type FormMessageType = 'success' | 'error' | '';
  type FieldConfig = {
    key: RsvpWeekendFieldKey;
    label: string;
    hint: string;
    yesIcon: string;
    noIcon: string;
    options: YesNoOption[];
    placeholder?: string;
  };

  const GUEST_COUNT_MIN = RSVP_LIMITS.guestCountMin;
  const GUEST_COUNT_MAX = RSVP_LIMITS.guestCountMax;

  let launchConfetti: () => void = $state(() => {});

  const attendanceOptions: YesNoOption[] = createYesNoOptions(COPY.rsvp.form.attending);
  const WEEKEND_FIELDS: FieldConfig[] = selectYesNoQuestions.map(
    (question): FieldConfig => ({
      key: question.key,
      label: question.label,
      hint: question.hint,
      yesIcon: question.yesIcon,
      noIcon: question.noIcon,
      options: createYesNoOptions(question),
      placeholder: question.placeholder,
    })
  );

  const INITIAL_WEEKEND_ANSWERS = createWeekendAnswers(() => undefined);

  const INITIAL_FORM_DATA: RsvpFormData = {
    attendance: undefined,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guestCount: '1',
    travelPlans: [],
    dietaryRestrictions: '',
    message: '',
    ...INITIAL_WEEKEND_ANSWERS,
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
  let weekendFieldErrors = $state<Record<RsvpWeekendFieldKey, string>>(
    createWeekendAnswers(() => '')
  );
  let travelPlansError = $state('');

  $effect(() => {
    if (formData.travelPlans.length > 0) {
      travelPlansError = '';
    }
  });

  let isAttending = $derived(formData.attendance === 'yes');
  let normalizedGuestCount = $derived(
    getNormalizedGuestCount(formData.guestCount, GUEST_COUNT_MIN, GUEST_COUNT_MAX)
  );
  let additionalGuestCount = $derived(isAttending ? Math.max(0, normalizedGuestCount - 1) : 0);
  let hasAdditionalGuests = $derived(additionalGuestCount > 0);

  $effect(() => {
    if (!isAttending) {
      resetAttendingFields();
      return;
    }

    if (additionalGuestNames.length === additionalGuestCount) {
      return;
    }

    additionalGuestNames = Array.from({ length: additionalGuestCount }, (_, index) => {
      return additionalGuestNames[index] || '';
    });
  });

  function getSelectedOptionLabel(
    value: YesNoResponse | undefined,
    options: YesNoOption[],
    placeholder = 'Please select...'
  ): string {
    return options.find((option) => option.value === value)?.label || placeholder;
  }

  function getSuccessMessage(attending: boolean): string {
    return attending ? COPY.rsvp.success.attending : COPY.rsvp.success.notAttending;
  }

  function resetAttendingFields(): void {
    guestCountError = '';
    additionalGuestNames = [];
    additionalGuestNamesError = '';
    clearWeekendFieldErrors();
    formData.travelPlans = [];
    travelPlansError = '';
    for (const question of selectYesNoQuestions) {
      formData[question.key] = undefined;
    }
  }

  function clearAllErrors(): void {
    phoneError = '';
    attendanceError = '';
    guestCountError = '';
    additionalGuestNamesError = '';
    travelPlansError = '';
    clearWeekendFieldErrors();
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

  function clearWeekendFieldErrors(): void {
    for (const question of selectYesNoQuestions) {
      weekendFieldErrors[question.key] = '';
    }
  }

  function setWeekendFieldError(field: RsvpWeekendFieldKey, message: string): void {
    clearWeekendFieldErrors();
    weekendFieldErrors[field] = message;
  }

  function validateAttendance(): boolean {
    if (formData.attendance) {
      attendanceError = '';
      return true;
    }

    attendanceError = COPY.rsvp.form.attending.errorRequired;
    document.getElementById('attendance-trigger')?.focus();
    return false;
  }

  function validateGuestCountField(): boolean {
    if (!isAttending) {
      guestCountError = '';
      return true;
    }

    const guestCount = parseGuestCount(formData.guestCount);
    const isInvalidGuestCount =
      guestCount === null || guestCount < GUEST_COUNT_MIN || guestCount > GUEST_COUNT_MAX;

    if (isInvalidGuestCount) {
      guestCountError = `Please enter a guest count between ${GUEST_COUNT_MIN} and ${GUEST_COUNT_MAX}.`;
      document.getElementById('guestCount')?.focus();
      return false;
    }

    guestCountError = '';
    return true;
  }

  function validateWeekendFields(): boolean {
    if (!isAttending) {
      clearWeekendFieldErrors();
      return true;
    }

    const missingWeekendField = getMissingRequiredWeekendField(formData);
    if (missingWeekendField) {
      const question = RSVP_WEEKEND_QUESTIONS_BY_KEY[missingWeekendField];
      setWeekendFieldError(missingWeekendField, question.errorRequired);
      document.getElementById(RSVP_WEEKEND_TRIGGER_IDS[missingWeekendField])?.focus();
      return false;
    }

    clearWeekendFieldErrors();
    return true;
  }

  function validateAdditionalGuestNames(): boolean {
    if (!hasAdditionalGuests) {
      additionalGuestNamesError = '';
      return true;
    }

    const missingGuestIndex = additionalGuestNames.findIndex((name) => name.trim() === '');
    if (missingGuestIndex >= 0) {
      additionalGuestNamesError = COPY.rsvp.form.guests.additionalNamesRequired;
      document.getElementById(`guest-name-${missingGuestIndex + 2}`)?.focus();
      return false;
    }

    additionalGuestNamesError = '';
    return true;
  }

  function validatePhoneField(): boolean {
    if (formData.phone && !validatePhone(formData.phone)) {
      phoneError = COPY.rsvp.form.phone.errorRequired;
      document.getElementById('phone')?.focus();
      return false;
    }

    phoneError = '';
    return true;
  }

  function validateTravelPlans(): boolean {
    if (!isAttending) {
      travelPlansError = '';
      return true;
    }

    if (formData.travelPlans.length === 0) {
      travelPlansError = COPY.rsvp.form.travelPlans.errorRequired;
      return false;
    }

    travelPlansError = '';
    return true;
  }

  function validateForm(): boolean {
    return (
      validateAttendance() &&
      validateGuestCountField() &&
      validateWeekendFields() &&
      validateAdditionalGuestNames() &&
      validateTravelPlans() &&
      validatePhoneField()
    );
  }

  async function handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    isLoading = true;
    formMessage = '';
    messageType = '';
    successWasAttending = null;

    if (DEBUG_MODE) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Simulated network delay for debugging');
    }

    const normalizedAdditionalGuestNames = additionalGuestNames
      .map((name) => name.trim())
      .filter(Boolean);

    const weekendSubmitAnswers = createWeekendAnswers((field) => {
      return isAttending ? optionalYesNoToBoolean(formData[field]) : false;
    });

    const submitData: RsvpSubmitData = {
      ...formData,
      ...weekendSubmitAnswers,
      attendance: isAttending,
      guestCount: isAttending ? normalizedGuestCount : 0,
      dietaryRestrictions: formData.dietaryRestrictions || 'None',
      message: formData.message || 'None',
      additionalGuestNames: isAttending ? normalizedAdditionalGuestNames : [],
      travelPlans: isAttending ? formData.travelPlans : [],
      timestamp: new Date().toISOString(),
      debugMode: DEBUG_MODE,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch('/.netlify/functions/submit-rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
        signal: controller.signal,
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => ({}))) as {
          message?: string;
          code?: string;
        };
        throw new Error(result.message);
      }

      messageType = 'success';
      successWasAttending = isAttending;
      formMessage = getSuccessMessage(isAttending);

      if (isAttending) {
        launchConfetti();
      }

      formData = { ...INITIAL_FORM_DATA };
      additionalGuestNames = [];
      clearAllErrors();

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
        formMessage = COPY.rsvp.error.timeout;
      } else if (error instanceof Error && error.message) {
        formMessage = error.message;
      } else {
        formMessage = COPY.rsvp.error.submitFailed;
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
      <form
        onsubmit={handleSubmit}
        class="glass rsvp-form rounded-3xl p-12"
        data-netlify="true"
        name="rsvp-form"
      >
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
          <p class="text-muted-foreground mt-1 mb-2 text-sm">{COPY.rsvp.form.phone.hint}</p>
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
          <p class="text-muted-foreground mt-1 mb-2 text-sm">{COPY.rsvp.form.attending.hint}</p>
          <Select.Root
            type="single"
            value={formData.attendance}
            onValueChange={(v) => {
              formData.attendance = isYesNoResponse(v) ? v : undefined;
              attendanceError = '';
            }}
            items={attendanceOptions}
          >
            <Select.Trigger
              id="attendance-trigger"
              class="w-full {attendanceError ? 'border-destructive' : ''}"
            >
              {getSelectedOptionLabel(
                formData.attendance,
                attendanceOptions,
                COPY.rsvp.form.attending.placeholder
              )}
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

        {#if isAttending}
          <div class="form-group-wrapper guest-count-animate">
            <Label for="guestCount">{COPY.rsvp.form.guests.label} *</Label>
            <p class="text-muted-foreground mt-1 mb-2 text-sm">{COPY.rsvp.form.guests.hint}</p>
            <Input
              type="number"
              id="guestCount"
              value={formData.guestCount}
              oninput={handleGuestCountInput}
              min={GUEST_COUNT_MIN}
              max={GUEST_COUNT_MAX}
              required={isAttending}
              disabled={isLoading}
              placeholder="1"
              class={guestCountError ? 'border-destructive' : ''}
            />
            {#if guestCountError}
              <p class="text-destructive mt-1 text-sm">{guestCountError}</p>
            {/if}
          </div>
          {#if hasAdditionalGuests}
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
          {#each WEEKEND_FIELDS as field (field.key)}
            <div class="form-group-wrapper guest-count-animate">
              <Label>{field.label} *</Label>
              {#if field.hint}
                <p class="text-muted-foreground mt-1 mb-2 text-sm">{field.hint}</p>
              {/if}
              <ToggleGroup.Root
                id={RSVP_WEEKEND_TRIGGER_IDS[field.key]}
                type="single"
                value={formData[field.key]}
                onValueChange={(value) => {
                  formData[field.key] = isYesNoResponse(value) ? value : undefined;
                  weekendFieldErrors[field.key] = '';
                }}
                disabled={isLoading}
                variant="outline"
                spacing={1}
                class="flex flex-wrap justify-start gap-2 {weekendFieldErrors[field.key]
                  ? 'ring-destructive/30 rounded-lg ring-2'
                  : ''}"
              >
                {#each field.options as option (option.value)}
                  <ToggleGroup.Item
                    value={option.value}
                    class="hover:border-foreground/50 rounded-full border-2 hover:bg-transparent {option.value ===
                    'yes'
                      ? 'data-[state=on]:border-green-400 data-[state=on]:bg-green-100 data-[state=on]:text-green-800'
                      : 'data-[state=on]:border-red-400 data-[state=on]:bg-red-100 data-[state=on]:text-red-800'}"
                  >
                    <Icon icon={option.value === 'yes' ? field.yesIcon : field.noIcon} width="14" />
                    {option.label}
                  </ToggleGroup.Item>
                {/each}
              </ToggleGroup.Root>
              {#if weekendFieldErrors[field.key]}
                <p class="text-destructive mt-2 text-sm">{weekendFieldErrors[field.key]}</p>
              {/if}
            </div>
          {/each}

          <div class="form-group-wrapper guest-count-animate">
            <Label>{COPY.rsvp.form.travelPlans.label} *</Label>
            <p class="text-muted-foreground mt-1 mb-3 text-sm">{COPY.rsvp.form.travelPlans.hint}</p>
            <ToggleGroup.Root
              type="multiple"
              bind:value={formData.travelPlans}
              disabled={isLoading}
              variant="outline"
              spacing={1}
              class="flex flex-wrap justify-start gap-2 {travelPlansError
                ? 'ring-destructive/30 rounded-lg ring-2'
                : ''}"
            >
              {#each COPY.rsvp.form.travelPlans.options as option (option.value)}
                <ToggleGroup.Item
                  value={option.value}
                  class="hover:border-foreground/50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary gap-1.5 rounded-full border-2 hover:bg-transparent"
                >
                  <Icon icon={option.icon} width="14" />
                  {option.label}
                </ToggleGroup.Item>
              {/each}
            </ToggleGroup.Root>
            {#if travelPlansError}
              <p class="text-destructive mt-2 text-sm">{travelPlansError}</p>
            {/if}
          </div>

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
