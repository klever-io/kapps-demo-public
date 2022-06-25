import styled, { css } from 'styled-components';

import { FiMenu } from 'react-icons/fi';
import { IoIosLogOut } from 'react-icons/io';

import { transparentize } from 'polished';

interface IMobileMenu {
  opened: boolean;
}

export const Container = styled.div`
  padding: 0.25rem 3rem;

  max-width: 100vw;

  display: flex;
  position: relative;

  flex-direction: row;
  align-items: center;

  gap: 1.5rem;

  @media (max-width: 1025px) {
    padding: 0.25rem 0rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;

    overflow: hidden;

    justify-content: space-between;
  }
  a,
  a:visited {
    color: ${props => props.theme.navbar.text};
    text-decoration: none;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;

  span {
    color: ${props => props.theme.navbar.text};
    font-size: 0.8rem;
  }
`;

export const MobileContent = styled.div<IMobileMenu>`
  padding: 1.5rem;

  height: 100vh;

  position: fixed;
  top: 4rem;
  right: ${props => (props.opened ? 0 : '-100%')};

  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;

  z-index: 500 !important;

  background-color: ${props => props.theme.navbar.background};

  transition: 0.5s ease;

  a,
  a:visited {
    color: ${props => props.theme.navbar.text};
    text-decoration: none;
  }
`;

export const Logo = styled.div`
  margin-right: 0.5rem;

  cursor: pointer;
`;

export const Item = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;

  height: 2rem;
  font-size: 1rem;

  cursor: pointer;

  transition: 0.2s ease;

  filter: brightness(${props => (props.selected ? 10 : 1)});

  &:hover {
    ${props =>
      !props.selected &&
      css`
        filter: brightness(1.5);
      `};
  }

  span {
    color: ${props => props.theme.navbar.text};
    font-weight: 600;
  }
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const MobileItem = styled(Item)`
  justify-content: flex-end;

  font-size: 1.25rem;
`;

export const DesktopContainer = styled.div`
  display: flex;

  width: 100%;

  flex-direction: row;
  align-items: center;

  gap: 3rem;

  @media (max-width: 1180px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    column-gap: 2rem;
    row-gap: 0.5rem;
    justify-items: center;
    align-items: center;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileContainer = styled.div`
  margin-left: auto;

  display: flex;
  position: relative;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileBackground = styled.div<IMobileMenu>`
  width: 100vw;
  height: 100vh;

  top: 4rem;
  left: 0;

  position: absolute;

  z-index: 500 !important;

  opacity: ${props => (props.opened ? 1 : 0)};
  visibility: ${props => (props.opened ? 'visible' : 'hidden')};

  background-color: ${props => transparentize(0.7, props.theme.background)};

  transition: 0.5s ease;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MenuIcon = styled(FiMenu).attrs(props => ({
  color: props.theme.navbar.text,
  size: 24,
}))``;

export const LogoutIcon = styled(IoIosLogOut).attrs(props => ({
  color: props.theme.navbar.text,
  size: 24,
}))`
  min-width: 16px;

  cursor: pointer;
  position: relative;
`;

export const LogoutText = styled.span`
  color: ${props => props.theme.navbar.text};
  font-weight: 600;
  font-size: 1.25rem;
`;

export const LogoutIconContainer = styled.div`
  position: relative;
  font-size: 0.75rem;
  &:hover {
    svg {
      filter: brightness(1.5);
    }
  }

  @media screen and (min-width: 768px) {
    &:hover {
      &::before {
        content: '';
        position: absolute;
        top: 2rem;
        left: 0.25rem;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid ${props => props.theme.card.background};
        transform: translate(-25%, 100%);
      }

      &::after {
        content: 'Logout';
        position: absolute;
        top: 1rem;
        left: 0;
        background-color: ${props => props.theme.card.background};
        color: ${props => props.theme.white};
        padding: 0.5rem;
        border-radius: 5px;
        z-index: 500;
        transform: translate(-25%, 100%);
      }
    }
  }

  @media screen and (max-width: 768px) {
    margin-top: auto;

    display: flex;
    align-items: center;
    gap: 0.5rem;

    transform: translateY(-100%);
    top: -2rem;
  }
`;
