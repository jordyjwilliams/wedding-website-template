<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { SectionHeader, AnimatedSection, AnimatedIcon } from '$lib/components';
  import { LOVE_FACTS } from '$lib/constants';
  import { COPY } from '$lib/content';
</script>

<AnimatedSection class="py-20 md:py-28" threshold={0.2}>
  <div class="container">
    <!-- Two-column layout: content left, photo right (stacks on tablet/mobile) -->
    <div
      class="3xl:gap-28 grid grid-cols-1 items-center
             gap-16 lg:grid-cols-2
             lg:gap-20"
    >
      <!-- Text content -->
      <div>
        <SectionHeader title={COPY.about.title} emoji={COPY.about.emoji} />
        <p
          class="font-heading text-primary-dark animate-fade-in-up mb-6 text-[1.7rem] leading-snug
                 italic
                 [animation-delay:0.2s]"
        >
          {COPY.about.intro}
        </p>

        <p
          class="text-muted-foreground animate-fade-in-up mb-6 text-[1.1rem] leading-[1.8] [animation-delay:0.3s]"
        >
          {COPY.about.story}
        </p>
        <p
          class="text-muted-foreground animate-fade-in-up mb-6 text-[1.1rem] leading-[1.8] [animation-delay:0.4s]"
        >
          {COPY.about.storyExtended}
        </p>

        <!-- Fun facts -->
        <div class="mt-10 flex flex-col gap-3">
          {#each LOVE_FACTS as fact, index (fact.label)}
            <div
              class="group animate-fade-in-up transition-transform duration-300 hover:translate-x-2"
              style:animation-delay="{0.45 + index * 0.08}s"
            >
              <Card.Root class="glass rounded-3xl">
                <Card.Content class="flex items-start gap-4 p-5">
                  <AnimatedIcon
                    icon={fact.icon}
                    animation={fact.animation}
                    size={30}
                    class="shrink-0"
                    color="var(--color-primary)"
                  />
                  <p class="text-muted-foreground m-0 leading-relaxed">
                    <strong class="text-foreground">{fact.label}:</strong>
                    {fact.text}
                  </p>
                </Card.Content>
              </Card.Root>
            </div>
          {/each}
        </div>
      </div>

      <!-- Photo -->
      <div class="order-first flex justify-center lg:order-last">
        <div
          class="shadow-glass-lg w-full max-w-sm animate-[fadeInScale_0.8s_ease-out_0.3s_both] overflow-hidden
                 rounded-3xl
                 sm:max-w-md lg:max-w-full"
        >
          <img
            src="/images/proposal.webp"
            alt="Engagement at Larkya La Pass"
            class="block aspect-3/4 h-auto w-full object-cover"
          />
        </div>
      </div>

      <!-- Gallery -->
      <!-- TODO: Add gallery component here -->
    </div>
  </div>
</AnimatedSection>
