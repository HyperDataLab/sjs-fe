
import MuiBox from '@mui/material/Box';
import Logo from '../../../../shared/components/Logo';

const AuthLogo = () => {
  return (
    <MuiBox component="div" sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
      <Logo size={42} fontSize="1.35rem" />
    </MuiBox>
  );
};

export default AuthLogo;
