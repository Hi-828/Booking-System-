import React, {PureComponent} from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
} from 'react-native'
import Color from '@common/color'

export default class AuthButton extends PureComponent{
    render(){
        let {style, title} = this.props
        return(
            <TouchableOpacity style={[styles.container,style]}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:300,
        height:44,
        borderRadius:22,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        fontSize:13,
        color:'white',
        // fontWeight:'bold'
    }
})