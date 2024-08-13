import { register, variable } from "./framework/register";

type Display =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline";
export class Typography extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    // Create a style element
    const style = document.createElement("style");
    style.textContent = `          
            :host {
              display: inline;
            }
            
            ::slotted(h1), ::slotted(h2), ::slotted(h3), ::slotted(h4), ::slotted(h5), ::slotted(h6) {
              font-size: 1em; /* Reset font size to a neutral value */
              font-weight: normal; /* Reset font weight to normal */
              margin: 0; /* Remove default margin */
              padding: 0; /* Remove default padding */
              line-height: 1.2; /* Set a standard line height */
              color: inherit; /* Inherit color from parent, or set a specific color */
              text-align: inherit; /* Inherit text alignment from parent */
            }
            
            ::slotted(p) {
                margin: 0;
                padding: 0;
                font-size: 1em;
                line-height: 1.5;
                font-family: inherit;
            }
            
            :host([display="h1"]) ::slotted(*), :host([display="h1"])  {
                  font-family: ${variable("font-family-heading")};
                  font-size: ${variable("font-size-title")};
                  font-weight: 700;
                  border-bottom: 1px solid transparent;
                  border-image: linear-gradient(90deg,var(--semantic-stroke-highlight),transparent 50%);
                  border-image-slice: 1;
              }
            
            :host([display="h2"]) ::slotted(*), :host([display="h2"]) {
                  font-family: ${variable("font-family-heading")};
                  font-size: ${variable("font-size-lg")};
            }
            
            :host([display="h3"]) ::slotted(*), :host([display="h3"]) {
                font-family: ${variable("font-family-heading")};
                font-size: ${variable("font-size-lg")};
            }
            
            :host([display="body1"]) ::slotted(*), :host([display="body1"]) {
                font-size: ${variable("font-size-default")};
            }
            
            :host([display="body2"]) ::slotted(*), :host([display="body2"]) {
                font-size: ${variable("font-size-default")};
            }
            
            :host([display="overline"]) ::slotted(*), :host([display="overline"]) {
                font-size: ${variable("font-size-sm")};
                line-height: 2.66;
                letter-spacing: 0.08333em;
                text-transform: uppercase;
            }
            
            :host([display="button"]) ::slotted(*), :host([display="button"]) {
                font-size: ${variable("font-size-default")};
                font-weight: bold;
                line-height: 1.75;
                letter-spacing: 0.02857em;
                text-transform: uppercase;
            }
        `;
    this.shadow.appendChild(style);

    const slot = document.createElement("slot");

    this.shadow.append(slot);
  }

  set display(display: Display) {
    this.setAttribute("display", display);
  }

  get display() {
    return (this.getAttribute("display") as Display) || "";
  }

  static get observedAttributes() {
    return ["display"];
  }
}

register("typography", Typography);
