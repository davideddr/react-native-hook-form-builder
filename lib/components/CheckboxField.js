import React from 'react';
import {
  Animated,
  Easing,
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
    progress: new Animated.Value(0),
    modalVisible: false,
    value: false,
  };

  componentDidMount() {
    const {defaultValue} = this.props;
    if (defaultValue) {
      this.setState({
        progress: new Animated.Value(defaultValue ? 1 : 0),
        value: defaultValue,
      });
    }
  }

  toggleModal = () => {
    const {value} = this.state;
    if (value) {
      this.check(false);
    } else {
      this.setState(prevState => ({modalVisible: !prevState.modalVisible}));
    }
  };

  check = val => {
    const {onChange} = this.props;
    const {progress} = this.state;
    onChange(val);
    this.setState({value: val, modalVisible: false});
    const value = val ? 1 : 0;
    Animated.timing(progress, {
      toValue: value,
      duration: 1000,
      easing: Easing.quad,
    }).start();
  };

  render() {
    const {progress, modalVisible} = this.state;
    const {field, customStyles, styleName, reference, errors} = this.props;
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
            ref={reference}
            progress={progress}
            onPress={() => this.toggleModal()}
          />
          <TouchableOpacity
            onPress={() => this.toggleModal()}
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
              {field.text}
            </Text>
          </TouchableOpacity>
          <TextModal
            visible={modalVisible}
            check={this.check}
            toggleModal={this.toggleModal}
            field={field}
            styleName={styleName}
          />
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
};

CheckboxField.propTypes = {
  field: PropTypes.object.isRequired,
  styleName: PropTypes.string.isRequired,
  reference: PropTypes.func.isRequired,
  onPress: PropTypes.func,
  customStyles: PropTypes.object,
};

export default CheckboxField;
