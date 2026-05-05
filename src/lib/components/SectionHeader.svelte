<script lang="ts">
  import type { Snippet } from 'svelte';

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
    titleAnimationClass?: string;
    eyebrowAnimationClass?: string;
    introAnimationClass?: string;
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
    introParagraphClass = 'text-primary-dark text-[1.1rem] leading-[1.8]',
    titleAnimationClass = 'animate-fade-in-up [animation-delay:0.1s]',
    eyebrowAnimationClass = 'animate-fade-in-up [animation-delay:0.2s]',
    introAnimationClass = 'animate-fade-in-up [animation-delay:0.3s]',
  }: Props = $props();
</script>

<div class={className}>
  <h2
    class="text-primary font-heading-1 mb-4 text-[clamp(2.2rem,5vw,3.8rem)]
           [text-shadow:0_2px_12px_rgba(255,255,255,0.7)]
           dark:[text-shadow:0_1px_6px_rgba(255,255,255,0.28)] {titleAnimationClass} {titleClass}"
  >
    {emoji ? `${emoji} ${title} ${emoji}` : title}
  </h2>
  {#if eyebrow}
    <p class={`${eyebrowAnimationClass} ${eyebrowClass}`}>{eyebrow}</p>
  {/if}
  {#if intro}
    <RichTextContent
      text={intro}
      class={`${introAnimationClass} ${introClass}`}
      paragraphClass={introParagraphClass}
    />
  {/if}
  {#if children}
    {@render children()}
  {/if}
</div>
