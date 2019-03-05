const requireLang = require.context("@/i18n/lang", true, /\.json$/);

const messages = {};

for (const file of requireLang.keys()) {
  if (file === "./index.ts") continue;

  const path = file.replace(/(\.\/|\.json$)/g, "").split("/");

  path.reduce((o: any, s, i) => {
    if (o[s]) return o[s];

    o[s] = i + 1 === path.length ? requireLang(file) : {};

    return o[s];
  }, messages);
}

export default messages;
