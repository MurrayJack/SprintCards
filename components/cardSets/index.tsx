import tShirtSets from './tShirtSets'
import fibonacciSets from './fibonacciSets'
import { IconType } from 'react-icons'

export interface ICards {
    name: string
    cardSets: {
        name: string
        set: ICardSet[]
    }[]
}

export interface ICardSet {
    caption: string
    icon: IconType
}

const cards: ICards[] = [
    {
        name: 'T-Shirt',
        cardSets: [
            {
                name: 'S, M, L, XL, ?',
                set: tShirtSets.simple,
            },
            {
                name: 'XS, S, M, L, XL, ?',
                set: tShirtSets.medium,
            },
        ],
    },
    {
        name: 'Fibonacci',
        cardSets: [
            {
                name: '1, 2, 3, 5, 8, 13, ?',
                set: fibonacciSets.simple,
            },
        ],
    },
]

export default cards

export const getCardSet = (name: string) => {
    return cards[0].cardSets[1]
}
