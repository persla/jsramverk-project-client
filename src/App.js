// import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
// import Me from './Me.js';
// import Reports from './reports.js';
// import ReportRev from './reportRev.js';
import Loginreg from './Register.js';
import Login from './Login.js';
import Admin from './logout.js';
import Account from './Account.js';
// import Chat from './Chat.js';
import BuySite from './Buy-site.js';
import SellSite from './Sell-site.js';
import Home from './Home.js';
// import PrivateRoute from './PrivateRoute';
import  {AuthContext}  from "./context/auth";
import React, { useState } from "react"
import './App.css';

function App(props) {
  const [authTokens, setAuthTokens] = useState();
  // console.log(authTokens);
  // console.log(setAuthTokens);


  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
    // console.log(data);

  }
  const isLoggedIn = authTokens;
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens  }}>

  <Router>


        <div className="App">
        <div className="lock">
        {isLoggedIn ?  <span  role="img">&#128275; Öppen</span> :  <span  role="img" >&#128272; Låst </span>}
        </div>
        <h1>Stock Market för Stockcars</h1>
        <input type="checkbox" id="menuShowHide"/>
          <label htmlFor="menuShowHide"></label>

          <ul id="mainMenu">
              <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
              {isLoggedIn ?
               <li><NavLink to="/Account" activeClassName="active" >Konto </NavLink></li>
               :
               <li><NavLink to="/Account" className="unactive" >Konto </NavLink></li>}

               {isLoggedIn ?
                <li><NavLink to="/BuySite" activeClassName="active" >Köp </NavLink></li>
                :
                <li><NavLink to="/BuySite" className="unactive" >Köp </NavLink></li>}

                {isLoggedIn ?
                 <li><NavLink to="/SellSite" activeClassName="active" >Sälj </NavLink></li>
                 :
                 <li><NavLink to="/SellSite" className="unactive" >Sälj </NavLink></li>}
              <li><NavLink to="/Register" activeClassName="active"><span className='info2'> Registrering</span><img alt="" src="https://img.icons8.com/ios-filled/22/000000/guest-male--v1.png"></img> </NavLink></li>
              <li><NavLink to="/Login" activeClassName="active"><span className='info2'> Logga in</span><img alt="" src="https://img.icons8.com/ios/22/000000/login-rounded-right.png"></img></NavLink></li>
              <li><NavLink to="/logout" activeClassName="active"><span className='info2'> Logga ut</span><img alt="" src="https://img.icons8.com/ios/22/000000/logout-rounded-left.png"></img></NavLink></li>


            </ul>

          <Route exact path="/" component={Home} />

          <Route path="/Register" component={Loginreg} />
           {/* <Route path="/reportRev/:id" component={ReportRev} />*/}
          <Route path="/Login" component={Login} />
          <Route path="/logout" component={Admin} />

          {isLoggedIn ? <Route path="/Account" component={Account} /> : false}
           {isLoggedIn ? <Route path="/BuySite" component={BuySite} /> : false}
           {isLoggedIn ? <Route path="/SellSite" component={SellSite} /> : false}

          <footer>Lars Persson 2019</footer>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

// class App extends Component {

//   render() {

//     return (
//       <AuthContext.Provider value={false}>
//       <Router>
//         <div className="App">
//         <h1>Me-app</h1>
//           <nav>
//             <ul>
//               <li><Link to="/">Me</Link></li>
//               <li><Link to="/reports">Rapporter</Link></li>
//               <li><Link to="/Register">Registrering</Link></li>
//               <li><Link to="/Login">Inloggning</Link></li>
//             </ul>
//           </nav>
//           <Route exact path="/" component={Me} />
//           {/* <Route path="/reports" component={Reports} /> */}
//           <PrivateRoute path="/reports" component={Reports} />
//           <Route path="/Register" component={Loginreg} />
//           <Route path="/Login" component={Login} />
//           <footer>Lars Persson 2019</footer>
//         </div>
//       </Router>
//       </AuthContext.Provider>
//     );
//   }
// }

// export default App;
