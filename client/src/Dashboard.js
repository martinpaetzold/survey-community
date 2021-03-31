import React from "react";
import { Button, Card, CardDeck, Jumbotron, Container } from "react-bootstrap";

export default function Dashboard() {
    return (
        <Container>
            <Jumbotron>
                <h1>Hello, world!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style
                    component for calling extra attention to featured content or
                    information.
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
            <CardDeck>
                <Card style={{ width: "36rem" }}>
                    <Card.Img
                        variant="top"
                        src="background_image_default.jpg"
                    />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the cards content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: "36rem" }}>
                    <Card.Img
                        variant="top"
                        src="background_image_default.jpg"
                    />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the cards content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </CardDeck>
            <CardDeck>
                <Card style={{ width: "18rem" }}>
                    <Card.Img
                        variant="top"
                        src="background_image_default.jpg"
                    />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the cards content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: "18rem" }}>
                    <Card.Img
                        variant="top"
                        src="background_image_default.jpg"
                    />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the cards content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: "18rem" }}>
                    <Card.Img
                        variant="top"
                        src="background_image_default.jpg"
                    />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the cards content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: "18rem" }}>
                    <Card.Img
                        variant="top"
                        src="background_image_default.jpg"
                    />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the cards content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </CardDeck>
        </Container>
    );
}
