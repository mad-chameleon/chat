import {
  Card, Container, Row, Col,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import LoginForm from '../components/forms/LoginForm';
import loginAvatar from '../assets/login_avatar.jpg';
import routes from '../routes';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xxl={6} md={8} xs={12}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md={6} xs={12} className="d-flex align-items-center justify-content-center">
                <img src={loginAvatar} alt="Войти" className="rounded-circle" />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                {t('footer.noAccount')}
                <Card.Link href={routes.signUpApiPath()}>{t('form.signUp')}</Card.Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
