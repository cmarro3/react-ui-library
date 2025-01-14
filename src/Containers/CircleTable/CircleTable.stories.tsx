import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CircleTable, ICircleTable } from '@Containers';
import { createStoryTitle } from '../../Constants';

export default {
    title: createStoryTitle('CircleTable'),
    component: CircleTable,
} as Meta;

const Template: Story<ICircleTable> = (args) => <CircleTable {...args} />;

/**
 * Prints the Selected Child index to the console when Table is clicked
 * @param selectedChildIndex
 */
const handleTableClick = (selectedChildIndex: number) => {
    console.log(selectedChildIndex);
};

/**
 *Creates a SquareTable component with 4 chairs
 */
export const FourTopTable = Template.bind({});
FourTopTable.args = {
    tableShape: 'Circle',
    tableID: 'T1',
    partyName: 'Dmytro',
    occupancyStatus: 'Vacant',
    chairs: [
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Scott',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Dean',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Corey',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Jack',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
        },
        {
            position: 'top',
            isSeated: false,
            occupiedBy: '',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
        },
        {
            position: 'top',
            isSeated: true,
            occupiedBy: 'Sam',
            isVisible: true,
            isRound: true,
            relativeSize: 0.5,
            tableUse: 'TableForManagement',
        },
    ],
    relativeSize: 0.5,
    tableUse: 'TableForManagement',
    onTableClick: handleTableClick,
};
