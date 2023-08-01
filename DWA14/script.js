import {html, css, LitElement} from "./lit-html.js";
//import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CounterElement extends LitElement {
  static styles = css`
    .counter {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.5rem;
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }

    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  static properties = {
    number: { type: Number },
    isMinimum: { type: Boolean },
    isMaximum: { type: Boolean },
  };

  constructor() {
    super();
    this.number = 0;
    this.isMinimum = false;
    this.isMaximum = false;
  }

  subtract() {
    if (this.number > MIN_NUMBER) {
      this.number--;
      this.isMinimum = false;
      this.isMaximum = false;
    }

    if (this.number === MIN_NUMBER) {
      this.isMinimum = true;
    }
  }

  add() {
    if (this.number < MAX_NUMBER) {
      this.number++;
      this.isMinimum = false;
      this.isMaximum = false;
    }

    if (this.number === MAX_NUMBER) {
      this.isMaximum = true;
    }
  }

  reset() {
    this.number = 0;
    this.isMinimum = false;
    this.isMaximum = false;
  }

  render() {
    return html`
      <div class="counter">
        <button
          class="${this.isMinimum ? 'disabled' : ''}"
          @click=${this.subtract}
          ?disabled=${this.isMinimum}
        >
          Subtract
        </button>
        <span>${this.number}</span>
        <button
          class="${this.isMaximum ? 'disabled' : ''}"
          @click=${this.add}
          ?disabled=${this.isMaximum}
        >
          Add
        </button>
      </div>
      <button @click=${this.reset}>Reset</button>
    `;
  }
};
