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

export const Grid = styled.div`
  margin-top: 0.5rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 1.5rem;
`;
