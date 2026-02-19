<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    badge: Snippet;
    label: string;
    value: string;
    href?: string;
  }

  let { badge, label, value, href, class: className, ...restProps }: Props = $props();
</script>

{#if href}
  <a {href} target="_blank" rel="noopener noreferrer" class="detail-link">
    <div class="detail-card detail-card-clickable {className || ''}" {...restProps}>
      <Card.Root>
        <Card.Content class="flex items-center gap-4 p-5">
          {@render badge()}
          <div>
            <p class="detail-label">{label}</p>
            <p class="detail-value">{value}</p>
          </div>
        </Card.Content>
      </Card.Root>
    </div>
  </a>
{:else}
  <div class="detail-card {className || ''}" {...restProps}>
    <Card.Root>
      <Card.Content class="flex items-center gap-4 p-5">
        {@render badge()}
        <div>
          <p class="detail-label">{label}</p>
          <p class="detail-value">{value}</p>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
{/if}

<style>
  .detail-link {
    text-decoration: none;
    color: inherit;
  }

  .detail-card {
    min-width: 220px;
    transition: transform 0.3s ease;
  }

  .detail-card:hover {
    transform: translateY(-5px);
  }

  .detail-card-clickable:hover {
    background: linear-gradient(135deg, rgba(122, 184, 212, 0.05), rgba(212, 165, 116, 0.05));
  }

  .detail-label {
    font-size: 0.85rem;
    color: hsl(var(--text-light));
    margin-bottom: 0.2rem;
  }

  .detail-value {
    font-weight: 600;
    color: hsl(var(--text-dark));
    font-size: 1rem;
  }

  @media (max-width: 640px) {
    .detail-card {
      min-width: auto;
    }
  }
</style>
