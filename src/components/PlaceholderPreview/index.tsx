import React, { ReactNode, useState } from 'react';
import { Overlay } from '@rneui/themed';

const PlaceholderPreview = ({
  children,
  renderPlaceholder,
}: {
  children: (onClick: () => void) => ReactNode;
  renderPlaceholder: (onClick: () => void) => ReactNode;
}) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <>
      {renderPlaceholder(toggleOverlay)}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        {children(toggleOverlay)}
      </Overlay>
    </>
  );
};

export default PlaceholderPreview;
