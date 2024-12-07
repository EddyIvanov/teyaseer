import React from 'react';

export const isEmptyHtml = (nodes: React.ReactNode) => {
  return Array.isArray(nodes) && !nodes?.find(node => node !== null);
};

export const isChildrenEmptyString = (children: React.ReactNode) => {
  return children?.toString().trim() === '';
};
