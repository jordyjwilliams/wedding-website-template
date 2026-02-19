<script lang="ts">
  import { onMount } from 'svelte';
  import { isSessionValid } from '$lib/auth';
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Spinner } from '$lib/components/ui/spinner';
  import * as Card from '$lib/components/ui/card';
  import * as Alert from '$lib/components/ui/alert';
  import { Hero, AboutUs, PageWrapper } from '$lib/components';
  import { WEDDING } from '$lib/constants';
  import { COPY } from '$lib/content';

  let passcode: string = '';
  let error: string = '';
  let isLoading: boolean = false;
  let shake: boolean = false;
  let isAuthenticated: boolean = false;

  onMount(() => {
    // Check authentication status
    isAuthenticated = isSessionValid();
  });

  async function handleSubmit(): Promise<void> {
    if (!passcode.trim()) return;

    isLoading = true;
    error = '';

    try {
      const response = await fetch('/.netlify/functions/verify-passcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

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
  <PageWrapper backgroundImage="/images/hero-bg.webp">
    <Hero />
    <AboutUs />
  </PageWrapper>
{:else}
  <!-- Show login form when not authenticated -->
  <div class="passcode-page">
    <div class="passcode-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>

    <div class="passcode-container" class:shake>
      <Card.Root class="passcode-card">
        <Card.Content class="pt-6">
          <div class="lock-icon"><Icon icon="ph:lock-fill" width="48" /></div>
          <h1 class="couple-names">{WEDDING.couple.full}</h1>
          <p class="eyebrow">{COPY.login.eyebrow}</p>
          <p class="welcome-text">
            {COPY.login.welcome}
          </p>
          <p class="help-text">
            {COPY.login.privacy}
            <Icon icon="ph:key-duotone" width="24" class="inline" />
          </p>

          <form on:submit|preventDefault={handleSubmit} class="space-y-4">
            <div class="input-wrapper">
              <Input
                type="password"
                bind:value={passcode}
                placeholder={COPY.login.placeholder}
                disabled={isLoading}
                autocomplete="off"
                class="text-center text-lg tracking-wider"
              />
            </div>

            <Button type="submit" disabled={isLoading} class="w-full" size="lg">
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
                <Alert.Description>
                  {error}
                </Alert.Description>
              </Alert.Root>
            {/if}
          </form>
        </Card.Content>
      </Card.Root>
    </div>
  </div>
{/if}

<style>
  .passcode-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background:
      linear-gradient(135deg, rgba(250, 248, 246, 0.9) 0%, rgba(245, 230, 211, 0.85) 100%),
      url('/images/heart-bg.webp') center/cover fixed;
  }

  .passcode-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: float 20s infinite ease-in-out;
  }

  .orb-1 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    top: -200px;
    left: -200px;
    animation-delay: 0s;
  }

  .orb-2 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, var(--secondary), var(--primary));
    bottom: -150px;
    right: -150px;
    animation-delay: 5s;
  }

  .orb-3 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, var(--accent), var(--primary));
    top: 50%;
    right: 10%;
    animation-delay: 10s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(30px, -30px) rotate(5deg);
    }
    50% {
      transform: translate(-20px, 20px) rotate(-5deg);
    }
    75% {
      transform: translate(40px, 10px) rotate(3deg);
    }
  }

  .passcode-container {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 500px;
    padding: 2rem;
    animation: fadeInUp 0.8s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :global(.passcode-card) {
    backdrop-filter: blur(20px);
    text-align: center;
  }

  .lock-icon {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    animation: pulse 2s infinite;
    color: hsl(var(--primary));
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .couple-names {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: hsl(var(--primary));
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .eyebrow {
    color: hsl(var(--muted-foreground));
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin-bottom: 1.5rem;
  }

  .welcome-text {
    color: hsl(var(--foreground));
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .help-text {
    color: hsl(var(--muted-foreground));
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .input-wrapper {
    margin-bottom: 1rem;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .shake {
    animation: shake 0.5s;
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

  @media (max-width: 600px) {
    .passcode-container {
      padding: 1.5rem;
    }

    .couple-names {
      font-size: 2rem;
    }

    .orb-1,
    .orb-2,
    .orb-3 {
      filter: blur(60px);
    }
  }
</style>
