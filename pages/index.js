import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import Image from 'next/image';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
      <h1>Home</h1>

      <Image src="/images/samurai.png" width={1000} height={562} />

      <article>
        But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?
      </article>

      <br /><br />

      <Link href="/samurais">
        <a className="button">Browse Samurais</a>
      </Link>

      <div id="bottomsection">
        BOTTOM SECTION
      </div>

      {/* STYLE */}
      <style jsx>{`
        article {
          margin-top: 30px;
        }

        #bottomsection {
          font-weight: bold;
          margin: 40px 0;
          padding: 20px;
          text-align: center;
          background: #000;
        }
      `}</style>
    </Layout>
  )
}
