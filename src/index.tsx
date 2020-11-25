import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Root} from 'native-base';

import {HomeNavigation} from './navigation';

export default class Home extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <NavigationContainer>
        <Root>
          <HomeNavigation />
        </Root>
      </NavigationContainer>
    );
  }
}
