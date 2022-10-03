import AsyncStorage from '@react-native-async-storage/async-storage';

//const resDataexpiresIn = '172800';
/* const tokenExpirationDate: string = new Date(
  new Date().getTime() + parseInt(resDataexpiresIn) * 1000,
).toISOString(); */

export const saveUserLoginToStorage = async (
  idToken: string,
  localId: string,
  expiresIn: string,
  refreshToken: string,
) => {
  try {
    const toJSON = JSON.stringify({
      idToken: idToken,
      localId: localId,
      expiryDate: expiresIn,
      refreshToken: refreshToken,
    });
    await AsyncStorage.setItem('user', toJSON);
    console.log('Persistant data saved');
  } catch (error: any) {
    //Error saving data
    throw new Error('Error saving Persistant info');
  }
};

export const setCityToLocalStorage = (_city_name: string) => {
  AsyncStorage.setItem('city', JSON.stringify({name: _city_name})).then(
    () => {},
  );
};

export const localCartCRU = async (data: any) => {
  const toJSON = JSON.stringify({
    ...data,
  });
  console.log('asynclocalstorage, ', toJSON);
  try {
    await AsyncStorage.setItem('cart', toJSON);
  } catch (error: any) {
    throw new Error('Error saving Persistant info');
  }
};

export const removeItemFromLocalCart = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new Error('Error deleting local cart');
  }
};
