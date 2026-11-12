import { memo } from 'react';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
const LatexText = memo(({ text, className = "", as = "span", ...restProps }) => {
  if (!text) return null;

  // Render normally without parsing overhead if there's no '$' denoting LaTeX
  if (typeof text === 'string' && !text.includes('$')) {
    const Component = as;
    return <Component className={className} {...restProps}>{text}</Component>;
  }

  // Optimize for inline components to prevent breaking layout
  const renderComponents = {
    p: ({node, ...props}) => {
       if (as === 'span') {
         return <span {...props} />;
       }
       return <p {...props} />;
    }
  };

  return (
    <Box
      component="span"
      className={className}
      sx={{
        display: 'inline',
        wordBreak: 'break-word',
        '& .math': { fontSize: 'inherit', lineHeight: 'inherit', color: 'inherit' },
        '& .math-display': {
          overflowX: 'auto',
          overflowY: 'hidden',
          maxWidth: '100%',
          pb: 0.5,
        },
      }}
      {...restProps}
    >
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={renderComponents}
      >
        {text}
      </ReactMarkdown>
    </Box>
  );
});

export default LatexText;
