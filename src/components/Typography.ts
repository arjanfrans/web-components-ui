import { register } from "./framework/register"

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
    | "overline"
export class Typography extends HTMLElement {
    private shadow: ShadowRoot
    private content?: HTMLElement = undefined

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: "open" })

        // Create a style element
        const style = document.createElement("style")
        style.textContent = `
            :host {
            }
            
            :host h1, h2, h3, h4, h5, h6 {
              font-size: 1em; /* Reset font size to a neutral value */
              font-weight: normal; /* Reset font weight to normal */
              margin: 0; /* Remove default margin */
              padding: 0; /* Remove default padding */
              line-height: 1.2; /* Set a standard line height */
              color: inherit; /* Inherit color from parent, or set a specific color */
              text-align: inherit; /* Inherit text alignment from parent */
            }
            
            :host p {
                margin: 0;
                padding: 0;
                font-size: 1em;
                line-height: 1.5;
                font-family: inherit;
            }
            
            :host([display="h1"]) {
                * {
                    font-family: var(--hb-font-family-heading);
                    font-size: var(--hb-font-size-title);
                    font-weight: 700;
                    border-bottom: 1px solid transparent;
                    border-image: linear-gradient(90deg,var(--semantic-stroke-highlight),transparent 50%);
                    border-image-slice: 1;
                }
            }
            
            :host([display="h2"]) {
                * {
                    font-family: var(--hb-font-family-heading);
                    font-size: var(--hb-font-size-lg);
                }
            }
            
            :host([display="h3"]) {
                * {
                    font-family: var(--hb-font-family-heading);
                    font-size: var(--hb-font-size-lg);
                }
            }
            
            :host([display="body1"]) {
                font-size: var(--hb-font-size-default);
            }
            
            :host([display="body2"]) {
                font-size: var(--hb-font-size-default);
            }
            
            :host([display="overline"]) {
                font-size: var(--hb-font-size-sm);
                line-height: 2.66;
                letter-spacing: 0.08333em;
                text-transform: uppercase;
                margin-bottom: 0.35em;
            }
            
            :host([display="button"]) {
                font-size: var(--hb-font-size-default);
                font-weight: bold;
                line-height: 1.75;
                letter-spacing: 0.02857em;
                text-transform: uppercase;
                margin-bottom: 0.35em;
            }
        `
        this.shadow.appendChild(style)

        this.updateContent()
    }

    set display(display: Display) {
        this.setAttribute("display", display)
    }

    get display() {
        return (this.getAttribute("display") as Display) || ""
    }

    set tag(tag: string) {
        this.setAttribute("tag", tag)
    }

    get tag() {
        return this.getAttribute("tag") || ""
    }

    static get observedAttributes() {
        return ["tag", "display"]
    }

    private updateContent() {
        if (this.content) {
            this.shadow.removeChild(this.content)
        }

        this.content = document.createElement(this.tag)
        const slot = document.createElement("slot")

        this.content.append(slot)
        this.shadow.append(this.content)
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (name === "tag" && oldValue !== newValue) {
            this.updateContent()
        } else if (name === "display" && oldValue !== newValue) {
            this.updateContent()
        }
    }
}

register("typography", Typography)
