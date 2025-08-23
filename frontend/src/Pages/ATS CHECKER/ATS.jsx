import React, { useState, useRef } from 'react';
import { FiUpload, FiFileText, FiCheckCircle, FiAlertCircle, FiDownload } from 'react-icons/fi';
import styles from '../../assets/styles/ATS.module.css';

const ATS = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setAnalysisResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || 
                        droppedFile.name.endsWith('.doc') || 
                        droppedFile.name.endsWith('.docx'))) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setAnalysisResult(null);
      setError(null);
    }
  };

  const analyzeResume = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze/", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("API Response:", data); // Debug log

      // ✅ Ensure defaults so .map() won't crash
      setAnalysisResult({
        score: data.score || 0,
        atsCompatibility: data.atsCompatibility || "Unknown",
        strengths: data.strengths || [],
        improvements: data.improvements || [],
        keywordMatches: data.keywordMatches || [],
      });
      
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setFileName('');
    setAnalysisResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Debug: Check what's in analysisResult
  console.log("Current analysisResult:", analysisResult);

  return (
    <div className={styles.atsContainer}>
      <div className={styles.atsContent}>
        {!analysisResult ? (
          <div 
            className={`${styles.uploadArea} ${file ? styles.fileSelected : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
            />
            
            {!file ? (
              <>
                <FiUpload className={styles.uploadIcon} />
                <h3>Drag & Drop your resume here</h3>
                <p>or click to browse files (PDF or Word)</p>
                <div className={styles.supportedFormats}>
                  <span>Supported formats: .pdf, .doc, .docx</span>
                </div>
              </>
            ) : (
              <>
                <FiFileText className={styles.fileIcon} />
                <h3>{fileName}</h3>
                <button 
                  className={styles.changeFileBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    resetAnalysis();
                  }}
                >
                  Change File
                </button>
              </>
            )}
          </div>
        ) : (
          <div className={styles.resultsContainer}>
            <div className={styles.scoreCard}>
              <div className={styles.scoreCircle}>
                <div className={styles.scoreValue}>{analysisResult.score}</div>
                <div className={styles.scoreLabel}>ATS Score</div>
              </div>
              <div className={styles.scoreDescription}>
                <h3>{analysisResult.atsCompatibility} Compatibility</h3>
                <p>Your resume {analysisResult.score >= 70 ? 'performs well' : 'could be improved'} in ATS systems</p>
              </div>
            </div>

            <div className={styles.resultsGrid}>
              <div className={styles.strengthsCard}>
                <h4>Strengths</h4>
                <ul>
                  {analysisResult.strengths && analysisResult.strengths.length > 0 ? (
                    analysisResult.strengths.map((item, index) => (
                      <li key={index}>
                        <FiCheckCircle className={styles.strengthIcon} />
                        {item}
                      </li>
                    ))
                  ) : (
                    <li>No significant strengths detected</li>
                  )}
                </ul>
              </div>

              <div className={styles.improvementsCard}>
                <h4>Areas for Improvement</h4>
                <ul>
                  {analysisResult.improvements && analysisResult.improvements.length > 0 ? (
                    analysisResult.improvements.map((item, index) => (
                      <li key={index}>
                        <FiAlertCircle className={styles.improvementIcon} />
                        {item}
                      </li>
                    ))
                  ) : (
                    <li>No major improvements needed</li>
                  )}
                </ul>
              </div>

              <div className={styles.keywordsCard}>
                <h4>Keyword Analysis</h4>
                <div className={styles.keywordTags}>
                  {analysisResult.keywordMatches && analysisResult.keywordMatches.length > 0 ? (
                    analysisResult.keywordMatches.map((kw, index) => (
                      <span 
                        key={index} 
                        className={`${styles.keywordTag} ${kw.match ? styles.match : styles.missing}`}
                      >
                        {kw.word}
                      </span>
                    ))
                  ) : (
                    <p>No keywords detected</p>
                  )}
                </div>
              </div>

              <div className={styles.suggestionsCard}>
                <h4>Recommended Actions</h4>
                <ul>
                  <li>Use standard section headings (Experience, Education, Skills)</li>
                  <li>Avoid tables, columns, and complex formatting</li>
                  <li>Include relevant keywords naturally throughout</li>
                  <li>Keep resume length to 1-2 pages maximum</li>
                  <li>Use simple, clean fonts like Arial or Times New Roman</li>
                </ul>
                <button className={styles.downloadTemplateBtn}>
                  <FiDownload className={styles.downloadIcon} />
                  Download ATS-Friendly Template
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className={styles.errorMessage}>
            <FiAlertCircle /> {error}
          </div>
        )}

        {file && !analysisResult && !isAnalyzing && (
          <div className={styles.analysisControls}>
            <button 
              className={styles.analyzeBtn}
              onClick={analyzeResume}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
            </button>
            <p className={styles.disclaimer}>
              Your file will be processed securely and won't be stored after analysis
            </p>
          </div>
        )}

        {isAnalyzing && (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Analyzing your resume...</p>
          </div>
        )}

        {analysisResult && (
          <div className={styles.newAnalysis}>
            <button 
              className={styles.newAnalysisBtn}
              onClick={resetAnalysis}
            >
              Analyze Another Resume
            </button>
          </div>
        )}
      </div>

      <div className={styles.atsInfo}>
        <div className={styles.infoCard}>
          <h3>Why ATS Optimization Matters</h3>
          <p>75% of resumes are rejected before they reach a human recruiter due to poor ATS compatibility. Our checker helps you:</p>
          <ul>
            <li>Identify formatting issues that confuse ATS systems</li>
            <li>Highlight missing keywords from job descriptions</li>
            <li>Improve your resume's structure for better parsing</li>
            <li>Increase your chances of getting interviews</li>
          </ul>
        </div>

        <div className={styles.tipsCard}>
          <h3>ATS-Friendly Resume Tips</h3>
          <div className={styles.tipItem}>
            <div className={styles.tipNumber}>1</div>
            <p>Use standard section headings like "Work Experience" and "Skills"</p>
          </div>
          <div className={styles.tipItem}>
            <div className={styles.tipNumber}>2</div>
            <p>Avoid tables, columns, and graphics that ATS can't read</p>
          </div>
          <div className={styles.tipItem}>
            <div className={styles.tipNumber}>3</div>
            <p>Include keywords from the job description naturally</p>
          </div>
          <div className={styles.tipItem}>
            <div className={styles.tipNumber}>4</div>
            <p>Use simple, clean fonts like Arial or Times New Roman</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATS;