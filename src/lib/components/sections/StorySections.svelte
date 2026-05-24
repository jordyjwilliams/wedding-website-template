<script lang="ts">
  import { scrollToHash, useHashNavigation } from '$lib/utils';
  import { AnimatedSection, RichTextContent } from '$lib/components';
  import * as Card from '$lib/components/ui/card';
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
    title?: string;
  }

  let { entries, title }: Props = $props();

  // Use entries() to preserve keys for use as anchor IDs
  const storyEntries = $derived(Object.entries(entries));

  useHashNavigation(scrollToHash);
</script>

<section class="py-10 md:py-14">
  <div class="container">
    {#if title}
      <h2
        class="font-heading-2 text-primary-dark animate-fade-in-up mx-auto mb-10 max-w-5xl text-2xl tracking-wide"
      >
        {title}
      </h2>
    {/if}
    <div class="mx-auto max-w-5xl space-y-8">
      {#each storyEntries as [key, entry], index (entry.title)}
        {@const imageRight = index % 2 !== 0}
        <AnimatedSection
          id={key}
          threshold={0.12}
          delay="{index * 0.08}s"
          animation={imageRight ? 'left' : 'right'}
        >
          <Card.Root class="glass border-border/35 overflow-hidden rounded-3xl">
            <div class="grid grid-cols-1 md:grid-cols-2">
              <!-- Image -->
              <div class={`relative min-h-64 overflow-hidden ${imageRight ? 'md:order-2' : ''}`}>
                <img
                  src={entry.imageSrc}
                  alt={entry.imageAlt ?? `${entry.title} story image`}
                  class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              <!-- Text -->
              <Card.Content
                class={`flex flex-col justify-center p-6 sm:p-8 ${imageRight ? 'md:order-1' : ''}`}
              >
                <div class="mb-4 flex items-center gap-3">
                  {#if entry.icon}
                    <Icon icon={entry.icon} width={20} class="text-primary shrink-0" />
                  {/if}
                  <h3 class="font-heading text-primary-dark text-2xl leading-tight">
                    {entry.title}
                  </h3>
                </div>

                <RichTextContent
                  text={entry.overview}
                  paragraphClass="text-foreground text-base leading-relaxed"
                />

                <RichTextContent
                  class={entry.overview ? 'mt-4' : ''}
                  text={entry.description}
                  bullets={entry.bullets ?? []}
                  paragraphClass="text-muted-foreground text-sm leading-relaxed"
                  bulletsClass="mt-4"
                />
              </Card.Content>
            </div>
          </Card.Root>
        </AnimatedSection>
      {/each}
    </div>
  </div>
</section>
