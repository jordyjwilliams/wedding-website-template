<script lang="ts">
  import { onMount } from 'svelte';

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    attendance: string;
    guestCount: string;
    dietaryRestrictions: string;
    message: string;
  }

  let formData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    attendance: '',
    guestCount: '1',
    dietaryRestrictions: '',
    message: '',
  };

  let isLoading: boolean = false;
  let formMessage: string = '';
  let messageType: string = '';
  let visible: boolean = false;

  onMount(() => {
    visible = true;
  });

  $: showGuestCount = formData.attendance === 'yes';

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    isLoading = true;
    formMessage = '';
    messageType = '';

    // TODO: Create the actual script and test this functionality
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

    const submitData = {
      ...formData,
      guestCount: formData.attendance === 'yes' ? formData.guestCount : '0',
      dietaryRestrictions: formData.dietaryRestrictions || 'None',
      message: formData.message || 'None',
      timestamp: new Date().toISOString(),
    };

    try {
      const _response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      // Success
      messageType = 'success';
      formMessage =
        "✅ Thank you for your RSVP! We've received your response and can't wait to celebrate with you!";

      // Reset form
      formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        attendance: '',
        guestCount: '1',
        dietaryRestrictions: '',
        message: '',
      };

      // Scroll to message
      setTimeout(() => {
        document.querySelector('.form-message')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
    } catch (error) {
      console.error('Error:', error);
      messageType = 'error';
      formMessage =
        '❌ Oops! Something went wrong. Please try again or contact us directly at you@example.com';
    } finally {
      isLoading = false;
    }
  }
</script>

<section class="rsvp-section" class:visible>
  <div class="container">
    <div class="rsvp-header">
      <h2 class="section-title">RSVP 💌</h2>
      <p class="section-intro">
        Please let us know if you can join us for the weekend. Your response helps us plan rooms,
        food and all that jazz 🎷🎺
      </p>
    </div>

    <div class="rsvp-container">
      <form on:submit={handleSubmit} class="rsvp-form">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              bind:value={formData.firstName}
              required
              disabled={isLoading}
            />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              bind:value={formData.lastName}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email *</label>
          <input
            type="email"
            id="email"
            bind:value={formData.email}
            required
            disabled={isLoading}
          />
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" bind:value={formData.phone} disabled={isLoading} />
        </div>

        <div class="form-group">
          <label for="attendance">Will you be attending? *</label>
          <select id="attendance" bind:value={formData.attendance} required disabled={isLoading}>
            <option value="">Please select...</option>
            <option value="yes">Yes, I'll be there! 🎉</option>
            <option value="no">Sorry, can't make it 😢</option>
          </select>
        </div>

        {#if showGuestCount}
          <div class="form-group" style="animation: slideDown 0.3s ease-out">
            <label for="guestCount">Number of Guests (including yourself) *</label>
            <input
              type="number"
              id="guestCount"
              bind:value={formData.guestCount}
              min="1"
              max="10"
              required={showGuestCount}
              disabled={isLoading}
            />
          </div>
        {/if}

        <div class="form-group">
          <label for="dietaryRestrictions">Dietary Requirements or Allergies</label>
          <textarea
            id="dietaryRestrictions"
            bind:value={formData.dietaryRestrictions}
            rows="3"
            placeholder="Let us know if you have any dietary needs or allergies we should be aware of 🌱🥩"
            disabled={isLoading}
          ></textarea>
        </div>

        <div class="form-group">
          <label for="message">Message to Us (Optional)</label>
          <textarea
            id="message"
            bind:value={formData.message}
            rows="4"
            placeholder="Any special requests or just say hi! 💕"
            disabled={isLoading}
          ></textarea>
        </div>

        <button type="submit" class="btn-submit" disabled={isLoading}>
          {#if isLoading}
            <span class="spinner"></span>
            Sending...
          {:else}
            Submit RSVP ✨
          {/if}
        </button>

        {#if formMessage}
          <div class="form-message {messageType}">
            {formMessage}
          </div>
        {/if}
      </form>

      <div class="help-card">
        <div class="help-icon">💬</div>
        <h3>Need Help?</h3>
        <p>
          If you have trouble with the form, feel free to email or text us and we'll add your
          details manually.
        </p>
        <div class="contact-details">
          <p><strong>Email:</strong> <a href="mailto:jordy_williams@hotmail.co.uk">jordy_williams@hotmail.co.uk</a></p>
          <p><strong>Phone (WhatsApp):</strong> <a href="tel:+61403765534">+61 403 765 534</a></p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .rsvp-section {
    padding: 6rem 0;
    background: var(--bg-light);
    min-height: 100vh;
    opacity: 0;
    transition: opacity 0.6s ease-out;
  }

  .rsvp-section.visible {
    opacity: 1;
  }

  .rsvp-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: 1rem;
    color: var(--primary);
  }

  .section-intro {
    font-size: 1.2rem;
    color: var(--text-light);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .rsvp-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .rsvp-form {
    background: var(--white);
    padding: 3rem;
    border-radius: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    animation: slideInLeft 0.8s ease-out;
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      max-height: 200px;
      transform: translateY(0);
    }
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.6rem;
    color: var(--text-dark);
    font-weight: 600;
    font-size: 0.95rem;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 1rem 1.2rem;
    border: 2px solid #e0e0e0;
    border-radius: 15px;
    font-family: var(--font-body);
    font-size: 1rem;
    transition: var(--transition);
    background: var(--bg-light);
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    background: var(--white);
    box-shadow: 0 0 0 4px rgba(212, 165, 116, 0.1);
  }

  .form-group input:disabled,
  .form-group select:disabled,
  .form-group textarea:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 80px;
  }

  .btn-submit {
    width: 100%;
    padding: 1.2rem 2rem;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: var(--white);
    border: none;
    border-radius: 15px;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
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

  .form-message {
    margin-top: 1.5rem;
    padding: 1.2rem;
    border-radius: 15px;
    text-align: center;
    font-weight: 500;
    animation: slideDown 0.3s ease-out;
  }

  .form-message.success {
    background: #d4edda;
    color: #155724;
    border: 2px solid #c3e6cb;
  }

  .form-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 2px solid #f5c6cb;
  }

  .help-card {
    background: var(--white);
    padding: 2.5rem 2rem;
    border-radius: 25px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    text-align: center;
    height: fit-content;
    animation: slideInRight 0.8s ease-out;
    position: sticky;
    top: 6rem;
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

  .help-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  .help-card h3 {
    font-size: 1.6rem;
    color: var(--primary);
    margin-bottom: 1rem;
  }

  .help-card p {
    color: var(--text-light);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .contact-details {
    background: var(--bg-light);
    padding: 1.5rem;
    border-radius: 15px;
    text-align: left;
  }

  .contact-details p {
    margin-bottom: 0.8rem;
    color: var(--text-dark);
  }

  .contact-details a {
    color: var(--primary);
    text-decoration: none;
    transition: var(--transition);
  }

  .contact-details a:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }

  @media (max-width: 1024px) {
    .rsvp-container {
      grid-template-columns: 1fr;
    }

    .help-card {
      position: static;
    }
  }

  @media (max-width: 768px) {
    .rsvp-section {
      padding: 4rem 0;
    }

    .rsvp-form {
      padding: 2rem 1.5rem;
    }

    .form-row {
      grid-template-columns: 1fr;
      gap: 0;
    }

    .help-card {
      padding: 2rem 1.5rem;
    }
  }
</style>
