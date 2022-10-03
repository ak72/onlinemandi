import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import {IProduct} from '../assets/interface';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackNavigatorParamList} from '../navigator/Stack/HomeStackNavigator';
import {RouteProp, useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../assets/redux/store/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityIndicatorWheel from '../components/ActivityIndicatorWheel';
import {toTitleCase, Weight} from '../assets/globals';

import CartItemManagement from '../components/CartItemManagement';
import {ModalWeightPicker} from '../components/ModalWeightPicker';
import {Modal} from 'react-native-paper';
//import CustomRatingBar from '../components/Rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SearchTabParamList} from '../navigator/Tab/SearchTabNavigator';
import {ITheme} from '../assets/globals/theme';

interface IProp {
  navigation: NativeStackNavigationProp<HomeStackNavigatorParamList>;
  // route: RouteProp<{params: {category: ''}}, 'params'>;
  route: RouteProp<SearchTabParamList>;
}

export default ({navigation, route}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const [term, setTerm] = useState('');
  const [productToShow, setProductToShow] = useState(2);
  //const [showAllProducts, setShowAllProducts] = useState(false);
  const inventory = useSelector(
    (state: RootState) => state.inventoryReducerOfStore,
  );
  const [productWeight, setProductWeight] = useState('one');
  const [weightInStock, setWeightInStock] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const _category = route.params.category;
  useEffect(() => {
    console.log('This productToShow dependency in searchscreen useEffect ran');
    if (_category == '') {
      (async () => {
        const cityName = await AsyncStorage.getItem('cityName');
        if (cityName) {
          _category == cityName;
        }
      })();
    }
    //  Alert.alert('Error', `Error ${inventory.error} occured`, [{text: 'Okay'}]);
  }, [setProductToShow]);

  const onScrollHandler = () => {
    setProductToShow(productToShow + 1);
  };
  const OnProductImagePress = (data: IProduct) => {
    navigation.navigate('ProductDetailScreen', {product: data});
  };

  const NoItemToShow = () => {
    return (
      <View style={styles.noProductCol}>
        <View style={styles.noProductBase}>
          <Icon name="magnify" size={60} color={colors.icon} />
          <Text style={{...styles.noProductTitle, fontSize: fontsize.h5}}>
            No Product Found!
          </Text>
          <Text style={{...styles.noProductText, fontSize: fontsize.small}}>
            Search term you entered yielded no results
          </Text>
          <View
            style={{
              ...styles.noProductHelpBase,
              backgroundColor: colors.backgroundLL,
            }}>
            <Text style={{...styles.noProductHelpTitle, fontSize: fontsize.h5}}>
              Search Help{' '}
            </Text>
            <Text style={{fontSize: fontsize.small}}>
              {'\u2022'} Check your search for typos{'\n'}
              {'\n'}
              {'\u2022'} Use more generic search terms{'\n'}
              {'\n'}
              {'\u2022'}The product you're searching for may be not yet on our
              site
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const changeModalVisiblity = (param: boolean) => {
    setIsModalVisible(param);
  };
  const setWeight = (opt: string) => {
    setProductWeight(opt);
  };
  const setInStock = (status: boolean) => {
    //  console.log('This product with this weight is in stock=' + status);
    setWeightInStock(status);
  };

  const ShowWeightsInModal = (item: IProduct) => {
    return (
      <View style={{...styles.modalBase, backgroundColor: colors.background}}>
        <TouchableOpacity
          onPress={() => changeModalVisiblity(true)}
          //style={styles.modalTouchable}
        >
          <Text
            style={{
              ...styles.modalHeaderText,
              fontSize: fontsize.small,
              backgroundColor: colors.primary,
            }}>{`Weight: ${
            Weight[productWeight as keyof typeof Weight]
          }`}</Text>
        </TouchableOpacity>
        <Modal
          visible={isModalVisible}
          onDismiss={() => changeModalVisiblity(false)}>
          <ModalWeightPicker
            changeModalVisiblity={bool => changeModalVisiblity(bool)}
            setProductWeight={d => setWeight(d)}
            setWeightStock={v => setInStock(v)}
            units={item.units}
          />
        </Modal>
      </View>
    );
  };
  const SearchedItemHeading = () => {
    return (
      <View style={styles.categoryBase}>
        <Text
          style={{
            ...styles.categoryTitle,
            fontSize: fontsize.h6,
            color: colors.text,
          }}>{`Fresh ${toTitleCase(_category)}s`}</Text>
        <TouchableOpacity
          onPress={() => {
            setProductToShow(productToShow + 1);
          }}>
          <Text style={styles.categoryText}>See all</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const PerformSearchByTerm = (item: IProduct) => {
    return (
      <View
        style={{
          ...styles.searchResultBase,
          backgroundColor: colors.background,
          borderColor: colors.border,
        }}>
        <View style={{flex: 4}}>
          <TouchableOpacity onPress={() => OnProductImagePress(item)}>
            <Image
              source={{uri: item.image_url}}
              resizeMode="contain"
              style={styles.img}
            />
            {/* <CustomRatingBar /> */}
          </TouchableOpacity>
        </View>
        <View style={{flex: 4}}>{ShowWeightsInModal(item)}</View>
        <View style={{flex: 2, alignItems: 'center'}}>
          <CartItemManagement
            item={item}
            weight={productWeight}
            weightInStock={weightInStock}
          />
        </View>
      </View>
    );
  };
  return inventory.loading ? (
    <View style={styles.indicatorWheel}>
      <ActivityIndicatorWheel />
    </View>
  ) : (
    <View style={styles.base}>
      <SearchBar onTermChange={(e: string) => setTerm(e.toLowerCase())} />
      <SearchedItemHeading />
      <FlatList
        keyExtractor={product => product.id.toString()}
        data={
          term.length > 0
            ? (Object.values(inventory.products) as IProduct[])
                .filter(
                  element =>
                    element.name.includes(term) &&
                    element.category == _category,
                )
                .slice(0, productToShow)
            : (Object.values(inventory.products) as IProduct[])
                .filter(element => element.category == _category)
                .slice(0, productToShow)
        }
        ListEmptyComponent={NoItemToShow}
        renderItem={({item}) => PerformSearchByTerm(item)}
        onEndReached={onScrollHandler}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    // backgroundColor: '#0ff',
  },
  searchResultBase: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
  },

  categoryBase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  categoryTitle: {
    fontWeight: 'bold',
  },
  categoryText: {color: '#01a755'},

  /*  detailBase: {
    flex: 1,
  }, 
  imgBase: {
    flex: 3,
    marginHorizontal: 10,
    flexDirection: 'row',
  },*/
  img: {
    width: 150,
    height: 150,
  },
  /*   productName: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  priceText: {color: '#438c6e'},
  weightText: {
    color: '#bbb',
  }, */
  noProductCol: {
    flex: 1,
    marginTop: 15,
  },
  noProductBase: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#00f',
  },
  noProductTitle: {
    marginVertical: 5,
  },
  noProductText: {marginVertical: 5},
  noProductHelpBase: {
    // marginTop: 20,
    padding: 20,
    borderRadius: 15,
    marginVertical: 5,
  },

  noProductHelpTitle: {
    marginBottom: 5,
    alignSelf: 'flex-start',
  },

  clickBase: {flex: 0.5},
  allClicks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  modalBase: {
    //  flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    //backgroundColor: colors.background.primary,

    // alignSelf: 'stretch',
    paddingHorizontal: 10,
    //  alignItems: 'center',
  },
  modalTouchable: {
    // backgroundColor: 'orange',
    //  alignSelf: 'stretch',
    //  paddingHorizontal: 20,
    //  alignItems: 'center',
  },
  modalHeaderText: {
    // marginVertical: 5,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'center',
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
