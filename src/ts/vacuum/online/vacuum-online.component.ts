import { customElement, query, state } from 'lit/decorators.js';
import { LitElement, html } from 'lit';
import vacuumOnlineCss from './vacuum-online.css';
import {
  UrlSubmittedEvent,
  TextSubmittedEvent,
} from '../model/spec-submitted-events';
import { VacuumLintingReportComponent } from './vacuum-linting-report.component';
import { LintingResults } from '../model/linting-result';
import { ApiError } from '../model/api-error';
import { VacuumFileUploadComponent } from './vacuum-file-upload.component';
import { VacuumUrlInputComponent } from './vacuum-url-input.component';

@customElement('vacuum-online')
export class VacuumOnlineComponent extends LitElement {
  static styles = vacuumOnlineCss;

  @query('vacuum-linting-report')
  lintingReport: VacuumLintingReportComponent;

  @query('vacuum-spec-input')
  fileUpload: VacuumFileUploadComponent;

  @query('vacuum-url-input')
  urlInput: VacuumUrlInputComponent;

  @state()
  lintingResults: LintingResults;

  @state()
  open: boolean;

  @state()
  error: ApiError;

  @state()
  showTextInput: boolean = true;

  @state()
  showFileInput: boolean = true;

  private submittedUrl: string;

  private submittedText: string;

  render() {
    let loading: boolean;
    let expanded: boolean;

    if (this.open) {
      loading = true;
    }

    if (this.lintingResults) {
      expanded = true;
    }

    return html` <vacuum-url-input
        @urlSubmitted=${this.urlSubmitted}
        ?hidden="${!this.showFileInput}"
      >
      </vacuum-url-input>
      <vacuum-file-upload
        @textSubmitted=${this.textSubmitted}
        ?hidden="${!this.showTextInput}"
      >
        why?
      </vacuum-file-upload>
      <vacuum-linting-report
        url="${this.submittedUrl}"
        class="${loading ? 'loading' : null} ${expanded ? 'expanded' : null}"
      >
      </vacuum-linting-report>`;
  }

  urlSubmitted(evt: CustomEvent<UrlSubmittedEvent>) {
    this.open = true;
    this.showTextInput = false;
    this.submittedUrl = evt.detail.url;
    this.lintingResults = null;
    this.lintingReport.lintingResults = null;
    this.lintingReport.lintingError = null;
    this.fetchLintingResultForUrl(evt.detail.url);
  }

  textSubmitted(evt: CustomEvent<TextSubmittedEvent>) {
    this.open = true;
    this.showFileInput = false;
    this.submittedText = evt.detail.text;
    this.lintingResults = null;
    this.lintingReport.lintingResults = null;
    this.lintingReport.lintingError = null;
    this.fetchLintingResultForText(this.submittedText);
  }

  async fetchLintingResultForText(specData: string) {
    try {
      const response = await fetch(`https://api.quobix.com/lint`, {
        method: 'post',
        body: specData,
      });
      if (response.ok) {
        const data = await response.json();
        this.lintingResults = data;
        this.lintingReport.lintingResults = data;
        this.lintingReport.lintingResults.uploadedText = specData;
      } else {
        const apiError = await response.json();
        this.error = apiError;
        this.lintingReport.lintingError = apiError;
      }
    } catch (error) {
      this.error = {
        instance: 'https://quobix.com/vacuum/errors/500',
        title: 'Failure, on the rocks please',
        detail:
          "Looks like things went south. Your request successfully tanked the service and now it's rebooting (only takes a second)" +
          ' We will look into how your majestic specification, caused vacuum to blow up.',
        status: 500,
        type: 'https://quobix.com/vacuum/errors/500',
      };
      this.lintingReport.lintingError = this.error;
    }
  }

  async fetchLintingResultForUrl(url: string) {
    try {
      const response = await fetch(`https://api.quobix.com/lint?url=${url}`);
      if (response.ok) {
        const data = await response.json();
        this.lintingResults = data;
        this.lintingReport.lintingResults = data;
      } else {
        const apiError = await response.json();
        this.error = apiError;
        this.lintingReport.lintingError = apiError;
      }
    } catch (error) {
      this.error = {
        instance: 'https://quobix.com/vacuum/errors/500',
        title: 'Failure, on the rocks please',
        detail:
          "Looks like things went south. Your request successfully tanked the service and now it's rebooting (only takes a second)" +
          ' We will look into how your majestic specification, caused vacuum to blow up.',
        status: 500,
        type: 'https://quobix.com/vacuum/errors/500',
      };
      this.lintingReport.lintingError = this.error;
    }
  }
}
