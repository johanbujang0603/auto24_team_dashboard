import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

//redux
import { getCarMakes } from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";

import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import VehiclePictures from "./VehiclePictures";
import VehicleForm from './VehicleForm';

// register lottie and define custom element
defineLordIconElement(loadAnimation);

const CreateInspection = () => {
  document.title="Inspection | Auto24 Team Dashboard";

  const dispatch = useDispatch();

  const [activeVerticalTab, setactiveVerticalTab] = useState(1);
  const [passedverticalSteps, setPassedverticalSteps] = useState([1]);

  function toggleVerticalTab(tab) {
    if (activeVerticalTab !== tab) {
      var modifiedSteps = [...passedverticalSteps, tab];

      if (tab >= 7 && tab <= 11) {
        setactiveVerticalTab(tab);
        setPassedverticalSteps(modifiedSteps);
      }
    }
  }

  useEffect(() => {
    dispatch(getCarMakes());
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="page-content">    
        <Container fluid>
          <BreadCrumb title="Create" pageTitle="Inspection" />
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
                                  active: activeVerticalTab === 1,
                                  done: (activeVerticalTab <= 11 && activeVerticalTab > 7)
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
                                  active: activeVerticalTab === 2,
                                  done: (activeVerticalTab <= 11 && activeVerticalTab >= 2)
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
                                active: activeVerticalTab === 3,
                                done: (activeVerticalTab <= 11 && activeVerticalTab >= 3)
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
                                active: activeVerticalTab === 4,
                                done: (activeVerticalTab <= 11 && activeVerticalTab >= 4)
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
                                active: activeVerticalTab === 5,
                                done: (activeVerticalTab <= 11 && activeVerticalTab >= 5)
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
                                active: activeVerticalTab === 6,
                                done: (activeVerticalTab <= 11 && activeVerticalTab >= 6)
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
                          <TabContent activeTab={activeVerticalTab}>
                            <TabPane tabId={1}>
                              <VehiclePictures />
                            </TabPane>

                            <TabPane tabId={2}>
                              <VehicleForm />
                            </TabPane>

                            <TabPane tabId={3}>
                            </TabPane>

                            <TabPane tabId={4}>
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
