import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Button, UncontrolledTooltip, Spinner } from 'reactstrap';
import Dropzone from "react-dropzone";
import FeatherIcon from 'feather-icons-react';

//redux
import {
  submitVehiclePhotos,
} from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";

import { photoTypes } from "../../../common/data";

import emptyPhoto1 from "../../../assets/images/empty/photo1.jpg";
import emptyPhoto2 from "../../../assets/images/empty/photo2.jpg";
import emptyPhoto3 from "../../../assets/images/empty/photo3.jpg";
import emptyPhoto4 from "../../../assets/images/empty/photo4.jpg";
import emptyPhoto5 from "../../../assets/images/empty/photo5.jpg";
import emptyPhoto6 from "../../../assets/images/empty/photo6.jpg";
import emptyPhoto7 from "../../../assets/images/empty/photo7.jpg";
import emptyPhoto8 from "../../../assets/images/empty/photo8.jpg";
import emptyPhoto9 from "../../../assets/images/empty/photo10.jpg";
import emptyPhoto10 from "../../../assets/images/empty/photo9.jpg";
import emptyPhoto11 from "../../../assets/images/empty/photo11.jpg";
import emptyPhoto12 from "../../../assets/images/empty/photo12.jpg";
import emptyPhoto13 from "../../../assets/images/empty/photo13.png";

const emptyImages = {
  front: emptyPhoto1,
  front_left: emptyPhoto2,
  left_side: emptyPhoto3,
  rear_left: emptyPhoto4,
  rear_boot_closed: emptyPhoto5,
  rear_boot_open: emptyPhoto6,
  rear_right: emptyPhoto7,
  right_side: emptyPhoto8,
  front_right: emptyPhoto10,
  interior_front_cover: emptyPhoto13,
  trunk: emptyPhoto9,
  interior_front: emptyPhoto12,
  interior_rear: emptyPhoto11,
};

const VehiclePictures = () => {
  const dispatch = useDispatch();
  const {currentData, isLoading} = useSelector((state) => state.Inspection);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentType, setCurrentType] = useState(null);
  const [photos, setPhotos] = useState(null);

  const fileUploadRef = useRef();

  useEffect(() => {
    const initializePhotos = async () => {
      let initialPhotos = {};
      for (let i = 0 ; i < photoTypes.length ; i ++) {
        initialPhotos[photoTypes[i].value] = null;
      }  
      if (currentData.photos !== null && currentData.id !== null) {
        for (let photoKey in photos) {
          if (!photos[photoKey]) continue;
          const blob = await fetch(`/uploads/${photos[photoKey]}`).then((r) => r.blob());
          let newFile = new File([blob], photos[photoKey]);
          initialPhotos[photoKey] = Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          }); 
        }
      }
      setPhotos(initialPhotos);
    }

    initializePhotos();
  }, [dispatch]);

  useEffect(() => {
  }, [photos, currentData])

  const handleAcceptedFiles = (files) => {
    const newKey = photoTypes[currentIndex].value;
    const fileWithPreview = Object.assign(files[0], {
      preview: URL.createObjectURL(files[0])
    });

    if (photos) {
      setPhotos({...photos, [newKey]: fileWithPreview});
    } else {
      setPhotos({ [newKey]: fileWithPreview });
    }
    setCurrentIndex(currentIndex + 1);
  }

  const handleRemovePhoto = (key) => {
    setPhotos({ ...photos, [key]: null });
  }

  const handleUploadAgain = (key) => {
    fileUploadRef.current.click();
    setCurrentType(key);
  };

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    if (!currentType) return;
    const newFile = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    console.log(newFile);
    setPhotos({ ...photos, [currentType]: newFile });
    setCurrentType(null);
  }

  const skipIndex = () => {
    if (currentIndex >= 13) return;
    setCurrentIndex(currentIndex + 1);
  }

  const handleSubmitVehiclePhotos = () => {
    if (Object.keys(photos).filter(index => photos[index] !== null).length === 0) return;
    let formData = new FormData();
    for (var photoKey in photos) {
      if (photos[photoKey] !== null)
        formData.append(photoKey, photos[photoKey]);
    }
    dispatch(submitVehiclePhotos(formData));
  }

  return (
    <React.Fragment>
      <div className='mb-3'>
        <h5>PHOTOS DU VÉHICULE:</h5>
      </div>

      <div>
        <Row className="g-3">
          <Col lg={12}>
            <Dropzone
              accept={"image/*"}
              noKeyboard={true}
              noDrag={true}
              maxFiles={1}
              multiple={false}
              onDrop={acceptedFiles => {
                handleAcceptedFiles(acceptedFiles);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone dz-clickable">
                  <div
                    className="dz-message needsclick"
                    {...getRootProps()}
                  >
                    <div className="mb-3">
                      <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                    </div>
                    <p>Veuillez ajouter une photo pour :</p>
                    <span className="mb-1 font-large-1 text-dark text-bold-600">
                      {photoTypes[currentIndex].name}
                    </span>
                  </div>
                  <div
                    className="w-100 text-center cursor-pointer my-2 text-decoration-underline"
                    onClick={skipIndex}
                  >
                    Sauter cette étape
                  </div>
                </div>
              )}
            </Dropzone>
          </Col>
        </Row>
      </div>

      <div>
        <Row>
          <Col lg={12}>
            <aside className='thumb-container'>
              <input
                id="customUpload"
                type="file"
                ref={fileUploadRef}
                style={{ display: "none" }}
                onChange={handleUploadFile}
              />
              {
                photos && Object.keys(photos).map((key, index) => {
                  return (
                    <div className="dz-thumb" key={index}>
                      <div className="dz-thumb-inner">
                        {photos[key] === null ? (
                          <img
                            src={emptyImages[key]}
                            className="dz-img"
                            alt="Empty"
                          />
                        ) : (
                          <img
                            src={photos[key].preview}
                            className="dz-img"
                            alt={photos[key].name}
                          />
                        )}
                        <div className="photo-hover-actions">
                          <Button color="light" className="btn-icon" onClick={() => handleUploadAgain(key)}>
                            <FeatherIcon
                              icon="plus"
                              fill="white"
                              size={24}
                              id={`upload-${index}`}
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target={`upload-${index}`}
                            >
                              Ajouter une photo
                            </UncontrolledTooltip>
                          </Button>
                          {photos[key] !== null && (
                            <Button color="light" className="btn-icon" onClick={() => handleRemovePhoto(key)}>
                              <FeatherIcon
                                icon="minus"
                                fill="white"
                                size={24}
                                id={`remove-${index}`}
                              />
                              <UncontrolledTooltip
                                placement="top"
                                target={`remove-${index}`}
                              >
                                Supprimer la photo
                              </UncontrolledTooltip>
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="dz-thumb-text">
                        {photoTypes[index].name}
                      </div>
                    </div>
                  )
                })
              }
            </aside>
          </Col>
        </Row>
      </div>

      <div className="d-flex align-items-start gap-3 mt-4">
        <Button
          type="button"
          color="success"
          className="btn-label right ms-auto nexttab nexttab"
          onClick={handleSubmitVehiclePhotos}
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

export default VehiclePictures;