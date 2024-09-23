import { register } from "../framework/register";

export class Figure extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-block;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
      }

      ::slotted(img) {
        display: block;
        object-fit: contain; /* Maintain aspect ratio while fitting within bounds */
        object-position: center; /* Center the image if there are empty spaces */
        max-width: 100%;
      }

      :host([size="small"]) ::slotted(img) {
        width: 128px;
        height: auto;
      }

      :host([size="medium"]) ::slotted(img) {
        width: 256px;
        height: auto;
      }

      :host([size="large"]) ::slotted(img) {
        width: 512px;
        height: auto;
      }

      :host([size="none"]) ::slotted(img) {
        width: 100%;
        height: 100%;
      }
    `;

    this.shadow.appendChild(style);

    // Add the slot element to the shadow DOM
    const slot = document.createElement("slot");
    this.shadow.appendChild(slot);
  }

  static get observedAttributes() {
    return ["size", "width", "height"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    // Update size if necessary
    if (oldValue !== newValue && ["size", "width", "height"].includes(name)) {
      this.updateImageSize();
    }
  }

  private updateImageSize() {
    const img = this.querySelector("img")!;
    const width = this.getAttribute("width") || undefined;
    const height = this.getAttribute("height") || undefined;

    if (width) {
      img.style.width = width;
    }

    if (height) {
      img.style.height = height;
    }
    // This function can handle additional logic if needed when size changes
    // However, with the current CSS setup, it might not be needed
  }
}

register("figure", Figure);
