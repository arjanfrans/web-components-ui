import { register } from "./framework/register";

export class Container extends HTMLElement {
  constructor() {
    super();
    // Attach the shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create a style element
    const style = document.createElement("style");
    style.textContent = `
            :host {
                display: block;
                background-color: var(--semantic-background-default);
                color: var(--semantic-text-default);
                font-family: var(--hb-font-family-default);
                width: 100%;
            }
        `;
    shadow.appendChild(style);

    const slot = document.createElement("slot");
    shadow.append(slot);
  }
}

register("container", Container);
