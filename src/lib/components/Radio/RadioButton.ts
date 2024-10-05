import { register, variable } from "../../framework/register";

export class RadioButton extends HTMLElement {
  private radioElement: HTMLInputElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${variable("spacing-xs")};
      }

      :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.5;
      }

      label {
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        gap: ${variable("spacing-xs")};
      }

      .radio {
        appearance: none;
        width: 2em; /* Adjust size */
        height: 2em; /* Adjust size */
        border: 2px solid var(--semantic-stroke-default);
        border-radius: 50%;
        background-color: transparent;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s, border-color 0.3s;
        position: relative; /* Important for the inner dot */
        cursor: pointer;
        transform: translateY(-3px);
      }

      .radio:checked {
        background-color: var(--semantic-background-highlight);
        border-color: var(--semantic-background-highlight);
      }

      .radio:checked::before {
        content: "";
        width: 1em; /* Inner dot size */
        height: 1em;
        background-color: var(--semantic-background-default);
        border-radius: 50%;
        position: absolute;
      }

      .radio:disabled {
        background-color: rgba(var(--semantic-background-inverted_rgb), 0.2);
        border-color: var(--semantic-stroke-default);
      }
    `;

    shadow.appendChild(style);

    // Create the label that wraps both the radio input and the custom slot
    const label = document.createElement("label");

    // Create the radio input element
    this.radioElement = document.createElement("input");
    this.radioElement.type = "radio";
    this.radioElement.className = "radio";
    label.appendChild(this.radioElement);

    // Add a slot for the custom label
    const slot = document.createElement("slot");
    label.appendChild(slot);

    shadow.appendChild(label);

    // Ensure clicking triggers a custom event
    this.radioElement.addEventListener("click", this.handleClick);

    this.updateRadio();
  }

  static get observedAttributes() {
    return ["checked", "disabled", "value"];
  }

  attributeChangedCallback() {
    this.updateRadio();
  }

  private updateRadio() {
    this.radioElement.checked = this.hasAttribute("checked");
    this.radioElement.disabled = this.hasAttribute("disabled");
  }

  private handleClick = () => {
    if (!this.radioElement.disabled) {
      const value = this.getAttribute("value") || ""; // Get the value of the radio button
      // Dispatch a custom event 'radio-selected' with the value
      const event = new CustomEvent("radio-selected", {
        bubbles: true, // Ensure it bubbles up to the RadioGroup
        composed: true, // Allow it to pass through shadow DOM
        detail: { radio: this, value }, // Pass the radio button and its value as detail
      });
      this.dispatchEvent(event);
    }
  };

  set checked(value: boolean) {
    if (value) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }

  get checked() {
    return this.hasAttribute("checked");
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  set value(value: string) {
    this.setAttribute("value", value);
  }

  get value() {
    return this.getAttribute("value") || "";
  }
}

register("radio-button", RadioButton);
