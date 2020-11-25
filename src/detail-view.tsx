import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Image} from 'react-native';
import {Card, CardItem, Container, Content, Text} from 'native-base';
import * as React from 'react';
import {SCREENS} from './contants';
import {HomeNavigationParamList} from './navigation';
import {commonStyles, detailViewStyles} from './styles';
import {APP_STRING} from './app-strings';

interface Props {
  navigation: StackNavigationProp<HomeNavigationParamList, SCREENS.DetailView>;
  route: RouteProp<HomeNavigationParamList, SCREENS.DetailView>;
}

class DetailView extends React.PureComponent<Props, {}> {
  public render(): JSX.Element {
    const {image, code, suit, value} = this.props.route.params;

    return (
      <Container style={commonStyles.container}>
        <Content>
          <Card>
            <CardItem style={detailViewStyles.imageContainer}>
              <Image source={{uri: image}} style={detailViewStyles.image} />
            </CardItem>
            <CardItem header>
              <Text>{APP_STRING.cardDetails}</Text>
            </CardItem>
            <CardItem>
              <Text>{`${APP_STRING.cardCode}: ${code}`}</Text>
            </CardItem>
            <CardItem>
              <Text>{`${APP_STRING.cardSuit}: ${suit}`}</Text>
            </CardItem>
            <CardItem>
              <Text>{`${APP_STRING.cardValue}: ${value}`}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default DetailView;
