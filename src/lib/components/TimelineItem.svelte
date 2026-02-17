<script lang="ts">
  import Icon from '@iconify/svelte';
  import GlassCard from '$lib/components/ui/card/GlassCard.svelte';
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
    highlights?: Snippet;
  }

  let {
    dayNumber,
    title,
    date,
    dateHref,
    description,
    delay = '0s',
    isHighlight = false,
    highlights,
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
    {#if highlights}
      <div class="timeline-highlights">
        {@render highlights()}
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

  @keyframes fadeInSlide {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .timeline-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;
    background: var(--white);
    border: 3px solid var(--primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    box-shadow: 0 5px 20px var(--shadow);
    z-index: 10;
  }

  .timeline-icon.highlight {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    border-color: var(--primary-dark);
    color: var(--white);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      box-shadow: 0 5px 20px var(--shadow);
    }
    50% {
      box-shadow: 0 5px 30px rgba(212, 165, 116, 0.6);
    }
  }

  h3 {
    font-size: 1.8rem;
    color: var(--text-dark);
    margin-bottom: 0.5rem;
  }

  .timeline-date {
    color: var(--primary);
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
    background: rgba(122, 184, 212, 0.1);
  }

  .timeline-date :global(svg) {
    color: var(--accent);
    filter: drop-shadow(0 2px 4px rgba(122, 184, 212, 0.3));
    transition: transform 0.3s ease;
  }

  a.timeline-date:hover {
    background: rgba(122, 184, 212, 0.2);
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
    color: var(--text-light);
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
