import React from 'react';
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

class CheckboxField extends React.Component {
  state = {
    modalVisible: false,
    value: false,
  };

  componentDidMount() {
    const {defaultValue} = this.props;
    if (defaultValue) {
      this.setState({
        value: defaultValue,
      });
    }
  }

  selectAction = () => {
    const {value} = this.state;
    const {field} = this.props;
    const {openModal = false} = field;
    if (value) {
      this.check(false);
    } else if (openModal) {
      this.setState(prevState => ({modalVisible: !prevState.modalVisible}));
    } else {
      this.check(true);
    }
  };

  check = val => {
    const {onChange} = this.props;
    onChange(val);
    this.setState({value: val, modalVisible: false});
  };

  render() {
    const {modalVisible, value} = this.state;
    const {
      field,
      customStyles,
      label,
      styleName,
      reference,
      errors,
      defaultTextModal,
      customIcon,
    } = this.props;
    const {name, openModal = false} = field;
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
            ref={reference}
            value={value}
            customIcon={customIcon}
            onPress={() => this.selectAction()}
          />
          <TouchableOpacity
            onPress={() => this.selectAction()}
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
              check={this.check}
              toggleModal={this.selectAction}
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
  }
}

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
  customStyles: {},
  defaultValue: null,
  label: '',
};

CheckboxField.propTypes = {
  field: PropTypes.object.isRequired,
  styleName: PropTypes.string.isRequired,
  reference: PropTypes.func.isRequired,
  onPress: PropTypes.func,
  customStyles: PropTypes.object,
  label: PropTypes.string,
};

export default CheckboxField;
