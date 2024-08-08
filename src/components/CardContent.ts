import { register } from "./framework/register"

export class CardContent extends HTMLElement {
    constructor() {
        super()
        // Attach the shadow root
        const shadow = this.attachShadow({ mode: "open" })

        // Create a style element
        const style = document.createElement("style")
        style.textContent = `
            :host {
                display: flex;
                flex-direction: column;
                padding: var(--hb-gap-2xs);
                flex: 1;
            }
        `
        shadow.appendChild(style)

        // Create a slot for the content
        const slot = document.createElement("slot")
        shadow.appendChild(slot)
    }
}

register("card-content", CardContent)
