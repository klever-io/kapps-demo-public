import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  padding: 2rem 0;

  width: 90%;
  max-width: 1000px;

  height: 100%;
`;

export const Title = styled.h1`
  width: fit-content;
  font-size: 1.5rem;
  font-weight: 400;
  color: ${props => props.theme.white};
`;
