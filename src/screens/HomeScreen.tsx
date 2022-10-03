import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackNavigatorParamList} from '../navigator/Stack/HomeStackNavigator';

import {toTitleCase} from '../assets/globals';
import {CompositeNavigationProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerNavigatorParamList} from '../navigator/Drawer/DrawerNavigator';
//import SplashScreen from 'react-native-splash-screen';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import {Icon} from '@rneui/themed';
import {FlatList} from 'react-native-gesture-handler';
import {RootState} from '../assets/redux/store/store';
import {useSelector} from 'react-redux';
import ActivityIndicatorWheel from '../components/ActivityIndicatorWheel';
import {InventoryState} from '../assets/redux/slices/rest/inventory/inventorySlice';
import ProductCard from '../components/ProductCard';
import CartCount from '../components/CartCount';
import {useTheme} from '@react-navigation/native';
import {ITheme, screen_width} from '../assets/globals/theme';

type CompositeProps = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackNavigatorParamList, 'HomeScreen'>,
  DrawerNavigationProp<DrawerNavigatorParamList>
>;

interface IProp {
  navigation: CompositeProps;
}

export default ({navigation}: IProp) => {
  const {colors, fontsize} = useTheme() as unknown as ITheme;

  const inventory: InventoryState = useSelector(
    (state: RootState) => state.inventoryReducerOfStore,
  );

  const [optOne, setOptOne] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Bhopal');
  const [indexCheck, setIndexCheck] = useState(0);
  useEffect(() => {
    LottieSplashScreen.hide();
    //   console.log('From Home Screen');
  }, []);

  const UpdateCitySelection = (city_name: string) => {
    setSelectedCity(toTitleCase(city_name));
  };

  const dummydata = [
    {
      type: 'Green',
      image:
        'http://etcetera.ai/assets/native/images/fruits/orange/thumb01.jpg',
      id: 2001,
    },
    {
      type: 'Juicy',
      image:
        'http://etcetera.ai/assets/native/images/vegetables/cauliflower/thumb02.jpg',
      id: 1001,
    },
    {
      type: 'Season',
      image:
        'http://etcetera.ai/assets/native/images/fruits/banana/thumb01.jpg',
      id: 2002,
    },
    {
      type: 'Seeds',
      image:
        'http://etcetera.ai/assets/native/images/vegetables/brinjal/thumb01.jpg',
      id: 1002,
    },
    {
      type: 'Bulbs',
      image:
        'http://etcetera.ai/assets/native/images/fruits/orange/thumb03.jpg',
      id: 2003,
    },
    {
      type: 'Stem',
      image:
        'http://etcetera.ai/assets/native/images/vegetables/cauliflower/thumb03.jpg',
      id: 1003,
    },
    {
      type: 'Salad',
      image:
        'http://etcetera.ai/assets/native/images/vegetables/brinjal/thumb01.jpg',
      id: 1004,
    },
    {
      type: 'Leaf',
      image:
        'http://etcetera.ai/assets/native/images/fruits/banana/thumb01.jpg',
      id: 2004,
    },
  ];

  const restData = [
    {
      restaurantName: 'Mc Donald',
      farAway: '21.2',
      businessAddress: '174, Goyal Vihar',
      images: '',
      averageReview: 4.9,
      numberOfReview: 300,
      coordinates: {lat: -24.34433, lng: 26.5554},
      discount: 10,
      deliveryTime: 15,
      collectTime: 5,
      foodType: 'Burger, Wrap....',
      productDate: [
        {name: 'Hand Cut Chops', price: 200, image: ''},
        {name: 'Big Mac', price: 300, image: ''},
      ],
    },
  ];
  return inventory.loading ? (
    <View style={styles.indicatorWheel}>
      <ActivityIndicatorWheel />
    </View>
  ) : (
    <View style={styles.base}>
      <View style={{...styles.header, backgroundColor: colors.primary}}>
        <View>
          <Icon
            name="menu"
            type="material-community"
            color={colors.icon}
            size={fontsize.icon}
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CitySelectionScreen', {
                updateSelectedCity: UpdateCitySelection,
              });
            }}>
            <View style={styles.cityWithIcon}>
              <Text style={{fontSize: fontsize.subtitle2, color: colors.text}}>
                {selectedCity}
              </Text>
              <Icon
                type="material-community"
                name="pencil"
                color={colors.icon}
                size={fontsize.icon}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <CartCount />
        </View>
      </View>

      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={true}>
        <View
          style={{
            backgroundColor: colors.backgroundLLL,
            paddingBottom: 5,
          }}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => {
                setOptOne(true);
              }}>
              <View
                style={{
                  ...styles.optionOne,
                  backgroundColor: optOne
                    ? colors.primary
                    : colors.backgroundLL,
                }}>
                <Text
                  style={{
                    ...styles.optionText,
                    color: optOne ? colors.text : colors.accenttext,
                    fontSize: fontsize.subtitle2,
                  }}>
                  Option One
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOptOne(false);
              }}>
              <View
                style={{
                  ...styles.optionOne,
                  backgroundColor: optOne
                    ? colors.backgroundLL
                    : colors.primary,
                }}>
                <Text
                  style={{
                    ...styles.optionText,
                    color: optOne ? colors.accenttext : colors.text,
                    fontSize: fontsize.subtitle2,
                  }}>
                  Option Two
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{...styles.searchBar, borderColor: colors.border}}
            onPressIn={() =>
              navigation.navigate('SearchTabNavigator', {
                citySelected: selectedCity,
                headingCategory: 'Find Fresh Products',
              })
            }>
            <Icon
              type="material-community"
              name={'magnify'}
              size={fontsize.icon}
              color={colors.icon}
            />
            <TextInput
              accessibilityLabel="Search Box"
              autoFocus={false}
              //  allowFontScaling={true}
              //  autoCapitalize="none"
              //  clearTextOnFocus={true}
              //  maxLength={20}
              editable={false}
              placeholderTextColor={colors.placeholder}
              placeholder="What are you looking for?"
              textAlignVertical="center"
              /*  onPressIn={() =>
                navigation.navigate('SearchTabNavigator', {
                  citySelected: selectedCity,
                  headingCategory: 'Find Fresh Products',
                })
              } */
            />
          </TouchableOpacity>
        </View>
        <View style={styles.filterView}>
          <View style={styles.cityTimeBase}>
            <View
              style={{
                ...styles.cityTimeIconBase,
                backgroundColor: colors.background,
                paddingLeft: 10,
              }}>
              <Icon
                type="material-community"
                name="map-marker"
                color={colors.icon}
                size={fontsize.icon}
              />
              <Text style={{marginLeft: 5}}>
                {selectedCity}, Madhya Pradesh
              </Text>
            </View>
            <View
              style={{
                ...styles.cityTimeIconBase,
                marginLeft: 20,
                backgroundColor: colors.backgroundLL,
                paddingHorizontal: 5,
                marginRight: 20,
              }}>
              <Icon
                type="material-community"
                name="clock-time-four"
                color={colors.icon}
                size={fontsize.icon}
              />
              <Text style={{marginLeft: 5}}>Now</Text>
            </View>
          </View>
          <View>
            <Icon
              type="material-community"
              name="tune"
              color={colors.icon}
              size={fontsize.icon}
            />
          </View>
        </View>
        <View style={styles.headerTextBase}>
          <Text style={styles.headerText}>Categories</Text>
        </View>
        <View>
          <FlatList
            keyExtractor={key => key.id.toString()}
            data={dummydata}
            // data={Object.values(inventory.products)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            extraData={indexCheck}
            renderItem={({item}) => {
              return (
                <Pressable
                  onPress={() => setIndexCheck(item.id)}
                  // android_ripple={{color: '#ccc'}}
                >
                  <View
                    style={
                      indexCheck == item.id
                        ? {
                            ...styles.categoryCard,
                            backgroundColor: colors.primary,
                          }
                        : {
                            ...styles.categoryCard,
                            backgroundColor: colors.backgroundLL,
                          }
                    }>
                    <Image
                      source={{uri: item.image}}
                      style={{width: 60, height: 60, borderRadius: 30}}
                    />
                    <View>
                      <Text
                        style={
                          indexCheck == item.id
                            ? {
                                ...styles.cardText,
                                fontSize: fontsize.small,
                                color: colors.text,
                              }
                            : {...styles.cardText, color: colors.text}
                        }>
                        {item.type}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
        <View
          style={{
            ...styles.headerTextBase,
            backgroundColor: colors.backgroundL,
          }}>
          <Text
            style={{
              ...styles.headerText,
              color: colors.text,
              fontSize: fontsize.h5,
            }}>
            Free Delivery Now
          </Text>
        </View>
        <View>
          {/* <ScrollView style={styles.freeDelivery}> */}
          <FlatList
            style={styles.bigCardBase}
            horizontal={true}
            keyExtractor={key => key.id.toString()}
            data={Object.values(inventory.products)}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.bigCard}>
                <ProductCard item={item} />
              </View>
            )}
          />
          {/*  <ProductCard />
          </ScrollView> */}
        </View>
        <View>
          <Image
            source={{
              uri: 'http://etcetera.ai/assets/native/images/banner.jpg',
            }}
            resizeMode="cover"
            style={styles.img}
          />
          <Text>"fgdfgdfgdf"</Text>
          <Text>This is a click three</Text>
          <Text>This is a click four</Text>
        </View>
      </ScrollView>
      {/*     <View>
        <Button
          title="Search"
          onPress={() =>
            navigation.navigate('ProductCategoryTabNavigator', {
              citySelected: selectedCity,
              headingCategory: 'Find Fresh Products',
            })
          }
        />
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  base: {flex: 1},
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',

    paddingLeft: 10,
    paddingRight: 20,
  },
  searchBar: {
    borderWidth: 1,

    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },

  optionOne: {
    paddingHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 5,
  },
  optionText: {
    marginLeft: 5,
  },
  /*  optionTwo: {},
  optionTwoText: {}, */

  filterView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  cityTimeBase: {
    flexDirection: 'row',

    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 20,
  },
  cityTimeIconBase: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
  },
  headerTextBase: {
    paddingVertical: 5,
  },
  headerText: {
    fontWeight: 'bold',

    paddingLeft: 20,
  },
  categoryCard: {
    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 80,
    margin: 10,
    height: 100,
  },
  cardText: {
    fontWeight: 'bold',
  },
  icon: {},
  img: {
    width: screen_width,
    height: 250,
  },
  bigCardBase: {
    marginTop: 10,
    marginBottom: 10,
  },
  bigCard: {
    marginRight: 5,
  },
  cityWithIcon: {flexDirection: 'row', alignItems: 'center'},
  indicatorWheel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
});
