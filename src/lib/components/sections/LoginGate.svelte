<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import Icon from '@iconify/svelte';
  import { refreshAuthState } from '$lib/auth-state.svelte';
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

  interface VerifyPasscodeResponse {
    valid?: boolean;
    message?: string;
    code?: string;
  }

  function getLoginErrorMessage(response: Response, data: VerifyPasscodeResponse): string {
    if (data.code === 'RATE_LIMITED' || response.status === 429)
      return COPY.login.errors.tooManyRequests;
    if (data.code === 'INVALID_PASSCODE' || response.status === 401)
      return COPY.login.errors.incorrect;
    // Fallback: Generic error message for any other cases (network issues, server errors, unexpected responses, etc.)
    return COPY.login.errors.connection;
  }

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

      const data = (await response.json()) as VerifyPasscodeResponse;

      if (data.valid) {
        await refreshAuthState();
        await goto(resolve('/', {}), { replaceState: true });
      } else {
        handleError(getLoginErrorMessage(response, data));
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
          class="font-heading-1 text-primary mb-1 text-[2.6rem] font-bold
                 sm:text-[3rem]"
        >
          {WEDDING.couple.full}
        </h1>

        <p class="text-muted-foreground mb-6 text-base font-medium tracking-wide">
          {COPY.login.eyebrow}
        </p>

        <div class="text-card-foreground mb-3 space-y-3 text-center text-[1.05rem] leading-relaxed">
          {#each COPY.login.welcome.split('\n\n') as paragraph, i (i)}
            {#if paragraph.trim()}
              <p>{paragraph.trim()}</p>
            {/if}
          {/each}
        </div>
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
            <Alert.Root variant="destructive" class="border-destructive bg-destructive/10 mt-4">
              <Icon icon="ph:warning-circle-fill" width="20" />
              <Alert.Description class="font-bold">{error}</Alert.Description>
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
