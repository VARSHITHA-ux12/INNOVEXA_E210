# AI Web Assistant Extension

A universal AI-powered browser extension that provides intelligent website navigation assistance, context-aware guidance, and autonomous task completion across any website without requiring site-specific coding.

## 🌟 Features

### 🔍 **Intelligent Website Analysis**
- Automatically analyzes website structure, layout, and interactive elements
- Identifies forms, navigation menus, content areas, and interactive components
- Provides real-time page complexity scoring and accessibility analysis

### 🗣️ **Natural Language Interaction**
- Communicate with the AI assistant using natural language queries
- Get contextual help and guidance for any website
- Multi-turn conversations with context awareness

### 🧭 **Step-by-Step Guidance**
- Interactive tutorials for complex website tasks
- Visual highlighting of important elements
- Progress tracking for multi-step processes

### 🤖 **Autonomous Task Execution**
- AI can perform actions on your behalf with confirmation
- Automated form filling and navigation
- Safe execution with undo capabilities

### 🎯 **Quick Actions**
- One-click access to common tasks
- Find forms, highlight navigation, search content
- Context-aware suggestions based on current page

### 📊 **Website Insights**
- Detailed page analysis and structure visualization
- Accessibility scoring and recommendations
- Performance metrics and optimization suggestions

## 🚀 Installation

### Chrome/Edge Installation

1. **Download the Extension**
   - Clone or download this repository
   - Extract to a local directory

2. **Load in Developer Mode**
   - Open Chrome/Edge and navigate to `chrome://extensions`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the extension directory

3. **Verify Installation**
   - The AI Web Assistant icon should appear in your toolbar
   - Click the icon to open the extension popup

### Firefox Installation

1. **Download the Extension**
   - Clone or download this repository
   - Extract to a local directory

2. **Load as Temporary Add-on**
   - Open Firefox and navigate to `about:debugging`
   - Click "This Firefox"
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file

3. **Verify Installation**
   - The AI Web Assistant icon should appear in your toolbar

## 🎯 Usage

### Getting Started

1. **Click the Extension Icon**
   - Click the AI Web Assistant icon in your browser toolbar
   - The extension will analyze the current page automatically

2. **Choose Your Interaction Method**
   - **Quick Actions**: Click one of the preset buttons for common tasks
   - **Natural Language Chat**: Type your question or request in the chat input
   - **Guided Tasks**: Let the AI guide you through complex processes

3. **Follow AI Guidance**
   - Watch for highlighted elements on the page
   - Follow step-by-step instructions
   - Confirm actions when prompted

### Quick Actions

- **Find Forms**: Highlights all form elements on the page
- **Navigation**: Shows website navigation structure
- **Search Content**: Helps locate search functionality
- **Get Help**: Provides contextual assistance

### Natural Language Examples

```
"Help me fill out this contact form"
"Where is the login button?"
"Search for products under $50"
"Show me the main navigation menu"
"How do I change my password?"
"Fill in my email address"
"Click the submit button"
```

### Task Templates

The extension provides guided workflows for common tasks:

- **Login Forms**: Step-by-step login assistance
- **Contact Forms**: Guided contact form completion
- **Website Search**: Help with finding and using search features
- **Navigation Guide**: Website structure exploration

## 🔧 Development

### Project Structure

```
ai-web-assistant/
├── manifest.json              # Extension configuration
├── background.js              # Background service worker
├── popup/
│   ├── popup.html            # Popup interface
│   ├── popup.js              # Popup functionality
│   └── popup.css             # Popup styles
├── content/
│   ├── content.js            # Main content script
│   ├── element-finder.js     # Element discovery module
│   ├── task-assistant.js     # Task guidance system
│   ├── ui-injector.js        # UI injection module
│   └── content.css           # Content script styles
├── utils/
│   ├── browser-api.js        # Cross-browser API wrapper
│   ├── storage-manager.js    # Data persistence
│   ├── message-handler.js    # Inter-component communication
│   └── ai-processor.js       # AI response processing
├── assets/
│   ├── icons/                # Extension icons
│   └── images/               # UI images and graphics
└── README.md                 # This file
```

### Building from Source

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ai-web-assistant.git
   cd ai-web-assistant
   ```

2. **Install Dependencies**
   - No build dependencies required - pure HTML/CSS/JavaScript

3. **Load in Browser**
   - Follow installation instructions above

### Development Guidelines

- **Manifest V3**: Uses modern Chrome extension architecture
- **Cross-Browser**: Compatible with Chrome, Firefox, Edge, Safari
- **Modular Design**: Clean separation of concerns
- **Security First**: Minimal permissions, secure messaging
- **Performance**: Optimized for fast loading and smooth operation

## 🔒 Privacy & Security

### Data Collection
- **No Personal Data**: The extension does not collect or transmit personal information
- **Local Processing**: AI analysis happens locally when possible
- **Minimal Permissions**: Only requests essential browser permissions

### Security Measures
- **Content Security Policy**: Strict CSP to prevent XSS attacks
- **Secure Messaging**: Encrypted communication between extension components
- **Input Validation**: All user inputs are sanitized
- **Permission Model**: Follows principle of least privilege

### Privacy Features
- **No Tracking**: No user behavior tracking or analytics
- **Local Storage**: Data stored locally on your device
- **User Control**: Easy data deletion and privacy controls
- **Transparent**: Clear privacy policy and data usage explanation

## 🛠️ Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 88+ | ✅ Full Support |
| Firefox | 109+ | ✅ Full Support |
| Edge | 88+ | ✅ Full Support |
| Safari | 14+ | ⚠️ Limited Support |

## 🐛 Troubleshooting

### Common Issues

**Extension Not Loading**
- Ensure you're using a supported browser version
- Check that all files are in the extension directory
- Verify manifest.json is valid JSON

**Page Analysis Not Working**
- Ensure the extension has permission to access the page
- Try refreshing the page
- Check browser console for errors

**AI Responses Slow**
- AI processing happens locally - performance depends on your device
- Close unnecessary browser tabs
- Check for conflicting extensions

**Highlights Not Showing**
- Ensure the page isn't blocking external styles
- Try refreshing the page
- Check if the page uses frames/iframes

### Debug Mode

Enable debug logging:
1. Right-click the extension icon
2. Select "Inspect popup"
3. Check the console for detailed logs

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across multiple browsers
5. Submit a pull request

### Code Style

- Use modern JavaScript (ES6+)
- Follow consistent indentation (2 spaces)
- Add comments for complex logic
- Maintain cross-browser compatibility

## 📈 Roadmap

### Version 1.1 (Coming Soon)
- [ ] Enhanced AI language understanding
- [ ] Support for more website types
- [ ] Improved accessibility features
- [ ] Performance optimizations

### Version 1.2 (Future)
- [ ] Voice interaction support
- [ ] Multi-language support
- [ ] Advanced automation features
- [ ] Integration with popular web services

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by accessibility and usability best practices
- Thanks to the open-source community for libraries and tools

## 📞 Support

- **Documentation**: [Full documentation](docs/)
- **Issues**: [GitHub Issues](https://github.com/your-username/ai-web-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ai-web-assistant/discussions)
- **Email**: support@ai-web-assistant.com

---

**Made with ❤️ for a more accessible web**