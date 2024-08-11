import { register } from "./framework/register";

export class Badge extends HTMLElement {
  private readonly badgeElement: HTMLSpanElement;
  private readonly contentWrapper: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-block;
        position: relative;
      }

      .content-wrapper {
        display: inline-block;
        position: relative;
      }

      .badge {
        position: absolute;
        top: 0;
        right: 0;
        background-color: var(--semantic-background-highlight);
        color: var(--semantic-text-inverted);
        border-radius: 50%;
        padding: 0 6px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: bold;
        transform: translate(50%, -50%);
        z-index: 1;
      }

      :host([hidden]) .badge {
        display: none;
      }
    `;

    shadow.appendChild(style);

    // Content wrapper for the slotted content
    this.contentWrapper = document.createElement("div");
    this.contentWrapper.className = "content-wrapper";
    shadow.appendChild(this.contentWrapper);

    // Slot for the content
    const slot = document.createElement("slot");
    this.contentWrapper.appendChild(slot);

    // Badge element
    this.badgeElement = document.createElement("span");
    this.badgeElement.className = "badge";
    shadow.appendChild(this.badgeElement);

    // Initialize badge content
    this.updateBadge();
  }

  static get observedAttributes() {
    return ["content", "hidden"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "content" && oldValue !== newValue) {
      this.updateBadge();
    } else if (name === "hidden" && oldValue !== newValue) {
      this.updateVisibility();
    }
  }

  private updateBadge() {
    this.badgeElement.textContent = this.getAttribute("content") || "";
  }

  private updateVisibility() {
    const isHidden = this.hasAttribute("hidden");
    this.badgeElement.style.display = isHidden ? "none" : "flex";
  }

  // Property setters and getters
  set content(value: string) {
    this.setAttribute("content", value);
  }

  get content() {
    return this.getAttribute("content") || "";
  }

  set hidden(value: boolean) {
    if (value) {
      this.setAttribute("hidden", "");
    } else {
      this.removeAttribute("hidden");
    }
  }

  get hidden() {
    return this.hasAttribute("hidden");
  }
}

register("badge", Badge);
