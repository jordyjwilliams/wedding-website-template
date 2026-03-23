<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import { weddingCalendarLink } from '$lib/calendar';
  import { WEDDING } from '$lib/constants';
  import { COPY } from '$lib/content';
  import CountdownTimer from '../CountdownTimer.svelte';

  function scrollToRSVP(): void {
    window.location.href = '/rsvp';
  }

  const heartPositions = ['15%', '35%', '55%', '75%', '25%', '85%'];
</script>

<!-- min-h-screen ensures full viewport height; top padding = nav + breathing room -->
<section
  class="3xl:pt-28 relative flex min-h-[calc(100vh-var(--nav-height))] animate-[fadeIn_1s_ease-out_0.1s_both] items-center
         justify-center overflow-hidden px-6
         pt-16 pb-16
         md:pt-20
         md:pb-24"
>
  <!-- Ambient gradient orbs -->
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>

    <!-- Floating hearts -->
    {#each heartPositions as left, i (i)}
      <span
        class="heart text-accent absolute opacity-0"
        style="left: {left}; bottom: -50px; --delay: {i * 1.5}s; --duration: {12 + i * 3}s;"
      >
        <Icon icon="ph:heart-fill" width="22" />
      </span>
    {/each}
  </div>

  <!-- Content -->
  <div class="3xl:max-w-5xl relative z-10 mx-auto max-w-4xl text-center">
    <!-- Eyebrow -->
    <p
      class="text-primary mb-6 animate-[fadeInDown_0.8s_ease-out_0.2s_both] text-base font-medium
             tracking-[0.2em]
             sm:text-lg"
    >
      {COPY.hero.eyebrow}
    </p>

    <!-- Couple names -->
    <h1
      class="font-heading text-foreground mb-8 text-[clamp(2.8rem,10vw,6rem)]
             leading-tight"
    >
      <span class="inline-block animate-[fadeInScale_0.8s_ease-out_0.4s_both]">
        {WEDDING.couple.groom}
      </span>
      <span
        class="text-primary mx-2 inline-block animate-[spinIn_0.8s_ease-out_0.6s_both] text-[0.8em]
               sm:mx-4"
      >
        &amp;
      </span>
      <span class="inline-block animate-[fadeInScale_0.8s_ease-out_0.8s_both]">
        {WEDDING.couple.bride}
      </span>
    </h1>

    <!-- Date & location -->
    <div
      class="mb-8 flex animate-[fadeInUp_0.8s_ease-out_1s_both] flex-col items-center
             gap-3"
    >
      <a
        href={weddingCalendarLink}
        target="_blank"
        rel="noopener noreferrer"
        class="text-secondary hover:bg-secondary/10 inline-flex items-center gap-2 rounded-xl px-4 py-2
               text-xl font-semibold no-underline transition-all
               duration-200 hover:-translate-y-0.5
               sm:text-2xl"
      >
        <Icon icon="ph:calendar-plus" width="22" class="text-primary" />
        {WEDDING.dates.displayFull}
      </a>
      <a
        href={WEDDING.venue.website}
        target="_blank"
        rel="noopener noreferrer"
        class="text-muted-foreground hover:bg-secondary/10 inline-flex items-center gap-2 rounded-xl px-4
               py-2 text-base no-underline transition-all
               duration-200 hover:-translate-y-0.5 sm:text-lg"
      >
        <Icon icon="ph:map-pin-fill" width="20" class="text-primary" />
        {WEDDING.venue.displayShort}
      </a>
    </div>

    <!-- Countdown -->
    <div class="mb-12 animate-[fadeInUp_0.8s_ease-out_1.1s_both]">
      <p class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
        {WEDDING.countdown.isNotPastTarget}
      </p>
      <CountdownTimer />
    </div>

    <!-- CTA -->
    <div class="animate-[fadeInUp_0.8s_ease-out_1.2s_both]">
      <Button
        variant="outline"
        size="lg"
        onclick={scrollToRSVP}
        class="rounded-full px-8 font-semibold tracking-wide"
      >
        {COPY.hero.cta}
      </Button>
    </div>
  </div>
</section>

<style>
  /* Keep only what can't be expressed cleanly in Tailwind */

  /* Gradient ambient orbs */
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.28;
    animation: floatOrb 28s infinite ease-in-out;
  }

  .orb-1 {
    width: clamp(400px, 50vw, 700px);
    height: clamp(400px, 50vw, 700px);
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
    top: -30%;
    right: -15%;
    animation-delay: 0s;
  }

  .orb-2 {
    width: clamp(320px, 40vw, 560px);
    height: clamp(320px, 40vw, 560px);
    background: linear-gradient(135deg, hsl(var(--secondary)), hsl(var(--primary)));
    bottom: -20%;
    left: -12%;
    animation-delay: 8s;
  }

  .orb-3 {
    width: clamp(260px, 30vw, 460px);
    height: clamp(260px, 30vw, 460px);
    background: linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary-dark)));
    top: 40%;
    left: 28%;
    animation-delay: 16s;
  }

  @keyframes floatOrb {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(40px, -40px) scale(1.08);
    }
    50% {
      transform: translate(-25px, 25px) scale(0.94);
    }
    75% {
      transform: translate(50px, 15px) scale(1.04);
    }
  }

  /* Floating heart animation */
  .heart {
    animation: floatUp var(--duration, 15s) infinite ease-in;
    animation-delay: var(--delay, 0s);
    color: hsl(var(--accent));
  }

  .heart :global(svg) {
    filter: drop-shadow(0 2px 4px hsl(var(--accent) / 0.3));
  }

  @keyframes floatUp {
    0% {
      bottom: -50px;
      opacity: 0;
      transform: translateX(0) rotate(0deg);
    }
    15% {
      opacity: 0.25;
    }
    85% {
      opacity: 0.18;
    }
    100% {
      bottom: 110%;
      opacity: 0;
      transform: translateX(55px) rotate(180deg);
    }
  }

  /* Named keyframes referenced in Tailwind arbitrary animate classes */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes spinIn {
    from {
      opacity: 0;
      transform: rotate(-180deg) scale(0.5);
    }
    to {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }
  }

  @media (max-width: 640px) {
    .orb {
      filter: blur(70px);
      opacity: 0.22;
    }
  }
</style>
