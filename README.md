# Tofu 🍢

[![Documentation Status](https://readthedocs.org/projects/tofujs/badge/?version=latest)](https://tofujs.readthedocs.io/en/latest/?badge=latest)
[![Node.js CI](https://github.com/SirProdigle/Tofu/workflows/Node.js/badge.svg)](https://github.com/SirProdigle/Tofu/actions?query=workflow%3ANode.js)
[![npm version](https://badge.fury.io/js/tofu.svg)](https://badge.fury.io/js/tofu)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Tofu is an opinionated, developer-centric MVC framework for Node.js that aims to streamline your prototyping and development workflow. Inspired by PHP Laravel, Tofu brings structure and simplicity to your Node.js projects.

## 🚀 Why Tofu?

- **Rapid Development**: Tofu's CLI tools and scaffolding capabilities help you set up project structures quickly.
- **Flexibility**: While opinionated, Tofu allows for customization as your project grows.
- **Developer Experience**: Built with DX in mind, Tofu aims to simplify common development tasks.
- **Full-Stack Approach**: Supports both frontend views and backend APIs.

## 🌟 Key Features

### 🏗️ MVC Architecture
- Separation of concerns with Models, Views, and Controllers
- Routing based on controller structure
- Support for API development

### 🛠️ CLI Tools
- Generate controllers, models, middleware, and more with CLI commands
- Project creation wizard for quick setup

### ⏱️ Timer System
- Built-in timer functionality for scheduled tasks
- Ability to create and manage background jobs using a Cron like syntax

### 📡 Event System
- Decentralized Event/listener architecture for decoupled application logic

### 🔒 Middleware Support
- Middleware support at controller level
- Easy to implement custom middleware

### 🗃️ Database Integration
- Basic database connectivity
- Support for MongoDB through Mongoose

### 🔧 Customizable Startup
- Configurable startup process
- Environment-based configuration support

### 🎨 View Engine Options
- Support for multiple view engines (Handlebars, Pug, EJS)
- Ability to switch between view engines

### 📚 Documentation & Examples
- Basic documentation available
- Example files included in the project structure

## 🏁 Quick Start

```bash
npm install -g tofu
tofu create my-awesome-app
cd my-awesome-app
npm install
npm start
```

## 🧰 CLI Commands

Tofu provides several CLI commands to help with development:

```bash
tofu make controller UserController
tofu make model User
tofu make middleware AuthMiddleware
tofu make timer DailyCleanup
tofu make event UserRegistered
```

## 🔧 Configuration

Tofu uses a configuration system based on JavaScript files in the `Config` directory.

## 🔒 Security

Tofu provides some basic security features:

- Helmet.js integration for HTTP headers security
- Express security best practices

## 🧪 Testing

Tofu includes a basic test setup using AVA.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## 💖 Support

If you find Tofu helpful, consider supporting its development:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/L4L43JH5Z)

## 📄 License

Tofu is [MIT licensed](./LICENSE).

---

Tofu: A promising framework for Node.js development, aiming to simplify common tasks and provide a structured approach to building applications. Join us in evolving Node.js development! 🚀🥢
