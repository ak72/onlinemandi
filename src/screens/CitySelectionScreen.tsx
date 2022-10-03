import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {fetchInventory} from '../assets/redux/slices/rest/inventory/inventorySlice';
import {RootState, store} from '../assets/redux/store/store';
import ActivityIndicatorWheel from '../components/ActivityIndicatorWheel';
import {HomeStackNavigatorParamList} from '../navigator/Stack/HomeStackNavigator';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
interface IProp {
  route: RouteProp<HomeStackNavigatorParamList, 'CitySelectionScreen'>;
  navigation: NativeStackNavigationProp<
    HomeStackNavigatorParamList,
    'CitySelectionScreen'
  >;
}
export default ({navigation, route}: IProp) => {
  const [count, setCount] = useState(0);
  const [citySelected, setCitySelected] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let cities: string[] = ['Indore', 'Bhopal'];
  const productsReducerData = useSelector(
    (state: RootState) => state.inventoryReducerOfStore,
  );

  useEffect(() => {
    if (count > 0) {
      route.params.updateSelectedCity(citySelected);
      console.log('i ran from count > 0');
    } else {
      console.log('hello anurag');
    }
    if (!productsReducerData.loading) {
      console.log('i ran when products done loading');
      if (count > 1) {
        console.log('i ran just before going back');
        navigation.goBack();
      }
    }

    setCount(count + 1);
  }, [productsReducerData.loading]);

  const DisplayCities = (item: string) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('Clicked' + item);
          setIsLoading(true);
          store.dispatch(fetchInventory(item.toLowerCase()));
          setCitySelected(item.toLowerCase());
        }}>
        <View style={styles.cityRowBase}>
          <View style={styles.cityRow}>
            <Text style={styles.cityText}>{item}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <View style={styles.indicatorWheel}>
          <ActivityIndicatorWheel />
        </View>
      ) : (
        <FlatList data={cities} renderItem={({item}) => DisplayCities(item)} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  cityRowBase: {
    flex: 1,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    // marginVertical: 5,
  },
  cityRow: {
    paddingVertical: 10,
  },
  cityText: {
    color: '#000',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BCD4',
    height: 300,
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 80,
    marginLeft: 40,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  indicatorWheel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    //  backgroundColor: '#f00',
  },
});
