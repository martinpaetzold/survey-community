import React from "react";
import { Button, Card, CardDeck, Jumbotron, Container } from "react-bootstrap";

export default function SurveysOverview() {
    return (
        <Container>
            <Jumbotron>
                <h1>We wan&#39;t your opinion.</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style
                    component for calling extra attention to featured content or
                    information.
                </p>
            </Jumbotron>
            <CardDeck>
                <Card style={{ width: "36rem" }} href="/surveys/1">
                    <Card.Img
                        variant="top"
                        src="background_image_default.jpg"
                    />
                    <Card.Body>
                        <Card.Title>Survey #1</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the cards content.
                        </Card.Text>
                        <Button variant="primary" href="/surveys/1">
                            Start survey
                        </Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: "36rem" }}>
                    <Card.Img
                        variant="top"
                        src="background_image_default.jpg"
                    />
                    <Card.Body>
                        <Card.Title>Survey #2</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the cards content.
                        </Card.Text>
                        <Button variant="primary" href="/surveys/2">
                            Start survey
                        </Button>
                    </Card.Body>
                </Card>
            </CardDeck>
        </Container>
    );
}
