import {
  Card, Container, Row, Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import SignUpForm from '../components/forms/SingUpForm';
import regAvatar from '../assets/registration_avatar.jpg';

const SignUpPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xxl={6} md={8} xs={12}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img className="rounded-circle" src={regAvatar} alt={t('form.signUp')} />
              </div>
              <SignUpForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
