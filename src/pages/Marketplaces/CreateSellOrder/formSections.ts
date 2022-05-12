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
        },
      },
      {
        label: 'Marketplace ID',
        props: {
          defaultValue: marketplaceID || '',
        },
      },
      { label: 'Currency ID' },
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
        },
      },
    ],
  });

  return section;
};

export default sections;
