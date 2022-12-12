import { css } from 'lit';

export default css`
  vacuum-linting-report {
    display: none;
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: height 300ms, opacity 300ms, ease-out 100ms;
  }

  .loading {
    display: block;
    opacity: 1;
    height: 120px;
    overflow: visible;
  }

  .expanded {
    height: 315px;
  }

  @media only screen and (max-width: 600px) {
    .expanded {
      height: 600px;
    }
  }
`;
