import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    marginBottom: 15,
  },
  card: {
    // flexDirection: 'column',
    // justifyContent: 'flex-start',
    borderRadius: 2,
    minWidth: '100%',
    // width: 260,
    height: 110,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {},
});

export default styles;
