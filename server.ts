/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { parse } from 'node-html-parser';

// Basic in-memory caching.
let cachedExtensions: object[] | null = null;

const server = new McpServer({
  name: 'extension-browser',
  version: '1.0.0',
});

server.registerTool(
  'browse_extensions',
  {
    description: 'Fetches a list of Gemini CLI extensions from the official website.',
    inputSchema: z.object({}).shape,
  },
  async () => {
    if (cachedExtensions) {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(cachedExtensions),
          },
        ],
      };
    }
    const apiResponse = await fetch(
      'https://geminicli.com/extensions/',
    );
    const html = await apiResponse.text();
    const root = parse(html);
    const extensionCards = root.querySelectorAll('.extension-card');
    const extensions = extensionCards.map(card => {
      const name = card.querySelector('.extension-name')?.text.trim();
      const stars = card.querySelector('.star-count')?.text.trim();
      const version = card.querySelector('.version')?.text.trim();
      const owner = card.querySelector('.owner-url')?.text.trim();
      const githubUrl = card.querySelector('.github-button')?.getAttribute('href');
      const description = card.querySelector('.extension-description')?.text.trim();
      return { name, stars, version, owner, githubUrl, description };
    });
    cachedExtensions = extensions;
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(extensions),
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);