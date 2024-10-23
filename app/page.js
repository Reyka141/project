import { Container } from "react-bootstrap";
import Header from "./header";
import Body from "./body";

export default function Home() {
  return (
    <Container>
      <Header />
      <Body/>
    </Container>
  );
}
