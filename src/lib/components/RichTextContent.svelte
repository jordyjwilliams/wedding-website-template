<script lang="ts">
  import InlineLinks from '$lib/components/InlineLinks.svelte';

  interface Props {
    text?: string;
    bullets?: readonly string[];
    class?: string;
    paragraphClass?: string;
    bulletsClass?: string;
  }

  let {
    text,
    bullets = [],
    class: className = '',
    paragraphClass = 'text-muted-foreground leading-relaxed',
    bulletsClass = 'mt-4',
  }: Props = $props();

  const paragraphs = $derived.by(() => {
    if (!text) return [] as string[];

    return text
      .split('\n\n')
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  });
</script>

<div class={className}>
  {#if paragraphs.length > 0}
    <div class="space-y-3">
      {#each paragraphs as paragraph, i (`paragraph-${i}`)}
        <p class={paragraphClass}>
          <InlineLinks text={paragraph} />
        </p>
      {/each}
    </div>
  {/if}

  {#if bullets.length > 0}
    <ul class={`rich-bullets space-y-2.5 ${bulletsClass}`}>
      {#each bullets as bullet, i (`bullet-${i}`)}
        <li><InlineLinks text={bullet} /></li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .rich-bullets {
    list-style: none;
    padding-left: 0;
  }

  .rich-bullets li {
    position: relative;
    padding-left: 1.75rem;
    color: var(--color-muted-foreground);
    line-height: 1.6;
    font-weight: 500;
  }

  .rich-bullets li::before {
    content: '•';
    position: absolute;
    left: 0.25rem;
    color: var(--color-primary);
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1;
  }
</style>
