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
        display: inline-block;
        overflow: hidden;
        position: relative;
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
        fill: var(--icon-color);
        display: block;
        object-fit: contain;
        width: 100%;
        height: 100%;
      }

      :host([size="small"]) {
        width: 16px;
        height: 16px;
      }

      :host([size="medium"]) {
        width: 32px;
        height: 32px;
      }

      :host([size="large"]) {
        width: 64px;
        height: 64px;
      }

      :host([size="none"]) {
        width: 100%;
        height: 100%;
      }
    `;

    this.shadow.appendChild(style);
  }

  static get observedAttributes() {
    return ["size", "svg"];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue !== newValue && newValue) {
      if (name === "svg") {
        this.loadSvg(newValue);
      }
    }
  }

  private async loadSvg(src: string) {
    try {
      if (Icon.svgCache.has(src)) {
        this.setSvgContent(Icon.svgCache.get(src)!);
      } else {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to load SVG: ${response.statusText}`);
        }
        const svgText = await response.text();
        Icon.svgCache.set(src, svgText);
        this.setSvgContent(svgText);
      }
    } catch (error) {
      console.error("Error loading SVG:", error);
    }
  }

  private setSvgContent(svgText: string) {
    // Create a temporary DOM element to manipulate the SVG
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = svgText;
    const svgElement = tempDiv.querySelector("svg");

    if (svgElement) {
      // Remove any width/height attributes to ensure it scales correctly
      svgElement.removeAttribute("width");
      svgElement.removeAttribute("height");

      // Ensure a viewBox is set
      if (!svgElement.hasAttribute("viewBox")) {
        const width = svgElement.getAttribute("width") || "100";
        const height = svgElement.getAttribute("height") || "100";
        svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
      }

      // Append the processed SVG to the shadow DOM
      this.shadow.appendChild(svgElement);
    } else {
      console.error("No valid SVG element found in the provided content.");
    }
  }
}

register("icon", Icon);
