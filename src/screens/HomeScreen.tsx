import React from "react";

import { useTailwind } from "nativewind";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "@rneui/themed";

import { RootStackParamList } from "../navigation/types";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const btnStyle = StyleSheet.flatten(
    useTailwind({
      className: "mb-8",
    })
  ) as ViewStyle;

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-20">Welcome Home</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile", { userId: "1" })}
        containerStyle={btnStyle}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

export default HomeScreen;
