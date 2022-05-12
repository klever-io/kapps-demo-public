import React from 'react';

import {
  Container,
  DescriptionContainer,
  LinkItems,
  LinksContainer,
  LogoContainer,
  SocialContainer,
  SocialIcon,
} from './styles';

import { contents, IContent, ISocial, socials } from '../../configs/footer';

import { ChevronRight } from '../../assets/icons';

import logo from '../../assets/logo.svg';

const Footer: React.FC = () => {
  const SocialItem: React.FC<ISocial> = ({ Icon, link }) => (
    <a target="_blank" href={link} rel="noreferrer">
      <SocialIcon>
        <img src={Icon} />
      </SocialIcon>
    </a>
  );

  const getReducedLinks = () => {
    const reduced = contents.reduce((acc: IContent[][], _, index, arr) => {
      if (index % 2 === 0) {
        acc.push(arr.slice(index, index + 2));
      }
      return acc;
    }, []);

    return reduced;
  };

  return (
    <Container>
      <DescriptionContainer>
        <LogoContainer>
          <img src={logo} alt="Logo" width="224" height="28" />
        </LogoContainer>
        <SocialContainer>
          {socials.map((social, index) => (
            <SocialItem key={String(index)} {...social} />
          ))}
        </SocialContainer>
      </DescriptionContainer>

      {getReducedLinks().map((links, containerIndex) => (
        <LinksContainer key={String(containerIndex)}>
          {links.map((link, linkIndex) => (
            <React.Fragment key={String(linkIndex)}>
              <span>{link.title}</span>
              <LinkItems key={String(linkIndex)}>
                {link.infoLinks.map((item, index) => (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    key={String(index)}
                    href={`${item.href}`}
                  >
                    <img src={ChevronRight} alt={item.name} />
                    {item.name}
                  </a>
                ))}
              </LinkItems>
            </React.Fragment>
          ))}
        </LinksContainer>
      ))}
    </Container>
  );
};

export default Footer;
