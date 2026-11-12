import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AlertBase from '@mui/material/Alert';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import BreadcrumbsBase from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import MenuBase from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Switch from '@mui/material/Switch';
import TableBase from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { combineSx, getClassNameSx, stripMappedClassNames } from '../../theme/classNameSx';


const FormContext = createContext({ controlId: undefined });
const ModalContext = createContext({ onHide: undefined });
const DropdownContext = createContext(null);
const OffcanvasContext = createContext({ onHide: undefined });
const NavContext = createContext({ activeKey: undefined, variant: undefined });

function joinClasses(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Container = forwardRef(function Container(
  { fluid = false, className, sx, ...props },
  ref,
) {
  return (
    <Box
      ref={ref}
      className={className}
      sx={[
        {
          width: '100%',
          maxWidth: fluid ? '100%' : { xs: '100%', sm: 540, md: 720, lg: 960, xl: 1140, '@media (min-width:1400px)': { maxWidth: 1320 } },
          mx: 'auto',
          px: { xs: 1.5, sm: 1.5 },
        },
        sx,
      ]}
      {...props}
    />
  );
});

export const Row = forwardRef(function Row({ className, sx, ...props }, ref) {
  return (
    <Box
      ref={ref}
      className={className}
      sx={[{ display: 'grid', gridTemplateColumns: 'repeat(12, minmax(0, 1fr))', width: '100%' }, sx]}
      {...props}
    />
  );
});

export const Col = forwardRef(function Col(
  { xs, sm, md, lg, xl, xxl, className, sx, ...props },
  ref,
) {
  const columnSx = { gridColumn: 'span 12' };
  for (const [breakpoint, width] of Object.entries({ xs, sm, md, lg, xl, xxl })) {
    if (width === undefined) continue;
    const span = width === true ? 12 : width;
    const sizeStyle = span === 'auto'
      ? { gridColumn: 'auto', justifySelf: 'start' }
      : { gridColumn: `span ${Math.min(Number(span), 12)}` };
    if (breakpoint === 'xs') Object.assign(columnSx, sizeStyle);
    else {
      const minWidth = { sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 }[breakpoint];
      columnSx[`@media (min-width:${minWidth}px)`] = sizeStyle;
    }
  }
  return <Box ref={ref} className={className} sx={[columnSx, sx]} {...props} />;
});

export const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', className, children, sx, ...props },
  ref,
) {
  const variants = {
    primary: 'contained',
    secondary: 'outlined',
    success: 'contained',
    danger: 'contained',
    warning: 'contained',
    info: 'contained',
    light: 'outlined',
    dark: 'contained',
    link: 'text',
    outline: 'outlined',
    'outline-primary': 'outlined',
    'outline-secondary': 'outlined',
    'outline-danger': 'outlined',
  };
  const color = ['success', 'error', 'warning', 'info', 'inherit'].includes(variant)
    ? variant
    : variant === 'danger'
      ? 'error'
      : variant === 'dark'
        ? 'secondary'
        : 'primary';
  const sxByVariant = {
    light: { color: 'text.primary', borderColor: 'divider', bgcolor: 'background.paper' },
    dark: { bgcolor: '#071a1c', '&:hover': { bgcolor: '#10292b' } },
    success: { bgcolor: '#2e7d32' },
    warning: { bgcolor: '#ed6c02' },
    info: { bgcolor: '#0288d1' },
  };
  return (
    <ButtonBase
      ref={ref}
      className={className}
      focusRipple
      sx={[
        {
          minWidth: 0,
          borderRadius: 1.5,
          px: size === 'sm' ? 1.25 : size === 'lg' ? 2.25 : 2,
          py: size === 'sm' ? 0.5 : size === 'lg' ? 1.25 : 0.75,
          font: 'inherit',
          fontSize: size === 'sm' ? '0.8125rem' : '0.875rem',
          fontWeight: 600,
          lineHeight: 1.5,
          border: variants[variant] === 'outlined' ? '1px solid' : '1px solid transparent',
          borderColor: variants[variant] === 'outlined' ? 'divider' : 'transparent',
          color: color === 'primary' ? '#fff' : undefined,
          bgcolor: variants[variant] === 'contained' ? 'primary.main' : 'transparent',
          '&:hover': {
            bgcolor: variants[variant] === 'contained' ? 'primary.dark' : 'action.hover',
          },
        },
        sxByVariant[variant],
        sx,
      ]}
      {...props}
    >
      {children}
    </ButtonBase>
  );
});

