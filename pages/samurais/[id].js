import Layout from "../../components/Layout";
import axios from 'axios';

const SamuraiDetails = ({samurai: {name, email, address:{city}}}) => {
  return (
    <Layout>
      <h1>Samurai Details</h1>

      <div className="details">
        <h2>{name}</h2>

        <p>{email}</p>
        <p>{city}</p>
      </div>
    </Layout>
  );
}

export default SamuraiDetails;

/**
 * GET STATIC PATHS
 */
export const getStaticPaths = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
  const paths = data.map((item, index) => ({ params: { id: item.id.toString() } }));
  return { paths, fallback: false }
}


/**
 * GET DATA
 */
export const getStaticProps = async ctx => {
  const { data: samurai } = await axios.get(`https://jsonplaceholder.typicode.com/users/${ctx.params.id}`);

  return { props: { samurai } }
}
