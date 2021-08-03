import React from 'react';
import theme from '../../config/theme';

const TableList = ({ data, noDataView, cellPadding, headCellPadding }) => {

  if (!data || data.length === 0 ) return (noDataView || <p>No data</p>);

  // Get the CSS
  cellPadding = cellPadding || "15px";
  headCellPadding = headCellPadding || cellPadding;

  /**
   * HEADINGS
   */
  const heading = Object.keys(data[0]).map((item, index)=>  (
    <th key={`${item}_${index}`}>
      {item}

      <style jsx>{`
        th { padding: ${headCellPadding}; text-align: left; }
      `}</style>
    </th>
  ));

  /**
   * ROWS
   */
  const items = data.map((i, index) => <Tr key={`row_${index}`} data={data} index={index} cellPadding={cellPadding} />);

  // =======================================================================
  //  UI
  // =======================================================================
  return (
    <div className="TableList">
      <table>
        <thead><tr>{heading}</tr></thead>
        <tbody>{items}</tbody>
      </table>

      { /* STYLE ======================================================================================= */}
      <style jsx>{`
        .TableList {
          width: 100%;
          overflow-x: auto;
        }

        table{
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
          white-space: nowrap;
        }    
      `}</style>
    </div>
  );
};
export default TableList;


/**
 * TABLE ROW, WITH COLUMNS NESTED
 */
const Tr = ({ data, index, cellPadding }) => {
  const rowData = data[index];

  return (
    <tr>
      {Object.keys(rowData).map((key, ind) => <td key={ind}> {rowData[key]} </td>)}

      <style jsx>{`
        td{
          padding: ${cellPadding};
          border-top: 1px solid ${theme.colors.borderColor};
          text-align: left;
        }
      `}</style>
    </tr>
  );
}