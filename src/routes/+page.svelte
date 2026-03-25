<script lang="ts">
  import { onMount } from 'svelte';
  import { isSessionValid } from '$lib/auth';
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Spinner } from '$lib/components/ui/spinner';
  import * as Card from '$lib/components/ui/card';
  import * as Alert from '$lib/components/ui/alert';
  import { Hero, PageWrapper } from '$lib/components';
  import { WEDDING } from '$lib/constants';
  import { COPY } from '$lib/content';

  let passcode = $state('');
  let error = $state('');
  let isLoading = $state(false);
  let shake = $state(false);
  let isAuthenticated = $state(false);
  const DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === 'true';

  onMount(async () => {
    // Check authentication status
    isAuthenticated = await isSessionValid();
  });

  async function handleSubmit(): Promise<void> {
    if (!passcode.trim()) return;

    isLoading = true;
    error = '';

    // Simulate delay in debug mode
    if (DEBUG_MODE) {
      console.log('Simulating network delay for debugging');
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    try {
      const response = await fetch('/.netlify/functions/verify-passcode', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      // Simulate network delay in debug mode
      if (DEBUG_MODE) {
        console.log('Simulating network delay for debugging');
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      const data = await response.json();

      if (data.valid) {
        // Session cookie is set by server on successful verification.
        isAuthenticated = true;
        // Force full reload to re-evaluate layout and show navbar
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      } else {
        error = COPY.login.errors.incorrect;
        shake = true;
        setTimeout(() => (shake = false), 500);
        passcode = '';
      }
    } catch {
      error = COPY.login.errors.connection;
      shake = true;
      setTimeout(() => (shake = false), 500);
    } finally {
      isLoading = false;
    }
  }
</script>

{#if isAuthenticated}
  <!-- Show home content when authenticated -->
  <PageWrapper backgroundImage="/images/hero-bg.webp" backgroundPosition="center top">
    <Hero />
  </PageWrapper>
{:else}
  <!-- Login / passcode gate -->
  <div
    class="login-bg relative flex min-h-screen items-center justify-center overflow-hidden
           px-4"
  >
    <!-- Ambient orbs -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="login-orb orb-1"></div>
      <div class="login-orb orb-2"></div>
      <div class="login-orb orb-3"></div>
    </div>

    <!-- Card -->
    <div class="login-card relative z-10 w-full max-w-md" class:shake>
      <Card.Root class="glass-heavy rounded-3xl text-center">
        <Card.Content class="px-8 pt-8 pb-10 sm:px-10">
          <!-- Lock icon -->
          <div class="text-primary animate-pulse-soft mb-4">
            <Icon icon="ph:lock-fill" width="48" class="mx-auto" />
          </div>

          <h1
            class="font-heading text-primary mb-1 text-[2.6rem] font-bold
                   sm:text-[3rem]"
          >
            {WEDDING.couple.full}
          </h1>

          <p class="text-muted-foreground mb-6 text-base font-medium tracking-wide">
            {COPY.login.eyebrow}
          </p>

          <p class="text-card-foreground mb-3 text-[1.05rem] leading-relaxed">
            {COPY.login.welcome}
          </p>
          <p class="text-muted-foreground mb-8 flex items-center justify-center gap-1 text-sm">
            {COPY.login.privacy}
            <Icon icon="ph:key-duotone" width="20" class="inline-block shrink-0" />
          </p>

          <form
            onsubmit={(event) => {
              event.preventDefault();
              void handleSubmit();
            }}
            class="space-y-4"
          >
            <Input
              type="password"
              bind:value={passcode}
              placeholder={COPY.login.placeholder}
              disabled={isLoading}
              autocomplete="off"
              class="text-center text-lg tracking-widest"
            />

            <Button type="submit" disabled={isLoading} class="w-full rounded-full" size="lg">
              {#if isLoading}
                <Spinner />
                {COPY.login.submitting}
              {:else}
                {COPY.login.submit}
              {/if}
            </Button>

            {#if error}
              <Alert.Root variant="destructive" class="mt-4">
                <Icon icon="ph:warning-circle-fill" width="20" />
                <Alert.Description>{error}</Alert.Description>
              </Alert.Root>
            {/if}
          </form>
        </Card.Content>
      </Card.Root>
    </div>
  </div>
{/if}

<style>
  /* Login page background — combines tinted gradient with hero image */
  .login-bg {
    background-image:
      linear-gradient(
        135deg,
        color-mix(in srgb, var(--color-background) 96%, transparent) 0%,
        color-mix(in srgb, var(--color-muted) 92%, transparent) 100%
      ),
      url('/images/heart-bg.webp');
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }

  /* Ambient gradient orbs */
  .login-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.35;
    animation: floatOrb 22s infinite ease-in-out;
  }

  .orb-1 {
    width: clamp(300px, 40vw, 500px);
    height: clamp(300px, 40vw, 500px);
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    top: -20%;
    left: -15%;
    animation-delay: 0s;
  }

  .orb-2 {
    width: clamp(240px, 32vw, 420px);
    height: clamp(240px, 32vw, 420px);
    background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
    bottom: -18%;
    right: -12%;
    animation-delay: 6s;
  }

  .orb-3 {
    width: clamp(180px, 24vw, 320px);
    height: clamp(180px, 24vw, 320px);
    background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
    top: 45%;
    right: 8%;
    animation-delay: 12s;
  }

  .login-card {
    animation: fadeInUp 0.7s ease-out both;
  }

  .login-card.shake {
    animation: shake 0.5s ease-in-out both;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-10px);
    }
    75% {
      transform: translateX(10px);
    }
  }
</style>
