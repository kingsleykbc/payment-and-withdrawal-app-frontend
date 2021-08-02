import Link from 'next/link';
import Layout from '../components/Layout';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound = () => {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push('/');
		}, 10000);
	}, []);

	return (
		<Layout>
			<div className='NotFound'>
				<h1>404</h1>

				<p>Page Not Found</p>

				<Link href='/'>
					<a className='button'>Home</a>
				</Link>

				{/* STYLE */}
				<style jsx>{`
					.NotFound {
						text-align: center;
						margin: 30px;
					}

					p {
						text-align: center;
						font-size: 1.5rem;
					}

					.button {
						margin-top: 50px;
					}
				`}</style>
			</div>
		</Layout>
	);
};

export default NotFound;
