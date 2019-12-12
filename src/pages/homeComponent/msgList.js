import React,{ Component } from 'react';
import { View,Text,StyleSheet,FlatList } from 'react-native';
export default class MsgList extends Component{
        showItem(info){
            return <Text key={info.index}>{info.item}</Text>
        }
        render(){
            let list = this.props.source;
            return <View style={styles.container}>
                    <FlatList 
                        data={list}
                        renderItem={this.showItem}
                    />
            </View>
    }
}
// #0DBC79
// #F6F8FB

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F6F8FB'
    }
})