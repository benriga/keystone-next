import Link from "next/link";
import { Navbar, NavbarBrand, Nav, NavItem, Container } from "reactstrap";
import { useAuth } from "../lib/authetication";

export default function Header() {
  const { isAuthenticated } = useAuth();



  var authMenuitem = isAuthenticated ? 
    {link: "/profile", name:"Profile"} : 
    {link: "/signin", name:"Sign in"};

  return (
    // <Container>
      <Navbar color="inverse" light expand="md">
        <Nav className="mr-auto no-gutters" navbar>
          <NavItem>
            <Link href="/">
              <a className="nav-link">Home</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/todo">
              <a className="nav-link">Todo</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href={authMenuitem.link}>
              <a className="nav-link">{authMenuitem.name}</a>
            </Link>
          </NavItem>
        </Nav>
        <NavbarBrand href="/">
          Keystone To Do demo using Next.js
        </NavbarBrand>
      </Navbar>
    // </Container>
  );
}
