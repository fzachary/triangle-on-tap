import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import Nav from "./components/Nav";
import Breweries from './pages/Breweries';
import Detail from "./pages/Detail";
import MyProfile from "./pages/Auth/MyProfile";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';
import Start from './pages/Start';
import Favorites from './pages/Favorites/Favorites';

class App extends Component {
  
  constructor() {
    super();
    
		this.state = {
			loggedIn: false,
			user: null
    };
  }
  
	componentDidMount() {
		AUTH.getUser().then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	logout = (event) => {
    event.preventDefault();
    
		AUTH.logout().then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
      console.log(response);
      if (response.status === 200) {
        // update the state
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      }
    });
	}

	render() {
		return (
			<div className="App">
				{ this.state.loggedIn && (
				<div>
					<Nav user={this.state.user} logout={this.logout}/>
					<div className="main-view">
					<Switch>
						<Route exact path="/" component={() => <Breweries user={this.state.user}/>} />
						<Route exact path="/breweries" component={() => <Breweries user={this.state.user}/>} />
						<Route exact path="/breweries/:id" component={Detail} />
						<Route exact path="/myprofile" component={() => <MyProfile user={this.state.user}/>} />
						<Route exact path="/favorites" component={() => <Favorites user={this.state.user}/>} />
						<Route component={NoMatch} />
					</Switch>
					</div>
				</div>
				)}
				{ !this.state.loggedIn && (
				<div>
					<Switch>
					<Route exact path="/" component={() => <Start/>} />
					<Route exact path="/login" component={() => <LoginForm login={this.login} />} />
					<Route exact path="/breweries" component={() => <LoginForm user={this.login}/>} />
					<Route exact path="/signup" component={SignupForm} />
					<Route exact path="/myprofile" component={() => <LoginForm user={this.login} />} />
					<Route exact path="/favorites" component={() => <LoginForm user={this.login} />} />
					</Switch>
					
				</div>
				)}
			</div>
		)
	}
}

export default App;
