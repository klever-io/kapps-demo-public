import { GiCardExchange, GiTwoCoins, GiFrozenOrb } from 'react-icons/gi';
import { RiCopperCoinFill } from 'react-icons/ri';

export interface INavbarItem {
  name: string;
  pathTo: string;
  Icon: any;
  onClick?(): void;
}

export const heightLimit = 70; // pixels
export const navbarHeight = 5; // rem
export const navbarPadding = '1rem 17.5rem';

const navbarItems: INavbarItem[] = [
  {
    name: 'Marketplaces',
    pathTo: '/marketplaces',
    Icon: GiCardExchange,
  },
  {
    name: 'ICO',
    pathTo: '/ico',
    Icon: GiTwoCoins,
  },
  {
    name: 'KDA',
    pathTo: '/kda',
    Icon: RiCopperCoinFill,
  },
  {
    name: 'Staking',
    pathTo: '/staking',
    Icon: GiFrozenOrb,
  },
];

export { navbarItems };
