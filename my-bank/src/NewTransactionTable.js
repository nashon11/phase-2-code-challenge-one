
import React from 'react';
import Transaction from './Transaction';

function TransactionTable({ transactions }) {
  <Transaction transaction={transactions}/>
  return (
    <>
      <table id='table'>
        <tbody>
          {transactions.map((transaction, id) => (
            <tr key={id}>
              <td id='dat'>{transaction.date}</td>
              <td id='dat'>{transaction.category}</td>
              <td id='des'>{transaction.description}</td>
              <td id='amnt'>{transaction.amount}</td>
              <td id='del' ><button>delete</button></td>

            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}




export default TransactionTable;