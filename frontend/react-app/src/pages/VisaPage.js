import React, { useEffect, useState } from "react"
import axios from '../interceptors/axiosInstance';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography, { typographyClasses } from '@mui/joy/Typography';
// import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import Button from '@mui/material/Button';
import { TimelineDot } from '@mui/lab';

const VisaPage = () => {
  const [dummyUser, setDummyUser] = useState({})
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.put(`/uploadFiles/${dummyUser._id}`, formData, {
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
    const getDummyUser = async () => {
      try {
        const response = await axios.get('/getuser/662d27993a51949f1b81a0c1');
        setDummyUser(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    getDummyUser();
  }, []);
  return (
    <div className="full-parent-height">
      {/* the page should not show any documents if the work authorization type is not OPT*/}
      {dummyUser.workAuthorization === "F1(OPT)" ? <>
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
              fontSize: '10px',
            },
          }}
        >
          <Step
            active
            indicator={
              <StepIndicator variant="solid" color="success">
                <AppRegistrationRoundedIcon />
              </StepIndicator>
            }
          >
            <div>
              <Typography level="title-sm">Step 1</Typography>
              OPT Receipt
            </div>
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
                  <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                  <Button variant="text" onClick={handleCancel}>Cancel</Button>
                </>
              )}
            </div>
          </Step>
          <Step disabled indicator={<StepIndicator><TimelineDot /></StepIndicator>}>
            <div>
              <Typography level="title-sm">Step 2</Typography>
              OPT EAD
            </div>
          </Step>
          {/* <Step
            disabled
            indicator={
              <StepIndicator variant="solid" color="primary">
                <AppRegistrationRoundedIcon />
              </StepIndicator>
            }
          > */}
          <Step disabled indicator={<StepIndicator><TimelineDot /></StepIndicator>}>
            <div>
              <Typography level="title-sm">Step 3</Typography>
              I-983
            </div>
          </Step>
          <Step disabled indicator={<StepIndicator><TimelineDot /></StepIndicator>}>
            <div>
              <Typography level="title-sm">Step 4</Typography>
              I-20
            </div>
          </Step>
        </Stepper>
      </>
        : <div>No documents required</div>
      }
    </div >
  );
}

export default VisaPage;
