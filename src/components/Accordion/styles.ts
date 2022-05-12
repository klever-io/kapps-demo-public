import { lighten } from 'polished';
import styled, { css } from 'styled-components';
import { MdContentCopy, MdExpandMore } from 'react-icons/md';

interface IAccordionProps {
  isOpen: boolean;
}

export const AccordionTitle = styled.div`
  padding: 1rem 1.5rem;

  width: 100%;

  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  position: relative;

  background-color: ${props => lighten(0.1, props.theme.background)};
  border-radius: 0.5rem;

  color: ${props => props.theme.wallet.white};

  cursor: pointer;

  z-index: 10;
`;

export const AccordionContent = styled.div<IAccordionProps>`
  padding: 1rem 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 0.5rem;

  position: relative;
  top: -0.5rem;

  max-height: 20rem;
  overflow-y: auto;

  border-radius: 0 0 0.5rem 0.5rem;

  background-color: ${props => lighten(0.2, props.theme.background)};
  z-index: 0;

  transition: 0.2s ease;

  ${props =>
    props.isOpen
      ? css`
          opacity: 1;
          visibility: visible;
        `
      : css`
          max-height: 0;
          padding: 0 0.25rem;
          height: 0;
          opacity: 0.3;
          visibility: hidden;
        `}
`;

export const StyledExpandIcon = styled(MdExpandMore)<IAccordionProps>`
  color: ${props => props.theme.wallet.white};
  font-size: 1.5rem;
  margin-right: 1rem;

  transition: transform 0.2s ease-in-out;
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const Item = styled.div`
  margin: auto;
  padding: 1rem 1.5rem;

  width: 100%;
  max-width: 20rem;

  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${props => lighten(0.1, props.theme.background)};
  border-radius: 0.5rem;

  color: ${props => props.theme.wallet.white};
`;

export const CopyIcon = styled(MdContentCopy)`
  cursor: pointer;
`;
