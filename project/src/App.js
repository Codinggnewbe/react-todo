import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import styled from "styled-components";

// Pages
import MainPage from "./components/page/MainPage";
import AddListPage from "./components/page/AddListPage";
import DetailListPage from "./components/page/DetailListPage";
import EditListPage from "./components/page/EditListPage";

const MainTitleText = styled.h1`
  font-size : 24px;
  font-weight : bold;
  text-align : center;
`;

function App(props){
  return(
    <BrowserRouter>
      <MainTitleText>민수의 할 일 블로그</MainTitleText>
      <Routes>
        <Route index element = {<MainPage />} />
        <Route path = "todo-write" element = {<AddListPage />} />
        <Route path = "todo/:todoId" element = {<DetailListPage />} />
        <Route path = "todo/:todoId/edit" element = {<EditListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;