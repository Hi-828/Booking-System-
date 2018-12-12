import React, {PureComponent} from 'react'
import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native'
import Color from '@common/color'
import {Ionicons} from '@expo/vector-icons'

export default class AuthInput extends PureComponent{
    render(){
        let {authType, onChangeText, value, onSubmitEditing, refs} = this.props
        const name={email:'ios-mail', phone:'ios-phone-portrait', password:'ios-unlock'}
        const keyboardType={email:'email-address', phone:'phone-pad', password:'default'}
        const returnKeyType=authType=='password'?'done':'next'
        const placeholder={email:'E-mail Address', phone:'Mobile Number', password:'Password'}
        return(
            <View style={styles.container}>
                <Ionicons name={name[authType]} size={24} color={Color.text} style={styles.icon}/>
                <TextInput
                    ref={e=>refs(e)}
                    secureTextEntry={authType=='password'}
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholder={placeholder[authType]}
                    underlineColorAndroid='transparent'
                    onChangeText={onChangeText}
                    value={value}
                    keyboardType={keyboardType[authType]}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    style={styles.input}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:50,
        flexDirection:'row',
        alignItems:'center'
    },
    input:{
        fontSize:13,
        flex:1,
        height:40
    },
    icon:{
        marginHorizontal:15,
    }
})