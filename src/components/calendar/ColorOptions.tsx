interface Props {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const ColorOptions = ({ selectedColor, setSelectedColor }: Props) => {
  const colorOptions = ['#EB5757', '#F2994A', '#F2C94C', '#27AE60', '#2F80ED', '#56CCF2', '#9B51E0', '#F955EB'];

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {colorOptions.map((color) => (
        <div
          key={color}
          onClick={() => setSelectedColor(color)}
          className={`h-6 w-6 rounded-full border transition duration-200 ${selectedColor === color ? 'ring-2 ring-black ring-offset-2' : 'border-gray-300'} hover:scale-110 hover:ring-2 hover:ring-gray-400 hover:ring-offset-1`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorOptions;
