import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    marginBottom: 10,
  },
  card: {
    borderRadius: 4,
    minWidth: '100%',
    height: 95,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expired: {
    flexDirection: 'row',
  },
});

export default styles;
