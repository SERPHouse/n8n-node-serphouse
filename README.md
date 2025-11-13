![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-serphouse

This is an n8n community node that lets you use [SERPHouse](https://serphouse.com/) in your n8n workflows.

SERPHouse is a powerful SERP API that allows you to scrape Google, Bing, Yahoo, and other search engines with ease. Get real-time search results, job listings, and comprehensive SERP data.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Prerequisites

You need a SERPHouse account and API key. You can sign up at [serphouse.com](https://serphouse.com/).

## Operations

The SERPHouse node supports the following operations:

### Serp Live Search (POST)

Perform real-time searches across Google, Bing, and Yahoo search engines.

**Supported Search Engines:**

- Google
- Bing
- Yahoo

**Features:**

- Multiple search types: Web, News, Image, Shop
- Device-specific results: Desktop, Tablet, Mobile
- Location targeting
- Date range filtering
- Customizable result count and pagination
- Verbatim search and GFilter options

### Google SERP (Top 100 Results)

Retrieve comprehensive Google search results with up to 100 results per query.

**Features:**

- Multi-page scraping (max_pages parameter)
- Device-specific results: Desktop, Tablet, Mobile
- Location targeting
- Date range filtering
- Verbatim search and GFilter options
- JSON or HTML response formats

### Google Jobs API

Search and retrieve job listings from Google Jobs.

**Features:**

- Location-based job search
- Date range filtering
- Multi-language and domain support
- JSON or HTML response formats

## Credentials

To use this node, you need to configure your SERPHouse API credentials:

1. Go to **Credentials** → **New**
2. Select **SERPHouse API**
3. Enter your API key from your [SERPHouse account](https://www.serphouse.com/home)

## Usage

### Example 1: Basic Search

```
1. Add SERPHouse node to your workflow
2. Select "Serp Live Search (POST)" operation
3. Enter your search query
4. Choose your search engine from Google, Bing and Yahoo
5. Select domain and language
6. Choose your location
7. Execute the node
```

### Example 2: Multi-page SERP Results

```
1. Add SERPHouse node to your workflow
2. Select "Google SERP (Top 100 Results)" operation
3. Enter your search query
4. Configure domain, language, and location
5. In Additional Fields, set "Max Pages" to desired value
6. Execute the node to get comprehensive results
```

### Example 3: Google Jobs Search

```
1. Add SERPHouse node to your workflow
2. Select "Google Jobs API" operation
3. Enter job search query (e.g., "software engineer")
4. Select domain and language
5. Choose location
6. Optionally add date range filtering
7. Execute the node
```

## Resources

- [SERPHouse API Documentation](https://docs.serphouse.com/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [SERPHouse Website](https://serphouse.com/)

## Version History

### 1.0.0

- Initial release
- Serp Live Search (POST) operation
- Google SERP (Top 100 Results) operation
- Google Jobs API operation

## License

[MIT](LICENSE.md)

## Support

For issues or questions:

- Contact SERPHouse support at [serphouse.com/contact-us](https://www.serphouse.com/contact-us)

## Resources

- **[n8n Node Documentation](https://docs.n8n.io/integrations/creating-nodes/)** - Complete guide to building nodes
- **[n8n Community Forum](https://community.n8n.io/)** - Get help and share your nodes
- **[@n8n/node-cli Documentation](https://www.npmjs.com/package/@n8n/node-cli)** - CLI tool reference
- **[n8n Creator Portal](https://creators.n8n.io/nodes)** - Submit your node for verification
- **[Submit Community Nodes Guide](https://docs.n8n.io/integrations/creating-nodes/deploy/submit-community-nodes/)** - Verification requirements and process

## Contributing

Have suggestions for improving this starter? [Open an issue](https://github.com/n8n-io/n8n-nodes-starter/issues) or submit a pull request!

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
