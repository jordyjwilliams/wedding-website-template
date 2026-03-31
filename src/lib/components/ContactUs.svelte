<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { Separator } from '$lib/components/ui/separator';
  import { WeddingBadge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';

  import { AnimatedIcon } from '$lib/components';

  import { WEDDING } from '$lib/constants';
  import { COPY } from '$lib/content';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    title: string;
    content: string;
    icon?: string;
    animation?:
      | 'none'
      | 'pulse'
      | 'bounce'
      | 'ping'
      | 'spin'
      | 'float'
      | 'fade-in'
      | 'fade-in-up'
      | 'fade-in-down'
      | 'fade-in-scale'
      | 'spin-in';
  }

  let { title, content, icon, animation, class: className, ...restProps }: Props = $props();
</script>

<div class="help-card {className || ''}" {...restProps}>
  <Card.Root class="glass rounded-3xl">
    <Card.Header class="text-center">
      <div class="mb-4">
        <AnimatedIcon
          icon={icon || 'ph:chat-circle-dots-fill'}
          size={48}
          color="var(--color-accent)"
          {animation}
        />
      </div>
      <Card.Title>{title}</Card.Title>
    </Card.Header>
    <Card.Content class="text-center">
      <p class="text-muted-foreground mb-6">
        {content}
      </p>
      <div class="space-y-4">
        <div class="flex flex-col items-center space-y-3">
          <WeddingBadge size="event">{COPY.rsvp.contact.bride}</WeddingBadge>
          <div class="flex w-full flex-col gap-2 text-sm">
            <a href="mailto:{WEDDING.contact.bride.email}" class="contact-link">
              <Icon icon="ph:envelope-simple-fill" width="16" />
              {WEDDING.contact.bride.email}
            </a>
            <a href="tel:{WEDDING.contact.bride.phone.replace(/\s/g, '')}" class="contact-link">
              <Icon icon="ph:phone-fill" width="16" />
              {WEDDING.contact.bride.phone}
            </a>
          </div>
        </div>

        <Separator />

        <div class="flex flex-col items-center space-y-3">
          <WeddingBadge size="event">{COPY.rsvp.contact.groom}</WeddingBadge>
          <div class="flex w-full flex-col gap-2 text-sm">
            <a href="mailto:{WEDDING.contact.groom.email}" class="contact-link">
              <Icon icon="ph:envelope-simple-fill" width="16" />
              {WEDDING.contact.groom.email}
            </a>
            <a href="tel:{WEDDING.contact.groom.phone.replace(/\s/g, '')}" class="contact-link">
              <Icon icon="ph:phone-fill" width="16" />
              {WEDDING.contact.groom.phone}
            </a>
          </div>
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</div>

<style>
  .help-card {
    position: sticky;
    top: 6rem;
    height: fit-content;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    color: var(--color-foreground);
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .contact-link:hover {
    background: color-mix(in srgb, var(--color-accent) 10%, transparent);
    color: var(--color-primary);
    transform: translateX(2px);
  }

  .contact-link :global(svg) {
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    .help-card {
      position: static;
    }
  }

  @media (max-width: 768px) {
  }
</style>
