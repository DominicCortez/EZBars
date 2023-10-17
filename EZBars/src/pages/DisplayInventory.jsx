import React from 'react'
import {  NavbarMain } from '../components'
import axios from "axios";
import  {useEffect, useState} from 'react'
import { useNavigate} from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";



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
        <NavbarMain/>

<Card>
    <Title>List of Sales</Title>
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Item Category</TableHeaderCell>
          <TableHeaderCell>Item Name</TableHeaderCell>
          <TableHeaderCell>Item Description</TableHeaderCell>
          <TableHeaderCell>Item Number</TableHeaderCell>
          <TableHeaderCell>Item Quantity</TableHeaderCell>
          <TableHeaderCell>Item Price</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {listOfItems.map((value, key) => (
          <TableRow key={value.itemname}>
            <TableCell className="itemcategory" onClick={() => {editItem("itemcategory",value.id)}}>{value.itemcategory}
            </TableCell>
            <TableCell className="itemname"onClick={() => {editItem("itemname",value.id)}}>
              <Text >{value.itemname}</Text>
            </TableCell>
            <TableCell className="itemdescription"onClick={() => {editItem("itemdescription",value.id)}}>
              <Text>{value.itemdescription}</Text>
            </TableCell>
            <TableCell className="itemnumber"onClick={() => {editItem("itemnumber",value.id)}}>
              <Text>{value.itemnumber}</Text>
            </TableCell>
            <TableCell className="itemquantity"onClick={() => {editItem("itemquantity",value.id)}}>
              <Text>{value.itemquantity}</Text>
            </TableCell>
            <TableCell className="itemprice"onClick={() => {editItem("itemprice",value.id)}}>
              <Text>{value.itemprice}</Text>
            </TableCell>
            <TableCell>
            <button onClick={() => {deleteItem(value.id);alert("Successfully deleted, Please Reflresh the Page");window.location.reload(false)}}className='bg-gray-500'>Delete</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card>
        
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