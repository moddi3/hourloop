import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleSheet } from 'react-native';

export const { hairlineWidth } = StyleSheet;

const BORDER_RADIUS = 5;

const styles = EStyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 10,
  },

  modalContent: {
    // flex: 1,
    backgroundColor: '$border',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDER_RADIUS,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonWrapper: {
    backgroundColor: '$white',
    height: 50,
    minWidth: '100%',
    marginTop: hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    // borderTopWidth: hairlineWidth,
    borderRadius: BORDER_RADIUS,

    // borderTopColor: '$border',
  },

  title: {
    minWidth: '100%',
    borderRadius: BORDER_RADIUS,
    backgroundColor: '$white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: { fontFamily: 'circular-bold' },
});

export default styles;
