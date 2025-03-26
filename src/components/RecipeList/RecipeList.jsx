import React, { useState, useEffect } from "react";
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Stack, Card, Button } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    let n = 1;

    useEffect(() => {
        const colRef = collection(db, "recipes");
        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const recipeData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setRecipes(recipeData);
        });

        return () => unsubscribe();
    }, []);

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