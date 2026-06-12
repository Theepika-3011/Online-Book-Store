# Clean, Local-First Bookstore App (No API Key Required!)

This is an elegant, interactive Bookstore storefront built entirely as a client-side React application. It runs 100% locally in your web browser with **zero backend dependencies**, meaning **you do not need any Gemini API keys** or external servers to run it!

All data (catalog, custom reviews, shopping cart, and order checkout details) are safely persisted in your browser's `LocalStorage`.

---

## How to Extract and Run on Your Computer

Follow these simple steps to run the application on your local machine:

### Prerequisite
Ensure you have **Node.js** (v18 or higher recommended) installed on your computer. You can download it for free from [nodejs.org](https://nodejs.org/).

### Steps

1. **Extract the ZIP Folder**
   - Locate your downloaded ZIP file.
   - Right-click and choose **Extract All...** (Windows) or double-click to unzip (Mac).
   - Move the unzipped folder to a convenient directory on your computer (e.g., your Desktop or Documents).

2. **Open Your Terminal or Command Prompt**
   - **On Windows:** Press `Win + R`, type `cmd`, and press Enter. Then navigate to your project directory. For example:
     ```bash
     cd C:\Users\YourName\Desktop\Bookstore
     ```
   - **On Mac or Linux:** Open the Terminal app, type `cd ` (with a trailing space), and drag-and-drop the unzipped folder from Finder/Files into the terminal window, then press Enter.

3. **Install Dependencies**
   Run the following command in your terminal to download the necessary files:
   ```bash
   npm install
   ```

4. **Start the Local Development Server**
   Start the fast Vite local server by running:
   ```bash
   npm run dev
   ```

5. **Interact with Your App**
   The terminal will output a URL like:
   `http://localhost:3000` or `http://localhost:5173`
   
   Hold `Ctrl` and click the link, or copy and paste it into your web browser (Chrome, Edge, Safari, Firefox) to experience your personalized storefront!

---

## Managing Your Project

- **Development Build:** Live changes will automatically refresh your browser room.
- **Production Build:** If you want to bundle your app into static assets for free web hosting (such as GitHub Pages or Vercel), run:
  ```bash
  npm run build
  ```
  This creates a highly optimized `dist` folder containing standard static web files (`index.html`, Javascript, CSS) that you can upload anywhere.
