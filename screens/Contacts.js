import { View, Text, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import useContacts from '../hooks/useHooks';
import GlobalContext from '../context/Context';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const Contacts = () => {
  const contacts = useContacts();

  return (
    <FlatList
      style={{ flex: 1, padding: 10 }}
      data={contacts}
      keyExtractor={(_, i) => i}
      renderItem={({item}) => }
    />
  );
};

const ContactPreview = ({contact, image}) => {
  const {rooms} = useContext(GlobalContext);
  const [user, setUser] = useState(contact)
  useEffect(() => {
    const q = query(collection(db, "users"), where('email', '==', contact.email))
    const unsubscribe =  onSnapshot(q, snapshot => {
      if(snapshot.docs.length){
        const userDoc = snapshot.docs[0].data();
        setUser(prevUser => ({...prevUser, userDoc}))
      }
    })
    return () => unsubscribe();
  }, [])
}

export default Contacts;

// 2:59:00