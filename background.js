// Background Service Worker for AI Web Assistant Extension
// Handles AI processing, message routing, and extension coordination

class BackgroundService {
  constructor() {
    this.aiEndpoint = 'https://api.openai.com/v1/chat/completions';
    this.sessionData = new Map();
    this.initializeService();
  }

  async initializeService() {
    console.log('AI Web Assistant Background Service Starting...');
    
    // Set up message listeners
    chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
    
    // Set up connection listeners for long-lived connections
    chrome.runtime.onConnect.addListener(this.handleConnection.bind(this));
    
    // Initialize storage
    await this.initializeStorage();
    
    console.log('AI Web Assistant Background Service Ready');
  }

  async initializeStorage() {
    const defaultSettings = {
      aiProvider: 'openai',
      language: 'en',
      guidanceMode: 'guided', // 'guided' or 'autonomous'
      autoAnalyze: true,
      soundEnabled: true,
      theme: 'light'
    };

    const stored = await chrome.storage.sync.get('settings');
    if (!stored.settings) {
      await chrome.storage.sync.set({ settings: defaultSettings });
    }
  }

  handleMessage(message, sender, sendResponse) {
    const { type, data } = message;
    
    switch (type) {
      case 'ANALYZE_WEBSITE':
        this.analyzeWebsite(data, sender.tab.id).then(sendResponse);
        return true; // Keep message channel open for async response
        
      case 'PROCESS_AI_QUERY':
        this.processAIQuery(data, sender.tab.id).then(sendResponse);
        return true;
        
      case 'EXECUTE_ACTION':
        this.executeAction(data, sender.tab.id).then(sendResponse);
        return true;
        
      case 'GET_SETTINGS':
        this.getSettings().then(sendResponse);
        return true;
        
      case 'UPDATE_SETTINGS':
        this.updateSettings(data).then(sendResponse);
        return true;
        
      case 'GET_SESSION_DATA':
        this.getSessionData(sender.tab.id).then(sendResponse);
        return true;
        
      default:
        console.warn('Unknown message type:', type);
        sendResponse({ error: 'Unknown message type' });
    }
  }

  handleConnection(port) {
    console.log('New connection established:', port.name);
    
    port.onMessage.addListener((message) => {
      this.handlePortMessage(message, port);
    });
    
    port.onDisconnect.addListener(() => {
      console.log('Connection disconnected:', port.name);
    });
  }

  async handlePortMessage(message, port) {
    const { type, data } = message;
    
    switch (type) {
      case 'STREAM_AI_RESPONSE':
        await this.streamAIResponse(data, port);
        break;
        
      case 'CANCEL_AI_REQUEST':
        this.cancelAIRequest(data.requestId);
        break;
        
      default:
        port.postMessage({ error: 'Unknown port message type' });
    }
  }

