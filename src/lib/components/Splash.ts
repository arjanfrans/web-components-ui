import { register, getPrefix } from "../framework/register";
import { ZIndex } from "./variables/ZIndex";

export class Splash extends HTMLElement {
  constructor() {
    super();

    this.disableScroll();

    // Attach the shadow root
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");

    style.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100vh;
        background-color: var(--semantic-background-default);
        color: var(--semantic-text-highlight);
        position: fixed;
        top: 0;
        left: 0;
        z-index: ${ZIndex.OVERLAY};
        opacity: 1;
        transition: opacity 1s ease-in-out;
      }

      :host(.hidden) {
        opacity: 0;
        pointer-events: none;
      }
    `;

    // Append the style to the shadow root
    shadow.appendChild(style);

    // Create and append the content slot
    const slot = document.createElement("slot");
    shadow.appendChild(slot);
  }

  static get observedAttributes() {
    return ["timeout"];
  }

  connectedCallback() {
    // Set the timeout duration (default to 3000ms if not provided)
    const timeout = Number.parseInt(this.getAttribute("timeout") || "3000");

    // Automatically hide the splash screen after the specified timeout
    setTimeout(() => {
      this.hide();
    }, timeout);
  }

  hide() {
    // Add a class to initiate the fade-out transition
    this.classList.add("hidden");

    // Remove the element from the DOM after the transition completes
    setTimeout(() => {
      this.enableScroll();
      const themeTag = `${getPrefix()}-theme`;
      const theme = document.querySelector(themeTag)!;

      theme.removeChild(this);
    }, 1000); // Match this duration with the transition duration in CSS
  }

  disableScroll() {
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
  }

  enableScroll() {
    document.body.style.height = "";
    document.body.style.overflow = "";
  }
}

register("splash", Splash);
