import { JSXElementConstructor, ReactElement, ReactNode } from 'react';

import { MarkerProps, Marker as GoogleMarker } from '@react-google-maps/api';

import generateIconUrl from '../../utils/generateIconUrl';

interface IMarkerProps extends MarkerProps {
  children?: ReactElement<ReactNode, JSXElementConstructor<ReactNode>>;
  scale?: number;
  customIcon: ReactElement<ReactNode, JSXElementConstructor<ReactNode>>;
  scaledSize?: google.maps.Size;
  anchor?: google.maps.Point;
}

const Marker = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  customIcon,
  scale = 1,
  position,
  scaledSize,
  anchor,
  ...props
}: IMarkerProps) => {
  if (position === undefined) {
    return null;
  }

  return (
    <GoogleMarker
      {...props}
      position={position}
      icon={{
        url: generateIconUrl(customIcon),
        scaledSize,
        anchor,
        scale,
      }}
    >
      {children}
    </GoogleMarker>
  );
};

export default Marker;
