import { register, variable } from "../framework/register";
import { stretchStyle } from "./styles/stretch.ts";
import { justifyStyle } from "./styles/justify.ts";
import { ZIndex } from "./variables/ZIndex.ts";

export class Snackbar extends HTMLElement {
  private autoDismissTimeout: number | null = null;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        position: absolute; /* Position absolute relative to the viewport */
        display: block;
        z-index: ${ZIndex.DEFAULT}; /* Ensure the Snackbar stays above other elements */
      }

      ${stretchStyle()}
      ${justifyStyle()}

      .snackbar {
        display: none; /* Initially hidden */
        background-color: var(--semantic-background-default);
        color: var(--semantic-text-default);
        padding: ${variable("spacing-sm")};
        border-radius: ${variable("border-xs")};
        box-shadow: ${variable("shadow-dark")};
        max-width: calc(100% - 2rem); /* Prevent overflow */
        word-wrap: break-word;
        opacity: 0;
        transform: translateY(10px); /* Add slight initial translate for animation */
        transition: opacity 0.3s ease, transform 0.3s ease; /* Smooth transition for visibility */
      }

      :host([visible]) .snackbar {
        display: block;
        opacity: 1;
        transform: translateY(0);
      }

      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Positioning based on the 'position' attribute */
      :host([position="top"]) .snackbar {
        top: 0;
      }

      :host([position="bottom"]) .snackbar {
        bottom: 0;
      }

      :host([position="left"]) .snackbar {
        left: 0;
      }

      :host([position="right"]) .snackbar {
        right: 0;
      }
    `;

    shadow.appendChild(style);

    const snackbarElement = document.createElement("div");
    snackbarElement.className = "snackbar";

    // Create a slot for custom message content
    const slot = document.createElement("slot");
    snackbarElement.appendChild(slot);

    shadow.appendChild(snackbarElement);

    this.setupAutoDismiss();
  }

  static get observedAttributes() {
    return ["visible", "position", "timeout"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "visible" && oldValue !== newValue) {
      this.toggleVisibility();
    } else if (name === "position" && oldValue !== newValue) {
      this.updatePosition();
    } else if (name === "timeout" && oldValue !== newValue) {
      this.setupAutoDismiss();
    }
  }

  private toggleVisibility() {
    const snackbar = this.shadowRoot?.querySelector(".snackbar") as HTMLDivElement;
    const isVisible = this.hasAttribute("visible");
    snackbar.style.animation = isVisible
      ? "fade-in 0.3s ease-in-out"
      : "fade-out 0.3s ease-in-out";
  }

  private updatePosition() {
    const snackbar = this.shadowRoot?.querySelector(".snackbar") as HTMLDivElement;
    const position = this.getAttribute("position") || "bottom";

    // Recalculate positioning based on the viewport
    // const viewportWidth = window.innerWidth;
    // const viewportHeight = window.innerHeight;

    switch (position) {
      case "top":
        snackbar.style.top = "0px";
        break;
      case "bottom":
        snackbar.style.bottom = "0px";
        break;
      case "left":
        snackbar.style.left = "0px";
        break;
      case "right":
        snackbar.style.right = "0px";
        break;
      default:
        snackbar.style.bottom = "0px"; // default to bottom if no position is provided
        break;
    }
  }

  private setupAutoDismiss() {
    if (this.autoDismissTimeout) {
      clearTimeout(this.autoDismissTimeout);
    }

    const timeout = Number.parseInt(this.getAttribute("timeout") || "0", 10);
    if (timeout > 0) {
      this.autoDismissTimeout = setTimeout(() => {
        this.removeAttribute("visible");
      }, timeout);
    }
  }

  // Getter and setter for the 'visible' attribute
  set visible(value: boolean) {
    if (value) {
      this.setAttribute("visible", "");
    } else {
      this.removeAttribute("visible");
    }
  }

  get visible() {
    return this.hasAttribute("visible");
  }

  // Getter and setter for 'position' attribute
  set position(value: string) {
    this.setAttribute("position", value);
  }

  get position() {
    return this.getAttribute("position") || "bottom";
  }

  // Getter and setter for 'timeout' attribute
  set timeout(value: number) {
    this.setAttribute("timeout", value.toString());
  }

  get timeout() {
    return parseInt(this.getAttribute("timeout") || "0", 10);
  }
}

register("snackbar", Snackbar);
