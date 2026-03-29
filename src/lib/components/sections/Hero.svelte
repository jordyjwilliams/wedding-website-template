<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import { weddingCalendarLink } from '$lib/calendar';
  import { WEDDING } from '$lib/constants';
  import { COPY } from '$lib/content';
  import CountdownTimer from '../CountdownTimer.svelte';

  const heartPositions = ['15%', '35%', '55%', '75%', '25%', '85%'];
</script>

<!-- min-h-screen ensures full viewport height; top padding = nav + breathing room -->
<section
  class="3xl:pt-28 animate-fade-in relative flex min-h-[calc(100vh-var(--nav-height))] items-center
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
        class="heart absolute opacity-0"
        style="left: {left}; top: 100%; animation: floatUp {12 + i * 3}s ease-in {i *
          1.5}s infinite;"
      >
        <Icon icon="ph:heart-fill" width="22" />
      </span>
    {/each}
  </div>

  <!-- Content -->
  <div class="3xl:max-w-5xl relative z-10 mx-auto max-w-4xl text-center">
    <!-- Couple names -->
    <h1
      class="font-heading text-foreground mb-8 text-[clamp(2.8rem,10vw,6rem)]
             leading-tight"
    >
      <span class="animate-fade-in-scale inline-block [animation-delay:0.4s]">
        {WEDDING.couple.bride}
      </span>
      <span
        class="text-primary animate-spin-in mx-2 inline-block text-[0.8em] [animation-delay:0.6s]
               sm:mx-4"
      >
        &amp;
      </span>
      <span class="animate-fade-in-scale inline-block [animation-delay:0.8s]">
        {WEDDING.couple.groom}
      </span>
    </h1>

    <!-- Eyebrow -->
    <p
      class="text-foreground animate-fade-in-down mb-6 text-base font-medium tracking-[0.2em]
             [animation-delay:0.2s]
             sm:text-lg"
    >
      {COPY.hero.eyebrow}
    </p>

    <!-- Date & location -->
    <div
      class="animate-fade-in-up mb-8 flex flex-col items-center gap-3
             [animation-delay:1s]"
    >
      <a
        href={weddingCalendarLink}
        target="_blank"
        rel="noopener noreferrer"
        class="text-foreground hover:bg-secondary/10 inline-flex items-center gap-2 rounded-xl px-4 py-2
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
        class="text-primary hover:bg-secondary/10 inline-flex items-center gap-2 rounded-xl px-4
               py-2 text-base no-underline transition-all
               duration-200 hover:-translate-y-0.5 sm:text-lg"
      >
        <Icon icon="ph:map-pin-fill" width="20" class="text-primary" />
        {WEDDING.venue.displayShort}
      </a>
    </div>

    <!-- Countdown -->
    <div class="animate-fade-in-up mb-12 [animation-delay:1.1s]">
      <p class="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
        {WEDDING.countdown.isNotPastTarget}
      </p>
      <CountdownTimer />
    </div>

    <!-- CTA: RSVP -->
    <div class="animate-fade-in-up [animation-delay:1.2s]">
      <Button
        variant="glass"
        size="lg"
        href="/rsvp"
        class="rounded-full px-8 font-semibold tracking-wide"
      >
        {COPY.hero.ctaButton}
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
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
    top: -30%;
    right: -15%;
    animation-delay: 0s;
  }

  .orb-2 {
    width: clamp(320px, 40vw, 560px);
    height: clamp(320px, 40vw, 560px);
    background: linear-gradient(135deg, var(--color-secondary), var(--color-primary));
    bottom: -20%;
    left: -12%;
    animation-delay: 8s;
  }

  .orb-3 {
    width: clamp(260px, 30vw, 460px);
    height: clamp(260px, 30vw, 460px);
    background: linear-gradient(135deg, var(--color-accent), var(--color-primary-dark));
    top: 40%;
    left: 28%;
    animation-delay: 16s;
  }

  /* Floating heart animation — floatUp keyframe lives in app.css */
  .heart {
    color: var(--color-primary);
    will-change: transform, opacity;
    z-index: 2;
  }

  .heart :global(svg) {
    filter: drop-shadow(0 0 8px color-mix(in srgb, var(--color-primary) 45%, transparent))
      drop-shadow(0 0 18px color-mix(in srgb, var(--color-accent) 35%, transparent));
  }

  @media (max-width: 640px) {
    .orb {
      filter: blur(70px);
      opacity: 0.22;
    }
  }
</style>
