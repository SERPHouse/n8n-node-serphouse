import {
	ICredentialType,
	INodeProperties,
	IAuthenticateGeneric,
	ICredentialTestRequest,
	Icon,
} from 'n8n-workflow';

export class SerphouseApi implements ICredentialType {
	name = 'serphouseApi';
	displayName = 'SERPHouse API';
	documentationUrl = 'https://docs.serphouse.com/';
	icon: Icon = 'file:serphouse.svg';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.serphouse.com',
			url: '/account/info',
		},
	};
}
