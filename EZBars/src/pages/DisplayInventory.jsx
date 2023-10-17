import React from 'react'
import { Navbar } from '../components'
import axios from "axios";
import  {useEffect, useState} from 'react'
import { useNavigate} from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

const DisplayInventory = () => {
    const [listOfItems, setListOfItems] = useState([]);
    const [newItemCategory, setNewItemCategory] = useState("")
    let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/inventory").then((response) => {
        setListOfItems(response.data);
    });
  }, []);


  const initialValues = {
    itemcategory: "",
    itemname: "",
    itemdescription: "",
    itemnumber: "",
    itemquantity: "",
    itemprice: "",
}
const validationSchema = Yup.object().shape({
    itemcategory:Yup.string().required(),
    itemname:Yup.string().required(),
    itemdescription:Yup.string().required(),
    itemnumber:Yup.string().required(),
    itemquantity:Yup.string().required(),
    itemprice:Yup.string().required(),

})

const onSubmit = (data) => {
    axios.post("http://localhost:3001/inventory", data, newItemCategory).then((response) => {
    const itemToAdd = {newItemCategory}
    setListOfItems([...listOfItems, itemToAdd])
    window.location.reload(false)
});
};

const deleteItem = (id) => {
  axios.delete(`http://localhost:3001/inventory/${id}`).then(()=>{
    
  })
}

const editItem = (option,id) => {
  if (option === "itemcategory"){
    let newItemCategory = prompt("Enter new Category: ")
    axios.put("http://localhost:3001/inventory/itemcategory",{newItemCategory : newItemCategory, id : id})
  }else if (option === "itemname"){
    let newItemName = prompt("Enter new Item Name: ")
    axios.put("http://localhost:3001/inventory/itemname",{newItemName : newItemName, id : id})
  }
  else if (option === "itemdescription"){
    let newItemDescription = prompt("Enter new Item Description: ")
    axios.put("http://localhost:3001/inventory/itemdescription",{newItemDescription : newItemDescription, id : id})
  }
  else if (option === "itemnumber"){
    let newItemNumber = prompt("Enter new ItemNumber: ")
    axios.put("http://localhost:3001/inventory/itemnumber",{newItemNumber : newItemNumber, id : id})
  }else if(option === "itemquantity"){
    let newItemQuantity = prompt("Enter new Item Quantity: ")
    axios.put("http://localhost:3001/inventory/itemquantity",{newItemQuantity : newItemQuantity, id : id})
  }else{
    let newItemPrice = prompt("Enter new Item Price: ")
    axios.put("http://localhost:3001/inventory/itemprice",{newItemPrice : newItemPrice, id : id})
  }
}

  return (
    <div>
        <Navbar/>
        {listOfItems.map ((value, key)=> {
          return <div className="general">
            <div className="itemcategory" onClick={() => {editItem("itemcategory",value.id)}}>{value.itemcategory}</div>
            <div className="itemname"onClick={() => {editItem("itemname",value.id)}}>{value.itemname}</div>
            <div className="itemdescription"onClick={() => {editItem("itemdescription",value.id)}}>{value.itemdescription}</div>
            <div className="itemnumber"onClick={() => {editItem("itemnumber",value.id)}}>{value.itemnumber}</div>
            <div className="itemquantity"onClick={() => {editItem("itemquantity",value.id)}}>{value.itemquantity}</div>
            <div className="itemprice"onClick={() => {editItem("itemprice",value.id)}}>{value.itemprice}</div>
            <button onClick={() => {deleteItem(value.id);alert("Successfully deleted, Please Reflresh the Page");window.location.reload(false)}}className='bg-gray-500'>Delete</button>
            </div>
        })}
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} onChange={ (event) =>{setNewItemCategory(event.target.value)}}>
            <Form>
            <Field id="inputCreateitemcategory" name="itemcategory" placeholder="itemcategory" />
            <Field id="inputCreateitemname" name="itemname" placeholder="itemname"/>
            <Field id="inputCreateitemdescription" name="itemdescription" placeholder="itemdescription"/>
            <Field id="inputCreateitemnumber" name="itemnumber" placeholder="itemnumber"/>
            <Field id="inputCreateitemquantity" name="itemquantity" placeholder="itemquantity"/>
            <Field id="inputCreateitemprice" name="itemprice" placeholder="itemprice"/>
            <button type="submit"onClick={() => alert('Item Added Please refresh the page')} >Submit</button>
            </Form>
            </Formik>
        </div>
    </div>
  )
}

export default DisplayInventory