import React from "react";
import styled from "styled-components";
import CheckBox from "../ui/CheckBox";
import trashcan from "../image/trashcan.png";

const Wrapper = styled.div`
    padding : 16px;
    width : calc(100% - 32px);
    display : flex;
    flex-direction : column;
    align-items : flex-start;
    justify-content : center;
    border : 1px solid grey;
    border-radius : 8px;
    cursor : pointer;
    background : white;

    :hover {
        background : lightgrey;
    }
`;

const ChildWrapper = styled.div`
    width : 100%;
    display : flex;
    align-items : center;
    justify-content : space-between;
`;

// 오른쪽 구석으로 정렬
const CheckBtnWrapper = styled.div`
    
    display : flex;
    align-items : center;
    justify-content : flex-end;
    gap : 16px;

    margin : 0;
    padding : 0;
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

const TitleText = styled.p`
    margin : 0;
    font-size : 20px;
    font-weight : 500;
`;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DoneTodo = styled.p`
    margin : 0;
    text-decoration : line-through;
    font-size : 20px;
    font-weight : 500;
    color : grey;
`;

function TodoListItem(props){
    const {todo, onClick, onToggleDone, onDelOneTodo} = props;

    return(
        <Wrapper onClick = {onClick}>
            <ChildWrapper> 
                {todo.done 
                    ? <DoneTodo>{todo.title}</DoneTodo>
                    : <TitleText>{todo.title}</TitleText>
                }

                <CheckBtnWrapper>
                    <IconBox>
                        <CheckBox 
                            onClick = {(event) => {event.stopPropagation()}}
                            onChange = {() => onToggleDone(todo.id)}
                            checked = {todo.done}
                        />
                    </IconBox>
                    <IconBox>
                        <BtnImage
                            title = "삭제"
                            onClick = {(event) => {
                                event.stopPropagation(); // 아이템 클릭 이벤트 방지
                                onDelOneTodo(todo.id);
                            }}
                        >
                            <img 
                                src = {trashcan}
                                alt = "삭제" 
                                style = {{width:40, height:40}}
                            />
                        </BtnImage>
                    </IconBox>
                </CheckBtnWrapper>
            </ChildWrapper>
            
        </Wrapper>
    );
}

export default TodoListItem;