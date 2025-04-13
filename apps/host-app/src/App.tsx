import React, { Suspense } from 'react';

// 동적 로딩
const RemoteApp1 = React.lazy(() => import('rApp1/App'));
const RemoteApp2 = React.lazy(() => import('rApp2/App'));

export default function App() {
  return (
    <div className="App">
      gdgd
      <header className="App-header">
        <Suspense fallback={<div>Loading RemoteApp1...</div>}>
          <RemoteApp1 />
        </Suspense>
        <Suspense fallback={<div>Loading RemoteApp2...</div>}>
          <RemoteApp2 />
        </Suspense>
      </header>
    </div>
  );
}