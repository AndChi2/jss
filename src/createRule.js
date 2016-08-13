import Rule from './rules/Rule'
import SimpleRule from './rules/SimpleRule'
import KeyframeRule from './rules/KeyframeRule'
import ConditionalRule from './rules/ConditionalRule'
import FontFaceRule from './rules/FontFaceRule'

/**
 * Map of at rules to corresponding implementation class.
 *
 * @type {Object}
 */
const atRuleClassMap = {
  '@charset': SimpleRule,
  '@import': SimpleRule,
  '@namespace': SimpleRule,
  '@keyframes': KeyframeRule,
  '@media': ConditionalRule,
  '@supports': ConditionalRule,
  '@font-face': FontFaceRule
}

const atRuleNameRegExp = /^@[^ ]+/

/**
 * Create rule factory.
 *
 * @param {Object} [selector] if you don't pass selector - it will be generated
 * @param {Object} [style] declarations block
 * @param {Object} [options] rule options
 * @return {Object} rule
 * @api private
 */
export default function createRule(selector, style = {}, options = {}) {
  if (options.named == null) options.named = true

  // Is an at-rule.
  if (selector && selector[0] === '@') {
    const name = atRuleNameRegExp.exec(selector)[0]
    const AtRule = atRuleClassMap[name]
    return new AtRule(selector, style, options)
  }

  return new Rule(selector, style, options)
}

