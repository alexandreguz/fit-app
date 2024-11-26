import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";

export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];

    private runnigExercise: Exercise;
    private exercises: Exercise[] = []

    getAvailableExercises() {
        return this.availableExercises.slice()
    };

    startExercise(selectedId: string) {
        this.runnigExercise = this.availableExercises.find(exer => exer.id === selectedId)
        console.log(this.runnigExercise)
        this.exerciseChanged.next({...this.runnigExercise})
    };

    completeExercise() {
        this.exercises.push({...this.runnigExercise, date: new Date(), state: "completed"});
        this.runnigExercise = null;
        this.exerciseChanged.next(null)
    }

    cancelExercise(progress: number) {
        this.exercises.push({...this.runnigExercise, 
                            duration: this.runnigExercise.duration * (progress / 100),
                            calories: this.runnigExercise.calories * (progress / 100),
                            date: new Date(), 
                            state: "canceled"});
        this.runnigExercise = null;
        this.exerciseChanged.next(null)
    }

    getRunningExercise() {
        return ({...this.runnigExercise})
    }
}