import { lighten } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div<{ walletAddress: boolean }>`
  color: ${props => props.theme.white};

  padding: 0.5rem 1rem;
  line-height: 1.125rem;
  letter-spacing: 0.175ch;
  font-weight: 400;
  font-size: 0.875rem;

  background-color: ${props => lighten(0.1, props.theme.background)};

  margin-left: auto;
  border-radius: 0.5rem;
  ${props =>
    !props.walletAddress &&
    css`
      visibility: hidden;
    `}

  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  user-select: none;
  cursor: pointer;

  position: relative;

  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.card.background};

    @media screen and (min-width: 768px) {
      &::after {
        content: 'Click to copy';
        font-size: 0.75rem;
        letter-spacing: initial;
        position: absolute;
        bottom: -1rem;
        left: 5rem;
        background-color: ${props => props.theme.card.background};
        color: ${props => props.theme.white};
        padding: 0.5rem;
        border-radius: 5px;
        z-index: 500;
        transform: translate(-50%, 100%);
      }
      &::before {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        left: 4.25rem;
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

    background-color: ${props => props.theme.card.background};
  }
`;
