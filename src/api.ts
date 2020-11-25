import {Toast} from 'native-base';
import Axios from 'axios';

const DECK_API_URL = 'https://deckofcardsapi.com/api/deck';

export interface Deck {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export interface Card {
  image: string;
  value: string;
  suit: string;
  code: string;
}

export interface DrawCard {
  success: boolean;
  cards: Card[];
  deck_id: string;
  remaining: number;
}

export class DeckApi {
  public static async shuffleDeck(deckId: string = ''): Promise<Deck> {
    try {
      const url = `${DECK_API_URL}/${deckId || 'new'}/shuffle`;
      const response = await Axios.request({
        method: 'GET',
        url,
        params: {deck_count: 1},
      });
      const deck: Deck = response.data;
      return deck;
    } catch (error) {
      console.error(`Failed to shuffle deck due to: ${error.message}`);
      Toast.show({type: 'danger', text: 'Deck not shuffled'});
      throw error;
    }
  }

  public static async drawCards(
    deckId: string,
    count: number = 1,
  ): Promise<DrawCard> {
    try {
      const url = `${DECK_API_URL}/${deckId}/draw`;
      const response = await Axios.request({
        method: 'GET',
        url,
        params: {count},
      });
      const drawCard: DrawCard = response.data;
      return drawCard;
    } catch (error) {
      console.error(`Failed to draw card due to: ${error.message}`);
      Toast.show({type: 'danger', text: 'Retry again'});
      throw error;
    }
  }
}
