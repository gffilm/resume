import React from "react";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export const HTMLMarkdown = ({ children, renderer }) => {
  renderer = renderer ? renderer : {br: () => <br />};
  return (
    <ReactMarkdown
      children={children}
      rehypePlugins={[rehypeRaw]}
      renderers={renderer}
    />
  );
};
