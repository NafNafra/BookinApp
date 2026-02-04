import { Outlet } from "react-router-dom";
import './Layout.scss'
import Header from '../Header';
import Footer from '../Footer';
export default function Layout() {
  return (
      <div className="layout">
        <Header />
        <main >
          <Outlet />
        </main>
        <Footer/>
      </div>
  );
}
