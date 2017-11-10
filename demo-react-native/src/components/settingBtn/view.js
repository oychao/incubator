import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

class NumberBtn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.onResetBtnPress();
  }
  render() {
    return (
      <View style={styles.index}>
        <TouchableOpacity style={styles.button} onPress={this.handlePress}>
          <Text style={styles.text}>{this.props.value}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  index: {
    height: '100%',
    width: '100%',
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 5
  },
  text: {
    fontSize: 16,
    color: '#333333'
  }
});

export default NumberBtn;
