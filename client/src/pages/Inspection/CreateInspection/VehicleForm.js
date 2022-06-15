import React, { useEffect, useRef, useState } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
import Select from "react-select";

//redux
import { getCarModels } from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Flatepicker
import Flatpickr from "react-flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js"

const VehicleForm = () => {
  const dispatch = useDispatch();
  const { carMakes, carModels } = useSelector((state) => state.Inspection);

  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      make: '',
      model: '',
      generation: '',
      version: '',
      year: '',
      colour: '',
      plateNumber: '',
      countries: '',
      provience: '',
      vin: '',
      saddlery: '',
      lastVisit: '',
      kilometers: '',
      transmission: '',
      energy: '',
      telephone: '',
      lastRevision: '',
      date: '',
    },
    validationSchema: Yup.object({
      make: Yup.string().required("Veuillez sélectionner la marque"),
      model: Yup.string().required("Veuillez sélectionner le modèle"),
      generation: Yup.string().required("Veuillez entrer la génération"),
      version: Yup.string().required("Veuillez entrer la version"),
      year: Yup.string().required("Veuillez entrer l'année"),
      colour: Yup.string().required("Veuillez entrer la couleur"),
      plateNumber: Yup.string().required("Veuillez entrer la plaque"),
      countries: Yup.string().required("Veuillez entrer les pays"),
      provience: Yup.string().required("Veuillez entrer la province"),
      vin: Yup.string().required("Veuillez entrer VIN"),
      saddlery: Yup.string().required("Veuillez entrer sellerie"),
      lastVisit: Yup.string().required("Veuillez entrer la dernière visite"),
      kilometers: Yup.string().required("Veuillez entrer la kilomètres"),
      transmission: Yup.string().required("Veuillez entrer la transmission"),
      energy: Yup.string().required("Veuillez entrer la énergie"),
      telephone: Yup.string().required("Veuillez entrer la téléphone"),
      lastRevision: Yup.string().required("Veuillez entrer la dernière révision"),
      date: Yup.string().required("Veuillez entrer la date"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
    },
  });

  const renderCarMakeOptions = React.useMemo(() => {
    return carMakes.map((make) => { return {value: make._id, label: make.name} });
  }, [carMakes.length]);

  const getSelectedMakeOption = (val) => {
    const searchIndex = carMakes.findIndex((make) => make._id === val);
    if (searchIndex === -1) return null;
    return { value: carMakes[searchIndex]._id, label: carMakes[searchIndex].name };
  }

  const renderCarModelOptions = React.useMemo(() => {
    return carModels.map((model) => { return {value: model._id, label: model.name} });
  }, [carModels.length]);

  const getSelectedModelOption = (val) => {
    const searchIndex = carModels.findIndex((model) => model._id === val);
    if (searchIndex === -1) return null;
    return { value: carModels[searchIndex]._id, label: carModels[searchIndex].name };
  }

  return (
    <React.Fragment>
      <Form
        className="needs-validation"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
      >
        <Row>
          <Col md="6">
            <FormGroup className="mb-3">
              <Label htmlFor="make">MARQUE:</Label>   
              <Select
                name="make"
                className={validation.touched.make && validation.errors.make ? 'is-invalid' : ''}
                onChange={(option) => {
                  validation.setFieldValue('make', option.value);
                  dispatch(getCarModels(option.value));
                }}
                onBlur={() => validation.setFieldTouched('make', true)}
                value={getSelectedMakeOption(validation.values.make)}
                options={renderCarMakeOptions}
              />
              {validation.touched.make && validation.errors.make ? (
                <FormFeedback type="invalid">{validation.errors.make}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup className="mb-3">
              <Label htmlFor="model">MODÈLE:</Label>   
              <Select
                name="model"
                className={validation.touched.model && validation.errors.model ? 'is-invalid' : ''}
                onChange={(option) => {
                  validation.setFieldValue('model', option.value);
                }}
                onBlur={() => validation.setFieldTouched('model', true)}
                value={getSelectedModelOption(validation.values.model)}
                options={renderCarModelOptions}
              />
              {validation.touched.model && validation.errors.model ? (
                <FormFeedback type="invalid">{validation.errors.model}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="colour">COULEUR:</Label>
              <Input
                name="colour"
                id="colour"
                type="text"
                className="form-control"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.colour || ""}
                invalid={
                  validation.touched.colour && validation.errors.colour ? true : false
                }
              />
              {validation.touched.colour && validation.errors.colour ? (
                <FormFeedback type="invalid">{validation.errors.colour}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="plateNumber">PLAQUE D’IMMATRICULATION:</Label>
              <Input
                name="plateNumber"
                type="text"
                className="form-control"
                id="plateNumber"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.plateNumber || ""}
                invalid={
                  validation.touched.plateNumber && validation.errors.plateNumber ? true : false
                }
              />
              {validation.touched.plateNumber &&
                validation.errors.plateNumber ? (
                <FormFeedback type="invalid">{validation.errors.plateNumber}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="version">VERSION:</Label>
              <Input
                name="version"
                type="text"
                className="form-control"
                id="version"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.version || ""}
                invalid={
                  validation.touched.version && validation.errors.version
                    ? true
                    : false
                }
              />
              {validation.touched.version && validation.errors.version ? (
                <FormFeedback type="invalid">{validation.errors.version}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="countries">PAYS D’IMMATRICULATION:</Label>
              <Input
                name="countries"
                id="countries"
                type="text"
                className="form-control"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.countries || ""}
                invalid={
                  validation.touched.countries && validation.errors.countries
                    ? true
                    : false
                }
              />
              {validation.touched.countries && validation.errors.countries ? (
                <FormFeedback type="invalid">{validation.errors.countries}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="year">ANNÉE:</Label>
              <Input
                name="year"
                type="text"
                className="form-control"
                id="year"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.year || ""}
                invalid={
                  validation.touched.year &&
                    validation.errors.year
                    ? true
                    : false
                }
              />
              {validation.touched.year &&
                validation.errors.year ? (
                <FormFeedback type="invalid">{validation.errors.year}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="provience">PROVENANCE:</Label>
              <Input
                name="provience"
                type="text"
                className="form-control"
                id="provience"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.provience || ""}
                invalid={
                  validation.touched.provience && validation.errors.provience
                    ? true
                    : false
                }
              />
              {validation.touched.provience && validation.errors.provience ? (
                <FormFeedback type="invalid">{validation.errors.provience}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="vin">VIN:</Label>
              <Input
                name="vin"
                id="vin"
                type="text"
                className="form-control"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.vin || ""}
                invalid={
                  validation.touched.vin && validation.errors.vin
                    ? true
                    : false
                }
              />
              {validation.touched.vin && validation.errors.vin ? (
                <FormFeedback type="invalid">{validation.errors.vin}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="saddlery">SELLERIE:</Label>
              <Input
                name="saddlery"
                type="text"
                className="form-control"
                id="saddlery"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.saddlery || ""}
                invalid={
                  validation.touched.saddlery &&
                    validation.errors.saddlery
                    ? true
                    : false
                }
              />
              {validation.touched.saddlery &&
                validation.errors.saddlery ? (
                <FormFeedback type="invalid">{validation.errors.saddlery}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="lastVisit">DERNIERE VISITE:</Label>
              <Flatpickr
                className={`form-control ${validation.touched.lastVisit && validation.errors.lastVisit ? 'is-invalid' : ''}`}
                name="lastVisit"
                onBlur={() => validation.setFieldTouched('lastVisit', true)}
                id="lastVisit"
                onChange={([date]) => {
                  validation.setFieldValue("lastVisit", date);
                }}
                options={{
                  locale: French,
                  enableTime: false,
                  dateFormat: "d M, Y"
                }}
              />
              {validation.touched.lastVisit &&
                validation.errors.lastVisit ? (
                <FormFeedback type="invalid">{validation.errors.lastVisit}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="kilometers">KILOMÉTRAGE:</Label>
              <Input
                name="kilometers"
                id="kilometers"
                type="text"
                className="form-control"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.kilometers || ""}
                invalid={
                  validation.touched.kilometers && validation.errors.kilometers
                    ? true
                    : false
                }
              />
              {validation.touched.kilometers && validation.errors.kilometers ? (
                <FormFeedback type="invalid">{validation.errors.kilometers}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="transmission">TRANSMISSION:</Label>
              <select
                id="transmission"
                name="transmission"
                className={`form-select ${validation.touched.transmission && validation.errors.transmission ? 'is-invalid' : ''}`}
                onChange={validation.handleChange}
              >
                <option value=""></option>
                <option value="MANUELLE">MANUELLE</option>
                <option value="AUTOMATIQUE">AUTOMATIQUE</option>
              </select>
              {validation.touched.transmission && validation.errors.transmission ? (
                <FormFeedback type="invalid">{validation.errors.transmission}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="energy">ENERGIE:</Label>
              <select
                id="energy"
                name="energy"
                className={`form-select ${validation.touched.energy && validation.errors.energy ? 'is-invalid' : ''}`}
                onChange={validation.handleChange}
              >
                <option value=""></option>
                <option value="ESSENCE">ESSENCE</option>
                <option value="DIESEL">DIESEL</option>
              </select>
              {validation.touched.energy && validation.errors.energy ? (
                <FormFeedback type="invalid">{validation.errors.energy}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="telephone">TELEPHONE:</Label>
              <Input
                name="telephone"
                id="telephone"
                type="text"
                className="form-control"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.telephone || ""}
                invalid={
                  validation.touched.telephone && validation.errors.telephone
                    ? true
                    : false
                }
              />
              {validation.touched.telephone && validation.errors.telephone ? (
                <FormFeedback type="invalid">{validation.errors.telephone}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="lastRevision">DERNIERE REVISION:</Label>
              <Flatpickr
                className={`form-control ${validation.touched.lastRevision && validation.errors.lastRevision ? 'is-invalid' : ''}`}
                name="lastRevision"
                onBlur={() => validation.setFieldTouched('lastRevision', true)}
                id="lastRevision"
                onChange={([date]) => {
                  validation.setFieldValue("lastRevision", date);
                }}
                options={{
                  locale: French,
                  enableTime: false,
                  dateFormat: "d M, Y"
                }}
              />
              {validation.touched.lastRevision &&
                validation.errors.lastRevision ? (
                <FormFeedback type="invalid">{validation.errors.lastRevision}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className="mb-3">
              <Label htmlFor="date">DATE:</Label>
              <Flatpickr
                className={`form-control ${validation.touched.date && validation.errors.date ? 'is-invalid' : ''}`}
                name="date"
                onBlur={() => validation.setFieldTouched('date', true)}
                id="date"
                onChange={([date]) => {
                  validation.setFieldValue("date", date);
                }}
                options={{
                  locale: French,
                  enableTime: false,
                  dateFormat: "d M, Y"
                }}
              />
              {validation.touched.date &&
                validation.errors.date ? (
                <FormFeedback type="invalid">{validation.errors.date}</FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
        </Row>

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
            type="submit"
            color="success"
            className="btn-label right ms-auto nexttab nexttab"
          >
            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
            ÉTAPE SUIVANTE
          </Button>
        </div>
      </Form>
    </React.Fragment>
  )
};

export default VehicleForm;