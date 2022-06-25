import { ISection } from 'components/Form';

const sections = (): ISection[] => {
  const address = sessionStorage.getItem('walletAddress') || '';
  const section = [] as ISection[];
  section.push({
    fields: [
      { label: 'Name', props: { tooltip: 'Marketplace name' } },
      {
        label: 'Referral Address',
        props: {
          defaultValue: address,
          tooltip: 'Royalties receiving address',
        },
      },
      {
        label: 'Referral Percentage',
        props: {
          type: 'number',
          tooltip: 'Royalties percentage (precision 2)',
        },
      },
    ],
  });

  return section;
};

export default sections;
