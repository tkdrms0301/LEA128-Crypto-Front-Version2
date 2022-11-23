import { lazy } from "react";

function importView(...args) {
  const path = args
    .map((arg) => {
      if (Array.isArray(arg)) {
        const nestPath = new Array(arg[1])
          .fill(0)
          .map(() => arg[0])
          .join("/");
        arg = nestPath;
      }
      return arg;
    })
    .join("/");
  return import(`../views/${path}.js`);
}

export const mainRoutes = [
  {
    path: `/main`,
    component: lazy(() => importView("Main", "main")),
  },
  {
    path: `/log`,
    component: lazy(() => importView("Log", "routes")),
    routes: [
      {
        path: `/log/pathSetting`,
        component: lazy(() => importView("Log", "pathSetting")),
      },
      {
        path: `/log/decryption`,
        component: lazy(() => importView("Log", "decryption")),
      },
    ],
  },
  {
    path: `/encryption`,
    component: lazy(() => importView("Encryption", "routes")),
    routes: [
      {
        path: `/encryption/jsonLive`,
        component: lazy(() => importView("Encryption", "jsonLive")),
      },
      {
        path: `/encryption/dbLive`,
        component: lazy(() => importView("Encryption", "databaseLive")),
      },
      {
        path: `/encryption/fileCryption`,
        component: lazy(() => importView("Encryption", "fileEncryption")),
      },
      {
        path: `/encryption/stringCryption`,
        component: lazy(() => importView("Encryption", "stringEncryption")),
      },
    ],
  },
  {
    path: `/decryption`,
    component: lazy(() => importView("Encryption", "routes")),
    routes: [
      {
        path: `/decryption/fileDecryption`,
        component: lazy(() => importView("Decryption", "fileDecryption")),
      },
      {
        path: `/decryption/stringDecryption`,
        component: lazy(() => importView("Decryption", "stringDecryption")),
      },
    ],
  },
  {
    path: `/config`,
    component: lazy(() => importView("Json", "routes")),
    routes: [
      {
        path: `/config/json`,
        component: lazy(() => importView("Json", "setting")),
      },
      {
        path: `/config/db`,
        component: lazy(() => importView("Database", "setting")),
      },
    ],
  },
  {
    path: "/key",
    component: lazy(() => importView("Key", "routes")),
    routes: [
      {
        path: `/key/create`,
        component: lazy(() => importView("Key", "createKey")),
      },
      {
        path: `/key/check`,
        component: lazy(() => importView("Key", "checkKey")),
      },
    ],
  },
  {
    path: `/test`,
    component: lazy(() => importView("Test", "routes")),
    routes: [
      {
        path: `/test/jsonDummy`,
        component: lazy(() => importView("Test", "jsonDummy")),
      },
    ],
  },
];
