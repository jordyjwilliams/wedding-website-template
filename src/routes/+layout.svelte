<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { page } from '$app/stores';
  import { Navigation } from '$lib/components';
  import Icon from '@iconify/svelte';
  import { authState, refreshAuthState } from '$lib/auth-state.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import { COPY } from '$lib/content';

  onMount(async () => {
    const isAuthenticated = await refreshAuthState();

    // Redirect to passcode page if not authenticated and not already there
    if (!isAuthenticated && $page.url.pathname !== '/') {
      goto(resolve('/', {}));
    }
  });
  let { children } = $props();
</script>

<svelte:head>
  <title>{COPY.meta.title}</title>
  <meta name="description" content={COPY.meta.description} />
</svelte:head>

<ModeWatcher />

{#if authState.isAuthenticated}
  <Navigation />
{/if}

<div class="flex min-h-screen flex-col">
  <main class="flex-1 {authState.isAuthenticated ? 'pt-(--nav-height)' : ''}">
    {@render children?.()}
  </main>

  <footer class="glass-nav-solid border-border/70 border-t px-4 py-6">
    <div
      class="text-foreground/80 mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 text-center text-sm"
    >
      <p class="flex items-center gap-2 tracking-wide">
        <span>{COPY.footer.message}</span>
        <Icon icon={COPY.footer.icon} class="text-primary h-4 w-4" aria-hidden="true" />
        <span>{COPY.footer.byLabel}</span>
        <a
          class="text-primary decoration-primary/40 hover:text-foreground font-medium underline underline-offset-4 transition-colors"
          href={COPY.footer.linkHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {COPY.footer.names}
        </a>
      </p>
    </div>
  </footer>
</div>
