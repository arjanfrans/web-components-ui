import { register } from "../../framework/register";

export class TabButtons extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
      :host {
        position: relative;
        display: flex;
        border-bottom: var(--tab-button-border, 1px solid rgba(var(--semantic-background-inverted_rgb), 0.1));
        margin: 0;
        padding: 0;
        list-style: none;
        overflow: hidden;
        width: 100%;
      }

      ::slotted(x-tab-button) {
        flex: 1;
        padding: 10px;
        text-align: center;
        background: transparent;
        border: none;
        cursor: pointer;
        transition: background 0.3s;
        position: relative;
        z-index: 1;
      }

      .active-indicator {
        position: absolute;
        bottom: 0;
        height: 2px;
        background-color: var(--tab-button-active-border-color, var(--semantic-stroke-highlight));
        transition: left 0.3s ease, width 0.3s ease;
        z-index: 0;
      }
    `;

    shadow.appendChild(style);

    // Slot for the buttons
    const slot = document.createElement("slot");
    shadow.appendChild(slot);

    // Active indicator element
    const activeIndicator = document.createElement("div");
    activeIndicator.className = "active-indicator";
    shadow.appendChild(activeIndicator);
  }

  connectedCallback() {
    requestAnimationFrame(() => {
      this.updateActiveIndicator();
    });
    this.addEventListener("slotchange", () => this.updateActiveIndicator());
  }

  public updateActiveIndicator() {
    const slot = this.shadowRoot?.querySelector("slot");
    const tabButtons = slot?.assignedElements() || [];

    const activeButton = tabButtons.find((button) =>
      button.hasAttribute("active"),
    );

    if (activeButton) {
      const activeIndicator = this.shadowRoot?.querySelector(
        ".active-indicator",
      ) as HTMLElement;

      const buttonRect = activeButton.getBoundingClientRect();
      const containerRect = this.getBoundingClientRect();

      activeIndicator.style.left = `${buttonRect.left - containerRect.left}px`;
      activeIndicator.style.width = `${buttonRect.width}px`;
    }
  }
}

register("tab-buttons", TabButtons);
