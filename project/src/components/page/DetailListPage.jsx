// 할 일에 대한 자세한 정보를 보고 싶을 때

import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import SpecificList from "../list/SpecificList";
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

const ButtonWrapper = styled.div`
    width : 100%;
    display : flex;
    justify-content : space-between;
    gap : 16px;
    margin-top : 16px;
`;

const Container = styled.div`
    width : 100%;
    max-width : 720px;

    :not(:last-child){
        margin-bottom : 16px;
    }
`;

const TodoContainer = styled.div`
    padding : 8px, 16px;
    border : 1px solid grey;
    border-radius : 8px;
`;

const TitleText = styled.p`
    text-align : center;
    font-size : 28px;
    font-weight : 500;
`;

const ContentText = styled.p`
    text-align : center;
    font-size : 20px;
    line-height : 32px;
    white-space : pre-wrap;
`;

const SpecificLabel = styled.p`
    font-size : 16px;
    font-weight : 500;
`;

const ServerIP = "localhost";

function DetailListPage(props){
    const navigate = useNavigate();
    const {todoId} = useParams();

    const [todo, setTodo] = useState({});
    const [specifics, setSpecifics] = useState([]);
    const [fetched, setFetched] = useState(true);
    const url = `http://${ServerIP}:8000/api/v1/todos/${todoId}`;

    useEffect(() => {
        axios.get(url)
          .then((response) => {
            setTodo(response.data);
            setSpecifics(response.data.specifics);
        })
          .catch(err => console.log(err));
    }, [fetched]);

    function onDelOneSpecific(specificId){
        axios.delete(`${url}/specifics/${specificId}`)
          .then(() => {
            axios.get(`${url}`)
              .then(response => setSpecifics(response.data.specifics))
              .catch(err => console.log(err))
        })
    }

    const [specific, setSpecific] = useState('');
    const insertSpecific = () =>
        axios.post(url, {
            id : todo.id,
            title : todo.title,
            content : todo.content,
            specifics : [
                {
                    id : null,
                    content : specific
                }
            ]
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

    return(
        <Wrapper>
            <Container>
                <TodoContainer>
                    <TitleText>{todo.title}</TitleText>
                    <ContentText>{todo.content}</ContentText>
                </TodoContainer>

                <SpecificLabel>세부내용</SpecificLabel>
                <SpecificList 
                    specifics = {specifics}
                    onDelOneSpecific = {onDelOneSpecific}
                />

                <TextInput 
                    height = {40}
                    value = {specific}
                    onChange = {(event) => {
                        setSpecific(event.target.value);
                    }}
                />
                <Button 
                    title = "수정하기"
                    onClick = {() => {
                            navigate(`/todo/${todoId}/edit`);
                     }}
                />
                <ButtonWrapper>
                    <Button 
                        title = "세부내용 추가 작성하기"
                        onClick = {async () => {
                            try{
                                await insertSpecific();
                                setSpecific(""); // 입력창 비우기
                                setFetched(prev => !prev);
                            }
                            catch(e){
                                console.error(e);
                                alert("추가 실패");
                            }
                        }}
                    />


                    <Button 
                        title = "뒤로가기"
                        onClick = {() => {
                            navigate('/');
                        }}
                    />
                </ButtonWrapper>
            </Container>
        </Wrapper>
    );
}

export default DetailListPage;