# Tree-Sitter Query Examples

```scheme
(program
 (import_statement) @import
) @program
```

```scheme
(switch_case
 (string
     ((string_fragment) @case_name)
    )
    (#eq? @case_name "executeEditorAction")
) @select
```