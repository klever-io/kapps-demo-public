import React from 'react';

import { Container } from './styles';

export interface styleTypes {
  styleType?: 'primary' | 'secondary' | 'outlined' | 'transparent';
}
export interface IButton extends styleTypes {
  onClick?(): void;
  type?: 'submit' | 'button';
  disabled?: boolean;
}

const Button: React.FC<IButton> = ({
  onClick,
  type,
  children,
  disabled,
  styleType = 'primary',
}) => {
  return (
    <Container
      mainPage={true}
      onClick={onClick}
      type={type}
      disabled={disabled}
      styleType={styleType}
    >
      {children}
    </Container>
  );
};

export default Button;
