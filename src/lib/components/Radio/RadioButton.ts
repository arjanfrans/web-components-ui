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

      .radio {
        appearance: none;
        width: 1.5em; /* Adjust size */
        height: 1.5em; /* Adjust size */
        border: 2px solid var(--semantic-stroke-default);
        border-radius: 50%;
        background-color: transparent;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s, border-color 0.3s;
        position: relative; /* Important for the inner dot */
        cursor: pointer;
        transform: translateY(-1px);
      }

      .radio:checked {
        background-color: var(--semantic-background-highlight);
        border-color: var(--semantic-background-highlight);
      }

      .radio:checked::before {
        content: "";
        width: 0.75em; /* Inner dot size */
        height: 0.75em;
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

    // Create the radio input element
    this.radioElement = document.createElement("input");
    this.radioElement.type = "radio";
    this.radioElement.className = "radio";
    shadow.appendChild(this.radioElement);

    // Add a slot for custom label
    const slot = document.createElement("slot");
    shadow.appendChild(slot);

    // Ensure clicking triggers a custom event
    this.radioElement.addEventListener("click", this.handleClick);

    this.updateRadio();
  }

  static get observedAttributes() {
    return ["checked", "disabled"];
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
      // Dispatch a custom event 'radio-selected'
      const event = new CustomEvent("radio-selected", {
        bubbles: true, // Ensure it bubbles up to the RadioGroup
        composed: true, // Allow it to pass through shadow DOM
        detail: { radio: this }, // Pass this radio button as detail
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
}

register("radio-button", RadioButton);
