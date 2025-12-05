import type { ILoadOptionsFunctions, INodeListSearchResult } from 'n8n-workflow';

export async function getLocations(
	this: ILoadOptionsFunctions,
	engine: string,
	query?: string,
): Promise<INodeListSearchResult> {
	if (!query || query.trim() === '') {
		return { results: [] };
	}

	const apiKeyCredName = 'serphouseApi';
	const options = {
		method: 'GET',
		url: 'https://api.serphouse.com/location/search',
		qs: {
			q: query,
			type: engine === 'bing' ? 'bing' : 'google',
		},
		json: true,
	};

	const response = await this.helpers.httpRequestWithAuthentication.call(
		this,
		apiKeyCredName,
		options as any,
	);

	return {
		results:
			response.results?.map((location: any) => ({
				name: location.loc || 'Unknown',
				value: location.loc,
			})) || [],
	};
}
