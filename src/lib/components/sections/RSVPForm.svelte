<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Separator } from '$lib/components/ui/separator';
  import { WeddingBadge } from '$lib/components/ui/badge';
  import { Spinner } from '$lib/components/ui/spinner';
  import * as Alert from '$lib/components/ui/alert';
  import * as Card from '$lib/components/ui/card';
  import * as Select from '$lib/components/ui/select';
  import { SectionHeader, AnimatedSection, AnimatedIcon } from '$lib/components';
  import { WEDDING } from '$lib/constants';
  import { COPY } from '$lib/content';

  const attendanceOptions = [
    { value: 'yes', label: COPY.rsvp.form.attending.yes },
    { value: 'no', label: COPY.rsvp.form.attending.no },
  ];

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    attendance: string;
    guestCount: string;
    dietaryRestrictions: string;
    message: string;
  }

  let formData = $state<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    attendance: '',
    guestCount: '1',
    dietaryRestrictions: '',
    message: '',
  });

  let selectedAttendance = $state<string | undefined>(undefined);

  let isLoading = $state(false);
  let formMessage = $state('');
  let messageType = $state('');
  let phoneError = $state('');

  let showGuestCount = $derived(selectedAttendance === 'yes');

  let selectedAttendanceLabel = $derived(
    attendanceOptions.find((opt) => opt.value === selectedAttendance)?.label || 'Please select...'
  );

  function validatePhone(phone: string): boolean {
    if (!phone || phone.trim() === '') return true; // Optional field

    // Remove spaces and common formatting characters
    const cleanPhone = phone.replace(/[\s()-]/g, '');

    // Australian mobile format: +61 4XX XXX XXX or 04XX XXX XXX
    const australianMobileRegex = /^(\+61|0)?4\d{8}$/;

    // International format: + followed by 7-15 digits
    const internationalRegex = /^\+\d{7,15}$/;

    return australianMobileRegex.test(cleanPhone) || internationalRegex.test(cleanPhone);
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

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    // Validate phone before submitting
    if (formData.phone && !validatePhone(formData.phone)) {
      phoneError = COPY.rsvp.form.phone.errorRequired;
      document.getElementById('phone')?.focus();
      return;
    }

    isLoading = true;
    formMessage = '';
    messageType = '';

    // TODO: Create the actual script and test this functionality
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';
    // Simulate network delay until we validate form.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Check if URL is configured
    if (!GOOGLE_SCRIPT_URL) {
      console.error('Google Script URL not configured');
      messageType = 'error';
      formMessage = `❌ ${COPY.rsvp.error.message}`;
      isLoading = false;
      return;
    }

    const submitData = {
      ...formData,
      attendance: selectedAttendance || '',
      guestCount: selectedAttendance === 'yes' ? formData.guestCount : '0',
      dietaryRestrictions: formData.dietaryRestrictions || 'None',
      message: formData.message || 'None',
      timestamp: new Date().toISOString(),
    };

    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const _response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Success
      messageType = 'success';
      formMessage = `✅ ${COPY.rsvp.success.message}`;

      // Reset form
      formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        attendance: '',
        guestCount: '1',
        dietaryRestrictions: '',
        message: '',
      };
      selectedAttendance = undefined;

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

      if (error instanceof Error && error.name === 'AbortError') {
        formMessage =
          '❌ Request timed out. Please check your internet connection and try again, or contact us directly.';
      } else {
        formMessage = '❌ Oops! Something went wrong. Please try again or contact us directly.';
      }
    } finally {
      isLoading = false;
    }
  }
</script>

