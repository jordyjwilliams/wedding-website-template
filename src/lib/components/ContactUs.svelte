<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Separator } from '$lib/components/ui/separator';
  import { WeddingBadge } from '$lib/components/ui/badge';
  import { Spinner } from '$lib/components/ui/spinner';
  import * as Alert from '$lib/components/ui/alert';
  import * as Card from '$lib/components/ui/card';
  import * as Select from '$lib/components/ui/select';
  import { SectionHeader, AnimatedSection, AnimatedIcon } from '$lib/components';
  import Confetti from '$lib/components/Confetti.svelte';
  import { RSVP_LIMITS, WEDDING } from '$lib/constants';
  import { COPY } from '$lib/content';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    title: string;
    content: string;
    icon?: string;
  }

  let { title, content, icon, class: className, ...restProps }: Props = $props();
</script>

<div class="help-card {className || ''}" {...restProps}>
  <Card.Root class="glass rounded-3xl">
    <Card.Header class="text-center">
      <div class="mb-4">
        <AnimatedIcon
          icon={icon || 'ph:chat-circle-dots-fill'}
          size={48}
          color="var(--color-accent)"
          animation="bounce"
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
  :global(.rsvp-section) {
    padding: 6rem 0;
    min-height: 100vh;
  }

  .help-card {
    animation: slideInRight 0.8s ease-out;
    position: sticky;
    top: 6rem;
    height: fit-content;
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
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
    :global(.rsvp-section) {
      padding: 4rem 0;
    }
  }
</style>
