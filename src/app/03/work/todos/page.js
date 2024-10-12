"use client";

import {useState} from "react";

export default function Todos() {
    const [data, setData] = useState(0)

    const handleAddButtonClick = event => {
        alert("hello world " + data)
        const latestData = data + 1
        setData(latestData)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1>Todo List</h1>
            </div>

            <div>
                <p>
                    <button onClick={handleAddButtonClick}>Add Todos</button>
                </p>
            </div>
        </main>
    )
}
