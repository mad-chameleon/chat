import { Container, Button, Navbar as NavbarComponent } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../hooks/index';
import routes from '../routes';

const Navbar = () => {
  const { isLoggedIn, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <NavbarComponent expand="lg" className="shadow-sm bg-white">
      <Container>
        <NavbarComponent.Brand href={routes.chatPagePath()}> Hexlet Chat </NavbarComponent.Brand>
        { isLoggedIn && (
          <Button variant="primary" onClick={() => logOut()}>
            {t('chat.logoutBtn')}
          </Button>
        ) }
      </Container>
    </NavbarComponent>
  );
};

export default Navbar;
