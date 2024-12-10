import React from 'react';
import PlaceholderPreview from '../PlaceholderPreview';
import { TouchableOpacity, View, Text } from 'react-native';
import clsx from 'clsx';

const Skeleton = () => {
  return (
    <View className="w-full h-[40vh] flex items-center justify-center">
      <Text className=" text-center">对话流</Text>
    </View>
  );
};

const ActualComp = () => {
  return null;
};

export default function () {
  return (
    <PlaceholderPreview
      renderPlaceholder={(onClick, compReady) => (
        <TouchableOpacity onPress={() => onClick()}>
          <View
            className={clsx({
              ['bg-red-200']: !compReady,
              ['bg-green-200']: compReady,
            })}
          >
            <Skeleton />
          </View>
        </TouchableOpacity>
      )}
    >
      {/* {onClick => (
        <TouchableOpacity onPress={onClick}>
          <ActualComp />
        </TouchableOpacity>
      )} */}
    </PlaceholderPreview>
  );
}
