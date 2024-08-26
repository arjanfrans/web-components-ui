import { register } from "../../framework/register";

export class TabPanel extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: none;
        padding: 10px;
        background: var(--semantic-background-default);
      }

      :host([active]) {
        display: block;
      }
    `;

    shadow.appendChild(style);
    const slot = document.createElement("slot");
    shadow.appendChild(slot);
  }
}

register("tab-panel", TabPanel);
