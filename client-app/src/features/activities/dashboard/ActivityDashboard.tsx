import React, { SyntheticEvent } from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Interface } from 'readline'
import { IActivity } from '../../../app/models/activity'
import ActivityList from './ActivityList'
import { ActivityDetails } from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'
import { observer } from 'mobx-react-lite'


interface IProps{
    activities: IActivity[];
    selectActivity: (id:string) => void;
    selectedActivity: IActivity | null;
    editMode: boolean;
    setEditMode: (setActiviity:boolean) => void;
    setSelectedActivity:(Activity:(IActivity|null)) =>void;
    createActivity:(activity:IActivity)=>void;
    editActivity:(activity:IActivity)=>void;
    deleteActivity:(e:SyntheticEvent<HTMLButtonElement>, id:string)=>void;
    submitting:boolean;
    target:string;
} 

const ActivityDashboard: React.FC<IProps> = ({activities, 
                                            selectActivity, 
                                            selectedActivity, 
                                            editMode,
                                            setEditMode,
                                            setSelectedActivity,
                                            createActivity,
                                            editActivity,
                                            deleteActivity,
                                            submitting,
                                            target  

}) => {
    return(
    <Grid>
        <Grid.Column width={10}>
            <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting} target={target}></ActivityList>
        </Grid.Column>
        <Grid.Column width={6}>
            {selectedActivity && !editMode &&
            <ActivityDetails activity={selectedActivity} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity}/>}
            {editMode && <ActivityForm key={selectedActivity && selectedActivity.id || 0} setEditMode={setEditMode} activity={selectedActivity} createActivity={createActivity} editActivity={editActivity} submitting={submitting}/> }  
        </Grid.Column>
    </Grid>
    )
}

export default observer(ActivityDashboard)
