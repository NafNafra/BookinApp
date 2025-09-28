import { Outlet } from "react-router-dom";
import './Layout.scss'
import Header from '../Header';

export default function Layout() {
  return (
      <div className="layout">
        <Header />
        <main >
          <Outlet />
        </main>
      </div>
  );
}
