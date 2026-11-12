
import MuiBox from '@mui/material/Box';
// SuccessIcon.jsx
// Icon checkmark màu xanh lá — hiển thị khi kích hoạt thành công.
// Tách riêng để dễ thay icon sau này.

const SuccessIcon = () => {
  return (
    <MuiBox component="div" sx={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }} >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#e8f9ec',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Kích hoạt thành công"
        >
          <circle cx="12" cy="12" r="12" fill="#2FC646" fillOpacity="0.2" />
          <path
            d="M7 12.5L10.5 16L17 9"
            stroke="#2FC646"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </MuiBox>
  );
};

export default SuccessIcon;
