import {useTheme} from '@react-navigation/native';
import React, {useRef} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ITheme} from '../assets/globals/theme';

interface IProp {
  onTermChange(e: string): void;
}
export default (props: IProp) => {
  const {colors} = useTheme() as unknown as ITheme;

  // const [textInputFocussed, setTextInputFocussed] = useState(false);
  const textInput = useRef<TextInput | null>(null);
  return (
    <View style={styles.base}>
      <Icon
        // name={textInputFocussed ? 'arrow-left' : 'magnify'}
        name={'magnify'}
        size={25}
        color={colors.icon}
      />
      <TextInput
        accessibilityLabel="Search Box"
        autoFocus={false}
        allowFontScaling={true}
        autoCapitalize="none"
        clearTextOnFocus={true}
        maxLength={20}
        placeholder="What are you looking for?"
        textAlignVertical="center"
        onChangeText={(e: string) => props.onTermChange(e)}
        ref={textInput}
        //  onFocus={() => setTextInputFocussed(true)}
        //  onBlur={() => setTextInputFocussed(false)}
        style={{flex: 1}}></TextInput>
      <Icon
        // name={textInputFocussed ? 'close-circle-outline' : null}
        name={'close-circle-outline'}
        size={25}
        color={colors.icon}
        onPress={() => {
          props.onTermChange('');
          textInput.current!.clear();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: '#ccc',
    justifyContent: 'space-between',
    borderWidth: 0.7,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 8,
  },
});

/**
 * F199E;mdi-tab-search;F0866;mdi-database-search;
 */
