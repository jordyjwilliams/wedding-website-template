<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  onMount(() => {
    // Redirect to new home route
    goto(resolve('/'), { replaceState: true });
  });
</script>

<!-- Redirecting... -->
