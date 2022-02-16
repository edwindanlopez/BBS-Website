import React, { useContext } from 'react';
import { DialogOverlay } from '@reach/dialog';
import LightboxContext from './LightboxContext';
import DialogContent from './DialogContent';
import 'twin.macro';

import '@reach/dialog/styles.css';

export default function Lightbox() {
  const { showDialog, setShowDialog } = useContext(LightboxContext);

  return (
    <DialogOverlay
      className="dialog-overlay"
      style={{ backgroundColor: '#000000' }}
      tw="h-[100vh] m-auto flex justify-center items-center overflow-hidden z-40"
      isOpen={showDialog}
      allowPinchZoom
      onDismiss={() => setShowDialog(false)}
      aria-label="image in lightbox mode"
    >
      <DialogContent />
    </DialogOverlay>
  );
}
