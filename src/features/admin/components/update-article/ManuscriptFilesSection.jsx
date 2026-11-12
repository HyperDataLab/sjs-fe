import ManuscriptFileItem from '../shared/ManuscriptFileItem';


import MuiBox from '@mui/material/Box';


export default function ManuscriptFilesSection({ files }) {
  return (
    <div className="admin-card admin-form-section">
      <MuiBox component="h3" sx={{ marginBottom: "1rem" }} className="admin-card__title">Manuscript Files</MuiBox>

      <div className="admin-file-list">
        {files.map((file) => (
          <ManuscriptFileItem
            key={file.id}
            name={file.name}
            type={file.type}
            size={file.size}
            uploadedAt={file.uploadedAt}
          />
        ))}
      </div>
    </div>
  );
}
