import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Button, UncontrolledTooltip, Spinner } from 'reactstrap';
import FeatherIcon from 'feather-icons-react';

//redux
import {
  submitVehicleInspection,
} from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";

import SelectWidget from "./SelectWidget";

const infos = [
  {
    name: "CONTROLES EXTERIEURS",
    options: [
      { title: "Eclairage extérieur", name: "exteriorLighting" },
      { title: "Etat des balais d'essuie-glace", name: "conditionWiperBlades" },
      { title: "Etat du pare-brise", name: "windshieldCondition" },
      { title: "Etat des plaques d'immatriculation", name: "stateLicensePlate" },
      { title: "Etat Carrosserie", name: "bodyCondition" },
    ]
  },
  {
    name: "CONTRÔLE LIQUIDES ( Sous Capot)",
    options: [
      { title: "Contrôle du liquide de lave-glace", name: "washerFulidCheck" },
      { title: "Contrôle du liquide de direction assistée", name: "powerSteeringFluidCheck" },
      { title: "Contrôle du liquide de refroidissement", name: "coolantCheck" },
      { title: "Contrôle du niveau liquide de frein", name: "brakeFluidLevel" },
    ]
  },
  {
    name: "CONTROLES MOTEUR (Sous Capot )",
    options: [
      { title: "Contrôle niveau d'huile moteur avant vidange", name: "engineOilLevel" },
      { title: "Contrôle étanchéité moteur", name: "engineTightnessCheck" },
      { title: "Contrôle bouchon de remplissage", name: "checkingFillerCap" },
      { title: "Contrôle joint de vidange", name: "drainSeal" },
      { title: "Contrôle jauge", name: "gaugeControl" },
    ]
  },
  {
    name: "CONTRÔLE ELECTRICITE",
    options: [
      { title: "Contrôle de la batterie ( Sous Capot)", name: "batteryCheck" },
      { title: "Contrôle avertisseur sonore (Int) ", name: "audibleWarning" },
      { title: "Contrôle courroies d'accessoires ( Sous Capot) ", name: "accessoryBelts" },
    ]
  },
  {
    name: "CONTRÔLE CLIMATISATION",
    options: [
      { title: "Fonctionnemment", name: "operation" },
      { title: "Contrôle filtre d'habitacle  (Int )", name: "cabinFilterCheck" },
    ]
  },
  {
    name: "CONTROLES PNEUS (Ext)",
    options: [
      { title: "Contrôle état et usure des pneus", name: "tireCondition" },
      { title: "Contrôle dimensions, indices des pneus", name: "checkDimention" },
      { title: "Contrôle de la pression des pneus", name: "tirePressureCheck" },
    ]
  },
  {
    name: "CONTRÔLE FREINAGE ( At)",
    options: [
      { title: "Contrôle course de frein de parking", name: "parkingBrakeStorkeControl" },
      { title: "Contrôle de course de pédale de frein", name: "brakePedalStrokeControl" },
      { title: "Contrôle de feux de stop", name: "brakeLightControl" },
      { title: "Contrôle étanchéité du circuit de freinage", name: "leakCheck" },
      { title: "Contrôle étanchéité du maître cylindre", name: "masterCylinder" },
      { title: "Contrôle disques de frein", name: "brakeDiscCheck" },
      { title: "Contrôle plaquettes de frein", name: "checkBrakePads" },
    ]
  },
  {
    name: "CONTRÔLE ECHAPPEMENT (At)",
    options: [
      { title: "Contrôle ligne d'échappement complète", name: "exhaustLineCheck" },
    ]
  },
  {
    name: "CONTRÔLE AMORTISSEURS (At)",
    options: [
      { title: "Contrôle fuites amortisseurs", name: "shockAbsorber" },
      { title: "Contrôle silentblocs", name: "silentblockControl" },
      { title: "Contrôle tige/soufflet", name: "rodBellowsControl" },
      { title: "Contrôle efficacité", name: "efficiencyControl" },
    ]
  },
  {
    name: "CONTRÔLE PIECES VEHICULE (Int)",
    options: [
      { title: "Contrôle validité Certificat d'assurance", name: "validityCheck" },
      { title: "Contrôle validité Certificat Contrôle technique", name: "validityControl" },
      { title: "Contrôle validité Certificat de Vignette admin", name: "certificateValidityCheckAdmin" },
    ]
  },
];

const VehicleInspection = () => {
  const dispatch = useDispatch();
  const {id, currentData, isLoading} = useSelector((state) => state.Inspection);

  const [inspectionData, setInspectionData] = useState({});

  useEffect(() => {
    if (currentData && currentData.vehicleInspection) setInspectionData({ ...currentData.vehicleInspection })
    else {
      const initData = {};
      for (let i = 0; i < infos.length; i ++) {
        for (let j = 0; j < infos[i].options.length; j ++) {
          initData[infos[i].options[j].name] = 'Nothing';
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
    dispatch(inspectionData);
  }

  return (
    <React.Fragment>
      <div className='mb-3'>
        <h5>INSPECTION DU VÉHICULE:</h5>
      </div>

      <div>
        {
          infos.map((info, index) => {
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