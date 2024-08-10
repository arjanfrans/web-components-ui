import { register } from "./framework/register";
import { Typography } from "./Typography.ts";
import { Size } from "./variables/Size.ts";

type ButtonVariant = "filled" | "outlined";

export class Button extends HTMLElement {
  private button: HTMLButtonElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    this.style.width = "max-content";
    this.style.height = "max-content";

    // Create the button element
    this.button = document.createElement("button");
    this.button.classList.add("button");

    // Create and append the styles
    const style = document.createElement("style");
    style.textContent = `
      .button {
        border: none;
        border-radius: 4px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--hb-gap-md);
        text-align: center;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1);
        white-space: nowrap;
      }
      
      :host([variant="filled"]) .button {
        background-color: var(--semantic-background-highlight);
        color: var(--semantic-text-inverted);
      }

      :host([variant="filled"]:hover) .button {
        background-color: var(--semantic-background-hover);
        color: var(--semantic-text-inverted);
        box-shadow: 
            rgb(from var(--semantic-background-inverted) r g b / 16%) 0px 3px 1px -2px,
            rgb(from var(--semantic-background-inverted) r g b / 14%) 0px 2px 2px 0px,
            rgb(from var(--semantic-background-inverted) r g b / 12%) 0px 1px 5px 0px;
      }

      :host([variant="outlined"]) .button {
        background-color: transparent;
        border: 1px solid var(--semantic-stroke-highlight);
        color: var(--semantic-text-highlight);
      }

      :host([variant="outlined"]:hover) .button {
        border-color: var(--semantic-stroke-hover);
        color: var(--semantic-text-hover);
        background-color: rgb(from var(--semantic-background-highlight) r g b / 10%);
      }

      :host([size="small"]) .button {
        padding-block: var(--hb-gap-5xs);
        padding-inline: var(--hb-gap-3xs);
      }

      :host([size="medium"]) .button {
        padding-block: var(--hb-gap-4xs);
        padding-inline: var(--hb-gap-2xs);
      }

      :host([size="large"]) .button {
        padding-block: var(--hb-gap-2xs);
        padding-inline: var(--hb-gap-sm);
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
  }

  // Observe changes to 'variant' and 'size' attributes
  static get observedAttributes() {
    return ["variant", "size"];
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
