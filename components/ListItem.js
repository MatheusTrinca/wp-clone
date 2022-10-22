import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import GlobalContext from '../context/Context';
import { Grid, Row, Col } from 'react-native-easy-grid';
import Avatar from './Avatar';

const ListItem = ({ type, description, user, style, time, room, image }) => {
  const navigation = useNavigation();

  const {
    theme: { colors },
  } = useContext(GlobalContext);

  return (
    <TouchableOpacity
      style={{ height: 80, ...style }}
      onPress={() => navigation.navigate('chat', { user, room, image })}
    >
      <Grid style={{ maxHeight: 80 }}>
        <Col
          style={{ width: 80, justifyContent: 'center', alignItems: 'center' }}
        >
          <Avatar user={user} size={type === 'contacts' ? 40 : 65} />
        </Col>
        <Col style={{ marginLeft: 10 }}>
          <Row style={{ alignItems: 'center' }}>
            <Col>
              <Text>{user.contactName || user.displayName}</Text>
            </Col>
          </Row>
        </Col>
      </Grid>
    </TouchableOpacity>
  );
};

export default ListItem;
