<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Spinner } from '$lib/components/ui/spinner';
  import * as Card from '$lib/components/ui/card';
  import * as Alert from '$lib/components/ui/alert';
  import { WEDDING } from '$lib/constants';
  import { COPY } from '$lib/content';

  let passcode = $state('');
  let error = $state('');
  let isLoading = $state(false);
  let shake = $state(false);
  let hasError = $state(false);
  const DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === 'true';

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
        // Reload page to re-evaluate auth state
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      } else {
        handleError(COPY.login.errors.incorrect);
      }
    } catch {
      handleError(COPY.login.errors.connection);
    } finally {
      isLoading = false;
    }
  }

  function handleError(errorMessage: string): void {
    error = errorMessage;
    shake = true;
    hasError = true;
    setTimeout(() => {
      shake = false;
      passcode = '';
    }, 500);
  }
</script>

<!-- Login / passcode gate -->
<div class="flex min-h-screen items-center justify-center overflow-hidden px-4">
  <!-- Card -->
  <div class="login-card relative z-10 w-full max-w-md" class:shake class:has-error={hasError}>
    <Card.Root class="glass-heavy rounded-3xl text-center">
      <Card.Content class="px-8 pt-8 pb-10 sm:px-10">
        <!-- Lock icon -->
        <div class="text-primary mb-4 animate-pulse">
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
            <Alert.Root variant="destructive" class="mt-4 border-destructive/60 bg-destructive/15">
              <Icon icon="ph:warning-circle-fill" width="20" />
              <Alert.Description class="font-semibold">{error}</Alert.Description>
            </Alert.Root>
          {/if}
        </form>
      </Card.Content>
    </Card.Root>
  </div>
</div>

<style>
  .login-card {
    animation: fadeInUp 0.7s ease-out forwards;
  }

  .login-card.has-error {
    animation: none;
  }

  .login-card.shake {
    animation: shake 0.5s ease-in-out;
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
