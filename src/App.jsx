import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import AddRecipe from './components/AddRecipe/AddRecipe';
import RecipeList from './components/RecipeList/RecipeList';

function App() {

  return (
    <Container>
      <Row className='appRow'>
        <h3>Firestore Recipe Manager</h3>
      </Row>
      <Row className='appRow'>
        <AddRecipe />
      </Row>
      <Row className='appRow'>
        <RecipeList />
      </Row>
    </Container>
  )
}

export default App
