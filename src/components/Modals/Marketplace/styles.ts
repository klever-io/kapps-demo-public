import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: grid;
  place-content: center;

  width: 100vw;
  height: 100vh;

  z-index: 10;
  backdrop-filter: brightness(0.3);
`;

export const Image = styled.img`
  border-radius: 0.5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  padding: 2rem;

  height: fit-content;
  width: 40rem;
  max-width: 60vw;

  border-radius: 1rem;

  background-color: ${props => props.theme.card.background};
  z-index: 9;
`;

export const DetailsRow = styled.div`
  color: ${props => props.theme.white};
`;

export const ButtonsRow = styled.div`
  color: ${props => props.theme.white};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

export const BidRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const LoaderText = styled.div`
  color: ${props => props.theme.white};
  margin: auto;
`;
