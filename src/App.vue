<template>
  <div id="app">
    <!-- Main Invitation Card -->
    <div class="card-container">
      <div class="card" :class="{ flipped: isFlipped }">
        <!-- Front Side - Invitation -->
        <div class="card-face card-front">
          <div class="bg-image"></div>
          <div class="content-overlay">
            <!-- Date Circle -->
            <div class="date-circle">
              <div class="date-text">
                <div class="day">09</div>
                <div class="month">11</div>
                <div class="year">25</div>
              </div>
            </div>

            <!-- Side Text -->
            <div class="side-text">
              Tko daje srce daje sve.<br />
              Sv. Antun
            </div>

            <!-- Main Content -->
            <div class="main-content">
              <div class="invitation-text">POZIVAMO</div>
              <div class="invitation-text">VAS NA NAŠE</div>
              <div class="invitation-text">VJENČANJE</div>

              <div class="names">
                <span class="bride">Matea</span>
                <span class="ampersand">&</span>
                <span class="groom">Petar</span>
              </div>

              <div class="tagline">BUDITE SVJEDOCI NAŠE LJUBAVI</div>
            </div>
          </div>
        </div>

        <!-- Back Side - Details -->
        <div class="card-face card-back">
          <div class="details-content">
            <div class="details-header">
              <h1>M&P</h1>
            </div>

            <div class="event-details">
              <div class="event">
                <h3>SKUP KOD MLADOŽINJE</h3>
                <div class="time">13:00H</div>
                <a
                  href="https://maps.google.com/?q=Ul.Sv.Franje+Asiškog+79,+Čapljina"
                  target="_blank"
                  class="location-link"
                >
                  Ul.Sv.Franje Asiškog 79
                </a>
              </div>

              <div class="event">
                <h3>SKUP KOD MLADЕ</h3>
                <div class="time">14:00H</div>
                <a
                  href="https://maps.google.com/?q=Hotel+President+Čapljina"
                  target="_blank"
                  class="location-link"
                >
                  Hotel President Čapljina
                </a>
              </div>

              <div class="event">
                <h3>VJENČANJE</h3>
                <div class="time">16:00H</div>
                <a
                  href="https://maps.google.com/?q=Crkva+Sv.Franje+Asiškog,+Čapljina"
                  target="_blank"
                  class="location-link"
                >
                  Crkva Sv.Franje Asiškog
                </a>
              </div>

              <div class="event">
                <h3>VEČERA I SLAVLJE</h3>
                <div class="time">19:00H</div>
                <a
                  href="https://maps.google.com/?q=Hotel+President+Čapljina"
                  target="_blank"
                  class="location-link"
                >
                  Hotel President Čapljina
                </a>
              </div>
            </div>

            <div class="rsvp-section">
              <h2>VESELIMO SE VAŠEM DOLASKU!</h2>
              <p>MOLIMO DA SVOJ DOLAZAK POTVRDITE DO 01.10.2025.</p>

              <div class="contact-info">
                <div class="contact">
                  <strong>Matea:</strong>
                  <a
                    href="https://wa.me/385958884819"
                    target="_blank"
                    class="whatsapp-link"
                  >
                    095 888-4819
                  </a>
                </div>
                <div class="contact">
                  <strong>Petar:</strong>
                  <a
                    href="https://wa.me/385955297544"
                    target="_blank"
                    class="whatsapp-link"
                  >
                    095 529 75 44
                  </a>
                </div>
              </div>

              <!-- RSVP Form Toggle Button -->
              <a href="#rsvp-form" class="rsvp-toggle-btn">
                Potvrdi dolazak online
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Flip Button -->
      <div class="flip-button-container">
        <button class="flip-btn" @click="flipCard">
          <span class="flip-icon">↻</span>
          {{ isFlipped ? "Pozivnica" : "Detalji" }}
        </button>
      </div>
    </div>

    <!-- RSVP Form Section -->
    <div id="rsvp-form" class="rsvp-form-section">
      <div class="rsvp-form-card">
        <div class="form-header">
          <h2>Potvrda dolaska</h2>
        </div>

        <form @submit.prevent="submitRSVP" class="rsvp-form">
          <div class="form-group">
            <label for="guestName">Ime i prezime:</label>
            <input
              type="text"
              id="guestName"
              v-model="form.guestName"
              required
              :disabled="isSubmitting"
            />
          </div>

          <div class="form-group">
            <label for="guestCount">Broj gostiju:</label>
            <select
              id="guestCount"
              v-model="form.guestCount"
              required
              :disabled="isSubmitting"
            >
              <option value="">Odaberite broj gostiju</option>
              <option value="1">1 osoba</option>
              <option value="2">2 osobe</option>
              <option value="3">3 osobe</option>
              <option value="4">4 osobe</option>
              <option value="5">5 osoba</option>
              <option value="6">6 osoba</option>
            </select>
          </div>

          <div class="form-group" v-if="parseInt(form.guestCount) > 1">
            <label for="additionalNames">Imena dodatnih gostiju:</label>
            <textarea
              id="additionalNames"
              v-model="form.additionalNames"
              rows="3"
              placeholder="Unesite imena ostalih gostiju..."
              :disabled="isSubmitting"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="email">Email (opcionalno):</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              :disabled="isSubmitting"
            />
          </div>

          <div class="form-group">
            <label for="phone">Telefon:</label>
            <input
              type="tel"
              id="phone"
              v-model="form.phone"
              required
              :disabled="isSubmitting"
            />
          </div>

          <div class="form-group">
            <label for="message">Poruka (opcionalno):</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="3"
              placeholder="Ostavite nam poruku..."
              :disabled="isSubmitting"
            ></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? "Šalje se..." : "Potvrdi dolazak" }}
          </button>

          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeddingInvitation",
  data() {
    return {
      isFlipped: false,
      form: {
        guestName: "",
        guestCount: "",
        additionalNames: "",
        email: "",
        phone: "",
        message: "",
      },
      isSubmitting: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },

    async submitRSVP() {
      this.isSubmitting = true;
      this.successMessage = "";
      this.errorMessage = "";

      try {
        // Simulate form submission - replace with actual email service
        // For EmailJS integration, uncomment and configure:
        /*
        const templateParams = {
          guest_name: this.form.guestName,
          guest_count: this.form.guestCount,
          additional_names: this.form.additionalNames || 'N/A',
          guest_email: this.form.email || 'Nije naveden',
          guest_phone: this.form.phone,
          message: this.form.message || 'Nema dodatne poruke',
          to_email: 'your-email@example.com'
        };

        // Initialize EmailJS
        emailjs.init("YOUR_PUBLIC_KEY");

        await emailjs.send(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          templateParams
        );
        */

        // Simulate delay for demo
        await new Promise((resolve) => setTimeout(resolve, 2000));

        this.successMessage =
          "Hvala vam! Vaša potvrda dolaska je uspješno poslana.";
        this.resetForm();
      } catch (error) {
        console.error("Error sending RSVP:", error);
        this.errorMessage =
          "Došlo je do greške pri slanju. Molimo kontaktirajte nas direktno.";
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      this.form = {
        guestName: "",
        guestCount: "",
        additionalNames: "",
        email: "",
        phone: "",
        message: "",
      };
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

#app {
  font-family: "Georgia", "Times New Roman", serif;
  background: linear-gradient(135deg, #f5f3f0 0%, #e8e2db 100%);
  min-height: 100vh;
  color: #5a4a3a;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

/* Card Container */
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-bottom: 50px;
}

/* 3D Card Styles */
.card {
  width: 400px;
  height: 600px;
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.8s ease-in-out;
}

.card.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border: 2px solid #8b7355;
  border-radius: 200px 200px 50px 50px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(90, 74, 58, 0.2);
  background: #faf8f5;
}

.card-back {
  transform: rotateY(180deg);
}

/* Front Side - Invitation Styles */
.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, #f0f0f0, #e8e8e8);
  opacity: 0.3;
}

.bg-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("assets/image.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.8;
}

.content-overlay {
  position: relative;
  height: 100%;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #6b5b47;
}

.date-circle {
  position: absolute;
  top: 80px;
  right: 30px;
  width: 80px;
  height: 80px;
  border: 2px solid #8b7355;
  border-radius: 50% 50% 50% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
}

.date-text {
  text-align: center;
  font-weight: bold;
}

.day {
  font-size: 28px;
  line-height: 0.9;
}

.month {
  font-size: 16px;
  line-height: 0.9;
}

.year {
  font-size: 16px;
  line-height: 0.9;
}

.side-text {
  position: absolute;
  left: -50px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  font-size: 12px;
  letter-spacing: 1px;
  white-space: nowrap;
  color: #8b7355;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 60px;
}

.invitation-text {
  font-size: 16px;
  letter-spacing: 3px;
  margin: 2px 0;
  font-weight: 300;
}

.names {
  margin: 30px 0;
  font-size: 36px;
  font-weight: 300;
}

.bride,
.groom {
  display: block;
  margin: 5px 0;
}

.ampersand {
  font-size: 42px;
  margin: 0 10px;
  font-style: italic;
}

.tagline {
  font-size: 12px;
  letter-spacing: 2px;
  margin-top: 30px;
  font-weight: 300;
}

/* Back Side - Details Styles */
.details-content {
  height: 100%;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  color: #6b5b47;
}

.details-header h1 {
  text-align: center;
  font-size: 48px;
  font-weight: 300;
  margin-bottom: 30px;
  color: #8b7355;
}

.event-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 20px;
}

