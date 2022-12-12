import { css } from 'lit';

export default css`
  input {
    background: var(--terminal-header-background);
    border: 1px dashed var(--secondary-color-lowalpha);
    padding: 11px;
    color: var(--font-color);
    width: 80%;
    border-radius: 3px;
    font-size: 0.8rem;
    font-family: var(--font-stack);
  }

  input.warning {
    border: 1px dashed var(--terminal-yellow);
    color: var(--terminal-yellow);
  }

  hr {
    margin-top: 40px;
    margin-bottom: 40px;
    background: none;
    border-top: none;
    border-bottom: 1px dashed var(--secondary-color-lowalpha);
  }

  button {
    background-color: var(--background-color);
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
    padding: 9px;
    font-size: 1rem;
    font-weight: bold;
    font-family: var(--font-stack);
    width: 15%;
  }

  button:hover {
    background-color: var(--primary-color);
    color: var(--invert-font-color);
    cursor: pointer;
  }

  button:disabled,
  button[disabled] {
    background-color: var(--background-color);
    color: var(--terminal-border);
    border: 1px dashed var(--terminal-border);
    cursor: not-allowed;
  }

  .url-warning {
    border: 1px solid var(--terminal-yellow);
    padding: 10px;
    color: var(--terminal-yellow);
    margin-bottom: 20px;
  }

  .hidden {
    display: none;
  }

  @media only screen and (max-width: 600px) {
    input {
      width: 97%;
      padding-right: 0;
    }
    button {
      width: 100%;
      margin-top: 10px;
    }
  }
`;
