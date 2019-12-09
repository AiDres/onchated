import React,{Component} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import HeadElement from './header';
export default class FavoritePage extends Component {
  _toggleDrawer(){
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }
    render() {
      return (
        <View>
          <View><HeadElement upDrawerfun={this._toggleDrawer.bind(this)} title={'收藏'}/></View>
          <Text>我的收藏!</Text>
        </View>
      );
    }
}