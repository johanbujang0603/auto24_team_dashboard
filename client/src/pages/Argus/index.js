import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';

const Argus = () => {
  document.title="Argus | Velzon - React Admin & Dashboard Template";

    return (
        <div className="page-content">
            <Container fluid>                
                <BreadCrumb title="Argus Cotation" pageTitle="Argus" />
                <Row>
                </Row>

            </Container>

        </div>
    )
}

export default Argus