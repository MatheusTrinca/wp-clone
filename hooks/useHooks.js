import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';

export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });
        if (data.length > 0) {
          setContacts(
            data
              .filter(
                c => c.firstName && c.emails && c.emails[0] && c.emails[0].email
              )
              .map(mapContactsToFilter)
          );
        }
      }
    })();
  }, []);
  return contacts;
}

const mapContactsToFilter = contact => {
  return {
    contactName:
      contact.firstName && contact.lastName
        ? `${contact.firstName} ${contact.lastName}`
        : contact.firstName,
    email: contact.emails[0].email,
  };
};
