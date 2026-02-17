<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { isSessionValid } from '$lib/auth';
  import Icon from '@iconify/svelte';

  let passcode: string = '';
  let error: string = '';
  let isLoading: boolean = false;
  let shake: boolean = false;

  onMount(() => {
    // If already authenticated and session valid, redirect to home
    if (isSessionValid()) {
      goto('/home');
    }
  });

  async function handleSubmit(): Promise<void> {
    if (!passcode.trim()) return;

    isLoading = true;
    error = '';

    try {
      const response = await fetch('/.netlify/functions/verify-passcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await response.json();

      if (data.valid && data.token) {
        // Store authentication with timestamp and server-generated token
        const authData = {
          authenticated: true,
          timestamp: Date.now(),
          token: data.token,
        };
        localStorage.setItem('wedding_auth', JSON.stringify(authData));
        goto('/home');
      } else {
        error = "ph:phone-disconnect-duotone Hmm, that code doesn't look quite right. Try again?";
        shake = true;
        setTimeout(() => (shake = false), 500);
        passcode = '';
      }
    } catch {
      error = 'ph:phone-disconnect-duotone  Connection error. Please try again.';
      shake = true;
      setTimeout(() => (shake = false), 500);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="passcode-page">
  <div class="passcode-background">
    <div class="gradient-orb orb-1"></div>
    <div class="gradient-orb orb-2"></div>
    <div class="gradient-orb orb-3"></div>
  </div>

  <div class="passcode-container" class:shake>
    <div class="passcode-card">
      <div class="lock-icon"><Icon icon="ph:lock-fill" width="48" /></div>
      <h1 class="couple-names">Jordy & Nicole</h1>
      <p class="eyebrow">are getting married!</p>
      <p class="welcome-text">
        We're so excited to celebrate with you at Seacroft Estate on the Great Ocean Road. Enter the
        passcode from your invitation to view all the wedding details.
      </p>
      <p class="help-text">This keeps our special day a little more private <Icon icon="ph:key-duotone" width="24" /></p>

      <form on:submit|preventDefault={handleSubmit}>
        <div class="input-group">
          <input
            type="password"
            bind:value={passcode}
            placeholder="Enter passcode"
            disabled={isLoading}
            autocomplete="off"
          />
        </div>

        <button type="submit" class="btn-submit" disabled={isLoading}>
          {#if isLoading}
            <span class="spinner"></span>
            Verifying...
          {:else}
            Enter Site ✨
          {/if}
        </button>

        {#if error}
          <p class="error-message"><Icon icon={error.split(' ')[0]} width="24" /> {error.split(' ').slice(1).join(' ')}</p>
        {/if}
      </form>
    </div>
  </div>
</div>

<style>
  .passcode-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #faf8f6 0%, #f5e6d3 100%);
  }

  .passcode-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: float 20s infinite ease-in-out;
  }

  .orb-1 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    top: -200px;
    left: -200px;
    animation-delay: 0s;
  }

  .orb-2 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, var(--secondary), var(--primary));
    bottom: -150px;
    right: -150px;
    animation-delay: 5s;
  }

  .orb-3 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, var(--accent), var(--primary));
    top: 50%;
    right: 10%;
    animation-delay: 10s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(30px, -30px) rotate(5deg);
    }
    50% {
      transform: translate(-20px, 20px) rotate(-5deg);
    }
    75% {
      transform: translate(40px, 10px) rotate(3deg);
    }
  }

  .passcode-container {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 500px;
    padding: 2rem;
    animation: fadeInUp 0.8s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .passcode-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 30px;
    padding: 3rem 2.5rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    text-align: center;
  }

  .lock-icon {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .couple-names {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .eyebrow {
    color: var(--text-light);
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin-bottom: 1.5rem;
  }

  .welcome-text {
    color: var(--text-dark);
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .help-text {
    color: var(--text-light);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .input-group {
    margin-bottom: 1.5rem;
  }

  input {
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    border: 2px solid #e0e0e0;
    border-radius: 15px;
    background: var(--white);
    transition: var(--transition);
    font-family: var(--font-body);
    text-align: center;
    letter-spacing: 2px;
  }

  input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 4px rgba(212, 165, 116, 0.1);
  }

  input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-submit {
    width: 100%;
    padding: 1.1rem 2rem;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: var(--white);
    border: none;
    border-radius: 15px;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .btn-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(212, 165, 116, 0.4);
  }

  .btn-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .error-message {
    margin-top: 1rem;
    color: #d32f2f;
    font-size: 0.95rem;
    animation: shake 0.5s;
  }

  .shake {
    animation: shake 0.5s;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-10px);
    }
    75% {
      transform: translateX(10px);
    }
  }

  @media (max-width: 600px) {
    .passcode-container {
      padding: 1.5rem;
    }

    .passcode-card {
      padding: 2.5rem 2rem;
    }

    h1 {
      font-size: 2rem;
    }

    .orb-1,
    .orb-2,
    .orb-3 {
      filter: blur(60px);
    }
  }
</style>
