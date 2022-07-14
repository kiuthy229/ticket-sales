import React from 'react';

const Pagination = (ticketsPerPage:any, totalTickets:any, paginate:any) => {
  const pageNumbers =[];

  for (let i = 1; i <= Math.ceil(totalTickets / ticketsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
        <div className='pagination'>
            {pageNumbers.map(number => (
            <span key={number} className='page-item'>
                <a onClick={() => paginate(number)} href='!#' className='page-link'>
                {number}
                </a>
            </span>
            ))}
        </div>
  );
};

export default Pagination;