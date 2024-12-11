import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { BirthInfo } from '@/store/profile';

interface BirthInfoFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (birthInfo: BirthInfo) => Promise<void>;
  initialValues: BirthInfo | null;
}

const BirthInfoForm = ({ visible, onClose, onSubmit, initialValues }: BirthInfoFormProps) => {
  const [birthDate, setBirthDate] = useState(initialValues?.birthDate || new Date());
  const [birthPlace, setBirthPlace] = useState(initialValues?.birthPlace || '');
  const [showPicker, setShowPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (visible && initialValues) {
      setBirthDate(initialValues.birthDate);
      setBirthPlace(initialValues.birthPlace);
    }
  }, [visible, initialValues]);

  const handleSubmit = async () => {
    if (!birthPlace.trim()) {
      // 可以添加错误提��
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        birthDate,
        birthPlace: birthPlace.trim(),
        isComplete: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/30">
        <View className="bg-[#FDF5E6] rounded-t-3xl">
          {/* 表单头部 */}
          <View className="flex-row justify-between items-center p-4 border-b border-[#8B4513]/20">
            <Text className="text-xl font-bold text-[#8B4513]">
              <Icon name="calendar-clock" size={24} color="#8B4513" /> 生辰信息
            </Text>
            <TouchableOpacity onPress={onClose} disabled={isSubmitting}>
              <Icon name="close" size={24} color="#8B4513" />
            </TouchableOpacity>
          </View>

          <View className="p-6 space-y-4">
            {/* 出生时间选择器 */}
            <View>
              <Text className="text-[#8B4513] mb-2 font-medium">选择出生时辰</Text>
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                className="border border-[#8B4513]/30 p-4 rounded-lg bg-white/50"
                disabled={isSubmitting}
              >
                <View className="flex-row items-center">
                  <Icon name="clock-outline" size={20} color="#8B4513" />
                  <Text className="text-[#8B4513] ml-2">
                    {birthDate.toLocaleString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {showPicker && (
              <DateTimePicker
                value={birthDate}
                mode="datetime"
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) {
                    setBirthDate(selectedDate);
                  }
                }}
              />
            )}

            {/* 出生地点输入 */}
            <View>
              <Text className="text-[#8B4513] mb-2 font-medium">填写出生地点</Text>
              <View className="border border-[#8B4513]/30 rounded-lg bg-white/50">
                <TextInput
                  className="p-4"
                  placeholder="请输入出生地���（具体到城市）"
                  placeholderTextColor="#8B4513/50"
                  value={birthPlace}
                  onChangeText={setBirthPlace}
                  editable={!isSubmitting}
                />
              </View>
            </View>

            {/* 提交按钮 */}
            <TouchableOpacity
              className={`p-4 rounded-lg mt-6 ${isSubmitting ? 'bg-[#8B4513]/50' : 'bg-[#8B4513]'}`}
              onPress={handleSubmit}
              disabled={isSubmitting || !birthPlace.trim()}
            >
              <Text className="text-[#FDF5E6] text-center font-bold">
                {isSubmitting ? '提交中...' : '确认生辰信息'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BirthInfoForm;
