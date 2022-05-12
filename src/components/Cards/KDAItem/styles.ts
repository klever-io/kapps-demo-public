import Button from 'components/Button';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: auto;

  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 2rem 1rem;

  background-color: ${props => lighten(0.1, props.theme.background)};

  border-radius: 0.75rem;

  color: ${props => props.theme.white};

  a {
    text-decoration: none;
    color: ${props => props.theme.white};
  }

  @media screen and (min-width: 768px) {
    padding: 0.25rem;
  }
`;

export const ItemImage = styled.img`
  border-radius: 0.5rem;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -20%);
`;

export const ItemCol = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  text-align: center;

  gap: 0.125rem;
  span {
    font-size: 0.8rem;
    font-weight: 300;
  }
  &:last-child {
    flex-direction: row;
    gap: 0.5rem;
  }
`;

export const ItemId = styled.div``;

export const IdCol = styled(ItemCol)`
  span {
    font-size: 0.8rem;
    font-weight: 300;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.card.border};
`;

export const ViewButton = styled(Link)`
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: center;

  background-color: ${props => props.theme.primary};
`;

export const StyledButton = styled(Button)`
  margin-top: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.5rem;
  text-align: center;

  background-color: ${props => props.theme.primary};
`;
