import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { regions, type Region } from '@/data/regions';

interface RegionPickerProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const RegionPicker = ({ value, onChange }: RegionPickerProps) => {
  const [activeLevel, setActiveLevel] = useState(0);

  // 根据当前选择获取选项列表
  const getOptions = (level: number): Region[] => {
    if (level === 0) return regions;

    let current = regions;
    for (let i = 0; i < level; i++) {
      const selectedValue = value[i];
      const next = current.find(item => item.value === selectedValue)?.children;
      if (!next) return [];
      current = next;
    }
    return current;
  };

  // 获取已选择项的标签
  const getSelectedLabel = (level: number): string => {
    if (!value[level]) return '请选择';

    let current = regions;
    let label = '';
    for (let i = 0; i <= level; i++) {
      const item = current.find(_item => _item.value === value[i]);
      if (!item) break;
      label = item.label;
      current = item.children || [];
    }
    return label;
  };

  // 处理选择
  const handleSelect = (item: Region) => {
    const newValue = [...value.slice(0, activeLevel), item.value];
    onChange(newValue);
    if (item.children) {
      setActiveLevel(activeLevel + 1);
    }
  };

  return (
    <View className="border border-[#8B4513]/30 rounded-lg bg-white/50 overflow-hidden">
      {/* 顶部标签栏 */}
      <View className="flex-row border-b border-[#8B4513]/30">
        {['国家', '省份', '城市'].map((label, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveLevel(index)}
            className={`flex-1 p-3 ${activeLevel === index ? 'bg-[#8B4513]/10' : ''}`}
          >
            <Text className="text-[#8B4513] text-center">{getSelectedLabel(index)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 选项列表 */}
      <ScrollView className="max-h-[200px]">
        {getOptions(activeLevel).map(item => (
          <TouchableOpacity
            key={item.value}
            onPress={() => handleSelect(item)}
            className={`p-4 flex-row justify-between items-center ${
              value[activeLevel] === item.value ? 'bg-[#8B4513]/10' : ''
            }`}
          >
            <Text className="text-[#8B4513]">{item.label}</Text>
            {value[activeLevel] === item.value && <Icon name="check" size={20} color="#8B4513" />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RegionPicker;
