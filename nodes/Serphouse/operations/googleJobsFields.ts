import { INodeProperties } from 'n8n-workflow';
import { googleDomainList } from '../constants/google/google.domains';
import { googleLanguageList } from '../constants/google/google.languages';

export const googleJobsFields: INodeProperties[] = [
	{
		displayName: 'Search Query(q)',
		name: 'query',
		type: 'string',
		default: '',
		required: true,
		description: 'Parameter defines the query you want to search',
		displayOptions: {
			show: {
				operation: ['googleJobs'],
			},
		},
		routing: {
			request: {
				body: { data: { q: '={{$value}}' } },
			},
		},
	},
	// Google domain and language fields
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
				operation: ['googleJobs'],
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
				operation: ['googleJobs'],
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
				operation: ['googleJobs'],
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				operation: ['googleJobs'],
			},
		},
		options: [
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
						url: '=/google-jobs-api/{{$value}}',
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
				operation: ['googleJobs'],
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
				operation: ['googleJobs'],
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
				operation: ['googleJobs'],
				useDateRange: [true],
			},
		},
	},
];
