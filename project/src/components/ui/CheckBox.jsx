import React from "react";
import styled from "styled-components";

const StyledCheckBox = styled.input`
    /* 크기 조절 */
    transform: scale(1.4);   
    cursor: pointer;

    margin : 0;
`;

function CheckBox(props){
    const {checked, onClick, onChange} = props;

    return (
        <StyledCheckBox
            type = "checkbox"
            checked = {checked}
            onClick = {onClick}
            onChange = {onChange}
        />
    );
}

export default CheckBox; 