import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
// COMPONENTS
import Checkbox from './Checkbox';
import TextModal from './TextModal';
import ErrorMessage from './ErrorMessage';

const CheckboxField = ({
  field,
  customStyles,
  label,
  styleName,
  errors,
  defaultTextModal,
  customIcon,
  defaultValue,
  onChange,
}) => {
  const {name, openModal = false} = field;

  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, []);

  const selectAction = () => {
    const {openModal = false} = field;
    if (value) {
      check(false);
    } else if (openModal) {
      setModalVisible(!modalVisible);
    } else {
      check(true);
    }
  };

  const check = val => {
    onChange(val);
    setValue(val);
    setModalVisible(false);
  };

  return (
    <View
      style={StyleSheet.flatten([
        styles.checkboxContainer,
        customStyles.checkboxContainer,
        customStyles[`checkboxContainer${styleName}`],
      ])}>
      <View
        style={StyleSheet.flatten([
          styles.checkboxWrapper,
          customStyles.checkboxWrapper,
          customStyles[`checkboxWrapper${styleName}`],
        ])}>
        <Checkbox
          field={field}
          value={value}
          customIcon={customIcon}
          onPress={() => selectAction()}
        />
        <TouchableOpacity
          onPress={() => selectAction()}
          style={StyleSheet.flatten([
            styles.checkboxTextWrapper,
            customStyles.checkboxTextWrapper,
            customStyles[`checkboxTextWrapper${styleName}`],
          ])}>
          <Text
            style={StyleSheet.flatten([
              styles.checkboxText,
              customStyles.checkboxText,
              customStyles[`checkboxText${styleName}`],
            ])}>
            {label}
          </Text>
        </TouchableOpacity>
        {openModal && (
          <TextModal
            visible={modalVisible}
            check={check}
            toggleModal={selectAction}
            field={field}
            defaultTextModal={defaultTextModal}
            styleName={styleName}
            customStyles={customStyles}
          />
        )}
      </View>
      {errors[name] && (
        <ErrorMessage
          error={errors[name]}
          name={styleName}
          customStyles={customStyles}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    marginBottom: 20,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxTextWrapper: {
    width: '90%',
  },
  checkboxText: {},
});

CheckboxField.defaultProps = {
  onPress: () => {},
  onChange: () => {},
  customStyles: {},
  defaultValue: null,
  label: '',
  defaultTextModal: '',
};

CheckboxField.propTypes = {
  field: PropTypes.object.isRequired,
  styleName: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  customStyles: PropTypes.object,
  label: PropTypes.string,
  defaultTextModal: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
};

export default CheckboxField;
