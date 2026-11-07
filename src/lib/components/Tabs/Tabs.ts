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
        this.addEventListener('keydown', this.handleKeydown);
    }

    static get observedAttributes() {
        return ['selected'];
    }

    connectedCallback() {
        onChildrenReady(() => this.initializeTabs());
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (name === 'selected' && oldValue !== newValue && newValue && this.isConnected) {
            this.selectTab(newValue);
        }
    }

    private static tabName(element: Element): string {
        return element.getAttribute('name') || element.getAttribute('id') || '';
    }

    private ownButtons(): HTMLElement[] {
        return this.ownElements<HTMLElement>(`${getPrefix()}-tab-button`);
    }

    private ownPanels(): HTMLElement[] {
        return this.ownElements<HTMLElement>(`${getPrefix()}-tab-panel`);
    }

    private ownElements<T extends Element>(selector: string): T[] {
        return Array.from(this.querySelectorAll<T>(selector)).filter(
            (element) => element.closest(`${getPrefix()}-tabs`) === this,
        );
    }

    private handleClick = (event: Event) => {
        const button = (event.target as Element).closest(`${getPrefix()}-tab-button`);

        if (button && button.closest(`${getPrefix()}-tabs`) === this) {
            this.selectTab(Tabs.tabName(button));
        }
    };

    private handleKeydown = (event: KeyboardEvent) => {
        const buttons = this.ownButtons();
        const current = buttons.indexOf(event.target as HTMLElement);

        if (current === -1) {
            return;
        }

        const targets: Record<string, number> = {
            ArrowRight: (current + 1) % buttons.length,
            ArrowLeft: (current - 1 + buttons.length) % buttons.length,
            Home: 0,
            End: buttons.length - 1,
            Enter: current,
            ' ': current,
        };

        const target = targets[event.key];

        if (target === undefined) {
            return;
        }

        event.preventDefault();
        this.selectTab(Tabs.tabName(buttons[target]));
        buttons[target].focus();
    };

    private initializeTabs() {
        const tabButtons = this.ownButtons();
        const tabPanels = this.ownPanels();

        if (tabButtons.length === 0 || tabPanels.length === 0) {
            console.error('No tab buttons or panels found.');
            return;
        }

        this.querySelector(`${getPrefix()}-tab-buttons`)?.setAttribute('role', 'tablist');
        tabButtons.forEach((button) => button.setAttribute('role', 'tab'));
        tabPanels.forEach((panel) => panel.setAttribute('role', 'tabpanel'));

        const selected = this.getAttribute('selected') || Tabs.tabName(tabButtons[0]);

        this.selectTab(selected);
    }

    private selectTab(name: string) {
        this.ownButtons().forEach((button) => {
            const active = Tabs.tabName(button) === name;

            button.toggleAttribute('active', active);
            button.setAttribute('aria-selected', String(active));
            button.tabIndex = active ? 0 : -1;
        });

        this.ownPanels().forEach((panel) => {
            panel.toggleAttribute('active', Tabs.tabName(panel) === name);
        });

        if (this.getAttribute('selected') !== name) {
            this.setAttribute('selected', name);
        }

        const tabButtonsContainer = this.querySelector<TabButtons>(`${getPrefix()}-tab-buttons`);

        tabButtonsContainer?.updateActiveIndicator?.();
    }
}

register('tabs', Tabs);
