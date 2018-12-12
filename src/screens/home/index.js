import React, {PureComponent} from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

export default class  Home extends PureComponent{
    render(){
        return(
            <View style={styles.container}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})