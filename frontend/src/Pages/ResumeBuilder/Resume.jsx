import React, { useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import Select from 'react-select';
import { makeStyles } from "@mui/styles";
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import EditIcon from "@mui/icons-material/Edit";
import Professional from "../Templates/Professional";
import Modern from "../Templates/Modern";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  templateContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  templatePreview: {
    padding: theme.spacing(2),
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  selectedTemplate: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  editorContainer: {
    marginTop: theme.spacing(4),
  },
  downloadButtons: {
    marginTop: theme.spacing(2),
    '& > *': {
      marginRight: theme.spacing(2),
    },
  },
}));

const Resume = [
  { value: 'template1', label: 'Professional', component: Professional },
  { value: 'template2', label: 'Modern', component: Modern },
];

const initialResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
  },
  education: [
    { institution: '', degree: '', year: '' }
  ],
  experience: [
    { company: '', position: '', duration: '', description: '' }
  ],
  skills: [],
};

const ResumeBuilder = () => {
  const classes = useStyles();
  const [selectedTemplate, setSelectedTemplate] = useState(templateOptions[0]);
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [activeSection, setActiveSection] = useState('personalInfo');
  const resumeRef = useRef();

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template);
  };

  const handleInputChange = (e, section, index) => {
    const { name, value } = e.target;
    
    if (section === 'skills') {
      setResumeData(prev => ({
        ...prev,
        skills: value.split(',').map(skill => skill.trim())
      }));
      return;
    }

    if (index !== undefined) {
      setResumeData(prev => {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [name]: value };
        return { ...prev, [section]: newArray };
      });
    } else {
      setResumeData(prev => ({
        ...prev,
        [section]: { ...prev[section], [name]: value }
      }));
    }
  };

  const addNewItem = (section) => {
    setResumeData(prev => {
      const newItem = {};
      if (section === 'education') newItem.institution = '';
      if (section === 'experience') newItem.company = '';
      return {
        ...prev,
        [section]: [...prev[section], newItem]
      };
    });
  };

  const removeItem = (section, index) => {
    setResumeData(prev => {
      const newArray = [...prev[section]];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  const downloadPNG = async () => {
    const dataUrl = await htmlToImage.toPng(resumeRef.current);
    saveAs(dataUrl, 'resume.png');
  };

  const downloadPDF = async () => {
    const dataUrl = await htmlToImage.toPng(resumeRef.current);
    const pdf = new jsPDF();
    pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297); // A4 size
    pdf.save('resume.pdf');
  };

  const TemplateComponent = selectedTemplate.component;

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Resume Builder
      </Typography>
      
      {/* Template Selection */}
      <Typography variant="h6" gutterBottom>
        Choose a Template
      </Typography>
      <Select
        options={templateOptions}
        value={selectedTemplate}
        onChange={handleTemplateChange}
        isSearchable={false}
      />
      
      <Grid container spacing={3} className={classes.templateContainer}>
        {templateOptions.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.value}>
            <Paper 
              className={`${classes.templatePreview} ${
                selectedTemplate.value === template.value ? classes.selectedTemplate : ''
              }`}
              onClick={() => handleTemplateChange(template)}
            >
              <Typography variant="subtitle1" align="center">
                {template.label}
              </Typography>
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <template.component resumeData={initialResumeData} />
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {/* Editor Section */}
        <Grid item xs={12} md={4}>
          <Paper className={classes.editorContainer} elevation={3}>
            <div style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                <EditIcon /> Edit Resume
              </Typography>
              
              <div>
                <Button 
                  variant={activeSection === 'personalInfo' ? 'contained' : 'text'} 
                  color="primary"
                  onClick={() => setActiveSection('personalInfo')}
                >
                  Personal Info
                </Button>
                <Button 
                  variant={activeSection === 'education' ? 'contained' : 'text'} 
                  color="primary"
                  onClick={() => setActiveSection('education')}
                >
                  Education
                </Button>
                <Button 
                  variant={activeSection === 'experience' ? 'contained' : 'text'} 
                  color="primary"
                  onClick={() => setActiveSection('experience')}
                >
                  Experience
                </Button>
                <Button 
                  variant={activeSection === 'skills' ? 'contained' : 'text'} 
                  color="primary"
                  onClick={() => setActiveSection('skills')}
                >
                  Skills
                </Button>
              </div>

              {activeSection === 'personalInfo' && (
                <div>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => handleInputChange(e, 'personalInfo')}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => handleInputChange(e, 'personalInfo')}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => handleInputChange(e, 'personalInfo')}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={resumeData.personalInfo.address}
                    onChange={(e) => handleInputChange(e, 'personalInfo')}
                    margin="normal"
                  />
                </div>
              )}

              {activeSection === 'education' && (
                <div>
                  {resumeData.education.map((edu, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                      <TextField
                        fullWidth
                        label="Institution"
                        name="institution"
                        value={edu.institution}
                        onChange={(e) => handleInputChange(e, 'education', index)}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Degree"
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleInputChange(e, 'education', index)}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Year"
                        name="year"
                        value={edu.year}
                        onChange={(e) => handleInputChange(e, 'education', index)}
                        margin="normal"
                      />
                      <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={() => removeItem('education', index)}
                        size="small"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => addNewItem('education')}
                  >
                    Add Education
                  </Button>
                </div>
              )}

              {activeSection === 'experience' && (
                <div>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                      <TextField
                        fullWidth
                        label="Company"
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleInputChange(e, 'experience', index)}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Position"
                        name="position"
                        value={exp.position}
                        onChange={(e) => handleInputChange(e, 'experience', index)}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Duration"
                        name="duration"
                        value={exp.duration}
                        onChange={(e) => handleInputChange(e, 'experience', index)}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={exp.description}
                        onChange={(e) => handleInputChange(e, 'experience', index)}
                        margin="normal"
                        multiline
                        rows={3}
                      />
                      <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={() => removeItem('experience', index)}
                        size="small"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => addNewItem('experience')}
                  >
                    Add Experience
                  </Button>
                </div>
              )}

              {activeSection === 'skills' && (
                <div>
                  <TextField
                    fullWidth
                    label="Skills (comma separated)"
                    name="skills"
                    value={resumeData.skills.join(', ')}
                    onChange={(e) => handleInputChange(e, 'skills')}
                    margin="normal"
                    multiline
                    rows={3}
                  />
                </div>
              )}
            </div>
          </Paper>
        </Grid>

        {/* Resume Preview */}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Resume Preview
          </Typography>
          <div ref={resumeRef} style={{ border: '1px solid #ddd', padding: '20px' }}>
            <TemplateComponent resumeData={resumeData} />
          </div>
          
          <div className={classes.downloadButtons}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudDownloadIcon />}
              onClick={downloadPDF}
            >
              Download PDF
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<CloudDownloadIcon />}
              onClick={downloadPNG}
            >
              Download PNG
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Resume;