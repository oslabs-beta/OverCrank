import puppeteer from 'puppeteer';
import sinonChrome from 'sinon-chrome';
import { describe, expect, test, assertType } from 'vitest';
import parseData from '../application/algorithms/getHtml';
import path from 'path';

//  Currying Refactor:
//      getHTML with devtool api
//      invoke next function to parse HTML into document object
//      invoke next function to set doc obj to state

describe(
  'Launch Chromium Env for getHTML tests',
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

    //  return a document object
    //  invoke mockSetDom one time
    //  pass mockSetDom a document object one time

    test('parseData returns document object', () => {
      const mockSetDom = vi.fn();
      const docObj = parseData(mockSetDom);
      assertType<Promise<Document>>(docObj);
    });

    // test('parseData invokes setState func 1 time', async () => {
    //   const mockSetDom = vi.fn();
    //   parseData(mockSetDom);
    //   console.log('results', mockSetDom.mock.calls);
    //   expect(mockSetDom).toHaveBeenCalled();
    // });

    // test('parseDataMock is invoked with ', () => {
    //   const mockSetDom = vi.fn();
    //   const mockSetDomSpy = vi.spyOn(mockSetDom, 'mockName');
    //   parseData(mockSetDomSpy as any);
    //   const firstCall = mockSetDom.mock.calls[0];
    //   console.log('results2', mockSetDom.mock.calls);
    //   assertType<Promise<Document>>(firstCall);
    // });

    await browser.close();
  },
  { timeout: 1000000 }
);
