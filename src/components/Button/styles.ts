import styled, { css } from 'styled-components';

import { transparentize } from 'polished';
import { styleTypes } from '.';

interface ButtonProps extends styleTypes {
  mainPage?: boolean;
}

const ContainerMainPage = css`
  background-color: ${props => props.theme.primary};

  border: unset;
  border-radius: 0.5rem;
`;

export const Container = styled.button<ButtonProps>`
  padding: 1rem 1.25rem;

  width: 100%;

  position: relative;

  background-color: ${props => props.theme.white};

  border: 1px solid ${props => props.theme.rose};
  border-radius: 0.25rem;

  color: ${props => props.theme.white};
  font-size: 0.9rem;
  text-transform: uppercase;

  cursor: pointer;

  transition: 0.3s ease;

  ${props => props.mainPage && ContainerMainPage};

  p {
    position: relative;

    color: transparent;
    background-image: ${props => props.theme.button.background};
    background-clip: text;
    -webkit-background-clip: text;

    z-index: 2;

    transition: 0.3s ease;
  }

  &:before {
    content: '';

    position: absolute;
    inset: 0;

    display: block;

    background-image: ${props => props.theme.button.background};
    opacity: 0;

    border-radius: 0.25rem;

    transition: 0.3s ease;
  }

  &:hover {
    ${props =>
      !props.mainPage
        ? css`
            border-color: transparent;

            background-color: ${transparentize(0, props.theme.white)};

            &:before {
              opacity: 1;
            }

            p {
              color: ${props.theme.white};
            }
          `
        : css`
            filter: brightness(1.1);
          `};
  }

  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
      filter: brightness(0.6);
      &:hover {
        filter: brightness(0.6);
      }
    `}

  ${props =>
    props.styleType === 'secondary' &&
    css`
      background-color: transparent;
      border: 1px solid ${props.theme.card.border};
      color: ${props.theme.card.border};

      font-weight: 600;

      &:hover {
        background-color: ${props.theme.card.border};
        color: ${props.theme.white};
      }
    `}

    ${props =>
    props.styleType === 'outlined' &&
    css`
      background-color: transparent;
      border: 1px solid ${props.theme.primary};
      color: ${props.theme.primary};

      font-weight: 600;

      &:hover {
        background-color: ${props.theme.primary};
        color: ${props.theme.white};
      }
    `}

    ${props =>
    props.styleType === 'transparent' &&
    css`
      background-color: transparent;
      color: ${props.theme.primary};

      font-weight: 600;
      border: none;

      transition: 0.1s linear;

      &:hover {
        filter: brightness(1.2);
        backdrop-filter: brightness(1.25);
      }
    `}
`;
