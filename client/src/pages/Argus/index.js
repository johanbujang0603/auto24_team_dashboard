import React, {useEffect} from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import Select from 'react-select';
import BreadCrumb from '../../Components/Common/BreadCrumb';

//redux
import { getCarModels, getCarMakes } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

const Argus = () => {
  document.title="Argus | Velzon - React Admin & Dashboard Template";

  const { carMakes, carModels } = useSelector((state) => state.Inspection);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarMakes());
  }, [dispatch]);

  const renderCarMakeOptions = React.useMemo(() => {
    return carMakes.map((make) => { return {value: make._id, label: make.name} });
  }, [carMakes]);

  const getSelectedMakeOption = (val) => {
    const searchIndex = carMakes.findIndex((make) => make._id === val);
    if (searchIndex === -1) return null;
    return { value: carMakes[searchIndex]._id, label: carMakes[searchIndex].name };
  }

  const renderCarModelOptions = React.useMemo(() => {
    return carModels.map((model) => { return {value: model._id, label: model.name} });
  }, [carModels]);

  const getSelectedModelOption = (val) => {
    const searchIndex = carModels.findIndex((model) => model._id === val);
    if (searchIndex === -1) return null;
    return { value: carModels[searchIndex]._id, label: carModels[searchIndex].name };
  }

  return (
    <div className="page-content">
      <Container fluid>                
        <BreadCrumb title="Argus Cotation" pageTitle="Argus" />
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <h4 className='card-title mb-0'>Argus Cotation</h4>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xl={3}>
                    <Select
                      name="make"
                      onChange={(option) => {
                        
                        dispatch(getCarModels(option.value));
                      }}
                      // onBlur={() => validation.setFieldTouched('make', true)}
                      // value={getSelectedMakeOption(validation.values.make)}
                      options={renderCarMakeOptions}
                      isClearable={true}
                      options={[]}
                      placeholder="Marque"
                    />
                  </Col>
                  <Col xl={3}>
                    <Select
                      isClearable={true}
                      options={[]}
                      placeholder="Modele"
                    />
                  </Col>
                  <Col xl={3}>
                    <Select
                      isClearable={true}
                      options={[]}
                      placeholder="Annee"
                    />
                  </Col>
                  <Col xl={3}>
                    <Select
                      isClearable={true}
                      options={[]}
                      placeholder="transmission"
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Argus