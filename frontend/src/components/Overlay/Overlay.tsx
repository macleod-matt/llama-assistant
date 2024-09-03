import React from 'react';
import styles from './Overlay.module.css';

interface OverlayProps {
  showOverlay: boolean;
  setShowOverlay: any;
  children?: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({
  showOverlay,
  children,
  setShowOverlay,
}) => {
  if (!showOverlay) return null;
  console.log('is visible is ', showOverlay);
  return (
    <div
      onClick={() => setShowOverlay(!showOverlay)}
      className={styles.overlay}
      // className={`${styles.overlay} ${showOverlay ? styles.overlayVisible : ''}`}
      style={{
        opacity: showOverlay ? 1 : 0,
        visibility: showOverlay ? 'visible' : 'hidden',
      }}
    >
      <div className={styles.overlayContent}>{children}</div>
    </div>
  );
};

export default Overlay;
