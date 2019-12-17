import React,{ Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
import normalize from 'react-native-normalize';
export default class ChatSpace extends Component{
        static navigationOptions={
            header:null
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
            console.log('chatSpace onLoad :',options)
        }
        onShow(options){
            console.log('Index onShow :',options)
            
        }
        render(){
        let userTarget = this.props.navigation.getParam('parentData')   
        return <>
                <View style={styles.container}>
                    <View style={styles.customHeaderOfChat}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()}><Image source={require('../../static/images/icons/left-arrow-chevron.jpg')} style={styles.backIcon}/></TouchableOpacity>
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
                        <Text>index page</Text>
                    </View>
                    <View style={styles.inputBox}>
                        <Text>index page</Text>
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
    inputBox:{
        height:normalize(60,'height'),
        backgroundColor:'#FFF'
    }
})