import { register, variable } from '../../framework/register';
import { stretchStyle } from '../styles/stretch.ts';
import { ZIndex } from '../variables/ZIndex.ts';
import { SnackbarOffset } from './SnackbarOffset.ts';

export class Snackbar extends HTMLElement {
    private autoDismissTimeout: number | null = null;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Style element
        const style = document.createElement('style');

        style.textContent = `
      :host {
        display: none;
        box-sizing: border-box;
        z-index: ${ZIndex.SNACKBAR};
        width: max-content;
        max-width: 100%;
        position: relative;
        background-color: transparent;
        transition: opacity 0.3s ease, display 0.3s ease allow-discrete;
        opacity: 0;
        pointer-events: auto;
      }

      ${stretchStyle()}

      :host([fixed]) {
        position: fixed;
        padding: ${variable('spacing-lg')};
        width: 100%;
        left: 0;
        right: 0;
        max-width: 100%;
        box-sizing: border-box;
      }

      :host([visible]) {
        display: block;
        opacity: 1;
      }

      :host([offset="${SnackbarOffset.BOTTOM_NAVIGATION}"]) {
        bottom: calc(${variable('bottom-navigation-height')} + ${variable('bottom-navigation-offset')});
      }

      :host([offset="${SnackbarOffset.APP_BAR}"]) {
        top: ${variable('app-bar-height')};
      }

      :host([position="right"]) {
        right: 0;
        left: auto;
        transform: none;
      }

      :host([position="left"]) {
        left: 0;
        right: auto;
        transform: none;
      }

      /* Child div for content and background */
      .snackbar-content {
        box-sizing: border-box;
        padding: ${variable('spacing-sm')};
        background-color: var(--semantic-background-inverted);
        color: var(--semantic-text-inverted);
        border-radius: 4px;
        box-shadow: ${variable('shadow-dark')};
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      /* Close button styles */
      .close-button {
        background: transparent;
        border: none;
        color: var(--semantic-text-inverted);
        font-size: 16px;
        cursor: pointer;
        margin-left: ${variable('spacing-sm')};
      }

      /* Slot for message content */
      ::slotted(*) {
        display: block;
        flex-grow: 1;
      }

      /* Hide the close button when closable is not set */
      :host([closable]) .close-button {
        display: block;
      }

      :host(:not([closable])) .close-button {
        display: none;
      }
    `;

        shadow.appendChild(style);

        // Create the child div for the content and background
        const snackbarElement = document.createElement('div');

        snackbarElement.classList.add('snackbar-content');
        snackbarElement.setAttribute('role', 'status');
        snackbarElement.setAttribute('aria-live', 'polite');

        // Slot for message content
        const slot = document.createElement('slot');

        snackbarElement.appendChild(slot);

        // Add close button if attribute is set
        const closeButton = document.createElement('button');

        closeButton.classList.add('close-button');
        closeButton.textContent = '\u2715';
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.addEventListener('click', () => {
            this.visible = false; // Trigger the fade-out on click
        });

        snackbarElement.appendChild(closeButton);

        // Append the content div to the shadow root
        shadow.appendChild(snackbarElement);
    }

    static get observedAttributes() {
        return ['visible', 'position', 'timeout', 'offset', 'closable'];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if ((name === 'visible' || name === 'timeout') && oldValue !== newValue) {
            this.restartAutoDismiss();
        }
    }

    private restartAutoDismiss() {
        if (this.autoDismissTimeout) {
            clearTimeout(this.autoDismissTimeout);
            this.autoDismissTimeout = null;
        }

        if (this.visible && this.timeout > 0) {
            this.autoDismissTimeout = window.setTimeout(() => {
                this.visible = false;
            }, this.timeout);
        }
    }

    // Getter and setter for 'visible' attribute
    set visible(value: boolean) {
        if (value) {
            this.setAttribute('visible', '');
        } else {
            this.removeAttribute('visible');
        }
    }

    get visible() {
        return this.hasAttribute('visible');
    }

    // Getter and setter for 'timeout' attribute
    set timeout(value: number) {
        this.setAttribute('timeout', value.toString());
    }

    get timeout() {
        return parseInt(this.getAttribute('timeout') || '0', 10);
    }
}

register('snackbar', Snackbar);
