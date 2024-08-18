import { register, getPrefix } from "../framework/register";

/**
 * When the web components are loaded, this logic will be executed and hide the loading component
 * and remove it from the DOM.
 */
export class Loading extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");

    style.textContent = `
            :host {
                display: none;
            }
        `;

    shadow.appendChild(style);

    const loadingProgress = document.querySelector(`${getPrefix()}-loading`);

    if (loadingProgress) {
      document.body.removeChild(loadingProgress);
    }
  }
}

register("loading", Loading);
