import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Tabs, Tab } from '@mui/material';

import { CircularProgress } from '@mui/material';

const BillingAnomaly = () => {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Sort bills by monthAndYear
  const sortedBills = [...bills].sort((a, b) => new Date(a.monthAndYear) - new Date(b.monthAndYear));
  const billMap = new Map();
  sortedBills.forEach((bill) => {
    if (!billMap.has(bill.consumerNumber)) {
      billMap.set(bill.consumerNumber, []);
    }
    billMap.get(bill.consumerNumber).push(bill);
  });

  const highBills = [];
  const lowBills = [];
  const zeroConsumptionBills = [];

  billMap.forEach((billHistory) => {
    if (billHistory.length < 2) return;
    
    const previousBill = billHistory[billHistory.length - 2];
    const currentBill = billHistory[billHistory.length - 1];

    const prevAmount = previousBill.netBillAmount;
    const currAmount = currentBill.netBillAmount;
    const highThreshold = prevAmount + prevAmount * 0.25;
    const lowThreshold = prevAmount - prevAmount * 0.25;

    if (currAmount >= highThreshold) {
      highBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
    } else if (currAmount <= lowThreshold) {
      lowBills.push({ ...currentBill, prevNetBillAmount: prevAmount });
    }

    if (currentBill.totalConsumption === 0) {
      zeroConsumptionBills.push(currentBill);
    }
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'consumerNumber', headerName: 'CONSUMER NUMBER', width: 140 },
    // { field: 'contactNumber', headerName: 'CONTACT NUMBER', width: 130 },
    { field: 'ward', headerName: 'WARD', width: 130 },
    { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
    { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
    { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
    { field: 'monthAndYear', headerName: 'BILL MONTH', width: 130 },
    { field: 'prevNetBillAmount', headerName: 'PREVIOUS BILL AMOUNT', width: 150 },
    { field: 'netBillAmount', headerName: 'CURRENT BILL AMOUNT', width: 150 },
  ];

  const getRows = () => {
    switch (tabValue) {
      case 0:
        return zeroConsumptionBills;
      case 1:
        return highBills;
      case 2:
        return lowBills;
      default:
        return [];
    }
  };

  return (
    <Box sx={{ width: '90%', marginLeft:isSidebarOpen?'250px':'100px',paddingTop: isSidebarOpen?'20px':'50px' }}>
      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
        <Tab label="Zero Consumption Bills" />
        <Tab label="High Anomaly Bills" />
        <Tab label="Low Anomaly Bills" />
      </Tabs>

      <Box sx={{ marginTop: '20px', border: '1px solid #F7F7F8', padding: '20px' }}>
        {/* <Typography >
          {tabValue === 0 ? 'ZERO CONSUMPTON BILLS' : tabValue === 1 ? 'HIGH ANOMALY BILLS' : 'LOW ANOMALY BILLS'}
        </Typography> */}
        <DataGrid rows={getRows().map((bill, index) => ({ id: index + 1, ...bill }))} columns={columns} pageSize={5} />
      </Box>
    </Box>
  );
};

export default BillingAnomaly;
