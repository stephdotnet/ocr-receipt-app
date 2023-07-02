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

export const withReactQuery = function <T extends object>(
  WrappedComponent: React.ComponentType<T>,
  fetchFunction: () => UseQueryResult<Receipt[], AxiosError<unknown, any>>,
  LoadingComponent?: React.ComponentType,
  ErrorComponent?: React.ComponentType,
) {
  return function (props: any) {
    const { isLoading, isError, data } = fetchFunction();

    return isLoading ? (
      LoadingComponent ? (
        <LoadingComponent {...props} />
      ) : (
        <LoadingDefaultComponent />
      )
    ) : isError ? (
      ErrorComponent ? (
        <ErrorComponent {...props} />
      ) : (
        <ErrorDefaultComponent />
      )
    ) : (
      <WrappedComponent {...props} data={data} />
    );
  };
};

export const withLoadingState = function <T extends object>(
  WrappedComponent: React.ComponentType<T>,
  LoadingComponent?: React.ComponentType,
  ErrorComponent?: React.ComponentType,
) {
  return function (props: any) {
    return props.isLoading ? (
      LoadingComponent ? (
        <LoadingComponent />
      ) : (
        <LoadingDefaultComponent />
      )
    ) : props.hasError ? (
      ErrorComponent ? (
        <ErrorComponent />
      ) : (
        <ErrorDefaultComponent />
      )
    ) : (
      <WrappedComponent {...(props as T)} />
    );
  };
};
