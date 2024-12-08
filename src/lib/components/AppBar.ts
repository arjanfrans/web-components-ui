import { register, variable } from "../framework/register";
import { ZIndex } from "./variables/ZIndex";

export class AppBar extends HTMLElement {
  constructor() {
    super();
    // Attach the shadow root
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");

    style.textContent = `
      :host {
        display: block;
        width: 100%;
        position: relative; /* Ensure positioning context for inner divs */
        z-index: ${ZIndex.TOP};
      }

      /* Fixed/Sticky bar styles */
      .app-bar {
        width: 100%;
        background-color: var(--semantic-background-highlight);
        color: var(--semantic-text-inverted);
        padding: ${variable("spacing-sm")};
        box-sizing: border-box;
        position: var(--app-bar-position, sticky);
        top: 0;
        left: 0;
        box-shadow: ${variable("shadow-dark")};
        transition: top 0.3s ease-in-out;
        height: ${variable("app-bar-height")};
        display: flex;
        align-items: center;
      }

      .spacer {
        display: none;
        height: ${variable("app-bar-height")};
      }
      
      :host([fixed]) .spacer {
        display: block;
      }

      :host([fixed]) .app-bar {
        position: fixed;
        z-index: ${ZIndex.TOP};
      }

      :host([static]) .app-bar {
        position: static;
      }
    `;

    // Append the style to the shadow root
    shadow.appendChild(style);

    // Create and append the spacer and app-bar elements
    const spacer = document.createElement("div");
    spacer.className = "spacer";

    const appBar = document.createElement("div");
    appBar.className = "app-bar";

    const slot = document.createElement("slot");
    appBar.appendChild(slot);

    shadow.appendChild(spacer);
    shadow.appendChild(appBar);
  }

  static get observedAttributes() {
    return ["fixed", "static"];
  }
}

register("app-bar", AppBar);
