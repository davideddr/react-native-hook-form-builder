import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

class ErrorMessage extends React.PureComponent {
  render() {
    const {error, name, customStyles} = this.props;
    return (
      <View
        style={StyleSheet.flatten([
          styles.errorMessageContainer,
          customStyles.errorMessageContainer,
          customStyles[`errorMessageContainer${name}`],
        ])}>
        <Text
          style={StyleSheet.flatten([
            styles.errorMessageText,
            customStyles.errorMessageText,
            customStyles[`errorMessageText${name}`],
          ])}>
          {error.message}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorMessageText: {
    paddingVertical: 5,
    color: 'red',
  },
});

ErrorMessage.defaultProps = {
  error: {},
  customStyles: {},
};

ErrorMessage.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.object,
  customStyles: PropTypes.object,
};

export default ErrorMessage;
