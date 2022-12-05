import { css } from 'lit';

export default css`
  :host {
    background: var(--vacuum-online-results-background);
    border-radius: 3px;
    padding: 0 40px 0 40px;
    display: block;
    margin-top: 60px;
    position: relative;
  }

  button {
    background: none;
    font-size: var(--rule-item-header-fontsize);
    font: var(--font-stack);
    border: none;
    color: var(--primary-color);
    text-decoration: none;
  }

  button:hover {
    background-color: var(--primary-color);
    color: var(--invert-font-color);
    cursor: pointer;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
  }

  a:hover {
    background-color: var(--primary-color);
    color: var(--invert-font-color);
    cursor: pointer;
  }

  .linting-statistics {
    display: flex;
    flex-wrap: wrap;
  }

  .statistic {
    width: 16%;
    margin-right: 10px;
    font-size: 0.75rem;
    color: var(--tertiary-color);
    background-color: var(--background-color);
    padding: 10px;
    border-radius: 3px;
    margin-bottom: 20px;
  }

  .lds-ellipsis {
    display: block;
    margin: 0 auto;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--secondary-color);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }

  .emoji {
    font-family: 'Helvetica', 'Arial', sans-serif;
  }

  h4 {
    font-size: 1.3rem;
    margin: 0;
  }

  h5 {
    font-size: 1rem;
    margin: 0;
  }

  h3 {
    color: var(--tertiary-color);
    font-size: 1.4rem;
    margin-top: 20px;
    text-align: center;
  }

  .error {
    color: var(--error-color);
  }

  .warn-400 {
    color: var(--warn-400);
  }

  .warn-300 {
    color: var(--warn-300);
  }

  .warn-200 {
    color: var(--warn-200);
  }

  .warn {
    color: var(--warn-color);
  }

  .ok-400 {
    color: var(--ok-400);
  }

  .ok-300 {
    color: var(--ok-300);
  }

  .ok-200 {
    color: var(--ok-200);
  }

  .ok {
    color: var(--ok-color);
  }

  .info {
    color: var(--font-color);
  }

  .api-error {
    margin-top: -20px;
  }

  @media only screen and (max-width: 600px) {
    :host {
      padding: 5px;
    }

    .statistic {
      width: 41%;
    }

    .api-error {
      margin-top: -25px;
      font-size: 0.7rem;
    }
  }
`;
