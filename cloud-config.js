/* Miraki Gardens — where the live menu is stored.
   The tablets read the menu from here; admin.html saves to it (password is checked on the server).
   menu-data.js stays as the built-in fallback for the very first start without internet. */
window.MENU_CLOUD = {
  url: "https://pgefchcxgbxvwpxhgqik.supabase.co",
  fn: "menu-admin",
  bucket: "miraki-menu-photos"
};
window.MENU_CLOUD.endpoint = window.MENU_CLOUD.url + "/functions/v1/" + window.MENU_CLOUD.fn;
window.MENU_CLOUD.read = function(){
  return fetch(window.MENU_CLOUD.endpoint + "?t=" + Date.now(), { cache: "no-store" })
    .then(function(r){ if(!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function(row){ return (row && row.data) ? row : null; });
};
