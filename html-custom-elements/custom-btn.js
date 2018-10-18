// Define values for keycodes
const KEY_ENTER = 13;
const KEY_SPACE = 32;

class CustomButtonElement extends HTMLElement {
    constructor() {
        super();
    }

    // JS callback when element is initialized
    connectedCallback() {
        this.setAttribute('role', 'button');
        this.setAttribute('tabindex', '0');

        this.addEventListener('click', this.handleClick);
        this.addEventListener('keydown', this.handleKeyDown);
        console.log(this);
    }

    handleClick(e) {
        console.log(e);
        alert('Custom button was clicked!', e);
    }

    handleKeyDown(e) {
        // add keys "click" support for custom button
        if (e.keyCode == KEY_ENTER || e.keyCode == KEY_SPACE) {
            this.handleClick(e);
        }
    }
}

window.customElements.define('custom-btn', CustomButtonElement);