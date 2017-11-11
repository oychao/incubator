import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalcBtn from '../CalcBtn';
import SettingBtn from '../SettingBtn';
import * as CONS from '../../constants';

class CtrBtns extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.index}>
        <View style={styles.calcBtnLine}>
          <View style={styles.btn}>
            <CalcBtn.view value="+" operator={CONS.ADD} onUpdateOperator={this.props.onUpdateOperator} />
          </View>
          <View style={styles.btn}>
            <CalcBtn.view value="-" operator={CONS.SUB} onUpdateOperator={this.props.onUpdateOperator} />
          </View>
          <View style={styles.btn}>
            <CalcBtn.view value="×" operator={CONS.MUL} onUpdateOperator={this.props.onUpdateOperator} />
          </View>
          <View style={styles.btn}>
            <CalcBtn.view value="÷" operator={CONS.DIV} onUpdateOperator={this.props.onUpdateOperator} />
          </View>
        </View>
        <View style={styles.settingBtnLine}>
          <View style={styles.btn}>
            <SettingBtn.view onBtnPress={this.props.onResetBtnPress} value="C" />
          </View>
          <View style={styles.btn}>
            <SettingBtn.view onBtnPress={this.props.onCalcBtnPress} value="=" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  index: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  calcBtnLine: {
    flex: 1,
    flexDirection: 'row',
  },
  settingBtnLine: {
    flex: 1,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CtrBtns;
