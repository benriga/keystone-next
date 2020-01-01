import { Navbar, NavbarBrand, Nav, NavItem, Container } from "reactstrap";

export default function Header() {

  return (
    // <Container>
      <Navbar color="light" light expand="md" sticky="bottom">
        <Nav className="mr-auto no-gutters" navbar>
          <NavItem>
          <p>//TODO: put an important message in the footer :)</p>
          </NavItem>
        </Nav>
      </Navbar>
    // </Container>
  );
}
