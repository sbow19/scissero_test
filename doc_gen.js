import { Document, Table, TableRow, TableCell, Paragraph, Packer } from "docx";
import * as fs from "fs";

/**
 *@typedef {import('./types.js').TableData} TableData
 *
 * */

/**
 *	Convert table data to table in docx file, and outputs docx file to current working directory.
 *	@param {TableData} tableData - columns and rows
 *	@returns {Promise<void>}
 */
function generateTable(tableData) {
  return new Promise((res, rej) => {
    try {
      // Create table
      const table = new Table({
        width: {
          size: 10000,
          type: "dxa",
        },
        rows: [
          new TableRow({
            height: {
              value: 1000,
              rule: "exact",
            },
            children: [
              new TableCell({
                width: {
                  size: 5000,
                  type: "dxa",
                },
                children: [
                  new Paragraph({
                    text:`Underlying Return`
                  }),
                ],
              }),
              new TableCell({
                width: {
                  size: 5000,
                  type: "dxa",
                },
                children: [
                  new Paragraph({
                    text:`Payment at Maturity`
                  }),
                ],
              })
            ],
          }),
          ...tableData.map((row) => {
            return new TableRow({
              height: {
                value: 1000,
                rule: "exact",
              },
              children: row.map((cell, index) => {
                return new TableCell({
                  width: {
                    size: 5000,
                    type: "dxa",
                  },
                  children: [
                    new Paragraph({
                      text:
                        index === 0
                          ? `${cell.toFixed(2)}%`
                          : `$${cell.toFixed(4)}`,
                    }),
                  ],
                });
              }),
            });
          }),
        ],
      });

      // Create document
      const doc = new Document({
        sections: [
          {
            children: [table],
          },
        ],
      });

      // Write to new doc
      Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("table.docx", buffer);
        res();
      });
    } catch (e) {
      console.log(e);
      rej();
    }
  });
}

export default generateTable;
