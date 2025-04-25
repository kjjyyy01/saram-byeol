interface QueryStatus<TError = unknown> {
  isError: boolean;
  error: TError | null;
  refetch?: () => void;
}

export function useMultiQueryStatus<TError = unknown>(...statuses: QueryStatus<TError>[]) {
  const errorStatus = statuses.find((status) => status.isError);

  return {
    isAnyError: Boolean(errorStatus),
    error: errorStatus?.error ?? null,
    refetch: errorStatus?.refetch,
  };
}
