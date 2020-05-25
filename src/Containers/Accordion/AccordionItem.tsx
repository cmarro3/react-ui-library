import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { AngleUp } from 'styled-icons/fa-solid/AngleUp';
import { Mixins } from '../../Utils';
import { transition } from '../../Utils/Mixins';
import { Heading } from '../../Text';

export interface AccordionItemProps
    extends React.HTMLAttributes<HTMLDivElement> {
    header: string;
    activeStyle: Function;
}

export interface SectionDivProps {
    isActive: boolean;
    height: number;
}

export interface HeaderDivProps {
    isActive: boolean;
    activeStyle: Function;
}

export interface IconProps {
    isActive: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
    header,
    activeStyle,
    ...props
}) => {
    const [isActive, setIsActive] = useState(false);
    const [height, setHeight] = useState(0);
    const toggleIsActive = () => {
        setIsActive(!isActive);
    };
    const bodyRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const { children } = props;

    useLayoutEffect(() => {
        const bodyNode = bodyRef.current;
        const headerNode = headerRef.current;
        if (bodyNode && headerNode) {
            if (isActive) {
                setHeight(bodyNode.clientHeight + headerNode.clientHeight);
            } else {
                setHeight(headerNode.clientHeight);
            }
        }
    }, [isActive]);

    return (
        <SectionDiv {...props} height={height} isActive={isActive}>
            <HeaderDiv
                ref={headerRef}
                activeStyle={activeStyle}
                isActive={isActive}
                onClick={toggleIsActive}
            >
                <Header>{header}</Header>
                <Icon isActive={isActive} />
            </HeaderDiv>
            <BodyDiv ref={bodyRef}>{children}</BodyDiv>
        </SectionDiv>
    );
};

const SectionDiv = styled.div<SectionDivProps>`
    overflow: hidden;
    height: ${({ height }) => height}px;
    ${Mixins.transition(['height'], '0.5s')}
`;

const HeaderDiv = styled.div<HeaderDivProps>`
    display: flex;
    user-select: none;
    cursor: pointer;
    padding: 5px 0 5px 0;

    ${({ isActive, activeStyle }): string =>
        isActive ? `${activeStyle()}` : ``};
    justify-content: space-between;
    align-items: center;
`;

const BodyDiv = styled.div``;

const Icon = styled(AngleUp)<IconProps>`
    ${transition(['transform'])}
    transform: rotate(${({ isActive }) => (isActive ? 180 : 0)}deg);
    width: 8px;
    float: right;
    margin-bottom: auto;
    margin-top: auto;

`;

const Header = styled(Heading).attrs({ type: 'h5' })`
    :hover {
        ${Mixins.transition(['color'], '0.5s')};
        color: #ee2434;
    }
`;
