import { View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import Context from '../context/Context';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import ContactsFloatingIcon from '../components/ContactsFloatingIcon';

const Chats = () => {
  const { currentUser } = auth;

  const { rooms, setRooms } = useContext(Context);

  const chatsQuery = query(
    collection(db, 'rooms'),
    where('participantsArray', 'array-contains', currentUser.email)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsQuery, querySnapshot => {
      const parsedChats = querySnapshot.docs
        .filter(doc => doc.data().lastMessage)
        .map(doc => ({
          ...doc.data(),
          id: doc.id,
          userB: doc
            .data()
            .participants.find(p => p.email !== currentUser.email),
        }));
      setRooms(parsedChats);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, padding: 5, paddingRight: 10 }}>
      <Text>Chats</Text>
      <ContactsFloatingIcon />
    </View>
  );
};

export default Chats;
