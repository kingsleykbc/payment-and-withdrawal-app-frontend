import {useState} from 'react';
import useFetch from '../../hooks/useFetch';
import _ from 'lodash';
import NoData from './NoData';
import LoadingPage from './LoadingPage';
import ResultPage from './ResultPage';

const DynamicComp = ({ url, component, children, loader, noData, isFullScreen, noDataProps, showError = true, errorPage }) => {
  const [attemps, setAttemps] = useState(0);
  const { error, isLoading, data } = useFetch(url, attemps);
  component = component || children;

  /**
   * REFRESH CALL
   */
  const refreshCall = () => {
    setAttemps(attemps + 2);
  }

  /**
   * DEFAULT LOADING, EMPTY AND ERROR WIDGETS
   */
  const Loader = loader || <LoadingPage isFullScreen={isFullScreen} />
  const EmptyData = noData || <NoData isFullScreen={isFullScreen} {...noDataProps} />;
  const ErrorPage = errorPage || <ResultPage type="error" title={error} onDefaultBottomButtonClick={refreshCall} />

  // ================================================================================================
  //  UI
  // ================================================================================================
  return (
    <div className="DynamicComp">
      {(error && showError) && ErrorPage}

      {(isLoading || (error && !showError)) && Loader}

      {(_.isEmpty(data) && !isLoading && !error) && EmptyData}

      {data && component(data, refreshCall)}
    </div>
  );
};

export default DynamicComp;
