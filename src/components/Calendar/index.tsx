import React from 'react';
import PlaceholderPreview from '../PlaceholderPreview';
import { TouchableOpacity, View, Text } from 'react-native';
import clsx from 'clsx';
import { CalendarCompo } from './CalendarCompo';

const Skeleton = () => {
  return (
    <View className="w-full h-[40vh] flex items-center justify-center">
      <Text className=" text-center">日历</Text>
    </View>
  );
};

const ActualComp = () => {
  return <CalendarCompo />;
};

export default function () {
  return (
    <PlaceholderPreview
      showActualComp
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
      <ActualComp />
    </PlaceholderPreview>
  );
}
