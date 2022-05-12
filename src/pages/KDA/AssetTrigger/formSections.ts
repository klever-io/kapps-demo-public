import { ISection } from 'components/Form';

export const options = [
  {
    label: 'Mint (0)',
    value: 0,
  },
  {
    label: 'Burn (1)',
    value: 1,
  },
  {
    label: 'Wipe (2)',
    value: 2,
  },
  {
    label: 'Pause (3)',
    value: 3,
  },
  {
    label: 'Resume (4)',
    value: 4,
  },
  {
    label: 'Change Owner (5)',
    value: 5,
  },
  {
    label: 'Add Role (6)',
    value: 6,
  },
  {
    label: 'Remove Role (7)',
    value: 7,
  },
  {
    label: 'Update Metadata (8)',
    value: 8,
  },
  {
    label: 'Stop NFT Mint (9)',
    value: 9,
  },
  {
    label: 'Update Logo (10)',
    value: 10,
  },
  {
    label: 'Update URIs (11)',
    value: 11,
  },
  {
    label: 'Change Royalties Receiver (12)',
    value: 12,
  },
];
const sections = (assetId: string, type: number): ISection[] => {
  const address = sessionStorage.getItem('walletAddress') || '';
  const section = [] as ISection[];

  section.push({
    fields: [
      {
        label: 'Asset ID',
        props: {
          required: true,
          defaultValue: assetId,
        },
      },
    ],
  });

  switch (type) {
    case 1:
      section[0].fields.push({ label: 'Amount', props: { type: 'number' } });
      break;

    case 3:
    case 4:
    case 9:
      break;

    case 6:
      section.push({
        title: 'Role',
        fields: [
          {
            label: 'Role',
            props: {
              type: 'struct',
              innerSection: {
                title: 'Role',
                inner: true,
                innerPath: 'role',
                fields: [
                  { label: 'Address', props: { span: 2 } },
                  {
                    label: 'Has Role Mint',
                    props: {
                      type: 'checkbox',
                      toggleOptions: ['No', 'Yes'],
                      bool: true,
                    },
                  },
                  {
                    label: 'Has Role Set ICO Prices',
                    props: {
                      type: 'checkbox',
                      toggleOptions: ['No', 'Yes'],
                      bool: true,
                    },
                  },
                ],
              },
            },
          },
        ],
      });
      break;

    case 8:
      section[0].fields.push({
        label: 'Mime',
      });
      break;

    case 10:
      section[0].fields.push({
        label: 'Logo',
      });
      break;

    case 11:
      section.push({
        title: 'Uris',

        fields: [
          {
            label: 'Uri',
            props: {
              type: 'struct',
              array: true,
              innerSection: {
                title: 'Uri',
                inner: true,
                innerPath: 'uris',
                fields: [{ label: 'Label' }, { label: 'Address' }],
              },
            },
          },
        ],
      });
      break;

    case 5:
    case 7:
    case 12:
      section[0].fields.push(
        ...[
          {
            label: 'Receiver',
            props: {
              defaultValue: address,
            },
          },
        ],
      );

      break;

    default:
      section[0].fields.push(
        ...[
          {
            label: 'Receiver',
            props: {
              defaultValue: address,
            },
          },
          { label: 'Amount', props: { type: 'number' } },
        ],
      );

      break;
  }

  return section;
};

export default sections;
