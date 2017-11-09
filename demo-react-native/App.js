import React from 'react';
import { StyleSheet, View } from 'react-native';
import CtrBtns from './src/components/ctrBtns';
import NumberBtns from './src/components/numberBtns';
import RecordBoard from './src/components/recordBoard';
import ResultBoard from './src/components/resultBoard';

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    curNumber: 0
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultBoard}>
          <ResultBoard.view />
        </View>
        <View style={styles.recordBoard}>
          <RecordBoard.view />
        </View>
        <View style={styles.btnBoard}>
          <View style={styles.numberBtns}>
            <CtrBtns.view />
          </View>
          <View style={styles.ctrBtns}>
            <NumberBtns.view />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultBoard: {
    flex: 2,
    width: '100%'
  },
  recordBoard: {
    flex: 1,
    width: '100%',
  },
  btnBoard: {
    flex: 4,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white'
  },
  numberBtns: {
    flex: 2,
    width:'100%'
  },
  ctrBtns: {
    flex: 1,
    width:'100%'
  }
});
