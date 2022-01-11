# Select Latest SemVer GitHub Javascript Action

This action prints the latest SemVer string discovered from an array of version strings.

## Inputs

### `list`

**Required** The list of SemVer values to greet. Formatted as a JSON string. 
Defaults to `[]`.

### `fail-on-empty`

**Optional** If `'false'`, `latest` will be an empty string when the action encounters an array of values such that no valid result can be selected. Otherwise, the action will instead fail with an error.
Defaults to **true**.

### `coercion`

**Optional** Indicates if the action should perform SemVer coercion on input values. If `true`, only SemVer strings that is fully compliant with the semantic version standard will be processed. Otherwise, not fully-compliant values such as `1.0` will also be accepted and interpreted as `1.0.0`.

Defaults to **false**.

More details on behavior can be found [on the official semver docs page](https://docs.npmjs.com/cli/v6/using-npm/semver#coercion).

### `strict-parsing`

**Optional** Indicates if the action should interprete version strings strictly. 
Defaults to **true**.

The `strict-parsing` flag is used to activate `loose` mode on `npm/semver` parsing routines.
More details on behavior can be found [on the official semver docs page](https://docs.npmjs.com/cli/v6/using-npm/semver#functions).

### `strict-output`

**Optional** Indicates if the value returned by `latest` will be the original input value or converted to a strictly compliant format.
This flag is only useful when `strict-parsing` is disabled.
For example, if `strict-parsing` is enabled, if the latest version selected is the input value `1.0`, the value of `latest` is `1.0.0` when `strict-output` is `'true'`. If `strict-output` is `'false'`, the original input `1.0` is preserved as the value of `latest`.
Defaults to **true**.


## Outputs

### `latest`

The element in `list` with the latest valid SemVer version.

## Example Usage

```
uses: pcs-security/select-latest-version@v1.0
with:
  list: '["1.2.3", "2.4.6", "3.6.9"]'
```