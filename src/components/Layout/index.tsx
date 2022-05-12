import React from 'react';

import Navbar from '../Header';
import Footer from '../Footer';
import { Container, Main } from './styles';

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <title>Kapps Demo</title>

      <Navbar />

      <Main>{children}</Main>

      <Footer />
    </Container>
  );
};

export default Layout;
