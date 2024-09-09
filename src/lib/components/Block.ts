import { register } from "../framework/register";
import { stretchStyle } from "./styles/stretch.ts";

export class Block extends HTMLElement {
  constructor() {
    super();

    const style = document.createElement("style");

    style.textContent = `
            :host {
                display: flex;
                flex-wrap: wrap;
            }
            
            ${stretchStyle()}
      `;

    const shadow = this.attachShadow({ mode: "open" });

    shadow.appendChild(style);

    const slot = document.createElement("slot");

    shadow.appendChild(slot);
  }
}

// Register the custom element
register("block", Block);
