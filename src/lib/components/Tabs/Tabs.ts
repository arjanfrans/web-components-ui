import { register, getPrefix } from '../../framework/register';
import type { TabButtons } from './TabButtons';
import { onChildrenReady } from '../../framework/onChildrenReady';

export class Tabs extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');

        style.textContent = `
      :host {
        width: 100%;
      }
    `;
        shadow.appendChild(style);
        const slot = document.createElement('slot');

        shadow.appendChild(slot);

        this.addEventListener('click', this.handleClick);
    }

    connectedCallback() {
        onChildrenReady(() => this.initializeTabs());
    }

    private handleClick = (event: Event) => {
        const button = (event.target as Element).closest(`${getPrefix()}-tab-button`);
        const id = button?.getAttribute('id');

        if (id && button?.closest(`${getPrefix()}-tabs`) === this) {
            this.selectTab(id);
        }
    };

    private initializeTabs() {
        const tabButtons = Array.from(this.querySelectorAll(`${getPrefix()}-tab-button`));
        const tabPanels = Array.from(this.querySelectorAll(`${getPrefix()}-tab-panel`));

        if (tabButtons.length === 0 || tabPanels.length === 0) {
            console.error('No tab buttons or panels found.');
            return;
        }

        const selectedId = this.getAttribute('selected') || tabButtons[0]?.getAttribute('id') || '';

        if (selectedId) {
            this.selectTab(selectedId);
        } else if (tabButtons.length > 0) {
            this.selectTab(tabButtons[0].getAttribute('id') || '');
        }
    }

    private selectTab(id: string) {
        const tabButtons = Array.from(this.querySelectorAll(`${getPrefix()}-tab-button`));
        const tabPanels = Array.from(this.querySelectorAll(`${getPrefix()}-tab-panel`));

        tabButtons.forEach((button) => {
            if (button.getAttribute('id') === id) {
                button.setAttribute('active', '');
            } else {
                button.removeAttribute('active');
            }
        });

        tabPanels.forEach((panel) => {
            if (panel.getAttribute('id') === id) {
                panel.setAttribute('active', '');
            } else {
                panel.removeAttribute('active');
            }
        });

        // Update the active indicator in the TabButtons component
        const tabButtonsContainer = this.querySelector(`${getPrefix()}-tab-buttons`) as TabButtons;

        if (tabButtonsContainer && typeof tabButtonsContainer.updateActiveIndicator === 'function') {
            tabButtonsContainer.updateActiveIndicator();
        }
    }
}

register('tabs', Tabs);
