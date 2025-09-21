import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const GoogleTranslate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ code: 'en', name: 'English', flag: '🇺🇸' });
  const [isTranslateReady, setIsTranslateReady] = useState(false);
  const dropdownRef = useRef(null);
  const translateInitialized = useRef(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'ar', name: 'العربية', flag: '🇦🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize Google Translate
  useEffect(() => {
    // Cleanup any existing Google Translate scripts and elements
    const cleanup = () => {
      const existingScript = document.getElementById('google-translate-script');
      if (existingScript) {
        existingScript.remove();
      }
      
      const existingElement = document.getElementById('google_translate_element');
      if (existingElement) {
        existingElement.innerHTML = '';
      }
      
      // Clear any existing callbacks
      if (window.googleTranslateElementInit) {
        delete window.googleTranslateElementInit;
      }
    };

    const initGoogleTranslate = () => {
      // Only initialize once
      if (translateInitialized.current) {
        return;
      }

      cleanup();

      // Set up the callback function first
      window.googleTranslateElementInit = () => {
        try {
          console.log('Initializing Google Translate...');
          
          // Create the translate element with different configuration
          const translateElement = new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: languages.map(lang => lang.code).join(','),
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true,
            gaTrack: false,
            gaId: null
          }, 'google_translate_element');

          console.log('Google Translate initialized successfully');
          translateInitialized.current = true;

          // Wait a bit longer for the widget to fully load
          setTimeout(() => {
            setIsTranslateReady(true);
            
            // Hide all Google Translate UI elements
            const elementsToHide = [
              '.goog-te-banner-frame',
              '.goog-te-gadget',
              '#google_translate_element',
              '.goog-logo-link',
              '.goog-te-balloon-frame',
              '.goog-te-ftab'
            ];

            elementsToHide.forEach(selector => {
              const elements = document.querySelectorAll(selector);
              elements.forEach(el => {
                if (el) {
                  el.style.display = 'none';
                  el.style.visibility = 'hidden';
                  el.style.opacity = '0';
                }
              });
            });

            // Reset body styles that Google Translate might add
            document.body.style.top = '0px';
            document.body.style.position = 'static';
            document.documentElement.style.top = '0px';
            
            // Check if we have any existing translation cookies
            const existingCookie = document.cookie
              .split('; ')
              .find(row => row.startsWith('googtrans='));
            
            if (existingCookie) {
              const langCode = existingCookie.split('=')[1].split('/')[2];
              if (langCode && langCode !== 'en') {
                const lang = languages.find(l => l.code === langCode);
                if (lang) {
                  setSelectedLang(lang);
                }
              }
            }
            
            console.log('Google Translate setup completed');
          }, 1000);

        } catch (error) {
          console.error('Error initializing Google Translate:', error);
          setIsTranslateReady(false);
        }
      };

      // Load the Google Translate script
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      
      script.onload = () => {
        console.log('Google Translate script loaded');
      };
      
      script.onerror = () => {
        console.error('Failed to load Google Translate script');
      };

      document.head.appendChild(script);
    };

    // Initialize with a small delay to ensure DOM is ready
    const timer = setTimeout(initGoogleTranslate, 100);

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  // Function to trigger translation using direct API calls
  const triggerTranslation = (langCode) => {
    console.log(`Attempting to translate to: ${langCode}`);
    
    // Method 1: Try to use Google Translate's direct API
    if (window.google && window.google.translate) {
      try {
        // Try to get the translate element instance
        const widgets = window.google.translate._widgetsByOrigin;
        if (widgets) {
          const origin = Object.keys(widgets)[0];
          if (origin && widgets[origin] && widgets[origin].length > 0) {
            const widget = widgets[origin][0];
            if (widget && widget.translatePage) {
              console.log('Using direct translatePage method');
              widget.translatePage('en', langCode, () => {
                console.log(`Successfully translated to ${langCode}`);
              });
              return true;
            }
          }
        }

        // Method 2: Try to trigger translation by changing the cookie
        const cookieName = 'googtrans';
        const cookieValue = `/en/${langCode}`;
        document.cookie = `${cookieName}=${cookieValue}; path=/; domain=${window.location.hostname}`;
        
        // Reload the page to apply translation
        console.log('Setting translation cookie and reloading');
        setTimeout(() => {
          window.location.reload();
        }, 100);
        
        return true;
      } catch (error) {
        console.error('Error with direct translation methods:', error);
      }
    }

    // Method 3: Try to find and trigger the select element with extended search
    const maxRetries = 15;
    let retryCount = 0;

    const attemptSelectTranslation = () => {
      // Extended search for select elements
      const selectors = [
        '.goog-te-combo',
        'select.goog-te-combo',
        '#google_translate_element select',
        '[id*="google_translate"] select',
        '.goog-te-gadget select',
        'iframe[id*="google_translate"] + select',
        'select[class*="goog"]'
      ];

      let selectElement = null;
      for (const selector of selectors) {
        selectElement = document.querySelector(selector);
        if (selectElement) break;
      }

      // Also check inside iframes
      if (!selectElement) {
        const iframes = document.querySelectorAll('iframe[id*="google"], iframe[src*="translate"]');
        for (const iframe of iframes) {
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            selectElement = iframeDoc.querySelector('select');
            if (selectElement) break;
          } catch (e) {
            // Cross-origin iframe, can't access
          }
        }
      }

      if (selectElement) {
        console.log('Found Google Translate select element:', selectElement);
        selectElement.value = langCode;
        
        // Trigger multiple events
        const events = ['change', 'input', 'click', 'focus', 'blur'];
        events.forEach(eventType => {
          const event = new Event(eventType, { 
            bubbles: true, 
            cancelable: true 
          });
          selectElement.dispatchEvent(event);
        });

        console.log(`Translation triggered for language: ${langCode}`);
        return true;
      } else {
        retryCount++;
        if (retryCount < maxRetries) {
          console.log(`Google Translate select element not found, attempt ${retryCount}/${maxRetries}`);
          setTimeout(attemptSelectTranslation, 300);
        } else {
          console.error('Could not find Google Translate select element after maximum retries');
          // Fallback: try cookie method
          const cookieValue = `/en/${langCode}`;
          document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
          console.log('Fallback: Set translation cookie, page refresh may be needed');
        }
        return false;
      }
    };

    return attemptSelectTranslation();
  };

  const handleLanguageSelect = (language) => {
    setSelectedLang(language);
    setIsOpen(false);

    console.log(`Language selected: ${language.name} (${language.code})`);

    // Store the selected language in localStorage
    localStorage.setItem('selectedLanguage', JSON.stringify(language));

    // If English is selected, clear any translation cookies and reload
    if (language.code === 'en') {
      // Clear translation cookies
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + window.location.hostname;
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      
      // Reload to show original content
      setTimeout(() => {
        window.location.reload();
      }, 100);
      return;
    }

    if (!isTranslateReady) {
      console.log('Google Translate not ready yet, waiting...');
      // Wait for translate to be ready
      const checkReady = setInterval(() => {
        if (isTranslateReady) {
          clearInterval(checkReady);
          performTranslation(language.code);
        }
      }, 100);
      
      // Clear interval after 10 seconds to avoid infinite loop
      setTimeout(() => clearInterval(checkReady), 10000);
    } else {
      performTranslation(language.code);
    }
  };

  const performTranslation = (langCode) => {
    // Try multiple translation methods
    const success = triggerTranslation(langCode);
    
    if (!success) {
      console.log('Direct translation failed, using cookie + reload method');
      // Fallback: Set cookie and reload
      const cookieValue = `/en/${langCode}`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=${cookieValue}; path=/`;
      
      // Reload the page to apply translation
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  // Load saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      try {
        const lang = JSON.parse(savedLanguage);
        if (lang && languages.find(l => l.code === lang.code)) {
          setSelectedLang(lang);
        }
      } catch (e) {
        console.log('Error loading saved language preference');
      }
    }
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ 
        display: 'none', 
        visibility: 'hidden', 
        opacity: 0, 
        position: 'absolute', 
        top: '-9999px',
        left: '-9999px' 
      }}></div>
      
      {/* Custom Language Selector */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-white rounded-xl px-3 py-2 shadow-sm border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
        title={`Current language: ${selectedLang.name}${!isTranslateReady ? ' (Loading...)' : ''}`}
      >
        <Globe className={`w-4 h-4 mr-2 flex-shrink-0 ${isTranslateReady ? 'text-primary-600' : 'text-gray-400'}`} />
        <span className="hidden sm:inline text-sm font-medium text-gray-700 mr-1">
          {selectedLang.flag}
        </span>
        <span className="text-sm font-medium text-gray-700 flex-1 text-left truncate">
          {selectedLang.name}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 ml-1 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
        {!isTranslateReady && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-1 w-full sm:w-64 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-64 overflow-y-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language)}
              disabled={!isTranslateReady}
              className={`w-full flex items-center px-4 py-3 text-sm transition-colors duration-150 ${
                !isTranslateReady ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-50'
              } ${
                selectedLang.code === language.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
              } ${
                language === languages[0] ? 'rounded-t-xl' : ''
              } ${
                language === languages[languages.length - 1] ? 'rounded-b-xl' : ''
              }`}
            >
              <span className="mr-3 text-base">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
              {selectedLang.code === language.code && (
                <div className="ml-auto w-2 h-2 bg-primary-600 rounded-full"></div>
              )}
            </button>
          ))}
          {!isTranslateReady && (
            <div className="px-4 py-2 text-xs text-gray-500 text-center border-t">
              Loading translation service...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoogleTranslate;
