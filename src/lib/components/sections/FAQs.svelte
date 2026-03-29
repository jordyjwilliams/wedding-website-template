<script lang="ts">
  import { SectionHeader, AnimatedSection, AnimatedGrid, IconCard } from '$lib/components';
  import { COPY } from '$lib/content';
</script>

<AnimatedSection class="py-20 md:py-28">
  <div class="container">
    <SectionHeader title={COPY.faq.title} emoji={COPY.faq.emoji} intro={COPY.faq.intro} />

    <AnimatedGrid class="mt-16" itemDelay={0.2}>
      <IconCard
        icon="ph:house-fill"
        iconAnimation="float"
        title={COPY.faq.practical.accommodation.title}
        description={COPY.faq.practical.accommodation.description}
      />
      <IconCard
        icon="ph:backpack-fill"
        iconAnimation="float"
        iconDelay="0.5s"
        title={COPY.faq.practical.packing.title}
        description={COPY.faq.practical.packing.description}
      />
      <IconCard
        icon="ph:car-fill"
        iconAnimation="float"
        iconDelay="1s"
        title={COPY.faq.practical.transport.title}
        description={COPY.faq.practical.transport.description}
      />
    </AnimatedGrid>
  </div>
</AnimatedSection>

<style>
</style>
