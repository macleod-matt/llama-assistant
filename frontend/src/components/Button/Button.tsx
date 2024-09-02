import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  children: string | React.ReactNode;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};
