import React,{ Component } from 'react';
import { Text,View,Image,StyleSheet,ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEdit from 'react-native-vector-icons/FontAwesome5';
const S = require('../../../server');
import U from '../../util/utils';
export default class DetailTemplate extends Component{
    constructor(props){
        super(props);
        this.state={
            userInfo:[],
            articles:[],
            token:''
        }
    }
    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <View>
                    <ImageBackground source={{uri:item.themeimage}} style={{width:normalize(340,'width'),height:normalize(240,'height'),alignItems:'flex-end'}}>
                        <Icon style={styles.deleteIcon} name={'remove'} size={normalize(20)} color='#000'/>
                    </ImageBackground>
                </View>
                <View style={{paddingLeft:normalize(10,'left'),paddingRight:normalize(10,'right'),flex:1}}>
                    <Text style={styles.followersTip}>{U.filterDate(item.newstime) || 'Date：2019-11-23 23:42:00'}</Text>
                    <Text style={{marginTop:normalize(5,'top'),marginBottom:normalize(5,'bottom')}} numberOfLines={1}>{item.title}</Text>
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
                    <Image source={{uri:this.state.userInfo.uAvatar}} style={{width:'90%',height:'90%',borderRadius:50}}/>
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
                        <Icon name="edit" size={normalize(18,'fontSize')} color="#3b5998"/>
                    </View>
                </View>
               </View>
               <View style={styles.tipBox}>
                    <Text style={{color:'#CAC5C5',fontSize:normalize(16,'fontSize')}}>#我的动态#</Text>
                    <IconEdit name="pen-fancy" size={normalize(28,'fontSize')} color="#FFF"/>
               </View>
               <View style={{width:'100%'}}>
                <Carousel
                    layout={'stack'} layoutCardOffset={50}
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.articles}
                    renderItem={this._renderItem}
                    sliderWidth={normalize(340,'width')}
                    sliderHeight={normalize(240,'height')}
                    itemWidth={normalize(340,'width')}
                    />
               </View>
           </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingLeft:normalize(20,'left'),
        paddingRight:normalize(20,'right')
    },
    avatarInfo:{
        width:'100%',
        height:normalize(80,'height'),
        backgroundColor:'#FFFFFF',
        borderTopLeftRadius:normalize(20,'borderRadius'),
        borderTopRightRadius:normalize(20,'borderRadius'),
        marginTop:normalize(50,'top'),
        flexDirection:'row',
        alignItems:'center'
        // justifyContent:'space-around'
    },
    avatarBox:{
        height:normalize(70),
        width:normalize(70),
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:normalize(20,'left'),
        borderRadius:normalize(50,'borderRadius'),
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
        width:normalize(220,'width'),
        paddingLeft:normalize(10,'left'),
        paddingRight:normalize(10,'right'),
        height:normalize(80,'height'),
    },
    detailName:{
        paddingTop:normalize(8,'top'),
        paddingLeft:normalize(10,'left'),
        fontSize:normalize(18,'fontSize'),
        fontWeight:'bold'
    },
    detailCity:{
        paddingLeft:normalize(10,'left'),
        fontSize:normalize(12,'fontSize'),
        color:'#C0C0C0'
    },
    followers:{
        height:normalize(40,'height'),
        width:'90%',
        // backgroundColor:'#787878',
        paddingLeft:normalize(10,'left'),
        flexDirection:'row',
        justifyContent:'space-between'
    },
    followersCount:{
        fontSize:normalize(15,'fontSize')
    },
    followersTip:{
        fontSize:normalize(12,'fontSize'),
        color:'#C0C0C0'
    },
    tipBox:{
        marginTop:normalize(50,'top'),
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#FFFFFF',
        flexDirection:'row',
        alignItems:'baseline',
        justifyContent:'space-between'
    },
    slide:{
        marginTop:normalize(40,'top'),
        height:normalize(340,'height'),
        width:'100%',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        backgroundColor:'#ffffff',
        overflow:'hidden'
    },
    deleteIcon:{
        paddingRight:normalize(10,'padding'),
        paddingTop:normalize(4,'padding'),
    }
})
