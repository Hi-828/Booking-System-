import React, {PureComponent} from 'react'
import {
    View,
    ImageBackground,
    StyleSheet,
    Image,
    Text,
    ScrollView
} from 'react-native'

import {background, logo} from '@common/image'
import Color from '@common/color'
import AuthTypeButton from '@components/auth/authTypeButton'
import AuthInput from '@components/auth/authInput';
import AuthButton from '@components/auth/authButton'
import { Actions } from 'react-native-router-flux';
import Device from '@common/device';

export default class Login extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            authType:'email',
        }
        this.changeAuthType.bind(this)
        this.login.bind(this)
        this.facebookLogin.bind(this)
        this.googleLogin.bind(this)
    }

    changeAuthType=(authType)=>{
        this.setState({authType})
    }

    login(){

    }

    facebookLogin(){

    }

    googleLogin(){

    }

    render(){
        let {authType, email, password, phone} = this.state
        const emailColor = authType=='email'?'white':'#ccc'
        const phoneColor = authType=='phone'?'white':'#ccc'
        return(
            <ImageBackground source={background} style={styles.flex} resizeMode="cover">
            <ScrollView>
                <View style={styles.container}>
                <Image source={logo} style={styles.logo}/>
                <View style={styles.typeSwitchContainer}>
                    <AuthTypeButton 
                        icon="email" 
                        selected={authType=='email'} 
                        onPress={this.changeAuthType}/>
                    <AuthTypeButton 
                        icon="phone" 
                        selected={authType=='phone'} 
                        onPress={this.changeAuthType}/>
                </View>
                <View style={styles.authTypeTextContainer}>
                    <Text style={[styles.authTypeText,{color:emailColor}]}>E-mail Address</Text>
                    <Text style={[styles.authTypeText,{color:phoneColor}]}>Mobile Number</Text>
                </View>
                <View style={styles.inputContainer}>
                    <AuthInput
                        refs={e=>this.authInputer=e}
                        authType={authType}
                        value={authType=='email'?email:phone}
                        onChangeText={(text)=>{
                            let obj={}
                            obj[authType] = text
                            this.setState(obj)
                        }}
                        onSubmitEditing={()=>this.passwordInput.focus()}
                    />
                    <View style={styles.spacer}/>
                    <AuthInput
                        refs={e=>this.passwordInput=e}
                        authType={'password'}
                        value={this.state.password}
                        onChangeText={(text)=>this.setState({password:text})}
                        onSubmitEditing={()=>this.login()}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <AuthButton 
                        style={styles.login}
                        title={"Sign in"} 
                        onPress={this.login}/>
                    <AuthButton 
                        style={styles.facebook} 
                        title={"Sign in with Facebook"} 
                        onPress={this.facebookLogin}/>
                    <AuthButton 
                        style={styles.google} 
                        title={"Sign in with Google+"} 
                        onPress={this.googleLogin}/>
                </View>
                <View style={styles.linkContainer}>
                    <Text style={styles.linkText} onPress={()=>Actions.ForgotPassword()}>Forgot Password?</Text>
                    <Text style={styles.linkText} onPress={()=>Actions.Register()}>Not here? Sign Up</Text>
                </View>
                </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    flex:{
        flex:1,
    },
    container:{
        marginTop:Device.ToolbarHeight+10,
        flex:1,
        resizeMode:'cover',
        alignItems:'center',
    },
    logo:{
        height:100,
        resizeMode:'contain'
    },
    typeSwitchContainer:{
        height:44,
        width:200,
        borderRadius:22,
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'space-between',
        alignItems:'center',
        padding:2,
        marginTop:20
    },
    authTypeTextContainer:{
        flexDirection:'row',
        width:260,
        marginTop:10,
        justifyContent:'space-between'
    },
    authTypeText:{
        fontSize:13,
    },
    spacer:{
        width:'100%',
        height:1,
        backgroundColor:Color.border
    },
    inputContainer:{
        borderRadius:4,
        width:300,
        backgroundColor:'white',
        marginTop:20
    },
    buttonContainer:{
        marginTop:20,
        width:300
    },
    linkContainer:{
        width:300,
        marginTop:40,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    login:{
        backgroundColor:Color.orange
    },
    facebook:{
        backgroundColor:Color.facebook,
        marginTop:40
    },
    google:{
        backgroundColor:Color.google,
        marginTop:20,
    },
    linkText:{
        fontSize:14, 
        // fontWeight:'bold',
        color:'white'
    }
})