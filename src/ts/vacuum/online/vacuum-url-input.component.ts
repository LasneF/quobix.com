import { customElement, property, query, state } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import vacuumUrlInput from './vacuum-url-input.css';
import {
  UrlSubmitted,
  UrlSubmittedEvent,
} from '../model/spec-submitted-events';

@customElement('vacuum-url-input')
export class VacuumUrlInputComponent extends LitElement {
  static styles = vacuumUrlInput;

  @property()
  url: string;

  @query('input')
  urlInput: HTMLInputElement;

  @query('button')
  goButton: HTMLButtonElement;

  @state()
  valid: boolean;

  private getUrlFromParams(): string {
    const params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop as string),
    });
    return params.url;
  }

  checkUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  render() {
    const queryParam = this.getUrlFromParams();
    let showWarning = false;
    let urlCheck: string;
    let inputClass = '';
    if (this.url) {
      urlCheck = this.url;
    } else if (queryParam) {
      urlCheck = queryParam;
      this.url = queryParam;
    }

    if (urlCheck && !this.checkUrl(urlCheck)) {
      showWarning = true;
      this.valid = false;
      inputClass = 'warning';
    }
    return html`
      <h2>A: OpenAPI specification URL</h2>
      <div class="url-warning ${!showWarning ? 'hidden' : ''}">
        The URL <strong>is not valid</strong> please submit a valid URL.
      </div>
      <input
        class="${inputClass}"
        type="text"
        id="url"
        placeholder="https://your.domain/openapi.yaml"
        value="${this.url}"
        @keypress="${this.keyPress}"
      />
      <button @click=${this.analyze}>Analyze</button>
      <hr />
    `;
  }

  keyPress(e: KeyboardEvent) {
    switch (e.key) {
      case 'Enter':
        this.analyze();
        break;
      default:
    }
  }

  analyze() {
    this.url = this.urlInput.value;
    const urlValid: boolean = this.checkUrl(this.url);

    if (urlValid) {
      // fire event to let controller know, it's time for some network fun.
      const options = {
        detail: { url: this.url },
        bubbles: true,
        composed: true,
      };
      this.dispatchEvent(
        new CustomEvent<UrlSubmittedEvent>(UrlSubmitted, options)
      );
    }
  }
}