const FormRoot = forwardRef(function FormRoot(
  { className, ...props },
  ref,
) {
  return <Box ref={ref} component="form" className={className} {...props} />;
});

const FormGroup = forwardRef(function FormGroup(
  { controlId, className, sx, ...props },
  ref,
) {
  return (
    <FormContext.Provider value={{ controlId }}>
      <Box ref={ref} className={className} sx={[{ minWidth: 0 }, sx]} {...props} />
    </FormContext.Provider>
  );
});

const FormLabel = forwardRef(function FormLabel(
  { htmlFor, className, sx, ...props },
  ref,
) {
  const { controlId } = useContext(FormContext);
  return (
    <Typography
      ref={ref}
      component="label"
      htmlFor={htmlFor ?? controlId}
      className={className}
      sx={[{ display: 'inline-block', mb: 0.75, fontSize: '0.875rem', fontWeight: 500 }, sx]}
      {...props}
    />
  );
});

const FormControlInput = forwardRef(function FormControlInput(
  {
    as,
    type = 'text',
    size = 'md',
    isInvalid,
    isValid,
    max,
    className,
    id,
    rows,
    plaintext,
    sx,
    ...props
  },
  ref,
) {
  const { controlId } = useContext(FormContext);
  const multiline = as === 'textarea';
  return (
    <TextField
      ref={ref}
      id={id ?? controlId}
      type={multiline ? undefined : type}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      size={size === 'sm' ? 'small' : 'small'}
      error={Boolean(isInvalid)}
      className={stripMappedClassNames(joinClasses(className, isValid && 'is-valid', isInvalid && 'is-invalid'))}
      variant={plaintext ? 'standard' : 'outlined'}
      fullWidth
      inputProps={max === undefined ? undefined : { max }}
      {...props}
      sx={combineSx(
        getClassNameSx(joinClasses(className, isValid && 'is-valid', isInvalid && 'is-invalid')),
        { '& .MuiOutlinedInput-root': { borderRadius: 1.5 }, '& .MuiInputBase-input': { py: 1.1 } },
        sx,
      )}
    />
  );
});

const FormSelect = forwardRef(function FormSelect(
  { size = 'md', isInvalid, className, id, children, sx, ...props },
  ref,
) {
  const { controlId } = useContext(FormContext);
  return (
    <FormControl
      ref={ref}
      size="small"
      error={Boolean(isInvalid)}
      className={className}
      fullWidth
      sx={[{ '& .MuiNativeSelect-select': { borderRadius: 1.5, py: 1.1 } }, sx]}
    >
      <NativeSelect id={id ?? controlId} inputProps={{ ...props }}>
        {children}
      </NativeSelect>
    </FormControl>
  );
});

const FormCheck = forwardRef(function FormCheck(
  { type = 'checkbox', label, className, id, inline = false, reverse = false, sx, ...props },
  ref,
) {
  const control = type === 'switch'
    ? <Switch ref={ref} id={id} size="small" {...props} />
    : <Box ref={ref} component="input" type="checkbox" id={id} sx={{ accentColor: 'primary.main', width: 16, height: 16 }} {...props} />;
  if (!label) return <Box component="span" className={className} sx={sx}>{control}</Box>;
  return (
    <FormControlLabel
      className={className}
      label={label}
      labelPlacement={reverse ? 'start' : 'end'}
      control={control}
      sx={[{ display: inline ? 'inline-flex' : 'flex', m: 0, gap: 0.5 }, sx]}
    />
  );
});

const FormFeedback = forwardRef(function FormFeedback({ type = 'invalid', className, sx, ...props }, ref) {
  return (
    <FormHelperText
      ref={ref}
      error={type === 'invalid'}
      className={className}
      sx={[{ mx: 0, mt: 0.5 }, sx]}
      {...props}
    />
  );
});

const FormText = forwardRef(function FormText({ muted = true, className, ...props }, ref) {
  return <Typography ref={ref} component="small" color={muted ? 'text.secondary' : undefined} className={className} {...props} />;
});

export const Form = Object.assign(FormRoot, {
  Group: FormGroup,
  Label: FormLabel,
  Control: Object.assign(FormControlInput, { Feedback: FormFeedback }),
  Select: FormSelect,
  Check: FormCheck,
  Text: FormText,
});

