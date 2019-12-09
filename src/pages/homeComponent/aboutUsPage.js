import React,{Component} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import HeadElement from './header';
export default class AboutPage extends Component {
  _toggleDrawer(){
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }
    render() {
      return (
        <View>
          <View><HeadElement upDrawerfun={this._toggleDrawer.bind(this)} title={'关于我们'}/></View>
          <Text>关于我们!</Text>
        </View>
      );
    }
}