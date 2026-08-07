# Open-Source Custom Accessibility Plugin

A highly customizable, responsive, and performance-optimized accessibility menu for websites. Inspired by modern structures and adapted for complete vendor integration flexibility.

## Features

- **Dynamic Localization:** Built-in translation layers for English, Hebrew, Spanish, and French (Right-to-Left styling automatically supported).
- **Flexible Deployment:** Website operators can explicitly declare the layout placement, primary design token accent coloring, and shape format.
- **Terms & Legal Transparency:** Forces a structured disclaimer acceptance validation barrier before full accessibility suite exposure.
- **7 Accessibility Actions:** High contrast, monochrome, large cursor, stop animations, enlarge text, text spacing, and line height.

## Quick Installation

1. Clone or download this public directory.
2. Link the style sheet inside your document header:

   ```html
   <link rel="stylesheet" href="path/to/accessibility.css">
   ```

3. Load and initialize the script object right before your closing body tag:

   ```html
   <script src="path/to/accessibility.js"></script>
   <script>
       new AccessibilityPlugin({
           position: 'bottom-right',
           primaryColor: '#0056b3',
           defaultLanguage: 'en',
           iconShape: 'circle'
       });
   </script>
   ```

## Configuration Options

| Option            | Values                                             | Default        |
|-------------------|----------------------------------------------------|----------------|
| `position`        | `top-left`, `top-right`, `bottom-left`, `bottom-right` | `bottom-right` |
| `primaryColor`    | Any CSS color                                      | `#0056b3`      |
| `defaultLanguage` | `en`, `he`, `es`, `fr`                             | `en`           |
| `iconShape`       | `circle`, `square`                                 | `circle`       |

## Local Demo

Open `index.html` in your browser to test the plugin with the default Hebrew configuration.

## Contribution & Shared Development

This package is fully open to collaborative modifications. Feel free to fork, expand functionality, and create Pull Requests with love!
