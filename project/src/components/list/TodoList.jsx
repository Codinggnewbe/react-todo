import { useState } from "react";
import styled from "styled-components";
import TodoListItem from "./TodoListItem";

const Wrapper = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;

    :not(:last-child){
        margin-bottom : 16px;
    }
`;

function TodoList(props){
    const {todos, onClickItem, onToggleDone, onDelOneTodo} = props;

    return(
        <Wrapper>
            {todos.map((todo) => {
                return(
                    <TodoListItem
                        key = {todo.id}
                        todo = {todo}
                        onClick = {() => {
                            onClickItem(todo);
                        }}
                        onToggleDone = {() => {
                            onToggleDone(todo.id);
                        }}
                        onDelOneTodo = {() => {
                            onDelOneTodo(todo.id);
                        }}
                    />
                );
            })}
        </Wrapper>
    );
}

export default TodoList;