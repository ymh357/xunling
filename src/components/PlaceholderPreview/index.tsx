import React, { ReactNode, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';

import { Overlay } from '@rneui/themed';
import { useTailwind } from 'nativewind';

const PlaceholderPreview = ({
  children,
  renderPlaceholder,
  showActualComp,
}: {
  children?: (onClick: () => void) => ReactNode;
  renderPlaceholder: (onClick: () => void, compReady: boolean) => ReactNode;
  showActualComp?: boolean;
}) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const overlayStyle = StyleSheet.flatten(
    useTailwind({
      className: 'p-0',
    })
  ) as ViewStyle;
  return showActualComp && children ? (
    children(toggleOverlay)
  ) : (
    <>
      {renderPlaceholder(toggleOverlay, !!children)}
      <Overlay overlayStyle={overlayStyle} isVisible={visible} onBackdropPress={toggleOverlay}>
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
