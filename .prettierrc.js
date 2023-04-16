module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 100,
  bracketSpacing: true,
  importOrder: [
    '^react(.*)',
    '^expo(.*)',
    '^(@)+expo(.*)',
    '<THIRD_PARTY_MODULES>',
    '^(@hooks/|@pages/|@components/|@layouts/|@utils/|@types/)',
    '^[./]',
  ],
  importOrderSortSpecifiers: true,
};
