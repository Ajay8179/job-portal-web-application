import emailjs from "@emailjs/browser";

export function sendEmail(formData) {
  return emailjs.send(
    "service_j1dr47a", // Service ID
    "template_2g3gcmp", // Template ID
    formData,
    "TUZKEYrTAVmOLZ6Qo" // Public Key
  );
}