import React from 'react';
import {View, Text, StatusBar, TouchableOpacity, StyleSheet} from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import Color from '@common/color'
import Const from '@common/const'
import Device from '@common/device'



export default class NavBar extends React.Component {
    constructor(props){
        super(props)
    }
  render() {
      let {right, rightText, title, description, scenes}  = this.props
    return (
        <View style={styles.headerContainer}>
            <StatusBar
                backgroundColor={Color.primary}
                barStyle="light-content"
            />
            {scenes.length>1&&<TouchableOpacity onPress={()=>Actions.pop()} style={styles.left}>
                <Ionicons name="ios-arrow-back" size={30} color='white'/>
            </TouchableOpacity>}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                {description&&description!='' && <Text style={styles.description}>{description}</Text>}
            </View>
            {right&&rightText!='' && <TouchableOpacity onPress={()=>right()} style={styles.right}>
                <Text style={styles.rightText}>{rightText}</Text>
            </TouchableOpacity>}
        </View>
    )
  }
}

const styles=StyleSheet.create({
    headerContainer:{
        width:'100%', 
        height: Const.navBarHeight + Device.ToolbarHeight, 
        paddingTop: Device.ToolbarHeight,
        flexDirection:'row', 
        alignItems:'center', 
        backgroundColor:Color.primary,
        paddingHorizontal: 20
    },
    
    title:{
        fontSize:18,
        fontWeight:'bold',
        color:'white',
    },

    description:{
        marginTop:5,
        fontSize:12,
        color:'white',
    },

    titleContainer:{
        flex:1,
        alignItems:'center',
    },

    left:{
        paddingVertical:10,
        paddingHorizontal:20,
        position:'absolute',
        bottom:0,
    },
    right:{
        position: 'absolute',
        paddingVertical:10,
        paddingHorizontal:20,
        bottom:0,
    },
    rightText:{
        fontSize:14,
        color:'white',
        fontWeight:'bold'
    }
})