import { useState, useEffect } from 'react'
import { Table } from './components/DataTable'

function App() {
  const [countriesAll, setCountriesAll] = useState([]);

  const totalCountries = '249'; // manual total countries
  let api = import.meta.env.VITE_API_URL

  useEffect(() => {
    try {
      fetch(`${api}/countries?limit=${totalCountries}`)
      .then(response => response.json())
      .then(data => setCountriesAll(data.data.data));
    } catch(error) {
      console.log(error)
    }
  }, []);

  return (
    <div className="container">
      <Table data={Object.values(countriesAll)} />
    </div>
  )
}

export default App
