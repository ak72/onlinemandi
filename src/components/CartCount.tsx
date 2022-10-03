import React from 'react';

import {RootState} from '../assets/redux/store/store';
import {FirebaseUserState} from '../assets/redux/slices/rest/auth/fbUserByIDSlice';

import {useSelector} from 'react-redux';
import {Icon, withBadge} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';
import {ITheme} from '../assets/globals/theme';

export default () => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const user: FirebaseUserState = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore,
  );
  const BadgeCartIcon: React.ComponentType<any> = withBadge(
    Object.keys(user.cart).length,
  )(Icon);

  return (
    <BadgeCartIcon
      type="material-community"
      name="cart"
      color={colors.text}
      size={fontsize.icon}
    />
  );
};
