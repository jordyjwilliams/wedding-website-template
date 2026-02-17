<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Separator } from '$lib/components/ui/separator';
  import { Badge } from '$lib/components/ui/badge';
  import * as Alert from '$lib/components/ui/alert';
  import * as Card from '$lib/components/ui/card';
  import * as Select from '$lib/components/ui/select';

  const attendanceOptions = [
    { value: 'yes', label: "Yes, I'll be there! 🎉" },
    { value: 'no', label: "Sorry, I can't make it 😢" },
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
  let visible = $state(false);
  let scrollOpacity = $state(75);
  let phoneError = $state('');

  let showGuestCount = $derived(selectedAttendance === 'yes');

  let selectedAttendanceLabel = $derived(
    attendanceOptions.find((opt) => opt.value === selectedAttendance)?.label || 'Please select...'
  );

  onMount(() => {
    visible = true;

    // Add scroll listener for dynamic glass effect
    const handleScroll = () => {
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      // Reduce opacity slightly as user scrolls (75% to 68%)
      scrollOpacity = Math.max(68, 75 - scrollPercent * 7);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

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
      phoneError = 'Please enter a valid mobile number (e.g., +61 4XX XXX XXX or 04XX XXX XXX)';
    } else {
      phoneError = '';
    }
  }

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    // Validate phone before submitting
    if (formData.phone && !validatePhone(formData.phone)) {
      phoneError = 'Please enter a valid mobile number before submitting';
      document.getElementById('phone')?.focus();
      return;
    }

    isLoading = true;
    formMessage = '';
    messageType = '';

    // TODO: Create the actual script and test this functionality
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

    // Check if URL is configured
    if (!GOOGLE_SCRIPT_URL) {
      console.error('Google Script URL not configured');
      messageType = 'error';
      formMessage = '❌ Form submission is not yet configured. Please contact us directly to RSVP.';
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
      formMessage =
        "✅ Thank you for your RSVP! We've received your response and can't wait to celebrate with you!";

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

<section class="rsvp-section" class:visible>
  <div class="container">
    <div class="rsvp-header">
      <h2 class="section-title">RSVP 💌</h2>
      <p class="section-intro">
        Please let us know if you can join us for the weekend. Your response helps us plan rooms,
        food and all that jazz 🎷
      </p>
    </div>

    <div class="rsvp-container">
      <form onsubmit={handleSubmit} class="rsvp-form">
        <div class="form-row">
          <div class="form-group-wrapper">
            <Label for="firstName">First Name *</Label>
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
          <Label for="email">Email *</Label>
          <Input
            type="email"
            id="email"
            bind:value={formData.email}
            required
            disabled={isLoading}
            placeholder="your@email.com"
          />
        </div>

        <div class="form-group-wrapper">
          <Label for="phone">Phone Number</Label>
          <Input
            type="tel"
            id="phone"
            bind:value={formData.phone}
            oninput={handlePhoneInput}
            disabled={isLoading}
            placeholder="+61 123 456 789 or +1 303 465-7890"
            class={phoneError ? 'border-red-500' : ''}
          />
          {#if phoneError}
            <p class="mt-1 text-sm text-red-500">{phoneError}</p>
          {/if}
        </div>

        <div class="form-group-wrapper">
          <Label for="attendance">Will you be attending? *</Label>
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
              {#each attendanceOptions as option}
                <Select.Item value={option.value} label={option.label} />
              {/each}
            </Select.Content>
          </Select.Root>
        </div>

        {#if showGuestCount}
          <div class="form-group-wrapper guest-count-animate">
            <Label for="guestCount">Number of Guests (including yourself) *</Label>
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
            <Label for="dietaryRestrictions">Dietary Requirements or Allergies</Label>
            <Textarea
              id="dietaryRestrictions"
              bind:value={formData.dietaryRestrictions}
              rows={3}
              placeholder="Let us know if you have any dietary needs or allergies we should be aware of 🌱🥩"
              disabled={isLoading}
            />
          </div>
        {/if}

        <div class="form-group-wrapper">
          <Label for="message">Message to Us (Optional)</Label>
          <Textarea
            id="message"
            bind:value={formData.message}
            rows={4}
            placeholder="Any special requests or just say hi! 💕"
            disabled={isLoading}
          />
        </div>

        <Button type="submit" disabled={isLoading} class="mt-4 w-full" size="lg">
          {#if isLoading}
            <span class="spinner"></span>
            Sending...
          {:else}
            Submit RSVP ✨
          {/if}
        </Button>

        {#if formMessage}
          <div class="mt-4">
            {#if messageType === 'success'}
              <Alert.Root variant="default" class="border-green-200 bg-green-50">
                <Icon icon="ph:check-circle-fill" width="20" class="text-green-600" />
                <Alert.Title>Success!</Alert.Title>
                <Alert.Description>{formMessage}</Alert.Description>
              </Alert.Root>
            {:else}
              <Alert.Root variant="destructive">
                <Icon icon="ph:warning-circle-fill" width="20" />
                <Alert.Title>Error</Alert.Title>
                <Alert.Description>{formMessage}</Alert.Description>
              </Alert.Root>
            {/if}
          </div>
        {/if}
      </form>

      <div class="help-card">
        <Card.Root
          class="scroll-glass-transition"
          style="background-color: rgb(255 255 255 / {scrollOpacity}%);"
        >
          <Card.Header class="text-center">
            <div class="help-icon">
              <Icon icon="ph:chat-circle-dots-fill" width="48" />
            </div>
            <Card.Title>Need Help?</Card.Title>
          </Card.Header>
          <Card.Content class="text-center">
            <p class="mb-6 text-muted-foreground">
              If you have trouble with the form, feel free to email or text us and we'll add your
              details manually.
            </p>
            <div class="space-y-4">
              <div class="flex flex-col items-center space-y-3">
                <Badge variant="secondary" class="px-4 py-1 text-base">👰 Nicole</Badge>
                <div class="flex w-full flex-col gap-2 text-sm">
                  <a href="mailto:nfrances369@gmail.com" class="contact-link">
                    <Icon icon="ph:envelope-simple-fill" width="16" />
                    nfrances369@gmail.com
                  </a>
                  <a href="tel:+61403932003" class="contact-link">
                    <Icon icon="ph:phone-fill" width="16" />
                    +61 403 932 003
                  </a>
                </div>
              </div>

              <Separator />

              <div class="flex flex-col items-center space-y-3">
                <Badge variant="secondary" class="px-4 py-1 text-base">🤵 Jordy</Badge>
                <div class="flex w-full flex-col gap-2 text-sm">
                  <a href="mailto:jordy_williams@hotmail.co.uk" class="contact-link">
                    <Icon icon="ph:envelope-simple-fill" width="16" />
                    jordy_williams@hotmail.co.uk
                  </a>
                  <a href="tel:+61403765534" class="contact-link">
                    <Icon icon="ph:phone-fill" width="16" />
                    +61 403 765 534
                  </a>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </div>
</section>

<style>
  .rsvp-section {
    padding: 6rem 0;
    /* Background with subtle overlay */
    background:
      linear-gradient(135deg, rgba(248, 250, 251, 0.95) 0%, rgba(237, 242, 244, 0.92) 100%),
      url('/images/rsvp-bg.webp') center/cover fixed;
    min-height: 100vh;
    opacity: 0;
    transition: opacity 0.6s ease-out;
  }

  .rsvp-section.visible {
    opacity: 1;
  }

  .rsvp-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: 1rem;
    color: hsl(var(--primary));
    text-shadow: 0 2px 8px rgba(255, 255, 255, 0.8);
  }

  .section-intro {
    font-size: 1.2rem;
    color: var(--text-light);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .rsvp-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .rsvp-form {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    padding: 3rem;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.3);
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

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
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

  .help-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
    color: hsl(var(--accent));
    display: inline-block;
  }

  .help-icon :global(svg) {
    filter: drop-shadow(0 4px 8px rgba(122, 184, 212, 0.3));
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
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
    .rsvp-section {
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
