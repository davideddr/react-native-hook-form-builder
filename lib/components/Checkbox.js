import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Checkbox = ({customStyles, onPress, value, field, customIcon}) => {
  const {icon, iconChecked, iconSize, iconColor} = field;
  const iconName = icon ? icon : 'checkbox-blank-outline';
  const iconNameChecked = iconChecked ? iconChecked : 'check-box-outline';
  const FormIcon = customIcon || Icon;
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.checkbox, customStyles.checkbox])}
      onPress={() => onPress()}>
      <FormIcon
        name={value ? iconNameChecked : iconName}
        size={iconSize || 30}
        color={iconColor}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    height: 30,
    flex: 1,
  },
});

Checkbox.defaultProps = {
  onPress: () => {},
  customStyles: {},
};

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  customStyles: PropTypes.object,
  onPress: PropTypes.func,
};

export default Checkbox;
