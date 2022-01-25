import axios from "axios";
import { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function TransactionsSearch() {
    const [ transactions, setTransactions ] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${API_URL}/transactions`)
        .then((res) => {
            setTransactions(res.data);
        }).catch((err) => {
            throw err;
        });
}, []);

    let amountTextColor = params => {
        if(params.value < 0){
            return {color: "red"};
        } else {
            return {color: "green"};
        }
    }
    return (
        <div className="ag-grid-container">
            <h2>Search & Filter Transactions</h2>
            <h3>Click/Hover over Column Headers</h3>
            <div className="ag-theme-alpine" style={{height: 800, width: 600}}>
                <AgGridReact
                    rowData={transactions}
                    columnHoverHighlight={true}
                >
                    <AgGridColumn field="date" sortable={true} filter={true}></AgGridColumn>
                    <AgGridColumn field="name" sortable={true} filter={true}></AgGridColumn>
                    <AgGridColumn field="amount" sortable={true} filter={true} cellStyle={amountTextColor}></AgGridColumn>
                </AgGridReact>
            </div>
        </div>
    )
}

export default TransactionsSearch;