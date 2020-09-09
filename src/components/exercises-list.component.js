import React, { Component } from 'react';
import Axios from 'axios';
import Exercise from './Exercise';


export default class ExercisesList extends Component {
    state = {
        exercises: [],
        s: ""
    };

    componentDidMount() {
        Axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise = (id) => {
        Axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data));
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList = () => {
        return this.state.exercises.map(current => {
            if (this.state.s === current.username) {
                return <Exercise exercise={current} deleteExercise={this.deleteExercise} key={current._id} />

            }
            if (this.state.s === "") {
                return <Exercise exercise={current} deleteExercise={this.deleteExercise} key={current._id} />

            }
        })
    }
    submission = (e) => {
        e.preventDefault();
    }
    changed = (e) => {
        this.setState({
            s: e.target.value
        })
    }





    render() {
        return (
            <div>
                <h2>LOGGED EXERCISES</h2>
                <hr></hr>
                <form onSubmit={this.submission}>
                    <label style={{ margin: "20px" }}>Search User  :</label>
                    <input type="text" onChange={this.changed} style={{ marginLeft: "20px" }}></input>
                </form>
                <table className="table" style={{ marginTop: "30px" }}>
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div >
        )
    }
}