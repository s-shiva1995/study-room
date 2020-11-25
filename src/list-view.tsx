import {StackNavigationProp} from '@react-navigation/stack';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Text,
  Toast,
  View,
} from 'native-base';
import * as React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {Card as ICard, Deck, DeckApi, DrawCard} from './api';
import {APP_STRING} from './app-strings';
import {SCREENS} from './contants';
import {HomeNavigationParamList} from './navigation';
import {commonStyles} from './styles';

interface State {
  deck: Deck;
  cardDrawn: DrawCard;
  cardsToDraw: string;
}
interface Props {
  navigation: StackNavigationProp<HomeNavigationParamList>;
}

class ListView extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      deck: undefined,
      cardDrawn: undefined,
      cardsToDraw: '',
    };
  }
  public render(): JSX.Element {
    const {deck, cardDrawn, cardsToDraw} = this.state;
    return (
      <Container style={commonStyles.container}>
        <Content>
          <Card>
            <CardItem>
              <View style={commonStyles.fullFlex}>
                <Button onPress={this.newDeck} full>
                  <Text>{APP_STRING.getNewDeck}</Text>
                </Button>
              </View>
            </CardItem>
            <CardItem>
              <Left>
                <Item floatingLabel>
                  <Label>{APP_STRING.cardToDraw}</Label>
                  <Input
                    disabled={!deck?.deck_id || deck.remaining <= 0}
                    value={cardsToDraw.toString()}
                    onChangeText={(value) => {
                      if (value && isNaN(Number(value))) {
                        return Toast.show({
                          type: 'danger',
                          text: APP_STRING.invalidValue,
                        });
                      } else if (Number(value) > deck.remaining) {
                        return Toast.show({
                          type: 'danger',
                          text: APP_STRING.greaeterThanRemaining,
                        });
                      }
                      this.setState({cardsToDraw: value});
                    }}
                  />
                </Item>
              </Left>
              <Body>
                <Button onPress={this.drawCard} disabled={!deck?.deck_id} full>
                  <Text>{APP_STRING.drawCard}</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
          {deck && (
            <Card>
              <CardItem header>
                <Text>{APP_STRING.deckInfo}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{`${APP_STRING.deckId}: ${deck.deck_id}`}</Text>
                  <Text>{`${APP_STRING.remainingCard}: ${deck.remaining}`}</Text>
                  <Text>{`${APP_STRING.shuffled}: ${
                    deck.shuffled ? APP_STRING.yes : APP_STRING.no
                  }`}</Text>
                </Body>
              </CardItem>
            </Card>
          )}
          {cardDrawn?.cards?.length && (
            <Card>
              <FlatList
                data={cardDrawn.cards}
                keyExtractor={(item) => item.code}
                renderItem={this.renderDrawnCards}
              />
            </Card>
          )}
        </Content>
      </Container>
    );
  }

  private newDeck = async () => {
    try {
      const deck = await DeckApi.shuffleDeck();
      this.setState({deck});
    } catch (error) {
      console.error(`Failed to get new deck due to: ${error.message}`);
    }
  };

  private drawCard = async () => {
    try {
      const {deck, cardsToDraw} = this.state;
      const cardDrawn = await DeckApi.drawCards(
        deck.deck_id,
        cardsToDraw ? Number(cardsToDraw) : undefined,
      );
      this.setState((state) => ({
        cardDrawn,
        deck: {...state.deck, remaining: cardDrawn.remaining},
      }));
    } catch (error) {
      console.error(`Failed to draw card from deck due to: ${error.message}`);
    }
  };

  private renderDrawnCards = ({
    item,
  }: ListRenderItemInfo<ICard>): JSX.Element => {
    const {suit, value} = item;
    return (
      <CardItem
        button
        onPress={() =>
          this.props.navigation.navigate(SCREENS.DetailView, item)
        }>
        <Left>
          <Text>{`${suit}: ${value}`}</Text>
        </Left>
        <Right>
          <Icon name={'chevron-right'} type={'FontAwesome5'} />
        </Right>
      </CardItem>
    );
  };
}

export default ListView;