const CardRoot = forwardRef(function CardRoot({ className, bg, text, border, sx, ...props }, ref) {
  const color = text === 'white' ? '#fff' : undefined;
  return (
    <Paper
      ref={ref}
      elevation={0}
      className={className}
      sx={[{
        overflow: 'hidden',
        border: border ? '1px solid' : '1px solid',
        borderColor: border || 'divider',
        borderRadius: 2,
        bgcolor: bg || 'background.paper',
        color,
      }, sx]}
      {...props}
    />
  );
});

const CardBody = forwardRef(function CardBody({ className, sx, ...props }, ref) {
  return <Box ref={ref} className={className} sx={[{ p: 2 }, sx]} {...props} />;
});
const CardHeader = forwardRef(function CardHeader({ className, sx, ...props }, ref) {
  return <Box ref={ref} className={className} sx={[{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }, sx]} {...props} />;
});
const CardFooter = forwardRef(function CardFooter({ className, sx, ...props }, ref) {
  return <Box ref={ref} className={className} sx={[{ p: 2, borderTop: '1px solid', borderColor: 'divider' }, sx]} {...props} />;
});
const CardTitle = forwardRef(function CardTitle({ className, ...props }, ref) {
  return <Typography ref={ref} component="h2" variant="h6" className={className} {...props} />;
});
const CardText = forwardRef(function CardText({ className, ...props }, ref) {
  return <Typography ref={ref} component="p" className={className} {...props} />;
});

export const Card = Object.assign(CardRoot, {
  Body: CardBody,
  Header: CardHeader,
  Footer: CardFooter,
  Title: CardTitle,
  Text: CardText,
});

