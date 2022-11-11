import { View, Text, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import useContacts from '../hooks/useHooks';
import GlobalContext from '../context/Context';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import ListItem from '../components/ListItem';
import { useRoute } from '@react-navigation/native';

const Contacts = () => {
  const contacts = useContacts();

  const { params } = useRoute();
  const image = params?.image;

  return (
    <FlatList
      style={{ flex: 1, padding: 10 }}
      data={contacts}
      keyExtractor={(_, i) => i}
      renderItem={({ item }) => <ContactPreview contact={item} image={image} />}
    />
  );
};

const ContactPreview = ({ contact, image }) => {
  const { rooms } = useContext(GlobalContext);
  const [user, setUser] = useState(contact);
  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      where('email', '==', contact.email)
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      if (snapshot.docs.length) {
        const userDoc = snapshot.docs[0].data();
        setUser(prevUser => ({ ...prevUser, userDoc }));
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <ListItem
      style={{ marginTop: 7 }}
      type="contacts"
      user={user}
      image={image}
      room={rooms.find(rooms =>
        rooms.participantsArray.includes(contact.email)
      )}
    />
  );
};

export default Contacts;

// 2:59:00
