import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './componants/Card'

const App = () => {

  const[userData,setUserData]=useState([]);

  const [index, setIndex] = useState(1)
   const totalPages = 100;

  const getData=async()=>{
    const response=await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
    setUserData(response.data)
  }
  useEffect(function(){
      getData();
  },[index])
  let printUserData=<h3 className='text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading...</h3>
  if(userData.length>0){
    printUserData=userData.map(function(elem,idx){
      return (
        <div key={idx}>
       <Card elem={elem}></Card>
      </div>
      )
    })
  }
  return (
    <div className='bg-black overflow-auto h-screen p-4 text-white'>
   
    <div className='flex h-[82%] flex-wrap gap-4 p-2'>{printUserData}</div>

    <div className='flex justify-center gap-6 items-center'>
      <button
      style={{opacity: index===1 ? 0.6:1,
        pointerEvents: index ===1 ? 'none' : 'auto',
      }}
      className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'
      onClick={()=>{
        if(index>1){
          setIndex(index-1)
          setUserData([])
        }
      }
      }
      >
      Prev
      </button>
      <h4>Page {index}</h4>
      <button 
      style={{
            opacity: index === totalPages ? 0.6 : 1,
            pointerEvents: index === totalPages ? 'none' : 'auto',
          }}
      className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'
      onClick={()=>{
        if (index < totalPages) {
              setIndex(index + 1);
              setUserData([]);
            }
      }
      }
      >
      Next
      </button>
    </div>
    </div>
  )
}

export default App