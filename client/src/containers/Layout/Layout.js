import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Container } from '@material-ui/core';
import { history } from '../../_helpers/history.js';

export const Layout = ({ children }) => {
  return (
    <>
      <Header history={history} />
      <Container className='body-container'>{children}</Container>
      <Footer history={history} />
    </>
  );
};
