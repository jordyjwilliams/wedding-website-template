<script lang="ts">
  import { AnimatedSection, InlineLinks } from '$lib/components';
  import * as Card from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import Icon from '@iconify/svelte';

  export type StoryEntry = {
    title: string;
    icon?: string;
    imageSrc: string;
    imageAlt?: string;
    overview?: string;
    description?: string;
    bullets?: readonly string[];
  };

  interface Props {
    entries: Readonly<Record<string, StoryEntry>>;
  }

  let { entries }: Props = $props();

  const storyEntries = $derived(Object.values(entries));

  function toParagraphs(text?: string): string[] {
    if (!text) return [];
    return text
      .split('\n\n')
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }
</script>

<section class="py-10 md:py-14">
  <div class="container">
    <div class="mx-auto max-w-6xl space-y-6">
      {#each storyEntries as entry, index (entry.title)}
        {@const isEven = index % 2 === 0}
        <AnimatedSection class="py-1" threshold={0.14}>
          <Card.Root class="glass border-border/35 overflow-hidden rounded-3xl">
            <div class="grid grid-cols-1 gap-0 md:grid-cols-2">
              <div class={`relative min-h-56 md:min-h-full ${!isEven ? 'md:order-2' : ''}`}>
                <img
                  src={entry.imageSrc}
                  alt={entry.imageAlt ?? `${entry.title} story image`}
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <Card.Content class={`p-6 sm:p-7 ${!isEven ? 'md:order-1' : ''}`}>
                <div class="story-content-scroll pr-1 sm:pr-2">
                  <div class="mb-4 flex items-center gap-3">
                    {#if entry.icon}
                      <Icon icon={entry.icon} width={20} class="inline" />
                    {/if}
                    <h3
                      class="font-heading text-primary-dark text-2xl leading-tight sm:text-[2rem]"
                    >
                      {entry.title}
                    </h3>
                  </div>

                  {#if entry.overview}
                    <div class="space-y-3">
                      {#each toParagraphs(entry.overview) as paragraph, i (`overview-${i}`)}
                        <p class="text-foreground text-[1.02rem] leading-relaxed">
                          <InlineLinks text={paragraph} />
                        </p>
                      {/each}
                    </div>
                  {/if}

                  {#if entry.description}
                    <div class="mt-4 space-y-3">
                      {#each toParagraphs(entry.description) as paragraph, i (`description-${i}`)}
                        <p class="text-muted-foreground text-[0.98rem] leading-relaxed">
                          <InlineLinks text={paragraph} />
                        </p>
                      {/each}
                    </div>
                  {/if}

                  {#if entry.bullets && entry.bullets.length > 0}
                    <ul class="story-bullets mt-5 space-y-2.5">
                      {#each entry.bullets as bullet, i (`bullet-${i}`)}
                        <li><InlineLinks text={bullet} /></li>
                      {/each}
                    </ul>
                  {/if}
                </div>
              </Card.Content>
            </div>
          </Card.Root>
        </AnimatedSection>

        {#if index < storyEntries.length - 1}
          <Separator class="bg-border/45 mx-auto w-[92%]" />
        {/if}
      {/each}
    </div>
  </div>
</section>

<style>
  .story-content-scroll {
    max-height: min(58vh, 34rem);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, var(--color-primary) 40%, transparent)
      color-mix(in srgb, var(--color-muted) 45%, transparent);
  }

  .story-content-scroll::-webkit-scrollbar {
    width: 10px;
  }

  .story-content-scroll::-webkit-scrollbar-track {
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-muted) 58%, transparent);
  }

  .story-content-scroll::-webkit-scrollbar-thumb {
    border: 2px solid transparent;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-primary) 48%, transparent);
    background-clip: padding-box;
  }

  @media (max-width: 767px) {
    .story-content-scroll {
      max-height: none;
      overflow-y: visible;
    }
  }

  .story-bullets {
    list-style: none;
    padding-left: 0;
  }

  .story-bullets li {
    position: relative;
    padding-left: 1.75rem;
    color: var(--color-muted-foreground);
    line-height: 1.62;
    font-weight: 500;
  }

  .story-bullets li::before {
    content: '•';
    position: absolute;
    left: 0.25rem;
    color: var(--color-primary);
    font-size: 1.25rem;
    line-height: 1;
  }
</style>
