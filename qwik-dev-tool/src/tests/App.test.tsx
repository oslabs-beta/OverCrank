//  What are usefull tests?
//  Integration Tests:
//      Did the panel get made?
//      Did app mount with topbar, datatree, & metric view
//      Is there an HTML node in the tree view?
//
//  Unit Tests:
//      buildTree function
//			getHTML
//			
//
//  Puppeteer + sinon.Chrome to simulate the test on a chromium page at a given URL
//      (doesn't actually need to be a qwik app to test all the above though)

// VITEST & JSDOM - Mock chrome object:

// import App from '../application/App';
// import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
// import { render, screen } from '@testing-library/react';

// describe('App Render', () => {
//   beforeEach(async () => {
//     const chrome = {};
//     render(<App />);
//   });

//   it('App render should have TopBar component', () => {
//     const chrome = {};
// const topBar = screen.findByTestId('top-bar');
// expect(topBar).toBeDefined();
//   });
// });

// VITEST (MAYBE JEST), PUPPETEER, & SINON-CHROME - Simulate chrome browser environment w/ access to chrome dev tool browser api

import puppeteer from 'puppeteer';
import sinonChrome from 'sinon-chrome';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../application/App';
import path from 'path';

describe(
  'Launch Chromium Env',
  async () => {
    const pathToExtension = path.resolve(__dirname, '../extension/');

    // Initialize sinon-chrome stubs
    global.chrome = sinonChrome as unknown as typeof chrome;


    const browser = await puppeteer.launch({
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });

    // Create new page
    const page = await browser.newPage();
    await page.goto('https://qwik.builder.io');

    // // Open DevTools instance
    // const devtools = await page.target().createCDPSession();
    // console.log('DevTools:', devtools);

    // // Enable runtime
    // await devtools.send('Runtime.enable');

    // // Switch to your extension's panel in the DevTools instance by executing this scrip
    // await devtools.send('Runtime.evaluate', {
    //   expression: `
		// 		new Promise(resolve => {
		// 			const intervalId = setInterval(() => {
		// 				const extensionPanel = Array.from(document.querySelectorAll('.panel')).find(panel => panel.innerText.includes('Qwik Dev Tool'));
		// 				if (extensionPanel) {
		// 					extensionPanel.click();
		// 					clearInterval(intervalId);
		// 					resolve();
		// 				}
		// 			}, 100);
		// 		});
		// 	`,
    //   returnByValue: true,
    // });

   
    test('Render React Application to Document(I think) and Check for TopBar Id on Screen', () => {
      render(<App />);
      const topBar = screen.getByTestId('top-bar');
      expect(topBar).toBeDefined();
    });

    test('Render App Component to Document(I think) and Check for FAILURE Id on Screen', () => {
      render(<App />);
      const topBar = screen.getByTestId('FAILURE');
    });

    // await browser.close();
  },
  { timeout: 100000 }
);

//	JSDom is set as the environment for testing in the viteconfig and allows the test to use the document object
//
//  Puppeteer spins up a a chromium browser and goes to a designated page
//
//  Sinon-chrome provides the test with a mock chrome api
//		Seems possible to be very fine grain for the algos but for now it just allows App to render and useEffect() without error
//

