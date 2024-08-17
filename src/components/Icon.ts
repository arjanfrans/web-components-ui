import { register } from "./framework/register";

export class Icon extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        max-width: var(--icon-size, 1em);
        max-height: var(--icon-size, 1em);
        overflow: hidden;
        box-sizing: border-box;
        height: max-content;
        width: max-content;
      }

      :host([size="small"]) {
        --icon-size: 1em;
      }

      :host([size="medium"]) {
        --icon-size: 2em;
      }

      :host([size="large"]) {
        --icon-size: 3em;
      }

      :host(:not([size])) {
        --icon-size: 100%;
      }

      ::slotted(img),
      ::slotted(svg) {
        width: 100%;
        height: 100%;
        display: block;
      }
    `;

    shadow.appendChild(style);

    // Create a slot for the icon
    const slot = document.createElement("slot");
    shadow.appendChild(slot);
  }

  static get observedAttributes() {
    return ["size"];
  }
}

register("icon", Icon);
