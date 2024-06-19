import {
  Container,
  Card,
  CardBody,
} from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import routes from '../routes.js';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="d-flex justify-content-center align-items-start pt-5">
      <Card className="border-0">
        <CardBody className="row w-100 d-flex justify-content-center align-items-center">
          <Card.Text className="text-center fs-2 text-wrap">
            {t('errors.routeErrors.404')}
          </Card.Text>
          <Card.Text className="text-center fs-3 pt-3 text-wrap text-muted">
            {t('errors.routeErrors.notFound')}
          </Card.Text>
          <Card.Link href={routes.rootPagePath()} className="text-center link-dark pt-3">
            {t('nav.main')}
          </Card.Link>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ErrorPage;
