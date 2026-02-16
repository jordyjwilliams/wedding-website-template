<script lang="ts">
  import RSVPForm from '$lib/components/RSVPForm.svelte';
  import { onMount } from 'svelte';

  let visible: boolean = false;

  onMount(() => {
    visible = true;
  });
</script>

<div class="page" class:visible>
  <RSVPForm />
</div>

<style>
  .page {
    opacity: 0;
    transition: opacity 0.6s ease-out;
  }

  .page.visible {
    opacity: 1;
  }
</style>
