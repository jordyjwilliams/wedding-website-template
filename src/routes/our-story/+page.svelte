<script lang="ts">
  import { AboutUs, PageWrapper, StorySections, SectionCta } from '$lib/components';
  import { COPY } from '$lib/content';
</script>

<PageWrapper backgroundImage="/images/story-bg.webp" backgroundPosition="center top">
  <AboutUs />
  <StorySections entries={COPY.about.storySections.entries} title={COPY.about.storySectionsTitle} />
  <div class="container pb-20">
    <div class="mx-auto max-w-5xl">
      <SectionCta
        text="Ready to celebrate with us?"
        buttonLabel="RSVP Now →"
        href="/rsvp"
        openInNewTab={false}
        class="animate-fade-in-up"
      />
    </div>
  </div>
</PageWrapper>
