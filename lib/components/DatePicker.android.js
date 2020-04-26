import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// COMPONENTS
import ErrorMessage from './ErrorMessage';

const DatePicker = ({
  field,
  label,
  onChange,
  errors,
  customStyles,
  currentLocale,
  styleName,
  customIcon,
  defaultValue,
}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      setDate(new Date(...defaultValue.split('-')));
    }
  }, []);

  const FormIcon = customIcon || Icon;

  return (
    <View
      style={StyleSheet.flatten([
        styles.datePickerContainer,
        customStyles.datePickerContainer,
        customStyles[`datePickerContainer${styleName}`],
      ])}>
      {label && (
        <Text
          style={StyleSheet.flatten([
            styles.datePickerLabel,
            customStyles.datePickerLabel,
            customStyles[`datePickerLabel${styleName}`],
          ])}>
          {label}
        </Text>
      )}
      <View
        style={StyleSheet.flatten([
          styles.datePickerTextWrapper,
          customStyles.datePickerTextWrapper,
          customStyles[`datePickerTextWrapper${styleName}`],
          (field.icon || field.iconLeft || field.iconRight) && {
            paddingHorizontal: 5,
          },
        ])}>
        {(field.icon || field.iconLeft) && (
          <FormIcon
            name={field.icon || field.iconLeft}
            size={field.iconSize || 20}
            color={field.iconColor || '#000'}
          />
        )}
        <Text
          style={StyleSheet.flatten([
            styles.datePickerText,
            customStyles.datePickerText,
            customStyles[`datePickerText${styleName}`],
            (field.icon || field.iconLeft || field.iconRight) && {
              marginHorizontal: 5,
            },
          ])}
          onPress={() => setShow(!show)}>
          {date.toLocaleDateString(currentLocale)}
        </Text>
        {field.iconRight && (
          <FormIcon
            name={field.iconRight}
            size={field.iconSize || 20}
            color={field.iconColor || '#000'}
          />
        )}
      </View>
      {show && (
        <DateTimePicker
          value={date}
          minimumDate={
            field.minimumDate
              ? new Date(...field.minimumDate.split('-'))
              : null
          }
          maximumDate={
            field.maximumDate
              ? new Date(...field.maximumDate.split('-'))
              : new Date()
          }
          onChange={(event, newDate) => {
            setShow(!show);
            setDate(newDate || date);
            onChange(newDate);
          }}
        />
      )}
      {errors[field.name] && (
        <ErrorMessage
          error={errors[field.name]}
          name={styleName}
          customStyles={customStyles}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    marginBottom: 20,
  },
  datePickerTextWrapper: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datePickerText: {
    paddingVertical: 10,
    width: '80%',
  },
  datePickerLabel: {
    marginBottom: 15,
    fontWeight: '800',
  },
  inputTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#000',
  },
  inputText: {
    flex: 1,
    padding: 10,
  },
});

DatePicker.defaultProps = {
  value: new Date(),
  customStyles: {},
  errors: {},
  currentLocale: '',
  label: null,
  defaultValue: null,
};

DatePicker.propTypes = {
  field: PropTypes.object.isRequired,
  styleName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  errors: PropTypes.object,
  customStyles: PropTypes.object,
  currentLocale: PropTypes.string,
};

export default DatePicker;
