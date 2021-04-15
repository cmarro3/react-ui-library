import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createStoryTitle } from '../../Constants';
import { TableFeature, TableFeatureProps } from './TableFeature'; 

const data = [ 
    {
        colOne: 'Uploading payout data',  
        colTwo: 'Manual', 
        colThree: 'Automatic',
    },
    {
        colOne: 'Verifying recipient data',  
        colTwo: 'Manual', 
        colThree: 'Automatic',
    },
    {
        colOne: 'Issuing payments',  
        colTwo: 'Manual', 
        colThree: 'Automatic',
    },
    {
        colOne: 'Reporting payouts',  
        colTwo: 'Manual', 
        colThree: 'Automatic',
    },
    {
        colOne: 'Tracking balances',  
        colTwo: 'Manual', 
        colThree: 'Automatic',
    },
    {
        colOne: 'Error handling',  
        colTwo: 'Manual', 
        colThree: 'Automatic',
    },
];

export default {
    title: createStoryTitle('TableFeature'),
    component: TableFeature,
    args: {
        heading: 'Simplified payout process',
        subHeading: 'Automate payout workflows',
        title: 'Automated payouts',
        description: 'Stop uploading spreadsheets and juggling multiple payout providers. Use a single integration to automate hours of operational overhead and reduce opportunities for human error.',
        traditional: 'Traditional',
        stripe: 'Stripe', 
        rowsVisible: 3,
        data,
    },
} as Meta;
  
const Table: Story<TableFeatureProps> = (args) => (
    <TableFeature {...args} />
);

export const Basic = Table.bind({});