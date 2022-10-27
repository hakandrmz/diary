import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import NavigationBar from "./components/screens/NavigationBar";
import DiaryForm from "./components/screens/DiaryForm";

const App = () => {
    return (
        <Router>
            <div className="app">
                <NavigationBar/>
                <Switch>
                    <PrivateRoute exact path="/diaryform" component={DiaryForm}/>
                    <PrivateRoute exact path="/" component={PrivateScreen}/>
                    <Route exact path="/login" component={LoginScreen}/>
                    <Route exact path="/register" component={RegisterScreen}/>
                    <Route
                        exact
                        path="/forgotpassword"
                        component={ForgotPasswordScreen}
                    />
                    <Route
                        exact
                        path="/resetpassword/:resetToken"
                        component={ResetPasswordScreen}
                    />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
