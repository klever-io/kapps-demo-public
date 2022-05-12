import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  display: grid;
  place-content: center;
  place-items: center;

  backdrop-filter: brightness(0.4);
  z-index: 1000;
`;

export const TimedOut = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;

  color: ${({ theme }) => theme.white};
  font-size: 1.5rem;

  padding-top: 1rem;

  cursor: pointer;
  user-select: none;

  :hover {
    strong {
      color: ${({ theme }) => theme.primary};
    }
  }
`;
