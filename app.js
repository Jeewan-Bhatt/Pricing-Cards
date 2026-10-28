"use strict";

const monthlyButton = document.querySelector("#monthly-button");
const yearlyButton = document.querySelector("#yearly-button");
const periodButtons = [monthlyButton, yearlyButton];
const prices = document.querySelectorAll(".price");
const unitLabels = document.querySelectorAll("[data-unit]");
const selectionMessage = document.querySelector("#selection-message");
const savingsNote = document.querySelector("#savings-note");

function setBillingPeriod(period) {
  prices.forEach((price) => {
    price.textContent = price.dataset[period];
    price.setAttribute("aria-label", `$${price.dataset[period]} ${period === "monthly" ? "per month" : "per year"}`);
  });

  unitLabels.forEach((label) => {
    label.textContent = period === "monthly" ? "per month" : "per year";
  });

  periodButtons.forEach((button) => {
    const isSelected = button.dataset.period === period;
    button.setAttribute("aria-pressed", String(isSelected));
    button.classList.toggle("is-active", isSelected);
  });

  savingsNote.hidden = period !== "monthly";
}

periodButtons.forEach((button) => {
  button.addEventListener("click", () => setBillingPeriod(button.dataset.period));
});

document.querySelectorAll("[data-select-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.selectPlan;
    const period = monthlyButton.getAttribute("aria-pressed") === "true" ? "monthly" : "yearly";
    selectionMessage.textContent = `${plan} selected · billed ${period}.`;
  });
});

const requestedPeriod = new URLSearchParams(window.location.search).get("billing");
setBillingPeriod(requestedPeriod === "yearly" ? "yearly" : "monthly");



