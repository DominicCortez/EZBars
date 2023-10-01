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
}
const validationSchema = Yup.object().shape({
    itemcategory:Yup.string().required(),
    itemname:Yup.string().required(),
    itemdescription:Yup.string().required(),
    itemnumber:Yup.string().required(),
    itemquantity:Yup.string().required(),

})

const onSubmit = (data) => {
    axios.post("http://localhost:3001/inventory", data, newItemCategory).then((response) => {
    const itemToAdd = {newItemCategory}
    setListOfItems([...listOfItems, itemToAdd])
});
};


  return (
    <div>
        <Navbar/>
        {listOfItems.map ((value, key)=> {
          return <div className="general">
            <div className="itemcategory">{value.itemcategory}</div>
            <div className="itemname">{value.itemname}</div>
            <div className="itemdescription">{value.itemdescription}</div>
            <div className="itemnumber">{value.itemnumber}</div>
            <div className="itemquantity">{value.itemquantity}</div>
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
            <button type="submit"onClick={() => alert('Item Added Please refresh the page')} >Submit</button>
            </Form>
            </Formik>
        </div>
    </div>
  )
}

export default DisplayInventory