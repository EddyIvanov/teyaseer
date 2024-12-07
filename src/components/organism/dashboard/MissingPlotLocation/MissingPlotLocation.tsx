import { useState } from 'react';

import { MissingPlotLocationProps } from './MissingPlotLocation.type';
import MissingPlotLocationModal from './components/MissingPlotLoationModal';
import PlotModal from '../Profile/components/PlotModal';

const MissingPlotLocation = ({ onClose }: MissingPlotLocationProps) => {
  const [showMissingPlotModal, setShowMissingPlotModal] = useState(true);
  const [showUpdatePlotModal, setShowUpdatePlotModal] = useState(false);

  const onMissingPlotModalProceed = () => {
    setShowMissingPlotModal(false);
    setShowUpdatePlotModal(true);
  };

  const onCloseModal = () => {
    setShowMissingPlotModal(false);
    setShowUpdatePlotModal(false);
    onClose();
  };

  return (
    <>
      {showMissingPlotModal && (
        <MissingPlotLocationModal
          onSubmit={onMissingPlotModalProceed}
          onClose={onCloseModal}
        />
      )}
      {showUpdatePlotModal && <PlotModal onClose={onCloseModal} />}
    </>
  );
};
export default MissingPlotLocation;
