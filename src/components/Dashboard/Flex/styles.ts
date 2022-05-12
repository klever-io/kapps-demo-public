import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
export const Content = styled.div`
  width: 100%;
  margin: auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    line-break: loose;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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

export const Headers = styled.div`
  margin: 4rem auto 1rem;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  color: ${props => props.theme.gray};
  font-weight: 400;

  span {
    width: 100%;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
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
