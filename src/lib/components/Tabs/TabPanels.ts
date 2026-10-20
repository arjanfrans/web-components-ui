import { register } from '../../framework/register';

export class TabPanels extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');

        style.textContent = `
      :host {
        display: block;
        position: relative;
        overflow: hidden;
        width: 100%;
      }
    `;

        shadow.appendChild(style);

        // Slot for the panels
        const slot = document.createElement('slot');

        shadow.appendChild(slot);
    }
}

register('tab-panels', TabPanels);
