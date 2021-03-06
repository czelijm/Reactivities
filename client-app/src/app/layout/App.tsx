import React, {useState, useEffect, Fragment, SyntheticEvent, useContext} from 'react';
import axios from  'axios';
import { Header, Icon, List, Container } from 'semantic-ui-react'
import { IActivity } from '../models/activity';
import NavBar from '../../features/Nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';
import  ActivityStore  from '../stores/activityStore';
import {observer} from 'mobx-react-lite'; 

let serverAddress = 'http://localhost:5000/api/activities'; 

const App = () => {
  const activityStore = useContext(ActivityStore);

  const [activities,setActivities] = useState<IActivity[]>([]);
  const [selectedActivity,setSelectedActivity] = useState<IActivity | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const handleSelectedActivity = (id:string) =>{
    setSelectedActivity(activities.filter(a=>a.id === id)[0]);
    setEditMode(false);
  };

    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [target, setTarget] = useState  (''); 

    const handleOpenCreateForm = () =>{
      setSelectedActivity(null);
      setEditMode(true);
    }

    const handleCreateActivity=(activity:IActivity)=>{
      setSubmitting(true);
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      }).then(()=>setSubmitting(false));

    };

    const handleEditActivity=(activity:IActivity)=>{
      setSubmitting(true);
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(a=>a.id!==activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      }).then(()=>setSubmitting(false));
    };

    const handleDeleteActivity=(event: SyntheticEvent<HTMLButtonElement>,id:string)=>{
      setSubmitting(true);
      setTarget(event.currentTarget.name);
      agent.Activities.delete(id).then(()=>{
        setActivities([...activities.filter(a=>a.id!==id)]);
        setSelectedActivity(null);
        // setEditMode(false);
      }).then(()=>setSubmitting(false));
    };

    useEffect(()=>{
      activityStore.loadActivities();
    }, [activityStore]);

    if(activityStore.loadingInitial) return <LoadingComponent content='Loading activities...' />

    return (
      <Fragment>
        {/* <header className="App-header"> */}
          {/*  <img src={logo} className="App-logo" alt="logo" /> */}
         <NavBar openCreateForm = {handleOpenCreateForm}/>
         <Container style={{marginTop:"7em"}}>
            <ActivityDashboard 
              activities={activityStore.activities} 
              selectActivity={handleSelectedActivity}
              selectedActivity={selectedActivity}
              editMode = {editMode}
              setEditMode = {setEditMode}
              setSelectedActivity={setSelectedActivity}
              createActivity={handleCreateActivity}
              editActivity={handleEditActivity}
              deleteActivity={handleDeleteActivity}
              submitting={submitting}
              target = {target} 
            />
         </Container>

        {/* </header> */}
      </Fragment>
    );
}

export default observer(App);
