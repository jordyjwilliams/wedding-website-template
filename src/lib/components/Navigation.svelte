<script lang="ts">
  import { resolve } from '$app/paths';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import * as Sheet from '$lib/components/ui/sheet';
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import Icon from '@iconify/svelte';
  import SunIcon from '@lucide/svelte/icons/sun';
  import MoonIcon from '@lucide/svelte/icons/moon';
  import { toggleMode } from 'mode-watcher';
  import { COPY } from '$lib/content';

  let mobileMenuOpen: boolean = false;
  let scrolled: boolean = false;

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
  can use pt-[var(--nav-height)] to avoid overlap.
-->
<nav
  class="fixed inset-x-0 top-0 z-50 h-(--nav-height) transition-all duration-300
         {scrolled
    ? 'bg-foreground/60 backdrop-blur-xl shadow-glass'
    : 'bg-foreground/85 backdrop-blur-md'}"
>
  <div
    class="mx-auto flex h-full max-w-7xl items-center gap-4 px-6 text-background
           3xl:max-w-[100rem]"
  >
    <!-- Left: brand + theme toggle -->
    <div class="flex shrink-0 items-center gap-2">
      <!-- Theme toggle -->
      <Button
        onclick={toggleMode}
        variant="ghost"
        size="icon"
        class="relative shrink-0 overflow-hidden text-background
               hover:bg-background/10 hover:text-background"
      >
        <SunIcon
          class="h-5 w-5 transition-all duration-300
                 rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
        />
        <MoonIcon
          class="absolute inset-0 m-auto h-5 w-5 transition-all duration-300
                 rotate-90 scale-0 dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>

      <!-- Brand -->
      <a
        href={resolve('/', {})}
        class="font-heading text-[1.6rem] font-semibold tracking-wide no-underline
               transition-transform duration-200 hover:-translate-y-px"
      >
        {COPY.nav.brand}
      </a>
    </div>

    <!-- Spacer -->
    <div class="flex-1"></div>

    <!-- Desktop links (right) -->
    <nav class="hidden items-center gap-8 md:flex">
      {#each navLinks as link (link.href)}
        {@const active = $page.url.pathname === link.href}
        <a
          href={resolve(link.href, {})}
          class="relative py-1 text-sm font-medium tracking-wide no-underline transition-colors
                 duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5
                 after:bg-secondary after:transition-all after:duration-300
                 hover:text-secondary
                 {active
            ? 'text-secondary after:w-full'
            : 'text-background/90 after:w-0 hover:after:w-full'}"
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
          class="shrink-0 text-background hover:bg-background/10 hover:text-background md:hidden"
          aria-label="Open menu"
        >
          <Icon icon="ph:list" width="26" />
        </Button>
      </Sheet.Trigger>

      <Sheet.Content
        side="right"
        class="flex w-72 flex-col border-none pt-(--nav-height)
               bg-foreground/90 text-background backdrop-blur-2xl"
      >
        <Separator class="mb-2 bg-background/20" />
        <nav class="flex flex-col gap-1 px-2">
          {#each navLinks as link (link.href)}
            {@const active = $page.url.pathname === link.href}
            <a
              href={resolve(link.href, {})}
              class="flex min-h-12 items-center gap-3 rounded-lg px-4 py-3 text-base
                     font-medium no-underline transition-all duration-200
                     {active
                ? 'bg-background/15 text-background'
                : 'text-background/80 hover:bg-background/10 hover:text-background'}"
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
