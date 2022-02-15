import React, { useContext } from 'react';
import { DialogOverlay } from '@reach/dialog';
import LightboxContext from './LightboxContext';
import DialogContent from './DialogContent';

import '@reach/dialog/styles.css';

export default function Lightbox() {
  const { showDialog, setShowDialog } = useContext(LightboxContext);

  return (
    <DialogOverlay
      className="dialog-overlay"
      style={{
        background: '#000000',
        zIndex: '40',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isOpen={showDialog}
      allowPinchZoom
      onDismiss={() => setShowDialog(false)}
      aria-label="image in lightbox mode"
    >
      <DialogContent />
    </DialogOverlay>
  );
}
