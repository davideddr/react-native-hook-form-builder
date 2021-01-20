import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
// COMPONENTS
import ErrorMessage from './ErrorMessage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputText = ({
  showPasswordIconColor,
  showPasswordIconSize,
  showPasswordIconName,
  hidePasswordIconName,
  onBlur,
  field,
  label,
  onChange,
  errors,
  iconSize,
  iconColor,
  customStyles,
  styleName,
  placeholder,
  changeBackgroundOnFocus,
  defaultValue,
  customIcon,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [changeBg, setChangeBg] = useState(false);

  const onBlurInput = async () => {
    if (changeBg) {
      setChangeBg(false);
    }

    await onBlur();
  };

  const FormIcon = customIcon || Icon;

  const renderShowPassword = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setShowPassword(!showPassword);
        }}>
        <FormIcon
          name={showPassword ? showPasswordIconName : hidePasswordIconName}
          size={showPasswordIconSize}
          color={showPasswordIconColor}
        />
      </TouchableOpacity>
    );
  };

  const changeBackground = changeBackgroundOnFocus => {
    if (changeBackgroundOnFocus) {
      setChangeBg(true);
    }
  };

  let iconName = null;
  if (field.icon) {
    iconName = field.icon.name !== undefined ? field.icon.name : field.icon;
  }
  if (field.iconLeft) {
    iconName =
      field.iconLeft.name !== undefined
        ? field.iconLeft.name
        : field.iconLeft;
  }
  if (field.iconRight) {
    iconName =
      field.iconRight.name !== undefined
        ? field.iconRight.name
        : field.iconRight;
  }

  return (
    <View
      style={StyleSheet.flatten([
        styles.inputTextContainer,
        customStyles.inputTextContainer,
        customStyles[`inputTextContainer${styleName}`],
      ])}>
      {label && (
        <Text
          style={StyleSheet.flatten([
            styles.inputTextLabel,
            customStyles.inputTextLabel,
            customStyles[`inputTextLabel${styleName}`],
          ])}>
          {label}
        </Text>
      )}
      <View
        style={StyleSheet.flatten([
          styles.inputTextWrapper,
          customStyles.inputTextWrapper,
          customStyles[`inputTextWrapper${styleName}`],
          (field.icon || field.iconLeft || field.iconRight) && {
            paddingHorizontal: 5,
          },
          field.editable != null && field.editable === false && [
            styles.inputTextWrapperNotEditable,
            customStyles.inputTextWrapperNotEditable,
            customStyles[`inputTextWrapperNotEditable${styleName}`],
          ]
        ])}>
        {(field.icon || field.iconLeft) && (
          <FormIcon name={iconName} size={iconSize} color={iconColor} />
        )}
        <TextInput
          {...field}
          secureTextEntry={field.secureTextEntry && !showPassword}
          placeholder={placeholder}
          // value={defaultValue}
          defaultValue={defaultValue}
          onChangeText={text => {
            onChange(text);
          }}
          onSubmitEditing={()=> Keyboard.dismiss()}
          blurOnSubmit={false}
          onBlur={() => onBlurInput()}
          onFocus={() => changeBackground(changeBackgroundOnFocus)}
          style={StyleSheet.flatten([
            styles.inputText,
            customStyles.inputText,
            customStyles[`inputText${styleName}`],
            (field.icon || field.iconLeft || field.iconRight) && {
              marginHorizontal: 5,
            },
            changeBg && [
              styles.inputTextOnFocusBackground,
              customStyles.inputTextOnFocusBackground,
              customStyles[`inputTextOnFocusBackground${styleName}`],
            ],
            field.editable != null && field.editable === false && [
              styles.inputTextNotEditable,
              customStyles.inputTextNotEditable,
              customStyles[`inputTextNotEditable${styleName}`],
            ]
          ])}
        />
        {field.type === 'password' && renderShowPassword()}
        {field.type !== 'password' && field.iconRight && (
          <FormIcon name={iconName} size={iconSize} color={iconColor} />
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
};

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
  inputTextOnFocusBackground: {
    backgroundColor: 'gray',
    color: 'white',
  },
  inputTextNotEditable: {
    backgroundColor: 'gray',
  }
});

InputText.defaultProps = {
  showPasswordIconColor: '#000',
  showPasswordIconSize: 25,
  iconSize: 25,
  iconColor: '#000',
  customStyles: {},
  onBlur: () => {},
  changeBackgroundOnFocus: false,
  placeholder: null,
  label: null,
  defaultValue: null,
  customIcon: null,
  showPasswordIconName: 'eye-outline',
  hidePasswordIconName: 'eye-off',
};

InputText.propTypes = {
  field: PropTypes.object.isRequired,
  styleName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  errors: PropTypes.object,
  showPasswordIconColor: PropTypes.string,
  showPasswordIconSize: PropTypes.number,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  showPasswordIconName: PropTypes.string,
  hidePasswordIconName: PropTypes.string,
  placeholder: PropTypes.string,
  customStyles: PropTypes.object,
};

export default InputText;
