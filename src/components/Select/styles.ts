import { transparentize } from 'polished';
import styled, { css } from 'styled-components';
import { Sizes } from '.';

export const ReactSelect = css`
  .react-select {
    margin: 0.25rem 0;
    width: 100%;
  }
  .react-select-empty {
    margin: 0.25rem 0;
    width: 100%;
    .react-select__control {
      border: 1px dashed ${props => props.theme.card.border};
      filter: opacity(0.7);
      &:hover:not(:focus):not(:disabled) {
        filter: opacity(1) brightness(1.2);
      }
    }
  }
  .react-select__control {
    background-color: ${props => props.theme.card.background};
    border-radius: 0.5rem;
    border: 1px solid ${props => props.theme.card.border};
    height: 2.5rem;
    width: 100%;
    padding: 0 1.5rem;
    color: ${props => props.theme.white};
  }
  .react-select__control--is-focused {
    border: none;
    border-radius: 0.5rem;
    height: 2.5rem;
    width: 100%;
    color: ${props => props.theme.white};
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0.1rem 0.1rem
      ${props => transparentize(0.25, props.theme.primary)};
  }
  .react-select__indicator-separator {
    display: none;
  }
  .react-select__value-container {
    padding: 0.125rem;
    height: 2rem;
    width: 100%;
    border-radius: 0.5rem;
    border: none;
    color: ${props => props.theme.white};
    caret-color: ${props => props.theme.white};
  }
  .react-select__input {
    color: ${props => props.theme.white} !important;
  }
  .react-select__menu {
    background-color: ${props => props.theme.card.background};
    border-radius: 0.5rem;
    border: none;
    color: ${props => props.theme.white};
    overflow: overlay;
  }
  .react-select__option {
    background-color: ${props => props.theme.card.background};
    border-radius: 0.5rem;
    border: none;
    color: ${props => props.theme.white};
    &:hover:not(:focus):not(:disabled) {
      filter: brightness(1.2);
    }
  }
  .react-select__single-value {
    color: ${props => props.theme.white};
  }
  .react-select--is-disabled {
    filter: opacity(0.5) grayscale(0.75) brightness(1.1);
  }
`;

export const TooltipContent = styled.div`
  margin-left: 0.8rem;
`;

export const Container = styled.div<{ size: Sizes }>`
  display: flex;

  flex-direction: column;

  span {
    p {
      ${props =>
        props.size === 'small' &&
        css`
          min-width: 4rem;
          overflow: hidden;
        `}
    }
    z-index: 1;
    height: 1.6rem;
    padding-bottom: 0.5rem;

    color: ${props => props.theme.filter.title};
    font-weight: 600;
    font-size: 0.9rem;

    display: flex;
    z-index: 1;
  }
  ${ReactSelect}

  ${props =>
    props.size === 'small' &&
    css`
      width: 100%;
      max-width: 8rem;

      .react-select__control {
        padding: 0;
      }
      .react-select__value-container {
        padding: 0.125rem;
        margin: 0;
      }
    `}
`;

export const LoaderContainer = styled.div`
  height: 100%;

  display: grid;
  place-content: center;

  transform: translateX(-12.5%);
`;
