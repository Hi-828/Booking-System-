import React, { PureComponent } from "react";

import { KeyboardAvoidingView, NetInfo, StyleSheet } from "react-native";
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
  } from 'react-native-router-flux';
import { Asset, AppLoading, DangerZone } from 'expo';
import { StackViewStyleInterpolator } from 'react-navigation-stack';
import { connect } from "react-redux";
import * as commonActions from '@store/common/actions'
import { bindActionCreators } from "redux";
import Global from '@utils/global'
import Color from "@common/color";

import TabBarIcon from '@components/tabBarIcon'
import NavBar from '@components/navBar'

// General
import General from '@screens/general/general'
import Loading from '@screens/general/loading'

// Home
import Home from '@screens/home'

// Packages
import Packages from '@screens/packages'

// Hot Deal
import HotDeal from '@screens/hotDeal'

// My Cart
import MyCart from '@screens/myCart'

// Profile
import Profile from '@screens/profile'
import Login from '@screens/auth/login'
import Register from '@screens/auth/register'
import ForgotPassword from '@screens/auth/forgotPassword'


const transitionConfig = () => ({
    screenInterpolator:
        StackViewStyleInterpolator.forFadeFromBottomAndroid,
});

class Root extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };

    console.log(props)
  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
        "connectionChange",
        hasInternetConnection => {
          this.props.commonActions.setInternetConnection(hasInternetConnection)
          if ( !hasInternetConnection ){
              Actions.Offline()
          }
        }
    );

  }
  async _cacheResourcesAsync() {
    const images = [
        require('@images/background.png'),
        require('@images/offline.jpeg'),
        require('@images/maintenance.png'),
        require('@images/transfer-loading.png'),
        require('@images/hotel-loading.png'),
        require('@images/activity-loading.png'),
        require('@images/car-loading.png'),
        require('@images/flight-loading.png'),
        require('@images/logo.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages)

  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    
    const scenes = Actions.create(
        <Overlay key="overlay">
            <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
                <Lightbox key="lightbox">
                    <Stack key="root" hideNavBar>
                        <Scene hideNavBar>
                            <Tabs
                                key="TabBar"
                                backToInitial
                                onTabOnPress={() => {
                                    console.log('Back to initial and also print this');
                                }}
                                swipeEnabled
                                tabBarStyle={styles.tabBarStyle}
                                activeBackgroundColor="white"
                                inactiveTintColor={Color.lightText}
                                activeTintColor={Color.primary}
                                inactiveBackgroundColor="white">

                                <Scene key="Home" tabBarLabel="Home" 
                                    icon={(props)=><TabBarIcon name="ios-home" {...props}/>} navBar={NavBar}>

                                    <Scene key="Home" component={Home} title="Home"/>
                                </Scene>
                                
                                <Scene key="Packages" tabBarLabel="Packages" 
                                    icon={(props)=><TabBarIcon name="ios-list" {...props}/>} navBar={NavBar}>

                                    <Scene key="Packages" component={Packages} title="Travel Packages"/>
                                </Scene>

                                <Scene key="HotDeal" tabBarLabel="Hot Deal" 
                                    icon={(props)=><TabBarIcon name="ios-heart" {...props}/>} navBar={NavBar} >

                                    <Scene key="HotDeal" component={HotDeal} title="Hot Deals"/>
                                </Scene>

                                <Scene key="MyCart" tabBarLabel="My Cart" 
                                    icon={(props)=><TabBarIcon name="ios-notifications" {...props}/>} navBar={NavBar} >

                                    <Scene key="MyCart" component={MyCart} title="My Cart"/>
                                </Scene>

                                <Scene key="MyProfile" tabBarLabel="My Profile" 
                                    icon={(props)=><TabBarIcon name="ios-contact" {...props}/>} navBar={NavBar} >

                                    <Scene key="Profile" component={Profile}/>
                                    <Scene key="Login" component={Login} initial={!this.props.isLoggedIn} hideNavBar />
                                    <Scene key="Register" component={Register} title="Sign Up"/>
                                    <Scene key="ForgotPassword" component={ForgotPassword} title="Forgot Password"/>
                                </Scene>
                            </Tabs>
                            <Scene key="Offline" component={()=><General screenType='offline'/>} hideNavBar />
                            <Scene key="Maintenance" component={()=><General screenType='maintenance'/>} hideNavBar />
                            <Scene key="Loading" component={Loading} hideNavBar />
                        </Scene>
                    </Stack>
                </Lightbox>
            </Modal>
        </Overlay>
    );

  
    return (
        <KeyboardAvoidingView
            behavior={'padding'}
            style={{ flex: 1 }}>
                <Router hideNavBar scenes={scenes} />
        </KeyboardAvoidingView>
    );
  }
}

export default connect(
    state => ({
      isLoggedIn: state.auth.isLoggedIn,
    }),
    dispatch => ({
      commonActions: bindActionCreators(commonActions, dispatch)
    })
)(Root);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});