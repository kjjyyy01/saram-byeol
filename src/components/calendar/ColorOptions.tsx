import { Palette } from '@phosphor-icons/react';

interface Props {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const ColorOptions = ({ selectedColor, setSelectedColor }: Props) => {
  const colorOptions = ['#EB5757', '#F2994A', '#F2C94C', '#27AE60', '#2F80ED', '#56CCF2', '#9B51E0', '#F955EB'];

  return (
    <div className='flex items-center justify-start gap-8'>
      <label className='relative flex w-14 flex-shrink-0 flex-grow-0 flex-col items-center justify-center gap-1'>
        <Palette size={24} className='h-6 w-6 flex-shrink-0 flex-grow-0' /> <p className='text-center text-sm'>색상</p>
      </label>
      <div className='flex w-full flex-wrap gap-4'>
        {colorOptions.map((color) => (
          <div
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`h-6 w-6 rounded-full transition duration-200 ${selectedColor === color ? 'ring-2 ring-black ring-offset-2' : 'border-gray-300'} hover:scale-110 hover:ring-2 hover:ring-gray-400 hover:ring-offset-1`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorOptions;
