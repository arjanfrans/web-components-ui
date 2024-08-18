import { register } from "../framework/register";

export class Divider extends HTMLElement {
  private readonly dividerElement: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        margin: 0;
        box-sizing: border-box;
      }

      .divider {
        height: 1px;
        background-color: var(--semantic-stroke-default);
        margin-left: 0;
        margin-right: 0;
        box-sizing: border-box;
        transition: background-color 0.3s;
      }

      :host([vertical]) {
        display: inline-block;
        width: 1px;
        height: 100%; /* Take up the full height of the parent */
        margin: 0; /* Remove horizontal margins for vertical divider */
      }

      :host([vertical]) .divider {
        width: 1px;
        height: 100%; /* Ensure it fills the parent height */
      }

      :host([light]) .divider {
        background-color: rgba(var(--semantic-stroke-default_rgb), 0.5);
      }

      :host([fade]) .divider {
        background-color: inherit;
        border-bottom: 1px solid transparent;
        border-image: linear-gradient(90deg,var(--semantic-stroke-highlight),transparent 50%);
        border-image-slice: 1;
      }
    `;

    shadow.appendChild(style);

    this.dividerElement = document.createElement("div");
    this.dividerElement.className = "divider";
    shadow.appendChild(this.dividerElement);
  }

  static get observedAttributes() {
    return ["vertical", "light"];
  }

  // Property setters and getters
  set vertical(value: boolean) {
    if (value) {
      this.setAttribute("vertical", "");
    } else {
      this.removeAttribute("vertical");
    }
  }

  get vertical() {
    return this.hasAttribute("vertical");
  }

  set light(value: boolean) {
    if (value) {
      this.setAttribute("light", "");
    } else {
      this.removeAttribute("light");
    }
  }

  get light() {
    return this.hasAttribute("light");
  }
}

register("divider", Divider);
