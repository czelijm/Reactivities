import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from  'axios';
import { Header, Icon, List } from 'semantic-ui-react'


class App extends Component{
  state = {
    values: []
  };

  serverAddress = 'http://localhost:5000/values'; 

  componentDidMount(){
    axios.get(this.serverAddress)
      .then((response)=>{
        // console.log(response.data);
        this.setState({
          values: response.data
        })
      });
    
  }
  render(){
    return (
      <div>
        {/* <header className="App-header"> */}
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <Header as='h2'>
            <Icon name='users' />
            <Header.Content>Reactivities</Header.Content>
         </Header>
         <List>
            {
              this.state.values.map((value:any)=>(
                <List.Item key={value.id}>{value.name}</List.Item>
              ))
            }
         </List>
        {/* </header> */}
      </div>
    );
  }
}

export default App;
