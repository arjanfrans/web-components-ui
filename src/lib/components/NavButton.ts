import { register, variable } from "../framework/register";
import { stretchStyle } from "./styles/stretch.ts";

export class NavButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" }).innerHTML = `
        <style>
          :host {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: ${variable("spacing-sm")};
            gap: ${variable("spacing-sm")};
            cursor: pointer;
            user-select: none;
          }

          ${stretchStyle()}
  
          :host(:hover) {
            background-color: rgba(var(--semantic-stroke-highlight_rgb), 0.05);
          }


          :host([border-bottom]) {
            border-bottom: 1px solid var(--semantic-stroke-default);
          }

          :host([border-top]) {
            border-top: 1px solid var(--semantic-stroke-default);
          }
  
          .text {
            flex: 1;
          }
  
          .icon {
            display: inline-block;
            width: 1em;
            height: 1em;
            transform: rotate(0) scale(1.2);
            fill: var(--semantic-text-default);
          }

          :host([arrow="left"]) {
            flex-direction: row-reverse;
          }
  
          :host([arrow="left"]) .icon {
            transform: rotate(180deg) scale(1.2);
            
          }
  
          :host([arrow="none"]) .icon {
            display: none;
          }
        </style>
        <span class="text"><slot></slot></span>
        <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 6l6 6-6 6" />
        </svg>
      `;

    this.update();
  }

  static get observedAttributes() {
    return ["border-top", "border-bottom", "arrow"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (NavButton.observedAttributes.includes(name) && oldValue !== newValue) {
      this.update();
    }
  }

  private update(): void {
    if (
      !this.hasAttribute("border-top") &&
      !this.hasAttribute("border-bottom")
    ) {
      this.setAttribute("border-bottom", "");
    }
  }
}

register("nav-button", NavButton);
