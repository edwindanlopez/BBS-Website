import React, { useContext } from "react";
import { DialogOverlay } from "@reach/dialog";
import DialogContent from "./DialogContent";

import "@reach/dialog/styles.css";
import { DialogContext } from "./DialogContext";

export default function Lightbox() {
  const { showDialog, setShowDialog } = useContext(DialogContext);

  return (
    <DialogOverlay
      className='dialog-overlay'
      style={{
        background: "#000000",
        zIndex: "50",
        display: "flex",
      }}
      isOpen={showDialog}
      onDismiss={() => setShowDialog(false)}
      aria-label='image in lightbox mode'
      allowPinchZoom={true}
    >
      <DialogContent />
    </DialogOverlay>
  );
}
