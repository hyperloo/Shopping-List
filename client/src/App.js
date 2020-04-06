import React from "react";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { Container, Button, Toast, ToastBody, ToastHeader } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/AuthActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  state = {
    show: false,
  };

  componentDidMount() {
    store.dispatch(loadUser());
  }

  toggle = () => this.setState({ show: !this.state.show });

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <div>
              <h6>Description of The App</h6>
              <Button color="primary" onClick={this.toggle}>
                Click this Button to See Info About the APP
              </Button>
              <br />
              <br />
              <Toast isOpen={this.state.show} style={{ maxWidth: "100%" }}>
                <ToastHeader toggle={this.toggle}>
                  This App is developed by Himanshu
                </ToastHeader>
                <ToastBody>
                  This App is a <b>MERN Stack App</b> using Redux which is a
                  basic APP.
                  <br />
                  This App uses <b>Axios</b> for queries, <b>Bcrypt</b> for
                  Hashing, "<b>JWT</b>" Web Tokens,
                  <b>MongoDB</b> as DB & <b>Mongoose</b> for DB interactions,{" "}
                  <b>Bootstrap</b> & <b>ReactStrap</b> for styling,{" "}
                  <b>React-Transition-Group</b> for Transitions, <b>Redux</b> &{" "}
                  <b>Redux-Thunk</b>.
                  <br />
                  This app has following features:
                  <br />
                  1. At homepage, any user can find all his entries.
                  <br />
                  2. The Display of Entries is shown in Latest First Entry
                  Order.
                  <br />
                  3. User can Add/ Delete i.e modify entries only if he is
                  logged in.
                  <br />
                  4. This app uses "JWT" authentication.
                  <br />
                  5. It has a login Pop-up Modal that is used to Register/
                  Login.
                  <br />
                  6. It show error in the modals like a. During registration, if
                  user already exists. b. Mandatory field Entries c. Login
                  Errors
                  <br />
                  7. It clear error from front end as soon as the modal is
                  closed or successful operation.
                  <br />
                  8. The modal has a toggle effect.
                  <br />
                  9. It also changes navbar on authentication changes.
                  <br />
                  <br />
                  <b>Note</b>: This app is a bit less responsiveness to the
                  screen as it was a learning app.
                  <br />
                  Explore more.....
                  <br />
                  <div class="content">
                    Portfolio ...
                    <a href="http://tekin2.tk" target="_blank">
                      {" "}
                      http://tekhin2.tk
                    </a>
                  </div>
                </ToastBody>
              </Toast>
            </div>
            <br />
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
