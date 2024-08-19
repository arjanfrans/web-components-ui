import { register } from "../framework/register";
import { Color } from "./variables/Color";

export class Icon extends HTMLElement {
  private shadow: ShadowRoot;

  private static svgCache: Map<string, string> = new Map();

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        box-sizing: border-box;
        --icon-color: var(--semantic-text-default);
      }

      :host([color="${Color.DEFAULT}"]) {
        --icon-color: var(--semantic-text-default);
      }

      :host([color="${Color.INVERTED}"]) {
        --icon-color: var(--semantic-text-inverted);
      }

      :host([color="${Color.HIGHLIGHT}"]) {
        --icon-color: var(--semantic-text-highlight);
      }

      svg {
        display: block;
        fill: var(--icon-color);
        object-fit: contain; /* Ensure SVG scales proportionally */
      }
    `;

    this.shadow.appendChild(style);

    // Create a slot for the SVG
    const slot = document.createElement("slot");
    this.shadow.appendChild(slot);
  }

  static get observedAttributes() {
    return ["size", "svg"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "svg" && oldValue !== newValue && newValue) {
      this.loadSvg(newValue);
    }
  }

  private async loadSvg(src: string) {
    try {
      if (Icon.svgCache.has(src)) {
        this.innerHTML = Icon.svgCache.get(src)!;
      } else {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to load SVG: ${response.statusText}`);
        }
        const svgText = await response.text();
        Icon.svgCache.set(src, svgText);
        this.innerHTML = svgText;
      }
    } catch (error) {
      console.error("Error loading SVG:", error);
    }
  }
}

register("icon", Icon);
