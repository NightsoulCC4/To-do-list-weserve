import { useState, useEffect } from 'react';
import Status from './components/status';
import axios from 'axios';

export default function Home() {

  const [user, setUser] = useState([]);
  const [todolist, setTodolist] = useState([]);
  const [inputUser, setInputUser] = useState("Your username.");

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((result) => {
          // console.log(result);
          setUser(result.data);
          // console.log("user", user, "conditionss", !user);
        });
      await axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((result) => {
          // console.log(result);
          setTodolist(result.data);
          // console.log("todolist", todolist, "condition", !todolist)
        });
    };

    if (user.length === 0 && todolist.length === 0) getData();
    /* else
      console.log(
        "user",
        user,
        "conditionss",
        !user,
        "todolist",
        todolist,
        "condition",
        !todolist
      ); */
  }, [user, todolist]);

  let userElements;

  if (!(user.length === 0)) {
    userElements = user.map((element, index) => {
      const { id, name, username } = element;

      let todolistElements = [], todolistAfterFlitered = []

      if (!(todolist.length === 0))
        todolistElements = todolist.filter((element) => {
          return (element.userId = id)
        }
        )

      if (!(todolistElements.lenght === 0))
        todolistAfterFlitered = todolistElements.map((value, index) => {
          const { title, completed, id } = value
          // console.log(completed)

          /* const clearedTask = () => {
            todolistElements[index].completed = true;
            console.log(todolistElements[index].completed)
          } */

          return (<Status key={index} title={title} completed={completed} id={id} />)
        })

      return (
        <div key={index} className="mx-20 py-10">
          <h1 className="">username: {username}</h1>
          <h2>name: {name}</h2>
          {!(todolistAfterFlitered.length === 0) ? todolistAfterFlitered : <></>}
        </div>
      );
    });
  }

  return (
    <div className="bg-slate-800 text-white ">
      <h1 className="mx-16 pt-6 text-2xl">To do lists</h1>
      <input type="text" placeholder={inputUser} className="mx-16 text-2xl mt-5 text-black" onChange={(e) => setInputUser(e.target.value)} />
      {!(user.length === 0) ? userElements : <></>}
    </div>
  )
}
