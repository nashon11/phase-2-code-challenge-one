
import React, { useState, useEffect } from 'react';

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // New state for selected category

  useEffect(() => {
    fetch('http://localhost:4000/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data))
  }, []);

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().search(search.toLowerCase()) > -1
  );

  const handleDelete = id => {
    fetch(`http://localhost:4000/transactions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => {
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
      setTransactions(updatedTransactions);
    });
  };

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  }; 

  const filteredCategoryTransactions = filteredTransactions.filter(transaction =>
    selectedCategory === '' || transaction.category === selectedCategory
  ); 

  return (
    <>
      <div id='div'>
        <input type='text' placeholder='Search...' onChange={handleSearchChange} id='search' />
        <select value={selectedCategory} onChange={handleCategoryChange}> {}
          <option value=''>All</option> {}
          <option value='Income'>Income</option>
          <option value='Food'>Food</option>
          <option value='Fashion'>Fashion</option>
          <option value='Gift'>Gift</option>
          <option value='Transportation'>Transportation</option>
          <option value='Entertainment'>Entertainment</option>
          <option value='Housing'>Housing</option>
        </select>
        <table>
          <thead>
            <tr>
              <th id='dat'>Date</th>
              <th id='dat'>Category</th>
              <th id='des'>Description</th>
              <th id='amnt'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategoryTransactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td id='del'><button onClick={() => handleDelete(transaction.id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Transaction;
