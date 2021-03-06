import 'whatwg-fetch';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import store from './core/store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ErrorPage from './pages/error/error';
import HomePage from './pages/home/home.page';
import WeddingPage from './pages/wedding/wedding.page';
import DashboardPage from './pages/dashboard/dashboard';
import TimelinePage from './pages/timeline/timeline.page';
import Tasks from './pages/tasks/tasks.page';
import Theme from './theme/theme';
import { secured } from './components/SecuredComponent';
import styles from './styles/main.css';

const cx = classNames.bind(styles);

injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node,
    ]),
  };

  static childContextTypes = {
    reflexbox: React.PropTypes.object,
  };

  getChildContext = () => ({
    reflexbox: {
      degug: true,
      breakpoints: {
        sm: '(min-width: 320px)',
        md: '(min-width: 768px)',
        lg: '(min-width: 1024px)',
      },
    },
  });

  render() {
    return (
      <MuiThemeProvider muiTheme={Theme}>
        <Provider store={store}>
          <div className={cx('root')}>{this.props.children}</div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="/home" component={HomePage} />
      <Route path="/dashboard" component={secured(DashboardPage)} />
      <Route path="/timeline" component={secured(TimelinePage)} />
      <Route path="/wedding" component={secured(WeddingPage)} />
      <Route path="/tasks" component={secured(Tasks)} />
      <Route path="*" component={ErrorPage} />
    </Route>
  </Router>,
  document.getElementById('container')
);
