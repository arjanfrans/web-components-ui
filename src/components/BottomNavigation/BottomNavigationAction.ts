import { register, variable } from "../../framework/register";
import { Typography } from "../Typography";
export class BottomNavigationAction extends HTMLElement {
  private shadow: ShadowRoot;
  private icon?: HTMLDivElement;

  constructor() {
    super();
    // Attach the shadow root
    this.shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");

    style.textContent = `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${variable("spacing-xs")};
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
        transition: color 0.3s ease-in-out;
        width: ${variable("bottom-navigation-height")}; /* Ensure a fixed width */
        height: ${variable("bottom-navigation-height")}; /* Ensure a fixed height */
      }

      :host(:hover) {
        color: var(--semantic-text-highlight, #007bff); /* Highlight color on hover */
      }

      .icon {
        width: 48px; /* Set explicit width */
        height: 48px; /* Set explicit height */
        background-size: contain; /* Maintain aspect ratio */
        background-repeat: no-repeat;
        background-position: center;
      }

      .label {
        margin-top: ${variable("spacing-xs")};
      }

      /* Hide label if not provided */
      :host([no-label]) .label {
        display: none;
      }
    `;

    const iconSrc = this.getAttribute("icon");

    if (iconSrc !== "" && iconSrc !== null) {
      // Create the icon container div
      this.icon = document.createElement("div");
      this.icon.className = "icon";

      // Set the background image if the icon attribute is provided

      this.icon.style.backgroundImage = `url(${iconSrc})`;
      this.shadow.appendChild(this.icon);
    }

    // Create the label element
    const label = new Typography();
    label.className = "label";
    label.setAttribute("display", "h6");
    label.textContent = this.getAttribute("label") || "";

    // Check if the label is not provided and add the corresponding attribute
    if (!this.getAttribute("label")) {
      this.setAttribute("no-label", "");
    }

    this.shadow.appendChild(style);

    this.shadow.appendChild(label);
  }

  static get observedAttributes() {
    return ["icon"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "icon" && oldValue !== newValue) {
      if (this.icon) {
        if (newValue !== "" && newValue !== null) {
          this.icon.style.backgroundImage = `url(${newValue})`;
        } else {
          this.shadow.removeChild(this.icon);
        }
      } else {
        if (newValue !== "" && newValue !== null) {
          this.icon = document.createElement("div");
          this.icon.className = "icon";
          this.icon.style.backgroundImage = `url(${newValue})`;

          this.shadow.append(this.icon);
        }
      }
    }
  }
}

register("bottom-navigation-action", BottomNavigationAction);
