<template>
  <div class="wedding-invitation">
    <div class="hero-section">
      <div class="couple-photo">
        <!-- Replace './assets/image.jpeg' with your actual image file -->
        <img src="./assets/image.jpeg" alt="Matea i Petar" />
      </div>

      <div class="hero-content">
        <h1 class="couple-names">Matea & Petar</h1>
        <div class="wedding-date">09.11.2025</div>
        <p class="invitation-text">
          Pozivamo vas da podijelite s nama<br />
          najsretniji dan našeg života
        </p>
      </div>
    </div>

    <div class="timeline-section">
      <h2>Program Dana</h2>

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
    </div>

    <div class="rsvp-section">
      <h2>Potvrdite Dolazak</h2>
      <p>Molimo vas da potvrdite svoj dolazak do 01.10.2025</p>

      <div class="guest-form">
        <div class="guest-list">
          <div
            v-for="(guest, index) in guests"
            :key="index"
            class="guest-input-group"
          >
            <div class="input-row">
              <input
                v-model="guest.firstName"
                type="text"
                placeholder="Ime"
                class="guest-input"
              />
              <input
                v-model="guest.lastName"
                type="text"
                placeholder="Prezime"
                class="guest-input"
              />
              <button
                @click="removeGuest(index)"
                class="remove-guest-btn"
                v-if="guests.length > 1"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <button @click="addGuest" class="add-guest-btn">+ Dodaj Gosta</button>

        <button
          @click="submitRSVP"
          class="submit-rsvp-btn"
          :disabled="!canSubmit"
        >
          Potvrdi Dolazak
        </button>

        <div v-if="showSuccess" class="success-message">
          Hvala vam! Vaš dolazak je potvrđen.
        </div>
      </div>

      <div class="contact-info">
        <p>Za dodatna pitanja:</p>
        <p>Tel: <a href="tel:+38761234567">+387 61 234 567</a></p>
        <p>
          Email: <a href="mailto:vjenčanje@email.com">vjenčanje@email.com</a>
        </p>
      </div>
    </div>

    <div class="footer">
      <p class="quote">
        "Tko daje srce, daje sve."<br />
        <span class="quote-author">- Sv. Antun</span>
      </p>
      <div class="hearts">♡ ♡ ♡</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      guests: [{ firstName: "", lastName: "" }],
      showSuccess: false,
    };
  },
  computed: {
    canSubmit() {
      return this.guests.some(
        (guest) => guest.firstName.trim() !== "" && guest.lastName.trim() !== ""
      );
    },
  },
  methods: {
    addGuest() {
      this.guests.push({ firstName: "", lastName: "" });
    },
    removeGuest(index) {
      if (this.guests.length > 1) {
        this.guests.splice(index, 1);
      }
    },
    submitRSVP() {
      if (this.canSubmit) {
        // Here you would typically send the data to a server
        const validGuests = this.guests.filter(
          (guest) =>
            guest.firstName.trim() !== "" && guest.lastName.trim() !== ""
        );

        console.log("RSVP submitted for guests:", validGuests);

        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);

        // Reset form
        this.guests = [{ firstName: "", lastName: "" }];
      }
    },
  },
  mounted() {
    console.log("Wedding invitation loaded");
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wedding-invitation {
  font-family: "Georgia", "Times New Roman", serif;
  line-height: 1.6;
  color: #8b7355;
  background: linear-gradient(135deg, #f5f0e8 0%, #ede7d9 100%);
  min-height: 100vh;
}

.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  text-align: center;
  background: #faf7f2;
  border-bottom: 1px solid #e8dcc0;
}

.couple-photo {
  width: 280px;
  height: 280px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 40px;
  border: 3px solid #d4c4a8;
  box-shadow: 0 8px 32px rgba(139, 115, 85, 0.15);
}

.couple-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(20%) contrast(90%) brightness(105%);
}

.hero-content {
  max-width: 500px;
}

.couple-names {
  font-size: 3.5rem;
  font-weight: 300;
  color: #a68b5b;
  margin-bottom: 20px;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(166, 139, 91, 0.1);
}

.wedding-date {
  font-size: 1.8rem;
  color: #8b7355;
  margin-bottom: 30px;
  font-weight: 400;
  letter-spacing: 3px;
}

.invitation-text {
  font-size: 1.2rem;
  color: #9a8266;
  font-style: italic;
  line-height: 1.8;
}

