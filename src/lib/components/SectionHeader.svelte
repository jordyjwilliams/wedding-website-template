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
    class="mb-4 font-heading text-primary text-[clamp(2.2rem,5vw,3.8rem)]
           [text-shadow:0_2px_12px_rgba(255,255,255,0.7)]"
  >
    {emoji ? `${emoji} ${title} ${emoji}` : title}
  </h2>
  {#if intro}
    <p class="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
      {intro}
    </p>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>
