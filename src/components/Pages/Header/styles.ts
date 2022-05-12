import styled from 'styled-components';
import { GrRotateLeft } from 'react-icons/gr';

export const Container = styled.div<{ border?: string }>`
  width: 100%;

  margin-top: 2rem;

  padding: 1rem;
  padding-bottom: 2rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  gap: 1rem;

  border-bottom: 1px solid ${props => props.theme.card.border};

  ${props => props.border === 'none' && `border: none;`}
`;

export const ReloadIcon = styled(GrRotateLeft)`
  min-width: 1.5rem;
  min-height: 1.5rem;

  color: ${props => props.theme.card.background};
  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    color: ${props => props.theme.card.border};
  }
`;
