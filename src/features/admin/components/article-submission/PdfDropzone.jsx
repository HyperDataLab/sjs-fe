import { useTranslation } from "react-i18next";
import { useState, useRef } from 'react';
import { Button, Alert, ProgressBar } from '@/shared/components/ui/muiAdapters';
import Icon from '../../../../shared/components/Icon';
import { getClassNameSx, stripMappedClassNames } from '../../../../shared/theme/classNameSx';

import MuiBox from '@mui/material/Box';


/**
 * PdfDropzone Component
 * Interactive drag-and-drop zone for uploading PDF manuscripts.
 *
 * @param {Object} props - Props
 * @param {File} props.selectedFile - Current selected File object
 * @param {function} props.onFileSelect - Callback when valid file is selected
 * @param {function} props.onFileRemove - Callback when selected file is removed
 */
export default function PdfDropzone({
  selectedFile,
  onFileSelect,
  onFileRemove
}) {
  const {
    t
  } = useTranslation();
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Maximum allowed file size: 25MB
  const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

  /**
   * Validate file type and size.
   */
  const validateAndProcessFile = file => {
    setError('');
    if (!file) return;

    // Validate type (must be PDF)
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setError('Only PDF manuscripts are accepted.');
      return;
    }

    // Validate size (max 25MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError('File size exceeds the 25MB limit. Please upload a compressed version.');
      return;
    }

    // Pass up to parent
    onFileSelect(file);
  };

  /**
   * Handle drag events.
   */
  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  /**
   * Handle drop event.
   */
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  /**
   * Handle manual input selection change.
   */
  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  /**
   * Trigger click on hidden input element.
   */
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  /**
   * Format bytes to readable string (e.g. KB, MB).
   */
  const formatBytes = bytes => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  return <MuiBox component="div" sx={{ width: "100%" }} >
      {error && <Alert sx={{ paddingTop: "0.5rem", paddingBottom: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem", fontSize: "0.875em", border: 0, marginBottom: "1rem", borderRadius: "0.5rem" }} variant="danger" >
          {error}
        </Alert>}

      {/* Hidden native input file */}
      <MuiBox component="input" sx={{ display: "none" }} type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,application/pdf"  />

      {!selectedFile ?
    // Dropzone Area
    <MuiBox component="div" sx={getClassNameSx(`d-flex flex-column align-items-center justify-content-center p-5 rounded-4 premium-dropzone ${isDragActive ? 'drag-active' : ''}`)} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} onClick={triggerFileInput} className={stripMappedClassNames(`d-flex flex-column align-items-center justify-content-center p-5 rounded-4 premium-dropzone ${isDragActive ? 'drag-active' : ''}`)}>
          {/* Cloud Upload Icon */}
          <MuiBox component="div" sx={{ borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }} className="premium-dropzone-icon-wrapper">
            <Icon icon="lucide:cloud-upload" width="28" />
          </MuiBox>

          <MuiBox component="h5" sx={{ fontWeight: 700 }} className="text-main mb-1.5" style={{
        fontFamily: 'var(--font-display)'
      }}>
            Click to upload or drag and drop
          </MuiBox>
          <MuiBox component="p" sx={{ fontSize: "0.875em", marginBottom: "1.5rem" }} className="text-muted-custom">PDF files only (max. 25MB)</MuiBox>

          <Button sx={{ paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", borderRadius: "50rem" }} type="button" className="premium-dropzone-btn" onClick={e => {
        e.stopPropagation();
        triggerFileInput();
      }}>
            Browse Files
          </Button>
        </MuiBox> :
    // Selected File Display panel
    <MuiBox component="div" sx={{ padding: "1.5rem", borderRadius: "0.75rem", border: "1px solid #dee2e6", bgcolor: "background.paper" }} >
          <MuiBox component="div" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
            <MuiBox component="div" sx={{ display: "flex", alignItems: "center", gap: "1rem" }} >
              {/* PDF Document Icon */}
              <MuiBox component="div" sx={{ borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}  style={{
            width: '46px',
            height: '46px',
            backgroundColor: '#fee2e2',
            color: '#ef4444'
          }}>
                <Icon icon="lucide:file-text" width="24" />
              </MuiBox>
              <div>
                <MuiBox component="div" sx={{ fontWeight: 700, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }} className="text-main" style={{
              maxWidth: '280px',
              fontSize: '0.925rem'
            }}>
                  {selectedFile.name}
                </MuiBox>
                <MuiBox component="div" sx={{ fontSize: "0.875em" }} className="text-muted-custom">
                  {formatBytes(selectedFile.size)}{t("admin.aPdfDocument")}</MuiBox>
              </div>
            </MuiBox>

            {/* Remove File button */}
            <MuiBox component="button" sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", px: "0.75rem", py: "0.375rem", border: 0, borderRadius: "50%", fontSize: "1rem", fontWeight: 400, lineHeight: 1.5, cursor: "pointer", textDecoration: "none", bgcolor: "transparent", color: "primary.main" }} type="button" onClick={e => {
          e.stopPropagation();
          onFileRemove();
        }} className="p-1.5 text-muted-custom hover-danger" style={{
          width: '36px',
          height: '36px'
        }} title="Remove File">
              <Icon icon="lucide:trash" width="18" />
            </MuiBox>
          </MuiBox>

          {/* Submission status */}
          <MuiBox component="div" sx={{ marginTop: "1.5rem", paddingTop: "0.5rem", borderTop: "1px solid #dee2e6" }} >
            <MuiBox component="div" sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.875em" }} className="text-muted-custom mb-1.5">
              <span>{t("admin.chuaCoApiUploadPdfArticleDaXoa")}</span>
              <MuiBox component="span" sx={{ fontWeight: 600 }}  style={{
            color: 'var(--primary)'
          }}>N/A</MuiBox>
            </MuiBox>
            <ProgressBar now={0} sx={{ height: 4, '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' } }} />
          </MuiBox>
        </MuiBox>}
    </MuiBox>;
}
