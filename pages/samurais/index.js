import axios from 'axios';
import React from 'react';
import Layout from '../../components/Layout';
import Samurai from '../../components/SamuraisComponents/Samurai';

const index = ({ samurais }) => {
  return (
    <Layout>
      <h1>All Samurais</h1>

      {samurais.map((item)=> <Samurai key={item.id} {...item}/>)}
    </Layout>
  );
};

/**
 * GET DATA
 */
export const getStaticProps = async () => {
  const { data: samurais } = await axios.get("https://jsonplaceholder.typicode.com/users");

  return { props: { samurais }}
}

export default index;