import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
export const Content = styled.div`
  width: 100%;
  margin-top: 2rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 425px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.75rem;

  width: 100%;

  @media (max-width: 768px) {
    width: 100%;

    flex-direction: column;
  }
`;

export const ButtonContainer = styled(Link)`
  button {
    padding: 0.75rem 1.25rem;
  }
`;

export const EmptyTab = styled.div`
  width: 100%;

  span {
    display: table;
    margin: 0 auto;

    opacity: 0.3;

    color: ${props => props.theme.white};
  }
`;
