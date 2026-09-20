# AccessiBuild Browser Extension MVP

## Load the extension in Chrome or Edge

1. Start the analysis backend from the project root:

   ```bash
   python api_analyze.py
   ```

2. Open `chrome://extensions` in Chrome or `edge://extensions` in Edge.
3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Choose the repository's `extension` folder.
6. Open a normal public webpage.
7. Select an accessibility profile and click **Apply profile**.
8. Use **Reset** to remove AccessiBuild changes.
9. Click **Analyze page** to send the page summary to the local backend.

## Current analysis scope

The MVP performs lightweight heuristic checks for:

- Images without an `alt` attribute
- Presence of headings
- Basic presence of buttons and links
- Keyboard-navigation recommendation

The analysis is not a complete WCAG audit or certification.

## Known browser limitations

The extension cannot inject content scripts into some protected pages, including browser settings pages, extension stores, and certain built-in browser pages. Test on ordinary `http` or `https` websites.
