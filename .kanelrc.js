const path = require("path");
const { recase } = require('@kristiandupont/recase');


const toPascalCase = recase('snake', 'pascal');

const fixImportFormatting = (path, lines, instantiatedConfig) => {
  return lines.map((line) => {
    if (line.includes("import ")) {
      return line.replace("{ ", "{").replace(" }", "}").replaceAll("'", "\"")
    }
    return line
  })
}

const newlineAtEnd = (path, lines, instantiatedConfig) => {
  return [...lines, "\n"]
}

/** @type {import('kanel').Config} */
module.exports = {
  connection: {
    host: "localhost",
    user: "admin",
    password: "root",
    database: "test_data",
  },

  preDeleteOutputFolder: true,
  outputPath: "./src/types",

  customTypeMap: {
    "pg_catalog.tsvector": "string",
    "pg_catalog.bpchar": "string",
  },

  // This implementation will generate flavored instead of branded types.
  // See: https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
  generateIdentifierType: (c, d) => {
    // Id columns are already prefixed with the table name, so we don't need to add it here
    const name = toPascalCase(c.name);

    return {
      declarationType: 'typeDeclaration',
      name,
      exportAs: 'named',
      typeDefinition: [`number & {__flavor?: "${name}"}`],
      comment: [`Identifier type for ${d.name}`],
    };
  },

  postRenderHooks: [fixImportFormatting, newlineAtEnd]
};