.timeline-section {
  padding: 80px 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.timeline-section h2 {
  font-size: 2.5rem;
  color: #a68b5b;
  margin-bottom: 60px;
  font-weight: 300;
  letter-spacing: 1px;
  position: relative;
}

.timeline-section h2::after {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 1px;
  background: #d4c4a8;
}

.event-details {
  display: grid;
  gap: 40px;
  max-width: 600px;
  margin: 0 auto;
}

.event {
  padding: 30px;
  background: rgba(250, 247, 242, 0.6);
  border-radius: 12px;
  border: 1px solid #e8dcc0;
  transition: all 0.3s ease;
}

.event:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.12);
  background: rgba(250, 247, 242, 0.9);
}

.event h3 {
  font-size: 1.3rem;
  color: #8b7355;
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: 1px;
}

.time {
  font-size: 1.5rem;
  color: #a68b5b;
  font-weight: 600;
  margin-bottom: 15px;
  letter-spacing: 2px;
}

.location-link {
  color: #9a8266;
  text-decoration: none;
  font-size: 1.1rem;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
  padding: 5px 0;
}

.location-link:hover {
  color: #a68b5b;
  border-bottom-color: #d4c4a8;
}

.rsvp-section {
  padding: 80px 20px;
  text-align: center;
  background: #faf7f2;
  border-top: 1px solid #e8dcc0;
}

.rsvp-section h2 {
  font-size: 2.2rem;
  color: #a68b5b;
  margin-bottom: 30px;
  font-weight: 300;
}

.rsvp-section p {
  font-size: 1.2rem;
  color: #8b7355;
  margin-bottom: 40px;
}

.contact-info {
  margin-top: 40px;
}

.contact-info p:first-child {
  font-weight: 500;
  color: #8b7355;
  margin-bottom: 15px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.guest-form {
  max-width: 500px;
  margin: 0 auto 40px;
  padding: 40px 30px;
  background: rgba(250, 247, 242, 0.8);
  border-radius: 15px;
  border: 1px solid #e8dcc0;
}

.guest-list {
  margin-bottom: 25px;
}

.guest-input-group {
  margin-bottom: 15px;
}

.input-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.guest-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #d4c4a8;
  border-radius: 8px;
  background: #faf7f2;
  color: #8b7355;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.guest-input:focus {
  outline: none;
  border-color: #a68b5b;
  box-shadow: 0 0 0 2px rgba(166, 139, 91, 0.1);
}

.guest-input::placeholder {
  color: #b8a082;
}

.remove-guest-btn {
  width: 35px;
  height: 35px;
  border: none;
  background: #d4c4a8;
  color: #8b7355;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.remove-guest-btn:hover {
  background: #c0b296;
  transform: scale(1.1);
}

.add-guest-btn {
  width: 100%;
  padding: 12px 20px;
  background: transparent;
  border: 2px dashed #d4c4a8;
  color: #a68b5b;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.add-guest-btn:hover {
  border-color: #a68b5b;
  background: rgba(166, 139, 91, 0.05);
}

.submit-rsvp-btn {
  width: 100%;
  padding: 15px 30px;
  background: linear-gradient(135deg, #a68b5b, #8b7355);
  color: #faf7f2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-family: inherit;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.submit-rsvp-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 115, 85, 0.3);
}

.submit-rsvp-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background: rgba(139, 115, 85, 0.1);
  color: #8b7355;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  border: 1px solid #d4c4a8;
}

.quote-author {
  font-size: 0.9em;
  color: #b8a082;
  font-style: normal;
}

.contact-info a {
  color: #a68b5b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.contact-info a:hover {
  color: #8b7355;
}

.footer {
  padding: 60px 20px 40px;
  text-align: center;
  background: linear-gradient(135deg, #f5f0e8 0%, #ede7d9 100%);
}

.quote {
  font-size: 1.3rem;
  color: #9a8266;
  font-style: italic;
  margin-bottom: 30px;
  line-height: 1.8;
}

.hearts {
  font-size: 2rem;
  color: #d4c4a8;
  letter-spacing: 15px;
}

@media (max-width: 768px) {
  .couple-names {
    font-size: 2.5rem;
  }

  .wedding-date {
    font-size: 1.4rem;
  }

  .couple-photo {
    width: 220px;
    height: 220px;
  }

  .timeline-section h2 {
    font-size: 2rem;
  }

  .event {
    padding: 25px 20px;
  }

  .guest-form {
    padding: 30px 20px;
    margin: 0 auto 30px;
  }

  .input-row {
    flex-direction: column;
    gap: 10px;
  }

  .remove-guest-btn {
    align-self: center;
    margin-top: 5px;
  }
}

@media (max-width: 480px) {
  .couple-names {
    font-size: 2rem;
  }

  .hero-section {
    padding: 40px 15px;
  }

  .timeline-section {
    padding: 60px 15px;
  }

  .rsvp-section {
    padding: 60px 15px;
  }
}
</style>
