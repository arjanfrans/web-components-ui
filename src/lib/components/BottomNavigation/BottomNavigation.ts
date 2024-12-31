import { register, variable } from "../../framework/register";
import { ZIndex } from "../variables/ZIndex";

export class BottomNavigation extends HTMLElement {
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
      }

      /* Fixed/Sticky navigation styles */
      .bottom-nav {
        width: 100%;
        justify-content: space-evenly;
        background-color: var(--semantic-background-alternate);
        border-top: 1px solid var(--semantic-stroke-default);
        color: var(--semantic-text-default);
        box-sizing: border-box;
        position: var(--bottom-nav-position, sticky);
        padding-inline: ${variable("spacing-sm")};
        padding-top: ${variable("spacing-sm")};
        padding-bottom: calc(${variable("spacing-sm")} + ${variable("bottom-navigation-offset")});
        left: 0;
        transition: bottom 0.3s ease-in-out;
        height: calc(${variable("bottom-navigation-height")} + ${variable("bottom-navigation-offset")});
        display: flex;
        align-items: center;
      }

      .spacer {
        display: none;
        height: ${variable("bottom-navigation-height")};
      }
      
      :host([fixed]) .spacer {
        display: block;
      }

      :host([fixed]) {
        z-index: ${ZIndex.TOP};
      }

      :host([fixed]) .bottom-nav {
        position: fixed;
      }

      :host([static]) .bottom-nav {
        position: static;
      }
    `;

    // Append the style to the shadow root
    shadow.appendChild(style);

    // Create and append the spacer and bottom-nav elements
    const spacer = document.createElement("div");
    spacer.className = "spacer";

    const bottomNav = document.createElement("div");
    bottomNav.className = "bottom-nav";

    const slot = document.createElement("slot");
    bottomNav.appendChild(slot);

    shadow.appendChild(spacer);
    shadow.appendChild(bottomNav);
  }

  static get observedAttributes() {
    return ["fixed", "static", "bottom-offset"];
  }

  // Handle changes to the 'bottom-offset' attribute
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "bottom-offset" && newValue !== oldValue) {
      this.style.setProperty("--bottom-offset", newValue || "0px"); // Default to 0px if no value is set
    }
  }
}

register("bottom-navigation", BottomNavigation);
