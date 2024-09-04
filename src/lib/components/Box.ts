import { register, variable } from "../framework/register";
import { justifyStyle } from "./styles/justify.ts";
import { stretchStyle } from "./styles/stretch.ts";

export class Box extends HTMLElement {
  constructor() {
    super();
    // Attach the shadow root
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");

    style.textContent = `
            :host {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
            }

            ${justifyStyle()}
            ${stretchStyle()}

            :host([margin-inline="small"]) {
                padding-inline: ${variable("spacing-sm")};
            }

            :host([margin-block="small"]) {
                padding-block: ${variable("spacing-sm")};
            }

            :host([margin-inline="medium"]) {
                padding-inline: ${variable("spacing-md")};
            }

            :host([margin-block="medium"]) {
                padding-block: ${variable("spacing-md")};
            }

            :host([margin-inline="large"]) {
                padding-inline: ${variable("spacing-lg")};
            }

            :host([margin-block="large"]) {
                padding-block: ${variable("spacing-lg")};
            }

            :host([margin-inline="extra-large"]) {
                padding-inline: ${variable("spacing-xl")};
            }

            :host([margin-block="extra-large"]) {
                padding-block: ${variable("spacing-xl")};
            }


            :host([margin-block="extra-large"]) {
                padding-block: ${variable("spacing-xl")};
            }
        `;

    // Append the style to the shadow root
    shadow.appendChild(style);

    const slot = document.createElement("slot");
    shadow.append(slot);
  }

  static get observedAttributes() {
    return ["margin-inline", "margin-block", "justify-content", "align-items"];
  }
}

register("box", Box);
