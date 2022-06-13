import React, { useState } from 'react';
import { Card, CardBody, Col, Row, Container, CardHeader, CardFooter, Button, Spinner, Form } from 'reactstrap';
import BreadCrumb from '../../../Components/Common/BreadCrumb';

// Import React FilePond
import { FilePond,  registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import axios from 'axios';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CreateVin = () => {
  document.title="VIN | Auto24 Team Dashboard";

  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitPicture = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    console.log(files[0]);
    formData.append("file", files[0].file);

    axios.post(`/vin/upload-picture`, formData, config)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  }
  
  return (
    <React.Fragment>
      <div className="page-content">       
        <Container fluid>
          <BreadCrumb title="Create" pageTitle="VIN" />

          <Row className="mt-2">
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Car Image Upload</h4>
                </CardHeader>

                <CardBody>
                  <p className="text-muted"></p>
                  <FilePond
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    maxFiles={1}
                    name="files"
                    className="filepond filepond-input-multiple"
                    labelIdle='<span class="filepond--label-action">Click here</span> to send your document'
                  />
                </CardBody>

                <CardFooter className="text-center">
                  <Button color="secondary" className="btn-load w-lg" onClick={submitPicture}>
                    {
                      isLoading ? (
                        <span className="d-flex align-items-center">
                          <Spinner size="sm" type="grow" className="flex-shrink-0"> Loading... </Spinner>
                          <span className="flex-grow-1 ms-2">
                              Loading...
                          </span>
                        </span>
                      ) : (
                        <>Send</>
                      )
                    }
                </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateVin;