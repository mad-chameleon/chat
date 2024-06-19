// import { BoxArrowRight } from 'react-bootstrap-icons';
import { Container, Button, Navbar as NavbarComponent } from 'react-bootstrap';

// import { useAuth } from '../hooks/index.jsx';

const Navbar = () => {
  // const { loggedIn, logOut } = useAuth();
  return (
    <NavbarComponent expand="lg" className="shadow-sm bg-white">
      <Container>
        <NavbarComponent.Brand href="/"> Hexlet Chat </NavbarComponent.Brand>
        {/* { loggedIn && ( */}
        {/*  <Button variant="nofill-body" onClick={() => logOut()}> */}
        {/*    <BoxArrowRight size={30} /> */}
        {/*  </Button> */}
        {/* ) } */}
      </Container>
    </NavbarComponent>
  );
};

export default Navbar;
