import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';
import NestedScrollView from 'react-native-nested-scroll-view';

const TextOnly = ({
  label,
  styleName,
  customStyles,
  description,
}) => {
  return (
    <View
      style={StyleSheet.flatten([
        styles.textOnlyContainer,
        customStyles.textOnlyContainer,
        customStyles[`textOnlyContainer${styleName}`],
      ])}>
      {label && (
        <Text
          style={StyleSheet.flatten([
            styles.textOnlyLabel,
            customStyles.textOnlyLabel,
            customStyles[`textOnlyLabel${styleName}`],
          ])}>
          {label}
        </Text>
      )}
      {description && (
        <NestedScrollView
          style={StyleSheet.flatten([
            styles.textOnlyTextArea,
            customStyles.textOnlyTextArea,
            customStyles[`textOnlyTextArea${styleName}`],
          ])}>
          <HTMLView value={description} />
        </NestedScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textOnlyContainer: {
    marginTop: 15,
  },
  textOnlyLabel: {
    marginBottom: 15,
    fontWeight: '800',
  },
  textOnlyTextArea: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    height: 100,
    marginBottom: 30,
  }
});

TextOnly.defaultProps = {
  customStyles: {},
  description: null,
  label: ''
};

TextOnly.propTypes = {
  styleName: PropTypes.string.isRequired,
  customStyles: PropTypes.object,
  description: PropTypes.string,
  label: PropTypes.string,
};

export default TextOnly;
