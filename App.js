
import React,{Component} from 'react';
import { View,Text,Image,StyleSheet} from 'react-native';
import IndexPage from './src/pages/routeConfig';
import KampongPage from './src/pages/kampongPage';
import PersonalPage from './src/pages/personalPage';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import  ChatSpace from './src/pages/homeComponent/chatSpace';
const TabNavigator = createBottomTabNavigator({
  Home: {
    screen:IndexPage,
    navigationOptions: () => ({
      tabBarLabel: '首页',

      tabBarIcon:({focused})=>{
          if(focused){
              return(
                  <Image source={require('./src/static/images/icons/home_selected.png')} style={styles.iconStyle}/>
              )
          }else{
              return(
                  <Image source={require('./src/static/images/icons/home.png')} style={styles.iconStyle}/>
              )
          }
      }
  }),
  },
  Kampong: {
    screen:KampongPage,
    navigationOptions: () => ({
      tabBarLabel: '圈子',
      tabBarIcon:({focused})=>{
          if(focused){
              return(
                  <Image source={require('./src/static/images/icons/chat_selected.png')} style={styles.iconStyle}/>
              )
          }else{
              return(
                  <Image source={require('./src/static/images/icons/chat.png')} style={styles.iconStyle}/>
              )
          }
      }
    })
  },
  Personal: {
    screen:PersonalPage,
    navigationOptions: () => ({
      tabBarLabel: '个人',
      tabBarIcon:({focused})=>{
          if(focused){
              return(
                  <Image source={require('./src/static/images/icons/user_selected.png')} style={styles.iconStyle}/>
              )
          }else{
              return(
                  <Image source={require('./src/static/images/icons/user.png')} style={styles.iconStyle}/>
              )
          }
      }
    })
  },
},{
  initialRouteName:'Home',
  tabBarPosition: 'bottom',
    showIcon: true,
    showLabel: true,
    pressOpacity: 0.8,
    tabBarOptions: {
        activeTintColor: 'green',
        style: {
            backgroundColor: '#fff',
        },
  }
});
const styles = StyleSheet.create({
  iconStyle: {
      width:25,
      height:25
  }
});
const AppNavigatorRoute = createStackNavigator({
    initRout:{
        screen:createAppContainer(TabNavigator),
        navigationOptions:()=>({
            header:null
        })
    },
    ChatSpace:{
        screen:ChatSpace,
        navigationOptions:()=>({
            headerBackTitle:'返回'
        })
    }
},{
    initialRouteName:'initRout',
})
export default createAppContainer(AppNavigatorRoute);
