import React from 'react'
import styled from 'styled-components'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce,     usePagination} from 'react-table'
// A great library for fuzzy filtering/sorting items
import matchSorter from 'match-sorter'

import { useSortBy } from 'react-table'

import getData from './getData'
import { useEffect, useState } from 'react';

import { NavLink } from "react-router-dom";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}



function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
function Table({ columns, data }) {
//console.log(data)
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,

    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageIndex: 0 },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
  )

 /**
 * to convert a timestamps in fr 
 * @param {timestamp} timestamp 
 * @returns 
 */
  function convertTimeToday(timestamp) {
    let aDate = ''
    if (timestamp !== undefined) {
        var date = new Date(timestamp);
        aDate= monthOrDay2digits(date.getDate()) + "/"+monthOrDay2digits(date.getMonth()+1) +  "/"+date.getFullYear()
        //console.log(`${timestamp} converted to ${aDate}`)
    }
    //else console.log(`${timestamp} connot be converted`)
    return aDate

    function monthOrDay2digits(month)    { 
        return (month < 10 ? '0' : '') + month;
    }
}

  return (
    <>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>

                  {/* Add a sort direction indicator */}
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {/*// for pagination :  Instead of using 'rows', we'll use page, */}
          {page.map((row, i) => {
            prepareRow(row)

            return (

              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {  
                  if(cell.getCellProps().key.indexOf('dateStartTimeStamp') >= 0 || cell.getCellProps().key.indexOf('dateBirthDateOkTimeStamp') >= 0) {
                    //console.log(cell.getCellProps().key + ':: ' + cell.value)
                    let ll =  convertTimeToday(cell.value)
                    return <td {...cell.getCellProps()}>{ll}</td>
                  }
                  else  
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>

            )
          })}
        </tbody>
      </table>
      <br />
      <div>Showing {page.length} of {rows.length} rows</div>


     {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[3, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>


      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  )
}

//filter: 'fuzzyText', pour recherche différente...
function PageEmployees() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
            { 
            Header: 'first Name', 
            accessor: 'firstName', // accessor is the "key" in the data 

            },
            { 
            Header: 'last Name', 
            accessor: 'lastName', 
            }, 
            { 
            Header: 'Start Date', 
            accessor: 'dateStartTimeStamp',
            disableFilters: true,
            sortType: (a, b) => {
              var a1 = new Date(a.values.dateStartTimeStamp).getTime();
              var b1 = new Date(b.values.dateStartTimeStamp).getTime();
              if(a1<b1)
                return 1;
              else if(a1>b1)
                return -1;
              else
                return 0;
            }
            },
            { 
            Header: 'Department', 
            accessor: 'department', 
            Filter: SelectColumnFilter,
            filter: 'includes',
            },
            { 
            Header: 'Date of Birth', 
            accessor: 'dateBirthDateOkTimeStamp',
            disableFilters: true,
            sortType: (a, b) => {
              var a1 = new Date(a.values.dateBirthDateOkTimeStamp).getTime();
              var b1 = new Date(b.values.dateBirthDateOkTimeStamp).getTime();
              if(a1<b1)
                return 1;
              else if(a1>b1)
                return -1;
              else
                return 0;
            }
            },
            { 
            Header: 'Street', 
            accessor: 'street', 
            },
            { 
            Header: 'City', 
            accessor: 'city', 
            },
            { 
            Header: 'State', 
            accessor: 'state', 
            Filter: SelectColumnFilter,
            filter: 'includes',
            },

            { 
            Header: 'Zip Code', 
            accessor: 'zip', 
            }
          

        ],
      },
    ],
    []
  )
  const [arrayOfObjectsOfEmplyees, setObjectsOfEmplyees] = useState([]);
  const [loaded, setLoaded] = useState('0');

  useEffect(() => {
    getData().then(function(employeeArray) {
      setObjectsOfEmplyees(employeeArray)
      //console.log('ppf', employeeArray)
      setLoaded(1)
      });
}, [])

// don't know why https://react-table.tanstack.com/docs/examples/filtering have
//React.useMemo(() => makeData(100000), []) ??? !!!
  return (<>
    <NavLink className="link goback" to="/">Go Back</NavLink>

    <Styles>
    {loaded ? <Table columns={columns} data={arrayOfObjectsOfEmplyees} /> : null}
    </Styles>
    </>
  )
}

export default PageEmployees


