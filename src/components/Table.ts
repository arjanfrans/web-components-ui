import { register } from "./framework/register"
import { InvalidChildrenError } from "./framework/InvalidChildrenError"

export class Table extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: "open" })
        const style = document.createElement("style")
        style.textContent = `
            :host table {
                width: 100%;
                border: 0;
                border-spacing: 0;
            }

            :host table th {
                border-bottom: 2px solid rgb(from var(--semantic-stroke-highlight) r g b / 40%);
                color: var(--semantic-text-default);
            }

            :host table th, :host table td  {
                text-align: left;
                border-collapse: collapse;
                padding: var(--hb-gap-5xs);
                border-right: 1px solid var(--semantic-stroke-default);
                color: var(--semantic-text-default);
            }

            :host table > tbody > tr > td {
                border-bottom: 1px solid var(--semantic-stroke-default);
                color: var(--semantic-text-default);
            }

            :host table tbody > tr:hover {
                background-color: rgb(from var(--semantic-stroke-highlight) r g b / 5%);
            }

            :host table tr:last-child td {
                border-bottom: 0;
            }

            :host table tr td:last-child,th:last-child {
                border-right: 0;
            }
        `

        shadow.appendChild(style)

        const table = this.querySelector("table")

        if (!table) {
            throw new InvalidChildrenError(this, ["table"])
        }

        shadow.appendChild(table)
    }
}

register("table", Table)
