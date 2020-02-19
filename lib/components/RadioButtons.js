import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';
import NestedScrollView from 'react-native-nested-scroll-view';
// COMPONENTS
import ErrorMessage from './ErrorMessage';

class RadioButtons extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      value: null,
    };
  }

  componentDidMount() {
    const {defaultValue} = this.props;
    if (defaultValue) {
      this.setState({value: defaultValue});
    }
  }

  renderRadioButton = (item, index) => {
    const {
      currentLocale,
      onChange,
      customStyles,
      styleName,
      reference,
    } = this.props;
    const {value} = this.state;
    const label =
      item.label instanceof Object ? item.label[currentLocale] : item.label;
    return (
      <TouchableOpacity
        key={index}
        ref={reference}
        style={StyleSheet.flatten([
          styles.radioButtonWrapper,
          customStyles.radioButtonWrapper,
          customStyles[`radioButtonWrapper${styleName}`],
        ])}
        onPress={() => {
          this.setState({value: item.value});
          onChange(item.value);
        }}>
        <View
          style={StyleSheet.flatten([
            styles.radioButton,
            customStyles.radioButton,
            customStyles[`radioButton${styleName}`],
          ])}>
          {value === item.value && (
            <View
              style={StyleSheet.flatten([
                styles.radioButtonChecked,
                customStyles.radioButtonChecked,
                customStyles[`radioButtonChecked${styleName}`],
              ])}
            />
          )}
        </View>
        <Text
          style={StyleSheet.flatten([
            styles.radioButtonText,
            customStyles.radioButtonText,
            customStyles[`radioButtonText${styleName}`],
          ])}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      items,
      label,
      styleName,
      customStyles,
      errors,
      field,
      description,
    } = this.props;
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
        {description && (
          <NestedScrollView
            style={StyleSheet.flatten([
              styles.radioButtonTextArea,
              customStyles.radioButtonTextArea,
              customStyles[`radioButtonTextArea${styleName}`],
            ])}>
            <HTMLView value={description} />
            {/* <Text
              style={StyleSheet.flatten([
                styles.radioButtonDescription,
                customStyles.radioButtonDescription,
                customStyles[`radioButtonDescription${styleName}`],
              ])}>
              {description}
            </Text> */}
          </NestedScrollView>
        )}
        {items.map((item, index) => this.renderRadioButton(item, index))}
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
  radioButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
    marginLeft: 10,
  },
  radioButtonTextArea: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    height: 100,
    marginBottom: 15,
  },
  radioButtonDescription: {
    paddingBottom: 20,
  },
});

RadioButtons.defaultProps = {
  error: {},
  customStyles: {},
  description: null,
};

RadioButtons.propTypes = {
  field: PropTypes.object.isRequired,
  styleName: PropTypes.string.isRequired,
  error: PropTypes.object,
  customStyles: PropTypes.object,
  description: PropTypes.string,
};

export default RadioButtons;
