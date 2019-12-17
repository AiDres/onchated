import React,{Component} from 'react';
import { Text, View, 
  StyleSheet, Image,
  ImageBackground,TextInput,
  TouchableOpacity,Button,
  Animated,
  Easing,
 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconTwitter from 'react-native-vector-icons/SimpleLineIcons'
const S = require('../../server');
import U from '../util/utils';
var token = '';
import DetailTemplate from './personalComponent/userDetail';
import normalize from 'react-native-normalize';
export default class PersonalPage extends Component{
    // state
    constructor(props){
        super(props);
        this.state = {
            val:1,
            fadeInOpacity: new Animated.Value(1),
            isLogin:false,
            email:'',
            pwd:'',
            userInfo:{},
            articles:[]
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
        console.log('Personal onLoad :',options)
        U.getStorage('tokencode').then(res=>{
          token = res;
          this.hasLogin();
        });
    }
    onShow(options){
        console.log('Personal onShow :',options);
    }
    _doLogin=()=>{
        var patternEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var patternPwd = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{2,})(?=.*[a-z]{2,})(?=.*[!@#$%^&*?\(\)]).*$/;
        let emailState = patternEmail.test(this.state.email);
        let pwdState = patternPwd.test(this.state.pwd);
        console.log(pwdState,emailState)
        if(!pwdState || !emailState){
          alert("邮箱或密码有误！");  
        }else{
          S.getData({email:this.state.email,pwd:this.state.pwd},'login',(res)=>{
            if(JSON.stringify(res)!='{}'){
              if(res.code==301){
                alert(res.msg);
              }else{
                U.setStorage('tokencode',res.tokencode);
                this.setState({userInfo:res.data[0]});
                token = res.tokencode;
                Animated.timing(this.state.fadeInOpacity, {
                  toValue: 0, // 目标值
                  duration: 1000, // 动画时间
                  easing: Easing.linear // 缓动函数
                }).start(()=>{
                  this.setState({isLogin:true});
                  this.getArticle();
                });
              }
              
            }else{
              alert('请求失败失败')
            }
          })
          
        }
        
    }
    getArticle(){

    S.getData({tokencode:token},'article',(res)=>{
        if(res.code==305){
            let article = [];
            article.push(...res.data)
            this.setState({articles:article});
        }else{
        }
    })
    }
    hasLogin(){
      S.getData({tokencode:token},'hasLogin',(res)=>{
        if(JSON.stringify(res)!='{}'){
            if(res.code==305){
            this.setState({isLogin:true,userInfo:res.data[0]});
            this.getArticle();
            }else{
            this.setState({isLogin:false});
            }
            
        }else{
            alert('请求失败')
        }
      });
    }
    
    componentDidUpdate(){
     
    }
    render() {
        return (
          <View>
            <ImageBackground source={require('../static/images/userBg.jpg')} style={{width: '100%', height: '100%'}}>
              <Animated.View style={[{opacity:this.state.fadeInOpacity,width: '100%', height: '100%',display:this.state.isLogin?'none':'flex'}]}>
              <View style={styles.aboutBox}><Icon name="pagelines" size={normalize(26,'fontSize')}/></View>
              <View style={[styles.container]}>
                <View><Text style={styles.title}>HELLO!</Text></View>
                <View><Text style={styles.subTitle}>Sign in to your account</Text></View>
                <View style={{padding:20}}>
                  <TextInput
                  placeholder={'Email'}
                  style={styles.TextInput }
                  onChangeText={text=>this.setState({email:text})}
                  />
                </View>
                <View>
                  <TextInput
                  placeholder={'Password'}
                  style={styles.TextInput}
                  selectionColor="black"
                  secureTextEntry={true}
                  onChangeText={text=>this.setState({pwd:text})}
                  />
                </View>
                <View style={styles.toLogin}>
                  <TouchableOpacity>
                    <Button title={'   Login   '}
                      onPress={()=> this._doLogin()}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.moreSign}>
                <View><Icon name="qq" color="#FFF" size={normalize(18,'fontSize')}/></View>
                <View><Icon name="wechat" color="#FFF" size={normalize(18,'fontSize')}/></View>
                <View><IconTwitter name="social-twitter" color="#FFF" size={normalize(18,'fontSize')}/></View>
              </View>
              </Animated.View>
              <DetailTemplate parentData={JSON.stringify({
                userInfo:this.state.userInfo,
                articles:this.state.articles,
                token:token
              })} />
            </ImageBackground>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
    },
    title:{
      color:'#FFFFFF',
      fontSize:30,
      fontWeight:'bold'
    },
    subTitle:{
      color:'#FFFFFF',
      fontSize:18,
      padding:18
    },
    TextInput:{
      height: 40,
      width:240,
      backgroundColor:'#FFFFFF',
      borderRadius:20,
      paddingLeft:10,
      paddingRight:10
    },
    toLogin:{
      padding:20
    },
    aboutBox:{
      width:'100%',
      position:'absolute',
      alignItems:'flex-end',
      paddingTop:10,
      paddingRight:10
    },
    moreSign:{
      width:'100%',
      justifyContent:'space-around',
      flexDirection:'row',
      paddingTop:20,
      paddingBottom:20,
    }
});