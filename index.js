const Parser = require('tree-sitter');
const { typescript: TypeScript } = require('tree-sitter-typescript');
const fs = require('fs')

function formatCaptures(tree, captures) {
    return captures.map((c) => {
        const node = c.node;
        // delete c.node;
        c.text = tree.getText(node);
        return c;
    });
}

function formatMatches(tree, matches) {
    return matches.map(({ pattern, captures }) => ({
        pattern,
        captures: formatCaptures(tree, captures),
    }));
}

const source = fs.readFileSync('./test.ts').toString()
const parser = new Parser();
parser.setLanguage(TypeScript);
const tree = parser.parse(source)
const query = new Parser.Query(TypeScript, `
(switch_case
	(string
    	((string_fragment) @case_name)
    )
    (#eq? @case_name "executeEditorAction")
) @select
`);

const matches = query.matches(tree.rootNode)
const formattedMatches = formatMatches(tree, matches)
    .map(match => match.captures)

console.log(matches, formattedMatches);