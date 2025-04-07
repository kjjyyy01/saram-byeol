import React from 'react';
import { NavigateAction } from 'react-big-calendar';

interface Props {
  label: string;
  onNavigate: (action: NavigateAction) => void;
}

const CustomToolbar = ({ label, onNavigate }: Props) => {
  return (
    <div>
      <button onClick={() => onNavigate('PREV')}>⬅️</button>
      <span>{label}</span>
      <button onClick={() => onNavigate('NEXT')}>➡️</button>
      <button onClick={() => onNavigate('TODAY')}>Today</button>
    </div>
  );
};

export default CustomToolbar;
