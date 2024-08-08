import { register } from "./framework/register"

type SpinnerSize = "small" | "large"

export class Spinner extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" })

        const style = document.createElement("style")
        style.textContent = `
            :host {
                display: inline-block;
                width: 50px;
                height: 50px;
                overflow: hidden;
            }

            :host([size="small"]) {
                width: 30px;
                height: 30px;
            }

            :host([size="large"]) {
                width: 70px;
                height: 70px;
            }

            svg {
                width: 100%;
                height: 100%;
                animation: rotate 2s linear infinite;
            }

            circle {
                fill: none;
                stroke-width: 4;
                stroke: var(--spinner-color, #000);
                stroke-dasharray: 150, 200;
                stroke-dashoffset: 0;
                animation: dash 1.5s ease-in-out infinite;
            }

            @keyframes rotate {
                100% {
                    transform: rotate(360deg);
                }
            }

            @keyframes dash {
                0% {
                    stroke-dasharray: 1, 200;
                    stroke-dashoffset: 0;
                }
                50% {
                    stroke-dasharray: 100, 200;
                    stroke-dashoffset: -50;
                }
                100% {
                    stroke-dasharray: 1, 200;
                    stroke-dashoffset: -150;
                }
            }
        `

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        svg.setAttribute("viewBox", "0 0 50 50")

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("cx", "25")
        circle.setAttribute("cy", "25")
        circle.setAttribute("r", "20")

        svg.appendChild(circle)
        shadow.appendChild(style)
        shadow.appendChild(svg)
    }

    static get observedAttributes() {
        return ["size", "color"]
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (name === "size" && oldValue !== newValue) {
            this.updateSize()
        }
        if (name === "color" && oldValue !== newValue) {
            this.updateColor()
        }
    }

    private updateSize() {
        this.setAttribute("size", this.size)
    }

    private updateColor() {
        this.style.setProperty("--spinner-color", this.color)
    }

    set size(value: SpinnerSize) {
        this.setAttribute("size", value)
    }

    get size(): SpinnerSize {
        return (this.getAttribute("size") as SpinnerSize) || "small"
    }

    set color(value: string) {
        this.setAttribute("color", value)
    }

    get color(): string {
        return this.getAttribute("color") || "#000"
    }
}

register("spinner", Spinner)
