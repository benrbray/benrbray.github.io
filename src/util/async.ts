export const asyncMap = async <T,U>(xs: T[], f: (x: T) => Promise<U>): Promise<U[]> => {
	return Promise.all(xs.map(f));
}

export const asyncFilter = async <T,>(xs: T[], pred: (x: T) => Promise<boolean>): Promise<T[]> => {
	const pxs = await Promise.all(xs.map(async x => {
		return { value: x, include: pred(x) }
	}));

	return pxs.filter(px => px.include).map(px => px.value);
}