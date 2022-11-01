import React, { useState } from 'react'

export default function Status({ title, completed, id }) {

    const [success, setSuccess] = useState(completed);

    return (
        <div>
            <h1>task: {title}</h1>
            <h2 className="flex">completed: {success ? <p className="text-green-600 pb-5" >&nbsp;Successful</p> : <button className="text-red-600 pb-5" onClick={() => { setSuccess(true) }}>&nbsp;Unsuccessful</button>}</h2>
        </div>
    )
}
