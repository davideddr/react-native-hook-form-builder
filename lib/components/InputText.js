import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
// COMPONENTS
import ErrorMessage from './ErrorMessage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class InputText extends React.Component {
  state = {
    showPassword: false,
  };

  renderShowPassword = () => {
    const {showPassword} = this.state;
    const {showPasswordIconColor, showPasswordIconSize} = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.setState(prevState => ({
            showPassword: !prevState.showPassword,
          }))
        }>
        <Icon
          name={showPassword ? 'eye-outline' : 'eye-off'}
          size={showPasswordIconSize}
          color={showPasswordIconColor}
        />
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {showPassword} = this.state;
    const {
      field,
      label,
      onChange,
      reference,
      errors,
      iconSize,
      iconColor,
      customStyles,
      onBlur,
      styleName,
      placeholder,
    } = this.props;
    return (
      <View
        style={StyleSheet.flatten([
          styles.inputTextContainer,
          customStyles.inputTextContainer,
          customStyles[`inputTextContainer${styleName}`],
        ])}>
        <Text
          style={StyleSheet.flatten([
            styles.inputTextLabel,
            customStyles.inputTextLabel,
            customStyles[`inputTextLabel${styleName}`],
          ])}>
          {label}
        </Text>
        <View
          style={StyleSheet.flatten([
            styles.inputTextWrapper,
            customStyles.inputTextWrapper,
            customStyles[`inputTextWrapper${styleName}`],
            field.icon && {paddingHorizontal: 5},
          ])}>
          {field.icon && (
            <Icon name={field.icon} size={iconSize} color={iconColor} />
          )}
          <TextInput
            {...field}
            secureTextEntry={field.secureTextEntry && !showPassword}
            ref={reference}
            placeholder={placeholder}
            onChangeText={text => onChange(text)}
            onBlur={() => onBlur()}
            style={StyleSheet.flatten([
              styles.inputText,
              customStyles.inputText,
              customStyles[`inputText${styleName}`],
              field.icon && {marginHorizontal: 5},
            ])}
          />
          {field.type === 'password' && this.renderShowPassword()}
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
  inputTextContainer: {
    marginBottom: 20,
  },
  inputTextLabel: {
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

InputText.defaultProps = {
  showPasswordIconColor: '#000',
  showPasswordIconSize: 25,
  iconSize: 25,
  iconColor: '#000',
  customStyles: {},
  onBlur: () => {},
  placeholder: null,
};

InputText.propTypes = {
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  styleName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  reference: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  errors: PropTypes.object,
  showPasswordIconColor: PropTypes.string,
  showPasswordIconSize: PropTypes.number,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  placeholder: PropTypes.string,
  customStyles: PropTypes.object,
};

export default InputText;
