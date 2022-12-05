import { customElement, property, query } from 'lit/decorators.js';
import { LitElement, html, TemplateResult } from 'lit';
import vacuumLintingReportCss from './vacuum-linting-report.css';
import { LintingResults } from '../model/linting-result';
import { ProgressBarComponent } from '../shared-components/progress-bar.component';
import { GetScoreColor, GetScoreEvaluation } from '../utils/score-colors';
import { ApiError } from '../model/api-error';

@customElement('vacuum-linting-report')
export class VacuumLintingReportComponent extends LitElement {
  static styles = [vacuumLintingReportCss];

  @query('progress-bar')
  progressBar: ProgressBarComponent;

  @property()
  lintingResults: LintingResults;

  @property()
  lintingError: ApiError;

  @property()
  url: string;

  submitFormAndVanish(evt: Event) {
    evt.preventDefault();
    const form = this.renderRoot.querySelector('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'https://api.quobix.com/report');
    form.submit();
  }

  generateViewReportButton(): TemplateResult {
    if (this.lintingResults.uploadedText) {
      return html`<button @click="${this.submitFormAndVanish}">
        View Full Report &gt;
      </button>`;
    }
    return html`<a href="https://api.quobix.com/report?url='${this.url}'"
      >View Full Report &gt;</a
    >`;
  }

  render() {
    if (this.lintingError) {
      return html`
        <div class="api-error">
          <h2>
            <span class="emoji">⛔</span>
            <span class="error"
              >Computer said '<strong>nope</strong>': [Error:
              ${this.lintingError.status}]</span
            >
          </h2>
          <p>${this.lintingError.detail}</p>
        </div>
      `;
    }

    let results: TemplateResult;

    let fileSize: string;
    let fileSizeGroup = 'bytes';

    if (this.lintingResults) {
      if (this.lintingResults.statistics.filesizeKb) {
        fileSize = this.lintingResults.statistics.filesizeKb.toLocaleString();
        fileSizeGroup = 'kb';
      }
      if (
        this.lintingResults.statistics.filesizeBytes &&
        !this.lintingResults.statistics.filesizeKb
      ) {
        fileSize =
          this.lintingResults.statistics.filesizeBytes.toLocaleString();
        fileSizeGroup = 'b';
      }
    }
    if (this.lintingResults) {
      const score = this.lintingResults.statistics.overallScore;
      results = html`
        <form @submit=${this.submitFormAndVanish}>
          <input type='hidden' name="payload" value='${
            this.lintingResults.uploadedText
          }'>
        <progress-bar value='${score}' label='${GetScoreEvaluation(
        score
      )}'></progress-bar>
        <h3>Quality Score: <span class='${GetScoreColor(
          score
        )}'>${score}%</span></h3>
        <section class='linting-statistics'>
          <div class='statistic'>
            Size
            <h4>${fileSize}${fileSizeGroup}</h4>
          </div>
          <div class='statistic'>
            Type
            <h5>${this.lintingResults.specInfo.type}</h5>
          </div>
          <div class='statistic'>
            <span class='emoji'>❌</span> <span class='error'>Errors</span> 
            <h4><span class='error'>${
              this.lintingResults.statistics.totalErrors
                ? this.lintingResults.statistics.totalErrors?.toLocaleString()
                : 0
            }</span></h4>
          </div>
          <div class='statistic'>
            <span class='emoji'>⚠️</span> <span class='warn'>Warnings</span>
            <h4><span class='warn'>${
              this.lintingResults.statistics.totalWarnings
                ? this.lintingResults.statistics.totalWarnings?.toLocaleString()
                : 0
            }<span></h4>
          </div>
          <div class='statistic'>
            <span class='emoji'>ℹ️</span> <span class='info'>Info</span>
            <h4><span class='info'>${
              this.lintingResults.statistics.totalInfo
                ? this.lintingResults.statistics.totalInfo?.toLocaleString()
                : 0
            }</span></h4>
          </div>
          <div class='statistic'>
            Operations
            <h4>${
              this.lintingResults.statistics.operations
                ? this.lintingResults.statistics.operations?.toLocaleString()
                : 0
            }</h4>
          </div>
          <div class='statistic'>
            Params
            <h5>${
              this.lintingResults.statistics.parameters
                ? this.lintingResults.statistics.parameters?.toLocaleString()
                : 0
            }</h5>
          </div>
          <div class='statistic'>
            Schemas
            <h4>${
              this.lintingResults.statistics.references
                ? this.lintingResults.statistics.references?.toLocaleString()
                : 0
            }</h4>
          </div>
          <div class='statistic'>
            Enums
            <h4>${
              this.lintingResults.statistics.enums
                ? this.lintingResults.statistics.enums?.toLocaleString()
                : 0
            }</h4>
          </div>
          <div class='statistic'>
            Paths
            <h4>${
              this.lintingResults.statistics.paths
                ? this.lintingResults.statistics.paths?.toLocaleString()
                : 0
            }</h4>
          </div>
        </section>
        <h3><span class='emoji'>👀</span> ${this.generateViewReportButton()}</h3>
        </form>
      `;
    } else {
      results = html`<div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>`;
    }

    return html` ${results} `;
  }
}
