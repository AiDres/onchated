import React,{Component} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import HeadElement from './header';
export default class SettingPage extends Component {
  _toggleDrawer(){
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }
    render() {
      return (
        <View>
          <View><HeadElement upDrawerfun={this._toggleDrawer.bind(this)} title={'设置'}/></View>
          <Text>我的设置!</Text>
        </View>
      );
    }
}