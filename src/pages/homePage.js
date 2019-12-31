import React,{ Component } from 'react';
import { View,Text,Image,StyleSheet,ScrollView } from 'react-native';
import MsgList from './homeComponent/msgList';
import HeadElement from './homeComponent/header';
import Toast from 'react-native-root-toast';
import ChatSpace from './homeComponent/chatSpace';
const S = require('../../server');
import io from 'socket.io-client';
import U from '../util/utils';

var token = '';
class HomePage extends React.Component{
    // state
    constructor(props){
        super(props);
        this.state = {
            list:[],
            visible:false,
            chatMessage: "",
            chatMessages: []
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
        U.getStorage('tokencode').then(res=>{
            token = res;
            this.getList();
            this.getlistOfSocket();
        });
    }
    onShow(options){
        console.log('Index onShow :',options)
        
        
    }
    getlistOfSocket(){
        this.socket = io(S.url);
        this.socket.on(token,msg=>{
            this.getList();
        })
    }
    getList(){
        S.getData({tokencode:token},'getMsgList',(res)=>{
            if(res.data){
                this.setState({
                    list:res.data
                })
            }else{
                if(res.code==301){
                    this.setState({
                        visible: true,
                        list:[]
                    }); 
            
                    setTimeout(() => this.setState({
                        visible: false
                    }), 5000);
                }
                
            }
           
        })
    }
    actionFunc=(path,source)=>{
        switch(path.dispatch){
            case 'onchat':this.onchatSpace(source);break;
            case 'repull':this.getList();break;
            default :console.log('undefind routePath');
        }
    }
    onchatSpace=(data)=>{
        this.props.navigation.navigate('ChatSpace',{parentData:this.state.list[data.index]});
    }
    _toggleDrawer(){
        console.log(this)
        this.props.navigation.toggleDrawer();
    }
    render(){
        return <>
                <View style={styles.bgColor}>
                <View><HeadElement upDrawerfun={this._toggleDrawer.bind(this)} title={'聊吧'} /></View>
                {this.state.list.length?<MsgList source={this.state.list} funs={this.actionFunc} />:<></>}
                <Toast
                    visible={this.state.visible}
                    position={200}
                    shadow={true}
                    animation={true}
                    hideOnPress={true}
                ><Text>{'未登录哦( ‵▽′)ψ'}</Text></Toast>
            </View>
            </>
    }
}
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


export default HomePage;
