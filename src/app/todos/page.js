"use client";

import {useEffect, useState} from "react";

export default function Todos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        getTodo()
            .then(todos => {
                setTodos(todos)
            })
    }, [])

    const getTodo = () => {
        return fetch("/api/todos")
            .then(response => response.json())
    }

    const postTodo = () => {
        fetch("/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: "New Todo",
                completed: false
            })
        })
            .then(response => response.json())
            .then(todo => {
                setTodos([...todos, todo])
            });
    }

    const handleAddButtonClick = event => {
        postTodo()
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1>Todo List</h1>
            </div>

            <div className=" ml-[50px] whitespace-nowrap overflow-auto h-[500px] w-[50%] mt-[100px] top-0">
                <table className="table-auto">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th colSpan={2}>Done</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (
                            todos.map(todo => {
                                return (
                                    <>
                                        <tr>
                                            <td>{todo.id}</td>
                                            <td>{todo.title}</td>
                                            <td>
                                                <input type="checkbox" checked={todo.completed}/>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        )
                    }
                    </tbody>
                </table>
            </div>

            <div>
                <p>
                    <button onClick={handleAddButtonClick}>Add Todos</button>
                </p>
            </div>
        </main>
    )
}