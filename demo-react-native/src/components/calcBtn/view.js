import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

class CalcBtn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    // this.props.onBtnPress(this.props.value)
  }
  render() {
    return (
      <View style={styles.index}>
        <TouchableOpacity style={styles.index} onPress={this.handlePress}>
          <Text style={styles.text}>{this.props.value}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  index: {
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: '#fb96cf',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 14,
    color: '#777777'
  }
});

export default CalcBtn;
