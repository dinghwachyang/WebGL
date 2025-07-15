# WebGL Project

This project is a simple WebGL application that demonstrates the basics of rendering graphics using WebGL.

## Project Structure

```
WebGL
├── src
│   ├── index.html       # Main HTML file that sets up the WebGL context
│   └── main.js          # Main JavaScript file for WebGL rendering logic
├── LICENSE              # License information for the project
└── README.md            # Documentation for the project
```

## Getting Started

To run this project, follow these steps:

1. **Clone the repository** (if applicable):
   ```
   git clone <repository-url>
   cd WebGL
   ```

2. **Open the `index.html` file** in a web browser. This file will load the `main.js` script and initialize the WebGL context.

3. **Ensure your browser supports WebGL**. Most modern browsers do, but you can check your browser's compatibility if you encounter issues.

4. **How to Run project?
   Open cmd, and typing "node index.js"  or  "npm run start"

## Usage

- The `main.js` file contains the logic for initializing the WebGL context, setting up the rendering loop, and drawing graphics.
- You can modify the `main.js` file to experiment with different rendering techniques and graphics.

Browserify打包
1. 安装 npm install -g browserify
2. 生成 browserify src/main.js -o dist/bundle.js
3. 配置 <script src="dist/bundle.js"></script>

## License

This project is licensed under the MIT License. See the LICENSE file for more details.