import { useState } from "react";
import Todos from "../../models/TodosModel";
import Link from "next/link";
import axios from "axios";

function TodoId({ todo }) {
  const [data, setData] = useState(JSON.parse(todo));

  const updateHandler = async () => {
    const res = await axios.put(`/api/todos/${data?._id}`, {
      title: data.title + " updated again and again",
    });
    setData(res.data);
  };

  return (
    <div>
      <p>{data?.title}</p>
      <p>{data?.description}</p>
      <Link href="/">home</Link>
      <button onClick={updateHandler}>update</button>
    </div>
  );
}

export default TodoId;

export async function getServerSideProps({ params }) {
  const todo = await Todos.findById(params.todoId);
  return {
    props: {
      todo: JSON.stringify(todo),
    },
  };
}
