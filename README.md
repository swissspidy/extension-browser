# Gemini CLI Extension Browser

This extension allows you to browse and recommend other Gemini CLI extensions based on your prompts and usage patterns.

## Features

- **Browse Extensions:** Use the `browse_extensions` tool to get a list of all available Gemini CLI extensions from the official website.
- **Get Recommendations:** The extension analyzes your prompts and recommends the most relevant extensions to help you accomplish your tasks more efficiently.

## Installation

To install the Extension Browser, run the following command:

```bash
gemini extensions install https://github.com/swissspidy/extension-browser
```

## Usage

Once installed, the extension will automatically analyze your prompts and suggest relevant extensions when appropriate. You can also manually trigger the extension by using the `browse_extensions` tool in your prompts.

### Example

> @gemini I need to work with my Chrome browser, is there an extension for that?

Based on this prompt, the extension would recommend the `chrome-devtools-mcp` extension.

## Custom Commands

This extension also includes a custom command to make it easier to install other extensions.

### /ext:install

Easily install Gemini CLI extensions.

#### Example

```text
/ext:install https://github.com/user/repo
```
