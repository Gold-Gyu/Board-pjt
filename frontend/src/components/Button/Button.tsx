import React from 'react';
import './Button.css';

interface ButtonProps {
  buttonName: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonName, onClick }) => {
  return (
    <div className="button-box" onClick={onClick}>
      <div>{buttonName}</div>
    </div>
  );
};

export default Button;
