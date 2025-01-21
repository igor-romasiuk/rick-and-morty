import { CSSObjectWithLabel } from 'react-select';

const customStyles = {
  control: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...provided,
    backgroundColor: '#1e1e1e',
    borderColor: '#4dff92',
    color: 'white',
    borderRadius: '10px',
    padding: '0.6rem',
    minWidth: '200px',
    fontFamily: 'Orbitron, sans-serif',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 10px rgba(0, 255, 146, 0.7)',
  }),
  option: (provided: CSSObjectWithLabel, state: { isSelected: boolean; isFocused: boolean }): CSSObjectWithLabel => ({
    ...provided,
    backgroundColor: state.isSelected ? '#0f0' : state.isFocused ? '#333' : 'transparent',
    color: state.isFocused || state.isSelected ? '#1e1e1e' : 'white',
    padding: '0.6rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#4dff92',
      color: '#1e1e1e',
    },
  }),
  menu: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...provided,
    backgroundColor: '#1e1e1e',
    borderColor: '#4dff92',
    borderRadius: '10px',
  }),
  singleValue: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...provided,
    color: 'white',
  }),
  placeholder: (provided: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...provided,
    color: '#888',
  }),
};

export default customStyles;