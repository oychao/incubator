import React from 'react';
import { StyleSheet, View } from 'react-native';
import CtrBtns from './src/components/ctrBtns';
import NumberBtns from './src/components/numberBtns';
import RecordBoard from './src/components/recordBoard';
import ResultBoard from './src/components/resultBoard';

console.disableYellowBox = true;

export default class App extends React.Component {
  state = {
    formula: ''
  };
  constructor(props) {
    super(props);
    this.handlePendingFormula = this.handlePendingFormula.bind(this);
    this.handleResetFormula = this.handleResetFormula.bind(this);
  }
  handlePendingFormula(str) {
    this.setState({
      formula: this.state.formula + str
    });
  }
  handleResetFormula() {
    this.setState({
      formula: ''
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultBoard}>
          <ResultBoard.view formula={this.state.formula} />
        </View>
        <View style={styles.recordBoard}>
          <RecordBoard.view />
        </View>
        <View style={styles.btnBoard}>
          <View style={styles.numberBtns}>
            <NumberBtns.view onBtnPress={this.handlePendingFormula} />
          </View>
          <View style={styles.ctrBtns}>
            <CtrBtns.view onResetBtnPress={this.handleResetFormula} />
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
    flex: 3,
    width: '100%'
  },
  recordBoard: {
    flex: 1,
    width: '100%',
  },
  btnBoard: {
    flex: 6,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'white'
  },
  numberBtns: {
    flex: 2,
    width: '100%'
  },
  ctrBtns: {
    flex: 1,
    width: '100%'
  }
});
