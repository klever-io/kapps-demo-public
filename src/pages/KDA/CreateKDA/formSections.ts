import { ISection } from 'components/Form';

const sections = (type: string): ISection[] => {
  const address = sessionStorage.getItem('walletAddress') || '';

  const section = [] as ISection[];

  switch (type) {
    case 'Token':
      section.push(
        {
          fields: [
            { label: 'Name', props: { required: true, tooltip: 'Token name' } },
            {
              label: 'Ticker',
              props: { required: true, tooltip: 'Token shorthand' },
            },
            {
              label: 'Owner',
              props: { required: true, defaultValue: address },
            },
            {
              label: 'Precision',
              props: {
                type: 'number',
                required: true,
                tooltip: 'Number of decimal places (0-8)',
              },
            },
            {
              label: 'Initial Supply',
              props: {
                type: 'number',
                tooltip: 'Number of tokens to be issued',
              },
            },
            {
              label: 'Max Supply',
              props: {
                type: 'number',
                tooltip: 'Maximum number of tokens that can exist',
              },
            },
            {
              label: 'Logo',
              props: {
                span: 2,
                tooltip: 'URL of the logo',
              },
            },
          ],
        },
        {
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
        },
        {
          title: 'Royalties',
          fields: [
            {
              label: 'Address',
              props: { required: true, defaultValue: address, span: 2 },
            },
            {
              label: 'Transfer Percentage',
              props: {
                type: 'struct',
                array: true,
                innerSection: {
                  title: 'Royalty Info',
                  inner: true,
                  innerPath: 'royalties.transferPercentage',
                  fields: [
                    { label: 'Amount', props: { type: 'number' } },
                    { label: 'Percentage', props: { type: 'number' } },
                  ],
                },
              },
            },
          ],
        },
        {
          title: 'Staking',
          fields: [
            {
              label: 'Type',
              props: {
                type: 'checkbox',
                toggleOptions: ['APR', 'FPR'],
                defaultValue: 0,
                disabled: true,
              },
            },
            { label: 'APR', props: { type: 'number' } },
            { label: 'Min Epochs To Claim', props: { type: 'number' } },
            { label: 'Min Epochs To Unstake', props: { type: 'number' } },
            { label: 'Min Epochs To Withdraw', props: { type: 'number' } },
          ],
        },
        {
          title: 'Roles',
          fields: [
            {
              label: 'Roles',
              props: {
                type: 'struct',
                array: true,
                innerSection: {
                  title: 'Roles',
                  inner: true,
                  innerPath: 'roles',
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
                      label: 'Has Role Set ITO Prices',
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
        },
        {
          title: 'Properties',
          fields: [
            {
              label: 'Can Freeze',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
              },
            },
            {
              label: 'Can Wipe',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
                defaultValue: 'false',
              },
            },
            {
              label: 'Can Pause',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
              },
            },
            {
              label: 'Can Mint',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
              },
            },
            {
              label: 'Can Burn',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
              },
            },
            {
              label: 'Can Change Owner',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
              },
            },
            {
              label: 'Can Add Roles',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
              },
            },
          ],
        },
      );
      break;
    //======================================================================================================================================
    //======================================================================================================================================
    //======================================================================================================================================
    case 'NFT':
      section.push(
        {
          fields: [
            { label: 'Name', props: { required: true, tooltip: 'Token name' } },
            {
              label: 'Ticker',
              props: { required: true, tooltip: 'Token shorthand' },
            },
            {
              label: 'Owner',
              props: { required: true, defaultValue: address },
            },
            {
              label: 'Max Supply',
              props: {
                type: 'number',
                tooltip: 'Maximum number of NFTs that can exist',
              },
            },
            {
              label: 'Logo',
              props: {
                span: 2,
                tooltip: 'URL of the tokens logo',
              },
            },
          ],
        },
        {
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
        },
        {
          title: 'Royalties',
          fields: [
            {
              label: 'Address',
              props: { required: true, defaultValue: address },
            },
            {
              label: 'Market Fixed',
              props: {
                type: 'number',
                tooltip: 'Fixed KLV amount in each market transaction',
              },
            },
            {
              label: 'Market Percentage',
              props: {
                type: 'number',
                tooltip: 'Percentage KLV amount in each market transaction',
              },
            },
            {
              label: 'Transfer Fixed',
              props: {
                type: 'number',
                tooltip: 'Fixed KLV amount in each transfer transaction',
              },
            },
          ],
        },
        {
          title: 'Roles',
          fields: [
            {
              label: 'Roles',
              props: {
                type: 'struct',
                array: true,
                innerSection: {
                  title: 'Roles',
                  inner: true,
                  innerPath: 'roles',
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
                      label: 'Has Role Set ITO Prices',
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
        },
        {
          title: 'Properties',
          fields: [
            {
              label: 'Can Freeze',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
              },
            },
            {
              label: 'Can Wipe',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
                defaultValue: 'false',
              },
            },
            {
              label: 'Can Pause',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
              },
            },
            {
              label: 'Can Mint',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
              },
            },
            {
              label: 'Can Burn',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
              },
            },
            {
              label: 'Can Change Owner',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
              },
            },
            {
              label: 'Can Add Roles',
              props: {
                type: 'checkbox',
                toggleOptions: ['No', 'Yes'],
                bool: true,
              },
            },
          ],
        },
      );
      break;
    default:
      break;
  }
  return section;
};

export default sections;
