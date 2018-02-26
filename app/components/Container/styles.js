import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '$white',
    marginHorizontal: 20,
    marginBottom: 0,
    marginTop: StatusBar.currentHeight + 10,
  },
});

export default styles;
