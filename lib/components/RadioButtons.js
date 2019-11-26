import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

class RadioButtons extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      value: null,
    };
  }

  renderRadioButton = (item, index) => {
    const {currentLocale, onChange, customStyles, styleName, reference} = this.props;
    const {value} = this.state;
    const label = item.label instanceof Object ? item.label[currentLocale] : item.label;
    return (
      <View
        key={index}
        style={StyleSheet.flatten([
          styles.radioButtonWrapper,
          customStyles.radioButtonWrapper,
          customStyles[`radioButtonWrapper${styleName}`],
        ])}>
        <TouchableOpacity
          ref={reference}
          style={StyleSheet.flatten([
            styles.radioButton,
            customStyles.radioButton,
            customStyles[`radioButton${styleName}`],
          ])}
          onPress={() => {
            this.setState({ value: item.value });
            onChange(item.value);
          }}>
          {value === item.value && (
            <View style={StyleSheet.flatten([
              styles.radioButtonChecked,
              customStyles.radioButtonChecked,
              customStyles[`radioButtonChecked${styleName}`],
            ])} />)
          }
        </TouchableOpacity>
        <Text
          style={StyleSheet.flatten([
            styles.radioButtonText,
            customStyles.radioButtonText,
            customStyles[`radioButtonText${styleName}`],
          ])}>
          {label}
        </Text>
      </View>
    )
  }

  render() {
    const {items, label, styleName, customStyles} = this.props;
    return (
      <View
        style={StyleSheet.flatten([
          styles.radioButtonsContainer,
          customStyles.radioButtonsContainer,
          customStyles[`radioButtonsContainer${styleName}`],
        ])}>
          <Text
            style={StyleSheet.flatten([
              styles.radioButtonLabel,
              customStyles.radioButtonLabel,
              customStyles[`radioButtonLabel${styleName}`],
            ])}>
            {label}
          </Text>
          {items.map((item, index) => this.renderRadioButton(item, index))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radioButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioButtonLabel: {
    marginBottom: 15,
    fontWeight: '800',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonChecked: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#000',
  },
  radioButtonText: {
    marginLeft: 10
  }
});

RadioButtons.defaultProps = {
  error: {},
  customStyles: {},
};

RadioButtons.propTypes = {
  field: PropTypes.object.isRequired,
  styleName: PropTypes.string.isRequired,
  error: PropTypes.object,
  customStyles: PropTypes.object,
};

export default RadioButtons;
