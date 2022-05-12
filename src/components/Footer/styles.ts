import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.footer`
  padding: 0 5rem 1rem;

  margin-top: auto;

  max-width: 100vw;
  width: 100%;

  display: flex;

  flex-direction: row;
  gap: 5rem;

  border-top: 1px solid ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 5rem 3rem;

    flex-direction: column;
  }
`;

export const DescriptionContainer = styled.div`
  display: flex;

  flex-direction: column;

  span {
    padding: 1.25rem 0;

    font-size: 0.9rem;
    font-weight: 500;
    color: white;
  }

  @media (max-width: 768px) {
    align-items: center;

    span {
      line-height: 1.25rem;
    }
  }
`;

export const LogoContainer = styled.div`
  img {
    position: unset !important;
    display: unset !important;
    min-width: unset !important;
    max-width: unset !important;
    height: 48px !important;
    width: 135px !important;
  }
`;

export const SocialContainer = styled.div`
  display: flex;

  flex-direction: row;

  gap: 0.75rem;
`;

export const SocialIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;

  display: flex;

  align-items: center;
  justify-content: center;

  border: 2px solid transparent;
  border-radius: 50%;

  color: ${props => props.theme.footer.text};
  font-size: 0.85rem;

  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    border-color: ${props => darken(0.08, props.theme.footer.hover)};
    background-color: ${props => darken(0.4, props.theme.footer.hover)};
  }
`;

export const LinksContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  margin-left: auto;

  flex-direction: column;
  flex: 0 0 20%;

  span {
    padding-bottom: 1rem;
    font-weight: 500;
    color: ${props => props.theme.white};
  }

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const LinkItems = styled.div`
  min-width: 10rem;
  width: 40vw;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  justify-items: center;

  a {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    gap: 0.5rem;

    font-size: 0.9rem;
    font-weight: 400;
    color: ${props => props.theme.footer.text};

    text-decoration: none;

    transition: 0.2s ease;

    &:hover {
      color: ${props => props.theme.footer.hover};
    }
  }
`;
