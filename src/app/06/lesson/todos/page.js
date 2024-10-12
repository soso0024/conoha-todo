"use client";

import {Fragment, useState} from "react";

export default function Todos() {
    const [todos, setTodos] = useState([
        {id: 1, title: "課題", completed: false},
        {id: 2, title: "買い物", completed: true},
        {id: 3, title: "洗濯", completed: false},
    ]);

    const handleAddButtonClick = event => {
        let nextId = todos.length + 1
        todos.push({id: nextId, title: "", completed: false})
        setTodos([...todos])
    }

    const handleCheckboxChange = todoId => {
        const newTodos = todos.map(todo => {
            if (todo.id === todoId) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(newTodos);
    }

    const todoRows = [];
    for (const todo of todos) {
        todoRows.push(
            <Fragment key={todo.id}>
                <tr>
                    <td>{todo.id}</td>
                    <td><input type="text" value={todo.title}/></td>
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
