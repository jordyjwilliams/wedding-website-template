<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { SectionHeader, AnimatedSection, AnimatedIcon, RichTextContent } from '$lib/components';
  import { LOVE_FACTS } from '$lib/constants';
  import { COPY } from '$lib/content';
</script>

<AnimatedSection class="py-20 md:py-28" threshold={0.2}>
  <div class="container">
    <!-- Header + story text — centred, comfortable reading width -->
    <div class="mx-auto mb-6 max-w-3xl">
      <SectionHeader title={COPY.about.title} emoji={COPY.about.emoji} intro={COPY.about.intro} />
    </div>
    <div class="mx-auto mb-14 max-w-5xl">
      <h3
        class="font-heading-2 text-primary-dark animate-fade-in-up mb-5 text-xl tracking-wide [animation-delay:0.2s]"
      >
        {COPY.about.overviewTitle}
      </h3>
      <Card.Root class="glass animate-fade-in-up rounded-3xl [animation-delay:0.3s]">
        <Card.Content class="p-6">
          <RichTextContent
            text={COPY.about.story}
            paragraphClass="text-muted-foreground text-base leading-[1.8]"
          />
        </Card.Content>
      </Card.Root>
    </div>

    <!-- Photo (left) + love facts (right) -->
    <div class="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-[2fr_3fr]">
      <!-- Photo -->
      <div class="flex justify-center lg:justify-start">
        <div
          class="shadow-glass-lg w-full max-w-sm animate-[fadeInScale_0.8s_ease-out_0.5s_both] overflow-hidden
                 rounded-3xl sm:max-w-md lg:max-w-full"
        >
          <img
            src="/images/proposal.webp"
            alt="Engagement at Larkya La Pass"
            class="block aspect-3/4 h-auto w-full object-cover"
          />
        </div>
      </div>

      <!-- Love facts -->
      <div class="flex flex-col gap-4">
        <h3
          class="font-heading-2 text-primary-dark animate-fade-in-up mb-1 text-xl tracking-wide [animation-delay:0.5s]"
        >
          {COPY.about.loveFactsTitle}
        </h3>
        {#each LOVE_FACTS as fact, index (fact.label)}
          <div
            class="animate-fade-in-up transition-transform duration-300 hover:translate-x-1"
            style:animation-delay="{0.55 + index * 0.1}s"
          >
            <Card.Root class="glass rounded-3xl">
              <Card.Content class="p-5">
                <div class="mb-3 flex items-center gap-3">
                  <AnimatedIcon
                    icon={fact.icon}
                    animation={fact.animation}
                    size={26}
                    class="shrink-0"
                  />
                  <p class="text-foreground leading-snug font-semibold">{fact.label}</p>
                </div>
                <RichTextContent
                  text={'text' in fact ? fact.text : undefined}
                  bullets={'bullets' in fact ? fact.bullets : []}
                  paragraphClass="text-muted-foreground text-sm leading-relaxed"
                  bulletsClass="mt-2 text-sm"
                />
              </Card.Content>
            </Card.Root>
          </div>
        {/each}
      </div>
    </div>
  </div>
</AnimatedSection>
