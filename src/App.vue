<template>
  <div class="wedding-invitation">
    <!-- Loading Screen -->
    <div v-if="showLoading" class="loading-screen">
      <div class="loading-content">
        <div class="monogram">
          <div class="letter letter-m">M</div>
          <div class="letter letter-and">&</div>
          <div class="letter letter-p">P</div>
        </div>
        <div class="loading-date">09.11.2025.</div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="main-content">
      <!-- Hero Section -->
      <div class="hero-section">
        <img
          src="./assets/image.jpeg"
          class="frame-image"
          alt="Matea i Petar"
        />

        <div class="hero-content">
          <div class="intro-text">
            <p>
              Postoje trenuci u životu koji nam zauvijek ostanu u sjećanju i
              dobiju pravu vrijednost tek kada se podijele s drugima
            </p>
          </div>

          <div class="couple-names">
            <h1 class="name">Matea</h1>
            <h1 class="and">&</h1>
            <h1 class="name">Petar</h1>
          </div>

          <div class="wedding-date">
            <div class="month">Listopad</div>
            <div class="day">
              <h1>09.</h1>
            </div>
            <div class="year">
              <p>2025.</p>
            </div>
          </div>

          <div class="invitation-text">
            <p>Zato vas pozivamo da prisustvujete našem vjenčanju</p>
          </div>
        </div>
      </div>

      <!-- Timeline Section -->
      <div id="timeline" class="timeline-section">
        <div
          v-for="(event, index) in timeline"
          :key="index"
          class="timeline-event"
          :class="{ visible: visibleEvents.includes(index) }"
          ref="timelineEvents"
        >
          <h2 class="event-time">{{ event.time }}</h2>
          <h2 class="event-title handwriting">{{ event.title }}</h2>
          <h4 class="event-location">
            <a :href="event.mapUrl" target="_blank" class="location-link">
              {{ event.location }}
            </a>
          </h4>
        </div>
      </div>

      <!-- RSVP Section -->
      <div class="rsvp-section">
        <h2>Draga obitelji</h2>
        <h4>
          Molimo vas da svoj dolazak potvrdite do <br />
          01.10.2025.
        </h4>

        <form @submit.prevent="submitRSVP" class="feedback-form">
          <!-- Adults Section -->
          <div class="guest-category">
            <div class="category-header">
              <h3>Odrasli</h3>
              <div class="count-display">
                <h3>{{ adults.length }}</h3>
              </div>
            </div>

            <div
              v-for="(adult, index) in adults"
              :key="`adult-${index}`"
              class="guest-input-container"
            >
              <div class="guest-input-row">
                <input
                  v-model="adult.name"
                  type="text"
                  placeholder="Ime i prezime"
                  class="guest-input"
                />
                <button
                  type="button"
                  @click="removeAdult(index)"
                  class="delete-button"
                  v-if="adults.length > 1"
                >
                  ×
                </button>
              </div>
            </div>

            <button type="button" @click="addAdult" class="add-button">
              <span class="plus-icon">+</span>
              Dodaj osobu
            </button>
          </div>

          <!-- Additional Message -->
          <textarea
            v-model="additionalMessage"
            rows="4"
            maxlength="256"
            placeholder="Želite li podijeliti nešto s nama - možda smiješnu poruku, zanimljivo pitanje, informacije o posebnoj prehrani, druge želje ili pak srdačan pozdrav? Slušamo vas! :)"
            class="additional-message"
          />

          <!-- Submit Button -->
          <button type="submit" class="confirm-button" :disabled="!canSubmit">
            <span>Potvrdi dolazak</span>
            <span class="check-icon">✓</span>
          </button>

          <div v-if="showSuccess" class="success-message">
            Hvala vam! Vaš dolazak je potvrđen.
          </div>
        </form>
      </div>

      <!-- Contact Section -->
      <div class="contact-section">
        <h2>Kontakt</h2>
        <div class="contact-info">
          <div class="contact-person">
            <h4 class="contact-name">Matea</h4>
            <a :href="`tel:+38761234567`" class="contact-phone">061 234 567</a>
          </div>
          <div class="contact-divider"></div>
          <div class="contact-person">
            <h4 class="contact-name">Petar</h4>
            <a :href="`tel:+38762345678`" class="contact-phone">062 345 678</a>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer-section">
        <h2>VESELIMO SE VAŠEM DOLASKU!</h2>
        <div class="quote">
          <p>"Tko daje srce, daje sve."</p>
          <span class="quote-author">- Sv. Antun</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showLoading: true,
      timeline: [
        {
          time: "13:00h",
          title: "Skup kod mladožinje",
          location: "Ul.Sv.Franje Asiškog 79, Metković",
          mapUrl:
            "https://maps.google.com/?q=Ul.+Svetog+Franje+Asiškog+79,+20350,+Metković",
        },
        {
          time: "14:00h",
          title: "Skup kod mlade",
          location: "Hotel President Čapljina",
          mapUrl: "https://maps.google.com/?q=Hotel+President+Čapljina",
        },
        {
          time: "16:00h",
          title: "Vjenčanje",
          location: "Crkva Sv.Franje Asiškog, Metković",
          mapUrl:
            "https://maps.google.com/?q=Crkva+Sv.Franje+Asiškog,+Metković",
        },
        {
          time: "19:00h",
          title: "Večera i slavlje",
          location: "Hotel President Čapljina",
          mapUrl: "https://maps.google.com/?q=Hotel+President+Čapljina",
        },
      ],
      adults: [{ name: "", options: [] }],
      additionalMessage: "",
      showSuccess: false,
      visibleEvents: [],
      observer: null,
    };
  },
  computed: {
    canSubmit() {
      return this.adults.some((adult) => adult.name.trim() !== "");
    },
  },
  mounted() {
    // Hide loading screen after 3.5 seconds
    setTimeout(() => {
      this.showLoading = false;
      // Setup scroll observer after loading is complete
      this.$nextTick(() => {
        this.setupScrollObserver();
      });
    }, 3500);
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    openMap(url) {
      window.open(url, "_blank");
    },
    addAdult() {
      this.adults.push({ name: "", options: [] });
    },
    removeAdult(index) {
      if (this.adults.length > 1) {
        this.adults.splice(index, 1);
      }
    },
    toggleOption(guest, option) {
      const index = guest.options.indexOf(option);
      if (index > -1) {
        guest.options.splice(index, 1);
      } else {
        guest.options.push(option);
      }
    },
    setupScrollObserver() {
      // Create intersection observer
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Find the index of the timeline event
              const elements = this.$refs.timelineEvents;
              if (elements) {
                const index = elements.indexOf(entry.target);
                if (index !== -1 && !this.visibleEvents.includes(index)) {
                  // Add delay based on index for staggered animation
                  setTimeout(() => {
                    this.visibleEvents.push(index);
                  }, index * 200);
                }
              }
            }
          });
        },
        {
          threshold: 0.3, // Trigger when 30% of element is visible
          rootMargin: "0px 0px -50px 0px", // Trigger slightly before element is fully visible
        }
      );

      // Observe all timeline events
      this.$nextTick(() => {
        const elements = this.$refs.timelineEvents;
        if (elements) {
          elements.forEach((el) => {
            this.observer.observe(el);
          });
        }
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&display=swap");

/* Add viewport meta equivalent styles */
html {
  /* Ensure full viewport coverage */
  width: 100%;
  height: 100%;
}

body {
  /* Remove default margins that might interfere with notch areas */
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background: #dbdcde;
}

/* Loading Screen Styles */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #9e8039;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeOut 1s ease-out 3s both;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

.loading-content {
  text-align: center;
  color: #dbdcde;
}

.monogram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.letter {
  font-family: "Cormorant Garamond", serif;
  font-weight: 400;
  color: #dbdcde;
  opacity: 0;
  transform: translateY(30px);
}

.letter-m {
  font-size: 6rem;
  animation: letterSlideIn 1s ease-out 0.5s both;
}

.letter-and {
  font-size: 4rem;
  font-weight: 700;
  animation: letterSlideIn 1s ease-out 1s both;
}

.letter-p {
  font-size: 6rem;
  animation: letterSlideIn 1s ease-out 1.5s both;
}

.loading-date {
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: 3px;
  opacity: 0;
  animation: dateSlideIn 1s ease-out 2s both;
}

/* Loading Animations */
@keyframes letterSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dateSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

/* Main Content Styles */
.main-content {
  opacity: 0;
  animation: fadeIn 1s ease-out 1s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.letter-p {
  font-size: 6rem;
  animation: letterSlideIn 1s ease-out 1.5s both;
}

.loading-date {
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: 3px;
  opacity: 0;
  animation: dateSlideIn 1s ease-out 2s both;
}

/* Loading Animations */
@keyframes letterSlideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dateSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

/* Main Content Styles */
.main-content {
  opacity: 0;
  animation: fadeIn 1s ease-out 3.5s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wedding-invitation {
  font-family: "Cormorant Garamond", serif;
  background: #dbdcde;
  color: #333;
  line-height: 1.6;
  width: 100%;
  min-height: 100vh;
}

/* Fullscreen viewport for mobile with notch support */
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  text-align: center;
  background: #dbdcde;
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
  justify-content: center;
  width: 100%;
  /* Extend into safe areas */
  padding-top: max(60px, env(safe-area-inset-top) + 20px);
  padding-bottom: max(60px, env(safe-area-inset-bottom) + 20px);
  padding-left: max(20px, env(safe-area-inset-left) + 20px);
  padding-right: max(20px, env(safe-area-inset-right) + 20px);
}

.frame-image {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 30px;
  border: 4px solid #9e8039;
  filter: sepia(20%) contrast(95%);
}

.hero-content {
  max-width: 100%;
  width: 100%;
  padding: 0 15px;
}

.intro-text p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 30px;
  font-style: italic;
  line-height: 1.6;
}

.couple-names {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.couple-names .name {
  font-size: 2.8rem;
  font-weight: 400;
  color: #9e8039;
  margin: 0;
}

.couple-names .and {
  font-size: 2.2rem;
  color: #9e8039;
  font-weight: 700;
  margin: 0 8px;
}

.wedding-date {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  color: #9e8039;
  flex-wrap: wrap;
}

.month,
.year {
  font-size: 1.1rem;
  font-weight: 500;
}

.day h1 {
  font-size: 3rem;
  font-weight: 600;
  margin: 0;
}

.invitation-text p {
  font-size: 1.1rem;
  color: #666;
  font-style: italic;
}

.timeline-section {
  padding: 60px 15px;
  background: #dbdcde;
  width: 100%;
}

.timeline-event {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 50px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: 0 10px;
}

.timeline-event.visible {
  opacity: 1;
  transform: translateY(0);
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

.event-time {
  font-size: 1.8rem;
  color: #9e8039;
  font-weight: 600;
  margin-bottom: 8px;
}

.event-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 12px;
  font-family: "Dancing Script", cursive;
  font-weight: 500;
}

.handwriting {
  font-family: "Dancing Script", cursive;
}

.event-location {
  font-size: 1rem;
  color: #666;
  margin: 0;
  text-align: center;
}

.location-link {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
}

.location-link:hover {
  color: #9e8039;
  border-bottom-color: #9e8039;
}

.rsvp-section {
  padding: 60px 15px;
  text-align: center;
  background: #e8e9eb;
  width: 100%;
}

.rsvp-section,
.contact-section,
.footer-section {
  text-align: center;
}

.rsvp-section h2 {
  font-size: 2.2rem;
  color: #9e8039;
  margin-bottom: 15px;
}

.rsvp-section h4 {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.5;
}

.feedback-form {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 5px;
}

.guest-category {
  margin-bottom: 30px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 5px;
}

.category-header h3 {
  font-size: 1.2rem;
  color: #333;
  font-weight: 500;
}

.count-display h3 {
  color: #9e8039;
  font-weight: 600;
}

.guest-input-container {
  margin-bottom: 15px;
}

.guest-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  width: 100%;
}

.guest-input {
  flex: 1;
  padding: 14px 50px 14px 15px; /* Extra right padding for delete button */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px; /* Prevents zoom on iOS */
  font-family: inherit;
  background: white;
  width: 100%;
}

.guest-input:focus {
  outline: none;
  border-color: #9e8039;
}

.delete-button {
  padding: 10px 12px;
  background: #ddd;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  font-size: 18px;
  color: #666;
  min-width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.delete-button:hover {
  background: #ccc;
}

.plus-icon {
  font-size: 14px;
  font-weight: bold;
}

.add-button {
  width: 100%;
  padding: 15px;
  background: transparent;
  border: 2px dashed #ccc;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 1rem;
  color: #666;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.add-button:hover {
  border-color: #9e8039;
  color: #9e8039;
}

.additional-message {
  width: 100%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: inherit;
  font-size: 16px; /* Prevents zoom on iOS */
  resize: vertical;
  margin-bottom: 25px;
  min-height: 100px;
}

.additional-message:focus {
  outline: none;
  border-color: #9e8039;
}

.confirm-button {
  width: 100%;
  padding: 18px 30px;
  background: #9e8039;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-family: inherit;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  touch-action: manipulation; /* Better touch responsiveness */
}

.confirm-button:hover:not(:disabled) {
  background: #8a7133;
  transform: translateY(-2px);
}

.confirm-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.check-icon {
  font-size: 18px;
  font-weight: bold;
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background: rgba(158, 128, 57, 0.1);
  color: #9e8039;
  border-radius: 8px;
  font-weight: 500;
}

.contact-section {
  padding: 60px 15px;
  text-align: center;
  background: #dbdcde;
  width: 100%;
}

.contact-section h2 {
  font-size: 2.2rem;
  color: #9e8039;
  margin-bottom: 30px;
}

.contact-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  max-width: 100%;
  margin: 0 auto;
  flex-wrap: wrap;
}

.contact-person {
  text-align: center;
}

.contact-name {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.contact-phone {
  color: #9e8039;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.contact-phone:hover {
  color: #8a7133;
}

.contact-divider {
  width: 1px;
  height: 50px;
  background: #ccc;
}

.footer-section {
  padding: 60px 15px 40px;
  text-align: center;
  background: #e8e9eb;
  width: 100%;
}

.footer-section h2 {
  font-size: 1.8rem;
  color: #9e8039;
  margin-bottom: 30px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 1.3;
}

.quote {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 10px;
}

.quote p {
  font-size: 1.2rem;
  color: #666;
  font-style: italic;
  margin-bottom: 12px;
  line-height: 1.5;
}

.quote-author {
  font-size: 0.95rem;
  color: #999;
  font-style: normal;
  font-weight: 500;
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .wedding-invitation {
    padding-top: max(env(safe-area-inset-top), 20px);
  }

  .hero-section {
    padding: 40px 10px;
    min-height: calc(100vh - 40px);
  }

  .frame-image {
    width: 250px;
    height: 250px;
    margin-bottom: 25px;
  }

  .couple-names .name {
    font-size: 2.2rem;
  }

  .couple-names .and {
    font-size: 1.8rem;
  }

  .day h1 {
    font-size: 2.5rem;
  }

  .event-title {
    font-size: 1.6rem;
  }

  .event-time {
    font-size: 1.5rem;
  }

  .timeline-section {
    padding: 40px 10px;
  }

  .rsvp-section {
    padding: 40px 10px;
  }

  .contact-section {
    padding: 40px 10px;
  }

  .footer-section {
    padding: 40px 10px 30px;
  }

  .contact-info {
    flex-direction: column;
    gap: 20px;
  }

  .contact-divider {
    width: 50px;
    height: 1px;
  }

  .guest-input-row {
    display: flex;
    gap: 10px;
  }

  .delete-button {
    align-self: center;
  }

  .guest-options {
    justify-content: center;
  }

  .option-badge {
    font-size: 0.8rem;
    padding: 8px 12px;
  }
}

/* Extra small screens */
@media (max-width: 320px) {
  .hero-content {
    padding: 0 10px;
  }

  .couple-names .name {
    font-size: 2rem;
  }

  .couple-names .and {
    font-size: 1.6rem;
  }

  .day h1 {
    font-size: 2.2rem;
  }

  .footer-section h2 {
    font-size: 1.5rem;
  }
}

/* Mobile Loading Optimizations */
@media (max-width: 480px) {
  .letter-m,
  .letter-p {
    font-size: 4.5rem;
  }

  .letter-and {
    font-size: 3rem;
  }

  .loading-date {
    font-size: 1.4rem;
    letter-spacing: 2px;
  }

  .monogram {
    gap: 10px;
    margin-bottom: 25px;
  }
}

@media (max-width: 320px) {
  .letter-m,
  .letter-p {
    font-size: 4rem;
  }

  .letter-and {
    font-size: 2.5rem;
  }

  .loading-date {
    font-size: 1.2rem;
  }
}

/* Landscape orientation for loading */
@media (max-height: 500px) and (orientation: landscape) {
  .letter-m,
  .letter-p {
    font-size: 3.5rem;
  }

  .letter-and {
    font-size: 2.5rem;
  }

  .loading-date {
    font-size: 1.3rem;
  }

  .monogram {
    margin-bottom: 15px;
  }
}
</style>
