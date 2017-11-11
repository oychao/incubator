import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as CONS from './src/constants';
import CtrBtns from './src/components/CtrBtns';
import NumberBtns from './src/components/NumberBtns';
import ResultBoard from './src/components/ResultBoard';

console.disableYellowBox = true;

const calculate = (num1, num2, op) => {
  num1 = +num1;
  num2 = +num2;
  let ret;
  switch (op) {
    case CONS.ADD:
      ret = num1 + num2;
      break;
    case CONS.SUB:
      ret = num1 - num2;
      break;
    case CONS.MUL:
      ret = num1 * num2;
      break;
    case CONS.DIV:
      ret = num1 / num2;
      break;
    default:
  }
  return ret + '';
}

export default class App extends React.Component {
  state = {
    num1: null,
    num2: null,
    operator: null,
    calculated: false
  };
  constructor(props) {
    super(props);
    this.handleResetFormula = this.handleResetFormula.bind(this);
    this.handleUpdateOperator = this.handleUpdateOperator.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleNumberInput = this.handleNumberInput.bind(this);
  }
  handleResetFormula() {
    this.setState({
      num1: null,
      num2: null,
      operator: null,
      calculated: false
    });
  }
  handleUpdateOperator(operator) {
    let { num1, num2 } = this.state;
    if (num1 === null) {
      num1 = 0;
    }
    if (num2 !== null && this.state.operator !== null) {
      num1 = calculate(num1, num2, this.state.operator);
      num2 = null;
    }
    this.setState({
      num1,
      num2,
      operator
    });
  }
  handleCalculate() {
    let { num1, num2, operator, calculated } = this.state;
    if (num1 !== null && num2 !== null) {
      num1 = calculate(num1, num2, operator);
      calculated = true;
      this.setState({
        num1,
        calculated
      });
    }
  }
  handleNumberInput(number) {
    const appendNumber = function (target) {
      target = target === null ? '' : target;
      target = parseFloat(target + number, 10);
      if (number === '.' && (target + '').indexOf(number) === -1) {
        target += number;
      }
      return target;
    };
    let { num1, num2, operator, calculated } = this.state;
    if (calculated) {
      num1 = appendNumber(null);
      num2 = null;
      operator = null;
      calculated = false;
    } else {
      if (operator === null) {
        num1 = appendNumber(num1);
      } else {
        num2 = appendNumber(num2);
      }
    }
    this.setState({
      num1,
      num2,
      operator,
      calculated
    });
  }
  render() {
    const { num1, num2, operator, calculated } = this.state;
    let number = num1;
    if (!calculated && operator !== null && num2 !== null) {
      number = num2;
    }
    return (
      <View style={styles.container}>
        <View style={styles.resultBoard}>
          <ResultBoard.view number={number} />
        </View>
        <View style={styles.btnBoard}>
          <View style={styles.numberBtns}>
            <NumberBtns.view onBtnPress={this.handleNumberInput} />
          </View>
          <View style={styles.ctrBtns}>
            <CtrBtns.view onUpdateOperator={this.handleUpdateOperator}
              onResetBtnPress={this.handleResetFormula} onCalcBtnPress={this.handleCalculate} />
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
