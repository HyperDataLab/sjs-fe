import Icon from '../Icon';
import { MotionButton } from '../ui/MotionBox';

const variantStyles = {
  primary: {
    backgroundColor: 'primary.main',
    border: '1px solid',
    borderColor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': {
      backgroundColor: 'primary.dark',
      borderColor: 'primary.dark',
      boxShadow: '0 4px 18px rgba(0, 113, 188, 0.22)',
    },
  },
  outline: {
    backgroundColor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    color: 'text.primary',
    '&:hover': {
      backgroundColor: 'primary.light',
      borderColor: 'primary.main',
      color: 'primary.main',
      boxShadow: '0 4px 18px rgba(0, 113, 188, 0.12)',
    },
  },
  destructive: {
    backgroundColor: 'error.main',
    border: '1px solid',
    borderColor: 'error.main',
    color: 'common.white',
    '&:hover': {
      backgroundColor: '#bb2d3b',
      borderColor: '#bb2d3b',
      boxShadow: '0 4px 18px rgba(220, 53, 69, 0.2)',
    },
  },
};

export default function PrimaryButton({
  children,
  icon = '',
  className = '',
  type = 'button',
  variant = 'primary',
  size: requestedSize,
  sx,
  disabled = false,
  ...props
}) {
  const muiVariant = variant === 'outline' ? 'outlined' : 'contained';
  const color = variant === 'destructive' ? 'error' : variant === 'outline' ? 'inherit' : 'primary';
  const size = requestedSize === 'sm' ? 'small' : requestedSize === 'lg' ? 'large' : requestedSize;

  return (
    <MotionButton
      type={type}
      variant={muiVariant}
      color={color}
      size={size}
      className={className}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { y: 0, scale: 0.99 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      sx={[
        {
          minHeight: 44,
          px: 2.4,
          gap: 0.75,
          borderRadius: '12px',
          fontFamily: 'inherit',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          '&.Mui-disabled': { opacity: 0.65 },
        },
        variantStyles[variant] ?? variantStyles.primary,
        sx,
      ]}
      {...props}
    >
      {icon && <Icon icon={icon} width="15" aria-hidden="true" />}
      {children}
    </MotionButton>
  );
}
