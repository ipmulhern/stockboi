import React, { Component } from 'react';

export const PageSelector = (page, numberOfPages, changePage) => {
    let i = page;
    let numbers = [i];
    let lastLength = 0;
    while (numbers.length < 5 && lastLength !== numbers.length){
      lastLength = numbers.length;
      if (numbers[0] - 1 > 0){
        numbers.unshift(numbers[0] - 1);
      }
      if (numbers[numbers.length - 1] + 1 <= numberOfPages){
        numbers.push(numbers[numbers.length - 1] + 1);
      }
    }

    
    return(
      <div style={{float: "right"}} className="pageSelector">
        <ul>
          <li onClick={()=> changePage(1, numbers[0] > 1)}
          className={`controlActive${numbers[0] > 1 ? '' : '-false'}`}>
            <i class="fas fa-angle-double-left"></i> 
          </li>
          <li onClick={()=> changePage(page - 1, page > 1)} 
          className={`controlActive${page > 1 ? '' : '-false'}`}> 
            <i class="fas fa-angle-left"></i>
          </li>
          <li>
            <ul className="page-link-container">
              {numbers.map(number => 
              <li onClick={()=> changePage(number)}
              className={`pageNumber currentPage-${page === number ? 'true' : 'false'}`}>{number}</li>
              )}
              {numbers[numbers.length - 1] < numberOfPages && <li 
              onClick={()=> changePage(numberOfPages)} className="page-jump">...</li>}
            </ul>
          </li>
          <li onClick={()=> changePage(page + 1, page < numberOfPages)} 
          className={`controlActive${page < numberOfPages ? '' : '-false'}`}>
            <i class="fas fa-angle-right"></i>
          </li>
          <li onClick={()=> changePage(numberOfPages, numbers[numbers.length - 1] < numberOfPages)}
          className={`controlActive${numbers[numbers.length - 1] < numberOfPages ? '' : '-false'}`}>
            <i class="fas fa-angle-double-right"></i>
          </li>
        </ul>
      </div>
    );
}