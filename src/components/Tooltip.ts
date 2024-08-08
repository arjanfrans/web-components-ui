import { register } from "./framework/register"

export class Tooltip extends HTMLElement {
    private readonly tooltip: HTMLDivElement
    private readonly tooltipContent: HTMLDivElement

    static tooltipIds = new Set()

    constructor() {
        super()
        // Attach the shadow root
        const shadow = this.attachShadow({ mode: "open" })

        // Create a style element
        const style = document.createElement("style")
        style.textContent = `
            :host [popover] {
                opacity: 0;
                position: absolute;
                margin: 0;
                white-space: pre-wrap;
                text-align: left;
                background: rgb(from var(--semantic-background-inverted) r g b / 75%);
                color: var(--semantic-text-inverted);
                padding-inline: var(--hb-gap-4xs);
                border-radius: 5px;
                width: max-content;
                max-width: 350px;
                border: 0;
                transition: opacity 0.3s allow-discrete;
            }
            
            :host [popover]:popover-open {
                opacity: 1;
            }
            
            @starting-style {
              :host [popover]:popover-open {
                opacity: 0;
              }
            }
            
        `

        // Append the style to the shadow root
        shadow.appendChild(style)

        this.tooltip = document.createElement("div")

        this.tooltip.classList.add("tooltip")
        this.tooltip.setAttribute("popover", "")

        this.tooltip.textContent = this.getAttribute("value")

        if (!this.tooltip.id) {
            this.tooltip.id = Tooltip.generateTooltipId()
        }

        this.tooltipContent = document.createElement("div")

        shadow.append(this.tooltipContent)
        shadow.append(this.tooltip)

        this.tooltipContent.style.display = "inline"

        if (!this.tooltipContent.id) {
            this.tooltipContent.id = Tooltip.generateTooltipId()
        }

        this.tooltip.setAttribute("anchor", this.tooltipContent.id)

        this.addEventListener("mouseenter", () => {
            this.tooltip.style.top = `${this.tooltipContent.offsetTop - 36}px`
            this.tooltip.style.left = `${this.tooltipContent.offsetLeft + this.tooltipContent.offsetWidth / 2}px`

            // @ts-ignore API is not recognized
            this.tooltip.showPopover()
        })

        this.addEventListener("mouseleave", () => {
            // @ts-ignore API is not recognized
            this.tooltip.hidePopover()
        })

        const child = this.firstElementChild || this.firstChild

        if (child) {
            if (child instanceof HTMLElement) {
                child.setAttribute("popovertarget", this.tooltip.id)

                this.tooltipContent.append(child)
            } else {
                const wrapSpan = document.createElement("span")
                wrapSpan.setAttribute("popovertarget", this.tooltip.id)

                wrapSpan.append(child)

                this.tooltipContent.append(wrapSpan)
            }
        }
    }

    private static generateTooltipId() {
        const length = 8
        let hash = this.generateRandomString(length)
        while (this.tooltipIds.has(hash)) {
            hash = this.generateRandomString(length)
        }

        this.tooltipIds.add(hash)
        return hash
    }

    private static generateRandomString(length: number) {
        return Math.random()
            .toString(36)
            .substring(2, length + 2)
    }

    set value(value: string) {
        this.setAttribute("value", value)
    }

    get value() {
        return this.getAttribute("value") || ""
    }

    static get observedAttributes() {
        return ["value"]
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (name === "value" && oldValue !== newValue) {
            this.tooltip.textContent = newValue
        }
    }
}

register("tooltip", Tooltip)
