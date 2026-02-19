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

  let mobileMenuOpen: boolean = false;
  let scrolled: boolean = false;

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function closeMobileMenu(): void {
    mobileMenuOpen = false;
  }
</script>

<nav class="nav" class:scrolled>
  <div class="nav-container">
    <Button onclick={toggleMode} variant="outline" size="icon">
      <SunIcon
        class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
      />
      <MoonIcon
        class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>
    <a href={resolve('/')} class="nav-brand"> Jordy & Nicole ✨ </a>

    <!-- Desktop Menu -->
    <div class="desktop-menu">
      <a href={resolve('/')} class="nav-link" class:active={$page.url.pathname === '/'}> Home </a>
      <a
        href={resolve('/wedding')}
        class="nav-link"
        class:active={$page.url.pathname === '/wedding'}
      >
        Wedding
      </a>
      <a href={resolve('/rsvp')} class="nav-link" class:active={$page.url.pathname === '/rsvp'}>
        RSVP
      </a>
    </div>

    <!-- Mobile Menu Toggle -->
    <Sheet.Root bind:open={mobileMenuOpen}>
      <Sheet.Trigger>
        <Button variant="ghost" size="icon" class="mobile-menu-button md:hidden">
          <Icon icon="ph:list" width="24" />
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="right" class="w-[300px]">
        <Sheet.Header>
          <Sheet.Title class="font-heading text-2xl">Menu</Sheet.Title>
        </Sheet.Header>
        <Separator class="my-4" />
        <div class="mobile-menu">
          <a
            href={resolve('/')}
            class="mobile-nav-link"
            class:active={$page.url.pathname === '/'}
            on:click={closeMobileMenu}
          >
            <Icon icon="ph:house-fill" width="20" />
            Home
          </a>
          <a
            href={resolve('/wedding')}
            class="mobile-nav-link"
            class:active={$page.url.pathname === '/wedding'}
            on:click={closeMobileMenu}
          >
            <Icon icon="ph:heart-fill" width="20" />
            Wedding
          </a>
          <a
            href={resolve('/rsvp')}
            class="mobile-nav-link"
            class:active={$page.url.pathname === '/rsvp'}
            on:click={closeMobileMenu}
          >
            <Icon icon="ph:envelope-fill" width="20" />
            RSVP
          </a>
        </div>
      </Sheet.Content>
    </Sheet.Root>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: hsl(var(--background) / 0.8);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  :global(.dark) .nav {
    border-bottom: 1px solid hsl(var(--border) / 0.3);
  }

  .nav.scrolled {
    background: hsl(var(--background) / 0.95);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }

  :global(.dark) .nav.scrolled {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.2rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-brand {
    font-family: var(--font-heading);
    font-size: 1.8rem;
    font-weight: 600;
    color: hsl(var(--primary));
    text-decoration: none;
    letter-spacing: 0.5px;
    transition: all 0.2s ease;
  }

  .nav-brand:hover {
    transform: translateY(-1px);
  }

  .desktop-menu {
    display: flex;
    gap: 2.5rem;
    align-items: center;
  }

  .nav-link {
    color: hsl(var(--foreground));
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    letter-spacing: 0.3px;
    transition: all 0.2s ease;
    position: relative;
    padding: 0.5rem 0;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: hsl(var(--primary));
    transition: width 0.3s ease;
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    width: 100%;
  }

  .nav-link:hover {
    color: hsl(var(--primary));
  }

  .nav-link.active {
    color: hsl(var(--primary));
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .mobile-nav-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    color: hsl(var(--foreground));
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .mobile-nav-link:hover {
    background: hsl(var(--muted));
    color: hsl(var(--primary));
  }

  .mobile-nav-link.active {
    background: hsl(var(--primary) / 0.1);
    color: hsl(var(--primary));
  }

  @media (max-width: 768px) {
    .desktop-menu {
      display: none;
    }
  }
</style>
