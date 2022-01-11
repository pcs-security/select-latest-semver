# Select Latest SemVer GitHub Javascript Action

This action prints the latest SemVer string discovered from an array of version strings.

## Inputs

## `list`

**Required** The list of SemVer values to greet. Formatted as a JSON string. 
Defaults to `[]`.

## `list`

**Optional** If `'false'`, `latest` will be an empty string when the action encounters an array of values such that no valid result can be selected. Otherwise, the action will instead fail with an error.
Defaults to **true**.

## Outputs

## `latest`

The element in `list` with the latest valid SemVer version.

## Example Usage

```
uses: pcs-security/select-latest-version@v1.0
with:
  list: '["1.2.3", "2.4.6", "3.6.9"]'
```