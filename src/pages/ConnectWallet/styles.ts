import { darken, lighten } from 'polished';
import { BsInfoCircle } from 'react-icons/bs';
import Input from 'components/Input';
import styled from 'styled-components';

export const Logo = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

export const Content = styled.div`
  height: 60%;
  min-height: 50vh;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4rem;

  padding-top: 2rem;

  width: 100%;
  max-width: 90vw;
`;

export const ContentTitle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  width: 100%;

  h1 {
    font-weight: 500;
  }

  h3 {
    font-weight: 400;
  }

  a {
    color: ${({ theme }) => theme.gray};
    text-decoration: none;
    transition: 0.2s ease-in-out;

    width: 100%;
    text-align: right;

    font-weight: 400;
    font-size: 0.8rem;

    :visited {
      color: ${({ theme }) => theme.gray};
    }
    :hover {
      color: ${props => lighten(0.2, props.theme.primary)};
      text-decoration: dotted 1px underline;
    }
  }
`;

export const InfoIcon = styled(BsInfoCircle)`
  height: 0.75rem;
`;

export const ContentBody = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    width: 100%;
  }
`;

export const InputFile = styled.div<{ isDragging: boolean }>`
  padding: 1.25rem 1.5rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px dashed ${props => props.theme.card.border};
  border-radius: 0.5rem;

  background-color: ${props => lighten(0.1, props.theme.background)};

  background-color: ${props =>
    props.isDragging && darken(0.025, props.theme.card.background)} !important;
  border-color: ${props =>
    darken(props.isDragging ? 0.01 : 0, props.theme.card.border)};

  color: ${props => props.theme.white};
  font-weight: 400;
  font-size: 0.9rem;

  transition: 0.2s ease;

  &:hover {
    border-color: ${props => darken(0.05, props.theme.card.border)};
    background-color: ${props => darken(0.025, props.theme.card.background)};
  }

  input {
    display: none;
  }

  label {
    cursor: pointer;

    color: #f372ff;
    font-weight: 500;
  }
`;

export const ErrorContainer = styled.div`
  height: 1rem;
  width: 100%;

  margin: -0.5rem 0 1.25rem;
  padding: 1.25rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.5rem;

  background-color: ${props => props.theme.error.background};

  color: ${props => props.theme.error.border};
`;

export const DragContainer = styled.div`
  width: 100%;
  height: 100vh;

  z-index: 90;
`;

export const ButtonContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  button {
    max-width: 20rem;
  }
`;

export const PasswordLabel = styled.label`
  margin-left: auto;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  font-size: 0.9rem;
  user-select: none;

  > div {
    width: unset;
    zoom: 75%;
    > div {
      padding: 0;
      justify-content: end;
    }
  }
`;

export const PasswordInput = styled.div`
  margin-left: auto;
  margin-top: 2rem;
`;

export const StyledInput = styled(Input)``;
