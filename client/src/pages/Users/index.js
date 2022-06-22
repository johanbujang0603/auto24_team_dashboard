import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  Label,
  Input,
  FormGroup,
  FormFeedback
} from "reactstrap";
import * as moment from "moment";
import { Link } from "react-router-dom";
import Select from "react-select";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteModal from "../../Components/Common/DeleteModal";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import actions
import {
  getAllUsers as onGetUsers,
  addNewUser as onAddNewUser,
} from "../../store/users/action";

const EcommerceOrders = () => {
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const dispatch = useDispatch();
  const { userList, isLoading } = useSelector((state) => state.Users);

  const [user, setUser] = useState([]);

  const [isEdit, setIsEdit] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (user) => {
    setUser(user);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (user.id) {
      // dispatch(onDeleteOrder(order));
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    dispatch(onGetUsers());
  }, [dispatch]);

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: (user && user.email) || '',
      username: (user && user.username) || '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        // const updateOrder = {
        //   id: order ? order.id : 0,
        //   orderId: values.orderId,
        //   customer: values.customer,
        //   productname: values.productname,
        //   orderDate: date,
        //   // ordertime: values.ordertime,
        //   amount: values.amount,
        //   payment: values.payment,
        //   status: values.status
        // };
        // update order
        // dispatch(onUpdateOrder(updateOrder));
        // setDate(dateFormat());
        validation.resetForm();
      } else {
        const newUser = {
          username: values["username"],
          email: values["email"],
          password: values["password"],
        };
        // save new order
        dispatch(onAddNewUser(newUser));
        validation.resetForm();
      }
      toggle();
    },
  });

  // useEffect(() => {
  //   if (orders && !orders.length) {
  //     // dispatch(onGetOrders());
  //   }
  // }, [dispatch, orders]);

  // useEffect(() => {
  //   if (!isEmpty(orders)) {
  //     setOrder(orders);
  //     setIsEdit(false);
  //   }
  // }, [orders]);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setUser(null);
    } else {
      setModal(true);
      // setDate(dateFormat());
    }
  }, [modal]);

  const handleOrderClicks = () => {
    setUser("");
    setIsEdit(false);
    toggle();
  };

  const handleOrderClick = useCallback((arg) => {
    const order = arg;
    setUser({
      id: order.id,
      orderId: order.orderId,
      customer: order.customer,
      productname: order.productname,
      orderDate: order.orderDate,
      ordertime: order.ordertime,
      amount: order.amount,
      payment: order.payment,
      status: order.status
    });

    setIsEdit(true);
    toggle();
  }, [toggle]);


  // Customber Column
  const columns = useMemo(
    () => [
      {
        Header: "#",
        Cell: () => {
          return <input type="checkbox" />;
        },
      },
      {
        Header: "Id",
        accessor: "_id",
        filterable: false,
      },
      {
        Header: "User Name",
        accessor: "username",
        filterable: false,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Link
                  to="apps-ecommerce-order-details"
                  className="text-primary d-inline-block"
                >
                  <i className="ri-eye-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item edit">
                <Link
                  to="#"
                  className="text-primary d-inline-block edit-item-btn"
                  onClick={() => {
                    const userData = cellProps.row.original;
                    handleOrderClick(userData);
                  }}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to="#"
                  className="text-danger d-inline-block remove-item-btn"
                  onClick={() => {
                    const userData = cellProps.row.original;
                    onClickDelete(userData);
                  }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    [handleOrderClick]
  );

  document.title = "Utilisateurs | Auto24 Team Dashboard";
  return (
    <div className="page-content">
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <Container fluid>

        <BreadCrumb pageTitle="Utilisateurs" />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="card-header border-0">
                <div className="d-flex align-items-center">
                  <h5 className="card-title mb-0 flex-grow-1">Utilisateurs</h5>
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="btn btn-success add-btn"
                      id="create-btn"
                      onClick={() => { setIsEdit(false); toggle(); }}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Ajouter
                    </button>{" "}
                    <button className="btn btn-soft-danger"
                    // onClick="deleteMultiple()"
                    ><i
                      className="ri-delete-bin-2-line"></i></button>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="border border-dashed border-end-0 border-start-0">
                <form>
                  <Row className="g-3">
                    <Col sm={6} className="col-xxl-5">
                      <div className="search-box">
                        <input
                          type="text"
                          className="form-control search"
                          placeholder="Search for user name and email etc..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                  </Row>
                </form>
              </CardBody>
              <CardBody className="pt-0">
                <div>
                  <Nav
                    className="nav-tabs nav-tabs-custom nav-success mb-3"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "1" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("1", "all");
                        }}
                        href="#"
                      >
                        <i className="ri-store-2-fill me-1 align-bottom"></i>{" "}
                        All Users
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "3" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("3", "Pickups");
                        }}
                        href="#"
                      >
                        <i className="ri-truck-line me-1 align-bottom"></i>{" "}
                        Pickups{" "}
                        <span className="badge bg-danger align-middle ms-1">
                          2
                        </span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TableContainer
                    columns={columns}
                    data={userList}
                    isGlobalFilter={false}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light text-muted text-uppercase"
                    handleOrderClick={handleOrderClicks}
                  />
                </div>
                <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                  <ModalHeader className="bg-light p-3" toggle={toggle}>
                    {!!isEdit ? "Edit User" : "Add User"}
                  </ModalHeader>
                  <Form onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}>
                    <ModalBody>
                      <input type="hidden" id="id-field" />
                      {/* <div className="mb-3">
                        <Label htmlFor="date-field" className="form-label">
                          Order Time
                        </Label>

                        <Input
                          name="ordertime"
                          type="time"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.ordertime || ""}
                          invalid={
                            validation.touched.ordertime && validation.errors.ordertime ? true : false
                          }
                        />

                        {validation.touched.ordertime && validation.errors.ordertime ? (
                          <FormFeedback type="invalid">{validation.errors.ordertime}</FormFeedback>
                        ) : null}
                      </div> */}

                        <FormGroup>
                          <Label
                            htmlFor="username"
                            className="form-label"
                          >
                            Username
                          </Label>
                          <Input
                            name="username"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.username || ""}
                            invalid={
                              validation.touched.username && validation.errors.username ? true : false
                            }
                          />
                          {validation.touched.username && validation.errors.username ? (
                            <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                          ) : null}
                        </FormGroup>
                        
                        <FormGroup>
                          <Label
                            htmlFor="email"
                            className="form-label"
                          >
                            Email
                          </Label>
                          <Input
                            name="email"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email && validation.errors.email ? true : false
                            }
                          />
                          {validation.touched.email && validation.errors.email ? (
                            <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                          ) : null}
                        </FormGroup>
                        
                        <FormGroup>
                          <Label
                            htmlFor="password"
                            className="form-label"
                          >
                            Password
                          </Label>
                          <Input
                            name="password"
                            type="password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={
                              validation.touched.password && validation.errors.password ? true : false
                            }
                          />
                          {validation.touched.password && validation.errors.password ? (
                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                          ) : null}
                        </FormGroup>
                    </ModalBody>
                    <div className="modal-footer">
                      <div className="hstack gap-2 justify-content-end">
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => {
                            setModal(false);
                          }}
                        >
                          Close
                        </button>

                        <button type="submit" className="btn btn-success">
                          {!!isEdit
                            ? "Update"
                            : "Add User"}
                        </button>
                      </div>
                    </div>
                  </Form>
                </Modal>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceOrders;


