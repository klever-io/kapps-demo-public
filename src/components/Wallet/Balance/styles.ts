import styled from 'styled-components';

export const AmountContainer = styled.div`
  display: flex;

  flex-direction: column;

  p {
    color: ${props => props.theme.wallet.gray};

    font-weight: 400;
    font-size: 0.85rem;
  }

  span {
    color: ${props => props.theme.white};

    font-size: 2.5rem;
  }
`;
