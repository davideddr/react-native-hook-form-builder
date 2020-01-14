import React from 'react';
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

class SelectPicker extends React.Component {
  state = {
    value: null,
    valueIndex: null,
    selectedValue: null,
    selectedIndex: null,
    show: false,
  };

  componentDidMount() {
    const {defaultValue, items, onChange} = this.props;
    if (defaultValue) {
      const index = items.map(i => i.value).indexOf(defaultValue);
      onChange(defaultValue);
      this.setState({
        value: defaultValue,
        valueIndex: index,
        selectedValue: defaultValue,
        selectedIndex: index,
      });
    }
  }

  toggleModal = (type = 'out') => {
    const {onChange, items} = this.props;
    const {selectedValue, show} = this.state;
    if (show && !selectedValue && type === 'done') {
      onChange(items[0].value);
      this.setState({
        value: items[0].value,
        valueIndex: 0,
      });
    }
    this.setState(prevState => ({
      show: !prevState.show,
      selectedValue: prevState.value,
      selectedIndex: prevState.valueIndex,
    }));
  };

  render() {
    const {selectedIndex, selectedValue, show, valueIndex} = this.state;
    const {
      field,
      label,
      reference,
      onChange,
      errors,
      items,
      customStyles,
      styleName,
      currentLocale,
      confirmLabel,
      customIcon,
      placeholder,
    } = this.props;
    const FormIcon = customIcon || Icon;
    return (
      <View
        ref={reference}
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
            onPress={() => this.toggleModal()}>
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
          onRequestClose={() => this.toggleModal()}>
          <TouchableOpacity
            style={StyleSheet.flatten([
              styles.selectPickerModalOverlay,
              customStyles.selectPickerModalOverlay,
              customStyles[`selectPickerModalOverlay${styleName}`],
            ])}
            activeOpacity={1}
            onPress={() => this.toggleModal()}
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
                    this.setState({
                      value: selectedValue,
                      valueIndex: selectedIndex,
                    });
                    onChange(selectedValue);
                    this.toggleModal('done');
                  }}>
                  <Text>{confirmLabel}</Text>
                </TouchableOpacity>
              </View>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({
                    selectedValue: itemValue,
                    selectedIndex: itemIndex,
                  });
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
  }
}

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
    padding: 10,
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
  reference: PropTypes.func.isRequired,
  label: PropTypes.string,
  value: PropTypes.instanceOf(Date),
  errors: PropTypes.object,
  customStyles: PropTypes.object,
  currentLocale: PropTypes.string,
};

export default SelectPicker;
