// List of added recipes. For each item, allows editing and deleting of the corresponding recipe.
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebaseConfig";
import { Stack, Card, Button, FloatingLabel, Form } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

function RecipeList() {
    /* React states
     * recipes: stores the added recipes in Firestore
     * editingRecipe: stores the current editing recipe
     * editTitle, editDesc, editImg: stores the new entered values when editing
     * */
    const [recipes, setRecipes] = useState([]);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [editImg, setEditImg] = useState(null);
    // Recipe number counter
    let n = 1;

    // Constantly obtain the stored data in Firestore
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

    // Function called to start editing a recipe
    function handdleEdit(recipe) {
        setEditingRecipe(recipe.id);
        setEditTitle(recipe.title);
        setEditDesc(recipe.description);
    }

    // Function called to cancel the edit process
    function handleCancel() {
        setEditingRecipe(null);
    }

    // Function called when the editing is finished. 
    const handleSave = async (recipe) => {
        try {
            const imgUrl = recipe.imgUrl;
            const recipeRef = doc(db, "recipes", recipe.id);
            // Checks if a new file for the image has been selected to upload it to firebase storage.
            if (editImg) { 
                const storageRef = ref(storage, `recipes/${editImg.name}`);
                const uploadPromise = uploadBytes(storageRef, editImg);
                uploadPromise.then(() => getDownloadURL(storageRef).then(
                        async (url) => {
                            // If there was an image, delete it from firebase storage
                            if (imgUrl) await deleteObject(ref(storage, imgUrl));
                            await updateDoc(recipeRef, { title: editTitle, description: editDesc, imgUrl: url});
                        }).catch((err) => console.error("Error getting url: ", err))
                ).catch((err) => console.error("Error uploading image: ", err));
            } else {
                await updateDoc(recipeRef, { title: editTitle, description: editDesc, imgUrl: imgUrl});
            }
            setEditingRecipe(null);
        } catch (err) {
            console.error("Error updating recipe: ", err);
        }
    }

    // Function called to delete a recipe.
    const handleDelete = async (recipe) => {
        try {
            await deleteDoc(doc(db, "recipes", recipe.id));
            // If there was an image, delete it from firebase storage
            if (recipe.imgUrl) await deleteObject(ref(storage, recipe.imgUrl));
        } catch (err) {
            console.error("Error deleting recipe: ", err);
        }
    };

    return (
        <>
        {/* style for icon buttons */}
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
            {/* Render a card for each recipe in the list */
            recipes.map((recipe) => (
                <Card>
                    <Card.Header>Recipe #{n++}</Card.Header>
                    <Card.Body>
                        {/* Checks to wheter render the editing state or the view state */}
                        {editingRecipe === recipe.id ? (
                            <>
                            <div className="d-flex gap-2 mb-2">
                                <FloatingLabel label='Title'>
                                    <Form.Control type="text" placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
                                </FloatingLabel>
                                <FloatingLabel label='Description'>
                                    <Form.Control as="textarea" placeholder="Description" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} required />
                                </FloatingLabel>
                                <FloatingLabel label='Image'>
                                    <Form.Control type="file" placeholder="Image" accept="image/png, image/jpeg, image/jpg" onChange={(e) => setEditImg(e.target.files[0])} />
                                </FloatingLabel>
                                <Button variant="icon" onClick={() => handleSave(recipe)}>
                                    <i className="bi bi-save" />
                                </Button>
                                <Button variant="icon" onClick={() => handleCancel()}>
                                    <i className="bi bi-x-circle-fill" />
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
                                        <i className="bi bi-pencil-square" />
                                    </Button>
                                    <Button variant="icon" onClick={() => handleDelete(recipe)}>
                                        <i className="bi bi-trash"/>
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