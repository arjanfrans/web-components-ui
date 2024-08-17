import { register } from "./framework/register";

export class TabButton extends HTMLElement {
  constructor() {
    super();
    this.setAttribute("role", "tab");
  }
}

register("tab-button", TabButton);
