import { INodeProperties } from 'n8n-workflow';
import { googleDomainList } from '../constants/google/google.domains';
import { googleLanguageList } from '../constants/google/google.languages';

export const gooleSeropTopHundredFields: INodeProperties[] = [
	{
		displayName: 'Search Query(q)',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		description: 'Parameter defines the query you want to search',
		displayOptions: {
			show: {
				operation: ['googleSerpTopHundred'],
			},
		},
		routing: {
			request: {
				body: { data: { q: '={{$value}}' } },
			},
		},
	},
	// // Google domain and language fields
	{
		...googleDomainList,
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
				operation: ['googleSerpTopHundred'],
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
				operation: ['googleSerpTopHundred'],
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
				operation: ['googleSerpTopHundred'],
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
		displayName: 'Device',
		name: 'device',
		type: 'options',
		default: 'desktop',
		required: true,
		description: 'Select Device Type',
		displayOptions: {
			show: {
				operation: ['googleSerpTopHundred'],
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
				operation: ['googleSerpTopHundred'],
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
				displayName: 'Max Pages',
				name: 'max_pages',
				type: 'number',
				default: 1,
				routing: {
					request: {
						body: {
							data: {
								max_pages:
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
						url: '=/serp/google_advanced/{{$value}}',
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
				operation: ['googleSerpTopHundred'],
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
				operation: ['googleSerpTopHundred'],
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
				operation: ['googleSerpTopHundred'],
				useDateRange: [true],
			},
		},
	},
];
