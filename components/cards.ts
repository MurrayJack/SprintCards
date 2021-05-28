import { AiOutlineCoffee } from 'react-icons/ai'
import { MdAccessibility, MdAirplanemodeActive } from 'react-icons/md'
import { GiDutchBike, GiScooter, GiCityCar, GiFireworkRocket } from 'react-icons/gi'
import { IconType } from 'react-icons'

export interface ICard {
    caption: string
    icon: IconType
}

const cards: ICard[] = [
    {
        caption: '1',
        icon: MdAccessibility,
    },
    {
        caption: '2',
        icon: GiDutchBike,
    },
    {
        caption: '3',
        icon: GiScooter,
    },
    {
        caption: '5',
        icon: GiCityCar,
    },
    {
        caption: '8',
        icon: MdAirplanemodeActive,
    },
    {
        caption: '13',
        icon: GiFireworkRocket,
    },
    {
        caption: '?',
        icon: AiOutlineCoffee,
    },
]

export default cards
