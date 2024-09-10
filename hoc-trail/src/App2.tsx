import { useState } from 'react';
function App2() {
  const [state, setState] = useState<number>(0);
  const handleClick = (): void => {
    setState((prev: number) => prev + 1);
  };

  return <button onClick={handleClick}>{state} CLicked Button - 2 </button>;
}

export default App2;
