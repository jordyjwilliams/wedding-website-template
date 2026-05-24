<script lang="ts">
  import type { Snippet } from 'svelte';

  import { cn } from '$lib/utils';
  import { RichTextContent } from '$lib/components';

  interface Props {
    title: string;
    intro?: string;
    eyebrow?: string;
    emoji?: string;
    children?: Snippet;
    class?: string;
    titleClass?: string;
    eyebrowClass?: string;
    introClass?: string;
    introParagraphClass?: string;
  }

  let {
    title,
    intro,
    eyebrow,
    emoji,
    children,
    class: className = 'mb-16 text-center',
    titleClass = '',
    eyebrowClass = 'text-muted-foreground mb-2 text-base font-medium tracking-wide',
    introClass = 'font-heading-2 text-primary-dark mx-auto max-w-2xl text-lg leading-relaxed italic',
    introParagraphClass = 'text-primary-dark text-base leading-[1.8]',
  }: Props = $props();
</script>

<div class={className}>
  <h2
    class={cn(
      'text-primary font-heading-1 text-section-title animate-fade-in-up mb-4 [animation-delay:0.1s] [text-shadow:0_2px_12px_rgba(255,255,255,0.7)] dark:[text-shadow:0_1px_6px_rgba(255,255,255,0.28)]',
      titleClass
    )}
  >
    {emoji ? `${emoji} ${title} ${emoji}` : title}
  </h2>
  {#if eyebrow}
    <p class={cn('animate-fade-in-up [animation-delay:0.2s]', eyebrowClass)}>{eyebrow}</p>
  {/if}
  {#if intro}
    <RichTextContent
      text={intro}
      class={cn('animate-fade-in-up [animation-delay:0.3s]', introClass)}
      paragraphClass={introParagraphClass}
    />
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>
