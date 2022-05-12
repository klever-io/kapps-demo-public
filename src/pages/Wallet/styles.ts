import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  margin: 2rem 15rem;
`;

export const Title = styled.h1`
  color: ${props => props.theme.white};
`;

export const WalletHeader = styled.div`
  display: flex;

  flex-direction: row;

  align-items: center;

  border-bottom: none;
`;

export const ButtonContainer = styled.div`
  margin-left: auto;

  display: flex;

  flex-direction: row;
  align-items: center;

  gap: 1.5rem;
`;

export const Button = styled.div`
  padding: 0.75rem 1.5rem;

  background-color: ${props => props.theme.primary};

  border-radius: 0.5rem;

  color: ${props => props.theme.white};
  font-size: 0.85rem !important;

  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    background-color: ${props => lighten(0.05, props.theme.primary)};
  }
`;

export const TabContainer = styled.div`
  margin-top: 2rem;

  display: flex;

  flex-direction: row;
  align-items: center;

  border-bottom: 1px solid ${props => props.theme.wallet.gray};

  gap: 1rem;

  color: ${props => props.theme.white};
`;

export const TabItem = styled.div`
  padding: 0.45rem 0.75rem;

  position: relative;
  display: flex;

  align-items: center;
  justify-content: center;

  cursor: pointer;

  span {
    font-size: 1rem;
  }
`;

export const TabIndicator = styled.div<{ selected: boolean }>`
  height: 4px;
  width: 100%;

  bottom: -0.05rem;

  position: absolute;

  opacity: ${props => (props.selected ? 1 : 0)};
  visibility: ${props => (props.selected ? 'visible' : 'hidden')};

  background-image: ${props => props.theme.wallet.tabGradient};

  transition: 0.2s ease;
`;

export const TabsContent = styled.div`
  margin-top: 2.5rem;
`;

export const EmptyTab = styled.div`
  width: 100%;

  span {
    display: table;
    margin: 0 auto;

    opacity: 0.3;

    color: ${props => props.theme.white};
  }
`;
