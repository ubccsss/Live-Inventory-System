const path = require("path");
const { recase } = require('@kristiandupont/recase');
const resolveType = require('kanel/build/generators/resolveType').default;


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
  outputPath: "./src/types/db",

  // Postgres bigints are assumed to represent monetary values and converted to Dinero.js objects
  customTypeMap: {
    "pg_catalog.tsvector": "string",
    "pg_catalog.bpchar": "string",
    "pg_catalog.int8": {
      name: "Dinero",
      typeImports: [
        {
          name: "Dinero",
          path: "dinero.js",
          isAbsolute: true,
          isDefault: false
        }
      ]
    }
  },

  // This implementation will generate flavored instead of branded types.
  // See: https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/
  generateIdentifierType: (c, d, config) => {
    // Id columns are already prefixed with the table name, so we don't need to add it here
    const name = toPascalCase(c.name);
    const innerType = resolveType(c, d, {
      ...config,
      // Explicitly disable identifier resolution so we get the actual inner type here
      generateIdentifierType: undefined,
    });
    const imports = [];

    let type = innerType;
    if (typeof innerType === "object") {
      // Handle non-primitives
      type = innerType.name;
      imports.push(...innerType.typeImports);
    }

    return {
      declarationType: 'typeDeclaration',
      name,
      exportAs: 'named',
      typeDefinition: [`${type} & {__flavor?: "${name}"}`],
      typeImports: imports,
      comment: [`Identifier type for ${d.name}`],
    };
  },

  postRenderHooks: [fixImportFormatting, newlineAtEnd]
};