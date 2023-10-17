# Tab Saver Chrome Extension (v0.1.0)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [License](#license)

## Overview

Tab Saver is a handy Chrome extension that simplifies the management of your open browser tabs. With Tab Saver, you can effortlessly save and restore Tab Groups, making it easy to switch between different workspaces, tasks, or projects. Say goodbye to the hassle of manually bookmarking and reopening tabs.

## Features

- **Save Tab Groups:** Save your current set of open tabs as a "Tab Group" with a custom title. This is particularly useful when you want to preserve your current workspace for later use.

- **Restore Tab Groups:** Easily restore a previously saved Tab Group. Restoring a Tab Group will open all the saved links in the current browser window, helping you pick up where you left off.

## Installation

1. **Clone the Repository:**

   - Clone the Tab Saver Chrome extension repository to your local machine:

   ```bash
   git clone https://github.com/dwayne314/tab-saver.git
   ```

2. **Navigate to the Project Directory:**

   - Open your terminal and navigate to the project directory:

     ```bash
     cd tab-saver
     ```

3. **Install Dependencies:**

   - Install the required Node.js dependencies using npm:

     ```bash
     npm install
     ```

   This will download and install all the necessary packages and dependencies for the extension.

4. **Build the Extension:**

   - Build the extension using the following command:

     ```bash
     npm run build
     ```

   This command will generate the necessary build files in a `/build` folder.

5. **Enable Developer Mode in Chrome:**

   - Open Google Chrome.

   - Go to `chrome://extensions/` in your browser.

   - Enable the "Developer mode" option in the top-right corner of the Extensions page.

6. **Load the Extension:**

   - Click on the "Load unpacked" button.

   - Select the folder where you extracted the extension files.

7. **Extension Installed:**
   - Tab Saver should now be installed and accessible from your Chrome browser.

## How to Use

### Saving a Tab Group

1. Click on the Tab Saver icon in the Chrome toolbar.

2. Click on the "Save Tabs" button.

3. Enter a custom title for your Tab Group, such as "Work," "Research," or "Project A." and select if only the current window links should be saved.

4. Click the "Save" button to store your current open tabs as a Tab Group.

### Restoring a Tab Group

1. Click on the Tab Saver icon in the Chrome toolbar.

2. Click on the "View Tabs" button.

3. Select a Tab Group from the list of saved groups.

4. Click the "Restore" button for the Tab Group that you want to open.

5. All tabs from the selected group will open in your current browser window.

### Deleting a Tab Group

1. Click on the Tab Saver icon in the Chrome toolbar.

2. Click on the "View Tabs" button.

3. Select a Tab Group from the list of saved groups.

4. Click the "Delete" button for the Tab Group that you want to remove.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

**Tab Saver Chrome Extension** is developed by Dwayne Manlove. If you encounter any issues or have suggestions for improvement, please [submit an issue](https://github.com/dwayne314/tab-saver/issues).

[GitHub Repository](https://github.com/dwayne314/tab-saver)
