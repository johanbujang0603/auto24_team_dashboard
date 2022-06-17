import React, { useEffect, useRef, useState } from 'react';
import { Button, Spinner, FormGroup, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import Select from 'react-select';
//redux
import { submitSchemaInspection, toogleActiveStep } from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";

import schemaImage from "../../../assets/images/schema.png";

const colors = {
  Rayee: "#0066ff",
  Enfonce: "#33cc00",
  Deforme: "#ffcc00",
  Peinture: "#ff0000",
};

const eventOptions = [
  {
    label: "Rayé",
    value: "Rayee",
  },
  {
    label: "Enfoncé",
    value: "Enfonce",
  },
  {
    label: "Déformé",
    value: "Deforme",
  },
  {
    label: "Peinture",
    value: "Peinture",
  },
];

const formatOptionLabel = ({ value, label }) => (
  <div className="d-flex align-items-center">
    <span style={{borderRadius: '9999px', marginRight: '10px',backgroundColor: colors[value], width: '20px', height: '20px'}}> </span>
    <div>{label}</div>
  </div>
);

const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, {type:mime});
};

const SchemaInspection = () => {
  const dispatch = useDispatch();
  const {activeStep, currentData, isLoading} = useSelector((state) => state.Inspection);

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [clickedPosition, setClickedPosition] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  const canvasRef = useRef();

  useEffect(() => {
    // schemaRef.
    const ctx = canvasRef.current.getContext("2d");
    const image = new Image();
    image.src = schemaImage;
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    }

  }, [canvasRef]);

  const handleClickCanvas = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const sx = canvasRef.current.scrollWidth / canvasRef.current.width;
    const sy = canvasRef.current.scrollHeight / canvasRef.current.height;
    const xCoord = (e.clientX - rect.left) / sx;
    const yCoord = (e.clientY - rect.top) / sy;

    const foundEv = events.findIndex(
      (elem) =>
        elem.position.x >= xCoord - 10 &&
        elem.position.x <= xCoord + 10 &&
        elem.position.y >= yCoord - 10 &&
        elem.position.y <= yCoord + 10
    );
    
    if (foundEv !== -1) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      const image = new Image();
      image.src = schemaImage;
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
        for (let i = 0; i < events.length; i ++) {
          if (i !== foundEv) {
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(events[i].position.x, events[i].position.y, 10, 0, 2 * Math.PI);
            ctx.fillStyle = colors[events[i].event];
            ctx.fill();
          }
        }
        const tempEvents = [...events];
        tempEvents.splice(foundEv, 1);
        setEvents(tempEvents);
        setSelectedEvent(null);
      }
    }
    else {
      setClickedPosition({x: xCoord, y: yCoord});
      toggleEventModal();
    }
  }

  const toggleEventModal = () => {
    setEventModalOpen(!eventModalOpen);
  }

  const addEvent = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.closePath();
    ctx.beginPath();
    setEvents([
      ...events,
      {
        event: selectedEvent.value,
        position: clickedPosition,
      }
    ]);
    ctx.arc(clickedPosition.x, clickedPosition.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = colors[selectedEvent.value];
    ctx.fill();
    toggleEventModal();
  }
  
  const handleSubmit = () => {
    const file = dataURLtoFile(canvasRef.current.toDataURL("image/png"), "canvas.png");
    let formData = new FormData();
    formData.append("canvasFile", file);
    formData.append("id", currentData.id);
    formData.append("events", JSON.stringify(events));
    dispatch(submitSchemaInspection(formData));
  }

  return (
    <React.Fragment>
      <div className='mb-3'>
        <h5>SCHÉMA D’INSPECTION DU VÉHICULE</h5>
      </div>

      <div>
        <canvas
          ref={canvasRef}
          width={700}
          height={887}
          onClick={handleClickCanvas}
          onContextMenu={handleClickCanvas}
          style={{ maxWidth: "100%" }}
        />
      </div>

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

        <Modal isOpen={eventModalOpen} toggle={toggleEventModal}>
          <ModalHeader toggle={toggleEventModal}>Choisissez le problème</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Select
                className="React"
                classNamePrefix="select"
                placeholder="Choisir..."
                name="clear"
                value={selectedEvent}
                options={eventOptions}
                onChange={(option) => {
                  setSelectedEvent(option);
                }}
                formatOptionLabel={formatOptionLabel}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={addEvent}>
              Valider
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default SchemaInspection;