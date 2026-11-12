import { alpha } from '@mui/material/styles';

const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '1rem',
  4: '1.5rem',
  5: '3rem',
};

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

const colors = {
  primary: 'primary.main',
  secondary: '#6c757d',
  success: 'success.main',
  danger: 'error.main',
  warning: 'warning.main',
  info: 'info.main',
  light: '#f8f9fa',
  dark: '#212529',
  white: '#fff',
  black: '#000',
  muted: 'text.secondary',
};

const utilityTokens = new Map();
const utilitySxCache = new Map();

function add(token, style) {
  utilityTokens.set(token, style);
}

function spacingValue(value) {
  if (value === 'auto') return 'auto';
  if (value.startsWith('n')) {
    const base = spacing[value.slice(1)];
    return base ? `-${base}` : undefined;
  }
  return spacing[value];
}

function spacingUtility(token) {
  const match = token.match(/^(-?)(m|p)([xytbse]?)-(.+)$/);
  if (!match) return undefined;
  const [, negative, kind, axis, rawValue] = match;
  const value = spacingValue(`${negative ? 'n' : ''}${rawValue}`);
  if (value === undefined) return undefined;
  const prop = kind === 'm' ? 'margin' : 'padding';
  const styles = {};
  const axes = {
    '': [prop],
    x: [`${prop}Left`, `${prop}Right`],
    y: [`${prop}Top`, `${prop}Bottom`],
    t: [`${prop}Top`],
    b: [`${prop}Bottom`],
    s: [kind === 'm' ? 'marginInlineStart' : 'paddingInlineStart'],
    e: [kind === 'm' ? 'marginInlineEnd' : 'paddingInlineEnd'],
  };
  for (const property of axes[axis] || []) styles[property] = value;
  return styles;
}

