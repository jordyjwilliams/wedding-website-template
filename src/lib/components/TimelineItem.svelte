<script lang="ts">
  import Icon from '@iconify/svelte';
  import { GlassCard } from '$lib/components/ui/card';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    dayNumber: number;
    title: string;
    date: string;
    dateHref?: string;
    description: string;
    delay?: string;
    isHighlight?: boolean;
    _highlights?: Snippet;
  }

  let {
    dayNumber,
    title,
    date,
    dateHref,
    description,
    delay = '0s',
    isHighlight = false,
    _highlights,
    class: className,
    ...restProps
  }: Props = $props();
</script>

<div class="timeline-item {className || ''}" style="--delay: {delay}" {...restProps}>
  <div class="timeline-icon" class:highlight={isHighlight}>
    <span>{dayNumber}</span>
  </div>
  <GlassCard glass="heavy" class="p-8">
    <h3>{title}</h3>
    {#if dateHref}
      <a href={dateHref} target="_blank" rel="noopener noreferrer" class="timeline-date">
        <Icon icon="ph:calendar-plus" width="18" inline />
        {date}
      </a>
    {:else}
      <p class="timeline-date">
        <Icon icon="ph:calendar-plus" width="18" inline />
        {date}
      </p>
    {/if}
    <p>{description}</p>
    {#if _highlights}
      <div class="timeline-highlights">
        {@render _highlights()}
      </div>
    {/if}
  </GlassCard>
</div>

<style>
  .timeline-item {
    position: relative;
    padding-left: 90px;
    margin-bottom: 4rem;
    opacity: 0;
    transform: translateX(-20px);
    animation: fadeInSlide 0.8s ease-out var(--delay, 0s) forwards;
  }

  .timeline-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;
    background: var(--color-card);
    border: 3px solid var(--color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-primary);
    box-shadow: 0 5px 20px color-mix(in srgb, var(--color-primary) 35%, transparent);
    z-index: 10;
  }

  .timeline-icon.highlight {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
    border-color: var(--color-primary-dark);
    color: var(--color-primary-foreground);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      box-shadow: 0 5px 20px color-mix(in srgb, var(--color-primary) 35%, transparent);
    }
    50% {
      box-shadow: 0 5px 30px color-mix(in srgb, var(--color-accent) 60%, transparent);
    }
  }

  h3 {
    font-size: 1.8rem;
    color: var(--color-foreground);
    margin-bottom: 0.5rem;
  }

  .timeline-date {
    color: var(--color-primary);
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
  }

  .timeline-date :global(svg) {
    color: var(--color-accent);
    filter: drop-shadow(0 2px 4px color-mix(in srgb, var(--color-accent) 30%, transparent));
    transition: transform 0.3s ease;
  }

  a.timeline-date:hover {
    background: color-mix(in srgb, var(--color-accent) 20%, transparent);
    transform: translateY(-2px);
  }

  a.timeline-date:hover :global(svg) {
    transform: scale(1.1);
    animation: svgPulse 1s infinite;
  }

  @keyframes svgPulse {
    0%,
    100% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  p {
    color: var(--color-muted-foreground);
    line-height: 1.7;
  }

  .timeline-highlights {
    margin-top: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  @media (max-width: 768px) {
    .timeline-item {
      padding-left: 70px;
    }

    .timeline-icon {
      width: 50px;
      height: 50px;
      font-size: 1.2rem;
    }

    .timeline-highlights {
      flex-direction: column;
    }
  }
</style>
