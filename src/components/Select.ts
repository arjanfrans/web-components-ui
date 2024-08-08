import { InvalidChildrenError } from "./framework/InvalidChildrenError"
import { register } from "./framework/register"

export class Select extends HTMLElement {
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
                width: max-content;
            }

            :host .label {
                font-weight: bold;
            }

            :host .container {
                position: relative;
                display: flex;
                height: 2em;
                border-radius: .25em;
                overflow: hidden;
            }

            :host .container::after {
                --icon-offset: 6px;
                content: '\\25BC';
                position: absolute;
                top: 0;
                right: 0;
                padding: var(--icon-offset);
                background: rgb(from var(--semantic-background-inverted) r g b / 10%);
                transition: .25s all ease;
                pointer-events: none;
            }

            :host .container:hover::after {
                color: var(--semantic-text-highlight);
            }

            :host select {
                --select-offset: calc(var(--hb-gap-2xs) + 26px);
                /* Reset Select */
                appearance: none;
                outline: 10px red;
                border: 0;
                box-shadow: none;
                width: 100%;
                font-size: 1em;

                /* Personalize */
                flex: 1;
                padding-inline: var(--hb-gap-2xs);
                padding-block: 0;
                color: var(--text-default);
                background: rgb(from var(--semantic-background-inverted) r g b / 10%);
                background-image: none;
                cursor: pointer;

                padding-right: var(--select-offset);
            }
        `

        const label = document.createElement("div")

        label.classList.add("label")

        const select = this.querySelector("select")
        const selectContainer = document.createElement("div")

        selectContainer.classList.add("container")

        if (!select) {
            throw new InvalidChildrenError(this, ["select"])
        }

        selectContainer.append(select)

        shadow.append(style, label, selectContainer)
    }
}

register("select", Select)
