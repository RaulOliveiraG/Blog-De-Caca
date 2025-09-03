import { Outlet } from 'react-router-dom';
import { Header } from '../components/layout/Header';

export function AppLayout() {
  return (
    <div>
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
    </div>
  );
}