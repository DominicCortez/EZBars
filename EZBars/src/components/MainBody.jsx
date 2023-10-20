import React from 'react'
import { Card, Metric, Text, Title, BarChart, Subtitle, LineChart, List, ListItem } from "@tremor/react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import  {useEffect, useState} from 'react'

 {/* Line Graph Data*/} 
const linedata = [
  {
    year: 1970,
    "Inventory": 2.04,
    "Sales": 1.53,
  },
  {
    year: 1971,
    "Inventory": 1.96,
    "Sales": 1.58,
  },
  {
    year: 1972,
    "Inventory": 1.96,
    "Sales": 1.61,
  },
  {
    year: 1973,
    "Inventory": 1.93,
    "Sales": 1.61,
  },
  {
    year: 1974,
    "Inventory": 1.88,
    "Sales": 1.67,
  },
  //...
];

 {/* Items Data */} 
const chartdata = [
  {
    name: "Week New",
    "Sales": 2488,
  },
  {
    name: "Week Old",
    "Sales": 1445,
  },
  {
    name: "Day New",
    "Sales": 743,
  },
  {
    name: "Day Old",
    "Sales": 743,
  },
];

const valueFormatter = (number) => `P ${new Intl.NumberFormat("us").format(number).toString()}`;

 {/*Start of Site Body */} 
const MainBody = () => {

  const navigate = useNavigate();

  const navigateToInventory = () => {
    navigate('/inventory');
  };

const navigateSales = () => {
    navigate('/sales');
  };

  const [recentlyAddedItems, setRecentlyAddedItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/inventory/latestitems").then((response) => {
        setRecentlyAddedItems(response.data)
    });
  }, []);


  return (
    <div className='flex'>
      <div className="w-1/4 p-4 ml-4 mt-4">
        <div className='h-1/2 p-4' >
      <Card className="max-w-xs mx-auto h-1/2 p-4" decoration="top" decorationColor="orange" onClick={navigateToInventory}>
        <Text>Inventory</Text>
        <Metric>$ 34,743</Metric>
      </Card>
      </div>
      <div className='h-1/2 p-4' >
      <Card className="max-w-xs mx-auto p-4 h-1/2" decoration="top" decorationColor="orange" onClick={navigateSales}>
        <Text>Sales</Text>
        <Metric>$ 34,743</Metric>
      </Card>
      </div>
      </div>

      
      <div className="w-1/2 p-4 h-1/2 ml-4 mt-4">

      <div className='pt-4 pl-4'>
      <Card>
        <Title>Weekly Daily Sales</Title>
        <Subtitle>
          Comparisons
        </Subtitle>
        <BarChart
          className="mt-6"
          data={chartdata}
          index="name"
          categories={["Sales"]}
          colors={["blue"]}
          valueFormatter={valueFormatter}
          yAxisWidth={48}
        />
      </Card>
      </div>

      <div className='p-4'>
      <Card>
        <Title>Comparison of Sales and Inventory</Title>
        <LineChart
          className="mt-6"
          data={linedata}
          index="year"
          categories={["Inventory", "Sales"]}
          colors={["emerald", "gray"]}
          valueFormatter={valueFormatter}
          yAxisWidth={40}
        />
      </Card>
      </div>
      </div>

      <div className='w-1/4 p-4 ml-4 mt-4'>
        <div className='p-4'> 
      <Card className="max-w-xs">
        <Title>Recently Added Items</Title>
        <List>
        {recentlyAddedItems.map((item) => (
                <ListItem key={item.id}>
                  <span>{item.itemname}</span>
                  <span>{item.itemquantity}</span>
                </ListItem>
              ))}
        </List>
      </Card>
      </div>
      </div>
    </div>
  )
}

export default MainBody