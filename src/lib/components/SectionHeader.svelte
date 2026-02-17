<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    intro?: string;
    emoji?: string;
    children?: Snippet;
  }

  let { title, intro, emoji, children }: Props = $props();
</script>

<div class="section-header">
  <h2 class="section-title">{emoji ? `${emoji} ${title} ${emoji}` : title}</h2>
  {#if intro}
    <p class="section-intro">{intro}</p>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>

<style>
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: 1rem;
    color: hsl(var(--primary));
    text-shadow: 0 2px 8px rgba(255, 255, 255, 0.8);
  }

  .section-intro {
    font-size: 1.2rem;
    color: var(--text-light);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }
</style>
