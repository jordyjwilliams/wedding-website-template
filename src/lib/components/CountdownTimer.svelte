<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { WEDDING } from '$lib/constants';

  // Parse in local time to avoid UTC off-by-one issues
  const ceremonyDate = new Date(WEDDING.dates.ceremony + 'T00:00:00');

  interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  function getTimeLeft(): TimeLeft {
    const diff = ceremonyDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1000),
    };
  }

  const isPast = ceremonyDate.getTime() <= Date.now();

  let mounted = $state(false);
  let timeLeft = $state(getTimeLeft());
  let interval: ReturnType<typeof setInterval> | undefined;

  onMount(() => {
    mounted = true;
    if (!isPast) {
      interval = setInterval(() => {
        timeLeft = getTimeLeft();
      }, 1000);
    }
  });

  onDestroy(() => {
    if (interval) clearInterval(interval);
  });

  const units = [
    { key: 'days' as const, label: 'Days' },
    { key: 'hours' as const, label: 'Hours' },
    { key: 'minutes' as const, label: 'Mins' },
    { key: 'seconds' as const, label: 'Secs' },
  ];
</script>

{#if !mounted}
  <div class="flex items-start justify-center gap-1">
    {#each units as _, i (i)}
      {#if i > 0}
        <div class="text-primary/40 font-heading px-0.5 pt-1 text-xl font-bold">:</div>
      {/if}
      <div class="flex flex-col items-center gap-1.5">
        <div class="bg-muted/70 h-10 w-[3.25rem] rounded-lg"></div>
        <div class="bg-muted/50 h-2 w-8 rounded"></div>
      </div>
    {/each}
  </div>
{:else if isPast}
  <p class="font-script text-primary text-2xl">{WEDDING.countdown.isPastTarget}</p>
{:else}
  <div
    class="flex items-start justify-center gap-1"
    aria-label={WEDDING.countdown.isNotPastTarget}
    role="timer"
  >
    {#each units as unit, i (unit.key)}
      {#if i > 0}
        <span
          class="font-heading text-primary/50 px-0.5 pt-1 text-xl leading-none font-bold"
          aria-hidden="true"></span
        >
      {/if}

      <div class="flex flex-col items-center">
        <!-- Glass card box matching the app's .glass utility -->
        <div
          class="glass font-heading text-primary min-w-[3.25rem] rounded-lg px-2.5
                 py-2 text-center text-[clamp(1.1rem,3vw,1.6rem)] leading-none font-bold
                 tabular-nums"
        >
          {String(timeLeft[unit.key]).padStart(2, '0')}
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
