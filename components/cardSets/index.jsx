import tShirtSets from './tShirtSets'
import fibonacciSets from './fibonacciSets'

export default [
    {
        name: 'T-Shirt',
        cardSets: [
            {
                name: 'S, M, L, XL, ?',
                set: tShirtSets.simple,
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
