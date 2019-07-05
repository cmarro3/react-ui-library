import React, { useState, useEffect, useMemo, useCallback, Children, isValidElement } from 'react';
import styled, { withTheme } from 'styled-components';
import { flex, scroll, position, transition, clickable, styledCondition } from '@Utils/Mixins';
import { LabelLayout, LabelLayoutProps } from '@Layouts';
import { useTransition } from '@Utils/Hooks';
import { _ThemeTemplateInterface } from '@Themes/_ThemeTemplate';

const ITEM_HEIGHT = 41;
const SPEED = 'slow';

const createList = (
    children: Array<React.ReactNode>,
    onSelect: Function,
    value?: string | number
) => (
    children.map(child => {
        if (!isValidElement(child)) return;
        const val = child.props.value;
        const selected = String(value) === val;
        return (
            <SelectItem
                { ...child.props }
                selected={ selected }
                onClick={ onSelect }
                key={ val }
            />
        );
    })
);

export interface SelectProps extends LabelLayoutProps {
    disabled?: boolean,
    placeholder?: string,
    value?: string | number,
    theme: _ThemeTemplateInterface,
    onChange?: Function,
    items?: number
};

const _Select = ({
    disabled,
    value,
    children,
    items = 4,
    placeholder = '',
    onChange = () => {},
    theme,
    ...props
}: SelectProps) => {
    const [ expanded, setExpanded ] = useState(false);
    const options = Children.toArray(children);
    const displayProps = {
        success: props.success,
        error: props.error,
        disabled
    };

    const [ ,mount, animation ] = useTransition(
        expanded, { end: theme.speed[SPEED] }
    );

    const selected = useMemo(() => (
        options.find(option => (
            isValidElement(option) && option.props.value === String(value)
        ))
    ), [ children, value ]);

    const onSelect = useCallback(el => {
        el.target.name = props.name;
        onChange(el);
    }, [ props.name ]);

    useEffect(() => {
        if (!expanded) return;
        const listener = () => setExpanded(false);
        const timer = window.setTimeout(() => {
            window.addEventListener('click', listener, { once: true });
        }, 10);

        return () => {
            window.clearTimeout(timer);
            window.removeEventListener('click', listener);
        }
    }, [ expanded ]);

    return (
        <LabelLayout { ...props }>
            <Container>
                <SelectDisplay { ...displayProps } onClick={ !disabled ? setExpanded : undefined }>
                    {
                        selected ?
                        (selected as React.ReactElement).props.children :
                        placeholder
                    }
                </SelectDisplay>
                {
                    mount && (
                        <SelectList limit={ items } expanded={ animation }>
                            { createList(options, onSelect, value) }
                        </SelectList>
                    )
                }
            </Container>
        </LabelLayout>
    );
};

export const Select = withTheme(_Select);

const Container = styled.div`
    ${ flex('column') }
    position: relative;
`;

const SelectDisplay = styled.p`
    ${ transition(['background-color', 'opacity', 'box-shadow']) }
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    margin: 0;

    // Disabled
    ${({ disabled }) => disabled ? `
        cursor: not-allowed;
        opacity: 0.6;
    ` : ''}

    // Theme Stuff
    ${({ theme, disabled }) => `
        padding: ${ theme.dimensions.padding.default };
        border-radius: ${ theme.dimensions.radius };
        font-family: ${ theme.font.family };
        ${!disabled ? `
            &:hover:not(:disabled) {
                box-shadow: ${ theme.depth[1] };
            }
        ` : ''}
    `}

    // Background color
    ${({ theme, error, success }) => `
        background-color: ${
            styledCondition(
                error, theme.colors.input.error,
                success, theme.colors.input.success,
                theme.colors.input.default
            )
        };
    `}
`;

const SelectList = styled.ul`
    ${ position('absolute', '0 0 20px') }
    ${ scroll }
    
    background-color: white;
    list-style-type: none;
    height: fit-content;
    overflow: auto;
    padding: 0;

    // Theme Stuff
    ${({ theme }) => `
        ${ transition(['max-height', {
            prop: 'opacity', duration: theme.speed.normal
        }], theme.speed[SPEED]) }
        border-radius: ${ theme.dimensions.radius };
        box-shadow: ${ theme.depth[1] };
    `}

    ${({ expanded, limit }) => expanded ? `
        max-height: ${ limit * ITEM_HEIGHT }px;
        opacity: 1;
    `: `
        max-height: ${ ITEM_HEIGHT }px;
        pointer-events: none;
        opacity: 0;
    `}
`;

const SelectItem = styled.li`
    ${ transition(['background-color']) }
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;

    // Theme Stuff
    ${({ theme }) => `
        padding: ${ theme.dimensions.padding.default };
        ${ clickable('#ffffff', 0.03) }
    `}
`;

export default Select;