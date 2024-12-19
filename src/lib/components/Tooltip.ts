import { register, variable } from "../framework/register";
import { ZIndex } from "./variables/ZIndex.ts";

export class Tooltip extends HTMLElement {
  private tooltip: HTMLDivElement;
  private touchTimeout?: number;
  private isTooltipVisible = false;
  private repositionScheduled = false;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Tooltip element
    this.tooltip = document.createElement("div");
    this.tooltip.classList.add("tooltip");

    // Tooltip styles
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-block;
        position: relative;
      }
      
      .tooltip {
        position: absolute;  /* Tooltip should be absolute within the host */
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px;
        border-radius: 4px;
        font-size: ${variable("font-size-small")};
        z-index: ${ZIndex.OVERLAY};
        white-space: nowrap;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        pointer-events: none;
        transform: translateY(-100%);
      }

      .tooltip[visible="true"] {
        visibility: visible;
        opacity: 1;
      }
    `;
    shadow.append(style, this.tooltip);

    // Add a slot for the wrapped element
    const slot = document.createElement("slot");
    shadow.appendChild(slot);

    // Event listeners for hover and touch
    this.addEventListener("mouseenter", this.showTooltip.bind(this));
    this.addEventListener("mouseleave", this.hideTooltip.bind(this));
    this.addEventListener("touchstart", this.toggleTooltip.bind(this));

    document.addEventListener("click", this.handleOutsideClick.bind(this)); // Click outside handler
    window.addEventListener("scroll", this.scheduleReposition.bind(this)); // Throttle scroll reposition
  }

  connectedCallback() {
    // Set tooltip text from the "text" attribute
    this.tooltip.textContent = this.getAttribute("text") || "Tooltip content";
  }

  disconnectedCallback() {
    // Remove event listeners to prevent memory leaks
    document.removeEventListener("click", this.handleOutsideClick.bind(this));
    window.removeEventListener("scroll", this.scheduleReposition.bind(this));
  }

  private showTooltip() {
    if (this.isTooltipVisible) return; // Prevent duplicate toggles
    this.tooltip.textContent = this.getAttribute("text") || "Tooltip content";

    // Calculate position immediately
    this.repositionTooltip();

    // Show the tooltip
    this.tooltip.setAttribute("visible", "true");
    this.isTooltipVisible = true;
  }

  private hideTooltip() {
    // Hide the tooltip
    this.tooltip.removeAttribute("visible");
    this.isTooltipVisible = false;
    clearTimeout(this.touchTimeout); // Clear any existing timeout
  }

  private toggleTooltip(event: TouchEvent) {
    event.preventDefault();

    if (this.isTooltipVisible) {
      this.hideTooltip();
    } else {
      this.showTooltip();
    }

    // Auto-hide after timeout for mobile
    if (!this.isTooltipVisible) {
      this.touchTimeout = window.setTimeout(() => this.hideTooltip(), 3000);
    }
  }

  private handleOutsideClick(event: MouseEvent) {
    if (!this.contains(event.target as Node)) {
      this.hideTooltip();
    }
  }

  private scheduleReposition() {
    if (!this.repositionScheduled) {
      this.repositionScheduled = true;
      requestAnimationFrame(() => {
        this.repositionTooltip();
        this.repositionScheduled = false;
      });
    }
  }

  private repositionTooltip() {
    if (!this.isTooltipVisible) return; // Only reposition if tooltip is visible

    const rect = this.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Calculate position relative to the host (shadow root)
    let top = rect.top - tooltipRect.height - 8;
    let left = rect.left + (rect.width - tooltipRect.width) / 2;

    // If it doesn't fit above, place below
    if (top < 0) {
      top = rect.bottom + 8;
    }

    // Ensure the tooltip doesn't overflow the viewport
    if (left < 0) {
      left = 8; // Add margin if it overflows left
    } else if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - 8; // Add margin if it overflows right
    }

    // Apply the computed position
    this.tooltip.style.left = `${left}px`;
    this.tooltip.style.top = `${top}px`;
  }
}

register("tooltip", Tooltip);
