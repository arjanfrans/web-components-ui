import { getPrefix, register } from '../../framework/register';
import type { RadioButton } from './RadioButton.ts';
import { onChildrenReady } from '../../framework/onChildrenReady';

export class RadioGroup extends HTMLElement {
    private radios?: NodeListOf<RadioButton>;

    constructor() {
        super();
        this.addEventListener('radio-selected', this.handleRadioSelected);
    }

    connectedCallback() {
        onChildrenReady(() => {
            this.updateRadios();
            this.updateSelected();
        });
    }

    attributeChangedCallback() {
        this.updateSelected();
    }

    private updateSelected() {
        this.radios = this.querySelectorAll<RadioButton>(`${getPrefix()}-radio-button`);

        this.radios.forEach((radio) => {
            if (radio.value === this.getAttribute('selected')) {
                this.clearChecked();
                radio.checked = true;
            }
        });
    }

    // The RadioButton's own event keeps bubbling to listeners outside the group.
    private handleRadioSelected = (event: Event) => {
        const { value } = (event as CustomEvent<{ value: string }>).detail;

        this.setAttribute('selected', value);
    };

    static get observedAttributes() {
        return ['selected'];
    }

    private updateRadios() {
        // Get all RadioButtons inside the group
        this.radios = this.querySelectorAll<RadioButton>(`${getPrefix()}-radio-button`);

        // Ensure that only one radio button is checked at the start
        let anyChecked = false;

        this.radios.forEach((radio) => {
            if (radio.checked) {
                if (anyChecked) {
                    radio.checked = false; // Uncheck extras if multiple are checked
                }

                anyChecked = true;
            }
        });
    }

    private clearChecked() {
        // Uncheck all radio buttons in the group
        this.radios?.forEach((radio) => {
            radio.checked = false;
        });
    }
}

register('radio-group', RadioGroup);
