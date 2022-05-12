import Button from 'components/Button';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const ItemImage = styled.img`
  border-radius: 0.5rem;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -30%);
`;

export const ItemId = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  font-size: 1.75rem;

  padding: 1rem 0 2rem;

  span {
    font-size: 0.8rem;
    font-weight: 300;
  }
`;

export const Container = styled.div<{ fungible?: boolean }>`
  width: 100%;
  max-width: 20rem;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  margin: auto;
  padding: 1rem;

  border-radius: 1rem;

  background-color: ${props => lighten(0.1, props.theme.background)};

  color: ${props => props.theme.white};

  a {
    text-decoration: none;
    color: ${props => props.theme.white};
  }
  ${props =>
    props.fungible &&
    css`
      max-width: 100%;
      flex-direction: row;
      border-radius: 0.75rem;
      padding: 5rem;
      gap: 10rem;
      margin-bottom: 7rem;
      align-items: flex-start;

      ${ItemImage} {
        position: relative;
        transform: unset;
        left: unset;
        top: unset;
      }
      ${ItemId} {
  flex-direction: column;
  justify-items: space-between;
  font-size: 2rem;
  span {
    font-size: 0.8rem;
    font-weight: 300;
  
      }
    `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
`;
export const AssetRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ItemData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1rem;

  margin-bottom: 1rem;

  small {
    font-size: 0.8rem;
  }
`;

export const Description = styled.div`
  color: ${props => props.theme.input.text};
  text-align: center;
  font-size: 0.95rem;
`;

export const InputRow = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

export const PayRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div:first-of-type {
    font-size: 0.9rem;
    color: ${props => props.theme.primary};
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.card.border};
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: ${props => props.theme.input.text};
  font-size: 0.9rem;
`;

export const PriceRangeTitle = styled.span`
  color: ${props => props.theme.primary};

  margin-bottom: 0.5rem;
`;

export const PriceRange = styled.span``;

export const PackPrice = styled.span``;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const ViewButton = styled(Link)`
  margin-top: 0.5rem;
  padding: 0.5rem;
  width: 80%;
  border-radius: 0.5rem;
  text-align: center;

  background-color: ${props => props.theme.primary};
`;

export const StyledButton = styled(Button)`
  &:before {
    margin-top: 0.5rem;
    padding: 0.5rem;
    width: 80%;
    border-radius: 0.5rem;
    text-align: center;

    background-color: ${props => props.theme.primary};
  }
`;
