import React, { ReactElement, useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import { Button } from '@Inputs/Button/Button';
import styled from 'styled-components';
import { HeaderRow } from '../HeaderRow/HeaderRow';
import { Input } from "../../Inputs/Input/Input";
import { Paragraph } from "../../Text/Paragraph";
import { Modal } from '../Modal/Modal';

interface IInputData {
    inputValue: string;
}

interface ISignUpPopupProps {
    heading: string;
    subHeading: string;
    inputPlaceholder: string;
    handleSubmit: (arg0: EventListenerObject, arg1: IInputData) => void;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const SIGN_UP_COOKIE = "SignUpPopupSeen";

const SignUpPopup = ({ heading, subHeading, inputPlaceholder, handleSubmit }: ISignUpPopupProps): ReactElement => {

    const isModalVisible = useState(false);
    const [inputValue, setinputValue] = useState("");
    const [inputError, setInputError] = useState("");
    const [isSubmitValueSuccess, setIsSubmitValueSuccess] = useState(false);
    const [isOnCloseReady, setIsOnCloseReady] = useState(false);
    
    const cookies = new Cookies();
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const monthFromNow = new Date(year, month + 1, day);
    const yearFromNow = new Date(year + 1, month, day);


    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        let onCloseTimer: NodeJS.Timeout | undefined;
        if (cookies.get("SignUpPopupSeen")) {
            return;
        } 
        timer = setTimeout(() => {
            isModalVisible[1](true)
        }, 1000)

        onCloseTimer = setTimeout(() => {
            setIsOnCloseReady(true);
        }, 1001);
        
        
        return () => {
            clearTimeout(timer);
            clearTimeout(onCloseTimer);
        }
        
    }, []);

    const handleFormSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (EMAIL_REGEX.test(inputValue)) {
            setInputError("");
            try {
                await handleSubmit(event, inputValue);
                setIsSubmitValueSuccess(true);
                cookies.set(SIGN_UP_COOKIE, true, { expires: yearFromNow })
            } catch (e) {
                setInputError("Something went wrong! Please try again")
                console.error("handleFormSubmitError",e)
            }
        }
        else {
            setInputError("invalid email!")
        }
    }

    const handleClosePopUp = () => {
        isModalVisible[1](false);
        if (cookies.get(SIGN_UP_COOKIE) === undefined) {
            cookies.set(SIGN_UP_COOKIE, true, { expires: monthFromNow })
        }
    };

    //Modal OnClose function gets called when modal mounts,
    //but it should only get called when it unmounts
    const handleModalOnClose = () => {        
        if (isOnCloseReady) {
            cookies.set(SIGN_UP_COOKIE, true, { expires: monthFromNow })
        }
    };

    return (
        <>
            <StyledModal onClose={handleModalOnClose} padding="40px" state={isModalVisible}>
                <HeadingContainer>
                    <HeaderRow label={heading} type="h2" display="column" />
                    <Paragraph color="black">
                        {subHeading}
                    </Paragraph>    
                </HeadingContainer>
                <FormContainer>
                    <InputContainer>
                        <StyledInput
                            success={isSubmitValueSuccess}
                            error={inputError}
                            placeholder={inputPlaceholder}
                            value={inputValue}
                            onChange={({ target }) => {
                                setinputValue(target.value)
                            }}
                        />
                        {isSubmitValueSuccess && <SuccessParagraph bold color="green">Success!</SuccessParagraph>}
                    </InputContainer>
                    <Button onClick={handleFormSubmit}>Submit</Button>
                </FormContainer>
                <StyledParagraph color="gray" onClick={handleClosePopUp}>No Thanks</StyledParagraph>
            </StyledModal>
        </>
    )
}

const StyledModal = styled(Modal)`
text-align: center;
`;

const HeadingContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-bottom: 10px;
align-items: center;
`;

const SuccessParagraph = styled(Paragraph)`
margin-left: 10px;

`;

const StyledInput = styled(Input)`
border-radius: 15px;
`;

const InputContainer = styled.div`
display: flex;
flex-direction: column;
flex: 1;
`;

const FormContainer = styled.div`
display: flex;
align-items: flex-start;
`;

const StyledParagraph = styled(Paragraph)`
margin-top: 20px;
display: inline-flex;
text-align: center;
cursor: pointer;
`;

export default SignUpPopup
