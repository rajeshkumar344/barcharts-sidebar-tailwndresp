import React from 'react'
import { myData } from '../assets/Data'

export default function Sort() {
    const [data,setData] = React.useState(myData)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [sortField, setSortField] = React.useState("title")
    const [sortBy, setSortBy] = React.useState("ascending")
    const [result, setResults] = React.useState()
    console.log(data)
    
    const handlechange = (e)=>{
        const results = myData.filter((post)=>{
            console.log("myyy",post)
            if (e.target.value === "") return myData ;
           else return post["title"].toLowerCase().includes(e.target.value.toLowerCase())
         
        })

        setResults(results)
        setSearchTerm(e.target.value)
        setData(sortFunc(results,sortBy,sortField))
      

    }

    const sortFunc = (result,sortby,sortfield) => {
        if (sortby === "ascending"){
            result.sort((a,b)=>a[sortfield]<b[sortfield] ? -1 : 1)
        }
       else if (sortby === "descending"){
            result.sort((a,b)=>a[sortfield]<b[sortfield] ? 1 : -1)
        }
        return result
    }

    const changeSortField=(field)=>{
        setSortField(field)
        setSearchTerm(searchTerm)
        setData(!result? sortFunc(myData,sortBy,field) :sortFunc(result,sortBy,field) )
    }

    const changeSortType=(type)=>{
        setSortBy(type)
        setSearchTerm(searchTerm)
        setData(!result? sortFunc(myData, type,sortField) :sortFunc(result,type,sortField) )
    }

  return (
    <div >
    <form>
        <div className='header'>
        <div className=''>
       <input className='input' type='search'placeholder='search' 
       onChange={handlechange}/>
       </div>
        
     <div className='sort'>
        <span>Sort Field</span>
       <select name='field' onChange={(e)=>changeSortField(e.target.value)}>
       
        <option value="title"> none</option>
        <option value="title">title</option>
        <option value="description">description</option>
       </select>
       </div> 
         
     <div className='sort'>
         <span>Sort By</span>
       <select name='sortby' onChange={(e)=>changeSortType(e.target.value)}>
        <option value="ascending"> none</option>
        <option value="ascending">ascending</option>
        <option value="descending">descending</option>
       </select>
       </div>

       </div>
</form>
        <div>
            {data.map(function(i){
                // if(i.title.toLowerCase().includes(searchTerm.toLowerCase()))
            return(
                <div className='card' >
                    <span>{i.title}</span>
                    <p>{i.description}</p>

                </div>
                )
            })}
            {data.length === 0 && <h2>Empty List !!!</h2>}
 
        </div>
    </div>
  )
}
