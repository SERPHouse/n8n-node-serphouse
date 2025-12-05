import {
	ILoadOptionsFunctions,
	INodeListSearchResult,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';
import { serpLiveSearchPostFields } from './operations/serpLivePostFields';
import { gooleSeropTopHundredFields } from './operations/googleSerpTopHundredFields';
import { googleJobsFields } from './operations/googleJobsFields';
import { getLocations } from './shared/getLocations';

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
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
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
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Search',
						value: 'search',
					},
				],
				default: 'search',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				required: true,
				noDataExpression: true,
				default: 'serpLiveSearchPost',
				displayOptions: {
					show: {
						resource: ['search'],
					},
				},
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

				const response = await getLocations.call(this, engine, query);

				return response;
			},
		},
	};
}
