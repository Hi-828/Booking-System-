import React, {PureComponent} from 'react'
import {
    ImageBackground,
    StyleSheet
} from 'react-native'

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

import Color from '@common/color'
import {carLoading, flightLoading, hotelLoading, activityLoading, transferLoading} from '@common/image'

export default class General extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            car:carLoading,
            flight:flightLoading,
            hotel:hotelLoading,
            activity:activityLoading,
            transfer:transferLoading
        }
    }
    render(){
        return(
            <ImageBackground 
                source={this.state.backImage} 
                style={styles.background}
            >
                <BallIndicator 
                    color={Color.primary}
                    style={style.indicator}
                />
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        alignItems:'center',
        justifyContent: 'flex-end'
    },
    indicator:{
        marginBottom: 100,
    }
})