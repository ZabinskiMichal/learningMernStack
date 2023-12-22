const express = require('express')

const {
    createWorkout,
    getWorkout,
    getWorkouts,
    updateWorkout,
    deleteWorkout

} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router() 

router.use(requireAuth) // dzieki temu wszystkie routy z tego pliku wymagaja podania poprawnego tokenu 

//GET all workouts
router.get('/', getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a new workout
router.delete('/:id', deleteWorkout)

//UPDATE a new workout
router.patch('/:id', updateWorkout)

module.exports = router