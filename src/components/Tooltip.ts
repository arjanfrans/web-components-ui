import { register } from "./framework/register";

export class Tooltip extends HTMLElement {
  private tooltip: HTMLDivElement;
  private anchorElement?: HTMLElement = undefined;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    this.style.display = "inline";
    this.style.width = "max-content";

    // Create the tooltip container element
    this.tooltip = document.createElement("div");
    this.tooltip.classList.add("tooltip");

    // Tooltip styles
    const style = document.createElement("style");
    style.textContent = `
            .tooltip {
                position: absolute;
                background-color: #333;
                color: #fff;
                padding: 5px;
                border-radius: 3px;
                font-size: 12px;
                z-index: 1000; /* Ensure it appears on top */
                max-width: 200px;
                display: none; /* Hide by default */
                pointer-events: none; /* Ensure it doesn't interfere with mouse events */
            }
        `;

    shadow.append(style, this.tooltip);

    // Slot for original content (not inside the tooltip)
    const slot = document.createElement("slot");
    shadow.appendChild(slot);

    // Hover event listeners
    this.addEventListener("mouseenter", this.showTooltip.bind(this));
    this.addEventListener("mouseleave", this.hideTooltip.bind(this));
  }

  connectedCallback() {
    // Ensure the anchorElement is correctly identified
    this.anchorElement = this.querySelector("span") || this;
    this.anchorElement.addEventListener(
      "mouseenter",
      this.showTooltip.bind(this),
    );
    this.anchorElement.addEventListener(
      "mouseleave",
      this.hideTooltip.bind(this),
    );
  }

  showTooltip() {
    if (this.anchorElement) {
      const anchorRect = this.anchorElement.getBoundingClientRect();
      const tooltipRect = this.tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      // Set tooltip content from the 'text' attribute
      this.tooltip.textContent = this.getAttribute("text") || "Tooltip content";

      // Default position above the anchor element
      let tooltipLeft =
        anchorRect.left + scrollX + (anchorRect.width - tooltipRect.width) / 2;
      let tooltipTop = anchorRect.top + scrollY - tooltipRect.height - 5; // Position above the element with a small gap

      // Check if the tooltip fits within the viewport above the anchor
      if (tooltipTop < scrollY) {
        // Tooltip does not fit above; reposition below the anchor
        tooltipTop = anchorRect.bottom + scrollY + 5; // Position below the element with a small gap
      }

      // Adjust tooltip position if it exceeds viewport bounds
      if (tooltipLeft + tooltipRect.width > viewportWidth + scrollX) {
        // Tooltip exceeds the right edge of the viewport
        tooltipLeft = Math.max(anchorRect.left + scrollX, 10); // Add a small gap from the right edge
      }

      if (tooltipTop + tooltipRect.height > viewportHeight + scrollY) {
        // Tooltip exceeds the bottom edge of the viewport
        tooltipTop = Math.max(
          anchorRect.top + scrollY - tooltipRect.height - 5,
          10,
        ); // Position above the element with a small gap
      }

      if (tooltipLeft < scrollX) {
        // Tooltip exceeds the left edge of the viewport
        tooltipLeft = 10; // Add a small gap from the left edge
      }

      // Apply computed position
      this.tooltip.style.left = `${tooltipLeft}px`;
      this.tooltip.style.top = `${tooltipTop}px`;

      // Show the tooltip
      this.tooltip.style.display = "block";
    }
  }

  hideTooltip() {
    // Hide the tooltip
    this.tooltip.style.display = "none";
  }
}

register("tooltip", Tooltip);
