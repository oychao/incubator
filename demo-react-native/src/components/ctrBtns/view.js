import React from 'react';
import { StyleSheet, View } from 'react-native';
import CalcBtn from '../calcBtn';
import SettingBtn from '../settingBtn';

class CtrBtns extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.index}>
        <View style={styles.calcBtnLine}>
          <View style={styles.btn}>
            <CalcBtn.view value="+" />
          </View>
          <View style={styles.btn}>
            <CalcBtn.view value="-" />
          </View>
          <View style={styles.btn}>
            <CalcBtn.view value="×" />
          </View>
          <View style={styles.btn}>
            <CalcBtn.view value="÷" />
          </View>
        </View>
        <View style={styles.settingBtnLine}>
          <View style={styles.btn}>
            <SettingBtn.view onResetBtnPress={this.props.onResetBtnPress} value="C" />
          </View>
          <View style={styles.btn}>
            <SettingBtn.view value="=" />
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
