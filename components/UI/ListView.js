import React from 'react';

const ListView = ({ component: Component, keyAttribute, keyPrefix, data, ...itemProps }) => {
	keyPrefix = keyPrefix || '';

	const items =
		!data || data.length == 0
			? []
			: data.map((item, index) => {
					const key = keyAttribute ? item[keyAttribute] : item['_id'] ? item['_id'] : `${keyPrefix}_${index}`;
					return <Component index={index} key={key} {...item} {...itemProps} isLastItem={index === data.length - 1} />;
			  });

	return <> {items} </>;
};

export default ListView;
