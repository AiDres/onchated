import React,{ Component } from 'react';
import { View,Text,Image,StyleSheet,FlatList,TouchableOpacity } from 'react-native';
import U from '../../util/utils';
export default class MsgList extends Component{
        showItem=(info)=>{
            info.item['msg'] = info.item.msgList && info.item.msgList.length?info.item.msgList[info.item.msgList.length-1].msgInfo:'';
            info.item['msgTime'] = info.item.msgList && info.item.msgList.length?info.item.msgList[info.item.msgList.length-1].createTime:'';
           
            return <TouchableOpacity onPress={()=>this.props.funs({dispatch:'onchat'},{index:info.index})}>
                <View key={info.index} style={styles.itemBox} >
                    <View style={styles.avatarBox}>
                        <Image source={{uri:info.item.uAvatar}} style={styles.avatarImg}/>
                        <View></View>
                    </View>
                    <View style={styles.msgBox}>
                        <View style={styles.nameBox}><Text style={styles.nameText}>{info.item.uname}</Text></View>
                        <View><Text style={styles.msgText}>{info.item.msg}</Text></View>
                    </View>
                    <View style={styles.statusBox}>
                        <View></View>
                        <View><Text style={styles.timerText}>{U.filterDate(info.item.msgTime)}</Text></View>
                    </View>
                </View>
            </TouchableOpacity>
        }
        render(){
            console.log(this)
            let list = this.props.source;
            return <View style={styles.container}>
                    <FlatList 
                        data={list}
                        renderItem={this.showItem}
                    />
            </View>
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F6F8FB'
    },
    itemBox:{
        flexDirection:'row',
        marginTop:1,
        backgroundColor:'#FFF',
        height:80,
        flex:1,
        alignItems:'center'
    },
    avatarBox:{
        paddingLeft:10,
        elevation:50
    },
    msgBox:{
        marginRight:'auto',
    },
    nameBox:{
        paddingBottom:5
    },
    nameText:{
        fontSize:18,

    },  
    msgText:{
        color:'#9DA5BA'
    },
    avatarImg:{
        width:60,
        height:60,
        borderRadius:50,
        marginRight:24,
        
    },
    timerText:{
        color:'#929BB1',
        paddingRight:10
    }
})