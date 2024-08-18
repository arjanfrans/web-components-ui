import { register, getPrefix } from "../../framework/register";
import { TabButtons } from "./TabButtons";

export class Tabs extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
      :host {
        width: 100%;
      }
    `;
    shadow.appendChild(style);
    const slot = document.createElement("slot");
    shadow.appendChild(slot);

    this.initializeTabs = this.initializeTabs.bind(this);
  }

  connectedCallback() {
    this.initializeTabs();
  }

  private initializeTabs() {
    const tabButtons = Array.from(
      this.querySelectorAll(`${getPrefix()}-tab-button`),
    );
    const tabPanels = Array.from(
      this.querySelectorAll(`${getPrefix()}-tab-panel`),
    );

    if (tabButtons.length === 0 || tabPanels.length === 0) {
      console.error("No tab buttons or panels found.");
      return;
    }

    tabButtons.forEach((button) => {
      const id = button.getAttribute("id");
      if (id) {
        button.addEventListener("click", () => this.selectTab(id));
      }
    });

    const selectedId =
      this.getAttribute("selected") || tabButtons[0]?.getAttribute("id") || "";
    if (selectedId) {
      this.selectTab(selectedId);
    } else if (tabButtons.length > 0) {
      this.selectTab(tabButtons[0].getAttribute("id") || "");
    }
  }

  private selectTab(id: string) {
    const tabButtons = Array.from(
      this.querySelectorAll(`${getPrefix()}-tab-button`),
    );
    const tabPanels = Array.from(
      this.querySelectorAll(`${getPrefix()}-tab-panel`),
    );

    tabButtons.forEach((button) => {
      if (button.getAttribute("id") === id) {
        button.setAttribute("active", "");
      } else {
        button.removeAttribute("active");
      }
    });

    tabPanels.forEach((panel) => {
      if (panel.getAttribute("id") === id) {
        panel.setAttribute("active", "");
      } else {
        panel.removeAttribute("active");
      }
    });

    // Update the active indicator in the TabButtons component
    const tabButtonsContainer = this.querySelector(
      `${getPrefix()}-tab-buttons`,
    ) as TabButtons;

    if (
      tabButtonsContainer &&
      typeof tabButtonsContainer.updateActiveIndicator === "function"
    ) {
      (tabButtonsContainer as TabButtons).updateActiveIndicator();
    }
  }
}

register("tabs", Tabs);
