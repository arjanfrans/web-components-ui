import { register, variable } from "../framework/register.ts";
import { Typography } from "./Typography.ts";
import { Size } from "./variables/Size.ts";

type ButtonVariant = "filled" | "outlined";

export class Button extends HTMLElement {
  private button: HTMLButtonElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Create the button element
    this.button = document.createElement("button");
    this.button.classList.add("button");

    // Create and append the styles
    const style = document.createElement("style");
    style.textContent = `
      :host {
        width: max-content;
        height: max-content;
      }

      .button {
        border: none;
        border-radius: ${variable("border-xs")};
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: ${variable("spacing-md")};
        text-align: center;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1);
        white-space: nowrap;
        touch-action: manipulation; /* Helps with touch interactions */
      }

      :host([stretch]) {
        width: 100%;
      }

      :host([stretch]) .button {
        width: 100%;
      }
      
      :host([variant="filled"]) .button {
        background-color: var(--semantic-background-highlight);
        color: var(--semantic-text-inverted);
      }

      :host([variant="filled"]:hover) .button,
      :host([variant="filled"]:active) .button {
        background-color: var(--semantic-background-hover);
        color: var(--semantic-text-inverted);
        box-shadow: ${variable("shadow-light")};
      }

      :host([variant="outlined"]) .button {
        background-color: transparent;
        border: 1px solid var(--semantic-stroke-highlight);
        color: var(--semantic-text-highlight);
      }

      :host([variant="outlined"]:hover) .button,
      :host([variant="outlined"]:active) .button {
        border-color: var(--semantic-stroke-hover);
        color: var(--semantic-text-hover);
        background-color: rgba(var(--semantic-background-highlight_rgb), 0.1);
      }

      :host([size="small"]) .button {
        padding-block: ${variable("spacing-xs")};
        padding-inline: ${variable("spacing-sm")};
      }

      :host([size="medium"]) .button {
        padding-block: ${variable("spacing-sm")};
        padding-inline: ${variable("spacing-md")};
      }

      :host([size="large"]) .button {
        padding-block: ${variable("spacing-md")};
        padding-inline: ${variable("spacing-lg")};
      }

      .button:focus {
        outline: 2px solid var(--button-focus-outline);
      }
    `;
    shadow.appendChild(style);

    const label = new Typography();
    label.display = "button";

    // Create a slot for button content
    const slot = document.createElement("slot");
    label.append(slot);
    this.button.appendChild(label);

    shadow.appendChild(this.button);

    // Set default attributes
    if (!this.hasAttribute("variant")) {
      this.setAttribute("variant", "filled");
    }
    if (!this.hasAttribute("size")) {
      this.setAttribute("size", "medium");
    }

    // Add touch event listeners
    this.button.addEventListener(
      "touchstart",
      this.handleTouchStart.bind(this),
    );
    this.button.addEventListener("touchend", this.handleTouchEnd.bind(this));
    this.button.addEventListener("touchcancel", this.handleTouchEnd.bind(this));
  }

  private handleTouchStart() {
    this.button.classList.add("button-active");
  }

  private handleTouchEnd() {
    this.button.classList.remove("button-active");
  }

  // Observe changes to 'variant' and 'size' attributes
  static get observedAttributes() {
    return ["variant", "size", "stretch"];
  }

  // Handle changes to attributes
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "variant" && oldValue !== newValue) {
      this.updateVariant();
    } else if (name === "size" && oldValue !== newValue) {
      this.updateSize();
    }
  }

  private updateVariant() {
    this.setAttribute("variant", this.variant);
  }

  private updateSize() {
    this.setAttribute("size", this.size);
  }

  set variant(value: ButtonVariant) {
    this.setAttribute("variant", value);
  }

  get variant(): ButtonVariant {
    return (this.getAttribute("variant") as ButtonVariant) || "filled";
  }

  set size(value: Size) {
    this.setAttribute("size", value);
  }

  get size(): Size {
    return (this.getAttribute("size") as Size) || "medium";
  }
}

register("button", Button);
