import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/countries', async(request, response) => {
  try {
    let {
      keyword,
      region,
      page,
      limit
    } = request.query

    let offset = 0;
    let meta = {};

    if(Number(page) === 1) {
      offset = 0;
    } else {

      if(limit === undefined || null) {
        limit = '15';
      }

      if(page === undefined || null) {
        page = '1'
      }

      offset = Number(page) > 1 ? Number(limit) + (Number(page) - 1) : 0;
    }

    const countriesData = await axios.get(`${process.env.API_URL}/countries`,
    {
      params: {
        q: keyword,
        region,
        page,
        offset,
        limit,
        envelope: false
      }
    }
  )
  .then(response => response.data)

    meta = {
      previous: Number(page) > 1 ? Number(page) - 1 : 1,
      next: Number(page) + 1
    }
    return response.json({ data: { data: countriesData, meta: meta } })
  } catch (error) {
    console.log(error)
  }

})

app.listen(3333)