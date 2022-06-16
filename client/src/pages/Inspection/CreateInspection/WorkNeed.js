import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Spinner, Form, Label, Input, FormGroup, FormFeedback } from 'reactstrap';

//redux
import {
//   submitVehicleInspection,
} from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

const WorkNeed = () => {
  const dispatch = useDispatch();
  const {id, currentData, isLoading} = useSelector((state) => state.Inspection);

  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      safe: '',
      rapid: '',
      passage: '',
    },
    validationSchema: Yup.object({
      safe: Yup.string().required("Veuillez sélectionner la securitaire"),
      rapid: Yup.string().required("Veuillez sélectionner le rapidement"),
      passage: Yup.string().required("Veuillez entrer la passage"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  useEffect(() => {
  }, [currentData]);

  const handleSubmit = () => {
    // dispatch(inspectionData);
  }

  return (
    <React.Fragment>
      <div className='mb-3'>
        <h5>TRAVAUX À PRÉVOIR</h5>
      </div>

      <Form
        className="needs-validation"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <FormGroup className="mb-3">
          <Label className="text-white px-1 py-2 bg-danger" htmlFor="safe">TRAVAUX URGENTS (SÉCURITAIRES):</Label> 
          <Input
            name="safe"
            id="safe"
            type="textarea"
            className="form-control"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.safe || ""}
            invalid={
              validation.touched.safe && validation.errors.safe
                ? true
                : false
            }
          />
          {validation.touched.safe && validation.errors.safe ? (
            <FormFeedback type="invalid">{validation.errors.safe}</FormFeedback>
          ) : null}
        </FormGroup>
        <FormGroup className="mb-3">
          <Label className="text-white px-1 py-2 bg-warning" htmlFor="rapid">TRAVAUX À FAIRE RAPIDEMENT:</Label> 
          <Input
            name="rapid"
            id="rapid"
            type="textarea"
            className="form-control"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.rapid || ""}
            invalid={
              validation.touched.rapid && validation.errors.rapid
                ? true
                : false
            }
          />
          {validation.touched.rapid && validation.errors.rapid ? (
            <FormFeedback type="invalid">{validation.errors.rapid}</FormFeedback>
          ) : null}
        </FormGroup>
        <FormGroup className="mb-3">
          <Label className="text-white px-1 py-2 bg-success" htmlFor="passage">TRAVAUX LORS DU PROCHAIN PASSAGE:</Label> 
          <Input
            name="passage"
            id="passage"
            type="textarea"
            className="form-control"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.passage || ""}
            invalid={
              validation.touched.passage && validation.errors.passage
                ? true
                : false
            }
          />
          {validation.touched.passage && validation.errors.passage ? (
            <FormFeedback type="invalid">{validation.errors.passage}</FormFeedback>
          ) : null}
        </FormGroup>
      </Form>

      <div className="d-flex align-items-start gap-3 mt-4">
        <Button
          type="button"
          className="btn btn-light btn-label previestab"
          onClick={() => console.log("xxx")}
        >
          <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
          ÉTAPE PRÉCÉDENTE
        </Button>
        <Button
          type="button"
          color="success"
          className="btn-label right ms-auto nexttab nexttab"
          onClick={handleSubmit}
        >
          {
            isLoading ? (
              <span className="d-flex align-items-center">
                <Spinner size="sm" className="flex-shrink-0"> Chargement en cours.. </Spinner>
                <span className="flex-grow-1 ms-2">
                  Chargement en cours..
                </span>
              </span>
            ) : (
              <>
                <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                  ÉTAPE SUIVANTE
              </>
            )
          }
          
        </Button>
      </div>
    </React.Fragment>
  );
};

export default WorkNeed;