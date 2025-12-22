import React, { useState } from 'react';

const PdfViewer = ({ pdfUrl, title, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const openInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="pdf-viewer-overlay">
      <div className="pdf-viewer-modal glass-panel">
        <div className="pdf-viewer-header">
          <h3 className="pdf-title">{title}</h3>
          <div className="pdf-actions">
            <button className="glass-button" onClick={openInNewTab}>
              Open in New Tab
            </button>
            <button className="glass-button close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>
        <div className="pdf-viewer-content">
          {isLoading && (
            <div className="pdf-loading">
              <div className="loading-spinner"></div>
              <span>Loading PDF...</span>
            </div>
          )}
          <iframe
            src={pdfUrl}
            title={title}
            className="pdf-iframe"
            onLoad={handleLoad}
            style={{ display: isLoading ? 'none' : 'block' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;