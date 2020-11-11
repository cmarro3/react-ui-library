import React from 'react';
import styled, {useTheme} from 'styled-components';

export interface ISquareTable {
    /**
     * The unique identifier for the table
     */
    tableID: string,
    /**
     * The number of chairs at the table
     */
    numOfChairs: number,
    /**
     * The name of the party assigned to the table
     */
    partyName: string,
    /**
     * The occupancy status for the table
     */
    occupancyStatus: string,
    /**
     * The seating/reservation time for the party at the table
     */
    reservationTime: Date,
}

enum occupancyStatusTypes {
    Vacant = "Vacant",
    Reserved = "Reserved",
    Occupied = "Occupied"
}

/**
 * Primary UI component for user interaction
 * Square Table
 */
export const SquareTable: React.FC<ISquareTable>
    = ({
        tableID = 'T1',
        numOfChairs = 4,
        partyName = 'Null',
        occupancyStatus = occupancyStatusTypes.Vacant,
        reservationTime = Date.now(),
        ...props
    }) => {

        const chairNumOnSide= getChairNumOnSide(numOfChairs);
        const {colors} = useTheme();

        /**
         * This function will determine how many chair to put per each side
         * of the table (left, right, top, bottom)
         * @param numOfChairs {number} - Total number of chairs per table
         * @return {number} - Number of chair per table side
         */
        function getChairNumOnSide(numOfChairs: number){

            if(numOfChairs < 1){
                return 1;
            }
            if(numOfChairs%4===0){
                return numOfChairs/4;
            }
            return Math.floor(numOfChairs/4)+1;
            
        }

        /**
         * This function will determine what color should be the Status and ColorDiv
         * and return hexadecimal color value
         * @param occupancyStatus {string} - Occupancy status
         * @return {string} - Hexadecimal color value
         */
        function getOccupancyColor(status: occupancyStatusTypes) {

            switch (occupancyStatus){
            case occupancyStatusTypes.Vacant:
                return colors.occupancyStatusColors.Vacant;
                
            case occupancyStatusTypes.Reserved:
                return colors.occupancyStatusColors.Reserved;
                    
            case occupancyStatusTypes.Occupied:
                return colors.occupancyStatusColors.Occupied;
            }

        }

        return (
            <div>
                {/** chairs top */}
                <TopBottomRow chairNumOnSide={chairNumOnSide}>
                    {[...Array(chairNumOnSide)].map((e,i) => (
                        <ChairCol>
                            {/* eslint-disable-next-line react/no-array-index-key */}
                            <TopChair key={i} />
                        </ChairCol>
                    )
                    )}
                </TopBottomRow>
                {/** table itself */}
                <div>
                    <Row >
                        {/** chairs left */}
                        <div>
                            {[...Array(chairNumOnSide)].map((e,i) => (
                                <SideChairRow>
                                    <LeftChair />
                                </SideChairRow>
                            )
                            )}          
                        </div>
                        <TableBody chairNumOnSide={chairNumOnSide} >
                            <Row>
                                <TableInfo >
                                    <p>
                                        {tableID+"\n"+partyName }
                                        <Status occupancyColor={getOccupancyColor(occupancyStatus)} >
                                            {occupancyStatus}
                                        </Status>
                                    </p>
                                </TableInfo>
                                <ColorDiv chairNumOnSide={chairNumOnSide} occupancyColor={getOccupancyColor(occupancyStatus)} />
                            </Row>
                        </TableBody>
                        {/** chairs right */}
                        <div>
                            {[...Array(chairNumOnSide)].map((e,i) => (
                                <SideChairRow >
                                    <RightChair />
                                </SideChairRow>
                            )
                            )}   
                        </div>
                    </Row>
                </div>
                {/** chairs bottom */}
                <div>
                    <TopBottomRow chairNumOnSide={chairNumOnSide} >
                        {[...Array(chairNumOnSide)].map((e,i) => (
                            <ChairCol >
                                <BottomChair key={i} />
                            </ChairCol>
                        )
                        )}
                    </TopBottomRow>
                </div>
            </div>
        );
    };

/**
 * Variables for the styled components
 */
const TableBody=styled.div`
            
        height: ${ ({chairNumOnSide}) => chairNumOnSide * 20}rem;
        width: ${ ({chairNumOnSide}) => chairNumOnSide * 20}rem;
        border-radius: 3rem;
        background-color: #6c757d;
`;

const ColorDiv=styled.div`
            
        height: ${ ({chairNumOnSide}) => chairNumOnSide * 20}rem;
        width: 3rem;
        margin-left:auto;
        margin-right: .95rem;
        border-top-right-radius: 3rem;
        border-bottom-right-radius: 3rem;
        background-color: ${ ({occupancyColor}) => occupancyColor };
`;

const TopChair=styled.div`
          
        border-top-left-radius: 3rem;
        border-top-right-radius: 3rem;
        height: 2rem;
        width: 10rem;
        margin-bottom: 0.25rem;
        margin-left: auto;
        margin-right: auto;
        background-color: #6c757d;         
 `;
    
const LeftChair=styled.div`
          
        border-top-left-radius: 3rem;
        border-bottom-left-radius: 3rem;
        width: 2rem;
        height: 10rem;
        margin-top:auto;
        margin-bottom: auto;
        margin-right: 1.25rem;
        margin-left: 1rem;
        background-color: #6c757d;
`;

const SideChairRow=styled.div`
          
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
        height: 20rem;
`;

const ChairCol=styled.div`
          
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
`;

const RightChair=styled.div`
          
        border-top-right-radius: 3rem;
        border-bottom-right-radius: 3rem;
        width: 2rem;
        height: 10rem;
        margin-top:auto;
        margin-bottom: auto;
        margin-left: 1.25rem;
        background-color: #6c757d;
`;

const BottomChair=styled.div`
         
        border-bottom-left-radius: 3rem;
        border-bottom-right-radius: 3rem;
        height: 2rem;
        width: 10rem;
        margin-top: 0.25rem;
        margin-left: auto;
        margin-right: auto;
        background-color: #6c757d;
`;

const Row=styled.div`
          
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
`;

const TableInfo=styled.div`
        
        color: #f8f9fa;
        margin-top: 2rem;
        margin-left: 3rem;
        white-space: pre-line;
`;

const TopBottomRow = styled.div`

        display: flex;
        flex-wrap: wrap;
        width: ${ ({chairNumOnSide}) => chairNumOnSide * 20}rem;
        margin-left: 1.3rem;
`;

const Status = styled.div`
        
        color: ${ ({occupancyColor}) => occupancyColor };
`;