import React,{ Component } from 'react';
import { View,Text } from 'react-native';
export default class KampongPage extends Component{
    // state
    constructor(props){
        super(props);
        this.state = {
            
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
        console.log('Kampong onLoad :',options)
    }
    onShow(options){
        console.log('Kampong onShow :',options)
    }
    
    render(){
        return <>
        <View>
             <Text>kampong page</Text>
         </View> 
     </>
    }
}
