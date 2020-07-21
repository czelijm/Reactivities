import React, {useState, ChangeEvent, FormEvent} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid'

interface IProp{
    setEditMode:(editMode: boolean)=>void;
    activity: IActivity|null;
    createActivity:(activity:IActivity)=>void;
    editActivity:(activity:IActivity)=>void;
}



export const ActivityForm: React.FC<IProp> = ({setEditMode, 
                                            activity: initialFormState,
                                            createActivity,
                                            editActivity
}) => {
    
    const initializeForm = () =>{
        if (initialFormState) {
            return initialFormState;
        }
        else{
            return{
                id: '',
                title: '',
                description: '',
                category: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    };


    const [activity,setActivity] = useState<IActivity>(initializeForm);

    const handleInputChanges = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name,value} = event.currentTarget;
        setActivity({...activity, [name]: value});
    };

    const handleSumit = () =>{
        if (activity.id.length===0) {
            let newActivity = {
                ...activity,
                id:uuid()
            }
            
            createActivity(newActivity);
        } else{
            editActivity(activity);
        }
        
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSumit}>
                <Form.Input onChange={handleInputChanges} placeholder="Title" name="title" value={activity.title}/>
                <Form.TextArea onChange={handleInputChanges} rows={2} placeholder="Description" name="description" value={activity.description}/>
                <Form.Input onChange={handleInputChanges} placeholder="Category" name="category" value={activity.category}/>
                <Form.Input onChange={handleInputChanges} type="datetime-local" placeholder="Date" name="date" value={activity.date}/>
                <Form.Input onChange={handleInputChanges} placeholder="City" name="city" value={activity.city}/>
                <Form.Input onChange={handleInputChanges} placeholder="Venue" name="venue" value={activity.venue}/>
                <Button floated="right" positive type="submit" content="Submit" />
                <Button onClick={() => setEditMode(false)} floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}
