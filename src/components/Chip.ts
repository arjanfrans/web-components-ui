import { register } from "./framework/register"

type ChipSize = "small" | "large"

export class Chip extends HTMLElement {
    private readonly chipContent: HTMLDivElement

    constructor() {
        super()
        // Attach the shadow root
        const shadow = this.attachShadow({ mode: "open" })

        // Create a style element
        const style = document.createElement("style")
        style.textContent = `
            :host {
                align-items: center;
                border: 1px solid var(--semantic-stroke-default);
                border-radius: 30px;
                display: flex;
                justify-content: center;
                text-align: center;
                text-decoration: none;
                text-overflow: ellipsis;
                transition: background-color .1s, color .1s, border-color .1s;
                white-space: nowrap;
                width: max-content;
            }

            :host(:hover),
            :host([active]) {
                color: var(--semantic-text-inverted);
                background-color: var(--semantic-stroke-highlight);
            }
            
            :host([size="small"]) {
                font-size: var(--hb-font-size-sm);
                padding-block: var(--hb-gap-5xs);
                padding-inline: var(--hb-gap-2xs);
            }
            
            :host([size="large"]) {
                font-size: var(--hb-font-size-md);
                padding-block: var(--hb-gap-5xs);
                padding-inline: var(--hb-gap-2xs);
            }
        `

        // Append the style to the shadow root
        shadow.appendChild(style)

        // Create a div to hold the chip content
        this.chipContent = document.createElement("div")
        shadow.appendChild(this.chipContent)

        // Set initial content
        this.updateContent()

        if (!this.hasAttribute("size")) {
            this.setAttribute("size", "small")
        }
    }

    // Observe changes to 'value' and 'active' attributes
    static get observedAttributes() {
        return ["value", "active", "size"]
    }

    // Handle changes to attributes
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (name === "value" && oldValue !== newValue) {
            this.updateContent()
        } else if (name === "active" && oldValue !== newValue) {
            this.updateActiveState()
        } else if (name === "size" && oldValue !== newValue) {
            this.updateSize()
        }
    }

    private updateContent() {
        this.chipContent.textContent = this.value
    }

    private updateActiveState() {
        if (this.active) {
            this.setAttribute("active", "")
        } else {
            this.removeAttribute("active")
        }
    }

    private updateSize() {
        if (this.size) {
            this.setAttribute("size", this.size)
        } else {
            this.removeAttribute("size")
        }
    }

    set active(value: boolean) {
        if (value) {
            this.setAttribute("active", "")
        } else {
            this.removeAttribute("active")
        }
    }

    get active() {
        return this.hasAttribute("active")
    }

    set value(value: string) {
        this.setAttribute("value", value)
    }

    get value() {
        return this.getAttribute("value") || ""
    }

    set size(value: ChipSize) {
        this.setAttribute("size", value)
    }

    get size(): ChipSize {
        return (this.getAttribute("size") as ChipSize) || "small"
    }
}

register("chip", Chip)
