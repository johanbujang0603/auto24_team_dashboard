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
  FormFeedback
} from "reactstrap";
import * as moment from "moment";
import { Link } from "react-router-dom";
import Select from "react-select";
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import actions
import {
  getInspections as onGetInspections,
} from "../../../store/inspection/action";

const InspectionList = () => {
  const [orderStatus, setorderStatus] = useState(null);
  const [orderPayement, setorderPayement] = useState(null);

  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const dispatch = useDispatch();
  const { inspectionList } = useSelector((state) => state.Inspection);

  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState([]);
  const [selectedInspection, setSelectedInspection] = useState([]);

  const orderstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "All", value: "All" },
        { label: "Pending", value: "Pending" },
        { label: "Inprogress", value: "Inprogress" },
        { label: "Cancelled", value: "Cancelled" },
        { label: "Pickups", value: "Pickups" },
        { label: "Returns", value: "Returns" },
        { label: "Delivered", value: "Delivered" },
      ],
    },
  ];

  const orderpayement = [
    {
      options: [
        { label: "Select Payment", value: "Select Payment" },
        { label: "All", value: "All" },
        { label: "Mastercard", value: "Mastercard" },
        { label: "Paypal", value: "Paypal" },
        { label: "Visa", value: "Visa" },
        { label: "COD", value: "COD" },
      ],
    },
  ];

  const [isEdit, setIsEdit] = useState(false);

  function handleorderStatus(orderStatus) {
    setorderStatus(orderStatus);
  }

  function handleorderPayement(orderPayement) {
    setorderPayement(orderPayement);
  }

  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (inspection) => {
    setSelectedInspection(inspection);
    setDeleteModal(true);
  };

  const handleDeleteInspection = () => {
    if (selectedInspection._id) {
      // dispatch(onDeleteOrder(order));
      setDeleteModal(false);
    }
  };
  
  useEffect(() => {
    dispatch(onGetInspections());
  }, [dispatch]);

  // useEffect(() => {
  //   if (!isEmpty(orders)) setOrderList(orders);
  // }, [orders]);

  const toggleTab = (tab, type) => {
    // if (activeTab !== tab) {
    //   setActiveTab(tab);
    //   let filteredOrders = orders;
    //   if (type !== "all") {
    //     filteredOrders = orders.filter((order) => order.status === type);
    //   }
    //   setOrderList(filteredOrders);
    // }
  };

  // useEffect(() => {
  //   if (orders && !orders.length) {
  //     dispatch(onGetOrders());
  //   }
  // }, [dispatch, orders]);

  // useEffect(() => {
  //   setOrder(orders);
  // }, [orders]);

  // useEffect(() => {
  //   if (!isEmpty(orders)) {
  //     setOrder(orders);
  //     setIsEdit(false);
  //   }
  // }, [orders]);

  const handleOrderClicks = () => {
    setOrder("");
    setIsEdit(false);
  };

  // const handleOrderClick = useCallback((arg) => {
  //   const order = arg;
  //   setOrder({
  //     id: order.id,
  //     orderId: order.orderId,
  //     customer: order.customer,
  //     productname: order.productname,
  //     orderDate: order.orderDate,
  //     ordertime: order.ordertime,
  //     amount: order.amount,
  //     payment: order.payment,
  //     status: order.status
  //   });
  // }, [toggle]);


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
        Header: "VIN Number",
        filterable: false,
        Cell: (item) => {
          return <Link to="/" className="fw-medium link-primary">{item.row.original.vehicle_details && item.row.original.vehicle_details.vin }</Link>;
        },
      },
      {
        Header: "Make",
        filterable: false,
        Cell: (item) => (
          <>
            {item.row.original.vehicle_details && item.row.original.vehicle_details.make && item.row.original.vehicle_details.make.name}
          </>
        ),
      },
      {
        Header: "Model",
        filterable: false,
        Cell: (item) => (
          <>
            {item.row.original.vehicle_details && item.row.original.vehicle_details.model && item.row.original.vehicle_details.model.name}
          </>
        ),
      },
      {
        Header: "Year",
        filterable: false,
        Cell: (item) => (
          <>
            {item.row.original.vehicle_details && item.row.original.vehicle_details.year}
          </>
        ),
      },
      {
        Header: "Country",
        filterable: false,
        Cell: (item) => (
          <>
            {item.row.original.vehicle_details && item.row.original.vehicle_details.countries}
          </>
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (order) => (
          <>
            {order.row.original.date}
          </>
        ),
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Link
                  to="#"
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
                    const orderData = cellProps.row.original;
                    // handleOrderClick(orderData);
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
                    const inspectionData = cellProps.row.original;
                    onClickDelete(inspectionData);
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
    []
  );

  const dateFormat = () => {
    let d = new Date(),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let h = (d.getHours() % 12) || 12;
      let ampm = d.getHours() < 12 ? "AM" : "PM";
    return ((d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear() + ", " + h + ":" + d.getMinutes() + " " + ampm).toString());
  };


  const [date, setDate] = useState(dateFormat());

  const dateformate = (e) => {
    const dateString = e.toString().split(" ");

    let time = dateString[4];
    let H = +time.substr(0, 2);
    let h = (H % 12) || 12;
    h = (h <= 9) ? h = ("0" + h) : h;
    let ampm = H < 12 ? "AM" : "PM";
    time = h + time.substr(2, 3) + " " + ampm;

    const date = dateString[2] + " " + dateString[1] + ", " + dateString[3];
    const orderDate = (date + ", " + time).toString();
    setDate(orderDate);
  };

  document.title = "Inspections | Auto24 Team Dashboard";
  return (
    <div className="page-content">
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteInspection}
        onCloseClick={() => setDeleteModal(false)}
      />
      <Container fluid>

        <BreadCrumb title="Liste" pageTitle="Inspection" />
        <Row>
          <Col lg={12}>
            <Card id="inspectionList">
              <CardHeader className="card-header border-0">
                <div className="d-flex align-items-center">
                  <h5 className="card-title mb-0 flex-grow-1">{" "}</h5>
                  <div className="flex-shrink-0">
                    <Link
                      to="/inspection-create"
                      className="btn btn-success add-btn"
                      id="create-btn"
                    >
                      <i className="ri-add-line align-bottom me-1"></i>AJOUTER
                    </Link>{" "}
                    <button type="button" className="btn btn-info">
                      <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                      Import
                    </button>
                    {" "}
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
                          placeholder="Search for order ID, customer, order status or something..."
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>

                    <Col sm={6} className="col-xxl-2">
                      <div>
                        <Flatpickr
                          className="form-control"
                          id="datepicker-publish-input"
                          placeholder="Select a date"
                          options={{
                            altInput: true,
                            altFormat: "F j, Y",
                            mode: "multiple",
                            dateFormat: "d.m.y",
                          }}
                        />
                      </div>
                    </Col>

                    <Col sm={4} className="col-xxl-2">
                      <div>
                        <Select
                          value={orderStatus}
                          onChange={() => {
                            handleorderStatus();
                          }}
                          options={orderstatus}
                          name="choices-single-default"
                          id="idStatus"
                        ></Select>
                      </div>
                    </Col>

                    <Col sm={4} className="col-xxl-2">
                      <div>
                        <Select
                          value={orderPayement}
                          onChange={() => {
                            handleorderPayement();
                          }}
                          options={orderpayement}
                          name="choices-payment-default"
                          id="idPayment"
                        ></Select>
                      </div>
                    </Col>

                    <Col sm={4} className="col-xxl-1">
                      <div>
                        <button type="button" className="btn btn-primary w-100">
                          {" "}
                          <i className="ri-equalizer-fill me-1 align-bottom"></i>
                          Filters
                        </button>
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
                        All Orders
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "2" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("2", "Delivered");
                        }}
                        href="#"
                      >
                        <i className="ri-checkbox-circle-line me-1 align-bottom"></i>{" "}
                        Delivered
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
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "4" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("4", "Returns");
                        }}
                        href="#"
                      >
                        <i className="ri-arrow-left-right-fill me-1 align-bottom"></i>{" "}
                        Returns
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames(
                          { active: activeTab === "5" },
                          "fw-semibold"
                        )}
                        onClick={() => {
                          toggleTab("5", "Cancelled");
                        }}
                        href="#"
                      >
                        <i className="ri-close-circle-line me-1 align-bottom"></i>{" "}
                        Cancelled
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TableContainer
                    columns={columns}
                    data={inspectionList}
                    isGlobalFilter={false}
                    isAddUserList={false}
                    customPageSize={8}
                    divClass="table-responsive table-card mb-1"
                    tableClass="align-middle table-nowrap"
                    theadClass="table-light text-muted text-uppercase"
                    handleOrderClick={handleOrderClicks}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InspectionList;


