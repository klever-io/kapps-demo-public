import { ISection } from 'components/Form';

const sections = (marketplaceID: string): ISection[] => {
  const section = [] as ISection[];
  section.push({
    fields: [
      {
        label: 'Market Type',
        props: {
          type: 'checkbox',
          toggleOptions: ['Fixed Price', 'Auction'],
          defaultValue: 0,
          tooltip: '0: Instant Sell, 1: Auction',
        },
      },
      {
        label: 'Marketplace ID',
        props: {
          defaultValue: marketplaceID || '',
          tooltip: 'Maketplace ID in which the sell order will be created',
        },
      },
      {
        label: 'Currency ID',
        props: {
          tooltip: 'Transaction currency token',
        },
      },
      {
        label: 'Price',
        props: { type: 'number', tooltip: 'Instant-sell price' },
      },
      {
        label: 'Reserve Price',
        props: { type: 'number', tooltip: 'If auction, minimum bid price' },
      },
      {
        label: 'End Time',
        props: {
          type: 'datetime-local',
          tooltip: 'Expiration sell time',
        },
      },
    ],
  });

  return section;
};

export default sections;
