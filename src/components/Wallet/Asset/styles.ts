import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const TableContainer = styled.div`
  overflow-x: auto;

  border-radius: 0.5rem;
`;

export const TableHeader = styled.div`
  padding: 0.5rem 1rem;

  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  span {
    color: ${props => props.theme.wallet.gray};
    font-weight: 400;
  }
`;

export const TableBody = styled.div`
  margin-top: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TableRow = styled.div`
  padding: 1rem 1.5rem;

  width: 100%;

  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${props => lighten(0.1, props.theme.background)};
  border-radius: 0.5rem;

  span {
    color: ${props => props.theme.wallet.white};
  }
`;
export const ButtonContainer = styled.div`
  width: 100%;
  max-width: 40rem;
`;
