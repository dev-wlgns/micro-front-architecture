import React, { useState } from 'react';


export default function App() {
  // 상태 변수 정의 (count는 숫자 타입으로 선언)
  const [count, setCount] = useState<number>(0);

  // 상태 변경 함수
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="App">
      <h1>Current Count: {count}</h1>

      {/* 버튼 클릭 시 상태 변경 */}
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </div>
  );
}
