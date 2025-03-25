import React from "react";
import { Stack, Card } from "react-bootstrap";

function RecipeList() {
    return (
        <Stack gap={3}>
            <Card>
                <Card.Header>Recipe #1</Card.Header>
                <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Card.Text>Description</Card.Text>
                    <div className="d-flex mb-2 justify-content-between">
                        <img src="#" alt="Recipe image" />
                        <div className="d-flex gap-2 mb-2 justify-content-between">
                            <h6>Edit icon</h6>
                            <h6>Delete icon</h6>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Stack>
    );
}

export default RecipeList;