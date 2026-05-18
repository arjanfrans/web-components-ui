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
        object-fit: contain;
        object-position: center;
        max-width: 100%;
        height: auto;
      }

      :host([size="small"]) {
        width: 128px;
      }

      :host([size="medium"]) {
        width: 256px;
      }

      :host([size="large"]) {
        width: 512px;
      }

      :host([size="none"]) {
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
    return ["size", "width", "height", "loading"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    // Update size if necessary
    if (oldValue !== newValue && Figure.observedAttributes.includes(name)) {
      this.updateImageSize();
    }
  }

  private updateImageSize() {
    const img = this.querySelector("img")!;
    const loading = this.getAttribute("loading") || undefined;
    const width = this.getAttribute("width") || undefined;
    const height = this.getAttribute("height") || undefined;

    if (loading) {
      img.loading = loading === "lazy" ? loading : "eager";
    }

    if (width) {
      img.style.width = width;
      this.style.width = width;
    }

    if (height) {
      img.style.height = height;
      this.style.height = height;
    }
  }
}

register("figure", Figure);
