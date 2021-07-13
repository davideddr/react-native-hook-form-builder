import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// COMPONENTS
import Button from './Button';
// UTILS
import {height} from '../utils/constants';

const TextModal = ({
  field,
  visible,
  toggleModal,
  type,
  check,
  customStyles,
  styleName,
  defaultTextModal,
  modalHint,
  modalText,
}) => {
  const [disabledButton, setDisabledButton] = useState(true);
  const [screenHeight, setScreenHeight] = useState(0);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setScreenHeight(contentHeight);
  };

  const scrollEnabled = screenHeight > (height - 100);
  const disBtn = field.forceEnableButton ? false : disabledButton && scrollEnabled;

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
            <TouchableOpacity onPress={() => toggleModal()}>
              <Icon name="close" size={20} />
            </TouchableOpacity>
          </View>
          <ScrollView
            scrollEnabled={scrollEnabled}
            contentContainerStyle={styles.textModalScrollView}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                setDisabledButton(false);
              }
            }}
            scrollEventThrottle={400}
            onContentSizeChange={onContentSizeChange}>
            {modalHint && (<Text
              style={StyleSheet.flatten([
                styles.textModalHint,
                customStyles.textModalHint,
                customStyles[`textModalHint${styleName}`],
            ])}>
              {modalHint}
            </Text>)}
            <Text>{modalText || defaultTextModal}</Text>
          </ScrollView>
          <View>
            <Button
              disabled={disBtn}
              onPress={() => {
                if (!disBtn) {
                  check(true)}
                }
              }
              buttonLabel={field.buttonAcceptLabel}
              styleName={styleName}
              customStyles={{
                ...styles,
                ...customStyles,
                buttonContainer: {
                  ...styles.buttonTextModal,
                  ...customStyles.buttonTextModal,
                  ...styles[
                    disBtn ? 'acceptButtonDisabled' : 'acceptButtonActive'
                  ],
                  ...customStyles[
                    disBtn ? 'acceptButtonDisabled' : 'acceptButtonActive'
                  ],
                },
              }}>
              {'form.accept'}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
  textModalHint: {
    marginBottom: 10,
    fontWeight: '800',
    fontSize: 20,
  },
  buttonTextModal: {
    marginTop: 20,
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
  defaultTextModal: null,
  modalHint: null,
  modalText: null,
};

TextModal.propTypes = {
  field: PropTypes.object.isRequired,
  customStyles: PropTypes.object,
  defaultTextModal: PropTypes.string,
  modalHint: PropTypes.string,
  modalText: PropTypes.string,
};

export default TextModal;
