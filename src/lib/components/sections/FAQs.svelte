<script lang="ts">
  import { SectionHeader, AnimatedSection } from '$lib/components';
  import * as Accordion from '$lib/components/ui/accordion';
  import { Button } from '$lib/components/ui/button';
  import ContactUs from '$lib/components/ContactUs.svelte';
  import Icon from '@iconify/svelte';
  import { COPY } from '$lib/content';

  const questionDataKeys = Object.keys(COPY.faq.questionData) as Array<
    keyof typeof COPY.faq.questionData
  >;

  let openItems = $state<string[]>([]);

  const allOpen = $derived(openItems.length === questionDataKeys.length);
  const anyOpen = $derived(openItems.length > 0);

  function expandAll() {
    openItems = questionDataKeys.map((key) => `faq-${String(key)}`);
  }

  function collapseAll() {
    openItems = [];
  }
</script>

<AnimatedSection class="py-20 md:py-28">
  <div class="container">
    <SectionHeader title={COPY.faq.title} emoji={COPY.faq.emoji} intro={COPY.faq.intro} />

    <div class="mx-auto mt-16 max-w-4xl">
      <div class="glass overflow-hidden rounded-3xl">
        <!-- Controls inside glass container -->
        <div
          class="border-border/50 flex items-center justify-end gap-2 border-b px-4 py-3 sm:px-6"
        >
          <Button
            variant="ghost"
            size="sm"
            onclick={expandAll}
            disabled={allOpen}
            class="text-muted-foreground hover:text-foreground gap-1.5 text-xs"
          >
            <Icon icon="ph:arrows-out-bold" width="14" />
            Expand all
          </Button>
          <span class="text-border">|</span>
          <Button
            variant="ghost"
            size="sm"
            onclick={collapseAll}
            disabled={!anyOpen}
            class="text-muted-foreground hover:text-foreground gap-1.5 text-xs"
          >
            <Icon icon="ph:arrows-in-bold" width="14" />
            Collapse all
          </Button>
        </div>

        <Accordion.Root type="multiple" bind:value={openItems} class="px-3 sm:px-5">
          {#each questionDataKeys as key, index (key)}
            {@const faq = COPY.faq.questionData[key]}
            {@const itemValue = `faq-${String(key)}`}
            <Accordion.Item
              value={itemValue}
              class="faq-item border-border/40"
              style="animation-delay: {index * 0.05}s"
            >
              <Accordion.Trigger
                class="faq-trigger w-full px-2 py-5 text-left text-[0.9375rem] font-semibold hover:no-underline"
              >
                <span class="flex min-w-0 items-center gap-4">
                  <!-- Icon only animates when THIS item is open -->
                  <span
                    class="faq-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    class:icon-open={openItems.includes(itemValue)}
                  >
                    <Icon icon={faq.icon} width="20" />
                  </span>
                  <span
                    class="text-foreground group-aria-expanded/accordion-trigger:text-primary min-w-0 leading-snug transition-all
                         duration-300
                         group-aria-expanded/accordion-trigger:font-bold"
                  >
                    {faq.title}
                  </span>
                </span>
              </Accordion.Trigger>
      <ContactUs
        class="mt-12"
        title={COPY.faq.contact.title}
        content={COPY.faq.contact.content}
        icon={COPY.faq.contact.icon}
      />
    </div>
  </div>
</AnimatedSection>

<style>
  :global(:root) {
    --faq-motion-duration: 0.6s;
    --faq-motion-ease: ease-out;
  }

  .faq-icon {
    transform: scale(1) rotate(0deg);
    background: color-mix(in srgb, var(--color-primary) 12%, transparent);
    color: var(--color-primary);
    transition:
      transform var(--faq-motion-duration) var(--faq-motion-ease),
      background-color var(--faq-motion-duration) var(--faq-motion-ease),
      color var(--faq-motion-duration) var(--faq-motion-ease),
      box-shadow var(--faq-motion-duration) var(--faq-motion-ease);
  }

  .faq-icon.icon-open {
    transform: scale(1.1) rotate(-4deg);
    background: var(--color-primary);
    color: var(--color-primary-foreground);
    box-shadow: 0 0 0 6px color-mix(in srgb, var(--color-primary) 18%, transparent);
    animation: faqPulse calc(var(--faq-motion-duration) * 1.417) var(--faq-motion-ease);
  }

  @keyframes faqPulse {
    0% {
      transform: scale(0.96) rotate(-1deg);
    }
    55% {
      transform: scale(1.15) rotate(-5deg);
    }
    100% {
      transform: scale(1.1) rotate(-4deg);
    }
  }

  .faq-bullets {
    list-style: none;
    padding-left: 0;
  }

  .faq-bullets li {
    position: relative;
    padding-left: 1.75rem;
    color: var(--color-muted-foreground);
    line-height: 1.6;
    font-weight: 500;
  }

  .faq-bullets li::before {
    content: '•';
    position: absolute;
    left: 0.25rem;
    color: var(--color-primary);
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1;
  }

  /* Snappy staggered entrance for list items */
  :global(.faq-item) {
    opacity: 0;
    animation: fadeInUp 0.5s ease-out both;
    transition: transform 0.3s ease;
  }

  :global(.faq-item:hover) {
    transform: translateY(-2px);
  }
</style>
