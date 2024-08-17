import { register } from "./framework/register";

export class TabPanel extends HTMLElement {
  constructor() {
    super();

    this.setAttribute("role", "tabpanel");
  }
}

register("tab-panel", TabPanel);
