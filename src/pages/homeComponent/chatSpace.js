import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Image,TextInput,KeyboardAvoidingView  } from 'react-native';
import normalize from 'react-native-normalize';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import S from '../../../server';
import U from '../../util/utils';
import io from 'socket.io-client';
import AutoScroll from 'react-native-auto-scroll';
let token ='';
export default class ChatSpace extends Component{
        static navigationOptions={
            header:null
        }
        constructor(props){
            super(props);
            this.state={
                isFocus:false,
                userTarget:this.props.navigation.getParam('parentData'),
                msgList:this.props.navigation.getParam('parentData').msgList
            }
        }
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
            U.getStorage('tokencode').then(res=>{
                token = res;
                this.socket = io(S.url);
            });
        }
       
        onShow(options){
            console.log('Index onShow :',options)
            
        }

        addSocket(data){
            this.socket.emit('add',{tokencode:token,friendId:this.state.userTarget.userid,msg:data});
            this.socket.on(token,msg=>{
                let msgList = this.state.msgList;
                msgList.push(msg);
                this.setState({msgList});
            });
        }

        changeStateInput = ()=>{
            this.setState({
                isFocus:!this.state.isFocus
            })
            
        }
        doSend = ()=>{
            this.refs.myInput.clear();
            let value = this.refs.myInput._lastNativeText
            if(!value){
                return ;
            }
            this.addSocket(value);
        }
        render(){
        let userTarget = this.state.userTarget;   
        console.log(userTarget)
        return <>
                <View style={styles.container}>
                    <View style={styles.customHeaderOfChat}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                            <MaterialIcons name="chevron-left" size={normalize(28,'fontSize')} />
                        </TouchableOpacity>
                        <View style={styles.targetInfo}>
                            <View><Text>{userTarget.uname}</Text></View>
                            <View><Text style={styles.defaultColor}>{userTarget.tips}</Text></View>
                        </View>
                        <View style={styles.avatarBox}>
                            <Image source={{uri:userTarget.uAvatar}} style={styles.avatarImg}/>
                            <View></View>
                        </View>
                    </View>
                    <View style={styles.msgBox}>
                        <AutoScroll>
                            {
                                this.state.msgList.map((p,i)=>{
                                    return <>
                                        {
                                            <View style={{width:'100%'}}>
                                                <View style={styles.parentItemOfmsg,p.rightActive?styles.right:styles.left}>
                                                {!p.rightActive && 
                                                    <View style={{...styles.itemMsg,maxWidth:'50%',backgroundColor:p.rightActive?'#9099B0':'#3E63F5'}}>
                                                        <Entypo style={{position:'absolute',left:normalize(-20)}} name="triangle-left" size={normalize(40,'fontSize')} color="#3E63F5"/>
                                                        <Text style={{color:'#FFF'}}>{p.msgInfo}</Text>
        
                                                    </View>
                                                } 
                                                {p.rightActive &&
                                                    <View style={{...styles.itemMsg,backgroundColor:p.rightActive?'#9099B0':'#3E63F5'}}>
                                
                                                            <Text style={{color:'#FFF'}}>{p.msgInfo}</Text>
                                                            <Entypo style={{position:'absolute',right:normalize(-20)}} name="triangle-right" size={normalize(40,'fontSize')} color="#9099B0"/>
                                                        </View>
                                                }
                                                    
                                                </View>
                                                
                                            </View>
                                        }
                                    </>
                                })
                            }
                        </AutoScroll>
                        <View style={styles.inputBox}>
                                <View style={styles.plusBox}>
                                    <TouchableOpacity>
                                        <SimpleLineIcons name="plus" size={normalize(40,'fontSize')} color="#3E63F5"/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.contactBox}>
                                    <TextInput style={styles.contentBox} ref="myInput" onSubmitEditing={()=>this.doSend()} onBlur={()=>this.changeStateInput()} onFocus={()=>this.changeStateInput()} placeholder={'Message...'} placeholderTextColor='#BAC0CE'/>
                                    <View style={styles.voiceBox}>
                                        <TouchableOpacity onPress={()=>this.doSend()}>
                                        {!this.state.isFocus?
                                            <MaterialIcons name="settings-voice" size={normalize(30,'fontSize')} color="#C5CDDD"/>:
                                            <MaterialCommunityIcons name="send-circle" size={normalize(30,'fontSize')}  color="#3E63F5"/>
                                        } 
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        </View>
                    </View>
                </View>
        </>
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F6F8FB',
        justifyContent:'space-between',
    },
    defaultColor:{
        color:'#CFD3DC'
    }, 
    customHeaderOfChat:{
        height:60,
        // flex:1,
        backgroundColor:'#FFFFFF',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:20,
        paddingRight:20
    },
    targetInfo:{
        // marginRight:'auto',
        // alignSelf:'center'
        alignItems:'center'
    },
    avatarBox:{
        elevation:50,
    },
    avatarImg:{
        width:50,
        height:50,
        borderRadius:50,
    },
    msgBox:{
        flex:1,
    },
    parentItemOfmsg:{
        flexDirection:'row',
    },
    right:{
        alignItems:'flex-end',marginRight:normalize(20)
    },
    left:{
        marginLeft:normalize(20),
        alignItems:'flex-start'
    },
    
    itemMsg:{
        minHeight:normalize(40),
        backgroundColor:'#9099B0',
        marginTop:normalize(20),
        borderRadius:normalize(10),
        padding:normalize(10),
        marginBottom:normalize(20)
    },
    inputBox:{
        height:normalize(60,'height'),
        backgroundColor:'#FFF',
        flexDirection:'row',
        alignItems:'center'
    },
    plusBox:{
        width:'20%',
        alignItems:'center'
    },
    contactBox:{
        width:'76%',
        height:'80%',
        backgroundColor:'#F6F8FB',
        borderRadius:10,
        paddingLeft:normalize(10),
        flexDirection:'row',
        alignItems:'center'
    },
    contentBox:{
        width:'76%',
        // backgroundColor:'#000'
    },
    voiceBox:{
        width:'24%',
        // backgroundColor:'#DADADA',
        height:'60%',
        borderLeftWidth:1,
        borderColor:'#DADADA',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    }
})