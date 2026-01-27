import { register, variable } from "../framework/register";

export class Indent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-flex;
        align-self: stretch;
        box-sizing: border-box;
      }

      .indent {
        width: 1px;
        background-color: var(--semantic-stroke-light);
        margin-inline: ${variable("spacing-sm")};
        opacity: 0.6;
      }

      :host([strong]) .indent {
        background-color: var(--semantic-stroke-default);
        opacity: 1;
      }

      :host([dashed]) .indent {
        background-image: repeating-linear-gradient(
          to bottom,
          currentColor,
          currentColor 4px,
          transparent 4px,
          transparent 8px
        );
        background-color: transparent;
      }
    `;

    shadow.appendChild(style);

    const line = document.createElement("div");
    line.className = "indent";
    shadow.appendChild(line);
  }

  static get observedAttributes() {
    return ["strong", "dashed"];
  }

  set strong(value: boolean) {
    value ? this.setAttribute("strong", "") : this.removeAttribute("strong");
  }

  get strong() {
    return this.hasAttribute("strong");
  }

  set dashed(value: boolean) {
    value ? this.setAttribute("dashed", "") : this.removeAttribute("dashed");
  }

  get dashed() {
    return this.hasAttribute("dashed");
  }
}

register("indent", Indent);
