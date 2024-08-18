import { getPrefix, register, variable } from "../../framework/register";
import { CardContent } from "./CardContent";

export class Card extends HTMLElement {
  constructor() {
    super();
    // Attach the shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create a style element
    const style = document.createElement("style");
    style.textContent = `
            :host {
                border: 1px solid var(--semantic-stroke-default);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                max-width: 100%;
                box-shadow: ${variable("shadow-light")};
                height: 100%; /* Ensure the card takes full height */
            }

            card-content {
                flex: 1; /* Allows the content to grow and fill space */
            }
            
            card-media {
                display: block;
                width: 100%;
            }
        `;
    shadow.appendChild(style);

    this.querySelector("x-");

    const hasChild =
      this.querySelector(`${getPrefix()}-card-content`) ||
      this.querySelector(`${getPrefix()}-card-media`) ||
      this.querySelector(`${getPrefix()}-card-footer`);
    const slot = document.createElement("slot");

    if (!hasChild) {
      const cardContentElement = new CardContent();

      cardContentElement.append(slot);

      shadow.append(cardContentElement);
    } else {
      shadow.appendChild(slot);
    }
  }
}

register("card", Card);
