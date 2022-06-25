import styled, { css } from 'styled-components';
import { Form } from '@unform/web';

export const FormBody = styled(Form)``;

export const FormSection = styled.div<{ inner?: boolean }>`
  margin-top: 1rem;
  padding: 1.5rem;
  padding-top: 3rem;
  position: relative;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  grid-auto-columns: auto;
  column-gap: 1rem;
  row-gap: 3rem;

  border-radius: 1rem;

  &:not(:first-child) {
    padding-top: 5rem;
  }

  background-color: ${props => props.theme.form.background};
  ${props =>
    props.inner &&
    css`
      filter: brightness(1.2);
      grid-column: auto / span 2;
      button {
        filter: brightness(0.75);
        &:hover {
          filter: brightness(0.85);
        }
      }
    `}

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    padding: 0.5rem;
    padding-top: 5rem;

    ${props =>
      props.inner &&
      css`
        margin-top: -1rem;
      `}
  }
`;

export const SectionTitle = styled.div`
  font-size: 1.2rem;
  width: calc(100% - 2rem);
  font-weight: 500;
  display: flex;
  color: ${props => props.theme.white};
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

export const TooltipSpace = styled.div`
  margin-left: 0.4rem;
  position: absolute;
  left: 2rem;
  bottom: 3rem;
`;

export const InputWrapper = styled.div``;

export const ButtonContainer = styled.div<{ submit?: boolean }>`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;

  > button {
    width: 100%;
    max-width: 15rem;
  }

  ${props =>
    props.submit &&
    css`
      padding: 0 1rem;
      margin: 1rem auto 0;
    `}

  @media screen and (max-width: 768px) {
    ${props =>
      props.submit &&
      css`
        padding: 0 0.5rem;

        flex-direction: column;
        gap: 1rem;

        > button {
          max-width: unset;

          margin: auto;
        }
      `}
  }
`;
