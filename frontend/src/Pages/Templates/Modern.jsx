import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    fontFamily: 'Helvetica, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    borderBottom: '1px solid #ddd',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#333',
  },
  contactInfo: {
    textAlign: 'right',
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  sectionTitle: {
    backgroundColor: '#333',
    color: 'white',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    display: 'inline-block',
  },
  item: {
    marginBottom: theme.spacing(3),
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
}));

const Modern = ({ resumeData }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.header}>
        <Typography variant="h2" className={classes.name}>
          {resumeData.personalInfo.name}
        </Typography>
        <div className={classes.contactInfo}>
          <Typography>{resumeData.personalInfo.email}</Typography>
          <Typography>{resumeData.personalInfo.phone}</Typography>
          <Typography>{resumeData.personalInfo.address}</Typography>
        </div>
      </div>

      <div className={classes.section}>
        <Typography variant="h5" className={classes.sectionTitle}>
          EDUCATION
        </Typography>
        {resumeData.education.map((edu, index) => (
          <div key={index} className={classes.item}>
            <div className={classes.itemHeader}>
              <Typography variant="h6">{edu.institution}</Typography>
              <Typography variant="subtitle1">{edu.year}</Typography>
            </div>
            <Typography variant="body1">{edu.degree}</Typography>
          </div>
        ))}
      </div>

      <div className={classes.section}>
        <Typography variant="h5" className={classes.sectionTitle}>
          EXPERIENCE
        </Typography>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className={classes.item}>
            <div className={classes.itemHeader}>
              <Typography variant="h6">{exp.company}</Typography>
              <Typography variant="subtitle1">{exp.duration}</Typography>
            </div>
            <Typography variant="subtitle1" gutterBottom>{exp.position}</Typography>
            <Typography variant="body1">{exp.description}</Typography>
          </div>
        ))}
      </div>

      <div className={classes.section}>
        <Typography variant="h5" className={classes.sectionTitle}>
          SKILLS
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {resumeData.skills.map((skill, index) => (
            <Typography 
              key={index} 
              variant="body1" 
              style={{
                backgroundColor: '#e0e0e0',
                padding: '4px 8px',
                margin: '4px',
                borderRadius: '4px',
              }}
            >
              {skill}
            </Typography>
          ))}
        </div>
      </div>
    </Paper>
  );
};

export default Modern;