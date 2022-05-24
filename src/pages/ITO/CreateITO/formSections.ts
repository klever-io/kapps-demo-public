import { ISection } from 'components/Form';
import { IDropdownItem } from 'components/Form/FormInput/Select';

const sections = (assets: IDropdownItem[]): ISection[] => {
  const address = sessionStorage.getItem('walletAddress') || '';
  const section = [] as ISection[];
  section.push({
    fields: [
      {
        label: 'AssetID',
        props: { type: 'dropdown', options: assets, required: true },
      },
      {
        label: 'Receiver Address',
        props: { required: true, defaultValue: address },
      },
      {
        label: 'Status',
        props: { type: 'checkbox', toggleOptions: ['Inactive', 'Active'] },
      },
      {
        label: 'Max Amount',
        props: {
          type: 'number',
          tooltip: 'Maximum amount of token minted by the ITO',
        },
      },
    ],
  });

  return section;
};

export default sections;
