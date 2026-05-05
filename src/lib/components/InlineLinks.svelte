<script lang="ts">
  import { parseInlineLinks, isExternalLink } from '$lib/utils.js';

  interface Props {
    text: string;
    class?: string;
    externalLinksNewTab?: boolean;
  }

  let { text, class: className = '', externalLinksNewTab = true }: Props = $props();
</script>

<span class={className}>
  {#each parseInlineLinks(text) as segment, i (i)}
    {#if segment.href}
      {@const isExternal = isExternalLink(segment.href)}
      <a
        href={segment.href}
        class="inline-link"
        target={externalLinksNewTab && isExternal ? '_blank' : undefined}
        rel={externalLinksNewTab && isExternal ? 'noopener noreferrer' : undefined}
      >
        {segment.text}
      </a>
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
