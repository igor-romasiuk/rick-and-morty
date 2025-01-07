const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#1e1e1e',  // Темний фон для контрасту
      borderColor: '#4dff92',  // Неоновий зелений
      color: 'white',
      borderRadius: '10px',
      padding: '0.6rem',
      minWidth: '200px',
      fontFamily: 'Orbitron, sans-serif',  // Футуристичний шрифт
      transition: 'all 0.3s ease',
      boxShadow: '0 0 10px rgba(0, 255, 146, 0.7)',  // Підсвічування
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#0f0' : state.isFocused ? '#333' : 'transparent',
      color: state.isFocused || state.isSelected ? '#1e1e1e' : 'white',  // Змінюємо колір тексту на чорний при ховері
      padding: '0.6rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: '#4dff92',  // Підсвічування на ховер
        color: '#1e1e1e',  // Колір тексту на ховер — чорний
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#1e1e1e',  // Темний фон
      borderColor: '#4dff92',
      borderRadius: '10px',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#888',  // Світло-сірий для плейсхолдера
    }),
};

export default customStyles;