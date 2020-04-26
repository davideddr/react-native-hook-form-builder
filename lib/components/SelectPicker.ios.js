import React, {useState, useEffect} from 'react';
import {
  Picker,
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// COMPONENTS
import ErrorMessage from './ErrorMessage';
// UTILS
import {height, width} from '../utils/constants';

const SelectPicker = ({
  field,
  label,
  onChange,
  errors,
  items,
  customStyles,
  styleName,
  currentLocale,
  confirmLabel,
  customIcon,
  placeholder,
  defaultValue
}) => {
  const [value, setValue] = useState(null);
  const [valueIndex, setValueIndex] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      const index = items.map(i => i.value).indexOf(defaultValue);
      onChange(defaultValue);
      setValue(defaultValue);
      setValueIndex(index);
      setSelectedValue(defaultValue);
      setSelectedIndex(index);
    }
  }, []);

  const toggleModal = (type = 'out') => {
    if (show && !selectedValue && type === 'done') {
      onChange(items[0].value);
      setValue(items[0].value);
      setValueIndex(0);
    }
    setShow(!show);
    setSelectedValue(value);
    setSelectedIndex(valueIndex);
  };

  const FormIcon = customIcon || Icon;

  return (
    <View
      style={StyleSheet.flatten([
        styles.selectPickerContainer,
        customStyles.selectPickerContainer,
        customStyles[`selectPickerContainer${styleName}`],
      ])}>
      {label && (
        <Text
          style={StyleSheet.flatten([
            styles.selectPickerLabel,
            customStyles.selectPickerLabel,
            customStyles[`selectPickerLabel${styleName}`],
          ])}>
          {label}
        </Text>
      )}
      <View
        style={StyleSheet.flatten([
          styles.selectPickerTextWrapper,
          customStyles.selectPickerTextWrapper,
          customStyles[`selectPickerTextWrapper${styleName}`],
        ])}>
        <TouchableOpacity
          style={StyleSheet.flatten([
            styles.selectPickerTextTouch,
            customStyles.selectPickerTextTouch,
            customStyles[`selectPickerTextTouch${styleName}`],
          ])}
          onPress={() => toggleModal()}>
          {(field.icon || field.iconLeft) && (
            <FormIcon
              name={field.icon || field.iconLeft}
              size={field.iconSize || 20}
              color={field.iconColor || '#000'}
            />
          )}
          <Text
            style={StyleSheet.flatten([
              styles.selectPickerText,
              customStyles.selectPickerText,
              customStyles[`selectPickerText${styleName}`],
              (field.icon || field.iconLeft || field.iconRight) && {
                marginHorizontal: 5,
              },
              !items[valueIndex] && {
                color: 'gray',
                ...customStyles.selectPickerPlaceholderText,
                ...customStyles[`selectPickerPlaceholderText${styleName}`],
              }
            ])}>
            {
              items[valueIndex]
              ? (items[valueIndex].label instanceof Object ? items[valueIndex].label[currentLocale] : items[valueIndex].label)
              : placeholder
            }
          </Text>
          {field.iconRight && (
            <FormIcon
              name={field.iconRight}
              size={field.iconSize || 20}
              color={field.iconColor || '#000'}
            />
          )}
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent
        visible={show}
        onRequestClose={() => toggleModal()}>
        <TouchableOpacity
          style={StyleSheet.flatten([
            styles.selectPickerModalOverlay,
            customStyles.selectPickerModalOverlay,
            customStyles[`selectPickerModalOverlay${styleName}`],
          ])}
          activeOpacity={1}
          onPress={() => toggleModal()}
        />
        <View
          style={StyleSheet.flatten([
            styles.selectPickerModalContainer,
            customStyles.selectPickerModalContainer,
            customStyles[`selectPickerModalContainer${styleName}`],
          ])}>
          <View
            style={StyleSheet.flatten([
              styles.selectPickerModalWrapper,
              customStyles.selectPickerModalWrapper,
              customStyles[`selectPickerModalWrapper${styleName}`],
            ])}>
            <View
              style={StyleSheet.flatten([
                styles.selectPickerModalConfirmContainer,
                customStyles.selectPickerModalConfirmContainer,
                customStyles[`selectPickerModalConfirmContainer${styleName}`],
              ])}>
              <TouchableOpacity
                onPress={() => {
                  setValue(selectedValue);
                  setValueIndex(selectedIndex);
                  onChange(selectedValue);
                  toggleModal('done');
                }}>
                <Text>{confirmLabel}</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
                setSelectedIndex(itemIndex);
              }}>
              {items.map(i => {
                const l =
                  i.label instanceof Object
                    ? i.label[currentLocale]
                    : i.label;
                return (
                  <Picker.Item key={i.value} label={l} value={i.value} />
                );
              })}
            </Picker>
          </View>
        </View>
      </Modal>
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
  selectPickerContainer: {
    marginBottom: 20,
  },
  selectPickerTextWrapper: {
    borderWidth: 1,
    borderColor: '#000',
  },
  selectPickerTextTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectPickerText: {
    width: '90%',
  },
  selectPickerLabel: {
    marginBottom: 15,
    fontWeight: '800',
  },
  selectPickerModalOverlay: {
    height: (height * 2) / 3,
    backgroundColor: 'rgba(60, 60, 60, 0.5)',
  },
  selectPickerModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 80,
    backgroundColor: '#fff',
  },
  selectPickerModalWrapper: {
    flex: 1,
    padding: 15,
    width,
  },
  selectPickerModalConfirmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

SelectPicker.defaultProps = {
  customStyles: {},
  errors: {},
  label: null,
  customIcon: null,
};

SelectPicker.propTypes = {
  field: PropTypes.object.isRequired,
  styleName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  errors: PropTypes.object,
  customStyles: PropTypes.object,
  currentLocale: PropTypes.string,
};

export default SelectPicker;
