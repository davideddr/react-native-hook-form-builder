import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

class FormGroupLabel extends React.PureComponent {
  render() {
    const {label, customStyles} = this.props;
    return (
      <View
        style={StyleSheet.flatten([
          styles.formGroupLabelContainer,
          customStyles.formGroupLabelContainer,
        ])}>
        <Text
          style={StyleSheet.flatten([
            styles.formGroupLabelText,
            customStyles.formGroupLabelText,
          ])}>
          {label}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formGroupLabelText: {
    paddingVertical: 20,
    fontWeight: '800',
    fontSize: 18,
  },
});

FormGroupLabel.defaultProps = {
  customStyles: {},
};

FormGroupLabel.propTypes = {
  label: PropTypes.string.isRequired,
  customStyles: PropTypes.object,
};

export default FormGroupLabel;
