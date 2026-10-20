import { register, variable } from '../../framework/register';
import { Typography } from '../Typography';
import { Icon } from '../Icon'; // Adjust path as necessary

export class BottomNavigationAction extends HTMLElement {
    private shadow: ShadowRoot;
    private icon?: Icon;
    private readonly label: Typography;

    constructor() {
        super();
        // Attach the shadow root
        this.shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');

        style.textContent = `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: ${variable('spacing-xs')};
        justify-content: center;
        padding: ${variable('spacing-xs')};
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
        transition: color 0.18s ease-in-out;
        height: calc(${variable('bottom-navigation-height')} - 4px); /* Fixed height */
        width: auto; /* Allow width to adjust based on content */
      }

      :host(:hover), :host([active]) {
        color: var(--semantic-text-highlight);
      }

      .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%; /* Fixed height as a percentage of the container height */
        overflow: hidden;
      }

      .icon {
        object-fit: contain; /* Ensure proper scaling */
      }

      .label {
        width: 100%;
        text-align: center;
      }

      /* Hide label if not provided */
      :host([no-label]) .label,
      :host(:not([label])) .label,
      :host([label=""]) .label {
        display: none;
      }
    `;

        this.label = new Typography();
        this.label.className = 'label';
        this.label.setAttribute('display', 'h6');

        this.shadow.append(style, this.label);
    }

    static get observedAttributes() {
        return ['svg', 'label'];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue === newValue) {
            return;
        }

        if (name === 'label') {
            this.label.textContent = newValue || '';
        } else if (name === 'svg') {
            this.updateIcon(newValue);
        }
    }

    private updateIcon(svgSrc: string | null) {
        if (!svgSrc) {
            this.shadow.querySelector('.icon-container')?.remove();
            this.icon = undefined;
            return;
        }

        if (!this.icon) {
            const iconContainer = document.createElement('div');

            iconContainer.className = 'icon-container';

            this.icon = new Icon();
            this.icon.setAttribute('size', 'none');
            this.icon.className = 'icon'; // Ensure CSS rules apply

            iconContainer.appendChild(this.icon);
            this.shadow.insertBefore(iconContainer, this.label);
        }

        this.icon.setAttribute('svg', svgSrc);
    }
}

register('bottom-navigation-action', BottomNavigationAction);
