import { register, variable } from '../framework/register';
import { stretchStyle } from './styles/stretch.ts';

type TextFieldType = 'text' | 'search' | 'email' | 'password' | 'number' | 'url' | 'tel';

export class TextField extends HTMLElement {
    static formAssociated = true;

    private readonly internals: ElementInternals;
    private readonly inputElement: HTMLInputElement;

    constructor() {
        super();
        this.internals = this.attachInternals();

        const shadow = this.attachShadow({ mode: 'open', delegatesFocus: true });
        const style = document.createElement('style');

        style.textContent = `
      :host {
        display: inline-flex;
        width: max-content;
      }

      ${stretchStyle()}

      :host([disabled]) {
        opacity: 0.5;
      }

      label {
        display: flex;
        flex-direction: column;
        gap: ${variable('spacing-xs')};
        width: 100%;
        font-family: ${variable('font-family-default')};
        font-size: ${variable('font-size-sm')};
        color: var(--semantic-text-default);
      }

      input {
        box-sizing: border-box;
        width: 100%;
        height: 2em;
        padding-inline: ${variable('spacing-sm')};
        border: 1px solid var(--semantic-stroke-default);
        border-radius: ${variable('border-xs')};
        background: rgba(var(--semantic-background-inverted_rgb), 0.05);
        color: var(--semantic-text-default);
        font-family: ${variable('font-family-default')};
        font-size: ${variable('font-size-default')};
        transition: border-color 0.2s;
      }

      input::placeholder {
        color: rgba(var(--semantic-text-default_rgb), 0.5);
      }

      input:hover:not(:disabled) {
        border-color: var(--semantic-stroke-hover);
      }

      input:focus-visible {
        outline: none;
        border-color: var(--semantic-stroke-highlight);
        box-shadow: 0 0 0 1px var(--semantic-stroke-highlight);
      }

      input:disabled {
        cursor: not-allowed;
      }
    `;

        const label = document.createElement('label');
        const labelSlot = document.createElement('slot');

        labelSlot.name = 'label';

        this.inputElement = document.createElement('input');
        label.append(labelSlot, this.inputElement);
        shadow.append(style, label);

        this.inputElement.addEventListener('input', this.handleInput);
        this.inputElement.addEventListener('change', this.handleChange);
    }

    static get observedAttributes() {
        return [
            'type',
            'value',
            'placeholder',
            'disabled',
            'readonly',
            'required',
            'maxlength',
            'name',
            'autocomplete',
        ];
    }

    connectedCallback() {
        this.syncFormValue();
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue === newValue) {
            return;
        }

        if (name === 'value') {
            this.inputElement.value = newValue ?? '';
            this.syncFormValue();
        } else if (name === 'name') {
            return;
        } else if (newValue === null) {
            this.inputElement.removeAttribute(name);
        } else {
            this.inputElement.setAttribute(name, newValue);
        }

        if (name === 'required' || name === 'maxlength') {
            this.syncFormValue();
        }
    }

    formResetCallback() {
        this.inputElement.value = this.getAttribute('value') ?? '';
        this.syncFormValue();
    }

    formDisabledCallback(disabled: boolean) {
        this.inputElement.disabled = disabled;
    }

    private handleInput = () => {
        this.syncFormValue();
    };

    private handleChange = () => {
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    };

    private syncFormValue() {
        this.internals.setFormValue(this.inputElement.value);
        this.internals.setValidity(this.inputElement.validity, this.inputElement.validationMessage, this.inputElement);
    }

    get value(): string {
        return this.inputElement.value;
    }

    set value(value: string) {
        this.inputElement.value = value;
        this.syncFormValue();
    }

    get type(): TextFieldType {
        return (this.getAttribute('type') as TextFieldType) || 'text';
    }

    set type(value: TextFieldType) {
        this.setAttribute('type', value);
    }

    get disabled(): boolean {
        return this.hasAttribute('disabled');
    }

    set disabled(value: boolean) {
        this.toggleAttribute('disabled', value);
    }

    get form(): HTMLFormElement | null {
        return this.internals.form;
    }

    get validity(): ValidityState {
        return this.internals.validity;
    }

    checkValidity(): boolean {
        return this.internals.checkValidity();
    }

    reportValidity(): boolean {
        return this.internals.reportValidity();
    }

    select() {
        this.inputElement.select();
    }
}

register('text-field', TextField);
