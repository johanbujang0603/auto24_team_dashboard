import React, { useState } from "react";
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

import classnames from "classnames";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import VehiclePictures from "./VehiclePictures";

// register lottie and define custom element
defineLordIconElement(loadAnimation);

const FormWizard = () => {
  document.title="Wizard | Velzon - React Admin & Dashboard Template";

  const [activeVerticalTab, setactiveVerticalTab] = useState(7);
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
                  <form className="vertical-navs-step">
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
                                  active: activeVerticalTab === 7,
                                  done: (activeVerticalTab <= 11 && activeVerticalTab > 7)
                                }))
                              }
                              onClick={() => {
                                toggleVerticalTab(7);
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
                                  active: activeVerticalTab === 8,
                                  done: (activeVerticalTab <= 11 && activeVerticalTab >= 8)
                                }))
                              }
                              onClick={() => {
                                toggleVerticalTab(8);
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
                                active: activeVerticalTab === 9,
                                done: (activeVerticalTab <= 11 && activeVerticalTab >= 9)
                              })}
                              onClick={() => {
                                toggleVerticalTab(9);
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
                                active: activeVerticalTab === 10,
                                done: (activeVerticalTab <= 11 && activeVerticalTab >= 10)
                              })}
                              onClick={() => {
                                toggleVerticalTab(10);
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
                                active: activeVerticalTab === 10,
                                done: (activeVerticalTab <= 11 && activeVerticalTab >= 10)
                              })}
                              onClick={() => {
                                toggleVerticalTab(10);
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
                                active: activeVerticalTab === 10,
                                done: (activeVerticalTab <= 11 && activeVerticalTab >= 10)
                              })}
                              onClick={() => {
                                toggleVerticalTab(10);
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
                            <TabPane tabId={7}>
                              <VehiclePictures />
                            </TabPane>

                            <TabPane tabId={8}>
                              <div>
                                <h5>Shipping Address</h5>
                                <p className="text-muted">
                                  Fill all information below
                                </p>
                              </div>

                              <div>
                                <Row className="g-3">
                                  <Col xs={12}>
                                    <Label
                                      htmlFor="address"
                                      className="form-label"
                                    >
                                      Address
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="address"
                                      placeholder="1234 Main St"
                                    />
                                  </Col>

                                  <Col xs={12}>
                                    <Label
                                      htmlFor="address2"
                                      className="form-label"
                                    >
                                      Address 2{" "}
                                      <span className="text-muted">
                                        (Optional)
                                      </span>
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="address2"
                                      placeholder="Apartment or suite"
                                    />
                                  </Col>

                                  <Col md={5}>
                                    <Label
                                      htmlFor="country"
                                      className="form-label"
                                    >
                                      Country
                                    </Label>
                                    <select
                                      className="form-select"
                                      id="country"
                                    >
                                      <option defaultValue="">Choose...</option>
                                      <option>United States</option>
                                    </select>
                                  </Col>

                                  <Col md={4}>
                                    <Label
                                      htmlFor="state"
                                      className="form-label"
                                    >
                                      State
                                    </Label>
                                    <select className="form-select" id="state">
                                      <option defaultValue="">Choose...</option>
                                      <option>California</option>
                                    </select>
                                  </Col>

                                  <Col md={3}>
                                    <Label htmlFor="zip" className="form-label">
                                      Zip
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="zip"
                                      placeholder=""
                                    />
                                  </Col>
                                </Row>

                                <hr className="my-4 text-muted" />

                                <div className="form-check mb-2">
                                  <Input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="same-address"
                                  />
                                  <Label
                                    className="form-check-label"
                                    htmlFor="same-address"
                                  >
                                    Shipping address is the same as my billing
                                    address
                                  </Label>
                                </div>

                                <div className="form-check">
                                  <Input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="save-info"
                                  />
                                  <Label
                                    className="form-check-label"
                                    htmlFor="save-info"
                                  >
                                    Save this information for next time
                                  </Label>
                                </div>
                              </div>
                              <div className="d-flex align-items-start gap-3 mt-4">
                                <button
                                  type="button"
                                  className="btn btn-light btn-label previestab"
                                  onClick={() => {
                                    toggleVerticalTab(activeVerticalTab - 1);
                                  }}
                                >
                                  <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                  Back to Billing Info
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success btn-label right ms-auto nexttab"
                                  onClick={() => {
                                    toggleVerticalTab(activeVerticalTab + 1);
                                  }}
                                >
                                  <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                  Go to Payment
                                </button>
                              </div>
                            </TabPane>

                            <TabPane tabId={9}>
                              <div>
                                <h5>Payment</h5>
                                <p className="text-muted">
                                  Fill all information below
                                </p>
                              </div>

                              <div>
                                <div className="my-3">
                                  <div className="form-check form-check-inline">
                                    <Input
                                      id="credit"
                                      name="paymentMethod"
                                      type="radio"
                                      className="form-check-input"
                                      defaultChecked
                                      required
                                    />
                                    <Label
                                      className="form-check-label"
                                      htmlFor="credit"
                                    >
                                      Credit card
                                    </Label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <Input
                                      id="debit"
                                      name="paymentMethod"
                                      type="radio"
                                      className="form-check-input"
                                      required
                                    />
                                    <Label
                                      className="form-check-label"
                                      htmlFor="debit"
                                    >
                                      Debit card
                                    </Label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                    <Input
                                      id="paypal"
                                      name="paymentMethod"
                                      type="radio"
                                      className="form-check-input"
                                      required
                                    />
                                    <Label
                                      className="form-check-label"
                                      htmlFor="paypal"
                                    >
                                      PayPal
                                    </Label>
                                  </div>
                                </div>

                                <Row className="gy-3">
                                  <Col md={12}>
                                    <Label
                                      htmlFor="cc-name"
                                      className="form-label"
                                    >
                                      Name on card
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="cc-name"
                                      placeholder=""
                                      required
                                    />
                                    <small className="text-muted">
                                      Full name as displayed on card
                                    </small>
                                    <div className="invalid-feedback">
                                      Name on card is required
                                    </div>
                                  </Col>

                                  <Col md={6}>
                                    <Label
                                      htmlFor="cc-number"
                                      className="form-label"
                                    >
                                      Credit card number
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="cc-number"
                                      placeholder=""
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Credit card number is required
                                    </div>
                                  </Col>

                                  <Col md={3}>
                                    <Label
                                      htmlFor="cc-expiration"
                                      className="form-label"
                                    >
                                      Expiration
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="cc-expiration"
                                      placeholder=""
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Expiration date required
                                    </div>
                                  </Col>

                                  <Col md={3}>
                                    <Label
                                      htmlFor="cc-cvv"
                                      className="form-label"
                                    >
                                      CVV
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="cc-cvv"
                                      placeholder=""
                                      required
                                    />
                                    <div className="invalid-feedback">
                                      Security code required
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="d-flex align-items-start gap-3 mt-4">
                                <button
                                  type="button"
                                  className="btn btn-light btn-label previestab"
                                  onClick={() => {
                                    toggleVerticalTab(activeVerticalTab - 1);
                                  }}
                                >
                                  <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                  Back to Shipping Info
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success btn-label right ms-auto nexttab"
                                  onClick={() => {
                                    toggleVerticalTab(activeVerticalTab + 1);
                                  }}
                                >
                                  <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>{" "}
                                  Order Complete
                                </button>
                              </div>
                            </TabPane>

                            <TabPane tabId={10}>
                              <div className="text-center pt-4 pb-2">
                                <div className="mb-4">
                                  <lord-icon
                                    src="https://cdn.lordicon.com/lupuorrc.json"
                                    trigger="loop"
                                    colors="primary:#6ada7d,secondary:#5ea3cb"
                                    style={{ width: "120px", height: "120px" }}
                                  ></lord-icon>
                                </div>
                                <h5>Your Order is Completed !</h5>
                                <p className="text-muted">
                                  You Will receive an order confirmation email
                                  with details of your order.
                                </p>
                              </div>
                            </TabPane>
                          </TabContent>
                        </div>
                      </Col>
                    </Row>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FormWizard;