export const Modal = Object.assign(
  function Modal({ show, onHide, centered = false, size, fullscreen, backdrop, keyboard = true, animation, scroll, dialogClassName, className, contentClassName, contentStyle, children, ...props }) {
    const handleClose = (event, reason) => {
      if (backdrop === 'static' && reason === 'backdropClick') return;
      if (!keyboard && reason === 'escapeKeyDown') return;
      onHide?.(event, reason);
    };
    return (
      <ModalContext.Provider value={{ onHide }}>
        <Dialog
          open={Boolean(show)}
          onClose={handleClose}
          fullWidth
          maxWidth={size === 'xl' ? 'xl' : size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'}
          fullScreen={Boolean(fullscreen)}
          hideBackdrop={backdrop === false}
          className={joinClasses(className, dialogClassName)}
          slotProps={{
            backdrop: { sx: { ...(backdrop === 'static' ? { pointerEvents: 'auto' } : {}) } },
            paper: {
              className: contentClassName,
              sx: {
                borderRadius: fullscreen ? 0 : 2.5,
                ...(centered ? { my: 3 } : {}),
                ...contentStyle,
              },
            },
          }}
          {...props}
        >
          {children}
        </Dialog>
      </ModalContext.Provider>
    );
  },
  {
    Header: forwardRef(function ModalHeader({ closeButton = false, className, children, sx, ...props }, ref) {
      const { onHide } = useContext(ModalContext);
      return (
        <DialogTitle ref={ref} className={className} sx={[{ display: 'flex', alignItems: 'center', gap: 1, px: 3, py: 2, fontWeight: 700 }, sx]} {...props}>
          <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>
          {closeButton && <IconButton aria-label="Close" onClick={onHide} size="small"><XMarkIcon width={20} height={20} /></IconButton>}
        </DialogTitle>
      );
    }),
    Title: forwardRef(function ModalTitle({ className, ...props }, ref) {
      return <Typography ref={ref} component="span" variant="h6" className={className} {...props} />;
    }),
    Body: forwardRef(function ModalBody({ className, sx, ...props }, ref) {
      return <DialogContent ref={ref} className={className} sx={[{ px: 3, py: 2, '&:first-of-type': { pt: 2 } }, sx]} {...props} />;
    }),
    Footer: forwardRef(function ModalFooter({ className, sx, ...props }, ref) {
      return <DialogActions className={className} sx={[{ px: 3, py: 2, gap: 1 }, sx]} {...props} />;
    }),
  },
);

const dropdownContextValue = (context) => context || { anchorEl: null, openMenu: () => {}, closeMenu: () => {}, onSelect: undefined };

export const Dropdown = Object.assign(
  function DropdownRoot({ children, onSelect, align, autoClose = true, className, show, sx, ...props }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const value = useMemo(() => ({
      anchorEl,
      align,
      autoClose,
      openMenu: (event) => setAnchorEl(event.currentTarget),
      closeMenu: () => setAnchorEl(null),
      onSelect,
    }), [anchorEl, align, autoClose, onSelect]);
    return <DropdownContext.Provider value={value}><Box className={className} sx={[{ display: 'inline-flex', position: 'relative' }, sx]} {...props}>{children}</Box></DropdownContext.Provider>;
  },
  {
    Toggle: forwardRef(function DropdownToggle({ children, onClick, variant, className, as, sx, ...props }, ref) {
      const { openMenu } = dropdownContextValue(useContext(DropdownContext));
      return <ButtonBase ref={ref} component={as === 'button' ? 'button' : undefined} className={className} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) openMenu(event); }} sx={[{ minWidth: 0, borderRadius: 1.5, font: 'inherit', ...(variant === 'light' ? { px: 1.5, py: 0.75, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' } : {}) }, sx]} {...props}>{children}</ButtonBase>;
    }),
    Menu: forwardRef(function DropdownMenu({ children, className, style, align, sx, ...props }, ref) {
      const context = dropdownContextValue(useContext(DropdownContext));
      const { anchorEl, closeMenu } = context;
      const alignment = align ?? context.align;
      return <MenuBase ref={ref} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu} anchorOrigin={{ vertical: 'bottom', horizontal: alignment === 'end' ? 'right' : 'left' }} transformOrigin={{ vertical: 'top', horizontal: alignment === 'end' ? 'right' : 'left' }} slotProps={{ paper: { className, style, sx: [{ mt: 0.5, minWidth: 180, borderRadius: 2, boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)' }, sx] } }} {...props}>{children}</MenuBase>;
    }),
    Item: forwardRef(function DropdownItem({ children, onClick, eventKey, className, ...props }, ref) {
      const context = dropdownContextValue(useContext(DropdownContext));
      return <MenuItem ref={ref} className={className} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented) context.onSelect?.(eventKey ?? event.currentTarget.textContent, event); if (context.autoClose === true || context.autoClose === 'inside') context.closeMenu(); }} {...props}>{children}</MenuItem>;
    }),
    Divider: forwardRef(function DropdownDivider(props, ref) {
      return <Box ref={ref} component="hr" sx={{ border: 0, borderTop: '1px solid', borderColor: 'divider', my: 0.5 }} {...props} />;
    }),
  },
);

export const Table = forwardRef(function Table({ responsive = false, striped, bordered, hover, size, className, children, sx, ...props }, ref) {
  const table = <TableBase ref={ref} size={size === 'sm' ? 'small' : 'medium'} className={className} sx={[{ ...(striped ? { '& tbody tr:nth-of-type(odd)': { bgcolor: 'action.hover' } } : {}), ...(hover ? { '& tbody tr:hover': { bgcolor: 'action.hover' } } : {}), ...(bordered ? { '& th, & td': { border: '1px solid', borderColor: 'divider' } } : {}) }, sx]} {...props}>{children}</TableBase>;
  return responsive ? <TableContainer sx={{ width: '100%' }}>{table}</TableContainer> : table;
});

export const Badge = forwardRef(function Badge({ bg = 'primary', pill = false, className, children, sx, ...props }, ref) {
  const color = bg === 'danger' ? 'error' : ['primary', 'secondary', 'success', 'error', 'warning', 'info'].includes(bg) ? bg : 'default';
  return <Chip ref={ref} label={children} color={color} size="small" className={className} sx={[{ borderRadius: pill ? 99 : 1, fontWeight: 600, ...(!['primary', 'secondary', 'success', 'error', 'warning', 'info'].includes(bg) ? { bgcolor: bg, color: '#fff' } : {}) }, sx]} {...props} />;
});

export const Spinner = forwardRef(function Spinner({ animation = 'border', size, variant = 'primary', className, ...props }, ref) {
  const dimension = size === 'sm' ? 18 : 28;
  return <CircularProgress ref={ref} size={dimension} color={variant === 'light' ? 'inherit' : variant === 'danger' ? 'error' : ['primary', 'secondary', 'success', 'error', 'warning', 'info'].includes(variant) ? variant : 'primary'} className={className} {...props} />;
});

export const InputGroup = Object.assign(
  forwardRef(function InputGroup({ className, size, sx, ...props }, ref) {
    return <Box ref={ref} className={className} sx={[{ display: 'flex', alignItems: 'stretch', width: '100%', '& > *:not(:first-of-type)': { ml: '-1px' }, '& > :first-of-type': { borderTopRightRadius: 0, borderBottomRightRadius: 0 }, '& > :last-of-type': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }, sx]} {...props} />;
  }),
  {
    Text: forwardRef(function InputGroupText({ className, sx, ...props }, ref) {
      return <Box ref={ref} className={className} sx={[{ display: 'inline-flex', alignItems: 'center', px: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: 'action.hover', color: 'text.secondary', whiteSpace: 'nowrap' }, sx]} {...props} />;
    }),
  },
);

export const Alert = forwardRef(function Alert({ variant = 'primary', dismissible, onClose, className, children, ...props }, ref) {
  const severity = variant === 'danger' ? 'error' : ['success', 'error', 'warning', 'info'].includes(variant) ? variant : 'info';
  return <AlertBase ref={ref} severity={severity} className={className} action={dismissible ? <IconButton size="small" onClick={onClose} aria-label="Close"><XMarkIcon width={18} /></IconButton> : undefined} {...props}>{children}</AlertBase>;
});

export const Nav = Object.assign(
  forwardRef(function NavRoot({ className, as = 'div', activeKey, variant, fill, justify, sx, ...props }, ref) {
    return <NavContext.Provider value={{ activeKey, variant }}><Box ref={ref} component={as} className={stripMappedClassNames(className)} sx={combineSx(getClassNameSx(className), { display: 'flex', flexWrap: 'wrap', alignItems: 'center', ...(variant === 'tabs' ? { borderBottom: '1px solid', borderColor: 'divider' } : {}), ...(fill ? { '& > *': { flex: 1 } } : {}), ...(justify === 'end' ? { justifyContent: 'flex-end' } : {}) }, sx)} {...props} /></NavContext.Provider>;
  }),
  {
    Item: forwardRef(function NavItem({ className, ...props }, ref) { return <Box ref={ref} component="div" className={className} {...props} />; }),
    Link: forwardRef(function NavLink({ active, activeKey, eventKey, href, onClick, className, children, sx, ...props }, ref) {
      const nav = useContext(NavContext);
      const isActive = active ?? ((activeKey ?? nav.activeKey) != null && (activeKey ?? nav.activeKey) === eventKey);
      return <Link ref={ref} component={href ? 'a' : 'button'} href={href} underline="none" className={stripMappedClassNames(joinClasses(className, isActive && 'Mui-selected'))} onClick={onClick} sx={combineSx(getClassNameSx(className), { display: 'inline-flex', alignItems: 'center', color: isActive ? 'primary.main' : 'text.secondary', px: 1.25, py: 0.75, font: 'inherit', cursor: 'pointer', ...(isActive ? { fontWeight: 600 } : {}) }, sx)} {...props}>{children}</Link>;
    }),
  },
);

export const Breadcrumb = Object.assign(
  forwardRef(function BreadcrumbRoot({ className, children, sx, ...props }, ref) {
    return <BreadcrumbsBase ref={ref} aria-label="breadcrumb" className={className} sx={[{ fontSize: '0.875rem' }, sx]} {...props}>{children}</BreadcrumbsBase>;
  }),
  {
    Item: forwardRef(function BreadcrumbItem({ active = false, href, onClick, linkProps, className, children, sx, ...props }, ref) {
      if (active) {
        return <Typography ref={ref} component="span" aria-current="page" className={className} sx={[{ color: 'text.primary' }, sx]} {...props}>{children}</Typography>;
      }
      return <Link ref={ref} component={href ? 'a' : 'button'} href={href} onClick={onClick} underline="hover" color="inherit" className={className} sx={sx} {...linkProps} {...props}>{children}</Link>;
    }),
  },
);

export const ListGroup = Object.assign(
  forwardRef(function ListGroupRoot({ className, flush, sx, ...props }, ref) {
    return <Box ref={ref} component="ul" className={className} sx={[{ listStyle: 'none', p: 0, m: 0, ...(flush ? {} : { border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }) }, sx]} {...props} />;
  }),
  {
    Item: forwardRef(function ListGroupItem({ action, active, className, sx, ...props }, ref) {
      return <Box ref={ref} component={action ? 'button' : 'li'} className={className} sx={[{ display: 'block', width: '100%', p: 1.5, borderBottom: '1px solid', borderColor: 'divider', textAlign: 'left', bgcolor: active ? 'action.selected' : 'background.paper', color: 'text.primary', '&:last-child': { borderBottom: 0 } }, sx]} {...props} />;
    }),
  },
);

export const ProgressBar = forwardRef(function ProgressBar({ now = 0, min = 0, max = 100, variant, className, ...props }, ref) {
  const value = ((now - min) / (max - min || 1)) * 100;
  return <LinearProgress ref={ref} variant="determinate" value={value} className={className} color={variant === 'success' ? 'success' : variant === 'danger' ? 'error' : 'primary'} {...props} />;
});

export const Navbar = Object.assign(
  forwardRef(function NavbarRoot({ className, fixed, sticky, expand, sx, ...props }, ref) {
    return <Box ref={ref} component="header" className={className} sx={[{ position: fixed ? 'fixed' : sticky ? 'sticky' : 'relative', top: 0, zIndex: fixed ? 1100 : 'auto', width: '100%', display: 'flex', alignItems: 'center' }, sx]} {...props} />;
  }),
  {
    Brand: forwardRef(function NavbarBrand({ className, sx, ...props }, ref) { return <Box ref={ref} component="a" className={className} sx={[{ display: 'inline-flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }, sx]} {...props} />; }),
    Collapse: forwardRef(function NavbarCollapse({ className, sx, ...props }, ref) { return <Box ref={ref} className={className} sx={[{ flexGrow: 1, alignItems: 'center' }, sx]} {...props} />; }),
    Toggle: forwardRef(function NavbarToggle({ className, sx, ...props }, ref) { return <ButtonBase ref={ref} className={className} sx={[{ display: { xs: 'inline-flex', md: 'none' }, p: 1 }, sx]} {...props} />; }),
  },
);

export const Offcanvas = Object.assign(
  function OffcanvasRoot({ show, onHide, placement = 'start', className, children, ...props }) {
    return <OffcanvasContext.Provider value={{ onHide }}><Dialog open={Boolean(show)} onClose={onHide} fullScreen maxWidth={false} className={className} PaperProps={{ sx: { position: 'fixed', m: 0, ...(placement === 'end' ? { right: 0, left: 'auto' } : { left: 0, right: 'auto' }), top: 0, bottom: 0, width: { xs: '86vw', sm: 360 }, maxWidth: '100%', borderRadius: 0 } }} {...props}>{children}</Dialog></OffcanvasContext.Provider>;
  },
  {
    Header: forwardRef(function OffcanvasHeader({ closeButton = false, className, children, sx, ...props }, ref) {
      const { onHide } = useContext(OffcanvasContext);
      return <DialogTitle ref={ref} className={className} sx={[{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, sx]} {...props}>{children}{closeButton && <IconButton onClick={onHide} aria-label="Close"><XMarkIcon width={20} /></IconButton>}</DialogTitle>;
    }),
    Title: forwardRef(function OffcanvasTitle({ className, ...props }, ref) { return <Typography ref={ref} variant="h6" className={className} {...props} />; }),
    Body: forwardRef(function OffcanvasBody({ className, sx, ...props }, ref) { return <Box ref={ref} className={className} sx={[{ p: 2, overflowY: 'auto' }, sx]} {...props} />; }),
  },
);

const ToastBody = forwardRef(function ToastBody({ className, ...props }, ref) { return <Box ref={ref} className={className} {...props} />; });
export const Toast = Object.assign(
  function ToastRoot({ show, autohide, delay = 5000, onClose, className, style, children, animation = true, sx, ...props }) {
    useEffect(() => {
      if (!show || !autohide) return undefined;
      const timer = setTimeout(() => onClose?.(), delay);
      return () => clearTimeout(timer);
    }, [show, autohide, delay, onClose]);
    return <Snackbar open={Boolean(show)} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transitionDuration={animation ? undefined : 0} sx={{ zIndex: 1400 }}><Paper elevation={4} className={className} style={style} sx={[{ minWidth: 280, maxWidth: 'calc(100vw - 32px)', borderRadius: 2, overflow: 'hidden' }, sx]} {...props}>{children}</Paper></Snackbar>;
  },
  { Body: ToastBody },
);
export function ToastContainer({ children, className, style, sx }) {
  return <Box className={className} style={style} sx={[{ position: 'fixed', top: 0, right: 0, zIndex: 1400 }, sx]}>{children}</Box>;
}

export const InputGroupTextAdornment = InputAdornment;
