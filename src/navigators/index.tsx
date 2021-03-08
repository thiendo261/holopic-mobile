import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { PersistPartial } from 'redux-persist/es/persistReducer';

import { useAppSelector } from '@store/store';
import { IAuthState } from '@store/slices/auth';
import { AuthStatus, HoloScreen } from '@constants';
import AppStack from './app-stack';
import WelcomeScreen from '@screens/Welcome';
import LoginScreen from '@screens/Auth';

const Stack = createStackNavigator();

const Loading = () => <View />;

const RootStack = () => {
  const authState: IAuthState & PersistPartial = useAppSelector(
    state => state.auth,
  );

  return (
    <Stack.Navigator headerMode="none">
      {authState.status === AuthStatus.VERIFYING && (
        <Stack.Screen name={HoloScreen.LOADING} component={Loading} />
      )}

      {authState.status === AuthStatus.FIST_TIME_LOGIN &&
        authState.showWelcomeScreen && (
          <Stack.Screen name={HoloScreen.WELCOME} component={WelcomeScreen} />
        )}

      {authState.status === AuthStatus.UNAUTHORIZED && (
        <Stack.Screen name={HoloScreen.LOGIN} component={LoginScreen} />
      )}

      {authState.status === AuthStatus.LOGGED_IN && (
        <Stack.Screen name={HoloScreen.APP_STACK} component={AppStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
