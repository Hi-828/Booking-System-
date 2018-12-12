import React, {PureComponent} from 'react'
import {
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import Color from '@common/color'
import {Ionicons} from '@expo/vector-icons'
import {LinearGradient} from 'expo'

export default class AuthTypeButton extends PureComponent{
    render(){
        let {icon, onPress, selected} = this.props
        const name=icon=='email'?"ios-mail":'ios-phone-portrait'
        const color = selected?'white':Color.lightPrimary
        const colors = selected?[Color.primary, Color.lightPrimary]:['white', 'white']
        return(
            <LinearGradient
                colors={colors}
                start={[1,0]}
                end={[0, 1]}
                style={styles.container}>
                <TouchableOpacity onPress={()=>onPress(icon)} style={styles.button}>
                    <Ionicons name={name} size={24} color={color}/>
                </TouchableOpacity>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:40,
        height:40,
        borderRadius:20,
        overflow:'hidden'
    },
    button:{
        backgroundColor:'transparent',
        height:40,
        width:40,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
    }
})