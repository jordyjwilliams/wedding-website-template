<script lang="ts">
  import { SectionHeader, AnimatedSection, AnimatedGrid, IconCard } from '$lib/components';
  import { COPY } from '$lib/content';
</script>

<AnimatedSection class="py-20 md:py-28">
  <div class="container">
    <SectionHeader title={COPY.faq.title} emoji={COPY.faq.emoji} intro={COPY.faq.intro} />

    <AnimatedGrid class="mt-16" itemDelay={0.2}>
      <IconCard
        icon="ph:house-bold"
        iconAnimation="float"
        title={COPY.faq.practical.accommodation.title}
        description={COPY.faq.practical.accommodation.description}
      />
      <IconCard
        icon="ph:high-heel-bold"
        iconAnimation="float"
        iconDelay="0.25s"
        title={COPY.faq.practical.dressCode.title}
        description={COPY.faq.practical.dressCode.description}
      />
      <IconCard
        icon="ph:backpack-bold"
        iconAnimation="float"
        iconDelay="0.5s"
        title={COPY.faq.practical.packing.title}
        description={COPY.faq.practical.packing.description}
      />
      <IconCard
        icon="ph:car-bold"
        iconAnimation="float"
        iconDelay="1s"
        title={COPY.faq.practical.transport.title}
        description={COPY.faq.practical.transport.description}
      />
      <IconCard
        icon="ph:gift-bold"
        iconAnimation="float"
        iconDelay="1.25s"
        title={COPY.faq.practical.gifts.title}
        description={COPY.faq.practical.gifts.description}
      />
      <IconCard
        icon="ph:cloud-sun-bold"
        iconAnimation="float"
        iconDelay="1.5s"
        title={COPY.faq.practical.weather.title}
        description={COPY.faq.practical.weather.description}
      />
      <IconCard
        icon="ph:hand-heart-bold"
        iconAnimation="float"
        iconDelay="1.75s"
        title={COPY.faq.practical.plusOne.title}
        description={COPY.faq.practical.plusOne.description}
      />
      <IconCard
        icon="ph:baby-carriage-bold"
        iconAnimation="float"
        iconDelay="2s"
        title={COPY.faq.practical.kids.title}
        description={COPY.faq.practical.kids.description}
      />
      <IconCard
        icon="ph:bed-bold"
        iconAnimation="float"
        iconDelay="2.25s"
        title={COPY.faq.practical.accommodationAlternatives.title}
        description={COPY.faq.practical.accommodationAlternatives.description}
      />
      <IconCard
        icon="ph:map-pin-area-bold"
        iconAnimation="float"
        iconDelay="2.5s"
        title={COPY.faq.practical.thingsToDo.title}
        description={COPY.faq.practical.thingsToDo.description}
      />
    </AnimatedGrid>
  </div>
</AnimatedSection>

<style>
</style>
