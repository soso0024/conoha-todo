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
                    <tr>
                        <td>1</td>
                        <td><input type="text" value="課題"/></td>
                        <td>
                            <input type="checkbox"/>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><input type="text" value="買い物"/></td>
                        <td>
                            <input type="checkbox" checked={true}/>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><input type="text" value="洗濯"/></td>
                        <td>
                            <input type="checkbox" checked={false}/>
                        </td>
                    </tr>
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
