import React from 'react';
import { Receipt } from '@/types/Receipts';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import ErrorDefaultComponent from './ErrorDefaultComponent';
import LoadingDefaultComponent from './LoadingDefaultComponent';

interface ComponentLoaderProps {
  children: React.ReactNode;
  isLoading: boolean;
  hasError: boolean;
  loadingComponent?: JSX.Element;
  errorComponent?: JSX.Element;
}

export default function ComponentLoader({
  children,
  isLoading,
  hasError,
  loadingComponent,
  errorComponent,
}: ComponentLoaderProps): JSX.Element {
  return isLoading ? (
    loadingComponent ?? <LoadingDefaultComponent />
  ) : hasError ? (
    errorComponent ?? <ErrorDefaultComponent />
  ) : (
    <>{children}</>
  );
}

export const withReactQuery = function <T extends object>(
  WrappedComponent: React.ComponentType<T>,
  fetchFunction: () => UseQueryResult<Receipt[], AxiosError<unknown, any>>,
  loadingComponent?: JSX.Element,
  errorComponent?: JSX.Element,
) {
  return function (props: any) {
    const { isLoading, isError, data } = fetchFunction();

    return isLoading ? (
      loadingComponent ?? <LoadingDefaultComponent />
    ) : isError ? (
      errorComponent ?? <ErrorDefaultComponent />
    ) : (
      <WrappedComponent {...props} data={data} />
    );
  };
};
