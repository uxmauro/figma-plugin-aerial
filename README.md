# Aerial

Aerial is a plugin for [Figma](https://www.figma.com) that allows users to select any object, a frame, section or image. Through a bird's-eye manipulate the viewport to navigate and explore your design with ease and precision.

## Getting Started

If you are new to Figma plugins, check out the [plugin documentation](https://www.figma.com/plugin-docs/).

### Install Dependencies

1. Install Node.js: https://nodejs.org/en/download/
2. Install TypeScript: `npm install -g typescript`
3. Install project dependencies: `npm install`

### Development

1. Start the TypeScript compiler: `npm run watch`
2. Open the plugin in Figma: `figma plugin --development`

### Build

1. Build the plugin: `npm run build`

### Publish

1. Create a new release on GitHub.
2. Update the `name` and `version` fields in the `package.json` file.
3. Run `npm publish` to publish the new version to the npm registry.
4. Go to the Figma plugin page and click the "Update" button.

## Contributing

Contributions are welcome! Please open a pull request with your changes.

## License

Aerial is licensed under the MIT license.
