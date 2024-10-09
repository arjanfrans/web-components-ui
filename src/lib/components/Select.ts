import { InvalidChildrenError } from "../framework/InvalidChildrenError";
import { register, variable } from "../framework/register";
import { stretchStyle } from "./styles/stretch.ts";

export class Select extends HTMLElement {
  private readonly select: HTMLSelectElement;

  constructor() {
    super();
    // Attach the shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create a style element
    const style = document.createElement("style");
    style.textContent = `
            :host {
                display: flex;
                flex-direction: column;
                width: max-content;
            }
            
            ${stretchStyle()}

            :host .container {
                position: relative;
                display: flex;
                height: 2em;
                overflow: hidden;
            }

            :host .container::after {
                --icon-offset: 6px;
                content: '\\25BC';
                position: absolute;
                top: 0;
                right: 0;
                padding: var(--icon-offset);
                background: rgba(var(--semantic-background-inverted_rgb), 0.1);
                transition: .25s all ease;
                pointer-events: none;
            }

            :host .container:hover::after {
                color: var(--semantic-text-highlight);
            }
            
            :host select>option {
                background: var(--semantic-background-default);
            }

            :host select {
                --select-offset: calc(${variable("spacing-sm")} + 26px);
                /* Reset Select */
                appearance: none;
                outline: 10px red;
                border: 0;
                box-shadow: none;
                width: 100%;
                font-size: 1em;

                /* Personalize */
                flex: 1;
                padding-inline: ${variable("spacing-md")};
                padding-block: 0;
                color: var(--text-default);
                background: rgba(var(--semantic-background-inverted_rgb), 0.1);
                background-image: none;
                cursor: pointer;

                padding-right: var(--select-offset);
            }
        `;

    this.select = this.querySelector("select") as HTMLSelectElement; // Store reference to select element
    const selectContainer = document.createElement("div");

    selectContainer.classList.add("container");

    if (!this.select) {
      throw new InvalidChildrenError(this, ["select"]);
    }

    selectContainer.append(this.select);
    shadow.append(style, selectContainer);

    // Add event listener for change event on the select element
    this.select.addEventListener("change", () => {
      this.dispatchSelectChange();
    });
  }

  // Method to dispatch the select-change event
  private dispatchSelectChange() {
    const event = new CustomEvent("select-change", {
      detail: { value: this.select.value }, // Directly use select value
      bubbles: true, // Allow the event to bubble up
      composed: true, // Allow the event to cross shadow DOM boundaries
    });
    this.dispatchEvent(event);
  }

  // Reflect the 'value' attribute to the property
  static get observedAttributes() {
    return ["selected"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (Select.observedAttributes.includes(name) && oldValue !== newValue) {
      if (name === "selected") {
        this.select.value = newValue || "";
        this.dispatchSelectChange();
      }
    }
  }
}

register("select", Select);
