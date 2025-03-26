import React, { useState } from "react";
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { Stack, Card, Button } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

function RecipeList() {
    let recipes = [{ id:1, title:"Bread", description:"A bread", imgUrl:"https://ichef.bbc.co.uk/ace/standard/1600/food/recipes/paul_hollywoods_crusty_83536_16x9.jpg.webp" }];
    let n = 1;

    return (
        <>
        <style type="text/css">
            {`
            .btn-icon {
            background-color: transparent;
            border-radius: 100%;
            }

            .btn-icon:hover {
            background-color:rgb(219, 219, 219);
            }
            `}
        </style>
        <Stack gap={3}>
            {recipes.map((recipe) => (
                <Card>
                    <Card.Header>Recipe #{n++}</Card.Header>
                    <Card.Body>
                        <Card.Title>{recipe.title}</Card.Title>
                        <Card.Text>{recipe.description}</Card.Text>
                        <div className="d-flex mb-2 justify-content-between">
                            {recipe.imgUrl ? (<img className="recipeImg" src={recipe.imgUrl} alt="Recipe image" />) : (<div></div>)}
                            <div className="d-flex gap-2 mb-2 justify-content-between list-icons">
                                <Button variant="icon">
                                    <i class="bi bi-pencil-square" />
                                </Button>
                                <Button variant="icon">
                                    <i class="bi bi-trash"/>
                                </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </Stack>
        </>
    );
}

export default RecipeList;