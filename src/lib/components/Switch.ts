import { register, variable } from "../framework/register";
import { Typography } from "./Typography";

export class Switch extends HTMLElement {
  private readonly toggleSwitch: HTMLDivElement;
  private readonly switchKnob: HTMLDivElement;
  private readonly inputElement: HTMLInputElement;
  private readonly labelElement: Typography;

  constructor() {
    super();
    // Attach the shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create a style element
    const style = document.createElement("style");
    style.textContent = `
            :host {
                display: inline-flex;
                align-items: flex-start;
            }

            .toggle-switch {
                width: 42px;
                height: 24px;
                background-color: var(--semantic-stroke-default);
                border-radius: 12px;
                position: relative;
                transition: background-color 0.2s;
                flex-shrink: 0;
                cursor: pointer;
            }

            .switch-knob {
                width: 20px;
                height: 20px;
                background-color: var(--semantic-background-default);
                border-radius: ${variable("border-sm")};
                position: absolute;
                top: 2px;
                left: 2px;
                transition: left 0.2s;
            }

            :host([checked]) .toggle-switch {
                background-color: var(--semantic-stroke-highlight);
            }

            :host([checked]) .switch-knob {
                left: 20px;
            }

            :host([disabled]) .toggle-switch {
                cursor: not-allowed;
                opacity: 0.6;
            }

            input {
                display: none;
            }

            .label {
                margin-left: ${variable("spacing-sm")};
                cursor: auto;
            }

            .required-asterisk::after {
                content: " *";
                color: red; /* Optional: To highlight the asterisk */
            }
        `;

    // Append the style to the shadow root
    shadow.appendChild(style);

    // Create the hidden checkbox input element
    this.inputElement = document.createElement("input");
    this.inputElement.type = "checkbox";
    shadow.appendChild(this.inputElement);

    // Create the toggle switch container
    this.toggleSwitch = document.createElement("div");
    this.toggleSwitch.classList.add("toggle-switch");
    shadow.appendChild(this.toggleSwitch);

    // Create the switch knob
    this.switchKnob = document.createElement("div");
    this.switchKnob.classList.add("switch-knob");
    this.toggleSwitch.appendChild(this.switchKnob);

    // Create the label element
    this.labelElement = new Typography();
    this.labelElement.display = "body1";
    this.labelElement.classList.add("label");

    shadow.appendChild(this.labelElement);

    // Add click event listener to the toggle switch
    this.toggleSwitch.addEventListener("click", () => {
      if (!this.disabled) {
        this.checked = !this.checked;
        this.dispatchEvent(new Event("change"));
      }
    });

    // Initialize attributes
    if (!this.hasAttribute("checked")) {
      this.checked = false;
    }

    if (!this.hasAttribute("disabled")) {
      this.disabled = false;
    }

    // Set initial content for the label
    this.updateLabel();
  }

  static get observedAttributes() {
    return ["checked", "disabled", "name", "value", "required", "label"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "checked" && oldValue !== newValue) {
      this.updateCheckedState();
    } else if (name === "disabled" && oldValue !== newValue) {
      this.updateDisabledState();
    } else if (name === "name" && oldValue !== newValue) {
      this.inputElement.name = newValue || "";
    } else if (name === "value" && oldValue !== newValue) {
      this.inputElement.value = newValue || "";
    } else if (name === "required" && oldValue !== newValue) {
      this.inputElement.required = newValue !== null;
      this.updateLabel(); // Update the label when required attribute changes
    } else if (name === "label" && oldValue !== newValue) {
      this.updateLabel();
    }
  }

  private updateCheckedState() {
    this.inputElement.checked = this.checked;
    if (this.checked) {
      this.setAttribute("checked", "");
    } else {
      this.removeAttribute("checked");
    }
  }

  private updateDisabledState() {
    this.inputElement.disabled = this.disabled;
    if (this.disabled) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }

  private updateLabel() {
    this.labelElement.textContent = this.label;
    if (this.required) {
      this.labelElement.classList.add("required-asterisk");
    } else {
      this.labelElement.classList.remove("required-asterisk");
    }
  }

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

  set name(value: string) {
    this.setAttribute("name", value);
  }

  get name() {
    return this.getAttribute("name") || "";
  }

  set value(value: string) {
    this.setAttribute("value", value);
  }

  get value() {
    return this.getAttribute("value") || "";
  }

  set required(value: boolean) {
    if (value) {
      this.setAttribute("required", "");
    } else {
      this.removeAttribute("required");
    }
  }

  get required() {
    return this.hasAttribute("required");
  }

  set label(value: string) {
    this.setAttribute("label", value);
  }

  get label() {
    return this.getAttribute("label") || "";
  }

  // Provide form-like behavior by returning the input element
  get form() {
    return this.inputElement.form;
  }

  // Required for form submission
  get validity() {
    return this.inputElement.validity;
  }

  get validationMessage() {
    return this.inputElement.validationMessage;
  }

  checkValidity() {
    return this.inputElement.checkValidity();
  }

  reportValidity() {
    return this.inputElement.reportValidity();
  }

  // Support setting focus on the component
  focus() {
    this.inputElement.focus();
  }
}

register("switch", Switch);
