import styled from 'styled-components';

export const Container = styled.div`
  margin: auto;
  width: 90%;
  max-width: 1200px;
  padding: 2rem 0;
`;

export const Header = styled.div`
  width: 100%;
  padding: 1rem;
  padding-bottom: 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid ${props => props.theme.card.border};
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 1.5rem;
  font-weight: bold;

  color: ${props => props.theme.white};
`;

export const InputContainer = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;

  display: flex;
  flex-direction: row;

  gap: 1rem;

  position: relative;

  border-radius: 1rem;

  background-color: ${props => props.theme.form.background};
`;
