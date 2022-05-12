import Button from 'components/Button';
import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 20rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  padding: 1rem;
  margin: auto;

  background-color: ${props => lighten(0.1, props.theme.background)};

  border-radius: 0.75rem;

  color: ${props => props.theme.white};

  a {
    text-decoration: none;
    color: ${props => props.theme.white};
  }
`;

export const ItemImage = styled.img`
  border-radius: 0.5rem;
`;

export const ItemId = styled.div``;

export const ItemData = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.125rem;
  span {
    font-size: 0.9rem;
    font-weight: 400;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.card.border};
`;

export const StyledButton = styled(Button)`
  margin-top: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.5rem;
  text-align: center;

  background-color: ${props => props.theme.primary};
`;
