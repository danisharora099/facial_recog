import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Upload from './Upload';
import Home from './Home'

const App = () => {
  
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home}  />
                <Route path='/addUser' exact comonent={Upload} />
           </Switch>
        </Router>
    )

}
export default App;