import { customElement, query } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import vacuumFileUploadCss from './vacuum-file-upload.css';
import {
  TextSubmitted,
  TextSubmittedEvent,
} from '../model/spec-submitted-events';

@customElement('vacuum-file-upload')
export class VacuumFileUploadComponent extends LitElement {
  static styles = vacuumFileUploadCss;

  @query('textarea')
  textarea: HTMLTextAreaElement;

  render() {
    return html`
      <textarea
        placeholder="openapi: 3.1
info:
  title: Some Specification
  description: Replace this with your own specification
  termsOfService: https://quobix.com/vacuum
tags:
  - name: Something
    description: Something about something else.
servers:
  - url: https://quobix.com/api
paths:
  /somePath:
    post:
      operationId: createSomething
      tags:
        - Something
      description: Create a thing that does something.
      requestBody:
        description: Something that you want to create
        content:
          application/json:
            schema:
              type: string  
      responses:
        '200':
          description: OK, everything is fine.
          content:
            application/json:
              schema:
                schema: string
          "
      ></textarea>
      <button @click=${this.analyze}>Analyze</button>
    `;
  }

  analyze() {
    // fire event to let controller know, it's time for some network fun.
    const options = {
      detail: { text: this.textarea.value },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(
      new CustomEvent<TextSubmittedEvent>(TextSubmitted, options)
    );
  }
}
