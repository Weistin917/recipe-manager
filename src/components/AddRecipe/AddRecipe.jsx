import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebaseConfig";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FloatingLabel } from "react-bootstrap";

function AddRecipe() {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const handleAddRecipe = async (e) => {
        e.preventDefault();
        const file = e.target[2]?.files[0];
        try {
            if (file) {
                const storageRef = ref(storage, `recipes/${file.name}`);
                const uploadPromise = uploadBytes(storageRef, file);
                uploadPromise.then(() => getDownloadURL(storageRef).then(
                        async (imgUrl) => {
                            await addDoc(collection(db, "recipes"), {'title':name, 'imgUrl':imgUrl, 'description':desc});
                        }).catch((err) => console.error("Error getting url: ", err))
                ).catch((err) => console.error("Error uploading image: ", err));
            } else {
                await addDoc(collection(db, "recipes"), {'title':name, 'imgUrl':"", 'description':desc});
            }
            setName("");
            setDesc("");
        } catch (err) {
            console.error("Error adding recipe: ", err);
        }
    }

    return (
        <Form onSubmit={handleAddRecipe} className="form-floating">
            <div className="d-grid gap-3">
                <FloatingLabel label='Title*'>
                    <Form.Control type="text" placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} required />
                </FloatingLabel>
                <FloatingLabel label='Description*'>
                    <Form.Control as="textarea" rows={3} placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required />
                </FloatingLabel>
                <Form.Control type="file" accept="image/png, image/jpeg, image/jpg" />
                <Button type="submit" variant="info">Add Recipe</Button>
            </div>
        </Form>
    );
}

export default AddRecipe;