<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';

  interface Props {
    text: string;
    buttonLabel: string;
    href: string;
    className?: string;
    openInNewTab?: boolean;
  }

  let { text, buttonLabel, href, className = '', openInNewTab = true }: Props = $props();
</script>

<Card.Root class={`glass mt-12 rounded-3xl px-8 py-12 text-center md:px-16 ${className}`.trim()}>
  <p class="text-foreground mb-8 text-xl font-medium">{text}</p>
  <Button
    {href}
    target={openInNewTab ? '_blank' : undefined}
    rel={openInNewTab ? 'noopener noreferrer' : undefined}
    size="lg"
    class="group rounded-full px-10"
  >
    {buttonLabel}
  </Button>
</Card.Root>
