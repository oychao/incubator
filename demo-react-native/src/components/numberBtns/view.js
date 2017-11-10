import React from 'react';
import { StyleSheet, View } from 'react-native';
import NumberBtn from '../numberBtn';

class NumberBtns extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.index}>
        <View style={styles.btnLine}>
          <View style={styles.btnBlock}>
            <NumberBtn.view onBtnPress={this.props.onBtnPress} value="1"></NumberBtn.view>
          </View>
          <View style={styles.btnBlock}>
            <NumberBtn.view onBtnPress={this.props.onBtnPress} value="2"></NumberBtn.view>
          </View>
          <View style={styles.btnBlock}>
            <NumberBtn.view onBtnPress={this.props.onBtnPress} value="3"></NumberBtn.view>
          </View>
        </View>
        <View style={styles.btnLine}>
          <View style={styles.btnBlock}>
            <NumberBtn.view onBtnPress={this.props.onBtnPress} value="4"></NumberBtn.view>
          </View>
          <View style={styles.btnBlock}>
            <NumberBtn.view onBtnPress={this.props.onBtnPress} value="5"></NumberBtn.view>
          </View>
          <View style={styles.btnBlock}>
            <NumberBtn.view onBtnPress={this.props.onBtnPress} value="6"></NumberBtn.view>
          </View>
        </View>
        <View style={styles.btnLine}>
          <View style={styles.btnBlock}>
            <NumberBtn.view onBtnPress={this.props.onBtnPress} value="7"></NumberBtn.view>
          </View>
          <View style={styles.btnBlock}>
            <NumberBtn.view onBtnPress={this.props.onBtnPress} value="8"></NumberBtn.view>
          </View>
          <View style={styles.btnBlock}>
            <NumberBtn.view onBtnPress={this.props.onBtnPress} value="9"></NumberBtn.view>
          </View>
        </View>
        <View style={styles.btnLine}>
          <View style={styles.btnBlock}>
            <NumberBtn.view onBtnPress={this.props.onBtnPress} value="+/-"></NumberBtn.view>
          </View>
          <View style={styles.btnBlock}>
            <NumberBtn.view onBtnPress={this.props.onBtnPress} value="0"></NumberBtn.view>
          </View>
          <View style={styles.btnBlock}>
            <NumberBtn.view onBtnPress={this.props.onBtnPress} value="."></NumberBtn.view>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  index: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  btnLine: {
    flex: 1,
    flexDirection: 'row',
  },
  btnBlock: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#eeeeee'
  }
});

export default NumberBtns;
