import React,{Component} from 'react';
import { Text, View, StyleSheet, Image,TouchableOpacity, } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import normalize from 'react-native-normalize';
export default class HeadElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pageTitle:this.props.title || '首页'
        }
    }    
    _toggleDrawer=()=>{
        this.props.upDrawerfun();
    }
    render() {
      return (
        <View>
          <View style={styles.header}>
             <TouchableOpacity 
                onPress={this._toggleDrawer.bind(this)}
             ><Image source={require('../../static/images/icons/drawerIcon.png')} style={styles.drawerIconSize}/></TouchableOpacity>
             {/* <SearchBar placeholder="内容" /> */}
             <View style={styles.titleContent}><Text style={{
               color:'#FFFFFF'
              }}>
              {this.state.pageTitle}
              </Text>
            </View>
          </View>
          
        </View>
      );
    }
}
const styles = StyleSheet.create({
    header:{
        height:50,
        width:'100%',
        display:'flex',
        backgroundColor:'#6b52ae',
        alignItems:'center',
        flexDirection:'row'
    },
    drawerIconSize:{
        width:28,
        height:28,
        marginLeft:20
    },
    titleContent:{
      position:'absolute',
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
    }
})