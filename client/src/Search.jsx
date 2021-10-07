import './search.css';
import Sidebar from './components/Sidebar/Sidebar'
import {gql, useQuery} from '@apollo/client';
import {useState} from 'react';

export default function Search() {
const [keyword, setKeyword] = useState('');
 

 const getAllQuery = gql`
 query Query {
  getAll {
    user {
      name
      profilepic
    }
    community {
      name
      description
      profilepic
    }
  }
}
`


const {data,loading} = useQuery(getAllQuery);

if(loading) return 'loading...';

const combinedData = [...data?.getAll?.user, ...data?.getAll?.community];

const newData = combinedData?.filter((data)=>{
  if(keyword == null)
      return data
  else if(data.name.toLowerCase().includes(keyword.toLowerCase())){
      return data
  }
})

console.log(newData);
    return (
        <div className="container">
            <Sidebar currentPage={"search"}/>
<div className="searchContainer">
<div className="searchIntro">
<h2>Søg efter en person eller community her</h2>

<input type="text" placeholder="Søg efter et forum eller en person.." className="searchInput" onChange={(e) => setKeyword(e.target.value)}/> 

</div>

<div className="search-items">
  
{newData.map(item => (
item.description == null ?
<a className="searchItem" href={`/profile/${item.name}`}> 
   <img src={item.profilepic} className="searchPic"/> 
  <p>{item.name}</p>  
</a>: 
<a className="searchItem" href={`/profile/${item.name}`}> 
   <img src={item.profilepic} className="searchPic"/> 
  <p>{item.name}</p>  
  <p>{item.description}</p>
</a>
))}

</div>
</div>
        </div>
    )
}
