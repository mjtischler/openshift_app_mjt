import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { authenticate, logout, getData } from './store/actions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  login = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onAuthenticate } = this.props;
    onAuthenticate({ username, password });
  };

  logoutAndClearInputs = () => {
    const { logout } = this.props;

    this.setState({
      username: '',
      password: ''
    }, () => {
      logout();
    });
  }

  render() {
    const {
      username,
      password
    } = this.state;
    const isEnabled = username.length > 0 && password.length > 0;
    const {
      isAuthenticated,
      token,
      getData,
      data,
      authErr,
      dataErr
    } = this.props;

    return (
      <div className="App">
        <p>
          You are
          <b>
            {isAuthenticated ? ' logged in' : ' not logged in'}
          </b>
        </p>
        {!isAuthenticated ? (
          <div className="LoginForm">
            <form onSubmit={this.login}>
              <p>
                <b>Login:</b>
              </p>
              <p>
                <input
                  type="text"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </p>
              <p>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </p>
              <button type="submit" disabled={!isEnabled}>Login</button>
            </form>
            {authErr && (
              <p>
                {`Authentication error: ${authErr}`}
              </p>
            )}
          </div>
        )
          : (
            <div>
              <p>
                <button type="button" onClick={() => getData(token)}>Get Data</button>
              </p>
              <p>
                <button type="button" onClick={() => this.logoutAndClearInputs()}>Logout</button>
              </p>
              {dataErr && (
                <p>
                  {`Data error: ${dataErr}`}
                </p>
              )}
              {data && (
                <p>
                  {`Data status: ${data}`}
                </p>
              )}
            </div>
          )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAuthenticate: (loginInfo) => {
    dispatch(authenticate(loginInfo));
  },
  logout: () => {
    dispatch(logout());
  },
  getData: (token) => {
    dispatch(getData(token));
  }
});

const mapStateToProps = (state) => ({
  isAuthenticated: state.authenticationReducer.isAuthenticated,
  token: state.authenticationReducer.token,
  authErr: state.authenticationReducer.err,
  data: state.dataReducer.data,
  dataErr: state.dataReducer.err
});

App.defaultProps = {
  token: '',
  data: '',
  authErr: null,
  dataErr: null,
  isAuthenticated: false
};

App.propTypes = {
  onAuthenticate: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  token: PropTypes.string,
  data: PropTypes.string,
  getData: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  authErr: PropTypes.string,
  dataErr: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
