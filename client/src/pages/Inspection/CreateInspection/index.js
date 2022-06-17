import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Alert,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

//redux
import { getCarMakes, toogleActiveStep } from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";

import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";

import VehiclePictures from "./VehiclePictures";
import VehicleForm from './VehicleForm';
import VehicleInspection from './VehicleInspection';
import WorkNeed from './WorkNeed';
import SchemaInspection from './SchemaInspection';
import Comments from './Comments';

// register lottie and define custom element
defineLordIconElement(loadAnimation);

const CreateInspection = () => {
  document.title="Inspection | Auto24 Team Dashboard";

  const dispatch = useDispatch();

  const { error, activeStep, passedSteps } = useSelector((state) => state.Inspection);

  function toggleVerticalTab(tab) {
    dispatch(toogleActiveStep(tab))
  }

  useEffect(() => {
    dispatch(getCarMakes());
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">    
        <Container fluid>
          <BreadCrumb title="Ajouter " pageTitle="Inspection" />
          <Row>
            <Col xl={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">NOUVELLE INSPECTION</h4>
                </CardHeader>
                <CardBody className="form-steps">
                  <div className="vertical-navs-step">
                    <Row className="gy-5">
                      <Col lg={2}>
                        <Nav
                          className="flex-column custom-nav nav-pills"
                        >
                          <NavItem>
                            <NavLink
                            href="#"
                              className={
                                (classnames({
                                  active: activeStep === 1,
                                  done: passedSteps.includes(1)
                                }))
                              }
                              onClick={() => {
                                toggleVerticalTab(1);
                              }}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>
                                Étape 1
                              </span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                            href="#"
                              className={
                                (classnames({
                                  active: activeStep === 2,
                                  done: passedSteps.includes(2)
                                }))
                              }
                              onClick={() => {
                                toggleVerticalTab(2);
                              }}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>
                                Étape 2
                              </span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                            href="#"
                              className={classnames({
                                active: activeStep === 3,
                                done: passedSteps.includes(3)
                              })}
                              onClick={() => {
                                toggleVerticalTab(3);
                              }}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>
                                Étape 3
                              </span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                            href="#"
                              className={classnames({
                                active: activeStep === 4,
                                done: passedSteps.includes(4)
                              })}
                              onClick={() => {
                                toggleVerticalTab(4);
                              }}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>
                                Étape 4
                              </span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                            href="#"
                              className={classnames({
                                active: activeStep === 5,
                                done: passedSteps.includes(5)
                              })}
                              onClick={() => {
                                toggleVerticalTab(5);
                              }}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>
                                Étape 5
                              </span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                            href="#"
                              className={classnames({
                                active: activeStep === 6,
                                done: passedSteps.includes(6)
                              })}
                              onClick={() => {
                                toggleVerticalTab(6);
                              }}
                            >
                              <span className="step-title me-2">
                                <i className="ri-close-circle-fill step-icon me-2"></i>
                                Étape 6
                              </span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      </Col>
                      <Col lg={10}>
                        <div className="px-lg-4">
                          {error && error ? (
                              <Alert color="danger"><div>{error}</div></Alert>
                          ) : null}
                          <TabContent activeTab={activeStep}>
                            <TabPane tabId={1}>
                              <VehiclePictures />
                            </TabPane>

                            <TabPane tabId={2}>
                              <VehicleForm />
                            </TabPane>

                            <TabPane tabId={3}>
                              <VehicleInspection />
                            </TabPane>

                            <TabPane tabId={4}>
                              <WorkNeed />
                            </TabPane>

                            <TabPane tabId={5}>
                              <SchemaInspection />
                            </TabPane>

                            <TabPane tabId={6}>
                              <Comments />
                            </TabPane>
                          </TabContent>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateInspection;
