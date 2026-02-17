<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    // Redirect to new home route
    goto('/', { replaceState: true });
  });
</script>

<!-- Redirecting... -->
