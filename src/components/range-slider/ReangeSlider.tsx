import React from 'react';
import './range-slider.css'; // Arquivo CSS

interface IRangeSlider {
  size: number;
  handleChangeSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeSlider = ({ size, handleChangeSize }: IRangeSlider) => {
  return (
    <div className='flex items-center px-4 py-3'>
      <input
        type='range'
        min='1'
        max='50'
        value={size}
        onChange={handleChangeSize}
        className='range-slider'
        style={{ '--progress': `${(size - 1) * 2}%` } as React.CSSProperties}
      />
    </div>
  );
};

export default RangeSlider;
