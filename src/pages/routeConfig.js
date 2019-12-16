import React,{ Component } from 'react';
import { View,Text,Image,StyleSheet,ScrollView } from 'react-native';
import { createAppContainer } from  'react-navigation';
import { createDrawerNavigator,DrawerActions,DrawerItems,SafeAreaView } from 'react-navigation-drawer';
import FrindsPage from './homeComponent/friendsPage';
import AboutPage from './homeComponent/aboutUsPage';
import SettingPage from './homeComponent/settingPage';
import FavoritePage from './homeComponent/favoritePage';
import HomePage from './homePage';
const MyDrawerNavigator = createDrawerNavigator({
    PageHome:{
        screen:HomePage,
        navigationOptions:{
            title:'主页',
            drawerIcon: ({tintColor}) => (
                <Image source={require('../static/images/icons/homeDrawe.png')} style={styles.drawerIconSize}/>
            )

        }
    },
    PageFriends:{
        screen:FrindsPage,
        navigationOptions:{
            title:'我的好友',
            drawerIcon: ({tintColor}) => (
                <Image source={require('../static/images/icons/frindsDrawe.png')} style={styles.drawerIconSize}/>
            )
            
        }
    },
    PageFavorite:{
        screen:FavoritePage,
        navigationOptions:{
            title:'我的收藏',
            drawerIcon: ({tintColor}) => (
                <Image source={require('../static/images/icons/collectDrawe.png')} style={styles.drawerIconSize}/>
            )
        }
    },
    PageSetting:{
        screen:SettingPage,
        navigationOptions:{
            title:'设置',
            drawerIcon: ({tintColor}) => (
                <Image source={require('../static/images/icons/settingDrawe.png')} style={styles.drawerIconSize}/>
            )
        }
    },
    PageAbout:{
        screen:AboutPage,
        navigationOptions:{
            title:'关于我们',
            drawerIcon: ({tintColor}) => (
                <Image source={require('../static/images/icons/aboutDrawe.png')} style={styles.drawerIconSize}/>
            )
        }
    }
},{
    drawerPosition:'left',
    drawerWidth:200,
    contentOptions: {
        activeTintColor: '#e91e63',
        itemsContainerStyle: {
          marginVertical: 0,
        },
        iconContainerStyle: {
          opacity: 1
        }
      }
});
const styles = StyleSheet.create({
    drawerIconSize:{
        width:28,
        height:28
    },
    bgColor:{
        backgroundColor:'#fff',
        width:'100%',
        height:'100%'
    }
})
const IndexPage = createAppContainer(MyDrawerNavigator);
export default IndexPage;