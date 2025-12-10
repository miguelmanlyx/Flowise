# AI Badgr Embeddings

AI Badgr Embeddings integration for Flowise - OpenAI-compatible embeddings API

## Overview

AI Badgr provides an OpenAI-compatible API for generating text embeddings. This integration allows you to use AI Badgr embedding models within Flowise by simply changing the base URL and API key while keeping your existing OpenAI client code.

## Configuration

### API Credentials

1. Obtain your API key from [AI Badgr](https://aibadgr.com)
2. In Flowise, add your AI Badgr API Key as a credential
3. Select the AI Badgr Embeddings node and connect your credential

### Settings

- **Model Name**: The embedding model to use (e.g., `text-embedding-3-small`)
- **BasePath**: API endpoint (default: `https://aibadgr.com/api/v1`)
- **Dimensions**: Output dimensions for the embeddings (optional)
- **Strip New Lines**: Remove newline characters from input
- **Batch Size**: Number of texts to embed in a single request
- **Timeout**: Request timeout in milliseconds

## 🌱 Env Variables

| Variable          | Description                          | Type   | Default |
| ----------------- | ------------------------------------ | ------ | ------- |
| AIBADGR_API_KEY   | Default API key for AI Badgr         | String |         |

## Usage Examples

### Python (openai >= 1.x)

```python
from openai import OpenAI
import os

client = OpenAI(
    api_key=os.getenv("AIBADGR_API_KEY"),
    base_url="https://aibadgr.com/api/v1",
)

response = client.embeddings.create(
    model="text-embedding-3-small",
    input="Your text to embed",
)
print(response.data[0].embedding)
```

### Node.js/TypeScript (openai >= 4.x)

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AIBADGR_API_KEY,
  baseURL: "https://aibadgr.com/api/v1",
});

const response = await client.embeddings.create({
  model: "text-embedding-3-small",
  input: "Your text to embed",
});
console.log(response.data[0].embedding);
```

### cURL

```bash
curl -s https://aibadgr.com/api/v1/embeddings \
  -H "Authorization: Bearer $AIBADGR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model":"text-embedding-3-small",
    "input":"Your text to embed"
  }'
```

## Features

- Full OpenAI embeddings API compatibility
- Support for custom embedding dimensions
- Batch processing support
- Configurable timeout and batch size
- Optional base URL override

## License

Source code in this repository is made available under the [Apache License Version 2.0](https://github.com/FlowiseAI/Flowise/blob/master/LICENSE.md).
