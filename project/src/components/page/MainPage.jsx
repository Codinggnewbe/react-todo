import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import TodoList from "../list/TodoList";
import Button from "../ui/Button";
import axios from "axios";

const Wrapper = styled.div`
    padding : 16px;            /* 안쪽 여백 */
    width : calc(100% - 32px); /* 화면 꽉 차 보이게 하되 스크롤은 안생기도록 */
    display : flex;            /* flex 컨테이너로 만듦 */
    flex-direction : column;   /* 자식 요소들을 위에서 아래로 쌓음 */
    align-items : center;      /* 가로 정렬 기준, 내부 요소들이 수평 중앙에 모임 */
    justify-content : center;  /* 세로 정렬 기준, 자식들이 가운데에 모임 */
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

function MainPage(props){
    const {} = props;

    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [fetched, setFetched] = useState(true);
    const url = "http://" + ServerIP + ":8000/api/v1/todos";

    useEffect(() => {
        axios.get(url)
          .then(response => setTodos(response.data))
          .catch(err => console.log(err));
    }, [fetched]);

    function onToggleDone(todoId){
        setTodos(
            todos.map((todo) => {
                return(
                    todo.id === todoId
                    ? {...todo, done : !todo.done} // ...todo 가 done 외의 나머지 것들 그대로 쓴다는 의미
                    : todo
                );
            })
        );
        
        axios.patch("http://" + ServerIP + ":8000/api/v1/todos/" + todoId + "/done")
          .catch(err => console.log(err));
    }

    // 모든 할 일 삭제 함수
    function deleteAllTodos(){
        axios.delete(url)
          .then(() => {
            setTodos([]);
          })
          .catch(err => console.log(err));
    }

    // 체크된 할 일들만 삭제
    function deleteCheckTodos(){
        axios.delete(url + "/done")
          .then(() => {
            axios.get(url)
              .then(response => setTodos(response.data))
              .catch(err => console.log(err));
          })
    }

    // 휴지통 버튼을 통해 하나의 할 일만 삭제
    function onDelOneTodo(todoId){
        axios.delete(`${url}/${todoId}`)
          .then(() => {
            axios.get(url)
              .then(response => setTodos(response.data))
              .catch(err => console.log(err))
          })
    }

    return(
        <Wrapper>
            <Container>
                <Button 
                    title = "할 일 작성하기"
                    onClick = {() => {
                        navigate("/todo-write");
                    }}
                />

                <TodoList 
                    todos = {todos}
                    onClickItem = {(item) => {
                        navigate(`/todo/${item.id}`);
                    }}
                    onToggleDone = {onToggleDone}
                    onDelOneTodo = {onDelOneTodo}

                />

                <ButtonWrapper>
                    <Button 
                        title = "선택한 일정 삭제하기"
                        onClick = {deleteCheckTodos}
                    />
                    <Button 
                        title = "모든 일정 삭제하기"
                        onClick = {deleteAllTodos}
                    />
                </ButtonWrapper>
            </Container>
        </Wrapper>
    );
}

export default MainPage;