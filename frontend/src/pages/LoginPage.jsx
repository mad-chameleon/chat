import {
  Card, Container, Row, Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import LoginForm from '../components/forms/LoginForm';
import routes from '../routes';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xxl={5} md={8} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body className="row p-3 p-sm-5">
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                {t('footer.noAccount')}
                <Card.Link href={routes.signupPagePath()}>{t('form.signUp')}</Card.Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
