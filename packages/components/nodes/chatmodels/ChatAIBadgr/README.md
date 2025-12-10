# AI Badgr Chat Model

AI Badgr Chat Model integration for Flowise - OpenAI-compatible chat completions API

## Overview

AI Badgr provides an OpenAI-compatible API for chat completions. This integration allows you to use AI Badgr models within Flowise by simply changing the base URL and API key while keeping your existing OpenAI client code.

## Configuration

### API Credentials

1. Obtain your API key from [AI Badgr](https://aibadgr.com)
2. In Flowise, add your AI Badgr API Key as a credential
3. Select the ChatAIBadgr node and connect your credential

### Settings

- **Model Name**: The model to use (e.g., `llama-3.1-8b`)
- **Temperature**: Controls randomness (0-2, default: 0.9)
- **BasePath**: API endpoint (default: `https://aibadgr.com/api/v1`)
- **Streaming**: Enable/disable streaming responses
- **Max Tokens**: Maximum tokens in the response
- **Top P**: Nucleus sampling parameter
- **Frequency Penalty**: Reduce repetition
- **Presence Penalty**: Encourage topic diversity

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

resp = client.chat.completions.create(
    model="llama-3.1-8b",
    messages=[{"role": "user", "content": "Hello Badgr"}],
)
print(resp.choices[0].message.content)
```

### Node.js/TypeScript (openai >= 4.x)

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AIBADGR_API_KEY,
  baseURL: "https://aibadgr.com/api/v1",
});

const resp = await client.chat.completions.create({
  model: "llama-3.1-8b",
  messages: [{ role: "user", content: "Hello Badgr" }],
});
console.log(resp.choices[0].message.content);
```

### cURL

```bash
curl -s https://aibadgr.com/api/v1/chat/completions \
  -H "Authorization: Bearer $AIBADGR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model":"llama-3.1-8b",
    "messages":[{"role":"user","content":"Hello Badgr"}]
  }'
```

## Features

- Full OpenAI API compatibility
- Streaming support
- Custom model selection
- Configurable inference parameters
- Optional base URL override

## License

Source code in this repository is made available under the [Apache License Version 2.0](https://github.com/FlowiseAI/Flowise/blob/master/LICENSE.md).