  async analyzeWebsite(data, tabId) {
    try {
      console.log('Analyzing website structure for tab:', tabId);
      
      // Store analysis data for the session
      this.sessionData.set(tabId, {
        url: data.url,
        timestamp: Date.now(),
        structure: data.structure,
        elements: data.elements,
        navigation: data.navigation
      });

      // Process the structure with AI to understand the website
      const aiContext = this.generateAIContext(data);
      
      return {
        success: true,
        analysis: data,
        context: aiContext,
        message: 'Website analysis completed successfully'
      };
      
    } catch (error) {
      console.error('Error analyzing website:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async processAIQuery(data, tabId) {
    try {
      console.log('Processing AI query:', data.query);
      
      const session = this.sessionData.get(tabId);
      if (!session) {
        throw new Error('No website analysis found for this tab');
      }

      // Prepare context for AI
      const aiContext = this.generateAIContext(session);
      
      // Process query with AI (simulated for demo)
      const aiResponse = await this.callAIAPI(data.query, aiContext);
      
      // Determine required actions based on AI response
      const actions = this.determineActions(aiResponse, session);
      
      return {
        success: true,
        response: aiResponse,
        actions: actions,
        context: aiContext
      };
      
    } catch (error) {
      console.error('Error processing AI query:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async executeAction(data, tabId) {
    try {
      console.log('Executing action:', data.action, 'for tab:', tabId);
      
      // Send action to content script for execution
      const response = await chrome.tabs.sendMessage(tabId, {
        type: 'EXECUTE_ACTION',
        action: data.action,
        target: data.target,
        parameters: data.parameters
      });
      
      return response;
      
    } catch (error) {
      console.error('Error executing action:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async callAIAPI(query, context) {
    // Simulated AI response for demonstration
    // In production, this would call actual AI API
    
    const responses = [
      "I can help you with that. Let me guide you through the process step by step.",
      "Based on the website structure, I can see several ways to accomplish this task.",
      "I'll highlight the relevant elements on the page for you to interact with.",
      "This appears to be a multi-step process. Would you like me to guide you through each step?",
      "I can perform this action for you. Please confirm you'd like me to proceed."
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      text: response,
      confidence: 0.85,
      intent: 'assistance',
      suggestedActions: ['highlight', 'guide', 'explain']
    };
  }

  generateAIContext(sessionData) {
    const { structure, elements, navigation } = sessionData;
    
    return {
      pageType: this.determinePageType(structure),
      primaryElements: elements.slice(0, 10), // Top 10 elements
      navigationPaths: navigation,
      forms: elements.filter(el => el.type === 'form'),
      interactiveElements: elements.filter(el => el.interactive),
      contentAreas: elements.filter(el => el.type === 'content'),
      estimatedComplexity: this.calculateComplexity(elements)
    };
  }

  determinePageType(structure) {
    // Analyze page structure to determine type
    if (structure.hasForm && structure.hasProducts) return 'ecommerce';
    if (structure.hasNavigation && structure.hasContent) return 'content';
    if (structure.hasLogin || structure.hasForm) return 'form';
    return 'general';
  }

  calculateComplexity(elements) {
    // Calculate website complexity score
    const interactiveCount = elements.filter(el => el.interactive).length;
    const nestingLevels = Math.max(...elements.map(el => el.depth || 0));
    return Math.min(10, Math.floor((interactiveCount + nestingLevels) / 5));
  }

  determineActions(aiResponse, session) {
    const actions = [];
    
    if (aiResponse.intent === 'navigation') {
      actions.push({ type: 'highlight', target: 'navigation' });
    }
    
    if (aiResponse.intent === 'form') {
      actions.push({ type: 'highlight', target: 'forms' });
    }
    
    if (aiResponse.confidence > 0.8) {
      actions.push({ type: 'suggest_automation' });
    }
    
    return actions;
  }

  async streamAIResponse(data, port) {
    try {
      const { query, context } = data;
      
      // Simulate streaming AI response
      const fullResponse = "I'll help you navigate this website. Let me analyze the current page structure and provide you with the best guidance. I can highlight important elements, guide you through forms, or perform actions on your behalf.";
      
      const words = fullResponse.split(' ');
      let currentResponse = '';
      
      for (let i = 0; i < words.length; i++) {
        currentResponse += (i > 0 ? ' ' : '') + words[i];
        
        port.postMessage({
          type: 'STREAM_CHUNK',
          data: {
            text: currentResponse,
            complete: false,
            wordCount: i + 1,
            totalWords: words.length
          }
        });
        
        // Simulate natural typing delay
        await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100));
      }
      
      // Send completion signal
      port.postMessage({
        type: 'STREAM_COMPLETE',
        data: {
          text: currentResponse,
          complete: true,
          wordCount: words.length,
          totalWords: words.length
        }
      });
      
    } catch (error) {
      port.postMessage({
        type: 'STREAM_ERROR',
        error: error.message
      });
    }
  }

  cancelAIRequest(requestId) {
    console.log('Cancelling AI request:', requestId);
    // Implementation for cancelling ongoing AI requests
  }

  async getSettings() {
    try {
      const result = await chrome.storage.sync.get('settings');
      return result.settings || {};
    } catch (error) {
      console.error('Error getting settings:', error);
      return {};
    }
  }

  async updateSettings(newSettings) {
    try {
      await chrome.storage.sync.set({ settings: newSettings });
      return { success: true };
    } catch (error) {
      console.error('Error updating settings:', error);
      return { success: false, error: error.message };
    }
  }

  getSessionData(tabId) {
    const session = this.sessionData.get(tabId);
    return session || null;
  }
}

// Initialize the background service
const backgroundService = new BackgroundService();

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('AI Web Assistant installed:', details.reason);
  
  if (details.reason === 'install') {
    // Show welcome page
    chrome.tabs.create({
      url: chrome.runtime.getURL('docs/welcome.html')
    });
  }
});

// Handle tab updates to clean up session data
chrome.tabs.onRemoved.addListener((tabId) => {
  backgroundService.sessionData.delete(tabId);
});

// Handle tab updates to re-analyze if needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Clean up old session data for navigation
    backgroundService.sessionData.delete(tabId);
  }
});

console.log('AI Web Assistant Background Service Loaded');