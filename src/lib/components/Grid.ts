import { register, variable } from "../framework/register";
import { Breakpoint } from "./variables/Breakpoint";

export class Grid extends HTMLElement {
  private styleElement: HTMLStyleElement;

  constructor() {
    super();
    // Attach the shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create a style element
    this.styleElement = document.createElement("style");
    shadow.appendChild(this.styleElement);

    const slot = document.createElement("slot");
    shadow.append(slot);

    // Initial update of styles
    this.updateStyles();
  }

  static get observedAttributes() {
    return ["xs", "md", "lg", "xl"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (Grid.observedAttributes.includes(name) && oldValue !== newValue) {
      this.updateStyles();
    }
  }

  updateStyles() {
    const xs = this.getAttribute("xs") || "1";
    const md = this.getAttribute("md") || "1";
    const lg = this.getAttribute("lg") || "1";
    const xl = this.getAttribute("xl") || "1";

    this.styleElement.textContent = `
            :host {
                display: grid;
                gap: ${variable("spacing-md")};
                grid-template-columns: repeat(${xs}, 1fr);
            }

            @media (min-width: ${Breakpoint.XS}px) {
                :host([xs]) {
                    grid-template-columns: repeat(${xs}, 1fr);
                }
            }

            @media (min-width: ${Breakpoint.MD}px) {
                :host([md]) {
                    grid-template-columns: repeat(${md}, 1fr);
                }
            }

            @media (min-width: ${Breakpoint.LG}px) {
                :host([lg]) {
                    grid-template-columns: repeat(${lg}, 1fr);
                }
            }

            @media (min-width: ${Breakpoint.XL}px) {
                :host([xl]) {
                    grid-template-columns: repeat(${xl}, 1fr);
                }
            }
        `;
  }

  // Getters and setters for attributes
  get xs() {
    return this.getAttribute("xs");
  }

  set xs(value) {
    if (value) {
      this.setAttribute("xs", value);
    } else {
      this.removeAttribute("xs");
    }
  }

  get md() {
    return this.getAttribute("md");
  }

  set md(value) {
    if (value) {
      this.setAttribute("md", value);
    } else {
      this.removeAttribute("md");
    }
  }

  get lg() {
    return this.getAttribute("lg");
  }

  set lg(value) {
    if (value) {
      this.setAttribute("lg", value);
    } else {
      this.removeAttribute("lg");
    }
  }

  get xl() {
    return this.getAttribute("xl");
  }

  set xl(value) {
    if (value) {
      this.setAttribute("xl", value);
    } else {
      this.removeAttribute("xl");
    }
  }
}

register("grid", Grid);
