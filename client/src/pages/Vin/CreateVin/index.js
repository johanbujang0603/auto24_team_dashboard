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
  const [decodeResult, setDecodeResult] = useState([]);

  const submitPicture = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setDecodeResult([]);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("file", files[0].file);

    axios.post(`/api/vin/upload-picture`, formData, config)
      .then((res) => {
        setDecodeResult(res.result.decode);
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
          <BreadCrumb title="Ajouter" pageTitle="VIN" />

          <Row className="mt-2">
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Image</h4>
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
                  {
                    decodeResult.length > 0 && (
                      <pre className='language-markup mt-5'>
                        {
                          decodeResult.map((info, index) => {
                            return (
                              <Row key={index}>
                                <Col sm={6}><span>{info.label}</span></Col>
                                <Col sm={6}><span>{info.value}</span></Col>
                                <hr />
                              </Row>
                            )
                          })
                        }
                      </pre>
                    )
                  }
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
                        <>Decode</>
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