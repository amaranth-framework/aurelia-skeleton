module.exports = {
  "extends": "stylelint-config-standard",
  "rules": {
    // >>> override standard
    "shorthand-property-no-redundant-values": null,
    // >>> in addition to standard, always on
    "at-rule-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    // "media-feature-name-blacklist": ["max-width", "min-width"],
    "property-no-vendor-prefix": true,
    "selector-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,
    "selector-max-id": 1,
    "selector-type-no-unknown": {
        "ignore": [ "main-app", "nav-left", "nav-top" ]
    },
    // >>> active but worth dialing down someday:
    "max-nesting-depth": 6,
    "selector-max-compound-selectors": 6,
    "selector-max-specificity": "1,5,0",
    "selector-max-universal": 2
    // >>> turn on after resolving issues
    // "color-no-hex": true,
    // "unit-blacklist": "px",
    // "declaration-no-important": true
  }
}
