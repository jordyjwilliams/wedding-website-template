<script lang="ts">
  import { SectionHeader, AnimatedSection } from '$lib/components';
  import * as Accordion from '$lib/components/ui/accordion';
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

      <ContactUs
        class="mt-12"
        title={COPY.faq.contact.title}
        content={COPY.faq.contact.content}
        icon={COPY.faq.contact.icon}
      />
    </div>
  </div>
</AnimatedSection>
