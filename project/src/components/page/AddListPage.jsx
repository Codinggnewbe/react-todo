import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";
import axios from "axios";

const Wrapper = styled.div`
    padding : 16px;
    width : calc(100% - 32px);
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
`;

const Container = styled.div`
    width : 100%;
    max-width : 720px;

    :not(:last-child){
        margin-bottom : 16px;
    }
`;

const ButtonWrapper = styled.div`
    width : 100%;
    display : flex;
    justify-content : space-between;
    gap : 16px;
    margin-top : 16px;
`;

const ServerIP = "localhost";

function AddListPage(props){
    const navigate = useNavigate();

    const [title, setTitle] = useState(''); // 제목
    const [content, setContent] = useState(''); // 세부내용

    const url = 'http://' + ServerIP + ':8000/api/v1/todos';
    const insertTodo = () =>
        axios.post(url, {
            id : null,
            title : title,
            content : content,
            specifics : []
        })
        .then((response) => {
            console.log("insertTodo() result " + response.data);
        })
        .catch((error) => {
            console.error(error);
        });

    return(
        <Wrapper>
            <Container>
                <TextInput
                    height = {20}
                    value = {title}
                    onChange = {(event) => {
                        setTitle(event.target.value);
                    }}
                />

                <TextInput 
                    height = {480}
                    value = {content}
                    onChange = {(event) => {
                        setContent(event.target.value);
                    }}
                />

                <ButtonWrapper>
                    <Button 
                        title = "할 일 작성하기"
                        width = "160px"
                        height = "44px"
                        onClick = {async () => {
                            try{
                                await insertTodo();
                                navigate("/");
                            }
                            catch(e){
                                console.error(e);
                                alert("저장 실패");
                            }
                        }}
                    />

                    <Button 
                        title = "뒤로 가기"
                        width = "160px"
                        height = "44px"
                        onClick = {() => {
                            navigate("/");
                        }}
                    />
                </ButtonWrapper>
            </Container>
        </Wrapper>
    );
}

export default AddListPage;