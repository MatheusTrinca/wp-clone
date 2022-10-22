import { View, Text, Image } from 'react-native';
import React from 'react';

const Avatar = ({ size, user }) => {
  return (
    <Image
      style={{ width: size, height: size }}
      source={
        user.photoURL
          ? { uri: user.photoURL }
          : require('../assets/icon-square.png')
      }
      resizeMode="cover"
    />
  );
};

export default Avatar;