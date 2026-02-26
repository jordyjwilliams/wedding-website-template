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

  let passcode: string = '';
  let error: string = '';
  let isLoading: boolean = false;
  let shake: boolean = false;
  let isAuthenticated: boolean = false;
  const DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === 'true';

  onMount(() => {
    // Check authentication status
    isAuthenticated = isSessionValid();
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

      if (data.valid && data.token) {
        // Store authentication with timestamp and server-generated token
        const authData = {
          authenticated: true,
          timestamp: Date.now(),
          token: data.token,
        };
        localStorage.setItem('wedding_auth', JSON.stringify(authData));
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
    class="relative flex min-h-screen items-center justify-center overflow-hidden px-4
           bg-[linear-gradient(135deg,hsl(var(--background)/0.96)_0%,hsl(var(--muted)/0.92)_100%),url('/images/heart-bg.webp')_center/cover]"
    style="background-attachment: fixed;"
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
          <div class="mb-4 text-primary animate-pulse-soft">
            <Icon icon="ph:lock-fill" width="48" class="mx-auto" />
          </div>

          <h1
            class="mb-1 font-heading text-[2.6rem] font-bold text-primary
                   sm:text-[3rem]"
          >
            {WEDDING.couple.full}
          </h1>

          <p class="mb-6 text-base font-medium tracking-wide text-muted-foreground">
            {COPY.login.eyebrow}
          </p>

          <p class="mb-3 text-[1.05rem] leading-relaxed text-card-foreground">
            {COPY.login.welcome}
          </p>
          <p class="mb-8 flex items-center justify-center gap-1 text-sm text-muted-foreground">
            {COPY.login.privacy}
            <Icon icon="ph:key-duotone" width="20" class="inline-block shrink-0" />
          </p>

          <form on:submit|preventDefault={handleSubmit} class="space-y-4">
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
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
    top: -20%;
    left: -15%;
    animation-delay: 0s;
  }

  .orb-2 {
    width: clamp(240px, 32vw, 420px);
    height: clamp(240px, 32vw, 420px);
    background: linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)));
    bottom: -18%;
    right: -12%;
    animation-delay: 6s;
  }

  .orb-3 {
    width: clamp(180px, 24vw, 320px);
    height: clamp(180px, 24vw, 320px);
    background: linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)));
    top: 45%;
    right: 8%;
    animation-delay: 12s;
  }

  @keyframes floatOrb {
    0%, 100% { transform: translate(0, 0); }
    33%       { transform: translate(28px, -28px); }
    66%       { transform: translate(-18px, 18px); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .login-card {
    animation: fadeInUp 0.7s ease-out both;
  }

  .login-card.shake {
    animation: shake 0.5s ease-in-out both;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25%       { transform: translateX(-10px); }
    75%       { transform: translateX(10px); }
  }
</style>
