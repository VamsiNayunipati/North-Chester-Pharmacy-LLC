
"use strict";

const patientQuestions = [
  {
    question: "How can I refill my prescription?",
    answer:
      "Visit our Refills page to access the RxLocal patient portal, or call North Chester Pharmacy at (661) 399-3337.",
    url: "refills.html",
    linkText: "Prescription Refills"
  },
  {
    question: "How can I transfer a prescription?",
    answer:
      "Visit our Transfers page to learn how to request a prescription transfer.",
    url: "transfers.html",
    linkText: "Prescription Transfers"
  },
  {
    question: "What insurance plans do you accept?",
    answer:
      "Insurance participation and prescription coverage can vary. Please contact our pharmacy to verify your plan and medication benefits.",
    url: "insurance.html",
    linkText: "Insurance Information"
  },
  {
    question: "What are your business hours?",
    answer:
      "Monday through Friday, 9:00 AM to 6:00 PM. Closed Saturday and Sunday. Holiday hours may vary.",
    url: "contact.html",
    linkText: "Contact Us"
  },
  {
    question: "Where is the pharmacy located?",
    answer:
      "North Chester Pharmacy LLC is located at 1822 N Chester Ave, Bakersfield, CA 93308.",
    url: "contact.html",
    linkText: "Get Contact Information"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  renderPatientFAQ();
});

function renderPatientFAQ() {
  const container = document.getElementById("patient-faq");

  if (!container) return;

  const heading = document.createElement("h2");
  heading.textContent = "Frequently Asked Questions";

  container.appendChild(heading);

  patientQuestions.forEach(item => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const answer = document.createElement("p");
    const link = document.createElement("a");

    summary.textContent = item.question;
    answer.textContent = item.answer;

    link.href = item.url;
    link.textContent = item.linkText;

    details.appendChild(summary);
    details.appendChild(answer);
    details.appendChild(link);

    Object.assign(details.style, {
      padding: "14px",
      marginBottom: "10px",
      border: "1px solid #dce7ee",
      borderRadius: "8px",
      background: "#ffffff"
    });

    summary.style.cursor = "pointer";
    summary.style.fontWeight = "700";

    link.style.color = "#126da5";

    container.appendChild(details);
  });
}
