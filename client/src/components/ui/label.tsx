import React from 'react';

interface LabelProps {
  text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => {
  return <label>{text}</label>;
};

export default Label;
