import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Spinner } from 'reactstrap';

//redux
import {
  submitVehicleInspection,
} from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";

import SelectWidget from "./SelectWidget";
import { inspectionInfos } from "../../../common/data";

const VehicleInspection = () => {
  const dispatch = useDispatch();
  const {currentData, isLoading} = useSelector((state) => state.Inspection);

  const [inspectionData, setInspectionData] = useState({});

  useEffect(() => {
    if (currentData && currentData.vehicleInspection && currentData.id) setInspectionData({ ...currentData.vehicleInspection })
    else {
      const initData = {};
      for (let i = 0; i < inspectionInfos.length; i ++) {
        for (let j = 0; j < inspectionInfos[i].options.length; j ++) {
          initData[inspectionInfos[i].options[j].name] = 'Nothing';
        }
      }
      setInspectionData({ ...initData });
    }
  }, [currentData]);

  const handleChangeOption = (name, value) => {
    setInspectionData({
      ...inspectionData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    dispatch(submitVehicleInspection({...inspectionData, id: currentData.id}));
  }

  return (
    <React.Fragment>
      <div className='mb-3'>
        <h5>INSPECTION DU VÉHICULE:</h5>
      </div>

      <div>
        {
          inspectionInfos.map((info, index) => {
            return (
              <Row className="mb-3" key={index}>
                <Col lg="12" className='mb-1'>
                  <span className="text-primary fw-semibold">{info.name}</span>
                </Col>
                {
                  info.options.map((item, i) => {
                    return (
                      <Col lg="6" key={i}>
                        <SelectWidget
                          handleChange={handleChangeOption}
                          currentValue={inspectionData[item.name]}
                          title={item.title}
                          name={item.name}
                        />
                      </Col>
                    )
                  })
                }
              </Row>
            )
          })
        }
      </div>

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

export default VehicleInspection;