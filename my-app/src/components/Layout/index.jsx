import { Outlet } from "react-router-dom";
import './Layout.scss'
import SidePanel from '../SidePanel';

export default function Layout() {
  return (
      <div className="layout">
        <SidePanel />
        <div>
          <Outlet />
        </div>
      </div>
  );
}
