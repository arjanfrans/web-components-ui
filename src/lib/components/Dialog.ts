import { register, variable } from '../framework/register';

export class Dialog extends HTMLElement {
    private readonly dialog: HTMLDialogElement;

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');

        style.textContent = `
      :host {
        display: contents;
      }

      dialog {
        box-sizing: border-box;
        width: min(90vw, 600px);
        max-height: 90vh;
        padding: 0;
        border: none;
        border-radius: ${variable('border-xs')};
        background-color: var(--semantic-background-default);
        color: var(--semantic-text-default);
        font-family: ${variable('font-family-default')};
        box-shadow: ${variable('shadow-dark')};
      }

      dialog[open] {
        display: flex;
        flex-direction: column;
      }

      dialog::backdrop {
        background: rgba(0, 0, 0, 0.6);
      }

      dialog:focus-visible {
        outline: none;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: ${variable('spacing-sm')};
        padding: ${variable('spacing-md')};
        padding-bottom: 0;
      }

      .content {
        flex: 1;
        overflow: auto;
        padding: ${variable('spacing-md')};
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: ${variable('spacing-sm')};
        padding: ${variable('spacing-md')};
        padding-top: 0;
      }

      [hidden] {
        display: none !important;
      }

      .close-button {
        margin-left: auto;
        background: transparent;
        border: none;
        color: inherit;
        font-size: 16px;
        cursor: pointer;
      }

      .close-button:focus-visible {
        outline: 2px solid var(--semantic-stroke-highlight);
      }
    `;

        this.dialog = document.createElement('dialog');
        this.dialog.innerHTML = `
      <div class="header" hidden>
        <slot name="header"></slot>
        <button class="close-button" aria-label="Close" hidden>✕</button>
      </div>
      <div class="content"><slot></slot></div>
      <div class="actions" hidden><slot name="actions"></slot></div>
    `;

        shadow.append(style, this.dialog);

        this.dialog.querySelectorAll('slot[name]').forEach((slot) => {
            slot.addEventListener('slotchange', () => this.updateSectionVisibility());
        });

        this.dialog.querySelector('.close-button')!.addEventListener('click', () => this.close());
        this.dialog.addEventListener('click', this.handleBackdropClick);
        this.dialog.addEventListener('close', this.handleClose);
    }

    static get observedAttributes() {
        return ['open', 'closable'];
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue === newValue) {
            return;
        }

        if (name === 'closable') {
            this.closeButton.hidden = newValue === null;
            this.updateSectionVisibility();
        } else if (name === 'open') {
            this.syncOpen();
        }
    }

    connectedCallback() {
        this.syncOpen();
    }

    private get closeButton(): HTMLButtonElement {
        return this.dialog.querySelector<HTMLButtonElement>('.close-button')!;
    }

    private updateSectionVisibility() {
        const hasHeader = this.querySelector(':scope > [slot="header"]') !== null;
        const hasActions = this.querySelector(':scope > [slot="actions"]') !== null;

        this.dialog.querySelector<HTMLElement>('.header')!.hidden = !hasHeader && this.closeButton.hidden;
        this.dialog.querySelector<HTMLElement>('.actions')!.hidden = !hasActions;
    }

    private syncOpen() {
        if (!this.isConnected) {
            return;
        }

        if (this.open && !this.dialog.open) {
            this.dialog.showModal();
        } else if (!this.open && this.dialog.open) {
            this.dialog.close();
        }
    }

    private handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== this.dialog || !this.hasAttribute('light-dismiss')) {
            return;
        }

        const rect = this.dialog.getBoundingClientRect();
        const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!inside) {
            this.close();
        }
    };

    private handleClose = () => {
        this.removeAttribute('open');
        this.dispatchEvent(new Event('close', { bubbles: true, composed: true }));
    };

    show() {
        this.open = true;
    }

    close() {
        this.open = false;
    }

    get open(): boolean {
        return this.hasAttribute('open');
    }

    set open(value: boolean) {
        this.toggleAttribute('open', value);
    }
}

register('dialog', Dialog);
