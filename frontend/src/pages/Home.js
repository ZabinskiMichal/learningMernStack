import React, { useEffect } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from "../hooks/useAuthContext"

//components 
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm"

export default function Home() {

    const {workouts, dispatch} = useWorkoutsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        if(user){
            fetchWorkouts()
        }

    }, [dispatch, user]) //tablica powoduje ze funckja odpala sie tylko w przypadku pierwszego renderu 

    return(
        <div className="home">
            <div className="workours">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>

            <WorkoutForm />
    

        </div>


    )
}