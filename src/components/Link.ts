import { register } from "./framework/register"

export class Link extends HTMLElement {
    constructor() {
        super()
        // Attach the shadow root
        const shadow = this.attachShadow({ mode: "open" })

        // Create a style element
        const style = document.createElement("style")
        style.textContent = `
            ::slotted(a) {
                color: var(--semantic-text-highlight);
                text-decoration: none;
            }
            
            ::slotted(a:hover) {
                color: var(--semantic-text-highlight);
                text-decoration: underline;
            }
            
            ::slotted(a:active) {
                color: var(--semantic-text-highlight);
                text-decoration: none;
            }
            
            ::slotted(a:visited) {
                color: var(--semantic-text-highlight);
                text-decoration: none;
            }
        `

        shadow.appendChild(style)

        const slot = document.createElement("slot")
        shadow.append(slot)
    }
}

register("link", Link)
