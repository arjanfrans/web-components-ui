import { getPrefix, register } from "../../framework/register";
import { RadioButton } from "./RadioButton.ts";

export class RadioGroup extends HTMLElement {
  private radios?: NodeListOf<RadioButton>;

  constructor() {
    super();
  }

  connectedCallback() {
    // Update the radios when the group is attached to the DOM
    this.updateRadios();
    this.addEventListener("click", this.handleRadioClick); // Listen for regular clicks
  }

  attributeChangedCallback() {
    this.updateSelected();
  }

  private updateSelected() {
    this.radios = this.querySelectorAll(
      `${getPrefix()}-radio-button`,
    ) as NodeListOf<RadioButton>;

    this.radios.forEach((radio) => {
      if (radio.value === this.getAttribute("selected")) {
        this.clearChecked();
        radio.checked = true;
      }
    });
  }

  private handleRadioClick = (event: Event) => {
    const target = event.target as HTMLElement;

    // Check if the clicked element is a RadioButton and it's not disabled
    if (target instanceof RadioButton && !target.disabled) {
      this.setAttribute("selected", target.value);
      this.dispatchEvent(
        new CustomEvent("radio-selected", {
          detail: {
            radio: target,
            value: target.value,
          },
        }),
      ); // Notify that a change occurred
    }
  };

  static get observedAttributes() {
    return ["selected"];
  }

  private updateRadios() {
    // Get all RadioButtons inside the group
    this.radios = this.querySelectorAll(
      `${getPrefix()}-radio-button`,
    ) as NodeListOf<RadioButton>;

    // Ensure that only one radio button is checked at the start
    let anyChecked = false;
    this.radios.forEach((radio) => {
      if (radio.checked) {
        if (anyChecked) {
          radio.checked = false; // Uncheck extras if multiple are checked
        }
        anyChecked = true;
      }
    });
  }

  private clearChecked() {
    // Uncheck all radio buttons in the group
    this.radios?.forEach((radio) => {
      radio.checked = false;
    });
  }
}

register("radio-group", RadioGroup);
