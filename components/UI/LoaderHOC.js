import React from 'react';
import _ from 'lodash';
import NoData from './NoData';
import LoadingPage from './LoadingPage';

const LoaderHOC = ({ 
  component: Component, 
  loader,
  data,
  noData,
  noDataConfig,
  isFullScreen,
  ...rest 
}) => {

  // Check if data is loading or empty
  const isLoading = (data) => (data === null || data === undefined);
  const isEmpty = (data) => (isLoading(data)) ? null : _.isEmpty(data);

  // Get the loading and empty data widgets
  const Loader = loader || <LoadingPage isFullScreen= {isFullScreen} />
  const EmptyData = noData || <NoData isFullScreen={isFullScreen} {...noDataConfig}/>;

  // =======================================================================
  //  UI
  // =======================================================================
  return (isLoading(data)) ? Loader : (isEmpty(data)) ? EmptyData : <Component data={data} {...rest} />
}

export default LoaderHOC;
