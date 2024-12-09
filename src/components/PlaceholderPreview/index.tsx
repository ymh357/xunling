import React, { ReactNode, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Overlay } from '@rneui/themed';

const PlaceholderPreview = ({
  children,
  renderPlaceholder,
}: {
  children?: (onClick: () => void) => ReactNode;
  renderPlaceholder: (onClick: () => void, compReady: boolean) => ReactNode;
}) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <>
      {renderPlaceholder(toggleOverlay, !!children)}
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        {children ? (
          children(toggleOverlay)
        ) : (
          <TouchableOpacity onPress={toggleOverlay}>
            <View className="w-40 h-40 bg-blue-200">
              <Text>no real component defined yet</Text>
            </View>
          </TouchableOpacity>
        )}
      </Overlay>
    </>
  );
};

export default PlaceholderPreview;
