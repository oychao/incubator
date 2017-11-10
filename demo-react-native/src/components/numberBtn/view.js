import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

class NumberBtn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.onBtnPress(this.props.value)
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
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});

export default NumberBtn;
