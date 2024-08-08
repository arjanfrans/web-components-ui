import { register } from "./framework/register";

export class Tooltip extends HTMLElement {
    private tooltip: HTMLDivElement;
    private anchorElement?: HTMLElement = undefined;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Create the tooltip container element
        this.tooltip = document.createElement('div');
        this.tooltip.classList.add('tooltip');

        // Tooltip styles
        const style = document.createElement('style');
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
        const slot = document.createElement('slot');
        shadow.appendChild(slot);

        // Hover event listeners
        this.addEventListener('mouseenter', this.showTooltip.bind(this));
        this.addEventListener('mouseleave', this.hideTooltip.bind(this));
    }

    connectedCallback() {
        // Ensure the anchorElement is correctly identified
        this.anchorElement = this.querySelector('span') || this;
        this.anchorElement.addEventListener('mouseenter', this.showTooltip.bind(this));
        this.anchorElement.addEventListener('mouseleave', this.hideTooltip.bind(this));
    }

    showTooltip() {
        if (this.anchorElement) {
            const rect = this.anchorElement.getBoundingClientRect();

            // Set tooltip content from the 'text' attribute
            this.tooltip.textContent = this.getAttribute('text') || 'Tooltip content';

            // Position the tooltip
            this.tooltip.style.left = `${rect.left + window.scrollX}px`;
            this.tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`; // Adjust positioning with a small gap

            // Show the tooltip
            this.tooltip.style.display = 'block';
        }
    }

    hideTooltip() {
        // Hide the tooltip
        this.tooltip.style.display = 'none';
    }
}

register('tooltip', Tooltip);
