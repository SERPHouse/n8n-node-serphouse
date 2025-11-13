import { INodeProperties } from 'n8n-workflow';

export const bingDomainList: INodeProperties = {
	displayName: 'Domain',
	name: 'domain',
	type: 'options',
	default: 'bing.com',
	required: true,
	options: [{ name: 'bing.com', value: 'bing.com' }],
};
