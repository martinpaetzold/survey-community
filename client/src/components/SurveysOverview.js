import React from "react";
import { Button, Card, CardDeck, Jumbotron, Container } from "react-bootstrap";

export default function SurveysOverview() {
    return (
        <Container>
            <Jumbotron>
                <h1>We wan&#39;t your opinion.</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat.
                </p>
            </Jumbotron>
            <CardDeck>
                <Card style={{ width: "36rem" }} href="/surveys/1">
                    <Card.Img variant="top" src="card_03.jpg" />
                    <Card.Body>
                        <Card.Title>Survey #1</Card.Title>
                        <Card.Text>
                            Ut wisi enim ad minim veniam, quis nostrud
                            exercitation ulliam corper suscipit lobortis nisl ut
                            aliquip ex ea commodo consequat.
                        </Card.Text>
                        <Button variant="primary" href="/surveys/1">
                            Start survey
                        </Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: "36rem" }}>
                    <Card.Img variant="top" src="card_05.jpg" />
                    <Card.Body>
                        <Card.Title>Survey #2</Card.Title>
                        <Card.Text>
                            Duis autem veleum iriure dolor in hendrerit in
                            vulputate velit esse molestie consequat, vel willum
                            lunombro dolore eu feugiat.
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
