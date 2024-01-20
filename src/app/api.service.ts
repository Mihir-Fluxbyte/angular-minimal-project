import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { tap, catchError, share, takeUntil } from 'rxjs/operators';

enum ApiState {
  IDLE = 'idle',
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
  REFETCHING = 'refetching',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ParametersType = Array<any>;

type Func<PT extends ParametersType, RT> = (...args: PT) => RT;

export type ApiConfigType = {
  pollInterval?: number;
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public API<
    T,
    ApiType extends Func<ParametersType, Observable<T>> | Observable<T>,
    ApiFuncParametersType extends ApiType extends Func<
      ParametersType,
      Observable<T>
    >
      ? Parameters<ApiType>
      : [],
    ConfigType extends ApiType extends Func<ParametersType, Observable<T>>
      ? ApiConfigType & { initialParams: ApiFuncParametersType }
      : ApiConfigType,
  >(
    apiCall: ApiType,
    config: ConfigType,
  ): {
    result$: Observable<T | null>;
    state$: Observable<ApiState>;
    error$: Observable<unknown>;
    refetch: (...refetchParams: ApiFuncParametersType) => void;
  } {
    const { pollInterval } = config ?? {};
    let initialParams = [] as unknown as ApiFuncParametersType;
    if (config && 'initialParams' in config) {
      initialParams = config.initialParams;
    }
    const stateSubject = new BehaviorSubject<ApiState>(ApiState.IDLE);
    const state$ = stateSubject.asObservable();

    const resultSubject = new BehaviorSubject<T | null>(null);
    const result$ = resultSubject.pipe(
      tap(() => {
        if (stateSubject.getValue() === ApiState.IDLE) {
          fetch(...initialParams);
        }
      }),
    );
    // .asObservable();

    const errorSubject: Subject<unknown> = new Subject<unknown>();
    const error$ = errorSubject.asObservable();

    const cancelSubject: Subject<void> = new Subject<void>();

    const fetch = (...fetchParams: ApiFuncParametersType) => {
      stateSubject.next(ApiState.FETCHING);
      const call: Observable<T> =
        typeof apiCall === 'function' ? apiCall(...fetchParams) : apiCall;
      call
        .pipe(
          takeUntil(cancelSubject),
          tap({
            next: (result: T) => {
              resultSubject.next(result);
              stateSubject.next(ApiState.SUCCESS);
            },
            error: (error) => {
              console.error(error);
              errorSubject.next(error);
              stateSubject.next(ApiState.ERROR);
            },
          }),
          catchError((error) => {
            return error;
          }),
          share(),
        )
        .subscribe();
    };

    const refetch = (...refetchParams: ApiFuncParametersType) => {
      cancelSubject.next();
      stateSubject.next(ApiState.REFETCHING);
      fetch(...refetchParams);
    };

    if (pollInterval) {
      timer(0, pollInterval)
        .pipe(takeUntil(cancelSubject))
        .subscribe(() => fetch(...initialParams));
    }

    return {
      result$,
      state$,
      error$,
      refetch,
    };
  }
}
