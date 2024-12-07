import { JSXElementConstructor, ReactElement, ReactNode } from 'react';

import { renderToString } from 'react-dom/server';

const generateIconUrl = (
  icon: ReactElement<ReactNode, JSXElementConstructor<ReactNode>>
) => {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    renderToString(icon as any)
  )}`;
};

export default generateIconUrl;
