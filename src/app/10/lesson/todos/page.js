"use client";

import {Fragment, useEffect, useState} from "react";

export default function Todos() {
    const [todos, setTodos] = useState([])

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

    const putTodo = (todo) => {
        fetch(`/api/todos`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        })
            .then(response => response.json())
            .then(updatedTodo => {
                const newTodos = todos.map(t => t.id === updatedTodo.id ? updatedTodo : t);
                setTodos(newTodos);
            });
    }

    const handleAddButtonClick = event => {
        postTodo()
    }

    const handleCheckboxChange = todoId => {
        const newTodos = [];
        for (const todo of todos) {
            if (todo.id === todoId) {
                todo.completed = !todo.completed;
            }
            newTodos.push(todo);
        }
        setTodos(newTodos);
    }

    const handleInputChange = (id, event) => {
        let value = event.target.value
        let newTodos = []

        for (const todo of todos) {
            if (todo.id === id) {
                todo.title = value;
                putTodo(todo); // サーバーに更新を送信
            }
            newTodos.push(todo);
        }

        setTodos(newTodos);
    }

    const todoRows = [];
    for (const todo of todos) {
        todoRows.push(
            <Fragment key={todo.id}>
                <tr>
                    <td>{todo.id}</td>
                    <td><input type="text" value={todo.title} onChange={(event) => handleInputChange(todo.id, event)}/></td>
                    <td>
                        <input type="checkbox" onChange={() => handleCheckboxChange(todo.id)} checked={todo.completed}/>
                    </td>
                </tr>
            </Fragment>
        );
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
                    {todoRows}
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
