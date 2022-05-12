import { ISection } from 'components/Form';

const sections = (): ISection[] => {
  const address = sessionStorage.getItem('walletAddress') || '';
  const section = [] as ISection[];
  section.push({
    fields: [
      { label: 'Name' },
      {
        label: 'Referral Address',
        props: {
          defaultValue: address,
        },
      },
      {
        label: 'Referral Percentage',
        props: {
          type: 'number',
          tooltip: 'fee in percentage (precision 2)',
        },
      },
    ],
  });

  return section;
};

export default sections;
