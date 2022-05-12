import styled from 'styled-components';

export const EmptyTab = styled.div`
  width: 100%;

  span {
    display: table;
    margin: 0 auto;

    opacity: 0.3;

    color: ${props => props.theme.white};
  }
`;
