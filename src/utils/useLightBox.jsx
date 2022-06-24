import React from 'react';

export default function useLightBoxSwitch() {
  const [ltBox, setLtBox] = React.useState({
    isOpen: false,
    node: null,
    direction: 0,
  });

  return {
    ltBox,
    setLtBox,
  };
}
