import { register, variable } from "../framework/register";
import { ZIndex } from "./variables/ZIndex.ts";

export class Tooltip extends HTMLElement {
  private tooltip: HTMLDivElement;
  private touchTimeout?: number;
  private isTooltipVisible = false;
  private repositionScheduled = false;

  // Static registry to keep track of active tooltips
  private static activeTooltips: Tooltip[] = [];

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
        position: absolute;
        background-color: rgba(var(--semantic-background-inverted_rgb), 0.9);
        color: var(--semantic-text-inverted);
        padding: ${variable("spacing-sm")};
        border-radius: ${variable("border-xs")};
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

    // Hide any previously visible tooltip by invoking hideTooltip on all active tooltips
    Tooltip.activeTooltips.forEach((tooltip) => {
      if (tooltip !== this && tooltip.isTooltipVisible) {
        tooltip.hideTooltip();
      }
    });

    // Add this tooltip to the registry of active tooltips
    Tooltip.activeTooltips.push(this);

    // Set the tooltip text again in case it has changed dynamically
    this.tooltip.textContent = this.getAttribute("text") || "Tooltip content";

    // Calculate position immediately
    this.repositionTooltip();

    // Show the tooltip
    this.tooltip.setAttribute("visible", "true");
    this.isTooltipVisible = true;

    // Auto-hide timeout for mobile
    if (this.touchTimeout) {
      clearTimeout(this.touchTimeout); // Clear any existing timeout
    }
    this.touchTimeout = window.setTimeout(() => this.hideTooltip(), 3000);
  }

  private hideTooltip() {
    // Hide the tooltip
    this.tooltip.removeAttribute("visible");
    this.isTooltipVisible = false;

    // Remove this tooltip from the registry
    const index = Tooltip.activeTooltips.indexOf(this);
    if (index !== -1) {
      Tooltip.activeTooltips.splice(index, 1);
    }

    clearTimeout(this.touchTimeout); // Clear any existing timeout
  }

  private toggleTooltip(event: TouchEvent) {
    event.preventDefault();

    if (this.isTooltipVisible) {
      this.hideTooltip();
    } else {
      this.showTooltip();
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
    const viewportHeight = window.innerHeight;

    // Calculate position relative to the host (shadow root)
    let top = rect.top - tooltipRect.height - 8;
    let left = rect.left + (rect.width - tooltipRect.width) / 2;

    // First, check if the tooltip fits above the element (preferred position)
    if (top < 0) {
      top = rect.bottom + 8; // If above doesn't fit, position below
    }

    // Then, check if the tooltip fits on the left side (to avoid overflow on the right)
    if (left < 0) {
      left = rect.left + rect.width + 8; // Position to the right of the target
    }
    // Check if the tooltip fits on the right side (to avoid overflow on the left)
    else if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - 8; // Position to the left of the target
    }

    // Ensure tooltip fits within the viewport vertically
    if (top + tooltipRect.height > viewportHeight) {
      top = rect.top - tooltipRect.height - 8; // If it doesn't fit at the bottom, position at the top
    }

    // Apply the computed position
    this.tooltip.style.left = `${left}px`;
    this.tooltip.style.top = `${top}px`;
  }
}

register("tooltip", Tooltip);
