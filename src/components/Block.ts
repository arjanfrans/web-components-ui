import { register } from "./framework/register"

export class Block extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" })

        const slot = document.createElement("slot")

        shadow.appendChild(slot)
    }
}

// Register the custom element
register("block", Block)
