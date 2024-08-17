import { register, variable } from "./framework/register";

export class CardFooter extends HTMLElement {
  constructor() {
    super();
    // Attach the shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create a style element
    const style = document.createElement("style");
    style.textContent = `
            :host {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: ${variable("spacing-sm")};
                border-top: 1px solid var(--semantic-stroke-default);
                background-color: var(--card-footer-background, transparent);
                flex-shrink: 0; /* Prevent footer from shrinking */
            }
        `;
    shadow.appendChild(style);

    // Create a slot for the content
    const slot = document.createElement("slot");
    shadow.appendChild(slot);
  }
}

register("card-footer", CardFooter);
