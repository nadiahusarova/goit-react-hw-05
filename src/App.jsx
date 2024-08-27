import { useState } from "react";
import { lazy, Suspense } from "react";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviePage";
import MovieDetailsPage from "./pages/MoviDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Navigation from "./components/Navigation/Navigation";
import s from "./App.module.css";;

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/movies" component={MoviesPage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;
