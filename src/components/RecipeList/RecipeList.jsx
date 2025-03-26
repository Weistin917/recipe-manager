import React, { useState, useEffect } from "react";
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Stack, Card, Button, FloatingLabel, Form } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDesc, setEditDesc] = useState("");
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

    function handdleEdit(recipe) {
        setEditingRecipe(recipe.id);
        setEditTitle(recipe.title);
        setEditDesc(recipe.description);
    }

    function handleCancel() {
        setEditingRecipe(null);
    }

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
                        {editingRecipe === recipe.id ? (
                            <>
                            <div className="d-flex gap-2 mb-2">
                                <FloatingLabel label='Title'>
                                    <Form.Control type="text" placeholder="Title" value={editTitle} required />
                                </FloatingLabel>
                                <FloatingLabel label='Description'>
                                    <Form.Control as="textarea" placeholder="Description" value={editDesc} required />
                                </FloatingLabel>
                                <FloatingLabel label='Image'>
                                    <Form.Control type="file" placeholder="Image" accept="image/png, image/jpeg" />
                                </FloatingLabel>
                                <Button variant="icon">
                                    <i class="bi bi-save" />
                                </Button>
                                <Button variant="icon" onClick={() => handleCancel()}>
                                    <i class="bi bi-x-circle-fill" />
                                </Button>
                            </div>
                            </>
                        ) : (
                            <>
                            <Card.Title>{recipe.title}</Card.Title>
                            <Card.Text>{recipe.description}</Card.Text>
                            <div className="d-flex mb-2 justify-content-between">
                                {recipe.imgUrl ? (<img className="recipeImg" src={recipe.imgUrl} alt="Recipe image" />) : (<div></div>)}
                                <div className="d-flex gap-2 mb-2 justify-content-between list-icons">
                                    <Button variant="icon" onClick={() => handdleEdit(recipe)}>
                                        <i class="bi bi-pencil-square" />
                                    </Button>
                                    <Button variant="icon">
                                        <i class="bi bi-trash"/>
                                    </Button>
                                </div>
                            </div>
                            </>
                        )}
                    </Card.Body>
                </Card>
            ))}
        </Stack>
        </>
    );
}

export default RecipeList;