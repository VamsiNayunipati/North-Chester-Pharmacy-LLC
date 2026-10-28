
"use strict";

const pharmacyInfo = {
  name: "North Chester Pharmacy LLC",
  phone: "6613993337",
  displayPhone: "(661) 399-3337",
  address: "1822 N Chester Ave, Bakersfield, CA 93308",
  timezone: "America/Los_Angeles",

  openingHour: 9,
  closingHour: 18
};

document.addEventListener("DOMContentLoaded", () => {
  updatePharmacyHours();
  setupCallButtons();
  setupDirectionsButtons();
});

function getBakersfieldTime() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: pharmacyInfo.timezone,
    weekday: "short",
    hour: "2-digit",
    hourCycle: "h23"
  });

  const parts = formatter.formatToParts(new Date());

  const weekday = parts.find(
    part => part.type === "weekday"
  )?.value;

  const hour = Number(parts.find(
    part => part.type === "hour"
  )?.value);

  return { weekday, hour };
}

function updatePharmacyHours() {
  const statusElements = document.querySelectorAll(
    "[data-pharmacy-status]"
  );

  if (!statusElements.length) return;

  const { weekday, hour } = getBakersfieldTime();

  const weekend = weekday === "Sat" || weekday === "Sun";

  const withinRegularHours =
    !weekend &&
    hour >= pharmacyInfo.openingHour &&
    hour < pharmacyInfo.closingHour;

  statusElements.forEach(element => {
    element.textContent = withinRegularHours
      ? "Within regular business hours — call to confirm"
      : "Outside regular business hours";

    element.style.color = withinRegularHours
      ? "#167345"
      : "#a34422";
  });
}

function setupCallButtons() {
  document.querySelectorAll(
    "[data-call-pharmacy]"
  ).forEach(button => {
    button.addEventListener("click", () => {
      window.location.href = `tel:${pharmacyInfo.phone}`;
    });
  });
}

function setupDirectionsButtons() {
  const mapsURL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(pharmacyInfo.address);

  document.querySelectorAll(
    "[data-pharmacy-directions]"
  ).forEach(button => {
    button.addEventListener("click", () => {
      window.open(mapsURL, "_blank", "noopener,noreferrer");
    });
  });
}
