// Creates Chrome DevTools panel
chrome.devtools.panels.create(
    'Qwik Dev Tool',
    null,
    'panel.html',
    (panel) => {}
  );