<AnimatedSection class="rsvp-section">
  <div class="container">
    <SectionHeader title={COPY.rsvp.title} emoji={COPY.rsvp.emoji} intro={COPY.rsvp.intro} />

    <div class="rsvp-container">
      <form onsubmit={handleSubmit} class="glass-card-form rsvp-form p-12">
        <div class="form-row">
          <div class="form-group-wrapper">
            <Label for="firstName">{COPY.rsvp.form.name.label} *</Label>
            <Input
              type="text"
              id="firstName"
              bind:value={formData.firstName}
              required
              disabled={isLoading}
              placeholder="First name"
            />
          </div>

          <div class="form-group-wrapper">
            <Label for="lastName">Last Name *</Label>
            <Input
              type="text"
              id="lastName"
              bind:value={formData.lastName}
              required
              disabled={isLoading}
              placeholder="Last name"
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
            class={phoneError ? 'border-red-500' : ''}
          />
          {#if phoneError}
            <p class="mt-1 text-sm text-red-500">{phoneError}</p>
          {/if}
        </div>

        <div class="form-group-wrapper">
          <Label for="attendance">{COPY.rsvp.form.attending.label} *</Label>
          <Select.Root
            type="single"
            value={selectedAttendance}
            onValueChange={(v) => {
              selectedAttendance = v;
            }}
            items={attendanceOptions}
          >
            <Select.Trigger class="w-full">
              {selectedAttendanceLabel}
            </Select.Trigger>
            <Select.Content>
              {#each attendanceOptions as option (option.value)}
                <Select.Item value={option.value} label={option.label} />
              {/each}
            </Select.Content>
          </Select.Root>
        </div>

        {#if showGuestCount}
          <div class="form-group-wrapper guest-count-animate">
            <Label for="guestCount">{COPY.rsvp.form.guests.label} *</Label>
            <Input
              type="number"
              id="guestCount"
              bind:value={formData.guestCount}
              min="1"
              max="10"
              required={showGuestCount}
              disabled={isLoading}
              placeholder="1"
            />
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
          <div class="mt-4">
            {#if messageType === 'success'}
              <Alert.Root
                variant="default"
                class="border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-950/50"
              >
                <Icon
                  icon="ph:check-circle-fill"
                  width="20"
                  class="text-green-600 dark:text-green-400"
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

      <div class="help-card">
        <Card.Root>
          <Card.Header class="text-center">
            <div class="mb-4">
              <AnimatedIcon icon="ph:chat-circle-dots-fill" size={48} color="hsl(var(--accent))" />
            </div>
            <Card.Title>{COPY.rsvp.contact.title}</Card.Title>
          </Card.Header>
          <Card.Content class="text-center">
            <p class="text-muted-foreground mb-6">
              {COPY.rsvp.contact.description}
            </p>
            <div class="space-y-4">
              <div class="flex flex-col items-center space-y-3">
                <WeddingBadge size="event">{COPY.rsvp.contact.bride}</WeddingBadge>
                <div class="flex w-full flex-col gap-2 text-sm">
                  <a href="mailto:{WEDDING.contact.bride.email}" class="contact-link">
                    <Icon icon="ph:envelope-simple-fill" width="16" />
                    {WEDDING.contact.bride.email}
                  </a>
                  <a
                    href="tel:{WEDDING.contact.bride.phone.replace(/\s/g, '')}"
                    class="contact-link"
                  >
                    <Icon icon="ph:phone-fill" width="16" />
                    {WEDDING.contact.bride.phone}
                  </a>
                </div>
              </div>

              <Separator />

              <div class="flex flex-col items-center space-y-3">
                <WeddingBadge size="event">{COPY.rsvp.contact.groom}</WeddingBadge>
                <div class="flex w-full flex-col gap-2 text-sm">
                  <a href="mailto:{WEDDING.contact.groom.email}" class="contact-link">
                    <Icon icon="ph:envelope-simple-fill" width="16" />
                    {WEDDING.contact.groom.email}
                  </a>
                  <a
                    href="tel:{WEDDING.contact.groom.phone.replace(/\s/g, '')}"
                    class="contact-link"
                  >
                    <Icon icon="ph:phone-fill" width="16" />
                    {WEDDING.contact.groom.phone}
                  </a>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
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

  .rsvp-form {
    animation: slideInLeft 0.8s ease-out;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
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
    animation: slideDown 0.3s ease-out;
  }

  .help-card {
    animation: slideInRight 0.8s ease-out;
    position: sticky;
    top: 6rem;
    height: fit-content;
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    color: hsl(var(--foreground));
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .contact-link:hover {
    background: hsl(var(--accent) / 0.1);
    color: hsl(var(--primary));
    transform: translateX(2px);
  }

  .contact-link :global(svg) {
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    .rsvp-container {
      grid-template-columns: 1fr;
    }

    .help-card {
      position: static;
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
