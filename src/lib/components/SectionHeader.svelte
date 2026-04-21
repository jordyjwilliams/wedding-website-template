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

<div class="mb-16 text-center">
  <h2
    class="text-primary font-heading-1 mb-4 text-[clamp(2.2rem,5vw,3.8rem)]
           [text-shadow:0_2px_12px_rgba(255,255,255,0.7)]
           dark:[text-shadow:0_1px_6px_rgba(255,255,255,0.28)]"
  >
    {emoji ? `${emoji} ${title} ${emoji}` : title}
  </h2>
  {#if intro}
    <p class="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
      {intro}
    </p>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>
