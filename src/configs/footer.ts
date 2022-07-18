import {
  Discord,
  Facebook,
  Instagram,
  Telegram,
  Twitter,
} from '../assets/social';

export interface IContent {
  title: string;
  infoLinks: IInfoLink[];
}

export interface IInfoLink {
  name: string;
  href: string;
}

export interface ISocial {
  Icon: any;
  link: string;
}

const description =
  'Klever Explorer is our main platform to visualize assets, blocks, nodes, accounts and transactions in an intuitive and interactive manner. Everything happening in KleverChain can be consulted here on our Explorer.';

const socials: ISocial[] = [
  {
    Icon: Facebook,
    link: 'https://www.facebook.com/klever.io',
  },
  {
    Icon: Twitter,
    link: 'https://twitter.com/klever_io',
  },
  {
    Icon: Discord,
    link: 'https://discord.gg/klever-io',
  },
  {
    Icon: Instagram,
    link: 'https://instagram.com/klever.io',
  },
  {
    Icon: Telegram,
    link: 'https://t.me/Klever_io',
  },
];

const contents: IContent[] = [
  {
    title: 'More on Klever',
    infoLinks: [
      { name: 'Klever Explorer', href: 'https://testnet.kleverscan.org/' },
      { name: 'Klever Finance', href: 'https://klever.finance/' },
      {
        name: 'WhitePaper',
        href: 'https://bc.klever.finance/wp',
      },
    ],
  },
];

const version = '1.0.6';

export { socials, description, contents, version };
