<script lang="ts">
  import { WEDDING } from '$lib/constants';
  import { getCountdownTimeLeft, type CountdownTimeLeft } from '$lib/utils';

  const ceremonyUtcMs = new Date(WEDDING.dates.ceremonyDateTime).getTime();
  if (Number.isNaN(ceremonyUtcMs)) {
    throw new Error(`Invalid ceremonyDateTime value: ${WEDDING.dates.ceremonyDateTime}`);
  }

  let mounted = $state(false);
  let isPast = $state(ceremonyUtcMs <= Date.now());
  let timeLeft = $state<CountdownTimeLeft>(getCountdownTimeLeft(ceremonyUtcMs));

  $effect(() => {
    mounted = true;

    if (isPast) return;

    const interval = setInterval(() => {
      timeLeft = getCountdownTimeLeft(ceremonyUtcMs);
      isPast = ceremonyUtcMs <= Date.now();
    }, 1000);

    return () => clearInterval(interval);
  });

  const units = [
    { key: 'days' as const, label: 'Days' },
    { key: 'hours' as const, label: 'Hours' },
    { key: 'minutes' as const, label: 'Mins' },
    { key: 'seconds' as const, label: 'Secs' },
  ];
</script>

{#if isPast}
  <p class="text-primary text-2xl">{WEDDING.countdown.isPastTarget}</p>
{:else if mounted}
  <div
    class="flex items-start justify-center gap-1"
    aria-label={WEDDING.countdown.isNotPastTarget}
    role="timer"
  >
    {#each units as unit, i (unit.key)}
      {#if i > 0}
        <span
          class="font-heading text-primary/50 px-0.5 pt-1 text-xl leading-none font-bold"
          aria-hidden="true"
        ></span>
      {/if}

      <div class="flex flex-col items-center">
        <!-- Glass card box matching the app's .glass utility -->
        <div
          class="glass text-primary flex h-10 w-16 items-center justify-center rounded-lg px-2.5 text-center"
        >
          <span
            class="font-mono text-[1.35rem] leading-none font-bold whitespace-nowrap tabular-nums [font-variant-numeric:tabular-nums_lining-nums]"
          >
            {String(timeLeft[unit.key]).padStart(2, '0')}
          </span>
        </div>
        <!-- Badge-style label using app token classes -->
        <span
          class="text-muted-foreground mt-1.5 text-[0.6rem] font-semibold tracking-widest uppercase"
        >
          {unit.label}
        </span>
      </div>
    {/each}
  </div>
{/if}
