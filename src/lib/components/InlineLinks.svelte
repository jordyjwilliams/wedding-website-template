<script lang="ts">
  import { parseInlineLinks } from '$lib/utils';

  let { text, class: className = '' }: { text: string; class?: string } = $props();
</script>

<span class={className}>
  {#each parseInlineLinks(text) as segment, i (i)}
    {#if segment.href}
      <a href={segment.href} class="inline-link">{segment.text}</a>
    {:else}
      {segment.text}
    {/if}
  {/each}
</span>

<style>
  .inline-link {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 0.14em;
    text-decoration-thickness: 1.5px;
    transition: opacity 0.2s ease;
  }

  .inline-link:hover {
    opacity: 0.78;
  }
</style>
