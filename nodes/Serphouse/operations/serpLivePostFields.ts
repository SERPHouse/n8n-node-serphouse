import { type INodeProperties } from 'n8n-workflow';
import { bingDomainList } from '../constants/bing/bing.domains';
import { bingLanguageList } from '../constants/bing/bing.languages';
import { yahooLanguageList } from '../constants/yahoo/yahoo.languages';
import { yahooDomainList } from '../constants/yahoo/yahoo.domains';
import { googleDomainList } from '../constants/google/google.domains';
import { googleLanguageList } from '../constants/google/google.languages';

export const serpLiveSearchPostFields: INodeProperties[] = [
	{
		displayName: 'Search Query(q)',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		description: 'Parameter defines the query you want to search',
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
			},
		},
		routing: {
			request: {
				body: { data: { q: '={{$value}}' } },
			},
		},
	},
	{
		displayName: 'Search Engine',
		name: 'engine',
		type: 'options',
		default: 'google',
		required: true,
		placeholder: 'Select a search engine',
		description: 'Parameter defines the engine you want to perform search on',
		options: [
			{ name: 'Google', value: 'google' },
			{ name: 'Bing', value: 'bing' },
			{ name: 'Yahoo', value: 'yahoo' },
		],
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
			},
		},
	},

	//bing domain and languages fields
	{
		...bingDomainList,
		required: true,
		routing: {
			request: {
				body: {
					data: { domain: '={{$value}}' },
				},
			},
		},
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
				engine: ['bing'],
			},
		},
	},
	{
		...bingLanguageList,
		required: true,
		routing: {
			request: {
				body: {
					data: { lang: '={{$value}}' },
				},
			},
		},
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
				engine: ['bing'],
			},
		},
	},
	// // Google domain and language fields
	{
		...googleDomainList,
		routing: {
			request: {
				body: {
					data: { domain: '={{$value}}' },
				},
			},
		},
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
				engine: ['google'],
			},
		},
	},
	{
		...googleLanguageList,
		required: true,
		routing: {
			request: {
				body: {
					data: { lang: '={{$value}}' },
				},
			},
		},
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
				engine: ['google'],
			},
		},
	},
	// // Yahoo domain and language fields
	{
		...yahooDomainList,
		required: true,
		routing: {
			request: {
				body: {
					data: { domain: '={{$value}}' },
				},
			},
		},
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
				engine: ['yahoo'],
			},
		},
	},
	{
		...yahooLanguageList,
		required: true,
		routing: {
			request: {
				body: {
					data: { lang: '={{$value}}' },
				},
			},
		},
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
				engine: ['yahoo'],
			},
		},
	},
	{
		displayName: 'Location',
		name: 'location',
		description: 'Search and select a location',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
				engine: ['google', 'bing'],
			},
		},
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				placeholder: 'Select a location...',
				typeOptions: {
					searchListMethod: 'searchLocations',
					searchable: true,
				},
			},
		],
		routing: {
			request: {
				body: {
					data: { loc: '={{$value}}' },
				},
			},
		},
	},
	{
		displayName: 'Serp Type',
		name: 'serp_type',
		type: 'options',
		default: 'web',
		required: true,
		description: 'Type of search results to return',
		routing: {
			request: {
				body: {
					data: { serp_type: '={{$value}}' },
				},
			},
		},
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
			},
		},
		options: [
			{ name: 'Web', value: 'web' },
			{ name: 'News', value: 'news' },
			{ name: 'Image', value: 'image' },
			{ name: 'Shop', value: 'shop' },
		],
	},
	{
		displayName: 'Device',
		name: 'device',
		type: 'options',
		default: 'desktop',
		required: true,
		description: 'Select Device Type',
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
			},
		},
		routing: {
			request: {
				body: {
					data: { device: '={{$value}}' },
				},
			},
		},
		options: [
			{ name: 'Desktop', value: 'desktop' },
			{ name: 'Tablet', value: 'tablet' },
			{ name: 'Mobile', value: 'mobile' },
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
			},
		},
		options: [
			{
				displayName: 'Verbatim',
				name: 'verbatim',
				type: 'boolean',
				default: false,
				description: 'Set Google Verbatim search',
				routing: {
					request: {
						body: {
							data: { verbatim: '={{$value ? 1 :0}}' },
						},
					},
				},
			},
			{
				displayName: 'GFilter',
				name: 'gfilter',
				type: 'boolean',
				description:
					'Parameter defines if the filters for Similar Results and Omitted Results are on or off',
				default: false,
				routing: {
					request: {
						body: {
							data: { gfilter: '={{$value ? 1 :0}}' },
						},
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				routing: {
					request: {
						body: {
							data: {
								page: '={{ $value !== undefined && $value !== null && $value !== "" ? $value : undefined }}',
							},
						},
					},
				},
			},
			{
				displayName: 'Number of Results',
				name: 'num_result',
				type: 'number',
				required: true,
				default: 1,
				routing: {
					request: {
						body: {
							data: {
								num_result:
									'={{ $value !== undefined && $value !== null && $value !== "" ? $value : undefined }}',
							},
						},
					},
				},
			},
			{
				displayName: 'Response Type',
				name: 'response_type',
				type: 'options',
				default: 'json',
				description: 'Select the response format type',
				options: [
					{ name: 'JSON', value: 'json' },
					{ name: 'HTML', value: 'html' },
				],
				routing: {
					request: {
						url: '=/serp/live/{{$value}}',
					},
				},
			},
		],
	},
	{
		displayName: 'Use Date Range',
		name: 'useDateRange',
		type: 'boolean',
		default: false,
		description: 'Enable date range selection for filtering results',
		routing: {
			request: {
				body: {
					data: {
						date_range:
							'={{ $parameter.useDateRange && $parameter.start_date && $parameter.end_date ? `${$parameter.start_date.split("T")[0]},${$parameter.end_date.split("T")[0]}` : undefined }}',
					},
				},
			},
		},
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
			},
		},
	},
	{
		displayName: 'Start Date',
		name: 'start_date',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
				useDateRange: [true],
			},
		},
	},
	{
		displayName: 'End Date',
		name: 'end_date',
		type: 'dateTime',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['serpLiveSearchPost'],
				useDateRange: [true],
			},
		},
	},
];
