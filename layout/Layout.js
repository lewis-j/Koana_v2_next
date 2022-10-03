import { NavBarNew } from "../layout/NavMenu/NavMenuNew";

const Layout = ({ children }) => {
  return (
    <>
      <NavBarNew />
      <main>{children}</main>
    </>
  );
};
export default Layout;
