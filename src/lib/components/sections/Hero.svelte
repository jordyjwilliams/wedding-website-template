<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import { AnimatedSection } from '$lib/components';
  import { weddingCalendarLink } from '$lib/calendar';
  import { WEDDING } from '$lib/constants';
  import { COPY } from '$lib/content';
  import CountdownTimer from '$lib/components/CountdownTimer.svelte';
</script>

<!-- min-h-screen ensures full viewport height; top padding = nav + breathing room -->
<AnimatedSection
  class="3xl:pt-28 relative flex min-h-[calc(100vh-var(--nav-height))] items-center
         justify-center overflow-hidden px-6
         pt-16 pb-16
         md:pt-20
         md:pb-24"
>
  <!-- Content -->
  <div class="3xl:max-w-5xl relative z-10 mx-auto max-w-4xl text-center">
    <!-- Couple names -->
    <h1
      class="text-foreground font-heading-1 mb-8 text-[clamp(2.8rem,10vw,6rem)]
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
</AnimatedSection>
