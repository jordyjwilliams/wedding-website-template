<script lang="ts">
  import { parseInlineLinks, isExternalLink } from '$lib/utils.js';
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from '$lib/components/ui/tooltip';

  interface Props {
    triggerText: string;
    tooltipText: string;
  }

  let { triggerText, tooltipText }: Props = $props();

  let open = $state(false);
  // True when the primary pointer is coarse (touch screen / stylus).
  const isTouchDevice = $derived(
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );

  function handleTouchEnd(e: TouchEvent) {
    // Prevent the synthetic click from firing after touchend, which would
    // cause a double-toggle race with bits-ui's internal click handler.
    e.preventDefault();
    open = !open;
  }

  function handleClick() {
    // Fallback: only runs on touch devices when touchend hasn't already handled it
    // (e.g., keyboard-simulated clicks). On desktop, bits-ui handles hover.
    if (isTouchDevice) {
      open = !open;
    }
  }
</script>

<!--
  On touch: delayDuration=999999 disables hover-based open entirely.
  ontouchend + preventDefault handles toggle reliably and blocks ghost clicks.
  On pointer-fine (mouse) devices the hover behaviour is unchanged.
-->
<TooltipProvider delayDuration={isTouchDevice ? 999999 : 120}>
  <Tooltip bind:open disableCloseOnTriggerClick={isTouchDevice}>
    <TooltipTrigger
      class="inline-link-button"
      aria-label={tooltipText}
      onclick={handleClick}
      ontouchend={handleTouchEnd}
    >
      <span>
        <span class="inline-link">{triggerText}</span>
        <span class="tooltip-indicator" aria-hidden="true">?</span>
        <span class="sr-only">Show more details</span>
      </span>
    </TooltipTrigger>
    <TooltipContent
      side="top"
      sideOffset={4}
      class="bg-card/88 text-muted-foreground border-border/45 max-w-[18rem] rounded-lg border px-2.5 py-1.5 text-xs leading-relaxed shadow-lg backdrop-blur-md"
      arrowClasses="bg-card/88"
    >
      <span>
        {#each parseInlineLinks(tooltipText) as tooltipSegment, j (j)}
          {#if tooltipSegment.href}
            {@const tooltipIsExternal = isExternalLink(tooltipSegment.href)}
            <a
              href={tooltipSegment.href}
              class="tooltip-link"
              target={tooltipIsExternal ? '_blank' : undefined}
              rel={tooltipIsExternal ? 'noopener noreferrer' : undefined}
            >
              {tooltipSegment.text}
            </a>
          {:else}
            {tooltipSegment.text}
          {/if}
        {/each}
      </span>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

<style>
  .inline-link {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 0.14em;
    text-decoration-thickness: 1.5px;
    transition: opacity 0.2s ease;
  }

  .inline-link:hover {
    opacity: 0.78;
  }

  :global(.inline-link-button) {
    background: none;
    border: 0;
    padding: 0;
    font: inherit;
    display: inline-flex;
    align-items: center;
    gap: 0.28rem;
    cursor: pointer;
    color: inherit;
  }

  .tooltip-indicator {
    display: inline-grid;
    place-items: center;
    width: 0.92rem;
    height: 0.92rem;
    border-radius: 9999px;
    border: 1px solid color-mix(in srgb, var(--color-primary) 48%, transparent);
    color: color-mix(in srgb, var(--color-primary) 82%, white 18%);
    font-size: 0.62rem;
    line-height: 1;
    transform: translateY(-0.03rem);
  }

  .tooltip-link {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 0.14em;
    text-decoration-thickness: 1.5px;
  }

  .tooltip-link:hover {
    opacity: 0.82;
  }
</style>
