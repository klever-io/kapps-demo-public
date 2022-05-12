import styled, { css } from 'styled-components';

export const Container = styled.div<{ hoverLabel?: string; width?: number }>`
  user-select: none;
  cursor: pointer;

  position: relative;

  &:hover {
    @media screen and (min-width: 768px) {
      &::after {
        content: 'Click to copy';

        font-size: 0.75rem;
        letter-spacing: initial;

        position: absolute;
        bottom: -1rem;
        left: 0rem;

        background-color: ${props => props.theme.card.background};
        color: ${props => props.theme.white};

        padding: 0.5rem;

        border-radius: 5px;

        z-index: 500;

        transform: translate(-50%, 100%);
        ${props =>
          props.hoverLabel &&
          css`
            content: '${props.hoverLabel}';
          `}

        ${props =>
          props.width &&
          css`
            width: ${props.width}ch;
          `}
      }
      &::before {
        content: '';

        position: absolute;
        bottom: -0.5rem;
        left: 0.25rem;

        width: 0;
        height: 0;

        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid ${props => props.theme.card.background};

        transform: translate(-25%, 100%);
      }
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
    max-width: 11ch;
    padding: 1rem 0;
  }
`;
