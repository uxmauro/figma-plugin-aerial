# Aerial


![Aerial Thumbnail](https://github.com/user-attachments/assets/4d7e37c1-ad03-46af-bb07-b782a14aa01e)

Aerial is a plugin for [Figma](https://www.figma.com) that allows users to select any object, a frame, section or image. Through a bird's-eye manipulate the viewport to navigate and explore your designs.

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


## Known  Bugs

- Zoom manipulation does not align with the indicator
- Zoom controls are mismatched
- Indicator position is inconsistent with drag position and zoom level
- Some frames or images fail to load properly


## License

Aerial is licensed under the MIT license.
