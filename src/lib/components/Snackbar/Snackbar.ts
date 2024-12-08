import { register, variable } from "../../framework/register";
import { stretchStyle } from "../styles/stretch.ts";
import { ZIndex } from "../variables/ZIndex.ts";
import { SnackbarOffset } from "./SnackbarOffset.ts";

export class Snackbar extends HTMLElement {
  private autoDismissTimeout: number | null = null;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Style element
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        z-index: ${ZIndex.SNACKBAR};
        pointer-events: none;
        width: max-content;
        max-width: 100%; /* Ensures it doesn't exceed parent width */
        padding: ${variable("spacing-sm")};
        position: relative;
        background-color: var(--semantic-background-inverted);
        color: var(--semantic-text-inverted);
        border-radius: 4px;
        box-shadow: ${variable("shadow-dark")};
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: auto;
      }

      ${stretchStyle()}

      :host([fixed]) {
        position: fixed;
        width: 100%;
        left: 0;
        right: 0;
        max-width: 100%; /* Ensure snackbar doesn't exceed the parent's width */
        box-sizing: border-box; /* To include padding in the width calculation */
      }

      :host([visible]) {
        opacity: 1;
      }

      :host([offset="${SnackbarOffset.BOTTOM_NAVIGATION}"]) {
        bottom: ${variable("bottom-navigation-height")};
      }

      :host([offset="${SnackbarOffset.APP_BAR}"]) {
        top: ${variable("app-bar-height")};
      }

      /* Positioning based on attribute */
      :host([position="right"]) {
        right: 0;
        left: auto; /* Override left centering */
        transform: none; /* Remove the horizontal transform */
      }

      :host([position="left"]) {
        left: 0;
        right: auto; /* Override right centering */
        transform: none; /* Remove the horizontal transform */
      }

      /* Slot for message content */
      ::slotted(*) {
        padding: ${variable("spacing-sm")};
      }
    `;

    shadow.appendChild(style);

    // Slot for message content
    const slot = document.createElement("slot");
    shadow.appendChild(slot);

    this.setupAutoDismiss();
  }

  static get observedAttributes() {
    return ["visible", "position", "timeout", "offset"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "visible" && oldValue !== newValue) {
      this.toggleVisibility();
    } else if (name === "timeout" && oldValue !== newValue) {
      this.setupAutoDismiss();
    }
  }

  private toggleVisibility() {
    if (this.visible) {
      this.classList.add("visible");
      this.startAutoDismiss();
    } else {
      this.classList.remove("visible");
    }
  }

  private setupAutoDismiss() {
    if (this.autoDismissTimeout) {
      clearTimeout(this.autoDismissTimeout);
    }

    const timeout = this.timeout;
    if (timeout > 0) {
      this.autoDismissTimeout = setTimeout(() => {
        this.visible = false;
      }, timeout);
    }
  }

  private startAutoDismiss() {
    if (this.timeout > 0) {
      this.autoDismissTimeout = setTimeout(() => {
        this.visible = false;
      }, this.timeout);
    }
  }

  // Getter and setter for 'visible' attribute
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

  // Getter and setter for 'timeout' attribute
  set timeout(value: number) {
    this.setAttribute("timeout", value.toString());
  }

  get timeout() {
    return parseInt(this.getAttribute("timeout") || "0", 10);
  }
}

register("snackbar", Snackbar);
