export async function handleAsync<T>(
  promise: Promise<T>,
): Promise<[T | null, Error | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error: any) {
    return [null, error];
  }
}
