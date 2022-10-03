import {useTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ITheme} from '../assets/globals/theme';

interface IProp {
  message: {
    notification?: {
      android?: {};
      body?: string;
      title?: string;
    };
    sentTime?: number;
    data?: {};
    from?: string;
    messageId?: string;
    ttl?: number;
    collapseKey?: string;
  };
}
export default (props: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;
  useEffect(() => {
    console.log('I catched the update.....');
  }, []);
  return (
    <View style={styles.base}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            ...styles.headerText,
            fontSize: fontsize.h6,
            color: colors.text,
          }}>
          No New Notificaion
        </Text>
      </View>
      <View style={{flex: 9, backgroundColor: '#0ff'}}>
        <Text style={{fontWeight: '800', fontSize: fontsize.h6}}>
          {props.message.notification?.title}
        </Text>
        <Text style={{fontWeight: '800', fontSize: fontsize.body2}}>
          {props.message.notification?.body}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  base: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    // marginTop: 20,
    backgroundColor: '#0f0',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
