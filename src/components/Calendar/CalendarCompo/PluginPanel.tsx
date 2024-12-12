import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const PluginPanel: FC<{ title: string; desc: string }> = ({ title, desc }) => {
  return (
    <View style={styles.infoBlock}>
      <View style={styles.titlePart}>
        <Text style={{ ...styles.title }}>🌎 {title}</Text>
        <Text style={{ ...styles.subTitle, ...styles.red }}>{desc}</Text>
      </View>
      <View style={styles.holder}>
        <Text>暂无内容</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  holder: {
    alignItems: 'center',
    height: 150,
    justifyContent: 'center',
  },
  infoBlock: {
    backgroundColor: '#fff',
    borderRadius: 10,
    boxShadow: '0 0 4px rgba(0,0,0,0.2)',
    marginBottom: 10,
    minHeight: 200,
    padding: 10,
  },
  red: {
    color: 'red',
  },
  subTitle: {
    fontSize: 10,
    lineHeight: 20,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  titlePart: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
