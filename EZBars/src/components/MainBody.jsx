import React from 'react'
import { Card, Metric, Text, Title, BarChart, Subtitle, LineChart, List, ListItem } from "@tremor/react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import  {useEffect, useState} from 'react'
import {graph1, graph2, printer} from '../assets'
import jsPDF from 'jspdf';
import 'jspdf-autotable';

 {/*Start of Site Body */} 
const MainBody = () => {

  const downloadAsPDF = (data, filename) => {
    const doc = new jsPDF();
    doc.text(`Table for ${filename}`, 10, 10);
    
    const headers = Object.keys(data[0]);
    const tableData = data.map((item) => Object.values(item));

    doc.autoTable({
      head: [headers],
      body: tableData,
    });

    doc.save(`${filename}.pdf`);
  };

  const navigate = useNavigate();

  const navigateToInventory = () => {
    navigate('/maininv');
  };

const navigateSales = () => {
    navigate('/sale');
  };

  const navigateProducts = () => {
    navigate('/product');
  };

  const [recentlyAddedItems, setRecentlyAddedItems] = useState([]);
  const [itemsForRestock, setItemsForRestock] = useState([]);
  const [today, setToday] = useState([]);
  const [yesterday, setYesterday] = useState([]);
  const [thisWeek, setThisWeek] = useState([]);
  const [lastWeek, setLastWeek] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [fastSelling, setFastSelling] = useState([]);
  const [gross, setGross] = useState([]);

  useEffect(() => {
    axios.get("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/sales/gross").then((response) => {
      setGross(response.data)
    });
  }, []);

  useEffect(() => {
    axios.get("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/sales/fastSellingItems").then((response) => {
      setFastSelling(response.data)
    });
  }, []);

  useEffect(() => {
    axios.get("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/inventory/latestitems").then((response) => {
        setRecentlyAddedItems(response.data)
    });
  }, []);

  useEffect(() => {
    axios.get("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/inventory/lowQuantityItems").then((response) => {
        setItemsForRestock(response.data)
    });
  }, []);

  useEffect(() => {
    axios.get("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/sales/todaySales").then((response) => {
        setToday(response.data)
    });
  }, []);
  useEffect(() => {
    axios.get("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/sales/yesterdaySales").then((response) => {
        setYesterday(response.data)
    });
  }, []);
  useEffect(() => {
    axios.get("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/sales/thisWeekSales").then((response) => {
        setThisWeek(response.data)
    });
  }, []);
  useEffect(() => {
    axios.get("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/sales/lastWeekSales").then((response) => {
        setLastWeek(response.data)
    });
  }, []);

  useEffect(() => {
    axios.get("http://ec2-13-211-83-146.ap-southeast-2.compute.amazonaws.com/api/sales/dailySales").then((response) => {
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
        <div className='h-1/3 p-4' >
      <Card className="max-w-xs mx-auto h-1/2 p-4" decoration="top" decorationColor="orange" onClick={navigateToInventory}>
        <Text>Click to manage</Text>
        <Metric>Inventory</Metric>
      </Card>
      </div>
      <div className='h-1/3 p-4' >
      <Card className="max-w-xs mx-auto p-4 h-1/2" decoration="top" decorationColor="orange" onClick={navigateSales}>
        <Text>Click to manage</Text>
        <Metric>Sales</Metric>
      </Card>
      </div>
      <div className='h-1/3 p-4' >
      <Card className="max-w-xs mx-auto h-1/2 p-4" decoration="top" decorationColor="orange" onClick={navigateProducts}>
        <Text>Click to Manage</Text>
        <Metric>Wholesale Prices</Metric>
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
        <Title>Comparison of Monthly Sales</Title>
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
      <Card className="w-full">
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <Title style={{ marginRight: '10px' }}>Items for Restocking</Title>
        <img onClick={() => downloadAsPDF(itemsForRestock, 'ItemsForRestocking')} src={printer} className='h-[15px]' alt="Printer" />
        </div>
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
      <Card className="w-full">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Title style={{ marginRight: '10px' }}>Fast Selling Items</Title>
        <img onClick={() => downloadAsPDF(fastSelling, 'FastSellingItems')} src={printer} className='h-[15px]' alt="Printer" />
        </div>
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
      <Card className="w-full">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Title style={{ marginRight: '10px' }}>Recently Added Items</Title>
        <img onClick={() => downloadAsPDF(recentlyAddedItems, 'RecentlyAddedItems')} src={printer} className='h-[15px]' alt="Printer" />
        </div>
        <List>
        {recentlyAddedItems.map((item) => (
                <ListItem key={item.id}>
                  <span>{item.itemname}</span>
                  <span>{item.itemquantity}</span>
                </ListItem>
              ))}
        </List>
      </Card>
      <Card className='p-4 flex justify-center items-center'>
      <button onClick={() => downloadAsPDF(gross, 'GrossSales')} className=' pt-4 px-8  py-3 rounded-md bg-[#FE8C37] text-white font-bold shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1'>Print Monthly Gross Sales</button>
      </Card>
      </div>
      </div>
    </div>

    
  )
}

export default MainBody