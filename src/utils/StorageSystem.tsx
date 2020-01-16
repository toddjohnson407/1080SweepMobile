/* 
 * This module is for methods that assist in 
 * managing cached/local storage using AsyncStorage 
 */

// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage }from 'react-native';

const STORAGE_KEY: string = '@test_key';

/** Retrieves local data using the key of the item */
async function _retrieveData() {
  try {
    const value = await AsyncStorage.getItem('@MySuperStore:key');
    if (value !== null) {
      // We have data!!
      console.log(value);
    } else console.log('damn')
  } catch (error) {
    // Error retrieving data
  }
};
/** Stores data using the given key */
async function _storeData() {
  try {
    await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
  } catch (error) {
    // Error saving data
  }
};

// async function getLocalData (itemKey: string) {
//   try {
//     let localItem = await AsyncStorage.getItem(itemKey);
//     console.log(localItem);
//   } catch (e) { console.log(e) }
// }

// async function storeLocalData (itemKey: string, data: any) {
//   try {
//     let newLocalItem = await AsyncStorage.setItem(itemKey, data);
//     console.log(newLocalItem);
//   } catch (e) { console.log(e) }
// }

export { _retrieveData, _storeData }
