import React from 'react'
import { Card, Metric, Text, Title, BarChart, Subtitle, LineChart, List, ListItem } from "@tremor/react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import  {useEffect, useState} from 'react'
import {graph1, graph2} from '../assets'






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
  const [itemsForRestock, setItemsForRestock] = useState([]);
  const [today, setToday] = useState([]);
  const [yesterday, setYesterday] = useState([]);
  const [thisWeek, setThisWeek] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [fastSelling, setFastSelling] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/sales//fastSellingItems").then((response) => {
      setFastSelling(response.data)
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/inventory/latestitems").then((response) => {
        setRecentlyAddedItems(response.data)
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/inventory/lowQuantityItems").then((response) => {
        setItemsForRestock(response.data)
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/sales/todaySales").then((response) => {
        setToday(response.data)
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3001/sales/yesterdaySales").then((response) => {
        setYesterday(response.data)
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3001/sales/thisWeekSales").then((response) => {
        setThisWeek(response.data)
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:3001/sales//lastWeekSales").then((response) => {
        setLastWeek(response.data)
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/sales/dailySales").then((response) => {
        setDailySales(response.data)
    });
  }, []);

  const chartdata = [
    {
      name: "This Week",
      "Sales": thisWeek.total || 0,
    },
    {
      name: "Last Week",
      "Sales": lastWeek.total || 0,
    },
    {
      name: "Today",
      "Sales": today.total || 0,
    },
    {
      name: "Yesterday",
      "Sales": yesterday.total || 0,
    },
  ];
  const valueFormatter = (number) => `₱ ${new Intl.NumberFormat("en-PH").format(number).toString()}`;
  
  return (
    <div className='flex'>
      <div className="w-1/4 p-4 ml-4 mt-4">
        <div className='h-1/2 p-4' >
      <Card className="max-w-xs mx-auto h-1/2 p-4" decoration="top" decorationColor="orange" onClick={navigateToInventory}>
        <Text>Click to manage</Text>
        <Metric>Inventory</Metric>
        <img className='relative h-[130px] mx-auto' src={graph2}/>
      </Card>
      </div>
      <div className='h-1/2 p-4' >
      <Card className="max-w-xs mx-auto p-4 h-1/2" decoration="top" decorationColor="orange" onClick={navigateSales}>
        <Text>Click to manage</Text>
        <Metric>Sales</Metric>
        <img className='relative h-[130px] mx-auto' src={graph2}/>
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
        <Title>Comparison of Sales</Title>
        <LineChart
          className="mt-6"
          data={dailySales}
          index="day"
          categories={["sales"]}
          colors={["blue"]}
          valueFormatter={valueFormatter}
          yAxisWidth={40}
        />
      </Card>
      </div>
      </div>

      <div className='w-1/4 p-4 ml-4 mt-4'>
      <div className='p-4'> 
      <Card className="max-w-xs">
        <Title>Items for Restocking</Title>
        <List>
        {itemsForRestock.map((item) => (
                <ListItem key={item.id}>
                  <span>{item.itemname}</span>

                </ListItem>
              ))}
        </List>
      </Card>
      </div>
      
      <div className='p-4'> 
      <Card className="max-w-xs">
        <Title>Fast Selling Items</Title>
        <List>
        {fastSelling.map((item) => (
                <ListItem key={item.id}>
                  <span>{item.itemname}</span>

                </ListItem>
              ))}
        </List>
      </Card>
      </div>

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