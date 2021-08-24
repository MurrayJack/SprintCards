import fibonacci from './fibonacci'
import tShirt from './tshirtSimple'

export const supportedCards = () => {
    return ['fibonacci', 'tshirt']
}

export const getCard = (card: CardSet) => {
    if (card === 'fibonacci') {
        return fibonacci
    }

    if (card === 'tshirt') {
        return tShirt
    }

    return [];
}
