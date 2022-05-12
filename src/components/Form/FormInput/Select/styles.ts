import { ReactSelect } from 'components/Select/styles';
import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  height: 100%;
  width: 100%;
  display: flex;

  flex-direction: column;
  span {
    padding-bottom: 0.25rem;

    color: ${props => props.theme.filter.title};
    font-weight: 600;
    font-size: 0.9rem;
  }
  ${ReactSelect}
  .react-select__control {
    min-height: 3rem;
    background-color: unset;
    border-color: ${({ theme }) => theme.input.border.dark};

    transition: 0.2s ease-in-out;
    &:hover {
      border-color: ${({ theme }) => theme.input.border.dark};
      box-shadow: 0 0 0.5rem -0.125rem ${props => lighten(0.1, props.theme.primary)};
    }
  }
  .react-select__control--is-focused {
    color: ${props => props.theme.white};
    border: 1px solid ${({ theme }) => theme.input.border.dark};
    box-shadow: 0 0 0.5rem -0.125rem ${props => lighten(0.1, props.theme.primary)};
  }
`;

export const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
  color: transparent;
  border: none;
  outline: none;
`;
