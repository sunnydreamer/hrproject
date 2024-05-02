import React, { useEffect, useState } from "react"
import axios from '../interceptors/axiosInstance';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography, { typographyClasses } from '@mui/joy/Typography';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Button from '@mui/material/Button';
import { TimelineDot } from '@mui/lab';
import CircularProgress from '@mui/material/CircularProgress';


//TODO: need to replace all the hardcoded user ID to the user id from token
const VisaPage = () => {
  const [userDocuments, setUserDocuments] = useState({})
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // steps
  const steps = [
    { label: 'OPT Receipt', documentKey: 'receipt' },
    { label: 'OPT EAD', documentKey: 'ead' },
    { label: 'I-983', documentKey: 'i983' },
    { label: 'I-20', documentKey: 'i20' }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const isCurrentStep = (index) => index === currentStep;
  const isStepCompleted = (index) => index < currentStep

  // function handlers
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (docType) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', docType)
      const response = await axios.put(`/documents/66321f8a46e3d7ae427847d8`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFile(null);
      console.log('Upload success:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleCancel = () => {
    setFile(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user information
        const documentsData = await axios.get('/documents/66321f8a46e3d7ae427847d8');
        setUserDocuments(documentsData.data)

        // Find the first document with a status other than "Approved"
        const documentTypesToCheck = ['receipt', 'ead', 'i983', 'i20'];
        let firstNonApprovedDocumentIndex = 0;
        for (let i = 0; i < documentTypesToCheck.length; i++) {
          const documentType = documentTypesToCheck[i];
          const document = documentsData.data[documentType];
          if (document && document.status === 'Approved') {
            firstNonApprovedDocumentIndex += 1
          }
        }
        setCurrentStep(firstNonApprovedDocumentIndex)

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false)
      }
    };

    fetchData();
  }, [file])

  if (isLoading) {
    return (
      <div className="full-parent-height">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="full-parent-height">
      {/* the page should not show any documents if the work authorization type is not OPT, userDocuments will be null for every situation except OPT*/}
      {userDocuments ?
        <div className="stepperContainer">
          <Stepper
            orientation="vertical"
            sx={{
              '--Stepper-verticalGap': '2.5rem',
              '--StepIndicator-size': '2.5rem',
              '--Step-gap': '1rem',
              '--Step-connectorInset': '0.5rem',
              '--Step-connectorRadius': '1rem',
              '--Step-connectorThickness': '4px',
              '--joy-palette-success-solidBg': 'var(--joy-palette-success-400)',
              [`& .${stepClasses.completed}`]: {
                '&::after': { bgcolor: 'success.solidBg' },
              },
              [`& .${stepClasses.active}`]: {
                [`& .${stepIndicatorClasses.root}`]: {
                  border: '4px solid',
                  borderColor: '#fff',
                  boxShadow: (theme) => `0 0 0 1px ${theme.vars.palette.primary[500]}`,
                },
              },
              [`& .${stepClasses.disabled} *`]: {
                color: 'neutral.softDisabledColor',
              },
              [`& .${typographyClasses['title-sm']}`]: {
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontSize: '18px',
              },
            }}
          >
            {steps.map((step, index) => {
              const currentDocumentKey = step.documentKey
              const currentDocument = userDocuments[currentDocumentKey]
              const isDocumentApproved = currentDocument && currentDocument.status === 'Approved'
              return (<Step
                completed={isStepCompleted(index)}
                active={isCurrentStep(index)}
                disabled={!isCurrentStep(index)}
                indicator={
                  isCurrentStep(index) ? (
                    <StepIndicator variant="solid" color="success">
                      <AppRegistrationRoundedIcon />
                    </StepIndicator>
                  ) : (
                    isStepCompleted(index) ? (<StepIndicator variant="solid" color="success">
                      <CheckRoundedIcon />
                    </StepIndicator>) : (<StepIndicator>
                      <TimelineDot />
                    </StepIndicator>)

                  )
                }
                key={index}
              >
                <div>
                  <Typography level="title-sm">Step {index + 1}</Typography>
                  {step.label}
                </div>
                {isCurrentStep(index) && <> {currentDocument ?
                  // has document, shows status
                  <div>
                    <p>Status: {currentDocument.status}</p>
                    {currentDocument.comment && <p> Comment:{currentDocument.comment}</p>}
                    {isDocumentApproved &&
                      // If document is not approved, show button to resubmit
                      <>
                        <div>
                          {file && <div>Selected file: {file.name}</div>}
                          <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
                            <input
                              type="file"
                              id="file-input"
                              accept=".pdf,.doc,.docx"
                              onChange={handleFileChange}
                              style={{ display: 'none' }}
                            />
                            <label htmlFor="file-input">
                              {file ? (
                                <Button variant="contained" component="span">Edit</Button>
                              ) : (
                                <Button variant="contained" component="span">Re-upload</Button>
                              )}
                            </label>
                            {file && (
                              <>
                                <Button variant="contained" onClick={() => handleSubmit(currentDocumentKey)}>Submit</Button>
                                <Button variant="text" onClick={handleCancel}>Cancel</Button>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    }
                  </div>
                  :
                  // if no document in database yet
                  <div>
                    {file && <div>Selected file: {file.name}</div>}
                    <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }}>
                      <input
                        type="file"
                        id="file-input"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="file-input">
                        {file ? (
                          <Button variant="contained" component="span">Edit</Button>
                        ) : (
                          <Button variant="contained" component="span">Upload</Button>
                        )}
                      </label>
                      {file && (
                        <>
                          <Button variant="contained" onClick={() => handleSubmit(currentDocumentKey)}>Submit</Button>
                          <Button variant="text" onClick={handleCancel}>Cancel</Button>
                        </>
                      )}
                    </div>
                  </div>}</>}
              </Step>)
            })}
          </Stepper>
        </div>
        : <div>Not a OPT holder. No documents required</div>
      }

    </div >
  );
}

export default VisaPage;
