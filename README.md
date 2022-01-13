# Select Latest SemVer GitHub Javascript Action

This action prints the latest SemVer string discovered from an array of version strings.

## Inputs

### `list`

**Required** The list of SemVer values to greet. Formatted as a JSON string. 

Defaults to `[]`.

### `fail-on-empty`

**Optional** If `'false'`, `latest` will be an empty string when the action encounters an array of values such that no valid result can be selected. Otherwise, the action will instead fail with an error.

Defaults to **true**.

### `semvish-cleaning`

**Optional** Indicates if the the clean() function from the `megawac/semvish` package should be performed on the input values. 
If `'true'`, cleaning input values will allow non-standard strings such as `1` and `1.0` to be regarded as `1.0.0`. Otherwise, not-quite-compliant strings will be ignored by the `semver` package, as intended.

Defaults to **false**.

More details on behavior can be found [on the official semvish docs page](https://www.npmjs.com/package/semvish).

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