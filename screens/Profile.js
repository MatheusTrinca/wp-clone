import { View, Text, Image, Button } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import Context from '../context/Context';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { pickImage, uploadImage } from '../utils';
import { auth, db } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [displayName, setDisplayName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const navigation = useNavigation();

  const {
    theme: { colors },
  } = useContext(Context);

  const handleProfilePicture = async () => {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handlePress = async () => {
    const user = auth.currentUser;
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        'profilePicture'
      );
      photoURL = url;
    }
    const userData = {
      displayName,
      email: user.email,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }
    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, 'users', user.uid), { ...userData, uid: user.uid }),
    ]);
    navigation.navigate('home');
  };

  return (
    <>
      <StatusBar />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: Constants.statusBarHeight + 20,
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 22, color: colors.foreground }}>
          Profile Info
        </Text>
        <Text style={{ fontSize: 14, color: colors.text, marginTop: 20 }}>
          Informe seu nome e uma foto de perfil opcional
        </Text>
        <TouchableOpacity
          style={{
            marginTop: 30,
            borderRadius: 60,
            width: 120,
            height: 120,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons
              onPress={handleProfilePicture}
              name="camera-plus"
              color={colors.iconGray}
              size={45}
            />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: '100%', height: '100%', borderRadius: 60 }}
            />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Diga seu nome"
          value={displayName}
          onChangeText={setDisplayName}
          style={{
            borderBottomColor: colors.primary,
            marginTop: 40,
            borderBottomWidth: 2,
            width: '100%',
          }}
        />
        <View style={{ marginTop: 'auto', width: 80 }}>
          <Button
            title="Próximo"
            style={{ color: colors.secondary }}
            onPress={handlePress}
            disabled={!displayName}
          />
        </View>
      </View>
    </>
  );
};

export default Profile;
