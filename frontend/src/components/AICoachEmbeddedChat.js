import React, { useEffect, useRef } from "react";

const SCRIPT_ID = "wxo-chat-script";

const AICoachEmbeddedChat = ({ location }) => {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // If already loaded, just initialize the widget
    if (scriptLoadedRef.current) {
      if (window.wxoLoader) {
        try {
          window.wxoLoader.init();
        } catch (error) {
          console.error("Failed to initialize AI Coach widget:", error);
        }
      }
      return;
    }

    // Configure Watsonx Orchestrate widget globally
    window.wxOConfiguration = {
      orchestrationID:
        "20250907-1827-0316-40bd-19b25bae52af_20250907-1827-4190-50ed-be5164ad3b81",
      hostURL: "https://ap-south-1.dl.watson-orchestrate.ibm.com",
      rootElementID: "ai-coach-root",
      chatOptions: {
        agentId: "a31d8aa2-3f71-4b3c-859c-081dbb4b4b5b",
        // Optionally pass context info like location if supported
        // location: location,
      },
    };

    // Prevent duplicate script tags
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = `${window.wxOConfiguration.hostURL}/wxochat/wxoLoader.js?embed=true`;
      script.async = true;

      script.onload = () => {
        scriptLoadedRef.current = true;
        try {
          if (window.wxoLoader) window.wxoLoader.init();
        } catch (error) {
          console.error("Failed to initialize AI Coach widget on load:", error);
        }
      };

      script.onerror = () => {
        console.error("Failed to load Watsonx Orchestrate chat widget script.");
      };

      document.head.appendChild(script);
    }

    // No cleanup to avoid unloading script if component unmounts

  }, [location]);

  return (
    // This div is the container for the AI Coach UI widget
    <div
      id="ai-coach-root"
      style={{
        height: "50px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        // To hide without unmounting: control these styles externally
      }}
    />
  );
};

export default AICoachEmbeddedChat;
