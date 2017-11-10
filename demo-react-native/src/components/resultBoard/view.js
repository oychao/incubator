import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class ResultBoard extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const formula = this.props.formula === '' ? '0' : this.props.formula;
    return (
      <View style={styles.index}>
        <Text style={styles.text}>{formula}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  index: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'skyblue',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 18
  },
  text: {
    color: '#190d08',
    fontSize: 70,
    fontWeight: '200'
  }
});

export default ResultBoard;
