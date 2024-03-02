import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { globalTokens } from '../../styles';

export interface IProps {
  value?: string;
  active?: boolean;
  status?: 'default' | 'success' | 'error';
}

const CodeSlot: React.FC<IProps> = (props) => {
  const [blink, setBlink] = useState(true);
  setInterval(() => setBlink((blink) => !blink), 450);

  const status = props.status || 'default';

  const containerStyle = [styles.container, styles[`container__${status}`]];

  const textStyle = [styles.text, styles[`text__${status}`]];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{props.value || ''}</Text>
      {props.active && blink && <View style={styles.caret} />}
    </View>
  );
};

export default CodeSlot;

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 80,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: globalTokens.colors.grey,
    backgroundColor: globalTokens.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container__error: {
    borderColor: globalTokens.colors.red,
  },
  container__success: {
    borderColor: globalTokens.colors.black,
  },

  text: {
    // ...buildDefaultFontStyle('600'),
    color: globalTokens.colors.darkGrey,
    fontSize: 24,
  },
  text__error: {
    color: globalTokens.colors.darkRed,
  },

  caret: {
    width: 1,
    height: 26,
    marginLeft: -1,
    marginTop: 2,
    backgroundColor: globalTokens.colors.darkGrey,
    transform: [{ translateX: 3 }],
  },
});
