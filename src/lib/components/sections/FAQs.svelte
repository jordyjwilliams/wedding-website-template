<script lang="ts">
  import { SectionHeader, AnimatedSection } from '$lib/components';
  import * as Accordion from '$lib/components/ui/accordion';
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

    <div class="mx-auto mt-16 max-w-2xl">
      <Accordion.Root type="multiple" class="glass rounded-2xl px-2">
        {#each faqs as faq, i}
          <Accordion.Item value={`faq-${i}`} class="border-border/40">
            <Accordion.Trigger
              class="hover:no-underline py-5 text-base font-semibold"
            >
              <span class="flex items-center gap-3">
                <span class="text-primary shrink-0">
                  <Icon icon={faq.icon} width="22" />
                </span>
                {faq.title}
              </span>
            </Accordion.Trigger>
            <Accordion.Content>
              <p class="text-muted-foreground pb-2 pl-9 leading-relaxed">
                {faq.description}
              </p>
            </Accordion.Content>
          </Accordion.Item>
        {/each}
      </Accordion.Root>
    </div>
  </div>
</AnimatedSection>
