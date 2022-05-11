export const convertMongoDbData = (data: string) =>
	new Date(data).toLocaleDateString('ru')
