import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
// COMPONENTS
import ErrorMessage from './ErrorMessage';

class DatePicker extends React.Component {
  state = {
    date: new Date(),
    show: false,
  };

  render() {
    const {date, show} = this.state;
    const {
      field,
      label,
      reference,
      onChange,
      errors,
      customStyles,
      currentLocale,
      styleName,
    } = this.props;
    return (
      <View
        style={StyleSheet.flatten([
          styles.datePickerContainer,
          customStyles.datePickerContainer,
          customStyles[`datePickerContainer${styleName}`],
        ])}>
        <Text
          style={StyleSheet.flatten([
            styles.datePickerLabel,
            customStyles.datePickerLabel,
            customStyles[`datePickerLabel${styleName}`],
          ])}>
          {label}
        </Text>
        <View
          style={StyleSheet.flatten([
            styles.datePickerTextWrapper,
            customStyles.datePickerTextWrapper,
            customStyles[`datePickerTextWrapper${styleName}`],
          ])}>
          <Text
            style={StyleSheet.flatten([
              styles.datePickerText,
              customStyles.datePickerText,
              customStyles[`datePickerText${styleName}`],
            ])}
            onPress={() =>
              this.setState(prevState => ({show: !prevState.show}))
            }>
            {date.toLocaleDateString(currentLocale)}
          </Text>
        </View>
        {show && (
          <DateTimePicker
            ref={reference}
            value={date}
            maximumDate={new Date()}
            onChange={(event, date) => {
              this.setState(prevState => ({
                show: !prevState.show,
                date: date || prevState.date,
              }));
              onChange(date);
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
  }
}

const styles = StyleSheet.create({
  datePickerContainer: {
    marginBottom: 20,
  },
  datePickerTextWrapper: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 5,
  },
  datePickerText: {
    padding: 10,
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
};

DatePicker.propTypes = {
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

export default DatePicker;
