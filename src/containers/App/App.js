import React, { Component } from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import Home from '../../components/Home'
import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'
// import Chat from '../../components/Chat'
import UsersList from '../../components/UsersList'
import RedirectPage from '../../components/RedirectPage'
import { HOME, SIGN_IN, SIGN_UP, REDIRECT, CHAT, CHAT_LIST, USERS } from '../../constants/routes'
import { restoreUserLoginState } from '../../utils/user'
import ChatList from '../../containers/ChatContainer'
import './App.scss'
import PrivateRoute from '../../components/PrivatRoute';

const { Content, Footer } = Layout

const breadcrumbPathLinks = ['home', 'login']

class App extends Component {
  componentDidMount = () => {
    const { setUserInfo, clearUserInfo, getUsers } = this.props
    restoreUserLoginState({ setUserInfo, clearUserInfo })
    getUsers()
  }

  render () {
    const { userInfo } = this.props
    const isLoggedIn = Boolean(userInfo.id)

    return (
      <Layout className="layout">
        <Header {...this.props} />
        <Content className="layout__content">
          <Breadcrumbs links={breadcrumbPathLinks} />
          <Switch>
            <PrivateRoute path={HOME} component={Home} isLoggedIn={isLoggedIn} redirect={SIGN_IN} />
            <PrivateRoute path={USERS} component={UsersList} isLoggedIn={isLoggedIn} redirect={SIGN_IN} />
            <PrivateRoute path={SIGN_IN} component={SignIn} isLoggedIn={!isLoggedIn} redirect={HOME} />
            <PrivateRoute path={SIGN_UP} component={SignUp} isLoggedIn={!isLoggedIn} redirect={HOME} />
            <PrivateRoute path={CHAT} component={ChatList} isLoggedIn={isLoggedIn} redirect={SIGN_IN} />
            {/* <Route path={CHAT_LIST} component={ChatList} /> */}
            <Route path={REDIRECT} render={(props) => <RedirectPage {...props} />} />
            <Route render={() => <h2>404 not found!!! sorry</h2>} />
          </Switch>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    )
  }
}

export default App
