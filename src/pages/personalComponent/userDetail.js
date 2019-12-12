import React,{ Component } from 'react';
import { Text,View,Image,StyleSheet,ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
const S = require('../../../server');
export default class DetailTemplate extends Component{
    constructor(props){
        super(props);
        this.state={
            entries:[{name:require('../../static/images/defaultImage/initImage_01.jpg')},{name:require('../../static/images/defaultImage/initImage_02.jpg')}]
            ,userInfo:[],
            articles:[],
            token:''
        }
    }
    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <View>
                    <ImageBackground source={{uri:item.themeimage}} style={{width:400,height:340}}>
                        <Image style={styles.deleteIcon} source={require('../../static/images/defaultImage/delete.png')}></Image>
                    </ImageBackground>
                </View>
                <View style={{paddingLeft:10,paddingRight:10,flex:1}}>
                    <Text>时间：{item.newstime || 'Date：2019-11-23 23:42:00'}</Text>
                    <Text style={{marginTop:5,marginBottom:5}} numberOfLines={1}>{item.title}</Text>
                    <Text numberOfLines={3}>{item.content || 'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window)Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).'}</Text>
                    
                </View>
            </View>
        );
    }
    componentWillReceiveProps(nextProps) {
        let parentData = JSON.parse(nextProps.parentData);
        this.setState({
            userInfo:parentData.userInfo,
            articles:parentData.articles,
            token:parentData.token
        });
    }

    render () {
        return (
           <View style={styles.container}>
               <View style={styles.avatarInfo}>
                <View style={styles.avatarBox}>
                <Image source={{uri:this.state.userInfo.uAvatar}} style={{width:'100%',height:'100%',borderRadius:50}}/>
                </View>
                <View style={styles.topContent}>
                    <View style={styles.contentDetail}>
                        <View>
                            <Text style={styles.detailName}>{this.state.userInfo.uname}</Text>
                        </View>
                        <View>
                            <Text style={styles.detailCity}>{this.state.userInfo.tips}</Text>
                        </View>
                        <View style={styles.followers}>
                            <View>
                                <View><Text style={styles.followersCount}>{this.state.userInfo.friends}</Text></View>
                                <View><Text style={styles.followersTip}>粉丝</Text></View>
                            </View>
                            <View>
                                <View><Text style={styles.followersCount}>{this.state.userInfo.fllowers}</Text></View>
                                <View><Text style={styles.followersTip}>关注</Text></View>
                            </View>
                            <View>
                                <View><Text style={styles.followersCount}>{this.state.userInfo.news}</Text></View>
                                <View><Text style={styles.followersTip}>动态</Text></View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentIcon}>
                    <Image source={require('../../static/images/icons/edit_pen.png')}/>
                    </View>
                </View>
               </View>
               <View style={styles.tipBox}>
                    <Text style={{color:'#CAC5C5',fontSize:18}}>#我的动态#</Text>
                    <Image source={require('../../static/images/icons/pen_icon.png')}/>
               </View>
               <View style={{width:'100%'}}>
                <Carousel
                    layout={'stack'} layoutCardOffset={50}
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.articles}
                    renderItem={this._renderItem}
                    sliderWidth={440}
                    sliderHeight={440}
                    itemWidth={400}
                    />
               </View>
           </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingLeft:20,
        paddingRight:20
    },
    avatarInfo:{
        width:'100%',
        height:100,
        backgroundColor:'#FFFFFF',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        marginTop:50,
        flexDirection:'row',
        alignItems:'center'
        // justifyContent:'space-around'
    },
    avatarBox:{
        height:80,
        width:80,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:20,
        borderRadius:50,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#787878',
        elevation: 4,
    },
    topContent:{
        flexDirection:'row',
        alignItems:'center'
    },  
    contentDetail:{
        width:290,
        paddingLeft:10,
        paddingRight:10,
        height:80,
    },
    detailName:{
        paddingTop:8,
        paddingLeft:10,
        fontSize:18,
        fontWeight:'bold'
    },
    detailCity:{
        paddingLeft:10,
        fontSize:10,
        color:'#C0C0C0'
    },
    followers:{
        height:40,
        width:'90%',
        // backgroundColor:'#787878',
        paddingLeft:10,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    followersCount:{
        fontSize:15
    },
    followersTip:{
        fontSize:12,
        color:'#C0C0C0'
    },
    tipBox:{
        marginTop:50,
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#FFFFFF',
        flexDirection:'row',
        alignItems:'baseline',
        justifyContent:'space-between'
    },
    slide:{
        marginTop:40,
        height:440,
        width:'100%',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        backgroundColor:'#ffffff',
        overflow:'hidden'
    },
    deleteIcon:{
        position:'relative',
        left:340,
        bottom:5
    }
})
