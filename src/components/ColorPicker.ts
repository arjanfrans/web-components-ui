import { register, variable } from "./framework/register";
import { Typography } from "./Typography";
import { ZIndex } from "./variables/ZIndex";

export class ColorPicker extends HTMLElement {
  private readonly colorInput: HTMLInputElement;
  private readonly colorPreview: HTMLDivElement;
  private labelElement?: Typography;
  private readonly iconElement: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${variable("gap-4xs")};
        font-family: sans-serif;
        width: max-content;
      }

      .color-container {
        position: relative;
      }

      .color-preview {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid #ccc;
        background-color: #ffffff;
        box-shadow: 0 0 3px rgba(var(--semantic-background-inverted_rgb), 0.2);
        cursor: pointer;
      }

      .icon {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 16px; /* Reduced size */
        height: 16px; /* Reduced size */
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: var(--semantic-background-default);
        border-radius: 50%;
        border: 1px solid var(--semantic-stroke-default);
        box-shadow: 0 0 1px rgba(var(--semantic-background-inverted_rgb), 0.3);
        transform: translate(30%, 30%); /* Adjust badge position */
        pointer-events: all;
      }

      .icon svg {
        fill: currentColor;
        width: 12px; /* Adjusted size */
        height: 12px; /* Adjusted size */
      }

      input[type="color"] {
        z-index: ${ZIndex.TOP};
        opacity: 0;
        position: absolute;
        width: 32px;
        height: 32px;
        transform: translate(-1px, -1px);
        cursor: pointer;
      }
    `;

    shadow.appendChild(style);

    // Create the hidden color input
    this.colorInput = document.createElement("input");
    this.colorInput.type = "color";
    shadow.appendChild(this.colorInput);

    // Create the color preview element
    const colorContainer = document.createElement("div");
    colorContainer.classList.add("color-container");

    this.colorPreview = document.createElement("div");
    this.colorPreview.classList.add("color-preview");
    colorContainer.appendChild(this.colorPreview);

    // Create the color picker icon element
    this.iconElement = document.createElement("div");
    this.iconElement.classList.add("icon");
    this.iconElement.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.66 2c-.94 0-1.85.37-2.54 1.06L5.17 13l.89.88a4.004 4.004 0 0 0-1.06 3.73c.23 1.08.87 2.02 1.8 2.64.66.44 1.42.67 2.18.68.76 0 1.53-.23 2.18-.68l8.95-8.95c1.42-1.42 1.42-3.72 0-5.14-.68-.68-1.59-1.06-2.53-1.06zm0 2c.36 0 .71.14.97.4.55.55.55 1.39 0 1.94L9.82 16.54a2.008 2.008 0 0 1-2.84 0 2.008 2.008 0 0 1 0-2.84L15.79 5.4c.25-.26.6-.4.97-.4zm-4.6 7.6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
      </svg>
    `;
    colorContainer.appendChild(this.iconElement);

    shadow.appendChild(colorContainer);

    // Add event listener for color change
    this.colorInput.addEventListener(
      "input",
      this.handleColorChange.bind(this),
    );

    // Add click event listener for color preview and icon
    this.colorPreview.addEventListener("click", () => this.colorInput.click());
    this.iconElement.addEventListener("click", () => this.colorInput.click());

    // Initialize attributes
    this.updateColor(this.getAttribute("value") || "#ffffff");
  }

  static get observedAttributes() {
    return ["value", "label"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "value" && oldValue !== newValue) {
      this.updateColor(newValue);
    } else if (name === "label" && oldValue !== newValue) {
      this.updateLabel();
    }
  }

  private handleColorChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const color = input.value;
    this.colorPreview.style.backgroundColor = color;
    this.dispatchEvent(new CustomEvent("color-change", { detail: { color } })); // Dispatch custom event with color data
  }

  private updateColor(color: string | null) {
    color = color || "#ffffff";

    this.value = color; // Update attribute
    this.colorPreview.style.backgroundColor = color; // Update preview
    this.colorInput.value = color; // Ensure input value is correct
  }

  private updateLabel() {
    const label = this.getAttribute("label") || "";
    if (!this.labelElement) {
      this.labelElement = new Typography();
      this.labelElement.display = "body1";
      this.shadowRoot?.appendChild(this.labelElement);
    }
    this.labelElement.textContent = label;
  }

  set value(color: string) {
    this.setAttribute("value", color);
  }

  get value() {
    return this.getAttribute("value") || "#ffffff";
  }

  set label(text: string) {
    this.setAttribute("label", text);
  }

  get label() {
    return this.getAttribute("label") || "";
  }
}

register("color-picker", ColorPicker);
