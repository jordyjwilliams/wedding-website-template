<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { clearAuth } from '$lib/auth';
  import * as Sheet from '$lib/components/ui/sheet';
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import Icon from '@iconify/svelte';
  import SunIcon from '@lucide/svelte/icons/sun';
  import MoonIcon from '@lucide/svelte/icons/moon';
  import { toggleMode } from 'mode-watcher';
  import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';
  import { COPY } from '$lib/content';

  let mobileMenuOpen: boolean = false;
  let scrolled: boolean = false;
  let isDebugLogoutLoading: boolean = false;
  const DEBUG_MODE =
    import.meta.env.VITE_DEBUG === 'true' || import.meta.env.VITE_DEBUG_MODE === 'true';

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function closeMobileMenu(): void {
    mobileMenuOpen = false;
  }

  async function handleDebugLogout(): Promise<void> {
    if (isDebugLogoutLoading) return;

    isDebugLogoutLoading = true;
    await clearAuth();

    if (typeof window !== 'undefined') {
      window.location.href = resolve('/', {});
    }
  }

  const navLinks = [
    { href: '/', label: COPY.nav.home, icon: 'ph:house-fill' },
    { href: '/our-story', label: COPY.nav.aboutUs, icon: 'ph:notebook-duotone' },
    { href: '/wedding', label: COPY.nav.wedding, icon: 'ph:heart-fill' },
    { href: '/venue', label: COPY.nav.venue, icon: 'ph:map-pin-fill' },
    { href: '/rsvp', label: COPY.nav.rsvp, icon: 'ph:envelope-fill' },
  ];
</script>

<!--
  Height is set to var(--nav-height) = 4.5rem so Hero / sections
  can use pt-(--nav-height) to avoid overlap.
-->
<nav
  class="fixed inset-x-0 top-0 z-50 h-(--nav-height) transition-all duration-300
         {scrolled
    ? 'bg-card/88 border-border/40 shadow-glass border-b backdrop-blur-xl'
    : 'bg-card/80 border-b border-transparent backdrop-blur-md'}"
>
  <div
    class="text-foreground 3xl:max-w-[100rem] mx-auto flex h-full max-w-7xl items-center gap-3
           px-6"
  >
    <!-- Left: brand + theme toggle -->
    <div class="flex shrink-0 items-center gap-2">
      <!-- Theme toggle -->
      <Button
        onclick={toggleMode}
        variant="ghost"
        size="icon"
        class="text-foreground hover:bg-accent/15 hover:text-foreground relative ml-1 h-9 w-9
               shrink-0 overflow-hidden"
      >
        <SunIcon
          class="h-[18px] w-[18px] scale-100 rotate-0
                 transition-all duration-300 dark:scale-0 dark:-rotate-90"
        />
        <MoonIcon
          class="absolute inset-0 m-auto h-[18px] w-[18px] scale-0 rotate-90
                 transition-all duration-300 dark:scale-100 dark:rotate-0"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>

      {#if DEBUG_MODE}
        <Button
          onclick={handleDebugLogout}
          variant="ghost"
          size="icon"
          class="text-foreground hover:bg-accent/15 hover:text-foreground relative h-9 w-9 shrink-0"
          aria-label="Debug logout"
          disabled={isDebugLogoutLoading}
        >
          <Icon icon="ph:lock-fill" width="18" />
          <span class="sr-only">Debug logout</span>
        </Button>
      {/if}

      <!-- Brand -->
      <a
        href={resolve('/', {})}
        class="font-script text-[2.2rem] leading-none font-bold no-underline
               transition-transform duration-200 hover:-translate-y-px"
        aria-label="Home"
      >
        <!-- TODO: Confirm if want differing animation on home vs other pages -->
        <!-- Currently use rings on every page... -->
        <!-- {#if $page.url.pathname === '/'} -->
        <!-- {:else} {COPY.nav.brand} -->
        <!-- {/if} -->
        <!-- If we do want this - put in if/else as above... -->
        <!-- END TODO -->
        <div style="width:44px;height:44px" class="rings-animation pointer-events-none">
          <DotLottieSvelte src="/animations/wedding-rings.lottie" loop autoplay />
        </div>
        <span class="sr-only">{COPY.nav.brand}</span>
      </a>
    </div>

    <!-- Spacer -->
    <div class="flex-1"></div>

    <!-- Desktop links (right) -->
    <nav class="hidden items-center gap-7 md:flex">
      {#each navLinks as link (link.href)}
        {@const active = $page.url.pathname === link.href}
        <a
          href={resolve(link.href, {})}
          class="relative border-b-2 py-1 text-[0.92rem] font-medium tracking-[0.06em]
                 no-underline transition-all duration-200
                 {active
            ? 'text-primary border-primary'
            : 'text-muted-foreground hover:text-foreground hover:border-primary/70 border-transparent'}"
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <!-- Mobile hamburger -->
    <Sheet.Root bind:open={mobileMenuOpen}>
      <Sheet.Trigger>
        <Button
          variant="ghost"
          size="icon"
          class="text-foreground hover:bg-accent/20 hover:text-foreground shrink-0 md:hidden"
          aria-label="Open menu"
        >
          <Icon icon="ph:list" width="26" />
        </Button>
      </Sheet.Trigger>

      <Sheet.Content
        side="right"
        class="bg-card text-foreground flex w-72 flex-col
               border-none pt-(--nav-height) backdrop-blur-2xl"
      >
        <Separator class="bg-border/50 mb-2" />
        <nav class="flex flex-col gap-1 px-2">
          {#each navLinks as link (link.href)}
            {@const active = $page.url.pathname === link.href}
            <a
              href={resolve(link.href, {})}
              class="relative flex min-h-12 items-center gap-3 rounded-lg px-4 py-3 text-base
                     font-medium no-underline transition-all duration-200
                     {active
                ? 'bg-primary/15 text-primary ring-primary/40 ring-1'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/15'}"
              on:click={closeMobileMenu}
            >
              <Icon icon={link.icon} width="22" />
              {link.label}
            </a>
          {/each}
        </nav>
      </Sheet.Content>
    </Sheet.Root>
  </div>
</nav>

<style>
  /*
    mode-watcher adds .dark to <html> when in dark mode.
    Navbar uses semantic card/foreground tokens in both themes.
    Invert + hue-rotate keeps ring colours natural over the navbar background.
  */
  :global(.dark) .rings-animation {
    filter: invert(1) hue-rotate(180deg);
  }
</style>
