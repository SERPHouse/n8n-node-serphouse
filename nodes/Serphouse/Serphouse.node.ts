import {
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { serpLiveSearchPostFields } from './operations/serpLivePostFields';
import { gooleSeropTopHundredFields } from './operations/googleSerpTopHundredFields';
import { googleJobsFields } from './operations/googleJobsFields';

export class Serphouse implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SERPHouse',
		name: 'serphouse',
		icon: 'file:serphouse.svg',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"]}}',
		description: "Scrape Google and other search engines from SERPHouse's official node",
		defaults: {
			name: 'SERPHouse',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'serphouseApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.serphouse.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				required: true,
				noDataExpression: true,
				default: 'serpLiveSearchPost',
				options: [
					{
						name: 'Serp Live Search (POST)',
						value: 'serpLiveSearchPost',
						action: 'Serp Live Search (POST)',
						routing: {
							request: {
								method: 'POST',
								url: '/serp/live',
							},
						},
					},
					{
						name: 'Google SERP (Top 100 Results)',
						value: 'googleSerpTopHundred',
						action: 'Google SERP (Top 100 results)',
						routing: {
							request: {
								method: 'POST',
								url: '/serp/google_advanced',
							},
						},
					},
					{
						name: 'Google Jobs API',
						value: 'googleJobs',
						action: 'Google Jobs API',
						routing: {
							request: {
								method: 'POST',
								url: '/google-jobs-api',
							},
						},
					},
				],
			},
			...serpLiveSearchPostFields,
			...gooleSeropTopHundredFields,
			...googleJobsFields,
		],
	};
	methods = {
		listSearch: {
			async searchLocations(
				this: ILoadOptionsFunctions,
				query?: string,
			): Promise<INodeListSearchResult> {
				const engine = this.getNodeParameter('engine', 0) as string;

				const credentials = await this.getCredentials('serphouseApi');
				const apiKey = credentials.apiKey as string;

				if (!query || query.trim() === '') {
					return { results: [] };
				}

				const options: IHttpRequestOptions = {
					method: 'GET',
					url: 'https://api.serphouse.com/location/search',
					headers: {
						Authorization: `Bearer ${apiKey}`,
					},
					qs: {
						q: query,
						type: engine === 'bing' ? 'bing' : 'google',
					},
					json: true,
				};

				const response = await this.helpers.httpRequest(options);

				return {
					results:
						response.results?.map((location: any) => ({
							name: location.loc || 'Unknown',
							value: location.loc,
						})) || [],
				};
			},
		},
	};
}
