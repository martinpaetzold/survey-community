import React from "react";
import { Button, Card, CardDeck, Jumbotron, Container } from "react-bootstrap";

export default function Dashboard() {
    return (
        <Container>
            <Jumbotron>
                <h1>Welcome back!</h1>
                <p>
                    Ut wisi enim ad minim veniam, quis nostrud exercitation
                    ulliam corper suscipit lobortis nisl ut aliquip ex ea
                    commodo consequat.
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
            <CardDeck>
                <Card style={{ width: "36rem" }}>
                    <Card.Img variant="top" src="card_01.jpg" />
                    <Card.Body>
                        <Card.Title>Ex ea commodo consequat</Card.Title>
                        <Card.Text>Ut wisi enim ad minim veniam.</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: "36rem" }}>
                    <Card.Img variant="top" src="card_02.jpg" />
                    <Card.Body>
                        <Card.Title>Lobortis nisl ut</Card.Title>
                        <Card.Text>
                            Quis nostrud exercitation ulliam corper suscipit
                            lobortis nisl ut.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </CardDeck>
            <CardDeck>
                <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="card_03.jpg" />
                    <Card.Body>
                        <Card.Text>
                            Aliquip ex ea commodo consequat. Duis autem veleum
                            iriure dolor in.
                        </Card.Text>
                        <Button variant="primary">Go!</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="card_04.jpg" />
                    <Card.Body>
                        <Card.Text>
                            Blandit praesent luptatum zzril delenit augue duis
                            dolore te feugait nulla facilisi.
                        </Card.Text>
                        <Button variant="primary">Go!</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="card_05.jpg" />
                    <Card.Body>
                        <Card.Text>
                            Vel willum lunombro dolore eu feugiat nulla
                            facilisis at vero eros et accumsan et.
                        </Card.Text>
                        <Button variant="primary">Go!</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="card_06.jpg" />
                    <Card.Body>
                        <Card.Text>
                            Duis autem veleum iriure dolor in hendrerit in
                            vulputate velit esse molestie consequat.
                        </Card.Text>
                        <Button variant="primary">Go!</Button>
                    </Card.Body>
                </Card>
            </CardDeck>
        </Container>
    );
}
