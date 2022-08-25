import "./App.scss";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Detail from "./pages/detail/Detail";
import React, { Suspense } from "react";

const CatalogLazy = React.lazy(() => import("./pages/Catalog"));

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="movies-app" />} />

        <Route path="movies-app">
          <Route index element={<Home />} />
          <Route path=":category">
            <Route
              index
              element={
                <Suspense fallback="Loading....">
                  <CatalogLazy />
                </Suspense>
              }
            />
            <Route path=":id" element={<Detail />} />
            <Route path="search/:keyword" element={<Catalog />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
