import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

class Checkbox extends React.PureComponent {
  render() {
    const {customStyles, onPress, progress} = this.props;
    return (
      <TouchableOpacity
        style={StyleSheet.flatten([styles.checkbox, customStyles.checkbox])}
        onPress={() => onPress()}>
        <LottieView
          enableMergePathsAndroidForKitKatAndAbove
          progress={progress}
          source={require('../assets/animations/checkbox.json')}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  checkbox: {
    height: 30,
    flex: 1,
  },
});

Checkbox.defaultProps = {
  onPress: () => {},
  customStyles: {},
};

Checkbox.propTypes = {
  progress: PropTypes.object.isRequired,
  customStyles: PropTypes.object,
  onPress: PropTypes.func,
};

export default Checkbox;