.event {
  text-align: center;
}

.event h3 {
  font-size: 13px;
  letter-spacing: 2px;
  margin-bottom: 5px;
  font-weight: 400;
  color: #8b7355;
}

.time {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.location-link {
  font-size: 11px;
  font-style: italic;
  color: #8b7355;
  text-decoration: none;
  border-bottom: 1px dotted #8b7355;
  transition: color 0.3s ease;
}

.location-link:hover {
  color: #6b5b47;
  text-decoration: none;
}

.rsvp-section {
  text-align: center;
  padding-top: 10px;
}

.rsvp-section h2 {
  font-size: 16px;
  margin-bottom: 8px;
  color: #8b7355;
  letter-spacing: 1px;
}

.rsvp-section p {
  font-size: 11px;
  margin-bottom: 15px;
  opacity: 0.8;
}

.contact-info {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
  font-size: 11px;
}

.whatsapp-link {
  color: #6b5b47;
  text-decoration: none;
  border-bottom: 1px dotted #25d366;
}

.whatsapp-link:hover {
  color: #25d366;
  text-decoration: none;
}

.contact {
  flex: 1;
}

.rsvp-toggle-btn {
  display: inline-block;
  padding: 8px 16px;
  background: #8b7355;
  color: white;
  border: none;
  border-radius: 20px;
  font-family: inherit;
  font-size: 11px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 5px;
  text-decoration: none;
}

.rsvp-toggle-btn:hover {
  background: #6b5b47;
  transform: translateY(-2px);
}

/* Flip Button Styles */
.flip-button-container {
  display: flex;
  justify-content: center;
}

.flip-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #8b7355;
  color: white;
  border: none;
  border-radius: 25px;
  font-family: inherit;
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(139, 115, 85, 0.3);
}

