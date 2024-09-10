import { useState } from 'react';
function App1() {
  const [state, setState] = useState<number>(0);
  const handleClick = (): void => {
    setState((prev: number) => prev + 1);
  };

  return <button onClick={handleClick}>{state} CLicked Button - 1 </button>;
}

export default App1;
