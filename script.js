document.getElementById("year").textContent =
  new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => observer.observe(el));


// ==============================
// EmailJS
// ==============================

const EMAILJS_PUBLIC_KEY = "QpBFrm3snszYbuShy";
const EMAILJS_SERVICE_ID = "service_w6mhfeb";
const EMAILJS_TEMPLATE_ID = "template_17e6u7a";

const contactForm =
  document.getElementById("averun-contact-form");

const contactStatus =
  document.getElementById("contact-status");

const contactSubmit =
  document.getElementById("contact-submit");


emailjs.init({
  publicKey: EMAILJS_PUBLIC_KEY
});


contactForm.addEventListener("submit", function (event) {

  event.preventDefault();

  contactSubmit.disabled = true;
  contactSubmit.textContent = "Sending…";

  contactStatus.textContent = "";
  contactStatus.className = "form-status";

  emailjs
    .sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      contactForm
    )

    .then(() => {

      contactForm.reset();

      contactStatus.textContent =
        "Thank you. Your message has been sent to the Averun team.";

      contactStatus.classList.add("success");

    })

    .catch((error) => {

      console.error("EmailJS error:", error);

      contactStatus.textContent =
        "We couldn't send your message. Please try again.";

      contactStatus.classList.add("error");

    })

    .finally(() => {

      contactSubmit.disabled = false;
      contactSubmit.textContent = "Send Message";

    });
});
