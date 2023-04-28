
// write with mock functions to test for invocation and return

// might have to pass data into methods

// button to reset dev tool state data


const resource = {
  getContent:
    () => `import { useLexicalScope } from "/node_modules/@builder.io/qwik/core.mjs?v=d9113482";
  export const counter_component_div_button_onClick_1_LkCVrojX09Y = ()=>{
      const [count, setCount] = useLexicalScope();
      return setCount(count.value + 1);
  };
  
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtrRUFvQnlEOztXQUFNLFNBQVMsTUFBTSxLQUFLLEdBQUciLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiY29tcG9uZW50cy9zdGFydGVyL2NvdW50ZXIvY291bnRlci50c3giXSwiZmlsZSI6Ii9Vc2Vycy90eWhhcm1vbi9EZXNrdG9wL0VDUkkzOS9xd2lrLWFwcHYyL3NyYy9jb3VudGVyX2NvbXBvbmVudF9kaXZfYnV0dG9uX29uY2xpY2tfMV9sa2N2cm9qeDA5eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXBvbmVudCQsIHVzZVNpZ25hbCwgJCB9IGZyb20gJ0BidWlsZGVyLmlvL3F3aWsnO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuL2NvdW50ZXIubW9kdWxlLmNzcyc7XG5pbXBvcnQgR2F1Z2UgZnJvbSAnLi4vZ2F1Z2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQkKCgpID0+IHtcbiAgY29uc3QgY291bnQgPSB1c2VTaWduYWwoNzApO1xuXG4gIGNvbnN0IHNldENvdW50ID0gJCgobmV3VmFsdWU6IG51bWJlcikgPT4ge1xuICAgIGlmIChuZXdWYWx1ZSA8IDAgfHwgbmV3VmFsdWUgPiAxMDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY291bnQudmFsdWUgPSBuZXdWYWx1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzPXtzdHlsZXNbJ2NvdW50ZXItd3JhcHBlciddfT5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24tZGFyayBidXR0b24tc21hbGxcIiBvbkNsaWNrJD17KCkgPT4gc2V0Q291bnQoY291bnQudmFsdWUgLSAxKX0+XG4gICAgICAgIC1cbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPEdhdWdlIHZhbHVlPXtjb3VudC52YWx1ZX0gLz5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24tZGFyayBidXR0b24tc21hbGxcIiBvbkNsaWNrJD17KCkgPT4gc2V0Q291bnQoY291bnQudmFsdWUgKyAxKX0+XG4gICAgICAgICtcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufSk7XG4iXX0=`,
  url: 'localhost:5173/src/dummyURL',
};

const harLog = {
    entries: [
        {
            request: {
                url: 'localhost:5173/src/dummyURL',

            }
        },
        {}
    ]
}

const mockChrome = {
  devtools: {
    inspectedWindow: {
      onResourceAdded: {
        addListener: () => resource,
      },
    },
    network: {
      getHAR: () => harLog,
      onNavigated: {
        addListener: () => {},
      },
    },
  },
};

export default mockChrome;
