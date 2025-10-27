declare module 'remoteHome/Home' {
  import { ComponentType } from 'react';
  const Home: ComponentType;
  export default Home;
}

declare module 'remoteCommon/Button' {
  import { ComponentType, ButtonHTMLAttributes } from 'react';
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
  }
  const Button: ComponentType<ButtonProps>;
  export default Button;
}

declare module 'remoteCommon/Card' {
  import { ComponentType, ReactNode } from 'react';
  export interface CardProps {
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
  }
  const Card: ComponentType<CardProps>;
  export default Card;
}

