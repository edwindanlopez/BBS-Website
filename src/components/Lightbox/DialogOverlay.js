import React from "react";

import DialogContent from "./DialogContent";
import { DialogOverlay as ReachDialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";

export default function DialogOverlay({ node, close, showDialog }) {
  return (
    <ReachDialogOverlay
      className='dialog-overlay'
      style={{
        background: "#000000",
        zIndex: "50",
        display: "flex",
      }}
      isOpen={showDialog}
      onDismiss={close}
      aria-label='image in lightbox mode'
      allowPinchZoom={true}
    >
      <DialogContent node={node} close={close} aria-label='Dialog content' />
    </ReachDialogOverlay>
  );
}
