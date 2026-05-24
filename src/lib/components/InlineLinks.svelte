<script lang="ts">
  import { parseInlineLinks, isExternalLink } from '$lib/utils.js';
  import { COPY } from '$lib/content';
  import TooltipItem from '$lib/components/TooltipItem.svelte';

  interface Props {
    text: string;
    class?: string;
    externalLinksNewTab?: boolean;
  }

  let { text, class: className = '', externalLinksNewTab = true }: Props = $props();

  function getTooltipKey(href: string): string | null {
    return href.startsWith('tooltip:') ? href.slice('tooltip:'.length) : null;
  }

  function resolveTooltipText(token: string): string {
    const configured = (COPY.inlineTooltips as Record<string, string>)[token];
    if (configured) return configured;

    // Allow inline tooltip copy directly in markdown links, e.g.
    // [text](tooltip:Jordy%20now%20homebrews)
    try {
      return decodeURIComponent(token.replace(/\+/g, ' '));
    } catch {
      return token;
    }
  }
</script>

<span class={className}>
  {#each parseInlineLinks(text) as segment, i (i)}
    {#if segment.href}
      {@const tooltipKey = getTooltipKey(segment.href)}
      {#if tooltipKey}
        {@const tooltipText = resolveTooltipText(tooltipKey) || 'More details coming soon.'}
        <TooltipItem triggerText={segment.text} {tooltipText} />
      {:else}
        {@const isExternal = isExternalLink(segment.href)}
        <a
          href={segment.href}
          class="inline-link"
          target={externalLinksNewTab && isExternal ? '_blank' : undefined}
          rel={externalLinksNewTab && isExternal ? 'noopener noreferrer' : undefined}
        >
          {segment.text}
        </a>
      {/if}
    {:else if segment.bold}<strong>{segment.text}</strong>{:else}{segment.text}{/if}
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
