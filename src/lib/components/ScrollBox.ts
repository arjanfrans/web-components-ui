import { register } from "../framework/register";
import { stretchStyle } from "./styles/stretch.ts";

export class ScrollBox extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
            :host {
                display: block;
                overflow: auto;
            }

            ${stretchStyle()}
        `;

    shadow.appendChild(style);

    const slot = document.createElement("slot");
    shadow.append(slot);
  }

  static get observedAttributes() {
    return ["stretch", "height", "width"];
  }

  connectedCallback() {
    // Apply initial attribute values when the component is added to the DOM
    if (this.hasAttribute("height")) {
      this.style.height = this.getAttribute("height") || "auto";
    }
    if (this.hasAttribute("width")) {
      this.style.width = this.getAttribute("width") || "auto";
    }
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (!ScrollBox.observedAttributes.includes(name) || oldValue === newValue) {
      return;
    }

    if (name === "height") {
      this.style.height = newValue || "auto";
    }

    if (name === "width") {
      this.style.width = newValue || "auto";
    }
  }
}

register("scroll-box", ScrollBox);
