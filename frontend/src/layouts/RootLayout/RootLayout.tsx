import './RootLayout.scss';

import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="wrapper">
      <header>STFUANDCLICK.COM</header>
      <main>
        <Outlet />
      </main>
      <footer>If you don't like this page, it's my fault.</footer>
    </div>
  );
}

export default RootLayout;
