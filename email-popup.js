(function(){
  emailjs.init("F390jIeKnd_vUPRgB");
})();

// POPUP CONTROLS
const popup = document.getElementById("emailPopup");
const openBtn = document.getElementById("openPopupBtn");
const closeBtn = document.getElementById("closePopupBtn");

openBtn.onclick = () => popup.style.display = "flex";
closeBtn.onclick = () => popup.style.display = "none";

window.onclick = (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
};

// FORM SUBMIT
document.getElementById("ep-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = this;
  const status = document.getElementById("ep-status");
  const submitBtn = document.querySelector(".ep-submit");

  let inquiry = form.inquiry_type.value;
  let to_email = "";

  if (inquiry === "Customer/Business Inquiry") {
    to_email = "iantolentino0110@gmail.com";
  } else if (inquiry === "Applicants and HR Concerns") {
    to_email = "ian.tolentino.bp@j-display.com";
  } else if (inquiry === "Procurement Inquiry") {
    to_email = "nanoxphilippines0@gmail.com";
  }

  submitBtn.disabled = true;
  status.innerHTML = "Sending...";

  const now = new Date();
  const formattedTime = now.toLocaleString();

  // 🔹 MAIN EMAIL (to your company)
  emailjs.send("service_a5rawyh", "template_knmti4p", {
    full_name: form.full_name.value,
    company_name: form.company_name.value,
    email: form.email.value,
    phone: form.phone.value,
    inquiry_type: inquiry,
    message: form.message.value,
    consent: form.consent.checked ? "Yes" : "No",
    submission_time: formattedTime,
    to_email: to_email
  })
  .then(() => {

    // 🔹 AUTO-REPLY EMAIL (to user)
    return emailjs.send("service_a5rawyh", "template_autoreply", {
      full_name: form.full_name.value,
      inquiry_type: inquiry,
      to_email: form.email.value,
      reply_days: "2–3 business days"
    });

  })
  .then(() => {
    status.innerHTML = "✅ Sent successfully! Please check your email.";
    form.reset();
    submitBtn.disabled = false;
  })
  .catch((error) => {
    status.innerHTML = "❌ Failed: " + JSON.stringify(error);
    submitBtn.disabled = false;
  });
});
