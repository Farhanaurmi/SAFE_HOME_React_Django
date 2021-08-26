import { Container } from "react-bootstrap";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screen/HomeScreen";
import ProfileScreen from "./screen/ProfileScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import ApartmentEditScreen from "./screen/ApartmentEditScreen";
import ApartmentScreen from "./screen/ApartmentScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />

          <Route path="/apartment/:id/edit" component={ApartmentEditScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/apartment/:id/view" component={ApartmentScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
