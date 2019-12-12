import React,{ Component } from 'react';
import { View,Text,Image,StyleSheet,ScrollView } from 'react-native';
import { createAppContainer } from  'react-navigation';
import { createDrawerNavigator,DrawerActions,DrawerItems,SafeAreaView } from 'react-navigation-drawer';
import HeadElement from './homeComponent/header';
import FrindsPage from './homeComponent/friendsPage';
import AboutPage from './homeComponent/aboutUsPage';
import SettingPage from './homeComponent/settingPage';
import FavoritePage from './homeComponent/favoritePage';
import MsgList from './homeComponent/msgList';
import Toast from 'react-native-root-toast';
class HomePage extends React.Component{
    // state
    constructor(props){
        super(props);
        this.state = {
            list:[3242,232,53,23]
        }
    }

    // hookFunctions
    componentDidMount() {
      
        this.onLoad(Object.assign({},this.props));
        this._navListener = this.props.navigation.addListener('didFocus', () => {
          this.onShow(Object.assign({},this.props));
        });
    }
    componentWillUnmount() {
        this._navListener.remove();
    }
    

    // methods
    onLoad(options){
        console.log('Index onLoad :',options);
    }
    
    onShow(options){
        console.log('Index onShow :',options)
    }
    _toggleDrawer(){
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }
    render(){
        return <>
                <View style={styles.bgColor}>
                <View><HeadElement upDrawerfun={this._toggleDrawer.bind(this)} title={'聊吧'} /></View>
                <MsgList source={this.state.list}/>
            </View>
            </>
    }
}
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
