import { getPrefix, register } from "./framework/register"
import { CardContent } from "./CardContent"

export class Card extends HTMLElement {
    constructor() {
        super()
        // Attach the shadow root
        const shadow = this.attachShadow({ mode: "open" })

        // Create a style element
        const style = document.createElement("style")
        style.textContent = `
            :host {
                border: 1px solid var(--semantic-stroke-default);
                border-radius: 15px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                max-width: 100%;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            card-media {
                display: block;
                width: 100%;
            }
        `
        shadow.appendChild(style)

        let cardContentElement = this.querySelector(`${getPrefix()}-card-content`)

        if (!cardContentElement) {
            cardContentElement = new CardContent()
        }

        shadow.append(cardContentElement)

        const slot = document.createElement("slot")

        const cardMedia = this.querySelector(`${getPrefix()}-card-media`)

        if (!cardMedia) {
            cardContentElement.append(slot)
        } else {
            this.removeChild(cardMedia)
            shadow.prepend(cardMedia)
        }
    }
}

register("card", Card)