function getBaseUtility(token) {
  if (utilityTokens.has(token)) return utilityTokens.get(token);

  const spacingStyles = spacingUtility(token);
  if (spacingStyles) return spacingStyles;

  let match = token.match(/^(min-vh|vh|vw|w|h)-(.+)$/);
  if (match) {
    const [, kind, value] = match;
    const amounts = { 25: '25%', 50: '50%', 75: '75%', 100: '100%', auto: 'auto' };
    if (kind === 'min-vh' && value === '100') return { minHeight: '100vh' };
    if (kind === 'vh') return { height: `${value}vh` };
    if (kind === 'vw') return { width: `${value}vw` };
    if (amounts[value]) return { [kind === 'w' ? 'width' : 'height']: amounts[value] };
  }

  match = token.match(/^(gap|row-gap|column-gap)-([0-5])$/);
  if (match) {
    const [, kind, value] = match;
    return { [kind === 'gap' ? 'gap' : kind === 'row-gap' ? 'rowGap' : 'columnGap']: spacing[value] };
  }

  match = token.match(/^g([xy])?-([0-5])$/);
  if (match) {
    const [, axis, value] = match;
    return axis === 'x'
      ? { columnGap: spacing[value] }
      : axis === 'y'
        ? { rowGap: spacing[value] }
        : { gap: spacing[value] };
  }

  match = token.match(/^col(?:-(sm|md|lg|xl|xxl))?-(\d{1,2})$/);
  if (match) {
    const [, breakpoint, columns] = match;
    const span = Math.min(Number(columns), 12);
    const styles = { gridColumn: `span ${span}` };
    return breakpoint
      ? { [`@media (min-width:${breakpoints[breakpoint]}px)`]: styles }
      : styles;
  }

  match = token.match(/^col(?:-(sm|md|lg|xl|xxl))?-(auto)$/);
  if (match) {
    const [, breakpoint] = match;
    const style = { gridColumn: 'auto', justifySelf: 'start' };
    return breakpoint
      ? { [`@media (min-width:${breakpoints[breakpoint]}px)`]: style }
      : style;
  }
  if (token === 'col') return { gridColumn: 'span 12' };

  match = token.match(/^(d|flex|justify-content|align-items|align-self|text|border|rounded|shadow|opacity|z|overflow|overflow-x|overflow-y|position|top|bottom|start|end|fs|lh|fw|float|order)-(.+)$/);
  if (!match) return undefined;
  const [, kind, value] = match;

  if (kind === 'd') {
    const display = { none: 'none', inline: 'inline', 'inline-block': 'inline-block', block: 'block', grid: 'grid', flex: 'flex', 'inline-flex': 'inline-flex' }[value];
    return display ? { display } : undefined;
  }
  if (kind === 'flex') {
    if (['row', 'row-reverse', 'column', 'column-reverse'].includes(value)) return { flexDirection: value };
    if (['wrap', 'nowrap', 'wrap-reverse'].includes(value)) return { flexWrap: value };
    if (value === 'fill') return { flex: '1 1 auto' };
    if (value === 'grow-1') return { flexGrow: 1 };
    if (value === 'shrink-0') return { flexShrink: 0 };
    return undefined;
  }
  if (kind === 'justify-content') {
    const map = { start: 'flex-start', end: 'flex-end', center: 'center', between: 'space-between', around: 'space-around', evenly: 'space-evenly' };
    return map[value] ? { justifyContent: map[value] } : undefined;
  }
  if (kind === 'align-items') {
    const map = { start: 'flex-start', end: 'flex-end', center: 'center', baseline: 'baseline', stretch: 'stretch' };
    return map[value] ? { alignItems: map[value] } : undefined;
  }
  if (kind === 'align-self') {
    const map = { start: 'flex-start', end: 'flex-end', center: 'center', baseline: 'baseline', stretch: 'stretch' };
    return map[value] ? { alignSelf: map[value] } : undefined;
  }
  if (kind === 'text') {
    const align = { start: 'left', center: 'center', end: 'right' }[value];
    if (align) return { textAlign: align };
    if (colors[value]) return { color: colors[value] };
    if (value === 'white-50') return { color: 'rgba(255,255,255,.5)' };
    if (value === 'black-50') return { color: 'rgba(0,0,0,.5)' };
    if (value === 'wrap') return { whiteSpace: 'normal', overflowWrap: 'break-word' };
    if (value === 'nowrap') return { whiteSpace: 'nowrap' };
    if (value === 'break') return { overflowWrap: 'break-word' };
    if (value === 'truncate') return { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
    if (['lowercase', 'uppercase', 'capitalize'].includes(value)) return { textTransform: value };
    if (value === 'reset') return { color: 'inherit', textDecoration: 'none' };
    return undefined;
  }
  if (kind === 'border') {
    const side = { top: 'Top', bottom: 'Bottom', start: 'InlineStart', end: 'InlineEnd' }[value];
    if (side) return { [`border${side}`]: '1px solid #dee2e6' };
    if (value === '0') return { border: 0 };
    if (value === '1') return { borderWidth: 1, borderStyle: 'solid' };
    if (value === '2') return { borderWidth: 2, borderStyle: 'solid' };
    if (value === '3') return { borderWidth: 3, borderStyle: 'solid' };
    if (value === '4') return { borderWidth: 4, borderStyle: 'solid' };
    if (value === '5') return { borderWidth: 5, borderStyle: 'solid' };
    if (colors[value]) return { borderColor: colors[value] };
    if (value === 'transparent') return { borderColor: 'transparent' };
    return undefined;
  }
  if (kind === 'rounded') {
    const radius = { 0: 0, 1: '0.25rem', 2: '0.375rem', 3: '0.5rem', 4: '0.75rem', 5: '1rem', circle: '50%', pill: '50rem', 'top': '0.375rem 0.375rem 0 0', 'bottom': '0 0 0.375rem 0.375rem', start: '0.375rem 0 0 0.375rem', end: '0 0.375rem 0.375rem 0' }[value];
    return radius !== undefined ? { borderRadius: radius } : undefined;
  }
  if (kind === 'shadow') {
    const shadows = { none: 'none', sm: '0 .125rem .25rem rgba(0,0,0,.075)', '': '0 .5rem 1rem rgba(0,0,0,.15)', lg: '0 1rem 3rem rgba(0,0,0,.175)' };
    return Object.hasOwn(shadows, value) ? { boxShadow: shadows[value] } : undefined;
  }
  if (kind === 'opacity') return /^\d+$/.test(value) ? { opacity: Number(value) / 100 } : undefined;
  if (kind === 'z') return /^\d+$/.test(value) ? { zIndex: Number(value) } : undefined;
  if (kind === 'overflow' || kind === 'overflow-x' || kind === 'overflow-y') {
    const map = { auto: 'auto', hidden: 'hidden', visible: 'visible', scroll: 'scroll' };
    const property = kind === 'overflow' ? 'overflow' : kind === 'overflow-x' ? 'overflowX' : 'overflowY';
    return map[value] ? { [property]: map[value] } : undefined;
  }
  if (kind === 'position') return ['static', 'relative', 'absolute', 'fixed', 'sticky'].includes(value) ? { position: value } : undefined;
  if (['top', 'bottom', 'start', 'end'].includes(kind)) {
    const map = { 0: '0', 50: '50%', 100: '100%' };
    if (map[value] === undefined) return undefined;
    const property = { top: 'top', bottom: 'bottom', start: 'left', end: 'right' }[kind];
    return { [property]: map[value] };
  }
  if (kind === 'fs') {
    const sizes = { 1: '2.5rem', 2: '2rem', 3: '1.75rem', 4: '1.5rem', 5: '1.25rem', 6: '1rem' };
    return sizes[value] ? { fontSize: sizes[value] } : undefined;
  }
  if (kind === 'lh') {
    const values = { 1: 1, sm: 1.25, base: 1.5, lg: 2 };
    return values[value] ? { lineHeight: values[value] } : undefined;
  }
  if (kind === 'fw') {
    const values = { light: 300, lighter: 300, normal: 400, medium: 500, semibold: 600, bold: 700, bolder: 800 };
    return values[value] ? { fontWeight: values[value] } : undefined;
  }
  if (kind === 'float') return { float: value === 'start' ? 'left' : value === 'end' ? 'right' : 'none' };
  if (kind === 'order') return /^\d+$/.test(value) ? { order: Number(value) } : undefined;
  return undefined;
}

function mergeStyles(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      target[key] = mergeStyles(target[key] || {}, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

export function getClassNameSx(className) {
  const tokens = flattenClassNames(className);
  const cacheKey = tokens.join(' ');
  if (utilitySxCache.has(cacheKey)) return utilitySxCache.get(cacheKey);

  const styles = {};
  let backgroundOpacity;
  let backgroundColor;
  let borderOpacity;
  let borderColor;
  for (const token of tokens) {
    let breakpoint;
    let utility = token;
    const columnResponsive = token.match(/^col-(sm|md|lg|xl|xxl)-(\d{1,2}|auto)$/);
    if (columnResponsive) {
      breakpoint = columnResponsive[1];
      utility = `col-${columnResponsive[2]}`;
    }
    const responsive = columnResponsive ? null : token.match(/^(.+)-(sm|md|lg|xl|xxl)-(.+)$/);
    if (responsive) {
      const [, prefix, screen, suffix] = responsive;
      utility = `${prefix}-${suffix}`;
      breakpoint = screen;
    } else if (!columnResponsive) {
      const prefixResponsive = token.match(/^(sm|md|lg|xl|xxl)-(.+)$/);
      if (prefixResponsive) [, breakpoint, utility] = prefixResponsive;
    }
    const style = getBaseUtility(utility);
    if (!style) continue;
    const bgOpacity = utility.match(/^bg-opacity-(\d+)$/);
    const borderAlpha = utility.match(/^border-opacity-(\d+)$/);
    if (bgOpacity) {
      backgroundOpacity = Number(bgOpacity[1]) / 100;
      continue;
    }
    if (borderAlpha) {
      borderOpacity = Number(borderAlpha[1]) / 100;
      continue;
    }
    if (style.bgcolor !== undefined) backgroundColor = style.bgcolor;
    if (style.borderColor !== undefined) borderColor = style.borderColor;
    if (breakpoint) {
      const media = `@media (min-width:${breakpoints[breakpoint]}px)`;
      styles[media] = mergeStyles(styles[media] || {}, style);
    } else {
      mergeStyles(styles, style);
    }
  }
  if (backgroundOpacity !== undefined && backgroundColor !== undefined) {
    styles.bgcolor = (theme) => {
      const resolvedColor = typeof backgroundColor === 'string' && backgroundColor.includes('.')
        ? backgroundColor.split('.').reduce((value, key) => value?.[key], theme.palette)
        : backgroundColor;
      return alpha(resolvedColor, backgroundOpacity);
    };
  }
  if (borderOpacity !== undefined && borderColor !== undefined) {
    styles.borderColor = (theme) => {
      const resolvedColor = typeof borderColor === 'string' && borderColor.includes('.')
        ? borderColor.split('.').reduce((value, key) => value?.[key], theme.palette)
        : borderColor;
      return alpha(resolvedColor, borderOpacity);
    };
  }
  utilitySxCache.set(cacheKey, styles);
  return styles;
}

export function flattenClassNames(value, result = []) {
  if (!value) return result;
  if (typeof value === 'string' || typeof value === 'number') {
    result.push(...String(value).split(/\s+/).filter(Boolean));
  } else if (Array.isArray(value)) {
    value.forEach((item) => flattenClassNames(item, result));
  } else if (typeof value === 'object') {
    Object.entries(value).forEach(([className, enabled]) => enabled && result.push(className));
  }
  return result;
}

export function stripMappedClassNames(className) {
  const tokens = flattenClassNames(className);
  return tokens.filter((token) => {
    if (/^(bg|border)-opacity-\d+$/.test(token)) return false;
    return !Object.keys(getClassNameSx(token)).length;
  }).join(' ');
}

export function combineSx(...values) {
  return values.flat().filter(Boolean);
}

const simpleUtilities = {
  'visually-hidden': { position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 },
  invisible: { visibility: 'hidden' },
  visible: { visibility: 'visible' },
  'pointer-events-none': { pointerEvents: 'none' },
  'text-decoration-none': { textDecoration: 'none' },
  'text-decoration-underline': { textDecoration: 'underline' },
  'font-monospace': { fontFamily: 'monospace' },
  'fst-italic': { fontStyle: 'italic' },
  'border-top-0': { borderTop: 0 },
  'border-bottom-0': { borderBottom: 0 },
  'border-start-0': { borderInlineStart: 0 },
  'border-end-0': { borderInlineEnd: 0 },
  'border-light-subtle': { borderColor: '#dee2e6' },
  'border-warning-subtle': { borderColor: '#ffecb5' },
  'bg-transparent': { bgcolor: 'transparent' },
  'bg-white': { bgcolor: 'background.paper' },
  'bg-light': { bgcolor: '#f8f9fa' },
  'bg-dark': { bgcolor: '#212529', color: '#fff' },
  'bg-primary': { bgcolor: 'primary.main', color: 'primary.contrastText' },
  'bg-secondary': { bgcolor: '#6c757d', color: '#fff' },
  'bg-success': { bgcolor: 'success.main', color: '#fff' },
  'bg-danger': { bgcolor: 'error.main', color: '#fff' },
  'bg-warning': { bgcolor: 'warning.main' },
  'bg-info': { bgcolor: 'info.main' },
  'bg-opacity-10': {},
  'bg-opacity-25': {},
  'bg-opacity-50': {},
  'bg-opacity-75': {},
  'bg-opacity-100': {},
  'bg-success-subtle': { bgcolor: 'rgba(25,135,84,.12)' },
  'bg-warning-subtle': { bgcolor: 'rgba(255,193,7,.18)' },
  'bg-info-subtle': { bgcolor: 'rgba(13,202,240,.18)' },
  'border-opacity-10': {},
  'border-success-20': { borderColor: 'rgba(25,135,84,.2)' },
  'border-warning-20': { borderColor: 'rgba(255,193,7,.2)' },
  'text-white': { color: '#fff' },
  'text-white-50': { color: 'rgba(255,255,255,.5)' },
  'text-dark': { color: '#212529' },
  'text-muted': { color: 'text.secondary' },
  'text-primary': { color: 'primary.main' },
  'text-secondary': { color: '#6c757d' },
  'text-success': { color: 'success.main' },
  'text-danger': { color: 'error.main' },
  'text-warning': { color: 'warning.main' },
  'text-info': { color: 'info.main' },
  'text-center': { textAlign: 'center' },
  'text-start': { textAlign: 'left' },
  'text-end': { textAlign: 'right' },
  'text-uppercase': { textTransform: 'uppercase' },
  'text-lowercase': { textTransform: 'lowercase' },
  'text-capitalize': { textTransform: 'capitalize' },
  'text-nowrap': { whiteSpace: 'nowrap' },
  'text-truncate': { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
  'd-flex': { display: 'flex' },
  'd-inline-flex': { display: 'inline-flex' },
  'd-grid': { display: 'grid' },
  'd-block': { display: 'block' },
  'd-inline-block': { display: 'inline-block' },
  'd-inline': { display: 'inline' },
  'd-none': { display: 'none' },
  'flex-column': { flexDirection: 'column' },
  'flex-row': { flexDirection: 'row' },
  'flex-wrap': { flexWrap: 'wrap' },
  'flex-nowrap': { flexWrap: 'nowrap' },
  'flex-grow-1': { flexGrow: 1 },
  'flex-shrink-0': { flexShrink: 0 },
  'flex-fill': { flex: '1 1 auto' },
  'justify-content-center': { justifyContent: 'center' },
  'justify-content-between': { justifyContent: 'space-between' },
  'justify-content-end': { justifyContent: 'flex-end' },
  'justify-content-start': { justifyContent: 'flex-start' },
  'justify-content-around': { justifyContent: 'space-around' },
  'align-items-center': { alignItems: 'center' },
  'align-items-start': { alignItems: 'flex-start' },
  'align-items-end': { alignItems: 'flex-end' },
  'align-items-stretch': { alignItems: 'stretch' },
  'align-middle': { verticalAlign: 'middle' },
  'mx-auto': { mx: 'auto' },
  'my-auto': { my: 'auto' },
  'mt-auto': { mt: 'auto' },
  'ms-auto': { ml: 'auto' },
  'me-auto': { mr: 'auto' },
  'w-100': { width: '100%' },
  'w-75': { width: '75%' },
  'w-50': { width: '50%' },
  'w-25': { width: '25%' },
  'h-100': { height: '100%' },
  'min-vh-100': { minHeight: '100vh' },
  'overflow-hidden': { overflow: 'hidden' },
  'overflow-auto': { overflow: 'auto' },
  'overflow-y-auto': { overflowY: 'auto' },
  'overflow-x-hidden': { overflowX: 'hidden' },
  'overflow-x-auto': { overflowX: 'auto' },
  'position-relative': { position: 'relative' },
  'position-absolute': { position: 'absolute' },
  'position-fixed': { position: 'fixed' },
  'position-sticky': { position: 'sticky' },
  'start-50': { left: '50%' },
  'top-50': { top: '50%' },
  'translate-middle-x': { left: '50%', translate: '-50% 0' },
  'translate-middle-y': { top: '50%', translate: '0 -50%' },
  'translate-middle': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  'fw-bold': { fontWeight: 700 },
  'fw-bolder': { fontWeight: 800 },
  'fw-semibold': { fontWeight: 600 },
  'fw-medium': { fontWeight: 500 },
  'fw-normal': { fontWeight: 400 },
  'fw-light': { fontWeight: 300 },
  'small': { fontSize: '0.875em' },
  'form-label': { display: 'inline-block', marginBottom: '0.5rem' },
  'form-text': { display: 'block', marginTop: '0.25rem', fontSize: '0.875em', color: 'text.secondary' },
  h3: { fontSize: '1.75rem', fontWeight: 500, lineHeight: 1.2 },
  h4: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.2 },
  h5: { fontSize: '1.25rem', fontWeight: 500, lineHeight: 1.2 },
  h6: { fontSize: '1rem', fontWeight: 500, lineHeight: 1.2 },
  'lh-sm': { lineHeight: 1.25 },
  'lh-base': { lineHeight: 1.5 },
  'lh-lg': { lineHeight: 2 },
  'shadow-sm': { boxShadow: '0 .125rem .25rem rgba(0,0,0,.075)' },
  shadow: { boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)' },
  'shadow-lg': { boxShadow: '0 1rem 3rem rgba(0,0,0,.175)' },
  'shadow-none': { boxShadow: 'none' },
  'rounded-0': { borderRadius: 0 },
  'rounded-1': { borderRadius: '0.25rem' },
  'rounded-2': { borderRadius: '0.375rem' },
  'rounded-3': { borderRadius: '0.5rem' },
  'rounded-4': { borderRadius: '0.75rem' },
  'rounded-5': { borderRadius: '1rem' },
  'rounded': { borderRadius: '0.375rem' },
  'rounded-circle': { borderRadius: '50%' },
  'rounded-pill': { borderRadius: '50rem' },
  'border': { border: '1px solid #dee2e6' },
  'border-0': { border: 0 },
  'border-top': { borderTop: '1px solid #dee2e6' },
  'border-bottom': { borderBottom: '1px solid #dee2e6' },
  'border-start': { borderInlineStart: '1px solid #dee2e6' },
  'border-end': { borderInlineEnd: '1px solid #dee2e6' },
  'border-light': { borderColor: '#dee2e6' },
  'opacity-50': { opacity: 0.5 },
  'opacity-75': { opacity: 0.75 },
  'opacity-100': { opacity: 1 },
  'opacity-25': { opacity: 0.25 },
  'z-1': { zIndex: 1 },
  'z-2': { zIndex: 2 },
  'z-3': { zIndex: 3 },
  'pe-none': { pointerEvents: 'none' },
  'pe-auto': { pointerEvents: 'auto' },
  'user-select-none': { userSelect: 'none' },
  'user-select-auto': { userSelect: 'auto' },
  'flex-md-row': { '@media (min-width:768px)': { flexDirection: 'row' } },
  'flex-sm-row': { '@media (min-width:576px)': { flexDirection: 'row' } },
  'align-items-md-center': { '@media (min-width:768px)': { alignItems: 'center' } },
  'd-md-none': { '@media (min-width:768px)': { display: 'none' } },
  'd-md-block': { '@media (min-width:768px)': { display: 'block' } },
  'd-md-flex': { '@media (min-width:768px)': { display: 'flex' } },
  'd-sm-flex': { '@media (min-width:576px)': { display: 'flex' } },
  'd-sm-inline': { '@media (min-width:576px)': { display: 'inline' } },
  'd-sm-inline-block': { '@media (min-width:576px)': { display: 'inline-block' } },
  'd-lg-block': { '@media (min-width:992px)': { display: 'block' } },
  'd-lg-flex': { '@media (min-width:992px)': { display: 'flex' } },
  'd-xl-block': { '@media (min-width:1200px)': { display: 'block' } },
  'd-xl-flex': { '@media (min-width:1200px)': { display: 'flex' } },
  'container-fluid': { width: '100%', mx: 'auto', px: '0.75rem' },
  container: { width: '100%', mx: 'auto', px: '0.75rem', '@media (min-width:576px)': { maxWidth: 540 }, '@media (min-width:768px)': { maxWidth: 720 }, '@media (min-width:992px)': { maxWidth: 960 }, '@media (min-width:1200px)': { maxWidth: 1140 }, '@media (min-width:1400px)': { maxWidth: 1320 } },
  row: { display: 'grid', gridTemplateColumns: 'repeat(12,minmax(0,1fr))', width: '100%' },
  'col-12': { gridColumn: 'span 12' },
  'col-md-4': { '@media (min-width:768px)': { gridColumn: 'span 4' } },
  'col-md-6': { '@media (min-width:768px)': { gridColumn: 'span 6' } },
  'col-md-8': { '@media (min-width:768px)': { gridColumn: 'span 8' } },
  'col-lg-4': { '@media (min-width:992px)': { gridColumn: 'span 4' } },
  'col-lg-6': { '@media (min-width:992px)': { gridColumn: 'span 6' } },
  'col-lg-8': { '@media (min-width:992px)': { gridColumn: 'span 8' } },
  'col-sm-6': { '@media (min-width:576px)': { gridColumn: 'span 6' } },
  'table-responsive': { width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' },
  table: { width: '100%', marginBottom: '1rem', color: 'text.primary', verticalAlign: 'top', borderColor: 'divider', borderCollapse: 'collapse' },
  'table-hover': { '& tbody tr:hover': { bgcolor: 'action.hover' } },
  'table-light': { '& th, & td': { bgcolor: '#f8f9fa' } },
  btn: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', px: '0.75rem', py: '0.375rem', border: '1px solid transparent', borderRadius: '0.375rem', fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, cursor: 'pointer', textDecoration: 'none' },
  'btn-primary': { bgcolor: 'primary.main', borderColor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.dark' } },
  'btn-secondary': { bgcolor: '#6c757d', borderColor: '#6c757d', color: '#fff' },
  'btn-success': { bgcolor: 'success.main', borderColor: 'success.main', color: '#fff' },
  'btn-danger': { bgcolor: 'error.main', borderColor: 'error.main', color: '#fff' },
  'btn-light': { bgcolor: '#f8f9fa', borderColor: '#f8f9fa', color: '#212529' },
  'btn-dark': { bgcolor: '#212529', borderColor: '#212529', color: '#fff' },
  'btn-link': { border: 0, bgcolor: 'transparent', color: 'primary.main', textDecoration: 'underline' },
  'btn-outline-primary': { border: '1px solid', borderColor: 'primary.main', bgcolor: 'transparent', color: 'primary.main', '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' } },
  'btn-outline-secondary': { border: '1px solid #6c757d', bgcolor: 'transparent', color: '#6c757d' },
  'btn-outline-danger': { border: '1px solid', borderColor: 'error.main', bgcolor: 'transparent', color: 'error.main' },
  'btn-sm': { px: '0.5rem', py: '0.25rem', fontSize: '0.875rem', borderRadius: '0.25rem' },
  'btn-lg': { px: '1rem', py: '0.5rem', fontSize: '1.25rem', borderRadius: '0.5rem' },
  'form-control': { display: 'block', width: '100%', px: '0.75rem', py: '0.375rem', fontSize: '1rem', lineHeight: 1.5, color: 'text.primary', bgcolor: 'background.paper', border: '1px solid #dee2e6', borderRadius: '0.375rem' },
  'form-control-sm': { px: '0.5rem', py: '0.25rem', fontSize: '0.875rem', borderRadius: '0.25rem' },
  'form-control-lg': { px: '1rem', py: '0.5rem', fontSize: '1.25rem', borderRadius: '0.5rem' },
  'form-check-input': { width: '1em', height: '1em', marginTop: '0.25em', verticalAlign: 'top', accentColor: 'primary.main' },
  'input-group': { display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', width: '100%' },
  'input-group-text': { display: 'flex', alignItems: 'center', px: '0.75rem', py: '0.375rem', color: '#212529', textAlign: 'center', whiteSpace: 'nowrap', bgcolor: '#e9ecef', border: '1px solid #dee2e6', borderRadius: '0.375rem' },
  'input-group-sm': { '& input, & select, & button': { minHeight: 31, fontSize: '0.875rem' } },
  'btn-group': { display: 'inline-flex', verticalAlign: 'middle', '& > :not(:first-of-type)': { ml: '-1px' } },
  'btn-group-vertical': { display: 'inline-flex', flexDirection: 'column', verticalAlign: 'middle' },
  alert: { position: 'relative', p: '1rem', mb: '1rem', border: '1px solid transparent', borderRadius: '0.375rem' },
  'alert-danger': { bgcolor: '#f8d7da', borderColor: '#f5c2c7', color: '#842029' },
  'alert-warning': { bgcolor: '#fff3cd', borderColor: '#ffecb5', color: '#664d03' },
  'alert-info': { bgcolor: '#cff4fc', borderColor: '#b6effb', color: '#055160' },
  'alert-success': { bgcolor: '#d1e7dd', borderColor: '#badbcc', color: '#0f5132' },
  badge: { display: 'inline-block', px: '0.65em', py: '0.35em', fontSize: '0.75em', fontWeight: 700, lineHeight: 1, color: '#fff', textAlign: 'center', whiteSpace: 'nowrap', verticalAlign: 'baseline', borderRadius: '0.375rem' },
  breadcrumb: { display: 'flex', flexWrap: 'wrap', padding: 0, marginBottom: '1rem', listStyle: 'none' },
  'breadcrumb-item': { display: 'flex', alignItems: 'center', '&:not(:last-of-type)::after': { content: '"/"', px: '0.5rem', color: 'text.secondary' } },
  nav: { display: 'flex', flexWrap: 'wrap', paddingLeft: 0, marginBottom: 0, listStyle: 'none' },
  'nav-tabs': { borderBottom: '1px solid #dee2e6', '& .MuiLink-root': { marginBottom: '-1px', borderRadius: '0.375rem 0.375rem 0 0' } },
  'nav-link': { display: 'block', px: '1rem', py: '0.5rem', color: 'primary.main', textDecoration: 'none', '&:hover': { color: 'primary.dark' } },
  'list-group': { display: 'flex', flexDirection: 'column', paddingLeft: 0, marginBottom: 0, borderRadius: '0.375rem' },
  'list-group-flush': { borderRadius: 0 },
  'list-group-item': { position: 'relative', display: 'block', p: '0.5rem 1rem', color: 'text.primary', textDecoration: 'none', bgcolor: 'background.paper', border: '1px solid rgba(0,0,0,.125)' },
  'dropdown-item': { display: 'block', width: '100%', px: '1rem', py: '0.25rem', clear: 'both', color: 'text.primary', textAlign: 'inherit', textDecoration: 'none', whiteSpace: 'nowrap', bgcolor: 'transparent', border: 0, '&:hover': { bgcolor: 'action.hover' } },
  'pagination': { display: 'flex', paddingLeft: 0, listStyle: 'none' },
  'page-item': { display: 'list-item' },
  'page-link': { position: 'relative', display: 'block', px: '0.75rem', py: '0.375rem', color: 'primary.main', textDecoration: 'none', bgcolor: 'background.paper', border: '1px solid #dee2e6' },
  'card': { position: 'relative', display: 'flex', flexDirection: 'column', minWidth: 0, wordWrap: 'break-word', bgcolor: 'background.paper', backgroundClip: 'border-box', border: '1px solid rgba(0,0,0,.125)', borderRadius: '0.375rem' },
  'spinner-border': { display: 'inline-block', width: '2rem', height: '2rem', verticalAlign: '-0.125em', border: '0.25em solid currentColor', borderRightColor: 'transparent', borderRadius: '50%', animation: 'spin .75s linear infinite' },
  'spinner-border-sm': { width: '1rem', height: '1rem', borderWidth: '0.2em' },
  'display-6': { fontSize: 'calc(1.375rem + 1.5vw)', fontWeight: 300, lineHeight: 1.2 },
  'object-fit-cover': { objectFit: 'cover' },
};

for (const [token, style] of Object.entries(simpleUtilities)) add(token, style);
