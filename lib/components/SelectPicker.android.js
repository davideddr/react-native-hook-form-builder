import React from 'react';
import {Picker, Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
// COMPONENTS
import ErrorMessage from './ErrorMessage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class SelectPicker extends React.Component {
  state = {
    selectedValue: null,
  };

  render() {
    const {selectedValue} = this.state;
    const {
      field,
      label,
      reference,
      onChange,
      errors,
      items,
      customStyles,
      customIcon,
      currentLocale,
      styleName,
    } = this.props;
    const FormIcon = customIcon || Icon;
    return (
      <View
        style={StyleSheet.flatten([
          styles.selectPickerContainer,
          customStyles.selectPickerContainer,
          customStyles[`selectPickerContainer${styleName}`],
        ])}>
        <Text
          style={StyleSheet.flatten([
            styles.selectPickerLabel,
            customStyles.selectPickerLabel,
            customStyles[`selectPickerLabel${styleName}`],
          ])}>
          {label}
        </Text>
        <View
          style={StyleSheet.flatten([
            styles.selectPickerWrapper,
            customStyles.selectPickerWrapper,
            customStyles[`selectPickerWrapper${styleName}`],
            field.customIcon ? styles.selectPickerWrapperWithIcon : {},
          ])}>
          <Picker
            ref={reference}
            selectedValue={selectedValue}
            style={StyleSheet.flatten([
              styles.selectPicker,
              customStyles.selectPicker,
              customStyles[`selectPicker${styleName}`],
              field.customIcon ? styles.selectPickerWithIcon : {},
            ])}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({selectedValue: itemValue});
              onChange(itemValue);
            }}>
            <Picker.Item label="-" value={null} />
            {items.map(i => {
              const label = i.label instanceof Object ? i.label[currentLocale] : i.label;
              return <Picker.Item key={i.value} label={label} value={i.value} />;
            })}
          </Picker>
          {field.customIcon && (
            <FormIcon
              name={field.customIcon}
              size={field.customIconSize || 20}
              color={field.customIconColor || '#000'}
            />
          )}
        </View>
        {errors[field.name] && (
          <ErrorMessage
            error={errors[field.name]}
            name={styleName}
            customStyles={customStyles}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectPickerContainer: {
    marginBottom: 20,
  },
  selectPickerWrapper: {
    borderWidth: 1,
    borderColor: '#000',
  },
  selectPickerWrapperWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  selectPickerLabel: {
    marginBottom: 15,
    fontWeight: '800',
  },
  selectPickerWithIcon: {
    width: '80%',
    backgroundColor: 'white',
  },
});

SelectPicker.defaultProps = {
  customStyles: {},
  errors: {},
};

SelectPicker.propTypes = {
  field: PropTypes.object.isRequired,
  styleName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  reference: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
  errors: PropTypes.object,
  customStyles: PropTypes.object,
  currentLocale: PropTypes.string,
};

export default SelectPicker;
