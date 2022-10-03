import {useTheme} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ITheme} from '../../assets/globals/theme';
import {IProduct} from '../../assets/interface';
import {RootState} from '../../assets/redux/store/store';
import ActivityIndicatorWheel from '../../components/ActivityIndicatorWheel';

export default () => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const favoriteIndex = useSelector(
    (state: RootState) => state.fbUserByIDReducerOfStore.current.favorites,
  );
  const inventory = useSelector(
    (state: RootState) => state.inventoryReducerOfStore,
  );

  const favorites: IProduct[] = Object.values(inventory.products).filter(
    product => {
      return favoriteIndex != undefined && favoriteIndex.includes(product.id);
    },
  );
  const DisplayFavorites = (item: IProduct) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const noFavorites = () => {
    return (
      <View style={styles.base}>
        <Text
          style={{
            ...styles.headerTitle,
            fontSize: fontsize.subtitle1,
            color: colors.text,
          }}>
          You have not selected any favorites..
        </Text>
      </View>
    );
  };

  return (
    <>
      {inventory.loading ? (
        <View style={styles.indicatorWheel}>
          <ActivityIndicatorWheel />
        </View>
      ) : (
        <FlatList
          keyExtractor={prd => prd.id.toString()}
          data={favorites}
          renderItem={({item}) => DisplayFavorites(item)}
          ListEmptyComponent={noFavorites}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  base: {flex: 1},
  headerTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
  },
  indicatorWheel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    //backgroundColor: '#f00',
  },
});
