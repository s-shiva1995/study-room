import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ListView from './list-view';
import DetailView from './detail-view';
import {SCREENS} from './contants';
import {APP_STRING} from './app-strings';
import {Card} from './api';

export type HomeNavigationParamList = {
  [SCREENS.DetailView]: Card;
  [SCREENS.ListView]: undefined;
};

const Stack = createStackNavigator<HomeNavigationParamList>();

export const HomeNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.ListView}>
      <Stack.Screen
        name={SCREENS.ListView}
        component={ListView}
        options={{headerTitle: APP_STRING.listViewHeader}}
      />
      <Stack.Screen
        name={SCREENS.DetailView}
        component={DetailView}
        options={{headerTitle: APP_STRING.detailViewHeader}}
      />
    </Stack.Navigator>
  );
};
