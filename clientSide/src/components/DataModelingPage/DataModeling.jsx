import React, {useContext, useEffect, useState } from 'react'
import "./DataModeling.css"
import { FaRegCircleUser } from "react-icons/fa6";
import DatasetItem from "./../DatasetsItem/DatasetsItem.jsx"
import BarChart from "./../BarChartPage/BarChart.jsx"
import PieChart from "./../PieChartPage/PieChart.jsx"
import Table from "./../DataTable/Table.jsx"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from "antd"
// import Navbar from '../Navbar/Navbar.jsx';
import { toast } from 'react-toastify';

import {
    inventoryPieData,
    revenuePieData,
    equipmentPieData,
    clinicalPieData,
    inventoryBarData,
    revenueBarData,
    equipmentBarData,
    clinicalBarData
} from './ChartsData/ChartData.jsx';
import { StoreContext } from '../../context/StoreContext.jsx';


const DataModeling = () => {


    // let endpointsArray = ['getInventoryData', 'getRevenueData', 'getEquipmentData', 'getClinicalData']

    const inventory_model_datasets = [
        'Order History Data',
        'Order History with Demand Levels',
        'Product Information Data',
        'Inventory Levels Data',
        'Past Demand Information',
        'Stock Movement in Warehouse',
        'Warehouses Data',
        'Daily Weather Forecast',
        'Historical Weather Forecast'
    ]

    const revenue_model_datasets = ['Product Sales Data', 'Product Suppliers', 'Shipping Data', 'Manufacturing Costs Data']

    const equipment_model_datasets = ['Sensor Data', 'Failure Data', 'Maintenance Data', 'Operational Data', 'Test Data of Equipment Failure']
    const clinical_model_datasets = [
        "Patient Health Profile Data",
        // "Distribution Centers Information",
        "Admission Data Of Patient",
        // "Clinics Information Data",
        "Patient Discharge Summary Data",
        // "Clinical Inventory Data",
        // "Shipping History",
        "Sales Information Data"
        // "Product/Drug Information"
    ]

    // const datasetsNames = ["Order History", "Product Information", "Warehouse Information", "Past Demand", "Stock Movement", "Weather Data"]
    const [data, setData] = useState([])
    const [hideShow, setHideShow] = useState(true)
    const [inventoryData, setInventoryData] = useState(true)
    const [revenueData, setRevenueData] = useState(true)
    const [equipmentData1, setEquipmentData] = useState(true)
    const [clinicalData, setClinicalData] = useState(true)
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const {backendURL} = useContext(StoreContext)


    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(backendURL + "/home")
            .then(result => {
                console.log(result)
                if (result.data !== "Successful") {
                    navigate("/login")
                } else {
                    navigate("/dataModeling")
                }
            })
            .catch(err => console.log(err))
    }, [])

    const handleLogout = () => {
        // alert("Do you want to Log out!!")
        axios.get(backendURL + "/logout")
            .then(result => {
                console.log(result.data)
                if (result.data === "Logout Successful!") {
                    toast.success(result.data)
                    navigate("/login")
                }
            })
    }

    const getInventoryDataFromMongoDB = async () => {
        await axios.get(backendURL + "/getInventoryData")
            .then(result => {
                const Array = result.data
                // const largeArray = Array.from({ length: 634 }, (_, i) => i);
                setData(Array)
                console.log(Array)
                setInventoryData(false)
                setRevenueData(true)
                setEquipmentData(true)
                setClinicalData(true)
                setHideShow(false)
                handleTabClick("tab1")
            }).catch(err => console.log(err))
    }

    const getRevenueDataFromMongoDB = async () => {
        await axios.get(backendURL + "/getRevenueData")
            .then(result => {
                const Array = result.data
                // const largeArray = Array.from({ length: 634 }, (_, i) => i);
                setData(Array)
                console.log(Array)
                setRevenueData(false)
                setHideShow(false)
                setInventoryData(true)
                setEquipmentData(true)
                setClinicalData(true)
                handleTabClick("tab1")
            }).catch(err => console.log(err))
    }

    const getEquipmentDataFromMongoDB = async () => {
        await axios.get(backendURL + "/getEquipmentData")
            .then(result => {
                const Array = result.data
                // const largeArray = Array.from({ length: 634 }, (_, i) => i);
                setData(Array)
                console.log(Array)
                setRevenueData(true)
                setHideShow(false)
                setInventoryData(true)
                setEquipmentData(false)
                setClinicalData(true)
                handleTabClick("tab1")
            }).catch(err => console.log(err))
    }

    const getClinicalDataFromMongoDB = async () => {
        await axios.get(backendURL + "/getClinicalData")
            .then(result => {
                const Array = result.data
                // const largeArray = Array.from({ length: 634 }, (_, i) => i);
                setData(Array)
                console.log(Array)
                setRevenueData(true)
                setHideShow(false)
                setInventoryData(true)
                setEquipmentData(true)
                setClinicalData(false)
                handleTabClick("tab1")
            }).catch(err => console.log(err))
    }

    const handleResultsData = () => {
        setInventoryData(true)
        setRevenueData(true)
        setHideShow(true)
        setEquipmentData(true)
        setClinicalData(true)
    }

    const items = [
        {
            key: 1,
            label: (
                <a id='modeling-drop-option1' href="/home">
                    Go to Home
                </a>
            )
        },

        {
            key: 2,
            label: (
                <a id='inventory' onClick={getInventoryDataFromMongoDB}>
                    1) Inventory Forecasting with live data
                </a>
            )
        },
        {
            key: 3,
            label: (
                <a id='revenue' onClick={getRevenueDataFromMongoDB}>
                    2) Predicting Revenue Demand/Sensing
                </a>
            )
        },
        {
            key: 4,
            label: (
                <a id='e-failure' onClick={getEquipmentDataFromMongoDB}>
                    3) Equipment Failure Prediction
                </a>
            )
        },
        {
            key: 5,
            label: (
                <a id='inventory' onClick={getClinicalDataFromMongoDB}>
                    4) Inventory Prediction With Clinical Data
                </a>
            )
        }
        ,
        {
            key: 6,
            label: (
                <a id='modeling-drop-option2' onClick={handleLogout}>
                    Logout
                </a>
            )
        }
    ]

    return (<>
        <div className='data-modeling-container'>
            <header className='container website-header'>
                <div className='header-container'>
                    <Link to="/home" className='website-heading'>
                        <h1 >
                            HANELYTICS
                        </h1>
                    </Link>
                    <div className='drop-down'>
                        <Dropdown menu={{ items }} trigger={['hover']}>
                            <FaRegCircleUser className='user-icon' />
                        </Dropdown>
                        <div>
                            <button onClick={() => handleLogout()}>Logout</button>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container data-models-section-container'>
                <section className='workflows-section'>
                    <h1 className='use-case-heading' onClick={handleResultsData}>Data Models</h1>
                    <div className='data-model-types'>
                        <h2 className={inventoryData === true ? 'model-name' : "active"} onClick={getInventoryDataFromMongoDB}>
                            Reorder Point Quantity & Safety Stock Predictions for Inventory with & without Live-Data
                        </h2>
                        <h2 className={revenueData === true ? 'model-name' : "active"} onClick={getRevenueDataFromMongoDB}>
                            Predictive Analytics for Revenue Demand Sensing Trends
                        </h2>
                        <h2 className={equipmentData1 === true ? 'model-name' : "active"} onClick={getEquipmentDataFromMongoDB}>
                            Equipment Risk Detection and Failure Prevention With Predictive Analytics
                        </h2>
                        <h2 className={clinicalData === true ? 'model-name' : "active"} onClick={getClinicalDataFromMongoDB}>
                            Predictive Inventory Modeling with Clinical Information
                        </h2>

                    </div>
                </section>
                {
                    hideShow && (
                        <div className='charts-section select-model-name empty-bg-image'>
                            <h2 className='select-text'>Select the Data Model to view the results</h2>
                        </div>
                    )
                }
                {!inventoryData && (

                    <div className='charts-section'>
                        <div className="tab-buttons">
                            <button
                                className={`tab ${activeTab === 'tab1' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Data Resources <span>(utilized)</span>
                            </button>
                            <button
                                className={`tab ${activeTab === 'tab2' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                View Model Insights
                            </button>
                        </div>


                        <div className="tab-content">
                            {activeTab === 'tab1' && (<>
                                <div id="tab1" className="content model-datasets-active">
                                    {inventory_model_datasets.map((eachDataset, index) => {
                                        return (
                                            <li key={index} className='model-dataset'>{eachDataset}</li>
                                        )
                                    })}
                                </div>
                                <div className="button">
                                    <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                        Back
                                    </button>
                                    <button onClick={() => handleTabClick('tab2')} className='btn btn-success results'>View Model Insights</button>
                                </div>
                            </>)}
                            {activeTab === 'tab2' && (
                                <div id="tab2" className="content">
                                    <div className='charts-container'>
                                        <div className='pie-chart'>
                                            <PieChart chartText={"Average and Predicted Monthly Sales Data"} pieChartData={inventoryPieData} />
                                        </div>
                                        <div className='bar-chart'>
                                            <BarChart
                                                barChartText={"Forecasted results for Sales, Safety Stock & Reorder Quantity"}
                                                barChartData={inventoryBarData}
                                                labelsData={["Predicted Sales", "Safety Stock", "Reorder Point Quantity"]}
                                            />
                                        </div>
                                    </div>
                                    <h1 className='results-heading'>Results:</h1>
                                    <div className='table-container'>
                                        <Table data={data} inventoryData={inventoryData} revenueData={revenueData} equipmentData1={equipmentData1} clinicalData={clinicalData} />
                                    </div>
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                )}
                {!revenueData && (
                    <div className='charts-section'>
                        {/* Tab buttons */}
                        <div className="tab-buttons">
                            <button
                                className={`tab ${activeTab === 'tab1' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Data Resources <span>(utilized)</span>
                            </button>
                            <button
                                className={`tab ${activeTab === 'tab2' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                View Model Insights
                            </button>
                        </div>

                        {/* Tab content */}
                        <div className="tab-content">
                            {activeTab === 'tab1' && (<>
                                <div id="tab1" className="content model-datasets-active">
                                    {revenue_model_datasets.map((eachDataset, index) => {
                                        return (
                                            <li key={index} className='model-dataset'>{eachDataset}</li>
                                        )
                                    })}
                                </div>
                                <div className="button">
                                    <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                        Back
                                    </button>
                                    <button onClick={() => handleTabClick('tab2')} className='btn btn-success results'>View Model Insights</button>
                                </div>
                            </>)}
                            {activeTab === 'tab2' && (
                                <div id="tab2" className="content">
                                    <div className='charts-container'>
                                        <div className='pie-chart'>
                                            <PieChart chartText={"Revenue Share of each Category"} pieChartData={revenuePieData} />
                                        </div>
                                        <div className='bar-chart'>
                                            <BarChart
                                                barChartText={"Generation Of Revenue in Future"}
                                                barChartData={revenueBarData}
                                                labelsData={["Sales", "Inventory Levels", "Quantity for each Order"]}
                                            />
                                        </div>
                                    </div>
                                    <h1 className='results-heading'>Results:</h1>
                                    <div className='table-container'>
                                        <Table data={data} inventoryData={inventoryData} revenueData={revenueData} equipmentData1={equipmentData1} clinicalData={clinicalData} />
                                    </div>
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                )}
                {!equipmentData1 && (
                    <div className='charts-section'>
                        {/* Tab buttons */}
                        <div className="tab-buttons">
                            <button
                                className={`tab ${activeTab === 'tab1' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Data Resources <span>(utilized)</span>
                            </button>
                            <button
                                className={`tab ${activeTab === 'tab2' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                View Model Insights
                            </button>
                        </div>

                        {/* Tab content */}
                        <div className="tab-content">
                            {activeTab === 'tab1' && (<>
                                <div id="tab1" className="content model-datasets-active">
                                    {equipment_model_datasets.map((eachDataset, index) => {
                                        return (
                                            <li key={index} className='model-dataset'>{eachDataset}</li>
                                        )
                                    })}
                                </div>
                                <div className="button">
                                    <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                        Back
                                    </button>
                                    <button onClick={() => handleTabClick('tab2')} className='btn btn-success results'>View Model Insights</button>
                                </div>
                            </>)}
                            {activeTab === 'tab2' && (
                                <div id="tab2" className="content">
                                    <div className='charts-container'>
                                        <div className='pie-chart'>
                                            <PieChart chartText={"Equipment Share of each Category"} pieChartData={equipmentPieData} />
                                        </div>
                                        <div className='bar-chart'>
                                            <BarChart
                                                barChartText={"Equipment Failure representation in cycles"}
                                                barChartData={equipmentBarData}
                                                labelsData={["Quantity of Demand", "Historical Cycles", "Predicted Failure Cycles"]}
                                            />
                                        </div>
                                    </div>
                                    <h1 className='results-heading'>Results:</h1>
                                    <div className='table-container'>
                                        <Table data={data} inventoryData={inventoryData} revenueData={revenueData} equipmentData1={equipmentData1} clinicalData={clinicalData} />
                                    </div>
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                )}
                {!clinicalData && (
                    <div className='charts-section'>
                        {/* Tab buttons */}
                        <div className="tab-buttons">
                            <button
                                className={`tab ${activeTab === 'tab1' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                Data Resources <span>(utilized)</span>
                            </button>
                            <button
                                className={`tab ${activeTab === 'tab2' ? 'activeTab' : ''}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                View Model Insights
                            </button>
                        </div>

                        {/* Tab content */}
                        <div className="tab-content">
                            {activeTab === 'tab1' && (<>
                                <div id="tab1" className="content model-datasets-active">
                                    {clinical_model_datasets.map((eachDataset, index) => {
                                        return (
                                            <li key={index} className='model-dataset'>{eachDataset}</li>
                                        )
                                    })}
                                </div>
                                <div className="button">
                                    <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                        Back
                                    </button>
                                    <button onClick={() => handleTabClick('tab2')} className='btn btn-success results'>View Model Insights</button>
                                </div>
                            </>)}
                            {activeTab === 'tab2' && (
                                <div id="tab2" className="content">
                                    <div className='charts-container'>
                                        <div className='pie-chart'>
                                            <PieChart chartText={"Predicted Consumption Quantity of Drugs"} pieChartData={clinicalPieData} />
                                        </div>
                                        <div className='bar-chart'>
                                            <BarChart
                                                barChartText={"Clinical Data Visual Representation"}
                                                barChartData={clinicalBarData}
                                                labelsData={["Safety Stock Required", "Drugs Consumed", "Reorder Point Quantity"]}
                                            />
                                        </div>
                                    </div>
                                    <h1 className='results-heading'>Results:</h1>
                                    <div className='table-container'>
                                        <Table data={data} inventoryData={inventoryData} revenueData={revenueData} equipmentData1={equipmentData1} clinicalData={clinicalData} />
                                    </div>
                                    <div className="button">
                                        <button className='text-right btn btn-primary' onClick={handleResultsData}>
                                            Back
                                        </button>
                                        <button onClick={() => handleTabClick('tab1')} className='btn btn-dark results'>Data Resources <span>(utilized)</span></button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                )}
            </div>
        </div>
    </>
    );
}

export default DataModeling