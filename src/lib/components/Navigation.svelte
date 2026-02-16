<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let mobileMenuOpen: boolean = false;
  let scrolled: boolean = false;

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 50;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function toggleMobileMenu(): void {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function closeMobileMenu(): void {
    mobileMenuOpen = false;
  }
</script>

<nav class="nav" class:scrolled>
  <div class="nav-container">
    <a href="/home" class="nav-brand"> Jordy & Nicole ✨ </a>

    <button
      class="hamburger"
      class:active={mobileMenuOpen}
      on:click={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="nav-menu" class:active={mobileMenuOpen}>
      <a
        href="/home"
        class="nav-link"
        class:active={$page.url.pathname === '/home'}
        on:click={closeMobileMenu}
      >
        Home
      </a>
      <a
        href="/wedding"
        class="nav-link"
        class:active={$page.url.pathname === '/wedding'}
        on:click={closeMobileMenu}
      >
        Wedding
      </a>
      <a
        href="/rsvp"
        class="nav-link"
        class:active={$page.url.pathname === '/rsvp'}
        on:click={closeMobileMenu}
      >
        RSVP
      </a>
    </div>
  </div>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .nav.scrolled {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 20px var(--shadow);
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
    color: var(--primary);
    text-decoration: none;
    letter-spacing: 0.5px;
    transition: var(--transition);
  }

  .nav-brand:hover {
    color: var(--primary-dark);
    transform: translateY(-1px);
  }

  .nav-menu {
    display: flex;
    gap: 2.5rem;
    align-items: center;
  }

  .nav-link {
    color: var(--text-dark);
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    letter-spacing: 0.3px;
    transition: var(--transition);
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
    background: var(--primary);
    transition: width 0.3s ease;
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    width: 100%;
  }

  .nav-link:hover {
    color: var(--primary);
  }

  .nav-link.active {
    color: var(--primary);
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
  }

  .hamburger span {
    width: 25px;
    height: 3px;
    background: var(--text-dark);
    transition: all 0.3s ease;
    border-radius: 3px;
  }

  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(7px, 7px);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
  }

  @media (max-width: 768px) {
    .hamburger {
      display: flex;
    }

    .nav-menu {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      flex-direction: column;
      background: var(--white);
      padding: 2rem;
      gap: 2rem;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      box-shadow: 0 10px 30px var(--shadow);
    }

    .nav-menu.active {
      transform: translateX(0);
      box-shadow: -5px 0 30px rgba(0, 0, 0, 0.2);
    }

    /* Mobile menu backdrop */
    .nav-menu.active::before {
      content: '';
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: -1;
      animation: fadeIn 0.3s ease-out;
    }

    .nav-link {
      font-size: 1.2rem;
    }
  }
</style>
