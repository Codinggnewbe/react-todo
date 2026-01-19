// 세부 내용

import React from "react";
import styled from "styled-components";
import SpecificListItem from "./SpecificListItem";

// 꾸미기 스타일
const Wrapper = styled.div`
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    justify-content : center;

    :not(:last-child){
        margin-bottom : 16px;
    }
`;

function SpecificList(props){
    const {specifics, onDelOneSpecific} = props;

    return(
        <Wrapper>
            {specifics.map((specific) => {
                return(
                    <SpecificListItem 
                        key = {specific.id}
                        specific = {specific}
                        onDelOneSpecific = {() => {
                            onDelOneSpecific(specific.id);
                        }}
                    />
                );
            })}
        </Wrapper>
    );
}

export default SpecificList;