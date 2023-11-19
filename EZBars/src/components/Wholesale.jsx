import React from 'react'
import axios from "axios";
import  {useEffect, useState} from 'react'
import { useNavigate} from "react-router-dom"
import {Formik, Form, Field, ErrorMessage} from "formik";
import { close } from '../assets'
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


const Wholesale = () => {

  const [listOfItems, setListOfItems] = useState([]);
    const [newItemSupplier, setNewItemSupplier] = useState("")
    let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/products").then((response) => {
        setListOfItems(response.data);
    });
  }, []);


  const initialValues = {
    itemsupplier: "",
    itemname: "",
    itemdescription: "",
    itemprice: "",
}
const validationSchema = Yup.object().shape({
    itemsupplier:Yup.string().required(),
    itemname:Yup.string().required(),
    itemdescription:Yup.string().required(),
    itemprice:Yup.string().required(),

})

const onSubmit = (data) => {
    axios.post("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/products", data, newItemSupplier).then((response) => {
    const itemToAdd = {newItemSupplier}
    setListOfItems([...listOfItems, itemToAdd])
    window.location.reload(false)
});
};

const deleteItem = (id) => {
  axios.delete(`http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/products/${id}`).then(()=>{
    
  })
}

const editItem = (option,id) => {
  if (option === "itemsupplier"){
    let newItemSupplier = prompt("Enter new Supplier: ")
    axios.put("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/products/itemsupplier",{newItemSupplier : newItemSupplier, id : id})
    window.location.reload(false)
  }else if (option === "itemname"){
    let newItemName = prompt("Enter new Item Name: ")
    axios.put("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/products/itemname",{newItemName : newItemName, id : id})
    window.location.reload(false)
  }
  else if (option === "itemdescription"){
    let newItemDescription = prompt("Enter new Item Description: ")
    axios.put("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/products/itemdescription",{newItemDescription : newItemDescription, id : id})
    window.location.reload(false)
  }else{
    let newItemPrice = prompt("Enter new Item Price: ")
    axios.put("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/products/itemprice",{newItemPrice : newItemPrice, id : id})
    window.location.reload(false)
  }
}
const [isShown, setIsShown] = useState(false);

const handleClick = event => {
  setIsShown(current => !current);
};



  return (
    <div>
      <Card>
    <Title><button onClick={handleClick}>Add Item</button></Title>
    {isShown && <Box />}
    <Table className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Item Supplier</TableHeaderCell>
          <TableHeaderCell>Item Name</TableHeaderCell>
          <TableHeaderCell>Item Description</TableHeaderCell>
          <TableHeaderCell>Item Price</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {listOfItems.map((value, key) => (
          <TableRow key={value.itemname}>
            <TableCell className="itemsupplier" onClick={() => {editItem("itemsupplier",value.id)}}>{value.itemsupplier}
            </TableCell>
            <TableCell className="itemname"onClick={() => {editItem("itemname",value.id)}}>
              <Text >{value.itemname}</Text>
            </TableCell>
            <TableCell className="itemdescription"onClick={() => {editItem("itemdescription",value.id)}}>
              <Text>{value.itemdescription}</Text>
            </TableCell>
            <TableCell className="itemprice"onClick={() => {editItem("itemprice",value.id)}}>
              <Text>{value.itemprice}</Text>
            </TableCell>
            <TableCell>
            <button onClick={() => {deleteItem(value.id);window.location.reload(false)}}><img src={close}/></button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Card> 
    </div> 
  )
  function Box(){
    return (
      <div  >
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} onChange={ (event) =>{setNewItemSupplier(event.target.value)}}>
              <Form>
              <Field id="inputCreateitemsupplier" name="itemsupplier" placeholder="itemsupplier" />
              <Field id="inputCreateitemname" name="itemname" placeholder="itemname"/>
              <Field id="inputCreateitemdescription" name="itemdescription" placeholder="itemdescription"/>
              <Field id="inputCreateitemprice" name="itemprice" placeholder="itemprice"/>
              <button type="submit" >Submit</button>
              </Form>
              </Formik>
          </div>
    );
  }
}

export default Wholesale