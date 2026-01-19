import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    width : ${props => props.width || "auto"};
    height : ${props => props.height || "44px"};
    padding : 0 16px; /* 위 아래 패딩 제거 */
    box-sizing : border-box;

    /* 중앙정렬 안정화 작업 */
    display : inline-flex;
    align-items : center;
    justify-content : center;

    font-size : 16px;
    line-height : 1;

    border-width : 1px;
    border-radius : 8px;
    cursor : pointer;
`;

function Button(props){
    // props: title(텍스트), width/height(옵션), onClick
    const {title, width, height, children, onClick} = props;

    return (
        <StyledButton 
            title = {title} 
            width = {width} 
            height = {height} 
            onClick={onClick}
        >
            {children ?? title ?? "button"}
        </StyledButton>

    );
}

export default Button;