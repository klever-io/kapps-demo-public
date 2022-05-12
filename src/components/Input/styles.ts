import styled, { css } from 'styled-components';
import { transparentize } from 'polished';

interface IProps {
  error?: boolean;
  disabled?: boolean;
  valid?: boolean;
  span?: number;
  toggle?: boolean;
}

export const StyledInput = styled.input<IProps>`
  width: 100%;

  padding: 1rem 1.25rem;

  border: 1px solid ${({ theme }) => theme.input.border.dark};
  border-radius: 0.5rem;

  color: ${({ theme }) => theme.input.border.dark};

  box-shadow: unset !important;

  font-weight: 500;

  &:focus {
    outline: unset !important;
    outline-offset: unset !important;
    border: 1px solid ${({ theme }) => theme.input.border};
  }

  /* Disable placeholder */
  &::placeholder {
    color: transparent;
    visibility: hidden;
  }

  /* Set valid css */
  ${({ theme, valid }) =>
    valid
      ? css`
          border: 1px solid ${theme.status.done} !important;
          + label {
            color: ${theme.status.done} !important;
          }
        `
      : null}

  /* Set error css */
  ${({ theme, error }) =>
    error
      ? css`
          color: ${theme.error} !important;
          border: 1px solid ${theme.error} !important;
          background-color: ${transparentize(
            0.8,
            theme.error.border,
          )} !important;
          + label {
            color: ${theme.error} !important;
          }
        `
      : null}


  /* Remove view password icon */
  /* Microsoft Edge */
  &::-ms-reveal {
    display: none;
  }
  /* Safari */
  &::-webkit-contacts-auto-fill-button,
  &::-webkit-credentials-auto-fill-button {
    visibility: hidden;
    display: none !important;
    pointer-events: none;
    height: 0;
    width: 0;
    margin: 0;
  }

  /* Remove number spinners */
  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
export const Container = styled.div<IProps>`
  width: 100%;
  position: relative;

  ${props =>
    css`
      grid-column: auto / span ${props.span};
    `}

  span {
    color: ${props => (props.error ? props.theme.error : props.theme.gray)};

    font-weight: 400;
    font-size: 0.85rem;
  }
`;

export const ToggleContainer = styled.div<IProps>`
  display: flex;
  justify-content: flex-start;
  padding: 0.75rem 2rem;
  align-items: center;
  gap: 1rem;
  color: ${props => props.theme.input.text};
`;

export const Toggle = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 3rem;
  height: 1.5rem;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 5rem;
  }
  .slider:before {
    position: absolute;
    content: '';
    height: 1rem;
    width: 1rem;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
  input:checked + .slider {
    background-color: ${props => props.theme.primary};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${props => props.theme.primary};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(1.5rem);
    -ms-transform: translateX(1.5rem);
    transform: translateX(1.5rem);
  }
`;

export const RightContentContainer = styled.div`
  position: absolute;

  top: 50%;
  right: 0;
  transform: translateY(-50%);

  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const InputLabel = styled.label`
  /* Disable label pointer events */
  pointer-events: none;

  font-size: smaller;
  font-weight: 600;
  transform: translate(-1rem, -2.25rem);

  position: absolute;
  left: 1rem;
  top: 0.9rem;

  color: ${({ theme }) => theme.input.border.dark};

  transition: transform 0.2s ease;
`;
