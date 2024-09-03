import { register, variable } from "../../framework/register";
import { Typography } from "../Typography";
import { Icon } from "../Icon"; // Adjust path as necessary

export class BottomNavigationAction extends HTMLElement {
  private shadow: ShadowRoot;
  private icon?: Icon;

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
        gap: ${variable("spacing-xs")};
        justify-content: center;
        padding: ${variable("spacing-xs")};
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
        transition: color 0.18s ease-in-out;
        height: calc(${variable("bottom-navigation-height")} - 4px); /* Fixed height */
        width: auto; /* Allow width to adjust based on content */
      }

      :host(:hover), :host([active]) {
        color: var(--semantic-text-highlight);
      }

      .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%; /* Fixed height as a percentage of the container height */
        overflow: hidden;
      }

      .icon {
        object-fit: contain; /* Ensure proper scaling */
      }

      .label {
        width: 100%;
        text-align: center;
      }

      /* Hide label if not provided */
      :host([no-label]) .label {
        display: none;
      }
    `;

    // Create and set up the Icon element
    const svgSrc = this.getAttribute("svg");

    if (svgSrc) {
      // Create container for the icon
      const iconContainer = document.createElement("div");
      iconContainer.className = "icon-container";

      this.icon = new Icon();
      this.icon.setAttribute("svg", svgSrc);
      this.icon.setAttribute("size", "none");
      this.icon.className = "icon"; // Ensure CSS rules apply

      iconContainer.appendChild(this.icon);

      this.shadow.appendChild(iconContainer);
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
    return ["svg"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "svg" && oldValue !== newValue) {
      const iconContainer = this.shadow.querySelector(".icon-container");
      if (this.icon) {
        if (newValue) {
          this.icon.setAttribute("svg", newValue);
        } else {
          if (iconContainer) {
            iconContainer.removeChild(this.icon);
          }
          this.icon = undefined;
        }
      } else if (newValue) {
        this.icon = new Icon();
        this.icon.setAttribute("svg", newValue);
        this.icon.className = "icon"; // Ensure CSS rules apply
        if (iconContainer) {
          iconContainer.appendChild(this.icon);
        }
      }
    }
  }
}

register("bottom-navigation-action", BottomNavigationAction);
