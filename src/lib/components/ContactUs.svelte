<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  import { Separator } from '$lib/components/ui/separator';
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';

  import { AnimatedIcon } from '$lib/components';

  import { WEDDING } from '$lib/constants';

  type ContactItem = {
    label: string;
    email: string;
    phone: string;
  };

  const defaultContacts: ContactItem[] = [
    {
      label: WEDDING.couple.bride,
      email: WEDDING.contact.bride.email,
      phone: WEDDING.contact.bride.phone,
    },
    {
      label: WEDDING.couple.groom,
      email: WEDDING.contact.groom.email,
      phone: WEDDING.contact.groom.phone,
    },
  ];

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
    contacts?: ContactItem[];
  }

  let {
    title,
    content,
    icon,
    animation,
    contacts = defaultContacts,
    class: className,
    ...restProps
  }: Props = $props();
</script>

<div class="help-card {className || ''}" {...restProps}>
  <Card.Root class="glass rounded-3xl">
    <Card.Header class="text-center">
      <div class="mb-4">
        {#if icon}
          <AnimatedIcon {icon} size={48} color="var(--color-accent)" {animation} />
        {/if}
      </div>
      <Card.Title>{title}</Card.Title>
    </Card.Header>
    <Card.Content class="text-center">
      <p class="text-muted-foreground mb-6">
        {content}
      </p>
      <div class="space-y-4">
        {#each contacts as contact, i (`${contact.label}-${contact.email}`)}
          <div class="flex flex-col items-center space-y-3">
            <Badge variant="glass" class="px-4 py-1 text-base">{contact.label}</Badge>
            <div class="flex w-full flex-col gap-2 text-sm">
              <a href="mailto:{contact.email}" class="contact-link">
                <Icon icon="ph:envelope-simple-fill" width="16" />
                {contact.email}
              </a>
              <a href="tel:{contact.phone.replace(/\s/g, '')}" class="contact-link">
                <Icon icon="ph:phone-fill" width="16" />
                {contact.phone}
              </a>
            </div>
          </div>

          {#if i < contacts.length - 1}
            <Separator />
          {/if}
        {/each}
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
</style>
