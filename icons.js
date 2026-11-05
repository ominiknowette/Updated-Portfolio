const paths={
  arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
  external:'<path d="M14 4h6v6m0-6-10 10"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/>',
  close:'<path d="m6 6 12 12M18 6 6 18"/>',
  book:'<path d="M12 7c-3-2-6-2-9-1v13c3-1 6-1 9 1m0-13c3-2 6-2 9-1v13c-3-1-6-1-9 1V7Z"/>',
  back:'<path d="M20 12H4m6-6-6 6 6 6"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v3h16v-3"/>',
  folderOpen:'<path d="M3 7V5a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v2M2 10h20l-2 9H4l-2-9Z"/>',
  folderClose:'<path d="M3 7V5a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v2M2 10h20l-2 9H4l-2-9Z"/><path d="m9 13 3 3 3-3"/>',
  sparkle:'<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/>',
  previous:'<path d="M19 12H5m6 6-6-6 6-6"/>',
  next:'<path d="M5 12h14m-6-6 6 6-6 6"/>'
};

export function icon(name){
  return `<svg class="ui-icon ui-icon-${name}" aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.arrow}</svg>`;
}
