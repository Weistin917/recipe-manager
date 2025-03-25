import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from "react-bootstrap";

function AddRecipe() {
    return (
        <div className="d-grid gap-3 form">
            <Form.Control type="text" placeholder="Title*" required />
            <Form.Control as="textarea" rows={3} placeholder="Description*" required />
            <Button type="submit" variant="info">Add Recipe</Button>
        </div>
    );
}

export default AddRecipe;