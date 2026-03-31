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
      <ContactUs
        class="mt-12"
        title={COPY.faq.contact.title}
        content={COPY.faq.contact.content}
        icon={COPY.faq.contact.icon}
      />
    </div>
  </div>
</AnimatedSection>
