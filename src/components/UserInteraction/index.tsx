import React, { useState } from 'react';
import PlaceholderPreview from '../PlaceholderPreview';
import { TouchableOpacity, View, Text, Image, Modal } from 'react-native';
import clsx from 'clsx';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface UserInfo {
  avatar: string;
  userId: string;
  username: string;
  wuxing?: string;
  zodiac?: string;
  level?: number;
}

const Skeleton = () => {
  return (
    <View className="w-full h-[10vh] flex items-center justify-center">
      <Text className=" text-center">用户信息展示 + 登入/登出</Text>
    </View>
  );
};

const UserProfileModal = ({
  visible,
  onClose,
  userInfo,
}: {
  visible: boolean;
  onClose: () => void;
  userInfo: UserInfo;
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/30">
        <View className="w-[80%] bg-[#FDF5E6] rounded-2xl overflow-hidden">
          {/* 头部背景装饰 */}
          <View className="h-20 bg-[#8B4513] opacity-80" />

          {/* 用户信息 */}
          <View className="px-6 pb-6 -mt-10">
            <Image
              source={{ uri: userInfo.avatar }}
              className="w-20 h-20 rounded-full border-4 border-[#FDF5E6] mb-4"
            />

            <View className="space-y-4">
              <View>
                <Text className="text-xl font-bold text-[#8B4513]">{userInfo.username}</Text>
                <Text className="text-[#8B4513]/70">命主ID: {userInfo.userId}</Text>
              </View>

              <View className="flex-row justify-between">
                <View className="items-center p-3 bg-[#8B4513]/10 rounded-lg flex-1 mr-2">
                  <Icon name="star-four-points" size={20} color="#8B4513" />
                  <Text className="text-[#8B4513] mt-1">{userInfo.wuxing || '未知'}</Text>
                  <Text className="text-[#8B4513]/70 text-xs">五行</Text>
                </View>
                <View className="items-center p-3 bg-[#8B4513]/10 rounded-lg flex-1 ml-2">
                  <Icon name="compass" size={20} color="#8B4513" />
                  <Text className="text-[#8B4513] mt-1">{userInfo.zodiac || '未知'}</Text>
                  <Text className="text-[#8B4513]/70 text-xs">生肖</Text>
                </View>
              </View>

              <TouchableOpacity onPress={onClose} className="bg-[#8B4513] rounded-lg p-3 mt-4">
                <Text className="text-center text-[#FDF5E6]">关闭</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ActualComp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    avatar:
      'https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg',

    userId: 'Guest-123',
    username: '游客',
    wuxing: '未知',
    zodiac: '未知',
    level: 0,
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserInfo({
      avatar:
        'https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg',
      userId: 'User-456',
      username: '张三',
      wuxing: '金',
      zodiac: '龙',
      level: 1,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo({
      avatar:
        'https://img.freepik.com/premium-vector/man-professional-business-casual-young-avatar-icon-illustration_1277826-622.jpg',
      userId: 'Guest-123',
      username: '游客',
      wuxing: '未知',
      zodiac: '未知',
      level: 0,
    });
  };
  return (
    <View className="w-full">
      {/* 用户信息卡片 */}
      <View className="bg-white/80 rounded-lg p-4">
        <View className="flex-row items-center justify-between">
          {/* 左侧用户信息 */}
          <TouchableOpacity
            className="flex-row items-center flex-1"
            onPress={() => setShowProfile(true)}
          >
            <View className="relative">
              <Image
                source={{ uri: userInfo.avatar }}
                className="w-16 h-16 rounded-full border-2 border-[#8B4513]"
              />
              {isLoggedIn && (
                <View className="absolute bottom-0 right-0 bg-[#DAA520] rounded-lg px-2 py-0.5 items-center justify-center">
                  <Text className="text-white text-xs">Lv.{userInfo.level}</Text>
                </View>
              )}
            </View>

            <View className="ml-4 flex-1">
              <View className="flex-row items-center">
                <Text className="text-lg font-bold text-[#8B4513]">{userInfo.username}</Text>
                {isLoggedIn && (
                  <View className="ml-1">
                    <Icon name="check-decagram" size={16} color="#DAA520" />
                  </View>
                )}
              </View>
              <Text className="text-[#8B4513]/70 text-sm">
                {isLoggedIn ? `${userInfo.wuxing}命 · ${userInfo.zodiac}年` : '尚未登录'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* 右侧登录按钮 */}
          <TouchableOpacity
            onPress={isLoggedIn ? handleLogout : handleLogin}
            className={clsx(
              'px-4 py-2 rounded-lg',
              isLoggedIn ? 'bg-[#8B4513]/10' : 'bg-[#8B4513]'
            )}
          >
            <Text className={clsx('font-medium', isLoggedIn ? 'text-[#8B4513]' : 'text-[#FDF5E6]')}>
              {isLoggedIn ? '退出' : '登录'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 用户详情弹窗 */}
      <UserProfileModal
        visible={showProfile}
        onClose={() => setShowProfile(false)}
        userInfo={userInfo}
      />
    </View>
  );
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
