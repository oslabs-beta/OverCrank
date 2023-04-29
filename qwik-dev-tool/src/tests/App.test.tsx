//  What are usefull tests?
//  Integration Tests:
//      Did the panel get made?
//      Did app mount with topbar, datatree, & metric view
//      Is there an HTML node in the tree view?
//
//  Unit Tests:
//      buildTree function
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

    test('Render React Application to Chrome Dev Tool Panel', () => {
      render(<App />);
      const topBar = screen.getByTestId('top-bar');
      expect(topBar).toBeDefined();
    });

    test('This should fail, searching for ID that does not exist', () => {
      render(<App />);
      const topBar = screen.getByTestId('FAILURE');
      expect(topBar).not.toBeDefined();
    });

    const page = await browser.newPage();
    await page.goto('https://qwik.builder.io');
    await browser.close();
  },
  { timeout: 100000 }
);
