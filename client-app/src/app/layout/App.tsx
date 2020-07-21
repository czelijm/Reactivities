import React, {useState, useEffect, Fragment} from 'react';
import axios from  'axios';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import NavBar from '../../features/Nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

let serverAddress = 'http://localhost:5000/api/activities'; 

const App = () => {
  const [activities,setActivities] = useState<IActivity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<IActivity | null>(null);
  
  const handleSelectedActivity = (id:string) =>{
    setSelectedActivity(activities.filter(a=>a.id === id)[0]);
    setEditMode(false);
  };

    const [editMode, setEditMode] = useState(false);

    const handleOpenCreateForm = () =>{
      setSelectedActivity(null);
      setEditMode(true);
    }

    const handleCreateActivity=(activity:IActivity)=>{
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    };

    const handleEditActivity=(activity:IActivity)=>{
      setActivities([...activities.filter(a=>a.id!==activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    };

    const handleDeleteActivity=(id:string)=>{
      setActivities([...activities.filter(a=>a.id!==id)]);
      setSelectedActivity(null);
      // setEditMode(false);
    };

    useEffect(()=>{
      axios
      .get<IActivity[]>(serverAddress)
        .then((response)=>{
          let activities:IActivity[] = [];
          response.data.forEach(activity =>{
            activity.date = activity.date.split(".")[0];
            activities.push(activity);
          })
          // console.log(response.data);
          setActivities(activities);
        });
    }, []);

    return (
      <Fragment>
        {/* <header className="App-header"> */}
          {/*  <img src={logo} className="App-logo" alt="logo" /> */}
         <NavBar openCreateForm = {handleOpenCreateForm}/>
         <Container style={{marginTop:"7em"}}>
            <ActivityDashboard 
              activities={activities} 
              selectActivity={handleSelectedActivity}
              selectedActivity={selectedActivity}
              editMode = {editMode}
              setEditMode = {setEditMode}
              setSelectedActivity={setSelectedActivity}
              createActivity={handleCreateActivity}
              editActivity={handleEditActivity}
              deleteActivity={handleDeleteActivity}
            />
         </Container>

        {/* </header> */}
      </Fragment>
    );
}

export default App;