.flip-btn:hover {
  background: #6b5b47;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(139, 115, 85, 0.4);
}

.flip-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.flip-btn:hover .flip-icon {
  transform: rotate(180deg);
}

/* RSVP Form Section */
.rsvp-form-section {
  width: 100%;
  max-width: 600px;
  padding: 40px 20px;
}

.rsvp-form-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(90, 74, 58, 0.3);
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h2 {
  color: #8b7355;
  font-size: 1.8rem;
  letter-spacing: 1px;
}

.rsvp-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #8b7355;
  font-weight: 500;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e8e2db;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s ease;
  background: #faf8f5;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #8b7355;
}

.form-group input:disabled,
.form-group select:disabled,
.form-group textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: #8b7355;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background: #5a4a3a;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

.success-message {
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 480px) {
  .card {
    width: 90vw;
    max-width: 350px;
    height: 500px; /* Increased height for mobile */
  }

  .names {
    font-size: 28px;
  }

  .details-content {
    padding: 30px 20px; /* Reduced padding */
  }

  .details-header h1 {
    font-size: 36px;
    margin-bottom: 20px; /* Reduced margin */
  }

  .event-details {
    margin-bottom: 15px;
  }

  .event {
    margin-bottom: 12px; /* Reduced spacing between events */
  }

  .event h3 {
    font-size: 12px;
    margin-bottom: 3px;
  }

  .time {
    font-size: 14px;
    margin-bottom: 3px;
  }

  .location-link {
    font-size: 10px;
  }

  .rsvp-section {
    padding-top: 5px;
  }

  .rsvp-section h2 {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .rsvp-section p {
    font-size: 10px;
    margin-bottom: 10px;
  }

  .contact-info {
    flex-direction: row; /* Keep horizontal to save space */
    gap: 15px;
    margin-bottom: 10px;
    font-size: 10px;
  }

  .rsvp-form-card {
    padding: 30px 20px;
  }

  .form-header h2 {
    font-size: 1.5rem;
  }

  .flip-btn {
    padding: 10px 20px;
    font-size: 13px;
  }

  .rsvp-toggle-btn {
    font-size: 10px;
    padding: 6px 14px;
  }
}

/* Print Styles */
@media print {
  #app {
    background: white;
  }

  .flip-button-container,
  .rsvp-form-section {
    display: none;
  }

  .card {
    transform: none !important;
  }

  .card-front {
    page-break-after: always;
  }
}
</style>
