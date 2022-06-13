import React, { useEffect } from "react";
import { Row, Col, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";
import AuthSlider from './authCarousel';

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

const Register = () => {
    document.title="SignUp | Auto24 Team Dashboard";

    const dispatch = useDispatch();

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: '',
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email"),
            username: Yup.string().required("Please Enter Your Username"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            dispatch(registerUser(values));
        }
    });

    const { user, registrationError } = useSelector(state => ({
        user: state.Account.user,
        registrationError: state.Account.registrationError,
    }));

    useEffect(() => {
        dispatch(apiError(""));
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden m-0">
                                    <Row className="justify-content-center g-0">
                                        <AuthSlider />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <div>
                                                    <h5 className="text-primary">Register Account</h5>
                                                    <p className="text-muted">Get your Free Velzon account now.</p>
                                                </div>

                                                <div className="mt-4">
                                                    <Form
                                                        className="needs-validation"
                                                        action="#"
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            validation.handleSubmit();
                                                            return false;
                                                        }}
                                                    >
                                                        {user && user ? (
                                                            <Alert color="success">
                                                                Register User Successfully
                                                            </Alert>
                                                        ) : null}
                                            
                                                        {registrationError && registrationError ? (
                                                            <Alert color="danger"><div>{registrationError}</div></Alert>
                                                            ) : null}
                                                        
                                                        <div className="mb-3">
                                                            <Label htmlFor="useremail" className="form-label">Email <span className="text-danger">*</span></Label>
                                                            <Input
                                                                id="email"
                                                                name="email"
                                                                className="form-control"
                                                                placeholder="Enter email address"
                                                                type="email"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.email || ""}
                                                                invalid={
                                                                    validation.touched.email && validation.errors.email ? true : false
                                                                }
                                                            />
                                                            {validation.touched.email && validation.errors.email ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                                                            ) : null}
                                                        </div>
                                                        <div className="mb-3">
                                                            <Label htmlFor="username" className="form-label">Username <span className="text-danger">*</span></Label>
                                                            <Input
                                                                name="username"
                                                                type="text"
                                                                placeholder="Enter username"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.username || ""}
                                                                invalid={
                                                                    validation.touched.username && validation.errors.username ? true : false
                                                                }
                                                            />
                                                            {validation.touched.username && validation.errors.username ? (
                                                                <FormFeedback type="invalid"><div>{validation.errors.username}</div></FormFeedback>
                                                            ) : null}
                                                        </div>


                                                        <div className="mb-3">
                                                            <div className="position-relative auth-pass-inputgroup">
                                                                <Label htmlFor="userpassword" className="form-label">Password <span className="text-danger">*</span></Label>
                                                                <Input
                                                                    name="password"
                                                                    type="password"
                                                                    placeholder="Enter Password"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.password || ""}
                                                                    invalid={
                                                                        validation.touched.password && validation.errors.password ? true : false
                                                                    }
                                                                />
                                                                {validation.touched.password && validation.errors.password ? (
                                                                    <FormFeedback type="invalid"><div>{validation.errors.password}</div></FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </div>

                                                        <div className="mb-4">
                                                            <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Velzon <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</Link></p>
                                                        </div>

                                                        <div className="mt-4">
                                                            <button className="btn btn-success w-100" type="submit">Sign Up</button>
                                                        </div>
                                                    </Form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Already have an account ? <Link to="/login" className="fw-semibold text-primary text-decoration-underline"> Signin</Link> </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                        </Row>
                    </Container>
                </div>

                <footer className="footer">
                    <Container>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <p className="mb-0">&copy; {new Date().getFullYear()} Velzon. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </footer>
            </div>
        </React.Fragment>
    );
};

export default Register;
