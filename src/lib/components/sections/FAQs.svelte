<script lang="ts">
  import { SectionHeader, AnimatedSection } from '$lib/components';
  import * as Accordion from '$lib/components/ui/accordion';
  import ContactUs from '$lib/components/ContactUs.svelte';
  import Icon from '@iconify/svelte';
  import { COPY } from '$lib/content';

  const faqs = [
    { icon: 'ph:house-bold', ...COPY.faq.practical.accommodation },
    { icon: 'ph:high-heel-bold', ...COPY.faq.practical.dressCode },
    { icon: 'ph:backpack-bold', ...COPY.faq.practical.packing },
    { icon: 'ph:car-bold', ...COPY.faq.practical.transport },
    { icon: 'ph:gift-bold', ...COPY.faq.practical.gifts },
    { icon: 'ph:cloud-sun-bold', ...COPY.faq.practical.weather },
    { icon: 'ph:hand-heart-bold', ...COPY.faq.practical.plusOne },
    { icon: 'ph:baby-carriage-bold', ...COPY.faq.practical.kids },
    { icon: 'ph:bed-bold', ...COPY.faq.practical.accommodationAlternatives },
    { icon: 'ph:map-pin-area-bold', ...COPY.faq.practical.thingsToDo },
  ];
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
