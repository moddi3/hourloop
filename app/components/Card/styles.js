import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 4,
    height: 95,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expired: {
    opacity: 0.75,
    flexDirection: 'row',
  },
});

export default styles;
