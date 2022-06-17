import React, { useEffect } from 'react';
import { Button, Spinner, Form, Input, FormGroup, FormFeedback } from 'reactstrap';

//redux
import { submitComments, toogleActiveStep } from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

const Comments = () => {
  const dispatch = useDispatch();
  const {activeStep, currentData, isLoading} = useSelector((state) => state.Inspection);

  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      comments: '',
    },
    validationSchema: Yup.object({
      comments: Yup.string().required("Veuillez sélectionner la commentaires"),
    }),
    onSubmit: (values) => {
      dispatch(submitComments({ ...values, id: currentData.id }));
    },
  });

  useEffect(() => {
  }, [currentData]);

  return (
    <React.Fragment>
      <div className='mb-3'>
        <h5>COMMENTAIRES</h5>
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
          <Input
            name="comments"
            id="comments"
            rows={5}
            type="textarea"
            className="form-control"
            placeholder="commetaires"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.comments || ""}
            invalid={
              validation.touched.comments && validation.errors.comments
                ? true
                : false
            }
          />
          {validation.touched.comments && validation.errors.comments ? (
            <FormFeedback type="invalid">{validation.errors.comments}</FormFeedback>
          ) : null}
        </FormGroup>
        <div className="d-flex align-items-start gap-3 mt-4">
          <Button
            type="button"
            className="btn btn-light btn-label previestab"
            onClick={() => dispatch(toogleActiveStep(activeStep - 1))}
          >
            <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
            ÉTAPE PRÉCÉDENTE
          </Button>
          <Button
            type="submit"
            color="success"
            className="btn-label right ms-auto nexttab nexttab"
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
      </Form>
    </React.Fragment>
  );
};

export default Comments;