import axios from "axios"
import React,{ useState,useEffect }  from "react";
import style from "./Todos.module.css"

const Todos = () => {

    const [limit, setLimit] = useState(5)
    const [page,setPage]=React.useState(1);
    const [query,setQuery]=React.useState("");
    const [totalCount,setTotalCount]=React.useState(0);
    const [todos,setTodos]=React.useState([]);

  const setData=()=>{
    axios.post(`http://localhost:2000/todo`,
  {
    value:query,
    isCompleted:false
  }).then((r)=>{
    setTodos([...todos,r.data]);
    console.log(r.data);

  })
  }

    useEffect(()=>{
       axios.get(`http://localhost:2000/todo?_page=${page}&_limit=${limit}`).then((r)=>{
        //  console.log(r);
          setTodos(r.data);
          setTotalCount(Number(r.headers["x-total-count"]));
        });
    },[page,limit])


  return (
    <div className={style.App}>
      <input className={style.input} type="text" placeholder="Enter Todos...." value={query} onChange={({target})=>setQuery(target.value)}></input>
      <button className={style.save} onClick={setData}>save</button>
   <hr />
<br />
<br />
  <div className={style.box}>
  <button className={style.pre} disabled={page<=1}  onClick={()=>{
      
      setPage(page-1)
    
  }}
  >{`<`}</button>
 <select onChange={(e)=>setLimit(Number(e.target.value))} className={style.select}>
   <option value={"5"}>5</option>
   <option value={"10"}>10</option>
   <option value={"15"}>15</option>
   <option value={"20"}>20</option>
 </select>
  <button className={style.next} disabled={totalCount<=page*limit} onClick={()=>setPage(page+1)}>{">"}</button>
  {todos.map((todo)=>
  (
    
    <div key={todo.id} >
      {todo.id}{` : `}{todo.value}
    </div>

  ))}
    
  </div>
    </div>
  )
}

export default Todos