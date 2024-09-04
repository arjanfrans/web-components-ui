import { register, variable } from "../framework/register";
import type { Gap } from "./variables/Gap";
import { justifyStyle } from "./styles/justify.ts";
import { stretchStyle } from "./styles/stretch.ts";

export class Stack extends HTMLElement {
  private readonly styleElement: HTMLStyleElement;

  constructor() {
    super();
    // Attach the shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create a style element
    this.styleElement = document.createElement("style");
    shadow.appendChild(this.styleElement);

    const slot = document.createElement("slot");
    shadow.append(slot);

    this.setAttribute("stretch-horizontal", "");

    // Initial update of styles
    this.updateStyles();
  }

  static get observedAttributes() {
    return ["direction", "gap", "margin-inline", "margin-block", "stretch"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (Stack.observedAttributes.includes(name) && oldValue !== newValue) {
      this.updateStyles();
    }
  }

  updateStyles() {
    const direction = this.getAttribute("direction") || "vertical";
    const gap = this.getGapVariable(
      (this.getAttribute("gap") as Gap) || "none",
    );
    const marginInline = this.getMarginVariable(
      (this.getAttribute("margin-inline") as Gap) || "none",
    );
    const marginBlock = this.getMarginVariable(
      (this.getAttribute("margin-block") as Gap) || "none",
    );

    this.styleElement.textContent = `
            :host {
                display: flex;
                flex-direction: ${
                  direction === "horizontal" ? "row" : "column"
                };
                gap: ${gap};
                padding-inline: ${marginInline};
                padding-block: ${marginBlock};
                flex-wrap: wrap;
                box-sizing: border-box;
            }
                
            ${justifyStyle()}
            ${stretchStyle()}

            :host([stretch][direction="horizontal"]) {
                width: 100%;
            }

            :host([stretch][direction="vertical"]) {
                height: 100%;
            }
        `;
  }

  private getGapVariable(type: Gap): string {
    switch (type) {
      case "none":
        return "0px";
      case "small":
        return variable("spacing-sm");
      case "medium":
        return variable("spacing-md");
      case "large":
        return variable("spacing-lg");
      case "extra-large":
        return variable("spacing-xl");
      default:
        return variable("spacing-md");
    }
  }

  private getMarginVariable(type: Gap): string {
    return this.getGapVariable(type); // Reuse gap variables for margin
  }

  // Getters and setters for attributes
  get direction() {
    return this.getAttribute("direction");
  }

  set direction(value) {
    if (value) {
      this.setAttribute("direction", value);
    } else {
      this.removeAttribute("direction");
    }
  }

  get gap(): Gap {
    return (this.getAttribute("gap") || "none") as Gap;
  }

  set gap(value: Gap) {
    if (value) {
      this.setAttribute("gap", value);
    } else {
      this.removeAttribute("gap");
    }
  }

  get marginInline(): Gap {
    return (this.getAttribute("margin-inline") || "none") as Gap;
  }

  set marginInline(value: Gap) {
    if (value) {
      this.setAttribute("margin-inline", value);
    } else {
      this.removeAttribute("margin-inline");
    }
  }

  get marginBlock(): Gap {
    return (this.getAttribute("margin-block") || "none") as Gap;
  }

  set marginBlock(value: Gap) {
    if (value) {
      this.setAttribute("margin-block", value);
    } else {
      this.removeAttribute("margin-block");
    }
  }
}

register("stack", Stack);
