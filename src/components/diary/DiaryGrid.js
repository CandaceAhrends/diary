import React from 'react';
import gridOptions from './consts';
import { AgGridReact } from 'ag-grid-react';
import './diaryGrid.scss';

const DiaryGrid = ({ nutrientTotals }) => {

    return (<main className="diary-wrapper">

        <div className="ag-theme-alpine-dark" style={{ height: '80vh', width: '95vw' }}>
            <AgGridReact
                gridOptions={gridOptions}
                rowData={nutrientTotals}>

            </AgGridReact>
        </div>


    </main>);
}

export default DiaryGrid;