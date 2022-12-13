import { css } from 'lit';

export default css`
  :host {
    display: flex;
    border: 1px solid var(--terminal-border);
    padding: 20px 5px 20px 15px;
    font-size: 1.1rem;
  }

  .prompt {
    display: inline-block;
    color: var(--tertiary-color);
    margin-left: 2px;
    margin-right: 10px;
  }

  pre {
    margin: 0;
    padding: 0;
    white-space: pre-wrap;  
  }

  .name {
    color: var(--secondary-color);
  }

  .command {
    color: var(--primary-color);
    font-weight: bold;
  }

  .flag {
    color: var(--tertiary-color);
    font-style: italic;
  }

  @media only screen and (max-width: 600px) {
    :host {
      font-size: 0.9rem;
      overflow-x: auto;
    }
    pre {
      white-space: pre-wrap;
    }
  }
`;
