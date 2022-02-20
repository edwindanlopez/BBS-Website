import React, { useContext } from 'react';
import { DialogOverlay } from '@reach/dialog';
import LightBoxContext from './LightBoxContext';
import DialogContent from './DialogContent';
import 'twin.macro';

import '@reach/dialog/styles.css';

export default function LightBox() {
  const { showDialog, setShowDialog } = useContext(LightBoxContext);

  return (
    <DialogOverlay
      isOpen={showDialog}
      onDismiss={() => setShowDialog(false)}
      className="dialog-overlay"
      aria-label="image in light box mode"
      style={{
        backgroundColor: '#000000',
      }}
      tw="w-screen h-screen m-auto flex justify-center items-center overflow-hidden z-40"
      allowPinchZoom
    >
      <DialogContent />
    </DialogOverlay>
  );
}
