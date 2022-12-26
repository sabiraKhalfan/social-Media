import React from 'react'
import './DropDown.css'
import  {deletePost} from '../../Api/PostRequest';
import { useSelector } from 'react-redux'
import { FaEllipsisH} from 'react-icons/fa';
const { useState, useEffect } = React;



const data = [{_id: 0, label: "Edit"}, {_id: 1, label: "Delete"}];

const Dropdown = ({id}) => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  const {posts} = useSelector((state)=>state.postReducer)

  const toggleDropdown = () => setOpen(!isOpen);
  
  const handleItemClick=async(e) => {
    if(e == 0){
    console.log('selected edit',e)
    
    }else{
      console.log(id,"postId")
      console.log('selected delete',e)

      await deletePost(id);


    
    }
  }

  return (
    <div className='dropdown'>
      <div className='dropdown-header' >
      <FaEllipsisH className='icon' style={{}} onClick={toggleDropdown}/>
       
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {items.map(item => (
          <div className="dropdown-item" onClick={e => handleItemClick(e.target.id)} id={item._id}>
            <span className={`dropdown-item-dot ${item._id == selectedItem && 'selected'}`}>• </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Dropdown;