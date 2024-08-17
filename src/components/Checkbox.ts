import { register, variable } from "./framework/register";

export class Checkbox extends HTMLElement {
  private checkboxElement: HTMLInputElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-flex;
        align-items: center;
        gap: ${variable("spacing-xs")};
        cursor: pointer;
        width: max-content;
      }

      :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .checkbox {
        appearance: none;
        width: 18px;
        height: 18px;
        border: 2px solid rgba(var(--semantic-background-inverted_rgb), 0.5);
        border-radius: ${variable("border-xs")};
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s, border-color 0.3s;
        cursor: pointer;
      }

      .checkbox:checked {
        background-color: var(--semantic-background-highlight);
        border-color: var(--semantic-background-highlight);
      }

      .checkbox:checked::before {
        content: "";
        width: 12px;
        height: 12px;
        background-color: var(--semantic-background-default);
        clip-path: polygon(14% 44%, 0% 65%, 50% 100%, 100% 18%, 80% 0%, 43% 62%);
      }

      .checkbox:disabled {
        background-color: rgba(var(--semantic-background-inverted_rgb), 0.5);
        border-color: rgba(var(--semantic-background-inverted_rgb), 0.5);
        cursor: not-allowed;
      }
    `;

    shadow.appendChild(style);

    // Create the checkbox input
    this.checkboxElement = document.createElement("input");
    this.checkboxElement.type = "checkbox";
    this.checkboxElement.className = "checkbox";
    shadow.appendChild(this.checkboxElement);

    const labelContainer = document.createElement("div");
    labelContainer.className = "label";

    const slot = document.createElement("slot");
    labelContainer.appendChild(slot);

    shadow.append(labelContainer);

    // Add event listeners for the host element
    this.addEventListener("click", this.toggleCheckbox);
    this.addEventListener("pointerdown", (event) => event.preventDefault());

    // Prevent checkbox input from receiving its own click events
    this.checkboxElement.addEventListener("click", (event) =>
      event.stopPropagation(),
    );

    // Initialize checkbox state
    this.updateCheckbox();
  }

  static get observedAttributes() {
    return ["checked", "disabled"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (Checkbox.observedAttributes.includes(name) && oldValue !== newValue) {
      this.updateCheckbox();
    }
  }

  private updateCheckbox() {
    this.checkboxElement.checked = this.hasAttribute("checked");
    this.checkboxElement.disabled = this.hasAttribute("disabled");

    if (this.checkboxElement.disabled) {
      this.classList.add("disabled");
    } else {
      this.classList.remove("disabled");
    }
  }

  private toggleCheckbox = () => {
    if (!this.checkboxElement.disabled) {
      this.checked = !this.checkboxElement.checked;
    }
  };

  // Property setters and getters
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

register("checkbox", Checkbox);
