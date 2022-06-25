import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import {
  Container,
  HeaderContainer,
  DesktopContainer,
  Item,
  Logo,
  LogoutIcon,
  LogoutIconContainer,
  LogoutText,
  MenuIcon,
  MobileBackground,
  MobileContainer,
  MobileContent,
  MobileItem,
} from './styles';

import { INavbarItem, navbarItems } from '../../configs/navbar';
import ConnectWallet from './ConnectWallet';
import { BsWalletFill } from 'react-icons/bs';
import { getNetwork } from '../../utils';

const Navbar: React.FC = () => {
  const location = useLocation();
  const network = getNetwork();

  const [isOpen, setIsOpen] = useState(false);

  const [walletAddress] = useState(
    sessionStorage.getItem('walletAddress') || '',
  );

  useEffect(() => {
    if (walletAddress !== '') {
      sessionStorage.setItem('walletAddress', walletAddress);
    }
  }, [walletAddress]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';
  }, [isOpen]);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const NavbarItem: React.FC<INavbarItem> = ({ name, Icon, pathTo }) => {
    return (
      <Link to={pathTo}>
        <Item selected={location.pathname.includes(name.toLowerCase())}>
          <Icon />
          <span>{name}</span>
        </Item>
      </Link>
    );
  };

  const MobileNavbarItem: React.FC<INavbarItem> = ({ name, Icon, pathTo }) => {
    return (
      <Link to={pathTo}>
        <MobileItem
          onClick={handleMenu}
          selected={location.pathname.includes(name.toLowerCase())}
        >
          <span>{name}</span>
          <Icon />
        </MobileItem>
      </Link>
    );
  };

  const getNavbarItems = () => {
    const address = sessionStorage.getItem('walletAddress');
    let navItems = navbarItems;

    if (address) {
      navItems = [
        ...navItems,
        {
          name: 'Wallet',
          pathTo: '/wallet',
          Icon: BsWalletFill,
        },
      ];
    }

    return navItems;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('walletAddress');
    sessionStorage.removeItem('privateKey');
    window.location.reload();
  };

  return (
    <>
      <Container>
        <HeaderContainer>
          <Link to="/wallet">
            <Logo onClick={handleClose}>
              <img src={logo} alt="Logo" width="224" height="28" />
            </Logo>
          </Link>
          <span>Running on Kleverchain {network}</span>
        </HeaderContainer>

        {walletAddress && (
          <DesktopContainer>
            {getNavbarItems().map((item, index) => (
              <NavbarItem key={String(index)} {...item} />
            ))}
            <ConnectWallet walletAddress={walletAddress} />
            <LogoutIconContainer>
              <LogoutIcon onClick={handleLogout} />
            </LogoutIconContainer>
          </DesktopContainer>
        )}

        <MobileContainer>
          {walletAddress && <MenuIcon onClick={handleMenu} />}
        </MobileContainer>
      </Container>

      <MobileBackground onClick={handleClose} opened={isOpen} />

      <MobileContent opened={isOpen}>
        {getNavbarItems().map((item, index) => (
          <MobileNavbarItem key={String(index)} {...item} />
        ))}
        <ConnectWallet walletAddress={walletAddress} />
        <LogoutIconContainer>
          {window.matchMedia('(max-device-width: 768px)').matches ? (
            <>
              <LogoutText>Logout</LogoutText>
              <LogoutIcon onClick={handleLogout} />
            </>
          ) : (
            <LogoutIcon onClick={handleLogout} />
          )}
        </LogoutIconContainer>
      </MobileContent>
    </>
  );
};

export default Navbar;
