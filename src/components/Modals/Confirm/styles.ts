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
  gap: 4rem;

  padding: 2rem;

  height: fit-content;
  max-width: 90vw;
  min-width: 50vw;

  border-radius: 1rem;

  background-color: ${props => props.theme.card.background};
`;

export const DetailsRow = styled.pre`
  color: ${props => props.theme.white};

  border-bottom: 1px solid ${props => props.theme.card.border};
  border-top: 1px solid ${props => props.theme.card.border};
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: 2rem;
`;

export const LinkRow = styled.div``;

export const Link = styled.a`
  color: ${props => props.theme.white};

  &:visited {
    color: ${props => props.theme.white};
  }
`;
