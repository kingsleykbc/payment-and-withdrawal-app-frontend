import React from 'react';
import Error from 'next/error';
import ConditionalWrapper from './UI/ConditionalWrapper';
import Layout from './Layout';

const Page = ({ props, page: Page, addLayout = true, children, ...additionalProps }) => {
	if (props.error) return <Error statusCode={props.error.code} title={props.error.message} />;

	props = {...props, ...additionalProps};
	return (
		<ConditionalWrapper wrapper={c => <Layout>{c}</Layout>} condition={addLayout}>
			{children ? children :	<Page {...props} /> }
		</ConditionalWrapper>
	);
};

export default Page;
