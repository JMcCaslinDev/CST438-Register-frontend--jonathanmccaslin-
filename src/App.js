import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import AddStudent from './components/AddStudent';
import Cookies from 'js-cookie';
import { SERVER_URL } from './constants.js';

function App() {
  const handleAddStudent = (student) => {
    const token = Cookies.get('XSRF-TOKEN');
    const queryParams = new URLSearchParams(student).toString();
    fetch(`${SERVER_URL}/student?${queryParams}`, {
      method: 'POST',
      headers: {
        'X-XSRF-TOKEN': token,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Student added successfully');
        } else {
          alert('Error: Failed to add student');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Course Registration
          </Typography>
        </Toolbar>
      </AppBar>
      <AddStudent addStudent={handleAddStudent} />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Semester} />
          <Route path="/schedule" component={SchedList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
