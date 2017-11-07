import React from 'react';
import { StyleSheet, StatusBar, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  state = {
    count: 0
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.console}></View>
        <View style={styles.controlPanel}>
          <View style={styles.controlPanelRow}></View>
          <View style={styles.controlPanelRow}></View>
          <View style={styles.controlPanelRow}></View>
          <View style={styles.controlPanelRow}></View>
        </View>
      </View>
    );
  }
  componentDidMount() {
    StatusBar.setHidden(true);
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1e2);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  console: {
    flex: 1,
    backgroundColor: 'green',
    width: '100%'
  },
  controlPanel: {
    flex: 2,
    backgroundColor: 'purple',
    width: '100%'
  },
  controlPanelRow: {
    flex: 1,
    backgroundColor: 'red',
  }
});
