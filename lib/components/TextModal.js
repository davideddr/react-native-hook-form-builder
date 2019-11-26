import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// COMPONENTS
import Button from './Button';
// UTILS
import {height} from '../utils/constants';

class TextModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabledButton: true,
      screenHeight: 0,
    };
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({screenHeight: contentHeight});
  };

  render() {
    const {disabledButton, screenHeight} = this.state;
    const {
      field,
      visible,
      toggleModal,
      type,
      check,
      customStyles,
      styleName,
    } = this.props;
    const scrollEnabled = screenHeight > (height - 100);
    const disBtn = disabledButton && scrollEnabled;
    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        onRequestClose={() => toggleModal()}>
        <View
          style={StyleSheet.flatten([
            styles.textModalContainer,
            customStyles.textModalContainer,
            customStyles[`textModalContainer${styleName}`],
          ])}>
          <View
            style={StyleSheet.flatten([
              styles.textModalWrapper,
              customStyles.textModalWrapper,
              customStyles[`textModalWrapper${styleName}`],
            ])}>
            <View
              style={StyleSheet.flatten([
                styles.closeModal,
                customStyles.closeModal,
                customStyles[`closeModal${styleName}`],
              ])}>
              <TouchableWithoutFeedback onPress={() => toggleModal()}>
                <Icon name="close" size={20} />
              </TouchableWithoutFeedback>
            </View>
            <ScrollView
              scrollEnabled={scrollEnabled}
              contentContainerStyle={styles.textModalScrollView}
              onScroll={({nativeEvent}) => {
                if (this.isCloseToBottom(nativeEvent)) {
                  this.setState({disabledButton: false});
                }
              }}
              scrollEventThrottle={400}
              onContentSizeChange={this.onContentSizeChange}>
              <Text>{field.text}</Text>
            </ScrollView>
            <View>
              <Button
                disabled={disBtn}
                onPress={() => check(true)}
                buttonLabel={field.buttonAcceptLabel}
                styleName={styleName}
                customStyle={{
                  buttonContainer:
                    styles[
                      disBtn ? 'acceptButtonDisabled' : 'acceptButtonActive'
                    ],
                }}>
                {'form.accept'}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(60, 60, 60, 0.5)',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  textModalWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textModalScrollView: {
    flexGrow: 1,
  },
  acceptButtonActive: {
    elevation: 1,
    backgroundColor: 'blue',
  },
  acceptButtonDisabled: {
    elevation: 0,
    backgroundColor: 'grey',
  },
  closeModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
});

TextModal.defaultProps = {
  customStyles: {},
};

TextModal.propTypes = {
  field: PropTypes.object.isRequired,
  customStyles: PropTypes.object,
};

export default TextModal;
