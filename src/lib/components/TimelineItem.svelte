<script lang="ts">
  import Icon from '@iconify/svelte';
  import * as Card from '$lib/components/ui/card';
  import RichTextContent from '$lib/components/RichTextContent.svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    dayLabel: string;
    title: string;
    date: string;
    dateHref?: string;
    description: string;
    bullets?: readonly string[];
    delay?: string;
    isHighlight?: boolean;
    _highlights?: Snippet;
  }

  let {
    dayLabel,
    title,
    date,
    dateHref,
    description,
    bullets = [],
    delay = '0s',
    isHighlight = false,
    _highlights,
    class: className,
    ...restProps
  }: Props = $props();
</script>

<div class="timeline-item {className || ''}" style="--delay: {delay}" {...restProps}>
  <div class="timeline-icon font-heading-1" class:highlight={isHighlight}>
    <span>{dayLabel}</span>
  </div>
  <Card.Root class="glass rounded-3xl p-8">
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
    <RichTextContent text={description} {bullets} class="mt-1" />
    {#if isHighlight && _highlights}
      <div class="timeline-highlights">
        {@render _highlights()}
      </div>
    {/if}
  </Card.Root>
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
    top: -0.95rem;
    min-width: 60px;
    height: 40px;
    padding: 0 0.85rem;
    background: var(--color-card);
    border: 3px solid var(--color-primary);
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.06rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
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
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  @media (max-width: 768px) {
    .timeline-item {
      padding-left: 70px;
    }

    .timeline-icon {
      min-width: 52px;
      height: 36px;
      padding: 0 0.7rem;
      font-size: 0.78rem;
    }
  }
</style>
