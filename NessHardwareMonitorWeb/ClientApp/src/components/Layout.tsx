import React from "react";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LayoutProps {}

const Layout = ({ children }: React.PropsWithChildren<LayoutProps>) => (
  <div>
    <NavMenu />
    <Container tag="main">{children}</Container>
  </div>
);

export default Layout;
