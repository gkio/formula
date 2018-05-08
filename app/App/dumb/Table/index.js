import React from 'react';
import Pagination from './Pagination';
import './style.scss';


const TableHoc = (className) => {
  return ({ children, style, small }) => (
    <div className={`${className} ${small ? ' small' : ''}`} style={style}>
      {children}
    </div>
  );
};


const Table = TableHoc('table');
const Td = TableHoc('table-td');
const Th = TableHoc('table-th');
const Tr = TableHoc('table-tr');

export {
  Td,
  Th,
  Tr,
  Table,
  Pagination,
};
