import React from "react";
import styled from "styled-components";
import trashcan from "../image/trashcan.png";

const Wrapper = styled.div`
    padding : 16px;
    width : calc(100% - 32px);
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
    border : 1px solid grey;
    border-radius : 8px;
    cursor : pointer;
    background : white;

    :hover {
        background : lightgrey;
    }
`;

const BtnImage = styled.button`
    padding : 0;
    border : none;
    background : transparent;
    box-shadow : none;
    outline : none;
    cursor : pointer;

    display : inline-flex;
    align-items : center;
    justify-content : center;

    line-height : 0;
`;

const ContextText = styled.p`
    font-size : 16px;
    font-weight : pre-wrap;
`;

const ChildWrapper = styled.div`
    width : 100%;
    display : flex;
    align-items : center;
    justify-content : space-between;
`;

function SpecificListItem(props){
    const {specific, onDelOneSpecific} = props;

    return(
        <Wrapper>
            <ChildWrapper>
                <ContextText>{specific.content}</ContextText>
                <BtnImage
                    title = "삭제"
                    onClick = {(event) => {
                        event.stopPropagation();
                        onDelOneSpecific(specific.id);
                    }}
                >
                    <img 
                        src = {trashcan}
                        alt = "삭제" 
                        style = {{width:40, height:40}}
                    />
                </BtnImage>
            </ChildWrapper>
        </Wrapper>
    );
}

export default SpecificListItem;