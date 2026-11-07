import { register } from '../../framework/register';

export class TabButton extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');

        style.textContent = `
      :host {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background: var(--tab-button-bg, transparent);
        cursor: pointer;
        transition: background 0.3s;
      }

      :host([active]) {
        font-weight: bold;
      }

      :host(:hover) {
        background: rgba(var(--semantic-background-highlight_rgb), 0.1);
      }

      :host(:focus-visible) {
        outline: 2px solid var(--semantic-stroke-highlight);
        outline-offset: -2px;
      }
    `;

        shadow.appendChild(style);
        const slot = document.createElement('slot');

        shadow.appendChild(slot);
    }
}

register('tab-button', TabButton);
