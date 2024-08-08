import { register } from "./framework/register"
import type { Gap } from "./variables/Gap"

export class Stack extends HTMLElement {
    private styleElement: HTMLStyleElement

    constructor() {
        super()
        // Attach the shadow root
        const shadow = this.attachShadow({ mode: "open" })

        // Create a style element
        this.styleElement = document.createElement("style")
        shadow.appendChild(this.styleElement)

        const slot = document.createElement("slot")
        shadow.append(slot)

        // Initial update of styles
        this.updateStyles()
    }

    static get observedAttributes() {
        return ["direction", "gap", "margin-inline", "margin-block", "justify-content"]
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (Stack.observedAttributes.includes(name) && oldValue !== newValue) {
            this.updateStyles()
        }
    }

    updateStyles() {
        const direction = this.getAttribute("direction") || "vertical"
        const gap = this.getGapVariable((this.getAttribute("gap") as Gap) || "none")
        const marginInline = this.getMarginVariable((this.getAttribute("margin-inline") as Gap) || "none")
        const marginBlock = this.getMarginVariable((this.getAttribute("margin-block") as Gap) || "none")
        const justifyContent = this.getAttribute("justify-content") || "flex-start"

        this.styleElement.textContent = `
            :host {
                display: flex;
                flex-direction: ${direction === "horizontal" ? "row" : "column"};
                gap: ${gap};
                margin-inline: ${marginInline};
                margin-block: ${marginBlock};
                justify-content: ${justifyContent};
            }
        `
    }

    private getGapVariable(type: Gap): string {
        switch (type) {
            case "none":
                return "0px"
            case "small":
                return "var(--hb-gap-2xs)" // 16px
            case "medium":
                return "var(--hb-gap-md)" // 32px
            case "large":
                return "var(--hb-gap-lg)" // 40px
            case "extra-large":
                return "var(--hb-gap-xl)" // 56px
            default:
                return "var(--hb-gap-md)" // Default to medium if no match
        }
    }

    private getMarginVariable(type: Gap): string {
        return this.getGapVariable(type) // Reuse gap variables for margin
    }

    // Getters and setters for attributes
    get direction() {
        return this.getAttribute("direction")
    }

    set direction(value) {
        if (value) {
            this.setAttribute("direction", value)
        } else {
            this.removeAttribute("direction")
        }
    }

    get gap(): Gap {
        return (this.getAttribute("gap") || "none") as Gap
    }

    set gap(value: Gap) {
        if (value) {
            this.setAttribute("gap", value)
        } else {
            this.removeAttribute("gap")
        }
    }

    get marginInline(): Gap {
        return (this.getAttribute("margin-inline") || "none") as Gap
    }

    set marginInline(value: Gap) {
        if (value) {
            this.setAttribute("margin-inline", value)
        } else {
            this.removeAttribute("margin-inline")
        }
    }

    get marginBlock(): Gap {
        return (this.getAttribute("margin-block") || "none") as Gap
    }

    set marginBlock(value: Gap) {
        if (value) {
            this.setAttribute("margin-block", value)
        } else {
            this.removeAttribute("margin-block")
        }
    }

    get justifyContent(): string {
        return this.getAttribute("justify-content") || "flex-start"
    }

    set justifyContent(value: string) {
        if (value) {
            this.setAttribute("justify-content", value)
        } else {
            this.removeAttribute("justify-content")
        }
    }
}

register("stack", Stack)
