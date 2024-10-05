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

  private handleRadioClick = (event: Event) => {
    const target = event.target as HTMLElement;

    // Check if the clicked element is a RadioButton and it's not disabled
    if (target instanceof RadioButton && !target.disabled) {
      this.clearChecked(); // Uncheck all other radios
      target.checked = true; // Check the selected one
      this.dispatchEvent(new Event("change")); // Notify that a change occurred
    }
  };

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
