import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';

const Button = ({onPress, customStyles, styleName, buttonLabel}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={StyleSheet.flatten([
        styles.buttonContainer,
        customStyles.buttonContainer,
        customStyles[`buttonContainer${styleName}`],
      ])}>
      <View
        style={StyleSheet.flatten([
          styles.buttonContent,
          customStyles.buttonContent,
          customStyles[`buttonContent${styleName}`],
        ])}>
        <Text
          style={StyleSheet.flatten([
            styles.buttonText,
            customStyles.buttonText,
            customStyles[`buttonText${styleName}`],
          ])}>
          {buttonLabel}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  buttonContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});

Button.defaultProps = {
  onPress: () => {},
  customStyles: {},
};

Button.propTypes = {
  styleName: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  customStyles: PropTypes.object,
};

export default Button;
