import React from 'react'
import styled from 'styled-components';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles'; 
import { Heading, Paragraph } from '../../index'; 
import { media } from '../../Utils/Mixins'; 
import { Table } from './Table';
 
export interface TableFeatureProps extends MainInterface, ResponsiveInterface {
    heading: string;
    subHeading: string;
    title: string;
    description: string;
    rowsVisible?: number; 
    traditional: string;
    stripe: string;
    data: { 
        colOne: string; 
        colTwo: string; 
        colThree: string; 
    }[];
}

export const TableFeature: React.FC<TableFeatureProps> = ({
    heading,
    subHeading,
    title,
    description,
    data, 
    traditional,
    stripe,
}): React.ReactElement => (
    <>
        <Heading color="primary" type="h5" bold>{heading}</Heading>
        <Heading type="h1" bold>{subHeading}</Heading>
        <ContentWrapper>
            <Desciption>
                <Heading type="h6" bold>{title}</Heading>
                <Paragraph>{description}</Paragraph> 
            </Desciption>
            <TableHolder>
                <Table 
                    traditional={traditional} 
                    stripe={stripe} 
                    data={data}
                />
            </TableHolder> 
        </ContentWrapper> 
    </>
);

/** styled */
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    ${media('phone', 'flex-direction: column-reverse')}
`;
const Desciption = styled.div`
    width: 25%;
    display: block;
    padding: 1.5rem 1rem 0 0;
    ${media('phone', 'padding: 0; width: 100%')}
`;
const TableHolder = styled.div`  
    width: 100%;
    display: block;
    padding-left: 1rem;
    ${media('phone', 'padding: 0px; margin: 0 0 1rem 0;')}
`;