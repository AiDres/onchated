import React,{Component} from 'react';
import { Text, View, StyleSheet, Image,TouchableOpacity, } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
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
             <View style={{
               position:'absolute',
               left:'50%',
               right:'50%', 
            }}><Text style={{
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
        justifyContent:'center',
        paddingLeft:20,
        paddingRight:20,
        flexWrap:'nowrap'
    },
    drawerIconSize:{
        width:28,
        height:28
    }
})