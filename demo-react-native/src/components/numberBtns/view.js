import React from 'react';
import { StyleSheet, View } from 'react-native';

class NumberBtns extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.index}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  index: {
    height: '100%',
    width: '100%'
  }
});

export default NumberBtns;
