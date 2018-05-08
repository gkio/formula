import React from 'react'
import './style.scss';

const Pagination = ({page, pages, onNext, onPrev}) => (
  <div className="table-pagination">
    <div className="table-pagination__btn" onClick={onPrev}>{'<'}</div>
    <span
      className="table-pagination__current-page"
    >
      <span className="table-pagination__page">page </span>
        {page} of {pages}
    </span>
    <div className="table-pagination__btn" onClick={onNext}>{'>'}</div>
  </div>
)

export default Pagination
