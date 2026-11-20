import { createRequire } from 'module';
import { h } from 'preact';
import fs from 'fs';
import path from 'path';
import { jsx, jsxs, Fragment } from 'preact/jsx-runtime';

createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));

// node_modules/@xmldom/xmldom/lib/conventions.js
var require_conventions = __commonJS({
  "node_modules/@xmldom/xmldom/lib/conventions.js"(exports) {
    function find(list, predicate, ac) {
      if (ac === void 0) {
        ac = Array.prototype;
      }
      if (list && typeof ac.find === "function") {
        return ac.find.call(list, predicate);
      }
      for (var i = 0; i < list.length; i++) {
        if (hasOwn(list, i)) {
          var item = list[i];
          if (predicate.call(void 0, item, i, list)) {
            return item;
          }
        }
      }
    }
    function freeze(object, oc) {
      if (oc === void 0) {
        oc = Object;
      }
      if (oc && typeof oc.getOwnPropertyDescriptors === "function") {
        object = oc.create(null, oc.getOwnPropertyDescriptors(object));
      }
      return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
    }
    function hasOwn(object, key) {
      return Object.prototype.hasOwnProperty.call(object, key);
    }
    function assign(target, source) {
      if (target === null || typeof target !== "object") {
        throw new TypeError("target is not an object");
      }
      for (var key in source) {
        if (hasOwn(source, key)) {
          target[key] = source[key];
        }
      }
      return target;
    }
    var HTML_BOOLEAN_ATTRIBUTES = freeze({
      allowfullscreen: true,
      async: true,
      autofocus: true,
      autoplay: true,
      checked: true,
      controls: true,
      default: true,
      defer: true,
      disabled: true,
      formnovalidate: true,
      hidden: true,
      ismap: true,
      itemscope: true,
      loop: true,
      multiple: true,
      muted: true,
      nomodule: true,
      novalidate: true,
      open: true,
      playsinline: true,
      readonly: true,
      required: true,
      reversed: true,
      selected: true
    });
    function isHTMLBooleanAttribute(name) {
      return hasOwn(HTML_BOOLEAN_ATTRIBUTES, name.toLowerCase());
    }
    var HTML_VOID_ELEMENTS = freeze({
      area: true,
      base: true,
      br: true,
      col: true,
      embed: true,
      hr: true,
      img: true,
      input: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true
    });
    function isHTMLVoidElement(tagName) {
      return hasOwn(HTML_VOID_ELEMENTS, tagName.toLowerCase());
    }
    var HTML_RAW_TEXT_ELEMENTS = freeze({
      script: false,
      style: false,
      textarea: true,
      title: true
    });
    function isHTMLRawTextElement(tagName) {
      var key = tagName.toLowerCase();
      return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && !HTML_RAW_TEXT_ELEMENTS[key];
    }
    function isHTMLEscapableRawTextElement(tagName) {
      var key = tagName.toLowerCase();
      return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && HTML_RAW_TEXT_ELEMENTS[key];
    }
    function isHTMLMimeType(mimeType) {
      return mimeType === MIME_TYPE.HTML;
    }
    function hasDefaultHTMLNamespace(mimeType) {
      return isHTMLMimeType(mimeType) || mimeType === MIME_TYPE.XML_XHTML_APPLICATION;
    }
    var MIME_TYPE = freeze({
      /**
       * `text/html`, the only mime type that triggers treating an XML document as HTML.
       *
       * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/HTML Wikipedia
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
       * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring
       *      WHATWG HTML Spec
       */
      HTML: "text/html",
      /**
       * `application/xml`, the standard mime type for XML documents.
       *
       * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType
       *      registration
       * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_APPLICATION: "application/xml",
      /**
       * `text/xml`, an alias for `application/xml`.
       *
       * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
       * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_TEXT: "text/xml",
      /**
       * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
       * but is parsed as an XML document.
       *
       * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType
       *      registration
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
       * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
       */
      XML_XHTML_APPLICATION: "application/xhtml+xml",
      /**
       * `image/svg+xml`,
       *
       * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
       * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
       * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
       */
      XML_SVG_IMAGE: "image/svg+xml"
    });
    var _MIME_TYPES = Object.keys(MIME_TYPE).map(function(key) {
      return MIME_TYPE[key];
    });
    function isValidMimeType(mimeType) {
      return _MIME_TYPES.indexOf(mimeType) > -1;
    }
    var NAMESPACE = freeze({
      /**
       * The XHTML namespace.
       *
       * @see http://www.w3.org/1999/xhtml
       */
      HTML: "http://www.w3.org/1999/xhtml",
      /**
       * The SVG namespace.
       *
       * @see http://www.w3.org/2000/svg
       */
      SVG: "http://www.w3.org/2000/svg",
      /**
       * The `xml:` namespace.
       *
       * @see http://www.w3.org/XML/1998/namespace
       */
      XML: "http://www.w3.org/XML/1998/namespace",
      /**
       * The `xmlns:` namespace.
       *
       * @see https://www.w3.org/2000/xmlns/
       */
      XMLNS: "http://www.w3.org/2000/xmlns/"
    });
    exports.assign = assign;
    exports.find = find;
    exports.freeze = freeze;
    exports.HTML_BOOLEAN_ATTRIBUTES = HTML_BOOLEAN_ATTRIBUTES;
    exports.HTML_RAW_TEXT_ELEMENTS = HTML_RAW_TEXT_ELEMENTS;
    exports.HTML_VOID_ELEMENTS = HTML_VOID_ELEMENTS;
    exports.hasDefaultHTMLNamespace = hasDefaultHTMLNamespace;
    exports.hasOwn = hasOwn;
    exports.isHTMLBooleanAttribute = isHTMLBooleanAttribute;
    exports.isHTMLRawTextElement = isHTMLRawTextElement;
    exports.isHTMLEscapableRawTextElement = isHTMLEscapableRawTextElement;
    exports.isHTMLMimeType = isHTMLMimeType;
    exports.isHTMLVoidElement = isHTMLVoidElement;
    exports.isValidMimeType = isValidMimeType;
    exports.MIME_TYPE = MIME_TYPE;
    exports.NAMESPACE = NAMESPACE;
  }
});

// node_modules/@xmldom/xmldom/lib/errors.js
var require_errors = __commonJS({
  "node_modules/@xmldom/xmldom/lib/errors.js"(exports) {
    var conventions = require_conventions();
    function extendError(constructor, writableName) {
      constructor.prototype = Object.create(Error.prototype, {
        constructor: { value: constructor },
        name: { value: constructor.name, enumerable: true, writable: writableName }
      });
    }
    var DOMExceptionName = conventions.freeze({
      /**
       * the default value as defined by the spec
       */
      Error: "Error",
      /**
       * @deprecated
       * Use RangeError instead.
       */
      IndexSizeError: "IndexSizeError",
      /**
       * @deprecated
       * Just to match the related static code, not part of the spec.
       */
      DomstringSizeError: "DomstringSizeError",
      HierarchyRequestError: "HierarchyRequestError",
      WrongDocumentError: "WrongDocumentError",
      InvalidCharacterError: "InvalidCharacterError",
      /**
       * @deprecated
       * Just to match the related static code, not part of the spec.
       */
      NoDataAllowedError: "NoDataAllowedError",
      NoModificationAllowedError: "NoModificationAllowedError",
      NotFoundError: "NotFoundError",
      NotSupportedError: "NotSupportedError",
      InUseAttributeError: "InUseAttributeError",
      InvalidStateError: "InvalidStateError",
      SyntaxError: "SyntaxError",
      InvalidModificationError: "InvalidModificationError",
      NamespaceError: "NamespaceError",
      /**
       * @deprecated
       * Use TypeError for invalid arguments,
       * "NotSupportedError" DOMException for unsupported operations,
       * and "NotAllowedError" DOMException for denied requests instead.
       */
      InvalidAccessError: "InvalidAccessError",
      /**
       * @deprecated
       * Just to match the related static code, not part of the spec.
       */
      ValidationError: "ValidationError",
      /**
       * @deprecated
       * Use TypeError instead.
       */
      TypeMismatchError: "TypeMismatchError",
      SecurityError: "SecurityError",
      NetworkError: "NetworkError",
      AbortError: "AbortError",
      /**
       * @deprecated
       * Just to match the related static code, not part of the spec.
       */
      URLMismatchError: "URLMismatchError",
      QuotaExceededError: "QuotaExceededError",
      TimeoutError: "TimeoutError",
      InvalidNodeTypeError: "InvalidNodeTypeError",
      DataCloneError: "DataCloneError",
      EncodingError: "EncodingError",
      NotReadableError: "NotReadableError",
      UnknownError: "UnknownError",
      ConstraintError: "ConstraintError",
      DataError: "DataError",
      TransactionInactiveError: "TransactionInactiveError",
      ReadOnlyError: "ReadOnlyError",
      VersionError: "VersionError",
      OperationError: "OperationError",
      NotAllowedError: "NotAllowedError",
      OptOutError: "OptOutError"
    });
    var DOMExceptionNames = Object.keys(DOMExceptionName);
    function isValidDomExceptionCode(value) {
      return typeof value === "number" && value >= 1 && value <= 25;
    }
    function endsWithError(value) {
      return typeof value === "string" && value.substring(value.length - DOMExceptionName.Error.length) === DOMExceptionName.Error;
    }
    function DOMException(messageOrCode, nameOrMessage) {
      if (isValidDomExceptionCode(messageOrCode)) {
        this.name = DOMExceptionNames[messageOrCode];
        this.message = nameOrMessage || "";
      } else {
        this.message = messageOrCode;
        this.name = endsWithError(nameOrMessage) ? nameOrMessage : DOMExceptionName.Error;
      }
      if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
    }
    extendError(DOMException, true);
    Object.defineProperties(DOMException.prototype, {
      code: {
        enumerable: true,
        get: function() {
          var code = DOMExceptionNames.indexOf(this.name);
          if (isValidDomExceptionCode(code)) return code;
          return 0;
        }
      }
    });
    var ExceptionCode = {
      INDEX_SIZE_ERR: 1,
      DOMSTRING_SIZE_ERR: 2,
      HIERARCHY_REQUEST_ERR: 3,
      WRONG_DOCUMENT_ERR: 4,
      INVALID_CHARACTER_ERR: 5,
      NO_DATA_ALLOWED_ERR: 6,
      NO_MODIFICATION_ALLOWED_ERR: 7,
      NOT_FOUND_ERR: 8,
      NOT_SUPPORTED_ERR: 9,
      INUSE_ATTRIBUTE_ERR: 10,
      INVALID_STATE_ERR: 11,
      SYNTAX_ERR: 12,
      INVALID_MODIFICATION_ERR: 13,
      NAMESPACE_ERR: 14,
      INVALID_ACCESS_ERR: 15,
      VALIDATION_ERR: 16,
      TYPE_MISMATCH_ERR: 17,
      SECURITY_ERR: 18,
      NETWORK_ERR: 19,
      ABORT_ERR: 20,
      URL_MISMATCH_ERR: 21,
      QUOTA_EXCEEDED_ERR: 22,
      TIMEOUT_ERR: 23,
      INVALID_NODE_TYPE_ERR: 24,
      DATA_CLONE_ERR: 25
    };
    var entries = Object.entries(ExceptionCode);
    for (i = 0; i < entries.length; i++) {
      key = entries[i][0];
      DOMException[key] = entries[i][1];
    }
    var key;
    var i;
    function ParseError(message, locator, cause) {
      this.message = message;
      this.locator = locator;
      this.cause = cause;
      if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
    }
    extendError(ParseError);
    exports.DOMException = DOMException;
    exports.DOMExceptionName = DOMExceptionName;
    exports.ExceptionCode = ExceptionCode;
    exports.ParseError = ParseError;
  }
});

// node_modules/@xmldom/xmldom/lib/grammar.js
var require_grammar = __commonJS({
  "node_modules/@xmldom/xmldom/lib/grammar.js"(exports) {
    function detectUnicodeSupport(RegExpImpl) {
      try {
        if (typeof RegExpImpl !== "function") {
          RegExpImpl = RegExp;
        }
        var match = new RegExpImpl("\u{1D306}", "u").exec("\u{1D306}");
        return !!match && match[0].length === 2;
      } catch (error) {
      }
      return false;
    }
    var UNICODE_SUPPORT = detectUnicodeSupport();
    function chars(regexp) {
      if (regexp.source[0] !== "[") {
        throw new Error(regexp + " can not be used with chars");
      }
      return regexp.source.slice(1, regexp.source.lastIndexOf("]"));
    }
    function chars_without(regexp, search) {
      if (regexp.source[0] !== "[") {
        throw new Error("/" + regexp.source + "/ can not be used with chars_without");
      }
      if (!search || typeof search !== "string") {
        throw new Error(JSON.stringify(search) + " is not a valid search");
      }
      if (regexp.source.indexOf(search) === -1) {
        throw new Error('"' + search + '" is not is /' + regexp.source + "/");
      }
      if (search === "-" && regexp.source.indexOf(search) !== 1) {
        throw new Error('"' + search + '" is not at the first postion of /' + regexp.source + "/");
      }
      return new RegExp(regexp.source.replace(search, ""), UNICODE_SUPPORT ? "u" : "");
    }
    function reg(args) {
      var self = this;
      return new RegExp(
        Array.prototype.slice.call(arguments).map(function(part) {
          var isStr = typeof part === "string";
          if (isStr && self === void 0 && part === "|") {
            throw new Error("use regg instead of reg to wrap expressions with `|`!");
          }
          return isStr ? part : part.source;
        }).join(""),
        UNICODE_SUPPORT ? "u" : ""
      );
    }
    function regg(args) {
      if (arguments.length === 0) {
        throw new Error("no parameters provided");
      }
      return reg.apply(regg, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
    }
    var UNICODE_REPLACEMENT_CHARACTER = "\uFFFD";
    var Char = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
    if (UNICODE_SUPPORT) {
      Char = reg("[", chars(Char), "\\u{10000}-\\u{10FFFF}", "]");
    }
    var InvalidChar = new RegExp("[^" + chars(Char) + "]", UNICODE_SUPPORT ? "u" : "");
    var _SChar = /[\x20\x09\x0D\x0A]/;
    var SChar_s = chars(_SChar);
    var S = reg(_SChar, "+");
    var S_OPT = reg(_SChar, "*");
    var NameStartChar = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    if (UNICODE_SUPPORT) {
      NameStartChar = reg("[", chars(NameStartChar), "\\u{10000}-\\u{10FFFF}", "]");
    }
    var NameStartChar_s = chars(NameStartChar);
    var NameChar = reg("[", NameStartChar_s, chars(/[-.0-9\xB7]/), chars(/[\u0300-\u036F\u203F-\u2040]/), "]");
    var Name = reg(NameStartChar, NameChar, "*");
    var Name_exact = reg("^", Name, "$");
    var Nmtoken = reg(NameChar, "+");
    var EntityRef = reg("&", Name, ";");
    var CharRef = regg(/&#[0-9]+;|&#x[0-9a-fA-F]+;/);
    var Reference = regg(EntityRef, "|", CharRef);
    var PEReference = reg("%", Name, ";");
    var EntityValue = regg(
      reg('"', regg(/[^%&"]/, "|", PEReference, "|", Reference), "*", '"'),
      "|",
      reg("'", regg(/[^%&']/, "|", PEReference, "|", Reference), "*", "'")
    );
    var AttValue = regg('"', regg(/[^<&"]/, "|", Reference), "*", '"', "|", "'", regg(/[^<&']/, "|", Reference), "*", "'");
    var NCNameStartChar = chars_without(NameStartChar, ":");
    var NCNameChar = chars_without(NameChar, ":");
    var NCName = reg(NCNameStartChar, NCNameChar, "*");
    var NCName_exact = reg("^", NCName, "$");
    var QName = reg(NCName, regg(":", NCName), "?");
    var QName_exact = reg("^", QName, "$");
    var QName_group = reg("(", QName, ")");
    var SystemLiteral = regg(/"[^"]*"|'[^']*'/);
    var PI = reg(/^<\?/, "(", Name, ")", regg(S, "(?!", _SChar, ")(", Char, "*?)"), "?", /\?>/);
    var PubidChar = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/;
    var PubidLiteral = regg('"', PubidChar, '*"', "|", "'", chars_without(PubidChar, "'"), "*'");
    var COMMENT_START = "<!--";
    var COMMENT_END = "-->";
    var Comment = reg(COMMENT_START, regg(chars_without(Char, "-"), "|", reg("-", chars_without(Char, "-"))), "*", COMMENT_END);
    var PCDATA = "#PCDATA";
    var Mixed = regg(
      reg(/\(/, S_OPT, PCDATA, regg(S_OPT, /\|/, S_OPT, QName), "*", S_OPT, /\)\*/),
      "|",
      reg(/\(/, S_OPT, PCDATA, S_OPT, /\)/)
    );
    var _children_quantity = /[?*+]?/;
    var children = reg(
      /\([^>]+\)/,
      _children_quantity
      /*regg(choice, '|', seq), _children_quantity*/
    );
    var contentspec = regg("EMPTY", "|", "ANY", "|", Mixed, "|", children);
    var ELEMENTDECL_START = "<!ELEMENT";
    var elementdecl = reg(ELEMENTDECL_START, S, regg(QName, "|", PEReference), S, regg(contentspec, "|", PEReference), S_OPT, ">");
    var NotationType = reg("NOTATION", S, /\(/, S_OPT, Name, regg(S_OPT, /\|/, S_OPT, Name), "*", S_OPT, /\)/);
    var Enumeration = reg(/\(/, S_OPT, Nmtoken, regg(S_OPT, /\|/, S_OPT, Nmtoken), "*", S_OPT, /\)/);
    var EnumeratedType = regg(NotationType, "|", Enumeration);
    var AttType = regg(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", EnumeratedType);
    var DefaultDecl = regg(/#REQUIRED|#IMPLIED/, "|", regg(regg("#FIXED", S), "?", AttValue));
    var AttDef = regg(S, Name, S, AttType, S, DefaultDecl);
    var ATTLIST_DECL_START = "<!ATTLIST";
    var AttlistDecl = reg(ATTLIST_DECL_START, S, Name, AttDef, "*", S_OPT, ">");
    var ABOUT_LEGACY_COMPAT = "about:legacy-compat";
    var ABOUT_LEGACY_COMPAT_SystemLiteral = regg('"' + ABOUT_LEGACY_COMPAT + '"', "|", "'" + ABOUT_LEGACY_COMPAT + "'");
    var SYSTEM = "SYSTEM";
    var PUBLIC = "PUBLIC";
    var ExternalID = regg(regg(SYSTEM, S, SystemLiteral), "|", regg(PUBLIC, S, PubidLiteral, S, SystemLiteral));
    var ExternalID_match = reg(
      "^",
      regg(
        regg(SYSTEM, S, "(?<SystemLiteralOnly>", SystemLiteral, ")"),
        "|",
        regg(PUBLIC, S, "(?<PubidLiteral>", PubidLiteral, ")", S, "(?<SystemLiteral>", SystemLiteral, ")")
      )
    );
    var PubidLiteral_match = reg("^", PubidLiteral, "$");
    var SystemLiteral_match = reg("^", SystemLiteral, "$");
    var NDataDecl = regg(S, "NDATA", S, Name);
    var EntityDef = regg(EntityValue, "|", regg(ExternalID, NDataDecl, "?"));
    var ENTITY_DECL_START = "<!ENTITY";
    var GEDecl = reg(ENTITY_DECL_START, S, Name, S, EntityDef, S_OPT, ">");
    var PEDef = regg(EntityValue, "|", ExternalID);
    var PEDecl = reg(ENTITY_DECL_START, S, "%", S, Name, S, PEDef, S_OPT, ">");
    var EntityDecl = regg(GEDecl, "|", PEDecl);
    var PublicID = reg(PUBLIC, S, PubidLiteral);
    var NotationDecl = reg("<!NOTATION", S, Name, S, regg(ExternalID, "|", PublicID), S_OPT, ">");
    var Eq = reg(S_OPT, "=", S_OPT);
    var VersionNum = /1[.]\d+/;
    var VersionInfo = reg(S, "version", Eq, regg("'", VersionNum, "'", "|", '"', VersionNum, '"'));
    var EncName = /[A-Za-z][-A-Za-z0-9._]*/;
    var EncodingDecl = regg(S, "encoding", Eq, regg('"', EncName, '"', "|", "'", EncName, "'"));
    var SDDecl = regg(S, "standalone", Eq, regg("'", regg("yes", "|", "no"), "'", "|", '"', regg("yes", "|", "no"), '"'));
    var XMLDecl = reg(/^<\?xml/, VersionInfo, EncodingDecl, "?", SDDecl, "?", S_OPT, /\?>/);
    var DOCTYPE_DECL_START = "<!DOCTYPE";
    var CDATA_START = "<![CDATA[";
    var CDATA_END = "]]>";
    var CDStart = /<!\[CDATA\[/;
    var CDEnd = /\]\]>/;
    var CData = reg(Char, "*?", CDEnd);
    var CDSect = reg(CDStart, CData);
    exports.chars = chars;
    exports.chars_without = chars_without;
    exports.detectUnicodeSupport = detectUnicodeSupport;
    exports.reg = reg;
    exports.regg = regg;
    exports.ABOUT_LEGACY_COMPAT = ABOUT_LEGACY_COMPAT;
    exports.ABOUT_LEGACY_COMPAT_SystemLiteral = ABOUT_LEGACY_COMPAT_SystemLiteral;
    exports.AttlistDecl = AttlistDecl;
    exports.CDATA_START = CDATA_START;
    exports.CDATA_END = CDATA_END;
    exports.CDSect = CDSect;
    exports.Char = Char;
    exports.Comment = Comment;
    exports.COMMENT_START = COMMENT_START;
    exports.COMMENT_END = COMMENT_END;
    exports.DOCTYPE_DECL_START = DOCTYPE_DECL_START;
    exports.elementdecl = elementdecl;
    exports.EntityDecl = EntityDecl;
    exports.EntityValue = EntityValue;
    exports.ExternalID = ExternalID;
    exports.ExternalID_match = ExternalID_match;
    exports.Name = Name;
    exports.Name_exact = Name_exact;
    exports.NCName_exact = NCName_exact;
    exports.NotationDecl = NotationDecl;
    exports.Reference = Reference;
    exports.PEReference = PEReference;
    exports.PI = PI;
    exports.PUBLIC = PUBLIC;
    exports.PubidLiteral = PubidLiteral;
    exports.PubidLiteral_match = PubidLiteral_match;
    exports.QName = QName;
    exports.QName_exact = QName_exact;
    exports.QName_group = QName_group;
    exports.S = S;
    exports.SChar_s = SChar_s;
    exports.S_OPT = S_OPT;
    exports.SYSTEM = SYSTEM;
    exports.SystemLiteral = SystemLiteral;
    exports.SystemLiteral_match = SystemLiteral_match;
    exports.InvalidChar = InvalidChar;
    exports.UNICODE_REPLACEMENT_CHARACTER = UNICODE_REPLACEMENT_CHARACTER;
    exports.UNICODE_SUPPORT = UNICODE_SUPPORT;
    exports.XMLDecl = XMLDecl;
  }
});

// node_modules/@xmldom/xmldom/lib/dom.js
var require_dom = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom.js"(exports) {
    var conventions = require_conventions();
    var find = conventions.find;
    var hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
    var hasOwn = conventions.hasOwn;
    var isHTMLMimeType = conventions.isHTMLMimeType;
    var isHTMLRawTextElement = conventions.isHTMLRawTextElement;
    var isHTMLVoidElement = conventions.isHTMLVoidElement;
    var MIME_TYPE = conventions.MIME_TYPE;
    var NAMESPACE = conventions.NAMESPACE;
    var PDC = /* @__PURE__ */ Symbol();
    var errors = require_errors();
    var DOMException = errors.DOMException;
    var DOMExceptionName = errors.DOMExceptionName;
    var g = require_grammar();
    function checkSymbol(symbol) {
      if (symbol !== PDC) {
        throw new TypeError("Illegal constructor");
      }
    }
    function notEmptyString(input) {
      return input !== "";
    }
    function splitOnASCIIWhitespace(input) {
      return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
    }
    function orderedSetReducer(current, element) {
      if (!hasOwn(current, element)) {
        current[element] = true;
      }
      return current;
    }
    function toOrderedSet(input) {
      if (!input) return [];
      var list = splitOnASCIIWhitespace(input);
      return Object.keys(list.reduce(orderedSetReducer, {}));
    }
    function arrayIncludes(list) {
      return function(element) {
        return list && list.indexOf(element) !== -1;
      };
    }
    function validateQualifiedName(qualifiedName) {
      if (!g.QName_exact.test(qualifiedName)) {
        throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + qualifiedName + '"');
      }
    }
    function validateAndExtract(namespace, qualifiedName) {
      validateQualifiedName(qualifiedName);
      namespace = namespace || null;
      var prefix = null;
      var localName = qualifiedName;
      if (qualifiedName.indexOf(":") >= 0) {
        var splitResult = qualifiedName.split(":");
        prefix = splitResult[0];
        localName = splitResult[1];
      }
      if (prefix !== null && namespace === null) {
        throw new DOMException(DOMException.NAMESPACE_ERR, "prefix is non-null and namespace is null");
      }
      if (prefix === "xml" && namespace !== conventions.NAMESPACE.XML) {
        throw new DOMException(DOMException.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
      }
      if ((prefix === "xmlns" || qualifiedName === "xmlns") && namespace !== conventions.NAMESPACE.XMLNS) {
        throw new DOMException(
          DOMException.NAMESPACE_ERR,
          'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
        );
      }
      if (namespace === conventions.NAMESPACE.XMLNS && prefix !== "xmlns" && qualifiedName !== "xmlns") {
        throw new DOMException(
          DOMException.NAMESPACE_ERR,
          'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
        );
      }
      return [namespace, prefix, localName];
    }
    function copy(src, dest) {
      for (var p in src) {
        if (hasOwn(src, p)) {
          dest[p] = src[p];
        }
      }
    }
    function _extends(Class, Super) {
      var pt = Class.prototype;
      if (!(pt instanceof Super)) {
        let t = function() {
        };
        t.prototype = Super.prototype;
        t = new t();
        copy(pt, t);
        Class.prototype = pt = t;
      }
      if (pt.constructor != Class) {
        if (typeof Class != "function") {
          console.error("unknown Class:" + Class);
        }
        pt.constructor = Class;
      }
    }
    var NodeType = {};
    var ELEMENT_NODE2 = NodeType.ELEMENT_NODE = 1;
    var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
    var TEXT_NODE2 = NodeType.TEXT_NODE = 3;
    var CDATA_SECTION_NODE2 = NodeType.CDATA_SECTION_NODE = 4;
    var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
    var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
    var PROCESSING_INSTRUCTION_NODE2 = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
    var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
    var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
    var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
    var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
    var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
    var DocumentPosition = conventions.freeze({
      DOCUMENT_POSITION_DISCONNECTED: 1,
      DOCUMENT_POSITION_PRECEDING: 2,
      DOCUMENT_POSITION_FOLLOWING: 4,
      DOCUMENT_POSITION_CONTAINS: 8,
      DOCUMENT_POSITION_CONTAINED_BY: 16,
      DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
    });
    function commonAncestor(a, b) {
      if (b.length < a.length) return commonAncestor(b, a);
      var c = null;
      for (var n in a) {
        if (a[n] !== b[n]) return c;
        c = a[n];
      }
      return c;
    }
    function docGUID(doc) {
      if (!doc.guid) doc.guid = Math.random();
      return doc.guid;
    }
    function NodeList() {
    }
    NodeList.prototype = {
      /**
       * The number of nodes in the list. The range of valid child node indices is 0 to length-1
       * inclusive.
       *
       * @type {number}
       */
      length: 0,
      /**
       * Returns the item at `index`. If index is greater than or equal to the number of nodes in
       * the list, this returns null.
       *
       * @param index
       * Unsigned long Index into the collection.
       * @returns {Node | null}
       * The node at position `index` in the NodeList,
       * or null if that is not a valid index.
       */
      item: function(index) {
        return index >= 0 && index < this.length ? this[index] : null;
      },
      /**
       * Returns a string representation of the NodeList.
       *
       * Accepts the same `options` object as `XMLSerializer.prototype.serializeToString`
       * (`requireWellFormed`, `splitCDATASections`, `nodeFilter`). Passing a function is treated as
       * a legacy `nodeFilter` for backward compatibility.
       *
       * @param {Object | function} [options]
       * @param {boolean} [options.requireWellFormed=false]
       * @param {boolean} [options.splitCDATASections=true]
       * @param {function} [options.nodeFilter]
       * @returns {string}
       */
      toString: function(options) {
        var opts;
        if (typeof options === "function") {
          opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: options };
        } else if (!!options) {
          opts = {
            requireWellFormed: !!options.requireWellFormed,
            splitCDATASections: options.splitCDATASections !== false,
            nodeFilter: options.nodeFilter || null
          };
        } else {
          opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: null };
        }
        for (var buf = [], i = 0; i < this.length; i++) {
          serializeToString(this[i], buf, null, opts);
        }
        return buf.join("");
      },
      /**
       * Filters the NodeList based on a predicate.
       *
       * @param {function(Node): boolean} predicate
       * - A predicate function to filter the NodeList.
       * @returns {Node[]}
       * An array of nodes that satisfy the predicate.
       * @private
       */
      filter: function(predicate) {
        return Array.prototype.filter.call(this, predicate);
      },
      /**
       * Returns the first index at which a given node can be found in the NodeList, or -1 if it is
       * not present.
       *
       * @param {Node} item
       * - The Node item to locate in the NodeList.
       * @returns {number}
       * The first index of the node in the NodeList; -1 if not found.
       * @private
       */
      indexOf: function(item) {
        return Array.prototype.indexOf.call(this, item);
      }
    };
    NodeList.prototype[Symbol.iterator] = function() {
      var me = this;
      var index = 0;
      return {
        next: function() {
          if (index < me.length) {
            return {
              value: me[index++],
              done: false
            };
          } else {
            return {
              done: true
            };
          }
        },
        return: function() {
          return {
            done: true
          };
        }
      };
    };
    function LiveNodeList(node, refresh) {
      this._node = node;
      this._refresh = refresh;
      _updateLiveList(this);
    }
    function _updateLiveList(list) {
      var inc = list._node._inc || list._node.ownerDocument._inc;
      if (list._inc !== inc) {
        var ls = list._refresh(list._node);
        __set__(list, "length", ls.length);
        if (!list.$$length || ls.length < list.$$length) {
          for (var i = ls.length; i in list; i++) {
            if (hasOwn(list, i)) {
              delete list[i];
            }
          }
        }
        copy(ls, list);
        list._inc = inc;
      }
    }
    LiveNodeList.prototype.item = function(i) {
      _updateLiveList(this);
      return this[i] || null;
    };
    _extends(LiveNodeList, NodeList);
    function NamedNodeMap() {
      this._nsIndex = /* @__PURE__ */ Object.create(null);
      this._noNsIndex = /* @__PURE__ */ Object.create(null);
    }
    function _findNodeIndex(list, node) {
      var i = 0;
      while (i < list.length) {
        if (list[i] === node) {
          return i;
        }
        i++;
      }
    }
    function _nnmBucket(map, namespaceURI, create) {
      if (!namespaceURI) {
        return map._noNsIndex;
      }
      var bucket = map._nsIndex[namespaceURI];
      if (!bucket && create) {
        bucket = map._nsIndex[namespaceURI] = /* @__PURE__ */ Object.create(null);
      }
      return bucket;
    }
    function _nnmIndexFind(map, namespaceURI, localName) {
      var bucket = _nnmBucket(map, namespaceURI, false);
      var found = bucket && bucket[localName];
      return found ? found : null;
    }
    function _nnmIndexAdd(map, attr) {
      _nnmBucket(map, attr.namespaceURI, true)[attr.localName] = attr;
    }
    function _nnmIndexRemove(map, attr) {
      var bucket = _nnmBucket(map, attr.namespaceURI, false);
      if (bucket) {
        delete bucket[attr.localName];
      }
    }
    function _addNamedNode(el, list, newAttr, oldAttr) {
      if (oldAttr) {
        list[_findNodeIndex(list, oldAttr)] = newAttr;
      } else {
        list[list.length] = newAttr;
        list.length++;
      }
      _nnmIndexAdd(list, newAttr);
      if (el) {
        newAttr.ownerElement = el;
        var doc = el.ownerDocument;
        if (doc) {
          oldAttr && _onRemoveAttribute(doc, el, oldAttr);
          _onAddAttribute(doc, el, newAttr);
        }
      }
    }
    function _removeNamedNode(el, list, attr) {
      var i = _findNodeIndex(list, attr);
      if (i >= 0) {
        var lastIndex = list.length - 1;
        while (i <= lastIndex) {
          list[i] = list[++i];
        }
        list.length = lastIndex;
        _nnmIndexRemove(list, attr);
        if (el) {
          var doc = el.ownerDocument;
          if (doc) {
            _onRemoveAttribute(doc, el, attr);
          }
          attr.ownerElement = null;
        }
      }
    }
    NamedNodeMap.prototype = {
      length: 0,
      item: NodeList.prototype.item,
      /**
       * Get an attribute by name. Note: Name is in lower case in case of HTML namespace and
       * document.
       *
       * @param {string} localName
       * The local name of the attribute.
       * @returns {Attr | null}
       * The attribute with the given local name, or null if no such attribute exists.
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name
       */
      getNamedItem: function(localName) {
        if (this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace()) {
          localName = localName.toLowerCase();
        }
        var i = 0;
        while (i < this.length) {
          var attr = this[i];
          if (attr.nodeName === localName) {
            return attr;
          }
          i++;
        }
        return null;
      },
      /**
       * Set an attribute.
       *
       * @param {Attr} attr
       * The attribute to set.
       * @returns {Attr | null}
       * The old attribute with the same local name and namespace URI as the new one, or null if no
       * such attribute exists.
       * @throws {DOMException}
       * With code:
       * - {@link INUSE_ATTRIBUTE_ERR} - If the attribute is already an attribute of another
       * element.
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
       */
      setNamedItem: function(attr) {
        var el = attr.ownerElement;
        if (el && el !== this._ownerElement) {
          throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
        }
        var oldAttr = _nnmIndexFind(this, attr.namespaceURI, attr.localName);
        if (oldAttr === attr) {
          return attr;
        }
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      /**
       * Set an attribute, replacing an existing attribute with the same local name and namespace
       * URI if one exists.
       *
       * @param {Attr} attr
       * The attribute to set.
       * @returns {Attr | null}
       * The old attribute with the same local name and namespace URI as the new one, or null if no
       * such attribute exists.
       * @throws {DOMException}
       * Throws a DOMException with the name "InUseAttributeError" if the attribute is already an
       * attribute of another element.
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
       */
      setNamedItemNS: function(attr) {
        return this.setNamedItem(attr);
      },
      /**
       * Removes an attribute specified by the local name.
       *
       * @param {string} localName
       * The local name of the attribute to be removed.
       * @returns {Attr}
       * The attribute node that was removed.
       * @throws {DOMException}
       * With code:
       * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given name is found.
       * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditem
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-name
       */
      removeNamedItem: function(localName) {
        var attr = this.getNamedItem(localName);
        if (!attr) {
          throw new DOMException(DOMException.NOT_FOUND_ERR, localName);
        }
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      /**
       * Removes an attribute specified by the namespace and local name.
       *
       * @param {string | null} namespaceURI
       * The namespace URI of the attribute to be removed.
       * @param {string} localName
       * The local name of the attribute to be removed.
       * @returns {Attr}
       * The attribute node that was removed.
       * @throws {DOMException}
       * With code:
       * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given namespace URI and local
       * name is found.
       * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditemns
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-namespace
       */
      removeNamedItemNS: function(namespaceURI, localName) {
        var attr = this.getNamedItemNS(namespaceURI, localName);
        if (!attr) {
          throw new DOMException(DOMException.NOT_FOUND_ERR, namespaceURI ? namespaceURI + " : " + localName : localName);
        }
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      /**
       * Get an attribute by namespace and local name.
       *
       * @param {string | null} namespaceURI
       * The namespace URI of the attribute.
       * @param {string} localName
       * The local name of the attribute.
       * @returns {Attr | null}
       * The attribute with the given namespace URI and local name, or null if no such attribute
       * exists.
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-namespace
       */
      getNamedItemNS: function(namespaceURI, localName) {
        if (!namespaceURI) {
          namespaceURI = null;
        }
        var i = 0;
        while (i < this.length) {
          var node = this[i];
          if (node.localName === localName && node.namespaceURI === namespaceURI) {
            return node;
          }
          i++;
        }
        return null;
      }
    };
    NamedNodeMap.prototype[Symbol.iterator] = function() {
      var me = this;
      var index = 0;
      return {
        next: function() {
          if (index < me.length) {
            return {
              value: me[index++],
              done: false
            };
          } else {
            return {
              done: true
            };
          }
        },
        return: function() {
          return {
            done: true
          };
        }
      };
    };
    function DOMImplementation() {
    }
    DOMImplementation.prototype = {
      /**
       * Test if the DOM implementation implements a specific feature and version, as specified in
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/core.html#DOMFeatures DOM Features}.
       *
       * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given
       * feature is supported. The different implementations fairly diverged in what kind of
       * features were reported. The latest version of the spec settled to force this method to
       * always return true, where the functionality was accurate and in use.
       *
       * @deprecated
       * It is deprecated and modern browsers return true in all cases.
       * @function DOMImplementation#hasFeature
       * @param {string} feature
       * The name of the feature to test.
       * @param {string} [version]
       * This is the version number of the feature to test.
       * @returns {boolean}
       * Always returns true.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
       * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-5CED94D7 DOM Level 3 Core
       */
      hasFeature: function(feature, version) {
        return true;
      },
      /**
       * Creates a DOM Document object of the specified type with its document element. Note that
       * based on the {@link DocumentType}
       * given to create the document, the implementation may instantiate specialized
       * {@link Document} objects that support additional features than the "Core", such as "HTML"
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML}.
       * On the other hand, setting the {@link DocumentType} after the document was created makes
       * this very unlikely to happen. Alternatively, specialized {@link Document} creation methods,
       * such as createHTMLDocument
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML},
       * can be used to obtain specific types of {@link Document} objects.
       *
       * __It behaves slightly different from the description in the living standard__:
       * - There is no interface/class `XMLDocument`, it returns a `Document`
       * instance (with it's `type` set to `'xml'`).
       * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       *
       * @function DOMImplementation.createDocument
       * @param {string | null} namespaceURI
       * The
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-namespaceURI namespace URI}
       * of the document element to create or null.
       * @param {string | null} qualifiedName
       * The
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified name}
       * of the document element to be created or null.
       * @param {DocumentType | null} [doctype=null]
       * The type of document to be created or null. When doctype is not null, its
       * {@link Node#ownerDocument} attribute is set to the document being created. Default is
       * `null`
       * @returns {Document}
       * A new {@link Document} object with its document element. If the NamespaceURI,
       * qualifiedName, and doctype are null, the returned {@link Document} is empty with no
       * document element.
       * @throws {DOMException}
       * With code:
       *
       * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
       * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
       * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed, if the qualifiedName has a
       * prefix and the namespaceURI is null, or if the qualifiedName is null and the namespaceURI
       * is different from null, or if the qualifiedName has a prefix that is "xml" and the
       * namespaceURI is different from "{@link http://www.w3.org/XML/1998/namespace}"
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#Namespaces XML Namespaces},
       * or if the DOM implementation does not support the "XML" feature but a non-null namespace
       * URI was provided, since namespaces were defined by XML.
       * - `WRONG_DOCUMENT_ERR`: Raised if doctype has already been used with a different document
       * or was created from a different implementation.
       * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
       * "XML" and the language exposed through the Document does not support XML Namespaces (such
       * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
       * @since DOM Level 2.
       * @see {@link #createHTMLDocument}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument DOM Living Standard
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-2-Core-DOM-createDocument DOM
       *      Level 3 Core
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM
       *      Level 2 Core (initial)
       */
      createDocument: function(namespaceURI, qualifiedName, doctype) {
        var contentType = MIME_TYPE.XML_APPLICATION;
        if (namespaceURI === NAMESPACE.HTML) {
          contentType = MIME_TYPE.XML_XHTML_APPLICATION;
        } else if (namespaceURI === NAMESPACE.SVG) {
          contentType = MIME_TYPE.XML_SVG_IMAGE;
        }
        var doc = new Document(PDC, { contentType });
        doc.implementation = this;
        doc.childNodes = new NodeList();
        doc.doctype = doctype || null;
        if (doctype) {
          doc.appendChild(doctype);
        }
        if (qualifiedName) {
          var root = doc.createElementNS(namespaceURI, qualifiedName);
          doc.appendChild(root);
        }
        return doc;
      },
      /**
       * Creates an empty DocumentType node. Entity declarations and notations are not made
       * available. Entity reference expansions and default attribute additions do not occur.
       *
       * **This behavior is slightly different from the one in the specs**:
       * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       * - `publicId` and `systemId` contain the raw data including any possible quotes,
       *   so they can always be serialized back to the original value
       * - `internalSubset` contains the raw string between `[` and `]` if present,
       *   but is not parsed or validated in any form.
       *
       * @function DOMImplementation#createDocumentType
       * @param {string} qualifiedName
       * The {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified
       * name} of the document type to be created.
       * @param {string} [publicId]
       * The external subset public identifier. Stored verbatim including surrounding quotes.
       * When serialized with `requireWellFormed: true`, the serializer throws `InvalidStateError`
       * if the value is non-empty and does not match the XML `PubidLiteral` production
       * (W3C DOM Parsing §3.2.1.3; XML 1.0 production [12]). Creation-time validation is not
       * enforced — deferred to a future breaking release.
       * @param {string} [systemId]
       * The external subset system identifier. Stored verbatim including surrounding quotes.
       * When serialized with `requireWellFormed: true`, the serializer throws `InvalidStateError`
       * if the value is non-empty and does not match the XML `SystemLiteral` production
       * (W3C DOM Parsing §3.2.1.3; XML 1.0 production [11]). Creation-time validation is not
       * enforced — deferred to a future breaking release.
       * @param {string} [internalSubset]
       * The internal subset or an empty string if it is not present. Stored verbatim.
       * When serialized with `requireWellFormed: true`, the serializer throws `InvalidStateError`
       * if the value contains `"]>"`. Creation-time validation is not enforced.
       * @returns {DocumentType}
       * A new {@link DocumentType} node with {@link Node#ownerDocument} set to null.
       * @throws {DOMException}
       * With code:
       *
       * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
       * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
       * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed.
       * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
       * "XML" and the language exposed through the Document does not support XML Namespaces (such
       * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
       * @since DOM Level 2.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType
       *      MDN
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living
       *      Standard
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-3-Core-DOM-createDocType DOM
       *      Level 3 Core
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM
       *      Level 2 Core
       * @see https://github.com/xmldom/xmldom/blob/master/CHANGELOG.md#050
       * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-Core-DocType-internalSubset
       * @prettierignore
       */
      createDocumentType: function(qualifiedName, publicId, systemId, internalSubset) {
        validateQualifiedName(qualifiedName);
        var node = new DocumentType(PDC);
        node.name = qualifiedName;
        node.nodeName = qualifiedName;
        node.publicId = publicId || "";
        node.systemId = systemId || "";
        node.internalSubset = internalSubset || "";
        node.childNodes = new NodeList();
        return node;
      },
      /**
       * Returns an HTML document, that might already have a basic DOM structure.
       *
       * __It behaves slightly different from the description in the living standard__:
       * - If the first argument is `false` no initial nodes are added (steps 3-7 in the specs are
       * omitted)
       * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       *
       * @param {string | false} [title]
       * A string containing the title to give the new HTML document.
       * @returns {Document}
       * The HTML document.
       * @since WHATWG Living Standard.
       * @see {@link #createDocument}
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
       * @see https://dom.spec.whatwg.org/#html-document
       */
      createHTMLDocument: function(title) {
        var doc = new Document(PDC, { contentType: MIME_TYPE.HTML });
        doc.implementation = this;
        doc.childNodes = new NodeList();
        if (title !== false) {
          doc.doctype = this.createDocumentType("html");
          doc.doctype.ownerDocument = doc;
          doc.appendChild(doc.doctype);
          var htmlNode = doc.createElement("html");
          doc.appendChild(htmlNode);
          var headNode = doc.createElement("head");
          htmlNode.appendChild(headNode);
          if (typeof title === "string") {
            var titleNode = doc.createElement("title");
            titleNode.appendChild(doc.createTextNode(title));
            headNode.appendChild(titleNode);
          }
          htmlNode.appendChild(doc.createElement("body"));
        }
        return doc;
      }
    };
    function Node(symbol) {
      checkSymbol(symbol);
    }
    Node.prototype = {
      /**
       * The first child of this node.
       *
       * @type {Node | null}
       */
      firstChild: null,
      /**
       * The last child of this node.
       *
       * @type {Node | null}
       */
      lastChild: null,
      /**
       * The previous sibling of this node.
       *
       * @type {Node | null}
       */
      previousSibling: null,
      /**
       * The next sibling of this node.
       *
       * @type {Node | null}
       */
      nextSibling: null,
      /**
       * The parent node of this node.
       *
       * @type {Node | null}
       */
      parentNode: null,
      /**
       * The parent element of this node.
       *
       * @type {Element | null}
       */
      get parentElement() {
        return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
      },
      /**
       * The child nodes of this node.
       *
       * @type {NodeList}
       */
      childNodes: null,
      /**
       * The document object associated with this node.
       *
       * @type {Document | null}
       */
      ownerDocument: null,
      /**
       * The value of this node.
       *
       * @type {string | null}
       */
      nodeValue: null,
      /**
       * The namespace URI of this node.
       *
       * @type {string | null}
       */
      namespaceURI: null,
      /**
       * The prefix of the namespace for this node.
       *
       * @type {string | null}
       */
      prefix: null,
      /**
       * The local part of the qualified name of this node.
       *
       * @type {string | null}
       */
      localName: null,
      /**
       * The baseURI is currently always `about:blank`,
       * since that's what happens when you create a document from scratch.
       *
       * @type {'about:blank'}
       */
      baseURI: "about:blank",
      /**
       * Is true if this node is part of a document.
       *
       * @type {boolean}
       */
      get isConnected() {
        var rootNode = this.getRootNode();
        return rootNode && rootNode.nodeType === rootNode.DOCUMENT_NODE;
      },
      /**
       * Checks whether `other` is an inclusive descendant of this node.
       *
       * @param {Node | null | undefined} other
       * The node to check.
       * @returns {boolean}
       * True if `other` is an inclusive descendant of this node; false otherwise.
       * @see https://dom.spec.whatwg.org/#dom-node-contains
       */
      contains: function(other) {
        if (!other) return false;
        var parent = other;
        do {
          if (this === parent) return true;
          parent = parent.parentNode;
        } while (parent);
        return false;
      },
      /**
       * @typedef GetRootNodeOptions
       * @property {boolean} [composed=false]
       */
      /**
       * Searches for the root node of this node.
       *
       * **This behavior is slightly different from the in the specs**:
       * - ignores `options.composed`, since `ShadowRoot`s are unsupported, always returns root.
       *
       * @param {GetRootNodeOptions} [options]
       * @returns {Node}
       * Root node.
       * @see https://dom.spec.whatwg.org/#dom-node-getrootnode
       * @see https://dom.spec.whatwg.org/#concept-shadow-including-root
       */
      getRootNode: function(options) {
        var parent = this;
        do {
          if (!parent.parentNode) {
            return parent;
          }
          parent = parent.parentNode;
        } while (parent);
      },
      /**
       * Checks whether the given node is equal to this node.
       *
       * Two nodes are equal when they have the same type, defining characteristics (for the type),
       * and the same childNodes. The comparison is iterative to avoid stack overflows on
       * deeply-nested trees. Attribute nodes of each Element pair are also pushed onto the stack
       * and compared the same way.
       *
       * @param {Node} [otherNode]
       * @returns {boolean}
       * @see https://dom.spec.whatwg.org/#concept-node-equals
       * @see ../docs/walk-dom.md.
       */
      isEqualNode: function(otherNode) {
        if (!otherNode) return false;
        var stack = [{ node: this, other: otherNode }];
        while (stack.length > 0) {
          var pair = stack.pop();
          var node = pair.node;
          var other = pair.other;
          if (node.nodeType !== other.nodeType) return false;
          switch (node.nodeType) {
            case node.DOCUMENT_TYPE_NODE:
              if (node.name !== other.name) return false;
              if (node.publicId !== other.publicId) return false;
              if (node.systemId !== other.systemId) return false;
              break;
            case node.ELEMENT_NODE:
              if (node.namespaceURI !== other.namespaceURI) return false;
              if (node.prefix !== other.prefix) return false;
              if (node.localName !== other.localName) return false;
              if (node.attributes.length !== other.attributes.length) return false;
              for (var i = 0; i < node.attributes.length; i++) {
                var attr = node.attributes.item(i);
                var otherAttr = other.getAttributeNodeNS(attr.namespaceURI, attr.localName);
                if (!otherAttr) return false;
                stack.push({ node: attr, other: otherAttr });
              }
              break;
            case node.ATTRIBUTE_NODE:
              if (node.namespaceURI !== other.namespaceURI) return false;
              if (node.localName !== other.localName) return false;
              if (node.value !== other.value) return false;
              break;
            case node.PROCESSING_INSTRUCTION_NODE:
              if (node.target !== other.target || node.data !== other.data) return false;
              break;
            case node.TEXT_NODE:
            case node.CDATA_SECTION_NODE:
            case node.COMMENT_NODE:
              if (node.data !== other.data) return false;
              break;
          }
          if (node.childNodes.length !== other.childNodes.length) return false;
          for (var i = node.childNodes.length - 1; i >= 0; i--) {
            stack.push({ node: node.childNodes[i], other: other.childNodes[i] });
          }
        }
        return true;
      },
      /**
       * Checks whether or not the given node is this node.
       *
       * @param {Node} [otherNode]
       */
      isSameNode: function(otherNode) {
        return this === otherNode;
      },
      /**
       * Inserts a node before a reference node as a child of this node.
       *
       * @param {Node} newChild
       * The new child node to be inserted.
       * @param {Node | null} refChild
       * The reference node before which newChild will be inserted.
       * @returns {Node}
       * The new child node successfully inserted.
       * @throws {DOMException}
       * Throws a DOMException if inserting the node would result in a DOM tree that is not
       * well-formed, or if `child` is provided but is not a child of `parent`.
       * See {@link _insertBefore} for more details.
       * @since Modified in DOM L2
       */
      insertBefore: function(newChild, refChild) {
        return _insertBefore(this, newChild, refChild);
      },
      /**
       * Replaces an old child node with a new child node within this node.
       *
       * @param {Node} newChild
       * The new node that is to replace the old node.
       * If it already exists in the DOM, it is removed from its original position.
       * @param {Node} oldChild
       * The existing child node to be replaced.
       * @returns {Node}
       * Returns the replaced child node.
       * @throws {DOMException}
       * Throws a DOMException if replacing the node would result in a DOM tree that is not
       * well-formed, or if `oldChild` is not a child of `this`.
       * This can also occur if the pre-replacement validity assertion fails.
       * See {@link _insertBefore}, {@link Node.removeChild}, and
       * {@link assertPreReplacementValidityInDocument} for more details.
       * @see https://dom.spec.whatwg.org/#concept-node-replace
       */
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        if (oldChild) {
          this.removeChild(oldChild);
        }
      },
      /**
       * Removes an existing child node from this node.
       *
       * @param {Node} oldChild
       * The child node to be removed.
       * @returns {Node}
       * Returns the removed child node.
       * @throws {DOMException}
       * Throws a DOMException if `oldChild` is not a child of `this`.
       * See {@link _removeChild} for more details.
       */
      removeChild: function(oldChild) {
        return _removeChild(this, oldChild);
      },
      /**
       * Appends a child node to this node.
       *
       * @param {Node} newChild
       * The child node to be appended to this node.
       * If it already exists in the DOM, it is removed from its original position.
       * @returns {Node}
       * Returns the appended child node.
       * @throws {DOMException}
       * Throws a DOMException if appending the node would result in a DOM tree that is not
       * well-formed, or if `newChild` is not a valid Node.
       * See {@link insertBefore} for more details.
       */
      appendChild: function(newChild) {
        return this.insertBefore(newChild, null);
      },
      /**
       * Determines whether this node has any child nodes.
       *
       * @returns {boolean}
       * Returns true if this node has any child nodes, and false otherwise.
       */
      hasChildNodes: function() {
        return this.firstChild != null;
      },
      /**
       * Creates a copy of the calling node.
       *
       * @param {boolean} deep
       * If true, the contents of the node are recursively copied.
       * If false, only the node itself (and its attributes, if it is an element) are copied.
       * @returns {Node}
       * Returns the newly created copy of the node.
       * @throws {DOMException}
       * May throw a DOMException if operations within {@link Element#setAttributeNode} or
       * {@link Node#appendChild} (which are potentially invoked in this method) do not meet their
       * specific constraints.
       * @see {@link cloneNode}
       */
      cloneNode: function(deep) {
        return cloneNode(this.ownerDocument || this, this, deep);
      },
      /**
       * Puts the specified node and all of its subtree into a "normalized" form. In a normalized
       * subtree, no text nodes in the subtree are empty and there are no adjacent text nodes.
       *
       * Specifically, this method merges any adjacent text nodes (i.e., nodes for which `nodeType`
       * is `TEXT_NODE`) into a single node with the combined data. It also removes any empty text
       * nodes.
       *
       * This method iterativly traverses all child nodes to normalize all descendent nodes within
       * the subtree.
       *
       * @throws {DOMException}
       * May throw a DOMException if operations within removeChild or appendData (which are
       * potentially invoked in this method) do not meet their specific constraints.
       * @since Modified in DOM Level 2
       * @see {@link Node.removeChild}
       * @see {@link CharacterData.appendData}
       * @see ../docs/walk-dom.md.
       */
      normalize: function() {
        walkDOM(this, null, {
          enter: function(node) {
            var child = node.firstChild;
            while (child) {
              var next = child.nextSibling;
              if (next !== null && next.nodeType === TEXT_NODE2 && child.nodeType === TEXT_NODE2) {
                var tail = [];
                var sibling = next;
                while (sibling !== null && sibling.nodeType === TEXT_NODE2) {
                  tail.push(sibling.data);
                  sibling = sibling.nextSibling;
                }
                var removed = child.nextSibling;
                while (removed !== sibling) {
                  var following = removed.nextSibling;
                  removed.parentNode = null;
                  removed.previousSibling = null;
                  removed.nextSibling = null;
                  removed = following;
                }
                child.nextSibling = sibling;
                if (sibling !== null) {
                  sibling.previousSibling = child;
                } else {
                  node.lastChild = child;
                }
                child.appendData(tail.join(""));
                _onUpdateChild(node.ownerDocument, node);
                child = sibling;
              } else {
                child = next;
              }
            }
            return true;
          }
        });
      },
      /**
       * Checks whether the DOM implementation implements a specific feature and its version.
       *
       * @deprecated
       * Since `DOMImplementation.hasFeature` is deprecated and always returns true.
       * @param {string} feature
       * The package name of the feature to test. This is the same name that can be passed to the
       * method `hasFeature` on `DOMImplementation`.
       * @param {string} version
       * This is the version number of the package name to test.
       * @returns {boolean}
       * Returns true in all cases in the current implementation.
       * @since Introduced in DOM Level 2
       * @see {@link DOMImplementation.hasFeature}
       */
      isSupported: function(feature, version) {
        return this.ownerDocument.implementation.hasFeature(feature, version);
      },
      /**
       * Look up the prefix associated to the given namespace URI, starting from this node.
       * **The default namespace declarations are ignored by this method.**
       * See Namespace Prefix Lookup for details on the algorithm used by this method.
       *
       * **This behavior is different from the in the specs**:
       * - no node type specific handling
       * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
       *
       * @param {string | null} namespaceURI
       * The namespace URI for which to find the associated prefix.
       * @returns {string | null}
       * The associated prefix, if found; otherwise, null.
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
       * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
       * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
       * @see https://github.com/xmldom/xmldom/issues/322
       * @prettierignore
       */
      lookupPrefix: function(namespaceURI) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            for (var n in map) {
              if (hasOwn(map, n) && map[n] === namespaceURI) {
                return n;
              }
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      /**
       * This function is used to look up the namespace URI associated with the given prefix,
       * starting from this node.
       *
       * **This behavior is different from the in the specs**:
       * - no node type specific handling
       * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
       *
       * @param {string | null} prefix
       * The prefix for which to find the associated namespace URI.
       * @returns {string | null}
       * The associated namespace URI, if found; otherwise, null.
       * @since DOM Level 3
       * @see https://dom.spec.whatwg.org/#dom-node-lookupnamespaceuri
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespaceURI
       * @prettierignore
       */
      lookupNamespaceURI: function(prefix) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            if (hasOwn(map, prefix)) {
              return map[prefix];
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      /**
       * Determines whether the given namespace URI is the default namespace.
       *
       * The function works by looking up the prefix associated with the given namespace URI. If no
       * prefix is found (i.e., the namespace URI is not registered in the namespace map of this
       * node or any of its ancestors), it returns `true`, implying the namespace URI is considered
       * the default.
       *
       * **This behavior is different from the in the specs**:
       * - no node type specific handling
       * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
       *
       * @param {string | null} namespaceURI
       * The namespace URI to be checked.
       * @returns {boolean}
       * Returns true if the given namespace URI is the default namespace, false otherwise.
       * @since DOM Level 3
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isDefaultNamespace
       * @see https://dom.spec.whatwg.org/#dom-node-isdefaultnamespace
       * @prettierignore
       */
      isDefaultNamespace: function(namespaceURI) {
        var prefix = this.lookupPrefix(namespaceURI);
        return prefix == null;
      },
      /**
       * Compares the reference node with a node with regard to their position in the document and
       * according to the document order.
       *
       * @param {Node} other
       * The node to compare the reference node to.
       * @returns {number}
       * Returns how the node is positioned relatively to the reference node according to the
       * bitmask. 0 if reference node and given node are the same.
       * @since DOM Level 3
       * @see https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-compare
       * @see https://dom.spec.whatwg.org/#dom-node-comparedocumentposition
       */
      compareDocumentPosition: function(other) {
        if (this === other) return 0;
        var node1 = other;
        var node2 = this;
        var attr1 = null;
        var attr2 = null;
        if (node1 instanceof Attr) {
          attr1 = node1;
          node1 = attr1.ownerElement;
        }
        if (node2 instanceof Attr) {
          attr2 = node2;
          node2 = attr2.ownerElement;
          if (attr1 && node1 && node2 === node1) {
            for (var i = 0, attr; attr = node2.attributes[i]; i++) {
              if (attr === attr1)
                return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
              if (attr === attr2)
                return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
            }
          }
        }
        if (!node1 || !node2 || node2.ownerDocument !== node1.ownerDocument) {
          return DocumentPosition.DOCUMENT_POSITION_DISCONNECTED + DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (docGUID(node2.ownerDocument) > docGUID(node1.ownerDocument) ? DocumentPosition.DOCUMENT_POSITION_FOLLOWING : DocumentPosition.DOCUMENT_POSITION_PRECEDING);
        }
        if (attr2 && node1 === node2) {
          return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
        }
        if (attr1 && node1 === node2) {
          return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
        }
        var chain1 = [];
        var ancestor1 = node1.parentNode;
        while (ancestor1) {
          if (!attr2 && ancestor1 === node2) {
            return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          }
          chain1.push(ancestor1);
          ancestor1 = ancestor1.parentNode;
        }
        chain1.reverse();
        var chain2 = [];
        var ancestor2 = node2.parentNode;
        while (ancestor2) {
          if (!attr1 && ancestor2 === node1) {
            return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
          }
          chain2.push(ancestor2);
          ancestor2 = ancestor2.parentNode;
        }
        chain2.reverse();
        var ca = commonAncestor(chain1, chain2);
        for (var n in ca.childNodes) {
          var child = ca.childNodes[n];
          if (child === node2) return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          if (child === node1) return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
          if (chain2.indexOf(child) >= 0) return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          if (chain1.indexOf(child) >= 0) return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
        }
        return 0;
      }
    };
    function _xmlEncoder(c) {
      return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
    }
    copy(NodeType, Node);
    copy(NodeType, Node.prototype);
    copy(DocumentPosition, Node);
    copy(DocumentPosition, Node.prototype);
    function _visitNode(node, callback) {
      walkDOM(node, null, {
        enter: function(n) {
          return callback(n) ? walkDOM.STOP : true;
        }
      });
    }
    function walkDOM(node, context, callbacks) {
      var stack = [{ node, context, phase: walkDOM.ENTER }];
      while (stack.length > 0) {
        var frame = stack.pop();
        if (frame.phase === walkDOM.ENTER) {
          var childContext = callbacks.enter(frame.node, frame.context);
          if (childContext === walkDOM.STOP) {
            return walkDOM.STOP;
          }
          stack.push({ node: frame.node, context: childContext, phase: walkDOM.EXIT });
          if (childContext === null || childContext === void 0) {
            continue;
          }
          var child = frame.node.lastChild;
          while (child) {
            stack.push({ node: child, context: childContext, phase: walkDOM.ENTER });
            child = child.previousSibling;
          }
        } else {
          if (callbacks.exit) {
            callbacks.exit(frame.node, frame.context);
          }
        }
      }
    }
    walkDOM.STOP = /* @__PURE__ */ Symbol("walkDOM.STOP");
    walkDOM.ENTER = 0;
    walkDOM.EXIT = 1;
    function Document(symbol, options) {
      checkSymbol(symbol);
      var opt = options || {};
      this.ownerDocument = this;
      this.contentType = opt.contentType || MIME_TYPE.XML_APPLICATION;
      this.type = isHTMLMimeType(this.contentType) ? "html" : "xml";
    }
    function _onAddAttribute(doc, el, newAttr) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
      }
    }
    function _onRemoveAttribute(doc, el, newAttr, remove) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
      }
    }
    function _onUpdateChild(doc, parent, newChild) {
      if (doc && doc._inc) {
        doc._inc++;
        var childNodes = parent.childNodes;
        if (newChild && !newChild.nextSibling) {
          childNodes[childNodes.length++] = newChild;
        } else {
          var child = parent.firstChild;
          var i = 0;
          while (child) {
            childNodes[i++] = child;
            child = child.nextSibling;
          }
          childNodes.length = i;
          delete childNodes[childNodes.length];
        }
      }
    }
    function _removeChild(parentNode, child) {
      if (parentNode !== child.parentNode) {
        throw new DOMException(DOMException.NOT_FOUND_ERR, "child's parent is not parent");
      }
      var oldPreviousSibling = child.previousSibling;
      var oldNextSibling = child.nextSibling;
      if (oldPreviousSibling) {
        oldPreviousSibling.nextSibling = oldNextSibling;
      } else {
        parentNode.firstChild = oldNextSibling;
      }
      if (oldNextSibling) {
        oldNextSibling.previousSibling = oldPreviousSibling;
      } else {
        parentNode.lastChild = oldPreviousSibling;
      }
      _onUpdateChild(parentNode.ownerDocument, parentNode);
      child.parentNode = null;
      child.previousSibling = null;
      child.nextSibling = null;
      return child;
    }
    function hasValidParentNodeType(node) {
      return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
    }
    function hasInsertableNodeType(node) {
      return node && (node.nodeType === Node.CDATA_SECTION_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.DOCUMENT_TYPE_NODE || node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE || node.nodeType === Node.TEXT_NODE);
    }
    function isDocTypeNode(node) {
      return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
    }
    function isElementNode(node) {
      return node && node.nodeType === Node.ELEMENT_NODE;
    }
    function isTextNode(node) {
      return node && node.nodeType === Node.TEXT_NODE;
    }
    function isElementInsertionPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function isElementReplacementPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      function hasElementChildThatIsNotChild(node) {
        return isElementNode(node) && node !== child;
      }
      if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function assertPreInsertionValidity1to5(parent, node, child) {
      if (!hasValidParentNodeType(parent)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
      }
      if (child && child.parentNode !== parent) {
        throw new DOMException(DOMException.NOT_FOUND_ERR, "child not in parent");
      }
      if (
        // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
        !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
        // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
        // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
        // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
        isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE
      ) {
        throw new DOMException(
          DOMException.HIERARCHY_REQUEST_ERR,
          "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
        );
      }
    }
    function assertPreInsertionValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementInsertionPossible(parent, child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        if (find(parentChildNodes, isDocTypeNode)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
        if (!child && parentElementChild) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
        }
      }
    }
    function assertPreReplacementValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementReplacementPossible(parent, child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        let hasDoctypeChildThatIsNotChild = function(node2) {
          return isDocTypeNode(node2) && node2 !== child;
        };
        if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
      }
    }
    function _insertBefore(parent, node, child, _inDocumentAssertion) {
      assertPreInsertionValidity1to5(parent, node, child);
      if (parent.nodeType === Node.DOCUMENT_NODE) {
        (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
      }
      var cp = node.parentNode;
      if (cp) {
        cp.removeChild(node);
      }
      if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var newFirst = node.firstChild;
        if (newFirst == null) {
          return node;
        }
        var newLast = node.lastChild;
      } else {
        newFirst = newLast = node;
      }
      var pre = child ? child.previousSibling : parent.lastChild;
      newFirst.previousSibling = pre;
      newLast.nextSibling = child;
      if (pre) {
        pre.nextSibling = newFirst;
      } else {
        parent.firstChild = newFirst;
      }
      if (child == null) {
        parent.lastChild = newLast;
      } else {
        child.previousSibling = newLast;
      }
      do {
        newFirst.parentNode = parent;
      } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
      _onUpdateChild(parent.ownerDocument || parent, parent, node);
      if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
        node.firstChild = node.lastChild = null;
      }
      return node;
    }
    Document.prototype = {
      /**
       * The implementation that created this document.
       *
       * @type DOMImplementation
       * @readonly
       */
      implementation: null,
      nodeName: "#document",
      nodeType: DOCUMENT_NODE,
      /**
       * The DocumentType node of the document.
       *
       * @type DocumentType
       * @readonly
       */
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function(newChild, refChild) {
        if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
          var child = newChild.firstChild;
          while (child) {
            var next = child.nextSibling;
            this.insertBefore(child, refChild);
            child = next;
          }
          return newChild;
        }
        _insertBefore(this, newChild, refChild);
        newChild.ownerDocument = this;
        if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE2) {
          this.documentElement = newChild;
        }
        return newChild;
      },
      removeChild: function(oldChild) {
        var removed = _removeChild(this, oldChild);
        if (removed === this.documentElement) {
          this.documentElement = null;
        }
        return removed;
      },
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        newChild.ownerDocument = this;
        if (oldChild) {
          this.removeChild(oldChild);
        }
        if (isElementNode(newChild)) {
          this.documentElement = newChild;
        }
      },
      /**
       * Imports a node from another document into this document, creating a new copy owned by this
       * document. The source node and its subtree are not modified.
       *
       * @param {Node} importedNode
       * The node to import.
       * @param {boolean} deep
       * If true, the contents of the node are recursively imported.
       * If false, only the node itself (and its attributes, if it is an element) are imported.
       * @returns {Node}
       * Returns the newly created import of the node.
       * @see {@link importNode}
       * @see {@link https://dom.spec.whatwg.org/#dom-document-importnode}
       */
      importNode: function(importedNode, deep) {
        return importNode(this, importedNode, deep);
      },
      // Introduced in DOM Level 2:
      getElementById: function(id) {
        var rtv = null;
        _visitNode(this.documentElement, function(node) {
          if (node.nodeType == ELEMENT_NODE2) {
            if (node.getAttribute("id") == id) {
              rtv = node;
              return true;
            }
          }
        });
        return rtv;
      },
      /**
       * Creates a new `Element` that is owned by this `Document`.
       * In HTML Documents `localName` is the lower cased `tagName`,
       * otherwise no transformation is being applied.
       * When `contentType` implies the HTML namespace, it will be set as `namespaceURI`.
       *
       * __This implementation differs from the specification:__ - The provided name is not checked
       * against the `Name` production,
       * so no related error will be thrown.
       * - There is no interface `HTMLElement`, it is always an `Element`.
       * - There is no support for a second argument to indicate using custom elements.
       *
       * @param {string} tagName
       * @returns {Element}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
       * @see https://dom.spec.whatwg.org/#dom-document-createelement
       * @see https://dom.spec.whatwg.org/#concept-create-element
       */
      createElement: function(tagName) {
        var node = new Element(PDC);
        node.ownerDocument = this;
        if (this.type === "html") {
          tagName = tagName.toLowerCase();
        }
        if (hasDefaultHTMLNamespace(this.contentType)) {
          node.namespaceURI = NAMESPACE.HTML;
        }
        node.nodeName = tagName;
        node.tagName = tagName;
        node.localName = tagName;
        node.childNodes = new NodeList();
        var attrs = node.attributes = new NamedNodeMap();
        attrs._ownerElement = node;
        return node;
      },
      /**
       * @returns {DocumentFragment}
       */
      createDocumentFragment: function() {
        var node = new DocumentFragment(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        return node;
      },
      /**
       * @param {string} data
       * @returns {Text}
       */
      createTextNode: function(data) {
        var node = new Text(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.appendData(data);
        return node;
      },
      /**
       * @param {string} data
       * @returns {Comment}
       * @see https://dom.spec.whatwg.org/#dom-document-createcomment
       * @see https://www.w3.org/TR/xml/#NT-Comment XML 1.0 production [15]
       * @see https://www.w3.org/TR/DOM-Parsing/#dfn-concept-serialize-xml §3.2.1.3
       *
       *      Note: no validation is performed at creation time. When the resulting document is
       *      serialized with `requireWellFormed: true`, the serializer throws `InvalidStateError`
       *      if the comment data contains `--` anywhere, ends with `-`, or contains characters
       *      outside the XML Char production (W3C DOM Parsing §3.2.1.3). Without that option the
       *      data is emitted verbatim.
       */
      createComment: function(data) {
        var node = new Comment(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.appendData(data);
        return node;
      },
      /**
       * Returns a new CDATASection node whose data is `data`.
       *
       * __This implementation differs from the specification:__ - calling this method on an HTML
       * document does not throw `NotSupportedError`.
       *
       * @param {string} data
       * @returns {CDATASection}
       * @throws {DOMException}
       * With code `INVALID_CHARACTER_ERR` if `data` contains `"]]>"`.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createCDATASection
       * @see https://dom.spec.whatwg.org/#dom-document-createcdatasection
       */
      createCDATASection: function(data) {
        if (data.indexOf("]]>") !== -1) {
          throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'data contains "]]>"');
        }
        var node = new CDATASection(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.appendData(data);
        return node;
      },
      /**
       * Returns a ProcessingInstruction node whose target is target and data is data.
       *
       * __This behavior is slightly different from the in the specs__:
       * - it does not do any input validation on the arguments and doesn't throw
       * "InvalidCharacterError".
       *
       * Note: When the resulting document is serialized with `requireWellFormed: true`, the
       * serializer throws `InvalidStateError` if `.target` is not a valid XML `NCName` (a `Name`
       * with no colon) or is an ASCII case-insensitive match for `"xml"`, or if `.data` contains
       * `?>` or characters outside the XML Char production (W3C DOM Parsing §3.2.1.7). Without that
       * option the target and data are emitted verbatim.
       *
       * @param {string} target
       * @param {string} data
       * @returns {ProcessingInstruction}
       * @see https://developer.mozilla.org/docs/Web/API/Document/createProcessingInstruction
       * @see https://dom.spec.whatwg.org/#dom-document-createprocessinginstruction
       * @see https://www.w3.org/TR/DOM-Parsing/#dfn-concept-serialize-xml §3.2.1.7
       */
      createProcessingInstruction: function(target, data) {
        var node = new ProcessingInstruction(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.nodeName = node.target = target;
        node.nodeValue = node.data = data;
        return node;
      },
      /**
       * Creates an `Attr` node that is owned by this document.
       * In HTML Documents `localName` is the lower cased `name`,
       * otherwise no transformation is being applied.
       *
       * __This implementation differs from the specification:__ - The provided name is not checked
       * against the `Name` production,
       * so no related error will be thrown.
       *
       * @param {string} name
       * @returns {Attr}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttribute
       * @see https://dom.spec.whatwg.org/#dom-document-createattribute
       */
      createAttribute: function(name) {
        if (!g.QName_exact.test(name)) {
          throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in name "' + name + '"');
        }
        if (this.type === "html") {
          name = name.toLowerCase();
        }
        return this._createAttribute(name);
      },
      _createAttribute: function(name) {
        var node = new Attr(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.name = name;
        node.nodeName = name;
        node.localName = name;
        node.specified = true;
        return node;
      },
      /**
       * Creates an EntityReference object.
       * The current implementation does not fill the `childNodes` with those of the corresponding
       * `Entity`
       *
       * The `name` is validated against the XML `Name` production at creation time; an invalid name
       * throws `InvalidCharacterError`. When the resulting node is serialized with
       * `requireWellFormed: true`, the serializer re-validates `nodeName` against the XML `Name`
       * production and throws `InvalidStateError` if a later `nodeName` mutation made it invalid;
       * without that option the name is emitted verbatim.
       *
       * __This implementation differs from the specification:__ xmldom does not expand entities —
       * the parser resolves entity references inline and never constructs `EntityReference` nodes,
       * so this method is the only producer.
       *
       * @deprecated
       * In DOM Level 4.
       * @param {string} name
       * The name of the entity to reference. No namespace well-formedness checks are performed.
       * @returns {EntityReference}
       * @throws {DOMException}
       * With code `INVALID_CHARACTER_ERR` when `name` is not a valid XML `Name`.
       * @throws {DOMException}
       * with code `NOT_SUPPORTED_ERR` when the document is of type `html`
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-392B75AE
       */
      createEntityReference: function(name) {
        if (!g.Name_exact.test(name)) {
          throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'not a valid xml name "' + name + '"');
        }
        if (this.type === "html") {
          throw new DOMException("document is an html document", DOMExceptionName.NotSupportedError);
        }
        var node = new EntityReference(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.nodeName = name;
        return node;
      },
      // Introduced in DOM Level 2:
      /**
       * @param {string} namespaceURI
       * @param {string} qualifiedName
       * @returns {Element}
       */
      createElementNS: function(namespaceURI, qualifiedName) {
        var validated = validateAndExtract(namespaceURI, qualifiedName);
        var node = new Element(PDC);
        var attrs = node.attributes = new NamedNodeMap();
        node.childNodes = new NodeList();
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.tagName = qualifiedName;
        node.namespaceURI = validated[0];
        node.prefix = validated[1];
        node.localName = validated[2];
        attrs._ownerElement = node;
        return node;
      },
      // Introduced in DOM Level 2:
      /**
       * @param {string} namespaceURI
       * @param {string} qualifiedName
       * @returns {Attr}
       */
      createAttributeNS: function(namespaceURI, qualifiedName) {
        var validated = validateAndExtract(namespaceURI, qualifiedName);
        var node = new Attr(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.nodeName = qualifiedName;
        node.name = qualifiedName;
        node.specified = true;
        node.namespaceURI = validated[0];
        node.prefix = validated[1];
        node.localName = validated[2];
        return node;
      }
    };
    _extends(Document, Node);
    function Element(symbol) {
      checkSymbol(symbol);
      this._nsMap = /* @__PURE__ */ Object.create(null);
    }
    Element.prototype = {
      nodeType: ELEMENT_NODE2,
      /**
       * The attributes of this element.
       *
       * @type {NamedNodeMap | null}
       */
      attributes: null,
      getQualifiedName: function() {
        return this.prefix ? this.prefix + ":" + this.localName : this.localName;
      },
      _isInHTMLDocumentAndNamespace: function() {
        return this.ownerDocument.type === "html" && this.namespaceURI === NAMESPACE.HTML;
      },
      /**
       * Implementaton of Level2 Core function hasAttributes.
       *
       * @returns {boolean}
       * True if attribute list is not empty.
       * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-NodeHasAttrs
       */
      hasAttributes: function() {
        return !!(this.attributes && this.attributes.length);
      },
      hasAttribute: function(name) {
        return !!this.getAttributeNode(name);
      },
      /**
       * Returns element’s first attribute whose qualified name is `name`, and `null`
       * if there is no such attribute.
       *
       * @param {string} name
       * @returns {string | null}
       */
      getAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        return attr ? attr.value : null;
      },
      getAttributeNode: function(name) {
        if (this._isInHTMLDocumentAndNamespace()) {
          name = name.toLowerCase();
        }
        return this.attributes.getNamedItem(name);
      },
      /**
       * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
       *
       * @param {string} name
       * @param {string} value
       */
      setAttribute: function(name, value) {
        if (this._isInHTMLDocumentAndNamespace()) {
          name = name.toLowerCase();
        }
        var attr = this.getAttributeNode(name);
        if (attr) {
          attr.value = attr.nodeValue = "" + value;
        } else {
          attr = this.ownerDocument._createAttribute(name);
          attr.value = attr.nodeValue = "" + value;
          this.setAttributeNode(attr);
        }
      },
      removeAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        attr && this.removeAttributeNode(attr);
      },
      setAttributeNode: function(newAttr) {
        return this.attributes.setNamedItem(newAttr);
      },
      setAttributeNodeNS: function(newAttr) {
        return this.attributes.setNamedItemNS(newAttr);
      },
      removeAttributeNode: function(oldAttr) {
        return this.attributes.removeNamedItem(oldAttr.nodeName);
      },
      //get real attribute name,and remove it by removeAttributeNode
      removeAttributeNS: function(namespaceURI, localName) {
        var old = this.getAttributeNodeNS(namespaceURI, localName);
        old && this.removeAttributeNode(old);
      },
      hasAttributeNS: function(namespaceURI, localName) {
        return this.getAttributeNodeNS(namespaceURI, localName) != null;
      },
      /**
       * Returns element’s attribute whose namespace is `namespaceURI` and local name is
       * `localName`,
       * or `null` if there is no such attribute.
       *
       * @param {string} namespaceURI
       * @param {string} localName
       * @returns {string | null}
       */
      getAttributeNS: function(namespaceURI, localName) {
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        return attr ? attr.value : null;
      },
      /**
       * Sets the value of element’s attribute whose namespace is `namespaceURI` and local name is
       * `localName` to value.
       *
       * @param {string} namespaceURI
       * @param {string} qualifiedName
       * @param {string} value
       * @see https://dom.spec.whatwg.org/#dom-element-setattributens
       */
      setAttributeNS: function(namespaceURI, qualifiedName, value) {
        var validated = validateAndExtract(namespaceURI, qualifiedName);
        var localName = validated[2];
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        if (attr) {
          attr.value = attr.nodeValue = "" + value;
        } else {
          attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
          attr.value = attr.nodeValue = "" + value;
          this.setAttributeNode(attr);
        }
      },
      getAttributeNodeNS: function(namespaceURI, localName) {
        return this.attributes.getNamedItemNS(namespaceURI, localName);
      },
      /**
       * Returns a LiveNodeList of all child elements which have **all** of the given class name(s).
       *
       * Returns an empty list if `classNames` is an empty string or only contains HTML white space
       * characters.
       *
       * Warning: This returns a live LiveNodeList.
       * Changes in the DOM will reflect in the array as the changes occur.
       * If an element selected by this array no longer qualifies for the selector,
       * it will automatically be removed. Be aware of this for iteration purposes.
       *
       * @param {string} classNames
       * Is a string representing the class name(s) to match; multiple class names are separated by
       * (ASCII-)whitespace.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
       * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
       */
      getElementsByClassName: function(classNames2) {
        var classNamesSet = toOrderedSet(classNames2);
        return new LiveNodeList(this, function(base) {
          var ls = [];
          if (classNamesSet.length > 0) {
            _visitNode(base, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE2) {
                var nodeClassNames = node.getAttribute("class");
                if (nodeClassNames) {
                  var matches = classNames2 === nodeClassNames;
                  if (!matches) {
                    var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                    matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                  }
                  if (matches) {
                    ls.push(node);
                  }
                }
              }
            });
          }
          return ls;
        });
      },
      /**
       * Returns a LiveNodeList of elements with the given qualifiedName.
       * Searching for all descendants can be done by passing `*` as `qualifiedName`.
       *
       * All descendants of the specified element are searched, but not the element itself.
       * The returned list is live, which means it updates itself with the DOM tree automatically.
       * Therefore, there is no need to call `Element.getElementsByTagName()`
       * with the same element and arguments repeatedly if the DOM changes in between calls.
       *
       * When called on an HTML element in an HTML document,
       * `getElementsByTagName` lower-cases the argument before searching for it.
       * This is undesirable when trying to match camel-cased SVG elements (such as
       * `<linearGradient>`) in an HTML document.
       * Instead, use `Element.getElementsByTagNameNS()`,
       * which preserves the capitalization of the tag name.
       *
       * `Element.getElementsByTagName` is similar to `Document.getElementsByTagName()`,
       * except that it only searches for elements that are descendants of the specified element.
       *
       * @param {string} qualifiedName
       * @returns {LiveNodeList}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
       * @see https://dom.spec.whatwg.org/#concept-getelementsbytagname
       */
      getElementsByTagName: function(qualifiedName) {
        var isHTMLDocument = (this.nodeType === DOCUMENT_NODE ? this : this.ownerDocument).type === "html";
        var lowerQualifiedName = qualifiedName.toLowerCase();
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node === base || node.nodeType !== ELEMENT_NODE2) {
              return;
            }
            if (qualifiedName === "*") {
              ls.push(node);
            } else {
              var nodeQualifiedName = node.getQualifiedName();
              var matchingQName = isHTMLDocument && node.namespaceURI === NAMESPACE.HTML ? lowerQualifiedName : qualifiedName;
              if (nodeQualifiedName === matchingQName) {
                ls.push(node);
              }
            }
          });
          return ls;
        });
      },
      getElementsByTagNameNS: function(namespaceURI, localName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE2 && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      }
    };
    Document.prototype.getElementsByClassName = Element.prototype.getElementsByClassName;
    Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
    Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
    _extends(Element, Node);
    function Attr(symbol) {
      checkSymbol(symbol);
      this.namespaceURI = null;
      this.prefix = null;
      this.ownerElement = null;
    }
    Attr.prototype.nodeType = ATTRIBUTE_NODE;
    _extends(Attr, Node);
    function CharacterData(symbol) {
      checkSymbol(symbol);
    }
    CharacterData.prototype = {
      data: "",
      substringData: function(offset, count) {
        return this.data.substring(offset, offset + count);
      },
      appendData: function(text) {
        text = this.data + text;
        this.nodeValue = this.data = text;
        this.length = text.length;
      },
      insertData: function(offset, text) {
        this.replaceData(offset, 0, text);
      },
      deleteData: function(offset, count) {
        this.replaceData(offset, count, "");
      },
      replaceData: function(offset, count, text) {
        var start = this.data.substring(0, offset);
        var end = this.data.substring(offset + count);
        text = start + text + end;
        this.nodeValue = this.data = text;
        this.length = text.length;
      }
    };
    _extends(CharacterData, Node);
    function Text(symbol) {
      checkSymbol(symbol);
    }
    Text.prototype = {
      nodeName: "#text",
      nodeType: TEXT_NODE2,
      splitText: function(offset) {
        var text = this.data;
        var newText = text.substring(offset);
        text = text.substring(0, offset);
        this.data = this.nodeValue = text;
        this.length = text.length;
        var newNode = this.ownerDocument.createTextNode(newText);
        if (this.parentNode) {
          this.parentNode.insertBefore(newNode, this.nextSibling);
        }
        return newNode;
      }
    };
    _extends(Text, CharacterData);
    function Comment(symbol) {
      checkSymbol(symbol);
    }
    Comment.prototype = {
      nodeName: "#comment",
      nodeType: COMMENT_NODE
    };
    _extends(Comment, CharacterData);
    function CDATASection(symbol) {
      checkSymbol(symbol);
    }
    CDATASection.prototype = {
      nodeName: "#cdata-section",
      nodeType: CDATA_SECTION_NODE2
    };
    _extends(CDATASection, Text);
    function DocumentType(symbol) {
      checkSymbol(symbol);
    }
    DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
    _extends(DocumentType, Node);
    function Notation(symbol) {
      checkSymbol(symbol);
    }
    Notation.prototype.nodeType = NOTATION_NODE;
    _extends(Notation, Node);
    function Entity(symbol) {
      checkSymbol(symbol);
    }
    Entity.prototype.nodeType = ENTITY_NODE;
    _extends(Entity, Node);
    function EntityReference(symbol) {
      checkSymbol(symbol);
    }
    EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
    _extends(EntityReference, Node);
    function DocumentFragment(symbol) {
      checkSymbol(symbol);
    }
    DocumentFragment.prototype.nodeName = "#document-fragment";
    DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
    _extends(DocumentFragment, Node);
    function ProcessingInstruction(symbol) {
      checkSymbol(symbol);
    }
    ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE2;
    _extends(ProcessingInstruction, CharacterData);
    function XMLSerializer() {
    }
    XMLSerializer.prototype.serializeToString = function(node, options) {
      return nodeSerializeToString.call(node, options);
    };
    Node.prototype.toString = nodeSerializeToString;
    function nodeSerializeToString(options) {
      var opts;
      if (typeof options === "function") {
        opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: options };
      } else if (options != null) {
        opts = {
          requireWellFormed: !!options.requireWellFormed,
          splitCDATASections: options.splitCDATASections !== false,
          nodeFilter: options.nodeFilter || null
        };
      } else {
        opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: null };
      }
      var buf = [];
      var refNode = this.nodeType === DOCUMENT_NODE && this.documentElement || this;
      var prefix = refNode.prefix;
      var uri = refNode.namespaceURI;
      if (uri && prefix == null) {
        var prefix = refNode.lookupPrefix(uri);
        if (prefix == null) {
          var visibleNamespaces = [
            { namespace: uri, prefix: null }
            //{namespace:uri,prefix:''}
          ];
        }
      }
      serializeToString(this, buf, visibleNamespaces, opts);
      return buf.join("");
    }
    function needNamespaceDefine(node, isHTML, visibleNamespaces) {
      var prefix = node.prefix || "";
      var uri = node.namespaceURI;
      if (!uri) {
        return false;
      }
      if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
        return false;
      }
      var i = visibleNamespaces.length;
      while (i--) {
        var ns = visibleNamespaces[i];
        if (ns.prefix === prefix) {
          return ns.namespace !== uri;
        }
      }
      return true;
    }
    function addSerializedAttribute(buf, qualifiedName, value, requireWellFormed) {
      if (requireWellFormed && !g.QName_exact.test(qualifiedName)) {
        throw new DOMException(
          'The attribute name "' + qualifiedName + '" is not a valid XML QName',
          DOMExceptionName.InvalidStateError
        );
      }
      buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
    }
    function serializeToString(node, buf, visibleNamespaces, opts) {
      if (!visibleNamespaces) {
        visibleNamespaces = [];
      }
      var nodeFilter = opts.nodeFilter;
      var requireWellFormed = opts.requireWellFormed;
      var splitCDATASections = opts.splitCDATASections;
      var doc = node.nodeType === DOCUMENT_NODE ? node : node.ownerDocument;
      var isHTML = doc.type === "html";
      walkDOM(
        node,
        { ns: visibleNamespaces },
        {
          enter: function(n, ctx) {
            var namespaces = ctx.ns;
            if (nodeFilter) {
              n = nodeFilter(n);
              if (n) {
                if (typeof n == "string") {
                  buf.push(n);
                  return null;
                }
              } else {
                return null;
              }
            }
            switch (n.nodeType) {
              case ELEMENT_NODE2:
                var attrs = n.attributes;
                var len = attrs.length;
                var nodeName = n.tagName;
                var prefixedNodeName = nodeName;
                if (!isHTML && !n.prefix && n.namespaceURI) {
                  var defaultNS;
                  for (var ai = 0; ai < attrs.length; ai++) {
                    if (attrs.item(ai).name === "xmlns") {
                      defaultNS = attrs.item(ai).value;
                      break;
                    }
                  }
                  if (!defaultNS) {
                    for (var nsi = namespaces.length - 1; nsi >= 0; nsi--) {
                      var nsEntry = namespaces[nsi];
                      if (nsEntry.prefix === "" && nsEntry.namespace === n.namespaceURI) {
                        defaultNS = nsEntry.namespace;
                        break;
                      }
                    }
                  }
                  if (defaultNS !== n.namespaceURI) {
                    for (var nsi = namespaces.length - 1; nsi >= 0; nsi--) {
                      var nsEntry = namespaces[nsi];
                      if (nsEntry.namespace === n.namespaceURI) {
                        if (nsEntry.prefix) {
                          prefixedNodeName = nsEntry.prefix + ":" + nodeName;
                        }
                        break;
                      }
                    }
                  }
                }
                if (requireWellFormed && !g.QName_exact.test(prefixedNodeName)) {
                  throw new DOMException(
                    'The element name "' + prefixedNodeName + '" is not a valid XML QName',
                    DOMExceptionName.InvalidStateError
                  );
                }
                buf.push("<", prefixedNodeName);
                var childNamespaces = namespaces.slice();
                for (var i = 0; i < len; i++) {
                  var attr = attrs.item(i);
                  if (attr.prefix == "xmlns") {
                    childNamespaces.push({
                      prefix: attr.localName,
                      namespace: attr.value
                    });
                  } else if (attr.nodeName == "xmlns") {
                    childNamespaces.push({ prefix: "", namespace: attr.value });
                  }
                }
                for (var i = 0; i < len; i++) {
                  var attr = attrs.item(i);
                  if (needNamespaceDefine(attr, isHTML, childNamespaces)) {
                    var attrPrefix = attr.prefix || "";
                    var uri = attr.namespaceURI;
                    addSerializedAttribute(buf, attrPrefix ? "xmlns:" + attrPrefix : "xmlns", uri, requireWellFormed);
                    childNamespaces.push({ prefix: attrPrefix, namespace: uri });
                  }
                  var filteredAttr = nodeFilter ? nodeFilter(attr) : attr;
                  if (filteredAttr) {
                    if (typeof filteredAttr === "string") {
                      buf.push(filteredAttr);
                    } else {
                      addSerializedAttribute(buf, filteredAttr.name, filteredAttr.value, requireWellFormed);
                    }
                  }
                }
                if (nodeName === prefixedNodeName && needNamespaceDefine(n, isHTML, childNamespaces)) {
                  var nodePrefix = n.prefix || "";
                  var uri = n.namespaceURI;
                  addSerializedAttribute(buf, nodePrefix ? "xmlns:" + nodePrefix : "xmlns", uri, requireWellFormed);
                  childNamespaces.push({ prefix: nodePrefix, namespace: uri });
                }
                var canCloseTag = !n.firstChild;
                if (canCloseTag && (isHTML || n.namespaceURI === NAMESPACE.HTML)) {
                  canCloseTag = isHTMLVoidElement(nodeName);
                }
                if (canCloseTag) {
                  buf.push("/>");
                  return null;
                }
                buf.push(">");
                if (isHTML && isHTMLRawTextElement(nodeName)) {
                  var child = n.firstChild;
                  while (child) {
                    if (child.data) {
                      buf.push(child.data);
                    } else {
                      serializeToString(child, buf, childNamespaces.slice(), opts);
                    }
                    child = child.nextSibling;
                  }
                  buf.push("</", prefixedNodeName, ">");
                  return null;
                }
                return { ns: childNamespaces, tag: prefixedNodeName };
              case DOCUMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                if (requireWellFormed && n.nodeType === DOCUMENT_NODE && n.documentElement == null) {
                  throw new DOMException("The Document has no documentElement", DOMExceptionName.InvalidStateError);
                }
                return { ns: namespaces };
              case ATTRIBUTE_NODE:
                addSerializedAttribute(buf, n.name, n.value, requireWellFormed);
                return null;
              case TEXT_NODE2:
                if (requireWellFormed && g.InvalidChar.test(n.data)) {
                  throw new DOMException(
                    "The Text node data contains characters outside the XML Char production",
                    DOMExceptionName.InvalidStateError
                  );
                }
                buf.push(n.data.replace(/[<&>]/g, _xmlEncoder));
                return null;
              case CDATA_SECTION_NODE2:
                if (requireWellFormed && n.data.indexOf("]]>") !== -1) {
                  throw new DOMException('The CDATASection data contains "]]>"', DOMExceptionName.InvalidStateError);
                }
                if (splitCDATASections) {
                  buf.push(g.CDATA_START, n.data.replace(/]]>/g, "]]]]><![CDATA[>"), g.CDATA_END);
                } else {
                  buf.push(g.CDATA_START, n.data, g.CDATA_END);
                }
                return null;
              case COMMENT_NODE:
                if (requireWellFormed) {
                  if (g.InvalidChar.test(n.data)) {
                    throw new DOMException(
                      "The comment node data contains characters outside the XML Char production",
                      DOMExceptionName.InvalidStateError
                    );
                  }
                  if (n.data.indexOf("--") !== -1 || n.data[n.data.length - 1] === "-") {
                    throw new DOMException(
                      'The comment node data contains "--" or ends with "-"',
                      DOMExceptionName.InvalidStateError
                    );
                  }
                }
                buf.push(g.COMMENT_START, n.data, g.COMMENT_END);
                return null;
              case DOCUMENT_TYPE_NODE:
                var pubid = n.publicId;
                var sysid = n.systemId;
                if (requireWellFormed) {
                  if (!g.Name_exact.test(n.name)) {
                    throw new DOMException(
                      'The doctype name "' + n.name + '" is not a valid XML Name',
                      DOMExceptionName.InvalidStateError
                    );
                  }
                  if (pubid && !g.PubidLiteral_match.test(pubid)) {
                    throw new DOMException("DocumentType publicId is not a valid PubidLiteral", DOMExceptionName.InvalidStateError);
                  }
                  if (sysid && sysid !== "." && !g.SystemLiteral_match.test(sysid)) {
                    throw new DOMException("DocumentType systemId is not a valid SystemLiteral", DOMExceptionName.InvalidStateError);
                  }
                  if (n.internalSubset && n.internalSubset.indexOf("]>") !== -1) {
                    throw new DOMException('DocumentType internalSubset contains "]>"', DOMExceptionName.InvalidStateError);
                  }
                }
                buf.push(g.DOCTYPE_DECL_START, " ", n.name);
                if (pubid) {
                  buf.push(" ", g.PUBLIC, " ", pubid);
                  if (sysid && sysid !== ".") {
                    buf.push(" ", sysid);
                  }
                } else if (sysid && sysid !== ".") {
                  buf.push(" ", g.SYSTEM, " ", sysid);
                }
                if (n.internalSubset) {
                  buf.push(" [", n.internalSubset, "]");
                }
                buf.push(">");
                return null;
              case PROCESSING_INSTRUCTION_NODE2:
                if (requireWellFormed) {
                  if (!g.NCName_exact.test(n.target) || n.target.toLowerCase() === "xml") {
                    throw new DOMException(
                      'The processing instruction target "' + n.target + '" is not a valid XML NCName or is reserved',
                      DOMExceptionName.InvalidStateError
                    );
                  }
                  if (g.InvalidChar.test(n.data)) {
                    throw new DOMException(
                      "The ProcessingInstruction data contains characters outside the XML Char production",
                      DOMExceptionName.InvalidStateError
                    );
                  }
                  if (n.data.indexOf("?>") !== -1) {
                    throw new DOMException('The ProcessingInstruction data contains "?>"', DOMExceptionName.InvalidStateError);
                  }
                }
                buf.push("<?", n.target, " ", n.data, "?>");
                return null;
              case ENTITY_REFERENCE_NODE:
                if (requireWellFormed && !g.Name_exact.test(n.nodeName)) {
                  throw new DOMException(
                    'The entity reference name "' + n.nodeName + '" is not a valid XML Name',
                    DOMExceptionName.InvalidStateError
                  );
                }
                buf.push("&", n.nodeName, ";");
                return null;
              //case ENTITY_NODE:
              //case NOTATION_NODE:
              default:
                buf.push("??", n.nodeName);
                return null;
            }
          },
          exit: function(n, childCtx) {
            if (childCtx && childCtx.tag) {
              buf.push("</", childCtx.tag, ">");
            }
          }
        }
      );
    }
    function importNode(doc, node, deep) {
      var destRoot;
      walkDOM(node, null, {
        enter: function(srcNode, destParent) {
          var destNode = srcNode.cloneNode(false);
          destNode.ownerDocument = doc;
          destNode.parentNode = null;
          if (destParent === null) {
            destRoot = destNode;
          } else {
            destParent.appendChild(destNode);
          }
          var shouldDeep = srcNode.nodeType === ATTRIBUTE_NODE || deep;
          return shouldDeep ? destNode : null;
        }
      });
      return destRoot;
    }
    function cloneNode(doc, node, deep) {
      var destRoot;
      walkDOM(node, null, {
        enter: function(srcNode, destParent) {
          var destNode = new srcNode.constructor(PDC);
          for (var n in srcNode) {
            if (hasOwn(srcNode, n)) {
              var v = srcNode[n];
              if (typeof v != "object") {
                if (v != destNode[n]) {
                  destNode[n] = v;
                }
              }
            }
          }
          if (srcNode.childNodes) {
            destNode.childNodes = new NodeList();
          }
          destNode.ownerDocument = doc;
          var shouldDeep = deep;
          switch (destNode.nodeType) {
            case ELEMENT_NODE2:
              var attrs = srcNode.attributes;
              var attrs2 = destNode.attributes = new NamedNodeMap();
              var len = attrs.length;
              attrs2._ownerElement = destNode;
              for (var i = 0; i < len; i++) {
                destNode.setAttributeNode(cloneNode(doc, attrs.item(i), true));
              }
              break;
            case ATTRIBUTE_NODE:
              shouldDeep = true;
          }
          if (destParent !== null) {
            destParent.appendChild(destNode);
          } else {
            destRoot = destNode;
          }
          return shouldDeep ? destNode : null;
        }
      });
      return destRoot;
    }
    function __set__(object, key, value) {
      object[key] = value;
    }
    function childrenRefresh(node) {
      var ls = [];
      var child = node.firstChild;
      while (child) {
        if (child.nodeType === ELEMENT_NODE2) {
          ls.push(child);
        }
        child = child.nextSibling;
      }
      return ls;
    }
    try {
      if (Object.defineProperty) {
        Object.defineProperty(LiveNodeList.prototype, "length", {
          get: function() {
            _updateLiveList(this);
            return this.$$length;
          }
        });
        Object.defineProperty(Node.prototype, "textContent", {
          get: function() {
            if (this.nodeType === ELEMENT_NODE2 || this.nodeType === DOCUMENT_FRAGMENT_NODE) {
              var buf = [];
              walkDOM(this, null, {
                enter: function(n) {
                  if (n.nodeType === ELEMENT_NODE2 || n.nodeType === DOCUMENT_FRAGMENT_NODE) {
                    return true;
                  }
                  if (n.nodeType === PROCESSING_INSTRUCTION_NODE2 || n.nodeType === COMMENT_NODE) {
                    return null;
                  }
                  buf.push(n.nodeValue);
                }
              });
              return buf.join("");
            }
            return this.nodeValue;
          },
          set: function(data) {
            switch (this.nodeType) {
              case ELEMENT_NODE2:
              case DOCUMENT_FRAGMENT_NODE:
                while (this.firstChild) {
                  this.removeChild(this.firstChild);
                }
                if (data || String(data)) {
                  this.appendChild(this.ownerDocument.createTextNode(data));
                }
                break;
              default:
                this.data = data;
                this.value = data;
                this.nodeValue = data;
            }
          }
        });
        Object.defineProperty(CharacterData.prototype, "data", {
          get: function() {
            return this._data != null ? this._data : "";
          },
          set: function(v) {
            this._data = v;
            this.length = typeof v === "string" ? v.length : 0;
          }
        });
        Object.defineProperty(CharacterData.prototype, "nodeValue", {
          get: function() {
            return this.data;
          },
          set: function(v) {
            this.data = v;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(Element.prototype, "children", {
          get: function() {
            return new LiveNodeList(this, childrenRefresh);
          }
        });
        Object.defineProperty(Document.prototype, "children", {
          get: function() {
            return new LiveNodeList(this, childrenRefresh);
          }
        });
        Object.defineProperty(DocumentFragment.prototype, "children", {
          get: function() {
            return new LiveNodeList(this, childrenRefresh);
          }
        });
        __set__ = function(object, key, value) {
          object["$$" + key] = value;
        };
      }
    } catch (e) {
    }
    exports._updateLiveList = _updateLiveList;
    exports.Attr = Attr;
    exports.CDATASection = CDATASection;
    exports.CharacterData = CharacterData;
    exports.Comment = Comment;
    exports.Document = Document;
    exports.DocumentFragment = DocumentFragment;
    exports.DocumentType = DocumentType;
    exports.DOMImplementation = DOMImplementation;
    exports.Element = Element;
    exports.Entity = Entity;
    exports.EntityReference = EntityReference;
    exports.LiveNodeList = LiveNodeList;
    exports.NamedNodeMap = NamedNodeMap;
    exports.Node = Node;
    exports.NodeList = NodeList;
    exports.Notation = Notation;
    exports.Text = Text;
    exports.ProcessingInstruction = ProcessingInstruction;
    exports.walkDOM = walkDOM;
    exports.XMLSerializer = XMLSerializer;
  }
});

// node_modules/@xmldom/xmldom/lib/entities.js
var require_entities = __commonJS({
  "node_modules/@xmldom/xmldom/lib/entities.js"(exports) {
    var freeze = require_conventions().freeze;
    exports.XML_ENTITIES = freeze({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    });
    exports.HTML_ENTITIES = freeze({
      Aacute: "\xC1",
      aacute: "\xE1",
      Abreve: "\u0102",
      abreve: "\u0103",
      ac: "\u223E",
      acd: "\u223F",
      acE: "\u223E\u0333",
      Acirc: "\xC2",
      acirc: "\xE2",
      acute: "\xB4",
      Acy: "\u0410",
      acy: "\u0430",
      AElig: "\xC6",
      aelig: "\xE6",
      af: "\u2061",
      Afr: "\u{1D504}",
      afr: "\u{1D51E}",
      Agrave: "\xC0",
      agrave: "\xE0",
      alefsym: "\u2135",
      aleph: "\u2135",
      Alpha: "\u0391",
      alpha: "\u03B1",
      Amacr: "\u0100",
      amacr: "\u0101",
      amalg: "\u2A3F",
      AMP: "&",
      amp: "&",
      And: "\u2A53",
      and: "\u2227",
      andand: "\u2A55",
      andd: "\u2A5C",
      andslope: "\u2A58",
      andv: "\u2A5A",
      ang: "\u2220",
      ange: "\u29A4",
      angle: "\u2220",
      angmsd: "\u2221",
      angmsdaa: "\u29A8",
      angmsdab: "\u29A9",
      angmsdac: "\u29AA",
      angmsdad: "\u29AB",
      angmsdae: "\u29AC",
      angmsdaf: "\u29AD",
      angmsdag: "\u29AE",
      angmsdah: "\u29AF",
      angrt: "\u221F",
      angrtvb: "\u22BE",
      angrtvbd: "\u299D",
      angsph: "\u2222",
      angst: "\xC5",
      angzarr: "\u237C",
      Aogon: "\u0104",
      aogon: "\u0105",
      Aopf: "\u{1D538}",
      aopf: "\u{1D552}",
      ap: "\u2248",
      apacir: "\u2A6F",
      apE: "\u2A70",
      ape: "\u224A",
      apid: "\u224B",
      apos: "'",
      ApplyFunction: "\u2061",
      approx: "\u2248",
      approxeq: "\u224A",
      Aring: "\xC5",
      aring: "\xE5",
      Ascr: "\u{1D49C}",
      ascr: "\u{1D4B6}",
      Assign: "\u2254",
      ast: "*",
      asymp: "\u2248",
      asympeq: "\u224D",
      Atilde: "\xC3",
      atilde: "\xE3",
      Auml: "\xC4",
      auml: "\xE4",
      awconint: "\u2233",
      awint: "\u2A11",
      backcong: "\u224C",
      backepsilon: "\u03F6",
      backprime: "\u2035",
      backsim: "\u223D",
      backsimeq: "\u22CD",
      Backslash: "\u2216",
      Barv: "\u2AE7",
      barvee: "\u22BD",
      Barwed: "\u2306",
      barwed: "\u2305",
      barwedge: "\u2305",
      bbrk: "\u23B5",
      bbrktbrk: "\u23B6",
      bcong: "\u224C",
      Bcy: "\u0411",
      bcy: "\u0431",
      bdquo: "\u201E",
      becaus: "\u2235",
      Because: "\u2235",
      because: "\u2235",
      bemptyv: "\u29B0",
      bepsi: "\u03F6",
      bernou: "\u212C",
      Bernoullis: "\u212C",
      Beta: "\u0392",
      beta: "\u03B2",
      beth: "\u2136",
      between: "\u226C",
      Bfr: "\u{1D505}",
      bfr: "\u{1D51F}",
      bigcap: "\u22C2",
      bigcirc: "\u25EF",
      bigcup: "\u22C3",
      bigodot: "\u2A00",
      bigoplus: "\u2A01",
      bigotimes: "\u2A02",
      bigsqcup: "\u2A06",
      bigstar: "\u2605",
      bigtriangledown: "\u25BD",
      bigtriangleup: "\u25B3",
      biguplus: "\u2A04",
      bigvee: "\u22C1",
      bigwedge: "\u22C0",
      bkarow: "\u290D",
      blacklozenge: "\u29EB",
      blacksquare: "\u25AA",
      blacktriangle: "\u25B4",
      blacktriangledown: "\u25BE",
      blacktriangleleft: "\u25C2",
      blacktriangleright: "\u25B8",
      blank: "\u2423",
      blk12: "\u2592",
      blk14: "\u2591",
      blk34: "\u2593",
      block: "\u2588",
      bne: "=\u20E5",
      bnequiv: "\u2261\u20E5",
      bNot: "\u2AED",
      bnot: "\u2310",
      Bopf: "\u{1D539}",
      bopf: "\u{1D553}",
      bot: "\u22A5",
      bottom: "\u22A5",
      bowtie: "\u22C8",
      boxbox: "\u29C9",
      boxDL: "\u2557",
      boxDl: "\u2556",
      boxdL: "\u2555",
      boxdl: "\u2510",
      boxDR: "\u2554",
      boxDr: "\u2553",
      boxdR: "\u2552",
      boxdr: "\u250C",
      boxH: "\u2550",
      boxh: "\u2500",
      boxHD: "\u2566",
      boxHd: "\u2564",
      boxhD: "\u2565",
      boxhd: "\u252C",
      boxHU: "\u2569",
      boxHu: "\u2567",
      boxhU: "\u2568",
      boxhu: "\u2534",
      boxminus: "\u229F",
      boxplus: "\u229E",
      boxtimes: "\u22A0",
      boxUL: "\u255D",
      boxUl: "\u255C",
      boxuL: "\u255B",
      boxul: "\u2518",
      boxUR: "\u255A",
      boxUr: "\u2559",
      boxuR: "\u2558",
      boxur: "\u2514",
      boxV: "\u2551",
      boxv: "\u2502",
      boxVH: "\u256C",
      boxVh: "\u256B",
      boxvH: "\u256A",
      boxvh: "\u253C",
      boxVL: "\u2563",
      boxVl: "\u2562",
      boxvL: "\u2561",
      boxvl: "\u2524",
      boxVR: "\u2560",
      boxVr: "\u255F",
      boxvR: "\u255E",
      boxvr: "\u251C",
      bprime: "\u2035",
      Breve: "\u02D8",
      breve: "\u02D8",
      brvbar: "\xA6",
      Bscr: "\u212C",
      bscr: "\u{1D4B7}",
      bsemi: "\u204F",
      bsim: "\u223D",
      bsime: "\u22CD",
      bsol: "\\",
      bsolb: "\u29C5",
      bsolhsub: "\u27C8",
      bull: "\u2022",
      bullet: "\u2022",
      bump: "\u224E",
      bumpE: "\u2AAE",
      bumpe: "\u224F",
      Bumpeq: "\u224E",
      bumpeq: "\u224F",
      Cacute: "\u0106",
      cacute: "\u0107",
      Cap: "\u22D2",
      cap: "\u2229",
      capand: "\u2A44",
      capbrcup: "\u2A49",
      capcap: "\u2A4B",
      capcup: "\u2A47",
      capdot: "\u2A40",
      CapitalDifferentialD: "\u2145",
      caps: "\u2229\uFE00",
      caret: "\u2041",
      caron: "\u02C7",
      Cayleys: "\u212D",
      ccaps: "\u2A4D",
      Ccaron: "\u010C",
      ccaron: "\u010D",
      Ccedil: "\xC7",
      ccedil: "\xE7",
      Ccirc: "\u0108",
      ccirc: "\u0109",
      Cconint: "\u2230",
      ccups: "\u2A4C",
      ccupssm: "\u2A50",
      Cdot: "\u010A",
      cdot: "\u010B",
      cedil: "\xB8",
      Cedilla: "\xB8",
      cemptyv: "\u29B2",
      cent: "\xA2",
      CenterDot: "\xB7",
      centerdot: "\xB7",
      Cfr: "\u212D",
      cfr: "\u{1D520}",
      CHcy: "\u0427",
      chcy: "\u0447",
      check: "\u2713",
      checkmark: "\u2713",
      Chi: "\u03A7",
      chi: "\u03C7",
      cir: "\u25CB",
      circ: "\u02C6",
      circeq: "\u2257",
      circlearrowleft: "\u21BA",
      circlearrowright: "\u21BB",
      circledast: "\u229B",
      circledcirc: "\u229A",
      circleddash: "\u229D",
      CircleDot: "\u2299",
      circledR: "\xAE",
      circledS: "\u24C8",
      CircleMinus: "\u2296",
      CirclePlus: "\u2295",
      CircleTimes: "\u2297",
      cirE: "\u29C3",
      cire: "\u2257",
      cirfnint: "\u2A10",
      cirmid: "\u2AEF",
      cirscir: "\u29C2",
      ClockwiseContourIntegral: "\u2232",
      CloseCurlyDoubleQuote: "\u201D",
      CloseCurlyQuote: "\u2019",
      clubs: "\u2663",
      clubsuit: "\u2663",
      Colon: "\u2237",
      colon: ":",
      Colone: "\u2A74",
      colone: "\u2254",
      coloneq: "\u2254",
      comma: ",",
      commat: "@",
      comp: "\u2201",
      compfn: "\u2218",
      complement: "\u2201",
      complexes: "\u2102",
      cong: "\u2245",
      congdot: "\u2A6D",
      Congruent: "\u2261",
      Conint: "\u222F",
      conint: "\u222E",
      ContourIntegral: "\u222E",
      Copf: "\u2102",
      copf: "\u{1D554}",
      coprod: "\u2210",
      Coproduct: "\u2210",
      COPY: "\xA9",
      copy: "\xA9",
      copysr: "\u2117",
      CounterClockwiseContourIntegral: "\u2233",
      crarr: "\u21B5",
      Cross: "\u2A2F",
      cross: "\u2717",
      Cscr: "\u{1D49E}",
      cscr: "\u{1D4B8}",
      csub: "\u2ACF",
      csube: "\u2AD1",
      csup: "\u2AD0",
      csupe: "\u2AD2",
      ctdot: "\u22EF",
      cudarrl: "\u2938",
      cudarrr: "\u2935",
      cuepr: "\u22DE",
      cuesc: "\u22DF",
      cularr: "\u21B6",
      cularrp: "\u293D",
      Cup: "\u22D3",
      cup: "\u222A",
      cupbrcap: "\u2A48",
      CupCap: "\u224D",
      cupcap: "\u2A46",
      cupcup: "\u2A4A",
      cupdot: "\u228D",
      cupor: "\u2A45",
      cups: "\u222A\uFE00",
      curarr: "\u21B7",
      curarrm: "\u293C",
      curlyeqprec: "\u22DE",
      curlyeqsucc: "\u22DF",
      curlyvee: "\u22CE",
      curlywedge: "\u22CF",
      curren: "\xA4",
      curvearrowleft: "\u21B6",
      curvearrowright: "\u21B7",
      cuvee: "\u22CE",
      cuwed: "\u22CF",
      cwconint: "\u2232",
      cwint: "\u2231",
      cylcty: "\u232D",
      Dagger: "\u2021",
      dagger: "\u2020",
      daleth: "\u2138",
      Darr: "\u21A1",
      dArr: "\u21D3",
      darr: "\u2193",
      dash: "\u2010",
      Dashv: "\u2AE4",
      dashv: "\u22A3",
      dbkarow: "\u290F",
      dblac: "\u02DD",
      Dcaron: "\u010E",
      dcaron: "\u010F",
      Dcy: "\u0414",
      dcy: "\u0434",
      DD: "\u2145",
      dd: "\u2146",
      ddagger: "\u2021",
      ddarr: "\u21CA",
      DDotrahd: "\u2911",
      ddotseq: "\u2A77",
      deg: "\xB0",
      Del: "\u2207",
      Delta: "\u0394",
      delta: "\u03B4",
      demptyv: "\u29B1",
      dfisht: "\u297F",
      Dfr: "\u{1D507}",
      dfr: "\u{1D521}",
      dHar: "\u2965",
      dharl: "\u21C3",
      dharr: "\u21C2",
      DiacriticalAcute: "\xB4",
      DiacriticalDot: "\u02D9",
      DiacriticalDoubleAcute: "\u02DD",
      DiacriticalGrave: "`",
      DiacriticalTilde: "\u02DC",
      diam: "\u22C4",
      Diamond: "\u22C4",
      diamond: "\u22C4",
      diamondsuit: "\u2666",
      diams: "\u2666",
      die: "\xA8",
      DifferentialD: "\u2146",
      digamma: "\u03DD",
      disin: "\u22F2",
      div: "\xF7",
      divide: "\xF7",
      divideontimes: "\u22C7",
      divonx: "\u22C7",
      DJcy: "\u0402",
      djcy: "\u0452",
      dlcorn: "\u231E",
      dlcrop: "\u230D",
      dollar: "$",
      Dopf: "\u{1D53B}",
      dopf: "\u{1D555}",
      Dot: "\xA8",
      dot: "\u02D9",
      DotDot: "\u20DC",
      doteq: "\u2250",
      doteqdot: "\u2251",
      DotEqual: "\u2250",
      dotminus: "\u2238",
      dotplus: "\u2214",
      dotsquare: "\u22A1",
      doublebarwedge: "\u2306",
      DoubleContourIntegral: "\u222F",
      DoubleDot: "\xA8",
      DoubleDownArrow: "\u21D3",
      DoubleLeftArrow: "\u21D0",
      DoubleLeftRightArrow: "\u21D4",
      DoubleLeftTee: "\u2AE4",
      DoubleLongLeftArrow: "\u27F8",
      DoubleLongLeftRightArrow: "\u27FA",
      DoubleLongRightArrow: "\u27F9",
      DoubleRightArrow: "\u21D2",
      DoubleRightTee: "\u22A8",
      DoubleUpArrow: "\u21D1",
      DoubleUpDownArrow: "\u21D5",
      DoubleVerticalBar: "\u2225",
      DownArrow: "\u2193",
      Downarrow: "\u21D3",
      downarrow: "\u2193",
      DownArrowBar: "\u2913",
      DownArrowUpArrow: "\u21F5",
      DownBreve: "\u0311",
      downdownarrows: "\u21CA",
      downharpoonleft: "\u21C3",
      downharpoonright: "\u21C2",
      DownLeftRightVector: "\u2950",
      DownLeftTeeVector: "\u295E",
      DownLeftVector: "\u21BD",
      DownLeftVectorBar: "\u2956",
      DownRightTeeVector: "\u295F",
      DownRightVector: "\u21C1",
      DownRightVectorBar: "\u2957",
      DownTee: "\u22A4",
      DownTeeArrow: "\u21A7",
      drbkarow: "\u2910",
      drcorn: "\u231F",
      drcrop: "\u230C",
      Dscr: "\u{1D49F}",
      dscr: "\u{1D4B9}",
      DScy: "\u0405",
      dscy: "\u0455",
      dsol: "\u29F6",
      Dstrok: "\u0110",
      dstrok: "\u0111",
      dtdot: "\u22F1",
      dtri: "\u25BF",
      dtrif: "\u25BE",
      duarr: "\u21F5",
      duhar: "\u296F",
      dwangle: "\u29A6",
      DZcy: "\u040F",
      dzcy: "\u045F",
      dzigrarr: "\u27FF",
      Eacute: "\xC9",
      eacute: "\xE9",
      easter: "\u2A6E",
      Ecaron: "\u011A",
      ecaron: "\u011B",
      ecir: "\u2256",
      Ecirc: "\xCA",
      ecirc: "\xEA",
      ecolon: "\u2255",
      Ecy: "\u042D",
      ecy: "\u044D",
      eDDot: "\u2A77",
      Edot: "\u0116",
      eDot: "\u2251",
      edot: "\u0117",
      ee: "\u2147",
      efDot: "\u2252",
      Efr: "\u{1D508}",
      efr: "\u{1D522}",
      eg: "\u2A9A",
      Egrave: "\xC8",
      egrave: "\xE8",
      egs: "\u2A96",
      egsdot: "\u2A98",
      el: "\u2A99",
      Element: "\u2208",
      elinters: "\u23E7",
      ell: "\u2113",
      els: "\u2A95",
      elsdot: "\u2A97",
      Emacr: "\u0112",
      emacr: "\u0113",
      empty: "\u2205",
      emptyset: "\u2205",
      EmptySmallSquare: "\u25FB",
      emptyv: "\u2205",
      EmptyVerySmallSquare: "\u25AB",
      emsp: "\u2003",
      emsp13: "\u2004",
      emsp14: "\u2005",
      ENG: "\u014A",
      eng: "\u014B",
      ensp: "\u2002",
      Eogon: "\u0118",
      eogon: "\u0119",
      Eopf: "\u{1D53C}",
      eopf: "\u{1D556}",
      epar: "\u22D5",
      eparsl: "\u29E3",
      eplus: "\u2A71",
      epsi: "\u03B5",
      Epsilon: "\u0395",
      epsilon: "\u03B5",
      epsiv: "\u03F5",
      eqcirc: "\u2256",
      eqcolon: "\u2255",
      eqsim: "\u2242",
      eqslantgtr: "\u2A96",
      eqslantless: "\u2A95",
      Equal: "\u2A75",
      equals: "=",
      EqualTilde: "\u2242",
      equest: "\u225F",
      Equilibrium: "\u21CC",
      equiv: "\u2261",
      equivDD: "\u2A78",
      eqvparsl: "\u29E5",
      erarr: "\u2971",
      erDot: "\u2253",
      Escr: "\u2130",
      escr: "\u212F",
      esdot: "\u2250",
      Esim: "\u2A73",
      esim: "\u2242",
      Eta: "\u0397",
      eta: "\u03B7",
      ETH: "\xD0",
      eth: "\xF0",
      Euml: "\xCB",
      euml: "\xEB",
      euro: "\u20AC",
      excl: "!",
      exist: "\u2203",
      Exists: "\u2203",
      expectation: "\u2130",
      ExponentialE: "\u2147",
      exponentiale: "\u2147",
      fallingdotseq: "\u2252",
      Fcy: "\u0424",
      fcy: "\u0444",
      female: "\u2640",
      ffilig: "\uFB03",
      fflig: "\uFB00",
      ffllig: "\uFB04",
      Ffr: "\u{1D509}",
      ffr: "\u{1D523}",
      filig: "\uFB01",
      FilledSmallSquare: "\u25FC",
      FilledVerySmallSquare: "\u25AA",
      fjlig: "fj",
      flat: "\u266D",
      fllig: "\uFB02",
      fltns: "\u25B1",
      fnof: "\u0192",
      Fopf: "\u{1D53D}",
      fopf: "\u{1D557}",
      ForAll: "\u2200",
      forall: "\u2200",
      fork: "\u22D4",
      forkv: "\u2AD9",
      Fouriertrf: "\u2131",
      fpartint: "\u2A0D",
      frac12: "\xBD",
      frac13: "\u2153",
      frac14: "\xBC",
      frac15: "\u2155",
      frac16: "\u2159",
      frac18: "\u215B",
      frac23: "\u2154",
      frac25: "\u2156",
      frac34: "\xBE",
      frac35: "\u2157",
      frac38: "\u215C",
      frac45: "\u2158",
      frac56: "\u215A",
      frac58: "\u215D",
      frac78: "\u215E",
      frasl: "\u2044",
      frown: "\u2322",
      Fscr: "\u2131",
      fscr: "\u{1D4BB}",
      gacute: "\u01F5",
      Gamma: "\u0393",
      gamma: "\u03B3",
      Gammad: "\u03DC",
      gammad: "\u03DD",
      gap: "\u2A86",
      Gbreve: "\u011E",
      gbreve: "\u011F",
      Gcedil: "\u0122",
      Gcirc: "\u011C",
      gcirc: "\u011D",
      Gcy: "\u0413",
      gcy: "\u0433",
      Gdot: "\u0120",
      gdot: "\u0121",
      gE: "\u2267",
      ge: "\u2265",
      gEl: "\u2A8C",
      gel: "\u22DB",
      geq: "\u2265",
      geqq: "\u2267",
      geqslant: "\u2A7E",
      ges: "\u2A7E",
      gescc: "\u2AA9",
      gesdot: "\u2A80",
      gesdoto: "\u2A82",
      gesdotol: "\u2A84",
      gesl: "\u22DB\uFE00",
      gesles: "\u2A94",
      Gfr: "\u{1D50A}",
      gfr: "\u{1D524}",
      Gg: "\u22D9",
      gg: "\u226B",
      ggg: "\u22D9",
      gimel: "\u2137",
      GJcy: "\u0403",
      gjcy: "\u0453",
      gl: "\u2277",
      gla: "\u2AA5",
      glE: "\u2A92",
      glj: "\u2AA4",
      gnap: "\u2A8A",
      gnapprox: "\u2A8A",
      gnE: "\u2269",
      gne: "\u2A88",
      gneq: "\u2A88",
      gneqq: "\u2269",
      gnsim: "\u22E7",
      Gopf: "\u{1D53E}",
      gopf: "\u{1D558}",
      grave: "`",
      GreaterEqual: "\u2265",
      GreaterEqualLess: "\u22DB",
      GreaterFullEqual: "\u2267",
      GreaterGreater: "\u2AA2",
      GreaterLess: "\u2277",
      GreaterSlantEqual: "\u2A7E",
      GreaterTilde: "\u2273",
      Gscr: "\u{1D4A2}",
      gscr: "\u210A",
      gsim: "\u2273",
      gsime: "\u2A8E",
      gsiml: "\u2A90",
      Gt: "\u226B",
      GT: ">",
      gt: ">",
      gtcc: "\u2AA7",
      gtcir: "\u2A7A",
      gtdot: "\u22D7",
      gtlPar: "\u2995",
      gtquest: "\u2A7C",
      gtrapprox: "\u2A86",
      gtrarr: "\u2978",
      gtrdot: "\u22D7",
      gtreqless: "\u22DB",
      gtreqqless: "\u2A8C",
      gtrless: "\u2277",
      gtrsim: "\u2273",
      gvertneqq: "\u2269\uFE00",
      gvnE: "\u2269\uFE00",
      Hacek: "\u02C7",
      hairsp: "\u200A",
      half: "\xBD",
      hamilt: "\u210B",
      HARDcy: "\u042A",
      hardcy: "\u044A",
      hArr: "\u21D4",
      harr: "\u2194",
      harrcir: "\u2948",
      harrw: "\u21AD",
      Hat: "^",
      hbar: "\u210F",
      Hcirc: "\u0124",
      hcirc: "\u0125",
      hearts: "\u2665",
      heartsuit: "\u2665",
      hellip: "\u2026",
      hercon: "\u22B9",
      Hfr: "\u210C",
      hfr: "\u{1D525}",
      HilbertSpace: "\u210B",
      hksearow: "\u2925",
      hkswarow: "\u2926",
      hoarr: "\u21FF",
      homtht: "\u223B",
      hookleftarrow: "\u21A9",
      hookrightarrow: "\u21AA",
      Hopf: "\u210D",
      hopf: "\u{1D559}",
      horbar: "\u2015",
      HorizontalLine: "\u2500",
      Hscr: "\u210B",
      hscr: "\u{1D4BD}",
      hslash: "\u210F",
      Hstrok: "\u0126",
      hstrok: "\u0127",
      HumpDownHump: "\u224E",
      HumpEqual: "\u224F",
      hybull: "\u2043",
      hyphen: "\u2010",
      Iacute: "\xCD",
      iacute: "\xED",
      ic: "\u2063",
      Icirc: "\xCE",
      icirc: "\xEE",
      Icy: "\u0418",
      icy: "\u0438",
      Idot: "\u0130",
      IEcy: "\u0415",
      iecy: "\u0435",
      iexcl: "\xA1",
      iff: "\u21D4",
      Ifr: "\u2111",
      ifr: "\u{1D526}",
      Igrave: "\xCC",
      igrave: "\xEC",
      ii: "\u2148",
      iiiint: "\u2A0C",
      iiint: "\u222D",
      iinfin: "\u29DC",
      iiota: "\u2129",
      IJlig: "\u0132",
      ijlig: "\u0133",
      Im: "\u2111",
      Imacr: "\u012A",
      imacr: "\u012B",
      image: "\u2111",
      ImaginaryI: "\u2148",
      imagline: "\u2110",
      imagpart: "\u2111",
      imath: "\u0131",
      imof: "\u22B7",
      imped: "\u01B5",
      Implies: "\u21D2",
      in: "\u2208",
      incare: "\u2105",
      infin: "\u221E",
      infintie: "\u29DD",
      inodot: "\u0131",
      Int: "\u222C",
      int: "\u222B",
      intcal: "\u22BA",
      integers: "\u2124",
      Integral: "\u222B",
      intercal: "\u22BA",
      Intersection: "\u22C2",
      intlarhk: "\u2A17",
      intprod: "\u2A3C",
      InvisibleComma: "\u2063",
      InvisibleTimes: "\u2062",
      IOcy: "\u0401",
      iocy: "\u0451",
      Iogon: "\u012E",
      iogon: "\u012F",
      Iopf: "\u{1D540}",
      iopf: "\u{1D55A}",
      Iota: "\u0399",
      iota: "\u03B9",
      iprod: "\u2A3C",
      iquest: "\xBF",
      Iscr: "\u2110",
      iscr: "\u{1D4BE}",
      isin: "\u2208",
      isindot: "\u22F5",
      isinE: "\u22F9",
      isins: "\u22F4",
      isinsv: "\u22F3",
      isinv: "\u2208",
      it: "\u2062",
      Itilde: "\u0128",
      itilde: "\u0129",
      Iukcy: "\u0406",
      iukcy: "\u0456",
      Iuml: "\xCF",
      iuml: "\xEF",
      Jcirc: "\u0134",
      jcirc: "\u0135",
      Jcy: "\u0419",
      jcy: "\u0439",
      Jfr: "\u{1D50D}",
      jfr: "\u{1D527}",
      jmath: "\u0237",
      Jopf: "\u{1D541}",
      jopf: "\u{1D55B}",
      Jscr: "\u{1D4A5}",
      jscr: "\u{1D4BF}",
      Jsercy: "\u0408",
      jsercy: "\u0458",
      Jukcy: "\u0404",
      jukcy: "\u0454",
      Kappa: "\u039A",
      kappa: "\u03BA",
      kappav: "\u03F0",
      Kcedil: "\u0136",
      kcedil: "\u0137",
      Kcy: "\u041A",
      kcy: "\u043A",
      Kfr: "\u{1D50E}",
      kfr: "\u{1D528}",
      kgreen: "\u0138",
      KHcy: "\u0425",
      khcy: "\u0445",
      KJcy: "\u040C",
      kjcy: "\u045C",
      Kopf: "\u{1D542}",
      kopf: "\u{1D55C}",
      Kscr: "\u{1D4A6}",
      kscr: "\u{1D4C0}",
      lAarr: "\u21DA",
      Lacute: "\u0139",
      lacute: "\u013A",
      laemptyv: "\u29B4",
      lagran: "\u2112",
      Lambda: "\u039B",
      lambda: "\u03BB",
      Lang: "\u27EA",
      lang: "\u27E8",
      langd: "\u2991",
      langle: "\u27E8",
      lap: "\u2A85",
      Laplacetrf: "\u2112",
      laquo: "\xAB",
      Larr: "\u219E",
      lArr: "\u21D0",
      larr: "\u2190",
      larrb: "\u21E4",
      larrbfs: "\u291F",
      larrfs: "\u291D",
      larrhk: "\u21A9",
      larrlp: "\u21AB",
      larrpl: "\u2939",
      larrsim: "\u2973",
      larrtl: "\u21A2",
      lat: "\u2AAB",
      lAtail: "\u291B",
      latail: "\u2919",
      late: "\u2AAD",
      lates: "\u2AAD\uFE00",
      lBarr: "\u290E",
      lbarr: "\u290C",
      lbbrk: "\u2772",
      lbrace: "{",
      lbrack: "[",
      lbrke: "\u298B",
      lbrksld: "\u298F",
      lbrkslu: "\u298D",
      Lcaron: "\u013D",
      lcaron: "\u013E",
      Lcedil: "\u013B",
      lcedil: "\u013C",
      lceil: "\u2308",
      lcub: "{",
      Lcy: "\u041B",
      lcy: "\u043B",
      ldca: "\u2936",
      ldquo: "\u201C",
      ldquor: "\u201E",
      ldrdhar: "\u2967",
      ldrushar: "\u294B",
      ldsh: "\u21B2",
      lE: "\u2266",
      le: "\u2264",
      LeftAngleBracket: "\u27E8",
      LeftArrow: "\u2190",
      Leftarrow: "\u21D0",
      leftarrow: "\u2190",
      LeftArrowBar: "\u21E4",
      LeftArrowRightArrow: "\u21C6",
      leftarrowtail: "\u21A2",
      LeftCeiling: "\u2308",
      LeftDoubleBracket: "\u27E6",
      LeftDownTeeVector: "\u2961",
      LeftDownVector: "\u21C3",
      LeftDownVectorBar: "\u2959",
      LeftFloor: "\u230A",
      leftharpoondown: "\u21BD",
      leftharpoonup: "\u21BC",
      leftleftarrows: "\u21C7",
      LeftRightArrow: "\u2194",
      Leftrightarrow: "\u21D4",
      leftrightarrow: "\u2194",
      leftrightarrows: "\u21C6",
      leftrightharpoons: "\u21CB",
      leftrightsquigarrow: "\u21AD",
      LeftRightVector: "\u294E",
      LeftTee: "\u22A3",
      LeftTeeArrow: "\u21A4",
      LeftTeeVector: "\u295A",
      leftthreetimes: "\u22CB",
      LeftTriangle: "\u22B2",
      LeftTriangleBar: "\u29CF",
      LeftTriangleEqual: "\u22B4",
      LeftUpDownVector: "\u2951",
      LeftUpTeeVector: "\u2960",
      LeftUpVector: "\u21BF",
      LeftUpVectorBar: "\u2958",
      LeftVector: "\u21BC",
      LeftVectorBar: "\u2952",
      lEg: "\u2A8B",
      leg: "\u22DA",
      leq: "\u2264",
      leqq: "\u2266",
      leqslant: "\u2A7D",
      les: "\u2A7D",
      lescc: "\u2AA8",
      lesdot: "\u2A7F",
      lesdoto: "\u2A81",
      lesdotor: "\u2A83",
      lesg: "\u22DA\uFE00",
      lesges: "\u2A93",
      lessapprox: "\u2A85",
      lessdot: "\u22D6",
      lesseqgtr: "\u22DA",
      lesseqqgtr: "\u2A8B",
      LessEqualGreater: "\u22DA",
      LessFullEqual: "\u2266",
      LessGreater: "\u2276",
      lessgtr: "\u2276",
      LessLess: "\u2AA1",
      lesssim: "\u2272",
      LessSlantEqual: "\u2A7D",
      LessTilde: "\u2272",
      lfisht: "\u297C",
      lfloor: "\u230A",
      Lfr: "\u{1D50F}",
      lfr: "\u{1D529}",
      lg: "\u2276",
      lgE: "\u2A91",
      lHar: "\u2962",
      lhard: "\u21BD",
      lharu: "\u21BC",
      lharul: "\u296A",
      lhblk: "\u2584",
      LJcy: "\u0409",
      ljcy: "\u0459",
      Ll: "\u22D8",
      ll: "\u226A",
      llarr: "\u21C7",
      llcorner: "\u231E",
      Lleftarrow: "\u21DA",
      llhard: "\u296B",
      lltri: "\u25FA",
      Lmidot: "\u013F",
      lmidot: "\u0140",
      lmoust: "\u23B0",
      lmoustache: "\u23B0",
      lnap: "\u2A89",
      lnapprox: "\u2A89",
      lnE: "\u2268",
      lne: "\u2A87",
      lneq: "\u2A87",
      lneqq: "\u2268",
      lnsim: "\u22E6",
      loang: "\u27EC",
      loarr: "\u21FD",
      lobrk: "\u27E6",
      LongLeftArrow: "\u27F5",
      Longleftarrow: "\u27F8",
      longleftarrow: "\u27F5",
      LongLeftRightArrow: "\u27F7",
      Longleftrightarrow: "\u27FA",
      longleftrightarrow: "\u27F7",
      longmapsto: "\u27FC",
      LongRightArrow: "\u27F6",
      Longrightarrow: "\u27F9",
      longrightarrow: "\u27F6",
      looparrowleft: "\u21AB",
      looparrowright: "\u21AC",
      lopar: "\u2985",
      Lopf: "\u{1D543}",
      lopf: "\u{1D55D}",
      loplus: "\u2A2D",
      lotimes: "\u2A34",
      lowast: "\u2217",
      lowbar: "_",
      LowerLeftArrow: "\u2199",
      LowerRightArrow: "\u2198",
      loz: "\u25CA",
      lozenge: "\u25CA",
      lozf: "\u29EB",
      lpar: "(",
      lparlt: "\u2993",
      lrarr: "\u21C6",
      lrcorner: "\u231F",
      lrhar: "\u21CB",
      lrhard: "\u296D",
      lrm: "\u200E",
      lrtri: "\u22BF",
      lsaquo: "\u2039",
      Lscr: "\u2112",
      lscr: "\u{1D4C1}",
      Lsh: "\u21B0",
      lsh: "\u21B0",
      lsim: "\u2272",
      lsime: "\u2A8D",
      lsimg: "\u2A8F",
      lsqb: "[",
      lsquo: "\u2018",
      lsquor: "\u201A",
      Lstrok: "\u0141",
      lstrok: "\u0142",
      Lt: "\u226A",
      LT: "<",
      lt: "<",
      ltcc: "\u2AA6",
      ltcir: "\u2A79",
      ltdot: "\u22D6",
      lthree: "\u22CB",
      ltimes: "\u22C9",
      ltlarr: "\u2976",
      ltquest: "\u2A7B",
      ltri: "\u25C3",
      ltrie: "\u22B4",
      ltrif: "\u25C2",
      ltrPar: "\u2996",
      lurdshar: "\u294A",
      luruhar: "\u2966",
      lvertneqq: "\u2268\uFE00",
      lvnE: "\u2268\uFE00",
      macr: "\xAF",
      male: "\u2642",
      malt: "\u2720",
      maltese: "\u2720",
      Map: "\u2905",
      map: "\u21A6",
      mapsto: "\u21A6",
      mapstodown: "\u21A7",
      mapstoleft: "\u21A4",
      mapstoup: "\u21A5",
      marker: "\u25AE",
      mcomma: "\u2A29",
      Mcy: "\u041C",
      mcy: "\u043C",
      mdash: "\u2014",
      mDDot: "\u223A",
      measuredangle: "\u2221",
      MediumSpace: "\u205F",
      Mellintrf: "\u2133",
      Mfr: "\u{1D510}",
      mfr: "\u{1D52A}",
      mho: "\u2127",
      micro: "\xB5",
      mid: "\u2223",
      midast: "*",
      midcir: "\u2AF0",
      middot: "\xB7",
      minus: "\u2212",
      minusb: "\u229F",
      minusd: "\u2238",
      minusdu: "\u2A2A",
      MinusPlus: "\u2213",
      mlcp: "\u2ADB",
      mldr: "\u2026",
      mnplus: "\u2213",
      models: "\u22A7",
      Mopf: "\u{1D544}",
      mopf: "\u{1D55E}",
      mp: "\u2213",
      Mscr: "\u2133",
      mscr: "\u{1D4C2}",
      mstpos: "\u223E",
      Mu: "\u039C",
      mu: "\u03BC",
      multimap: "\u22B8",
      mumap: "\u22B8",
      nabla: "\u2207",
      Nacute: "\u0143",
      nacute: "\u0144",
      nang: "\u2220\u20D2",
      nap: "\u2249",
      napE: "\u2A70\u0338",
      napid: "\u224B\u0338",
      napos: "\u0149",
      napprox: "\u2249",
      natur: "\u266E",
      natural: "\u266E",
      naturals: "\u2115",
      nbsp: "\xA0",
      nbump: "\u224E\u0338",
      nbumpe: "\u224F\u0338",
      ncap: "\u2A43",
      Ncaron: "\u0147",
      ncaron: "\u0148",
      Ncedil: "\u0145",
      ncedil: "\u0146",
      ncong: "\u2247",
      ncongdot: "\u2A6D\u0338",
      ncup: "\u2A42",
      Ncy: "\u041D",
      ncy: "\u043D",
      ndash: "\u2013",
      ne: "\u2260",
      nearhk: "\u2924",
      neArr: "\u21D7",
      nearr: "\u2197",
      nearrow: "\u2197",
      nedot: "\u2250\u0338",
      NegativeMediumSpace: "\u200B",
      NegativeThickSpace: "\u200B",
      NegativeThinSpace: "\u200B",
      NegativeVeryThinSpace: "\u200B",
      nequiv: "\u2262",
      nesear: "\u2928",
      nesim: "\u2242\u0338",
      NestedGreaterGreater: "\u226B",
      NestedLessLess: "\u226A",
      NewLine: "\n",
      nexist: "\u2204",
      nexists: "\u2204",
      Nfr: "\u{1D511}",
      nfr: "\u{1D52B}",
      ngE: "\u2267\u0338",
      nge: "\u2271",
      ngeq: "\u2271",
      ngeqq: "\u2267\u0338",
      ngeqslant: "\u2A7E\u0338",
      nges: "\u2A7E\u0338",
      nGg: "\u22D9\u0338",
      ngsim: "\u2275",
      nGt: "\u226B\u20D2",
      ngt: "\u226F",
      ngtr: "\u226F",
      nGtv: "\u226B\u0338",
      nhArr: "\u21CE",
      nharr: "\u21AE",
      nhpar: "\u2AF2",
      ni: "\u220B",
      nis: "\u22FC",
      nisd: "\u22FA",
      niv: "\u220B",
      NJcy: "\u040A",
      njcy: "\u045A",
      nlArr: "\u21CD",
      nlarr: "\u219A",
      nldr: "\u2025",
      nlE: "\u2266\u0338",
      nle: "\u2270",
      nLeftarrow: "\u21CD",
      nleftarrow: "\u219A",
      nLeftrightarrow: "\u21CE",
      nleftrightarrow: "\u21AE",
      nleq: "\u2270",
      nleqq: "\u2266\u0338",
      nleqslant: "\u2A7D\u0338",
      nles: "\u2A7D\u0338",
      nless: "\u226E",
      nLl: "\u22D8\u0338",
      nlsim: "\u2274",
      nLt: "\u226A\u20D2",
      nlt: "\u226E",
      nltri: "\u22EA",
      nltrie: "\u22EC",
      nLtv: "\u226A\u0338",
      nmid: "\u2224",
      NoBreak: "\u2060",
      NonBreakingSpace: "\xA0",
      Nopf: "\u2115",
      nopf: "\u{1D55F}",
      Not: "\u2AEC",
      not: "\xAC",
      NotCongruent: "\u2262",
      NotCupCap: "\u226D",
      NotDoubleVerticalBar: "\u2226",
      NotElement: "\u2209",
      NotEqual: "\u2260",
      NotEqualTilde: "\u2242\u0338",
      NotExists: "\u2204",
      NotGreater: "\u226F",
      NotGreaterEqual: "\u2271",
      NotGreaterFullEqual: "\u2267\u0338",
      NotGreaterGreater: "\u226B\u0338",
      NotGreaterLess: "\u2279",
      NotGreaterSlantEqual: "\u2A7E\u0338",
      NotGreaterTilde: "\u2275",
      NotHumpDownHump: "\u224E\u0338",
      NotHumpEqual: "\u224F\u0338",
      notin: "\u2209",
      notindot: "\u22F5\u0338",
      notinE: "\u22F9\u0338",
      notinva: "\u2209",
      notinvb: "\u22F7",
      notinvc: "\u22F6",
      NotLeftTriangle: "\u22EA",
      NotLeftTriangleBar: "\u29CF\u0338",
      NotLeftTriangleEqual: "\u22EC",
      NotLess: "\u226E",
      NotLessEqual: "\u2270",
      NotLessGreater: "\u2278",
      NotLessLess: "\u226A\u0338",
      NotLessSlantEqual: "\u2A7D\u0338",
      NotLessTilde: "\u2274",
      NotNestedGreaterGreater: "\u2AA2\u0338",
      NotNestedLessLess: "\u2AA1\u0338",
      notni: "\u220C",
      notniva: "\u220C",
      notnivb: "\u22FE",
      notnivc: "\u22FD",
      NotPrecedes: "\u2280",
      NotPrecedesEqual: "\u2AAF\u0338",
      NotPrecedesSlantEqual: "\u22E0",
      NotReverseElement: "\u220C",
      NotRightTriangle: "\u22EB",
      NotRightTriangleBar: "\u29D0\u0338",
      NotRightTriangleEqual: "\u22ED",
      NotSquareSubset: "\u228F\u0338",
      NotSquareSubsetEqual: "\u22E2",
      NotSquareSuperset: "\u2290\u0338",
      NotSquareSupersetEqual: "\u22E3",
      NotSubset: "\u2282\u20D2",
      NotSubsetEqual: "\u2288",
      NotSucceeds: "\u2281",
      NotSucceedsEqual: "\u2AB0\u0338",
      NotSucceedsSlantEqual: "\u22E1",
      NotSucceedsTilde: "\u227F\u0338",
      NotSuperset: "\u2283\u20D2",
      NotSupersetEqual: "\u2289",
      NotTilde: "\u2241",
      NotTildeEqual: "\u2244",
      NotTildeFullEqual: "\u2247",
      NotTildeTilde: "\u2249",
      NotVerticalBar: "\u2224",
      npar: "\u2226",
      nparallel: "\u2226",
      nparsl: "\u2AFD\u20E5",
      npart: "\u2202\u0338",
      npolint: "\u2A14",
      npr: "\u2280",
      nprcue: "\u22E0",
      npre: "\u2AAF\u0338",
      nprec: "\u2280",
      npreceq: "\u2AAF\u0338",
      nrArr: "\u21CF",
      nrarr: "\u219B",
      nrarrc: "\u2933\u0338",
      nrarrw: "\u219D\u0338",
      nRightarrow: "\u21CF",
      nrightarrow: "\u219B",
      nrtri: "\u22EB",
      nrtrie: "\u22ED",
      nsc: "\u2281",
      nsccue: "\u22E1",
      nsce: "\u2AB0\u0338",
      Nscr: "\u{1D4A9}",
      nscr: "\u{1D4C3}",
      nshortmid: "\u2224",
      nshortparallel: "\u2226",
      nsim: "\u2241",
      nsime: "\u2244",
      nsimeq: "\u2244",
      nsmid: "\u2224",
      nspar: "\u2226",
      nsqsube: "\u22E2",
      nsqsupe: "\u22E3",
      nsub: "\u2284",
      nsubE: "\u2AC5\u0338",
      nsube: "\u2288",
      nsubset: "\u2282\u20D2",
      nsubseteq: "\u2288",
      nsubseteqq: "\u2AC5\u0338",
      nsucc: "\u2281",
      nsucceq: "\u2AB0\u0338",
      nsup: "\u2285",
      nsupE: "\u2AC6\u0338",
      nsupe: "\u2289",
      nsupset: "\u2283\u20D2",
      nsupseteq: "\u2289",
      nsupseteqq: "\u2AC6\u0338",
      ntgl: "\u2279",
      Ntilde: "\xD1",
      ntilde: "\xF1",
      ntlg: "\u2278",
      ntriangleleft: "\u22EA",
      ntrianglelefteq: "\u22EC",
      ntriangleright: "\u22EB",
      ntrianglerighteq: "\u22ED",
      Nu: "\u039D",
      nu: "\u03BD",
      num: "#",
      numero: "\u2116",
      numsp: "\u2007",
      nvap: "\u224D\u20D2",
      nVDash: "\u22AF",
      nVdash: "\u22AE",
      nvDash: "\u22AD",
      nvdash: "\u22AC",
      nvge: "\u2265\u20D2",
      nvgt: ">\u20D2",
      nvHarr: "\u2904",
      nvinfin: "\u29DE",
      nvlArr: "\u2902",
      nvle: "\u2264\u20D2",
      nvlt: "<\u20D2",
      nvltrie: "\u22B4\u20D2",
      nvrArr: "\u2903",
      nvrtrie: "\u22B5\u20D2",
      nvsim: "\u223C\u20D2",
      nwarhk: "\u2923",
      nwArr: "\u21D6",
      nwarr: "\u2196",
      nwarrow: "\u2196",
      nwnear: "\u2927",
      Oacute: "\xD3",
      oacute: "\xF3",
      oast: "\u229B",
      ocir: "\u229A",
      Ocirc: "\xD4",
      ocirc: "\xF4",
      Ocy: "\u041E",
      ocy: "\u043E",
      odash: "\u229D",
      Odblac: "\u0150",
      odblac: "\u0151",
      odiv: "\u2A38",
      odot: "\u2299",
      odsold: "\u29BC",
      OElig: "\u0152",
      oelig: "\u0153",
      ofcir: "\u29BF",
      Ofr: "\u{1D512}",
      ofr: "\u{1D52C}",
      ogon: "\u02DB",
      Ograve: "\xD2",
      ograve: "\xF2",
      ogt: "\u29C1",
      ohbar: "\u29B5",
      ohm: "\u03A9",
      oint: "\u222E",
      olarr: "\u21BA",
      olcir: "\u29BE",
      olcross: "\u29BB",
      oline: "\u203E",
      olt: "\u29C0",
      Omacr: "\u014C",
      omacr: "\u014D",
      Omega: "\u03A9",
      omega: "\u03C9",
      Omicron: "\u039F",
      omicron: "\u03BF",
      omid: "\u29B6",
      ominus: "\u2296",
      Oopf: "\u{1D546}",
      oopf: "\u{1D560}",
      opar: "\u29B7",
      OpenCurlyDoubleQuote: "\u201C",
      OpenCurlyQuote: "\u2018",
      operp: "\u29B9",
      oplus: "\u2295",
      Or: "\u2A54",
      or: "\u2228",
      orarr: "\u21BB",
      ord: "\u2A5D",
      order: "\u2134",
      orderof: "\u2134",
      ordf: "\xAA",
      ordm: "\xBA",
      origof: "\u22B6",
      oror: "\u2A56",
      orslope: "\u2A57",
      orv: "\u2A5B",
      oS: "\u24C8",
      Oscr: "\u{1D4AA}",
      oscr: "\u2134",
      Oslash: "\xD8",
      oslash: "\xF8",
      osol: "\u2298",
      Otilde: "\xD5",
      otilde: "\xF5",
      Otimes: "\u2A37",
      otimes: "\u2297",
      otimesas: "\u2A36",
      Ouml: "\xD6",
      ouml: "\xF6",
      ovbar: "\u233D",
      OverBar: "\u203E",
      OverBrace: "\u23DE",
      OverBracket: "\u23B4",
      OverParenthesis: "\u23DC",
      par: "\u2225",
      para: "\xB6",
      parallel: "\u2225",
      parsim: "\u2AF3",
      parsl: "\u2AFD",
      part: "\u2202",
      PartialD: "\u2202",
      Pcy: "\u041F",
      pcy: "\u043F",
      percnt: "%",
      period: ".",
      permil: "\u2030",
      perp: "\u22A5",
      pertenk: "\u2031",
      Pfr: "\u{1D513}",
      pfr: "\u{1D52D}",
      Phi: "\u03A6",
      phi: "\u03C6",
      phiv: "\u03D5",
      phmmat: "\u2133",
      phone: "\u260E",
      Pi: "\u03A0",
      pi: "\u03C0",
      pitchfork: "\u22D4",
      piv: "\u03D6",
      planck: "\u210F",
      planckh: "\u210E",
      plankv: "\u210F",
      plus: "+",
      plusacir: "\u2A23",
      plusb: "\u229E",
      pluscir: "\u2A22",
      plusdo: "\u2214",
      plusdu: "\u2A25",
      pluse: "\u2A72",
      PlusMinus: "\xB1",
      plusmn: "\xB1",
      plussim: "\u2A26",
      plustwo: "\u2A27",
      pm: "\xB1",
      Poincareplane: "\u210C",
      pointint: "\u2A15",
      Popf: "\u2119",
      popf: "\u{1D561}",
      pound: "\xA3",
      Pr: "\u2ABB",
      pr: "\u227A",
      prap: "\u2AB7",
      prcue: "\u227C",
      prE: "\u2AB3",
      pre: "\u2AAF",
      prec: "\u227A",
      precapprox: "\u2AB7",
      preccurlyeq: "\u227C",
      Precedes: "\u227A",
      PrecedesEqual: "\u2AAF",
      PrecedesSlantEqual: "\u227C",
      PrecedesTilde: "\u227E",
      preceq: "\u2AAF",
      precnapprox: "\u2AB9",
      precneqq: "\u2AB5",
      precnsim: "\u22E8",
      precsim: "\u227E",
      Prime: "\u2033",
      prime: "\u2032",
      primes: "\u2119",
      prnap: "\u2AB9",
      prnE: "\u2AB5",
      prnsim: "\u22E8",
      prod: "\u220F",
      Product: "\u220F",
      profalar: "\u232E",
      profline: "\u2312",
      profsurf: "\u2313",
      prop: "\u221D",
      Proportion: "\u2237",
      Proportional: "\u221D",
      propto: "\u221D",
      prsim: "\u227E",
      prurel: "\u22B0",
      Pscr: "\u{1D4AB}",
      pscr: "\u{1D4C5}",
      Psi: "\u03A8",
      psi: "\u03C8",
      puncsp: "\u2008",
      Qfr: "\u{1D514}",
      qfr: "\u{1D52E}",
      qint: "\u2A0C",
      Qopf: "\u211A",
      qopf: "\u{1D562}",
      qprime: "\u2057",
      Qscr: "\u{1D4AC}",
      qscr: "\u{1D4C6}",
      quaternions: "\u210D",
      quatint: "\u2A16",
      quest: "?",
      questeq: "\u225F",
      QUOT: '"',
      quot: '"',
      rAarr: "\u21DB",
      race: "\u223D\u0331",
      Racute: "\u0154",
      racute: "\u0155",
      radic: "\u221A",
      raemptyv: "\u29B3",
      Rang: "\u27EB",
      rang: "\u27E9",
      rangd: "\u2992",
      range: "\u29A5",
      rangle: "\u27E9",
      raquo: "\xBB",
      Rarr: "\u21A0",
      rArr: "\u21D2",
      rarr: "\u2192",
      rarrap: "\u2975",
      rarrb: "\u21E5",
      rarrbfs: "\u2920",
      rarrc: "\u2933",
      rarrfs: "\u291E",
      rarrhk: "\u21AA",
      rarrlp: "\u21AC",
      rarrpl: "\u2945",
      rarrsim: "\u2974",
      Rarrtl: "\u2916",
      rarrtl: "\u21A3",
      rarrw: "\u219D",
      rAtail: "\u291C",
      ratail: "\u291A",
      ratio: "\u2236",
      rationals: "\u211A",
      RBarr: "\u2910",
      rBarr: "\u290F",
      rbarr: "\u290D",
      rbbrk: "\u2773",
      rbrace: "}",
      rbrack: "]",
      rbrke: "\u298C",
      rbrksld: "\u298E",
      rbrkslu: "\u2990",
      Rcaron: "\u0158",
      rcaron: "\u0159",
      Rcedil: "\u0156",
      rcedil: "\u0157",
      rceil: "\u2309",
      rcub: "}",
      Rcy: "\u0420",
      rcy: "\u0440",
      rdca: "\u2937",
      rdldhar: "\u2969",
      rdquo: "\u201D",
      rdquor: "\u201D",
      rdsh: "\u21B3",
      Re: "\u211C",
      real: "\u211C",
      realine: "\u211B",
      realpart: "\u211C",
      reals: "\u211D",
      rect: "\u25AD",
      REG: "\xAE",
      reg: "\xAE",
      ReverseElement: "\u220B",
      ReverseEquilibrium: "\u21CB",
      ReverseUpEquilibrium: "\u296F",
      rfisht: "\u297D",
      rfloor: "\u230B",
      Rfr: "\u211C",
      rfr: "\u{1D52F}",
      rHar: "\u2964",
      rhard: "\u21C1",
      rharu: "\u21C0",
      rharul: "\u296C",
      Rho: "\u03A1",
      rho: "\u03C1",
      rhov: "\u03F1",
      RightAngleBracket: "\u27E9",
      RightArrow: "\u2192",
      Rightarrow: "\u21D2",
      rightarrow: "\u2192",
      RightArrowBar: "\u21E5",
      RightArrowLeftArrow: "\u21C4",
      rightarrowtail: "\u21A3",
      RightCeiling: "\u2309",
      RightDoubleBracket: "\u27E7",
      RightDownTeeVector: "\u295D",
      RightDownVector: "\u21C2",
      RightDownVectorBar: "\u2955",
      RightFloor: "\u230B",
      rightharpoondown: "\u21C1",
      rightharpoonup: "\u21C0",
      rightleftarrows: "\u21C4",
      rightleftharpoons: "\u21CC",
      rightrightarrows: "\u21C9",
      rightsquigarrow: "\u219D",
      RightTee: "\u22A2",
      RightTeeArrow: "\u21A6",
      RightTeeVector: "\u295B",
      rightthreetimes: "\u22CC",
      RightTriangle: "\u22B3",
      RightTriangleBar: "\u29D0",
      RightTriangleEqual: "\u22B5",
      RightUpDownVector: "\u294F",
      RightUpTeeVector: "\u295C",
      RightUpVector: "\u21BE",
      RightUpVectorBar: "\u2954",
      RightVector: "\u21C0",
      RightVectorBar: "\u2953",
      ring: "\u02DA",
      risingdotseq: "\u2253",
      rlarr: "\u21C4",
      rlhar: "\u21CC",
      rlm: "\u200F",
      rmoust: "\u23B1",
      rmoustache: "\u23B1",
      rnmid: "\u2AEE",
      roang: "\u27ED",
      roarr: "\u21FE",
      robrk: "\u27E7",
      ropar: "\u2986",
      Ropf: "\u211D",
      ropf: "\u{1D563}",
      roplus: "\u2A2E",
      rotimes: "\u2A35",
      RoundImplies: "\u2970",
      rpar: ")",
      rpargt: "\u2994",
      rppolint: "\u2A12",
      rrarr: "\u21C9",
      Rrightarrow: "\u21DB",
      rsaquo: "\u203A",
      Rscr: "\u211B",
      rscr: "\u{1D4C7}",
      Rsh: "\u21B1",
      rsh: "\u21B1",
      rsqb: "]",
      rsquo: "\u2019",
      rsquor: "\u2019",
      rthree: "\u22CC",
      rtimes: "\u22CA",
      rtri: "\u25B9",
      rtrie: "\u22B5",
      rtrif: "\u25B8",
      rtriltri: "\u29CE",
      RuleDelayed: "\u29F4",
      ruluhar: "\u2968",
      rx: "\u211E",
      Sacute: "\u015A",
      sacute: "\u015B",
      sbquo: "\u201A",
      Sc: "\u2ABC",
      sc: "\u227B",
      scap: "\u2AB8",
      Scaron: "\u0160",
      scaron: "\u0161",
      sccue: "\u227D",
      scE: "\u2AB4",
      sce: "\u2AB0",
      Scedil: "\u015E",
      scedil: "\u015F",
      Scirc: "\u015C",
      scirc: "\u015D",
      scnap: "\u2ABA",
      scnE: "\u2AB6",
      scnsim: "\u22E9",
      scpolint: "\u2A13",
      scsim: "\u227F",
      Scy: "\u0421",
      scy: "\u0441",
      sdot: "\u22C5",
      sdotb: "\u22A1",
      sdote: "\u2A66",
      searhk: "\u2925",
      seArr: "\u21D8",
      searr: "\u2198",
      searrow: "\u2198",
      sect: "\xA7",
      semi: ";",
      seswar: "\u2929",
      setminus: "\u2216",
      setmn: "\u2216",
      sext: "\u2736",
      Sfr: "\u{1D516}",
      sfr: "\u{1D530}",
      sfrown: "\u2322",
      sharp: "\u266F",
      SHCHcy: "\u0429",
      shchcy: "\u0449",
      SHcy: "\u0428",
      shcy: "\u0448",
      ShortDownArrow: "\u2193",
      ShortLeftArrow: "\u2190",
      shortmid: "\u2223",
      shortparallel: "\u2225",
      ShortRightArrow: "\u2192",
      ShortUpArrow: "\u2191",
      shy: "\xAD",
      Sigma: "\u03A3",
      sigma: "\u03C3",
      sigmaf: "\u03C2",
      sigmav: "\u03C2",
      sim: "\u223C",
      simdot: "\u2A6A",
      sime: "\u2243",
      simeq: "\u2243",
      simg: "\u2A9E",
      simgE: "\u2AA0",
      siml: "\u2A9D",
      simlE: "\u2A9F",
      simne: "\u2246",
      simplus: "\u2A24",
      simrarr: "\u2972",
      slarr: "\u2190",
      SmallCircle: "\u2218",
      smallsetminus: "\u2216",
      smashp: "\u2A33",
      smeparsl: "\u29E4",
      smid: "\u2223",
      smile: "\u2323",
      smt: "\u2AAA",
      smte: "\u2AAC",
      smtes: "\u2AAC\uFE00",
      SOFTcy: "\u042C",
      softcy: "\u044C",
      sol: "/",
      solb: "\u29C4",
      solbar: "\u233F",
      Sopf: "\u{1D54A}",
      sopf: "\u{1D564}",
      spades: "\u2660",
      spadesuit: "\u2660",
      spar: "\u2225",
      sqcap: "\u2293",
      sqcaps: "\u2293\uFE00",
      sqcup: "\u2294",
      sqcups: "\u2294\uFE00",
      Sqrt: "\u221A",
      sqsub: "\u228F",
      sqsube: "\u2291",
      sqsubset: "\u228F",
      sqsubseteq: "\u2291",
      sqsup: "\u2290",
      sqsupe: "\u2292",
      sqsupset: "\u2290",
      sqsupseteq: "\u2292",
      squ: "\u25A1",
      Square: "\u25A1",
      square: "\u25A1",
      SquareIntersection: "\u2293",
      SquareSubset: "\u228F",
      SquareSubsetEqual: "\u2291",
      SquareSuperset: "\u2290",
      SquareSupersetEqual: "\u2292",
      SquareUnion: "\u2294",
      squarf: "\u25AA",
      squf: "\u25AA",
      srarr: "\u2192",
      Sscr: "\u{1D4AE}",
      sscr: "\u{1D4C8}",
      ssetmn: "\u2216",
      ssmile: "\u2323",
      sstarf: "\u22C6",
      Star: "\u22C6",
      star: "\u2606",
      starf: "\u2605",
      straightepsilon: "\u03F5",
      straightphi: "\u03D5",
      strns: "\xAF",
      Sub: "\u22D0",
      sub: "\u2282",
      subdot: "\u2ABD",
      subE: "\u2AC5",
      sube: "\u2286",
      subedot: "\u2AC3",
      submult: "\u2AC1",
      subnE: "\u2ACB",
      subne: "\u228A",
      subplus: "\u2ABF",
      subrarr: "\u2979",
      Subset: "\u22D0",
      subset: "\u2282",
      subseteq: "\u2286",
      subseteqq: "\u2AC5",
      SubsetEqual: "\u2286",
      subsetneq: "\u228A",
      subsetneqq: "\u2ACB",
      subsim: "\u2AC7",
      subsub: "\u2AD5",
      subsup: "\u2AD3",
      succ: "\u227B",
      succapprox: "\u2AB8",
      succcurlyeq: "\u227D",
      Succeeds: "\u227B",
      SucceedsEqual: "\u2AB0",
      SucceedsSlantEqual: "\u227D",
      SucceedsTilde: "\u227F",
      succeq: "\u2AB0",
      succnapprox: "\u2ABA",
      succneqq: "\u2AB6",
      succnsim: "\u22E9",
      succsim: "\u227F",
      SuchThat: "\u220B",
      Sum: "\u2211",
      sum: "\u2211",
      sung: "\u266A",
      Sup: "\u22D1",
      sup: "\u2283",
      sup1: "\xB9",
      sup2: "\xB2",
      sup3: "\xB3",
      supdot: "\u2ABE",
      supdsub: "\u2AD8",
      supE: "\u2AC6",
      supe: "\u2287",
      supedot: "\u2AC4",
      Superset: "\u2283",
      SupersetEqual: "\u2287",
      suphsol: "\u27C9",
      suphsub: "\u2AD7",
      suplarr: "\u297B",
      supmult: "\u2AC2",
      supnE: "\u2ACC",
      supne: "\u228B",
      supplus: "\u2AC0",
      Supset: "\u22D1",
      supset: "\u2283",
      supseteq: "\u2287",
      supseteqq: "\u2AC6",
      supsetneq: "\u228B",
      supsetneqq: "\u2ACC",
      supsim: "\u2AC8",
      supsub: "\u2AD4",
      supsup: "\u2AD6",
      swarhk: "\u2926",
      swArr: "\u21D9",
      swarr: "\u2199",
      swarrow: "\u2199",
      swnwar: "\u292A",
      szlig: "\xDF",
      Tab: "	",
      target: "\u2316",
      Tau: "\u03A4",
      tau: "\u03C4",
      tbrk: "\u23B4",
      Tcaron: "\u0164",
      tcaron: "\u0165",
      Tcedil: "\u0162",
      tcedil: "\u0163",
      Tcy: "\u0422",
      tcy: "\u0442",
      tdot: "\u20DB",
      telrec: "\u2315",
      Tfr: "\u{1D517}",
      tfr: "\u{1D531}",
      there4: "\u2234",
      Therefore: "\u2234",
      therefore: "\u2234",
      Theta: "\u0398",
      theta: "\u03B8",
      thetasym: "\u03D1",
      thetav: "\u03D1",
      thickapprox: "\u2248",
      thicksim: "\u223C",
      ThickSpace: "\u205F\u200A",
      thinsp: "\u2009",
      ThinSpace: "\u2009",
      thkap: "\u2248",
      thksim: "\u223C",
      THORN: "\xDE",
      thorn: "\xFE",
      Tilde: "\u223C",
      tilde: "\u02DC",
      TildeEqual: "\u2243",
      TildeFullEqual: "\u2245",
      TildeTilde: "\u2248",
      times: "\xD7",
      timesb: "\u22A0",
      timesbar: "\u2A31",
      timesd: "\u2A30",
      tint: "\u222D",
      toea: "\u2928",
      top: "\u22A4",
      topbot: "\u2336",
      topcir: "\u2AF1",
      Topf: "\u{1D54B}",
      topf: "\u{1D565}",
      topfork: "\u2ADA",
      tosa: "\u2929",
      tprime: "\u2034",
      TRADE: "\u2122",
      trade: "\u2122",
      triangle: "\u25B5",
      triangledown: "\u25BF",
      triangleleft: "\u25C3",
      trianglelefteq: "\u22B4",
      triangleq: "\u225C",
      triangleright: "\u25B9",
      trianglerighteq: "\u22B5",
      tridot: "\u25EC",
      trie: "\u225C",
      triminus: "\u2A3A",
      TripleDot: "\u20DB",
      triplus: "\u2A39",
      trisb: "\u29CD",
      tritime: "\u2A3B",
      trpezium: "\u23E2",
      Tscr: "\u{1D4AF}",
      tscr: "\u{1D4C9}",
      TScy: "\u0426",
      tscy: "\u0446",
      TSHcy: "\u040B",
      tshcy: "\u045B",
      Tstrok: "\u0166",
      tstrok: "\u0167",
      twixt: "\u226C",
      twoheadleftarrow: "\u219E",
      twoheadrightarrow: "\u21A0",
      Uacute: "\xDA",
      uacute: "\xFA",
      Uarr: "\u219F",
      uArr: "\u21D1",
      uarr: "\u2191",
      Uarrocir: "\u2949",
      Ubrcy: "\u040E",
      ubrcy: "\u045E",
      Ubreve: "\u016C",
      ubreve: "\u016D",
      Ucirc: "\xDB",
      ucirc: "\xFB",
      Ucy: "\u0423",
      ucy: "\u0443",
      udarr: "\u21C5",
      Udblac: "\u0170",
      udblac: "\u0171",
      udhar: "\u296E",
      ufisht: "\u297E",
      Ufr: "\u{1D518}",
      ufr: "\u{1D532}",
      Ugrave: "\xD9",
      ugrave: "\xF9",
      uHar: "\u2963",
      uharl: "\u21BF",
      uharr: "\u21BE",
      uhblk: "\u2580",
      ulcorn: "\u231C",
      ulcorner: "\u231C",
      ulcrop: "\u230F",
      ultri: "\u25F8",
      Umacr: "\u016A",
      umacr: "\u016B",
      uml: "\xA8",
      UnderBar: "_",
      UnderBrace: "\u23DF",
      UnderBracket: "\u23B5",
      UnderParenthesis: "\u23DD",
      Union: "\u22C3",
      UnionPlus: "\u228E",
      Uogon: "\u0172",
      uogon: "\u0173",
      Uopf: "\u{1D54C}",
      uopf: "\u{1D566}",
      UpArrow: "\u2191",
      Uparrow: "\u21D1",
      uparrow: "\u2191",
      UpArrowBar: "\u2912",
      UpArrowDownArrow: "\u21C5",
      UpDownArrow: "\u2195",
      Updownarrow: "\u21D5",
      updownarrow: "\u2195",
      UpEquilibrium: "\u296E",
      upharpoonleft: "\u21BF",
      upharpoonright: "\u21BE",
      uplus: "\u228E",
      UpperLeftArrow: "\u2196",
      UpperRightArrow: "\u2197",
      Upsi: "\u03D2",
      upsi: "\u03C5",
      upsih: "\u03D2",
      Upsilon: "\u03A5",
      upsilon: "\u03C5",
      UpTee: "\u22A5",
      UpTeeArrow: "\u21A5",
      upuparrows: "\u21C8",
      urcorn: "\u231D",
      urcorner: "\u231D",
      urcrop: "\u230E",
      Uring: "\u016E",
      uring: "\u016F",
      urtri: "\u25F9",
      Uscr: "\u{1D4B0}",
      uscr: "\u{1D4CA}",
      utdot: "\u22F0",
      Utilde: "\u0168",
      utilde: "\u0169",
      utri: "\u25B5",
      utrif: "\u25B4",
      uuarr: "\u21C8",
      Uuml: "\xDC",
      uuml: "\xFC",
      uwangle: "\u29A7",
      vangrt: "\u299C",
      varepsilon: "\u03F5",
      varkappa: "\u03F0",
      varnothing: "\u2205",
      varphi: "\u03D5",
      varpi: "\u03D6",
      varpropto: "\u221D",
      vArr: "\u21D5",
      varr: "\u2195",
      varrho: "\u03F1",
      varsigma: "\u03C2",
      varsubsetneq: "\u228A\uFE00",
      varsubsetneqq: "\u2ACB\uFE00",
      varsupsetneq: "\u228B\uFE00",
      varsupsetneqq: "\u2ACC\uFE00",
      vartheta: "\u03D1",
      vartriangleleft: "\u22B2",
      vartriangleright: "\u22B3",
      Vbar: "\u2AEB",
      vBar: "\u2AE8",
      vBarv: "\u2AE9",
      Vcy: "\u0412",
      vcy: "\u0432",
      VDash: "\u22AB",
      Vdash: "\u22A9",
      vDash: "\u22A8",
      vdash: "\u22A2",
      Vdashl: "\u2AE6",
      Vee: "\u22C1",
      vee: "\u2228",
      veebar: "\u22BB",
      veeeq: "\u225A",
      vellip: "\u22EE",
      Verbar: "\u2016",
      verbar: "|",
      Vert: "\u2016",
      vert: "|",
      VerticalBar: "\u2223",
      VerticalLine: "|",
      VerticalSeparator: "\u2758",
      VerticalTilde: "\u2240",
      VeryThinSpace: "\u200A",
      Vfr: "\u{1D519}",
      vfr: "\u{1D533}",
      vltri: "\u22B2",
      vnsub: "\u2282\u20D2",
      vnsup: "\u2283\u20D2",
      Vopf: "\u{1D54D}",
      vopf: "\u{1D567}",
      vprop: "\u221D",
      vrtri: "\u22B3",
      Vscr: "\u{1D4B1}",
      vscr: "\u{1D4CB}",
      vsubnE: "\u2ACB\uFE00",
      vsubne: "\u228A\uFE00",
      vsupnE: "\u2ACC\uFE00",
      vsupne: "\u228B\uFE00",
      Vvdash: "\u22AA",
      vzigzag: "\u299A",
      Wcirc: "\u0174",
      wcirc: "\u0175",
      wedbar: "\u2A5F",
      Wedge: "\u22C0",
      wedge: "\u2227",
      wedgeq: "\u2259",
      weierp: "\u2118",
      Wfr: "\u{1D51A}",
      wfr: "\u{1D534}",
      Wopf: "\u{1D54E}",
      wopf: "\u{1D568}",
      wp: "\u2118",
      wr: "\u2240",
      wreath: "\u2240",
      Wscr: "\u{1D4B2}",
      wscr: "\u{1D4CC}",
      xcap: "\u22C2",
      xcirc: "\u25EF",
      xcup: "\u22C3",
      xdtri: "\u25BD",
      Xfr: "\u{1D51B}",
      xfr: "\u{1D535}",
      xhArr: "\u27FA",
      xharr: "\u27F7",
      Xi: "\u039E",
      xi: "\u03BE",
      xlArr: "\u27F8",
      xlarr: "\u27F5",
      xmap: "\u27FC",
      xnis: "\u22FB",
      xodot: "\u2A00",
      Xopf: "\u{1D54F}",
      xopf: "\u{1D569}",
      xoplus: "\u2A01",
      xotime: "\u2A02",
      xrArr: "\u27F9",
      xrarr: "\u27F6",
      Xscr: "\u{1D4B3}",
      xscr: "\u{1D4CD}",
      xsqcup: "\u2A06",
      xuplus: "\u2A04",
      xutri: "\u25B3",
      xvee: "\u22C1",
      xwedge: "\u22C0",
      Yacute: "\xDD",
      yacute: "\xFD",
      YAcy: "\u042F",
      yacy: "\u044F",
      Ycirc: "\u0176",
      ycirc: "\u0177",
      Ycy: "\u042B",
      ycy: "\u044B",
      yen: "\xA5",
      Yfr: "\u{1D51C}",
      yfr: "\u{1D536}",
      YIcy: "\u0407",
      yicy: "\u0457",
      Yopf: "\u{1D550}",
      yopf: "\u{1D56A}",
      Yscr: "\u{1D4B4}",
      yscr: "\u{1D4CE}",
      YUcy: "\u042E",
      yucy: "\u044E",
      Yuml: "\u0178",
      yuml: "\xFF",
      Zacute: "\u0179",
      zacute: "\u017A",
      Zcaron: "\u017D",
      zcaron: "\u017E",
      Zcy: "\u0417",
      zcy: "\u0437",
      Zdot: "\u017B",
      zdot: "\u017C",
      zeetrf: "\u2128",
      ZeroWidthSpace: "\u200B",
      Zeta: "\u0396",
      zeta: "\u03B6",
      Zfr: "\u2128",
      zfr: "\u{1D537}",
      ZHcy: "\u0416",
      zhcy: "\u0436",
      zigrarr: "\u21DD",
      Zopf: "\u2124",
      zopf: "\u{1D56B}",
      Zscr: "\u{1D4B5}",
      zscr: "\u{1D4CF}",
      zwj: "\u200D",
      zwnj: "\u200C"
    });
    exports.entityMap = exports.HTML_ENTITIES;
  }
});

// node_modules/@xmldom/xmldom/lib/sax.js
var require_sax = __commonJS({
  "node_modules/@xmldom/xmldom/lib/sax.js"(exports) {
    var conventions = require_conventions();
    var g = require_grammar();
    var errors = require_errors();
    var isHTMLEscapableRawTextElement = conventions.isHTMLEscapableRawTextElement;
    var isHTMLMimeType = conventions.isHTMLMimeType;
    var isHTMLRawTextElement = conventions.isHTMLRawTextElement;
    var hasOwn = conventions.hasOwn;
    var NAMESPACE = conventions.NAMESPACE;
    var ParseError = errors.ParseError;
    var DOMException = errors.DOMException;
    var S_TAG = 0;
    var S_ATTR = 1;
    var S_ATTR_SPACE = 2;
    var S_EQ = 3;
    var S_ATTR_NOQUOT_VALUE = 4;
    var S_ATTR_END = 5;
    var S_TAG_SPACE = 6;
    var S_TAG_CLOSE = 7;
    function XMLReader() {
    }
    XMLReader.prototype = {
      parse: function(source, defaultNSMap, entityMap) {
        var domBuilder = this.domBuilder;
        domBuilder.startDocument();
        _copy(defaultNSMap, defaultNSMap = /* @__PURE__ */ Object.create(null));
        parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
        domBuilder.endDocument();
      }
    };
    var ENTITY_REG = /&#?\w+;?/g;
    function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
      var isHTML = isHTMLMimeType(domBuilder.mimeType);
      if (source.indexOf(g.UNICODE_REPLACEMENT_CHARACTER) >= 0) {
        errorHandler.warning("Unicode replacement character detected, source encoding issues?");
      }
      function fixedFromCharCode(code) {
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return String.fromCharCode(surrogate1, surrogate2);
        } else {
          return String.fromCharCode(code);
        }
      }
      function entityReplacer(a2) {
        var complete = a2[a2.length - 1] === ";" ? a2 : a2 + ";";
        if (!isHTML && complete !== a2) {
          errorHandler.error("EntityRef: expecting ;");
          return a2;
        }
        var match = g.Reference.exec(complete);
        if (!match || match[0].length !== complete.length) {
          errorHandler.error("entity not matching Reference production: " + a2);
          return a2;
        }
        var k = complete.slice(1, -1);
        if (hasOwn(entityMap, k)) {
          return entityMap[k];
        } else if (k.charAt(0) === "#") {
          return fixedFromCharCode(parseInt(k.substring(1).replace("x", "0x")));
        } else {
          errorHandler.error("entity not found:" + a2);
          return a2;
        }
      }
      function appendText(end2) {
        if (end2 > start) {
          var xt = source.substring(start, end2).replace(ENTITY_REG, entityReplacer);
          locator && position(start);
          domBuilder.characters(xt, 0, end2 - start);
          start = end2;
        }
      }
      var lineStart = 0;
      var lineEnd = 0;
      var linePattern = /\r\n?|\n|$/g;
      var locator = domBuilder.locator;
      function position(p, m) {
        while (p >= lineEnd && (m = linePattern.exec(source))) {
          lineStart = lineEnd;
          lineEnd = m.index + m[0].length;
          locator.lineNumber++;
        }
        locator.columnNumber = p - lineStart + 1;
      }
      var parseStack = [{ currentNSMap: defaultNSMapCopy }];
      var unclosedTags = [];
      var start = 0;
      while (true) {
        try {
          var tagStart = source.indexOf("<", start);
          if (tagStart < 0) {
            if (!isHTML && unclosedTags.length > 0) {
              return errorHandler.fatalError("unclosed xml tag(s): " + unclosedTags.join(", "));
            }
            if (!source.substring(start).match(/^\s*$/)) {
              var doc = domBuilder.doc;
              var text = doc.createTextNode(source.substring(start));
              if (doc.documentElement) {
                return errorHandler.error("Extra content at the end of the document");
              }
              doc.appendChild(text);
              domBuilder.currentElement = text;
            }
            return;
          }
          if (tagStart > start) {
            var fromSource = source.substring(start, tagStart);
            if (!isHTML && unclosedTags.length === 0) {
              fromSource = fromSource.replace(new RegExp(g.S_OPT.source, "g"), "");
              fromSource && errorHandler.error("Unexpected content outside root element: '" + fromSource + "'");
            }
            appendText(tagStart);
          }
          switch (source.charAt(tagStart + 1)) {
            case "/":
              var end = source.indexOf(">", tagStart + 2);
              var tagNameRaw = source.substring(tagStart + 2, end > 0 ? end : void 0);
              if (!tagNameRaw) {
                return errorHandler.fatalError("end tag name missing");
              }
              var endTagNameStrict = g.reg("^", g.QName_group, g.S_OPT, "$");
              var tagNameMatch = end > 0 && endTagNameStrict.exec(tagNameRaw);
              if (!tagNameMatch) {
                var leadingTagNameMatch = end > 0 && g.reg("^", g.QName_group).exec(tagNameRaw);
                if (isHTML && leadingTagNameMatch) {
                  errorHandler.warning('end tag name contains invalid trailing characters: "' + tagNameRaw + '"');
                  tagNameMatch = leadingTagNameMatch;
                } else if (
                  // Backward compatibility, remove this whole `else if` arm in the next breaking release
                  // (XML then falls through to the `fatalError` below, for a clean mode split: XML fatal,
                  // HTML warning). A valid end-tag name followed by a line break and trailing content was
                  // silently accepted while `reg` still used the `m` flag; re-adding `m` here matches exactly
                  // those inputs, kept recoverable and reported.
                  leadingTagNameMatch && new RegExp(endTagNameStrict.source, endTagNameStrict.flags + "m").test(tagNameRaw)
                ) {
                  errorHandler.error('end tag name is followed by a line break and trailing content: "' + tagNameRaw + '"');
                  tagNameMatch = leadingTagNameMatch;
                } else {
                  return errorHandler.fatalError('end tag name contains invalid characters: "' + tagNameRaw + '"');
                }
              }
              if (!domBuilder.currentElement && !domBuilder.doc.documentElement) {
                return;
              }
              var currentTagName = unclosedTags[unclosedTags.length - 1] || domBuilder.currentElement.tagName || domBuilder.doc.documentElement.tagName || "";
              if (currentTagName !== tagNameMatch[1]) {
                var tagNameLower = tagNameMatch[1].toLowerCase();
                if (!isHTML || currentTagName.toLowerCase() !== tagNameLower) {
                  return errorHandler.fatalError('Opening and ending tag mismatch: "' + currentTagName + '" != "' + tagNameRaw + '"');
                }
              }
              var config = parseStack.pop();
              unclosedTags.pop();
              var localNSMap = config.localNSMap;
              domBuilder.endElement(config.uri, config.localName, currentTagName);
              if (localNSMap) {
                for (var prefix in localNSMap) {
                  if (hasOwn(localNSMap, prefix)) {
                    domBuilder.endPrefixMapping(prefix);
                  }
                }
              }
              end++;
              break;
            // end element
            case "?":
              locator && position(tagStart);
              end = parseProcessingInstruction(source, tagStart, domBuilder, errorHandler);
              break;
            case "!":
              locator && position(tagStart);
              end = parseDoctypeCommentOrCData(source, tagStart, domBuilder, errorHandler, isHTML);
              break;
            default:
              locator && position(tagStart);
              var el = new ElementAttributes();
              var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
              var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler, isHTML);
              var len = el.length;
              if (!el.closed) {
                if (isHTML && conventions.isHTMLVoidElement(el.tagName)) {
                  el.closed = true;
                } else {
                  unclosedTags.push(el.tagName);
                }
              }
              if (locator && len) {
                var locator2 = copyLocator(locator, {});
                for (var i = 0; i < len; i++) {
                  var a = el[i];
                  position(a.offset);
                  a.locator = copyLocator(locator, {});
                }
                domBuilder.locator = locator2;
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
                domBuilder.locator = locator;
              } else {
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
              }
              if (isHTML && !el.closed) {
                end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
              } else {
                end++;
              }
          }
        } catch (e) {
          if (e instanceof ParseError) {
            throw e;
          } else if (e instanceof DOMException) {
            return errorHandler.fatalError("Error constructing the DOM: " + e.name + ": " + e.message, e);
          }
          errorHandler.error("element parse error: " + e);
          end = -1;
        }
        if (end > start) {
          start = end;
        } else {
          appendText(Math.max(tagStart, start) + 1);
        }
      }
    }
    function copyLocator(f, t) {
      t.lineNumber = f.lineNumber;
      t.columnNumber = f.columnNumber;
      return t;
    }
    function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler, isHTML) {
      function addAttribute(qname, value2, startIndex) {
        if (hasOwn(el.attributeNames, qname)) {
          return errorHandler.fatalError("Attribute " + qname + " redefined");
        }
        if (!isHTML && value2.indexOf("<") >= 0) {
          return errorHandler.fatalError("Unescaped '<' not allowed in attributes values");
        }
        el.addValue(
          qname,
          // @see https://www.w3.org/TR/xml/#AVNormalize
          // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
          // - recursive replacement of (DTD) entity references
          // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
          value2.replace(/[\t\n\r]/g, " ").replace(ENTITY_REG, entityReplacer),
          startIndex
        );
      }
      var attrName;
      var value;
      var p = ++start;
      var s = S_TAG;
      while (true) {
        var c = source.charAt(p);
        if (s === S_TAG && c === "<") {
          throw new Error("unexpected < in tag name: " + source.slice(start, p));
        }
        switch (c) {
          case "=":
            if (s === S_ATTR) {
              attrName = source.slice(start, p);
              s = S_EQ;
            } else if (s === S_ATTR_SPACE) {
              s = S_EQ;
            } else {
              throw new Error("attribute equal must after attrName");
            }
            break;
          case "'":
          case '"':
            if (s === S_EQ || s === S_ATTR) {
              if (s === S_ATTR) {
                errorHandler.warning('attribute value must after "="');
                attrName = source.slice(start, p);
              }
              start = p + 1;
              p = source.indexOf(c, start);
              if (p > 0) {
                value = source.slice(start, p);
                addAttribute(attrName, value, start - 1);
                s = S_ATTR_END;
              } else {
                throw new Error("attribute value no end '" + c + "' match");
              }
            } else if (s == S_ATTR_NOQUOT_VALUE) {
              value = source.slice(start, p);
              addAttribute(attrName, value, start);
              errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
              start = p + 1;
              s = S_ATTR_END;
            } else {
              throw new Error('attribute value must after "="');
            }
            break;
          case "/":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                s = S_TAG_CLOSE;
                el.closed = true;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                break;
              case S_ATTR_SPACE:
                el.closed = true;
                break;
              //case S_EQ:
              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;
          case "":
            errorHandler.error("unexpected end of input");
            if (s == S_TAG) {
              el.setTagName(source.slice(start, p));
            }
            return p;
          case ">":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                break;
              //normal
              case S_ATTR_NOQUOT_VALUE:
              //Compatible state
              case S_ATTR:
                value = source.slice(start, p);
                if (value.slice(-1) === "/") {
                  el.closed = true;
                  value = value.slice(0, -1);
                }
              case S_ATTR_SPACE:
                if (s === S_ATTR_SPACE) {
                  value = attrName;
                }
                if (s == S_ATTR_NOQUOT_VALUE) {
                  errorHandler.warning('attribute "' + value + '" missed quot(")!');
                  addAttribute(attrName, value, start);
                } else {
                  if (!isHTML) {
                    errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                  }
                  addAttribute(value, value, start);
                }
                break;
              case S_EQ:
                if (!isHTML) {
                  return errorHandler.fatalError(`AttValue: ' or " expected`);
                }
            }
            return p;
          /*xml space '\x20' | #x9 | #xD | #xA; */
          case "\x80":
            c = " ";
          default:
            if (c <= " ") {
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                  s = S_TAG_SPACE;
                  break;
                case S_ATTR:
                  attrName = source.slice(start, p);
                  s = S_ATTR_SPACE;
                  break;
                case S_ATTR_NOQUOT_VALUE:
                  var value = source.slice(start, p);
                  errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                  addAttribute(attrName, value, start);
                case S_ATTR_END:
                  s = S_TAG_SPACE;
                  break;
              }
            } else {
              switch (s) {
                //case S_TAG:void();break;
                //case S_ATTR:void();break;
                //case S_ATTR_NOQUOT_VALUE:void();break;
                case S_ATTR_SPACE:
                  if (!isHTML) {
                    errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                  }
                  addAttribute(attrName, attrName, start);
                  start = p;
                  s = S_ATTR;
                  break;
                case S_ATTR_END:
                  errorHandler.warning('attribute space is required"' + attrName + '"!!');
                case S_TAG_SPACE:
                  s = S_ATTR;
                  start = p;
                  break;
                case S_EQ:
                  s = S_ATTR_NOQUOT_VALUE;
                  start = p;
                  break;
                case S_TAG_CLOSE:
                  throw new Error("elements closed character '/' and '>' must be connected to");
              }
            }
        }
        p++;
      }
    }
    function appendElement(el, domBuilder, currentNSMap) {
      var tagName = el.tagName;
      var localNSMap = null;
      var i = el.length;
      while (i--) {
        var a = el[i];
        var qName = a.qName;
        var value = a.value;
        var nsp = qName.indexOf(":");
        if (nsp > 0) {
          var prefix = a.prefix = qName.slice(0, nsp);
          var localName = qName.slice(nsp + 1);
          var nsPrefix = prefix === "xmlns" && localName;
        } else {
          localName = qName;
          prefix = null;
          nsPrefix = qName === "xmlns" && "";
        }
        a.localName = localName;
        if (nsPrefix !== false) {
          if (localNSMap == null) {
            localNSMap = /* @__PURE__ */ Object.create(null);
            currentNSMap = Object.create(currentNSMap);
          }
          currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
          a.uri = NAMESPACE.XMLNS;
          domBuilder.startPrefixMapping(nsPrefix, value);
        }
      }
      var i = el.length;
      while (i--) {
        a = el[i];
        if (a.prefix) {
          if (a.prefix === "xml") {
            a.uri = NAMESPACE.XML;
          }
          if (a.prefix !== "xmlns") {
            a.uri = currentNSMap[a.prefix];
          }
        }
      }
      var nsp = tagName.indexOf(":");
      if (nsp > 0) {
        prefix = el.prefix = tagName.slice(0, nsp);
        localName = el.localName = tagName.slice(nsp + 1);
      } else {
        prefix = null;
        localName = el.localName = tagName;
      }
      var ns = el.uri = currentNSMap[prefix || ""];
      domBuilder.startElement(ns, localName, tagName, el);
      if (el.closed) {
        domBuilder.endElement(ns, localName, tagName);
        if (localNSMap) {
          for (prefix in localNSMap) {
            if (hasOwn(localNSMap, prefix)) {
              domBuilder.endPrefixMapping(prefix);
            }
          }
        }
      } else {
        el.currentNSMap = currentNSMap;
        el.localNSMap = localNSMap;
        return true;
      }
    }
    function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
      var isEscapableRaw = isHTMLEscapableRawTextElement(tagName);
      if (isEscapableRaw || isHTMLRawTextElement(tagName)) {
        var closeTag = new RegExp("</" + tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ">", "ig");
        closeTag.lastIndex = elStartEnd;
        var match = closeTag.exec(source);
        var elEndStart = match ? match.index : -1;
        if (elEndStart < 0) {
          return elStartEnd + 1;
        }
        var text = source.substring(elStartEnd + 1, elEndStart);
        if (isEscapableRaw) {
          text = text.replace(ENTITY_REG, entityReplacer);
        }
        domBuilder.characters(text, 0, text.length);
        return elEndStart;
      }
      return elStartEnd + 1;
    }
    function _copy(source, target) {
      for (var n in source) {
        if (hasOwn(source, n)) {
          target[n] = source[n];
        }
      }
    }
    function parseUtils(source, start) {
      var index = start;
      function char(n) {
        n = n || 0;
        return source.charAt(index + n);
      }
      function skip(n) {
        n = n || 1;
        index += n;
      }
      function skipBlanks() {
        var blanks = 0;
        while (index < source.length) {
          var c = char();
          if (c !== " " && c !== "\n" && c !== "	" && c !== "\r") {
            return blanks;
          }
          blanks++;
          skip();
        }
        return -1;
      }
      function substringFromIndex() {
        return source.substring(index);
      }
      function substringStartsWith(text) {
        return source.substring(index, index + text.length) === text;
      }
      function substringStartsWithCaseInsensitive(text) {
        return source.substring(index, index + text.length).toUpperCase() === text.toUpperCase();
      }
      function getMatch(args) {
        var expr = g.reg("^", args);
        var match = expr.exec(substringFromIndex());
        if (match) {
          skip(match[0].length);
          return match[0];
        }
        return null;
      }
      return {
        char,
        getIndex: function() {
          return index;
        },
        getMatch,
        getSource: function() {
          return source;
        },
        skip,
        skipBlanks,
        substringFromIndex,
        substringStartsWith,
        substringStartsWithCaseInsensitive
      };
    }
    function parseDoctypeInternalSubset(p, errorHandler) {
      function parsePI(p2, errorHandler2) {
        var match = g.PI.exec(p2.substringFromIndex());
        if (!match) {
          return errorHandler2.fatalError("processing instruction is not well-formed at position " + p2.getIndex());
        }
        if (match[1].toLowerCase() === "xml") {
          return errorHandler2.fatalError(
            "xml declaration is only allowed at the start of the document, but found at position " + p2.getIndex()
          );
        }
        p2.skip(match[0].length);
        return match[0];
      }
      var source = p.getSource();
      if (p.char() === "[") {
        p.skip(1);
        var intSubsetStart = p.getIndex();
        while (p.getIndex() < source.length) {
          p.skipBlanks();
          if (p.char() === "]") {
            var internalSubset = source.substring(intSubsetStart, p.getIndex());
            p.skip(1);
            return internalSubset;
          }
          var current = null;
          if (p.char() === "<" && p.char(1) === "!") {
            switch (p.char(2)) {
              case "E":
                if (p.char(3) === "L") {
                  current = p.getMatch(g.elementdecl);
                } else if (p.char(3) === "N") {
                  current = p.getMatch(g.EntityDecl);
                }
                break;
              case "A":
                current = p.getMatch(g.AttlistDecl);
                break;
              case "N":
                current = p.getMatch(g.NotationDecl);
                break;
              case "-":
                current = p.getMatch(g.Comment);
                break;
            }
          } else if (p.char() === "<" && p.char(1) === "?") {
            current = parsePI(p, errorHandler);
          } else if (p.char() === "%") {
            current = p.getMatch(g.PEReference);
          } else {
            return errorHandler.fatalError("Error detected in Markup declaration");
          }
          if (!current) {
            return errorHandler.fatalError("Error in internal subset at position " + p.getIndex());
          }
        }
        return errorHandler.fatalError("doctype internal subset is not well-formed, missing ]");
      }
    }
    function parseDoctypeCommentOrCData(source, start, domBuilder, errorHandler, isHTML) {
      var p = parseUtils(source, start);
      switch (isHTML ? p.char(2).toUpperCase() : p.char(2)) {
        case "-":
          var comment = p.getMatch(g.Comment);
          if (comment) {
            domBuilder.comment(comment, g.COMMENT_START.length, comment.length - g.COMMENT_START.length - g.COMMENT_END.length);
            return p.getIndex();
          } else {
            return errorHandler.fatalError("comment is not well-formed at position " + p.getIndex());
          }
        case "[":
          var cdata = p.getMatch(g.CDSect);
          if (cdata) {
            if (!isHTML && !domBuilder.currentElement) {
              return errorHandler.fatalError("CDATA outside of element");
            }
            domBuilder.startCDATA();
            domBuilder.characters(cdata, g.CDATA_START.length, cdata.length - g.CDATA_START.length - g.CDATA_END.length);
            domBuilder.endCDATA();
            return p.getIndex();
          } else {
            return errorHandler.fatalError("Invalid CDATA starting at position " + start);
          }
        case "D": {
          if (domBuilder.doc && domBuilder.doc.documentElement) {
            return errorHandler.fatalError("Doctype not allowed inside or after documentElement at position " + p.getIndex());
          }
          if (isHTML ? !p.substringStartsWithCaseInsensitive(g.DOCTYPE_DECL_START) : !p.substringStartsWith(g.DOCTYPE_DECL_START)) {
            return errorHandler.fatalError("Expected " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
          }
          p.skip(g.DOCTYPE_DECL_START.length);
          if (p.skipBlanks() < 1) {
            return errorHandler.fatalError("Expected whitespace after " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
          }
          var doctype = {
            name: void 0,
            publicId: void 0,
            systemId: void 0,
            internalSubset: void 0
          };
          doctype.name = p.getMatch(g.Name);
          if (!doctype.name)
            return errorHandler.fatalError("doctype name missing or contains unexpected characters at position " + p.getIndex());
          if (isHTML && doctype.name.toLowerCase() !== "html") {
            errorHandler.warning("Unexpected DOCTYPE in HTML document at position " + p.getIndex());
          }
          p.skipBlanks();
          if (p.substringStartsWith(g.PUBLIC) || p.substringStartsWith(g.SYSTEM)) {
            var match = g.ExternalID_match.exec(p.substringFromIndex());
            if (!match) {
              return errorHandler.fatalError("doctype external id is not well-formed at position " + p.getIndex());
            }
            if (match.groups.SystemLiteralOnly !== void 0) {
              doctype.systemId = match.groups.SystemLiteralOnly;
            } else {
              doctype.systemId = match.groups.SystemLiteral;
              doctype.publicId = match.groups.PubidLiteral;
            }
            p.skip(match[0].length);
          } else if (isHTML && p.substringStartsWithCaseInsensitive(g.SYSTEM)) {
            p.skip(g.SYSTEM.length);
            if (p.skipBlanks() < 1) {
              return errorHandler.fatalError("Expected whitespace after " + g.SYSTEM + " at position " + p.getIndex());
            }
            doctype.systemId = p.getMatch(g.ABOUT_LEGACY_COMPAT_SystemLiteral);
            if (!doctype.systemId) {
              return errorHandler.fatalError(
                "Expected " + g.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + g.SYSTEM + " at position " + p.getIndex()
              );
            }
          }
          if (isHTML && doctype.systemId && !g.ABOUT_LEGACY_COMPAT_SystemLiteral.test(doctype.systemId)) {
            errorHandler.warning("Unexpected doctype.systemId in HTML document at position " + p.getIndex());
          }
          if (!isHTML) {
            p.skipBlanks();
            doctype.internalSubset = parseDoctypeInternalSubset(p, errorHandler);
          }
          p.skipBlanks();
          if (p.char() !== ">") {
            return errorHandler.fatalError("doctype not terminated with > at position " + p.getIndex());
          }
          p.skip(1);
          domBuilder.startDTD(doctype.name, doctype.publicId, doctype.systemId, doctype.internalSubset);
          domBuilder.endDTD();
          return p.getIndex();
        }
        default:
          return errorHandler.fatalError('Not well-formed XML starting with "<!" at position ' + start);
      }
    }
    function parseProcessingInstruction(source, start, domBuilder, errorHandler) {
      var match = source.substring(start).match(g.PI);
      if (!match) {
        return errorHandler.fatalError("Invalid processing instruction starting at position " + start);
      }
      if (match[1].toLowerCase() === "xml") {
        if (start > 0) {
          return errorHandler.fatalError(
            "processing instruction at position " + start + " is an xml declaration which is only at the start of the document"
          );
        }
        if (!g.XMLDecl.test(source.substring(start))) {
          return errorHandler.fatalError("xml declaration is not well-formed");
        }
      }
      domBuilder.processingInstruction(match[1], match[2]);
      return start + match[0].length;
    }
    function ElementAttributes() {
      this.attributeNames = /* @__PURE__ */ Object.create(null);
    }
    ElementAttributes.prototype = {
      setTagName: function(tagName) {
        if (!g.QName_exact.test(tagName)) {
          throw new Error("invalid tagName:" + tagName);
        }
        this.tagName = tagName;
      },
      addValue: function(qName, value, offset) {
        if (!g.QName_exact.test(qName)) {
          throw new Error("invalid attribute:" + qName);
        }
        this.attributeNames[qName] = this.length;
        this[this.length++] = { qName, value, offset };
      },
      length: 0,
      getLocalName: function(i) {
        return this[i].localName;
      },
      getLocator: function(i) {
        return this[i].locator;
      },
      getQName: function(i) {
        return this[i].qName;
      },
      getURI: function(i) {
        return this[i].uri;
      },
      getValue: function(i) {
        return this[i].value;
      }
      //	,getIndex:function(uri, localName)){
      //		if(localName){
      //
      //		}else{
      //			var qName = uri
      //		}
      //	},
      //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
      //	getType:function(uri,localName){}
      //	getType:function(i){},
    };
    exports.XMLReader = XMLReader;
    exports.parseUtils = parseUtils;
    exports.parseDoctypeCommentOrCData = parseDoctypeCommentOrCData;
  }
});

// node_modules/@xmldom/xmldom/lib/dom-parser.js
var require_dom_parser = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports) {
    var conventions = require_conventions();
    var dom = require_dom();
    var errors = require_errors();
    var entities = require_entities();
    var sax = require_sax();
    var DOMImplementation = dom.DOMImplementation;
    var hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
    var isHTMLMimeType = conventions.isHTMLMimeType;
    var isValidMimeType = conventions.isValidMimeType;
    var MIME_TYPE = conventions.MIME_TYPE;
    var NAMESPACE = conventions.NAMESPACE;
    var ParseError = errors.ParseError;
    var XMLReader = sax.XMLReader;
    function normalizeLineEndings(input) {
      return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028\u2029]/g, "\n");
    }
    function DOMParser2(options) {
      options = options || {};
      if (options.locator === void 0) {
        options.locator = true;
      }
      this.assign = options.assign || conventions.assign;
      this.domHandler = options.domHandler || DOMHandler;
      this.onError = options.onError || options.errorHandler;
      if (options.errorHandler && typeof options.errorHandler !== "function") {
        throw new TypeError("errorHandler object is no longer supported, switch to onError!");
      } else if (options.errorHandler) {
        options.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this);
      }
      this.normalizeLineEndings = options.normalizeLineEndings || normalizeLineEndings;
      this.locator = !!options.locator;
      this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), options.xmlns);
    }
    DOMParser2.prototype.parseFromString = function(source, mimeType) {
      if (!isValidMimeType(mimeType)) {
        throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + mimeType + '" is not valid.');
      }
      var defaultNSMap = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns);
      var entityMap = entities.XML_ENTITIES;
      var defaultNamespace = defaultNSMap[""] || null;
      if (hasDefaultHTMLNamespace(mimeType)) {
        entityMap = entities.HTML_ENTITIES;
        defaultNamespace = NAMESPACE.HTML;
      } else if (mimeType === MIME_TYPE.XML_SVG_IMAGE) {
        defaultNamespace = NAMESPACE.SVG;
      }
      defaultNSMap[""] = defaultNamespace;
      defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
      var domBuilder = new this.domHandler({
        mimeType,
        defaultNamespace,
        onError: this.onError
      });
      var locator = this.locator ? {} : void 0;
      if (this.locator) {
        domBuilder.setDocumentLocator(locator);
      }
      var sax2 = new XMLReader();
      sax2.errorHandler = domBuilder;
      sax2.domBuilder = domBuilder;
      var isXml = !conventions.isHTMLMimeType(mimeType);
      if (isXml && typeof source !== "string") {
        sax2.errorHandler.fatalError("source is not a string");
      }
      sax2.parse(this.normalizeLineEndings(String(source)), defaultNSMap, entityMap);
      if (!domBuilder.doc.documentElement) {
        sax2.errorHandler.fatalError("missing root element");
      }
      return domBuilder.doc;
    };
    function DOMHandler(options) {
      var opt = options || {};
      this.mimeType = opt.mimeType || MIME_TYPE.XML_APPLICATION;
      this.defaultNamespace = opt.defaultNamespace || null;
      this.cdata = false;
      this.currentElement = void 0;
      this.doc = void 0;
      this.locator = void 0;
      this.onError = opt.onError;
    }
    function position(locator, node) {
      node.lineNumber = locator.lineNumber;
      node.columnNumber = locator.columnNumber;
    }
    DOMHandler.prototype = {
      /**
       * Either creates an XML or an HTML document and stores it under `this.doc`.
       * If it is an XML document, `this.defaultNamespace` is used to create it,
       * and it will not contain any `childNodes`.
       * If it is an HTML document, it will be created without any `childNodes`.
       *
       * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
       */
      startDocument: function() {
        var impl = new DOMImplementation();
        this.doc = isHTMLMimeType(this.mimeType) ? impl.createHTMLDocument(false) : impl.createDocument(this.defaultNamespace, "");
      },
      startElement: function(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);
        for (var i = 0; i < len; i++) {
          var namespaceURI = attrs.getURI(i);
          var value = attrs.getValue(i);
          var qName = attrs.getQName(i);
          var attr = doc.createAttributeNS(namespaceURI, qName);
          this.locator && position(attrs.getLocator(i), attr);
          attr.value = attr.nodeValue = value;
          el.setAttributeNode(attr);
        }
      },
      endElement: function(namespaceURI, localName, qName) {
        this.currentElement = this.currentElement.parentNode;
      },
      startPrefixMapping: function(prefix, uri) {
      },
      endPrefixMapping: function(prefix) {
      },
      processingInstruction: function(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
      },
      ignorableWhitespace: function(ch, start, length) {
      },
      characters: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        if (chars) {
          if (this.cdata) {
            var charNode = this.doc.createCDATASection(chars);
          } else {
            var charNode = this.doc.createTextNode(chars);
          }
          if (this.currentElement) {
            this.currentElement.appendChild(charNode);
          } else if (/^\s*$/.test(chars)) {
            this.doc.appendChild(charNode);
          }
          this.locator && position(this.locator, charNode);
        }
      },
      skippedEntity: function(name) {
      },
      endDocument: function() {
        this.doc.normalize();
      },
      /**
       * Stores the locator to be able to set the `columnNumber` and `lineNumber`
       * on the created DOM nodes.
       *
       * @param {Locator} locator
       */
      setDocumentLocator: function(locator) {
        if (locator) {
          locator.lineNumber = 0;
        }
        this.locator = locator;
      },
      //LexicalHandler
      comment: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
      },
      startCDATA: function() {
        this.cdata = true;
      },
      endCDATA: function() {
        this.cdata = false;
      },
      startDTD: function(name, publicId, systemId, internalSubset) {
        var impl = this.doc.implementation;
        if (impl && impl.createDocumentType) {
          var dt = impl.createDocumentType(name, publicId, systemId, internalSubset);
          this.locator && position(this.locator, dt);
          appendElement(this, dt);
          this.doc.doctype = dt;
        }
      },
      reportError: function(level, message) {
        if (typeof this.onError === "function") {
          try {
            this.onError(level, message, this);
          } catch (e) {
            throw new ParseError("Reporting " + level + ' "' + message + '" caused ' + e, this.locator);
          }
        } else {
          console.error("[xmldom " + level + "]	" + message, _locator(this.locator));
        }
      },
      /**
       * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
       */
      warning: function(message) {
        this.reportError("warning", message);
      },
      error: function(message) {
        this.reportError("error", message);
      },
      /**
       * This function reports a fatal error and throws a ParseError.
       *
       * @param {string} message
       * - The message to be used for reporting and throwing the error.
       * @param {Error} [cause]
       * The error that caused this fatal error, preserved as the thrown `ParseError`'s `cause`.
       * @returns {never}
       * This function always throws an error and never returns a value.
       * @throws {ParseError}
       * Always throws a ParseError with the provided message.
       */
      fatalError: function(message, cause) {
        this.reportError("fatalError", message);
        throw new ParseError(message, this.locator, cause);
      }
    };
    function _locator(l) {
      if (l) {
        return "\n@#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
      }
    }
    function _toString(chars, start, length) {
      if (typeof chars == "string") {
        return chars.substr(start, length);
      } else {
        if (chars.length >= start + length || start) {
          return new java.lang.String(chars, start, length) + "";
        }
        return chars;
      }
    }
    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
      /\w+/g,
      function(key) {
        DOMHandler.prototype[key] = function() {
          return null;
        };
      }
    );
    function appendElement(handler, node) {
      if (!handler.currentElement) {
        handler.doc.appendChild(node);
      } else {
        handler.currentElement.appendChild(node);
      }
    }
    function onErrorStopParsing2(level) {
      if (level === "error") throw "onErrorStopParsing";
    }
    function onWarningStopParsing() {
      throw "onWarningStopParsing";
    }
    exports.__DOMHandler = DOMHandler;
    exports.DOMParser = DOMParser2;
    exports.normalizeLineEndings = normalizeLineEndings;
    exports.onErrorStopParsing = onErrorStopParsing2;
    exports.onWarningStopParsing = onWarningStopParsing;
  }
});

// node_modules/@xmldom/xmldom/lib/index.js
var require_lib = __commonJS({
  "node_modules/@xmldom/xmldom/lib/index.js"(exports) {
    var conventions = require_conventions();
    exports.assign = conventions.assign;
    exports.hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
    exports.isHTMLMimeType = conventions.isHTMLMimeType;
    exports.isValidMimeType = conventions.isValidMimeType;
    exports.MIME_TYPE = conventions.MIME_TYPE;
    exports.NAMESPACE = conventions.NAMESPACE;
    var errors = require_errors();
    exports.DOMException = errors.DOMException;
    exports.DOMExceptionName = errors.DOMExceptionName;
    exports.ExceptionCode = errors.ExceptionCode;
    exports.ParseError = errors.ParseError;
    var dom = require_dom();
    exports.Attr = dom.Attr;
    exports.CDATASection = dom.CDATASection;
    exports.CharacterData = dom.CharacterData;
    exports.Comment = dom.Comment;
    exports.Document = dom.Document;
    exports.DocumentFragment = dom.DocumentFragment;
    exports.DocumentType = dom.DocumentType;
    exports.DOMImplementation = dom.DOMImplementation;
    exports.Element = dom.Element;
    exports.Entity = dom.Entity;
    exports.EntityReference = dom.EntityReference;
    exports.LiveNodeList = dom.LiveNodeList;
    exports.NamedNodeMap = dom.NamedNodeMap;
    exports.Node = dom.Node;
    exports.NodeList = dom.NodeList;
    exports.Notation = dom.Notation;
    exports.ProcessingInstruction = dom.ProcessingInstruction;
    exports.Text = dom.Text;
    exports.XMLSerializer = dom.XMLSerializer;
    var domParser = require_dom_parser();
    exports.DOMParser = domParser.DOMParser;
    exports.normalizeLineEndings = domParser.normalizeLineEndings;
    exports.onErrorStopParsing = domParser.onErrorStopParsing;
    exports.onWarningStopParsing = domParser.onWarningStopParsing;
  }
});

// src/util/warn.ts
var warned = /* @__PURE__ */ new Set();
function warnOnce(key, message) {
  if (warned.has(key)) return;
  warned.add(key);
  console.warn(`[navigations] ${message}`);
}

// src/options.ts
var VARIANTS = [
  "tree",
  "bar",
  "accordion",
  "dropdown",
  "flyout",
  "tabs",
  "mega",
  "columns",
  "select",
  "pager",
  "rail"
];
var MOBILE = ["same", "accordion", "offcanvas", "select", "hidden"];
var ALIGNS = ["left", "center", "right", "full"];
var FLYOUT_SIDES = ["auto", "right", "left"];
var RAIL_RESTS = ["hidden", "icons"];
var RAIL_SIDES = ["left", "right"];
var RAIL_EXPANDS = ["hover", "strip", "click"];
var RAIL_CONTENTS = ["overlay", "push"];
var RAIL_HOVER_CONTENTS = ["same", "overlay", "push"];
var RAIL_ON_NAVIGATE = ["close", "keep"];
var SCOPES = ["root", "section", "parent", "current"];
var SORTS = ["manual", "alphabetical", "date"];
var DIRECTIONS = ["asc", "desc"];
var FOLDERS_FIRST = ["first", "last", "mixed"];
var DATE_FIELDS = ["created", "modified", "published"];
var INDEX_ENTRIES = ["none", "first"];
var FOLDER_LINKS = ["index", "none", "first-child"];
var FOLDER_CLICKS = ["link", "toggle"];
var FOLDER_STATES = ["collapsed", "open"];
var TRIGGERS = ["click", "hover"];
var PAGER_ORDERS = ["tree", "siblings"];
var ICONS = ["none", "type", "custom", "both"];
var LEGACY_VARIANTS = { vertical: "tree", horizontal: "bar" };
var defaultOptions = {
  language: "auto",
  variant: "tree",
  mobile: "same",
  align: "left",
  className: "",
  id: "",
  title: "",
  ariaLabel: "",
  chevrons: true,
  icons: "both",
  iconNames: {
    folder: "folder",
    folderOpen: "folder-open",
    file: "file",
    home: "house",
    chevron: "chevron-down",
    menu: "menu",
    close: "x",
    pin: "pin",
    unpin: "pin-off",
    previous: "chevron-left",
    next: "chevron-right"
  },
  nodeIcons: {},
  dividers: [],
  rootPath: "",
  scope: "root",
  depth: 0,
  hideOutsideRoot: true,
  showScopeRoot: false,
  showHome: false,
  indexEntry: "none",
  sort: "manual",
  sortDirection: "asc",
  foldersFirst: "first",
  dateField: "created",
  order: {},
  stripNumericPrefix: false,
  frontmatterKeys: {
    order: "navOrder",
    title: "navTitle",
    hide: "navHide",
    icon: "navIcon",
    divider: "navDivider"
  },
  hideTags: true,
  hideUnlisted: true,
  hideDrafts: true,
  hideEmptyFolders: true,
  keepIndexOnlyFolders: true,
  include: [],
  exclude: [],
  folderLink: "index",
  folderClick: "toggle",
  folderDefaultState: "collapsed",
  expandActive: true,
  exclusive: false,
  persistState: false,
  trigger: "click",
  breakpoints: {},
  tabs: { secondary: true },
  flyout: { side: "auto" },
  rail: {
    rest: "hidden",
    side: "left",
    expand: "hover",
    content: "overlay",
    hoverContent: "same",
    pinContent: "same",
    onNavigate: "close",
    pin: true,
    startPinned: false
  },
  select: { button: false },
  columns: { max: 4 },
  pager: { labels: true, order: "tree" }
};
function pickEnum(key, value, allowed, fallback) {
  if (value === void 0) return fallback;
  if (typeof value === "string" && allowed.includes(value)) {
    return value;
  }
  warnOnce(
    `enum:${key}:${String(value)}`,
    `Unknown value ${JSON.stringify(value)} for \`${key}\`; using \`${fallback}\`.`
  );
  return fallback;
}
function pickBoolean(value, fallback) {
  return typeof value === "boolean" ? value : fallback;
}
function pickString(value, fallback) {
  return typeof value === "string" ? value.trim() : fallback;
}
function pickInt(key, value, fallback, min) {
  if (value === void 0) return fallback;
  const n = typeof value === "string" ? Number(value) : value;
  if (typeof n === "number" && Number.isInteger(n) && n >= min) return n;
  warnOnce(
    `int:${key}:${String(value)}`,
    `\`${key}\` must be an integer >= ${min}; using ${fallback}.`
  );
  return fallback;
}
function pickStringList(key, value) {
  if (value === void 0) return [];
  const list = Array.isArray(value) ? value : [value];
  const out = [];
  for (const v of list) {
    if (typeof v === "string" && v.trim().length > 0) {
      out.push(v.trim());
    } else {
      warnOnce(
        `list:${key}:${String(v)}`,
        `Ignoring invalid \`${key}\` entry ${JSON.stringify(v)}.`
      );
    }
  }
  return out;
}
function pickLanguage(value) {
  if (value === void 0) return defaultOptions.language;
  if (typeof value === "string" && /^[A-Za-z]{2,3}([-_][A-Za-z0-9]+)*$|^(auto|all)$/.test(value.trim())) {
    return value.trim().toLowerCase();
  }
  warnOnce(
    `language:${String(value)}`,
    `Unknown value ${JSON.stringify(value)} for \`language\`; using \`auto\`.`
  );
  return defaultOptions.language;
}
function normalizePath(value) {
  let s = value.trim().replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
  if (s.endsWith(".md")) s = s.slice(0, -3);
  if (s === "index") return "";
  if (s.endsWith("/index")) s = s.slice(0, -"/index".length);
  return s;
}
function normalizeNodeIcons(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    if (value !== void 0)
      warnOnce("nodeIcons:type", "`nodeIcons` must be a map of path \u2192 icon.");
    return {};
  }
  const out = {};
  for (const [key, icon2] of Object.entries(value)) {
    if (typeof icon2 === "string" && icon2.trim()) {
      out[normalizePath(key)] = icon2.trim();
    } else {
      warnOnce(`nodeIcons:${key}`, `Ignoring invalid \`nodeIcons\` entry for "${key}".`);
    }
  }
  return out;
}
function normalizeOrder(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    if (value !== void 0) warnOnce("order:type", "`order` must be a map of folder \u2192 list.");
    return {};
  }
  const out = {};
  for (const [key, list] of Object.entries(value)) {
    const entries = pickStringList(`order.${key}`, list).map((s) => normalizePath(s));
    out[normalizePath(key)] = entries;
  }
  return out;
}
function resolveOptions(userOpts) {
  const user = userOpts ?? {};
  const keys = user.frontmatterKeys ?? {};
  const iconNames = user.iconNames ?? {};
  const bp = user.breakpoints ?? {};
  const tabs = user.tabs ?? {};
  const flyout = user.flyout ?? {};
  const rail = user.rail ?? {};
  const select = user.select ?? {};
  const columns = user.columns ?? {};
  const pager = user.pager ?? {};
  let variant = user.variant;
  if (typeof variant === "string" && variant in LEGACY_VARIANTS) {
    const renamed = LEGACY_VARIANTS[variant];
    warnOnce(`legacy:variant:${variant}`, `\`variant: ${variant}\` is now \`${renamed}\`.`);
    variant = renamed;
  }
  let trigger = user.trigger;
  if (trigger === void 0 && user.dropdownTrigger !== void 0) {
    warnOnce("legacy:dropdownTrigger", "`dropdownTrigger` is now `trigger`.");
    trigger = user.dropdownTrigger;
  }
  if (user.style !== void 0) {
    warnOnce(
      "legacy:style",
      "`style` was removed; the navigation follows the Quartz theme, tune it with the `--quartz-nav-*` CSS variables."
    );
  }
  const resolvedVariant = pickEnum("variant", variant, VARIANTS, defaultOptions.variant);
  let mobile = pickEnum("mobile", user.mobile, MOBILE, defaultOptions.mobile);
  if (resolvedVariant === "rail" && (mobile === "accordion" || mobile === "offcanvas")) {
    warnOnce(
      `rail:mobile:${mobile}`,
      `\`mobile: ${mobile}\` does not apply to \`variant: rail\`, which slides in on small screens by itself; using \`same\`.`
    );
    mobile = "same";
  }
  return {
    language: pickLanguage(user.language),
    variant: resolvedVariant,
    mobile,
    align: pickEnum("align", user.align, ALIGNS, defaultOptions.align),
    className: pickString(user.className, ""),
    id: pickString(user.id, "").replace(/[^A-Za-z0-9_-]/g, "-"),
    title: pickString(user.title, ""),
    ariaLabel: pickString(user.ariaLabel, ""),
    chevrons: pickBoolean(user.chevrons, defaultOptions.chevrons),
    icons: user.icons === true ? "both" : user.icons === false ? "none" : pickEnum("icons", user.icons, ICONS, defaultOptions.icons),
    iconNames: {
      folder: pickString(iconNames.folder, "") || defaultOptions.iconNames.folder,
      folderOpen: pickString(iconNames.folderOpen, "") || defaultOptions.iconNames.folderOpen,
      file: pickString(iconNames.file, "") || defaultOptions.iconNames.file,
      home: pickString(iconNames.home, "") || defaultOptions.iconNames.home,
      chevron: pickString(iconNames.chevron, "") || defaultOptions.iconNames.chevron,
      menu: pickString(iconNames.menu, "") || defaultOptions.iconNames.menu,
      close: pickString(iconNames.close, "") || defaultOptions.iconNames.close,
      pin: pickString(iconNames.pin, "") || defaultOptions.iconNames.pin,
      unpin: pickString(iconNames.unpin, "") || defaultOptions.iconNames.unpin,
      previous: pickString(iconNames.previous, "") || defaultOptions.iconNames.previous,
      next: pickString(iconNames.next, "") || defaultOptions.iconNames.next
    },
    nodeIcons: normalizeNodeIcons(user.nodeIcons),
    dividers: pickStringList("dividers", user.dividers).map(normalizePath),
    rootPath: normalizePath(pickString(user.rootPath, "")),
    scope: pickEnum("scope", user.scope, SCOPES, defaultOptions.scope),
    depth: pickInt("depth", user.depth, defaultOptions.depth, 0),
    hideOutsideRoot: pickBoolean(user.hideOutsideRoot, defaultOptions.hideOutsideRoot),
    showScopeRoot: pickBoolean(user.showScopeRoot, defaultOptions.showScopeRoot),
    showHome: pickBoolean(user.showHome, defaultOptions.showHome),
    indexEntry: pickEnum("indexEntry", user.indexEntry, INDEX_ENTRIES, defaultOptions.indexEntry),
    sort: pickEnum("sort", user.sort, SORTS, defaultOptions.sort),
    sortDirection: pickEnum(
      "sortDirection",
      user.sortDirection,
      DIRECTIONS,
      defaultOptions.sortDirection
    ),
    foldersFirst: pickEnum(
      "foldersFirst",
      user.foldersFirst,
      FOLDERS_FIRST,
      defaultOptions.foldersFirst
    ),
    dateField: pickEnum("dateField", user.dateField, DATE_FIELDS, defaultOptions.dateField),
    order: normalizeOrder(user.order),
    stripNumericPrefix: pickBoolean(user.stripNumericPrefix, defaultOptions.stripNumericPrefix),
    frontmatterKeys: {
      order: pickString(keys.order, "") || defaultOptions.frontmatterKeys.order,
      title: pickString(keys.title, "") || defaultOptions.frontmatterKeys.title,
      hide: pickString(keys.hide, "") || defaultOptions.frontmatterKeys.hide,
      icon: pickString(keys.icon, "") || defaultOptions.frontmatterKeys.icon,
      divider: pickString(keys.divider, "") || defaultOptions.frontmatterKeys.divider
    },
    hideTags: pickBoolean(user.hideTags, defaultOptions.hideTags),
    hideUnlisted: pickBoolean(user.hideUnlisted, defaultOptions.hideUnlisted),
    hideDrafts: pickBoolean(user.hideDrafts, defaultOptions.hideDrafts),
    hideEmptyFolders: pickBoolean(user.hideEmptyFolders, defaultOptions.hideEmptyFolders),
    keepIndexOnlyFolders: pickBoolean(
      user.keepIndexOnlyFolders,
      defaultOptions.keepIndexOnlyFolders
    ),
    include: pickStringList("include", user.include),
    exclude: pickStringList("exclude", user.exclude),
    folderLink: pickEnum("folderLink", user.folderLink, FOLDER_LINKS, defaultOptions.folderLink),
    folderClick: pickEnum(
      "folderClick",
      user.folderClick,
      FOLDER_CLICKS,
      defaultOptions.folderClick
    ),
    folderDefaultState: pickEnum(
      "folderDefaultState",
      user.folderDefaultState,
      FOLDER_STATES,
      defaultOptions.folderDefaultState
    ),
    expandActive: pickBoolean(user.expandActive, defaultOptions.expandActive),
    exclusive: pickBoolean(user.exclusive, defaultOptions.exclusive),
    persistState: pickBoolean(user.persistState, defaultOptions.persistState),
    trigger: pickEnum("trigger", trigger, TRIGGERS, defaultOptions.trigger),
    breakpoints: {
      mobile: typeof bp.mobile === "string" || typeof bp.mobile === "number" ? bp.mobile : void 0,
      desktop: typeof bp.desktop === "string" || typeof bp.desktop === "number" ? bp.desktop : void 0
    },
    tabs: { secondary: pickBoolean(tabs.secondary, defaultOptions.tabs.secondary) },
    flyout: {
      side: pickEnum("flyout.side", flyout.side, FLYOUT_SIDES, defaultOptions.flyout.side)
    },
    rail: {
      rest: pickEnum("rail.rest", rail.rest, RAIL_RESTS, defaultOptions.rail.rest),
      side: pickEnum("rail.side", rail.side, RAIL_SIDES, defaultOptions.rail.side),
      expand: pickEnum("rail.expand", rail.expand, RAIL_EXPANDS, defaultOptions.rail.expand),
      content: pickEnum("rail.content", rail.content, RAIL_CONTENTS, defaultOptions.rail.content),
      hoverContent: pickEnum(
        "rail.hoverContent",
        rail.hoverContent,
        RAIL_HOVER_CONTENTS,
        defaultOptions.rail.hoverContent
      ),
      pinContent: pickEnum(
        "rail.pinContent",
        rail.pinContent,
        RAIL_HOVER_CONTENTS,
        defaultOptions.rail.pinContent
      ),
      onNavigate: pickEnum(
        "rail.onNavigate",
        rail.onNavigate,
        RAIL_ON_NAVIGATE,
        defaultOptions.rail.onNavigate
      ),
      pin: pickBoolean(rail.pin, defaultOptions.rail.pin),
      startPinned: pickBoolean(rail.startPinned, defaultOptions.rail.startPinned)
    },
    select: { button: pickBoolean(select.button, defaultOptions.select.button) },
    columns: { max: pickInt("columns.max", columns.max, defaultOptions.columns.max, 1) },
    pager: {
      labels: pickBoolean(pager.labels, defaultOptions.pager.labels),
      order: pickEnum("pager.order", pager.order, PAGER_ORDERS, defaultOptions.pager.order)
    }
  };
}
function treeOptionsKey(opts) {
  return JSON.stringify({
    sort: opts.sort,
    sortDirection: opts.sortDirection,
    foldersFirst: opts.foldersFirst,
    dateField: opts.dateField,
    order: opts.order,
    stripNumericPrefix: opts.stripNumericPrefix,
    frontmatterKeys: opts.frontmatterKeys,
    hideTags: opts.hideTags,
    hideUnlisted: opts.hideUnlisted,
    hideDrafts: opts.hideDrafts,
    hideEmptyFolders: opts.hideEmptyFolders,
    keepIndexOnlyFolders: opts.keepIndexOnlyFolders,
    include: opts.include,
    exclude: opts.exclude,
    icons: opts.icons,
    nodeIcons: opts.nodeIcons,
    dividers: opts.dividers
  });
}

// node_modules/@quartz-community/utils/dist/path.js
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function joinSegments(...args) {
  if (args.length === 0) {
    return "";
  }
  let joined = args.filter((segment) => segment !== "" && segment !== "/").map((segment) => stripSlashes(segment)).join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) {
    joined = "/" + joined;
  }
  if (last?.endsWith("/")) {
    joined = joined + "/";
  }
  return joined;
}
function endsWith(s, suffix) {
  return s === suffix || s.endsWith("/" + suffix);
}
function trimSuffix(s, suffix) {
  if (endsWith(s, suffix)) {
    s = s.slice(0, -suffix.length);
  }
  return s;
}
function stripSlashes(s, onlyStripPrefix) {
  if (s.startsWith("/")) {
    s = s.substring(1);
  }
  if (!onlyStripPrefix && s.endsWith("/")) {
    s = s.slice(0, -1);
  }
  return s;
}
function pathToRoot(slug2) {
  let rootPath = slug2.split("/").filter((x) => x !== "").slice(0, -1).map((_) => "..").join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}
function resolveRelative(current, target) {
  const res = joinSegments(pathToRoot(current), simplifySlug(target));
  return res;
}

// src/links.ts
function hrefFor(current, target) {
  return resolveRelative(current, target);
}
function firstPage(node) {
  for (const child of node.children) {
    if (child.kind === "page") return child;
    if (child.hasIndex) return child;
    const nested = firstPage(child);
    if (nested) return nested;
  }
  return void 0;
}
function linkTarget(node, opts) {
  if (node.kind === "page") return node.slug;
  switch (opts.folderLink) {
    case "none":
      return void 0;
    case "first-child":
      return firstPage(node)?.slug;
    default:
      return node.hasIndex ? node.slug : firstPage(node)?.slug;
  }
}

// src/scope.ts
function chainOf(tree, slug2) {
  const out = [];
  let node = tree.bySlug.get(slug2);
  while (node) {
    out.push(node);
    node = node.parentSlug !== void 0 ? tree.bySlug.get(node.parentSlug) : void 0;
  }
  return out;
}
function parentOf(tree, node) {
  return node.parentSlug !== void 0 ? tree.bySlug.get(node.parentSlug) : void 0;
}
function resolveScope(tree, currentSlug, opts, currentKey = currentSlug) {
  const base = tree.folders.get(opts.rootPath);
  if (!base) {
    warnOnce(
      `root-path:${opts.rootPath}`,
      `\`rootPath: ${opts.rootPath}\` is not a folder with visible pages.`
    );
    return void 0;
  }
  if (opts.rootPath && opts.hideOutsideRoot && !currentKey.startsWith(`${opts.rootPath}/`)) {
    return void 0;
  }
  const chain = chainOf(tree, currentSlug);
  const current = chain[0];
  const trail = new Set(chain.slice(1).map((n) => n.slug));
  const inBase = (n) => !opts.rootPath || n.path === opts.rootPath || n.path.startsWith(`${opts.rootPath}/`);
  let root;
  switch (opts.scope) {
    case "section":
      root = chain.find((n) => n.kind === "folder" && n.depth === base.depth + 1 && inBase(n));
      break;
    case "parent": {
      const parent = current ? parentOf(tree, current) : void 0;
      root = parent && inBase(parent) ? parent : current;
      break;
    }
    case "current":
      root = current ? current.kind === "folder" ? current : parentOf(tree, current) : void 0;
      break;
    default:
      root = base;
  }
  if (!root || root.kind !== "folder" || !inBase(root)) return void 0;
  return { base, root, current, trail };
}
function flatten(root, opts) {
  const out = [];
  const walk = (node, level) => {
    for (const child of node.children) {
      out.push(child);
      if (child.kind === "folder" && (opts.depth === 0 || level < opts.depth)) {
        walk(child, level + 1);
      }
    }
  };
  walk(root, 1);
  return out;
}
function pagerNeighbours(tree, scope, opts) {
  const { current } = scope;
  if (!current) return {};
  let list;
  if (opts.pager.order === "siblings") {
    const parent = parentOf(tree, current);
    list = parent ? parent.children : [];
  } else {
    list = flatten(scope.root, opts);
    if (scope.root.hasIndex && linkTarget(scope.root, opts)) list = [scope.root, ...list];
  }
  const entries = list.map((node) => ({ node, target: linkTarget(node, opts) })).filter((e) => e.target !== void 0);
  const own2 = (e) => e.node.slug === e.target || e.node.slug === current.slug;
  const ownTargets = new Set(entries.filter(own2).map((e) => e.target));
  const linked = entries.filter((e) => own2(e) || !ownTargets.has(e.target)).map((e) => e.node);
  const idx = linked.findIndex((n) => n.slug === current.slug);
  if (idx < 0) return {};
  return { prev: linked[idx - 1], next: linked[idx + 1] };
}

// src/frontmatter.ts
function frontmatterOf(value) {
  return value !== null && typeof value === "object" ? value : void 0;
}
function readString(fm, key) {
  const v = fm?.[key];
  if (typeof v === "string") {
    const s = v.trim();
    return s.length > 0 ? s : void 0;
  }
  if (typeof v === "number") return String(v);
  return void 0;
}
function readNumber(fm, key) {
  const v = fm?.[key];
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return void 0;
}
function readBoolean(fm, key) {
  const v = fm?.[key];
  if (typeof v === "boolean") return v;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "true" || s === "yes") return true;
    if (s === "false" || s === "no") return false;
  }
  return void 0;
}

// src/language.ts
function multilanguageOf(data) {
  const ml = data.multilanguage;
  if (ml === null || typeof ml !== "object") return void 0;
  const { lang, baseSlug, source } = ml;
  if (typeof lang !== "string" || !lang || typeof baseSlug !== "string" || !baseSlug) {
    return void 0;
  }
  return {
    lang: lang.toLowerCase(),
    baseSlug,
    ...typeof source === "string" ? { source } : {}
  };
}
function dirSegments(slug2) {
  return slug2.split("/").slice(0, -1);
}
function join(dir, name) {
  return dir ? `${dir}/${name}` : name;
}
var cache = /* @__PURE__ */ new WeakMap();
function languageIndex(allFiles) {
  const hit = cache.get(allFiles);
  if (hit) return hit;
  const languages = [];
  let defaultLanguage;
  const dirs = /* @__PURE__ */ new Map();
  for (const data of allFiles) {
    const ml = multilanguageOf(data);
    const slug2 = typeof data.slug === "string" ? data.slug : "";
    if (!ml || !slug2) continue;
    if (!languages.includes(ml.lang)) languages.push(ml.lang);
    if (ml.source === "default") defaultLanguage ??= ml.lang;
    const slugDirs = dirSegments(slug2);
    const baseDirs = dirSegments(ml.baseSlug);
    const offset = slugDirs.length - baseDirs.length;
    if (offset < 0 || slugDirs.slice(offset).join("/") !== baseDirs.join("/")) continue;
    for (let i = offset; i <= slugDirs.length; i++) {
      const slugDir = slugDirs.slice(0, i).join("/");
      let perLang = dirs.get(slugDir);
      if (!perLang) {
        perLang = /* @__PURE__ */ new Map();
        dirs.set(slugDir, perLang);
      }
      if (!perLang.has(ml.lang)) perLang.set(ml.lang, baseDirs.slice(0, i - offset).join("/"));
    }
  }
  const index = { languages, dirs };
  if (defaultLanguage) index.defaultLanguage = defaultLanguage;
  cache.set(allFiles, index);
  return index;
}
function rankOf(source) {
  if (source === "default") return 1;
  if (source === "frontmatter") return 2;
  return 3;
}
function placements(data, index) {
  const slug2 = typeof data.slug === "string" ? data.slug : "";
  const ml = multilanguageOf(data);
  if (ml) return [{ lang: ml.lang, key: ml.baseSlug, rank: rankOf(ml.source) }];
  const name = slug2.split("/").pop() ?? slug2;
  const mapped = index.dirs.get(dirSegments(slug2).join("/"));
  if (!mapped || mapped.size === 0) return [{ key: slug2, rank: 0 }];
  return [...mapped].map(([lang, dir]) => ({ lang, key: join(dir, name), rank: 0 }));
}
function placementIn(data, index, lang) {
  const all = placements(data, index);
  if (lang === void 0) return { key: typeof data.slug === "string" ? data.slug : "", rank: 0 };
  return all.find((p) => p.lang === lang) ?? all.find((p) => p.lang === void 0);
}
function primary(locale) {
  return locale?.toLowerCase().split(/[-_]/)[0];
}
function languageOfPage(data, index, siteLocale) {
  if (index.languages.length === 0) return void 0;
  const langs = placements(data, index).map((p) => p.lang).filter((l) => l !== void 0);
  const candidates = langs.length > 0 ? langs : index.languages;
  if (index.defaultLanguage && candidates.includes(index.defaultLanguage)) {
    return index.defaultLanguage;
  }
  const site = primary(siteLocale);
  return candidates.find((l) => primary(l) === site) ?? candidates[0];
}
function languageDirectory(index, dir) {
  const mapped = index.dirs.get(dir);
  if (!mapped || mapped.size !== 1) return void 0;
  const [lang, path3] = [...mapped][0];
  return path3 === dir ? void 0 : { lang, path: path3 };
}
function localeFor(lang, siteLocale) {
  return primary(siteLocale) === primary(lang) && siteLocale ? siteLocale : lang;
}

// src/sort.ts
function compareOptional(x, y, dir) {
  if (x === void 0 && y === void 0) return 0;
  if (x === void 0) return 1;
  if (y === void 0) return -1;
  return (x - y) * dir;
}
function compareNodes(opts, locale) {
  const dir = opts.sortDirection === "desc" ? -1 : 1;
  const collator = new Intl.Collator(locale, { numeric: true, sensitivity: "base" });
  const byTitle = (a, b) => collator.compare(a.title, b.title) * dir;
  const numeric = (get) => (a, b) => compareOptional(get(a), get(b), dir);
  let chain;
  switch (opts.sort) {
    case "alphabetical":
      chain = [byTitle];
      break;
    case "date":
      chain = [numeric((n) => n.date?.getTime()), byTitle];
      break;
    default:
      chain = [
        numeric((n) => n.listOrder),
        numeric((n) => n.order),
        numeric((n) => n.prefixOrder),
        byTitle
      ];
  }
  const foldersFirst = (a, b) => {
    if (opts.foldersFirst === "mixed" || a.kind === b.kind) return 0;
    const folderFirst = a.kind === "folder" ? -1 : 1;
    return opts.foldersFirst === "first" ? folderFirst : -folderFirst;
  };
  return (a, b) => {
    const byKind = foldersFirst(a, b);
    if (byKind !== 0) return byKind;
    for (const cmp of chain) {
      const r = cmp(a, b);
      if (r !== 0) return r;
    }
    return 0;
  };
}

// src/util/glob.ts
function globToRegExp(glob) {
  let re = "";
  const g = glob.trim().replace(/^\/+|\/+$/g, "");
  for (let i = 0; i < g.length; i++) {
    const c = g[i];
    if (c === "*") {
      if (g[i + 1] === "*") {
        re += ".*";
        i++;
      } else {
        re += "[^/]*";
      }
    } else if (c === "?") {
      re += "[^/]";
    } else {
      re += /[.+^${}()|[\]\\]/.test(c) ? `\\${c}` : c;
    }
  }
  return new RegExp(`^${re}$`);
}
function matchesAny(patterns, slug2) {
  if (patterns.length === 0) return false;
  const candidates = /* @__PURE__ */ new Set([slug2]);
  const simplified = slug2 === "index" ? "" : slug2.replace(/\/index$/, "");
  candidates.add(simplified);
  const segments = simplified.split("/").filter((s) => s.length > 0);
  for (let i = 1; i < segments.length; i++) {
    candidates.add(segments.slice(0, i).join("/"));
  }
  for (const c of candidates) {
    for (const p of patterns) {
      if (p.test(c)) return true;
    }
  }
  return false;
}

// src/tree.ts
var NUMERIC_PREFIX = /^(\d+)[-_. ]+(.+)$/;
function newDraft(kind, segments) {
  const slug2 = kind === "folder" ? [...segments, "index"].join("/") : segments.join("/");
  return {
    kind,
    segment: segments[segments.length - 1] ?? "",
    depth: segments.length,
    path: segments.join("/"),
    slug: slug2,
    children: /* @__PURE__ */ new Map(),
    hasIndex: false,
    isVirtual: false
  };
}
function childKey(kind, segment) {
  return `${kind}:${segment}`;
}
function isDraft(fm) {
  const v = fm?.draft;
  return v === true || typeof v === "string" && v.trim().toLowerCase() === "true";
}
function stripExtension(name) {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(0, i) : name;
}
function ensureFolder(root, segments, dirParts) {
  let node = root;
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    let child = node.children.get(childKey("folder", seg));
    if (!child) {
      child = newDraft("folder", segments.slice(0, i + 1));
      node.children.set(childKey("folder", seg), child);
    }
    if (dirParts && child.nameHint === void 0) {
      const hint = dirParts[i];
      if (hint) child.nameHint = hint;
    }
    node = child;
  }
  return node;
}
var INDEX_STEM = /^_?index(\.[\w-]+)?$/i;
function isIndexTitle(title, draft) {
  if (title === "index") return true;
  const data = draft.data;
  if (typeof data?.filePath !== "string" || typeof data.relativePath !== "string") return false;
  const stem = stripExtension(data.relativePath.split("/").pop() ?? "");
  return title === stem && INDEX_STEM.test(stem);
}
function alignedDirs(relativePath, count) {
  if (!relativePath) return void 0;
  const dirs = relativePath.split("/").slice(0, -1);
  return dirs.length >= count ? dirs.slice(dirs.length - count) : void 0;
}
function collect(entries, opts) {
  const include = opts.include.map(globToRegExp);
  const exclude = opts.exclude.map(globToRegExp);
  const root = newDraft("folder", []);
  const matches = (patterns, slug2, key) => matchesAny(patterns, key) || key !== slug2 && matchesAny(patterns, slug2);
  for (const { data, key, rank } of entries) {
    const slug2 = typeof data.slug === "string" ? data.slug : "";
    if (!slug2 || slug2 === "404" || !key) continue;
    if (opts.hideTags && (slug2 === "tags" || slug2.startsWith("tags/"))) continue;
    if (opts.hideUnlisted && data.unlisted === true) continue;
    const fm = frontmatterOf(data.frontmatter);
    if (opts.hideDrafts && isDraft(fm)) continue;
    if (matches(exclude, slug2, key)) continue;
    if (include.length > 0 && !matches(include, slug2, key)) continue;
    const segments = key.split("/");
    const isIndex = segments[segments.length - 1] === "index";
    const folderSegments = segments.slice(0, -1);
    const real = typeof data.filePath === "string";
    const relativePath = typeof data.relativePath === "string" ? data.relativePath : void 0;
    const dirParts = real ? alignedDirs(relativePath, folderSegments.length) : void 0;
    const fileName = real ? relativePath?.split("/").pop() : void 0;
    const folder = ensureFolder(root, folderSegments, dirParts);
    if (isIndex) {
      if (folder.hasIndex && (folder.rank ?? 0) > rank) continue;
      folder.slug = slug2;
      folder.hasIndex = true;
      folder.isVirtual = !real;
      folder.frontmatter = fm;
      folder.data = data;
      folder.rank = rank;
      continue;
    }
    const existing = folder.children.get(childKey("page", segments[segments.length - 1]));
    if (existing && (existing.rank ?? 0) > rank) continue;
    const page = newDraft("page", segments);
    page.slug = slug2;
    page.frontmatter = fm;
    page.data = data;
    page.rank = rank;
    if (fileName) {
      const stem = stripExtension(fileName);
      const slugName = slug2.split("/").pop() ?? "";
      const suffix = slugName.startsWith(page.segment) ? slugName.slice(page.segment.length) : "";
      if (suffix && stem.toLowerCase().endsWith(suffix.toLowerCase())) {
        page.nameHint = stem.slice(0, stem.length - suffix.length);
        page.rawName = stem;
      } else {
        page.nameHint = stem;
      }
    }
    folder.children.set(childKey("page", page.segment), page);
  }
  return root;
}
function titleOf(draft, opts) {
  const fm = draft.frontmatter;
  const explicit = readString(fm, opts.frontmatterKeys.title);
  if (explicit) return explicit;
  const title = readString(fm, "title");
  let fromName = false;
  let out;
  const usable = title !== void 0 && !isIndexTitle(title, draft);
  if (usable && draft.kind === "page" && draft.rawName !== void 0 && title === draft.rawName) {
    out = draft.nameHint ?? title;
    fromName = true;
  } else if (usable && draft.kind === "page") {
    out = title;
    fromName = draft.nameHint !== void 0 && title === draft.nameHint;
  } else if (usable && !draft.isVirtual) {
    out = title;
  } else if (draft.nameHint) {
    out = draft.nameHint;
    fromName = true;
  } else if (usable) {
    out = title;
    fromName = true;
  } else {
    out = draft.segment;
    fromName = true;
  }
  if (opts.stripNumericPrefix && (fromName || NUMERIC_PREFIX.test(out))) {
    const m = NUMERIC_PREFIX.exec(out);
    if (m) out = m[2];
  }
  return out;
}
function prefixOrderOf(draft) {
  const source = draft.nameHint ?? draft.segment;
  const m = NUMERIC_PREFIX.exec(source);
  return m ? Number(m[1]) : void 0;
}
function listOrderOf(draft, parentPath, opts) {
  const list = opts.order[parentPath];
  if (!list || list.length === 0) return void 0;
  const wanted = [draft.segment, draft.nameHint, draft.nameHint?.toLowerCase()].filter(
    (s) => typeof s === "string"
  );
  for (let i = 0; i < list.length; i++) {
    const entry = list[i];
    if (wanted.includes(entry) || wanted.includes(entry.toLowerCase())) return i;
  }
  return void 0;
}
function dateOf(draft, opts) {
  const dates = draft.data?.dates;
  if (dates === null || typeof dates !== "object") return void 0;
  const d = dates[opts.dateField];
  return d instanceof Date && !Number.isNaN(d.getTime()) ? d : void 0;
}
function finalize(draft, parentSlug, parentPath, opts, bySlug, folders, comparator) {
  if (readBoolean(draft.frontmatter, opts.frontmatterKeys.hide) === true) return void 0;
  const path3 = draft.path;
  const node = {
    kind: draft.kind,
    slug: draft.slug,
    path: path3,
    segment: draft.segment,
    title: titleOf(draft, opts),
    parentSlug,
    depth: draft.depth,
    children: [],
    hasIndex: draft.hasIndex,
    isVirtual: draft.isVirtual
  };
  const order = readNumber(draft.frontmatter, opts.frontmatterKeys.order);
  if (order !== void 0) node.order = order;
  const listOrder = listOrderOf(draft, parentPath, opts);
  if (listOrder !== void 0) node.listOrder = listOrder;
  const prefixOrder = prefixOrderOf(draft);
  if (prefixOrder !== void 0) node.prefixOrder = prefixOrder;
  const date = dateOf(draft, opts);
  if (date) node.date = date;
  if (readBoolean(draft.frontmatter, opts.frontmatterKeys.divider) === true || opts.dividers.includes(path3)) {
    node.divider = true;
  }
  if (opts.icons === "custom" || opts.icons === "both") {
    const icon2 = readString(draft.frontmatter, opts.frontmatterKeys.icon) || opts.nodeIcons[path3];
    if (icon2) node.icon = icon2;
  }
  if (draft.kind === "folder") {
    const list = opts.order[path3];
    if (list) {
      for (const entry of list) {
        const known = [...draft.children.values()].some(
          (c) => c.segment === entry || c.nameHint === entry || c.nameHint?.toLowerCase() === entry
        );
        if (!known) {
          warnOnce(
            `order:${path3}:${entry}`,
            `\`order\` for "${path3 || "/"}" lists unknown entry "${entry}".`
          );
        }
      }
    }
    for (const child of draft.children.values()) {
      const c = finalize(child, node.slug, path3, opts, bySlug, folders, comparator);
      if (c) node.children.push(c);
    }
    node.children.sort(comparator);
    if (draft.depth > 0 && node.children.length === 0 && opts.hideEmptyFolders) {
      if (!(node.hasIndex && opts.keepIndexOnlyFolders)) return void 0;
    }
  }
  bySlug.set(node.slug, node);
  if (node.kind === "folder") folders.set(node.path, node);
  return node;
}
function buildTree(allFiles, opts, locale, language) {
  const bySlug = /* @__PURE__ */ new Map();
  const folders = /* @__PURE__ */ new Map();
  const comparator = compareNodes(opts, locale);
  const entries = [];
  if (language === void 0) {
    for (const data of allFiles) {
      entries.push({ data, key: typeof data.slug === "string" ? data.slug : "", rank: 0 });
    }
  } else {
    const index = languageIndex(allFiles);
    for (const data of allFiles) {
      for (const p of placements(data, index)) {
        if (p.lang === language || p.lang === void 0) {
          entries.push({ data, key: p.key, rank: p.rank });
        }
      }
    }
  }
  const root = finalize(collect(entries, opts), void 0, "", opts, bySlug, folders, comparator);
  const tree = { root, bySlug, folders };
  if (language !== void 0) tree.language = language;
  return tree;
}
var cache2 = /* @__PURE__ */ new WeakMap();
function treeFromFiles(allFiles, opts, locale, language) {
  let perOptions = cache2.get(allFiles);
  if (!perOptions) {
    perOptions = /* @__PURE__ */ new Map();
    cache2.set(allFiles, perOptions);
  }
  const key = `${language ?? ""}
${locale ?? ""}
${treeOptionsKey(opts)}`;
  const hit = perOptions.get(key);
  if (hit) return hit;
  const tree = buildTree(allFiles, opts, locale, language);
  perOptions.set(key, tree);
  return tree;
}

// lucide-nodes:lucide-static/icon-nodes.json
var icon_nodes_default = '{"a-arrow-down":[["path",{"d":"m14 12 4 4 4-4"}],["path",{"d":"M18 16V7"}],["path",{"d":"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"}],["path",{"d":"M3.304 13h6.392"}]],"a-arrow-up":[["path",{"d":"m14 11 4-4 4 4"}],["path",{"d":"M18 16V7"}],["path",{"d":"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"}],["path",{"d":"M3.304 13h6.392"}]],"a-large-small":[["path",{"d":"m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16"}],["path",{"d":"M15.697 14h5.606"}],["path",{"d":"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"}],["path",{"d":"M3.304 13h6.392"}]],"accessibility":[["circle",{"cx":"16","cy":"4","r":"1"}],["path",{"d":"m18 19 1-7-6 1"}],["path",{"d":"m5 8 3-3 5.5 3-2.36 3.5"}],["path",{"d":"M4.24 14.5a5 5 0 0 0 6.88 6"}],["path",{"d":"M13.76 17.5a5 5 0 0 0-6.88-6"}]],"activity":[["path",{"d":"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]],"ad":[["path",{"d":"M10 13H6"}],["path",{"d":"M10 15v-4a2 2 0 0 0-4 0v4"}],["path",{"d":"M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z"}],["rect",{"x":"2","y":"5","width":"20","height":"14","rx":"2"}]],"air-vent":[["path",{"d":"M18 17.5a2.5 2.5 0 1 1-4 2.03V12"}],["path",{"d":"M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}],["path",{"d":"M6 8h12"}],["path",{"d":"M6.6 15.572A2 2 0 1 0 10 17v-5"}]],"airplay":[["path",{"d":"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"}],["path",{"d":"m12 15 5 6H7Z"}]],"alarm-clock-check":[["circle",{"cx":"12","cy":"13","r":"8"}],["path",{"d":"M5 3 2 6"}],["path",{"d":"m22 6-3-3"}],["path",{"d":"M6.38 18.7 4 21"}],["path",{"d":"M17.64 18.67 20 21"}],["path",{"d":"m9 13 2 2 4-4"}]],"alarm-clock-minus":[["circle",{"cx":"12","cy":"13","r":"8"}],["path",{"d":"M5 3 2 6"}],["path",{"d":"m22 6-3-3"}],["path",{"d":"M6.38 18.7 4 21"}],["path",{"d":"M17.64 18.67 20 21"}],["path",{"d":"M9 13h6"}]],"alarm-clock-off":[["path",{"d":"M6.87 6.87a8 8 0 1 0 11.26 11.26"}],["path",{"d":"M19.9 14.25a8 8 0 0 0-9.15-9.15"}],["path",{"d":"m22 6-3-3"}],["path",{"d":"M6.26 18.67 4 21"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M4 4 2 6"}]],"alarm-clock-plus":[["circle",{"cx":"12","cy":"13","r":"8"}],["path",{"d":"M5 3 2 6"}],["path",{"d":"m22 6-3-3"}],["path",{"d":"M6.38 18.7 4 21"}],["path",{"d":"M17.64 18.67 20 21"}],["path",{"d":"M12 10v6"}],["path",{"d":"M9 13h6"}]],"alarm-clock":[["circle",{"cx":"12","cy":"13","r":"8"}],["path",{"d":"M12 9v4l2 2"}],["path",{"d":"M5 3 2 6"}],["path",{"d":"m22 6-3-3"}],["path",{"d":"M6.38 18.7 4 21"}],["path",{"d":"M17.64 18.67 20 21"}]],"alarm-smoke":[["path",{"d":"M11 21c0-2.5 2-2.5 2-5"}],["path",{"d":"M16 21c0-2.5 2-2.5 2-5"}],["path",{"d":"m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8"}],["path",{"d":"M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z"}],["path",{"d":"M6 21c0-2.5 2-2.5 2-5"}]],"align-center-horizontal":[["path",{"d":"M2 12h20"}],["path",{"d":"M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"}],["path",{"d":"M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4"}],["path",{"d":"M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1"}],["path",{"d":"M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1"}]],"align-center-vertical":[["path",{"d":"M12 2v20"}],["path",{"d":"M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4"}],["path",{"d":"M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4"}],["path",{"d":"M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1"}],["path",{"d":"M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"}]],"align-end-horizontal":[["rect",{"width":"6","height":"16","x":"4","y":"2","rx":"2"}],["rect",{"width":"6","height":"9","x":"14","y":"9","rx":"2"}],["path",{"d":"M22 22H2"}]],"align-end-vertical":[["rect",{"width":"16","height":"6","x":"2","y":"4","rx":"2"}],["rect",{"width":"9","height":"6","x":"9","y":"14","rx":"2"}],["path",{"d":"M22 22V2"}]],"align-horizontal-distribute-center":[["rect",{"width":"6","height":"14","x":"4","y":"5","rx":"2"}],["rect",{"width":"6","height":"10","x":"14","y":"7","rx":"2"}],["path",{"d":"M17 22v-5"}],["path",{"d":"M17 7V2"}],["path",{"d":"M7 22v-3"}],["path",{"d":"M7 5V2"}]],"align-horizontal-distribute-end":[["rect",{"width":"6","height":"14","x":"4","y":"5","rx":"2"}],["rect",{"width":"6","height":"10","x":"14","y":"7","rx":"2"}],["path",{"d":"M10 2v20"}],["path",{"d":"M20 2v20"}]],"align-horizontal-distribute-start":[["rect",{"width":"6","height":"14","x":"4","y":"5","rx":"2"}],["rect",{"width":"6","height":"10","x":"14","y":"7","rx":"2"}],["path",{"d":"M4 2v20"}],["path",{"d":"M14 2v20"}]],"align-horizontal-justify-center":[["rect",{"width":"6","height":"14","x":"2","y":"5","rx":"2"}],["rect",{"width":"6","height":"10","x":"16","y":"7","rx":"2"}],["path",{"d":"M12 2v20"}]],"align-horizontal-justify-end":[["rect",{"width":"6","height":"14","x":"2","y":"5","rx":"2"}],["rect",{"width":"6","height":"10","x":"12","y":"7","rx":"2"}],["path",{"d":"M22 2v20"}]],"align-horizontal-justify-start":[["rect",{"width":"6","height":"14","x":"6","y":"5","rx":"2"}],["rect",{"width":"6","height":"10","x":"16","y":"7","rx":"2"}],["path",{"d":"M2 2v20"}]],"align-horizontal-space-around":[["rect",{"width":"6","height":"10","x":"9","y":"7","rx":"2"}],["path",{"d":"M4 22V2"}],["path",{"d":"M20 22V2"}]],"align-horizontal-space-between":[["rect",{"width":"6","height":"14","x":"3","y":"5","rx":"2"}],["rect",{"width":"6","height":"10","x":"15","y":"7","rx":"2"}],["path",{"d":"M3 2v20"}],["path",{"d":"M21 2v20"}]],"align-start-horizontal":[["rect",{"width":"6","height":"16","x":"4","y":"6","rx":"2"}],["rect",{"width":"6","height":"9","x":"14","y":"6","rx":"2"}],["path",{"d":"M22 2H2"}]],"align-start-vertical":[["rect",{"width":"9","height":"6","x":"6","y":"14","rx":"2"}],["rect",{"width":"16","height":"6","x":"6","y":"4","rx":"2"}],["path",{"d":"M2 2v20"}]],"align-vertical-distribute-center":[["path",{"d":"M22 17h-3"}],["path",{"d":"M22 7h-5"}],["path",{"d":"M5 17H2"}],["path",{"d":"M7 7H2"}],["rect",{"x":"5","y":"14","width":"14","height":"6","rx":"2"}],["rect",{"x":"7","y":"4","width":"10","height":"6","rx":"2"}]],"align-vertical-distribute-end":[["rect",{"width":"14","height":"6","x":"5","y":"14","rx":"2"}],["rect",{"width":"10","height":"6","x":"7","y":"4","rx":"2"}],["path",{"d":"M2 20h20"}],["path",{"d":"M2 10h20"}]],"align-vertical-distribute-start":[["rect",{"width":"14","height":"6","x":"5","y":"14","rx":"2"}],["rect",{"width":"10","height":"6","x":"7","y":"4","rx":"2"}],["path",{"d":"M2 14h20"}],["path",{"d":"M2 4h20"}]],"align-vertical-justify-center":[["rect",{"width":"14","height":"6","x":"5","y":"16","rx":"2"}],["rect",{"width":"10","height":"6","x":"7","y":"2","rx":"2"}],["path",{"d":"M2 12h20"}]],"align-vertical-justify-end":[["rect",{"width":"14","height":"6","x":"5","y":"12","rx":"2"}],["rect",{"width":"10","height":"6","x":"7","y":"2","rx":"2"}],["path",{"d":"M2 22h20"}]],"align-vertical-justify-start":[["rect",{"width":"14","height":"6","x":"5","y":"16","rx":"2"}],["rect",{"width":"10","height":"6","x":"7","y":"6","rx":"2"}],["path",{"d":"M2 2h20"}]],"align-vertical-space-around":[["rect",{"width":"10","height":"6","x":"7","y":"9","rx":"2"}],["path",{"d":"M22 20H2"}],["path",{"d":"M22 4H2"}]],"align-vertical-space-between":[["rect",{"width":"14","height":"6","x":"5","y":"15","rx":"2"}],["rect",{"width":"10","height":"6","x":"7","y":"3","rx":"2"}],["path",{"d":"M2 21h20"}],["path",{"d":"M2 3h20"}]],"ambulance":[["path",{"d":"M10 10H6"}],["path",{"d":"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],["path",{"d":"M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"}],["path",{"d":"M8 8v4"}],["path",{"d":"M9 18h6"}],["circle",{"cx":"17","cy":"18","r":"2"}],["circle",{"cx":"7","cy":"18","r":"2"}]],"ampersand":[["path",{"d":"M16 12h3"}],["path",{"d":"M17.5 12a8 8 0 0 1-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13"}]],"ampersands":[["path",{"d":"M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"}],["path",{"d":"M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5"}]],"amphora":[["path",{"d":"M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8"}],["path",{"d":"M10 5H8a2 2 0 0 0 0 4h.68"}],["path",{"d":"M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8"}],["path",{"d":"M14 5h2a2 2 0 0 1 0 4h-.68"}],["path",{"d":"M18 22H6"}],["path",{"d":"M9 2h6"}]],"anchor":[["path",{"d":"M12 6v16"}],["path",{"d":"m19 13 2-1a9 9 0 0 1-18 0l2 1"}],["path",{"d":"M9 11h6"}],["circle",{"cx":"12","cy":"4","r":"2"}]],"angle":[["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"M3 11a10 10 0 0 1 10 10"}]],"antenna":[["path",{"d":"M2 12 7 2"}],["path",{"d":"m7 12 5-10"}],["path",{"d":"m12 12 5-10"}],["path",{"d":"m17 12 5-10"}],["path",{"d":"M4.5 7h15"}],["path",{"d":"M12 16v6"}]],"anvil":[["path",{"d":"M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4"}],["path",{"d":"M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z"}],["path",{"d":"M9 12v5"}],["path",{"d":"M15 12v5"}],["path",{"d":"M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1"}]],"aperture":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m14.31 8 5.74 9.94"}],["path",{"d":"M9.69 8h11.48"}],["path",{"d":"m7.38 12 5.74-9.94"}],["path",{"d":"M9.69 16 3.95 6.06"}],["path",{"d":"M14.31 16H2.83"}],["path",{"d":"m16.62 12-5.74 9.94"}]],"app-window-mac":[["rect",{"width":"20","height":"16","x":"2","y":"4","rx":"2"}],["path",{"d":"M6 8h.01"}],["path",{"d":"M10 8h.01"}],["path",{"d":"M14 8h.01"}]],"app-window":[["rect",{"x":"2","y":"4","width":"20","height":"16","rx":"2"}],["path",{"d":"M10 4v4"}],["path",{"d":"M2 8h20"}],["path",{"d":"M6 4v4"}]],"apple":[["path",{"d":"M12 6.528V3a1 1 0 0 1 1-1h0"}],["path",{"d":"M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21"}]],"archive-arrow-down":[["rect",{"width":"20","height":"5","x":"2","y":"3","rx":"1"}],["path",{"d":"M4 8v11a2 2 0 0 0 2 2h.343"}],["path",{"d":"M20 8v11a2 2 0 0 1-2 2h-.343"}],["path",{"d":"m9 18 3 3 3-3"}],["path",{"d":"M12 12v9"}]],"archive-arrow-up":[["rect",{"width":"20","height":"5","x":"2","y":"3","rx":"1"}],["path",{"d":"M4 8v11a2 2 0 0 0 2 2h2"}],["path",{"d":"M20 8v11a2 2 0 0 1-2 2h-2"}],["path",{"d":"m9 15 3-3 3 3"}],["path",{"d":"M12 12v9"}]],"archive-x":[["rect",{"width":"20","height":"5","x":"2","y":"3","rx":"1"}],["path",{"d":"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{"d":"m9.5 17 5-5"}],["path",{"d":"m9.5 12 5 5"}]],"archive":[["rect",{"width":"20","height":"5","x":"2","y":"3","rx":"1"}],["path",{"d":"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"}],["path",{"d":"M10 12h4"}]],"armchair":[["path",{"d":"M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"}],["path",{"d":"M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"}],["path",{"d":"M5 18v2"}],["path",{"d":"M19 18v2"}]],"armenian-dram":[["path",{"d":"M11 10h8"}],["path",{"d":"M11 14h8"}],["path",{"d":"M17 20V10a6 6 0 0 0-12 0"}]],"arrow-big-down-dash":[["path",{"d":"M14 8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-6.939 6.939a1.207 1.207 0 0 1-1.708 0l-6.94-6.94a.707.707 0 0 1 .5-1.206H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1z"}],["path",{"d":"M9 4h6"}]],"arrow-big-down":[["path",{"d":"M9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h3.293a.707.707 0 0 1 .5 1.207l-7.086 7.086a1 1 0 0 1-1.414 0l-7.086-7.086a.707.707 0 0 1 .5-1.207H8a1 1 0 0 0 1-1z"}]],"arrow-big-left-dash":[["path",{"d":"M13 9a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707l6.94 6.94a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"}],["path",{"d":"M20 9v6"}]],"arrow-big-left":[["path",{"d":"M10.793 19.793a.707.707 0 0 0 1.207-.5V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6a1 1 0 0 1-1-1V4.707a.707.707 0 0 0-1.207-.5l-6.94 6.94a1.207 1.207 0 0 0 0 1.707z"}]],"arrow-big-right-dash":[["path",{"d":"M11 9a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707l-6.94 6.94a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"}],["path",{"d":"M4 9v6"}]],"arrow-big-right":[["path",{"d":"M13.207 19.793a.707.707 0 0 1-1.207-.5V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1V4.707a.707.707 0 0 1 1.207-.5l6.94 6.94a1.207 1.207 0 0 1 0 1.707z"}]],"arrow-big-up-dash":[["path",{"d":"M14 16a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-6.939-6.939a1.207 1.207 0 0 0-1.708 0l-6.94 6.94a.707.707 0 0 0 .5 1.206H8a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1z"}],["path",{"d":"M9 20h6"}]],"arrow-big-up":[["path",{"d":"M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z"}]],"arrow-down-0-1":[["path",{"d":"m3 16 4 4 4-4"}],["path",{"d":"M7 20V4"}],["rect",{"x":"15","y":"4","width":"4","height":"6","ry":"2"}],["path",{"d":"M17 20v-6h-2"}],["path",{"d":"M15 20h4"}]],"arrow-down-1-0":[["path",{"d":"m3 16 4 4 4-4"}],["path",{"d":"M7 20V4"}],["path",{"d":"M17 10V4h-2"}],["path",{"d":"M15 10h4"}],["rect",{"x":"15","y":"14","width":"4","height":"6","ry":"2"}]],"arrow-down-a-z":[["path",{"d":"m3 16 4 4 4-4"}],["path",{"d":"M7 20V4"}],["path",{"d":"M20 8h-5"}],["path",{"d":"M15 10V6.5a2.5 2.5 0 0 1 5 0V10"}],["path",{"d":"M15 14h5l-5 6h5"}]],"arrow-down-from-line":[["path",{"d":"M19 3H5"}],["path",{"d":"M12 21V7"}],["path",{"d":"m6 15 6 6 6-6"}]],"arrow-down-left":[["path",{"d":"M17 7 7 17"}],["path",{"d":"M17 17H7V7"}]],"arrow-down-narrow-wide":[["path",{"d":"m3 16 4 4 4-4"}],["path",{"d":"M7 20V4"}],["path",{"d":"M11 4h4"}],["path",{"d":"M11 8h7"}],["path",{"d":"M11 12h10"}]],"arrow-down-right":[["path",{"d":"m7 7 10 10"}],["path",{"d":"M17 7v10H7"}]],"arrow-down-to-dot":[["path",{"d":"M12 2v14"}],["path",{"d":"m19 9-7 7-7-7"}],["circle",{"cx":"12","cy":"21","r":"1"}]],"arrow-down-to-line":[["path",{"d":"M12 17V3"}],["path",{"d":"m6 11 6 6 6-6"}],["path",{"d":"M19 21H5"}]],"arrow-down-up":[["path",{"d":"m3 16 4 4 4-4"}],["path",{"d":"M7 20V4"}],["path",{"d":"m21 8-4-4-4 4"}],["path",{"d":"M17 4v16"}]],"arrow-down-wide-narrow":[["path",{"d":"m3 16 4 4 4-4"}],["path",{"d":"M7 20V4"}],["path",{"d":"M11 4h10"}],["path",{"d":"M11 8h7"}],["path",{"d":"M11 12h4"}]],"arrow-down-z-a":[["path",{"d":"m3 16 4 4 4-4"}],["path",{"d":"M7 4v16"}],["path",{"d":"M15 4h5l-5 6h5"}],["path",{"d":"M15 20v-3.5a2.5 2.5 0 0 1 5 0V20"}],["path",{"d":"M20 18h-5"}]],"arrow-down":[["path",{"d":"M12 5v14"}],["path",{"d":"m19 12-7 7-7-7"}]],"arrow-left-from-line":[["path",{"d":"m9 6-6 6 6 6"}],["path",{"d":"M3 12h14"}],["path",{"d":"M21 19V5"}]],"arrow-left-right":[["path",{"d":"M8 3 4 7l4 4"}],["path",{"d":"M4 7h16"}],["path",{"d":"m16 21 4-4-4-4"}],["path",{"d":"M20 17H4"}]],"arrow-left-to-line":[["path",{"d":"M3 19V5"}],["path",{"d":"m13 6-6 6 6 6"}],["path",{"d":"M7 12h14"}]],"arrow-left":[["path",{"d":"m12 19-7-7 7-7"}],["path",{"d":"M19 12H5"}]],"arrow-right-from-line":[["path",{"d":"M3 5v14"}],["path",{"d":"M21 12H7"}],["path",{"d":"m15 18 6-6-6-6"}]],"arrow-right-left":[["path",{"d":"m16 3 4 4-4 4"}],["path",{"d":"M20 7H4"}],["path",{"d":"m8 21-4-4 4-4"}],["path",{"d":"M4 17h16"}]],"arrow-right-to-line":[["path",{"d":"M17 12H3"}],["path",{"d":"m11 18 6-6-6-6"}],["path",{"d":"M21 5v14"}]],"arrow-right":[["path",{"d":"M5 12h14"}],["path",{"d":"m12 5 7 7-7 7"}]],"arrow-up-0-1":[["path",{"d":"m3 8 4-4 4 4"}],["path",{"d":"M7 4v16"}],["rect",{"x":"15","y":"4","width":"4","height":"6","ry":"2"}],["path",{"d":"M17 20v-6h-2"}],["path",{"d":"M15 20h4"}]],"arrow-up-1-0":[["path",{"d":"m3 8 4-4 4 4"}],["path",{"d":"M7 4v16"}],["path",{"d":"M17 10V4h-2"}],["path",{"d":"M15 10h4"}],["rect",{"x":"15","y":"14","width":"4","height":"6","ry":"2"}]],"arrow-up-a-z":[["path",{"d":"m3 8 4-4 4 4"}],["path",{"d":"M7 4v16"}],["path",{"d":"M20 8h-5"}],["path",{"d":"M15 10V6.5a2.5 2.5 0 0 1 5 0V10"}],["path",{"d":"M15 14h5l-5 6h5"}]],"arrow-up-down":[["path",{"d":"m21 16-4 4-4-4"}],["path",{"d":"M17 20V4"}],["path",{"d":"m3 8 4-4 4 4"}],["path",{"d":"M7 4v16"}]],"arrow-up-from-dot":[["path",{"d":"m5 9 7-7 7 7"}],["path",{"d":"M12 16V2"}],["circle",{"cx":"12","cy":"21","r":"1"}]],"arrow-up-from-line":[["path",{"d":"m18 9-6-6-6 6"}],["path",{"d":"M12 3v14"}],["path",{"d":"M5 21h14"}]],"arrow-up-left":[["path",{"d":"M7 17V7h10"}],["path",{"d":"M17 17 7 7"}]],"arrow-up-narrow-wide":[["path",{"d":"m3 8 4-4 4 4"}],["path",{"d":"M7 4v16"}],["path",{"d":"M11 12h4"}],["path",{"d":"M11 16h7"}],["path",{"d":"M11 20h10"}]],"arrow-up-right":[["path",{"d":"M7 7h10v10"}],["path",{"d":"M7 17 17 7"}]],"arrow-up-to-line":[["path",{"d":"M5 3h14"}],["path",{"d":"m18 13-6-6-6 6"}],["path",{"d":"M12 7v14"}]],"arrow-up-wide-narrow":[["path",{"d":"m3 8 4-4 4 4"}],["path",{"d":"M7 4v16"}],["path",{"d":"M11 12h10"}],["path",{"d":"M11 16h7"}],["path",{"d":"M11 20h4"}]],"arrow-up-z-a":[["path",{"d":"m3 8 4-4 4 4"}],["path",{"d":"M7 4v16"}],["path",{"d":"M15 4h5l-5 6h5"}],["path",{"d":"M15 20v-3.5a2.5 2.5 0 0 1 5 0V20"}],["path",{"d":"M20 18h-5"}]],"arrow-up":[["path",{"d":"m5 12 7-7 7 7"}],["path",{"d":"M12 19V5"}]],"arrows-from-axis-dashed-horizontal":[["path",{"d":"M10 12H8"}],["path",{"d":"M12 16v6"}],["path",{"d":"M12 2v6"}],["path",{"d":"M16 12h-2"}],["path",{"d":"M22 12h-2"}],["path",{"d":"M4 12H2"}],["path",{"d":"m9 19 3 3 3-3"}],["path",{"d":"m9 5 3-3 3 3"}]],"arrows-from-axis-dashed-vertical":[["path",{"d":"M12 10V8"}],["path",{"d":"M12 16v-2"}],["path",{"d":"M12 22v-2"}],["path",{"d":"M12 4V2"}],["path",{"d":"m19 15 3-3-3-3"}],["path",{"d":"M22 12h-6"}],["path",{"d":"m5 15-3-3 3-3"}],["path",{"d":"M8 12H2"}]],"arrows-from-axis-horizontal":[["path",{"d":"M12 16v6"}],["path",{"d":"M12 2v6"}],["path",{"d":"m15 19-3 3-3-3"}],["path",{"d":"m15 5-3-3-3 3"}],["path",{"d":"M22 12H2"}]],"arrows-from-axis-vertical":[["path",{"d":"M12 22V2"}],["path",{"d":"m19 15 3-3-3-3"}],["path",{"d":"M22 12h-6"}],["path",{"d":"m5 15-3-3 3-3"}],["path",{"d":"M8 12H2"}]],"arrows-to-axis-dashed-horizontal":[["path",{"d":"M10 12H8"}],["path",{"d":"M12 22v-6"}],["path",{"d":"M12 8V2"}],["path",{"d":"m15 19-3-3-3 3"}],["path",{"d":"m15 5-3 3-3-3"}],["path",{"d":"M16 12h-2"}],["path",{"d":"M22 12h-2"}],["path",{"d":"M4 12H2"}]],"arrows-to-axis-dashed-vertical":[["path",{"d":"M12 10V8"}],["path",{"d":"M12 16v-2"}],["path",{"d":"M12 22v-2"}],["path",{"d":"M12 4V2"}],["path",{"d":"M16 12h6"}],["path",{"d":"m19 15-3-3 3-3"}],["path",{"d":"M2 12h6"}],["path",{"d":"m5 15 3-3-3-3"}]],"arrows-to-axis-horizontal":[["path",{"d":"M12 22v-6"}],["path",{"d":"M12 8V2"}],["path",{"d":"m15 19-3-3-3 3"}],["path",{"d":"m15 5-3 3-3-3"}],["path",{"d":"M22 12H2"}]],"arrows-to-axis-vertical":[["path",{"d":"M12 22V2"}],["path",{"d":"M16 12h6"}],["path",{"d":"m19 15-3-3 3-3"}],["path",{"d":"M2 12h6"}],["path",{"d":"m5 15 3-3-3-3"}]],"arrows-up-from-line":[["path",{"d":"m4 6 3-3 3 3"}],["path",{"d":"M7 17V3"}],["path",{"d":"m14 6 3-3 3 3"}],["path",{"d":"M17 17V3"}],["path",{"d":"M4 21h16"}]],"asterisk":[["path",{"d":"M12 5v14"}],["path",{"d":"m18.065 8.496-12.125 7"}],["path",{"d":"m5.94 8.504 12.125 7"}]],"asterism":[["path",{"d":"M12 2v8"}],["path",{"d":"m14.5 15 7 4"}],["path",{"d":"m14.5 19 7-4"}],["path",{"d":"M18 13v8"}],["path",{"d":"m2.5 15 7 4"}],["path",{"d":"m2.5 19 7-4"}],["path",{"d":"M6 13v8"}],["path",{"d":"m8.5 4 7 4"}],["path",{"d":"m8.5 8 7-4"}]],"astroid":[["path",{"d":"M12.983 21.186a1 1 0 0 1-1.966 0 10 10 0 0 0-8.203-8.203 1 1 0 0 1 0-1.966 10 10 0 0 0 8.203-8.203 1 1 0 0 1 1.966 0 10 10 0 0 0 8.203 8.203 1 1 0 0 1 0 1.966 10 10 0 0 0-8.203 8.203"}]],"at-sign":[["circle",{"cx":"12","cy":"12","r":"4"}],["path",{"d":"M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"}]],"atom":[["circle",{"cx":"12","cy":"12","r":"1"}],["path",{"d":"M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"}],["path",{"d":"M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"}]],"audio-lines-off":[["path",{"d":"M10 10v11"}],["path",{"d":"M10 3v1.35"}],["path",{"d":"M14 14v1"}],["path",{"d":"M14 8v.35"}],["path",{"d":"M18 5v7.35"}],["path",{"d":"M2 10v3"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M22 10v3"}],["path",{"d":"M6 6v11"}]],"audio-lines-x":[["path",{"d":"M10 3v18"}],["path",{"d":"M14 8v6.35"}],["path",{"d":"m17 17 5 5"}],["path",{"d":"M18 5v8.1"}],["path",{"d":"M2 10v3"}],["path",{"d":"M22 10v3"}],["path",{"d":"m22 17-5 5"}],["path",{"d":"M6 6v11"}]],"audio-lines":[["path",{"d":"M2 10v3"}],["path",{"d":"M6 6v11"}],["path",{"d":"M10 3v18"}],["path",{"d":"M14 8v7"}],["path",{"d":"M18 5v13"}],["path",{"d":"M22 10v3"}]],"audio-waveform":[["path",{"d":"M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"}]],"avocado":[["path",{"d":"M13.465 3.464a5 5 0 017.07 0 5 5 0 010 7.072c-1.204 1.203-2.38 2.89-2.614 4.577A8 8 0 118.886 6.08c1.687-.235 3.375-1.41 4.579-2.615"}],["circle",{"cx":"10","cy":"14","r":"3"}]],"award":[["path",{"d":"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{"cx":"12","cy":"8","r":"6"}]],"axe":[["path",{"d":"m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9"}],["path",{"d":"M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z"}]],"axis-3d":[["path",{"d":"M13.5 10.5 15 9"}],["path",{"d":"M4 4v15a1 1 0 0 0 1 1h15"}],["path",{"d":"M4.293 19.707 6 18"}],["path",{"d":"m9 15 1.5-1.5"}]],"azerbaijani-manat":[["path",{"d":"M12 4v16"}],["path",{"d":"M18 20v-8a6 6 0 00-12 0v8"}]],"baby":[["path",{"d":"M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"}],["path",{"d":"M15 12h.01"}],["path",{"d":"M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"}],["path",{"d":"M9 12h.01"}]],"backpack":[["path",{"d":"M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"}],["path",{"d":"M8 10h8"}],["path",{"d":"M8 18h8"}],["path",{"d":"M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"}],["path",{"d":"M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"}]],"bacon":[["path",{"d":"M2.795 16.804c-.789-.79-1.09-2.018-.442-2.928 1.933-2.713 4.414-1.05 6.145-5.378 1.868-4.67 4.608-2.366 6.592-6.107.218-.412.78-.53 1.11-.2l5.005 5.005c.789.79 1.09 2.018.442 2.928-1.933 2.713-4.414 1.05-6.145 5.378-1.868 4.67-4.608 2.366-6.591 6.107-.22.412-.78.53-1.11.2z"}],["path",{"d":"M4.5 18.5c2-5 5-2 7-7s5-2 7-7"}]],"badge-cent":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{"d":"M12 7v10"}],["path",{"d":"M15.4 10a4 4 0 1 0 0 4"}]],"badge-check":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{"d":"m16 9-5.5 5.5L8 12"}]],"badge-dollar-sign":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{"d":"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"}],["path",{"d":"M12 18V6"}]],"badge-euro":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{"d":"M7 12h5"}],["path",{"d":"M15 9.4a4 4 0 1 0 0 5.2"}]],"badge-exclamation-point":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{"x1":"12","x2":"12","y1":"8","y2":"12"}],["line",{"x1":"12","x2":"12.01","y1":"16","y2":"16"}]],"badge-indian-rupee":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{"d":"M8 8h8"}],["path",{"d":"M8 12h8"}],["path",{"d":"m13 17-5-1h1a4 4 0 0 0 0-8"}]],"badge-info":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{"x1":"12","x2":"12","y1":"16","y2":"12"}],["line",{"x1":"12","x2":"12.01","y1":"8","y2":"8"}]],"badge-japanese-yen":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{"d":"m9 8 3 3v7"}],["path",{"d":"m12 11 3-3"}],["path",{"d":"M9 12h6"}],["path",{"d":"M9 16h6"}]],"badge-minus":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{"x1":"8","x2":"16","y1":"12","y2":"12"}]],"badge-percent":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{"d":"m15 9-6 6"}],["path",{"d":"M9 9h.01"}],["path",{"d":"M15 15h.01"}]],"badge-plus":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{"x1":"12","x2":"12","y1":"8","y2":"16"}],["line",{"x1":"8","x2":"16","y1":"12","y2":"12"}]],"badge-pound-sterling":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{"d":"M8 12h4"}],["path",{"d":"M10 16V9.5a2.5 2.5 0 0 1 5 0"}],["path",{"d":"M8 16h7"}]],"badge-question-mark":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{"d":"M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5"}],["path",{"d":"M12 17h.01"}]],"badge-russian-ruble":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{"d":"M9 16h5"}],["path",{"d":"M9 12h5a2 2 0 1 0 0-4h-3v9"}]],"badge-swiss-franc":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["path",{"d":"M11 17V8h4"}],["path",{"d":"M11 12h3"}],["path",{"d":"M9 16h4"}]],"badge-turkish-lira":[["path",{"d":"M11 7v10a5 5 0 0 0 5-5"}],["path",{"d":"m15 8-6 3"}],["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76"}]],"badge-x":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}],["line",{"x1":"15","x2":"9","y1":"9","y2":"15"}],["line",{"x1":"9","x2":"15","y1":"9","y2":"15"}]],"badge":[["path",{"d":"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}]],"baggage-claim":[["path",{"d":"M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2"}],["path",{"d":"M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10"}],["rect",{"width":"13","height":"8","x":"8","y":"6","rx":"1"}],["circle",{"cx":"18","cy":"20","r":"2"}],["circle",{"cx":"9","cy":"20","r":"2"}]],"ball-wave":[["path",{"d":"M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{"d":"M7.757 13.243a2 6 45 1 0 8.486-8.486 2 6 45 1 0-8.486 8.486"}],["circle",{"cx":"12","cy":"9","r":"6"}]],"balloon":[["path",{"d":"M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1"}],["path",{"d":"M12 6a2 2 0 0 1 2 2"}],["path",{"d":"M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0"}]],"ban":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M4.929 4.929 19.07 19.071"}]],"banana":[["path",{"d":"M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5"}],["path",{"d":"M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"}]],"bandage":[["path",{"d":"M10 10.01h.01"}],["path",{"d":"M10 14.01h.01"}],["path",{"d":"M14 10.01h.01"}],["path",{"d":"M14 14.01h.01"}],["path",{"d":"M18 6v12"}],["path",{"d":"M6 6v12"}],["rect",{"x":"2","y":"6","width":"20","height":"12","rx":"2"}]],"bangladeshi-taka":[["path",{"d":"M6 5a2 2 0 0 1 4 0v12a4 4 0 0 0 8 0 2 2 0 0 0-4 0"}],["path",{"d":"M6 9h12"}]],"banknote-arrow-down":[["path",{"d":"M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"}],["path",{"d":"m16 19 3 3 3-3"}],["path",{"d":"M18 12h.01"}],["path",{"d":"M19 16v6"}],["path",{"d":"M6 12h.01"}],["circle",{"cx":"12","cy":"12","r":"2"}]],"banknote-arrow-up":[["path",{"d":"M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"}],["path",{"d":"M18 12h.01"}],["path",{"d":"M19 22v-6"}],["path",{"d":"m22 19-3-3-3 3"}],["path",{"d":"M6 12h.01"}],["circle",{"cx":"12","cy":"12","r":"2"}]],"banknote-check":[["path",{"d":"M11.748 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4.875"}],["path",{"d":"m16 19 2 2 4-4"}],["path",{"d":"M18 12h.01"}],["path",{"d":"M6 12h.01"}],["circle",{"cx":"12","cy":"12","r":"2"}]],"banknote-x":[["path",{"d":"M13 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"}],["path",{"d":"m17 17 5 5"}],["path",{"d":"M18 12h.01"}],["path",{"d":"m22 17-5 5"}],["path",{"d":"M6 12h.01"}],["circle",{"cx":"12","cy":"12","r":"2"}]],"banknote":[["rect",{"width":"20","height":"12","x":"2","y":"6","rx":"2"}],["circle",{"cx":"12","cy":"12","r":"2"}],["path",{"d":"M6 12h.01M18 12h.01"}]],"barcode":[["path",{"d":"M3 5v14"}],["path",{"d":"M8 5v14"}],["path",{"d":"M12 5v14"}],["path",{"d":"M17 5v14"}],["path",{"d":"M21 5v14"}]],"barrel":[["path",{"d":"M10.5 2a34.5 34.5 0 000 20"}],["path",{"d":"M13.5 2a34.5 34.5 0 010 20"}],["path",{"d":"M4.67 17h14.67"}],["path",{"d":"M4.67 7h14.67"}],["path",{"d":"M6.23 3.06a19 19 0 000 17.88A2 2 0 008 22h8a2 2 0 001.77-1.06 19 19 0 000-17.88A2 2 0 0016 2H8a2 2 0 00-1.77 1.06"}]],"baseline":[["path",{"d":"M4 20h16"}],["path",{"d":"m6 16 6-12 6 12"}],["path",{"d":"M8 12h8"}]],"bath":[["path",{"d":"M10 4 8 6"}],["path",{"d":"M17 19v2"}],["path",{"d":"M2 12h20"}],["path",{"d":"M7 19v2"}],["path",{"d":"M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"}]],"battery-charging":[["path",{"d":"m11 7-3 5h4l-3 5"}],["path",{"d":"M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935"}],["path",{"d":"M22 14v-4"}],["path",{"d":"M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936"}]],"battery-exclamation-point":[["path",{"d":"M10 16h.01"}],["path",{"d":"M10 8v4"}],["path",{"d":"M14 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2"}],["path",{"d":"M22 14v-4"}],["path",{"d":"M6 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"}]],"battery-full":[["path",{"d":"M10 10v4"}],["path",{"d":"M14 10v4"}],["path",{"d":"M22 14v-4"}],["path",{"d":"M6 10v4"}],["rect",{"x":"2","y":"6","width":"16","height":"12","rx":"2"}]],"battery-low":[["path",{"d":"M22 14v-4"}],["path",{"d":"M6 14v-4"}],["rect",{"x":"2","y":"6","width":"16","height":"12","rx":"2"}]],"battery-medium":[["path",{"d":"M10 14v-4"}],["path",{"d":"M22 14v-4"}],["path",{"d":"M6 14v-4"}],["rect",{"x":"2","y":"6","width":"16","height":"12","rx":"2"}]],"battery-plus":[["path",{"d":"M10 9v6"}],["path",{"d":"M12.543 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.605"}],["path",{"d":"M22 14v-4"}],["path",{"d":"M7 12h6"}],["path",{"d":"M7.606 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.606"}]],"battery":[["path",{"d":"M 22 14 L 22 10"}],["rect",{"x":"2","y":"6","width":"16","height":"12","rx":"2"}]],"beaker":[["path",{"d":"M4.5 3h15"}],["path",{"d":"M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"}],["path",{"d":"M6 14h12"}]],"bean-off":[["path",{"d":"M9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22a13.96 13.96 0 0 0 9.9-4.1"}],["path",{"d":"M10.75 5.093A6 6 0 0 1 22 8c0 2.411-.61 4.68-1.683 6.66"}],["path",{"d":"M5.341 10.62a4 4 0 0 0 6.487 1.208M10.62 5.341a4.015 4.015 0 0 1 2.039 2.04"}],["line",{"x1":"2","x2":"22","y1":"2","y2":"22"}]],"bean":[["path",{"d":"M10.165 6.598C9.954 7.478 9.64 8.36 9 9c-.64.64-1.521.954-2.402 1.165A6 6 0 0 0 8 22c7.732 0 14-6.268 14-14a6 6 0 0 0-11.835-1.402Z"}],["path",{"d":"M5.341 10.62a4 4 0 1 0 5.279-5.28"}]],"bed-double":[["path",{"d":"M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"}],["path",{"d":"M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"}],["path",{"d":"M12 4v6"}],["path",{"d":"M2 18h20"}]],"bed-single":[["path",{"d":"M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"}],["path",{"d":"M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"}],["path",{"d":"M3 18h18"}]],"bed":[["path",{"d":"M2 4v16"}],["path",{"d":"M2 8h18a2 2 0 0 1 2 2v10"}],["path",{"d":"M2 17h20"}],["path",{"d":"M6 8v9"}]],"beef-off":[["path",{"d":"M11.771 6.109a2.5 2.5 0 0 1 3.12 3.12"}],["path",{"d":"M17.852 12.185a6.5 6.5 0 0 0-9.035-9.04"}],["path",{"d":"M18.013 18.013C15.029 20.349 10.831 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"}],["path",{"d":"m18.5 6 2.19 4.5a6.48 6.48 0 0 1-.139 4.393"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M6.355 6.37a7 7 0 0 0-.075.23c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c3.356 0 6.993-1.267 9.85-3.151"}]],"beef":[["path",{"d":"M16.4 13.7A6.5 6.5 0 1 0 6.28 6.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3"}],["path",{"d":"m18.5 6 1.754 3.5a6.48 6.48 0 0 1-1.854 8.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.66L2.4 16.5"}],["circle",{"cx":"12.5","cy":"8.5","r":"2.5"}]],"beer-off":[["path",{"d":"M13 13v5"}],["path",{"d":"M17 11.47V8"}],["path",{"d":"M17 11h1a3 3 0 0 1 2.745 4.211"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3"}],["path",{"d":"M7.536 7.535C6.766 7.649 6.154 8 5.5 8a2.5 2.5 0 0 1-1.768-4.268"}],["path",{"d":"M8.727 3.204C9.306 2.767 9.885 2 11 2c1.56 0 2 1.5 3 1.5s1.72-.5 2.5-.5a1 1 0 1 1 0 5c-.78 0-1.5-.5-2.5-.5a3.149 3.149 0 0 0-.842.12"}],["path",{"d":"M9 14.6V18"}]],"beer":[["path",{"d":"M17 11h1a3 3 0 0 1 0 6h-1"}],["path",{"d":"M9 12v6"}],["path",{"d":"M13 12v6"}],["path",{"d":"M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"}],["path",{"d":"M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"}]],"belarusian-ruble":[["path",{"d":"M3 16 L13 16"}],["path",{"d":"M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7"}]],"bell-check":[["path",{"d":"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{"d":"m15 8 2 2 4-4"}],["path",{"d":"M16.8607 4.4824A6 6 0 0 0 6 8C6 12.499 4.589 13.956 3.262 15.326"}],["path",{"d":"M3.262 15.326A1 1 0 0 0 4 17H20A1 1 0 0 0 20.74 15.327C20.209 14.779 19.665 14.218 19.203 13.454"}]],"bell-dot":[["path",{"d":"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{"d":"M11.68 2.009A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673c-.824-.85-1.678-1.731-2.21-3.348"}],["circle",{"cx":"18","cy":"5","r":"3"}]],"bell-electric":[["path",{"d":"M18.518 17.347A7 7 0 0 1 14 19"}],["path",{"d":"M18.8 4A11 11 0 0 1 20 9"}],["path",{"d":"M9 9h.01"}],["circle",{"cx":"20","cy":"16","r":"2"}],["circle",{"cx":"9","cy":"9","r":"7"}],["rect",{"x":"4","y":"16","width":"10","height":"6","rx":"2"}]],"bell-minus":[["path",{"d":"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{"d":"M15 8h6"}],["path",{"d":"M16.243 3.757A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673A9.4 9.4 0 0 1 18.667 12"}]],"bell-off":[["path",{"d":"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{"d":"M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05"}]],"bell-plus":[["path",{"d":"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{"d":"M15 8h6"}],["path",{"d":"M18 5v6"}],["path",{"d":"M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332"}]],"bell-ring":[["path",{"d":"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{"d":"M22 8c0-2.3-.8-4.3-2-6"}],["path",{"d":"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"}],["path",{"d":"M4 2C2.8 3.7 2 5.7 2 8"}]],"bell":[["path",{"d":"M10.268 21a2 2 0 0 0 3.464 0"}],["path",{"d":"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"}]],"between-horizontal-end":[["rect",{"width":"13","height":"7","x":"3","y":"3","rx":"1"}],["path",{"d":"m22 15-3-3 3-3"}],["rect",{"width":"13","height":"7","x":"3","y":"14","rx":"1"}]],"between-horizontal-start":[["rect",{"width":"13","height":"7","x":"8","y":"3","rx":"1"}],["path",{"d":"m2 9 3 3-3 3"}],["rect",{"width":"13","height":"7","x":"8","y":"14","rx":"1"}]],"between-vertical-end":[["rect",{"width":"7","height":"13","x":"3","y":"3","rx":"1"}],["path",{"d":"m9 22 3-3 3 3"}],["rect",{"width":"7","height":"13","x":"14","y":"3","rx":"1"}]],"between-vertical-start":[["rect",{"width":"7","height":"13","x":"3","y":"8","rx":"1"}],["path",{"d":"m15 2-3 3-3-3"}],["rect",{"width":"7","height":"13","x":"14","y":"8","rx":"1"}]],"biceps-flexed":[["path",{"d":"M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1"}],["path",{"d":"M15 14a5 5 0 0 0-7.584 2"}],["path",{"d":"M9.964 6.825C8.019 7.977 9.5 13 8 15"}]],"bike":[["circle",{"cx":"18.5","cy":"17.5","r":"3.5"}],["circle",{"cx":"5.5","cy":"17.5","r":"3.5"}],["circle",{"cx":"15","cy":"5","r":"1"}],["path",{"d":"M12 17.5V14l-3-3 4-3 2 3h2"}]],"binary":[["rect",{"x":"14","y":"14","width":"4","height":"6","rx":"2"}],["rect",{"x":"6","y":"4","width":"4","height":"6","rx":"2"}],["path",{"d":"M6 20h4"}],["path",{"d":"M14 10h4"}],["path",{"d":"M6 14h2v6"}],["path",{"d":"M14 4h2v6"}]],"binoculars":[["path",{"d":"M10 10h4"}],["path",{"d":"M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"}],["path",{"d":"M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z"}],["path",{"d":"M 22 16 L 2 16"}],["path",{"d":"M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z"}],["path",{"d":"M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"}]],"biohazard":[["circle",{"cx":"12","cy":"11.9","r":"2"}],["path",{"d":"M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6"}],["path",{"d":"m8.9 10.1 1.4.8"}],["path",{"d":"M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5"}],["path",{"d":"m15.1 10.1-1.4.8"}],["path",{"d":"M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2"}],["path",{"d":"M12 13.9v1.6"}],["path",{"d":"M13.5 5.4c-1-.2-2-.2-3 0"}],["path",{"d":"M17 16.4c.7-.7 1.2-1.6 1.5-2.5"}],["path",{"d":"M5.5 13.9c.3.9.8 1.8 1.5 2.5"}]],"bird":[["path",{"d":"M16 7h.01"}],["path",{"d":"M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"}],["path",{"d":"m20 7 2 .5-2 .5"}],["path",{"d":"M10 18v3"}],["path",{"d":"M14 17.75V21"}],["path",{"d":"M7 18a6 6 0 0 0 3.84-10.61"}]],"birdhouse":[["path",{"d":"M12 18v4"}],["path",{"d":"m17 18 1.956-11.468"}],["path",{"d":"m3 8 7.82-5.615a2 2 0 0 1 2.36 0L21 8"}],["path",{"d":"M4 18h16"}],["path",{"d":"M7 18 5.044 6.532"}],["circle",{"cx":"12","cy":"10","r":"2"}]],"bitcoin":[["path",{"d":"M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"}]],"blend":[["circle",{"cx":"15","cy":"9","r":"7"}],["circle",{"cx":"9","cy":"15","r":"7"}]],"blender":[["path",{"d":"M8 14a2 2 0 0 0-1.963 1.615l-1.018 5.193A1 1 0 0 0 6 22h12a1 1 0 0 0 .981-1.192l-1.018-5.193A2 2 0 0 0 16 14z"}],["path",{"d":"m17 2-1 12"}],["path",{"d":"M8.006 14 7 2"}],["path",{"d":"M7.565 8.787A5 5 0 0 0 12 8a5 5 0 0 1 4.56-.75"}],["path",{"d":"M19 2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 .688 1.5"}],["path",{"d":"M12 18h.01"}]],"blinds":[["path",{"d":"M3 3h18"}],["path",{"d":"M20 7H8"}],["path",{"d":"M20 11H8"}],["path",{"d":"M10 19h10"}],["path",{"d":"M8 15h12"}],["path",{"d":"M4 3v14"}],["circle",{"cx":"4","cy":"19","r":"2"}]],"blocks":[["path",{"d":"M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"}],["rect",{"x":"14","y":"2","width":"8","height":"8","rx":"1"}]],"bluetooth-connected":[["path",{"d":"m7 7 10 10-5 5V2l5 5L7 17"}],["line",{"x1":"18","x2":"21","y1":"12","y2":"12"}],["line",{"x1":"3","x2":"6","y1":"12","y2":"12"}]],"bluetooth-off":[["path",{"d":"m17 17-5 5V12l-5 5"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M14.5 9.5 17 7l-5-5v4.5"}]],"bluetooth-searching":[["path",{"d":"m7 7 10 10-5 5V2l5 5L7 17"}],["path",{"d":"M20.83 14.83a4 4 0 0 0 0-5.66"}],["path",{"d":"M18 12h.01"}]],"bluetooth":[["path",{"d":"m7 7 10 10-5 5V2l5 5L7 17"}]],"bolt":[["path",{"d":"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}],["circle",{"cx":"12","cy":"12","r":"4"}]],"bomb":[["circle",{"cx":"11","cy":"13","r":"9"}],["path",{"d":"M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95"}],["path",{"d":"m22 2-1.5 1.5"}]],"bone-fracture":[["path",{"d":"M14 4.5a1 1 0 0 1 5 0 .5.5 0 0 0 .5.5 1 1 0 0 1 0 5c-.81 0-1.8-.7-2.5 0l-1.958 1.957a.15.15 0 0 1-.252-.072l-.493-2.07a.15.15 0 0 0-.111-.112l-2.072-.494a.15.15 0 0 1-.072-.252L14 7c.7-.7 0-1.69 0-2.5"}],["path",{"d":"m16 20-1-2"}],["path",{"d":"m20 16-2-1"}],["path",{"d":"m4 8 2 1"}],["path",{"d":"m8 4 1 2"}],["path",{"d":"M9.698 14.19a.15.15 0 0 0 .112.112l2.074.489a.15.15 0 0 1 .072.252L10 17c-.7.7 0 1.69 0 2.5a1 1 0 0 1-5 0 .495.495 0 0 0-.5-.5 1 1 0 0 1 0-5c.81 0 1.8.7 2.5 0l1.956-1.957a.15.15 0 0 1 .252.072z"}]],"bone":[["path",{"d":"M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"}]],"book-a":[["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"m8 13 4-7 4 7"}],["path",{"d":"M9.1 11h5.7"}]],"book-audio":[["path",{"d":"M12 6v7"}],["path",{"d":"M16 8v3"}],["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"M8 8v3"}]],"book-bookmark":[["path",{"d":"M10 2v7.751a.25.25 0 00.407.195l2.28-1.834a.5.5 0 01.627 0l2.28 1.834A.25.25 0 0016 9.751V2"}],["path",{"d":"M4 19.5v-15A2.5 2.5 0 016.5 2H19a1 1 0 011 1v18a1 1 0 01-1 1H6.5a1 1 0 010-5H20"}]],"book-check":[["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"m9 9.5 2 2 4-4"}]],"book-copy":[["path",{"d":"M5 7a2 2 0 0 0-2 2v11"}],["path",{"d":"M5.803 18H5a2 2 0 0 0 0 4h9.5a.5.5 0 0 0 .5-.5V21"}],["path",{"d":"M9 15V4a2 2 0 0 1 2-2h9.5a.5.5 0 0 1 .5.5v14a.5.5 0 0 1-.5.5H11a2 2 0 0 1 0-4h10"}]],"book-dashed":[["path",{"d":"M12 17h1.5"}],["path",{"d":"M12 22h1.5"}],["path",{"d":"M12 2h1.5"}],["path",{"d":"M17.5 22H19a1 1 0 0 0 1-1"}],["path",{"d":"M17.5 2H19a1 1 0 0 1 1 1v1.5"}],["path",{"d":"M20 14v3h-2.5"}],["path",{"d":"M20 8.5V10"}],["path",{"d":"M4 10V8.5"}],["path",{"d":"M4 19.5V14"}],["path",{"d":"M4 4.5A2.5 2.5 0 0 1 6.5 2H8"}],["path",{"d":"M8 22H6.5a1 1 0 0 1 0-5H8"}]],"book-down":[["path",{"d":"M12 13V7"}],["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"m9 10 3 3 3-3"}]],"book-exclamation-point":[["path",{"d":"M12 13h.01"}],["path",{"d":"M12 6v3"}],["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}]],"book-headphones":[["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"M8 12v-2a4 4 0 0 1 8 0v2"}],["circle",{"cx":"15","cy":"12","r":"1"}],["circle",{"cx":"9","cy":"12","r":"1"}]],"book-heart":[["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"}]],"book-image":[["path",{"d":"m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17"}],["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["circle",{"cx":"10","cy":"8","r":"2"}]],"book-key":[["path",{"d":"M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15"}],["path",{"d":"M17 2v6"}],["path",{"d":"M17 4h2"}],["path",{"d":"M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["circle",{"cx":"17","cy":"10","r":"2"}]],"book-lock":[["path",{"d":"M18 6V4a2 2 0 1 0-4 0v2"}],["path",{"d":"M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10"}],["rect",{"x":"12","y":"6","width":"8","height":"5","rx":"1"}]],"book-minus":[["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"M9 10h6"}]],"book-open-check":[["path",{"d":"M12 5v16"}],["path",{"d":"m16 12 2 2 4-4"}],["path",{"d":"M22 6V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2h4.001A2 2 0 0022 17v-1.344"}]],"book-open-text":[["path",{"d":"M12 5v16"}],["path",{"d":"M16 13h2"}],["path",{"d":"M16 9h2"}],["path",{"d":"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"}],["path",{"d":"M6 13h2"}],["path",{"d":"M6 9h2"}]],"book-open":[["path",{"d":"M12 5v16"}],["path",{"d":"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"}]],"book-plus":[["path",{"d":"M12 7v6"}],["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"M9 10h6"}]],"book-search":[["path",{"d":"M11 22H5.5a1 1 0 0 1 0-5h4.501"}],["path",{"d":"m21 22-1.879-1.878"}],["path",{"d":"M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8"}],["circle",{"cx":"17","cy":"18","r":"3"}]],"book-text":[["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"M8 11h8"}],["path",{"d":"M8 7h6"}]],"book-type":[["path",{"d":"M10 13h4"}],["path",{"d":"M12 6v7"}],["path",{"d":"M16 8V6H8v2"}],["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}]],"book-up-2":[["path",{"d":"M12 13V7"}],["path",{"d":"M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2"}],["path",{"d":"m9 10 3-3 3 3"}],["path",{"d":"m9 5 3-3 3 3"}]],"book-up":[["path",{"d":"M12 13V7"}],["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"m9 10 3-3 3 3"}]],"book-user":[["path",{"d":"M15 13a3 3 0 1 0-6 0"}],["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["circle",{"cx":"12","cy":"8","r":"2"}]],"book-x":[["path",{"d":"m14.5 7.5-5 5"}],["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}],["path",{"d":"m9.5 7.5 5 5"}]],"book":[["path",{"d":"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"}]],"bookmark-check":[["path",{"d":"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}],["path",{"d":"m9 10 2 2 4-4"}]],"bookmark-minus":[["path",{"d":"M15 10H9"}],["path",{"d":"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}]],"bookmark-off":[["path",{"d":"M19 19v1a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M8.656 3H17a2 2 0 0 1 2 2v8.344"}]],"bookmark-plus":[["path",{"d":"M12 7v6"}],["path",{"d":"M15 10H9"}],["path",{"d":"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}]],"bookmark-x":[["path",{"d":"m14.5 7.5-5 5"}],["path",{"d":"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}],["path",{"d":"m9.5 7.5 5 5"}]],"bookmark":[["path",{"d":"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}]],"boom-box":[["path",{"d":"M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"}],["path",{"d":"M8 8v1"}],["path",{"d":"M12 8v1"}],["path",{"d":"M16 8v1"}],["rect",{"width":"20","height":"12","x":"2","y":"9","rx":"2"}],["circle",{"cx":"8","cy":"15","r":"2"}],["circle",{"cx":"16","cy":"15","r":"2"}]],"bot-check":[["path",{"d":"M12 8V4H8"}],["path",{"d":"M15 13v2"}],["path",{"d":"m16 19 2 2 4-4"}],["path",{"d":"M2 14h2"}],["path",{"d":"M20 13.5V10a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6"}],["path",{"d":"M9 13v2"}]],"bot-message-square":[["path",{"d":"M12 6V2H8"}],["path",{"d":"M15 11v2"}],["path",{"d":"M2 12h2"}],["path",{"d":"M20 12h2"}],["path",{"d":"M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"}],["path",{"d":"M9 11v2"}]],"bot-minus":[["path",{"d":"M12 8V4H8"}],["path",{"d":"M15 13v2"}],["path",{"d":"M2 14h2"}],["path",{"d":"M20 15v-5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6"}],["path",{"d":"M22 19h-6"}],["path",{"d":"M9 13v2"}]],"bot-off":[["path",{"d":"M13.67 8H18a2 2 0 0 1 2 2v4.33"}],["path",{"d":"M2 14h2"}],["path",{"d":"M20 14h2"}],["path",{"d":"M22 22 2 2"}],["path",{"d":"M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586"}],["path",{"d":"M9 13v2"}],["path",{"d":"M9.67 4H12v2.33"}]],"bot-plus":[["path",{"d":"M12 8V4H8"}],["path",{"d":"M15 13v2"}],["path",{"d":"M19 16v6"}],["path",{"d":"M2 14h2"}],["path",{"d":"M20 12v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6"}],["path",{"d":"M22 19h-6"}],["path",{"d":"M9 13v2"}]],"bot-x":[["path",{"d":"M12 8V4H8"}],["path",{"d":"M15 13v1.5"}],["path",{"d":"m18 17 4 4"}],["path",{"d":"M2 14h2"}],["path",{"d":"M20 13.5V10a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8"}],["path",{"d":"m22 17-4 4"}],["path",{"d":"M9 13v2"}]],"bot":[["path",{"d":"M12 8V4H8"}],["rect",{"width":"16","height":"12","x":"4","y":"8","rx":"2"}],["path",{"d":"M2 14h2"}],["path",{"d":"M20 14h2"}],["path",{"d":"M15 13v2"}],["path",{"d":"M9 13v2"}]],"bottle-wine":[["path",{"d":"M10 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a6 6 0 0 0 1.2 3.6l.6.8A6 6 0 0 1 17 13v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a6 6 0 0 1 1.2-3.6l.6-.8A6 6 0 0 0 10 5z"}],["path",{"d":"M17 13h-4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4"}]],"bow-arrow":[["path",{"d":"M17 3h4v4"}],["path",{"d":"M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17"}],["path",{"d":"M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05"}],["path",{"d":"M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z"}],["path",{"d":"M9.707 14.293 21 3"}]],"box":[["path",{"d":"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],["path",{"d":"m3.3 7 8.7 5 8.7-5"}],["path",{"d":"M12 22V12"}]],"boxes-linked":[["path",{"d":"M14 6h2a2 2 0 0 1 2 2v5"}],["path",{"d":"M14.21 15.202 18 17.4V22"}],["path",{"d":"M14.796 14.611A1.6 1.6 0 0 0 14 15.995v3.013a1.6 1.6 0 0 0 .797 1.384l2.4 1.392a1.6 1.6 0 0 0 1.606 0l2.4-1.392A1.6 1.6 0 0 0 22 19.008v-3.013a1.6 1.6 0 0 0-.796-1.384l-2.4-1.394a1.6 1.6 0 0 0-1.514-.051z"}],["path",{"d":"m18 17.4 3.79-2.198"}],["path",{"d":"M2.21 4.202 6 6.4V16a2 2 0 0 0 2 2h2"}],["path",{"d":"M2.796 3.611A1.6 1.6 0 0 0 2 4.995v3.013a1.6 1.6 0 0 0 .797 1.384l2.4 1.392a1.6 1.6 0 0 0 1.606 0l2.4-1.392A1.6 1.6 0 0 0 10 8.008V4.995a1.6 1.6 0 0 0-.796-1.384l-2.4-1.394a1.6 1.6 0 0 0-1.514-.052z"}],["path",{"d":"m6 6.4 3.79-2.198"}]],"boxes":[["path",{"d":"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{"d":"m7 16.5-4.74-2.85"}],["path",{"d":"m7 16.5 5-3"}],["path",{"d":"M7 16.5v5.17"}],["path",{"d":"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{"d":"m17 16.5-5-3"}],["path",{"d":"m17 16.5 4.74-2.85"}],["path",{"d":"M17 16.5v5.17"}],["path",{"d":"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{"d":"M12 8 7.26 5.15"}],["path",{"d":"m12 8 4.74-2.85"}],["path",{"d":"M12 13.5V8"}]],"braces":[["path",{"d":"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"}],["path",{"d":"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"}]],"brackets":[["path",{"d":"M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3"}],["path",{"d":"M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3"}]],"brain-circuit":[["path",{"d":"M12 13h4"}],["path",{"d":"M12 18h6a2 2 0 012 2v1"}],["path",{"d":"M12 8h8"}],["path",{"d":"M12 9a4.17 4.17 0 01-3 4"}],["path",{"d":"M16 8V5a2 2 0 012-2"}],["path",{"d":"M6 18a4 4 0 01-2-7.465"}],["path",{"d":"M6.004 5.125a4 4 0 00-2.526 5.77"}],["path",{"d":"M6.294 6.294A3 3 0 1112 5v13a4 4 0 11-7.967-.518"}],["circle",{"cx":"16","cy":"13","r":"0.5","fill":"currentColor"}],["circle",{"cx":"18","cy":"3","r":"0.5","fill":"currentColor"}],["circle",{"cx":"20","cy":"21","r":"0.5","fill":"currentColor"}],["circle",{"cx":"20","cy":"8","r":"0.5","fill":"currentColor"}]],"brain-cog":[["path",{"d":"m10.852 14.772-.383.923"}],["path",{"d":"m10.852 9.228-.383-.923"}],["path",{"d":"m13.148 14.772.382.924"}],["path",{"d":"m13.53 8.305-.382.923"}],["path",{"d":"m14.772 10.852.923-.383"}],["path",{"d":"m14.772 13.148.923.383"}],["path",{"d":"M17.997 5.125a4 4 0 012.526 5.77"}],["path",{"d":"M18 18a4 4 0 002-7.464"}],["path",{"d":"M4.033 17.483A4 4 0 0011.46 20c.184-.31.896-.31 1.076 0a4 4 0 007.43-2.517"}],["path",{"d":"M6 18a4 4 0 01-2-7.464"}],["path",{"d":"M6.002 5.125a4 4 0 00-2.525 5.77"}],["path",{"d":"M6.293 6.294a3 3 0 01-.287-1.098l-.004-.07a3 3 0 015.968-.543c.05.02.057.01.059 0a3 3 0 015.968.542l-.004.071a3 3 0 01-.287 1.098"}],["path",{"d":"m9.228 10.852-.923-.383"}],["path",{"d":"m9.228 13.148-.923.383"}],["circle",{"cx":"12","cy":"12","r":"3"}]],"brain-off":[["path",{"d":"M12 18v-6"}],["path",{"d":"M12 5v1.344"}],["path",{"d":"M17.707 6.293A3 3 0 1012 5a3 3 0 00-4.124-2.781"}],["path",{"d":"M17.997 5.125a4 4 0 012.526 5.77"}],["path",{"d":"M19.644 19.644A4 4 0 0112 18a4 4 0 11-7.967-.517"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M20 10.536a4 4 0 011.533 5.34"}],["path",{"d":"M3.477 10.895a4 4 0 011.876-5.542"}],["path",{"d":"M6 18a4 4 0 01-2-7.464"}],["path",{"d":"M9 13a4.17 4.17 0 002.166-1.5 4 4 0 00.138-.196"}]],"brain":[["path",{"d":"M12 18V5"}],["path",{"d":"M15 13a4.17 4.17 0 01-3-4 4.17 4.17 0 01-3 4"}],["path",{"d":"M17.707 6.294A3 3 0 1012 5a3 3 0 10-5.707 1.294"}],["path",{"d":"M17.996 5.125a4 4 0 012.526 5.77"}],["path",{"d":"M18 18a4 4 0 002-7.465"}],["path",{"d":"M19.967 17.482a4 4 0 11-7.967.517 4 4 0 11-7.967-.517"}],["path",{"d":"M6 18a4 4 0 01-2-7.465"}],["path",{"d":"M6.004 5.125a4 4 0 00-2.526 5.77"}]],"brick-wall-fire":[["path",{"d":"M16 3v2.107"}],["path",{"d":"M17 9c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 22 17a5 5 0 0 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C13 11.5 16 9 17 9"}],["path",{"d":"M21 8.274V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.938"}],["path",{"d":"M3 15h5.253"}],["path",{"d":"M3 9h8.228"}],["path",{"d":"M8 15v6"}],["path",{"d":"M8 3v6"}]],"brick-wall-shield":[["path",{"d":"M12 9v1.258"}],["path",{"d":"M16 3v5.46"}],["path",{"d":"M21 9.118V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.75"}],["path",{"d":"M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z"}],["path",{"d":"M3 15h7"}],["path",{"d":"M3 9h12.142"}],["path",{"d":"M8 15v6"}],["path",{"d":"M8 3v6"}]],"brick-wall":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M12 9v6"}],["path",{"d":"M16 15v6"}],["path",{"d":"M16 3v6"}],["path",{"d":"M3 15h18"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 15v6"}],["path",{"d":"M8 3v6"}]],"bridge":[["path",{"d":"M10 9.728V16"}],["path",{"d":"M14 9.728V16"}],["path",{"d":"M18 20V4"}],["path",{"d":"m22 11-4-4A7.5 7.5 0 0 1 6 7l-4 4"}],["path",{"d":"M22 16H2"}],["path",{"d":"M6 20V4"}]],"briefcase-business":[["path",{"d":"M12 12h.01"}],["path",{"d":"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"}],["path",{"d":"M22 13a18.15 18.15 0 0 1-20 0"}],["rect",{"width":"20","height":"14","x":"2","y":"6","rx":"2"}]],"briefcase-conveyor-belt":[["path",{"d":"M10 20v2"}],["path",{"d":"M14 20v2"}],["path",{"d":"M18 20v2"}],["path",{"d":"M21 20H3"}],["path",{"d":"M6 20v2"}],["path",{"d":"M8 16V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12"}],["rect",{"x":"4","y":"6","width":"16","height":"10","rx":"2"}]],"briefcase-medical":[["path",{"d":"M12 11v4"}],["path",{"d":"M14 13h-4"}],["path",{"d":"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"}],["path",{"d":"M18 6v14"}],["path",{"d":"M6 6v14"}],["rect",{"width":"20","height":"14","x":"2","y":"6","rx":"2"}]],"briefcase-plus":[["path",{"d":"M13.354 20H4a2 2 0 01-2-2V8a2 2 0 012-2h16a2 2 0 012 2v3.354"}],["path",{"d":"M16 11.354V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"}],["path",{"d":"M16 17h6"}],["path",{"d":"M19 14v6"}]],"briefcase":[["path",{"d":"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}],["rect",{"width":"20","height":"14","x":"2","y":"6","rx":"2"}]],"bring-to-front":[["rect",{"x":"8","y":"8","width":"8","height":"8","rx":"2"}],["path",{"d":"M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2"}],["path",{"d":"M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2"}]],"broccoli":[["path",{"d":"M10 13a3 3 0 01-2.121-5.121"}],["path",{"d":"M15.606 14.204c-3.5 1.5-5.899 4.503-8.899 7.503A1 1 0 016 22c-2 0-4-2-4-4a1 1 0 01.293-.707c1.911-1.911 3.823-3.578 5.347-5.441"}],["path",{"d":"M16.573 14.737A4 4 0 0114 11"}],["path",{"d":"M7.14 10.907a4 4 0 112.756-7.43A4 4 0 0116.7 4.48a2 2 0 012.82 2.82 4 4 0 011.002 6.805 4 4 0 11-7.51 1.59"}]],"broom-sparkles":[["path",{"d":"M11 2v2"}],["path",{"d":"M12 3h-2"}],["path",{"d":"M13.5 10.5 22 2"}],["path",{"d":"M14.734 13.841a2 2 0 00-.314-2.42L12.58 9.58a2 2 0 00-2.421-.314l-7.657 4.461A1 1 0 002.3 15.3l6.403 6.403a1 1 0 001.571-.204z"}],["path",{"d":"M20 15v4"}],["path",{"d":"M22 17h-4"}],["path",{"d":"M4 4v4"}],["path",{"d":"m5 18 2-2"}],["path",{"d":"M6 6H2"}],["path",{"d":"m7.699 10.7 5.602 5.601"}]],"broom":[["path",{"d":"M13.5 10.5 22 2"}],["path",{"d":"M14.734 13.841a2 2 0 00-.314-2.42L12.58 9.58a2 2 0 00-2.421-.314l-7.657 4.461A1 1 0 002.3 15.3l6.403 6.403a1 1 0 001.571-.204z"}],["path",{"d":"m5 18 2-2"}],["path",{"d":"m7.699 10.7 5.602 5.601"}]],"brush-cleaning":[["path",{"d":"m16 22-1-4"}],["path",{"d":"M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"}],["path",{"d":"M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"}],["path",{"d":"m8 22 1-4"}]],"brush":[["path",{"d":"m11 10 3 3"}],["path",{"d":"M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z"}],["path",{"d":"M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031"}]],"bubbles":[["path",{"d":"M7.001 15.085A1.5 1.5 0 0 1 9 16.5"}],["circle",{"cx":"18.5","cy":"8.5","r":"3.5"}],["circle",{"cx":"7.5","cy":"16.5","r":"5.5"}],["circle",{"cx":"7.5","cy":"4.5","r":"2.5"}]],"bug-off":[["path",{"d":"M12 20v-8"}],["path",{"d":"M12.656 7H14a4 4 0 0 1 4 4v1.344"}],["path",{"d":"M14.12 3.88 16 2"}],["path",{"d":"M17.123 17.123A6 6 0 0 1 6 14v-3a4 4 0 0 1 1.72-3.287"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M21 5a4 4 0 0 1-3.55 3.97"}],["path",{"d":"M22 13h-3.344"}],["path",{"d":"M3 21a4 4 0 0 1 3.81-4"}],["path",{"d":"M3 5a4 4 0 0 0 3.55 3.97"}],["path",{"d":"M6 13H2"}],["path",{"d":"m8 2 1.88 1.88"}],["path",{"d":"M9.712 4.06A3 3 0 0 1 15 6v1.13"}]],"bug-play":[["path",{"d":"M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97"}],["path",{"d":"M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"}],["path",{"d":"M14.12 3.88 16 2"}],["path",{"d":"M21 5a4 4 0 0 1-3.55 3.97"}],["path",{"d":"M3 21a4 4 0 0 1 3.81-4"}],["path",{"d":"M3 5a4 4 0 0 0 3.55 3.97"}],["path",{"d":"M6 13H2"}],["path",{"d":"m8 2 1.88 1.88"}],["path",{"d":"M9 7.13V6a3 3 0 1 1 6 0v1.13"}]],"bug":[["path",{"d":"M12 20v-9"}],["path",{"d":"M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"}],["path",{"d":"M14.12 3.88 16 2"}],["path",{"d":"M21 21a4 4 0 0 0-3.81-4"}],["path",{"d":"M21 5a4 4 0 0 1-3.55 3.97"}],["path",{"d":"M22 13h-4"}],["path",{"d":"M3 21a4 4 0 0 1 3.81-4"}],["path",{"d":"M3 5a4 4 0 0 0 3.55 3.97"}],["path",{"d":"M6 13H2"}],["path",{"d":"m8 2 1.88 1.88"}],["path",{"d":"M9 7.13V6a3 3 0 1 1 6 0v1.13"}]],"building-complex-plus":[["path",{"d":"M10 12h4"}],["path",{"d":"M10 21v-3a2 2 0 013.05-1.702"}],["path",{"d":"M10 8h4"}],["path",{"d":"M16 19h6"}],["path",{"d":"M18 7h2a2 2 0 012 2v4.355"}],["path",{"d":"M19 16v6"}],["path",{"d":"M6 10H4a2 2 0 00-2 2v7a2 2 0 002 2h8.535"}],["path",{"d":"M6 21V5a2 2 0 012-2h8a2 2 0 012 2v7.126"}]],"building-complex":[["path",{"d":"M10 12h4"}],["path",{"d":"M10 8h4"}],["path",{"d":"M14 21v-3a2 2 0 0 0-4 0v3"}],["path",{"d":"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"}],["path",{"d":"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"}]],"building":[["path",{"d":"M12 10h.01"}],["path",{"d":"M12 14h.01"}],["path",{"d":"M12 6h.01"}],["path",{"d":"M16 10h.01"}],["path",{"d":"M16 14h.01"}],["path",{"d":"M16 6h.01"}],["path",{"d":"M8 10h.01"}],["path",{"d":"M8 14h.01"}],["path",{"d":"M8 6h.01"}],["path",{"d":"M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"}],["rect",{"x":"4","y":"2","width":"16","height":"20","rx":"2"}]],"bus-front":[["path",{"d":"M4 6 2 7"}],["path",{"d":"M10 6h4"}],["path",{"d":"m22 7-2-1"}],["rect",{"width":"16","height":"16","x":"4","y":"3","rx":"2"}],["path",{"d":"M4 11h16"}],["path",{"d":"M8 15h.01"}],["path",{"d":"M16 15h.01"}],["path",{"d":"M6 19v2"}],["path",{"d":"M18 21v-2"}]],"bus":[["path",{"d":"M8 6v6"}],["path",{"d":"M15 6v6"}],["path",{"d":"M2 12h19.6"}],["path",{"d":"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"}],["circle",{"cx":"7","cy":"18","r":"2"}],["path",{"d":"M9 18h5"}],["circle",{"cx":"16","cy":"18","r":"2"}]],"cable-car":[["path",{"d":"M10 3h.01"}],["path",{"d":"M14 2h.01"}],["path",{"d":"m2 9 20-5"}],["path",{"d":"M12 12V6.5"}],["rect",{"width":"16","height":"10","x":"4","y":"12","rx":"3"}],["path",{"d":"M9 12v5"}],["path",{"d":"M15 12v5"}],["path",{"d":"M4 17h16"}]],"cable":[["path",{"d":"M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z"}],["path",{"d":"M17 21v-2"}],["path",{"d":"M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10"}],["path",{"d":"M21 21v-2"}],["path",{"d":"M3 5V3"}],["path",{"d":"M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z"}],["path",{"d":"M7 5V3"}]],"cake-slice":[["path",{"d":"M16 13H3"}],["path",{"d":"M16 17H3"}],["path",{"d":"m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6"}],["circle",{"cx":"9","cy":"7","r":"2"}]],"cake":[["path",{"d":"M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"}],["path",{"d":"M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"}],["path",{"d":"M2 21h20"}],["path",{"d":"M7 8v3"}],["path",{"d":"M12 8v3"}],["path",{"d":"M17 8v3"}],["path",{"d":"M7 4h.01"}],["path",{"d":"M12 4h.01"}],["path",{"d":"M17 4h.01"}]],"calculator":[["rect",{"width":"16","height":"20","x":"4","y":"2","rx":"2"}],["line",{"x1":"8","x2":"16","y1":"6","y2":"6"}],["line",{"x1":"16","x2":"16","y1":"14","y2":"18"}],["path",{"d":"M16 10h.01"}],["path",{"d":"M12 10h.01"}],["path",{"d":"M8 10h.01"}],["path",{"d":"M12 14h.01"}],["path",{"d":"M8 14h.01"}],["path",{"d":"M12 18h.01"}],["path",{"d":"M8 18h.01"}]],"calendar-1":[["path",{"d":"M11 13h1v4"}],["path",{"d":"M16 2v3"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"calendar-arrow-down":[["path",{"d":"m14 17 4 4 4-4"}],["path",{"d":"M16 2v3"}],["path",{"d":"M18 13v8"}],["path",{"d":"M21 10.354V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7.343"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}]],"calendar-arrow-left":[["path",{"d":"M16 2v3"}],["path",{"d":"M21 9H3"}],["path",{"d":"M3 12.34V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2h-7.35"}],["path",{"d":"M3 18h6"}],["path",{"d":"m6 21-3-3 3-3"}],["path",{"d":"M8 2v3"}]],"calendar-arrow-right":[["path",{"d":"M16 2v3"}],["path",{"d":"m18 21 3-3h-6"}],["path",{"d":"M21 12.34V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7.35"}],["path",{"d":"m21 18-3-3"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}]],"calendar-arrow-up":[["path",{"d":"m14 17 4-4 4 4"}],["path",{"d":"M16 2v3"}],["path",{"d":"M18 21v-8"}],["path",{"d":"M21 10.343V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h9"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}]],"calendar-check-2":[["path",{"d":"M 19 3 L 5 3"}],["path",{"d":"M 21 13 L 21 5"}],["path",{"d":"M 21 5 A2 2 0 0 0 19 3"}],["path",{"d":"M 3 19 A2 2 0 0 0 5 21"}],["path",{"d":"M 3 5 L 3 19"}],["path",{"d":"M 5 3 A2 2 0 0 0 3 5"}],["path",{"d":"m16 19 2 2 4-4"}],["path",{"d":"M16 2v3"}],["path",{"d":"M3 9h18"}],["path",{"d":"M5 21 L12.5 21"}],["path",{"d":"M8 2v3"}]],"calendar-check":[["path",{"d":"M8 2v3"}],["path",{"d":"M16 2v3"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M3 9h18"}],["path",{"d":"m9 15 2 2 4-4"}]],"calendar-chevrons-left":[["path",{"d":"m11 21-3-3 3-3"}],["path",{"d":"M16 2v3"}],["path",{"d":"M21 9H3"}],["path",{"d":"M3 11.5V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2h-4"}],["path",{"d":"m5 21-3-3 3-3"}],["path",{"d":"M8 2v3"}]],"calendar-chevrons-right":[["path",{"d":"m13 21 3-3-3-3"}],["path",{"d":"M16 2v3"}],["path",{"d":"m19 21 3-3-3-3"}],["path",{"d":"M21 11.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h4"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}]],"calendar-clock":[["path",{"d":"M16 14v2.2l1.6 1"}],["path",{"d":"M16 2v3"}],["path",{"d":"M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338"}],["path",{"d":"M3 9h5.859"}],["path",{"d":"M8 2v3"}],["circle",{"cx":"16","cy":"16","r":"6"}]],"calendar-cog":[["path",{"d":"m15.228 16.852-.923-.383"}],["path",{"d":"m15.228 19.148-.923.383"}],["path",{"d":"M16 2v3"}],["path",{"d":"m16.47 14.305.382.923"}],["path",{"d":"m16.852 20.772-.383.924"}],["path",{"d":"m19.148 15.228.383-.923"}],["path",{"d":"m19.53 21.696-.382-.924"}],["path",{"d":"m20.773 16.852.924-.383"}],["path",{"d":"m20.773 19.148.924.383"}],["path",{"d":"M21 10.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h5.5"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}],["circle",{"cx":"18","cy":"18","r":"3"}]],"calendar-days":[["path",{"d":"M8 2v3"}],["path",{"d":"M16 2v3"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 13h.01"}],["path",{"d":"M12 13h.01"}],["path",{"d":"M16 13h.01"}],["path",{"d":"M8 17h.01"}],["path",{"d":"M12 17h.01"}],["path",{"d":"M16 17h.01"}]],"calendar-fold":[["path",{"d":"M16 2v3"}],["path",{"d":"M21 15V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h10v-5a1 1 0 011-1za2.4 2.4 0 01-.706 1.706l-3.588 3.588A2.4 2.4 0 0115 21"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}]],"calendar-heart":[["path",{"d":"M12.127 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5.125"}],["path",{"d":"M14.62 17.8A2.25 2.25 0 1118 14.836a2.25 2.25 0 113.38 2.966l-2.626 2.856a.998.998 0 01-1.507 0z"}],["path",{"d":"M16 2v3"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}]],"calendar-minus-2":[["path",{"d":"M8 2v3"}],["path",{"d":"M16 2v3"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M3 9h18"}],["path",{"d":"M10 15h4"}]],"calendar-minus":[["path",{"d":"M16 18h6"}],["path",{"d":"M16 2v3"}],["path",{"d":"M21 14V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8.3"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}]],"calendar-off":[["path",{"d":"M16 2v3"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M21 9h-5.5"}],["path",{"d":"M3 9h6"}],["path",{"d":"M3.586 3.586A2 2 0 003 5v14a2 2 0 002 2h14a2 2 0 001.414-.586"}],["path",{"d":"M8.656 3H19a2 2 0 012 2v10.344"}]],"calendar-plus-2":[["path",{"d":"M8 2v3"}],["path",{"d":"M16 2v3"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M3 9h18"}],["path",{"d":"M10 15h4"}],["path",{"d":"M12 13v4"}]],"calendar-plus":[["path",{"d":"M16 18h6"}],["path",{"d":"M16 2v3"}],["path",{"d":"M19 15v6"}],["path",{"d":"M21 11.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8.3"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}]],"calendar-range":[["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M16 2v3"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}],["path",{"d":"M17 13h-6"}],["path",{"d":"M13 17H7"}],["path",{"d":"M7 13h.01"}],["path",{"d":"M17 17h.01"}]],"calendar-search":[["path",{"d":"M16 2v3"}],["path",{"d":"M21 10.69V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7.25"}],["path",{"d":"m22 21-1.875-1.875"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}],["circle",{"cx":"18","cy":"17","r":"3"}]],"calendar-sync":[["path",{"d":"M11 10v4h4"}],["path",{"d":"m11 14 1.535-1.605a5 5 0 018 1.5"}],["path",{"d":"M16 2v3"}],["path",{"d":"m21 18-1.535 1.605a5 5 0 01-8-1.5"}],["path",{"d":"M21 22v-4h-4"}],["path",{"d":"M21 8.517V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h3.517"}],["path",{"d":"M3 9h4"}],["path",{"d":"M8 2v3"}]],"calendar-x-2":[["path",{"d":"M16 2v3"}],["path",{"d":"m17 16 5 5"}],["path",{"d":"m17 21 5-5"}],["path",{"d":"M21 12V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8"}],["path",{"d":"M3 9h18"}],["path",{"d":"M8 2v3"}]],"calendar-x":[["path",{"d":"M8 2v3"}],["path",{"d":"M16 2v3"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M3 9h18"}],["path",{"d":"m14 13-4 4"}],["path",{"d":"m10 13 4 4"}]],"calendar":[["path",{"d":"M8 2v3"}],["path",{"d":"M16 2v3"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M3 9h18"}]],"calendars":[["path",{"d":"M12 2v2"}],["path",{"d":"M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2"}],["path",{"d":"M18 2v2"}],["path",{"d":"M2 13h2"}],["path",{"d":"M8 8h14"}],["rect",{"x":"8","y":"3","width":"14","height":"14","rx":"2"}]],"camera-off":[["path",{"d":"M14.564 14.558a3 3 0 1 1-4.122-4.121"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M20 20H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 .819-.175"}],["path",{"d":"M9.695 4.024A2 2 0 0 1 10.004 4h3.993a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v7.344"}]],"camera":[["path",{"d":"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"}],["circle",{"cx":"12","cy":"13","r":"3"}]],"can-soda":[["path",{"d":"m17 22 1.664-2.496a2 2 0 00.336-1.11V5.606a2 2 0 00-.336-1.11L17 2"}],["path",{"d":"M18 22H6"}],["path",{"d":"M18 2H6"}],["path",{"d":"M5 17h14"}],["path",{"d":"M5 7h14"}],["path",{"d":"m7 22-1.664-2.496A2 2 0 015 18.394V5.606a2 2 0 01.336-1.11L7 2"}]],"can":[["path",{"d":"M21 10.5a9 2.5 0 01-18 0v8a9 2.5 0 0018 0z"}],["path",{"d":"M21 10.5A9 2.5 25.32 004.59 3.47 9 2.5 25.32 0021 10.5"}],["path",{"d":"M3 10.5a9 2.5 0 016.527-2.405"}],["path",{"d":"M9 16.858a31 31 0 006 0"}]],"candy-cane":[["path",{"d":"m10.8 5 2.111 4.223"}],["path",{"d":"M17.75 7 15 2.1"}],["path",{"d":"m4.874 14.647 2.12 4.24"}],["path",{"d":"M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2z"}],["path",{"d":"m7.906 9.712 2.005 4.411"}]],"candy-off":[["path",{"d":"M10 10v7.9"}],["path",{"d":"M11.802 6.145a5 5 0 0 1 6.053 6.053"}],["path",{"d":"M14 6.1v2.243"}],["path",{"d":"m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965"}],["path",{"d":"M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4"}]],"candy":[["path",{"d":"M10 7v10.9"}],["path",{"d":"M14 6.1V17"}],["path",{"d":"M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4"}],["path",{"d":"M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07"}],["path",{"d":"M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4"}]],"cannabis-off":[["path",{"d":"M12 22v-4c1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5"}],["path",{"d":"M13.988 8.327C13.902 6.054 13.365 3.82 12 2a9.3 9.3 0 0 0-1.445 2.9"}],["path",{"d":"M17.375 11.725C18.882 10.53 21 7.841 21 6c-2.324 0-5.08 1.296-6.662 2.684"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M21.024 15.378A15 15 0 0 0 22 15c-.426-1.279-2.67-2.557-4.25-2.907"}],["path",{"d":"M6.995 6.992C5.714 6.4 4.29 6 3 6c0 2 2.5 5 4 6-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3"}]],"cannabis":[["path",{"d":"M12 22v-4"}],["path",{"d":"M7 12c-1.5 0-4.5 1.5-5 3 3.5 1.5 6 1 6 1-1.5 1.5-2 3.5-2 5 2.5 0 4.5-1.5 6-3 1.5 1.5 3.5 3 6 3 0-1.5-.5-3.5-2-5 0 0 2.5.5 6-1-.5-1.5-3.5-3-5-3 1.5-1 4-4 4-6-2.5 0-5.5 1.5-7 3 0-2.5-.5-5-2-7-1.5 2-2 4.5-2 7-1.5-1.5-4.5-3-7-3 0 2 2.5 5 4 6"}]],"cap":[["path",{"d":"M11.04 4.017a12 12 0 00-2.631 11.101"}],["path",{"d":"M5 16c3.298 0 6-3 10-3a8 8 0 016.81 3.799 1.33 1.33 0 01.19.701.5.5 0 01-.5.5c-.732.001-2.04-1.004-3.5-1-3.005.008-5.197 2.982-8 3-2.761 0-5-1.79-5-4-1.5 0-2.543-.664-2.713-1.3A8.5 8.5 0 1119 12.5a8.6 8.6 0 01-.131 1.496"}]],"captions-off":[["path",{"d":"M10.5 5H19a2 2 0 0 1 2 2v8.5"}],["path",{"d":"M17 11h-.5"}],["path",{"d":"M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M7 11h4"}],["path",{"d":"M7 15h2.5"}]],"captions":[["rect",{"width":"18","height":"14","x":"3","y":"5","rx":"2","ry":"2"}],["path",{"d":"M7 15h4M15 15h2M7 11h2M13 11h4"}]],"car-battery":[["path",{"d":"M14 13h4"}],["path",{"d":"M16 15v-4"}],["path",{"d":"M18 5v2"}],["path",{"d":"M6 13h4"}],["path",{"d":"M6 5v2"}],["rect",{"x":"2","y":"7","width":"20","height":"12","rx":"2"}]],"car-front":[["path",{"d":"m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"}],["path",{"d":"M7 14h.01"}],["path",{"d":"M17 14h.01"}],["rect",{"width":"18","height":"8","x":"3","y":"10","rx":"2"}],["path",{"d":"M5 18v2"}],["path",{"d":"M19 18v2"}]],"car-taxi-front":[["path",{"d":"M10 2h4"}],["path",{"d":"m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"}],["path",{"d":"M7 14h.01"}],["path",{"d":"M17 14h.01"}],["rect",{"width":"18","height":"8","x":"3","y":"10","rx":"2"}],["path",{"d":"M5 18v2"}],["path",{"d":"M19 18v2"}]],"car":[["path",{"d":"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"}],["circle",{"cx":"7","cy":"17","r":"2"}],["path",{"d":"M9 17h6"}],["circle",{"cx":"17","cy":"17","r":"2"}]],"caravan":[["path",{"d":"M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2"}],["path",{"d":"M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2"}],["path",{"d":"M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9"}],["circle",{"cx":"8","cy":"19","r":"2"}]],"card-sim":[["path",{"d":"M12 14v4"}],["path",{"d":"M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"}],["path",{"d":"M8 14h8"}],["rect",{"x":"8","y":"10","width":"8","height":"8","rx":"2"}]],"carets-from-axis-dashed-horizontal":[["path",{"d":"M10 12H8"}],["path",{"d":"M16 12h-2"}],["path",{"d":"M22 12h-2"}],["path",{"d":"M4 12H2"}],["path",{"d":"M7.298 17.712A1 1 0 0 1 8 16h8a1 1 0 0 1 .703 1.712l-3.991 3.99a1 1 0 0 1-1.424.001z"}],["path",{"d":"M7.298 6.288A1 1 0 0 0 8 8h8a1 1 0 0 0 .703-1.712l-3.991-3.99a1 1 0 0 0-1.424-.001z"}]],"carets-from-axis-dashed-vertical":[["path",{"d":"M12 14v2"}],["path",{"d":"M12 20v2"}],["path",{"d":"M12 2v2"}],["path",{"d":"M12 8v2"}],["path",{"d":"M17.712 16.703A1 1 0 0 1 15.999 16V8a1 1 0 0 1 1.713-.703l3.99 3.991a1 1 0 0 1 .001 1.424z"}],["path",{"d":"M6.288 16.703A1 1 0 0 0 8.001 16V8a1 1 0 0 0-1.713-.703l-3.99 3.991a1 1 0 0 0-.001 1.424z"}]],"carets-from-axis-horizontal":[["path",{"d":"M16.703 6.288A1 1 0 0 1 16 8H8a1 1 0 0 1-.703-1.712l3.991-3.99a1 1 0 0 1 1.425-.001z"}],["path",{"d":"M22 12H2"}],["path",{"d":"M7.298 17.712A1 1 0 0 1 8 16h8a1 1 0 0 1 .703 1.712l-3.991 3.99a1 1 0 0 1-1.424.001z"}]],"carets-from-axis-vertical":[["path",{"d":"M12 2v20"}],["path",{"d":"M17.712 16.703A1 1 0 0 1 15.999 16V8a1 1 0 0 1 1.713-.703l3.99 3.991a1 1 0 0 1 .001 1.424z"}],["path",{"d":"M6.288 16.703A1 1 0 0 0 8.001 16V8a1 1 0 0 0-1.713-.703l-3.99 3.991a1 1 0 0 0-.001 1.424z"}]],"carets-to-axis-dashed-horizontal":[["path",{"d":"M10 12H8"}],["path",{"d":"M16 12h-2"}],["path",{"d":"M22 12h-2"}],["path",{"d":"M4 12H2"}],["path",{"d":"M7.298 20.288A1 1 0 0 0 8 22h8a1 1 0 0 0 .703-1.712l-3.991-3.99a1 1 0 0 0-1.424-.001z"}],["path",{"d":"M7.298 3.712A1 1 0 0 1 8 2h8a1 1 0 0 1 .703 1.712l-3.991 3.99a1 1 0 0 1-1.424.001z"}]],"carets-to-axis-dashed-vertical":[["path",{"d":"M12 14v2"}],["path",{"d":"M12 20v2"}],["path",{"d":"M12 2v2"}],["path",{"d":"M12 8v2"}],["path",{"d":"M20.288 16.703A1 1 0 0 0 22 16V8a1 1 0 0 0-1.712-.703l-3.99 3.991a1 1 0 0 0-.001 1.424z"}],["path",{"d":"M3.712 16.703A1 1 0 0 1 2 16V8a1 1 0 0 1 1.712-.703l3.99 3.991a1 1 0 0 1 .001 1.424z"}]],"carets-to-axis-horizontal":[["path",{"d":"M22 12H2"}],["path",{"d":"M7.298 20.288A1 1 0 0 0 8 22h8a1 1 0 0 0 .703-1.712l-3.991-3.99a1 1 0 0 0-1.424-.001z"}],["path",{"d":"M7.298 3.712A1 1 0 0 1 8 2h8a1 1 0 0 1 .703 1.712l-3.991 3.99a1 1 0 0 1-1.424.001z"}]],"carets-to-axis-vertical":[["path",{"d":"M12 2v20"}],["path",{"d":"M20.288 16.703A1 1 0 0 0 22 16V8a1 1 0 0 0-1.712-.703l-3.99 3.991a1 1 0 0 0-.001 1.424z"}],["path",{"d":"M3.712 16.703A1 1 0 0 1 2 16V8a1 1 0 0 1 1.712-.703l3.99 3.991a1 1 0 0 1 .001 1.424z"}]],"carrot":[["path",{"d":"M15 16a1 1 0 0 0-7-7q-4 4-5.987 12.385a.5.5 0 0 0 .602.602Q11 20 15 16l-3-3"}],["path",{"d":"M15 9q4 4 7 0-3-4-7 0 4-4 0-7-4 3 0 7"}],["path",{"d":"m8 15-2.58-2.58"}]],"carton-off":[["path",{"d":"M10 10H5v10a2 2 0 002 2h10a2 2 0 002-2v-1"}],["path",{"d":"M13 22v-9"}],["path",{"d":"M13.902 8.245 16 6h-4.343"}],["path",{"d":"M19 13.343V10a2 2 0 00-.539-1.367L16 6V3a1 1 0 00-1-1H9a1 1 0 00-.857.486"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M7.034 7.034 5.539 8.633A2 2 0 005 10"}]],"carton":[["path",{"d":"M13 22V10a2 2 0 01.539-1.367L16 6H8L5.539 8.633A2 2 0 005 10v10a2 2 0 002 2h10a2 2 0 002-2V10a2 2 0 00-.539-1.367L16 6V3a1 1 0 00-1-1H9a1 1 0 00-1 1v3"}],["path",{"d":"M5 10h8"}]],"case-lower":[["path",{"d":"M10 9v7"}],["path",{"d":"M14 6v10"}],["circle",{"cx":"17.5","cy":"12.5","r":"3.5"}],["circle",{"cx":"6.5","cy":"12.5","r":"3.5"}]],"case-sensitive":[["path",{"d":"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"}],["path",{"d":"M22 9v7"}],["path",{"d":"M3.304 13h6.392"}],["circle",{"cx":"18.5","cy":"12.5","r":"3.5"}]],"case-upper":[["path",{"d":"M15 11h4.5a1 1 0 0 1 0 5h-4a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h3a1 1 0 0 1 0 5"}],["path",{"d":"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"}],["path",{"d":"M3.304 13h6.392"}]],"cassette-tape":[["rect",{"width":"20","height":"16","x":"2","y":"4","rx":"2"}],["circle",{"cx":"8","cy":"10","r":"2"}],["path",{"d":"M8 12h8"}],["circle",{"cx":"16","cy":"10","r":"2"}],["path",{"d":"m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3"}]],"cast":[["path",{"d":"M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"}],["path",{"d":"M2 12a9 9 0 0 1 8 8"}],["path",{"d":"M2 16a5 5 0 0 1 4 4"}],["line",{"x1":"2","x2":"2.01","y1":"20","y2":"20"}]],"castle":[["path",{"d":"M10 5V3"}],["path",{"d":"M14 5V3"}],["path",{"d":"M15 21v-3a3 3 0 0 0-6 0v3"}],["path",{"d":"M18 3v8"}],["path",{"d":"M18 5H6"}],["path",{"d":"M22 11H2"}],["path",{"d":"M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9"}],["path",{"d":"M6 3v8"}]],"cat":[["path",{"d":"M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"}],["path",{"d":"M8 14v.5"}],["path",{"d":"M16 14v.5"}],["path",{"d":"M11.25 16.25h1.5L12 17l-.75-.75Z"}]],"cctv-off":[["path",{"d":"m12.309 6.652 4.797 2.401a1 1 0 0 1 .447 1.341l-.501 1.001.605.605h2.725a1 1 0 0 1 .894 1.447l-.724 1.448"}],["path",{"d":"m15.166 15.166-.719 1.439a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.9 2.9 0 0 1 .873-1.037"}],["path",{"d":"M2 19h3.76a2 2 0 0 0 1.8-1.1l1.441-2.902"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M2 21v-4"}],["path",{"d":"M7 9h.01"}]],"cctv":[["path",{"d":"M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97"}],["path",{"d":"M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z"}],["path",{"d":"M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15"}],["path",{"d":"M2 21v-4"}],["path",{"d":"M7 9h.01"}]],"certificate":[["path",{"d":"M12 10H6"}],["path",{"d":"m20.69 15.479 1.29 4.88a.5.5 0 01-.698.591l-1.843-.849a1 1 0 00-.879.001l-1.846.85a.5.5 0 01-.692-.593l1.29-4.88"}],["path",{"d":"M22 6.675V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h8"}],["path",{"d":"M6 14h4"}],["circle",{"cx":"19","cy":"13","r":"3"}]],"chart-area":[["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"}]],"chart-bar-big":[["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["rect",{"x":"7","y":"13","width":"9","height":"4","rx":"1"}],["rect",{"x":"7","y":"5","width":"12","height":"4","rx":"1"}]],"chart-bar-decreasing":[["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"M7 11h8"}],["path",{"d":"M7 16h3"}],["path",{"d":"M7 6h12"}]],"chart-bar-increasing":[["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"M7 11h8"}],["path",{"d":"M7 16h12"}],["path",{"d":"M7 6h3"}]],"chart-bar-stacked":[["path",{"d":"M11 13v4"}],["path",{"d":"M15 5v4"}],["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["rect",{"x":"7","y":"13","width":"9","height":"4","rx":"1"}],["rect",{"x":"7","y":"5","width":"12","height":"4","rx":"1"}]],"chart-bar":[["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"M7 16h8"}],["path",{"d":"M7 11h12"}],["path",{"d":"M7 6h3"}]],"chart-bell-curve":[["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"M7 16c3.5 0 2.5-10 6-10s2.5 10 6 10"}]],"chart-candlestick":[["path",{"d":"M9 5v4"}],["rect",{"width":"4","height":"6","x":"7","y":"9","rx":"1"}],["path",{"d":"M9 15v2"}],["path",{"d":"M17 3v2"}],["rect",{"width":"4","height":"8","x":"15","y":"5","rx":"1"}],["path",{"d":"M17 13v3"}],["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}]],"chart-column-big":[["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["rect",{"x":"15","y":"5","width":"4","height":"12","rx":"1"}],["rect",{"x":"7","y":"8","width":"4","height":"9","rx":"1"}]],"chart-column-decreasing":[["path",{"d":"M13 17V9"}],["path",{"d":"M18 17v-3"}],["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"M8 17V5"}]],"chart-column-increasing":[["path",{"d":"M13 17V9"}],["path",{"d":"M18 17V5"}],["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"M8 17v-3"}]],"chart-column-stacked":[["path",{"d":"M11 13H7"}],["path",{"d":"M19 9h-4"}],["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["rect",{"x":"15","y":"5","width":"4","height":"12","rx":"1"}],["rect",{"x":"7","y":"8","width":"4","height":"9","rx":"1"}]],"chart-column":[["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"M18 17V9"}],["path",{"d":"M13 17V5"}],["path",{"d":"M8 17v-3"}]],"chart-gantt":[["path",{"d":"M10 6h8"}],["path",{"d":"M12 16h6"}],["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"M8 11h7"}]],"chart-line":[["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"m19 9-5 5-4-4-3 3"}]],"chart-network":[["path",{"d":"m13.11 7.664 1.78 2.672"}],["path",{"d":"m14.162 12.788-3.324 1.424"}],["path",{"d":"m20 4-6.06 1.515"}],["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["circle",{"cx":"12","cy":"6","r":"2"}],["circle",{"cx":"16","cy":"12","r":"2"}],["circle",{"cx":"9","cy":"15","r":"2"}]],"chart-no-axes-column-decreasing":[["path",{"d":"M5 21V3"}],["path",{"d":"M12 21V9"}],["path",{"d":"M19 21v-6"}]],"chart-no-axes-column-increasing":[["path",{"d":"M5 21v-6"}],["path",{"d":"M12 21V9"}],["path",{"d":"M19 21V3"}]],"chart-no-axes-column":[["path",{"d":"M5 21v-6"}],["path",{"d":"M12 21V3"}],["path",{"d":"M19 21V9"}]],"chart-no-axes-combined":[["path",{"d":"M12 16v5"}],["path",{"d":"M16 14.639V21"}],["path",{"d":"M20 10.656V21"}],["path",{"d":"m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"}],["path",{"d":"M4 18.463V21"}],["path",{"d":"M8 14.656V21"}]],"chart-no-axes-gantt":[["path",{"d":"M6 5h12"}],["path",{"d":"M4 12h10"}],["path",{"d":"M12 19h8"}]],"chart-pie":[["path",{"d":"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"}],["path",{"d":"M21.21 15.89A10 10 0 1 1 8 2.83"}]],"chart-quadrant":[["path",{"d":"M13 3v18"}],["path",{"d":"M3 12h18"}],["path",{"d":"M3 3v16a2 2 0 002 2h16"}],["circle",{"cx":"17.5","cy":"5.5","r":"0.5","fill":"currentColor"}],["circle",{"cx":"19.5","cy":"16.5","r":"0.5","fill":"currentColor"}],["circle",{"cx":"7.5","cy":"16.5","r":"0.5","fill":"currentColor"}],["circle",{"cx":"7.5","cy":"7.5","r":"0.5","fill":"currentColor"}]],"chart-radar":[["path",{"d":"M12 2v10"}],["path",{"d":"m16 18 3.085-8.125L12 4.103 3.473 9.442l3.196 10.554z"}],["path",{"d":"m2 9 10 3 6 9"}],["path",{"d":"m6 21 6-9 10-3"}]],"chart-scatter":[["circle",{"cx":"7.5","cy":"7.5","r":".5","fill":"currentColor"}],["circle",{"cx":"18.5","cy":"5.5","r":".5","fill":"currentColor"}],["circle",{"cx":"11.5","cy":"11.5","r":".5","fill":"currentColor"}],["circle",{"cx":"7.5","cy":"16.5","r":".5","fill":"currentColor"}],["circle",{"cx":"17.5","cy":"14.5","r":".5","fill":"currentColor"}],["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}]],"chart-spline":[["path",{"d":"M3 3v16a2 2 0 0 0 2 2h16"}],["path",{"d":"M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"}]],"check-check":[["path",{"d":"M18 6 7 17l-5-5"}],["path",{"d":"m22 10-7.5 7.5L13 16"}]],"check-line":[["path",{"d":"M20 4L9 15"}],["path",{"d":"M21 19L3 19"}],["path",{"d":"M9 15L4 10"}]],"check":[["path",{"d":"M20 6 9 17l-5-5"}]],"cheese":[["path",{"d":"M14 11a3 3 0 01-6 0 5 5 0 016 0"}],["path",{"d":"M14.292 2.436a1.55 1.55 0 011.463-.088l.278.13A10.33 10.33 0 0122 11v8a2 2 0 01-2 2h-1.75a.28.28 0 01-.265-.25 2 2 0 00-3.97 0 .28.28 0 01-.265.25H4a2 2 0 01-2-2v-.75a.28.28 0 01.25-.265 2 2 0 00-.046-3.975.21.21 0 01-.204-.214v-2.678a2 2 0 01.952-1.703l6.062-3.732a.3.3 0 01.27-.002A2.5 2.5 0 0013 3.5l-.002-.104a.3.3 0 01.122-.24z"}],["path",{"d":"M22 11h-8"}],["path",{"d":"M8 11H2"}]],"chef-hat":[["path",{"d":"M10 11v5"}],["path",{"d":"M14 11v5"}],["path",{"d":"M6 12.65c0-.457-.316-.844-.727-1.041A4 4 0 017.52 4.034a1.53 1.53 0 001.367-.547 4 4 0 016.225 0 1.53 1.53 0 001.367.547 4 4 0 012.248 7.575c-.411.197-.727.584-.727 1.04V19a2 2 0 01-2 2H8a2 2 0 01-2-2z"}],["path",{"d":"M6 16h12"}]],"cherry":[["path",{"d":"M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"}],["path",{"d":"M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"}],["path",{"d":"M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"}],["path",{"d":"M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"}]],"chess-bishop":[["path",{"d":"M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"}],["path",{"d":"M15 18c1.5-.615 3-2.461 3-4.923C18 8.769 14.5 4.462 12 2 9.5 4.462 6 8.77 6 13.077 6 15.539 7.5 17.385 9 18"}],["path",{"d":"m16 7-2.5 2.5"}],["path",{"d":"M9 2h6"}]],"chess-king":[["path",{"d":"M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"}],["path",{"d":"m6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1"}],["path",{"d":"M10 4h4"}],["path",{"d":"M12 2v6.818"}]],"chess-knight":[["path",{"d":"M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"}],["path",{"d":"M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456"}],["path",{"d":"m15 5 1.425-1.425"}],["path",{"d":"m17 8 1.53-1.53"}],["path",{"d":"M9.713 12.185 7 18"}]],"chess-pawn":[["path",{"d":"M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"}],["path",{"d":"m14.5 10 1.5 8"}],["path",{"d":"M7 10h10"}],["path",{"d":"m8 18 1.5-8"}],["circle",{"cx":"12","cy":"6","r":"4"}]],"chess-queen":[["path",{"d":"m10.68 5.499-.996 4.982a.65.65 0 01-1.131.295L5.885 7.663"}],["path",{"d":"m13.32 5.5.995 4.98a.65.65 0 001.131.296l2.668-3.113"}],["path",{"d":"M20.428 8.952 17.5 18"}],["path",{"d":"M4 20a2 2 0 012-2h12a2 2 0 012 2v1a1 1 0 01-1 1H5a1 1 0 01-1-1z"}],["path",{"d":"M6.5 18 3.571 8.952"}],["circle",{"cx":"12","cy":"4","r":"2"}],["circle",{"cx":"20","cy":"7","r":"2"}],["circle",{"cx":"4","cy":"7","r":"2"}]],"chess-rook":[["path",{"d":"M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"}],["path",{"d":"M10 2v2"}],["path",{"d":"M14 2v2"}],["path",{"d":"m17 18-1-9"}],["path",{"d":"M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2"}],["path",{"d":"M6 4h12"}],["path",{"d":"m7 18 1-9"}]],"chevron-down":[["path",{"d":"m6 9 6 6 6-6"}]],"chevron-first":[["path",{"d":"m17 18-6-6 6-6"}],["path",{"d":"M7 6v12"}]],"chevron-last":[["path",{"d":"m7 18 6-6-6-6"}],["path",{"d":"M17 6v12"}]],"chevron-left":[["path",{"d":"m15 18-6-6 6-6"}]],"chevron-right":[["path",{"d":"m9 18 6-6-6-6"}]],"chevron-up":[["path",{"d":"m18 15-6-6-6 6"}]],"chevrons-down-up":[["path",{"d":"m7 20 5-5 5 5"}],["path",{"d":"m7 4 5 5 5-5"}]],"chevrons-down":[["path",{"d":"m7 6 5 5 5-5"}],["path",{"d":"m7 13 5 5 5-5"}]],"chevrons-from-axis-dashed-horizontal":[["path",{"d":"M10 12H8"}],["path",{"d":"M16 12h-2"}],["path",{"d":"M22 12h-2"}],["path",{"d":"M4 12H2"}],["path",{"d":"m8 17 4 4 4-4"}],["path",{"d":"m8 7 4-4 4 4"}]],"chevrons-from-axis-dashed-vertical":[["path",{"d":"M12 14v2"}],["path",{"d":"M12 20v2"}],["path",{"d":"M12 2v2"}],["path",{"d":"M12 8v2"}],["path",{"d":"m17 8 4 4-4 4"}],["path",{"d":"m7 8-4 4 4 4"}]],"chevrons-from-axis-horizontal":[["path",{"d":"M22 12H2"}],["path",{"d":"m8 17 4 4 4-4"}],["path",{"d":"m8 7 4-4 4 4"}]],"chevrons-from-axis-vertical":[["path",{"d":"M12 2v20"}],["path",{"d":"m17 8 4 4-4 4"}],["path",{"d":"m7 8-4 4 4 4"}]],"chevrons-left-right-ellipsis":[["path",{"d":"M12 12h.01"}],["path",{"d":"M16 12h.01"}],["path",{"d":"m17 7 5 5-5 5"}],["path",{"d":"m7 7-5 5 5 5"}],["path",{"d":"M8 12h.01"}]],"chevrons-left-right":[["path",{"d":"m9 7-5 5 5 5"}],["path",{"d":"m15 7 5 5-5 5"}]],"chevrons-left":[["path",{"d":"m11 17-5-5 5-5"}],["path",{"d":"m18 17-5-5 5-5"}]],"chevrons-right-left":[["path",{"d":"m20 17-5-5 5-5"}],["path",{"d":"m4 17 5-5-5-5"}]],"chevrons-right":[["path",{"d":"m6 17 5-5-5-5"}],["path",{"d":"m13 17 5-5-5-5"}]],"chevrons-to-axis-dashed-horizontal":[["path",{"d":"M10 12H8"}],["path",{"d":"M16 12h-2"}],["path",{"d":"m16 21-4-4-4 4"}],["path",{"d":"m16 3-4 4-4-4"}],["path",{"d":"M22 12h-2"}],["path",{"d":"M4 12H2"}]],"chevrons-to-axis-dashed-vertical":[["path",{"d":"M12 14v2"}],["path",{"d":"M12 20v2"}],["path",{"d":"M12 2v2"}],["path",{"d":"M12 8v2"}],["path",{"d":"m21 8-4 4 4 4"}],["path",{"d":"m3 8 4 4-4 4"}]],"chevrons-to-axis-horizontal":[["path",{"d":"m16 21-4-4-4 4"}],["path",{"d":"m16 3-4 4-4-4"}],["path",{"d":"M22 12H2"}]],"chevrons-to-axis-vertical":[["path",{"d":"M12 2v20"}],["path",{"d":"m21 8-4 4 4 4"}],["path",{"d":"m3 8 4 4-4 4"}]],"chevrons-up-down":[["path",{"d":"m7 15 5 5 5-5"}],["path",{"d":"m7 9 5-5 5 5"}]],"chevrons-up":[["path",{"d":"m17 11-5-5-5 5"}],["path",{"d":"m17 18-5-5-5 5"}]],"church":[["path",{"d":"M10 9h4"}],["path",{"d":"M12 7v5"}],["path",{"d":"M14 21v-3a2 2 0 0 0-4 0v3"}],["path",{"d":"m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9"}],["path",{"d":"M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14"}]],"cigarette-off":[["path",{"d":"M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13"}],["path",{"d":"M18 8c0-2.5-2-2.5-2-5"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866"}],["path",{"d":"M22 8c0-2.5-2-2.5-2-5"}],["path",{"d":"M7 12v4"}]],"cigarette":[["path",{"d":"M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14"}],["path",{"d":"M18 8c0-2.5-2-2.5-2-5"}],["path",{"d":"M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"}],["path",{"d":"M22 8c0-2.5-2-2.5-2-5"}],["path",{"d":"M7 12v4"}]],"cinema":[["path",{"d":"M14 22a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2"}],["path",{"d":"M15.03 8.44a.65.65 0 0 1 0 1.12l-4.06 2.35a.64.64 0 0 1-.97-.56v-4.7a.647.647 0 0 1 .96-.56z"}],["path",{"d":"M2 22a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2"}],["rect",{"x":"2","y":"2","width":"20","height":"14","rx":"2"}]],"circle-arrow-down-left-exit":[["path",{"d":"M2 12a10 10 0 1 1 10 10"}],["path",{"d":"m2 22 10-10"}],["path",{"d":"M8 22H2v-6"}]],"circle-arrow-down-right-exit":[["path",{"d":"M12 22a10 10 0 1 1 10-10"}],["path",{"d":"M22 22 12 12"}],["path",{"d":"M22 16v6h-6"}]],"circle-arrow-down":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 8v8"}],["path",{"d":"m8 12 4 4 4-4"}]],"circle-arrow-left":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m12 8-4 4 4 4"}],["path",{"d":"M16 12H8"}]],"circle-arrow-right":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m12 16 4-4-4-4"}],["path",{"d":"M8 12h8"}]],"circle-arrow-up-left-exit":[["path",{"d":"M2 8V2h6"}],["path",{"d":"m2 2 10 10"}],["path",{"d":"M12 2A10 10 0 1 1 2 12"}]],"circle-arrow-up-right-exit":[["path",{"d":"M22 12A10 10 0 1 1 12 2"}],["path",{"d":"M22 2 12 12"}],["path",{"d":"M16 2h6v6"}]],"circle-arrow-up":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m16 12-4-4-4 4"}],["path",{"d":"M12 16V8"}]],"circle-bounce":[["path",{"d":"M2 13c2.5.5 5 4 5 8 0-2.16 1.813-7.536 6-11.293"}],["circle",{"cx":"19","cy":"6","r":"3"}]],"circle-check-big":[["path",{"d":"M21.801 10A10 10 0 1 1 17 3.335"}],["path",{"d":"m9 11 3 3L22 4"}]],"circle-check":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m16 9-5.5 5.5L8 12"}]],"circle-chevron-down":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m16 10-4 4-4-4"}]],"circle-chevron-left":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m14 16-4-4 4-4"}]],"circle-chevron-right":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m10 8 4 4-4 4"}]],"circle-chevron-up":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m8 14 4-4 4 4"}]],"circle-chevrons-down":[["path",{"d":"M9 14L12 17L15 14"}],["path",{"d":"M9 8L12 11L15 8"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-chevrons-left":[["path",{"d":"M10 9L7 12L10 15"}],["path",{"d":"M16 9L13 12L16 15"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-chevrons-right":[["path",{"d":"M14 15L17 12L14 9"}],["path",{"d":"M8 15L11 12L8 9"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-chevrons-up":[["path",{"d":"M15 10L12 7L9 10"}],["path",{"d":"M15 16L12 13L9 16"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-dashed-check":[["path",{"d":"M10.1 2.182a10 10 0 013.8 0"}],["path",{"d":"M13.9 21.818a10 10 0 01-3.8 0"}],["path",{"d":"m16 9-5.5 5.5L8 12"}],["path",{"d":"M17.609 3.721a10 10 0 012.69 2.7"}],["path",{"d":"M2.182 13.9a10 10 0 010-3.8"}],["path",{"d":"M20.279 17.609a10 10 0 01-2.7 2.69"}],["path",{"d":"M21.818 10.1a10 10 0 010 3.8"}],["path",{"d":"M3.721 6.391a10 10 0 012.7-2.69"}],["path",{"d":"M6.391 20.279a10 10 0 01-2.69-2.7"}]],"circle-dashed":[["path",{"d":"M10.1 2.182a10 10 0 0 1 3.8 0"}],["path",{"d":"M13.9 21.818a10 10 0 0 1-3.8 0"}],["path",{"d":"M17.609 3.721a10 10 0 0 1 2.69 2.7"}],["path",{"d":"M2.182 13.9a10 10 0 0 1 0-3.8"}],["path",{"d":"M20.279 17.609a10 10 0 0 1-2.7 2.69"}],["path",{"d":"M21.818 10.1a10 10 0 0 1 0 3.8"}],["path",{"d":"M3.721 6.391a10 10 0 0 1 2.7-2.69"}],["path",{"d":"M6.391 20.279a10 10 0 0 1-2.69-2.7"}]],"circle-divide":[["circle",{"cx":"12","cy":"12","r":"10"}],["line",{"x1":"8","x2":"16","y1":"12","y2":"12"}],["line",{"x1":"12","x2":"12","y1":"16","y2":"16"}],["line",{"x1":"12","x2":"12","y1":"8","y2":"8"}]],"circle-dollar-sign":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"}],["path",{"d":"M12 18V6"}]],"circle-dot-dashed":[["path",{"d":"M10.1 2.18a9.93 9.93 0 0 1 3.8 0"}],["path",{"d":"M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7"}],["path",{"d":"M21.82 10.1a9.93 9.93 0 0 1 0 3.8"}],["path",{"d":"M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69"}],["path",{"d":"M13.9 21.82a9.94 9.94 0 0 1-3.8 0"}],["path",{"d":"M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7"}],["path",{"d":"M2.18 13.9a9.93 9.93 0 0 1 0-3.8"}],["path",{"d":"M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69"}],["circle",{"cx":"12","cy":"12","r":"1"}]],"circle-dot":[["circle",{"cx":"12","cy":"12","r":"1"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-ellipsis":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M17 12h.01"}],["path",{"d":"M12 12h.01"}],["path",{"d":"M7 12h.01"}]],"circle-equal":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M7 10h10"}],["path",{"d":"M7 14h10"}]],"circle-euro":[["path",{"d":"M15 9.4a4 4 0 1 0 0 5.2"}],["path",{"d":"M7 12h5"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-exclamation-point":[["circle",{"cx":"12","cy":"12","r":"10"}],["line",{"x1":"12","x2":"12","y1":"8","y2":"12"}],["line",{"x1":"12","x2":"12.01","y1":"16","y2":"16"}]],"circle-fading-arrow-up":[["path",{"d":"M12 2a10 10 0 0 1 7.38 16.75"}],["path",{"d":"m16 12-4-4-4 4"}],["path",{"d":"M12 16V8"}],["path",{"d":"M2.5 8.875a10 10 0 0 0-.5 3"}],["path",{"d":"M2.83 16a10 10 0 0 0 2.43 3.4"}],["path",{"d":"M4.636 5.235a10 10 0 0 1 .891-.857"}],["path",{"d":"M8.644 21.42a10 10 0 0 0 7.631-.38"}]],"circle-fading-check":[["path",{"d":"M12 2a10 10 0 017.38 16.75"}],["path",{"d":"m16 9-5.5 5.5L8 12"}],["path",{"d":"M2.5 8.875a10 10 0 00-.5 3"}],["path",{"d":"M2.83 16a10 10 0 002.43 3.4"}],["path",{"d":"M4.636 5.235a10 10 0 01.891-.857"}],["path",{"d":"M8.644 21.42a10 10 0 007.631-.38"}]],"circle-fading-play":[["path",{"d":"M12 2a10 10 0 0 1 7.38 16.75"}],["path",{"d":"M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"}],["path",{"d":"M2.5 8.875a10 10 0 0 0-.5 3"}],["path",{"d":"M2.83 16a10 10 0 0 0 2.43 3.4"}],["path",{"d":"M4.636 5.235a10 10 0 0 1 .891-.857"}],["path",{"d":"M8.644 21.42a10 10 0 0 0 7.631-.38"}]],"circle-fading-plus":[["path",{"d":"M12 2a10 10 0 0 1 7.38 16.75"}],["path",{"d":"M12 8v8"}],["path",{"d":"M16 12H8"}],["path",{"d":"M2.5 8.875a10 10 0 0 0-.5 3"}],["path",{"d":"M2.83 16a10 10 0 0 0 2.43 3.4"}],["path",{"d":"M4.636 5.235a10 10 0 0 1 .891-.857"}],["path",{"d":"M8.644 21.42a10 10 0 0 0 7.631-.38"}]],"circle-gauge":[["path",{"d":"M15.6 2.7a10 10 0 1 0 5.7 5.7"}],["circle",{"cx":"12","cy":"12","r":"2"}],["path",{"d":"M13.4 10.6 19 5"}]],"circle-letter-a":[["path",{"d":"M15 14H9"}],["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m8 16 3.453-7.648a.6.6 0 0 1 1.094 0L16 16"}]],"circle-letter-b":[["path",{"d":"M9 12h4.846a2.24 2.24 0 011.523.586 2 2 0 01.001 2.828 2.24 2.24 0 01-1.524.586H9.5a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5H13a2 2 0 010 4"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-c":[["path",{"d":"M15 9.354a4 4 0 1 0 0 5.292"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-d":[["path",{"d":"M12 8a4 4 0 010 8H9.412A.41.41 0 019 15.588V8.412A.41.41 0 019.412 8z"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-e":[["path",{"d":"M15 8H9.5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5H15"}],["path",{"d":"M9 12h4"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-f":[["path",{"d":"M9 16V8.5a.5.5 0 0 1 .5-.5H15"}],["path",{"d":"M9 12h4"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-g":[["path",{"d":"M12.5 12H15v2.268a.88.88 0 01-.263.65A4 4 0 1112 8h2.5"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-h":[["path",{"d":"M9 16V8"}],["path",{"d":"M15 16V8"}],["path",{"d":"M9 12h6"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-i":[["path",{"d":"M12 16V8"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-j":[["path",{"d":"M14 8v5.5a1 1 0 01-5 0V13"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-k":[["path",{"d":"M9 16V8"}],["path",{"d":"m11 12 4 4"}],["path",{"d":"m15 8-6 6"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-l":[["path",{"d":"M9 8v7.5a.5.5 0 0 0 .5.5H15"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-m":[["path",{"d":"M8 16.001v-7.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3v7.501"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-n":[["path",{"d":"M9 16V8.576a.496.496 0 01.937-.243l4.126 7.43A.496.496 0 0015 15.52V8"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-o":[["circle",{"cx":"12","cy":"12","r":"4"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-p-off":[["path",{"d":"M12 12h1a2 2 0 000-4H9.5a.5.5 0 00-.5.5V9"}],["path",{"d":"M15.652 21.31A10 10 0 012.691 8.348"}],["path",{"d":"M22 22 2 2"}],["path",{"d":"M4.929 4.929a10 10 0 0116.729 4.483 10 10 0 01-2.588 9.658"}],["path",{"d":"M9 14.657V16"}]],"circle-letter-p":[["path",{"d":"M9 12h4a2 2 0 0 0 0-4H9.5a.5.5 0 0 0-.5.5V16"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-q":[["circle",{"cx":"12","cy":"12","r":"4"}],["path",{"d":"m16 16-2.5-2.5"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-r":[["path",{"d":"m11 12 4 4"}],["path",{"d":"M9 12h4a2 2 0 0 0 0-4H9.5a.5.5 0 0 0-.5.5V16"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-s":[["path",{"d":"M14.5 8H11a2 2 0 100 4h2a2 2 0 110 4H9"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-t":[["path",{"d":"M12 16V8"}],["path",{"d":"M9 8h6"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-u":[["path",{"d":"M15 8v5a3 3 0 1 1-6 0V8"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-v":[["path",{"d":"m9 8 2.525 7.66a.5.5 0 0 0 .95 0L15 8"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-w":[["path",{"d":"m16 8-1.591 7.598a.497.497 0 01-.97.038l-.96-3.276a.5.5 0 00-.959 0l-.96 3.276a.496.496 0 01-.969-.038L8 8"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-x":[["path",{"d":"m9 16 6-8"}],["path",{"d":"m9 8 6 8"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-y":[["path",{"d":"m9 8 3 4 3-4"}],["path",{"d":"M12 12v4"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-letter-z":[["path",{"d":"M9 8h5.501a.5.5 0 0 1 .37.836L9.13 15.164A.5.5 0 0 0 9.5 16H15"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-minus":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M8 12h8"}]],"circle-off":[["path",{"d":"m2 2 20 20"}],["path",{"d":"M8.35 2.69A10 10 0 0 1 21.3 15.65"}],["path",{"d":"M19.08 19.08A10 10 0 1 1 4.92 4.92"}]],"circle-pause":[["circle",{"cx":"12","cy":"12","r":"10"}],["line",{"x1":"10","x2":"10","y1":"15","y2":"9"}],["line",{"x1":"14","x2":"14","y1":"15","y2":"9"}]],"circle-percent":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m15 9-6 6"}],["path",{"d":"M9 9h.01"}],["path",{"d":"M15 15h.01"}]],"circle-person-arms-spread":[["path",{"d":"m15 17-3-3"}],["path",{"d":"M8 10s2 1 4 1 4-1 4-1"}],["path",{"d":"m9 17 3-3v-3"}],["circle",{"cx":"12","cy":"12","r":"10"}],["circle",{"cx":"12","cy":"7","r":".5","fill":"currentColor"}]],"circle-pile":[["circle",{"cx":"12","cy":"19","r":"2"}],["circle",{"cx":"12","cy":"5","r":"2"}],["circle",{"cx":"16","cy":"12","r":"2"}],["circle",{"cx":"20","cy":"19","r":"2"}],["circle",{"cx":"4","cy":"19","r":"2"}],["circle",{"cx":"8","cy":"12","r":"2"}]],"circle-play":[["path",{"d":"M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-plus":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M8 12h8"}],["path",{"d":"M12 8v8"}]],"circle-pound-sterling":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M10 16V9.5a1 1 0 0 1 5 0"}],["path",{"d":"M8 12h4"}],["path",{"d":"M8 16h7"}]],"circle-power":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 7v4"}],["path",{"d":"M7.998 9.003a5 5 0 1 0 8-.005"}]],"circle-question-mark":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5"}],["path",{"d":"M12 17h.01"}]],"circle-slash-2":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M22 2 2 22"}]],"circle-slash":[["circle",{"cx":"12","cy":"12","r":"10"}],["line",{"x1":"9","x2":"15","y1":"15","y2":"9"}]],"circle-small":[["circle",{"cx":"12","cy":"12","r":"6"}]],"circle-star":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"}]],"circle-stop":[["circle",{"cx":"12","cy":"12","r":"10"}],["rect",{"x":"9","y":"9","width":"6","height":"6","rx":"1"}]],"circle-user-round":[["path",{"d":"M17.925 20.056a6 6 0 0 0-11.851.001"}],["circle",{"cx":"12","cy":"11","r":"4"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"circle-user":[["circle",{"cx":"12","cy":"12","r":"10"}],["circle",{"cx":"12","cy":"10","r":"3"}],["path",{"d":"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"}]],"circle-x":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m15 9-6 6"}],["path",{"d":"m9 9 6 6"}]],"circle":[["circle",{"cx":"12","cy":"12","r":"10"}]],"circuit-board":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M11 9h4a2 2 0 0 0 2-2V3"}],["circle",{"cx":"9","cy":"9","r":"2"}],["path",{"d":"M7 21v-4a2 2 0 0 1 2-2h4"}],["circle",{"cx":"15","cy":"15","r":"2"}]],"citrus":[["path",{"d":"M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z"}],["path",{"d":"M19.65 15.66A8 8 0 0 1 8.35 4.34"}],["path",{"d":"m14 10-5.5 5.5"}],["path",{"d":"M14 17.85V10H6.15"}]],"clapperboard":[["path",{"d":"m12.296 3.464 3.02 3.956"}],["path",{"d":"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z"}],["path",{"d":"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}],["path",{"d":"m6.18 5.276 3.1 3.899"}]],"clef-alto":[["path",{"d":"M10 4v16"}],["path",{"d":"M14 4.764a3 3 0 1 1-.152 4.327A4 4 0 0 1 10 12a4 4 0 0 1 3.848 2.909A3 3 0 1 1 14 19.236"}],["path",{"d":"M6 4v16"}]],"clef-bass":[["path",{"d":"M19 11h.01"}],["path",{"d":"M19 6h.01"}],["path",{"d":"M5 8c0-4 4-4 4-4 6 0 6 6 6 6 0 7-10 11-10 11"}],["circle",{"cx":"7","cy":"8","r":"2"}]],"clef-treble":[["path",{"d":"M10.586 21.414a2 2 0 0 0 3.378-1.791L11.036 4.377a2 2 0 1 1 3.378 1.037C12.414 7.414 7 8 7 13a5 5 0 0 0 5 5 5 4 0 0 0 5-4 3 3 0 0 0-3-3 3 2 0 0 0-3 2"}]],"clipboard-check":[["rect",{"width":"8","height":"4","x":"8","y":"2","rx":"1","ry":"1"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{"d":"m9 14 2 2 4-4"}]],"clipboard-clock":[["path",{"d":"M16 14v2.2l1.6 1"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v.832"}],["path",{"d":"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2"}],["circle",{"cx":"16","cy":"16","r":"6"}],["rect",{"x":"8","y":"2","width":"8","height":"4","rx":"1"}]],"clipboard-copy":[["rect",{"width":"8","height":"4","x":"8","y":"2","rx":"1","ry":"1"}],["path",{"d":"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v4"}],["path",{"d":"M21 14H11"}],["path",{"d":"m15 10-4 4 4 4"}]],"clipboard-list":[["rect",{"width":"8","height":"4","x":"8","y":"2","rx":"1","ry":"1"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{"d":"M12 11h4"}],["path",{"d":"M12 16h4"}],["path",{"d":"M8 11h.01"}],["path",{"d":"M8 16h.01"}]],"clipboard-minus":[["rect",{"width":"8","height":"4","x":"8","y":"2","rx":"1","ry":"1"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{"d":"M9 14h6"}]],"clipboard-paste":[["path",{"d":"M11 14h10"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v1.344"}],["path",{"d":"m17 18 4-4-4-4"}],["path",{"d":"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"}],["rect",{"x":"8","y":"2","width":"8","height":"4","rx":"1"}]],"clipboard-pen-line":[["rect",{"width":"8","height":"4","x":"8","y":"2","rx":"1"}],["path",{"d":"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5"}],["path",{"d":"M16 4h2a2 2 0 0 1 1.73 1"}],["path",{"d":"M8 18h1"}],["path",{"d":"M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"}]],"clipboard-pen":[["path",{"d":"M16 4h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21.34 15.664a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"}],["path",{"d":"M8 22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["rect",{"x":"8","y":"2","width":"8","height":"4","rx":"1"}]],"clipboard-plus":[["rect",{"width":"8","height":"4","x":"8","y":"2","rx":"1","ry":"1"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{"d":"M9 14h6"}],["path",{"d":"M12 17v-6"}]],"clipboard-type":[["rect",{"width":"8","height":"4","x":"8","y":"2","rx":"1","ry":"1"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{"d":"M9 12v-1h6v1"}],["path",{"d":"M11 17h2"}],["path",{"d":"M12 11v6"}]],"clipboard-x":[["rect",{"width":"8","height":"4","x":"8","y":"2","rx":"1","ry":"1"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}],["path",{"d":"m14.5 11.5-5 5"}],["path",{"d":"m9.5 11.5 5 5"}]],"clipboard":[["rect",{"width":"8","height":"4","x":"8","y":"2","rx":"1","ry":"1"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"}]],"clock-1":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6l2-4"}]],"clock-10":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6l-4-2"}]],"clock-11":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6l-2-4"}]],"clock-12":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6"}]],"clock-2":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6l4-2"}]],"clock-3":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6h4"}]],"clock-4":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6l4 2"}]],"clock-5":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6l2 4"}]],"clock-6":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v10"}]],"clock-7":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6l-2 4"}]],"clock-8":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6l-4 2"}]],"clock-9":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6H8"}]],"clock-arrow-down":[["path",{"d":"M12 6v6l2 1"}],["path",{"d":"M12.337 21.994a10 10 0 1 1 9.588-8.767"}],["path",{"d":"m14 18 4 4 4-4"}],["path",{"d":"M18 14v8"}]],"clock-arrow-left":[["path",{"d":"M12 6v6l1.5.8"}],["path",{"d":"M12.338 21.994a10 10 0 1 1 9.587-8.767"}],["path",{"d":"M14 18h8"}],["path",{"d":"m18 22-4-4 4-4"}]],"clock-arrow-right":[["path",{"d":"M12 6v6l2 1"}],["path",{"d":"M13.5 21.885A10 10 0 1 1 22 12"}],["path",{"d":"M14 18h8"}],["path",{"d":"m18 22 4-4-4-4"}]],"clock-arrow-up":[["path",{"d":"M12 6v6l1.56.78"}],["path",{"d":"M13.227 21.925a10 10 0 1 1 8.767-9.588"}],["path",{"d":"m14 18 4-4 4 4"}],["path",{"d":"M18 22v-8"}]],"clock-check":[["path",{"d":"M21.95 13a10 10 0 1 0-8.685 8.92"}],["path",{"d":"M12 6v6l4 2"}],["path",{"d":"m16 19 2 2 4-4"}]],"clock-exclamation-point":[["path",{"d":"M12 6v6l4 2"}],["path",{"d":"M20 12v5"}],["path",{"d":"M20 21h.01"}],["path",{"d":"M21.25 8.2A10 10 0 1 0 16 21.16"}]],"clock-fading":[["path",{"d":"M12 2a10 10 0 0 1 7.38 16.75"}],["path",{"d":"M12 6v6l4 2"}],["path",{"d":"M2.5 8.875a10 10 0 0 0-.5 3"}],["path",{"d":"M2.83 16a10 10 0 0 0 2.43 3.4"}],["path",{"d":"M4.636 5.235a10 10 0 0 1 .891-.857"}],["path",{"d":"M8.644 21.42a10 10 0 0 0 7.631-.38"}]],"clock-plus":[["path",{"d":"M12 6v6l3.644 1.822"}],["path",{"d":"M16 19h6"}],["path",{"d":"M19 16v6"}],["path",{"d":"M21.92 13.267a10 10 0 1 0-8.653 8.653"}]],"clock":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 6v6l4 2"}]],"closed-caption":[["path",{"d":"M10 9.17a3 3 0 1 0 0 5.66"}],["path",{"d":"M17 9.17a3 3 0 1 0 0 5.66"}],["rect",{"x":"2","y":"5","width":"20","height":"14","rx":"2"}]],"cloud-backup":[["path",{"d":"M21 15.251A4.5 4.5 0 0 0 17.5 8h-1.79A7 7 0 1 0 3 13.607"}],["path",{"d":"M7 11v4h4"}],["path",{"d":"M8 19a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5 4.82 4.82 0 0 0-3.41 1.41L7 15"}]],"cloud-check":[["path",{"d":"m17 15-5.5 5.5L9 18"}],["path",{"d":"M5.516 16.07A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 3.501 7.327"}]],"cloud-cog":[["path",{"d":"m10.852 19.772-.383.924"}],["path",{"d":"m13.148 14.228.383-.923"}],["path",{"d":"M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923"}],["path",{"d":"m13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544"}],["path",{"d":"m14.772 15.852.923-.383"}],["path",{"d":"m14.772 18.148.923.383"}],["path",{"d":"M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2"}],["path",{"d":"m9.228 15.852-.923-.383"}],["path",{"d":"m9.228 18.148-.923.383"}]],"cloud-download":[["path",{"d":"M12 13v8l-4-4"}],["path",{"d":"m12 21 4-4"}],["path",{"d":"M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"}]],"cloud-drizzle":[["path",{"d":"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{"d":"M8 19v1"}],["path",{"d":"M8 14v1"}],["path",{"d":"M16 19v1"}],["path",{"d":"M16 14v1"}],["path",{"d":"M12 21v1"}],["path",{"d":"M12 16v1"}]],"cloud-exclamation-point":[["path",{"d":"M12 12v4"}],["path",{"d":"M12 20h.01"}],["path",{"d":"M8.128 16.949A7 7 0 1 1 15.71 8h1.79a1 1 0 0 1 0 9h-1.642"}]],"cloud-fog":[["path",{"d":"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{"d":"M16 17H7"}],["path",{"d":"M17 21H9"}]],"cloud-hail":[["path",{"d":"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{"d":"M16 14v2"}],["path",{"d":"M8 14v2"}],["path",{"d":"M16 20h.01"}],["path",{"d":"M8 20h.01"}],["path",{"d":"M12 16v2"}],["path",{"d":"M12 22h.01"}]],"cloud-lightning":[["path",{"d":"M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"}],["path",{"d":"m13 12-3 5h4l-3 5"}]],"cloud-moon-rain":[["path",{"d":"M11 20v2"}],["path",{"d":"M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36"}],["path",{"d":"M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"}],["path",{"d":"M7 19v2"}]],"cloud-moon":[["path",{"d":"M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z"}],["path",{"d":"M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36"}]],"cloud-off":[["path",{"d":"M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057"}],["path",{"d":"M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78"}],["path",{"d":"m2 2 20 20"}]],"cloud-rain-wind":[["path",{"d":"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{"d":"m9.2 22 3-7"}],["path",{"d":"m9 13-3 7"}],["path",{"d":"m17 13-3 7"}]],"cloud-rain":[["path",{"d":"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{"d":"M16 14v6"}],["path",{"d":"M8 14v6"}],["path",{"d":"M12 16v6"}]],"cloud-snow":[["path",{"d":"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{"d":"M8 15h.01"}],["path",{"d":"M8 19h.01"}],["path",{"d":"M12 17h.01"}],["path",{"d":"M12 21h.01"}],["path",{"d":"M16 15h.01"}],["path",{"d":"M16 19h.01"}]],"cloud-sun-rain":[["path",{"d":"M12 2v2"}],["path",{"d":"m4.93 4.93 1.41 1.41"}],["path",{"d":"M20 12h2"}],["path",{"d":"m19.07 4.93-1.41 1.41"}],["path",{"d":"M15.947 12.65a4 4 0 0 0-5.925-4.128"}],["path",{"d":"M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24"}],["path",{"d":"M11 20v2"}],["path",{"d":"M7 19v2"}]],"cloud-sun":[["path",{"d":"M12 2v2"}],["path",{"d":"m4.93 4.93 1.41 1.41"}],["path",{"d":"M20 12h2"}],["path",{"d":"m19.07 4.93-1.41 1.41"}],["path",{"d":"M15.947 12.65a4 4 0 0 0-5.925-4.128"}],["path",{"d":"M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"}]],"cloud-sync":[["path",{"d":"m17 18-1.535 1.605a5 5 0 0 1-8-1.5"}],["path",{"d":"M17 22v-4h-4"}],["path",{"d":"M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607"}],["path",{"d":"M7 10v4h4"}],["path",{"d":"m7 14 1.535-1.605a5 5 0 0 1 8 1.5"}]],"cloud-upload":[["path",{"d":"M12 13v8"}],["path",{"d":"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"}],["path",{"d":"m8 17 4-4 4 4"}]],"cloud":[["path",{"d":"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"}]],"cloudy":[["path",{"d":"M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z"}],["path",{"d":"M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61"}]],"clover":[["path",{"d":"M16.17 7.83 2 22"}],["path",{"d":"M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12"}],["path",{"d":"m7.83 7.83 8.34 8.34"}]],"club":[["path",{"d":"M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z"}],["path",{"d":"M12 17.66L12 22"}]],"code-xml":[["path",{"d":"m18 16 4-4-4-4"}],["path",{"d":"m6 8-4 4 4 4"}],["path",{"d":"m14.5 4-5 16"}]],"code":[["path",{"d":"m16 18 6-6-6-6"}],["path",{"d":"m8 6-6 6 6 6"}]],"coffee":[["path",{"d":"M10 2v2"}],["path",{"d":"M14 2v2"}],["path",{"d":"M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"}],["path",{"d":"M6 2v2"}]],"cog":[["path",{"d":"M11 10.27 7 3.34"}],["path",{"d":"m11 13.73-4 6.93"}],["path",{"d":"M12 22v-2"}],["path",{"d":"M12 2v2"}],["path",{"d":"M14 12h8"}],["path",{"d":"m17 20.66-1-1.73"}],["path",{"d":"m17 3.34-1 1.73"}],["path",{"d":"M2 12h2"}],["path",{"d":"m20.66 17-1.73-1"}],["path",{"d":"m20.66 7-1.73 1"}],["path",{"d":"m3.34 17 1.73-1"}],["path",{"d":"m3.34 7 1.73 1"}],["circle",{"cx":"12","cy":"12","r":"2"}],["circle",{"cx":"12","cy":"12","r":"8"}]],"coins":[["path",{"d":"M13.744 17.736a6 6 0 1 1-7.48-7.48"}],["path",{"d":"M15 6h1v4"}],["path",{"d":"m6.134 14.768.866-.5 2 3.464"}],["circle",{"cx":"16","cy":"8","r":"6"}]],"columns-2":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M12 3v18"}]],"columns-3-cog":[["path",{"d":"M10.6 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v5.6"}],["path",{"d":"m14.305 19.53.923-.382"}],["path",{"d":"M15 3v7.6"}],["path",{"d":"m15.229 16.852-.924-.383"}],["path",{"d":"m16.852 15.228-.383-.923"}],["path",{"d":"m16.852 20.772-.383.924"}],["path",{"d":"m19.148 15.228.383-.923"}],["path",{"d":"m19.53 21.696-.382-.924"}],["path",{"d":"m20.773 16.852.922-.383"}],["path",{"d":"m20.773 19.148.922.383"}],["path",{"d":"M9 3v18"}],["circle",{"cx":"18","cy":"18","r":"3"}]],"columns-3":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M9 3v18"}],["path",{"d":"M15 3v18"}]],"columns-4":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M7.5 3v18"}],["path",{"d":"M12 3v18"}],["path",{"d":"M16.5 3v18"}]],"combine":[["path",{"d":"M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1"}],["path",{"d":"M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1"}],["path",{"d":"m7 15 3 3"}],["path",{"d":"m7 21 3-3H5a2 2 0 0 1-2-2v-2"}],["rect",{"x":"14","y":"14","width":"7","height":"7","rx":"1"}],["rect",{"x":"3","y":"3","width":"7","height":"7","rx":"1"}]],"command":[["path",{"d":"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"}]],"compass":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"}]],"component":[["path",{"d":"M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"}],["path",{"d":"M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z"}],["path",{"d":"M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z"}],["path",{"d":"M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"}]],"computer":[["path",{"d":"M12 18h6"}],["path",{"d":"M6 18h.01"}],["path",{"d":"M8 6h1"}],["rect",{"x":"2","y":"14","width":"20","height":"8","rx":"2"}],["rect",{"x":"4","y":"2","width":"16","height":"12","rx":"2"}]],"concierge-bell":[["path",{"d":"M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z"}],["path",{"d":"M20 16a8 8 0 1 0-16 0"}],["path",{"d":"M12 4v4"}],["path",{"d":"M10 4h4"}]],"cone":[["path",{"d":"m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98"}],["ellipse",{"cx":"12","cy":"19","rx":"9","ry":"3"}]],"construction":[["rect",{"x":"2","y":"6","width":"20","height":"8","rx":"1"}],["path",{"d":"M17 14v7"}],["path",{"d":"M7 14v7"}],["path",{"d":"M17 3v3"}],["path",{"d":"M7 3v3"}],["path",{"d":"M10 14 2.3 6.3"}],["path",{"d":"m14 6 7.7 7.7"}],["path",{"d":"m8 6 8 8"}]],"contact-round":[["path",{"d":"M16 2v2"}],["path",{"d":"M17.915 21a6 6 0 10-12 0"}],["path",{"d":"M8 2v2"}],["circle",{"cx":"12","cy":"11","r":"4"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"contact":[["path",{"d":"M16 2v2"}],["path",{"d":"M7 21v-2a2 2 0 012-2h6a2 2 0 012 2v2"}],["path",{"d":"M8 2v2"}],["circle",{"cx":"12","cy":"10","r":"3"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"container":[["path",{"d":"M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"}],["path",{"d":"M10 21.9V14L2.1 9.1"}],["path",{"d":"m10 14 11.9-6.9"}],["path",{"d":"M14 19.8v-8.1"}],["path",{"d":"M18 17.5V9.4"}]],"contrast":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 18a6 6 0 0 0 0-12v12z"}]],"cookie":[["path",{"d":"M11 17h.01"}],["path",{"d":"M11.496 2c.324-.016.558.292.529.615a4 4 0 004.235 4.368.713.713 0 01.758.757 4 4 0 004.366 4.237c.323-.03.63.204.614.527a10 10 0 01-2.915 6.566A1 1 0 114.93 4.918 10 10 0 0111.496 2"}],["path",{"d":"M12 12h.01"}],["path",{"d":"M16 16h.01"}],["path",{"d":"M16 3h.01"}],["path",{"d":"M21 4h.01"}],["path",{"d":"M21 8h.01"}],["path",{"d":"M7 14h.01"}],["path",{"d":"M9 8h.01"}]],"cooking-pot":[["path",{"d":"M2 12h20"}],["path",{"d":"M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"}],["path",{"d":"m4 8 16-4"}],["path",{"d":"m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"}]],"copy-check":[["path",{"d":"m12 15 2 2 4-4"}],["rect",{"width":"14","height":"14","x":"8","y":"8","rx":"2","ry":"2"}],["path",{"d":"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]],"copy-minus":[["line",{"x1":"12","x2":"18","y1":"15","y2":"15"}],["rect",{"width":"14","height":"14","x":"8","y":"8","rx":"2","ry":"2"}],["path",{"d":"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]],"copy-plus":[["line",{"x1":"15","x2":"15","y1":"12","y2":"18"}],["line",{"x1":"12","x2":"18","y1":"15","y2":"15"}],["rect",{"width":"14","height":"14","x":"8","y":"8","rx":"2","ry":"2"}],["path",{"d":"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]],"copy-slash":[["line",{"x1":"12","x2":"18","y1":"18","y2":"12"}],["rect",{"width":"14","height":"14","x":"8","y":"8","rx":"2","ry":"2"}],["path",{"d":"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]],"copy-x":[["path",{"d":"M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"}],["rect",{"x":"8","y":"8","width":"14","height":"14","rx":"2"}],["path",{"d":"m12.5 12.5 5 5"}],["path",{"d":"m12.5 17.5 5-5"}]],"copy":[["rect",{"width":"14","height":"14","x":"8","y":"8","rx":"2","ry":"2"}],["path",{"d":"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]],"copyleft":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M9.17 14.83a4 4 0 1 0 0-5.66"}]],"corner-down-left":[["path",{"d":"M20 4v7a4 4 0 0 1-4 4H4"}],["path",{"d":"m9 10-5 5 5 5"}]],"corner-down-right":[["path",{"d":"m15 10 5 5-5 5"}],["path",{"d":"M4 4v7a4 4 0 0 0 4 4h12"}]],"corner-left-down":[["path",{"d":"m14 15-5 5-5-5"}],["path",{"d":"M20 4h-7a4 4 0 0 0-4 4v12"}]],"corner-left-up":[["path",{"d":"M14 9 9 4 4 9"}],["path",{"d":"M20 20h-7a4 4 0 0 1-4-4V4"}]],"corner-right-down":[["path",{"d":"m10 15 5 5 5-5"}],["path",{"d":"M4 4h7a4 4 0 0 1 4 4v12"}]],"corner-right-up":[["path",{"d":"m10 9 5-5 5 5"}],["path",{"d":"M4 20h7a4 4 0 0 0 4-4V4"}]],"corner-up-left":[["path",{"d":"M20 20v-7a4 4 0 0 0-4-4H4"}],["path",{"d":"M9 14 4 9l5-5"}]],"corner-up-right":[["path",{"d":"m15 14 5-5-5-5"}],["path",{"d":"M4 20v-7a4 4 0 0 1 4-4h12"}]],"cpu-ai":[["path",{"d":"M12 20v2"}],["path",{"d":"M12 2v2"}],["path",{"d":"M16 9v6"}],["path",{"d":"M17 20v2"}],["path",{"d":"M17 2v2"}],["path",{"d":"M2 12h2"}],["path",{"d":"M2 17h2"}],["path",{"d":"M2 7h2"}],["path",{"d":"M20 12h2"}],["path",{"d":"M20 17h2"}],["path",{"d":"M20 7h2"}],["path",{"d":"M7 20v2"}],["path",{"d":"M7 2v2"}],["path",{"d":"M8 13h4"}],["path",{"d":"M8 15v-4a2 2 0 014 0v4"}],["rect",{"x":"4","y":"4","width":"16","height":"16","rx":"2"}]],"cpu":[["path",{"d":"M12 20v2"}],["path",{"d":"M12 2v2"}],["path",{"d":"M17 20v2"}],["path",{"d":"M17 2v2"}],["path",{"d":"M2 12h2"}],["path",{"d":"M2 17h2"}],["path",{"d":"M2 7h2"}],["path",{"d":"M20 12h2"}],["path",{"d":"M20 17h2"}],["path",{"d":"M20 7h2"}],["path",{"d":"M7 20v2"}],["path",{"d":"M7 2v2"}],["rect",{"x":"4","y":"4","width":"16","height":"16","rx":"2"}],["rect",{"x":"8","y":"8","width":"8","height":"8","rx":"1"}]],"creative-commons":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M10 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1"}],["path",{"d":"M17 9.3a2.8 2.8 0 0 0-3.5 1 3.1 3.1 0 0 0 0 3.4 2.7 2.7 0 0 0 3.5 1"}]],"credit-card-check":[["path",{"d":"M12.5 19H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v4"}],["path",{"d":"M2 10h20"}],["path",{"d":"M6 14h2"}],["path",{"d":"m16 17 2 2 4-4"}]],"credit-card-minus":[["path",{"d":"M22 13V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h8.536"}],["path",{"d":"M22 10H2"}],["path",{"d":"M6 14h2"}],["path",{"d":"M16 17h6"}]],"credit-card-plus":[["path",{"d":"M22 11.354V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h8.536"}],["path",{"d":"M22 10H2"}],["path",{"d":"M6 14h2"}],["path",{"d":"M16 17h6"}],["path",{"d":"M19 14v6"}]],"credit-card-reader":[["path",{"d":"M15 16v1"}],["path",{"d":"M16.963 7.734A1 1 0 0015.999 7H8.003a1 1 0 00-.964.734L4.073 18.467A2 2 0 006 21h12a2 2 0 001.927-2.532z"}],["path",{"d":"M2.678 8.5A2 2 0 012 7V5a2 2 0 012-2h16a2 2 0 012 2v2a2 2 0 01-.676 1.499"}],["path",{"d":"m9 21 2-14"}]],"credit-card-x":[["path",{"d":"M12.5 19H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v3.5"}],["path",{"d":"M2 10h20"}],["path",{"d":"M6 14h2"}],["path",{"d":"m16.5 14.5 5 5"}],["path",{"d":"m21.5 14.5-5 5"}]],"credit-card":[["rect",{"width":"20","height":"14","x":"2","y":"5","rx":"2"}],["line",{"x1":"2","x2":"22","y1":"10","y2":"10"}],["path",{"d":"M6 14h2"}]],"croissant":[["path",{"d":"M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487"}],["path",{"d":"M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132"}],["path",{"d":"M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42"}],["path",{"d":"M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14"}],["path",{"d":"M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676"}]],"crop":[["path",{"d":"M6 2v14a2 2 0 0 0 2 2h14"}],["path",{"d":"M18 22V8a2 2 0 0 0-2-2H2"}]],"cross":[["path",{"d":"M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"}]],"crosshair":[["circle",{"cx":"12","cy":"12","r":"10"}],["line",{"x1":"22","x2":"18","y1":"12","y2":"12"}],["line",{"x1":"6","x2":"2","y1":"12","y2":"12"}],["line",{"x1":"12","x2":"12","y1":"6","y2":"2"}],["line",{"x1":"12","x2":"12","y1":"22","y2":"18"}]],"crown":[["path",{"d":"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"}],["path",{"d":"M5 21h14"}]],"cuboid":[["path",{"d":"M10 22v-8"}],["path",{"d":"M2.336 8.89 10 14l11.715-7.029"}],["path",{"d":"M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z"}]],"cup-soda":[["path",{"d":"m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"}],["path",{"d":"M5 8h14"}],["path",{"d":"M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"}],["path",{"d":"m12 8 1-6h2"}]],"cupcake":[["path",{"d":"M12 22v-9"}],["path",{"d":"M14 4h1a3 3 0 013 3l-.004.125A4 4 0 0121 11v2"}],["path",{"d":"m15.5 22 1.5-9"}],["path",{"d":"M21 13a1 1 0 01.919 1.394l-2.74 6.394A2 2 0 0117.34 22H6.659a2 2 0 01-1.838-1.212l-2.74-6.394A1 1 0 013 13z"}],["path",{"d":"M3 13v-2a4 4 0 013.003-3.875L6 7a3 3 0 013-3h1"}],["path",{"d":"M8.5 22 7 13"}],["circle",{"cx":"12","cy":"4","r":"2"}]],"currency":[["circle",{"cx":"12","cy":"12","r":"8"}],["line",{"x1":"3","x2":"6","y1":"3","y2":"6"}],["line",{"x1":"21","x2":"18","y1":"3","y2":"6"}],["line",{"x1":"3","x2":"6","y1":"21","y2":"18"}],["line",{"x1":"21","x2":"18","y1":"21","y2":"18"}]],"cylinder":[["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}],["path",{"d":"M3 5v14a9 3 0 0 0 18 0V5"}]],"dam":[["path",{"d":"M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{"d":"M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{"d":"M2 10h4"}],["path",{"d":"M2 14h4"}],["path",{"d":"M2 18h4"}],["path",{"d":"M2 6h4"}],["path",{"d":"M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z"}]],"database-arrow-down":[["path",{"d":"m16 19 3 3 3-3"}],["path",{"d":"M19 16v6"}],["path",{"d":"M21 12.536V5"}],["path",{"d":"M3 12A9 3 0 0 0 15.182 14.806"}],["path",{"d":"M3 5V19A9 3 0 0 0 13.318 21.968"}],["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}]],"database-arrow-up":[["path",{"d":"M19 22v-6"}],["path",{"d":"M21 12.536V5"}],["path",{"d":"m22 19-3-3-3 3"}],["path",{"d":"M3 12A9 3 0 0 0 14.457 14.886"}],["path",{"d":"M3 5V19A9 3 0 0 0 13.318 21.968"}],["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}]],"database-backup":[["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}],["path",{"d":"M3 12a9 3 0 0 0 5 2.69"}],["path",{"d":"M21 9.3V5"}],["path",{"d":"M3 5v14a9 3 0 0 0 6.47 2.88"}],["path",{"d":"M12 12v4h4"}],["path",{"d":"M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16"}]],"database-check":[["path",{"d":"m16 19 2 2 4-4"}],["path",{"d":"M21 13.127V5"}],["path",{"d":"M3 12A9 3 0 0 0 21 12"}],["path",{"d":"M3 5V19A9 3 0 0 0 13.318 21.968"}],["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}]],"database-cog":[["path",{"d":"m14.305 19.53.923-.382"}],["path",{"d":"m15.228 16.852-.923-.383"}],["path",{"d":"m16.852 15.228-.383-.923"}],["path",{"d":"m16.852 20.772-.383.924"}],["path",{"d":"m19.148 15.228.383-.923"}],["path",{"d":"m19.53 21.696-.382-.924"}],["path",{"d":"m20.772 16.852.924-.383"}],["path",{"d":"m20.772 19.148.924.383"}],["path",{"d":"M21 10.5V5"}],["path",{"d":"M3 12a9 3 0 0 0 7.599 2.963"}],["path",{"d":"M3 5v14a9 3 0 0 0 8.148 2.987"}],["circle",{"cx":"18","cy":"18","r":"3"}],["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}]],"database-minus":[["path",{"d":"M21 15V5"}],["path",{"d":"M22 19h-6"}],["path",{"d":"M3 12A9 3 0 0 0 21 12"}],["path",{"d":"M3 5V19A9 3 0 0 0 13.318 21.968"}],["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}]],"database-plus":[["path",{"d":"M19 16v6"}],["path",{"d":"M21 12.536V5"}],["path",{"d":"M22 19h-6"}],["path",{"d":"M3 12A9 3 0 0 0 15.1824 14.8061"}],["path",{"d":"M3 5V19A9 3 0 0 0 13.318 21.968"}],["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}]],"database-search":[["path",{"d":"M21 11.693V5"}],["path",{"d":"m22 22-1.875-1.875"}],["path",{"d":"M3 12a9 3 0 0 0 8.697 2.998"}],["path",{"d":"M3 5v14a9 3 0 0 0 9.28 2.999"}],["circle",{"cx":"18","cy":"18","r":"3"}],["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}]],"database-x":[["path",{"d":"m17 17 5 5"}],["path",{"d":"M19.323 13.744A9 3 0 0 0 21 12"}],["path",{"d":"M21 13.127V5"}],["path",{"d":"m22 17-5 5"}],["path",{"d":"M3 12A9 3 0 0 0 13.563 14.954"}],["path",{"d":"M3 5V19A9 3 0 0 0 13 21.981"}],["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}]],"database-zap":[["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}],["path",{"d":"M3 5V19A9 3 0 0 0 15 21.84"}],["path",{"d":"M21 5V8"}],["path",{"d":"M21 12L18 17H22L19 22"}],["path",{"d":"M3 12A9 3 0 0 0 14.59 14.87"}]],"database":[["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}],["path",{"d":"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{"d":"M3 12A9 3 0 0 0 21 12"}]],"decimals-arrow-left":[["path",{"d":"m13 21-3-3 3-3"}],["path",{"d":"M20 18H10"}],["path",{"d":"M3 11h.01"}],["rect",{"x":"6","y":"3","width":"5","height":"8","rx":"2.5"}]],"decimals-arrow-right":[["path",{"d":"M10 18h10"}],["path",{"d":"m17 21 3-3-3-3"}],["path",{"d":"M3 11h.01"}],["rect",{"x":"15","y":"3","width":"5","height":"8","rx":"2.5"}],["rect",{"x":"6","y":"3","width":"5","height":"8","rx":"2.5"}]],"delete":[["path",{"d":"M10 5a2 2 0 0 0-1.344.519l-6.328 5.74a1 1 0 0 0 0 1.481l6.328 5.741A2 2 0 0 0 10 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z"}],["path",{"d":"m12 9 6 6"}],["path",{"d":"m18 9-6 6"}]],"dessert":[["path",{"d":"M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826"}],["path",{"d":"M20.804 14.869a9 9 0 0 1-17.608 0"}],["circle",{"cx":"12","cy":"4","r":"2"}]],"diagram-flow-horizontal":[["path",{"d":"M8 12h.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 003.5 3.5h.5"}],["path",{"d":"M8.5 12A3.5 3.5 0 0012 8.5 3.5 3.5 0 0115.5 5h.5"}],["rect",{"x":"16","y":"16","width":"6","height":"6","rx":"1"}],["rect",{"x":"16","y":"2","width":"6","height":"6","rx":"1"}],["rect",{"x":"2","y":"9","width":"6","height":"6","rx":"1"}]],"diagram-flow-vertical":[["path",{"d":"M12 8.5a3.5 3.5 0 003.5 3.5 3.5 3.5 0 013.5 3.5v.5"}],["path",{"d":"M12 8v.5A3.5 3.5 0 018.5 12 3.5 3.5 0 005 15.5v.5"}],["rect",{"x":"16","y":"16","width":"6","height":"6","rx":"1"}],["rect",{"x":"2","y":"16","width":"6","height":"6","rx":"1"}],["rect",{"x":"9","y":"2","width":"6","height":"6","rx":"1"}]],"diameter":[["circle",{"cx":"19","cy":"19","r":"2"}],["circle",{"cx":"5","cy":"5","r":"2"}],["path",{"d":"M6.48 3.66a10 10 0 0 1 13.86 13.86"}],["path",{"d":"m6.41 6.41 11.18 11.18"}],["path",{"d":"M3.66 6.48a10 10 0 0 0 13.86 13.86"}]],"diamond-minus":[["path",{"d":"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"}],["path",{"d":"M8 12h8"}]],"diamond-percent":[["path",{"d":"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0Z"}],["path",{"d":"M9.2 9.2h.01"}],["path",{"d":"m14.5 9.5-5 5"}],["path",{"d":"M14.7 14.8h.01"}]],"diamond-plus":[["path",{"d":"M12 8v8"}],["path",{"d":"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"}],["path",{"d":"M8 12h8"}]],"diamond":[["path",{"d":"M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"}]],"dice-1":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],["path",{"d":"M12 12h.01"}]],"dice-2":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],["path",{"d":"M15 9h.01"}],["path",{"d":"M9 15h.01"}]],"dice-3":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],["path",{"d":"M16 8h.01"}],["path",{"d":"M12 12h.01"}],["path",{"d":"M8 16h.01"}]],"dice-4":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],["path",{"d":"M16 8h.01"}],["path",{"d":"M8 8h.01"}],["path",{"d":"M8 16h.01"}],["path",{"d":"M16 16h.01"}]],"dice-5":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],["path",{"d":"M16 8h.01"}],["path",{"d":"M8 8h.01"}],["path",{"d":"M8 16h.01"}],["path",{"d":"M16 16h.01"}],["path",{"d":"M12 12h.01"}]],"dice-6":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],["path",{"d":"M16 8h.01"}],["path",{"d":"M16 12h.01"}],["path",{"d":"M16 16h.01"}],["path",{"d":"M8 8h.01"}],["path",{"d":"M8 12h.01"}],["path",{"d":"M8 16h.01"}]],"dices":[["rect",{"width":"12","height":"12","x":"2","y":"10","rx":"2","ry":"2"}],["path",{"d":"m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"}],["path",{"d":"M6 18h.01"}],["path",{"d":"M10 14h.01"}],["path",{"d":"M15 6h.01"}],["path",{"d":"M18 9h.01"}]],"diff":[["path",{"d":"M12 3v14"}],["path",{"d":"M5 10h14"}],["path",{"d":"M5 21h14"}]],"disc-2":[["circle",{"cx":"12","cy":"12","r":"10"}],["circle",{"cx":"12","cy":"12","r":"4"}],["path",{"d":"M12 12h.01"}]],"disc-3":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M6 12c0-1.7.7-3.2 1.8-4.2"}],["circle",{"cx":"12","cy":"12","r":"2"}],["path",{"d":"M18 12c0 1.7-.7 3.2-1.8 4.2"}]],"disc-album":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["circle",{"cx":"12","cy":"12","r":"5"}],["path",{"d":"M12 12h.01"}]],"disc":[["circle",{"cx":"12","cy":"12","r":"10"}],["circle",{"cx":"12","cy":"12","r":"2"}]],"divide":[["circle",{"cx":"12","cy":"6","r":"1"}],["line",{"x1":"5","x2":"19","y1":"12","y2":"12"}],["circle",{"cx":"12","cy":"18","r":"1"}]],"dna-off":[["path",{"d":"M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8"}],["path",{"d":"m17 6-2.891-2.891"}],["path",{"d":"M2 15c3.333-3 6.667-3 10-3"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"m20 9 .891.891"}],["path",{"d":"M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1"}],["path",{"d":"M3.109 14.109 4 15"}],["path",{"d":"m6.5 12.5 1 1"}],["path",{"d":"m7 18 2.891 2.891"}],["path",{"d":"M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16"}]],"dna":[["path",{"d":"m10 16 1.5 1.5"}],["path",{"d":"m14 8-1.5-1.5"}],["path",{"d":"M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"}],["path",{"d":"m16.5 10.5 1 1"}],["path",{"d":"m17 6-2.891-2.891"}],["path",{"d":"M2 15c6.667-6 13.333 0 20-6"}],["path",{"d":"m20 9 .891.891"}],["path",{"d":"M3.109 14.109 4 15"}],["path",{"d":"m6.5 12.5 1 1"}],["path",{"d":"m7 18 2.891 2.891"}],["path",{"d":"M9 22c1.798-1.998 2.518-3.995 2.807-5.993"}]],"dock":[["path",{"d":"M2 8h20"}],["rect",{"width":"20","height":"16","x":"2","y":"4","rx":"2"}],["path",{"d":"M6 16h12"}]],"dog":[["path",{"d":"M11.25 16.25h1.5L12 17z"}],["path",{"d":"M16 14v.5"}],["path",{"d":"M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"}],["path",{"d":"M8 14v.5"}],["path",{"d":"M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"}]],"doghouse":[["path",{"d":"m2 9.718 8.82-6.333a2 2 0 012.36 0L22 9.718"}],["path",{"d":"m20 8.282-1.007 10.902A2 2 0 0117 21H7a2 2 0 01-1.992-1.816L4 8.282"}],["path",{"d":"M8.5 9.938a7 7 0 017 0"}],["path",{"d":"M9 21v-5a3 3 0 016 0v5"}]],"dollar-sign":[["path",{"d":"M12 3v18"}],["path",{"d":"M17 5H9.5a1 1 0 000 7h5a1 1 0 010 7H6"}]],"dome":[["path",{"d":"M10 21v-3a2 2 0 014 0v3"}],["path",{"d":"M12 2v2"}],["path",{"d":"M18 12v9"}],["path",{"d":"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2v-6a1 1 0 011-1h18a1 1 0 011 1z"}],["path",{"d":"M4 12a8 8 0 0116 0"}],["path",{"d":"M6 12v9"}]],"donut":[["path",{"d":"M20.5 10a2.5 2.5 0 0 1-2.4-3H18a2.95 2.95 0 0 1-2.6-4.4 10 10 0 1 0 6.3 7.1c-.3.2-.8.3-1.2.3"}],["circle",{"cx":"12","cy":"12","r":"3"}]],"door-closed-cog":[["path",{"d":"m14.305 19.53.923-.382"}],["path",{"d":"m15.229 16.852-.924-.383"}],["path",{"d":"m16.852 15.228-.383-.923"}],["path",{"d":"m16.852 20.773-.383.924"}],["path",{"d":"M19 10.35V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"}],["path",{"d":"m19.148 15.228.383-.923"}],["path",{"d":"m19.53 21.697-.382-.924"}],["path",{"d":"M2 21h8.58"}],["path",{"d":"m20.773 16.852.922-.383"}],["path",{"d":"m20.773 19.148.922.383"}],["path",{"d":"M9 12h.01"}],["circle",{"cx":"18","cy":"18","r":"3"}]],"door-closed-locked":[["path",{"d":"M19 8V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"}],["path",{"d":"M2 21h8"}],["path",{"d":"M20 16v-2a2 2 0 00-4 0v2"}],["path",{"d":"M9 12h.01"}],["rect",{"x":"14","y":"16","width":"8","height":"5","rx":"1"}]],"door-closed-package":[["path",{"d":"M18 13v3"}],["path",{"d":"M19 9V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"}],["path",{"d":"M2 21h8"}],["path",{"d":"M9 12h.01"}],["rect",{"x":"14","y":"13","width":"8","height":"8","rx":"1"}]],"door-closed":[["path",{"d":"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"}],["path",{"d":"M2 21h20"}],["path",{"d":"M9 12h.01"}]],"door-open":[["path",{"d":"M10 21H2"}],["path",{"d":"M10 3H7a2 2 0 00-2 2v16"}],["path",{"d":"M14 12h.01"}],["path",{"d":"M19 21V5a2 2 0 00-1.675-1.974l-6.163-1.013A1 1 0 0010 3v18a1 1 0 001.124.992z"}],["path",{"d":"M22 21h-3"}]],"door-stairwell":[["path",{"d":"M12 17v-3a1 1 0 011-1h6"}],["path",{"d":"M19 17h-9a1 1 0 00-1 1v3"}],["path",{"d":"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"}],["path",{"d":"M19 9h-3a1 1 0 00-1 1v3"}],["path",{"d":"M22 21H2"}]],"dot":[["circle",{"cx":"12","cy":"12","r":"1"}]],"download":[["path",{"d":"M12 15V3"}],["path",{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{"d":"m7 10 5 5 5-5"}]],"drafting-compass":[["path",{"d":"m12.99 6.74 1.93 3.44"}],["path",{"d":"M19.136 12a10 10 0 0 1-14.271 0"}],["path",{"d":"m21 21-2.16-3.84"}],["path",{"d":"m3 21 8.02-14.26"}],["circle",{"cx":"12","cy":"5","r":"2"}]],"drama":[["path",{"d":"M10 11h.01"}],["path",{"d":"M14 6h.01"}],["path",{"d":"M18 6h.01"}],["path",{"d":"M6.5 13.1h.01"}],["path",{"d":"M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"}],["path",{"d":"M17.4 9.9c-.8.8-2 .8-2.8 0"}],["path",{"d":"M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"}],["path",{"d":"M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"}]],"drill":[["path",{"d":"M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z"}],["path",{"d":"M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8"}],["path",{"d":"M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3"}],["path",{"d":"M18 6h4"}],["path",{"d":"m5 10-2 8"}],["path",{"d":"m7 18 2-8"}]],"drone":[["path",{"d":"M10 10 7 7"}],["path",{"d":"m10 14-3 3"}],["path",{"d":"m14 10 3-3"}],["path",{"d":"m14 14 3 3"}],["path",{"d":"M14.205 4.139a4 4 0 1 1 5.439 5.863"}],["path",{"d":"M19.637 14a4 4 0 1 1-5.432 5.868"}],["path",{"d":"M4.367 10a4 4 0 1 1 5.438-5.862"}],["path",{"d":"M9.795 19.862a4 4 0 1 1-5.429-5.873"}],["rect",{"x":"10","y":"8","width":"4","height":"8","rx":"1"}]],"droplet-off":[["path",{"d":"M18.715 13.186C18.29 11.858 17.384 10.607 16 9.5c-2-1.6-3.5-4-4-6.5a10.7 10.7 0 0 1-.884 2.586"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M8.795 8.797A11 11 0 0 1 8 9.5C6 11.1 5 13 5 15a7 7 0 0 0 13.222 3.208"}]],"droplet":[["path",{"d":"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"}]],"droplets":[["path",{"d":"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{"d":"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]],"drum":[["path",{"d":"m2 2 8 8"}],["path",{"d":"m22 2-8 8"}],["ellipse",{"cx":"12","cy":"9","rx":"10","ry":"5"}],["path",{"d":"M7 13.4v7.9"}],["path",{"d":"M12 14v8"}],["path",{"d":"M17 13.4v7.9"}],["path",{"d":"M2 9v8a10 5 0 0 0 20 0V9"}]],"drumstick":[["path",{"d":"M15.4 15.63a7.875 6 135 1 1 6.23-6.23 4.5 3.43 135 0 0-6.23 6.23"}],["path",{"d":"m8.29 12.71-2.6 2.6a2.5 2.5 0 1 0-1.65 4.65A2.5 2.5 0 1 0 8.7 18.3l2.59-2.59"}]],"dumbbell":[["path",{"d":"M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"}],["path",{"d":"m2.5 21.5 1.4-1.4"}],["path",{"d":"m20.1 3.9 1.4-1.4"}],["path",{"d":"M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"}],["path",{"d":"m9.6 14.4 4.8-4.8"}]],"ear-off":[["path",{"d":"M6 18.5a3.5 3.5 0 1 0 7 0c0-1.57.92-2.52 2.04-3.46"}],["path",{"d":"M6 8.5c0-.75.13-1.47.36-2.14"}],["path",{"d":"M8.8 3.15A6.5 6.5 0 0 1 19 8.5c0 1.63-.44 2.81-1.09 3.76"}],["path",{"d":"M12.5 6A2.5 2.5 0 0 1 15 8.5M10 13a2 2 0 0 0 1.82-1.18"}],["line",{"x1":"2","x2":"22","y1":"2","y2":"22"}]],"ear":[["path",{"d":"M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"}],["path",{"d":"M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"}]],"earbuds-off":[["path",{"d":"M10 10v9a2 2 0 01-4 0v-8a5 5 0 01-3.75-1.693A1 1 0 012 8.646V5.354a1 1 0 01.25-.661 5 5 0 011.359-1.084"}],["path",{"d":"M14 14v5a2 2 90 004 0v-1"}],["path",{"d":"M18 12.343V11a5 5 90 003.75-1.693 1 1 90 00.25-.661V5.354a1 1 90 00-.25-.661A5 5 90 0018 3a4 4 90 00-4 4v1.343"}],["path",{"d":"m2 2 20 20"}]],"earbuds":[["path",{"d":"M18 3a4 4 90 00-4 4v12a2 2 90 004 0v-8a5 5 90 003.75-1.693 1 1 90 00.25-.661V5.354a1 1 90 00-.25-.661A5 5 90 0018 3"}],["path",{"d":"M6 3a4 4 0 014 4v12a2 2 0 01-4 0v-8a5 5 0 01-3.75-1.693A1 1 0 012 8.646V5.354a1 1 0 01.25-.661A5 5 0 016 3"}]],"earth-lock":[["path",{"d":"M7 3.34V5a3 3 0 0 0 3 3"}],["path",{"d":"M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"}],["path",{"d":"M21.54 15H17a2 2 0 0 0-2 2v4.54"}],["path",{"d":"M12 2a10 10 0 1 0 9.54 13"}],["path",{"d":"M20 6V4a2 2 0 1 0-4 0v2"}],["rect",{"width":"8","height":"5","x":"14","y":"6","rx":"1"}]],"earth":[["path",{"d":"M21.54 15H17a2 2 0 0 0-2 2v4.54"}],["path",{"d":"M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"}],["path",{"d":"M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"eclipse":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 2a7 7 0 1 0 10 10"}]],"egg-fried":[["circle",{"cx":"11.5","cy":"12.5","r":"3.5"}],["path",{"d":"M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z"}]],"egg-off":[["path",{"d":"m2 2 20 20"}],["path",{"d":"M20 14.347V14c0-6-4-12-8-12-1.078 0-2.157.436-3.157 1.19"}],["path",{"d":"M6.206 6.21C4.871 8.4 4 11.2 4 14a8 8 0 0 0 14.568 4.568"}]],"egg":[["path",{"d":"M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12"}]],"eighth-note":[["path",{"d":"m19 6-5.2-3.9a.5.5 0 0 0-.8.4V18"}],["circle",{"cx":"9","cy":"18","r":"4"}]],"eighth-notes":[["path",{"d":"M21 16V3a1 1 0 0 0-1.28-.96l-10 2.917a1 1 0 0 0-.72.96V19"}],["circle",{"cx":"18","cy":"16","r":"3"}],["circle",{"cx":"6","cy":"19","r":"3"}]],"eject":[["path",{"d":"M4 13a1 1 0 0 1-.72-1.695l7.257-7.668a2 2 0 0 1 2.926 0l7.256 7.668A1 1 0 0 1 20 13z"}],["rect",{"x":"3","y":"17","width":"18","height":"4","rx":"1"}]],"ellipse":[["ellipse",{"cx":"12","cy":"12","rx":"10","ry":"6"}]],"ellipsis-vertical":[["circle",{"cx":"12","cy":"12","r":"1"}],["circle",{"cx":"12","cy":"5","r":"1"}],["circle",{"cx":"12","cy":"19","r":"1"}]],"ellipsis":[["circle",{"cx":"12","cy":"12","r":"1"}],["circle",{"cx":"19","cy":"12","r":"1"}],["circle",{"cx":"5","cy":"12","r":"1"}]],"emirati-dirham":[["path",{"d":"M11 4a8 8 0 0 1 0 16H6.406A.4.4 0 0 1 6 19.594V4.406A.4.4 0 0 1 6.406 4z"}],["path",{"d":"M4 10h17"}],["path",{"d":"M4 14h17"}]],"engine":[["path",{"d":"M10 3h6"}],["path",{"d":"M13 3v4"}],["path",{"d":"M2 10v6"}],["path",{"d":"M2 13h4"}],["path",{"d":"M6 16a2 2 0 002 2h1a2 2 0 011.6.8l.3.4a2 2 0 001.6.8h2.264a2 2 0 001.789-1.106l1.67-3.341a1 1 0 01.895-.553H21a1 1 0 001-1v-4a1 1 0 00-1-1h-3.5a1 1 0 01-.8-.4l-.9-1.2A1 1 0 0015 7h-4a1 1 0 00-.8.4l-.9 1.2a1 1 0 01-.8.4H7a1 1 0 00-1 1z"}]],"equal-approximately-not":[["path",{"d":"M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0"}],["path",{"d":"M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0"}],["line",{"x1":"19","x2":"5","y1":"5","y2":"19"}]],"equal-approximately":[["path",{"d":"M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0"}],["path",{"d":"M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0"}]],"equal-not":[["line",{"x1":"5","x2":"19","y1":"9","y2":"9"}],["line",{"x1":"5","x2":"19","y1":"15","y2":"15"}],["line",{"x1":"19","x2":"5","y1":"5","y2":"19"}]],"equal":[["line",{"x1":"5","x2":"19","y1":"9","y2":"9"}],["line",{"x1":"5","x2":"19","y1":"15","y2":"15"}]],"eraser":[["path",{"d":"M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"}],["path",{"d":"m5.082 11.09 8.828 8.828"}]],"ethernet-port":[["path",{"d":"M10 8v1"}],["path",{"d":"M14 8v1"}],["path",{"d":"M18 8v1"}],["path",{"d":"M19 17a2 2 0 00-1.765 1.059l-.47.882A2 2 0 0115 20H9a2 2 0 01-1.765-1.059l-.47-.882A2 2 0 005 17H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v9a2 2 0 01-2 2z"}],["path",{"d":"M6 8v1"}]],"euro":[["path",{"d":"M4 10h12"}],["path",{"d":"M4 14h9"}],["path",{"d":"M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2"}]],"ev-charger":[["path",{"d":"M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"}],["path",{"d":"M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"}],["path",{"d":"M2 21h13"}],["path",{"d":"M3 7h11"}],["path",{"d":"m9 11-2 3h3l-2 3"}]],"exclamation-mark":[["path",{"d":"M12 15V4"}],["path",{"d":"M12 20h.01"}]],"expand":[["path",{"d":"m15 15 6 6"}],["path",{"d":"m15 9 6-6"}],["path",{"d":"M21 16v5h-5"}],["path",{"d":"M21 8V3h-5"}],["path",{"d":"M3 16v5h5"}],["path",{"d":"m3 21 6-6"}],["path",{"d":"M3 8V3h5"}],["path",{"d":"M9 9 3 3"}]],"external-link":[["path",{"d":"M15 3h6v6"}],["path",{"d":"M10 14 21 3"}],["path",{"d":"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]],"eye-closed":[["path",{"d":"m15 18-.722-3.25"}],["path",{"d":"M2 8a10.645 10.645 0 0 0 20 0"}],["path",{"d":"m20 15-1.726-2.05"}],["path",{"d":"m4 15 1.726-2.05"}],["path",{"d":"m9 18 .722-3.25"}]],"eye-dashed":[["path",{"d":"M13.054 18.946a11 11 0 0 1-2.11 0"}],["path",{"d":"M13.054 5.054a11 11 0 0 0-2.11-.001"}],["path",{"d":"M17.072 6.274a11 11 0 0 1 1.753 1.173"}],["path",{"d":"M18.825 16.552a11 11 0 0 1-1.753 1.174"}],["path",{"d":"M2.514 13.303a11 11 0 0 1-.452-.954 1 1 0 0 1 0-.697 11 11 0 0 1 .45-.955"}],["path",{"d":"M21.485 10.697a11 11 0 0 1 .453.955 1 1 0 0 1 0 .697 11 11 0 0 1-.453.954"}],["path",{"d":"M5.173 7.448a11 11 0 0 1 1.753-1.174"}],["path",{"d":"M6.926 17.726a11 11 0 0 1-1.753-1.174"}],["circle",{"cx":"12","cy":"12","r":"3"}]],"eye-off":[["path",{"d":"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{"d":"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{"d":"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{"d":"m2 2 20 20"}]],"eye":[["path",{"d":"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{"cx":"12","cy":"12","r":"3"}]],"face-angry":[["path",{"d":"M15 12v-1.584"}],["path",{"d":"M17 10a5 5 0 00-3 1"}],["path",{"d":"M7 10a5 5 0 013 1"}],["path",{"d":"M9 12v-1.584"}],["path",{"d":"M9 17a5 5 0 016.001 0"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"face-expressionless":[["path",{"d":"M14 10h2"}],["path",{"d":"M8 10h2"}],["path",{"d":"M8 16h8"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"face-grinning":[["path",{"d":"M15 10V9"}],["path",{"d":"M7.084 14.302a5.12 5.12 0 009.833 0 .24.24 0 00-.235-.302H7.32a.24.24 0 00-.235.302"}],["path",{"d":"M9 10V9"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"face-neutral":[["path",{"d":"M15 10V9"}],["path",{"d":"M8 16h8"}],["path",{"d":"M9 10V9"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"face-slightly-frowning":[["path",{"d":"M15 10V9"}],["path",{"d":"M9 10V9"}],["path",{"d":"M9 16a5 5 0 016 0"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"face-slightly-smiling-plus":[["path",{"d":"M13.267 2.08a10 10 0 108.653 8.653"}],["path",{"d":"M15 10V9"}],["path",{"d":"M16 5h6"}],["path",{"d":"M16.472 15a6 6 0 01-8.943 0"}],["path",{"d":"M19 2v6"}],["path",{"d":"M9 10V9"}]],"face-slightly-smiling":[["path",{"d":"M15 10V9"}],["path",{"d":"M16.472 15a6 6 0 01-8.943 0"}],["path",{"d":"M9 10V9"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"factory":[["path",{"d":"M12 16h.01"}],["path",{"d":"M16 16h.01"}],["path",{"d":"M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"}],["path",{"d":"M8 16h.01"}]],"fan":[["path",{"d":"M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"}],["path",{"d":"M12 12v.01"}]],"fast-forward":[["path",{"d":"M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z"}],["path",{"d":"M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z"}]],"faucet":[["path",{"d":"M10.083 5.428 5.57 4.083a2 2 0 10.001 3.834l4.512-1.345"}],["path",{"d":"M12 8v3"}],["path",{"d":"m13.917 5.428 4.511-1.345a2 2 0 110 3.834l-4.51-1.345"}],["path",{"d":"M18 17v-4.006"}],["path",{"d":"M22 11v8"}],["path",{"d":"M22 12h-3a1 1 0 00-1 .994h-2.539a4 4 0 00-6.915-.012L7 13a5 5 0 00-5 5v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 01.995-1l1.552.018a4 4 0 006.907 0L18 17a1 1 0 001 1h3"}],["circle",{"cx":"12","cy":"6","r":"2"}]],"feather":[["path",{"d":"M14.086 18.412A2 2 0 0112.67 19H5v-7.672a2 2 0 01.586-1.414L11.75 3.75a6 6 0 118.49 8.49z"}],["path",{"d":"M16 8 2 22"}],["path",{"d":"M17.488 15H9"}]],"fence":[["path",{"d":"M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"}],["path",{"d":"M6 8h4"}],["path",{"d":"M6 18h4"}],["path",{"d":"m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"}],["path",{"d":"M14 8h4"}],["path",{"d":"M14 18h4"}],["path",{"d":"m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"}]],"ferris-wheel":[["circle",{"cx":"12","cy":"12","r":"2"}],["path",{"d":"M12 2v4"}],["path",{"d":"m6.8 15-3.5 2"}],["path",{"d":"m20.7 7-3.5 2"}],["path",{"d":"M6.8 9 3.3 7"}],["path",{"d":"m20.7 17-3.5-2"}],["path",{"d":"m9 22 3-8 3 8"}],["path",{"d":"M8 22h8"}],["path",{"d":"M18 18.7a9 9 0 1 0-12 0"}]],"file-archive":[["path",{"d":"M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M8 12v-1"}],["path",{"d":"M8 18v-2"}],["path",{"d":"M8 7V6"}],["circle",{"cx":"8","cy":"20","r":"2"}]],"file-axis-3d":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m8 18 4-4"}],["path",{"d":"M8 10v8h8"}]],"file-badge":[["path",{"d":"M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88"}],["circle",{"cx":"6","cy":"14","r":"3"}]],"file-box":[["path",{"d":"M14 2v5a1 1 0 001 1h5"}],["path",{"d":"M14.692 22H18a2 2 0 002-2V8a2.4 2.4 0 00-.706-1.706l-3.588-3.588A2.4 2.4 0 0014 2H6a2 2 0 00-2 2v3.804"}],["path",{"d":"M2.264 13.752 7 16.5l4.737-2.748"}],["path",{"d":"M2.995 13.014A2 2 0 002 14.744v3.516a2 2 0 00.996 1.73l3 1.74a2 2 0 002.008 0l3-1.74A2 2 0 0012 18.26v-3.517a2 2 0 00-.995-1.73l-3-1.742a2 2 0 00-1.892-.064z"}],["path",{"d":"M7 16.5V22"}]],"file-braces-corner":[["path",{"d":"M14 22h4a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M5 14a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1 1 1 0 0 1 1 1v2a1 1 0 0 0 1 1"}],["path",{"d":"M9 22a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1"}]],"file-braces":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{"d":"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]],"file-chart-column-increasing":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M8 18v-2"}],["path",{"d":"M12 18v-4"}],["path",{"d":"M16 18v-6"}]],"file-chart-column":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M8 18v-1"}],["path",{"d":"M12 18v-6"}],["path",{"d":"M16 18v-3"}]],"file-chart-line":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m16 13-3.5 3.5-2-2L8 17"}]],"file-chart-pie":[["path",{"d":"M15.941 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.512"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M4.017 11.512a6 6 0 1 0 8.466 8.475"}],["path",{"d":"M9 16a1 1 0 0 1-1-1v-4c0-.552.45-1.008.995-.917a6 6 0 0 1 4.922 4.922c.091.544-.365.995-.917.995z"}]],"file-check-corner":[["path",{"d":"M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m14 20 2 2 4-4"}]],"file-check":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m9 15 2 2 4-4"}]],"file-clock":[["path",{"d":"M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M8 14v2.2l1.6 1"}],["circle",{"cx":"8","cy":"16","r":"6"}]],"file-code-corner":[["path",{"d":"M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m5 16-3 3 3 3"}],["path",{"d":"m9 22 3-3-3-3"}]],"file-code":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M10 12.5 8 15l2 2.5"}],["path",{"d":"m14 12.5 2 2.5-2 2.5"}]],"file-cog":[["path",{"d":"M15 8a1 1 0 0 1-1-1V2a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8z"}],["path",{"d":"M20 8v12a2 2 0 0 1-2 2h-4.182"}],["path",{"d":"m3.305 19.53.923-.382"}],["path",{"d":"M4 10.592V4a2 2 0 0 1 2-2h8"}],["path",{"d":"m4.228 16.852-.924-.383"}],["path",{"d":"m5.852 15.228-.383-.923"}],["path",{"d":"m5.852 20.772-.383.924"}],["path",{"d":"m8.148 15.228.383-.923"}],["path",{"d":"m8.53 21.696-.382-.924"}],["path",{"d":"m9.773 16.852.922-.383"}],["path",{"d":"m9.773 19.148.922.383"}],["circle",{"cx":"7","cy":"18","r":"3"}]],"file-database":[["path",{"d":"M12 12v8a5 2 0 01-10 0v-8"}],["path",{"d":"M12 16a5 2 0 01-10 0"}],["path",{"d":"M14 2v5a1 1 0 001 1h5"}],["path",{"d":"M4 6.3V4a2 2 0 012-2h8a2.4 2.4 0 011.706.706l3.588 3.588A2.4 2.4 0 0120 8v12a2 2 0 01-2 2h-2.43"}],["ellipse",{"cx":"7","cy":"12","rx":"5","ry":"2"}]],"file-diff":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M9 10h6"}],["path",{"d":"M12 13V7"}],["path",{"d":"M9 17h6"}]],"file-digit":[["path",{"d":"M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M10 16h2v6"}],["path",{"d":"M10 22h4"}],["rect",{"x":"2","y":"16","width":"4","height":"6","rx":"2"}]],"file-down":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M12 18v-6"}],["path",{"d":"m9 15 3 3 3-3"}]],"file-exclamation-point":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M12 9v4"}],["path",{"d":"M12 17h.01"}]],"file-headphone":[["path",{"d":"M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0"}]],"file-heart":[["path",{"d":"M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v7"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M3.62 18.8A2.25 2.25 0 1 1 7 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a1 1 0 0 1-1.507 0z"}]],"file-image":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["circle",{"cx":"10","cy":"12","r":"2"}],["path",{"d":"m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"}]],"file-input":[["path",{"d":"M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M2 15h10"}],["path",{"d":"m9 18 3-3-3-3"}]],"file-key":[["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M4 12v6"}],["path",{"d":"M4 14h2"}],["path",{"d":"M9.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v4"}],["circle",{"cx":"4","cy":"20","r":"2"}]],"file-lock":[["path",{"d":"M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M9 17v-2a2 2 0 0 0-4 0v2"}],["rect",{"width":"8","height":"5","x":"3","y":"17","rx":"1"}]],"file-minus-corner":[["path",{"d":"M20 14V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M14 18h6"}]],"file-minus":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M9 15h6"}]],"file-music":[["path",{"d":"M11.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.35"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M8 20v-7l3 1.474"}],["circle",{"cx":"6","cy":"20","r":"2"}]],"file-output":[["path",{"d":"M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m5 11-3 3"}],["path",{"d":"m5 17-3-3h10"}]],"file-pen-line":[["path",{"d":"M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z"}],["path",{"d":"M14.487 7.858A1 1 0 0 1 14 7V2"}],["path",{"d":"M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516"}],["path",{"d":"M8 18h1"}]],"file-pen":[["path",{"d":"M12.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v9.34"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M10.378 12.622a1 1 0 0 1 3 3.003L8.36 20.637a2 2 0 0 1-.854.506l-2.867.837a.5.5 0 0 1-.62-.62l.836-2.869a2 2 0 0 1 .506-.853z"}]],"file-play":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z"}]],"file-plus-corner":[["path",{"d":"M11.35 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5.35"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M14 19h6"}],["path",{"d":"M17 16v6"}]],"file-plus":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M9 15h6"}],["path",{"d":"M12 18v-6"}]],"file-question-mark":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5"}],["path",{"d":"M12 17h.01"}]],"file-scan":[["path",{"d":"M20 10V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.35"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M16 14a2 2 0 0 0-2 2"}],["path",{"d":"M16 22a2 2 0 0 1-2-2"}],["path",{"d":"M20 14a2 2 0 0 1 2 2"}],["path",{"d":"M20 22a2 2 0 0 0 2-2"}]],"file-search-corner":[["path",{"d":"M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m21 22-2.88-2.88"}],["circle",{"cx":"16","cy":"17","r":"3"}]],"file-search":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["circle",{"cx":"11.5","cy":"14.5","r":"2.5"}],["path",{"d":"M13.3 16.3 15 18"}]],"file-signal":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M8 15h.01"}],["path",{"d":"M11.5 13.5a2.5 2.5 0 0 1 0 3"}],["path",{"d":"M15 12a5 5 0 0 1 0 6"}]],"file-sliders":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M8 12h8"}],["path",{"d":"M10 11v2"}],["path",{"d":"M8 17h8"}],["path",{"d":"M14 16v2"}]],"file-spreadsheet":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M8 13h2"}],["path",{"d":"M14 13h2"}],["path",{"d":"M8 17h2"}],["path",{"d":"M14 17h2"}]],"file-stack":[["path",{"d":"M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1"}],["path",{"d":"M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1"}],["path",{"d":"M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z"}]],"file-symlink":[["path",{"d":"M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m10 18 3-3-3-3"}]],"file-terminal":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m8 16 2-2-2-2"}],["path",{"d":"M12 18h4"}]],"file-text":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M10 9H8"}],["path",{"d":"M16 13H8"}],["path",{"d":"M16 17H8"}]],"file-type-corner":[["path",{"d":"M12 22h6a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v6"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M3 16v-1.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V16"}],["path",{"d":"M6 22h2"}],["path",{"d":"M7 14v8"}]],"file-type":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M11 18h2"}],["path",{"d":"M12 12v6"}],["path",{"d":"M9 13v-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5"}]],"file-up":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M12 12v6"}],["path",{"d":"m15 15-3-3-3 3"}]],"file-user":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M16 22a4 4 0 0 0-8 0"}],["circle",{"cx":"12","cy":"15","r":"3"}]],"file-video-camera":[["path",{"d":"M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m10 17.843 3.033-1.755a.64.64 0 0 1 .967.56v4.704a.65.65 0 0 1-.967.56L10 20.157"}],["rect",{"width":"7","height":"6","x":"3","y":"16","rx":"1"}]],"file-volume":[["path",{"d":"M4 11.55V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-1.95"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M12 15a5 5 0 0 1 0 6"}],["path",{"d":"M8 14.502a.5.5 0 0 0-.826-.381l-1.893 1.631a1 1 0 0 1-.651.243H3.5a.5.5 0 0 0-.5.501v3.006a.5.5 0 0 0 .5.501h1.129a1 1 0 0 1 .652.243l1.893 1.633a.5.5 0 0 0 .826-.38z"}]],"file-x-corner":[["path",{"d":"M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m15 17 5 5"}],["path",{"d":"m20 17-5 5"}]],"file-x":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m14.5 12.5-5 5"}],["path",{"d":"m9.5 12.5 5 5"}]],"file":[["path",{"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}]],"files":[["path",{"d":"M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"}],["path",{"d":"M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z"}],["path",{"d":"M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1"}]],"film":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M7 3v18"}],["path",{"d":"M3 7.5h4"}],["path",{"d":"M3 12h18"}],["path",{"d":"M3 16.5h4"}],["path",{"d":"M17 3v18"}],["path",{"d":"M17 7.5h4"}],["path",{"d":"M17 16.5h4"}]],"fingerprint-pattern":[["path",{"d":"M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"}],["path",{"d":"M14 13.12c0 2.38 0 6.38-1 8.88"}],["path",{"d":"M17.29 21.02c.12-.6.43-2.3.5-3.02"}],["path",{"d":"M2 12a10 10 0 0 1 18-6"}],["path",{"d":"M2 16h.01"}],["path",{"d":"M21.8 16c.2-2 .131-5.354 0-6"}],["path",{"d":"M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"}],["path",{"d":"M8.65 22c.21-.66.45-1.32.57-2"}],["path",{"d":"M9 6.8a6 6 0 0 1 9 5.2v2"}]],"fire-extinguisher":[["path",{"d":"M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5"}],["path",{"d":"M9 18h8"}],["path",{"d":"M18 3h-3"}],["path",{"d":"M11 3a6 6 0 0 0-6 6v11"}],["path",{"d":"M5 13h4"}],["path",{"d":"M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z"}]],"fish-off":[["path",{"d":"M18 12.47v.03m0-.5v.47m-.475 5.056A6.744 6.744 0 0 1 15 18c-3.56 0-7.56-2.53-8.5-6 .348-1.28 1.114-2.433 2.121-3.38m3.444-2.088A8.802 8.802 0 0 1 15 6c3.56 0 6.06 2.54 7 6-.309 1.14-.786 2.177-1.413 3.058"}],["path",{"d":"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33m7.48-4.372A9.77 9.77 0 0 1 16 6.07m0 11.86a9.77 9.77 0 0 1-1.728-3.618"}],["path",{"d":"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98M8.53 3h5.27a2 2 0 0 1 1.98 1.67l.23 1.4M2 2l20 20"}]],"fish-symbol":[["path",{"d":"M2 16s9-15 20-4C11 23 2 8 2 8"}]],"fish":[["path",{"d":"M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"}],["path",{"d":"M18 12v.5"}],["path",{"d":"M16 17.93a9.77 9.77 0 0 1 0-11.86"}],["path",{"d":"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"}],["path",{"d":"M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"}],["path",{"d":"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"}]],"fishing-hook":[["path",{"d":"m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10"}],["path",{"d":"M20.414 8.586 22 7"}],["circle",{"cx":"19","cy":"10","r":"2"}]],"fishing-rod":[["path",{"d":"M4 11h1"}],["path",{"d":"M8 15a2 2 0 0 1-4 0V3a1 1 0 0 1 1-1h.5C14 2 20 9 20 18v4"}],["circle",{"cx":"18","cy":"18","r":"2"}]],"flag-off":[["path",{"d":"M16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M4 22V4"}],["path",{"d":"M7.656 2H8c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10.347"}]],"flag-triangle-left":[["path",{"d":"M18 22V2.8a.8.8 0 0 0-1.17-.71L5.45 7.78a.8.8 0 0 0 0 1.44L18 15.5"}]],"flag-triangle-right":[["path",{"d":"M6 22V2.8a.8.8 0 0 1 1.17-.71l11.38 5.69a.8.8 0 0 1 0 1.44L6 15.5"}]],"flag":[["path",{"d":"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"}]],"flame-kindling":[["path",{"d":"M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z"}],["path",{"d":"m5 22 14-4"}],["path",{"d":"m5 18 14 4"}]],"flame":[["path",{"d":"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"}]],"flashlight-off":[["path",{"d":"M11.652 6H18"}],["path",{"d":"M12 13v1"}],["path",{"d":"M16 16v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V6"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M7.649 2H17a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8a4 4 0 0 0-.55 1.007"}]],"flashlight":[["path",{"d":"M12 13v1"}],["path",{"d":"M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z"}],["path",{"d":"M6 6h12"}]],"flask-conical-off":[["path",{"d":"M10 2v2.343"}],["path",{"d":"M14 2v6.343"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M20 20a2 2 0 0 1-2 2H6a2 2 0 0 1-1.755-2.96l5.227-9.563"}],["path",{"d":"M6.453 15H15"}],["path",{"d":"M8.5 2h7"}]],"flask-conical":[["path",{"d":"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"}],["path",{"d":"M6.453 15h11.094"}],["path",{"d":"M8.5 2h7"}]],"flask-round":[["path",{"d":"M10 2v6.292a7 7 0 1 0 4 0V2"}],["path",{"d":"M5 15h14"}],["path",{"d":"M8.5 2h7"}]],"flower-2":[["path",{"d":"M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"}],["circle",{"cx":"12","cy":"8","r":"2"}],["path",{"d":"M12 10v12"}],["path",{"d":"M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"}],["path",{"d":"M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"}]],"flower":[["circle",{"cx":"12","cy":"12","r":"3"}],["path",{"d":"M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"}],["path",{"d":"M12 7.5V9"}],["path",{"d":"M7.5 12H9"}],["path",{"d":"M16.5 12H15"}],["path",{"d":"M12 16.5V15"}],["path",{"d":"m8 8 1.88 1.88"}],["path",{"d":"M14.12 9.88 16 8"}],["path",{"d":"m8 16 1.88-1.88"}],["path",{"d":"M14.12 14.12 16 16"}]],"focus":[["circle",{"cx":"12","cy":"12","r":"3"}],["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}]],"folder-archive":[["circle",{"cx":"15","cy":"19","r":"2"}],["path",{"d":"M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1"}],["path",{"d":"M15 11v-1"}],["path",{"d":"M15 17v-2"}]],"folder-bookmark":[["path",{"d":"M12 6v7.751a.25.25 0 00.407.195l2.28-1.834a.5.5 0 01.627 0l2.28 1.834a.25.25 0 00.406-.195V6"}],["path",{"d":"M20 20a2 2 0 002-2V8a2 2 0 00-2-2h-7.9a2 2 0 01-1.69-.9L9.6 3.9A2 2 0 007.93 3H4a2 2 0 00-2 2v13a2 2 0 002 2z"}]],"folder-check":[["path",{"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{"d":"m9 13 2 2 4-4"}]],"folder-clock":[["path",{"d":"M16 14v2.2l1.6 1"}],["path",{"d":"M7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2"}],["circle",{"cx":"16","cy":"16","r":"6"}]],"folder-closed":[["path",{"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{"d":"M2 10h20"}]],"folder-code":[["path",{"d":"M10 10.5 8 13l2 2.5"}],["path",{"d":"m14 10.5 2 2.5-2 2.5"}],["path",{"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"}]],"folder-cog":[["path",{"d":"M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3"}],["path",{"d":"m14.305 19.53.923-.382"}],["path",{"d":"m15.228 16.852-.923-.383"}],["path",{"d":"m16.852 15.228-.383-.923"}],["path",{"d":"m16.852 20.772-.383.924"}],["path",{"d":"m19.148 15.228.383-.923"}],["path",{"d":"m19.53 21.696-.382-.924"}],["path",{"d":"m20.772 16.852.924-.383"}],["path",{"d":"m20.772 19.148.924.383"}],["circle",{"cx":"18","cy":"18","r":"3"}]],"folder-dot":[["path",{"d":"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"}],["circle",{"cx":"12","cy":"13","r":"1"}]],"folder-down":[["path",{"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{"d":"M12 10v6"}],["path",{"d":"m15 13-3 3-3-3"}]],"folder-git-2":[["path",{"d":"M18 19a5 5 0 0 1-5-5v8"}],["path",{"d":"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"}],["circle",{"cx":"13","cy":"12","r":"2"}],["circle",{"cx":"20","cy":"19","r":"2"}]],"folder-git":[["circle",{"cx":"12","cy":"13","r":"2"}],["path",{"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{"d":"M14 13h3"}],["path",{"d":"M7 13h3"}]],"folder-heart":[["path",{"d":"M10.638 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3.417"}],["path",{"d":"M14.62 18.8A2.25 2.25 0 1 1 18 15.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"}]],"folder-input":[["path",{"d":"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"}],["path",{"d":"M2 13h10"}],["path",{"d":"m9 16 3-3-3-3"}]],"folder-kanban":[["path",{"d":"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"}],["path",{"d":"M8 10v4"}],["path",{"d":"M12 10v2"}],["path",{"d":"M16 10v6"}]],"folder-key":[["path",{"d":"M13 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.36"}],["path",{"d":"M19 12v6"}],["path",{"d":"M19 14h2"}],["circle",{"cx":"19","cy":"20","r":"2"}]],"folder-lock":[["rect",{"width":"8","height":"5","x":"14","y":"17","rx":"1"}],["path",{"d":"M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5"}],["path",{"d":"M20 17v-2a2 2 0 1 0-4 0v2"}]],"folder-minus":[["path",{"d":"M9 13h6"}],["path",{"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]],"folder-open-dot":[["path",{"d":"m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"}],["circle",{"cx":"14","cy":"15","r":"1"}]],"folder-open":[["path",{"d":"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"}]],"folder-output":[["path",{"d":"M2 7.5V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-1.5"}],["path",{"d":"M2 13h10"}],["path",{"d":"m5 10-3 3 3 3"}]],"folder-pen":[["path",{"d":"M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"}],["path",{"d":"M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"}]],"folder-plus":[["path",{"d":"M12 10v6"}],["path",{"d":"M9 13h6"}],["path",{"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]],"folder-root":[["path",{"d":"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"}],["circle",{"cx":"12","cy":"13","r":"2"}],["path",{"d":"M12 15v5"}]],"folder-search-2":[["circle",{"cx":"11.5","cy":"12.5","r":"2.5"}],["path",{"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{"d":"M13.3 14.3 15 16"}]],"folder-search":[["path",{"d":"M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1"}],["path",{"d":"m21 21-1.9-1.9"}],["circle",{"cx":"17","cy":"17","r":"3"}]],"folder-symlink":[["path",{"d":"M2 9.35V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7"}],["path",{"d":"m8 16 3-3-3-3"}]],"folder-sync":[["path",{"d":"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5"}],["path",{"d":"M12 10v4h4"}],["path",{"d":"m12 14 1.535-1.605a5 5 0 0 1 8 1.5"}],["path",{"d":"M22 22v-4h-4"}],["path",{"d":"m22 18-1.535 1.605a5 5 0 0 1-8-1.5"}]],"folder-tree":[["path",{"d":"M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"}],["path",{"d":"M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"}],["path",{"d":"M3 5a2 2 0 0 0 2 2h3"}],["path",{"d":"M3 3v13a2 2 0 0 0 2 2h3"}]],"folder-up":[["path",{"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{"d":"M12 10v6"}],["path",{"d":"m9 13 3-3 3 3"}]],"folder-user":[["path",{"d":"M10.254 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2V9.255"}],["path",{"d":"M22 22a4 4 0 0 0-8 0"}],["circle",{"cx":"18","cy":"15","r":"3"}]],"folder-users":[["path",{"d":"M5.254 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2V9.255"}],["circle",{"cx":"13","cy":"15","r":"3"}],["path",{"d":"M17 22a4 4 0 0 0-8 0"}],["path",{"d":"M22 22A4 4 0 0 0 20.24 18.686 1 1 0 0 1 20.1 17.143 3 3 0 0 0 19.5 12.402"}]],"folder-x":[["path",{"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],["path",{"d":"m9.5 10.5 5 5"}],["path",{"d":"m14.5 10.5-5 5"}]],"folder":[["path",{"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}]],"folders":[["path",{"d":"M20 5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 1 1.2.6l.6.8a1.5 1.5 0 0 0 1.2.6z"}],["path",{"d":"M3 8.268a2 2 0 0 0-1 1.738V19a2 2 0 0 0 2 2h11a2 2 0 0 0 1.732-1"}]],"footprints":[["path",{"d":"M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"}],["path",{"d":"M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"}],["path",{"d":"M16 17h4"}],["path",{"d":"M4 13h4"}]],"forklift":[["path",{"d":"M12 12H5a2 2 0 0 0-2 2v5"}],["path",{"d":"M15 19h7"}],["path",{"d":"M16 19V2"}],["path",{"d":"M6 12V7a2 2 0 0 1 2-2h2.172a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 16 10.828"}],["path",{"d":"M7 19h4"}],["circle",{"cx":"13","cy":"19","r":"2"}],["circle",{"cx":"5","cy":"19","r":"2"}]],"form":[["path",{"d":"M4 14h6"}],["path",{"d":"M4 2h10"}],["rect",{"x":"4","y":"18","width":"16","height":"4","rx":"1"}],["rect",{"x":"4","y":"6","width":"16","height":"4","rx":"1"}]],"forward":[["path",{"d":"m15 17 5-5-5-5"}],["path",{"d":"M4 18v-2a4 4 0 0 1 4-4h12"}]],"frame":[["line",{"x1":"22","x2":"2","y1":"6","y2":"6"}],["line",{"x1":"22","x2":"2","y1":"18","y2":"18"}],["line",{"x1":"6","x2":"6","y1":"2","y2":"22"}],["line",{"x1":"18","x2":"18","y1":"2","y2":"22"}]],"fuel":[["path",{"d":"M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"}],["path",{"d":"M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16"}],["path",{"d":"M2 21h13"}],["path",{"d":"M3 9h11"}]],"fullscreen":[["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}],["rect",{"width":"10","height":"8","x":"7","y":"8","rx":"1"}]],"funnel-plus":[["path",{"d":"M13.354 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l1.218-1.348"}],["path",{"d":"M16 6h6"}],["path",{"d":"M19 3v6"}]],"funnel-x":[["path",{"d":"M12.531 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14v6a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341l.427-.473"}],["path",{"d":"m16.5 3.5 5 5"}],["path",{"d":"m21.5 3.5-5 5"}]],"funnel":[["path",{"d":"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"}]],"galaxy":[["path",{"d":"M16.005 15.108a5.041 6.52 28.25 00-8.008-6.217 5.041 6.52 28.25 008.008 6.217A11.884 7.288-60.76 014.029 7.001"}],["path",{"d":"M17 21h.01"}],["path",{"d":"M7 3h.01"}],["path",{"d":"M7.997 8.891a11.885 7.288-60.756 0111.977 8.107"}],["circle",{"cx":"12","cy":"12","r":"1","fill":"currentColor"}]],"gallery-horizontal-end":[["path",{"d":"M2 7v10"}],["path",{"d":"M6 5v14"}],["rect",{"width":"12","height":"18","x":"10","y":"3","rx":"2"}]],"gallery-horizontal":[["path",{"d":"M2 3v18"}],["rect",{"width":"12","height":"18","x":"6","y":"3","rx":"2"}],["path",{"d":"M22 3v18"}]],"gallery-thumbnails":[["rect",{"width":"18","height":"14","x":"3","y":"3","rx":"2"}],["path",{"d":"M4 21h1"}],["path",{"d":"M9 21h1"}],["path",{"d":"M14 21h1"}],["path",{"d":"M19 21h1"}]],"gallery-vertical-end":[["path",{"d":"M7 2h10"}],["path",{"d":"M5 6h14"}],["rect",{"width":"18","height":"12","x":"3","y":"10","rx":"2"}]],"gallery-vertical":[["path",{"d":"M3 2h18"}],["rect",{"width":"18","height":"12","x":"3","y":"6","rx":"2"}],["path",{"d":"M3 22h18"}]],"gamepad-2":[["line",{"x1":"6","x2":"10","y1":"11","y2":"11"}],["line",{"x1":"8","x2":"8","y1":"9","y2":"13"}],["line",{"x1":"15","x2":"15.01","y1":"12","y2":"12"}],["line",{"x1":"18","x2":"18.01","y1":"10","y2":"10"}],["path",{"d":"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"}]],"gamepad-directional":[["path",{"d":"M11.146 15.854a1.207 1.207 0 0 1 1.708 0l1.56 1.56A2 2 0 0 1 15 18.828V21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2.172a2 2 0 0 1 .586-1.414z"}],["path",{"d":"M18.828 15a2 2 0 0 1-1.414-.586l-1.56-1.56a1.207 1.207 0 0 1 0-1.708l1.56-1.56A2 2 0 0 1 18.828 9H21a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z"}],["path",{"d":"M6.586 14.414A2 2 0 0 1 5.172 15H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2.172a2 2 0 0 1 1.414.586l1.56 1.56a1.207 1.207 0 0 1 0 1.708z"}],["path",{"d":"M9 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.172a2 2 0 0 1-.586 1.414l-1.56 1.56a1.207 1.207 0 0 1-1.708 0l-1.56-1.56A2 2 0 0 1 9 5.172z"}]],"gamepad":[["line",{"x1":"6","x2":"10","y1":"12","y2":"12"}],["line",{"x1":"8","x2":"8","y1":"10","y2":"14"}],["line",{"x1":"15","x2":"15.01","y1":"13","y2":"13"}],["line",{"x1":"18","x2":"18.01","y1":"11","y2":"11"}],["rect",{"width":"20","height":"12","x":"2","y":"6","rx":"2"}]],"gap-horizontal":[["path",{"d":"M12 2v2"}],["path",{"d":"M12 8v2"}],["path",{"d":"M12 14v2"}],["path",{"d":"M12 20v2"}],["path",{"d":"M21 3h-3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3"}],["path",{"d":"M3 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3"}]],"gap-vertical":[["path",{"d":"M2 12h2"}],["path",{"d":"M8 12h2"}],["path",{"d":"M14 12h2"}],["path",{"d":"M20 12h2"}],["path",{"d":"M3 21v-3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"}],["path",{"d":"M3 3v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3"}]],"gauge":[["path",{"d":"m12 14 4-4"}],["path",{"d":"M3.34 19a10 10 0 1 1 17.32 0"}]],"gavel":[["path",{"d":"m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381"}],["path",{"d":"m16 16 6-6"}],["path",{"d":"m21.5 10.5-8-8"}],["path",{"d":"m8 8 6-6"}],["path",{"d":"m8.5 7.5 8 8"}]],"gem":[["path",{"d":"M10.5 3 8 9l4 13 4-13-2.5-6"}],["path",{"d":"M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"}],["path",{"d":"M2 9h20"}]],"georgian-lari":[["path",{"d":"M10 10V3"}],["path",{"d":"M14 10V3"}],["path",{"d":"M19 13a7 7 0 10-7 7"}],["path",{"d":"M5 20h14"}]],"germ-off":[["path",{"d":"m11 2 .925 1.848"}],["path",{"d":"M13 15h.01"}],["path",{"d":"M13.424 7.768a2 2 0 112.808 2.808"}],["path",{"d":"m16 21-1-2.472"}],["path",{"d":"M16.988 16.988A12 12 0 019 20a5 5 0 01-2.759-9.171 8.8 8.8 0 002.307-2.28"}],["path",{"d":"m19 2-1 1.804"}],["path",{"d":"m2 19 2.746-1.373"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"m22 16-2.474-2.13a12 12 0 001.376-3.786 6 6 0 00-10.313-5.151"}],["path",{"d":"m22 5-1.804 1"}],["path",{"d":"m3 10 2 2"}],["path",{"d":"M9 16h.01"}],["path",{"d":"M9 20v2"}]],"germ":[["path",{"d":"m11 2 .925 1.848"}],["path",{"d":"M13 15h.01"}],["path",{"d":"m16 21-1-2.472"}],["path",{"d":"m19 2-1 1.804"}],["path",{"d":"m2 19 2.746-1.373"}],["path",{"d":"m22 16-2.474-2.13"}],["path",{"d":"m22 5-1.804 1"}],["path",{"d":"m3 10 2 2"}],["path",{"d":"M9 16h.01"}],["path",{"d":"M9 20v2"}],["path",{"d":"M9.33 7.035c-.51 1.478-1.786 2.93-3.09 3.794A5 5 0 009 20a12.1 12.1 0 0011.902-9.916A6 6 0 009.33 7.035"}],["circle",{"cx":"15","cy":"9","r":"2"}]],"ghost":[["path",{"d":"M15 10v1"}],["path",{"d":"M7.528 20.472a1.6 1.6 0 012.277 0l1.057 1.056a1.6 1.6 0 002.276 0l1.057-1.056a1.6 1.6 0 012.277 0l1.114 1.114a1.4 1.4 0 002.414-1V10a8 8 0 00-16 0v10.586a1.4 1.4 0 002.414 1z"}],["path",{"d":"M9 10v1"}]],"gift":[["path",{"d":"M12 7v14"}],["path",{"d":"M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"}],["path",{"d":"M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"}],["rect",{"x":"3","y":"7","width":"18","height":"4","rx":"1"}]],"git-branch-minus":[["path",{"d":"M15 6a9 9 0 0 0-9 9V3"}],["path",{"d":"M21 18h-6"}],["circle",{"cx":"18","cy":"6","r":"3"}],["circle",{"cx":"6","cy":"18","r":"3"}]],"git-branch-plus":[["path",{"d":"M6 3v12"}],["path",{"d":"M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}],["path",{"d":"M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"}],["path",{"d":"M15 6a9 9 0 0 0-9 9"}],["path",{"d":"M18 15v6"}],["path",{"d":"M21 18h-6"}]],"git-branch":[["path",{"d":"M15 6a9 9 0 0 0-9 9V3"}],["circle",{"cx":"18","cy":"6","r":"3"}],["circle",{"cx":"6","cy":"18","r":"3"}]],"git-commit-horizontal":[["circle",{"cx":"12","cy":"12","r":"3"}],["line",{"x1":"3","x2":"9","y1":"12","y2":"12"}],["line",{"x1":"15","x2":"21","y1":"12","y2":"12"}]],"git-commit-vertical":[["path",{"d":"M12 3v6"}],["circle",{"cx":"12","cy":"12","r":"3"}],["path",{"d":"M12 15v6"}]],"git-compare-arrows":[["circle",{"cx":"5","cy":"6","r":"3"}],["path",{"d":"M12 6h5a2 2 0 0 1 2 2v7"}],["path",{"d":"m15 9-3-3 3-3"}],["circle",{"cx":"19","cy":"18","r":"3"}],["path",{"d":"M12 18H7a2 2 0 0 1-2-2V9"}],["path",{"d":"m9 15 3 3-3 3"}]],"git-compare":[["circle",{"cx":"18","cy":"18","r":"3"}],["circle",{"cx":"6","cy":"6","r":"3"}],["path",{"d":"M13 6h3a2 2 0 0 1 2 2v7"}],["path",{"d":"M11 18H8a2 2 0 0 1-2-2V9"}]],"git-fork":[["circle",{"cx":"12","cy":"18","r":"3"}],["circle",{"cx":"6","cy":"6","r":"3"}],["circle",{"cx":"18","cy":"6","r":"3"}],["path",{"d":"M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"}],["path",{"d":"M12 12v3"}]],"git-graph":[["circle",{"cx":"5","cy":"6","r":"3"}],["path",{"d":"M5 9v6"}],["circle",{"cx":"5","cy":"18","r":"3"}],["path",{"d":"M12 3v18"}],["circle",{"cx":"19","cy":"6","r":"3"}],["path",{"d":"M16 15.7A9 9 0 0 0 19 9"}]],"git-merge-conflict":[["path",{"d":"M12 6h4a2 2 0 0 1 2 2v7"}],["path",{"d":"M6 12v9"}],["path",{"d":"m8.5 3.5-5 5"}],["path",{"d":"m8.5 8.5-5-5"}],["circle",{"cx":"18","cy":"18","r":"3"}]],"git-merge":[["circle",{"cx":"18","cy":"18","r":"3"}],["circle",{"cx":"6","cy":"6","r":"3"}],["path",{"d":"M6 21V9a9 9 0 0 0 9 9"}]],"git-pull-request-arrow":[["circle",{"cx":"5","cy":"6","r":"3"}],["path",{"d":"M5 9v12"}],["circle",{"cx":"19","cy":"18","r":"3"}],["path",{"d":"m15 9-3-3 3-3"}],["path",{"d":"M12 6h5a2 2 0 0 1 2 2v7"}]],"git-pull-request-closed":[["path",{"d":"m15.5 3.5 5 5"}],["path",{"d":"m15.5 8.5 5-5"}],["path",{"d":"M18 11.62V15"}],["path",{"d":"M6 9v12"}],["circle",{"cx":"18","cy":"18","r":"3"}],["circle",{"cx":"6","cy":"6","r":"3"}]],"git-pull-request-create-arrow":[["circle",{"cx":"5","cy":"6","r":"3"}],["path",{"d":"M5 9v12"}],["path",{"d":"m15 9-3-3 3-3"}],["path",{"d":"M12 6h5a2 2 0 0 1 2 2v3"}],["path",{"d":"M19 15v6"}],["path",{"d":"M22 18h-6"}]],"git-pull-request-create":[["circle",{"cx":"6","cy":"6","r":"3"}],["path",{"d":"M6 9v12"}],["path",{"d":"M13 6h3a2 2 0 0 1 2 2v3"}],["path",{"d":"M18 15v6"}],["path",{"d":"M21 18h-6"}]],"git-pull-request-draft":[["circle",{"cx":"18","cy":"18","r":"3"}],["circle",{"cx":"6","cy":"6","r":"3"}],["path",{"d":"M18 6V5"}],["path",{"d":"M18 11v-1"}],["line",{"x1":"6","x2":"6","y1":"9","y2":"21"}]],"git-pull-request":[["circle",{"cx":"18","cy":"18","r":"3"}],["circle",{"cx":"6","cy":"6","r":"3"}],["path",{"d":"M13 6h3a2 2 0 0 1 2 2v7"}],["line",{"x1":"6","x2":"6","y1":"9","y2":"21"}]],"glass-water":[["path",{"d":"M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z"}],["path",{"d":"M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"}]],"glasses":[["circle",{"cx":"6","cy":"15","r":"4"}],["circle",{"cx":"18","cy":"15","r":"4"}],["path",{"d":"M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"}],["path",{"d":"M2.5 13 5 7c.7-1.3 1.4-2 3-2"}],["path",{"d":"M21.5 13 19 7c-.7-1.3-1.5-2-3-2"}]],"globe-ban":[["path",{"d":"M12 22a14.48 14.48 0 01-4.008-10C7.993 9.136 9 5.258 11 2.05A10 10 0 0012 22"}],["path",{"d":"m15.172 3.172 5.656 5.656"}],["path",{"d":"M15.86 14a14.5 14.5 0 01-3.859 8 10 10 0 009.949-9"}],["path",{"d":"M2 12h10.5"}],["circle",{"cx":"18","cy":"6","r":"4"}]],"globe-check":[["path",{"d":"m15 6 2 2 4-4"}],["path",{"d":"M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10"}]],"globe-code":[["path",{"d":"M15.5 10 13 7.5 15.5 5"}],["path",{"d":"M15.861 14A14.5 14.5 0 0112 22a14.48 14.48 0 010-20 10 10 0 109.888 11.5"}],["path",{"d":"M19.5 5 22 7.5 19.5 10"}],["path",{"d":"M2 12h8.5"}]],"globe-lock":[["path",{"d":"M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13"}],["path",{"d":"M2 12h8.5"}],["path",{"d":"M20 6V4a2 2 0 1 0-4 0v2"}],["rect",{"width":"8","height":"5","x":"14","y":"6","rx":"1"}]],"globe-off":[["path",{"d":"M10.114 4.462A14.5 14.5 0 0 1 12 2a10 10 0 0 1 9.313 13.643"}],["path",{"d":"M15.557 15.556A14.5 14.5 0 0 1 12 22 10 10 0 0 1 4.929 4.929"}],["path",{"d":"M15.892 10.234A14.5 14.5 0 0 0 12 2a10 10 0 0 0-3.643.687"}],["path",{"d":"M17.656 12H22"}],["path",{"d":"M19.071 19.071A10 10 0 0 1 12 22 14.5 14.5 0 0 1 8.44 8.45"}],["path",{"d":"M2 12h10"}],["path",{"d":"m2 2 20 20"}]],"globe-plus":[["path",{"d":"M15.929 10.563A14.5 14.5 0 0112 22a1 1 0 010-20 15 15 0 01.68.768"}],["path",{"d":"M19 2v6"}],["path",{"d":"M21.92 10.734A10 10 0 0112 22a14.5 14.5 0 010-20 10 10 0 011.266.08"}],["path",{"d":"M22 12H2"}],["path",{"d":"M22 5h-6"}]],"globe-x":[["path",{"d":"m16 3 5 5"}],["path",{"d":"M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10"}],["path",{"d":"m21 3-5 5"}]],"globe":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{"d":"M2 12h20"}]],"goal":[["path",{"d":"M12 13V2l8 4-8 4"}],["path",{"d":"M20.561 10.222a9 9 0 1 1-12.55-5.29"}],["path",{"d":"M8.002 9.997a5 5 0 1 0 8.9 2.02"}]],"gpu":[["path",{"d":"M2 17h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H2"}],["path",{"d":"M2 21V3"}],["path",{"d":"M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3"}],["circle",{"cx":"16","cy":"11","r":"2"}],["circle",{"cx":"8","cy":"11","r":"2"}]],"graduation-cap":[["path",{"d":"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"}],["path",{"d":"M22 10v6"}],["path",{"d":"M6 12.5V16a6 3 0 0 0 12 0v-3.5"}]],"grape":[["path",{"d":"M22 5V2l-5.89 5.89"}],["circle",{"cx":"16.6","cy":"15.89","r":"3"}],["circle",{"cx":"8.11","cy":"7.4","r":"3"}],["circle",{"cx":"12.35","cy":"11.65","r":"3"}],["circle",{"cx":"13.91","cy":"5.85","r":"3"}],["circle",{"cx":"18.15","cy":"10.09","r":"3"}],["circle",{"cx":"6.56","cy":"13.2","r":"3"}],["circle",{"cx":"10.8","cy":"17.44","r":"3"}],["circle",{"cx":"5","cy":"19","r":"3"}]],"graph-hub":[["circle",{"cx":"12","cy":"7","r":"4"}],["circle",{"cx":"4","cy":"19","r":"2"}],["circle",{"cx":"12","cy":"19","r":"2"}],["circle",{"cx":"20","cy":"19","r":"2"}],["path",{"d":"M8 7a4 4 0 0 0-4 4v6"}],["path",{"d":"M12 11v6"}],["path",{"d":"M16 7a4 4 0 0 1 4 4v6"}]],"graph-ring":[["path",{"d":"M17.006 19.241a8 8 0 0 1-10.011 0"}],["path",{"d":"M19.919 14.143a8 8 0 0 0-4.971-8.583"}],["path",{"d":"M4.081 14.143A8 8 0 0 1 9.052 5.56"}],["circle",{"cx":"12","cy":"5.001","r":"3"}],["circle",{"cx":"19","cy":"17","r":"3"}],["circle",{"cx":"5","cy":"17","r":"3"}]],"graph-star":[["path",{"d":"m12.342 9.316 1.764-3.527"}],["path",{"d":"m12.59 14.545 2.35 3.759"}],["path",{"d":"m13.982 12.332 4.03.447"}],["path",{"d":"M5.414 17.586 8.88 14.12"}],["path",{"d":"M9.025 9.742 5.317 5.505"}],["circle",{"cx":"11","cy":"12","r":"3"}],["circle",{"cx":"15","cy":"4","r":"2"}],["circle",{"cx":"16","cy":"20","r":"2"}],["circle",{"cx":"20","cy":"13","r":"2"}],["circle",{"cx":"4","cy":"19","r":"2"}],["circle",{"cx":"4","cy":"4","r":"2"}]],"grid-2x2-check":[["path",{"d":"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"}],["path",{"d":"m16 19 2 2 4-4"}]],"grid-2x2-plus":[["path",{"d":"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"}],["path",{"d":"M16 19h6"}],["path",{"d":"M19 22v-6"}]],"grid-2x2-x":[["path",{"d":"M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"}],["path",{"d":"m16.5 16.5 5 5"}],["path",{"d":"m16.5 21.5 5-5"}]],"grid-2x2":[["path",{"d":"M12 3v18"}],["path",{"d":"M3 12h18"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"grid-3x2":[["path",{"d":"M15 3v18"}],["path",{"d":"M3 12h18"}],["path",{"d":"M9 3v18"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"grid-3x3-off":[["path",{"d":"M15 9.344V3"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M20.414 20.414A2 2 0 0119 21H5a2 2 0 01-2-2V5a2 2 0 01.586-1.414"}],["path",{"d":"M20.656 15H21"}],["path",{"d":"M21 9h-6.344"}],["path",{"d":"M3 15h12v6"}],["path",{"d":"M3 9h6v12"}],["path",{"d":"M8.656 3H19a2 2 0 012 2v10.343"}],["path",{"d":"M9 3v.344"}]],"grid-3x3":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M3 9h18"}],["path",{"d":"M3 15h18"}],["path",{"d":"M9 3v18"}],["path",{"d":"M15 3v18"}]],"grip-horizontal":[["circle",{"cx":"12","cy":"9","r":"1"}],["circle",{"cx":"19","cy":"9","r":"1"}],["circle",{"cx":"5","cy":"9","r":"1"}],["circle",{"cx":"12","cy":"15","r":"1"}],["circle",{"cx":"19","cy":"15","r":"1"}],["circle",{"cx":"5","cy":"15","r":"1"}]],"grip-vertical":[["circle",{"cx":"9","cy":"12","r":"1"}],["circle",{"cx":"9","cy":"5","r":"1"}],["circle",{"cx":"9","cy":"19","r":"1"}],["circle",{"cx":"15","cy":"12","r":"1"}],["circle",{"cx":"15","cy":"5","r":"1"}],["circle",{"cx":"15","cy":"19","r":"1"}]],"grip":[["circle",{"cx":"12","cy":"5","r":"1"}],["circle",{"cx":"19","cy":"5","r":"1"}],["circle",{"cx":"5","cy":"5","r":"1"}],["circle",{"cx":"12","cy":"12","r":"1"}],["circle",{"cx":"19","cy":"12","r":"1"}],["circle",{"cx":"5","cy":"12","r":"1"}],["circle",{"cx":"12","cy":"19","r":"1"}],["circle",{"cx":"19","cy":"19","r":"1"}],["circle",{"cx":"5","cy":"19","r":"1"}]],"groceries":[["path",{"d":"M10 15h4"}],["path",{"d":"M19.424 11.095a2.5 2.5 0 00.471-2.309 2 2 0 00.424-3.286 2 2 0 00-2.143-3.322 2 2 0 00-.676.502 2 2 0 00-3.287.424 2.5 2.5 0 00-3.189 2.06A3 3 0 0012 11l4-4"}],["path",{"d":"M4 12.006A1 1 0 014.994 11H19a1 1 0 011 1v7a2 2 0 01-2 2H6a2 2 0 01-2-2z"}],["path",{"d":"M7 11a4 4 0 01-4-4V5a1 1 0 011-1h2a4 4 0 013.584 2.222"}]],"group":[["path",{"d":"M3 7V5c0-1.1.9-2 2-2h2"}],["path",{"d":"M17 3h2c1.1 0 2 .9 2 2v2"}],["path",{"d":"M21 17v2c0 1.1-.9 2-2 2h-2"}],["path",{"d":"M7 21H5c-1.1 0-2-.9-2-2v-2"}],["rect",{"width":"7","height":"5","x":"7","y":"7","rx":"1"}],["rect",{"width":"7","height":"5","x":"10","y":"12","rx":"1"}]],"guitar-electric":[["path",{"d":"m12.172 11.828 4.242-4.242"}],["path",{"d":"M16.414 7.586A2 2 0 0017 6.172V5a2 2 0 011.177-1.823L20.59 2.09a1 1 0 011.32 1.32l-1.088 2.412A2 2 0 0119 7h-1a2 2 0 00-1.586.586"}],["path",{"d":"m6 16 2 2"}],["path",{"d":"M8.23 9.85a3 3 0 011.28-1.454 1 1 0 011.496.815 4 4 0 003.783 3.783 1 1 0 01.815 1.496 3 3 0 01-1.454 1.28l-.92.38A2 2 0 0012 18a4 4 0 01-4 4 6 6 0 01-6-6 4 4 0 014-4 2 2 0 001.85-1.23z"}]],"guitar":[["path",{"d":"m11.9 12.1 4.514-4.514"}],["path",{"d":"M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z"}],["path",{"d":"m6 16 2 2"}],["path",{"d":"M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z"}]],"half-note":[["circle",{"cx":"12","cy":"18","r":"4"}],["path",{"d":"M16 18V2"}]],"ham":[["path",{"d":"M13.144 21.144A7.274 10.445 45 1 0 2.856 10.856"}],["path",{"d":"M13.144 21.144A7.274 4.365 45 0 0 2.856 10.856a7.274 4.365 45 0 0 10.288 10.288"}],["path",{"d":"M16.565 10.435 18.6 8.4a2.501 2.501 0 1 0 1.65-4.65 2.5 2.5 0 1 0-4.66 1.66l-2.024 2.025"}],["path",{"d":"m8.5 16.5-1-1"}]],"hamburger":[["path",{"d":"M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25"}],["path",{"d":"M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2"}],["path",{"d":"M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0"}],["path",{"d":"m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2"}]],"hammer":[["path",{"d":"m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9"}],["path",{"d":"m18 15 4-4"}],["path",{"d":"m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5"}]],"hand-coins":[["path",{"d":"M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"}],["path",{"d":"m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"}],["path",{"d":"m2 16 6 6"}],["circle",{"cx":"16","cy":"9","r":"2.9"}],["circle",{"cx":"6","cy":"5","r":"3"}]],"hand-fist":[["path",{"d":"M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0"}],["path",{"d":"M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5"}],["path",{"d":"M9 5A2 2 0 1 0 5 5V10"}],["path",{"d":"M9 7V4A2 2 0 1 1 13 4V7.268"}]],"hand-grab":[["path",{"d":"M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4"}],["path",{"d":"M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"}],["path",{"d":"M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5"}],["path",{"d":"M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2"}],["path",{"d":"M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0"}]],"hand-heart":[["path",{"d":"M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"}],["path",{"d":"m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95"}],["path",{"d":"m2 15 6 6"}],["path",{"d":"m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91"}]],"hand-helping":[["path",{"d":"M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"}],["path",{"d":"m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"}],["path",{"d":"m2 13 6 6"}]],"hand-metal":[["path",{"d":"M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4"}],["path",{"d":"M14 11V9a2 2 0 1 0-4 0v2"}],["path",{"d":"M10 10.5V5a2 2 0 1 0-4 0v9"}],["path",{"d":"m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5"}]],"hand-platter":[["path",{"d":"M12 3V2"}],["path",{"d":"m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5"}],["path",{"d":"M2 14h12a2 2 0 0 1 0 4h-2"}],["path",{"d":"M4 10h16"}],["path",{"d":"M5 10a7 7 0 0 1 14 0"}],["path",{"d":"M5 14v6a1 1 0 0 1-1 1H2"}]],"hand-truck":[["path",{"d":"m15.614 7.108-2.115-4.53a1 1 0 0 0-1.329-.484l-2.3 1.073a1 1 0 0 0-.484 1.33l4.783 10.247a1 1 0 0 0 1.329.483l5.925-2.765a1 1 0 0 0 .483-1.329l-2.245-4.81a1 1 0 0 0-1.329-.484l-6.831 3.188"}],["path",{"d":"M2 3.268a2 2 0 0 1 2.812.886l7 15a2 2 0 0 0 2.659.967L20 17.54"}],["circle",{"cx":"10","cy":"20","r":"2"}]],"hand":[["path",{"d":"M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"}],["path",{"d":"M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"}],["path",{"d":"M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"}],["path",{"d":"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"}]],"handbag":[["path",{"d":"M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"}],["path",{"d":"M8 11V6a4 4 0 0 1 8 0v5"}]],"handle-bottom-right":[["path",{"d":"M21 8 8 21"}],["path",{"d":"m21 15-6 6"}]],"handshake":[["path",{"d":"m11 17 2 2a1 1 0 1 0 3-3"}],["path",{"d":"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"}],["path",{"d":"m21 3 1 11h-2"}],["path",{"d":"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"}],["path",{"d":"M3 4h8"}]],"hard-drive-download":[["path",{"d":"M12 2v8"}],["path",{"d":"m16 6-4 4-4-4"}],["rect",{"width":"20","height":"8","x":"2","y":"14","rx":"2"}],["path",{"d":"M6 18h.01"}],["path",{"d":"M10 18h.01"}]],"hard-drive-upload":[["path",{"d":"m16 6-4-4-4 4"}],["path",{"d":"M12 2v8"}],["rect",{"width":"20","height":"8","x":"2","y":"14","rx":"2"}],["path",{"d":"M6 18h.01"}],["path",{"d":"M10 18h.01"}]],"hard-drive":[["path",{"d":"M10 16h.01"}],["path",{"d":"M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}],["path",{"d":"M21.946 12.013H2.054"}],["path",{"d":"M6 16h.01"}]],"hard-hat":[["path",{"d":"M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"}],["path",{"d":"M14 6a6 6 0 0 1 6 6v3"}],["path",{"d":"M4 15v-3a6 6 0 0 1 6-6"}],["rect",{"x":"2","y":"15","width":"20","height":"4","rx":"1"}]],"hash":[["line",{"x1":"4","x2":"20","y1":"9","y2":"9"}],["line",{"x1":"4","x2":"20","y1":"15","y2":"15"}],["line",{"x1":"10","x2":"8","y1":"3","y2":"21"}],["line",{"x1":"16","x2":"14","y1":"3","y2":"21"}]],"hat-glasses":[["path",{"d":"M14 18a2 2 0 0 0-4 0"}],["path",{"d":"m19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11"}],["path",{"d":"M2 11h20"}],["circle",{"cx":"17","cy":"18","r":"3"}],["circle",{"cx":"7","cy":"18","r":"3"}]],"haze":[["path",{"d":"m5.2 6.2 1.4 1.4"}],["path",{"d":"M2 13h2"}],["path",{"d":"M20 13h2"}],["path",{"d":"m17.4 7.6 1.4-1.4"}],["path",{"d":"M22 17H2"}],["path",{"d":"M22 21H2"}],["path",{"d":"M16 13a4 4 0 0 0-8 0"}],["path",{"d":"M12 5V2.5"}]],"hd":[["path",{"d":"M10 12H6"}],["path",{"d":"M10 15V9"}],["path",{"d":"M14 14.5a.5.5 0 0 0 .5.5h1a2.5 2.5 0 0 0 2.5-2.5v-1A2.5 2.5 0 0 0 15.5 9h-1a.5.5 0 0 0-.5.5z"}],["path",{"d":"M6 15V9"}],["rect",{"x":"2","y":"5","width":"20","height":"14","rx":"2"}]],"hdmi-port":[["path",{"d":"M22 9a1 1 0 00-1-1H3a1 1 0 00-1 1v4a1 1 0 001 1h.5a2 2 0 011.6.8l.3.4A2 2 0 007 16h10a2 2 0 001.6-.8l.3-.4a2 2 0 011.6-.8h.5a1 1 0 001-1z"}],["path",{"d":"M8 12h8"}]],"heading-1":[["path",{"d":"M4 12h8"}],["path",{"d":"M4 18V6"}],["path",{"d":"M12 18V6"}],["path",{"d":"m17 12 3-2v8"}]],"heading-2":[["path",{"d":"M4 12h8"}],["path",{"d":"M4 18V6"}],["path",{"d":"M12 18V6"}],["path",{"d":"M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1"}]],"heading-3":[["path",{"d":"M4 12h8"}],["path",{"d":"M4 18V6"}],["path",{"d":"M12 18V6"}],["path",{"d":"M17.5 10.5c1.7-1 3.5 0 3.5 1.5a2 2 0 0 1-2 2"}],["path",{"d":"M17 17.5c2 1.5 4 .3 4-1.5a2 2 0 0 0-2-2"}]],"heading-4":[["path",{"d":"M12 18V6"}],["path",{"d":"M17 10v3a1 1 0 0 0 1 1h3"}],["path",{"d":"M21 10v8"}],["path",{"d":"M4 12h8"}],["path",{"d":"M4 18V6"}]],"heading-5":[["path",{"d":"M4 12h8"}],["path",{"d":"M4 18V6"}],["path",{"d":"M12 18V6"}],["path",{"d":"M17 13v-3h4"}],["path",{"d":"M17 17.7c.4.2.8.3 1.3.3 1.5 0 2.7-1.1 2.7-2.5S19.8 13 18.3 13H17"}]],"heading-6":[["path",{"d":"M4 12h8"}],["path",{"d":"M4 18V6"}],["path",{"d":"M12 18V6"}],["circle",{"cx":"19","cy":"16","r":"2"}],["path",{"d":"M20 10c-2 2-3 3.5-3 6"}]],"headphone-off":[["path",{"d":"M21 14h-1.343"}],["path",{"d":"M9.128 3.47A9 9 0 0 1 21 12v3.343"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M20.414 20.414A2 2 0 0 1 19 21h-1a2 2 0 0 1-2-2v-3"}],["path",{"d":"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 2.636-6.364"}]],"headphones":[["path",{"d":"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"}]],"headset":[["path",{"d":"M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"}],["path",{"d":"M21 16v2a4 4 0 0 1-4 4h-5"}]],"heart-crack":[["path",{"d":"M12.409 5.824c-.702.792-1.15 1.496-1.415 2.166l2.153 2.156a.5.5 0 0 1 0 .707l-2.293 2.293a.5.5 0 0 0 0 .707L12 15"}],["path",{"d":"M13.508 20.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.677.6.6 0 0 0 .818.001A5.5 5.5 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5z"}]],"heart-handshake":[["path",{"d":"M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"}]],"heart-minus":[["path",{"d":"m14.876 18.99-1.368 1.323a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.244 1.572"}],["path",{"d":"M15 15h6"}]],"heart-off":[["path",{"d":"M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655"}],["path",{"d":"m16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761"}],["path",{"d":"m2 2 20 20"}]],"heart-plus":[["path",{"d":"m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49"}],["path",{"d":"M15 15h6"}],["path",{"d":"M18 12v6"}]],"heart-pulse":[["path",{"d":"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}],["path",{"d":"M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"}]],"heart-x":[["path",{"d":"m15.5 12.5 5 5"}],["path",{"d":"m20.5 12.5-5 5"}],["path",{"d":"M21.955 8.774a5.5 5.5 0 0 0-9.546-2.95.6.6 0 0 1-.818 0A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.508 5.332a2 2 0 0 0 2.57.352"}]],"heart":[["path",{"d":"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"}]],"heater":[["path",{"d":"M11 8c2-3-2-3 0-6"}],["path",{"d":"M15.5 8c2-3-2-3 0-6"}],["path",{"d":"M6 10h.01"}],["path",{"d":"M6 14h.01"}],["path",{"d":"M10 16v-4"}],["path",{"d":"M14 16v-4"}],["path",{"d":"M18 16v-4"}],["path",{"d":"M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3"}],["path",{"d":"M5 20v2"}],["path",{"d":"M19 20v2"}]],"helicopter":[["path",{"d":"M11 17v4"}],["path",{"d":"M14 3v8a2 2 0 0 0 2 2h5.865"}],["path",{"d":"M17 17v4"}],["path",{"d":"M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z"}],["path",{"d":"M2 10v5"}],["path",{"d":"M6 3h16"}],["path",{"d":"M7 21h14"}],["path",{"d":"M8 13H2"}]],"hexagon":[["path",{"d":"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"}]],"highlighter":[["path",{"d":"m9 11-6 6v3h9l3-3"}],["path",{"d":"m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"}]],"hiking-stick":[["path",{"d":"M13.5 10.5 2 22"}],["path",{"d":"M16.352 11.648a1.205 1.205 0 01-1.704 0l-2.296-2.296a1.205 1.205 0 010-1.704l.72-.72a2 2 0 011.022-.546l.599-.12a2 2 0 001.569-1.57l.12-.598a2 2 0 01.546-1.022l.72-.72a1.205 1.205 0 011.704 0l2.296 2.296a1.205 1.205 0 010 1.704l-6.02 6.02a1 1 0 103 3l.201-.201A7.4 7.4 0 0021 9.93V7"}],["path",{"d":"m6 21-3-3"}]],"hockey-stick":[["path",{"d":"M11 4v4c0 1.1-2.025 2-4.5 2S2 9.1 2 8V4"}],["path",{"d":"M18.21 3.106a2 2 0 013.579 1.789l-6.895 13.789A6 6 0 019.529 22H4.5a1 1 0 010-5h5.528a2 2 0 001.788-1.105z"}],["path",{"d":"m18.59 11.295-3.578-1.789"}],["path",{"d":"m20.79 6.895-3.578-1.789"}],["path",{"d":"M7 17v5"}],["ellipse",{"cx":"6.5","cy":"4","rx":"4.5","ry":"2"}]],"hop-off":[["path",{"d":"M10.82 16.12c1.69.6 3.91.79 5.18.85.28.01.53-.09.7-.27"}],["path",{"d":"M11.14 20.57c.52.24 2.44 1.12 4.08 1.37.46.06.86-.25.9-.71.12-1.52-.3-3.43-.5-4.28"}],["path",{"d":"M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .7-.26"}],["path",{"d":"M17.99 5.52a20.83 20.83 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-1.17.1-2.5.02-3.9-.25"}],["path",{"d":"M20.57 11.14c.24.52 1.12 2.44 1.37 4.08.04.3-.08.59-.31.75"}],["path",{"d":"M4.93 4.93a10 10 0 0 0-.67 13.4c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.85.85 0 0 0 .48-.24"}],["path",{"d":"M5.52 17.99c1.05.95 2.91 2.42 4.5 3.15a.8.8 0 0 0 1.13-.68c.2-2.34-.33-5.3-1.57-8.28"}],["path",{"d":"M8.35 2.68a10 10 0 0 1 9.98 1.58c.43.35.4.96-.12 1.17-1.5.6-4.3.98-6.07 1.05"}],["path",{"d":"m2 2 20 20"}]],"hop":[["path",{"d":"M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18"}],["path",{"d":"M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88"}],["path",{"d":"M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36"}],["path",{"d":"M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87"}],["path",{"d":"M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08"}],["path",{"d":"M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57"}],["path",{"d":"M4.93 4.93 3 3a.7.7 0 0 1 0-1"}],["path",{"d":"M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15"}]],"hospital":[["path",{"d":"M12 7v4"}],["path",{"d":"M14 21v-3a2 2 0 0 0-4 0v3"}],["path",{"d":"M14 9h-4"}],["path",{"d":"M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"}],["path",{"d":"M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"}]],"hot-air-balloon":[["path",{"d":"M11.5 18C10 15 9 12 9 9a3 7 0 0 1 6 0c0 3-1 6-2.5 9"}],["path",{"d":"M15 18c3-3 5-5 5-9A8 7 0 0 0 4 9c0 4 2 6 5 9"}],["path",{"d":"M15 18H9v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1z"}]],"hotel":[["path",{"d":"M10 22v-6.57"}],["path",{"d":"M12 11h.01"}],["path",{"d":"M12 7h.01"}],["path",{"d":"M14 15.43V22"}],["path",{"d":"M15 16a5 5 0 0 0-6 0"}],["path",{"d":"M16 11h.01"}],["path",{"d":"M16 7h.01"}],["path",{"d":"M8 11h.01"}],["path",{"d":"M8 7h.01"}],["rect",{"x":"4","y":"2","width":"16","height":"20","rx":"2"}]],"hourglass-cog":[["path",{"d":"m14.305 19.53.923-.382"}],["path",{"d":"m15.228 16.852-.923-.383"}],["path",{"d":"m16.852 15.228-.383-.923"}],["path",{"d":"m16.852 20.772-.383.924"}],["path",{"d":"M17 2v4.172a2 2 0 0 1-.586 1.414l-8.828 8.828A2 2 0 0 0 7 17.828V22"}],["path",{"d":"m19.148 15.228.383-.923"}],["path",{"d":"m19.53 21.696-.382-.924"}],["path",{"d":"m20.772 16.852.924-.383"}],["path",{"d":"m20.772 19.148.924.383"}],["path",{"d":"M5 22h6.159"}],["path",{"d":"M5 2h14"}],["path",{"d":"M7 2v4.172a2 2 0 0 0 .586 1.414l5.188 5.188"}],["circle",{"cx":"18","cy":"18","r":"3"}]],"hourglass":[["path",{"d":"M5 22h14"}],["path",{"d":"M5 2h14"}],["path",{"d":"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"}],["path",{"d":"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"}]],"house-arrow-left":[["path",{"d":"M12.343 21H5a2 2 0 01-2-2v-9a2 2 0 01.709-1.527l7-6a2 2 0 012.582 0l7 6A2 2 0 0121 10.001v2.354"}],["path",{"d":"m18 15-3 3"}],["path",{"d":"M21 18h-6l3 3"}],["path",{"d":"M9 21v-8a1 1 0 011-.999h4a1 1 0 01.857.485"}]],"house-arrow-right":[["path",{"d":"M12.353 21H5a2 2 0 01-2-2v-9a2 2 0 01.709-1.528l7-6a2 2 0 012.582 0l7 6A2 2 0 0121 10v2.344"}],["path",{"d":"M14.87 12.508A1 1 0 0014 12h-4a1 1 0 00-1 1v8"}],["path",{"d":"m17.999 21 3-3h-6"}],["path",{"d":"m20.999 18-3-3"}]],"house-cog":[["path",{"d":"M10.584 21H5a2 2 0 01-2-2v-9a2 2 0 01.709-1.527l7-6a2 2 0 012.582 0l7 6A2 2 0 0121 10.001v.583"}],["path",{"d":"M14 12H10a1 1 0 00-1 1v8"}],["path",{"d":"m14.305 19.53.923-.382"}],["path",{"d":"m15.229 16.852-.924-.383"}],["path",{"d":"m16.852 15.228-.383-.923"}],["path",{"d":"m16.852 20.773-.383.924"}],["path",{"d":"m19.148 15.228.383-.923"}],["path",{"d":"m19.53 21.697-.382-.924"}],["path",{"d":"m20.773 16.852.922-.383"}],["path",{"d":"m20.773 19.148.922.383"}],["circle",{"cx":"18","cy":"18","r":"3"}]],"house-heart":[["path",{"d":"M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"}],["path",{"d":"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]],"house-plug":[["path",{"d":"M10 12V8.964"}],["path",{"d":"M14 12V8.964"}],["path",{"d":"M15 12a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z"}],["path",{"d":"M8.5 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-2"}]],"house-plus":[["path",{"d":"M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35"}],["path",{"d":"M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8"}],["path",{"d":"M15 18h6"}],["path",{"d":"M18 15v6"}]],"house-wifi":[["path",{"d":"M9.5 13.866a4 4 0 0 1 5 .01"}],["path",{"d":"M12 17h.01"}],["path",{"d":"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}],["path",{"d":"M7 10.754a8 8 0 0 1 10 0"}]],"house":[["path",{"d":"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{"d":"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]],"houses":[["path",{"d":"m12.681 4.24.834-.715a1.45 1.45 0 011.88 0l5.09 4.364A1.45 1.45 0 0121 9v6.546a1.45 1.45 0 01-1 1.381"}],["path",{"d":"M15.485 11.889A1.45 1.45 0 0116 13v6.546A1.454 1.454 0 0114.546 21H4.364a1.454 1.454 0 01-1.454-1.454V13a1.45 1.45 0 01.515-1.111l5.09-4.364a1.45 1.45 0 011.88 0z"}],["path",{"d":"M7.41 20.546v-4a1 1 0 011-1h2a1 1 0 011 1v4"}]],"ice-cream-bowl":[["path",{"d":"M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6m-4 4h8m-4-3v3M5.14 11a3.5 3.5 0 1 1 6.71 0"}],["path",{"d":"M12.14 11a3.5 3.5 0 1 1 6.71 0"}],["path",{"d":"M15.5 6.5a3.5 3.5 0 1 0-7 0"}]],"ice-cream-cone":[["path",{"d":"m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11"}],["path",{"d":"M17 7A5 5 0 0 0 7 7"}],["path",{"d":"M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"}]],"id-card-lanyard":[["path",{"d":"M13.5 8h-3"}],["path",{"d":"m15 2-1 2h3a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h3"}],["path",{"d":"M16 22a4 4 0 00-8 0"}],["path",{"d":"m9 2 3 6"}],["circle",{"cx":"12","cy":"15","r":"3"}]],"id-card":[["path",{"d":"M13 19a4 4 0 00-8 0"}],["path",{"d":"M16 10h2"}],["path",{"d":"M16 14h2"}],["circle",{"cx":"9","cy":"12","r":"3"}],["rect",{"x":"2","y":"5","width":"20","height":"14","rx":"2"}]],"image-down":[["path",{"d":"M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"}],["path",{"d":"m14 19 3 3v-5.5"}],["path",{"d":"m17 22 3-3"}],["circle",{"cx":"9","cy":"9","r":"2"}]],"image-minus":[["path",{"d":"M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"}],["line",{"x1":"16","x2":"22","y1":"5","y2":"5"}],["circle",{"cx":"9","cy":"9","r":"2"}],["path",{"d":"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]],"image-off":[["line",{"x1":"2","x2":"22","y1":"2","y2":"22"}],["path",{"d":"M10.41 10.41a2 2 0 1 1-2.83-2.83"}],["line",{"x1":"13.5","x2":"6","y1":"13.5","y2":"21"}],["line",{"x1":"18","x2":"21","y1":"12","y2":"15"}],["path",{"d":"M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"}],["path",{"d":"M21 15V5a2 2 0 0 0-2-2H9"}]],"image-play":[["path",{"d":"M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"}],["path",{"d":"M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}],["path",{"d":"m6 21 5-5"}],["circle",{"cx":"9","cy":"9","r":"2"}]],"image-plus":[["path",{"d":"M16 5h6"}],["path",{"d":"M19 2v6"}],["path",{"d":"M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"}],["path",{"d":"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}],["circle",{"cx":"9","cy":"9","r":"2"}]],"image-up":[["path",{"d":"M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"}],["path",{"d":"m14 19.5 3-3 3 3"}],["path",{"d":"M17 22v-5.5"}],["circle",{"cx":"9","cy":"9","r":"2"}]],"image-upscale":[["path",{"d":"M16 3h5v5"}],["path",{"d":"M17 21h2a2 2 0 0 0 2-2"}],["path",{"d":"M21 12v3"}],["path",{"d":"m21 3-5 5"}],["path",{"d":"M3 7V5a2 2 0 0 1 2-2"}],["path",{"d":"m5 21 4.144-4.144a1.21 1.21 0 0 1 1.712 0L13 19"}],["path",{"d":"M9 3h3"}],["rect",{"x":"3","y":"11","width":"10","height":"10","rx":"1"}]],"image":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],["circle",{"cx":"9","cy":"9","r":"2"}],["path",{"d":"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}]],"images":[["path",{"d":"m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"}],["path",{"d":"M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"}],["circle",{"cx":"13","cy":"7","r":"1","fill":"currentColor"}],["rect",{"x":"8","y":"2","width":"14","height":"14","rx":"2"}]],"import":[["path",{"d":"M12 3v12"}],["path",{"d":"m8 11 4 4 4-4"}],["path",{"d":"M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"}]],"inbox":[["polyline",{"points":"22 12 16 12 14 15 10 15 8 12 2 12"}],["path",{"d":"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}]],"indian-rupee":[["path",{"d":"m14 20-8-8h4c5.333 0 5.333-8 0-8"}],["path",{"d":"M6 4h12"}],["path",{"d":"M6 8h12"}]],"infinity":[["path",{"d":"M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8"}]],"info":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"M12 16v-4"}],["path",{"d":"M12 8h.01"}]],"inspection-panel":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M7 7h.01"}],["path",{"d":"M17 7h.01"}],["path",{"d":"M7 17h.01"}],["path",{"d":"M17 17h.01"}]],"italic":[["line",{"x1":"19","x2":"10","y1":"4","y2":"4"}],["line",{"x1":"14","x2":"5","y1":"20","y2":"20"}],["line",{"x1":"15","x2":"9","y1":"4","y2":"20"}]],"iteration-ccw":[["path",{"d":"m16 14 4 4-4 4"}],["path",{"d":"M20 10a8 8 0 1 0-8 8h8"}]],"iteration-cw":[["path",{"d":"M4 10a8 8 0 1 1 8 8H4"}],["path",{"d":"m8 22-4-4 4-4"}]],"iv-bag":[["path",{"d":"M12 18v2a2 2 0 002 2h6"}],["path",{"d":"M6 11c.72.5 1.44 1 3 1 3 0 3-2 6-2 1.56 0 2.28.5 3 1"}],["path",{"d":"M9.293 3c.453 0 .887-.18 1.207-.5s.754-.5 1.207-.5h.586c.453 0 .887.18 1.207.5s.754.5 1.207.5H16a2 2 0 012 2v11a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z"}]],"japanese-yen":[["path",{"d":"M12 12v8"}],["path",{"d":"m6 4 6 8 6-8"}],["path",{"d":"M8 13h8"}],["path",{"d":"M8 17h8"}]],"joystick":[["path",{"d":"M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z"}],["path",{"d":"M6 15v-2"}],["path",{"d":"M12 15V9"}],["circle",{"cx":"12","cy":"6","r":"3"}]],"kanban":[["path",{"d":"M5 3v14"}],["path",{"d":"M12 3v8"}],["path",{"d":"M19 3v18"}]],"kayak":[["path",{"d":"M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z"}],["path",{"d":"M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61"}],["path",{"d":"m6.707 6.707 10.586 10.586"}],["path",{"d":"M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z"}]],"kazakh-tenge":[["path",{"d":"M12 8v12"}],["path",{"d":"M6 4h12"}],["path",{"d":"M6 8h12"}]],"key-round":[["path",{"d":"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"}],["circle",{"cx":"16.5","cy":"7.5","r":".5","fill":"currentColor"}]],"key-square":[["path",{"d":"M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z"}],["path",{"d":"m14 7 3 3"}],["path",{"d":"m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814"}]],"key":[["path",{"d":"m2 21 9.6-9.6"}],["path",{"d":"m7.5 15.5 2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19"}],["circle",{"cx":"15.5","cy":"7.5","r":"5.5"}]],"keyboard-music":[["rect",{"width":"20","height":"16","x":"2","y":"4","rx":"2"}],["path",{"d":"M6 8h4"}],["path",{"d":"M14 8h.01"}],["path",{"d":"M18 8h.01"}],["path",{"d":"M2 12h20"}],["path",{"d":"M6 12v4"}],["path",{"d":"M10 12v4"}],["path",{"d":"M14 12v4"}],["path",{"d":"M18 12v4"}]],"keyboard-off":[["path",{"d":"M 20 4 A2 2 0 0 1 22 6"}],["path",{"d":"M 22 6 L 22 16.41"}],["path",{"d":"M 7 16 L 16 16"}],["path",{"d":"M 9.69 4 L 20 4"}],["path",{"d":"M14 8h.01"}],["path",{"d":"M18 8h.01"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"}],["path",{"d":"M6 8h.01"}],["path",{"d":"M8 12h.01"}]],"keyboard":[["path",{"d":"M10 8h.01"}],["path",{"d":"M12 12h.01"}],["path",{"d":"M14 8h.01"}],["path",{"d":"M16 12h.01"}],["path",{"d":"M18 8h.01"}],["path",{"d":"M6 8h.01"}],["path",{"d":"M7 16h10"}],["path",{"d":"M8 12h.01"}],["rect",{"width":"20","height":"16","x":"2","y":"4","rx":"2"}]],"lambda":[["path",{"d":"M11.38 10 5 20"}],["path",{"d":"M19 18a2 2 0 01-2 2c-4.87-.003-5.052-16-10-16a2 2 0 00-2 2"}]],"lamp-ceiling":[["path",{"d":"M12 2v5"}],["path",{"d":"M14.829 15.998a3 3 0 1 1-5.658 0"}],["path",{"d":"M20.92 14.606A1 1 0 0 1 20 16H4a1 1 0 0 1-.92-1.394l3-7A1 1 0 0 1 7 7h10a1 1 0 0 1 .92.606z"}]],"lamp-desk":[["path",{"d":"M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z"}],["path",{"d":"m14.207 4.793-3.414 3.414"}],["path",{"d":"M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"}],["path",{"d":"m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18"}]],"lamp-floor":[["path",{"d":"M12 10v12"}],["path",{"d":"M17.929 7.629A1 1 0 0 1 17 9H7a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 9 2h6a1 1 0 0 1 .928.629z"}],["path",{"d":"M9 22h6"}]],"lamp-wall-down":[["path",{"d":"M19.929 18.629A1 1 0 0 1 19 20H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 13h6a1 1 0 0 1 .928.629z"}],["path",{"d":"M6 3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"}],["path",{"d":"M8 6h4a2 2 0 0 1 2 2v5"}]],"lamp-wall-up":[["path",{"d":"M19.929 9.629A1 1 0 0 1 19 11H9a1 1 0 0 1-.928-1.371l2-5A1 1 0 0 1 11 4h6a1 1 0 0 1 .928.629z"}],["path",{"d":"M6 15a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z"}],["path",{"d":"M8 18h4a2 2 0 0 0 2-2v-5"}]],"lamp":[["path",{"d":"M12 12v6"}],["path",{"d":"M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"}],["path",{"d":"M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z"}]],"land-plot":[["path",{"d":"m12 8 6-3-6-3v10"}],["path",{"d":"m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"}],["path",{"d":"m6.49 12.85 11.02 6.3"}],["path",{"d":"M17.51 12.85 6.5 19.15"}]],"landmark":[["path",{"d":"M10 18v-7"}],["path",{"d":"M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"}],["path",{"d":"M14 18v-7"}],["path",{"d":"M18 18v-7"}],["path",{"d":"M3 22h18"}],["path",{"d":"M6 18v-7"}]],"languages":[["path",{"d":"m5 8 6 6"}],["path",{"d":"m4 14 6-6 2-3"}],["path",{"d":"M2 5h12"}],["path",{"d":"M7 2h1"}],["path",{"d":"m22 22-5-10-5 10"}],["path",{"d":"M14 18h6"}]],"laptop-minimal-check":[["path",{"d":"M2 20h20"}],["path",{"d":"m9 10 2 2 4-4"}],["rect",{"x":"3","y":"4","width":"18","height":"12","rx":"2"}]],"laptop-minimal":[["rect",{"width":"18","height":"12","x":"3","y":"4","rx":"2","ry":"2"}],["line",{"x1":"2","x2":"22","y1":"20","y2":"20"}]],"laptop":[["path",{"d":"M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"}],["path",{"d":"M20.054 15.987H3.946"}]],"laser":[["path",{"d":"m13 8 .95-.95"}],["path",{"d":"M13.95 16.95 13 16"}],["path",{"d":"M22 12h-9"}],["path",{"d":"M4 12H2"}],["path",{"d":"M4.05 16.95 5 16"}],["path",{"d":"m5 8-.95-.95"}],["path",{"d":"M9 12h.01"}],["path",{"d":"M9 19v-2"}],["path",{"d":"M9 7V5"}]],"lasso-select":[["path",{"d":"M7 22a5 5 0 0 1-2-4"}],["path",{"d":"M7 16.93c.96.43 1.96.74 2.99.91"}],["path",{"d":"M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2"}],["path",{"d":"M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"}],["path",{"d":"M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z"}]],"lasso":[["path",{"d":"M3.704 14.467a10 8 0 1 1 3.115 2.375"}],["path",{"d":"M7 22a5 5 0 0 1-2-3.994"}],["circle",{"cx":"5","cy":"16","r":"2"}]],"layer-arrow-down":[["path",{"d":"M12 10v10"}],["path",{"d":"M22 10a1 1 0 01-.59.92l-5.077 2.308"}],["path",{"d":"M22.017 10.005a1 1 0 00-.597-.916l-8.59-3.91a2 2 0 00-1.66.001L2.6 9.08a1 1 0 00-.02 1.831l5.093 2.316"}],["path",{"d":"m9 17 3 3 3-3"}]],"layer-arrow-up":[["path",{"d":"M12 14V4"}],["path",{"d":"M7.674 10.774 2.58 13.09a1 1 0 000 1.822l8.6 3.91a2 2 0 001.65 0l8.58-3.9a1 1 0 00.59-.92 1 1 0 00-.59-.922l-5.078-2.308"}],["path",{"d":"m9 7 3-3 3 3"}]],"layers-2":[["path",{"d":"M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z"}],["path",{"d":"m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845"}]],"layers-arrow-down":[["path",{"d":"M12 7v15"}],["path",{"d":"M2 12a1 1 0 00.58.91l5.093 2.316"}],["path",{"d":"M22 12a1 1 0 01-.59.92l-5.077 2.308"}],["path",{"d":"M8 10.37 2.6 7.91a1 1 0 010-1.831l8.57-3.9a2 2 0 011.66.001l8.59 3.91a1 1 0 010 1.831l-5.392 2.45"}],["path",{"d":"m9 19 3 3 3-3"}]],"layers-arrow-up":[["path",{"d":"M12 12V2"}],["path",{"d":"M2 17.002a1 1 0 00.58.91l8.6 3.91a2 2 0 001.65 0l8.58-3.9a1 1 0 00.59-.92"}],["path",{"d":"M7.674 8.774 2.58 11.09a1 1 0 000 1.822l8.6 3.91a2 2 0 001.65 0l8.58-3.9a1 1 0 00.59-.92 1 1 0 00-.59-.922l-5.078-2.308"}],["path",{"d":"m9 5 3-3 3 3"}]],"layers-minus":[["path",{"d":"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.832z"}],["path",{"d":"M16 17h6"}],["path",{"d":"M2.003 11.995a1 1 0 0 0 .597.915l8.58 3.91a2 2 0 0 0 .83.18"}],["path",{"d":"M2.003 16.995a1 1 0 0 0 .597.915l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l2.11-.96"}],["path",{"d":"M22.018 12.004a1 1 0 0 1-.598.916l-.177.08"}]],"layers-plus":[["path",{"d":"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 .83.18 2 2 0 0 0 .83-.18l8.58-3.9a1 1 0 0 0 0-1.831z"}],["path",{"d":"M16 17h6"}],["path",{"d":"M19 14v6"}],["path",{"d":"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 .825.178"}],["path",{"d":"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l2.116-.962"}]],"layers":[["path",{"d":"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{"d":"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{"d":"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]],"layout-arrow-down":[["rect",{"width":"7","height":"7","x":"3","y":"3","rx":"1"}],["rect",{"width":"7","height":"7","x":"3","y":"14","rx":"1"}],["path",{"d":"M18 3v18"}],["path",{"d":"m21 18-3 3-3-3"}]],"layout-arrow-right":[["rect",{"width":"7","height":"7","x":"3","y":"3","rx":"1"}],["rect",{"width":"7","height":"7","x":"14","y":"3","rx":"1"}],["path",{"d":"M3 18h18"}],["path",{"d":"m18 21 3-3-3-3"}]],"layout-dashboard":[["rect",{"width":"7","height":"9","x":"3","y":"3","rx":"1"}],["rect",{"width":"7","height":"5","x":"14","y":"3","rx":"1"}],["rect",{"width":"7","height":"9","x":"14","y":"12","rx":"1"}],["rect",{"width":"7","height":"5","x":"3","y":"16","rx":"1"}]],"layout-freeform":[["rect",{"width":"7","height":"7","x":"3","y":"3","rx":"1"}],["rect",{"width":"7","height":"7","x":"14","y":"4","rx":"1"}],["rect",{"width":"7","height":"7","x":"4","y":"14","rx":"1"}]],"layout-grid-circles":[["circle",{"cx":"17.5","cy":"17.5","r":"3.5"}],["circle",{"cx":"17.5","cy":"6.5","r":"3.5"}],["circle",{"cx":"6.5","cy":"17.5","r":"3.5"}],["circle",{"cx":"6.5","cy":"6.5","r":"3.5"}]],"layout-grid-plus":[["path",{"d":"M15 18h6"}],["path",{"d":"M18 15v6"}],["rect",{"x":"14","y":"3","width":"7","height":"7","rx":"1"}],["rect",{"x":"3","y":"14","width":"7","height":"7","rx":"1"}],["rect",{"x":"3","y":"3","width":"7","height":"7","rx":"1"}]],"layout-grid":[["rect",{"width":"7","height":"7","x":"3","y":"3","rx":"1"}],["rect",{"width":"7","height":"7","x":"14","y":"3","rx":"1"}],["rect",{"width":"7","height":"7","x":"14","y":"14","rx":"1"}],["rect",{"width":"7","height":"7","x":"3","y":"14","rx":"1"}]],"layout-list":[["rect",{"width":"7","height":"7","x":"3","y":"3","rx":"1"}],["rect",{"width":"7","height":"7","x":"3","y":"14","rx":"1"}],["path",{"d":"M14 4h7"}],["path",{"d":"M14 9h7"}],["path",{"d":"M14 15h7"}],["path",{"d":"M14 20h7"}]],"layout-panel-left":[["rect",{"width":"7","height":"18","x":"3","y":"3","rx":"1"}],["rect",{"width":"7","height":"7","x":"14","y":"3","rx":"1"}],["rect",{"width":"7","height":"7","x":"14","y":"14","rx":"1"}]],"layout-panel-top":[["rect",{"width":"18","height":"7","x":"3","y":"3","rx":"1"}],["rect",{"width":"7","height":"7","x":"3","y":"14","rx":"1"}],["rect",{"width":"7","height":"7","x":"14","y":"14","rx":"1"}]],"layout-template":[["rect",{"width":"18","height":"7","x":"3","y":"3","rx":"1"}],["rect",{"width":"9","height":"7","x":"3","y":"14","rx":"1"}],["rect",{"width":"5","height":"7","x":"16","y":"14","rx":"1"}]],"leaf":[["path",{"d":"M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"}],["path",{"d":"M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"}]],"leafy-green":[["path",{"d":"M2 22c1.25-.987 2.27-1.975 3.9-2.2a5.56 5.56 0 0 1 3.8 1.5 4 4 0 0 0 6.187-2.353 3.5 3.5 0 0 0 3.69-5.116A3.5 3.5 0 0 0 20.95 8 3.5 3.5 0 1 0 16 3.05a3.5 3.5 0 0 0-5.831 1.373 3.5 3.5 0 0 0-5.116 3.69 4 4 0 0 0-2.348 6.155C3.499 15.42 4.409 16.712 4.2 18.1 3.926 19.743 3.014 20.732 2 22"}],["path",{"d":"M2 22 17 7"}]],"lectern":[["path",{"d":"M15 13h4a2 2 0 001.901-1.38l1.057-4.333A1 1 0 0021 6H3a1 1 0 00-.958 1.287L3.1 11.621A2 2 0 005.001 13h4"}],["path",{"d":"M15 22V11a1 1 0 00-1-1h-4a1 1 0 00-1 1v11"}],["path",{"d":"M18 22H6"}],["path",{"d":"M18 6V3a1 1 0 00-1-1h-3"}]],"lens-concave":[["path",{"d":"M7 2a1 1 0 0 0-.8 1.6 14 14 0 0 1 0 16.8A1 1 0 0 0 7 22h10a1 1 0 0 0 .8-1.6 14 14 0 0 1 0-16.8A1 1 0 0 0 17 2z"}]],"lens-convex":[["path",{"d":"M13.433 2a1 1 0 0 1 .824.448 18 18 0 0 1 0 19.104 1 1 0 0 1-.824.448h-2.866a1 1 0 0 1-.824-.448 18 18 0 0 1 0-19.104A1 1 0 0 1 10.567 2z"}]],"lens":[["path",{"d":"M15.725 7.296h.01"}],["path",{"d":"M6 12a6 6 0 016-6"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"letter-a":[["path",{"d":"M17.117 14H6.883"}],["path",{"d":"m4 20 7.55-15.712a.5.5 0 01.9 0L20 20"}]],"letter-b":[["path",{"d":"M6 12h9a4 4 0 010 8H7a1 1 0 01-1-1V5a1 1 0 011-1h7a4 4 0 010 8"}]],"letter-c":[["path",{"d":"M19 6.708a8 8 0 100 10.584"}]],"letter-d":[["path",{"d":"M11 4a8 8 0 010 16H6.406A.406.406 0 016 19.594V4.406A.406.406 0 016.406 4z"}]],"letter-e":[["path",{"d":"M18 4H7a1 1 0 00-1 1v14a1 1 0 001 1h11"}],["path",{"d":"M6 12h8"}]],"letter-f":[["path",{"d":"M6 12h8"}],["path",{"d":"M6 20V5a1 1 0 011-1h11"}]],"letter-g":[["path",{"d":"M19 6.708a8 8 0 10-.526 11.126c.355-.333.526-.811.526-1.299V13a1 1 0 00-1-1h-4"}]],"letter-h":[["path",{"d":"M18 20V4"}],["path",{"d":"M6 12H18"}],["path",{"d":"M6 20V4"}]],"letter-i":[["path",{"d":"M12 20V4"}]],"letter-j":[["path",{"d":"M17 4v11a5 5 0 01-10 0"}]],"letter-k":[["path",{"d":"M17 4 6 15"}],["path",{"d":"M6 20V4"}],["path",{"d":"m9 12 8 8"}]],"letter-l":[["path",{"d":"M6 4v15a1 1 0 001 1h11"}]],"letter-m":[["path",{"d":"M4 20V4.253a.25.25 0 01.454-.144l6.727 9.467a1 1 0 001.63 0l6.735-9.468a.25.25 0 01.454.145V20"}]],"letter-n":[["path",{"d":"M6 20V4.25a.25.25 0 01.455-.143l11.09 15.786a.25.25 0 00.455-.144V4"}]],"letter-o":[["circle",{"cx":"12","cy":"12","r":"8"}]],"letter-p":[["path",{"d":"M6 12h8a4 4 0 000-8H7a1 1 0 00-1 1v15"}]],"letter-q":[["circle",{"cx":"12","cy":"12","r":"8"}],["path",{"d":"M20 20L15 15"}]],"letter-r":[["path",{"d":"m10 12 8 8"}],["path",{"d":"M6 12h8a4 4 0 000-8H7a1 1 0 00-1 1v15"}]],"letter-s":[["path",{"d":"M17 4h-7a4 4 0 000 8h4a4 4 0 010 8H6"}]],"letter-spacing":[["path",{"d":"M15 14H9"}],["path",{"d":"M21 3v18"}],["path",{"d":"M3 3v18"}],["path",{"d":"m8 16 3.453-7.648a.6.6 0 011.094.001L16 16"}]],"letter-t":[["path",{"d":"M12 20V4"}],["path",{"d":"M5 4h14"}]],"letter-u":[["path",{"d":"M6 4v10a6 6 0 0012 0V4"}]],"letter-v":[["path",{"d":"m6 4 5.765 15.835a.25.25 0 00.47 0L18 4"}]],"letter-w":[["path",{"d":"m21 4-4.794 15.821a.25.25 0 01-.471.021l-3.503-8.685a.25.25 0 00-.464 0l-3.503 8.685a.25.25 0 01-.47-.021L3 4"}]],"letter-x":[["path",{"d":"M18 4 6 20"}],["path",{"d":"m6 4 12 16"}]],"letter-y":[["path",{"d":"M12 12v8"}],["path",{"d":"m6 4 6 8 6-8"}]],"letter-z":[["path",{"d":"M6 4h11.5a.5.5 0 01.387.817L6.114 19.183a.5.5 0 00.387.817H18"}]],"letters":[["path",{"d":"M15 8H9"}],["path",{"d":"M21 15.354a4 4 0 100 5.292"}],["path",{"d":"M3 18h4a2 2 0 010 4H3.5a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5H6a2 2 0 010 4"}],["path",{"d":"m8 10 3.453-7.648a.6.6 0 011.094 0L16 10"}]],"library-big":[["rect",{"width":"8","height":"18","x":"3","y":"3","rx":"1"}],["path",{"d":"M7 3v18"}],["path",{"d":"M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"}]],"library":[["path",{"d":"m16 6 4 14"}],["path",{"d":"M12 6v14"}],["path",{"d":"M8 8v12"}],["path",{"d":"M4 4v16"}]],"life-buoy":[["circle",{"cx":"12","cy":"12","r":"10"}],["path",{"d":"m4.93 4.93 4.24 4.24"}],["path",{"d":"m14.83 9.17 4.24-4.24"}],["path",{"d":"m14.83 14.83 4.24 4.24"}],["path",{"d":"m9.17 14.83-4.24 4.24"}],["circle",{"cx":"12","cy":"12","r":"4"}]],"ligature":[["path",{"d":"M14 12h2v8"}],["path",{"d":"M14 20h4"}],["path",{"d":"M6 12h4"}],["path",{"d":"M6 20h4"}],["path",{"d":"M8 20V8a4 4 0 0 1 7.464-2"}]],"lightbulb-off":[["path",{"d":"M16.8 11.2c.8-.9 1.2-2 1.2-3.2a6 6 0 0 0-9.3-5"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M6.3 6.3a4.67 4.67 0 0 0 1.2 5.2c.7.7 1.3 1.5 1.5 2.5"}],["path",{"d":"M9 18h6"}],["path",{"d":"M10 22h4"}]],"lightbulb":[["path",{"d":"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{"d":"M9 18h6"}],["path",{"d":"M10 22h4"}]],"lighthouse":[["path",{"d":"M12 3V2"}],["path",{"d":"M16.066 16.865 7 22l2-11V6a3 3 0 016 0v5l2 11"}],["path",{"d":"m19.792 4.5.866-.5"}],["path",{"d":"m19.797 13.5.866.5"}],["path",{"d":"M21 9h1"}],["path",{"d":"M3 9H2"}],["path",{"d":"m4.203 13.5-.866.5"}],["path",{"d":"M4.208 4.5 3.342 4"}],["path",{"d":"M5.5 22h13"}],["path",{"d":"m7.932 16.875 7.377-4.178"}],["path",{"d":"M8 11h8"}],["path",{"d":"M8 7h8"}]],"line-dot-bottom-vertical":[["path",{"d":"M12 3v12"}],["circle",{"cx":"12","cy":"18","r":"3"}]],"line-dot-left-horizontal":[["path",{"d":"M9 12h12"}],["circle",{"cx":"6","cy":"12","r":"3"}]],"line-dot-right-horizontal":[["path",{"d":"M 3 12 L 15 12"}],["circle",{"cx":"18","cy":"12","r":"3"}]],"line-dot-top-vertical":[["path",{"d":"M12 9v12"}],["circle",{"cx":"12","cy":"6","r":"3"}]],"line-height":[["path",{"d":"M15 14H9"}],["path",{"d":"M21 21H3"}],["path",{"d":"M21 3H3"}],["path",{"d":"m8 16 3.453-7.648a.6.6 0 011.094.001L16 16"}]],"line-squiggle":[["path",{"d":"M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2"}]],"line-style":[["path",{"d":"M11 5h2"}],["path",{"d":"M15 12h6"}],["path",{"d":"M19 5h2"}],["path",{"d":"M3 12h6"}],["path",{"d":"M3 19h18"}],["path",{"d":"M3 5h2"}]],"link-2-off":[["path",{"d":"M9 17H7A5 5 0 0 1 7 7"}],["path",{"d":"M15 7h2a5 5 0 0 1 4 8"}],["line",{"x1":"8","x2":"12","y1":"12","y2":"12"}],["line",{"x1":"2","x2":"22","y1":"2","y2":"22"}]],"link-2":[["path",{"d":"M9 17H7A5 5 0 0 1 7 7h2"}],["path",{"d":"M15 7h2a5 5 0 1 1 0 10h-2"}],["line",{"x1":"8","x2":"16","y1":"12","y2":"12"}]],"link":[["path",{"d":"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{"d":"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]],"list-check":[["path",{"d":"M16 5H3"}],["path",{"d":"M16 12H3"}],["path",{"d":"M11 19H3"}],["path",{"d":"m15 18 2 2 4-4"}]],"list-checks":[["path",{"d":"M13 5h8"}],["path",{"d":"M13 12h8"}],["path",{"d":"M13 19h8"}],["path",{"d":"m3 17 2 2 4-4"}],["path",{"d":"m3 7 2 2 4-4"}]],"list-chevrons-down-up":[["path",{"d":"M3 5h8"}],["path",{"d":"M3 12h8"}],["path",{"d":"M3 19h8"}],["path",{"d":"m15 5 3 3 3-3"}],["path",{"d":"m15 19 3-3 3 3"}]],"list-chevrons-up-down":[["path",{"d":"M3 5h8"}],["path",{"d":"M3 12h8"}],["path",{"d":"M3 19h8"}],["path",{"d":"m15 8 3-3 3 3"}],["path",{"d":"m15 16 3 3 3-3"}]],"list-clock":[["path",{"d":"M16 13v2.2l1.6 1"}],["path",{"d":"M3 12h3.458"}],["path",{"d":"M3 19h3.832"}],["path",{"d":"M3 5h18"}],["circle",{"cx":"16","cy":"15","r":"6"}]],"list-collapse":[["path",{"d":"M10 5h11"}],["path",{"d":"M10 12h11"}],["path",{"d":"M10 19h11"}],["path",{"d":"m3 10 3-3-3-3"}],["path",{"d":"m3 20 3-3-3-3"}]],"list-end":[["path",{"d":"M16 5H3"}],["path",{"d":"M16 12H3"}],["path",{"d":"M9 19H3"}],["path",{"d":"m16 16-3 3 3 3"}],["path",{"d":"M21 5v12a2 2 0 0 1-2 2h-6"}]],"list-filter-plus":[["path",{"d":"M12 5H2"}],["path",{"d":"M6 12h12"}],["path",{"d":"M9 19h6"}],["path",{"d":"M16 5h6"}],["path",{"d":"M19 8V2"}]],"list-filter":[["path",{"d":"M2 5h20"}],["path",{"d":"M6 12h12"}],["path",{"d":"M9 19h6"}]],"list-indent-decrease":[["path",{"d":"M21 5H11"}],["path",{"d":"M21 12H11"}],["path",{"d":"M21 19H11"}],["path",{"d":"m7 8-4 4 4 4"}]],"list-indent-increase":[["path",{"d":"M21 5H11"}],["path",{"d":"M21 12H11"}],["path",{"d":"M21 19H11"}],["path",{"d":"m3 8 4 4-4 4"}]],"list-minus":[["path",{"d":"M16 5H3"}],["path",{"d":"M11 12H3"}],["path",{"d":"M16 19H3"}],["path",{"d":"M21 12h-6"}]],"list-music":[["path",{"d":"M16 5H3"}],["path",{"d":"M11 12H3"}],["path",{"d":"M11 19H3"}],["path",{"d":"M21 16V5"}],["circle",{"cx":"18","cy":"16","r":"3"}]],"list-ordered":[["path",{"d":"M11 5h10"}],["path",{"d":"M11 12h10"}],["path",{"d":"M11 19h10"}],["path",{"d":"M4 4h1v5"}],["path",{"d":"M4 9h2"}],["path",{"d":"M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02"}]],"list-plus":[["path",{"d":"M16 5H3"}],["path",{"d":"M11 12H3"}],["path",{"d":"M16 19H3"}],["path",{"d":"M18 9v6"}],["path",{"d":"M21 12h-6"}]],"list-restart":[["path",{"d":"M21 5H3"}],["path",{"d":"M7 12H3"}],["path",{"d":"M7 19H3"}],["path",{"d":"M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14"}],["path",{"d":"M11 10v4h4"}]],"list-sort-ascending":[["path",{"d":"M3 19h18"}],["path",{"d":"M15 12H3"}],["path",{"d":"M9 5H3"}]],"list-sort-descending":[["path",{"d":"M15 12H3"}],["path",{"d":"M3 5h18"}],["path",{"d":"M9 19H3"}]],"list-start":[["path",{"d":"M3 5h6"}],["path",{"d":"M3 12h13"}],["path",{"d":"M3 19h13"}],["path",{"d":"m16 8-3-3 3-3"}],["path",{"d":"M21 19V7a2 2 0 0 0-2-2h-6"}]],"list-todo":[["path",{"d":"M13 5h8"}],["path",{"d":"M13 12h8"}],["path",{"d":"M13 19h8"}],["path",{"d":"m3 17 2 2 4-4"}],["rect",{"x":"3","y":"4","width":"6","height":"6","rx":"1"}]],"list-tree":[["path",{"d":"M8 5h13"}],["path",{"d":"M13 12h8"}],["path",{"d":"M13 19h8"}],["path",{"d":"M3 10a2 2 0 0 0 2 2h3"}],["path",{"d":"M3 5v12a2 2 0 0 0 2 2h3"}]],"list-video":[["path",{"d":"M21 5H3"}],["path",{"d":"M10 12H3"}],["path",{"d":"M10 19H3"}],["path",{"d":"M15 12.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"}]],"list-x":[["path",{"d":"M16 5H3"}],["path",{"d":"M11 12H3"}],["path",{"d":"M16 19H3"}],["path",{"d":"m15.5 9.5 5 5"}],["path",{"d":"m20.5 9.5-5 5"}]],"list":[["path",{"d":"M3 5h.01"}],["path",{"d":"M3 12h.01"}],["path",{"d":"M3 19h.01"}],["path",{"d":"M8 5h13"}],["path",{"d":"M8 12h13"}],["path",{"d":"M8 19h13"}]],"loader-circle":[["path",{"d":"M21 12a9 9 0 1 1-6.219-8.56"}]],"loader-pinwheel":[["path",{"d":"M17 3.34A5 5 0 1112 12a5 5 0 10-5 8.66"}],["path",{"d":"M22 12a5 5 0 01-10 0 5 5 0 00-10 0"}],["path",{"d":"M7 3.34A5 5 0 1112 12a5 5 0 105 8.66"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"loader":[["path",{"d":"M12 2v4"}],["path",{"d":"m16.2 7.8 2.9-2.9"}],["path",{"d":"M18 12h4"}],["path",{"d":"m16.2 16.2 2.9 2.9"}],["path",{"d":"M12 18v4"}],["path",{"d":"m4.9 19.1 2.9-2.9"}],["path",{"d":"M2 12h4"}],["path",{"d":"m4.9 4.9 2.9 2.9"}]],"locate-fixed":[["line",{"x1":"2","x2":"5","y1":"12","y2":"12"}],["line",{"x1":"19","x2":"22","y1":"12","y2":"12"}],["line",{"x1":"12","x2":"12","y1":"2","y2":"5"}],["line",{"x1":"12","x2":"12","y1":"19","y2":"22"}],["circle",{"cx":"12","cy":"12","r":"7"}],["circle",{"cx":"12","cy":"12","r":"3"}]],"locate-off":[["path",{"d":"M12 19v3"}],["path",{"d":"M12 2v3"}],["path",{"d":"M18.89 13.24a7 7 0 0 0-8.13-8.13"}],["path",{"d":"M19 12h3"}],["path",{"d":"M2 12h3"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M7.05 7.05a7 7 0 0 0 9.9 9.9"}]],"locate":[["line",{"x1":"2","x2":"5","y1":"12","y2":"12"}],["line",{"x1":"19","x2":"22","y1":"12","y2":"12"}],["line",{"x1":"12","x2":"12","y1":"2","y2":"5"}],["line",{"x1":"12","x2":"12","y1":"19","y2":"22"}],["circle",{"cx":"12","cy":"12","r":"7"}]],"lock-keyhole-open":[["circle",{"cx":"12","cy":"16","r":"1"}],["rect",{"width":"18","height":"12","x":"3","y":"10","rx":"2"}],["path",{"d":"M7 10V7a5 5 0 0 1 9.33-2.5"}]],"lock-keyhole":[["circle",{"cx":"12","cy":"16","r":"1"}],["rect",{"x":"3","y":"10","width":"18","height":"12","rx":"2"}],["path",{"d":"M7 10V7a5 5 0 0 1 10 0v3"}]],"lock-open":[["rect",{"width":"18","height":"11","x":"3","y":"11","rx":"2","ry":"2"}],["path",{"d":"M7 11V7a5 5 0 0 1 9.9-1"}]],"lock":[["rect",{"width":"18","height":"11","x":"3","y":"11","rx":"2","ry":"2"}],["path",{"d":"M7 11V7a5 5 0 0 1 10 0v4"}]],"log-in":[["path",{"d":"m10 17 5-5-5-5"}],["path",{"d":"M15 12H3"}],["path",{"d":"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"}]],"log-out":[["path",{"d":"m16 17 5-5-5-5"}],["path",{"d":"M21 12H9"}],["path",{"d":"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}]],"logs":[["path",{"d":"M3 5h1"}],["path",{"d":"M3 12h1"}],["path",{"d":"M3 19h1"}],["path",{"d":"M8 5h1"}],["path",{"d":"M8 12h1"}],["path",{"d":"M8 19h1"}],["path",{"d":"M13 5h8"}],["path",{"d":"M13 12h8"}],["path",{"d":"M13 19h8"}]],"lollipop":[["circle",{"cx":"11","cy":"11","r":"8"}],["path",{"d":"m21 21-4.3-4.3"}],["path",{"d":"M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0"}]],"luggage":[["path",{"d":"M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2"}],["path",{"d":"M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"}],["path",{"d":"M10 20h4"}],["circle",{"cx":"16","cy":"20","r":"2"}],["circle",{"cx":"8","cy":"20","r":"2"}]],"magnet":[["path",{"d":"m12 15 4 4"}],["path",{"d":"M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z"}],["path",{"d":"m5 8 4 4"}]],"mail-badge":[["path",{"d":"M22 7.7V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8.25"}],["path",{"d":"M12 12.996a1.94 1.94 0 0 1-1.03-.296L2 7"}],["path",{"d":"m20.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88"}],["circle",{"cx":"19","cy":"14","r":"3"}]],"mail-check":[["path",{"d":"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"}],["path",{"d":"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{"d":"m16 19 2 2 4-4"}]],"mail-clock":[["path",{"d":"M16 14v2.2l1.6 1"}],["path",{"d":"m22 7-.759.484"}],["path",{"d":"M6.835 20H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v2"}],["path",{"d":"M7.605 10.567 2 7"}],["circle",{"cx":"16","cy":"16","r":"6"}]],"mail-dot":[["path",{"d":"M12.674 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4.675"}],["path",{"d":"m2 7 9 5.701a2 2 0 0 0 2 0l1.084-.686"}],["circle",{"cx":"19","cy":"7","r":"3"}]],"mail-exclamation-point":[["path",{"d":"M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"}],["path",{"d":"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{"d":"M20 14v4"}],["path",{"d":"M20 22v.01"}]],"mail-minus":[["path",{"d":"M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"}],["path",{"d":"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{"d":"M16 19h6"}]],"mail-open":[["path",{"d":"M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"}],["path",{"d":"m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"}]],"mail-pen":[["path",{"d":"M15.363 17.634a2 2 0 00-.506.854l-.837 2.87a.5.5 0 00.62.62l2.87-.837a2 2 0 00.854-.506l3.013-3.009a1 1 0 10-3.004-3.004z"}],["path",{"d":"M22 10.38V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h6.25"}],["path",{"d":"m22 7-8.991 5.727a2 2 0 01-2.009 0L2 7"}]],"mail-plus":[["path",{"d":"M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"}],["path",{"d":"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{"d":"M19 16v6"}],["path",{"d":"M16 19h6"}]],"mail-question-mark":[["path",{"d":"M22 10.35V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h12.3"}],["path",{"d":"m22 7-8.97 5.7a2 2 0 01-2.06 0L2 7"}],["path",{"d":"M20 18.5c.5-1 2-1 2-2.5a2 2 0 00-2-2 2.5 2.5 0 00-2 1"}],["path",{"d":"M20 22h.01"}]],"mail-search":[["path",{"d":"M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5"}],["path",{"d":"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}],["path",{"d":"M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"}],["circle",{"cx":"18","cy":"18","r":"3"}],["path",{"d":"m22 22-1.5-1.5"}]],"mail-x":[["path",{"d":"M22 12.532V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8.792"}],["path",{"d":"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["path",{"d":"m16.5 16.5 5 5"}],["path",{"d":"m21.5 16.5-5 5"}]],"mail":[["path",{"d":"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],["rect",{"x":"2","y":"4","width":"20","height":"16","rx":"2"}]],"mailbox":[["path",{"d":"M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"}],["polyline",{"points":"15,9 18,9 18,11"}],["path",{"d":"M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2"}],["line",{"x1":"6","x2":"7","y1":"10","y2":"10"}]],"mails":[["path",{"d":"M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732"}],["path",{"d":"m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5"}],["rect",{"x":"7","y":"3","width":"15","height":"12","rx":"2"}]],"mango":[["path",{"d":"m17 6 3-3"}],["path",{"d":"M7 22a4 4 0 01-2.62-7.023A2 2 0 005 13.383V10a8 8 0 1116 0A12 12 0 019 22z"}]],"map-minus":[["path",{"d":"m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14"}],["path",{"d":"M15 5.764V14"}],["path",{"d":"M21 18h-6"}],["path",{"d":"M9 3.236v15"}]],"map-pin-check-inside":[["path",{"d":"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["path",{"d":"m9 10 2 2 4-4"}]],"map-pin-check":[["path",{"d":"M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728"}],["circle",{"cx":"12","cy":"10","r":"3"}],["path",{"d":"m16 18 2 2 4-4"}]],"map-pin-house":[["path",{"d":"M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z"}],["path",{"d":"M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2"}],["path",{"d":"M18 22v-3"}],["circle",{"cx":"10","cy":"10","r":"3"}]],"map-pin-minus-inside":[["path",{"d":"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["path",{"d":"M9 10h6"}]],"map-pin-minus":[["path",{"d":"M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"}],["circle",{"cx":"12","cy":"10","r":"3"}],["path",{"d":"M16 18h6"}]],"map-pin-off":[["path",{"d":"M12.75 7.09a3 3 0 0 1 2.16 2.16"}],["path",{"d":"M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533"}],["path",{"d":"M9.13 9.13a3 3 0 0 0 3.74 3.74"}]],"map-pin-pen":[["path",{"d":"M17.97 9.304A8 8 0 0 0 2 10c0 4.69 4.887 9.562 7.022 11.468"}],["path",{"d":"M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"}],["circle",{"cx":"10","cy":"10","r":"3"}]],"map-pin-plus-inside":[["path",{"d":"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["path",{"d":"M12 7v6"}],["path",{"d":"M9 10h6"}]],"map-pin-plus":[["path",{"d":"M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"}],["circle",{"cx":"12","cy":"10","r":"3"}],["path",{"d":"M16 18h6"}],["path",{"d":"M19 15v6"}]],"map-pin-search":[["path",{"d":"M 12.248 21.969 a 1 1 0 0 1 -0.849 -0.17 C 9.539 20.193 4 14.993 4 10 a 8 8 0 0 1 16 0 C 20 10.42 19.961 10.841 19.888 11.262"}],["path",{"d":"m22 22-1.88-1.88"}],["circle",{"cx":"12","cy":"10","r":"3"}],["circle",{"cx":"18","cy":"18","r":"3"}]],"map-pin-x-inside":[["path",{"d":"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["path",{"d":"m14.5 7.5-5 5"}],["path",{"d":"m9.5 7.5 5 5"}]],"map-pin-x":[["path",{"d":"M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077"}],["circle",{"cx":"12","cy":"10","r":"3"}],["path",{"d":"m21.5 15.5-5 5"}],["path",{"d":"m21.5 20.5-5-5"}]],"map-pin":[["path",{"d":"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{"cx":"12","cy":"10","r":"3"}]],"map-pinned":[["path",{"d":"M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 01-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0112 0"}],["path",{"d":"M4.474 15h-.197a1 1 0 00-.969.753l-1.097 4.35a1.5 1.5 0 001.444 1.898L20.344 22a1.5 1.5 0 001.446-1.897l-1.098-4.35a1 1 0 00-.969-.753h-.197"}],["circle",{"cx":"12","cy":"8","r":"2"}]],"map-plus":[["path",{"d":"m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12"}],["path",{"d":"M15 5.764V12"}],["path",{"d":"M18 15v6"}],["path",{"d":"M21 18h-6"}],["path",{"d":"M9 3.236v15"}]],"map":[["path",{"d":"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"}],["path",{"d":"M15 5.764v15"}],["path",{"d":"M9 3.236v15"}]],"margin-bottom":[["rect",{"x":"9","y":"9","width":"6","height":"6","rx":"1"}],["path",{"d":"M3 21h18"}]],"margin-horizontal":[["rect",{"x":"9","y":"9","width":"6","height":"6","rx":"1"}],["path",{"d":"M21 3v18"}],["path",{"d":"M3 3v18"}]],"margin-left":[["rect",{"x":"9","y":"9","width":"6","height":"6","rx":"1"}],["path",{"d":"M3 3v18"}]],"margin-right":[["rect",{"x":"9","y":"9","width":"6","height":"6","rx":"1"}],["path",{"d":"M21 3v18"}]],"margin-top":[["rect",{"x":"9","y":"9","width":"6","height":"6","rx":"1"}],["path",{"d":"M3 3h18"}]],"margin-vertical":[["rect",{"x":"9","y":"9","width":"6","height":"6","rx":"1"}],["path",{"d":"M3 21h18"}],["path",{"d":"M3 3h18"}]],"margin":[["rect",{"x":"9","y":"9","width":"6","height":"6","rx":"1"}],["path",{"d":"M21 6v12"}],["path",{"d":"M3 6v12"}],["path",{"d":"M6 21h12"}],["path",{"d":"M6 3h12"}]],"mars-stroke":[["path",{"d":"m14 6 4 4"}],["path",{"d":"M17 3h4v4"}],["path",{"d":"m21 3-7.75 7.75"}],["circle",{"cx":"9","cy":"15","r":"6"}]],"mars":[["path",{"d":"M16 3h5v5"}],["path",{"d":"m21 3-6.75 6.75"}],["circle",{"cx":"10","cy":"14","r":"6"}]],"martini":[["path",{"d":"M12 12 4.207 4.207A.707.707 0 0 1 4.707 3h14.586a.707.707 0 0 1 .5 1.207z"}],["path",{"d":"M12 12v10"}],["path",{"d":"M7 22h10"}]],"maximize-2":[["path",{"d":"M15 3h6v6"}],["path",{"d":"m21 3-7 7"}],["path",{"d":"m3 21 7-7"}],["path",{"d":"M9 21H3v-6"}]],"maximize":[["path",{"d":"M8 3H5a2 2 0 0 0-2 2v3"}],["path",{"d":"M21 8V5a2 2 0 0 0-2-2h-3"}],["path",{"d":"M3 16v3a2 2 0 0 0 2 2h3"}],["path",{"d":"M16 21h3a2 2 0 0 0 2-2v-3"}]],"medal":[["path",{"d":"M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"}],["path",{"d":"M11 12 5.12 2.2"}],["path",{"d":"m13 12 5.88-9.8"}],["path",{"d":"M8 7h8"}],["circle",{"cx":"12","cy":"17","r":"5"}],["path",{"d":"M12 18v-2h-.5"}]],"megaphone-off":[["path",{"d":"M11.636 6A13 13 0 0 0 19.4 3.2 1 1 0 0 1 21 4v11.344"}],["path",{"d":"M14.378 14.357A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"}],["path",{"d":"M8 8v6"}]],"megaphone":[["path",{"d":"M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"}],["path",{"d":"M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"}],["path",{"d":"M8 6v8"}]],"memory-stick":[["path",{"d":"M12 12v-2"}],["path",{"d":"M12 18v-2"}],["path",{"d":"M16 12v-2"}],["path",{"d":"M16 18v-2"}],["path",{"d":"M2 11h1.5"}],["path",{"d":"M20 18v-2"}],["path",{"d":"M20.5 11H22"}],["path",{"d":"M4 18v-2"}],["path",{"d":"M8 12v-2"}],["path",{"d":"M8 18v-2"}],["rect",{"x":"2","y":"6","width":"20","height":"10","rx":"2"}]],"menu":[["path",{"d":"M4 5h16"}],["path",{"d":"M4 12h16"}],["path",{"d":"M4 19h16"}]],"merge":[["path",{"d":"m8 6 4-4 4 4"}],["path",{"d":"M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22"}],["path",{"d":"m20 22-5-5"}]],"message-circle-check":[["path",{"d":"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"}],["path",{"d":"m16 9-5.5 5.5L8 12"}]],"message-circle-code":[["path",{"d":"m10 9-3 3 3 3"}],["path",{"d":"m14 15 3-3-3-3"}],["path",{"d":"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"}]],"message-circle-dashed-check":[["path",{"d":"M10.1 2.182a10 10 0 013.8 0"}],["path",{"d":"M13.9 21.818a10 10 0 01-3.8 0"}],["path",{"d":"M17.609 3.72a10 10 0 012.69 2.7"}],["path",{"d":"M2.182 13.9a10 10 0 010-3.8"}],["path",{"d":"M20.28 17.61a10 10 0 01-2.7 2.69"}],["path",{"d":"M21.818 10.1a10 10 0 010 3.8"}],["path",{"d":"M3.721 6.391a10 10 0 012.7-2.69"}],["path",{"d":"m6.163 21.117-2.906.85a1 1 0 01-1.236-1.169l.965-2.98"}],["path",{"d":"m16 9-5.5 5.5L8 12"}]],"message-circle-dashed":[["path",{"d":"M10.1 2.182a10 10 0 0 1 3.8 0"}],["path",{"d":"M13.9 21.818a10 10 0 0 1-3.8 0"}],["path",{"d":"M17.609 3.72a10 10 0 0 1 2.69 2.7"}],["path",{"d":"M2.182 13.9a10 10 0 0 1 0-3.8"}],["path",{"d":"M20.28 17.61a10 10 0 0 1-2.7 2.69"}],["path",{"d":"M21.818 10.1a10 10 0 0 1 0 3.8"}],["path",{"d":"M3.721 6.391a10 10 0 0 1 2.7-2.69"}],["path",{"d":"m6.163 21.117-2.906.85a1 1 0 0 1-1.236-1.169l.965-2.98"}]],"message-circle-exclamation-point":[["path",{"d":"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"}],["path",{"d":"M12 8v4"}],["path",{"d":"M12 16h.01"}]],"message-circle-heart":[["path",{"d":"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"}],["path",{"d":"M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 5.004 2.224 3 3 0 0 1-.832 2.083l-3.447 3.62a1 1 0 0 1-1.45-.001z"}]],"message-circle-more":[["path",{"d":"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"}],["path",{"d":"M8 12h.01"}],["path",{"d":"M12 12h.01"}],["path",{"d":"M16 12h.01"}]],"message-circle-off":[["path",{"d":"m2 2 20 20"}],["path",{"d":"M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989"}],["path",{"d":"M8.35 2.69A10 10 0 0 1 21.3 15.65"}]],"message-circle-plus":[["path",{"d":"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"}],["path",{"d":"M8 12h8"}],["path",{"d":"M12 8v8"}]],"message-circle-question-mark":[["path",{"d":"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"}],["path",{"d":"M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5"}],["path",{"d":"M12 17h.01"}]],"message-circle-reply":[["path",{"d":"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"}],["path",{"d":"m10 15-3-3 3-3"}],["path",{"d":"M7 12h8a2 2 0 0 1 2 2v1"}]],"message-circle-text":[["path",{"d":"M3.086 17.509a2 2 0 00-.094-1.167 10 10 0 114.777 4.719 2 2 0 00-1.099-.092l-3.413.998a1 1 0 01-1.236-1.168z"}],["path",{"d":"M8 12h9"}],["path",{"d":"M8 16h5"}],["path",{"d":"M8 8h7"}]],"message-circle-x":[["path",{"d":"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"}],["path",{"d":"m15 9-6 6"}],["path",{"d":"m9 9 6 6"}]],"message-circle":[["path",{"d":"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"}]],"message-square-check":[["path",{"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}],["path",{"d":"m9 11 2 2 4-4"}]],"message-square-code":[["path",{"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}],["path",{"d":"m10 8-3 3 3 3"}],["path",{"d":"m14 14 3-3-3-3"}]],"message-square-dashed":[["path",{"d":"M14 3h2"}],["path",{"d":"M16 19h-2"}],["path",{"d":"M2 12v-2"}],["path",{"d":"M2 16v5.286a.71.71 0 0 0 1.212.502l1.149-1.149"}],["path",{"d":"M20 19a2 2 0 0 0 2-2v-1"}],["path",{"d":"M22 10v2"}],["path",{"d":"M22 6V5a2 2 0 0 0-2-2"}],["path",{"d":"M4 3a2 2 0 0 0-2 2v1"}],["path",{"d":"M8 19h2"}],["path",{"d":"M8 3h2"}]],"message-square-diff":[["path",{"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}],["path",{"d":"M10 15h4"}],["path",{"d":"M10 9h4"}],["path",{"d":"M12 7v4"}]],"message-square-dot":[["path",{"d":"M12.7 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4.7"}],["circle",{"cx":"19","cy":"6","r":"3"}]],"message-square-exclamation-point":[["path",{"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}],["path",{"d":"M12 15h.01"}],["path",{"d":"M12 7v4"}]],"message-square-heart":[["path",{"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}],["path",{"d":"M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5"}]],"message-square-lock":[["path",{"d":"M22 8.5V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H10"}],["path",{"d":"M20 15v-2a2 2 0 0 0-4 0v2"}],["rect",{"x":"14","y":"15","width":"8","height":"5","rx":"1"}]],"message-square-more":[["path",{"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}],["path",{"d":"M12 11h.01"}],["path",{"d":"M16 11h.01"}],["path",{"d":"M8 11h.01"}]],"message-square-off":[["path",{"d":"M19 19H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 1.184-1.826"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M8.656 3H20a2 2 0 0 1 2 2v11.344"}]],"message-square-plus":[["path",{"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}],["path",{"d":"M12 8v6"}],["path",{"d":"M9 11h6"}]],"message-square-quote":[["path",{"d":"M14 14a2 2 0 0 0 2-2V8h-2"}],["path",{"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}],["path",{"d":"M8 14a2 2 0 0 0 2-2V8H8"}]],"message-square-reply":[["path",{"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}],["path",{"d":"m10 8-3 3 3 3"}],["path",{"d":"M17 14v-1a2 2 0 0 0-2-2H7"}]],"message-square-share":[["path",{"d":"M12 3H4a2 2 0 0 0-2 2v16.286a.71.71 0 0 0 1.212.502l2.202-2.202A2 2 0 0 1 6.828 19H20a2 2 0 0 0 2-2v-4"}],["path",{"d":"M16 3h6v6"}],["path",{"d":"m16 9 6-6"}]],"message-square-text":[["path",{"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}],["path",{"d":"M7 11h10"}],["path",{"d":"M7 15h6"}],["path",{"d":"M7 7h8"}]],"message-square-x":[["path",{"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}],["path",{"d":"m14.5 8.5-5 5"}],["path",{"d":"m9.5 8.5 5 5"}]],"message-square":[["path",{"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}]],"messages-circle":[["path",{"d":"M19.95 10.05a7 7 0 011.412 7.872 1 1 0 00-.058.787l.675 2.089a1 1 0 01-1.236 1.168l-2.155-.631a1 1 0 00-.745.06 7 7 0 01-7.793-1.445"}],["path",{"d":"M2.696 12.708a1 1 0 00-.058-.785 7 7 0 113.518 3.473 1 1 0 00-.744-.061l-2.155.63a1 1 0 01-1.236-1.167z"}]],"messages-square":[["path",{"d":"M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"}],["path",{"d":"M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"}]],"metronome":[["path",{"d":"M12 11.4V9.1"}],["path",{"d":"m12 17 6.59-6.59"}],["path",{"d":"m15.05 5.7-.218-.691a3 3 0 0 0-5.663 0L4.418 19.695A1 1 0 0 0 5.37 21h13.253a1 1 0 0 0 .951-1.31L18.45 16.2"}],["circle",{"cx":"20","cy":"9","r":"2"}]],"mic-audio-lines":[["path",{"d":"M10 3v2.341"}],["path",{"d":"M12 17v4"}],["path",{"d":"M14 5v.341"}],["path",{"d":"M18 5v13"}],["path",{"d":"M2 10v3"}],["path",{"d":"M22 10v3"}],["path",{"d":"M6 6v11"}],["path",{"d":"M9 21h6"}],["rect",{"width":"4","height":"8","x":"10","y":"9","rx":"2"}]],"mic-off":[["path",{"d":"M12 19v3"}],["path",{"d":"M15 9.34V5a3 3 0 0 0-5.68-1.33"}],["path",{"d":"M16.95 16.95A7 7 0 0 1 5 12v-2"}],["path",{"d":"M18.89 13.23A7 7 0 0 0 19 12v-2"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M9 9v3a3 3 0 0 0 5.12 2.12"}]],"mic-signal":[["path",{"d":"M12 17v4"}],["path",{"d":"M18 11a6 6 0 00-3-5.197"}],["path",{"d":"M2 11a10 10 0 015-8.662"}],["path",{"d":"M22 11a10 10 0 00-5-8.662"}],["path",{"d":"M6 11a6 6 0 013-5.197"}],["path",{"d":"M9 21h6"}],["rect",{"x":"10","y":"9","width":"4","height":"8","rx":"2"}]],"mic-vocal":[["path",{"d":"m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12"}],["path",{"d":"M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5"}],["circle",{"cx":"16","cy":"7","r":"5"}]],"mic":[["path",{"d":"M12 19v3"}],["path",{"d":"M19 10v2a7 7 0 0 1-14 0v-2"}],["rect",{"x":"9","y":"2","width":"6","height":"13","rx":"3"}]],"microchip":[["path",{"d":"M10 12h4"}],["path",{"d":"M10 17h4"}],["path",{"d":"M10 7h4"}],["path",{"d":"M18 12h2"}],["path",{"d":"M18 18h2"}],["path",{"d":"M18 6h2"}],["path",{"d":"M4 12h2"}],["path",{"d":"M4 18h2"}],["path",{"d":"M4 6h2"}],["rect",{"x":"6","y":"2","width":"12","height":"20","rx":"2"}]],"microscope":[["path",{"d":"M6 18h8"}],["path",{"d":"M3 22h18"}],["path",{"d":"M14 22a7 7 0 1 0 0-14h-1"}],["path",{"d":"M9 14h2"}],["path",{"d":"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"}],["path",{"d":"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"}]],"microwave":[["rect",{"width":"20","height":"15","x":"2","y":"4","rx":"2"}],["rect",{"width":"8","height":"7","x":"6","y":"8","rx":"1"}],["path",{"d":"M18 8v7"}],["path",{"d":"M6 19v2"}],["path",{"d":"M18 19v2"}]],"midi-port":[["path",{"d":"M12 18h.01"}],["path",{"d":"M15 2.458V5a1 1 0 01-1 1h-4a1 1 0 01-1-1V2.458"}],["path",{"d":"M16 16h.01"}],["path",{"d":"M18 12h.01"}],["path",{"d":"M6 12h.01"}],["path",{"d":"M8 16h.01"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"milestone":[["path",{"d":"M12 13v8"}],["path",{"d":"M12 3v3"}],["path",{"d":"M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"}]],"milk-off":[["path",{"d":"M8 2h8"}],["path",{"d":"M9 2v1.343M15 2v2.789a4 4 0 0 0 .672 2.219l.656.984a4 4 0 0 1 .672 2.22v1.131M7.8 7.8l-.128.192A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3"}],["path",{"d":"M7 15a6.47 6.47 0 0 1 5 0 6.472 6.472 0 0 0 3.435.435"}],["line",{"x1":"2","x2":"22","y1":"2","y2":"22"}]],"milk":[["path",{"d":"M8 2h8"}],["path",{"d":"M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"}],["path",{"d":"M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0"}]],"minimize-2":[["path",{"d":"m14 10 7-7"}],["path",{"d":"M20 10h-6V4"}],["path",{"d":"m3 21 7-7"}],["path",{"d":"M4 14h6v6"}]],"minimize":[["path",{"d":"M8 3v3a2 2 0 0 1-2 2H3"}],["path",{"d":"M21 8h-3a2 2 0 0 1-2-2V3"}],["path",{"d":"M3 16h3a2 2 0 0 1 2 2v3"}],["path",{"d":"M16 21v-3a2 2 0 0 1 2-2h3"}]],"minus":[["path",{"d":"M5 12h14"}]],"mirror-rectangular":[["path",{"d":"M11 6 8 9"}],["path",{"d":"m16 7-8 8"}],["rect",{"x":"4","y":"2","width":"16","height":"20","rx":"2"}]],"mirror-round":[["path",{"d":"M10 6.6 8.6 8"}],["path",{"d":"M12 18v4"}],["path",{"d":"M15 7.5 9.5 13"}],["path",{"d":"M7 22h10"}],["circle",{"cx":"12","cy":"10","r":"8"}]],"monitor-activity":[["path",{"d":"M12 17v4"}],["path",{"d":"M18 10h-2.315a1 1 0 00-.932.64l-.787 2.034a.5.5 0 01-.932 0l-2.068-5.348a.5.5 0 00-.932 0l-.787 2.035a1 1 0 01-.932.639H6"}],["path",{"d":"M8 21h8"}],["rect",{"x":"2","y":"3","width":"20","height":"14","rx":"2"}]],"monitor-check":[["path",{"d":"m9 10 2 2 4-4"}],["rect",{"width":"20","height":"14","x":"2","y":"3","rx":"2"}],["path",{"d":"M12 17v4"}],["path",{"d":"M8 21h8"}]],"monitor-cloud":[["path",{"d":"M11 13a3 3 0 1 1 2.83-4H14a2 2 0 0 1 0 4z"}],["path",{"d":"M12 17v4"}],["path",{"d":"M8 21h8"}],["rect",{"x":"2","y":"3","width":"20","height":"14","rx":"2"}]],"monitor-cog":[["path",{"d":"M12 17v4"}],["path",{"d":"m14.305 7.53.923-.382"}],["path",{"d":"m15.228 4.852-.923-.383"}],["path",{"d":"m16.852 3.228-.383-.924"}],["path",{"d":"m16.852 8.772-.383.923"}],["path",{"d":"m19.148 3.228.383-.924"}],["path",{"d":"m19.53 9.696-.382-.924"}],["path",{"d":"m20.772 4.852.924-.383"}],["path",{"d":"m20.772 7.148.924.383"}],["path",{"d":"M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"}],["path",{"d":"M8 21h8"}],["circle",{"cx":"18","cy":"6","r":"3"}]],"monitor-dot":[["path",{"d":"M12 17v4"}],["path",{"d":"M22 12.307V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8.693"}],["path",{"d":"M8 21h8"}],["circle",{"cx":"19","cy":"6","r":"3"}]],"monitor-down":[["path",{"d":"M12 13V7"}],["path",{"d":"m15 10-3 3-3-3"}],["rect",{"width":"20","height":"14","x":"2","y":"3","rx":"2"}],["path",{"d":"M12 17v4"}],["path",{"d":"M8 21h8"}]],"monitor-off":[["path",{"d":"M12 17v4"}],["path",{"d":"M17 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 1.184-1.826"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M8 21h8"}],["path",{"d":"M8.656 3H20a2 2 0 0 1 2 2v10a2 2 0 0 1-.293 1.042"}]],"monitor-pause":[["path",{"d":"M10 13V7"}],["path",{"d":"M14 13V7"}],["rect",{"width":"20","height":"14","x":"2","y":"3","rx":"2"}],["path",{"d":"M12 17v4"}],["path",{"d":"M8 21h8"}]],"monitor-pc":[["path",{"d":"M10 15H4a2 2 0 01-2-2V7a2 2 0 012-2h6"}],["path",{"d":"M10 19H5"}],["path",{"d":"M14 11h8"}],["path",{"d":"M14 7h8"}],["path",{"d":"M18 17h.01"}],["path",{"d":"M9 19v-4"}],["rect",{"x":"14","y":"3","width":"8","height":"18","rx":"1"}]],"monitor-play":[["path",{"d":"M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"}],["path",{"d":"M12 17v4"}],["path",{"d":"M8 21h8"}],["rect",{"x":"2","y":"3","width":"20","height":"14","rx":"2"}]],"monitor-smartphone":[["path",{"d":"M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"}],["path",{"d":"M10 19v-3.96 3.15"}],["path",{"d":"M7 19h5"}],["rect",{"width":"6","height":"10","x":"16","y":"12","rx":"2"}]],"monitor-speaker":[["path",{"d":"M5.5 20H8"}],["path",{"d":"M17 9h.01"}],["rect",{"width":"10","height":"16","x":"12","y":"4","rx":"2"}],["path",{"d":"M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4"}],["circle",{"cx":"17","cy":"15","r":"1"}]],"monitor-stop":[["path",{"d":"M12 17v4"}],["path",{"d":"M8 21h8"}],["rect",{"x":"2","y":"3","width":"20","height":"14","rx":"2"}],["rect",{"x":"9","y":"7","width":"6","height":"6","rx":"1"}]],"monitor-up":[["path",{"d":"m9 10 3-3 3 3"}],["path",{"d":"M12 13V7"}],["rect",{"width":"20","height":"14","x":"2","y":"3","rx":"2"}],["path",{"d":"M12 17v4"}],["path",{"d":"M8 21h8"}]],"monitor-x":[["path",{"d":"m14.5 12.5-5-5"}],["path",{"d":"m9.5 12.5 5-5"}],["rect",{"width":"20","height":"14","x":"2","y":"3","rx":"2"}],["path",{"d":"M12 17v4"}],["path",{"d":"M8 21h8"}]],"monitor":[["rect",{"width":"20","height":"14","x":"2","y":"3","rx":"2"}],["line",{"x1":"8","x2":"16","y1":"21","y2":"21"}],["line",{"x1":"12","x2":"12","y1":"17","y2":"21"}]],"moon-star":[["path",{"d":"M18 5h4"}],["path",{"d":"M20 3v4"}],["path",{"d":"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]],"moon":[["path",{"d":"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"}]],"mop-sparkles":[["path",{"d":"M10 22a3 3 0 01-3-3"}],["path",{"d":"M10 22c2.761 0 5-1.79 5-4-4.42 0-4.08-5-8.5-5a4.501 4.501 0 000 9z"}],["path",{"d":"M10 3H8"}],["path",{"d":"M12.5 11.5 22 2"}],["path",{"d":"M20 13v4"}],["path",{"d":"M22 15h-4"}],["path",{"d":"M4 5v4"}],["path",{"d":"M6 7H2"}],["path",{"d":"m6.98 13.02 2.665-2.664a1.21 1.21 0 011.71 0l2.29 2.288a1.21 1.21 0 010 1.712l-2.088 2.087"}],["path",{"d":"M9 2v2"}]],"mop":[["path",{"d":"M10 22c2.761 0 5-1.79 5-4-4.42 0-4.08-5-8.5-5a1 1 0 100 9za3 3 0 01-3-3"}],["path",{"d":"M12.5 11.5 22 2"}],["path",{"d":"m6.98 13.02 2.665-2.664a1.21 1.21 0 011.71 0l2.29 2.288a1.21 1.21 0 010 1.712l-2.088 2.087"}]],"moped":[["path",{"d":"m18.16 14.12-2.927-8.447A1 1 0 0 0 14.288 5H13"}],["path",{"d":"M19 10a7 7 0 0 0-6.928 6"}],["path",{"d":"M2 10h5.5a3 3 0 0 1 2.747 1.795l1.669 3.803A1 1 0 0 1 11.01 17H8"}],["circle",{"cx":"19","cy":"17","r":"3"}],["circle",{"cx":"5","cy":"17","r":"3"}]],"mosque":[["path",{"d":"M12.268 2a2 2 0 003.465 2"}],["path",{"d":"M14 5 L14 8"}],["path",{"d":"M16 22v-3a2 2 0 00-4 0v3"}],["path",{"d":"M21 13c-.662-1.497-1.666-2.753-2.9-3.63C16.825 8.47 15.422 8 14 8s-2.826.47-4.1 1.37C8.668 10.248 7.663 11.504 7 13z"}],["path",{"d":"M3 9h4"}],["path",{"d":"M7 22V6a5 5 0 00-2-4 5 5 0 00-2 4v14a2 2 0 002 2h14a2 2 0 002-2v-7"}]],"motorbike":[["path",{"d":"m18 14-1-3"}],["path",{"d":"m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81"}],["path",{"d":"M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5"}],["circle",{"cx":"19","cy":"17","r":"3"}],["circle",{"cx":"5","cy":"17","r":"3"}]],"mound-shovel":[["path",{"d":"m16 16 1.553-3.106a1 1 0 0 0-.447-1.341l-2.212-1.106a1 1 0 0 0-1.341.447l-1.193 2.387"}],["path",{"d":"m20 3-4 8"}],["path",{"d":"M21 21a1 1 0 0 0 .599-1.801c-1.333-.998-.992-4.21-3.599-4.199-1.271.006-1.5 1-2 1-2.5 0-3.209-4-6.5-4-5.106 0-4 5.107-7.059 7.17A1 1 0 0 0 3 21z"}],["path",{"d":"m22 4-4-2"}]],"mountain-snow":[["path",{"d":"m8 3 4 8 5-5 5 15H2L8 3z"}],["path",{"d":"M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"}]],"mountain":[["path",{"d":"m8 3 4 8 5-5 5 15H2L8 3z"}]],"mouse-left":[["path",{"d":"M12 7.318V10"}],["path",{"d":"M5 10v5a7 7 0 0 0 14 0V9c0-3.527-2.608-6.515-6-7"}],["circle",{"cx":"7","cy":"4","r":"2"}]],"mouse-off":[["path",{"d":"M12 6v.343"}],["path",{"d":"M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218"}],["path",{"d":"M19 13.343V9A7 7 0 0 0 8.56 2.902"}],["path",{"d":"M22 22 2 2"}]],"mouse-pointer-2-off":[["path",{"d":"m15.55 8.45 5.138 2.087a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063L8.45 15.551"}],["path",{"d":"M22 2 2 22"}],["path",{"d":"m6.816 11.528-2.779-6.84a.495.495 0 0 1 .651-.651l6.84 2.779"}]],"mouse-pointer-2":[["path",{"d":"M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"}]],"mouse-pointer-ban":[["path",{"d":"M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z"}],["circle",{"cx":"16","cy":"16","r":"6"}],["path",{"d":"m11.8 11.8 8.4 8.4"}]],"mouse-pointer-click":[["path",{"d":"M14 4.1 12 6"}],["path",{"d":"m5.1 8-2.9-.8"}],["path",{"d":"m6 12-1.9 2"}],["path",{"d":"M7.2 2.2 8 5.1"}],["path",{"d":"M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"}]],"mouse-pointer":[["path",{"d":"M12.586 12.586 19 19"}],["path",{"d":"M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z"}]],"mouse-right":[["path",{"d":"M12 7.318V10"}],["path",{"d":"M19 10v5a7 7 0 0 1-14 0V9c0-3.527 2.608-6.515 6-7"}],["circle",{"cx":"17","cy":"4","r":"2"}]],"mouse":[["rect",{"x":"5","y":"2","width":"14","height":"20","rx":"7"}],["path",{"d":"M12 6v4"}]],"mouth-off":[["path",{"d":"M13.074 7.417a2.6 2.6 0 012.989.099c1.829 1.36 3.053 2.076 5.479 3.644a1 1 0 01.308 1.368 11.6 11.6 0 01-1.617 2.05"}],["path",{"d":"M2 12a50.5 50.5 0 0010.99.99"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M21 11a1 1 0 011 1 51 51 0 01-3.734.61"}],["path",{"d":"M7.695 7.695c-1.7 1.247-2.92 1.967-5.238 3.464a1 1 0 00-.307 1.369 11.6 11.6 0 0014.766 4.388"}]],"mouth":[["path",{"d":"M2 12a50.5 50.5 0 0020 0 1 1 0 00-1-1"}],["path",{"d":"M2.457 11.159a1 1 0 00-.307 1.369 11.59 11.59 0 0019.7 0 1 1 0 00-.308-1.368c-2.426-1.568-3.65-2.284-5.479-3.644a2.6 2.6 0 00-3.373.208 1 1 0 01-1.38 0 2.62 2.62 0 00-3.373-.208c-1.83 1.36-3.053 2.076-5.48 3.643"}]],"move-3d":[["path",{"d":"M5 3v16h16"}],["path",{"d":"m5 19 6-6"}],["path",{"d":"m2 6 3-3 3 3"}],["path",{"d":"m18 16 3 3-3 3"}]],"move-diagonal-2":[["path",{"d":"M19 13v6h-6"}],["path",{"d":"M5 11V5h6"}],["path",{"d":"m5 5 14 14"}]],"move-diagonal":[["path",{"d":"M11 19H5v-6"}],["path",{"d":"M13 5h6v6"}],["path",{"d":"M19 5 5 19"}]],"move-down-left":[["path",{"d":"M11 19H5V13"}],["path",{"d":"M19 5L5 19"}]],"move-down-right":[["path",{"d":"M19 13V19H13"}],["path",{"d":"M5 5L19 19"}]],"move-down":[["path",{"d":"M8 18L12 22L16 18"}],["path",{"d":"M12 2V22"}]],"move-horizontal":[["path",{"d":"m18 8 4 4-4 4"}],["path",{"d":"M2 12h20"}],["path",{"d":"m6 8-4 4 4 4"}]],"move-left":[["path",{"d":"M6 8L2 12L6 16"}],["path",{"d":"M2 12H22"}]],"move-right":[["path",{"d":"M18 8L22 12L18 16"}],["path",{"d":"M2 12H22"}]],"move-up-left":[["path",{"d":"M5 11V5H11"}],["path",{"d":"M5 5L19 19"}]],"move-up-right":[["path",{"d":"M13 5H19V11"}],["path",{"d":"M19 5L5 19"}]],"move-up":[["path",{"d":"M8 6L12 2L16 6"}],["path",{"d":"M12 2V22"}]],"move-vertical":[["path",{"d":"M12 2v20"}],["path",{"d":"m8 18 4 4 4-4"}],["path",{"d":"m8 6 4-4 4 4"}]],"move":[["path",{"d":"M12 2v20"}],["path",{"d":"m15 19-3 3-3-3"}],["path",{"d":"m19 9 3 3-3 3"}],["path",{"d":"M2 12h20"}],["path",{"d":"m5 9-3 3 3 3"}],["path",{"d":"m9 5 3-3 3 3"}]],"navigation-2-off":[["path",{"d":"M9.31 9.31 5 21l7-4 7 4-1.17-3.17"}],["path",{"d":"M14.53 8.88 12 2l-1.17 3.17"}],["line",{"x1":"2","x2":"22","y1":"2","y2":"22"}]],"navigation-2":[["polygon",{"points":"12 2 19 21 12 17 5 21 12 2"}]],"navigation-off":[["path",{"d":"M8.43 8.43 3 11l8 2 2 8 2.57-5.43"}],["path",{"d":"M17.39 11.73 22 2l-9.73 4.61"}],["line",{"x1":"2","x2":"22","y1":"2","y2":"22"}]],"navigation":[["polygon",{"points":"3 11 22 2 13 21 11 13 3 11"}]],"nepali-rupee":[["path",{"d":"m14 20-8-8h4c5.333 0 5.333-8 0-8"}],["path",{"d":"M14 8c4.078 0 5.038 4.678 2.88 6.88"}],["path",{"d":"M6 4h12"}]],"network":[["rect",{"x":"16","y":"16","width":"6","height":"6","rx":"1"}],["rect",{"x":"2","y":"16","width":"6","height":"6","rx":"1"}],["rect",{"x":"9","y":"2","width":"6","height":"6","rx":"1"}],["path",{"d":"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"}],["path",{"d":"M12 12V8"}]],"newspaper":[["path",{"d":"M15 18h-5"}],["path",{"d":"M18 14h-8"}],["path",{"d":"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"}],["rect",{"width":"8","height":"4","x":"10","y":"6","rx":"1"}]],"nfc":[["path",{"d":"M6 8.32a7.43 7.43 0 0 1 0 7.36"}],["path",{"d":"M9.46 6.21a11.76 11.76 0 0 1 0 11.58"}],["path",{"d":"M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"}],["path",{"d":"M16.37 2a20.16 20.16 0 0 1 0 20"}]],"nigerian-naira":[["path",{"d":"M4 10h16"}],["path",{"d":"M4 14h16"}],["path",{"d":"M6 20V4.25a.25.25 0 01.455-.143l11.09 15.786a.25.25 0 00.455-.144V4"}]],"non-binary":[["path",{"d":"M12 2v10"}],["path",{"d":"m8.5 4 7 4"}],["path",{"d":"m8.5 8 7-4"}],["circle",{"cx":"12","cy":"17","r":"5"}]],"notebook-dot":[["path",{"d":"M16 11.75V22"}],["path",{"d":"M2 10h4"}],["path",{"d":"M2 14h4"}],["path",{"d":"M2 18h4"}],["path",{"d":"M2 6h4"}],["path",{"d":"M20 11.75V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5.65"}],["circle",{"cx":"18","cy":"5","r":"3"}]],"notebook-pen":[["path",{"d":"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"}],["path",{"d":"M2 6h4"}],["path",{"d":"M2 10h4"}],["path",{"d":"M2 14h4"}],["path",{"d":"M2 18h4"}],["path",{"d":"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"}]],"notebook-tabs":[["path",{"d":"M2 6h4"}],["path",{"d":"M2 10h4"}],["path",{"d":"M2 14h4"}],["path",{"d":"M2 18h4"}],["rect",{"width":"16","height":"20","x":"4","y":"2","rx":"2"}],["path",{"d":"M15 2v20"}],["path",{"d":"M15 7h5"}],["path",{"d":"M15 12h5"}],["path",{"d":"M15 17h5"}]],"notebook-text":[["path",{"d":"M2 6h4"}],["path",{"d":"M2 10h4"}],["path",{"d":"M2 14h4"}],["path",{"d":"M2 18h4"}],["rect",{"width":"16","height":"20","x":"4","y":"2","rx":"2"}],["path",{"d":"M9.5 8h5"}],["path",{"d":"M9.5 12H16"}],["path",{"d":"M9.5 16H14"}]],"notebook":[["path",{"d":"M2 6h4"}],["path",{"d":"M2 10h4"}],["path",{"d":"M2 14h4"}],["path",{"d":"M2 18h4"}],["rect",{"width":"16","height":"20","x":"4","y":"2","rx":"2"}],["path",{"d":"M16 2v20"}]],"notepad-text-dashed":[["path",{"d":"M8 2v4"}],["path",{"d":"M12 2v4"}],["path",{"d":"M16 2v4"}],["path",{"d":"M16 4h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M20 12v2"}],["path",{"d":"M20 18v2a2 2 0 0 1-2 2h-1"}],["path",{"d":"M13 22h-2"}],["path",{"d":"M7 22H6a2 2 0 0 1-2-2v-2"}],["path",{"d":"M4 14v-2"}],["path",{"d":"M4 8V6a2 2 0 0 1 2-2h2"}],["path",{"d":"M8 10h6"}],["path",{"d":"M8 14h8"}],["path",{"d":"M8 18h5"}]],"notepad-text":[["path",{"d":"M8 2v4"}],["path",{"d":"M12 2v4"}],["path",{"d":"M16 2v4"}],["rect",{"width":"16","height":"18","x":"4","y":"4","rx":"2"}],["path",{"d":"M8 10h6"}],["path",{"d":"M8 14h8"}],["path",{"d":"M8 18h5"}]],"numbers":[["path",{"d":"m10 4 2.6-1.95a.25.25 0 01.4.2V10"}],["path",{"d":"M16 14.535A4 4 0 0118 14a2 2 0 010 4 2 2 0 010 4 4 4 0 01-2-.535"}],["path",{"d":"M8 22H4.5a.5.5 0 01-.5-.5c0-2.68 4-2.932 4-5.5a2 2 0 00-2-2 2.5 2.5 0 00-2 1"}]],"nut-off":[["path",{"d":"M11.868 11.868a.88.88 0 01-.488.252c-1.78.28-3.54-.17-4.88-.62 0 1.272-.229 3.578-.653 5.347a10 10 0 01-.417 1.363c-.21.52-.82.55-1.17.12a10 10 0 01.677-13.393"}],["path",{"d":"M12.14 6.485a27.4 27.4 0 004.707-.638L20 9a7.23 7.23 0 011.706 7.05"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M20.707 20.707A1 1 0 0120 21h-1c-1.069 0-1.648.242-2.485.552A7.2 7.2 0 019.002 20l-3.155-3.153"}],["path",{"d":"M8.356 2.7a10 10 0 019.974 1.56c.43.35.4.97-.12 1.17a10 10 0 01-1.363.417"}]],"nut":[["path",{"d":"M16.847 5.847 20 9a7.23 7.23 0 011.551 7.516C21.241 17.352 21 17.932 21 19v1a1 1 0 01-1 1h-1c-1.069 0-1.648.242-2.485.552A7.2 7.2 0 019.002 20l-3.155-3.153"}],["path",{"d":"M18.21 5.43c-1.71.69-5.07 1.07-6.71 1.07.46 1.38.91 2.74.61 4.88a.88.88 0 01-.73.74c-1.78.28-3.54-.17-4.88-.62 0 1.64-.38 5-1.07 6.71-.21.52-.82.55-1.17.12A10 10 0 0118.33 4.26c.43.35.4.97-.12 1.17"}],["path",{"d":"M4.93 4.93 3 3a.7.7 0 010-1"}]],"octagon-exclamation-point":[["path",{"d":"M12 16h.01"}],["path",{"d":"M12 8v4"}],["path",{"d":"M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"}]],"octagon-minus":[["path",{"d":"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"}],["path",{"d":"M8 12h8"}]],"octagon-pause":[["path",{"d":"M10 15V9"}],["path",{"d":"M14 15V9"}],["path",{"d":"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"}]],"octagon-x":[["path",{"d":"m15 9-6 6"}],["path",{"d":"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"}],["path",{"d":"m9 9 6 6"}]],"octagon":[["path",{"d":"M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z"}]],"omega":[["path",{"d":"M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21"}]],"opacity":[["path",{"d":"M12 3h.01"}],["path",{"d":"M12 9h.01"}],["path",{"d":"M15 6h.01"}],["path",{"d":"M18 3h.01"}],["path",{"d":"M21 6v13a2 2 0 0 1-2 2H6"}],["path",{"d":"M3 12h.01"}],["path",{"d":"M3 18h.01"}],["path",{"d":"M3 6h.01"}],["path",{"d":"M6 15h.01"}],["path",{"d":"M6 3h.01"}],["path",{"d":"M6 9h.01"}],["path",{"d":"M9 12h.01"}],["path",{"d":"M9 6h.01"}]],"option":[["path",{"d":"M14 3h7"}],["path",{"d":"M3 3h5.28a1 1 0 0 1 .948.684l5.544 16.632a1 1 0 0 0 .949.684H21"}]],"orbit":[["path",{"d":"M20.341 6.484A10 10 0 0 1 10.266 21.85"}],["path",{"d":"M3.659 17.516A10 10 0 0 1 13.74 2.152"}],["circle",{"cx":"12","cy":"12","r":"3"}],["circle",{"cx":"19","cy":"5","r":"2"}],["circle",{"cx":"5","cy":"19","r":"2"}]],"origami":[["path",{"d":"M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025"}],["path",{"d":"m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009"}],["path",{"d":"m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027"}]],"package-2":[["path",{"d":"M12 3v6"}],["path",{"d":"M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z"}],["path",{"d":"M3.054 9.013h17.893"}]],"package-check":[["path",{"d":"M12 22V12"}],["path",{"d":"m16 17 2 2 4-4"}],["path",{"d":"M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753"}],["path",{"d":"M3.29 7 12 12l8.71-5"}],["path",{"d":"m7.5 4.27 8.997 5.148"}]],"package-minus":[["path",{"d":"M12 22V12"}],["path",{"d":"M16 17h6"}],["path",{"d":"M21 13V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955"}],["path",{"d":"M3.29 7 12 12l8.71-5"}],["path",{"d":"m7.5 4.27 8.997 5.148"}]],"package-open":[["path",{"d":"M12 22v-9"}],["path",{"d":"M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"}],["path",{"d":"M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"}],["path",{"d":"M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"}]],"package-pen":[["path",{"d":"M12 14.34V12l8.71-5"}],["path",{"d":"M16.511 21.141a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 1 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .599.626z"}],["path",{"d":"M21 9.114V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l5.087 2.907"}],["path",{"d":"M3.29 7 12 12"}],["path",{"d":"m7.5 4.27 9 5.15"}]],"package-plus":[["path",{"d":"M12 22V12"}],["path",{"d":"M16 17h6"}],["path",{"d":"M19 14v6"}],["path",{"d":"M21 10.535V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955"}],["path",{"d":"M3.29 7 12 12l8.71-5"}],["path",{"d":"m7.5 4.27 8.997 5.148"}]],"package-question-mark":[["path",{"d":"M12 22V12l8.71-5"}],["path",{"d":"M21 10.342V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2.33-1.332"}],["path",{"d":"M3.29 7 12 12"}],["path",{"d":"m7.5 4.27 9 5.15"}],["path",{"d":"M19 18.5c.5-1 2-1 2-2.5a2 2 0 00-2-2 2.5 2.5 0 00-2 1"}],["path",{"d":"M19 22h.01"}]],"package-search":[["path",{"d":"M12 22V12"}],["path",{"d":"M20.27 18.27 22 20"}],["path",{"d":"M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559"}],["path",{"d":"M3.29 7 12 12l8.71-5"}],["path",{"d":"m7.5 4.27 8.997 5.148"}],["circle",{"cx":"18.5","cy":"16.5","r":"2.5"}]],"package-x":[["path",{"d":"M12 22V12"}],["path",{"d":"m16.5 14.5 5 5"}],["path",{"d":"m16.5 19.5 5-5"}],["path",{"d":"M21 10.5V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.13-.074"}],["path",{"d":"M3.29 7 12 12l8.71-5"}],["path",{"d":"m7.5 4.27 8.997 5.148"}]],"package":[["path",{"d":"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"}],["path",{"d":"M12 22V12"}],["polyline",{"points":"3.29 7 12 12 20.71 7"}],["path",{"d":"m7.5 4.27 9 5.15"}]],"paint-bucket":[["path",{"d":"M11 7 6 2"}],["path",{"d":"M18.992 12H2.041"}],["path",{"d":"M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595"}],["path",{"d":"m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33"}]],"paint-roller":[["rect",{"width":"16","height":"6","x":"2","y":"2","rx":"2"}],["path",{"d":"M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"}],["rect",{"width":"4","height":"6","x":"8","y":"16","rx":"1"}]],"paintbrush-vertical":[["path",{"d":"M10 2v2"}],["path",{"d":"M14 2v4"}],["path",{"d":"M17 2a1 1 0 0 1 1 1v9H6V3a1 1 0 0 1 1-1z"}],["path",{"d":"M6 12a1 1 0 0 0-1 1v1a2 2 0 0 0 2 2h2a1 1 0 0 1 1 1v2.9a2 2 0 1 0 4 0V17a1 1 0 0 1 1-1h2a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1"}]],"paintbrush":[["path",{"d":"m14.622 17.897-10.68-2.913"}],["path",{"d":"M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"}],["path",{"d":"M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"}]],"palette":[["path",{"d":"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{"cx":"13.5","cy":"6.5","r":".5","fill":"currentColor"}],["circle",{"cx":"17.5","cy":"10.5","r":".5","fill":"currentColor"}],["circle",{"cx":"6.5","cy":"12.5","r":".5","fill":"currentColor"}],["circle",{"cx":"8.5","cy":"7.5","r":".5","fill":"currentColor"}]],"panda":[["path",{"d":"M11.25 17.25h1.5L12 18z"}],["path",{"d":"m15 12 2 2"}],["path",{"d":"M17.902 6.599a8 8 0 0 0-.5-.5"}],["path",{"d":"M2 14.5C2 19.47 6.48 22 12 22s10-2.53 10-7.5a10 10 0 0 0-1.3-4.83 4.5 4.5 0 1 0-7.05-5.5 8 8 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5A10 10 0 0 0 2 14.5"}],["path",{"d":"M6.099 6.599a8 8 0 0 1 .5-.5"}],["path",{"d":"m9 12-2 2"}]],"panel-bottom-close":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M3 15h18"}],["path",{"d":"m15 8-3 3-3-3"}]],"panel-bottom-dashed":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M14 15h1"}],["path",{"d":"M19 15h2"}],["path",{"d":"M3 15h2"}],["path",{"d":"M9 15h1"}]],"panel-bottom-open":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M3 15h18"}],["path",{"d":"m9 10 3-3 3 3"}]],"panel-bottom":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M3 15h18"}]],"panel-left-close":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M9 3v18"}],["path",{"d":"m16 15-3-3 3-3"}]],"panel-left-dashed":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M9 14v1"}],["path",{"d":"M9 19v2"}],["path",{"d":"M9 3v2"}],["path",{"d":"M9 9v1"}]],"panel-left-open":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M9 3v18"}],["path",{"d":"m14 9 3 3-3 3"}]],"panel-left-right-dashed":[["path",{"d":"M15 10V9"}],["path",{"d":"M15 15v-1"}],["path",{"d":"M15 21v-2"}],["path",{"d":"M15 5V3"}],["path",{"d":"M9 10V9"}],["path",{"d":"M9 15v-1"}],["path",{"d":"M9 21v-2"}],["path",{"d":"M9 5V3"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"panel-left":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M9 3v18"}]],"panel-right-close":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M15 3v18"}],["path",{"d":"m8 9 3 3-3 3"}]],"panel-right-dashed":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M15 14v1"}],["path",{"d":"M15 19v2"}],["path",{"d":"M15 3v2"}],["path",{"d":"M15 9v1"}]],"panel-right-open":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M15 3v18"}],["path",{"d":"m10 15-3-3 3-3"}]],"panel-right":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M15 3v18"}]],"panel-top-bottom-dashed":[["path",{"d":"M14 15h1"}],["path",{"d":"M14 9h1"}],["path",{"d":"M19 15h2"}],["path",{"d":"M19 9h2"}],["path",{"d":"M3 15h2"}],["path",{"d":"M3 9h2"}],["path",{"d":"M9 15h1"}],["path",{"d":"M9 9h1"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"panel-top-close":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M3 9h18"}],["path",{"d":"m9 16 3-3 3 3"}]],"panel-top-dashed":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M14 9h1"}],["path",{"d":"M19 9h2"}],["path",{"d":"M3 9h2"}],["path",{"d":"M9 9h1"}]],"panel-top-open":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M3 9h18"}],["path",{"d":"m15 14-3 3-3-3"}]],"panel-top":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M3 9h18"}]],"panels-left-bottom":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M9 3v18"}],["path",{"d":"M9 15h12"}]],"panels-right-bottom":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M3 15h12"}],["path",{"d":"M15 3v18"}]],"panels-top-left":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M3 9h18"}],["path",{"d":"M9 21V9"}]],"paper-bag":[["path",{"d":"M5.364 3.848C4 6 3 9.652 3 12.652V19a2 2 0 002 2h14a2 2 0 002-2v-5c0-2.334-1.816-4.668-2.622-7.002"}],["path",{"d":"M7 3h11.379a2 2 0 011.789 1.106l.723 1.447A1 1 0 0119.997 7h-8.525a2 2 0 01-1.789-1.106L8.79 4.105a2 2 0 10-3.579 1.789l2.261 4.522A5 5 0 018 12.652V21"}]],"paperclip":[["path",{"d":"m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"}]],"parasol":[["path",{"d":"M12.5 11.134 18.196 21"}],["path",{"d":"M20.425 5.299a10 10 0 0 0-16.941 9.78c.183.563.843.774 1.355.478L20.16 6.711c.512-.296.66-.973.264-1.413"}],["path",{"d":"M21 21H3"}]],"parentheses":[["path",{"d":"M8 21s-4-3-4-9 4-9 4-9"}],["path",{"d":"M16 3s4 3 4 9-4 9-4 9"}]],"park":[["path",{"d":"M12 18h10"}],["path",{"d":"M13.248 9.998A4.5 4.5 0 0 0 11.75 8.6V8a1 1 0 0 0-7.5 0 4.9 4.9 0 0 0 2.25 9H8"}],["path",{"d":"m15 14-2 6"}],["path",{"d":"m19 14 2 6"}],["path",{"d":"M21 14h-8"}],["path",{"d":"M8 20v-5.922a2 2 0 0 0-.586-1.414L6.5 11.75"}],["path",{"d":"M9.205 12.795 8 14"}],["circle",{"cx":"19","cy":"6","r":"2"}]],"parking-meter":[["path",{"d":"M11 15h2"}],["path",{"d":"M12 12v3"}],["path",{"d":"M12 19v3"}],["path",{"d":"M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z"}],["path",{"d":"M9 9a3 3 0 1 1 6 0"}]],"party-popper":[["path",{"d":"M5.8 11.3 2 22l10.7-3.79"}],["path",{"d":"M4 3h.01"}],["path",{"d":"M22 8h.01"}],["path",{"d":"M15 2h.01"}],["path",{"d":"M22 20h.01"}],["path",{"d":"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"}],["path",{"d":"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17"}],["path",{"d":"m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7"}],["path",{"d":"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"}]],"pause":[["rect",{"x":"14","y":"3","width":"5","height":"18","rx":"1"}],["rect",{"x":"5","y":"3","width":"5","height":"18","rx":"1"}]],"paw-print":[["circle",{"cx":"11","cy":"4","r":"2"}],["circle",{"cx":"18","cy":"8","r":"2"}],["circle",{"cx":"20","cy":"16","r":"2"}],["path",{"d":"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"}]],"pc-case":[["rect",{"width":"14","height":"20","x":"5","y":"2","rx":"2"}],["path",{"d":"M15 14h.01"}],["path",{"d":"M9 6h6"}],["path",{"d":"M9 10h6"}]],"pen-line":[["path",{"d":"M13 21h8"}],["path",{"d":"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}]],"pen-off":[["path",{"d":"m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982"}],["path",{"d":"m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353"}],["path",{"d":"m2 2 20 20"}]],"pen-tool":[["path",{"d":"m18 13-.654-4.736a4 4 0 00-2.756-3.266l-9.163-2.9a2 2 0 00-2.017.493l-.82.819a2 2 0 00-.492 2.017l2.9 9.163a4 4 0 003.266 2.756L13 18"}],["path",{"d":"M18.648 12.352a1.205 1.205 0 011.704 0l1.296 1.296a1.205 1.205 0 010 1.704l-6.296 6.296a1.205 1.205 0 01-1.704 0l-1.296-1.296a1.205 1.205 0 010-1.704z"}],["path",{"d":"m3 3 6.586 6.586"}],["circle",{"cx":"11","cy":"11","r":"2"}]],"pen":[["path",{"d":"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}]],"pencil-line":[["path",{"d":"M13 21h8"}],["path",{"d":"m15 5 4 4"}],["path",{"d":"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}]],"pencil-off":[["path",{"d":"m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982"}],["path",{"d":"m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353"}],["path",{"d":"m15 5 4 4"}],["path",{"d":"m2 2 20 20"}]],"pencil-ruler":[["path",{"d":"M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"}],["path",{"d":"m8 6 2-2"}],["path",{"d":"m18 16 2-2"}],["path",{"d":"m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"}],["path",{"d":"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{"d":"m15 5 4 4"}]],"pencil-sparkles":[["path",{"d":"M10 3H8"}],["path",{"d":"m15.007 5.008 3.987 3.986"}],["path",{"d":"M20 15v4"}],["path",{"d":"M21.174 6.813a2.82 2.82 0 0 0-3.986-3.987L3.842 16.175a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{"d":"M22 17h-4"}],["path",{"d":"M4 5v4"}],["path",{"d":"M6 7H2"}],["path",{"d":"M9 2v2"}]],"pencil":[["path",{"d":"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{"d":"m15 5 4 4"}]],"pentagon":[["path",{"d":"M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z"}]],"percent":[["line",{"x1":"19","x2":"5","y1":"5","y2":"19"}],["circle",{"cx":"6.5","cy":"6.5","r":"2.5"}],["circle",{"cx":"17.5","cy":"17.5","r":"2.5"}]],"perfume-bottle":[["path",{"d":"M 5 22 H 11.072"}],["path",{"d":"M15 5 C 23 4 23.328 12.676 20 14.536"}],["path",{"d":"M15.802 10.308 C 14.776 9.465 14 8.496 14 7"}],["path",{"d":"M2 2h.01"}],["path",{"d":"M2 7h.01"}],["path",{"d":"M5 4.5h.01"}],["path",{"d":"M8.127 22 A 8 8 0 0 1 4 15 3 3 0 0 1 4.879 12.879C 6.879 10.879 10 10 10 7"}],["circle",{"cx":"18","cy":"18","r":"4"}],["rect",{"x":"9","y":"2","width":"6","height":"5","rx":"1"}]],"person-standing":[["circle",{"cx":"12","cy":"5","r":"1"}],["path",{"d":"m9 20 3-6 3 6"}],["path",{"d":"m6 8 6 2 6-2"}],["path",{"d":"M12 10v4"}]],"phi":[["path",{"d":"M12 2v20"}],["circle",{"cx":"12","cy":"12","r":"7"}]],"philippine-peso":[["path",{"d":"M4 12h16"}],["path",{"d":"M4 8h16"}],["path",{"d":"M6 20V5a1 1 0 011-1h5a6 6 0 010 12H6"}]],"phone-call":[["path",{"d":"M13 2a9 9 0 0 1 9 9"}],["path",{"d":"M13 6a5 5 0 0 1 5 5"}],["path",{"d":"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"}]],"phone-forwarded":[["path",{"d":"M14 6h8"}],["path",{"d":"m18 2 4 4-4 4"}],["path",{"d":"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"}]],"phone-incoming":[["path",{"d":"M16 2v6h6"}],["path",{"d":"m22 2-6 6"}],["path",{"d":"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"}]],"phone-log":[["path",{"d":"M13.832 16.568a1 1 0 001.213-.303l.355-.465A2 2 0 0117 15h3a2 2 0 012 2v3a2 2 0 01-2 2A18 18 0 012 4a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-.8 1.6l-.468.351a1 1 0 00-.292 1.233 14 14 0 006.392 6.384"}],["path",{"d":"M14.396 4.171h7.171"}],["path",{"d":"M17.343 8.17h4.224"}]],"phone-missed":[["path",{"d":"m16 2 6 6"}],["path",{"d":"m22 2-6 6"}],["path",{"d":"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"}]],"phone-off":[["path",{"d":"M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272"}],["path",{"d":"M22 2 2 22"}],["path",{"d":"M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473"}]],"phone-outgoing":[["path",{"d":"m16 8 6-6"}],["path",{"d":"M22 8V2h-6"}],["path",{"d":"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"}]],"phone":[["path",{"d":"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"}]],"pi":[["line",{"x1":"9","x2":"9","y1":"4","y2":"20"}],["path",{"d":"M4 7c0-1.7 1.3-3 3-3h13"}],["path",{"d":"M18 20c-1.7 0-3-1.3-3-3V4"}]],"piano":[["path",{"d":"M10 13v4"}],["path",{"d":"M14 13v4"}],["path",{"d":"M18 13v4"}],["path",{"d":"M2 13h20"}],["path",{"d":"M22 11.5A3.5 3.5 0 0018.5 8a3.52 3.52 0 01-3.173-2A7 7 0 002 9v10a2 2 0 002 2h16a2 2 0 002-2z"}],["path",{"d":"M6 13v4"}]],"pickaxe":[["path",{"d":"m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999"}],["path",{"d":"M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024"}],["path",{"d":"M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069"}],["path",{"d":"M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z"}]],"picture-in-picture-2":[["path",{"d":"M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4"}],["rect",{"width":"10","height":"7","x":"12","y":"13","rx":"2"}]],"picture-in-picture":[["path",{"d":"M2 10h6V4"}],["path",{"d":"m2 4 6 6"}],["path",{"d":"M21 10V7a2 2 0 0 0-2-2h-7"}],["path",{"d":"M3 14v2a2 2 0 0 0 2 2h3"}],["rect",{"x":"12","y":"14","width":"10","height":"7","rx":"1"}]],"piggy-bank":[["path",{"d":"M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"}],["path",{"d":"M16 10h.01"}],["path",{"d":"M2 8v1a2 2 0 0 0 2 2h1"}]],"pilcrow-left":[["path",{"d":"M14 3v11"}],["path",{"d":"M14 9h-3a3 3 0 0 1 0-6h9"}],["path",{"d":"M18 3v11"}],["path",{"d":"M22 18H2l4-4"}],["path",{"d":"m6 22-4-4"}]],"pilcrow-right":[["path",{"d":"M10 3v11"}],["path",{"d":"M10 9H7a1 1 0 0 1 0-6h8"}],["path",{"d":"M14 3v11"}],["path",{"d":"m18 14 4 4H2"}],["path",{"d":"m22 18-4 4"}]],"pilcrow":[["path",{"d":"M13 4v16"}],["path",{"d":"M17 4v16"}],["path",{"d":"M19 4H9.5a4.5 4.5 0 0 0 0 9H13"}]],"pill-bottle":[["path",{"d":"M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4"}],["path",{"d":"M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"}],["rect",{"width":"16","height":"5","x":"4","y":"2","rx":"1"}]],"pill":[["path",{"d":"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"}],["path",{"d":"m8.5 8.5 7 7"}]],"pin-off":[["path",{"d":"M12 17v5"}],["path",{"d":"M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11"}]],"pin":[["path",{"d":"M12 17v5"}],["path",{"d":"M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"}]],"pipette":[["path",{"d":"m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12"}],["path",{"d":"m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z"}],["path",{"d":"m2 22 .414-.414"}]],"pizza":[["path",{"d":"m12 14-1 1"}],["path",{"d":"m13.75 18.25-1.25 1.42"}],["path",{"d":"M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12"}],["path",{"d":"M18.8 9.3a1 1 0 0 0 2.1 7.7"}],["path",{"d":"M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z"}]],"plane-landing":[["path",{"d":"M2 22h20"}],["path",{"d":"M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"}]],"plane-takeoff":[["path",{"d":"M2 22h20"}],["path",{"d":"M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"}]],"plane":[["path",{"d":"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"}]],"plant-pot":[["path",{"d":"M14 8.536V6a4 4 0 014-4h1.5a.5.5 0 01.5.5V4a4 4 0 01-4 4 4 4 0 00-4 4 5 5 0 01-8-4 5 5 0 018 4c0 2 1 3 1 5"}],["path",{"d":"m18 17-1.085 3.58A2 2 0 0115 22H9.002a2 2 0 01-1.913-1.418L6 17"}],["path",{"d":"M5 17h14"}]],"play-off":[["path",{"d":"m10.215 4.56 9.79 5.71a2 2 0 0 1 .003 3.458l-.393.23"}],["path",{"d":"m16.042 16.042-8.034 4.686A2 2 0 0 1 5 19V5"}],["path",{"d":"m2 2 20 20"}]],"play":[["path",{"d":"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}]],"playing-card":[["path",{"d":"M12.832 8.445a1 1 0 00-1.589-.098l-2.075 3.098a1 1 0 000 1.11l2 3a1 1 0 001.664 0l2-3a1 1 0 000-1.11z"}],["rect",{"x":"5","y":"2","width":"14","height":"20","rx":"2"}]],"playing-cards-fan":[["path",{"d":"M12.65 7.65a2 2 0 012.629-1.046l5.51 2.374a2 2 0 011.046 2.628l-3.957 9.184a2 2 0 01-2.628 1.046l-5.51-2.374a2 2 0 01-1.046-2.628z"}],["path",{"d":"M18 7.777V4a2 2 0 00-2-2h-6a2 2 0 00-2 2v10a2 2 0 001.137 1.805"}],["path",{"d":"m8 4.389-4.364.809a2 2 0 00-1.602 2.33l1.822 9.833a2 2 0 002.331 1.602l2.542-.47"}]],"playing-cards":[["path",{"d":"M14.832 8.445a1 1 0 00-1.589-.098l-2.075 3.098a1 1 0 000 1.11l2 3a1 1 0 001.664 0l2-3a1 1 0 000-1.11z"}],["path",{"d":"m7.18 20.827-5-11a2 2 0 01.993-2.647L7 5.44"}],["rect",{"x":"7","y":"2","width":"14","height":"20","rx":"2"}]],"plug-2":[["path",{"d":"M9 2v6"}],["path",{"d":"M15 2v6"}],["path",{"d":"M12 17v5"}],["path",{"d":"M5 8h14"}],["path",{"d":"M6 11V8h12v3a6 6 0 1 1-12 0Z"}]],"plug-zap":[["path",{"d":"M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"}],["path",{"d":"m2 22 3-3"}],["path",{"d":"M7.5 13.5 10 11"}],["path",{"d":"M10.5 16.5 13 14"}],["path",{"d":"m18 3-4 4h6l-4 4"}]],"plug":[["path",{"d":"M12 22v-5"}],["path",{"d":"M15 8V2"}],["path",{"d":"M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z"}],["path",{"d":"M9 8V2"}]],"plus":[["path",{"d":"M5 12h14"}],["path",{"d":"M12 5v14"}]],"pocket-knife":[["path",{"d":"M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2"}],["path",{"d":"M18 6h.01"}],["path",{"d":"M6 18h.01"}],["path",{"d":"M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z"}],["path",{"d":"M18 11.66V22a4 4 0 0 0 4-4V6"}]],"podium":[["path",{"d":"M12 6V2h-1"}],["path",{"d":"M9 15a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1"}],["path",{"d":"M9 21V11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10"}]],"pointer-off":[["path",{"d":"M10 4.5V4a2 2 0 0 0-2.41-1.957"}],["path",{"d":"M13.9 8.4a2 2 0 0 0-1.26-1.295"}],["path",{"d":"M21.7 16.2A8 8 0 0 0 22 14v-3a2 2 0 1 0-4 0v-1a2 2 0 0 0-3.63-1.158"}],["path",{"d":"m7 15-1.8-1.8a2 2 0 0 0-2.79 2.86L6 19.7a7.74 7.74 0 0 0 6 2.3h2a8 8 0 0 0 5.657-2.343"}],["path",{"d":"M6 6v8"}],["path",{"d":"m2 2 20 20"}]],"pointer":[["path",{"d":"M22 14a8 8 0 0 1-8 8"}],["path",{"d":"M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2"}],["path",{"d":"M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1"}],["path",{"d":"M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10"}],["path",{"d":"M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"}]],"popcorn":[["path",{"d":"M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4"}],["path",{"d":"M10 22 9 8"}],["path",{"d":"m14 22 1-14"}],["path",{"d":"M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"}]],"popsicle":[["path",{"d":"M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.95 4.95 0 1 0-7.1 7.1l8.1 8.1c.9.7 2.1.7 2.9-.1Z"}],["path",{"d":"m22 22-5.5-5.5"}]],"pound-sterling":[["path",{"d":"M17 18a2 2 0 01-2 2H5a3 3 0 003-3V8a4 4 0 018 0"}],["path",{"d":"M6 12h7"}]],"power-off":[["path",{"d":"M18.36 6.64A9 9 0 0 1 20.77 15"}],["path",{"d":"M6.16 6.16a9 9 0 1 0 12.68 12.68"}],["path",{"d":"M12 2v4"}],["path",{"d":"m2 2 20 20"}]],"power":[["path",{"d":"M12 2v10"}],["path",{"d":"M18.4 6.6a9 9 0 1 1-12.77.04"}]],"presentation":[["path",{"d":"M2 3h20"}],["path",{"d":"M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"}],["path",{"d":"m7 21 5-5 5 5"}]],"printer-3d":[["path",{"d":"M10 11v1"}],["path",{"d":"M12 8h8"}],["path",{"d":"M15 20v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3"}],["path",{"d":"M4 20h16"}],["path",{"d":"M4 22V4a2 2 0 012-2h12a2 2 0 012 2v18"}],["path",{"d":"M4 8h4"}],["path",{"d":"M8.635 10.093A2 2 0 018 8.631V7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-.293.707l-1 1a1 1 0 01-1.414 0z"}]],"printer-check":[["path",{"d":"M13.5 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v.5"}],["path",{"d":"m16 19 2 2 4-4"}],["path",{"d":"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2"}],["path",{"d":"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"}]],"printer-x":[["path",{"d":"M12.531 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6.377"}],["path",{"d":"m16.5 16.5 5 5"}],["path",{"d":"m16.5 21.5 5-5"}],["path",{"d":"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.5"}],["path",{"d":"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"}]],"printer":[["path",{"d":"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}],["path",{"d":"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"}],["rect",{"x":"6","y":"14","width":"12","height":"8","rx":"1"}]],"projector":[["path",{"d":"M5 7 3 5"}],["path",{"d":"M9 6V3"}],["path",{"d":"m13 7 2-2"}],["circle",{"cx":"9","cy":"13","r":"3"}],["path",{"d":"M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17"}],["path",{"d":"M16 16h2"}]],"proportions":[["rect",{"width":"20","height":"16","x":"2","y":"4","rx":"2"}],["path",{"d":"M12 9v11"}],["path",{"d":"M2 9h13a2 2 0 0 1 2 2v9"}]],"puzzle":[["path",{"d":"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"}]],"pyramid":[["path",{"d":"M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z"}],["path",{"d":"M12 2v20"}]],"qr-code":[["rect",{"width":"5","height":"5","x":"3","y":"3","rx":"1"}],["rect",{"width":"5","height":"5","x":"16","y":"3","rx":"1"}],["rect",{"width":"5","height":"5","x":"3","y":"16","rx":"1"}],["path",{"d":"M21 16h-3a2 2 0 0 0-2 2v3"}],["path",{"d":"M21 21v.01"}],["path",{"d":"M12 7v3a2 2 0 0 1-2 2H7"}],["path",{"d":"M3 12h.01"}],["path",{"d":"M12 3h.01"}],["path",{"d":"M12 16v.01"}],["path",{"d":"M16 12h1"}],["path",{"d":"M21 12v.01"}],["path",{"d":"M12 21v-1"}]],"question-mark":[["path",{"d":"M12 15c0-2.48 5-2.99 5-6.5a5 4.5 0 00-10 0"}],["path",{"d":"M12 20h.01"}]],"quote":[["path",{"d":"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}],["path",{"d":"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"}]],"rabbit":[["path",{"d":"M13 16a3 3 0 0 1 2.24 5"}],["path",{"d":"M18 12h.01"}],["path",{"d":"M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3"}],["path",{"d":"M20 8.54V4a2 2 0 1 0-4 0v3"}],["path",{"d":"M7.612 12.524a3 3 0 1 0-1.6 4.3"}]],"radar":[["path",{"d":"M19.07 4.93A10 10 0 0 0 6.99 3.34"}],["path",{"d":"M4 6h.01"}],["path",{"d":"M2.29 9.62A10 10 0 1 0 21.31 8.35"}],["path",{"d":"M16.24 7.76A6 6 0 1 0 8.23 16.67"}],["path",{"d":"M12 18h.01"}],["path",{"d":"M17.99 11.66A6 6 0 0 1 15.77 16.67"}],["circle",{"cx":"12","cy":"12","r":"2"}],["path",{"d":"m13.41 10.59 5.66-5.66"}]],"radiation":[["path",{"d":"M12 12h.01"}],["path",{"d":"M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z"}],["path",{"d":"M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z"}],["path",{"d":"M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z"}]],"radical":[["path",{"d":"M3 12h3.28a1 1 0 0 1 .948.684l2.298 7.934a.5.5 0 0 0 .96-.044L13.82 4.771A1 1 0 0 1 14.792 4H21"}]],"radio-off":[["path",{"d":"M13.414 13.414a2 2 0 1 1-2.828-2.828"}],["path",{"d":"M16.247 7.761a6 6 0 0 1 1.744 4.572"}],["path",{"d":"M19.075 4.933a10 10 0 0 1 2.234 10.72"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M4.925 19.067a10 10 0 0 1 0-14.134"}],["path",{"d":"M7.753 16.239a6 6 0 0 1 0-8.478"}]],"radio-receiver":[["path",{"d":"M5 16v2"}],["path",{"d":"M19 16v2"}],["rect",{"width":"20","height":"8","x":"2","y":"8","rx":"2"}],["path",{"d":"M18 12h.01"}]],"radio-tower":[["path",{"d":"M4.9 16.1C1 12.2 1 5.8 4.9 1.9"}],["path",{"d":"M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"}],["circle",{"cx":"12","cy":"9","r":"2"}],["path",{"d":"M16.2 4.8c2 2 2.26 5.11.8 7.47"}],["path",{"d":"M19.1 1.9a9.96 9.96 0 0 1 0 14.1"}],["path",{"d":"M9.5 18h5"}],["path",{"d":"m8 22 4-11 4 11"}]],"radio":[["path",{"d":"M16.247 7.761a6 6 0 0 1 0 8.478"}],["path",{"d":"M19.075 4.933a10 10 0 0 1 0 14.134"}],["path",{"d":"M4.925 19.067a10 10 0 0 1 0-14.134"}],["path",{"d":"M7.753 16.239a6 6 0 0 1 0-8.478"}],["circle",{"cx":"12","cy":"12","r":"2"}]],"radius":[["path",{"d":"M20.34 17.52a10 10 0 1 0-2.82 2.82"}],["circle",{"cx":"19","cy":"19","r":"2"}],["path",{"d":"m13.41 13.41 4.18 4.18"}],["circle",{"cx":"12","cy":"12","r":"2"}]],"rainbow":[["path",{"d":"M22 17a10 10 0 0 0-20 0"}],["path",{"d":"M6 17a6 6 0 0 1 12 0"}],["path",{"d":"M10 17a2 2 0 0 1 4 0"}]],"rat":[["path",{"d":"M13 22H4a2 2 0 0 1 0-4h12"}],["path",{"d":"M13.236 18a3 3 0 0 0-2.2-5"}],["path",{"d":"M16 9h.01"}],["path",{"d":"M16.82 3.94a3 3 0 1 1 3.237 4.868l1.815 2.587a1.5 1.5 0 0 1-1.5 2.1l-2.872-.453a3 3 0 0 0-3.5 3"}],["path",{"d":"M17 4.988a3 3 0 1 0-5.2 2.052A7 7 0 0 0 4 14.015 4 4 0 0 0 8 18"}]],"ratio":[["rect",{"width":"12","height":"20","x":"6","y":"2","rx":"2"}],["rect",{"width":"20","height":"12","x":"2","y":"6","rx":"2"}]],"receipt-cent":[["path",{"d":"M12 7v10"}],["path",{"d":"M14.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0"}],["path",{"d":"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"}]],"receipt-euro":[["path",{"d":"M15.828 14.829a4 4 0 0 1-5.656 0 4 4 0 0 1 0-5.657 4 4 0 0 1 5.656 0"}],["path",{"d":"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"}],["path",{"d":"M8 12h5"}]],"receipt-indian-rupee":[["path",{"d":"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"}],["path",{"d":"M8 11h8"}],["path",{"d":"M8 7h8"}],["path",{"d":"M9 7a4 4 0 0 1 0 8H8l3 2"}]],"receipt-japanese-yen":[["path",{"d":"m12 10 3-3"}],["path",{"d":"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"}],["path",{"d":"M9 11h6"}],["path",{"d":"M9 15h6"}],["path",{"d":"m9 7 3 3v7"}]],"receipt-pound-sterling":[["path",{"d":"M10 17V9.5a1 1 0 0 1 5 0"}],["path",{"d":"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"}],["path",{"d":"M8 13h5"}],["path",{"d":"M8 17h7"}]],"receipt-russian-ruble":[["path",{"d":"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"}],["path",{"d":"M8 11h5a2 2 0 0 0 0-4h-3v10"}],["path",{"d":"M8 15h5"}]],"receipt-swiss-franc":[["path",{"d":"M10 11h4"}],["path",{"d":"M10 17V7h5"}],["path",{"d":"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"}],["path",{"d":"M8 15h5"}]],"receipt-text":[["path",{"d":"M13 16H8"}],["path",{"d":"M14 8H8"}],["path",{"d":"M16 12H8"}],["path",{"d":"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"}]],"receipt-turkish-lira":[["path",{"d":"M10 7v10a5 5 0 0 0 5-5"}],["path",{"d":"m14 8-6 3"}],["path",{"d":"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"}]],"receipt":[["path",{"d":"M12 17V7"}],["path",{"d":"M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"}],["path",{"d":"M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"}]],"rectangle-circle":[["path",{"d":"M14 4v16H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"}],["circle",{"cx":"14","cy":"12","r":"8"}]],"rectangle-ellipsis":[["rect",{"width":"20","height":"12","x":"2","y":"6","rx":"2"}],["path",{"d":"M12 12h.01"}],["path",{"d":"M17 12h.01"}],["path",{"d":"M7 12h.01"}]],"rectangle-goggles":[["path",{"d":"M20 6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-1.6-.8l-1.6-2.13a1 1 0 0 0-1.6 0L9.6 17.2A2 2 0 0 1 8 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"}]],"rectangle-horizontal":[["rect",{"width":"20","height":"12","x":"2","y":"6","rx":"2"}]],"rectangle-vertical":[["rect",{"width":"12","height":"20","x":"6","y":"2","rx":"2"}]],"recycle":[["path",{"d":"M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"}],["path",{"d":"M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"}],["path",{"d":"m14 16-3 3 3 3"}],["path",{"d":"M8.293 13.596 7.196 9.5 3.1 10.598"}],["path",{"d":"m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"}],["path",{"d":"m13.378 9.633 4.096 1.098 1.097-4.096"}]],"redo-2":[["path",{"d":"m15 14 5-5-5-5"}],["path",{"d":"M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"}]],"redo-dot":[["circle",{"cx":"12","cy":"17","r":"1"}],["path",{"d":"M21 7v6h-6"}],["path",{"d":"M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"}]],"redo":[["path",{"d":"M21 7v6h-6"}],["path",{"d":"M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"}]],"refresh-ccw-dot":[["path",{"d":"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{"d":"M3 3v5h5"}],["path",{"d":"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"}],["path",{"d":"M16 16h5v5"}],["circle",{"cx":"12","cy":"12","r":"1"}]],"refresh-ccw":[["path",{"d":"M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{"d":"M3 3v5h5"}],["path",{"d":"M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"}],["path",{"d":"M16 16h5v5"}]],"refresh-cw-off":[["path",{"d":"M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47"}],["path",{"d":"M8 16H3v5"}],["path",{"d":"M3 12C3 9.51 4 7.26 5.64 5.64"}],["path",{"d":"m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64"}],["path",{"d":"M21 12c0 1-.16 1.97-.47 2.87"}],["path",{"d":"M21 3v5h-5"}],["path",{"d":"M22 22 2 2"}]],"refresh-cw":[["path",{"d":"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{"d":"M21 3v5h-5"}],["path",{"d":"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{"d":"M8 16H3v5"}]],"refrigerator":[["path",{"d":"M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z"}],["path",{"d":"M5 10h14"}],["path",{"d":"M15 7v6"}]],"regex":[["path",{"d":"M17 3v10"}],["path",{"d":"m12.67 5.5 8.66 5"}],["path",{"d":"m12.67 10.5 8.66-5"}],["path",{"d":"M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z"}]],"remove-formatting":[["path",{"d":"M4 7V4h16v3"}],["path",{"d":"M5 20h6"}],["path",{"d":"M13 4 8 20"}],["path",{"d":"m15 15 5 5"}],["path",{"d":"m20 15-5 5"}]],"repeat-1":[["path",{"d":"m17 2 4 4-4 4"}],["path",{"d":"M3 11v-1a4 4 0 0 1 4-4h14"}],["path",{"d":"m7 22-4-4 4-4"}],["path",{"d":"M21 13v1a4 4 0 0 1-4 4H3"}],["path",{"d":"M11 10h1v4"}]],"repeat-2":[["path",{"d":"m2 9 3-3 3 3"}],["path",{"d":"M13 18H7a2 2 0 0 1-2-2V6"}],["path",{"d":"m22 15-3 3-3-3"}],["path",{"d":"M11 6h6a2 2 0 0 1 2 2v10"}]],"repeat-off":[["path",{"d":"M11.656 6H21l-4-4"}],["path",{"d":"M17.898 17.898A4 4 0 0 1 17 18H3l4-4"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M21 13v1a4 4 0 0 1-.171 1.159"}],["path",{"d":"m21 6-4 4"}],["path",{"d":"M3 11v-1a4 4 0 0 1 3.102-3.898"}],["path",{"d":"m7 22-4-4"}]],"repeat":[["path",{"d":"m17 2 4 4-4 4"}],["path",{"d":"M3 11v-1a4 4 0 0 1 4-4h14"}],["path",{"d":"m7 22-4-4 4-4"}],["path",{"d":"M21 13v1a4 4 0 0 1-4 4H3"}]],"replace-all":[["path",{"d":"M14 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1"}],["path",{"d":"M14 4a1 1 0 0 1 1-1"}],["path",{"d":"M15 10a1 1 0 0 1-1-1"}],["path",{"d":"M19 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1"}],["path",{"d":"M21 4a1 1 0 0 0-1-1"}],["path",{"d":"M21 9a1 1 0 0 1-1 1"}],["path",{"d":"m3 7 3 3 3-3"}],["path",{"d":"M6 10V5a2 2 0 0 1 2-2h2"}],["rect",{"x":"3","y":"14","width":"7","height":"7","rx":"1"}]],"replace":[["path",{"d":"M14 4a1 1 0 0 1 1-1"}],["path",{"d":"M15 10a1 1 0 0 1-1-1"}],["path",{"d":"M21 4a1 1 0 0 0-1-1"}],["path",{"d":"M21 9a1 1 0 0 1-1 1"}],["path",{"d":"m3 7 3 3 3-3"}],["path",{"d":"M6 10V5a2 2 0 0 1 2-2h2"}],["rect",{"x":"3","y":"14","width":"7","height":"7","rx":"1"}]],"reply-all":[["path",{"d":"m12 17-5-5 5-5"}],["path",{"d":"M22 18v-2a4 4 0 0 0-4-4H7"}],["path",{"d":"m7 17-5-5 5-5"}]],"reply":[["path",{"d":"M20 18v-2a4 4 0 0 0-4-4H4"}],["path",{"d":"m9 17-5-5 5-5"}]],"rewind":[["path",{"d":"M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z"}],["path",{"d":"M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z"}]],"ribbon":[["path",{"d":"M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22"}],["path",{"d":"m12 18 2.57-3.5"}],["path",{"d":"M6.243 9.016a7 7 0 0 1 11.507-.009"}],["path",{"d":"M9.35 14.53 12 11.22"}],["path",{"d":"M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z"}]],"road":[["path",{"d":"M12 17v4"}],["path",{"d":"M12 5V3"}],["path",{"d":"M12 9v3"}],["path",{"d":"M2.077 18.449A2 2 0 0 0 4 21h16a2 2 0 0 0 1.924-2.55l-4-14A2 2 0 0 0 16 3H8a2 2 0 0 0-1.924 1.45z"}]],"robot-arm":[["path",{"d":"M12 21 7.5 8.322"}],["path",{"d":"m14 7 1.75-3.767a.5.5 0 0 1 .662-.172L20 5.005"}],["path",{"d":"m20 8.998-3.588 1.944a.5.5 0 0 1-.662-.172L14 7H8"}],["path",{"d":"M3.486 21h10"}],["path",{"d":"M5 21V8.732"}],["circle",{"cx":"6","cy":"7","r":"2"}]],"robot-vacuum":[["path",{"d":"M11 17h2"}],["path",{"d":"M12 12h.01"}],["path",{"d":"M17 12a5 5 0 00-10 0"}],["path",{"d":"M19 2v2.8"}],["path",{"d":"M2 5h2.8"}],["path",{"d":"M22 5h-2.8"}],["path",{"d":"M5 2v2.8"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"rocket":[["path",{"d":"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"}],["path",{"d":"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"}],["path",{"d":"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"}],["path",{"d":"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"}]],"rocking-chair":[["path",{"d":"m15 13 3.708 7.416"}],["path",{"d":"M3 19a15 15 0 0 0 18 0"}],["path",{"d":"m3 2 3.21 9.633A2 2 0 0 0 8.109 13H18"}],["path",{"d":"m9 13-3.708 7.416"}]],"roller-coaster":[["path",{"d":"M6 19V5"}],["path",{"d":"M10 19V6.8"}],["path",{"d":"M14 19v-7.8"}],["path",{"d":"M18 5v4"}],["path",{"d":"M18 19v-6"}],["path",{"d":"M22 19V9"}],["path",{"d":"M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65"}]],"rose":[["path",{"d":"M17 10h-1a4 4 0 1 1 4-4v.534"}],["path",{"d":"M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31"}],["path",{"d":"M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2"}],["path",{"d":"M9.77 12C4 15 2 22 2 22"}],["circle",{"cx":"17","cy":"8","r":"2"}]],"rotate-3d":[["path",{"d":"m15.194 13.707 3.814 1.86-1.86 3.814"}],["path",{"d":"M16.47214 7.52786 A 5 10 0 1 0 13 21.79796"}],["path",{"d":"M21.79796 11 A 10 5 0 1 0 19 15.57071"}]],"rotate-ccw-clock":[["path",{"d":"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{"d":"M3 3v5h5"}],["path",{"d":"M12 7v5l4 2"}]],"rotate-ccw-key":[["path",{"d":"M12 7v6"}],["path",{"d":"M12 9h2"}],["path",{"d":"M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8"}],["path",{"d":"M3 3v5h5"}],["circle",{"cx":"12","cy":"15","r":"2"}]],"rotate-ccw-square":[["path",{"d":"M20 9V7a2 2 0 0 0-2-2h-6"}],["path",{"d":"m15 2-3 3 3 3"}],["path",{"d":"M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"}]],"rotate-ccw":[["path",{"d":"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{"d":"M3 3v5h5"}]],"rotate-cw-clock":[["path",{"d":"M12 7v5l4 2"}],["path",{"d":"M16 8h5V3"}],["path",{"d":"m21 8-2.3-2.3A9.7 9.7 0 0012 3a9 9 0 109 9"}]],"rotate-cw-fading-clock":[["path",{"d":"M12 3a9.75 9.75 0 0 1 6.74 2.74"}],["path",{"d":"M18.74 5.74 21 8"}],["path",{"d":"M21 8V3"}],["path",{"d":"M7.5 19.794c-6-3.464-6-12.124 0-15.588"}],["path",{"d":"M7.5 4.206A9 9 0 0 1 12 3"}],["path",{"d":"M12 7v5l4 2"}],["path",{"d":"M14 20.775A9 9 0 0 1 12 21"}],["path",{"d":"M19 17.656a9 9 0 0 1-1.5 1.456"}],["path",{"d":"M21 12a9 9 0 0 1-.228 2"}],["path",{"d":"M21 8h-5"}]],"rotate-cw-square":[["path",{"d":"M12 5H6a2 2 0 0 0-2 2v3"}],["path",{"d":"m9 8 3-3-3-3"}],["path",{"d":"M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"}]],"rotate-cw":[["path",{"d":"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"}],["path",{"d":"M21 3v5h-5"}]],"route-arrow-right":[["path",{"d":"m18 22 3-3-3-3"}],["path",{"d":"M9 5h8.5a1 1 0 010 7h-11a1 1 0 000 7H21"}],["circle",{"cx":"6","cy":"5","r":"3"}]],"route-off":[["circle",{"cx":"6","cy":"19","r":"3"}],["path",{"d":"M9 19h8.5c.4 0 .9-.1 1.3-.2"}],["path",{"d":"M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M21 15.3a3.5 3.5 0 0 0-3.3-3.3"}],["path",{"d":"M15 5h-4.3"}],["circle",{"cx":"18","cy":"5","r":"3"}]],"route":[["path",{"d":"M9 5h8.5a1 1 0 010 7h-11a1 1 0 000 7H15"}],["circle",{"cx":"18","cy":"19","r":"3"}],["circle",{"cx":"6","cy":"5","r":"3"}]],"router":[["rect",{"width":"20","height":"8","x":"2","y":"14","rx":"2"}],["path",{"d":"M6.01 18H6"}],["path",{"d":"M10.01 18H10"}],["path",{"d":"M15 10v4"}],["path",{"d":"M17.84 7.17a4 4 0 0 0-5.66 0"}],["path",{"d":"M20.66 4.34a8 8 0 0 0-11.31 0"}]],"rows-2":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M3 12h18"}]],"rows-3":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M21 9H3"}],["path",{"d":"M21 15H3"}]],"rows-4":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M21 7.5H3"}],["path",{"d":"M21 12H3"}],["path",{"d":"M21 16.5H3"}]],"rss":[["path",{"d":"M4 11a9 9 0 0 1 9 9"}],["path",{"d":"M4 4a16 16 0 0 1 16 16"}],["circle",{"cx":"5","cy":"19","r":"1"}]],"rugby-ball":[["path",{"d":"m10 10 4 4"}],["path",{"d":"m13 7 4 4"}],["path",{"d":"M15.34 2.138A15 15 0 002.138 15.34c-.357 2.94.004 4.919.805 5.717.798.8 2.778 1.162 5.718.805A15 15 0 0021.862 8.661c.357-2.94-.004-4.92-.805-5.718-.798-.8-2.778-1.162-5.717-.805"}],["path",{"d":"M17 7 7 17"}],["path",{"d":"m7 13 4 4"}]],"ruler-dimension-line":[["path",{"d":"M10 15v-3"}],["path",{"d":"M14 15v-3"}],["path",{"d":"M18 15v-3"}],["path",{"d":"M2 8V4"}],["path",{"d":"M22 6H2"}],["path",{"d":"M22 8V4"}],["path",{"d":"M6 15v-3"}],["rect",{"x":"2","y":"12","width":"20","height":"8","rx":"2"}]],"ruler":[["path",{"d":"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{"d":"m14.5 12.5 2-2"}],["path",{"d":"m11.5 9.5 2-2"}],["path",{"d":"m8.5 6.5 2-2"}],["path",{"d":"m17.5 15.5 2-2"}]],"russian-ruble":[["path",{"d":"M4 16h6"}],["path",{"d":"M7 20V5a1 1 0 011-1h6a4 4 0 010 8H4"}]],"sailboat":[["path",{"d":"M10 2v15"}],["path",{"d":"M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z"}],["path",{"d":"M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z"}]],"salad":[["path",{"d":"M19.496 12a2.5 2.5 0 00.399-2.214A2 2 0 0020.32 6.5 2 2 0 0019 3a2 2 0 00-1.5.68 2 2 0 00-3.287.424 2.5 2.5 0 00-3.189 2.06A3 3 0 0012 12l4-4"}],["path",{"d":"M4 12a1 1 0 00-.99 1.133A9 9 0 0012 21a9 9 0 008.99-7.867A1 1 0 0020 12z"}],["path",{"d":"M7 21h10"}],["path",{"d":"M9.85 6.907A3.5 3.5 0 005.05 12"}]],"sandwich":[["path",{"d":"m2.37 11.223 8.372-6.777a2 2 0 0 1 2.516 0l8.371 6.777"}],["path",{"d":"M21 15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.25"}],["path",{"d":"M3 15a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h9"}],["path",{"d":"m6.67 15 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2"}],["rect",{"width":"20","height":"4","x":"2","y":"11","rx":"1"}]],"satellite-dish":[["path",{"d":"M18 12a6 6 0 00-6-6"}],["path",{"d":"M2.824 10.459a8 8 0 0010.717 10.717c.558-.276.623-1.012.183-1.452l-9.448-9.448c-.44-.44-1.176-.375-1.452.183"}],["path",{"d":"M22 12A10 10 0 0012 2"}],["path",{"d":"m9 15 4-4"}]],"satellite":[["path",{"d":"m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5"}],["path",{"d":"M16.5 7.5 19 5"}],["path",{"d":"m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5"}],["path",{"d":"M9 21a6 6 0 0 0-6-6"}],["path",{"d":"M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z"}]],"saudi-riyal":[["path",{"d":"M10 2.977v13.19a2 2 0 01-1.23 1.846L4 19.999"}],["path",{"d":"M14 4v9.523a1 1 0 001.371.928L19 13"}],["path",{"d":"m19 18-5 2"}],["path",{"d":"M19 8 4 14"}]],"save-all":[["path",{"d":"M10 2v3a1 1 0 0 0 1 1h5"}],["path",{"d":"M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6"}],["path",{"d":"M18 22H4a2 2 0 0 1-2-2V6"}],["path",{"d":"M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z"}]],"save-check":[["path",{"d":"M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4v4.35"}],["path",{"d":"m16 19 2 2 4-4"}],["path",{"d":"M17 15.13V14a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"}],["path",{"d":"M7 3v4a1 1 0 0 0 1 1h7"}]],"save-off":[["path",{"d":"M13 13H8a1 1 0 0 0-1 1v7"}],["path",{"d":"M14 8h1"}],["path",{"d":"M17 21v-4"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41"}],["path",{"d":"M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15"}]],"save-pen":[["path",{"d":"M13.33 13H8a1 1 0 00-1 1v7"}],["path",{"d":"M14.363 17.634a2 2 0 00-.506.854l-.837 2.87a.5.5 0 00.62.62l2.87-.837a2 2 0 00.854-.506l4.013-4.009a1 1 0 10-3.004-3.004z"}],["path",{"d":"M7 3v4a1 1 0 001 1h7"}],["path",{"d":"M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h10.2a2 2 0 011.4.6l3.8 3.8a2 2 0 01.6 1.4v.3"}]],"save-plus":[["path",{"d":"M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V12"}],["path",{"d":"M16 13H8a1 1 0 0 0-1 1v7"}],["path",{"d":"M19 22v-6"}],["path",{"d":"M22 19h-6"}],["path",{"d":"M7 3v4a1 1 0 0 0 1 1h7"}]],"save":[["path",{"d":"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"}],["path",{"d":"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"}],["path",{"d":"M7 3v4a1 1 0 0 0 1 1h7"}]],"scale-3d":[["path",{"d":"M5 7v11a1 1 0 0 0 1 1h11"}],["path",{"d":"M5.293 18.707 11 13"}],["circle",{"cx":"19","cy":"19","r":"2"}],["circle",{"cx":"5","cy":"5","r":"2"}]],"scale":[["path",{"d":"M12 3v18"}],["path",{"d":"m19 8 3 8a5 5 0 0 1-6 0zV7"}],["path",{"d":"M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"}],["path",{"d":"m5 8 3 8a5 5 0 0 1-6 0zV7"}],["path",{"d":"M7 21h10"}]],"scaling":[["path",{"d":"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}],["path",{"d":"M14 15H9v-5"}],["path",{"d":"M16 3h5v5"}],["path",{"d":"M21 3 9 15"}]],"scan-barcode":[["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{"d":"M8 7v10"}],["path",{"d":"M12 7v10"}],["path",{"d":"M17 7v10"}]],"scan-box":[["path",{"d":"M12 12v5.5"}],["path",{"d":"M17 3h2a2 2 0 012 2v2"}],["path",{"d":"M21 17v2a2 2 0 01-2 2h-2"}],["path",{"d":"M3 7V5a2 2 0 012-2h2"}],["path",{"d":"M7 21H5a2 2 0 01-2-2v-2"}],["path",{"d":"M7.264 9.252 12 12l4.737-2.748"}],["path",{"d":"M7.995 8.514A2 2 0 007 10.244v3.516a2 2 0 00.996 1.73l3 1.74a2 2 0 002.008 0l3-1.74A2 2 0 0017 13.76v-3.517a2 2 0 00-.995-1.73l-3-1.742a2 2 0 00-1.892-.064z"}]],"scan-eye":[["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}],["circle",{"cx":"12","cy":"12","r":"1"}],["path",{"d":"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"}]],"scan-face":[["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{"d":"M8 14s1.5 2 4 2 4-2 4-2"}],["path",{"d":"M9 9h.01"}],["path",{"d":"M15 9h.01"}]],"scan-heart":[["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{"d":"M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 0 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z"}]],"scan-line":[["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{"d":"M7 12h10"}]],"scan-qr-code":[["path",{"d":"M17 12v4a1 1 0 0 1-1 1h-4"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M17 8V7"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M7 17h.01"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}],["rect",{"x":"7","y":"7","width":"5","height":"5","rx":"1"}]],"scan-search":[["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}],["circle",{"cx":"12","cy":"12","r":"3"}],["path",{"d":"m16 16-1.9-1.9"}]],"scan-square":[["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}],["rect",{"width":"8","height":"8","x":"8","y":"8","rx":"1"}]],"scan-text":[["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}],["path",{"d":"M7 8h8"}],["path",{"d":"M7 12h10"}],["path",{"d":"M7 16h6"}]],"scan":[["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}]],"school":[["path",{"d":"M14 21v-3a2 2 0 0 0-4 0v3"}],["path",{"d":"M18 4.933V21"}],["path",{"d":"m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6"}],["path",{"d":"m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11"}],["path",{"d":"M6 4.933V21"}],["circle",{"cx":"12","cy":"9","r":"2"}]],"scissors-line-dashed":[["path",{"d":"M5.42 9.42 8 12"}],["circle",{"cx":"4","cy":"8","r":"2"}],["path",{"d":"m14 6-8.58 8.58"}],["circle",{"cx":"4","cy":"16","r":"2"}],["path",{"d":"M10.8 14.8 14 18"}],["path",{"d":"M16 12h-2"}],["path",{"d":"M22 12h-2"}]],"scissors":[["circle",{"cx":"6","cy":"6","r":"3"}],["path",{"d":"M8.12 8.12 12 12"}],["path",{"d":"M20 4 8.12 15.88"}],["circle",{"cx":"6","cy":"18","r":"3"}],["path",{"d":"M14.8 14.8 20 20"}]],"scooter":[["path",{"d":"M21 4h-3.5l2 11.05"}],["path",{"d":"M6.95 17h5.142c.523 0 .95-.406 1.063-.916a6.5 6.5 0 0 1 5.345-5.009"}],["circle",{"cx":"19.5","cy":"17.5","r":"2.5"}],["circle",{"cx":"4.5","cy":"17.5","r":"2.5"}]],"scratch-blocks":[["path",{"d":"M19 5a2 2 0 012 2v11a2 2 0 01-2 2h-5.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293H8.414a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 005.586 20H5a2 2 0 01-2-2V5.286c0-.394.11-.785.36-1.09a6 6 0 019.168-.133C12.996 4.6 13.637 5 14.35 5z"}],["path",{"d":"M21 12h-7.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293H8.414a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 005.586 12H3"}]],"screen-share-off":[["path",{"d":"M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"}],["path",{"d":"M8 21h8"}],["path",{"d":"M12 17v4"}],["path",{"d":"m22 3-5 5"}],["path",{"d":"m17 3 5 5"}]],"screen-share":[["path",{"d":"M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"}],["path",{"d":"M8 21h8"}],["path",{"d":"M12 17v4"}],["path",{"d":"m17 8 5-5"}],["path",{"d":"M17 3h5v5"}]],"screw":[["path",{"d":"M10 9v10"}],["path",{"d":"M14 13v2"}],["path",{"d":"M16.5 10.5 5.706 21.294A2.4 2.4 0 014.002 22H2.5a.5.5 0 01-.5-.5v-1.502a2.4 2.4 0 01.706-1.704L13.5 7.5"}],["path",{"d":"M20.819 11.575a6 6 0 00.969-5.162.6.6 0 00-.981-.219l-.455.454a1.2 1.2 0 01-1.704 0l-1.296-1.296a1.2 1.2 0 010-1.704l.454-.453a.595.595 0 00-.219-.98 6 6 0 00-5.162.967 2 2 0 00-.222 3.019l5.596 5.597a2 2 0 003.02-.222"}],["path",{"d":"M6 13v8"}]],"scroll-text":[["path",{"d":"M15 12h-5"}],["path",{"d":"M15 8h-5"}],["path",{"d":"M19 17V5a2 2 0 0 0-2-2H4"}],["path",{"d":"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"}]],"scroll":[["path",{"d":"M19 17V5a2 2 0 0 0-2-2H4"}],["path",{"d":"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"}]],"search-check":[["path",{"d":"m8 11 2 2 4-4"}],["circle",{"cx":"11","cy":"11","r":"8"}],["path",{"d":"m21 21-4.3-4.3"}]],"search-code":[["path",{"d":"m13 13.5 2-2.5-2-2.5"}],["path",{"d":"m21 21-4.3-4.3"}],["path",{"d":"M9 8.5 7 11l2 2.5"}],["circle",{"cx":"11","cy":"11","r":"8"}]],"search-exclamation-point":[["circle",{"cx":"11","cy":"11","r":"8"}],["path",{"d":"m21 21-4.3-4.3"}],["path",{"d":"M11 7v4"}],["path",{"d":"M11 15h.01"}]],"search-slash":[["path",{"d":"m13.5 8.5-5 5"}],["circle",{"cx":"11","cy":"11","r":"8"}],["path",{"d":"m21 21-4.3-4.3"}]],"search-x":[["path",{"d":"m13.5 8.5-5 5"}],["path",{"d":"m8.5 8.5 5 5"}],["circle",{"cx":"11","cy":"11","r":"8"}],["path",{"d":"m21 21-4.3-4.3"}]],"search":[["path",{"d":"m21 21-4.34-4.34"}],["circle",{"cx":"11","cy":"11","r":"8"}]],"section":[["path",{"d":"M16 5a4 3 0 0 0-8 0c0 4 8 3 8 7a4 3 0 0 1-8 0"}],["path",{"d":"M8 19a4 3 0 0 0 8 0c0-4-8-3-8-7a4 3 0 0 1 8 0"}]],"send-horizontal":[["path",{"d":"M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"}],["path",{"d":"M6 12h16"}]],"send-to-back":[["rect",{"x":"14","y":"14","width":"8","height":"8","rx":"2"}],["rect",{"x":"2","y":"2","width":"8","height":"8","rx":"2"}],["path",{"d":"M7 14v1a2 2 0 0 0 2 2h1"}],["path",{"d":"M14 7h1a2 2 0 0 1 2 2v1"}]],"send":[["path",{"d":"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"}],["path",{"d":"m21.854 2.147-10.94 10.939"}]],"separator-horizontal":[["path",{"d":"m16 16-4 4-4-4"}],["path",{"d":"M3 12h18"}],["path",{"d":"m8 8 4-4 4 4"}]],"separator-vertical":[["path",{"d":"M12 3v18"}],["path",{"d":"m16 16 4-4-4-4"}],["path",{"d":"m8 8-4 4 4 4"}]],"server-cog":[["path",{"d":"m10.852 14.772-.383.923"}],["path",{"d":"M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923"}],["path",{"d":"m13.148 9.228.383-.923"}],["path",{"d":"m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544"}],["path",{"d":"m14.772 10.852.923-.383"}],["path",{"d":"m14.772 13.148.923.383"}],["path",{"d":"M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"}],["path",{"d":"M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"}],["path",{"d":"M6 18h.01"}],["path",{"d":"M6 6h.01"}],["path",{"d":"m9.228 10.852-.923-.383"}],["path",{"d":"m9.228 13.148-.923.383"}]],"server-crash":[["path",{"d":"M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"}],["path",{"d":"M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"}],["path",{"d":"M6 6h.01"}],["path",{"d":"M6 18h.01"}],["path",{"d":"m13 6-4 6h6l-4 6"}]],"server-nas":[["path",{"d":"M10 16V8"}],["path",{"d":"M14 16V8"}],["path",{"d":"M18 16V8"}],["path",{"d":"M6 12h.01"}],["path",{"d":"M6 16h.01"}],["rect",{"x":"2","y":"4","width":"20","height":"16","rx":"2"}]],"server-off":[["path",{"d":"M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5"}],["path",{"d":"M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z"}],["path",{"d":"M22 17v-1a2 2 0 0 0-2-2h-1"}],["path",{"d":"M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z"}],["path",{"d":"M6 18h.01"}],["path",{"d":"m2 2 20 20"}]],"server-plus":[["path",{"d":"M12.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2"}],["path",{"d":"M16 12h6"}],["path",{"d":"M19 9v6"}],["path",{"d":"M22 18v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h8.5"}],["path",{"d":"M6 18h.01"}],["path",{"d":"M6 6h.01"}]],"server":[["rect",{"width":"20","height":"8","x":"2","y":"2","rx":"2","ry":"2"}],["rect",{"width":"20","height":"8","x":"2","y":"14","rx":"2","ry":"2"}],["line",{"x1":"6","x2":"6.01","y1":"6","y2":"6"}],["line",{"x1":"6","x2":"6.01","y1":"18","y2":"18"}]],"settings-2":[["path",{"d":"M14 17H5"}],["path",{"d":"M19 7h-9"}],["circle",{"cx":"17","cy":"17","r":"3"}],["circle",{"cx":"7","cy":"7","r":"3"}]],"settings":[["path",{"d":"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{"cx":"12","cy":"12","r":"3"}]],"shapes":[["path",{"d":"M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"}],["rect",{"x":"3","y":"14","width":"7","height":"7","rx":"1"}],["circle",{"cx":"17.5","cy":"17.5","r":"3.5"}]],"share-2":[["circle",{"cx":"18","cy":"5","r":"3"}],["circle",{"cx":"6","cy":"12","r":"3"}],["circle",{"cx":"18","cy":"19","r":"3"}],["line",{"x1":"8.59","x2":"15.42","y1":"13.51","y2":"17.49"}],["line",{"x1":"15.41","x2":"8.59","y1":"6.51","y2":"10.49"}]],"share":[["path",{"d":"M12 2v13"}],["path",{"d":"m16 6-4-4-4 4"}],["path",{"d":"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"}]],"sheet":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],["line",{"x1":"3","x2":"21","y1":"9","y2":"9"}],["line",{"x1":"3","x2":"21","y1":"15","y2":"15"}],["line",{"x1":"9","x2":"9","y1":"9","y2":"21"}],["line",{"x1":"15","x2":"15","y1":"9","y2":"21"}]],"shell":[["path",{"d":"M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44"}]],"shelving-unit":[["path",{"d":"M12 12V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"}],["path",{"d":"M16 20v-3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"}],["path",{"d":"M20 22V2"}],["path",{"d":"M4 12h16"}],["path",{"d":"M4 20h16"}],["path",{"d":"M4 2v20"}],["path",{"d":"M4 4h16"}]],"shield-ban":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{"d":"m4.243 5.21 14.39 12.472"}]],"shield-check":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{"d":"m9 12 2 2 4-4"}]],"shield-cog-corner":[["path",{"d":"M11 22c-3.806-1.45-7-3.966-7-9V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v4"}],["path",{"d":"M14.923 16.547 14 16.164"}],["path",{"d":"m14.923 18.843-.923.383"}],["path",{"d":"M16.547 14.923 16.164 14"}],["path",{"d":"m16.547 20.467-.383.924"}],["path",{"d":"m18.843 14.923.383-.923"}],["path",{"d":"m19.225 21.391-.382-.924"}],["path",{"d":"m20.467 16.547.923-.383"}],["path",{"d":"m20.467 18.843.923.383"}],["circle",{"cx":"17.695","cy":"17.695","r":"3"}]],"shield-cog":[["path",{"d":"m10.929 14.467-.383.924"}],["path",{"d":"M10.929 8.923 10.546 8"}],["path",{"d":"M13.225 8.923 13.608 8"}],["path",{"d":"m13.607 15.391-.382-.924"}],["path",{"d":"m14.849 10.547.923-.383"}],["path",{"d":"m14.849 12.843.923.383"}],["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{"d":"m9.305 10.547-.923-.383"}],["path",{"d":"m9.305 12.843-.923.383"}],["circle",{"cx":"12.077","cy":"11.695","r":"3"}]],"shield-ellipsis":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{"d":"M8 12h.01"}],["path",{"d":"M12 12h.01"}],["path",{"d":"M16 12h.01"}]],"shield-exclamation-point":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{"d":"M12 8v4"}],["path",{"d":"M12 16h.01"}]],"shield-half":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{"d":"M12 22V2"}]],"shield-house":[["path",{"d":"M15 22a1 1 0 01-1-1v-4a1 1 0 01.445-.832l3-2a1 1 0 011.11 0l3 2A1 1 0 0122 17v4a1 1 0 01-1 1z"}],["path",{"d":"M18 22v-3"}],["path",{"d":"M20 10.418V6a1 1 0 00-1-1c-2 0-4.49-1.19-6.24-2.72a1.17 1.17 0 00-1.52 0C9.5 3.8 7 5 5 5a1 1 0 00-1 1v7c0 4.602 2.67 7.1 6.037 8.603"}]],"shield-keyhole":[["path",{"d":"M12 13v3"}],["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 011-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 011.52 0C14.51 3.81 17 5 19 5a1 1 0 011 1z"}],["circle",{"cx":"12","cy":"11","r":"2"}]],"shield-lock":[["path",{"d":"M20 9.807V6a1 1 0 00-1-1c-2 0-4.49-1.19-6.24-2.72a1.17 1.17 0 00-1.52 0C9.5 3.8 7 5 5 5a1 1 0 00-1 1v7c0 3.88 2.107 6.254 5 7.796"}],["path",{"d":"M19 17v-2a2 2 0 00-4 0v2"}],["rect",{"x":"13","y":"17","width":"8","height":"5","rx":"1"}]],"shield-minus":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{"d":"M9 12h6"}]],"shield-off":[["path",{"d":"m2 2 20 20"}],["path",{"d":"M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71"}],["path",{"d":"M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264"}]],"shield-plus":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{"d":"M9 12h6"}],["path",{"d":"M12 9v6"}]],"shield-question-mark":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 01-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 011-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 011.52 0C14.51 3.81 17 5 19 5a1 1 0 011 1z"}],["path",{"d":"M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5"}],["path",{"d":"M12 17h.01"}]],"shield-user":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{"d":"M6.376 18.91a6 6 0 0 1 11.249.003"}],["circle",{"cx":"12","cy":"11","r":"4"}]],"shield-x":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{"d":"m14.5 9.5-5 5"}],["path",{"d":"m9.5 9.5 5 5"}]],"shield":[["path",{"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]],"ship-cargo":[["path",{"d":"M12 15v-3"}],["path",{"d":"M12 2v2"}],["path",{"d":"M16.5 12V9a1 1 0 011-1h1a1 1 0 001-1V5a1 1 0 00-1-1h-13a1 1 0 00-1 1v2a1 1 0 001 1h1a1 1 0 011 1v3"}],["path",{"d":"M19.38 19c1.076-1.815 1.636-4.89 1.628-6.008a1 1 0 00-1-.992H3.984a1 1 0 00-1 .984c-.03 1.86.97 5.621 2.826 7.776"}],["path",{"d":"M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}]],"ship-wheel":[["circle",{"cx":"12","cy":"12","r":"8"}],["path",{"d":"M12 2v7.5"}],["path",{"d":"m19 5-5.23 5.23"}],["path",{"d":"M22 12h-7.5"}],["path",{"d":"m19 19-5.23-5.23"}],["path",{"d":"M12 14.5V22"}],["path",{"d":"M10.23 13.77 5 19"}],["path",{"d":"M9.5 12H2"}],["path",{"d":"M10.23 10.23 5 5"}],["circle",{"cx":"12","cy":"12","r":"2.5"}]],"ship":[["path",{"d":"M12 2v2"}],["path",{"d":"M12 9.189V13"}],["path",{"d":"M19 12V6a2 2 0 00-2-2H7a2 2 0 00-2 2v6"}],["path",{"d":"M19.38 19A11.6 11.6 0 0021 13l-8.188-3.639a2 2 0 00-1.624 0L3 13.001a11.6 11.6 0 002.81 7.76"}],["path",{"d":"M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}]],"shirt":[["path",{"d":"M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"}]],"shopping-bag":[["path",{"d":"M16 10a4 4 0 0 1-8 0"}],["path",{"d":"M3.103 6.034h17.794"}],["path",{"d":"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"}]],"shopping-basket":[["path",{"d":"m15 11-1 9"}],["path",{"d":"m19 11-4-7"}],["path",{"d":"M2 11h20"}],["path",{"d":"m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"}],["path",{"d":"M4.5 15.5h15"}],["path",{"d":"m5 11 4-7"}],["path",{"d":"m9 11 1 9"}]],"shopping-cart-minus":[["path",{"d":"M16 5h6"}],["path",{"d":"m2.05 2.05 1.099-.028a1 1 0 011.008.815l2.69 14.347A1 1 0 007.83 18H18"}],["path",{"d":"M4.564 5H12"}],["path",{"d":"M6.25 14h12.712a2 2 0 001.991-1.57l.514-3.113"}],["circle",{"cx":"18","cy":"20","r":"2"}],["circle",{"cx":"8","cy":"20","r":"2"}]],"shopping-cart-plus":[["path",{"d":"M16 5h6"}],["path",{"d":"M19 2v6"}],["path",{"d":"m2.05 2.05 1.099-.028a1 1 0 011.008.815l2.69 14.347A1 1 0 007.83 18H18"}],["path",{"d":"M4.564 5H12"}],["path",{"d":"M6.25 14h12.712a2 2 0 001.991-1.57l.172-1.041"}],["circle",{"cx":"18","cy":"20","r":"2"}],["circle",{"cx":"8","cy":"20","r":"2"}]],"shopping-cart":[["path",{"d":"m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18"}],["path",{"d":"M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25"}],["circle",{"cx":"18","cy":"20","r":"2"}],["circle",{"cx":"8","cy":"20","r":"2"}]],"shovel":[["path",{"d":"M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z"}],["path",{"d":"M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z"}],["path",{"d":"m9 15 7.879-7.878"}]],"shower-head":[["path",{"d":"m4 4 2.5 2.5"}],["path",{"d":"M13.5 6.5a4.95 4.95 0 0 0-7 7"}],["path",{"d":"M15 5 5 15"}],["path",{"d":"M14 17v.01"}],["path",{"d":"M10 16v.01"}],["path",{"d":"M13 13v.01"}],["path",{"d":"M16 10v.01"}],["path",{"d":"M11 20v.01"}],["path",{"d":"M17 14v.01"}],["path",{"d":"M20 11v.01"}]],"shredder":[["path",{"d":"M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5"}],["path",{"d":"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M10 22v-5"}],["path",{"d":"M14 19v-2"}],["path",{"d":"M18 20v-3"}],["path",{"d":"M2 13h20"}],["path",{"d":"M6 20v-3"}]],"shrimp-off":[["path",{"d":"M10 2a3.28 3.28 0 003.227 1.798l6.17-.561A1 1 0 1119.614 8H13.5"}],["path",{"d":"M11 20c-.5.5-1.12 1-2.5 1a1 1 0 010-5H12a7 7 0 003.283-.817"}],["path",{"d":"M11 22c-.5-.5-1.12-1-2.5-1a6.5 6.5 0 01-5.63-3.25 6.44 6.44 0 015.236-9.744"}],["path",{"d":"M18.04 12.54A7 7 0 0019 9V8"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M8 16c-2 0-4.5-4-4-6"}],["path",{"d":"M9.43 9.33A8.5 8.5 0 0010 16"}]],"shrimp":[["path",{"d":"M10 2a3.28 3.28 0 003.227 1.798l6.17-.561A1 1 0 1119.614 8H8.5a6.44 6.44 0 00-5.63 9.75A6.5 6.5 0 008.5 21c1.38 0 2-.5 2.5-1"}],["path",{"d":"M10 8a8.5 8.5 0 000 8"}],["path",{"d":"M11 22c-.5-.5-1.12-1-2.5-1a1 1 0 010-5H12a7 7 0 007-7V8"}],["path",{"d":"M13 12h.01"}],["path",{"d":"M8 16c-2 0-4.5-4-4-6"}]],"shrink":[["path",{"d":"m15 15 6 6m-6-6v4.8m0-4.8h4.8"}],["path",{"d":"M9 19.8V15m0 0H4.2M9 15l-6 6"}],["path",{"d":"M15 4.2V9m0 0h4.8M15 9l6-6"}],["path",{"d":"M9 4.2V9m0 0H4.2M9 9 3 3"}]],"shrub":[["path",{"d":"M12 22v-5.172a2 2 0 0 0-.586-1.414L9.5 13.5"}],["path",{"d":"M14.5 14.5 12 17"}],["path",{"d":"M17 8.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8a5 5 0 0 1 10 0z"}]],"shuffle":[["path",{"d":"m18 14 4 4-4 4"}],["path",{"d":"m18 2 4 4-4 4"}],["path",{"d":"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"}],["path",{"d":"M2 6h1.972a4 4 0 0 1 3.6 2.2"}],["path",{"d":"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"}]],"sigma":[["path",{"d":"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"}]],"signal-high":[["path",{"d":"M2 20h.01"}],["path",{"d":"M7 20v-4"}],["path",{"d":"M12 20v-8"}],["path",{"d":"M17 20V8"}]],"signal-low":[["path",{"d":"M2 20h.01"}],["path",{"d":"M7 20v-4"}]],"signal-medium":[["path",{"d":"M2 20h.01"}],["path",{"d":"M7 20v-4"}],["path",{"d":"M12 20v-8"}]],"signal-zero":[["path",{"d":"M2 20h.01"}]],"signal":[["path",{"d":"M2 20h.01"}],["path",{"d":"M7 20v-4"}],["path",{"d":"M12 20v-8"}],["path",{"d":"M17 20V8"}],["path",{"d":"M22 4v16"}]],"signature":[["path",{"d":"m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284"}],["path",{"d":"M3 21h18"}]],"signpost-big":[["path",{"d":"M10 9H4L2 7l2-2h6"}],["path",{"d":"M14 5h6l2 2-2 2h-6"}],["path",{"d":"M10 22V4a2 2 0 1 1 4 0v18"}],["path",{"d":"M8 22h8"}]],"signpost":[["path",{"d":"M12 13v8"}],["path",{"d":"M12 3v3"}],["path",{"d":"M2.354 10.354a1.207 1.207 0 0 1 0-1.708l2.06-2.06A2 2 0 0 1 5.828 6h12.344a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H5.828a2 2 0 0 1-1.414-.586z"}]],"siren-off":[["path",{"d":"M12 12v6"}],["path",{"d":"M12 2v1"}],["path",{"d":"M12.707 7.05a5 5 0 0 1 4.243 4.243"}],["path",{"d":"M17 17v1H7a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2"}],["path",{"d":"M18.5 4.5 18 5"}],["path",{"d":"M2 12h1"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M21 12h1"}],["path",{"d":"M7 18v-6a5 5 0 0 1 1.464-3.536"}]],"siren":[["path",{"d":"M7 18v-6a5 5 0 1 1 10 0v6"}],["path",{"d":"M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"}],["path",{"d":"M21 12h1"}],["path",{"d":"M18.5 4.5 18 5"}],["path",{"d":"M2 12h1"}],["path",{"d":"M12 2v1"}],["path",{"d":"m4.929 4.929.707.707"}],["path",{"d":"M12 12v6"}]],"sixteenth-notes":[["path",{"d":"M21 16V3a1 1 0 0 0-1.28-.96l-10 2.917a1 1 0 0 0-.72.96V19"}],["path",{"d":"M21 6 9 9.5"}],["circle",{"cx":"18","cy":"16","r":"3"}],["circle",{"cx":"6","cy":"19","r":"3"}]],"skip-back":[["path",{"d":"M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"}],["path",{"d":"M3 20V4"}]],"skip-forward":[["path",{"d":"M21 4v16"}],["path",{"d":"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"}]],"skull":[["path",{"d":"m12.5 17-.5-1-.5 1h1z"}],["path",{"d":"M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z"}],["circle",{"cx":"15","cy":"12","r":"1"}],["circle",{"cx":"9","cy":"12","r":"1"}]],"slash":[["path",{"d":"M22 2 2 22"}]],"slice":[["path",{"d":"M11 16.586V19a1 1 0 0 1-1 1H2L18.37 3.63a1 1 0 1 1 3 3l-9.663 9.663a1 1 0 0 1-1.414 0L8 14"}]],"sliders-horizontal":[["path",{"d":"M10 5H3"}],["path",{"d":"M12 19H3"}],["path",{"d":"M14 3v4"}],["path",{"d":"M16 17v4"}],["path",{"d":"M21 12h-9"}],["path",{"d":"M21 19h-5"}],["path",{"d":"M21 5h-7"}],["path",{"d":"M8 10v4"}],["path",{"d":"M8 12H3"}]],"sliders-vertical":[["path",{"d":"M10 8h4"}],["path",{"d":"M12 21v-9"}],["path",{"d":"M12 8V3"}],["path",{"d":"M17 16h4"}],["path",{"d":"M19 12V3"}],["path",{"d":"M19 21v-5"}],["path",{"d":"M3 14h4"}],["path",{"d":"M5 10V3"}],["path",{"d":"M5 21v-7"}]],"smartphone-charging":[["rect",{"width":"14","height":"20","x":"5","y":"2","rx":"2","ry":"2"}],["path",{"d":"M12.667 8 10 12h4l-2.667 4"}]],"smartphone-nfc":[["rect",{"width":"7","height":"12","x":"2","y":"6","rx":"1"}],["path",{"d":"M13 8.32a7.43 7.43 0 0 1 0 7.36"}],["path",{"d":"M16.46 6.21a11.76 11.76 0 0 1 0 11.58"}],["path",{"d":"M19.91 4.1a15.91 15.91 0 0 1 .01 15.8"}]],"smartphone-user-round":[["path",{"d":"M10 22H6a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v4"}],["path",{"d":"M11 18h.01"}],["path",{"d":"M22 22a4 4 0 00-8 0"}],["circle",{"cx":"18","cy":"15","r":"3"}]],"smartphone":[["rect",{"width":"14","height":"20","x":"5","y":"2","rx":"2","ry":"2"}],["path",{"d":"M12 18h.01"}]],"snail":[["path",{"d":"M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0"}],["circle",{"cx":"10","cy":"13","r":"8"}],["path",{"d":"M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6"}],["path",{"d":"M18 3 19.1 5.2"}],["path",{"d":"M22 3 20.9 5.2"}]],"snowflake":[["path",{"d":"m10 20-1.25-2.5L6 18"}],["path",{"d":"M10 4 8.75 6.5 6 6"}],["path",{"d":"m14 20 1.25-2.5L18 18"}],["path",{"d":"m14 4 1.25 2.5L18 6"}],["path",{"d":"m17 21-3-6h-4"}],["path",{"d":"m17 3-3 6 1.5 3"}],["path",{"d":"M2 12h6.5L10 9"}],["path",{"d":"m20 10-1.5 2 1.5 2"}],["path",{"d":"M22 12h-6.5L14 15"}],["path",{"d":"m4 10 1.5 2L4 14"}],["path",{"d":"m7 21 3-6-1.5-3"}],["path",{"d":"m7 3 3 6h4"}]],"soap-dispenser-droplet":[["path",{"d":"M10.5 2v4"}],["path",{"d":"M14 2H7a2 2 0 0 0-2 2"}],["path",{"d":"M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19"}],["path",{"d":"M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"}]],"sofa":[["path",{"d":"M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"}],["path",{"d":"M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"}],["path",{"d":"M4 18v2"}],["path",{"d":"M20 18v2"}],["path",{"d":"M12 4v9"}]],"solar-panel":[["path",{"d":"M11 2h2"}],["path",{"d":"m14.28 14-4.56 8"}],["path",{"d":"m21 22-1.558-4H4.558"}],["path",{"d":"M3 10v2"}],["path",{"d":"M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z"}],["path",{"d":"M7 2a4 4 0 0 1-4 4"}],["path",{"d":"m8.66 7.66 1.41 1.41"}]],"soup":[["path",{"d":"M11.248 3c.273.1.808.53.747 1.36-.05.83-.938 1.2-.989 2.02-.06.78.333 1.24.727 1.62"}],["path",{"d":"M16.252 3c.268.1.794.53.745 1.36-.06.83-.923 1.2-.993 2.02-.05.78.338 1.24.725 1.62"}],["path",{"d":"M19.5 12 22 6"}],["path",{"d":"M4 12a1 1 0 00-.99 1.133A9 9 0 0012 21a9 9 0 008.99-7.867A1 1 0 0020 12z"}],["path",{"d":"M6.252 3c.268.1.794.53.745 1.36-.06.83-.923 1.2-.993 2.02-.05.78.338 1.24.735 1.62"}],["path",{"d":"M7 21h10"}]],"space":[["path",{"d":"M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"}]],"spade":[["path",{"d":"M12 18v4"}],["path",{"d":"M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5"}]],"sparkle":[["path",{"d":"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}]],"sparkles":[["path",{"d":"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],["path",{"d":"M20 2v4"}],["path",{"d":"M22 4h-4"}],["circle",{"cx":"4","cy":"20","r":"2"}]],"speaker":[["rect",{"width":"16","height":"20","x":"4","y":"2","rx":"2"}],["path",{"d":"M12 6h.01"}],["circle",{"cx":"12","cy":"14","r":"4"}],["path",{"d":"M12 14h.01"}]],"speech":[["path",{"d":"M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"}],["path",{"d":"M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"}],["path",{"d":"M17 15a3.5 3.5 0 0 0-.025-4.975"}]],"spell-check-2":[["path",{"d":"m6 16 6-12 6 12"}],["path",{"d":"M8 12h8"}],["path",{"d":"M4 21c1.1 0 1.1-1 2.3-1s1.1 1 2.3 1c1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1 1.1 0 1.1 1 2.3 1 1.1 0 1.1-1 2.3-1"}]],"spell-check":[["path",{"d":"m20 15-5.5 5.5L12 18"}],["path",{"d":"m4 16 6-12 5.115 10.23"}],["path",{"d":"M6 12h8"}]],"spline-pointer":[["path",{"d":"M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"}],["path",{"d":"M5 17A12 12 0 0 1 17 5"}],["circle",{"cx":"19","cy":"5","r":"2"}],["circle",{"cx":"5","cy":"19","r":"2"}]],"spline":[["circle",{"cx":"19","cy":"5","r":"2"}],["circle",{"cx":"5","cy":"19","r":"2"}],["path",{"d":"M5 17A12 12 0 0 1 17 5"}]],"split":[["path",{"d":"M16 3h5v5"}],["path",{"d":"M8 3H3v5"}],["path",{"d":"M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3"}],["path",{"d":"m15 9 6-6"}]],"spool":[["path",{"d":"M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66"}],["path",{"d":"m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178"}]],"sport-shoe":[["path",{"d":"m15 10.42 4.8-5.07"}],["path",{"d":"M19 18h3"}],["path",{"d":"M9.5 22 21.414 9.415A2 2 0 0 0 21.2 6.4l-5.61-4.208A1 1 0 0 0 14 3v2a2 2 0 0 1-1.394 1.906L8.677 8.053A1 1 0 0 0 8 9c-.155 6.393-2.082 9-4 9a2 2 0 0 0 0 4h14"}]],"spotlight":[["path",{"d":"M15.295 19.562 16 22"}],["path",{"d":"m17 16 3.758 2.098"}],["path",{"d":"m19 12.5 3.026-.598"}],["path",{"d":"M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z"}],["path",{"d":"M8 9V2"}]],"spray-can":[["path",{"d":"M3 3h.01"}],["path",{"d":"M7 5h.01"}],["path",{"d":"M11 7h.01"}],["path",{"d":"M3 7h.01"}],["path",{"d":"M7 9h.01"}],["path",{"d":"M3 11h.01"}],["rect",{"width":"4","height":"4","x":"15","y":"5"}],["path",{"d":"m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2"}],["path",{"d":"m13 14 8-2"}],["path",{"d":"m13 19 8-2"}]],"sprout":[["path",{"d":"M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"}],["path",{"d":"M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"}],["path",{"d":"M5 21h14"}]],"square-activity":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M17 12h-2l-2 5-2-10-2 5H7"}]],"square-arrow-down-enter":[["path",{"d":"M12 3v10"}],["path",{"d":"M16 3h3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h3"}],["path",{"d":"m8 9 4 4 4-4"}]],"square-arrow-down-exit":[["path",{"d":"M12 11v10"}],["path",{"d":"M17.67 21H19a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h1.33"}],["path",{"d":"m8 17 4 4 4-4"}]],"square-arrow-down-left-enter":[["path",{"d":"M11 7v6h6"}],["path",{"d":"m20 4-9 9"}],["path",{"d":"M21 8.67V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h10.33"}]],"square-arrow-down-left-exit":[["path",{"d":"M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6"}],["path",{"d":"m3 21 9-9"}],["path",{"d":"M9 21H3v-6"}]],"square-arrow-down-left":[["path",{"d":"M15 15H9l6-6"}],["path",{"d":"M9 15V9"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-arrow-down-right-enter":[["path",{"d":"M13 7v6H7"}],["path",{"d":"m4 4 9 9"}],["path",{"d":"M8.67 3H19a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V8.67"}]],"square-arrow-down-right-exit":[["path",{"d":"M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}],["path",{"d":"m21 21-9-9"}],["path",{"d":"M21 15v6h-6"}]],"square-arrow-down-right":[["path",{"d":"M15 15 9 9"}],["path",{"d":"M9 15h6V9"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-arrow-down":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M12 8v8"}],["path",{"d":"m8 12 4 4 4-4"}]],"square-arrow-left-enter":[["path",{"d":"m15 8-4 4 4 4"}],["path",{"d":"M21 12H11"}],["path",{"d":"M21 16v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v3"}]],"square-arrow-left-exit":[["path",{"d":"M13 12H3"}],["path",{"d":"M3 17.67V19a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v1.33"}],["path",{"d":"m7 8-4 4 4 4"}]],"square-arrow-left":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"m12 8-4 4 4 4"}],["path",{"d":"M16 12H8"}]],"square-arrow-right-enter":[["path",{"d":"M3 12h10"}],["path",{"d":"M3 8V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2v-3"}],["path",{"d":"m9 16 4-4-4-4"}]],"square-arrow-right-exit":[["path",{"d":"M11 12h10"}],["path",{"d":"m17 16 4-4-4-4"}],["path",{"d":"M21 6.33V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-1.33"}]],"square-arrow-right":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M8 12h8"}],["path",{"d":"m12 16 4-4-4-4"}]],"square-arrow-up-enter":[["path",{"d":"M12 21V11"}],["path",{"d":"m16 15-4-4-4 4"}],["path",{"d":"M8 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2h-3"}]],"square-arrow-up-exit":[["path",{"d":"M12 13V3"}],["path",{"d":"m16 7-4-4-4 4"}],["path",{"d":"M6.33 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-1.33"}]],"square-arrow-up-left-enter":[["path",{"d":"M15.33 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10.33"}],["path",{"d":"M17 11h-6v6"}],["path",{"d":"m20 20-9-9"}]],"square-arrow-up-left-exit":[["path",{"d":"M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"}],["path",{"d":"m3 3 9 9"}],["path",{"d":"M3 9V3h6"}]],"square-arrow-up-left":[["path",{"d":"M15 15 9 9"}],["path",{"d":"M9 15V9h6"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-arrow-up-right-enter":[["path",{"d":"M13 17v-6H7"}],["path",{"d":"M3 15.33V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H8.67"}],["path",{"d":"m4 20 9-9"}]],"square-arrow-up-right-exit":[["path",{"d":"M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"}],["path",{"d":"m21 3-9 9"}],["path",{"d":"M15 3h6v6"}]],"square-arrow-up-right":[["path",{"d":"M15 15V9H9"}],["path",{"d":"m9 15 6-6"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-arrow-up":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"m16 12-4-4-4 4"}],["path",{"d":"M12 16V8"}]],"square-asterisk":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M12 8v8"}],["path",{"d":"m8.5 14 7-4"}],["path",{"d":"m8.5 10 7 4"}]],"square-axis-dashed-horizontal":[["path",{"d":"M10 12H8"}],["path",{"d":"M16 12h-2"}],["path",{"d":"M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"}],["path",{"d":"M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"}],["path",{"d":"M22 12h-2"}],["path",{"d":"M4 12H2"}]],"square-axis-dashed-vertical":[["path",{"d":"M12 14v2"}],["path",{"d":"M12 20v2"}],["path",{"d":"M12 2v2"}],["path",{"d":"M12 8v2"}],["path",{"d":"M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"}],["path",{"d":"M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3"}]],"square-axis-horizontal":[["path",{"d":"M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"}],["path",{"d":"M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"}],["path",{"d":"M22 12H2"}]],"square-axis-vertical":[["path",{"d":"M12 2v20"}],["path",{"d":"M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"}],["path",{"d":"M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3"}]],"square-bookmark":[["path",{"d":"M11 3v7.751a.25.25 0 00.407.195l2.28-1.834a.5.5 0 01.627 0l2.28 1.834a.25.25 0 00.406-.195V3"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-bottom-dashed-scissors":[["path",{"d":"M14 21h1"}],["path",{"d":"m17 17-2.18-2.18"}],["path",{"d":"M5 21a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2"}],["path",{"d":"M9 21h1"}],["path",{"d":"M9.56 14.44 17 7"}],["path",{"d":"M9.56 9.56 12 12"}],["circle",{"cx":"8.5","cy":"15.5","r":"1.5"}],["circle",{"cx":"8.5","cy":"8.5","r":"1.5"}]],"square-chart-gantt":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M9 8h7"}],["path",{"d":"M8 12h6"}],["path",{"d":"M11 16h5"}]],"square-check-big":[["path",{"d":"M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"}],["path",{"d":"m9 11 3 3L22 4"}]],"square-check":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"m16 9-5.5 5.5L8 12"}]],"square-chevron-down":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"m16 10-4 4-4-4"}]],"square-chevron-left":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"m14 16-4-4 4-4"}]],"square-chevron-right":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"m10 8 4 4-4 4"}]],"square-chevron-up":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"m8 14 4-4 4 4"}]],"square-chevrons-down":[["path",{"d":"M9 14L12 17L15 14"}],["path",{"d":"M9 8L12 11L15 8"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-chevrons-left":[["path",{"d":"M10 9L7 12L10 15"}],["path",{"d":"M16 9L13 12L16 15"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-chevrons-right":[["path",{"d":"M14 15L17 12L14 9"}],["path",{"d":"M8 15L11 12L8 9"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-chevrons-up":[["path",{"d":"M15 10L12 7L9 10"}],["path",{"d":"M15 16L12 13L9 16"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-code":[["path",{"d":"m10 9-3 3 3 3"}],["path",{"d":"m14 15 3-3-3-3"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-dashed-bottom-code":[["path",{"d":"M10 9.5 8 12l2 2.5"}],["path",{"d":"M14 21h1"}],["path",{"d":"m14 9.5 2 2.5-2 2.5"}],["path",{"d":"M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"}],["path",{"d":"M9 21h1"}]],"square-dashed-bottom":[["path",{"d":"M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2"}],["path",{"d":"M9 21h1"}],["path",{"d":"M14 21h1"}]],"square-dashed-kanban":[["path",{"d":"M8 7v7"}],["path",{"d":"M12 7v4"}],["path",{"d":"M16 7v9"}],["path",{"d":"M5 3a2 2 0 0 0-2 2"}],["path",{"d":"M9 3h1"}],["path",{"d":"M14 3h1"}],["path",{"d":"M19 3a2 2 0 0 1 2 2"}],["path",{"d":"M21 9v1"}],["path",{"d":"M21 14v1"}],["path",{"d":"M21 19a2 2 0 0 1-2 2"}],["path",{"d":"M14 21h1"}],["path",{"d":"M9 21h1"}],["path",{"d":"M5 21a2 2 0 0 1-2-2"}],["path",{"d":"M3 14v1"}],["path",{"d":"M3 9v1"}]],"square-dashed-mouse-pointer":[["path",{"d":"M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"}],["path",{"d":"M5 3a2 2 0 0 0-2 2"}],["path",{"d":"M19 3a2 2 0 0 1 2 2"}],["path",{"d":"M5 21a2 2 0 0 1-2-2"}],["path",{"d":"M9 3h1"}],["path",{"d":"M9 21h2"}],["path",{"d":"M14 3h1"}],["path",{"d":"M3 9v1"}],["path",{"d":"M21 9v2"}],["path",{"d":"M3 14v1"}]],"square-dashed-plus":[["path",{"d":"M5 3a2 2 0 0 0-2 2"}],["path",{"d":"M19 3a2 2 0 0 1 2 2"}],["path",{"d":"M21 19a2 2 0 0 1-2 2"}],["path",{"d":"M5 21a2 2 0 0 1-2-2"}],["path",{"d":"M9 3h1"}],["path",{"d":"M9 21h1"}],["path",{"d":"M14 3h1"}],["path",{"d":"M14 21h1"}],["path",{"d":"M3 9v1"}],["path",{"d":"M21 9v1"}],["path",{"d":"M3 14v1"}],["path",{"d":"M21 14v1"}],["path",{"d":"M8 12h8"}],["path",{"d":"M12 8v8"}]],"square-dashed-search":[["path",{"d":"M14 3h1"}],["path",{"d":"M19 3a2 2 0 012 2"}],["path",{"d":"m21 21-1.875-1.875"}],["path",{"d":"M21 9v1"}],["path",{"d":"M3 14v1"}],["path",{"d":"M3 9v1"}],["path",{"d":"M5 21a2 2 0 01-2-2"}],["path",{"d":"M5 3a2 2 0 00-2 2"}],["path",{"d":"M9 21h1"}],["path",{"d":"M9 3h1"}],["circle",{"cx":"17","cy":"17","r":"3"}]],"square-dashed-text":[["path",{"d":"M14 21h1"}],["path",{"d":"M14 3h1"}],["path",{"d":"M19 3a2 2 0 0 1 2 2"}],["path",{"d":"M21 14v1"}],["path",{"d":"M21 19a2 2 0 0 1-2 2"}],["path",{"d":"M21 9v1"}],["path",{"d":"M3 14v1"}],["path",{"d":"M3 9v1"}],["path",{"d":"M5 21a2 2 0 0 1-2-2"}],["path",{"d":"M5 3a2 2 0 0 0-2 2"}],["path",{"d":"M7 12h10"}],["path",{"d":"M7 16h6"}],["path",{"d":"M7 8h8"}],["path",{"d":"M9 21h1"}],["path",{"d":"M9 3h1"}]],"square-dashed-top-solid":[["path",{"d":"M14 21h1"}],["path",{"d":"M21 14v1"}],["path",{"d":"M21 19a2 2 0 0 1-2 2"}],["path",{"d":"M21 9v1"}],["path",{"d":"M3 14v1"}],["path",{"d":"M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"}],["path",{"d":"M3 9v1"}],["path",{"d":"M5 21a2 2 0 0 1-2-2"}],["path",{"d":"M9 21h1"}]],"square-dashed-x-corner":[["path",{"d":"M14 3h1"}],["path",{"d":"m16 16 5 5"}],["path",{"d":"M19 3a2 2 0 012 2"}],["path",{"d":"m21 16-5 5"}],["path",{"d":"M21 9v1"}],["path",{"d":"M3 14v1"}],["path",{"d":"M3 9v1"}],["path",{"d":"M5 21a2 2 0 01-2-2"}],["path",{"d":"M5 3a2 2 0 00-2 2"}],["path",{"d":"M9 21h1"}],["path",{"d":"M9 3h1"}]],"square-dashed-x":[["path",{"d":"M14 21h1"}],["path",{"d":"M14 3h1"}],["path",{"d":"M19 3a2 2 0 012 2"}],["path",{"d":"M21 14v1"}],["path",{"d":"M21 19a2 2 0 01-2 2"}],["path",{"d":"M21 9v1"}],["path",{"d":"M3 14v1"}],["path",{"d":"M3 9v1"}],["path",{"d":"M5 21a2 2 0 01-2-2"}],["path",{"d":"M5 3a2 2 0 00-2 2"}],["path",{"d":"m9 15 6-6"}],["path",{"d":"M9 21h1"}],["path",{"d":"M9 3h1"}],["path",{"d":"m9 9 6 6"}]],"square-dashed":[["path",{"d":"M5 3a2 2 0 0 0-2 2"}],["path",{"d":"M19 3a2 2 0 0 1 2 2"}],["path",{"d":"M21 19a2 2 0 0 1-2 2"}],["path",{"d":"M5 21a2 2 0 0 1-2-2"}],["path",{"d":"M9 3h1"}],["path",{"d":"M9 21h1"}],["path",{"d":"M14 3h1"}],["path",{"d":"M14 21h1"}],["path",{"d":"M3 9v1"}],["path",{"d":"M21 9v1"}],["path",{"d":"M3 14v1"}],["path",{"d":"M21 14v1"}]],"square-dimensions":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M12 7H7v5"}],["path",{"d":"M12 17h5v-5"}]],"square-divide":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],["line",{"x1":"8","x2":"16","y1":"12","y2":"12"}],["line",{"x1":"12","x2":"12","y1":"16","y2":"16"}],["line",{"x1":"12","x2":"12","y1":"8","y2":"8"}]],"square-dot":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["circle",{"cx":"12","cy":"12","r":"1"}]],"square-equal":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M7 10h10"}],["path",{"d":"M7 14h10"}]],"square-exclamation-point":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["line",{"x1":"12","x2":"12","y1":"8","y2":"12"}],["line",{"x1":"12","x2":"12.01","y1":"16","y2":"16"}]],"square-function":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],["path",{"d":"M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3"}],["path",{"d":"M9 11.2h5.7"}]],"square-kanban-plus":[["path",{"d":"M12 7v4"}],["path",{"d":"M12.354 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v7.354"}],["path",{"d":"M15 18h6"}],["path",{"d":"M16 7v4.536"}],["path",{"d":"M18 21v-6"}],["path",{"d":"M8 7v7"}]],"square-kanban":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M8 7v7"}],["path",{"d":"M12 7v4"}],["path",{"d":"M16 7v9"}]],"square-letter-a":[["path",{"d":"m8 16 3.453-7.648a.6.6 0 0 1 1.094 0L16 16"}],["path",{"d":"M15 14H9"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-b":[["path",{"d":"M9 12h4.846a2.24 2.24 0 011.523.586 2 2 0 01.001 2.828 2.24 2.24 0 01-1.524.586H9.5a.5.5 0 01-.5-.5v-7a.5.5 0 01.5-.5H13a2 2 0 010 4"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-letter-c":[["path",{"d":"M15 9.354a4 4 0 1 0 0 5.292"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-d":[["path",{"d":"M12 8a4 4 0 010 8H9.412A.41.41 0 019 15.588V8.412A.41.41 0 019.412 8z"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-e":[["path",{"d":"M15 8H9.5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5H15"}],["path",{"d":"M9 12h4"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-f":[["path",{"d":"M9 16V8.5a.5.5 0 0 1 .5-.5H15"}],["path",{"d":"M9 12h4"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-g":[["path",{"d":"M12.5 12H15v2.268a.88.88 0 01-.263.65A4 4 0 1112 8h2.5"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-h":[["path",{"d":"M9 16V8"}],["path",{"d":"M15 16V8"}],["path",{"d":"M9 12h6"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-i":[["path",{"d":"M12 16V8"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-j":[["path",{"d":"M14 8v5.5a1 1 0 01-5 0V13"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-k":[["path",{"d":"M9 16V8"}],["path",{"d":"m11 12 4 4"}],["path",{"d":"m15 8-6 6"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-l":[["path",{"d":"M9 8v7.5a.5.5 0 0 0 .5.5H15"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-m":[["path",{"d":"M8 16.001v-7.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3v7.501"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-n":[["path",{"d":"M9 16V8.576a.496.496 0 01.937-.243l4.126 7.43A.496.496 0 0015 15.52V8"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-letter-o":[["circle",{"cx":"12","cy":"12","r":"4"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-p-off":[["path",{"d":"M12 12h1a2 2 0 000-4H9.5a.5.5 0 00-.5.5V9"}],["path",{"d":"M15.343 21H5a2 2 0 01-2-2V8.657"}],["path",{"d":"M22 22 2 2"}],["path",{"d":"M3.586 3.586A2 2 0 015 3h14a2 2 0 012 2v14a2 2 0 01-.586 1.414"}],["path",{"d":"M9 14.657V16"}]],"square-letter-p":[["path",{"d":"M9 12h4a2 2 0 0 0 0-4H9.5a.5.5 0 0 0-.5.5V16"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-q":[["circle",{"cx":"12","cy":"12","r":"4"}],["path",{"d":"m16 16-2.5-2.5"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-r":[["path",{"d":"m11 12 4 4"}],["path",{"d":"M9 12h4a2 2 0 0 0 0-4H9.5a.5.5 0 0 0-.5.5V16"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-s":[["path",{"d":"M14.5 8H11a2 2 0 100 4h2a2 2 0 110 4H9"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-letter-t":[["path",{"d":"M12 16V8"}],["path",{"d":"M9 8h6"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-letter-u":[["path",{"d":"M15 8v5a3 3 0 1 1-6 0V8"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-v":[["path",{"d":"m9 8 2.525 7.66a.5.5 0 0 0 .95 0L15 8"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-w":[["path",{"d":"m16 8-1.591 7.598a.497.497 0 01-.97.038l-.96-3.276a.5.5 0 00-.959 0l-.96 3.276a.496.496 0 01-.969-.038L8 8"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-letter-x":[["path",{"d":"m9 16 6-8"}],["path",{"d":"m9 8 6 8"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-letter-y":[["path",{"d":"m9 8 3 4 3-4"}],["path",{"d":"M12 12v4"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-letter-z":[["path",{"d":"M9 8h5.501a.5.5 0 0 1 .37.836L9.13 15.164A.5.5 0 0 0 9.5 16H15"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-library":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M7 7v10"}],["path",{"d":"M11 7v10"}],["path",{"d":"m15 7 2 10"}]],"square-menu":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M7 8h10"}],["path",{"d":"M7 12h10"}],["path",{"d":"M7 16h10"}]],"square-minus":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M8 12h8"}]],"square-mouse-pointer":[["path",{"d":"M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"}],["path",{"d":"M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"}]],"square-off":[["path",{"d":"M20.4 20.4a2 2 0 01-1.4.6H5a2 2 0 01-2-2V5a2 2 0 01.59-1.41"}],["path",{"d":"M21 15.3V5a2 2 0 00-2-2H8.7"}],["path",{"d":"M22 22 2 2"}]],"square-padding-bottom":[["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M8 17h8"}]],"square-padding-horizontal":[["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M17 16V8"}],["path",{"d":"M7 16V8"}]],"square-padding-left":[["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M7 16V8"}]],"square-padding-right":[["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M17 16V8"}]],"square-padding-top":[["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M8 7h8"}]],"square-padding-vertical":[["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M8 17h8"}],["path",{"d":"M8 7h8"}]],"square-padding":[["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M14 17h-4"}],["path",{"d":"M14 7h-4"}],["path",{"d":"M17 14v-4"}],["path",{"d":"M7 14v-4"}]],"square-pause":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["line",{"x1":"10","x2":"10","y1":"15","y2":"9"}],["line",{"x1":"14","x2":"14","y1":"15","y2":"9"}]],"square-pen":[["path",{"d":"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}],["path",{"d":"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"}]],"square-percent":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"m15 9-6 6"}],["path",{"d":"M9 9h.01"}],["path",{"d":"M15 15h.01"}]],"square-pi":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M7 7h10"}],["path",{"d":"M10 7v10"}],["path",{"d":"M16 17a2 2 0 0 1-2-2V7"}]],"square-pilcrow":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M12 12H9.5a2.5 2.5 0 0 1 0-5H17"}],["path",{"d":"M12 7v10"}],["path",{"d":"M16 7v10"}]],"square-play":[["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["path",{"d":"M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"}]],"square-plus":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M8 12h8"}],["path",{"d":"M12 8v8"}]],"square-power":[["path",{"d":"M12 7v4"}],["path",{"d":"M7.998 9.003a5 5 0 1 0 8-.005"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-radical":[["path",{"d":"M7 12h2l2 5 2-10h4"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-round-corner":[["path",{"d":"M21 11a8 8 0 0 0-8-8"}],["path",{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}]],"square-scissors":[["path",{"d":"m17 17-2.18-2.18"}],["path",{"d":"M9.56 14.44 17 7"}],["path",{"d":"M9.56 9.56 12 12"}],["circle",{"cx":"8.5","cy":"15.5","r":"1.5"}],["circle",{"cx":"8.5","cy":"8.5","r":"1.5"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-sigma":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M16 8.9V7H8l4 5-4 5h8v-1.9"}]],"square-slash":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["line",{"x1":"9","x2":"15","y1":"15","y2":"9"}]],"square-sparkles":[["path",{"d":"M11 15H7"}],["path",{"d":"M15.41 2.49a.6.6 0 011.18 0l.63 3.334a1.2 1.2 0 00.956.955l3.334.631a.6.6 0 010 1.18l-3.334.63a1.2 1.2 0 00-.955.956l-.631 3.334a.6.6 0 01-1.18 0l-.63-3.334a1.2 1.2 0 00-.956-.955L10.49 8.59a.6.6 0 010-1.18l3.334-.63a1.2 1.2 0 00.955-.956z"}],["path",{"d":"M21 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6"}],["path",{"d":"M9 13v4"}]],"square-split-horizontal":[["path",{"d":"M12 2v20"}],["path",{"d":"M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"}],["path",{"d":"M8 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3"}]],"square-split-vertical":[["path",{"d":"M2 12h20"}],["path",{"d":"M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"}],["path",{"d":"M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"}]],"square-square":[["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}],["rect",{"x":"8","y":"8","width":"8","height":"8","rx":"1"}]],"square-stack":[["path",{"d":"M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"}],["path",{"d":"M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"}],["rect",{"width":"8","height":"8","x":"14","y":"14","rx":"2"}]],"square-star":[["path",{"d":"M11.035 7.69a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"square-stop":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["rect",{"x":"9","y":"9","width":"6","height":"6","rx":"1"}]],"square-terminal":[["path",{"d":"m7 11 2-2-2-2"}],["path",{"d":"M11 13h4"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}]],"square-text":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M7 8h8"}],["path",{"d":"M7 12h10"}],["path",{"d":"M7 16h6"}]],"square-user-round":[["path",{"d":"M18 21a6 6 0 0 0-12 0"}],["circle",{"cx":"12","cy":"11","r":"4"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"square-user":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["circle",{"cx":"12","cy":"10","r":"3"}],["path",{"d":"M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"}]],"square-x":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],["path",{"d":"m15 9-6 6"}],["path",{"d":"m9 9 6 6"}]],"square":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"squares-exclude":[["path",{"d":"M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0"}],["path",{"d":"M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2"}]],"squares-intersect":[["path",{"d":"M10 22a2 2 0 0 1-2-2"}],["path",{"d":"M14 2a2 2 0 0 1 2 2"}],["path",{"d":"M16 22h-2"}],["path",{"d":"M2 10V8"}],["path",{"d":"M2 4a2 2 0 0 1 2-2"}],["path",{"d":"M20 8a2 2 0 0 1 2 2"}],["path",{"d":"M22 14v2"}],["path",{"d":"M22 20a2 2 0 0 1-2 2"}],["path",{"d":"M4 16a2 2 0 0 1-2-2"}],["path",{"d":"M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z"}],["path",{"d":"M8 2h2"}]],"squares-subtract":[["path",{"d":"M10 22a2 2 0 0 1-2-2"}],["path",{"d":"M16 22h-2"}],["path",{"d":"M16 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-5a2 2 0 0 1 2-2h5a1 1 0 0 0 1-1z"}],["path",{"d":"M20 8a2 2 0 0 1 2 2"}],["path",{"d":"M22 14v2"}],["path",{"d":"M22 20a2 2 0 0 1-2 2"}]],"squares-unite":[["path",{"d":"M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z"}]],"squircle-dashed":[["path",{"d":"M13.77 3.043a34 34 0 0 0-3.54 0"}],["path",{"d":"M13.771 20.956a33 33 0 0 1-3.541.001"}],["path",{"d":"M20.18 17.74c-.51 1.15-1.29 1.93-2.439 2.44"}],["path",{"d":"M20.18 6.259c-.51-1.148-1.291-1.929-2.44-2.438"}],["path",{"d":"M20.957 10.23a33 33 0 0 1 0 3.54"}],["path",{"d":"M3.043 10.23a34 34 0 0 0 .001 3.541"}],["path",{"d":"M6.26 20.179c-1.15-.508-1.93-1.29-2.44-2.438"}],["path",{"d":"M6.26 3.82c-1.149.51-1.93 1.291-2.44 2.44"}]],"squircle":[["path",{"d":"M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"}]],"squirrel":[["path",{"d":"M15.236 22a3 3 0 0 0-2.2-5"}],["path",{"d":"M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4"}],["path",{"d":"M18 13h.01"}],["path",{"d":"M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10"}]],"stamp":[["path",{"d":"M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13"}],["path",{"d":"M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z"}],["path",{"d":"M5 22h14"}]],"star-check":[["path",{"d":"m19.06 12.501 2.78-2.707a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428.027-.014"}],["path",{"d":"m15 18 2 2 4-4"}]],"star-half":[["path",{"d":"M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2"}]],"star-minus":[["path",{"d":"M15 18h6"}],["path",{"d":"M17.688 14a2.1 2.1 0 0 1 .416-.568l3.736-3.638a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428.027-.014"}]],"star-off":[["path",{"d":"m10.344 4.688 1.181-2.393a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.237 3.152"}],["path",{"d":"m17.945 17.945.43 2.505a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a8 8 0 0 0 .4-.099"}],["path",{"d":"m2 2 20 20"}]],"star-plus":[["path",{"d":"M11.013 18.582 6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904L20 11.5"}],["path",{"d":"M15 18h6"}],["path",{"d":"M18 15v6"}]],"star-x":[["path",{"d":"m15.5 15.5 5 5"}],["path",{"d":"m20.063 11.525 1.777-1.731a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428a2.1 2.1 0 0 1 .987-.243 2 2 0 0 1 .132.004"}],["path",{"d":"m20.5 15.5-5 5"}]],"star":[["path",{"d":"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]],"step-back":[["path",{"d":"M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"}],["path",{"d":"M21 20V4"}]],"step-forward":[["path",{"d":"M10.029 4.285A2 2 0 0 0 7 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"}],["path",{"d":"M3 4v16"}]],"stethoscope":[["path",{"d":"M11 2v2"}],["path",{"d":"M5 2v2"}],["path",{"d":"M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"}],["path",{"d":"M8 15a6 6 0 0 0 12 0v-3"}],["circle",{"cx":"20","cy":"10","r":"2"}]],"sticker":[["path",{"d":"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"}],["path",{"d":"M15 3v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M8 13h.01"}],["path",{"d":"M16 13h.01"}],["path",{"d":"M10 16s.8 1 2 1c1.3 0 2-1 2-1"}]],"sticky-note-check":[["path",{"d":"m15 19 2 2 4-4"}],["path",{"d":"M15 3v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M21 13V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6.5"}]],"sticky-note-minus":[["path",{"d":"M15 3v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M21 14V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.35"}],["path",{"d":"M21 18h-6"}]],"sticky-note-off":[["path",{"d":"M15 3v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M3.586 3.586A2 2 0 0 0 3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.414-.586"}],["path",{"d":"M8.656 3H15a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 21 9v6.344"}]],"sticky-note-plus":[["path",{"d":"M15 3v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M18 15v6"}],["path",{"d":"M21 12.356V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.355"}],["path",{"d":"M21 18h-6"}]],"sticky-note-x":[["path",{"d":"M15 3v5a1 1 0 0 0 1 1h5"}],["path",{"d":"m16 16 5 5"}],["path",{"d":"M21 12V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7"}],["path",{"d":"m21 16-5 5"}]],"sticky-note":[["path",{"d":"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"}],["path",{"d":"M15 3v5a1 1 0 0 0 1 1h5"}]],"sticky-notes":[["path",{"d":"M10 8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 16 14v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z"}],["path",{"d":"M10 8v5a1 1 0 0 0 1 1h5"}],["path",{"d":"M8 4a2 2 0 0 1 2-2h6a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 22 8v6a2 2 0 0 1-2 2"}],["path",{"d":"M16 2v5a1 1 0 0 0 1 1h5"}]],"stone":[["path",{"d":"M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z"}],["path",{"d":"M11.99 22 14 12l7.822 3.184"}],["path",{"d":"M14 12 8.47 2.302"}]],"store":[["path",{"d":"M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"}],["path",{"d":"M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"}],["path",{"d":"M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"}]],"stretch-horizontal":[["rect",{"width":"20","height":"6","x":"2","y":"4","rx":"2"}],["rect",{"width":"20","height":"6","x":"2","y":"14","rx":"2"}]],"stretch-vertical":[["rect",{"width":"6","height":"20","x":"4","y":"2","rx":"2"}],["rect",{"width":"6","height":"20","x":"14","y":"2","rx":"2"}]],"strikethrough":[["path",{"d":"M16 4H9a3 3 0 0 0-2.83 4"}],["path",{"d":"M14 12a4 4 0 0 1 0 8H6"}],["line",{"x1":"4","x2":"20","y1":"12","y2":"12"}]],"stroke-line-cap-butt":[["path",{"d":"M14 12h2"}],["path",{"d":"M2 12h2"}],["path",{"d":"M2 4h18a2 2 0 012 2v12a2 2 0 01-2 2H2"}],["path",{"d":"M20 12h2"}],["path",{"d":"M8 12h2"}]],"stroke-line-cap-round":[["path",{"d":"M13.99 12H14"}],["path",{"d":"M2 12h2"}],["path",{"d":"M2 4h12a8 8 0 010 16H2"}],["path",{"d":"M8 12h2"}]],"stroke-line-cap-square":[["path",{"d":"M13.99 12H14"}],["path",{"d":"M2 12h2"}],["path",{"d":"M2 4h18a2 2 0 012 2v12a2 2 0 01-2 2H2"}],["path",{"d":"M8 12h2"}]],"stroke-line-join-bevel":[["path",{"d":"M11 21v-2.002"}],["path",{"d":"M3 3h8.002a2.4 2.4 0 011.704.706l7.588 7.588A2.4 2.4 0 0121 12.998V21"}],["path",{"d":"M5 13H3"}],["path",{"d":"M9 13h1a1 1 0 011 1v1"}]],"stroke-line-join-miter":[["path",{"d":"M11 21v-2.002"}],["path",{"d":"M3 3h16a2 2 0 012 2v16"}],["path",{"d":"M5 13H3"}],["path",{"d":"M9 13h1a1 1 0 011 1v1"}]],"stroke-line-join-round":[["path",{"d":"M11 21v-2.002"}],["path",{"d":"M3 3h8a10 10 0 0110 10v8"}],["path",{"d":"M5 13H3"}],["path",{"d":"M9 13h1a1 1 0 011 1v1"}]],"stroke-width":[["path",{"d":"M3.25 3h17.5"}],["rect",{"x":"3","y":"7","width":"18","height":"4","rx":"1"}],["rect",{"x":"3","y":"15","width":"18","height":"6","rx":"1"}]],"subscript":[["path",{"d":"m4 5 8 8"}],["path",{"d":"m12 5-8 8"}],["path",{"d":"M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07"}]],"summary":[["path",{"d":"M15 4H7"}],["path",{"d":"m18 16 3 3-3 3"}],["path",{"d":"M3 4v13a2 2 0 0 0 2 2h16"}],["path",{"d":"M7 14h7"}],["path",{"d":"M7 9h12"}]],"sun-dim":[["circle",{"cx":"12","cy":"12","r":"4"}],["path",{"d":"M12 4h.01"}],["path",{"d":"M20 12h.01"}],["path",{"d":"M12 20h.01"}],["path",{"d":"M4 12h.01"}],["path",{"d":"M17.657 6.343h.01"}],["path",{"d":"M17.657 17.657h.01"}],["path",{"d":"M6.343 17.657h.01"}],["path",{"d":"M6.343 6.343h.01"}]],"sun-medium":[["circle",{"cx":"12","cy":"12","r":"4"}],["path",{"d":"M12 3v1"}],["path",{"d":"M12 20v1"}],["path",{"d":"M3 12h1"}],["path",{"d":"M20 12h1"}],["path",{"d":"m18.364 5.636-.707.707"}],["path",{"d":"m6.343 17.657-.707.707"}],["path",{"d":"m5.636 5.636.707.707"}],["path",{"d":"m17.657 17.657.707.707"}]],"sun-moon":[["path",{"d":"M12 2v2"}],["path",{"d":"M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"}],["path",{"d":"M16 12a4 4 0 0 0-4-4"}],["path",{"d":"m19 5-1.256 1.256"}],["path",{"d":"M20 12h2"}]],"sun-snow":[["path",{"d":"M10 21v-1"}],["path",{"d":"M10 4V3"}],["path",{"d":"M10 9a3 3 0 0 0 0 6"}],["path",{"d":"m14 20 1.25-2.5L18 18"}],["path",{"d":"m14 4 1.25 2.5L18 6"}],["path",{"d":"m17 21-3-6 1.5-3H22"}],["path",{"d":"m17 3-3 6 1.5 3"}],["path",{"d":"M2 12h1"}],["path",{"d":"m20 10-1.5 2 1.5 2"}],["path",{"d":"m3.64 18.36.7-.7"}],["path",{"d":"m4.34 6.34-.7-.7"}]],"sun":[["circle",{"cx":"12","cy":"12","r":"4"}],["path",{"d":"M12 2v2"}],["path",{"d":"M12 20v2"}],["path",{"d":"m4.93 4.93 1.41 1.41"}],["path",{"d":"m17.66 17.66 1.41 1.41"}],["path",{"d":"M2 12h2"}],["path",{"d":"M20 12h2"}],["path",{"d":"m6.34 17.66-1.41 1.41"}],["path",{"d":"m19.07 4.93-1.41 1.41"}]],"sunrise":[["path",{"d":"M12 2v8"}],["path",{"d":"m4.93 10.93 1.41 1.41"}],["path",{"d":"M2 18h2"}],["path",{"d":"M20 18h2"}],["path",{"d":"m19.07 10.93-1.41 1.41"}],["path",{"d":"M22 22H2"}],["path",{"d":"m8 6 4-4 4 4"}],["path",{"d":"M16 18a4 4 0 0 0-8 0"}]],"sunset":[["path",{"d":"M12 10V2"}],["path",{"d":"m4.93 10.93 1.41 1.41"}],["path",{"d":"M2 18h2"}],["path",{"d":"M20 18h2"}],["path",{"d":"m19.07 10.93-1.41 1.41"}],["path",{"d":"M22 22H2"}],["path",{"d":"m16 6-4 4-4-4"}],["path",{"d":"M16 18a4 4 0 0 0-8 0"}]],"superscript":[["path",{"d":"m4 19 8-8"}],["path",{"d":"m12 19-8-8"}],["path",{"d":"M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"}]],"swatch-book":[["path",{"d":"M11 17a4 4 0 0 1-8 0V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2Z"}],["path",{"d":"M16.7 13H19a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7"}],["path",{"d":"M 7 17h.01"}],["path",{"d":"m11 8 2.3-2.3a2.4 2.4 0 0 1 3.404.004L18.6 7.6a2.4 2.4 0 0 1 .026 3.434L9.9 19.8"}]],"swiss-franc":[["path",{"d":"M10 10h7"}],["path",{"d":"M10 20V5a1 1 0 011-1h7"}],["path",{"d":"M6 16h9"}]],"switch-camera":[["path",{"d":"M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"}],["path",{"d":"M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5"}],["circle",{"cx":"12","cy":"12","r":"3"}],["path",{"d":"m18 22-3-3 3-3"}],["path",{"d":"m6 2 3 3-3 3"}]],"sword":[["path",{"d":"m11 19-6-6"}],["path",{"d":"m5 21-2-2"}],["path",{"d":"m8 16-4 4"}],["path",{"d":"M9.5 17.5 20.414 6.586A2 2 0 0021 5.172V3h-2.172a2 2 0 00-1.414.586L6.5 14.5"}]],"swords":[["path",{"d":"m13 19 6-6"}],["path",{"d":"M14.5 17.5 3.586 6.586A2 2 0 013 5.172V3h2.172a2 2 0 011.414.586L17.5 14.5"}],["path",{"d":"m14.828 6.172 2.586-2.586A2 2 0 0118.828 3H21v2.172a2 2 0 01-.586 1.414l-2.586 2.586"}],["path",{"d":"m16 16 4 4"}],["path",{"d":"m19 21 2-2"}],["path",{"d":"m5 14 4 4"}],["path",{"d":"m5 21-2-2"}],["path",{"d":"M7.5 16.5 4 20"}]],"syringe":[["path",{"d":"m18 2 4 4"}],["path",{"d":"m17 7 3-3"}],["path",{"d":"M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"}],["path",{"d":"m9 11 4 4"}],["path",{"d":"m5 19-3 3"}],["path",{"d":"m14 4 6 6"}]],"table-2":[["path",{"d":"M3 9h18"}],["path",{"d":"M9 3v18"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"table-cells-merge":[["path",{"d":"M12 21v-6"}],["path",{"d":"M12 9V3"}],["path",{"d":"M3 15h18"}],["path",{"d":"M3 9h18"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"table-cells-split":[["path",{"d":"M12 15V9"}],["path",{"d":"M3 15h18"}],["path",{"d":"M3 9h18"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}]],"table-columns-split":[["path",{"d":"M14 14v2"}],["path",{"d":"M14 20v2"}],["path",{"d":"M14 2v2"}],["path",{"d":"M14 8v2"}],["path",{"d":"M2 15h8"}],["path",{"d":"M2 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2"}],["path",{"d":"M2 9h8"}],["path",{"d":"M22 15h-4"}],["path",{"d":"M22 3h-2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2"}],["path",{"d":"M22 9h-4"}],["path",{"d":"M5 3v18"}]],"table-of-contents":[["path",{"d":"M16 5H3"}],["path",{"d":"M16 12H3"}],["path",{"d":"M16 19H3"}],["path",{"d":"M21 5h.01"}],["path",{"d":"M21 12h.01"}],["path",{"d":"M21 19h.01"}]],"table-properties":[["path",{"d":"M15 3v18"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M21 9H3"}],["path",{"d":"M21 15H3"}]],"table-rows-split":[["path",{"d":"M14 10h2"}],["path",{"d":"M15 22v-8"}],["path",{"d":"M15 2v4"}],["path",{"d":"M2 10h2"}],["path",{"d":"M20 10h2"}],["path",{"d":"M3 19h18"}],["path",{"d":"M3 22v-6a2 2 135 0 1 2-2h14a2 2 45 0 1 2 2v6"}],["path",{"d":"M3 2v2a2 2 45 0 0 2 2h14a2 2 135 0 0 2-2V2"}],["path",{"d":"M8 10h2"}],["path",{"d":"M9 22v-8"}],["path",{"d":"M9 2v4"}]],"table":[["path",{"d":"M12 3v18"}],["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["path",{"d":"M3 9h18"}],["path",{"d":"M3 15h18"}]],"tablet-smartphone":[["rect",{"width":"10","height":"14","x":"3","y":"8","rx":"2"}],["path",{"d":"M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4"}],["path",{"d":"M8 18h.01"}]],"tablet":[["rect",{"width":"16","height":"20","x":"4","y":"2","rx":"2","ry":"2"}],["line",{"x1":"12","x2":"12.01","y1":"18","y2":"18"}]],"tablets":[["circle",{"cx":"7","cy":"7","r":"5"}],["circle",{"cx":"17","cy":"17","r":"5"}],["path",{"d":"M12 17h10"}],["path",{"d":"m3.46 10.54 7.08-7.08"}]],"tag-plus":[["path",{"d":"M16 13h6"}],["path",{"d":"m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l1.79-1.79"}],["path",{"d":"M19 10v6"}],["circle",{"cx":"7.5","cy":"7.5","r":".5","fill":"currentColor"}]],"tag-x":[["path",{"d":"m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.43 2.43 0 0 0 3.42 0l1.79-1.79"}],["path",{"d":"m16.5 10.5 5 5"}],["path",{"d":"m21.5 10.5-5 5"}],["circle",{"cx":"7.5","cy":"7.5","r":".5","fill":"currentColor"}]],"tag":[["path",{"d":"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{"cx":"7.5","cy":"7.5","r":".5","fill":"currentColor"}]],"tags":[["path",{"d":"M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"}],["path",{"d":"M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"}],["circle",{"cx":"10.5","cy":"6.5","r":".5","fill":"currentColor"}]],"tally-1":[["path",{"d":"M4 4v16"}]],"tally-2":[["path",{"d":"M4 4v16"}],["path",{"d":"M9 4v16"}]],"tally-3":[["path",{"d":"M4 4v16"}],["path",{"d":"M9 4v16"}],["path",{"d":"M14 4v16"}]],"tally-4":[["path",{"d":"M4 4v16"}],["path",{"d":"M9 4v16"}],["path",{"d":"M14 4v16"}],["path",{"d":"M19 4v16"}]],"tally-5":[["path",{"d":"M4 4v16"}],["path",{"d":"M9 4v16"}],["path",{"d":"M14 4v16"}],["path",{"d":"M19 4v16"}],["path",{"d":"M22 6 2 18"}]],"tangent":[["circle",{"cx":"17","cy":"4","r":"2"}],["path",{"d":"M15.59 5.41 5.41 15.59"}],["circle",{"cx":"4","cy":"17","r":"2"}],["path",{"d":"M12 22s-4-9-1.5-11.5S22 12 22 12"}]],"target":[["circle",{"cx":"12","cy":"12","r":"10"}],["circle",{"cx":"12","cy":"12","r":"6"}],["circle",{"cx":"12","cy":"12","r":"2"}]],"telescope":[["path",{"d":"m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"}],["path",{"d":"m13.56 11.747 4.332-.924"}],["path",{"d":"m16 21-3.105-6.21"}],["path",{"d":"M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"}],["path",{"d":"m6.158 8.633 1.114 4.456"}],["path",{"d":"m8 21 3.105-6.21"}],["circle",{"cx":"12","cy":"13","r":"2"}]],"tent-tree":[["circle",{"cx":"4","cy":"4","r":"2"}],["path",{"d":"m14 5 3-3 3 3"}],["path",{"d":"m14 10 3-3 3 3"}],["path",{"d":"M17 14V2"}],["path",{"d":"M17 14H7l-5 8h20Z"}],["path",{"d":"M8 14v8"}],["path",{"d":"m9 14 5 8"}]],"tent":[["path",{"d":"M3.5 21 14 3"}],["path",{"d":"M20.5 21 10 3"}],["path",{"d":"M15.5 21 12 15l-3.5 6"}],["path",{"d":"M2 21h20"}]],"terminal":[["path",{"d":"M12 19h8"}],["path",{"d":"m4 17 6-6-6-6"}]],"test-tube-diagonal":[["path",{"d":"M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3"}],["path",{"d":"m16 2 6 6"}],["path",{"d":"M12 16H4"}]],"test-tube":[["path",{"d":"M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2"}],["path",{"d":"M8.5 2h7"}],["path",{"d":"M14.5 16h-5"}]],"test-tubes":[["path",{"d":"M9 2v17.5A2.5 2.5 0 0 1 6.5 22A2.5 2.5 0 0 1 4 19.5V2"}],["path",{"d":"M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5V2"}],["path",{"d":"M3 2h7"}],["path",{"d":"M14 2h7"}],["path",{"d":"M9 16H4"}],["path",{"d":"M20 16h-5"}]],"text-align-center":[["path",{"d":"M21 5H3"}],["path",{"d":"M17 12H7"}],["path",{"d":"M19 19H5"}]],"text-align-end":[["path",{"d":"M21 5H3"}],["path",{"d":"M21 12H9"}],["path",{"d":"M21 19H7"}]],"text-align-justify-center":[["path",{"d":"M3 5h18"}],["path",{"d":"M3 12h18"}],["path",{"d":"M7 19h10"}]],"text-align-justify-end":[["path",{"d":"M3 5h18"}],["path",{"d":"M3 12h18"}],["path",{"d":"M11 19h10"}]],"text-align-justify-start":[["path",{"d":"M3 5h18"}],["path",{"d":"M3 12h18"}],["path",{"d":"M3 19h10"}]],"text-align-justify":[["path",{"d":"M3 5h18"}],["path",{"d":"M3 12h18"}],["path",{"d":"M3 19h18"}]],"text-align-start":[["path",{"d":"M21 5H3"}],["path",{"d":"M15 12H3"}],["path",{"d":"M17 19H3"}]],"text-cursor-input":[["path",{"d":"M12 20h-1a2 2 0 0 1-2-2 2 2 0 0 1-2 2H6"}],["path",{"d":"M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7"}],["path",{"d":"M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1"}],["path",{"d":"M6 4h1a2 2 0 0 1 2 2 2 2 0 0 1 2-2h1"}],["path",{"d":"M9 6v12"}]],"text-cursor":[["path",{"d":"M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1"}],["path",{"d":"M7 22h1a4 4 0 0 0 4-4"}],["path",{"d":"M7 2h1a4 4 0 0 1 4 4"}]],"text-initial":[["path",{"d":"M15 5h6"}],["path",{"d":"M15 12h6"}],["path",{"d":"M3 19h18"}],["path",{"d":"m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12"}],["path",{"d":"M3.92 10h6.16"}]],"text-pen":[["path",{"d":"M12 12H3"}],["path",{"d":"M21 5H3"}],["path",{"d":"M21.377 14.626a1 1 0 10-3.004-3.004l-5.01 5.012a2 2 0 00-.506.854l-.837 2.87a.5.5 0 00.62.62l2.87-.837a2 2 0 00.854-.506z"}],["path",{"d":"M8 19H3"}]],"text-quote":[["path",{"d":"M17 5H3"}],["path",{"d":"M21 12H8"}],["path",{"d":"M21 19H8"}],["path",{"d":"M3 12v7"}]],"text-search":[["path",{"d":"M21 5H3"}],["path",{"d":"M10 12H3"}],["path",{"d":"M10 19H3"}],["circle",{"cx":"17","cy":"15","r":"3"}],["path",{"d":"m21 19-1.9-1.9"}]],"text-wrap":[["path",{"d":"m16 16-3 3 3 3"}],["path",{"d":"M3 12h14.5a1 1 0 0 1 0 7H13"}],["path",{"d":"M3 19h6"}],["path",{"d":"M3 5h18"}]],"theater":[["path",{"d":"M2 10s3-3 3-8"}],["path",{"d":"M22 10s-3-3-3-8"}],["path",{"d":"M10 2c0 4.4-3.6 8-8 8"}],["path",{"d":"M14 2c0 4.4 3.6 8 8 8"}],["path",{"d":"M2 10s2 2 2 5"}],["path",{"d":"M22 10s-2 2-2 5"}],["path",{"d":"M8 15h8"}],["path",{"d":"M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"}],["path",{"d":"M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"}]],"thermometer-snowflake":[["path",{"d":"m10 20-1.25-2.5L6 18"}],["path",{"d":"M10 4 8.75 6.5 6 6"}],["path",{"d":"M10.585 15H10"}],["path",{"d":"M2 12h6.5L10 9"}],["path",{"d":"M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"}],["path",{"d":"m4 10 1.5 2L4 14"}],["path",{"d":"m7 21 3-6-1.5-3"}],["path",{"d":"m7 3 3 6h2"}]],"thermometer-sun":[["path",{"d":"M12 2v2"}],["path",{"d":"M12 8a4 4 0 0 0-1.645 7.647"}],["path",{"d":"M2 12h2"}],["path",{"d":"M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z"}],["path",{"d":"m4.93 4.93 1.41 1.41"}],["path",{"d":"m6.34 17.66-1.41 1.41"}]],"thermometer":[["path",{"d":"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]],"thumbs-down":[["path",{"d":"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"}],["path",{"d":"M17 14V2"}]],"thumbs-up":[["path",{"d":"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"}],["path",{"d":"M7 10v12"}]],"tic-tac-toe":[["path",{"d":"M12 2v20"}],["path",{"d":"m21 16-5 5"}],["path",{"d":"m21 21-5-5"}],["path",{"d":"M22 12H2"}],["path",{"d":"M8 3 3 8"}],["path",{"d":"M8 8 3 3"}],["circle",{"cx":"18.5","cy":"5.5","r":"2.5"}],["circle",{"cx":"5.5","cy":"18.5","r":"2.5"}]],"ticket-check":[["path",{"d":"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{"d":"m9 12 2 2 4-4"}]],"ticket-minus":[["path",{"d":"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{"d":"M9 12h6"}]],"ticket-percent":[["path",{"d":"M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{"d":"M9 9h.01"}],["path",{"d":"m15 9-6 6"}],["path",{"d":"M15 15h.01"}]],"ticket-plus":[["path",{"d":"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{"d":"M9 12h6"}],["path",{"d":"M12 9v6"}]],"ticket-slash":[["path",{"d":"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{"d":"m9.5 14.5 5-5"}]],"ticket-x":[["path",{"d":"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{"d":"m9.5 14.5 5-5"}],["path",{"d":"m9.5 9.5 5 5"}]],"ticket":[["path",{"d":"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"}],["path",{"d":"M13 5v2"}],["path",{"d":"M13 17v2"}],["path",{"d":"M13 11v2"}]],"tickets-plane":[["path",{"d":"M10.5 17h1.227a2 2 0 0 0 1.345-.52L18 12"}],["path",{"d":"m12 13.5 3.794.506"}],["path",{"d":"m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8"}],["path",{"d":"M6 10V8"}],["path",{"d":"M6 14v1"}],["path",{"d":"M6 19v2"}],["rect",{"x":"2","y":"8","width":"20","height":"13","rx":"2"}]],"tickets":[["path",{"d":"m3.173 8.18 11-5a2 2 0 0 1 2.647.993L18.56 8"}],["path",{"d":"M6 10V8"}],["path",{"d":"M6 14v1"}],["path",{"d":"M6 19v2"}],["rect",{"x":"2","y":"8","width":"20","height":"13","rx":"2"}]],"timeline":[["path",{"d":"M4 12h.01"}],["path",{"d":"M4 16h.01"}],["path",{"d":"M4 20h.01"}],["path",{"d":"M4 4h.01"}],["path",{"d":"M4 8h.01"}],["path",{"d":"M9.414 13.414a2 2 0 0 0 1.414.586H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 12z"}],["path",{"d":"M9.414 21.414a2 2 0 0 0 1.414.586H19a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 20z"}],["path",{"d":"M9.414 5.414A2 2 0 0 0 10.828 6H19a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-8.172a2 2 0 0 0-1.414.586L8 4z"}]],"timer-off":[["path",{"d":"M10 2h4"}],["path",{"d":"M4.6 11a8 8 0 0 0 1.7 8.7 8 8 0 0 0 8.7 1.7"}],["path",{"d":"M7.4 7.4a8 8 0 0 1 10.3 1 8 8 0 0 1 .9 10.2"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M12 12v-2"}]],"timer-reset":[["path",{"d":"M10 2h4"}],["path",{"d":"M12 14v-4"}],["path",{"d":"M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6"}],["path",{"d":"M9 17H4v5"}]],"timer":[["line",{"x1":"10","x2":"14","y1":"2","y2":"2"}],["line",{"x1":"12","x2":"15","y1":"14","y2":"11"}],["circle",{"cx":"12","cy":"14","r":"8"}]],"toggle-left":[["circle",{"cx":"9","cy":"12","r":"3"}],["rect",{"width":"20","height":"14","x":"2","y":"5","rx":"7"}]],"toggle-right":[["circle",{"cx":"15","cy":"12","r":"3"}],["rect",{"width":"20","height":"14","x":"2","y":"5","rx":"7"}]],"toilet":[["path",{"d":"M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"}],["path",{"d":"M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"}]],"tombstone":[["path",{"d":"M11 10h2"}],["path",{"d":"M19 21V10a7 7 0 00-14 0v11"}],["path",{"d":"M2 21h20"}],["path",{"d":"M9 14h6"}]],"tool-case":[["path",{"d":"M10 15h4"}],["path",{"d":"m14.5 4.058.571-1.429a1 1 0 011.3-.558l5 2a1 1 0 01.549.534.88.88 0 01.01.765l-2.332 5.83"}],["path",{"d":"M15.634 11a2 2 0 00-.186-.34l-1.17-1.757 1.31-1.656a2 2 0 00-2.109-3.165l-2.032.57-1.17-1.758a2 2 0 00-3.664 1.028l-.086 2.11-2.032.568a2 2 0 00-.155 3.8l1.617.6"}],["path",{"d":"M4 12.006A1 1 0 014.994 11H19a1 1 0 011 1v7a2 2 0 01-2 2H6a2 2 0 01-2-2z"}]],"toolbox":[["path",{"d":"M16 12v4"}],["path",{"d":"M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"}],["path",{"d":"M17 6a2 2 0 011.414.586l3 3A2 2 0 0122 11v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 01.586-1.414l3-3A2 2 0 017 6z"}],["path",{"d":"M2 14h20"}],["path",{"d":"M8 12v4"}]],"toothbrush-sparkles":[["path",{"d":"M10 3H8"}],["path",{"d":"M14.586 11.414 22 4"}],["path",{"d":"M15 11a8 8 0 01-.429.4"}],["path",{"d":"m2 22 7-7c1.857-1.857 3.714-1.99 5.571-3.6l-1.985-1.986A2 2 0 0114 6a2 2 0 012-2 2 2 0 013.262-1.552l2.152 2.138"}],["path",{"d":"M20 15v4"}],["path",{"d":"M22 17h-4"}],["path",{"d":"M4 5v4"}],["path",{"d":"M6 7H2"}],["path",{"d":"M9 2v2"}]],"toothbrush":[["path",{"d":"M15 11c-2 2-4 2-6 4l-7 7"}],["path",{"d":"m22 4-7.414 7.414-2-2A2 2 0 0114 6c0-.512.196-1.024.586-1.414A2 2 0 0116 4a2 2 0 013.262-1.552l2.152 2.138"}]],"tornado":[["path",{"d":"M21 4H3"}],["path",{"d":"M18 8H6"}],["path",{"d":"M19 12H9"}],["path",{"d":"M16 16h-6"}],["path",{"d":"M11 20H9"}]],"torus":[["ellipse",{"cx":"12","cy":"11","rx":"3","ry":"2"}],["ellipse",{"cx":"12","cy":"12.5","rx":"10","ry":"8.5"}]],"touchpad-off":[["path",{"d":"M12 20v-6"}],["path",{"d":"M19.656 14H22"}],["path",{"d":"M2 14h12"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2"}],["path",{"d":"M9.656 4H20a2 2 0 0 1 2 2v10.344"}]],"touchpad":[["rect",{"width":"20","height":"16","x":"2","y":"4","rx":"2"}],["path",{"d":"M2 14h20"}],["path",{"d":"M12 20v-6"}]],"towel-rack":[["path",{"d":"M22 7h-2"}],["path",{"d":"M6.5 3h11A2.5 2.5 0 0 1 20 5.5V20a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V5.5a1 1 0 0 0-5 0V17a1 1 0 0 0 1 1h4"}],["path",{"d":"M9 7H2"}]],"tower-control":[["path",{"d":"M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z"}],["path",{"d":"M8 13v9"}],["path",{"d":"M16 22v-9"}],["path",{"d":"m9 6 1 7"}],["path",{"d":"m15 6-1 7"}],["path",{"d":"M12 6V2"}],["path",{"d":"M13 2h-2"}]],"toy-brick":[["rect",{"width":"18","height":"12","x":"3","y":"8","rx":"1"}],["path",{"d":"M10 8V5c0-.6-.4-1-1-1H6a1 1 0 0 0-1 1v3"}],["path",{"d":"M19 8V5c0-.6-.4-1-1-1h-3a1 1 0 0 0-1 1v3"}]],"tractor":[["path",{"d":"m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20"}],["path",{"d":"M16 18h-5"}],["path",{"d":"M18 5a1 1 0 0 0-1 1v5.573"}],["path",{"d":"M3 4h8.129a1 1 0 0 1 .99.863L13 11.246"}],["path",{"d":"M4 11V4"}],["path",{"d":"M7 15h.01"}],["path",{"d":"M8 10.1V4"}],["circle",{"cx":"18","cy":"18","r":"2"}],["circle",{"cx":"7","cy":"15","r":"5"}]],"traffic-cone":[["path",{"d":"M16.05 10.966a5 2.5 0 0 1-8.1 0"}],["path",{"d":"m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04"}],["path",{"d":"M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z"}],["path",{"d":"M9.194 6.57a5 2.5 0 0 0 5.61 0"}]],"trailer":[["path",{"d":"M10 11.341V10"}],["path",{"d":"M14 13v-3"}],["path",{"d":"M18 17V8a2 2 0 00-2-2H4a2 2 0 00-2 2v7a2 2 0 002 2h2"}],["path",{"d":"M22 15v1a1 1 0 01-1 1H10"}],["path",{"d":"M6 11.341V10"}],["circle",{"cx":"8","cy":"17","r":"2"}]],"train-front-tunnel":[["path",{"d":"M2 22V12a10 10 0 1 1 20 0v10"}],["path",{"d":"M15 6.8v1.4a3 2.8 0 1 1-6 0V6.8"}],["path",{"d":"M10 15h.01"}],["path",{"d":"M14 15h.01"}],["path",{"d":"M10 19a4 4 0 0 1-4-4v-3a6 6 0 1 1 12 0v3a4 4 0 0 1-4 4Z"}],["path",{"d":"m9 19-2 3"}],["path",{"d":"m15 19 2 3"}]],"train-front":[["path",{"d":"M8 3.1V7a4 4 0 0 0 8 0V3.1"}],["path",{"d":"m9 15-1-1"}],["path",{"d":"m15 15 1-1"}],["path",{"d":"M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"}],["path",{"d":"m8 19-2 3"}],["path",{"d":"m16 19 2 3"}]],"train-track":[["path",{"d":"M2 17 17 2"}],["path",{"d":"m2 14 8 8"}],["path",{"d":"m5 11 8 8"}],["path",{"d":"m8 8 8 8"}],["path",{"d":"m11 5 8 8"}],["path",{"d":"m14 2 8 8"}],["path",{"d":"M7 22 22 7"}]],"tram-front":[["rect",{"width":"16","height":"16","x":"4","y":"3","rx":"2"}],["path",{"d":"M4 11h16"}],["path",{"d":"M12 3v8"}],["path",{"d":"m8 19-2 3"}],["path",{"d":"m18 22-2-3"}],["path",{"d":"M8 15h.01"}],["path",{"d":"M16 15h.01"}]],"transgender":[["path",{"d":"M12 16v6"}],["path",{"d":"M14 20h-4"}],["path",{"d":"M18 2h4v4"}],["path",{"d":"m2 2 7.17 7.17"}],["path",{"d":"M2 5.355V2h3.357"}],["path",{"d":"m22 2-7.17 7.17"}],["path",{"d":"M8 5 5 8"}],["circle",{"cx":"12","cy":"12","r":"4"}]],"trash-off":[["path",{"d":"M10 11v6"}],["path",{"d":"M14 17v-3"}],["path",{"d":"M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-1.576.768"}],["path",{"d":"M19 6v7.344"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M21 6h-9.344"}],["path",{"d":"M3 6h3"}],["path",{"d":"M5 6v14a2 2 0 002 2h10a2 2 0 002-2v-1"}]],"trash":[["path",{"d":"M10 11v6"}],["path",{"d":"M14 11v6"}],["path",{"d":"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{"d":"M3 6h18"}],["path",{"d":"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]],"tree-deciduous":[["path",{"d":"M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z"}],["path",{"d":"M12 19v3"}]],"tree-palm":[["path",{"d":"M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4"}],["path",{"d":"M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3"}],["path",{"d":"M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35"}],["path",{"d":"M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"}]],"tree-pine":[["path",{"d":"m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"}],["path",{"d":"M12 22v-3"}]],"trees":[["path",{"d":"M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"}],["path",{"d":"M7 16v6"}],["path",{"d":"M13 19v3"}],["path",{"d":"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"}]],"trending-down":[["path",{"d":"M16 17h6v-6"}],["path",{"d":"m22 17-8.5-8.5-5 5L2 7"}]],"trending-up-down":[["path",{"d":"M14.828 14.828 21 21"}],["path",{"d":"M21 16v5h-5"}],["path",{"d":"m21 3-9 9-4-4-6 6"}],["path",{"d":"M21 8V3h-5"}]],"trending-up":[["path",{"d":"M16 7h6v6"}],["path",{"d":"m22 7-8.5 8.5-5-5L2 17"}]],"triangle-dashed":[["path",{"d":"M10.17 4.193a2 2 0 0 1 3.666.013"}],["path",{"d":"M14 21h2"}],["path",{"d":"m15.874 7.743 1 1.732"}],["path",{"d":"m18.849 12.952 1 1.732"}],["path",{"d":"M21.824 18.18a2 2 0 0 1-1.835 2.824"}],["path",{"d":"M4.024 21a2 2 0 0 1-1.839-2.839"}],["path",{"d":"m5.136 12.952-1 1.732"}],["path",{"d":"M8 21h2"}],["path",{"d":"m8.102 7.743-1 1.732"}]],"triangle-exclamation-point":[["path",{"d":"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{"d":"M12 9v4"}],["path",{"d":"M12 17h.01"}]],"triangle-right":[["path",{"d":"M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z"}]],"triangle":[["path",{"d":"M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"}]],"trophy":[["path",{"d":"M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2"}],["path",{"d":"M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2"}],["path",{"d":"M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3"}],["path",{"d":"M4 22h16"}],["path",{"d":"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"}],["path",{"d":"M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3"}]],"truck-electric":[["path",{"d":"M14 19V7a2 2 0 0 0-2-2H9"}],["path",{"d":"M15 19H9"}],["path",{"d":"M19 19h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62L18.3 9.38a1 1 0 0 0-.78-.38H14"}],["path",{"d":"M2 13v5a1 1 0 0 0 1 1h2"}],["path",{"d":"M4 3 2.15 5.15a.495.495 0 0 0 .35.86h2.15a.47.47 0 0 1 .35.86L3 9.02"}],["circle",{"cx":"17","cy":"19","r":"2"}],["circle",{"cx":"7","cy":"19","r":"2"}]],"truck":[["path",{"d":"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"}],["path",{"d":"M15 18H9"}],["path",{"d":"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"}],["circle",{"cx":"17","cy":"18","r":"2"}],["circle",{"cx":"7","cy":"18","r":"2"}]],"tube-lotion":[["path",{"d":"M15 18v3a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-3"}],["path",{"d":"M17 2a2 2 0 0 1 1.6 3.2A8 8 0 0 0 17 10v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-6a8 8 0 0 0-1.6-4.8A2 2 0 0 1 7 2z"}],["path",{"d":"M7 10a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"}]],"turkish-lira":[["path",{"d":"m14 10-8 4"}],["path",{"d":"M14 5 6 9"}],["path",{"d":"M18 12a8 8 0 01-7.003 7.937c-.547.07-.997-.385-.997-.937V4"}]],"turntable":[["path",{"d":"M10 12.01h.01"}],["path",{"d":"M18 8v4a8 8 0 0 1-1.07 4"}],["circle",{"cx":"10","cy":"12","r":"4"}],["rect",{"x":"2","y":"4","width":"20","height":"16","rx":"2"}]],"turtle":[["path",{"d":"m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z"}],["path",{"d":"M4.82 7.9 8 10"}],["path",{"d":"M15.18 7.9 12 10"}],["path",{"d":"M16.93 10H20a2 2 0 0 1 0 4H2"}]],"tv-minimal-play":[["path",{"d":"M15.033 9.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56V7.648a.645.645 0 0 1 .967-.56z"}],["path",{"d":"M7 21h10"}],["rect",{"width":"20","height":"14","x":"2","y":"3","rx":"2"}]],"tv-minimal":[["path",{"d":"M7 21h10"}],["rect",{"width":"20","height":"14","x":"2","y":"3","rx":"2"}]],"tv":[["path",{"d":"m17 2-5 5-5-5"}],["rect",{"width":"20","height":"15","x":"2","y":"7","rx":"2"}]],"type-outline":[["path",{"d":"M14 16.5a.5.5 0 0 0 .5.5h.5a2 2 0 0 1 0 4H9a2 2 0 0 1 0-4h.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V8a2 2 0 0 1-4 0V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3a2 2 0 0 1-4 0v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5Z"}]],"type":[["path",{"d":"M12 4v16"}],["path",{"d":"M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"}],["path",{"d":"M9 20h6"}]],"umbrella-off":[["path",{"d":"M12 13v7a2 2 0 0 0 4 0"}],["path",{"d":"M12 2v2"}],["path",{"d":"M18.656 13h2.336a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-12.07-7.51"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M5.961 5.957a10.28 10.28 0 0 0-3.922 5.769A1 1 0 0 0 3 13h10"}]],"umbrella":[["path",{"d":"M12 13v7a2 2 0 0 0 4 0"}],["path",{"d":"M12 2v2"}],["path",{"d":"M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z"}]],"underline":[["path",{"d":"M6 4v6a6 6 0 0 0 12 0V4"}],["line",{"x1":"4","x2":"20","y1":"20","y2":"20"}]],"undo-2":[["path",{"d":"M9 14 4 9l5-5"}],["path",{"d":"M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"}]],"undo-dot":[["path",{"d":"M21 17a9 9 0 0 0-15-6.7L3 13"}],["path",{"d":"M3 7v6h6"}],["circle",{"cx":"12","cy":"17","r":"1"}]],"undo":[["path",{"d":"M3 7v6h6"}],["path",{"d":"M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"}]],"ungroup":[["rect",{"x":"11","y":"14","width":"10","height":"7","rx":"2"}],["rect",{"x":"3","y":"3","width":"10","height":"7","rx":"2"}]],"university":[["path",{"d":"M14 21v-3a2 2 0 0 0-4 0v3"}],["path",{"d":"M18 12h.01"}],["path",{"d":"M18 16h.01"}],["path",{"d":"M22 7a1 1 0 0 0-1-1h-2a2 2 0 0 1-1.143-.359L13.143 2.36a2 2 0 0 0-2.286-.001L6.143 5.64A2 2 0 0 1 5 6H3a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z"}],["path",{"d":"M6 12h.01"}],["path",{"d":"M6 16h.01"}],["circle",{"cx":"12","cy":"10","r":"2"}]],"unlink-2":[["path",{"d":"M15 7h2a5 5 0 0 1 0 10h-2m-6 0H7A5 5 0 0 1 7 7h2"}]],"unlink":[["path",{"d":"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"}],["path",{"d":"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"}],["line",{"x1":"8","x2":"8","y1":"2","y2":"5"}],["line",{"x1":"2","x2":"5","y1":"8","y2":"8"}],["line",{"x1":"16","x2":"16","y1":"19","y2":"22"}],["line",{"x1":"19","x2":"22","y1":"16","y2":"16"}]],"unplug":[["path",{"d":"m19 5 3-3"}],["path",{"d":"m2 22 3-3"}],["path",{"d":"M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"}],["path",{"d":"M7.5 13.5 10 11"}],["path",{"d":"M10.5 16.5 13 14"}],["path",{"d":"m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"}]],"upload":[["path",{"d":"M12 3v12"}],["path",{"d":"m17 8-5-5-5 5"}],["path",{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]],"usb-c-port":[["path",{"d":"M6 12h12"}],["rect",{"x":"2","y":"8","width":"20","height":"8","rx":"4"}]],"usb":[["circle",{"cx":"10","cy":"7","r":"1"}],["circle",{"cx":"4","cy":"20","r":"1"}],["path",{"d":"M4.7 19.3 19 5"}],["path",{"d":"m21 3-3 1 2 2Z"}],["path",{"d":"M9.26 7.68 5 12l2 5"}],["path",{"d":"m10 14 5 2 3.5-3.5"}],["path",{"d":"m18 12 1-1 1 1-1 1Z"}]],"user-check":[["path",{"d":"m16 11 2 2 4-4"}],["path",{"d":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{"cx":"9","cy":"7","r":"4"}]],"user-cog":[["path",{"d":"M10 15H6a4 4 0 0 0-4 4v2"}],["path",{"d":"m14.305 16.53.923-.382"}],["path",{"d":"m15.228 13.852-.923-.383"}],["path",{"d":"m16.852 12.228-.383-.923"}],["path",{"d":"m16.852 17.772-.383.924"}],["path",{"d":"m19.148 12.228.383-.923"}],["path",{"d":"m19.53 18.696-.382-.924"}],["path",{"d":"m20.772 13.852.924-.383"}],["path",{"d":"m20.772 16.148.924.383"}],["circle",{"cx":"18","cy":"15","r":"3"}],["circle",{"cx":"9","cy":"7","r":"4"}]],"user-exclamation-point":[["path",{"d":"M15 15H9a4 4 0 00-4 4v2"}],["path",{"d":"M18.988 13v4"}],["path",{"d":"M18.988 21h.01"}],["circle",{"cx":"12","cy":"7","r":"4"}]],"user-group":[["path",{"d":"M17 21v-1a2 2 0 00-2-2H9a2 2 0 00-2 2v1"}],["path",{"d":"M19 10h1a2 2 0 012 2v1"}],["path",{"d":"M5 10H4a2 2 0 00-2 2v1"}],["circle",{"cx":"12","cy":"11","r":"3"}],["circle",{"cx":"18","cy":"4","r":"2"}],["circle",{"cx":"6","cy":"4","r":"2"}]],"user-key":[["path",{"d":"M20 11v6"}],["path",{"d":"M20 13h2"}],["path",{"d":"M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 2.072.578"}],["circle",{"cx":"10","cy":"7","r":"4"}],["circle",{"cx":"20","cy":"19","r":"2"}]],"user-lock":[["path",{"d":"M19 16v-2a2 2 0 0 0-4 0v2"}],["path",{"d":"M9.5 15H7a4 4 0 0 0-4 4v2"}],["circle",{"cx":"10","cy":"7","r":"4"}],["rect",{"x":"13","y":"16","width":"8","height":"5","rx":".899"}]],"user-minus":[["path",{"d":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{"cx":"9","cy":"7","r":"4"}],["line",{"x1":"22","x2":"16","y1":"11","y2":"11"}]],"user-pen":[["path",{"d":"M11.5 15H7a4 4 0 0 0-4 4v2"}],["path",{"d":"M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"}],["circle",{"cx":"10","cy":"7","r":"4"}]],"user-plus":[["path",{"d":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{"cx":"9","cy":"7","r":"4"}],["line",{"x1":"19","x2":"19","y1":"8","y2":"14"}],["line",{"x1":"22","x2":"16","y1":"11","y2":"11"}]],"user-round-arrow-left":[["path",{"d":"m19 16-3 3"}],["path",{"d":"M2 21a8 8 0 0 1 12.664-6.5"}],["path",{"d":"M22 19h-6l3 3"}],["circle",{"cx":"10","cy":"8","r":"5"}]],"user-round-check":[["path",{"d":"M2 21a8 8 0 0 1 13.292-6"}],["circle",{"cx":"10","cy":"8","r":"5"}],["path",{"d":"m16 19 2 2 4-4"}]],"user-round-cog":[["path",{"d":"m14.305 19.53.923-.382"}],["path",{"d":"m15.228 16.852-.923-.383"}],["path",{"d":"m16.852 15.228-.383-.923"}],["path",{"d":"m16.852 20.772-.383.924"}],["path",{"d":"m19.148 15.228.383-.923"}],["path",{"d":"m19.53 21.696-.382-.924"}],["path",{"d":"M2 21a8 8 0 0 1 10.434-7.62"}],["path",{"d":"m20.772 16.852.924-.383"}],["path",{"d":"m20.772 19.148.924.383"}],["circle",{"cx":"10","cy":"8","r":"5"}],["circle",{"cx":"18","cy":"18","r":"3"}]],"user-round-exclamation-point":[["path",{"d":"M19.99 13v4"}],["path",{"d":"M19.99 21H20"}],["path",{"d":"M4 21a8 8 0 0111.99-6.934"}],["circle",{"cx":"12","cy":"8","r":"5"}]],"user-round-group":[["path",{"d":"M17 21a5 5 0 00-10 0"}],["path",{"d":"M22 10.5a3.5 3.5 0 00-5.507-2.868"}],["path",{"d":"M7.507 7.632A3.5 3.5 0 002 10.5"}],["circle",{"cx":"12","cy":"13","r":"3"}],["circle",{"cx":"18.5","cy":"4.5","r":"2.5"}],["circle",{"cx":"5.5","cy":"4.5","r":"2.5"}]],"user-round-key":[["path",{"d":"M19 11v6"}],["path",{"d":"M19 13h2"}],["path",{"d":"M2 21a8 8 0 0 1 12.868-6.349"}],["circle",{"cx":"10","cy":"8","r":"5"}],["circle",{"cx":"19","cy":"19","r":"2"}]],"user-round-minus":[["path",{"d":"M2 21a8 8 0 0 1 13.292-6"}],["circle",{"cx":"10","cy":"8","r":"5"}],["path",{"d":"M22 19h-6"}]],"user-round-pen":[["path",{"d":"M2 21a8 8 0 0 1 10.821-7.487"}],["path",{"d":"M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"}],["circle",{"cx":"10","cy":"8","r":"5"}]],"user-round-plus":[["path",{"d":"M2 21a8 8 0 0 1 13.292-6"}],["circle",{"cx":"10","cy":"8","r":"5"}],["path",{"d":"M19 16v6"}],["path",{"d":"M22 19h-6"}]],"user-round-search":[["circle",{"cx":"10","cy":"8","r":"5"}],["path",{"d":"M2 21a8 8 0 0 1 10.434-7.62"}],["circle",{"cx":"18","cy":"18","r":"3"}],["path",{"d":"m22 22-1.9-1.9"}]],"user-round-shield":[["path",{"d":"M2 21a8 8 0 0 1 8-8 5 5 0 1 1 4.845-3.759"}],["path",{"d":"M22 17.5c0 2.5-1.75 3.75-3.83 4.474a.5.5 0 0 1-.335-.005C15.75 21.25 14 20 14 17.5V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z"}]],"user-round-star":[["path",{"d":"M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"}],["path",{"d":"M2 21a8 8 0 0 1 6.778-7.905"}],["path",{"d":"M8.927 12.885a5 5 0 1 1 6.061-4.535"}]],"user-round-x":[["path",{"d":"m16.5 16.5 5 5"}],["path",{"d":"M2 21a8 8 0 0 1 11.531-7.18"}],["path",{"d":"m21.5 16.5-5 5"}],["circle",{"cx":"10","cy":"8","r":"5"}]],"user-round":[["circle",{"cx":"12","cy":"8","r":"5"}],["path",{"d":"M20 21a8 8 0 0 0-16 0"}]],"user-search":[["circle",{"cx":"10","cy":"7","r":"4"}],["path",{"d":"M10.3 15H7a4 4 0 0 0-4 4v2"}],["circle",{"cx":"17","cy":"17","r":"3"}],["path",{"d":"m21 21-1.9-1.9"}]],"user-shield":[["path",{"d":"M10 15H6a4 4 0 0 0-4 4v2"}],["path",{"d":"M22 17.5c0 2.499-1.75 3.749-3.83 4.474a.5.5 0 0 1-.335-.005c-2.085-.72-3.835-1.97-3.835-4.47V14a.5.5 0 0 1 .5-.499c1 0 2.25-.6 3.12-1.36a.6.6 0 0 1 .76-.001c.875.765 2.12 1.36 3.12 1.36a.5.5 0 0 1 .5.5z"}],["circle",{"cx":"9","cy":"7","r":"4"}]],"user-star":[["path",{"d":"M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"}],["path",{"d":"M8 15H7a4 4 0 0 0-4 4v2"}],["circle",{"cx":"10","cy":"7","r":"4"}]],"user-x":[["path",{"d":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{"cx":"9","cy":"7","r":"4"}],["line",{"x1":"17","x2":"22","y1":"8","y2":"13"}],["line",{"x1":"22","x2":"17","y1":"8","y2":"13"}]],"user":[["path",{"d":"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{"cx":"12","cy":"7","r":"4"}]],"users-collaboration":[["path",{"d":"M12.925 3.047a9 9 0 017.616 6.11"}],["path",{"d":"M13 22a2 2 0 012-2h4a2 2 0 012 2"}],["path",{"d":"M3 12a2 2 0 012-2h4a2 2 0 012 2"}],["path",{"d":"M3.889 15.9a9 9 0 005.247 4.632"}],["circle",{"cx":"17","cy":"14","r":"2"}],["circle",{"cx":"7","cy":"4","r":"2"}]],"users-round-collaboration":[["path",{"d":"M20.453 8.911a9 9 0 00-6.696-5.738"}],["path",{"d":"M21 22a4 4 0 00-8 0"}],["path",{"d":"M3 12a4 4 0 017.963-.543"}],["path",{"d":"M3.889 15.9a9 9 0 005.247 4.632"}],["circle",{"cx":"17","cy":"15","r":"3"}],["circle",{"cx":"7","cy":"5","r":"3"}]],"users-round":[["path",{"d":"M18 21a8 8 0 0 0-16 0"}],["circle",{"cx":"10","cy":"8","r":"5"}],["path",{"d":"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"}]],"users":[["path",{"d":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{"d":"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{"d":"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{"cx":"9","cy":"7","r":"4"}]],"utensils-crossed":[["path",{"d":"m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"}],["path",{"d":"M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"}],["path",{"d":"m2.1 21.8 6.4-6.3"}],["path",{"d":"m19 5-7 7"}]],"utensils":[["path",{"d":"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"}],["path",{"d":"M7 2v20"}],["path",{"d":"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"}]],"utility-pole":[["path",{"d":"M12 2v20"}],["path",{"d":"M2 5h20"}],["path",{"d":"M3 3v2"}],["path",{"d":"M7 3v2"}],["path",{"d":"M17 3v2"}],["path",{"d":"M21 3v2"}],["path",{"d":"m19 5-7 7-7-7"}]],"van":[["path",{"d":"M13 6v5a1 1 0 0 0 1 1h6.102a1 1 0 0 1 .712.298l.898.91a1 1 0 0 1 .288.702V17a1 1 0 0 1-1 1h-3"}],["path",{"d":"M5 18H3a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2h12c1.1 0 2.1.8 2.4 1.8l1.176 4.2"}],["path",{"d":"M9 18h5"}],["circle",{"cx":"16","cy":"18","r":"2"}],["circle",{"cx":"7","cy":"18","r":"2"}]],"variable":[["path",{"d":"M8 21s-4-3-4-9 4-9 4-9"}],["path",{"d":"M16 3s4 3 4 9-4 9-4 9"}],["line",{"x1":"15","x2":"9","y1":"9","y2":"15"}],["line",{"x1":"9","x2":"15","y1":"9","y2":"15"}]],"vault":[["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2"}],["circle",{"cx":"7.5","cy":"7.5","r":".5","fill":"currentColor"}],["path",{"d":"m7.9 7.9 2.7 2.7"}],["circle",{"cx":"16.5","cy":"7.5","r":".5","fill":"currentColor"}],["path",{"d":"m13.4 10.6 2.7-2.7"}],["circle",{"cx":"7.5","cy":"16.5","r":".5","fill":"currentColor"}],["path",{"d":"m7.9 16.1 2.7-2.7"}],["circle",{"cx":"16.5","cy":"16.5","r":".5","fill":"currentColor"}],["path",{"d":"m13.4 13.4 2.7 2.7"}],["circle",{"cx":"12","cy":"12","r":"2"}]],"vector-polygon":[["path",{"d":"m12.828 4.813 5.344 2.375"}],["path",{"d":"m15.769 18.153 3.461-8.306"}],["path",{"d":"m5.687 14.074 7.625 4.852"}],["path",{"d":"M9.772 5.579 5.228 11.42"}],["circle",{"cx":"11","cy":"4","r":"2"}],["circle",{"cx":"15","cy":"20","r":"2"}],["circle",{"cx":"20","cy":"8","r":"2"}],["circle",{"cx":"4","cy":"13","r":"2"}]],"vector-square":[["path",{"d":"M17.055 4.533a24 24 0 00-10.11 0"}],["path",{"d":"M19.467 17.055a24 24 0 000-10.11"}],["path",{"d":"M4.533 6.945a24 24 0 000 10.11"}],["path",{"d":"M6.945 19.467a24 24 0 0010.11 0"}],["circle",{"cx":"19","cy":"19","r":"2"}],["circle",{"cx":"19","cy":"5","r":"2"}],["circle",{"cx":"5","cy":"19","r":"2"}],["circle",{"cx":"5","cy":"5","r":"2"}]],"vegan":[["path",{"d":"M16 8q6 0 6-6-6 0-6 6"}],["path",{"d":"M17.41 3.59a10 10 0 1 0 3 3"}],["path",{"d":"M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14"}]],"venetian-mask":[["path",{"d":"M18 11c-1.5 0-2.5.5-3 2"}],["path",{"d":"M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z"}],["path",{"d":"M6 11c1.5 0 2.5.5 3 2"}]],"venus-and-mars":[["path",{"d":"M10 20h4"}],["path",{"d":"M12 16v6"}],["path",{"d":"M17 2h4v4"}],["path",{"d":"m21 2-5.46 5.46"}],["circle",{"cx":"12","cy":"11","r":"5"}]],"venus":[["path",{"d":"M12 15v7"}],["path",{"d":"M9 19h6"}],["circle",{"cx":"12","cy":"9","r":"6"}]],"vibrate-off":[["path",{"d":"m2 8 2 2-2 2 2 2-2 2"}],["path",{"d":"m22 8-2 2 2 2-2 2 2 2"}],["path",{"d":"M8 8v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2"}],["path",{"d":"M16 10.34V6c0-.55-.45-1-1-1h-4.34"}],["line",{"x1":"2","x2":"22","y1":"2","y2":"22"}]],"vibrate":[["path",{"d":"m2 8 2 2-2 2 2 2-2 2"}],["path",{"d":"m22 8-2 2 2 2-2 2 2 2"}],["rect",{"width":"8","height":"14","x":"8","y":"5","rx":"1"}]],"video-off":[["path",{"d":"M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196"}],["path",{"d":"M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"}],["path",{"d":"m2 2 20 20"}]],"video":[["path",{"d":"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"}],["rect",{"x":"2","y":"6","width":"14","height":"12","rx":"2"}]],"videotape":[["rect",{"width":"20","height":"16","x":"2","y":"4","rx":"2"}],["path",{"d":"M2 8h20"}],["circle",{"cx":"8","cy":"14","r":"2"}],["path",{"d":"M8 12h8"}],["circle",{"cx":"16","cy":"14","r":"2"}]],"view":[["path",{"d":"M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"}],["path",{"d":"M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"}],["circle",{"cx":"12","cy":"12","r":"1"}],["path",{"d":"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0"}]],"virus-off":[["path",{"d":"M10.01 10h.01"}],["path",{"d":"M12 14.991h.01"}],["path",{"d":"M12 22v-3"}],["path",{"d":"M12 2v3"}],["path",{"d":"M13 22h-2"}],["path",{"d":"M13 2h-2"}],["path",{"d":"m16.5 19.794-1-1.733"}],["path",{"d":"m16.5 4.205-1 1.732"}],["path",{"d":"M18.891 13.235a7 7 0 00-8.126-8.126"}],["path",{"d":"m19.794 7.5-1.732 1"}],["path",{"d":"M2 12h3"}],["path",{"d":"M2 13v-2"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M22 12h-3"}],["path",{"d":"M22 13v-2"}],["path",{"d":"m4.206 16.5 1.732-1"}],["path",{"d":"m4.206 7.5 1.732 1"}],["path",{"d":"M7.05 7.05a7 7 0 009.9 9.9"}],["path",{"d":"m7.5 19.794 1-1.733"}],["path",{"d":"M9 12h.01"}]],"virus":[["path",{"d":"M12 14.991h.01"}],["path",{"d":"M12 22v-3"}],["path",{"d":"M12 2v3"}],["path",{"d":"M13 22h-2"}],["path",{"d":"M13 2h-2"}],["path",{"d":"M13.99 10H14"}],["path",{"d":"m16.5 19.794-1-1.733"}],["path",{"d":"m16.5 4.205-1 1.732"}],["path",{"d":"m19.794 16.5-1.732-1"}],["path",{"d":"m19.794 7.5-1.732 1"}],["path",{"d":"M2 12h3"}],["path",{"d":"M2 13v-2"}],["path",{"d":"M22 12h-3"}],["path",{"d":"M22 13v-2"}],["path",{"d":"m4.206 16.5 1.732-1"}],["path",{"d":"m4.206 7.5 1.732 1"}],["path",{"d":"m7.5 19.794 1-1.733"}],["path",{"d":"m7.5 4.205 1 1.732"}],["path",{"d":"M9 12h.01"}],["circle",{"cx":"12","cy":"12","r":"7"}]],"voicemail":[["circle",{"cx":"6","cy":"12","r":"4"}],["circle",{"cx":"18","cy":"12","r":"4"}],["line",{"x1":"6","x2":"18","y1":"16","y2":"16"}]],"volleyball":[["path",{"d":"M11 7a16 16 20 0 1 10.98 4.362"}],["path",{"d":"M12 12a13 13 0 0 1-8.66 5"}],["path",{"d":"M16.83 13.634a16 16 0 0 1-9.267 7.328"}],["path",{"d":"M20.66 17A13 13 0 0 0 12 12a13 13 0 0 1 0-10"}],["path",{"d":"M8.17 15.366a16 16 0 0 1-1.713-11.69"}],["circle",{"cx":"12","cy":"12","r":"10"}]],"volume-1":[["path",{"d":"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{"d":"M16 9a5 5 0 0 1 0 6"}]],"volume-2":[["path",{"d":"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{"d":"M16 9a5 5 0 0 1 0 6"}],["path",{"d":"M19.364 18.364a9 9 0 0 0 0-12.728"}]],"volume-off":[["path",{"d":"M16 9a5 5 0 0 1 .95 2.293"}],["path",{"d":"M19.364 5.636a9 9 0 0 1 1.889 9.96"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"}],["path",{"d":"M9.828 4.172A.686.686 0 0 1 11 4.657v.686"}]],"volume-x":[["path",{"d":"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"}],["path",{"d":"m16.5 14.5 5-5"}],["path",{"d":"m16.5 9.5 5 5"}]],"volume":[["path",{"d":"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}]],"vote":[["path",{"d":"m9 12 2 2 4-4"}],["path",{"d":"M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"}],["path",{"d":"M22 19H2"}]],"wallet-cards":[["path",{"d":"M3 11h3.75a2 2 0 0 1 1.6.8l.45.6a4 4 0 0 0 6.4 0l.45-.6a2 2 0 0 1 1.6-.8H21"}],["path",{"d":"M3 7h18"}],["rect",{"x":"3","y":"3","width":"18","height":"18","rx":"2"}]],"wallet-minimal":[["path",{"d":"M17 14h.01"}],["path",{"d":"M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"}]],"wallet":[["path",{"d":"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"}],["path",{"d":"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"}]],"wallpaper":[["path",{"d":"M12 17v4"}],["path",{"d":"M8 21h8"}],["path",{"d":"m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15"}],["circle",{"cx":"8","cy":"9","r":"2"}],["rect",{"x":"2","y":"3","width":"20","height":"14","rx":"2"}]],"wand-sparkles":[["path",{"d":"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"}],["path",{"d":"m14 7 3 3"}],["path",{"d":"M5 6v4"}],["path",{"d":"M19 14v4"}],["path",{"d":"M10 2v2"}],["path",{"d":"M7 8H3"}],["path",{"d":"M21 16h-4"}],["path",{"d":"M11 3H9"}]],"wand":[["path",{"d":"M15 4V2"}],["path",{"d":"M15 16v-2"}],["path",{"d":"M8 9h2"}],["path",{"d":"M20 9h2"}],["path",{"d":"M17.8 11.8 19 13"}],["path",{"d":"M15 9h.01"}],["path",{"d":"M17.8 6.2 19 5"}],["path",{"d":"m3 21 9-9"}],["path",{"d":"M12.2 6.2 11 5"}]],"warehouse-waves":[["path",{"d":"M2 11V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8v3"}],["path",{"d":"M6 11v-1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"}],["path",{"d":"M2 16q2.5 2 5 0t5 0 5 0 5 0"}],["path",{"d":"M2 21q2.5 2 5 0t5 0 5 0 5 0"}]],"warehouse":[["path",{"d":"M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11"}],["path",{"d":"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z"}],["path",{"d":"M6 13h12"}],["path",{"d":"M6 17h12"}]],"washing-machine":[["path",{"d":"M3 6h3"}],["path",{"d":"M17 6h.01"}],["rect",{"width":"18","height":"20","x":"3","y":"2","rx":"2"}],["circle",{"cx":"12","cy":"13","r":"5"}],["path",{"d":"M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5"}]],"watch":[["path",{"d":"M12 10v2.2l1.6 1"}],["path",{"d":"m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05"}],["path",{"d":"m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05"}],["circle",{"cx":"12","cy":"12","r":"6"}]],"waves-arrow-down":[["path",{"d":"M12 10L12 2"}],["path",{"d":"M16 6L12 10L8 6"}],["path",{"d":"M2 15C2.6 15.5 3.2 16 4.5 16C7 16 7 14 9.5 14C12.1 14 11.9 16 14.5 16C17 16 17 14 19.5 14C20.8 14 21.4 14.5 22 15"}],["path",{"d":"M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C12.1 20 11.9 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21"}]],"waves-arrow-up":[["path",{"d":"M12 2v8"}],["path",{"d":"M2 15c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{"d":"M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{"d":"m8 6 4-4 4 4"}]],"waves-horizontal":[["path",{"d":"M2 12q2.5 2 5 0t5 0 5 0 5 0"}],["path",{"d":"M2 19q2.5 2 5 0t5 0 5 0 5 0"}],["path",{"d":"M2 5q2.5 2 5 0t5 0 5 0 5 0"}]],"waves-ladder":[["path",{"d":"M19 5a2 2 0 0 0-2 2v11"}],["path",{"d":"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"}],["path",{"d":"M7 13h10"}],["path",{"d":"M7 9h10"}],["path",{"d":"M9 5a2 2 0 0 0-2 2v11"}]],"waves-vertical":[["path",{"d":"M12 2q2 2.5 0 5t0 5 0 5 0 5"}],["path",{"d":"M19 2q2 2.5 0 5t0 5 0 5 0 5"}],["path",{"d":"M5 2q2 2.5 0 5t0 5 0 5 0 5"}]],"waypoints":[["path",{"d":"m10.586 5.414-5.172 5.172"}],["path",{"d":"m18.586 13.414-5.172 5.172"}],["path",{"d":"M6 12h12"}],["circle",{"cx":"12","cy":"20","r":"2"}],["circle",{"cx":"12","cy":"4","r":"2"}],["circle",{"cx":"20","cy":"12","r":"2"}],["circle",{"cx":"4","cy":"12","r":"2"}]],"webcam-off":[["path",{"d":"M12 22v-4"}],["path",{"d":"M12.754 7.096a3 3 0 0 1 2.15 2.15"}],["path",{"d":"M12.863 12.873a3 3 0 0 1-3.736-3.735"}],["path",{"d":"M16.566 16.57A8 8 0 0 1 5.43 5.433"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"M7 22h10"}],["path",{"d":"M8.478 2.817a8 8 0 0 1 10.705 10.705"}]],"webcam":[["circle",{"cx":"12","cy":"10","r":"8"}],["circle",{"cx":"12","cy":"10","r":"3"}],["path",{"d":"M7 22h10"}],["path",{"d":"M12 22v-4"}]],"webhook-off":[["path",{"d":"M17 17h-5c-1.09-.02-1.94.92-2.5 1.9A3 3 0 1 1 2.57 15"}],["path",{"d":"M9 3.4a4 4 0 0 1 6.52.66"}],["path",{"d":"m6 17 3.1-5.8a2.5 2.5 0 0 0 .057-2.05"}],["path",{"d":"M20.3 20.3a4 4 0 0 1-2.3.7"}],["path",{"d":"M18.6 13a4 4 0 0 1 3.357 3.414"}],["path",{"d":"m12 6 .6 1"}],["path",{"d":"m2 2 20 20"}]],"webhook":[["path",{"d":"M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"}],["path",{"d":"m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"}],["path",{"d":"m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"}]],"weight-tilde":[["path",{"d":"M6.5 8a2 2 0 0 0-1.906 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z"}],["path",{"d":"M7.999 15a2.5 2.5 0 0 1 4 0 2.5 2.5 0 0 0 4 0"}],["circle",{"cx":"12","cy":"5","r":"3"}]],"weight":[["circle",{"cx":"12","cy":"5","r":"3"}],["path",{"d":"M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"}]],"wheat-off":[["path",{"d":"m2 22 10-10"}],["path",{"d":"m16 8-1.17 1.17"}],["path",{"d":"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{"d":"m8 8-.53.53a3.5 3.5 0 0 0 0 4.94L9 15l1.53-1.53c.55-.55.88-1.25.98-1.97"}],["path",{"d":"M10.91 5.26c.15-.26.34-.51.56-.73L13 3l1.53 1.53a3.5 3.5 0 0 1 .28 4.62"}],["path",{"d":"M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"}],["path",{"d":"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{"d":"m16 16-.53.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.49 3.49 0 0 1 1.97-.98"}],["path",{"d":"M18.74 13.09c.26-.15.51-.34.73-.56L21 11l-1.53-1.53a3.5 3.5 0 0 0-4.62-.28"}],["line",{"x1":"2","x2":"22","y1":"2","y2":"22"}]],"wheat":[["path",{"d":"M2 22 16 8"}],["path",{"d":"M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{"d":"M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{"d":"M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"}],["path",{"d":"M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z"}],["path",{"d":"M11.47 17.47 13 19l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L5 19l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{"d":"M15.47 13.47 17 15l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L9 15l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}],["path",{"d":"M19.47 9.47 21 11l-1.53 1.53a3.5 3.5 0 0 1-4.94 0L13 11l1.53-1.53a3.5 3.5 0 0 1 4.94 0Z"}]],"whistle":[["path",{"d":"M10 6v4"}],["path",{"d":"M21 6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-5.675A7 7 0 1 1 9 6z"}]],"whole-word":[["circle",{"cx":"7","cy":"12","r":"3"}],["path",{"d":"M10 9v6"}],["circle",{"cx":"17","cy":"12","r":"3"}],["path",{"d":"M14 7v8"}],["path",{"d":"M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"}]],"wifi-cog":[["path",{"d":"m14.305 19.53.923-.382"}],["path",{"d":"m15.228 16.852-.923-.383"}],["path",{"d":"m16.852 15.228-.383-.923"}],["path",{"d":"m16.852 20.772-.383.924"}],["path",{"d":"m19.148 15.228.383-.923"}],["path",{"d":"m19.53 21.696-.382-.924"}],["path",{"d":"M2 8.82a15 15 0 0120 0"}],["path",{"d":"m20.772 16.852.924-.383"}],["path",{"d":"m20.772 19.148.924.383"}],["path",{"d":"M5 12.859a10 10 0 0110.18-2.342"}],["path",{"d":"M8.5 16.429a5 5 0 011.998-1.2"}],["circle",{"cx":"18","cy":"18","r":"3"}]],"wifi-high":[["path",{"d":"M12 20h.01"}],["path",{"d":"M5 12.859a10 10 0 0 1 14 0"}],["path",{"d":"M8.5 16.429a5 5 0 0 1 7 0"}]],"wifi-lock":[["path",{"d":"M2 8.82a15 15 0 0120 0"}],["path",{"d":"M20 16v-2a2 2 0 00-4 0v2"}],["path",{"d":"M5 12.859a10 10 0 018.436-2.756"}],["path",{"d":"M8.5 16.429a5 5 0 011.794-1.13"}],["rect",{"x":"14","y":"16","width":"8","height":"5","rx":"1"}]],"wifi-low":[["path",{"d":"M12 20h.01"}],["path",{"d":"M8.5 16.429a5 5 0 0 1 7 0"}]],"wifi-off":[["path",{"d":"M12 20h.01"}],["path",{"d":"M8.5 16.429a5 5 0 0 1 7 0"}],["path",{"d":"M5 12.859a10 10 0 0 1 5.17-2.69"}],["path",{"d":"M19 12.859a10 10 0 0 0-2.007-1.523"}],["path",{"d":"M2 8.82a15 15 0 0 1 4.177-2.643"}],["path",{"d":"M22 8.82a15 15 0 0 0-11.288-3.764"}],["path",{"d":"m2 2 20 20"}]],"wifi-pen":[["path",{"d":"M2 8.82a15 15 0 0 1 20 0"}],["path",{"d":"M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"}],["path",{"d":"M5 12.859a10 10 0 0 1 10.5-2.222"}],["path",{"d":"M8.5 16.429a5 5 0 0 1 3-1.406"}]],"wifi-sync":[["path",{"d":"M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5"}],["path",{"d":"M11.965 14.105h4"}],["path",{"d":"M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5"}],["path",{"d":"M2 8.82a15 15 0 0 1 20 0"}],["path",{"d":"M21.965 22.105v-4"}],["path",{"d":"M5 12.86a10 10 0 0 1 3-2.032"}],["path",{"d":"M8.5 16.429h.01"}]],"wifi-zero":[["path",{"d":"M12 20h.01"}]],"wifi":[["path",{"d":"M12 20h.01"}],["path",{"d":"M2 8.82a15 15 0 0 1 20 0"}],["path",{"d":"M5 12.859a10 10 0 0 1 14 0"}],["path",{"d":"M8.5 16.429a5 5 0 0 1 7 0"}]],"wind-arrow-down":[["path",{"d":"M10 2v8"}],["path",{"d":"M12.8 21.6A2 2 0 1 0 14 18H2"}],["path",{"d":"M17.5 10a2.5 2.5 0 1 1 2 4H2"}],["path",{"d":"m6 6 4 4 4-4"}]],"wind-arrow-up":[["path",{"d":"M10 2v8"}],["path",{"d":"M12.8 21.6A2 2 0 1 0 14 18H2"}],["path",{"d":"M17.5 10a2.5 2.5 0 1 1 2 4H2"}],["path",{"d":"m6 6 4 -4 4 4"}]],"wind":[["path",{"d":"M12.8 19.6A2 2 0 1 0 14 16H2"}],["path",{"d":"M17.5 8a2.5 2.5 0 1 1 2 4H2"}],["path",{"d":"M9.8 4.4A2 2 0 1 1 11 8H2"}]],"wine-off":[["path",{"d":"M8 22h8"}],["path",{"d":"M7 10h3m7 0h-1.343"}],["path",{"d":"M12 15v7"}],["path",{"d":"M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198"}],["line",{"x1":"2","x2":"22","y1":"2","y2":"22"}]],"wine":[["path",{"d":"M8 22h8"}],["path",{"d":"M7 10h10"}],["path",{"d":"M12 15v7"}],["path",{"d":"M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z"}]],"workflow":[["rect",{"width":"8","height":"8","x":"3","y":"3","rx":"2"}],["path",{"d":"M7 11v4a2 2 0 0 0 2 2h4"}],["rect",{"width":"8","height":"8","x":"13","y":"13","rx":"2"}]],"worm":[["path",{"d":"m19 12-1.5 3"}],["path",{"d":"M19.63 18.81 22 20"}],["path",{"d":"M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z"}]],"wrench-off":[["path",{"d":"M10.747 5.093a6 6 0 0 1 6.841-2.882c.438.12.54.662.219.984L14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-2.882 6.842"}],["path",{"d":"m13.5 13.5-7.88 7.88a1 1 0 0 1-2.999-3l7.88-7.88"}],["path",{"d":"m2 2 20 20"}]],"wrench":[["path",{"d":"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"}]],"x-line-top":[["path",{"d":"M18 4H6"}],["path",{"d":"M18 8 6 20"}],["path",{"d":"m6 8 12 12"}]],"x":[["path",{"d":"M18 6 6 18"}],["path",{"d":"m6 6 12 12"}]],"zap-off":[["path",{"d":"M10.768 5.111 13.44 2.44a1.5 1.5 0 012.474 1.561l-1.633 4.625"}],["path",{"d":"m18.889 13.232.672-.672A1.5 1.5 0 0018.5 10h-2.844"}],["path",{"d":"m2 2 20 20"}],["path",{"d":"m7.94 7.94-3.5 3.499A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l5.5-5.5"}]],"zap":[["path",{"d":"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"}]],"zodiac-aquarius":[["path",{"d":"m2 10 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.096-.001l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 10"}],["path",{"d":"m2 18.002 2.456-3.684a.7.7 0 0 1 1.106-.013l2.39 3.413a.7.7 0 0 0 1.097 0l2.402-3.432a.7.7 0 0 1 1.098 0l2.402 3.432a.7.7 0 0 0 1.098 0l2.389-3.413a.7.7 0 0 1 1.106.013L22 18.002"}]],"zodiac-aries":[["path",{"d":"M12 7.5a4.5 4.5 0 1 1 5 4.5"}],["path",{"d":"M7 12a4.5 4.5 0 1 1 5-4.5V21"}]],"zodiac-cancer":[["path",{"d":"M21 14.5A9 6.5 0 0 1 5.5 19"}],["path",{"d":"M3 9.5A9 6.5 0 0 1 18.5 5"}],["circle",{"cx":"17.5","cy":"14.5","r":"3.5"}],["circle",{"cx":"6.5","cy":"9.5","r":"3.5"}]],"zodiac-capricorn":[["path",{"d":"M11 21a3 3 0 0 0 3-3V6.5a1 1 0 0 0-7 0"}],["path",{"d":"M7 19V6a3 3 0 0 0-3-3h0"}],["circle",{"cx":"17","cy":"17","r":"3"}]],"zodiac-gemini":[["path",{"d":"M16 4.525v14.948"}],["path",{"d":"M20 3A17 17 0 0 1 4 3"}],["path",{"d":"M4 21a17 17 0 0 1 16 0"}],["path",{"d":"M8 4.525v14.948"}]],"zodiac-leo":[["path",{"d":"M10 16c0-4-3-4.5-3-8a5 5 0 0 1 10 0c0 3.466-3 6.196-3 10a3 3 0 0 0 6 0"}],["circle",{"cx":"7","cy":"16","r":"3"}]],"zodiac-libra":[["path",{"d":"M3 16h6.857c.162-.012.19-.323.038-.38a6 6 0 1 1 4.212 0c-.153.057-.125.368.038.38H21"}],["path",{"d":"M3 20h18"}]],"zodiac-ophiuchus":[["path",{"d":"M3 10A6.06 6.06 0 0 1 12 10 A6.06 6.06 0 0 0 21 10"}],["path",{"d":"M6 3v12a6 6 0 0 0 12 0V3"}]],"zodiac-pisces":[["path",{"d":"M19 21a15 15 0 0 1 0-18"}],["path",{"d":"M20 12H4"}],["path",{"d":"M5 3a15 15 0 0 1 0 18"}]],"zodiac-sagittarius":[["path",{"d":"M15 3h6v6"}],["path",{"d":"M21 3 3 21"}],["path",{"d":"m9 9 6 6"}]],"zodiac-scorpio":[["path",{"d":"M10 19V5.5a1 1 0 0 1 5 0V17a2 2 0 0 0 2 2h5l-3-3"}],["path",{"d":"m22 19-3 3"}],["path",{"d":"M5 19V5.5a1 1 0 0 1 5 0"}],["path",{"d":"M5 5.5A2.5 2.5 0 0 0 2.5 3"}]],"zodiac-taurus":[["circle",{"cx":"12","cy":"15","r":"6"}],["path",{"d":"M18 3A6 6 0 0 1 6 3"}]],"zodiac-virgo":[["path",{"d":"M11 5.5a1 1 0 0 1 5 0V16a5 5 0 0 0 5 5"}],["path",{"d":"M16 11.5a1 1 0 0 1 5 0V16a5 5 0 0 1-5 5"}],["path",{"d":"M6 19V6a3 3 0 0 0-3-3h0"}],["path",{"d":"M6 5.5a1 1 0 0 1 5 0V19"}]],"zoom-in":[["circle",{"cx":"11","cy":"11","r":"8"}],["line",{"x1":"21","x2":"16.65","y1":"21","y2":"16.65"}],["line",{"x1":"11","x2":"11","y1":"8","y2":"14"}],["line",{"x1":"8","x2":"14","y1":"11","y2":"11"}]],"zoom-out":[["circle",{"cx":"11","cy":"11","r":"8"}],["line",{"x1":"21","x2":"16.65","y1":"21","y2":"16.65"}],["line",{"x1":"8","x2":"14","y1":"11","y2":"11"}]],"activity-square":"square-activity","alarm-check":"alarm-clock-check","alarm-minus":"alarm-clock-minus","alarm-plus":"alarm-clock-plus","album":"square-bookmark","alert-circle":"circle-exclamation-point","alert-octagon":"octagon-exclamation-point","alert-triangle":"triangle-exclamation-point","align-center":"text-align-center","align-justify":"text-align-justify","align-left":"text-align-start","align-right":"text-align-end","angry":"face-angry","annoyed":"face-expressionless","archive-restore":"archive-arrow-up","area-chart":"chart-area","arrow-down-01":"arrow-down-0-1","arrow-down-10":"arrow-down-1-0","arrow-down-az":"arrow-down-a-z","arrow-down-circle":"circle-arrow-down","arrow-down-left-from-circle":"circle-arrow-down-left-exit","arrow-down-left-from-square":"square-arrow-down-left-exit","arrow-down-left-square":"square-arrow-down-left","arrow-down-right-from-circle":"circle-arrow-down-right-exit","arrow-down-right-from-square":"square-arrow-down-right-exit","arrow-down-right-square":"square-arrow-down-right","arrow-down-square":"square-arrow-down","arrow-down-za":"arrow-down-z-a","arrow-left-circle":"circle-arrow-left","arrow-left-square":"square-arrow-left","arrow-right-circle":"circle-arrow-right","arrow-right-square":"square-arrow-right","arrow-up-01":"arrow-up-0-1","arrow-up-10":"arrow-up-1-0","arrow-up-az":"arrow-up-a-z","arrow-up-circle":"circle-arrow-up","arrow-up-left-from-circle":"circle-arrow-up-left-exit","arrow-up-left-from-square":"square-arrow-up-left-exit","arrow-up-left-square":"square-arrow-up-left","arrow-up-right-from-circle":"circle-arrow-up-right-exit","arrow-up-right-from-square":"square-arrow-up-right-exit","arrow-up-right-square":"square-arrow-up-right","arrow-up-square":"square-arrow-up","arrow-up-za":"arrow-up-z-a","asterisk-square":"square-asterisk","axis-3-d":"axis-3d","badge-alert":"badge-exclamation-point","badge-help":"badge-question-mark","bar-chart":"chart-no-axes-column-increasing","bar-chart-2":"chart-no-axes-column","bar-chart-3":"chart-column","bar-chart-4":"chart-column-increasing","bar-chart-big":"chart-column-big","bar-chart-horizontal":"chart-bar","bar-chart-horizontal-big":"chart-bar-big","battery-warning":"battery-exclamation-point","between-horizonal-end":"between-horizontal-end","between-horizonal-start":"between-horizontal-start","bold":"letter-b","book-alert":"book-exclamation-point","book-marked":"book-bookmark","book-template":"book-dashed","box-select":"square-dashed","building-2":"building-complex","candlestick-chart":"chart-candlestick","check-circle":"circle-check-big","check-circle-2":"circle-check","check-square":"square-check-big","check-square-2":"square-check","chevron-down-circle":"circle-chevron-down","chevron-down-square":"square-chevron-down","chevron-left-circle":"circle-chevron-left","chevron-left-square":"square-chevron-left","chevron-right-circle":"circle-chevron-right","chevron-right-square":"square-chevron-right","chevron-up-circle":"circle-chevron-up","chevron-up-square":"square-chevron-up","circle-alert":"circle-exclamation-point","circle-arrow-out-down-left":"circle-arrow-down-left-exit","circle-arrow-out-down-right":"circle-arrow-down-right-exit","circle-arrow-out-up-left":"circle-arrow-up-left-exit","circle-arrow-out-up-right":"circle-arrow-up-right-exit","circle-help":"circle-question-mark","circle-parking":"circle-letter-p","circle-parking-off":"circle-letter-p-off","circle-slashed":"circle-slash-2","clipboard-edit":"clipboard-pen","clipboard-signature":"clipboard-pen-line","clock-alert":"clock-exclamation-point","cloud-alert":"cloud-exclamation-point","code-2":"code-xml","code-square":"square-code","columns":"columns-2","columns-settings":"columns-3-cog","contact-2":"contact-round","copyright":"circle-letter-c","curly-braces":"braces","divide-circle":"circle-divide","divide-square":"square-divide","dot-square":"square-dot","download-cloud":"cloud-download","edit":"square-pen","edit-2":"pen","edit-3":"pen-line","equal-square":"square-equal","file-audio":"file-headphone","file-audio-2":"file-headphone","file-axis-3-d":"file-axis-3d","file-badge-2":"file-badge","file-bar-chart":"file-chart-column-increasing","file-bar-chart-2":"file-chart-column","file-check-2":"file-check-corner","file-code-2":"file-code-corner","file-cog-2":"file-cog","file-edit":"file-pen","file-json":"file-braces","file-json-2":"file-braces-corner","file-key-2":"file-key","file-line-chart":"file-chart-line","file-lock-2":"file-lock","file-minus-2":"file-minus-corner","file-pie-chart":"file-chart-pie","file-plus-2":"file-plus-corner","file-question":"file-question-mark","file-search-2":"file-search-corner","file-signature":"file-pen-line","file-type-2":"file-type-corner","file-video":"file-play","file-video-2":"file-video-camera","file-volume-2":"file-signal","file-warning":"file-exclamation-point","file-x-2":"file-x-corner","filter":"funnel","filter-x":"funnel-x","fingerprint":"fingerprint-pattern","flip-horizontal":"square-axis-dashed-vertical","flip-horizontal-2":"carets-to-axis-dashed-horizontal","flip-vertical":"square-axis-dashed-horizontal","flip-vertical-2":"carets-to-axis-dashed-vertical","fold-horizontal":"arrows-to-axis-dashed-vertical","fold-vertical":"arrows-to-axis-dashed-horizontal","folder-cog-2":"folder-cog","folder-edit":"folder-pen","fork-knife":"utensils","fork-knife-crossed":"utensils-crossed","form-input":"rectangle-ellipsis","frown":"face-slightly-frowning","function-square":"square-function","gantt-chart":"chart-no-axes-gantt","gantt-chart-square":"square-chart-gantt","gauge-circle":"circle-gauge","git-commit":"git-commit-horizontal","globe-2":"earth","grab":"hand-grab","grid":"grid-3x3","grid-2-x-2":"grid-2x2","grid-2-x-2-check":"grid-2x2-check","grid-2-x-2-plus":"grid-2x2-plus","grid-2-x-2-x":"grid-2x2-x","grid-3-x-2":"grid-3x2","grid-3-x-3":"grid-3x3","grid-3-x-3-off":"grid-3x3-off","heading":"letter-h","help-circle":"circle-question-mark","helping-hand":"hand-helping","history":"rotate-ccw-clock","home":"house","ice-cream":"ice-cream-cone","ice-cream-2":"ice-cream-bowl","indent":"list-indent-increase","indent-decrease":"list-indent-decrease","indent-increase":"list-indent-increase","inspect":"square-mouse-pointer","kanban-square":"square-kanban","kanban-square-dashed":"square-dashed-kanban","laptop-2":"laptop-minimal","laugh":"face-grinning","layers-3":"layers","layout":"panels-top-left","letter-text":"text-initial","library-square":"square-library","line-chart":"chart-line","loader-2":"loader-circle","location-edit":"map-pin-pen","m-square":"square-letter-m","mail-alert":"mail-exclamation-point","mail-question":"mail-question-mark","mail-warning":"mail-exclamation-point","meh":"face-neutral","menu-square":"square-menu","message-circle-alert":"message-circle-exclamation-point","message-circle-question":"message-circle-question-mark","message-circle-warning":"message-circle-exclamation-point","message-square-alert":"message-square-exclamation-point","message-square-warning":"message-square-exclamation-point","mic-2":"mic-vocal","minus-circle":"circle-minus","minus-square":"square-minus","more-horizontal":"ellipsis","more-vertical":"ellipsis-vertical","mouse-pointer-square-dashed":"square-dashed-mouse-pointer","move-3-d":"move-3d","music":"eighth-notes","music-2":"eighth-note","music-3":"half-note","music-4":"sixteenth-notes","octagon-alert":"octagon-exclamation-point","outdent":"list-indent-decrease","paintbrush-2":"paintbrush-vertical","palmtree":"tree-palm","panel-bottom-inactive":"panel-bottom-dashed","panel-left-inactive":"panel-left-dashed","panel-right-inactive":"panel-right-dashed","panel-top-inactive":"panel-top-dashed","panels-left-right":"columns-3","panels-top-bottom":"rows-3","parking-circle":"circle-letter-p","parking-circle-off":"circle-letter-p-off","parking-square":"square-letter-p","parking-square-off":"square-letter-p-off","pause-circle":"circle-pause","pause-octagon":"octagon-pause","pen-box":"square-pen","pen-square":"square-pen","percent-circle":"circle-percent","percent-diamond":"diamond-percent","percent-square":"square-percent","pi-square":"square-pi","pie-chart":"chart-pie","pilcrow-square":"square-pilcrow","play-circle":"circle-play","play-square":"square-play","plug-zap-2":"plug-zap","plus-circle":"circle-plus","plus-square":"square-plus","podcast":"mic-signal","power-circle":"circle-power","power-square":"square-power","printer-3-d":"printer-3d","rotate-3-d":"rotate-3d","rows":"rows-2","scale-3-d":"scale-3d","scatter-chart":"chart-scatter","school-2":"university","scissors-square":"square-scissors","scissors-square-dashed-bottom":"square-bottom-dashed-scissors","search-alert":"search-exclamation-point","send-horizonal":"send-horizontal","shield-alert":"shield-exclamation-point","shield-close":"shield-x","shield-question":"shield-question-mark","sidebar":"panel-left","sidebar-close":"panel-left-close","sidebar-open":"panel-left-open","sigma-square":"square-sigma","slash-square":"square-slash","sliders":"sliders-vertical","smile":"face-slightly-smiling","smile-plus":"face-slightly-smiling-plus","sort-asc":"arrow-up-narrow-wide","sort-desc":"arrow-down-wide-narrow","split-square-horizontal":"square-split-horizontal","split-square-vertical":"square-split-vertical","square-arrow-out-down-left":"square-arrow-down-left-exit","square-arrow-out-down-right":"square-arrow-down-right-exit","square-arrow-out-up-left":"square-arrow-up-left-exit","square-arrow-out-up-right":"square-arrow-up-right-exit","square-centerline-dashed-horizontal":"square-axis-dashed-vertical","square-centerline-dashed-vertical":"square-axis-dashed-horizontal","square-gantt-chart":"square-chart-gantt","square-m":"square-letter-m","square-parking":"square-letter-p","square-parking-off":"square-letter-p-off","stars":"sparkles","stop-circle":"circle-stop","subtitles":"captions","table-config":"columns-3-cog","terminal-square":"square-terminal","test-tube-2":"test-tube-diagonal","text":"text-align-start","text-select":"square-dashed-text","text-selection":"square-dashed-text","train":"tram-front","trash-2":"trash","triangle-alert":"triangle-exclamation-point","triangles-centerline-dashed-horizontal":"carets-to-axis-dashed-horizontal","triangles-centerline-dashed-vertical":"carets-to-axis-dashed-vertical","tv-2":"tv-minimal","unfold-horizontal":"arrows-from-axis-dashed-vertical","unfold-vertical":"arrows-from-axis-dashed-horizontal","unlock":"lock-open","unlock-keyhole":"lock-keyhole-open","upload-cloud":"cloud-upload","user-2":"user-round","user-check-2":"user-round-check","user-circle":"circle-user","user-circle-2":"circle-user-round","user-cog-2":"user-round-cog","user-minus-2":"user-round-minus","user-plus-2":"user-round-plus","user-square":"square-user","user-square-2":"square-user-round","user-x-2":"user-round-x","users-2":"users-round","verified":"badge-check","wallet-2":"wallet-minimal","wand-2":"wand-sparkles","waves":"waves-horizontal","wrap-text":"text-wrap","x-circle":"circle-x","x-octagon":"octagon-x","x-square":"square-x"}';

// src/svg-sanitize.ts
var import_xmldom = __toESM(require_lib());
var SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";
var ELEMENTS = /* @__PURE__ */ new Set([
  "svg",
  "g",
  "defs",
  "symbol",
  "use",
  "title",
  "desc",
  "switch",
  "view",
  "a",
  "image",
  "path",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "rect",
  "text",
  "tspan",
  "textPath",
  "linearGradient",
  "radialGradient",
  "stop",
  "clipPath",
  "mask",
  "pattern",
  "marker",
  "filter",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "animate",
  "animateMotion",
  "animateTransform",
  "set",
  "mpath"
]);
var ANIMATIONS = /* @__PURE__ */ new Set(["animate", "animateMotion", "animateTransform", "set"]);
var EDITOR_NS = /inkscape|sodipodi|adobe|sketch|figma|purl\.org\/dc|creativecommons|rdf-syntax/i;
var compact = (value) => value.replace(/[\u0000- ]/g, "");
var safeHref = (element, value) => {
  const v = compact(value);
  if (v.startsWith("#")) return true;
  if (element === "a") return /^(https|mailto):/i.test(v);
  if (element === "image")
    return /^https:/i.test(v) || /^data:image\/(png|jpe?g|gif|webp|avif)[;,]/i.test(v);
  return false;
};
var cssUnescape = (value) => value.replace(
  /\\(?:([0-9a-f]{1,6})[ \t\n\r\f]?|([^\n\r\f0-9a-f]))/gi,
  (_, hex, ch) => hex ? String.fromCodePoint(Math.min(parseInt(hex, 16) || 65533, 1114111)) : ch ?? ""
);
var leavesFile = (raw) => {
  const value = cssUnescape(raw);
  return /url\(\s*(?!['"]?\s*#)/i.test(value) || /image-set\(|image\(|cross-fade\(|\bsrc\(/i.test(value) || /@import|expression\s*\(|javascript:/i.test(compact(value));
};
var SVG_CAMEL = new Map(
  [
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan"
  ].map((name) => [name.toLowerCase(), name])
);
var htmlName = (name) => {
  const lower = name.toLowerCase();
  return SVG_CAMEL.get(lower) ?? lower;
};
var hash = (text) => {
  let h2 = 2166136261;
  for (let i = 0; i < text.length; i++) h2 = Math.imul(h2 ^ text.charCodeAt(i), 16777619);
  return (h2 >>> 0).toString(36).slice(0, 5);
};
var ID_LISTS = /* @__PURE__ */ new Set([
  "aria-labelledby",
  "aria-describedby",
  "aria-controls",
  "aria-owns",
  "aria-flowto",
  "aria-details",
  "aria-activedescendant",
  "aria-errormessage"
]);
var PLAIN_ID = /^[\w.:-]+$/;
var URL_REF = /url\(\s*(['"]?)((?:\\[0-9a-f]{1,6}[ \t\n\r\f]?|\\[^\n\r\f0-9a-f]|[^'")\s\\])+)/gi;
function rewriteIds(attrName, value, ids, prefix) {
  const own2 = (id) => ids.has(id) ? prefix + id : id;
  if (attrName === "id") return own2(value);
  if (attrName === "href") {
    const v = compact(value);
    return v.startsWith("#") && ids.has(v.slice(1)) ? `#${own2(v.slice(1))}` : value;
  }
  if (ID_LISTS.has(attrName))
    return value.split(/(\s+)/).map((part) => /\s/.test(part) ? part : own2(part)).join("");
  if (attrName === "begin" || attrName === "end") {
    return value.replace(
      /(^|;)(\s*)([^;\s]+)/g,
      (whole, sep, ws, token) => {
        const parts = token.split(".");
        for (let k = parts.length - 1; k >= 1; k--) {
          const id = parts.slice(0, k).join(".");
          if (ids.has(id)) return `${sep}${ws}${own2(id)}.${parts.slice(k).join(".")}`;
        }
        return whole;
      }
    );
  }
  return value.replace(URL_REF, (whole, quote, raw) => {
    const ref = cssUnescape(raw);
    if (!ref.startsWith("#")) return whole;
    const id = ref.slice(1);
    return ids.has(id) && PLAIN_ID.test(id) ? `url(${quote}#${own2(id)}` : whole;
  });
}
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var CDATA_SECTION_NODE = 4;
var PROCESSING_INSTRUCTION_NODE = 7;
var DROPPED = /* @__PURE__ */ new Set(["title", "desc"]);
var UNWRAPPED = /* @__PURE__ */ new Set(["a"]);
var COLOR_PROPS = /* @__PURE__ */ new Set([
  "fill",
  "stroke",
  "stop-color",
  "flood-color",
  "lighting-color",
  "color"
]);
var KEEP_COLOR = /^(none|transparent|currentcolor|inherit)$/i;
function monoValue(value) {
  const v = value.trim();
  return KEEP_COLOR.test(v) || /^url\(/i.test(v) ? value : "currentColor";
}
function monoStyle(style) {
  return style.replace(
    /(^|;)(\s*)([a-z-]+)(\s*:\s*)([^;]*)/gi,
    (whole, sep, ws, prop, colon, value) => COLOR_PROPS.has(prop.toLowerCase()) ? `${sep}${ws}${prop}${colon}${monoValue(value)}` : whole
  );
}
function plainLength(value) {
  const m = value?.trim().match(/^(\d+(?:\.\d+)?)(px)?$/i);
  return m ? Number(m[1]) : void 0;
}
function collectIds(node, out) {
  if (node.nodeType !== ELEMENT_NODE) return;
  const id = node.getAttribute?.("id");
  if (id) out.add(id);
  for (const child of Array.from(node.childNodes ?? [])) collectIds(child, out);
}
function sanitizeSvg(text, fileName, options = {}) {
  let root;
  try {
    const doc = new import_xmldom.DOMParser({ onError: import_xmldom.onErrorStopParsing }).parseFromString(
      text,
      "image/svg+xml"
    );
    root = doc.documentElement;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, reason: `not readable as XML (${message.split("\n")[0]})` };
  }
  if (!root || root.localName !== "svg" || root.namespaceURI !== SVG_NS)
    return { ok: false, reason: "not an SVG (no <svg> root in the SVG namespace)" };
  const slug2 = fileName.replace(/\.svg$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const mono = options.mono === true;
  let removed = 0;
  let styled = false;
  const ids = /* @__PURE__ */ new Set();
  collectIds(root, ids);
  const idPrefix = `${slug2 || "svg"}-${hash(text)}-`;
  const write = (node) => {
    if (node.nodeType === TEXT_NODE || node.nodeType === CDATA_SECTION_NODE)
      return node.nodeValue ? [node.nodeValue] : [];
    if (node.nodeType === PROCESSING_INSTRUCTION_NODE) {
      removed++;
      return [];
    }
    if (node.nodeType !== ELEMENT_NODE) return [];
    const name = node.localName ?? "";
    const children = () => Array.from(node.childNodes ?? []).flatMap(write);
    if (node.namespaceURI !== SVG_NS || !ELEMENTS.has(name)) {
      if (name === "style" && node.namespaceURI === SVG_NS && (node.textContent ?? "").trim())
        styled = true;
      if (!(name === "metadata" && node.namespaceURI === SVG_NS) && !EDITOR_NS.test(node.namespaceURI ?? ""))
        removed++;
      return [];
    }
    if (DROPPED.has(name)) return [];
    if (UNWRAPPED.has(name)) {
      removed++;
      return children();
    }
    const seen = /* @__PURE__ */ new Map();
    let xlinkHref = null;
    for (const attr of Array.from(node.attributes ?? [])) {
      const ns = attr.namespaceURI;
      if (ns === XLINK_NS && attr.localName === "href") {
        xlinkHref ??= attr.value;
        continue;
      }
      if (ns !== null) {
        if (ns !== "http://www.w3.org/2000/xmlns/" && ns !== "http://www.w3.org/XML/1998/namespace" && !EDITOR_NS.test(ns))
          removed++;
        continue;
      }
      if (attr.localName === "xmlns") continue;
      if (!/^[A-Za-z][\w.-]*$/.test(attr.localName)) {
        removed++;
        continue;
      }
      const html = htmlName(attr.localName);
      if (seen.has(html)) {
        removed++;
        continue;
      }
      seen.set(html, attr.value);
    }
    if (xlinkHref !== null && !seen.has("href")) seen.set("href", xlinkHref);
    if (ANIMATIONS.has(name)) {
      const target = compact(seen.get("attributeName") ?? "").replace(/^.*:/, "").toLowerCase();
      if (target === "href" || target.startsWith("on")) {
        removed++;
        return [];
      }
    }
    const attrs2 = {};
    for (const [attrName, value] of seen) {
      if (attrName.startsWith("on")) {
        removed++;
        continue;
      }
      const unsafe = attrName === "href" ? !safeHref(name === "feImage" ? "image" : name, value) || /^https:/i.test(compact(value)) : leavesFile(value);
      if (unsafe) {
        removed++;
        continue;
      }
      let out = rewriteIds(attrName, value, ids, idPrefix);
      if (mono && COLOR_PROPS.has(attrName)) out = monoValue(out);
      if (mono && attrName === "style") out = monoStyle(out);
      attrs2[attrName] = out;
    }
    return [{ tag: name, attrs: attrs2, children: children() }];
  };
  const [top] = write(root);
  if (!top || typeof top === "string")
    return { ok: false, reason: "not an SVG (no <svg> root in the SVG namespace)" };
  const attrs = { ...top.attrs };
  if (!attrs.viewBox) {
    const w = plainLength(attrs.width);
    const h2 = plainLength(attrs.height);
    if (w === void 0 || h2 === void 0)
      return { ok: false, reason: "has neither a viewBox nor a width and height in pixels" };
    attrs.viewBox = `0 0 ${w} ${h2}`;
  }
  delete attrs.width;
  delete attrs.height;
  const own2 = attrs.class?.trim() ?? "";
  const cls = slug2 ? `svg-${slug2}` : "";
  const classes = [own2, cls && !own2.split(/\s+/).includes(cls) ? cls : ""].filter(Boolean).join(" ");
  if (classes) attrs.class = classes;
  else delete attrs.class;
  const ownFill = attrs.fill !== void 0 || /(^|;)\s*fill\s*:/i.test(attrs.style ?? "");
  if (!ownFill) attrs.fill = mono ? "currentColor" : "black";
  return {
    ok: true,
    attrs,
    children: dropBlankText(top.children),
    removed,
    styled,
    ...ids.size > 0 ? { idPrefix } : {}
  };
}
function dropBlankText(nodes) {
  return nodes.filter((n) => typeof n !== "string" || n.trim() !== "").map((n) => typeof n === "string" ? n : { ...n, children: dropBlankText(n.children) });
}
function withInstance(nodes, idPrefix, instance) {
  const own2 = `${idPrefix}${instance}-`;
  return nodes.map(
    (n) => typeof n === "string" ? n : {
      tag: n.tag,
      attrs: Object.fromEntries(
        Object.entries(n.attrs).map(([k, v]) => [k, v.split(idPrefix).join(own2)])
      ),
      children: withInstance(n.children, idPrefix, instance)
    }
  );
}

// src/svg-icons.ts
var MAX_SVG_BYTES = 50 * 1024;
function svgIconRef(value) {
  const m = value?.match(/^svg(-mono)?:(.*)$/i);
  if (!m) return void 0;
  return { path: m[2].trim(), mono: m[1] !== void 0 };
}
function resolveSvgPath(contentDir, ref) {
  if (!ref) return { ok: false, reason: "no path after the prefix" };
  if (ref.includes("\\")) return { ok: false, reason: "use / in the path, not \\" };
  if (ref.startsWith("/") || /^[a-z]:/i.test(ref))
    return { ok: false, reason: "the path must be relative to the content folder" };
  const segments = ref.split("/").filter((s) => s !== "");
  if (segments.some((s) => s === "." || s === ".."))
    return { ok: false, reason: "the path may not contain . or .. segments" };
  if (!/\.svg$/i.test(ref)) return { ok: false, reason: "the file must end in .svg" };
  let base;
  try {
    base = fs.realpathSync(path.resolve(contentDir));
  } catch {
    return { ok: false, reason: `content folder ${contentDir} not found` };
  }
  for (const form of uniq([ref, ref.normalize("NFD"), ref.normalize("NFC")])) {
    const candidate = path.join(base, ...form.split("/").filter((s) => s !== ""));
    let real;
    try {
      real = fs.realpathSync(candidate);
    } catch {
      continue;
    }
    if (real !== base && !real.startsWith(base + path.sep))
      return { ok: false, reason: "the path leads out of the content folder" };
    return { ok: true, file: real };
  }
  return { ok: false, reason: "file not found" };
}
function uniq(values) {
  return [...new Set(values)];
}
var cache3 = /* @__PURE__ */ new Map();
function readSvgIcon(contentDir, ref) {
  const resolved = resolveSvgPath(contentDir, ref.path);
  if (!resolved.ok) return resolved;
  let stat;
  try {
    stat = fs.statSync(resolved.file);
  } catch {
    return { ok: false, reason: "file not readable" };
  }
  if (!stat.isFile()) return { ok: false, reason: "not a file" };
  if (stat.size > MAX_SVG_BYTES)
    return {
      ok: false,
      reason: `larger than ${MAX_SVG_BYTES / 1024} KB (${Math.ceil(stat.size / 1024)} KB)`
    };
  const key = `${ref.mono ? "mono" : "svg"}|${resolved.file}`;
  const hit = cache3.get(key);
  if (hit && hit.mtimeMs === stat.mtimeMs && hit.size === stat.size) return hit.result;
  let text;
  try {
    text = fs.readFileSync(resolved.file, "utf8");
  } catch {
    return { ok: false, reason: "file not readable" };
  }
  const sanitized = sanitizeSvg(text, path.basename(resolved.file), { mono: ref.mono });
  const result = sanitized.ok ? { ...sanitized, file: resolved.file } : sanitized;
  cache3.set(key, { mtimeMs: stat.mtimeMs, size: stat.size, result });
  return result;
}

// node_modules/@quartz-community/utils/dist/lang.js
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
var table;
function icons() {
  if (!table) table = JSON.parse(icon_nodes_default);
  return table;
}
function nodesOf(name) {
  const all = icons();
  if (!Object.prototype.hasOwnProperty.call(all, name)) return void 0;
  const entry = all[name];
  const target = typeof entry === "string" ? all[entry] : entry;
  return Array.isArray(target) ? target : void 0;
}
var LUCIDE_PREFIX = "lucide:";
function lucideName(value) {
  if (!value || !value.toLowerCase().startsWith(LUCIDE_PREFIX)) return void 0;
  return value.slice(LUCIDE_PREFIX.length).trim().toLowerCase();
}
function hasLucideIcon(name) {
  return nodesOf(name) !== void 0;
}
function lucideIconNames() {
  return Object.keys(icons());
}
function LucideIcon({ name, className, size = "1em" }) {
  const node = nodesOf(name);
  if (!node) {
    warnOnce(`lucide:${name}`, `Unknown Lucide icon \`${name}\`; see https://lucide.dev/icons`);
    return null;
  }
  return /* @__PURE__ */ jsx(
    "svg",
    {
      class: classNames("lucide", `lucide-${name}`, className),
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
      children: node.map(([tag, attrs]) => h(tag, attrs))
    }
  );
}
function svgChildren(nodes) {
  return nodes.map(
    (n) => typeof n === "string" ? n : h(n.tag, n.attrs, ...svgChildren(n.children))
  );
}
function SvgFileIcon({
  value,
  contentDir,
  className,
  size = "1em",
  instance
}) {
  const ref = svgIconRef(value);
  if (!ref) return null;
  if (!contentDir) {
    warnOnce(
      `svg:${value}`,
      `Icon \`${value}\`: the content folder is unknown, so the file cannot be read.`
    );
    return null;
  }
  const icon2 = readSvgIcon(contentDir, ref);
  if (!icon2.ok) {
    warnOnce(`svg:${value}`, `Icon \`${value}\`: ${icon2.reason}.`);
    return null;
  }
  if (icon2.removed > 0) {
    const style = icon2.styled ? ", among them a <style>: colours set there are lost (export with presentation attributes)" : "";
    warnOnce(
      `svg-removed:${icon2.file}:${ref.mono}`,
      `Icon \`${value}\`: ${icon2.removed} part(s) that cannot be inlined safely were removed${style}.`
    );
  }
  const root = { tag: "svg", attrs: icon2.attrs, children: icon2.children };
  const [drawn] = icon2.idPrefix && instance ? withInstance([root], icon2.idPrefix, instance) : [root];
  const { class: own2, ...attrs } = drawn.attrs;
  return h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      ...attrs,
      class: classNames(own2, className),
      width: size,
      height: size,
      "aria-hidden": "true",
      focusable: "false"
    },
    ...svgChildren(drawn.children)
  );
}
var defaultBreakpoints = { mobile: "800px", desktop: "1200px" };
var BREAKPOINTS_FILE = path.join("quartz", "styles", "variables.scss");
var FRAME_BREAKPOINTS_FILE = path.join(".quartz-gui", "layout-breakpoints.json");
var MOBILE_PLACEHOLDER = "__NAV_BP_MOBILE__";
var DESKTOP_PLACEHOLDER = "__NAV_BP_DESKTOP__";
function parseBreakpoints(scss) {
  const map = /\$breakpoints\s*:\s*\(([^)]*)\)/.exec(scss);
  if (!map) return {};
  const out = {};
  for (const entry of map[1].split(",")) {
    const m = /^\s*(mobile|desktop)\s*:\s*([0-9.]+(?:px|rem|em))\s*$/.exec(entry);
    if (m) out[m[1]] = m[2];
  }
  return out;
}
function readProjectBreakpoints(cwd = process.cwd()) {
  const file = path.join(cwd, BREAKPOINTS_FILE);
  try {
    if (!fs.existsSync(file)) return void 0;
    return parseBreakpoints(fs.readFileSync(file, "utf8"));
  } catch {
    return void 0;
  }
}
function parseFrameBreakpoints(json) {
  let data;
  try {
    data = JSON.parse(json);
  } catch {
    return {};
  }
  if (data === null || typeof data !== "object") return {};
  const record = data;
  const out = {};
  const mobile = validLength(record.mobile);
  const desktop = validLength(record.tablet);
  if (mobile) out.mobile = mobile;
  if (desktop) out.desktop = desktop;
  return out;
}
function readFrameBreakpoints(cwd = process.cwd()) {
  const file = path.join(cwd, FRAME_BREAKPOINTS_FILE);
  try {
    if (!fs.existsSync(file)) return void 0;
    return parseFrameBreakpoints(fs.readFileSync(file, "utf8"));
  } catch {
    return void 0;
  }
}
function validLength(value) {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) return `${value}px`;
  if (typeof value === "string" && /^[0-9.]+(px|rem|em)$/.test(value.trim())) {
    return parseFloat(value) > 0 ? value.trim() : void 0;
  }
  return void 0;
}
function resolveBreakpoints(override, cwd = process.cwd()) {
  const frame = readFrameBreakpoints(cwd);
  const project = readProjectBreakpoints(cwd);
  const hasFrame = frame !== void 0 && Object.keys(frame).length > 0;
  if (!project && !hasFrame) {
    warnOnce(
      "breakpoints-file",
      `Could not read ${BREAKPOINTS_FILE}; using ${defaultBreakpoints.mobile} / ${defaultBreakpoints.desktop} as breakpoints.`
    );
  }
  return {
    mobile: validLength(override?.mobile) ?? frame?.mobile ?? project?.mobile ?? defaultBreakpoints.mobile,
    desktop: validLength(override?.desktop) ?? frame?.desktop ?? project?.desktop ?? defaultBreakpoints.desktop
  };
}
function applyBreakpoints(css, bp) {
  return css.split(MOBILE_PLACEHOLDER).join(bp.mobile).split(DESKTOP_PLACEHOLDER).join(bp.desktop);
}

// src/i18n/locales/en-US.ts
var en_US_default = {
  nav: {
    label: "Main navigation",
    toggleMenu: "Toggle menu",
    pinMenu: "Pin menu",
    home: "Home",
    overview: "Overview",
    previous: "Previous",
    next: "Next",
    jumpTo: "Jump to\u2026",
    go: "Go",
    pager: "Previous and next page",
    expand: ({ title }) => `Expand ${title}`
  }
};

// src/i18n/locales/de-DE.ts
var deDE = {
  nav: {
    label: "Hauptnavigation",
    toggleMenu: "Men\xFC umschalten",
    pinMenu: "Men\xFC anheften",
    home: "Start",
    overview: "\xDCbersicht",
    previous: "Zur\xFCck",
    next: "Weiter",
    jumpTo: "Springe zu\u2026",
    go: "Los",
    pager: "Vorherige und n\xE4chste Seite",
    expand: ({ title }) => `${title} aufklappen`
  }
};
var de_DE_default = deDE;

// src/i18n/index.ts
var locales = {
  "en-US": en_US_default,
  "de-DE": de_DE_default
};
function i18n(locale) {
  if (!locale) return en_US_default;
  const exact = locales[locale];
  if (exact) return exact;
  const primary2 = locale.toLowerCase().split(/[-_]/)[0];
  for (const [key, value] of Object.entries(locales)) {
    if (key.toLowerCase().split("-")[0] === primary2) return value;
  }
  return en_US_default;
}

// src/util/hash.ts
function shortHash(input) {
  let hash2 = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash2 ^= input.charCodeAt(i);
    hash2 = Math.imul(hash2, 16777619) >>> 0;
  }
  return hash2.toString(36);
}
var POPUP_VARIANTS = /* @__PURE__ */ new Set(["dropdown", "mega", "flyout"]);
var ROW_VARIANTS = /* @__PURE__ */ new Set(["bar", "dropdown", "mega", "tabs"]);
function stateOf(node, ctx) {
  if (node.slug === ctx.slug) return "active";
  if (ctx.scope.trail.has(node.slug)) return "active-trail";
  return void 0;
}
function typeIconsAt(level, ctx) {
  switch (ctx.opts.variant) {
    case "tree":
    case "accordion":
    case "flyout":
      return true;
    case "dropdown":
    case "mega":
    case "columns":
    case "rail":
      return level >= 2;
    default:
      return false;
  }
}
function typeIconEl(kind, ctx) {
  const names = ctx.opts.iconNames;
  const one = (name, mod) => /* @__PURE__ */ jsx(LucideIcon, { name, className: `quartz-nav__icon quartz-nav__icon--${mod}` });
  switch (kind) {
    case "folder":
      return one(names.folder, "folder");
    case "folder-open":
      return one(names.folderOpen, "folder-open");
    case "folder-toggle":
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        one(names.folder, "folder"),
        one(names.folderOpen, "folder-open")
      ] });
    case "file":
      return one(names.file, "file");
    case "home":
      return one(names.home, "home");
  }
}
function icon(node, ctx, typeIcon) {
  const mode = ctx.opts.icons;
  if ((mode === "custom" || mode === "both") && node.icon) {
    if (node.icon.toLowerCase() === "none") return null;
    const lucide = lucideName(node.icon);
    if (lucide) return /* @__PURE__ */ jsx(LucideIcon, { name: lucide, className: "quartz-nav__icon" });
    if (svgIconRef(node.icon))
      return SvgFileIcon({
        value: node.icon,
        contentDir: ctx.contentDir,
        className: "quartz-nav__icon quartz-nav__icon--svg",
        instance: `${ctx.id}-${ctx.svgIcons ? ++ctx.svgIcons.drawn : 0}`
      });
    return /* @__PURE__ */ jsx("span", { class: "quartz-nav__icon", "aria-hidden": "true", children: node.icon });
  }
  if ((mode === "type" || mode === "both") && typeIcon) return typeIconEl(typeIcon, ctx);
  return null;
}
function monogramOf(title) {
  const chars = Array.from(title.trim());
  const first = chars.find((c) => /[\p{L}\p{N}]/u.test(c)) ?? chars[0] ?? "";
  return first.toLocaleUpperCase();
}
function monogram(text) {
  return /* @__PURE__ */ jsx("span", { class: "quartz-nav__icon quartz-nav__monogram", "aria-hidden": "true", children: monogramOf(text) });
}
function railLead(level, node, ctx, text) {
  if (ctx.opts.variant !== "rail" || level !== 1) return void 0;
  return monogram(node.title);
}
function label(node, ctx, text, typeIcon, lead) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    icon(node, ctx, typeIcon) ?? lead,
    /* @__PURE__ */ jsx("span", { class: "quartz-nav__text", children: text ?? node.title })
  ] });
}
function titleEl(node, ctx, extra) {
  const state = stateOf(node, ctx);
  const target = extra?.target ?? (extra?.forceStatic ? void 0 : linkTarget(node, ctx.opts));
  const cls = classNames("quartz-nav__link", extra?.className, state);
  if (!target) {
    return /* @__PURE__ */ jsx("span", { class: classNames(cls, "quartz-nav__link--static"), children: label(node, ctx, extra?.text, extra?.typeIcon, extra?.lead) });
  }
  return /* @__PURE__ */ jsx(
    "a",
    {
      class: cls,
      href: hrefFor(ctx.slug, target),
      "aria-current": state === "active" ? "page" : void 0,
      children: label(node, ctx, extra?.text, extra?.typeIcon, extra?.lead)
    }
  );
}
function chevron(ctx) {
  return /* @__PURE__ */ jsx("span", { class: "quartz-nav__chevron", "aria-hidden": "true", children: /* @__PURE__ */ jsx(LucideIcon, { name: ctx.opts.iconNames.chevron, className: "quartz-nav__chevron-icon" }) });
}
function levelAllowed(level, ctx) {
  return ctx.opts.depth === 0 || level <= ctx.opts.depth;
}
function variantCollapsible(level, ctx) {
  switch (ctx.opts.variant) {
    case "accordion":
    case "flyout":
    case "rail":
      return true;
    case "dropdown":
    case "mega":
      return level === 1;
    default:
      return false;
  }
}
function renderList(nodes, level, ctx, extraClass) {
  if (nodes.length === 0) return null;
  return /* @__PURE__ */ jsx("ul", { class: classNames("quartz-nav__list", extraClass), "data-level": String(level), children: renderItems(nodes, level, ctx, false) });
}
function renderItems(nodes, level, ctx, leading) {
  return nodes.flatMap(
    (n, i) => n.divider && (i > 0 || leading) ? [divider(), renderItem(n, level, ctx)] : [renderItem(n, level, ctx)]
  );
}
function divider() {
  return /* @__PURE__ */ jsx("li", { class: "quartz-nav__divider", role: "separator" });
}
function indexEntry(node, ctx, level) {
  if (ctx.opts.indexEntry !== "first" || !node.hasIndex) return null;
  const active = node.slug === ctx.slug;
  return /* @__PURE__ */ jsx(
    "li",
    {
      class: classNames(
        "quartz-nav__item",
        "quartz-nav__item--page",
        "quartz-nav__item--index",
        active ? "active" : void 0
      ),
      "data-slug": node.slug,
      children: titleEl(node, ctx, {
        target: node.slug,
        text: ctx.t.nav.overview,
        typeIcon: typeIconsAt(level, ctx) ? "file" : void 0
      })
    }
  );
}
function renderItem(node, level, ctx) {
  const { opts } = ctx;
  const state = stateOf(node, ctx);
  const showChildren = node.kind === "folder" && node.children.length > 0 && levelAllowed(level + 1, ctx);
  const byVariant = showChildren && variantCollapsible(level, ctx);
  const byMobile = showChildren && !byVariant && opts.mobile === "accordion";
  const collapsible = byVariant || byMobile;
  const itemClass = classNames(
    "quartz-nav__item",
    node.kind === "folder" ? "quartz-nav__item--folder" : "quartz-nav__item--page",
    showChildren ? "quartz-nav__item--parent" : void 0,
    state
  );
  const withType = typeIconsAt(level, ctx);
  const pageIcon = withType ? "file" : void 0;
  const lead = railLead(level, node, ctx);
  const overview = showChildren ? indexEntry(node, ctx, level + 1) : null;
  if (!collapsible) {
    const folderIcon = withType ? state !== void 0 ? "folder-open" : "folder" : void 0;
    return /* @__PURE__ */ jsxs("li", { class: itemClass, "data-slug": node.slug, children: [
      titleEl(node, ctx, {
        typeIcon: node.kind === "folder" ? folderIcon : pageIcon,
        lead
      }),
      showChildren && /* @__PURE__ */ jsxs("ul", { class: "quartz-nav__list", "data-level": String(level + 1), children: [
        overview,
        renderItems(node.children, level + 1, ctx, overview !== null)
      ] })
    ] });
  }
  const onTrail = state !== void 0;
  const popup = POPUP_VARIANTS.has(opts.variant) && byVariant;
  const open = byMobile ? true : !popup && (opts.folderDefaultState === "open" || opts.expandActive && onTrail);
  const target = opts.folderClick === "toggle" && !byMobile ? void 0 : linkTarget(node, opts);
  const separateLink = target !== void 0;
  const toggleIcon = withType ? "folder-toggle" : void 0;
  return /* @__PURE__ */ jsxs(
    "li",
    {
      class: classNames(itemClass, separateLink ? "quartz-nav__item--split" : void 0),
      "data-slug": node.slug,
      children: [
        separateLink && titleEl(node, ctx, { target, typeIcon: toggleIcon, lead }),
        /* @__PURE__ */ jsxs(
          "details",
          {
            class: "quartz-nav__folder",
            open,
            name: opts.exclusive ? `${ctx.id}-l${level}` : void 0,
            "data-folder": node.slug,
            "data-trail": onTrail ? "true" : void 0,
            "data-mobile-collapsible": byMobile ? "true" : void 0,
            children: [
              /* @__PURE__ */ jsxs(
                "summary",
                {
                  class: classNames(
                    "quartz-nav__summary",
                    separateLink ? "quartz-nav__summary--toggle" : void 0
                  ),
                  children: [
                    separateLink ? /* @__PURE__ */ jsx("span", { class: "quartz-nav__sr-only", children: ctx.t.nav.expand({ title: node.title }) }) : titleEl(node, ctx, { forceStatic: true, typeIcon: toggleIcon, lead }),
                    (opts.chevrons || separateLink) && chevron(ctx)
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("ul", { class: "quartz-nav__list", "data-level": String(level + 1), children: [
                overview,
                renderItems(node.children, level + 1, ctx, overview !== null)
              ] })
            ]
          }
        )
      ]
    }
  );
}
function renderTabs(ctx) {
  const { root } = ctx.scope;
  const primary2 = /* @__PURE__ */ jsx("ul", { class: "quartz-nav__list quartz-nav__tabs", "data-level": "1", children: root.children.flatMap((n, i) => [
    n.divider && i > 0 ? divider() : null,
    /* @__PURE__ */ jsx(
      "li",
      {
        class: classNames(
          "quartz-nav__item",
          n.kind === "folder" ? "quartz-nav__item--folder" : "quartz-nav__item--page",
          stateOf(n, ctx)
        ),
        "data-slug": n.slug,
        children: titleEl(n, ctx)
      }
    )
  ]) });
  const activeTab = root.children.find(
    (n) => n.kind === "folder" && (n.slug === ctx.slug || ctx.scope.trail.has(n.slug))
  );
  const secondary = ctx.opts.tabs.secondary && activeTab && levelAllowed(2, ctx) ? renderList(activeTab.children, 2, ctx, "quartz-nav__subtabs") : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    primary2,
    secondary
  ] });
}
function homeEntry(ctx) {
  const { base } = ctx.scope;
  if (!ctx.opts.showHome || !base.hasIndex) return null;
  const active = base.slug === ctx.slug;
  return /* @__PURE__ */ jsx(
    "li",
    {
      class: classNames(
        "quartz-nav__item",
        "quartz-nav__item--page",
        "quartz-nav__item--home",
        active ? "active" : void 0
      ),
      "data-slug": base.slug,
      children: titleEl(base, ctx, {
        target: base.slug,
        text: ctx.t.nav.home,
        typeIcon: typeIconsAt(1, ctx) ? "home" : void 0,
        lead: ctx.opts.variant === "rail" ? typeIconEl("home", ctx) : void 0
      })
    }
  );
}
function selectEl(ctx, id) {
  const { root } = ctx.scope;
  const nodes = flatten(root, ctx.opts);
  const option = (node, level) => {
    const target = linkTarget(node, ctx.opts);
    const indent = "  ".repeat(Math.max(0, level - 1));
    return /* @__PURE__ */ jsx(
      "option",
      {
        value: target ? hrefFor(ctx.slug, target) : "",
        disabled: !target,
        selected: node.slug === ctx.slug,
        children: indent + node.title
      }
    );
  };
  const items = [];
  for (const child of root.children) {
    if (child.kind === "folder" && child.children.length > 0 && levelAllowed(2, ctx)) {
      const inner = nodes.filter(
        (n) => n.slug !== child.slug && n.path.startsWith(`${child.path}/`)
      );
      const indexTarget = linkTarget(child, ctx.opts);
      items.push(
        /* @__PURE__ */ jsxs("optgroup", { label: child.title, children: [
          indexTarget && /* @__PURE__ */ jsx("option", { value: hrefFor(ctx.slug, indexTarget), selected: child.slug === ctx.slug, children: ctx.t.nav.overview }),
          inner.map((n) => option(n, n.depth - child.depth))
        ] })
      );
    } else {
      items.push(option(child, 1));
    }
  }
  const hasCurrent = ctx.scope.current !== void 0 && nodes.some((n) => n.slug === ctx.slug);
  return /* @__PURE__ */ jsxs("div", { class: "quartz-nav__jump", children: [
    /* @__PURE__ */ jsxs(
      "select",
      {
        class: "quartz-nav__select",
        id,
        "aria-label": ctx.opts.title ? void 0 : navLabel(ctx),
        children: [
          /* @__PURE__ */ jsx("option", { value: "", disabled: true, selected: !hasCurrent, children: ctx.t.nav.jumpTo }),
          items
        ]
      }
    ),
    ctx.opts.select.button && /* @__PURE__ */ jsx("button", { type: "button", class: "quartz-nav__go", "data-select": id, children: ctx.t.nav.go })
  ] });
}
function navLabel(ctx) {
  if (ctx.opts.ariaLabel) return ctx.opts.ariaLabel;
  if (ctx.opts.title) return ctx.opts.title;
  return ctx.opts.variant === "pager" ? ctx.t.nav.pager : ctx.t.nav.label;
}
function rootClass(ctx, ...extra) {
  const { opts } = ctx;
  return classNames(
    ctx.displayClass,
    "quartz-nav",
    `quartz-nav--${opts.variant}`,
    `quartz-nav--mobile-${opts.mobile}`,
    ROW_VARIANTS.has(opts.variant) ? `quartz-nav--align-${opts.align}` : void 0,
    opts.variant === "flyout" && opts.flyout.side === "left" ? "quartz-nav--flyout-left" : void 0,
    opts.variant === "rail" ? `quartz-nav--rail-${opts.rail.rest}` : void 0,
    opts.variant === "rail" ? `quartz-nav--rail-${opts.rail.side}` : void 0,
    opts.className || void 0,
    ...extra
  );
}
function rootData(ctx) {
  const { opts } = ctx;
  return {
    "data-quartz-nav": ctx.id,
    "data-variant": opts.variant,
    "data-mobile": opts.mobile,
    "data-persist": opts.persistState && !POPUP_VARIANTS.has(opts.variant) ? "true" : void 0,
    "data-expand-active": opts.expandActive ? "true" : void 0,
    "data-trigger": POPUP_VARIANTS.has(opts.variant) ? opts.trigger : void 0,
    "data-flyout-side": opts.variant === "flyout" ? opts.flyout.side : void 0,
    "data-rail-rest": opts.variant === "rail" ? opts.rail.rest : void 0,
    "data-rail-expand": opts.variant === "rail" ? opts.rail.expand : void 0,
    "data-rail-content": opts.variant === "rail" ? opts.rail.content : void 0,
    "data-rail-hover-content": opts.variant === "rail" ? opts.rail.hoverContent : void 0,
    "data-rail-pin-content": opts.variant === "rail" ? opts.rail.pinContent : void 0,
    "data-rail-on-navigate": opts.variant === "rail" ? opts.rail.onNavigate : void 0,
    "data-rail-start-pinned": opts.variant === "rail" && opts.rail.pin && opts.rail.startPinned ? "true" : void 0,
    "data-bp-mobile": ctx.mobileBreakpoint
  };
}
function renderNavigation(ctx) {
  const { opts, t } = ctx;
  const { root } = ctx.scope;
  const ariaLabel = navLabel(ctx);
  const rail = opts.variant === "rail";
  const offcanvas = opts.mobile === "offcanvas";
  const toggleId = `${ctx.id}-toggle`;
  const panelId = `${ctx.id}-panel`;
  const home = opts.variant === "tabs" ? null : homeEntry(ctx);
  if (root.children.length === 0 && !home) return null;
  const body = opts.variant === "tabs" ? renderTabs(ctx) : /* @__PURE__ */ jsxs("ul", { class: "quartz-nav__list", "data-level": "1", children: [
    home,
    renderItems(root.children, 1, ctx, home !== null)
  ] });
  const title = opts.title && /* @__PURE__ */ jsx("h3", { class: "quartz-nav__title", children: opts.title });
  return /* @__PURE__ */ jsxs("nav", { class: rootClass(ctx), "aria-label": ariaLabel, ...rootData(ctx), children: [
    !rail && title,
    rail && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          class: "quartz-nav__rail-trigger",
          "aria-label": t.nav.toggleMenu,
          "aria-controls": panelId,
          "aria-expanded": "false",
          children: /* @__PURE__ */ jsx(LucideIcon, { name: opts.iconNames.menu, size: "1.5em" })
        }
      ),
      /* @__PURE__ */ jsx("div", { class: "quartz-nav__rail-backdrop", "aria-hidden": "true" })
    ] }),
    offcanvas && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          id: toggleId,
          class: "quartz-nav__toggle",
          "aria-label": t.nav.toggleMenu,
          "aria-controls": panelId,
          "aria-expanded": "false"
        }
      ),
      /* @__PURE__ */ jsx("label", { for: toggleId, class: "quartz-nav__burger", "aria-hidden": "true", children: /* @__PURE__ */ jsx(LucideIcon, { name: opts.iconNames.menu, size: "1.5em" }) }),
      /* @__PURE__ */ jsx("label", { for: toggleId, class: "quartz-nav__backdrop", "aria-hidden": "true" })
    ] }),
    opts.mobile === "select" && /* @__PURE__ */ jsx("div", { class: "quartz-nav__mobile-select", children: selectEl(ctx, `${ctx.id}-select`) }),
    /* @__PURE__ */ jsxs("div", { class: "quartz-nav__panel", id: panelId, children: [
      offcanvas && /* @__PURE__ */ jsx("label", { for: toggleId, class: "quartz-nav__close", "aria-hidden": "true", children: /* @__PURE__ */ jsx(LucideIcon, { name: opts.iconNames.close, size: "1.5em" }) }),
      rail && (title || opts.rail.pin) && /* @__PURE__ */ jsxs("div", { class: "quartz-nav__rail-head", children: [
        title,
        opts.rail.pin && /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            class: "quartz-nav__rail-pin",
            "aria-label": t.nav.pinMenu,
            "aria-pressed": "false",
            children: [
              /* @__PURE__ */ jsx(
                LucideIcon,
                {
                  name: opts.iconNames.pin,
                  className: "quartz-nav__icon quartz-nav__icon--pin"
                }
              ),
              /* @__PURE__ */ jsx(
                LucideIcon,
                {
                  name: opts.iconNames.unpin,
                  className: "quartz-nav__icon quartz-nav__icon--unpin"
                }
              )
            ]
          }
        )
      ] }),
      opts.showScopeRoot && root.title && /* @__PURE__ */ jsx("div", { class: "quartz-nav__root", children: titleEl(root, ctx, {
        className: "quartz-nav__root-link",
        typeIcon: typeIconsAt(1, ctx) ? "folder-open" : void 0,
        lead: railLead(1, root, ctx)
      }) }),
      body
    ] })
  ] });
}
function renderSelect(ctx) {
  const id = `${ctx.id}-select`;
  return /* @__PURE__ */ jsxs("nav", { class: rootClass(ctx), "aria-label": navLabel(ctx), ...rootData(ctx), children: [
    ctx.opts.title && /* @__PURE__ */ jsx("label", { class: "quartz-nav__title", for: id, children: ctx.opts.title }),
    selectEl(ctx, id)
  ] });
}
function renderPager(ctx) {
  const { prev, next } = pagerNeighbours(ctx.tree, ctx.scope, ctx.opts);
  if (!prev && !next) return null;
  const { t, opts } = ctx;
  const link = (node, rel) => {
    const target = linkTarget(node, opts);
    const arrow = /* @__PURE__ */ jsx("span", { class: "quartz-nav__pager-icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx(LucideIcon, { name: rel === "prev" ? opts.iconNames.previous : opts.iconNames.next }) });
    return /* @__PURE__ */ jsxs("a", { class: `quartz-nav__${rel}`, rel, href: hrefFor(ctx.slug, target), children: [
      rel === "prev" && arrow,
      /* @__PURE__ */ jsxs("span", { class: "quartz-nav__pager-body", children: [
        opts.pager.labels && /* @__PURE__ */ jsx("span", { class: "quartz-nav__pager-label", children: rel === "prev" ? t.nav.previous : t.nav.next }),
        /* @__PURE__ */ jsx("span", { class: "quartz-nav__pager-title", children: label(node, ctx) })
      ] }),
      rel === "next" && arrow
    ] });
  };
  return /* @__PURE__ */ jsxs("nav", { class: rootClass(ctx), "aria-label": navLabel(ctx), ...rootData(ctx), children: [
    prev ? link(prev, "prev") : /* @__PURE__ */ jsx("span", { class: "quartz-nav__prev quartz-nav__prev--empty" }),
    next ? link(next, "next") : /* @__PURE__ */ jsx("span", { class: "quartz-nav__next quartz-nav__next--empty" })
  ] });
}

// src/components/styles/navigations.scss
var navigations_default = 'html.quartz-nav-lock {\n  overflow: hidden;\n}\n\n@property --quartz-nav-rail-offset-left {\n  syntax: "<length>";\n  inherits: true;\n  initial-value: 0px;\n}\n@property --quartz-nav-rail-offset-right {\n  syntax: "<length>";\n  inherits: true;\n  initial-value: 0px;\n}\nhtml.quartz-nav-rail-push-left,\nhtml.quartz-nav-rail-push-right {\n  transition: --quartz-nav-rail-offset-left 0.2s ease, --quartz-nav-rail-offset-right 0.2s ease;\n}\n\nhtml.quartz-nav-rail-push-left body {\n  padding-left: var(--quartz-nav-rail-offset-left);\n}\n\nhtml.quartz-nav-rail-push-right body {\n  padding-right: var(--quartz-nav-rail-offset-right);\n}\n\nhtml.quartz-nav-rail-instant {\n  transition: none;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  html.quartz-nav-rail-push-left,\n  html.quartz-nav-rail-push-right {\n    transition: none;\n  }\n}\n@keyframes quartz-nav-drop {\n  from {\n    opacity: 0;\n    transform: translateY(-0.25rem);\n  }\n}\n@keyframes quartz-nav-fly {\n  from {\n    opacity: 0;\n    transform: translateX(-0.25rem);\n  }\n}\n@keyframes quartz-nav-fly-left {\n  from {\n    opacity: 0;\n    transform: translateX(0.25rem);\n  }\n}\n.quartz-nav {\n  --quartz-nav-gap: 0.25rem 0.5rem;\n  --quartz-nav-nested-gap: 0.25rem 0.5rem;\n  --quartz-nav-indent: 1rem;\n  --quartz-nav-item-padding-y: 0.2rem;\n  --quartz-nav-item-padding-x: 0.5rem;\n  --quartz-nav-radius: 4px;\n  --quartz-nav-toggle-size: 1.75rem;\n  --quartz-nav-chevron-open-rotate: 180deg;\n  --quartz-nav-title-size: 1rem;\n  --quartz-nav-title-margin: 0 0 0.5rem;\n  --quartz-nav-line-height: 1.6;\n  --quartz-nav-transition: 0.2s ease;\n  --quartz-nav-icon-size: 1.1em;\n  --quartz-nav-accent-bar: 3px;\n  --quartz-nav-level-1-size: 0.95rem;\n  --quartz-nav-level-2-size: 0.9rem;\n  --quartz-nav-level-3-size: 0.875rem;\n  --quartz-nav-level-4-size: 0.8rem;\n  --quartz-nav-level-1-weight: 700;\n  --quartz-nav-level-2-weight: 600;\n  --quartz-nav-level-3-weight: 500;\n  --quartz-nav-level-4-weight: 500;\n  --quartz-nav-page-size: 0.875rem;\n  --quartz-nav-page-weight: 400;\n  --quartz-nav-bar-weight: 500;\n  --quartz-nav-panel-min-width: 12rem;\n  --quartz-nav-panel-padding: 0.5rem;\n  --quartz-nav-panel-radius: 6px;\n  --quartz-nav-panel-z: 20;\n  --quartz-nav-mega-min-width: min(40rem, 90vw);\n  --quartz-nav-column-min-width: 10rem;\n  --quartz-nav-column-gap: 1rem 1.5rem;\n  --quartz-nav-offcanvas-width: min(20rem, 85vw);\n  --quartz-nav-offcanvas-padding: 1rem;\n  --quartz-nav-offcanvas-z: 100;\n  --quartz-nav-rail-width: 3.5rem;\n  --quartz-nav-rail-open-width: min(20rem, 100vw);\n  --quartz-nav-rail-gap: 0px;\n  --quartz-nav-rail-icon-size: 1.4rem;\n  --quartz-nav-rail-row-height: 2.75rem;\n  --quartz-nav-rail-z: 100;\n  --quartz-nav-font: var(--bodyFont, inherit);\n  --quartz-nav-heading-font: var(--headerFont, inherit);\n  --quartz-nav-color: var(--darkgray, #4e4e4e);\n  --quartz-nav-color-hover: var(--secondary, #284b63);\n  --quartz-nav-color-active: var(--secondary, #284b63);\n  --quartz-nav-color-trail: var(--secondary, #284b63);\n  --quartz-nav-color-static: var(--dark, #2b2b2b);\n  --quartz-nav-color-heading: var(--dark, #2b2b2b);\n  --quartz-nav-color-muted: var(--gray, #9c9c9c);\n  --quartz-nav-color-icon: var(--gray, #9c9c9c);\n  --quartz-nav-bg-hover: var(--highlight, rgba(143, 159, 169, 0.15));\n  --quartz-nav-bg-active: var(--highlight, rgba(143, 159, 169, 0.15));\n  --quartz-nav-bg-panel: var(--light, #fff);\n  --quartz-nav-border: var(--lightgray, #e5e5e5);\n  --quartz-nav-divider-color: var(--quartz-nav-border);\n  --quartz-nav-divider-gap: 0.375rem;\n  --quartz-nav-focus: var(--secondary, #284b63);\n  --quartz-nav-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);\n  --quartz-nav-backdrop: rgba(0, 0, 0, 0.35);\n  --quartz-nav-weight-active: 600;\n  --quartz-nav-folder-font: var(--quartz-nav-heading-font);\n  --quartz-nav-row-height: calc(\n    1em * var(--quartz-nav-line-height) + 2 * var(--quartz-nav-item-padding-y)\n  );\n  font-family: var(--quartz-nav-font);\n  line-height: var(--quartz-nav-line-height);\n}\n.quartz-nav .quartz-nav__list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.quartz-nav .quartz-nav__item {\n  margin: 0;\n}\n.quartz-nav .quartz-nav__divider {\n  margin: var(--quartz-nav-divider-gap) 0;\n  border: 0;\n  border-block-start: 1px solid var(--quartz-nav-divider-color);\n}\n.quartz-nav .quartz-nav__title {\n  margin: var(--quartz-nav-title-margin);\n  font-family: var(--quartz-nav-heading-font);\n  font-size: var(--quartz-nav-title-size);\n  color: var(--quartz-nav-color-heading);\n}\n.quartz-nav .quartz-nav__link,\n.quartz-nav .quartz-nav__summary {\n  display: flex;\n  align-items: flex-start;\n  gap: 0.4em;\n  padding: var(--quartz-nav-item-padding-y) var(--quartz-nav-item-padding-x);\n  border-radius: var(--quartz-nav-radius);\n  color: var(--quartz-nav-color);\n  text-decoration: none;\n  transition: background-color var(--quartz-nav-transition), color var(--quartz-nav-transition);\n}\n.quartz-nav .quartz-nav__link:hover,\n.quartz-nav .quartz-nav__link:focus-visible,\n.quartz-nav .quartz-nav__summary:hover,\n.quartz-nav .quartz-nav__summary:focus-visible {\n  color: var(--quartz-nav-color-hover);\n  background-color: var(--quartz-nav-bg-hover);\n}\n.quartz-nav .quartz-nav__link:focus-visible,\n.quartz-nav .quartz-nav__summary:focus-visible,\n.quartz-nav .quartz-nav__go:focus-visible,\n.quartz-nav .quartz-nav__select:focus-visible {\n  outline: 2px solid var(--quartz-nav-focus);\n  outline-offset: 1px;\n}\n.quartz-nav .quartz-nav__link--static {\n  color: var(--quartz-nav-color-static);\n  cursor: default;\n}\n.quartz-nav .quartz-nav__text {\n  min-width: 0;\n}\n.quartz-nav .quartz-nav__item {\n  --_size: var(--quartz-nav-level-4-size);\n  --_weight: var(--quartz-nav-level-4-weight);\n  --_color: var(--quartz-nav-color-muted);\n}\n.quartz-nav .quartz-nav__item--page {\n  --_size: min(var(--quartz-nav-level-4-size), var(--quartz-nav-page-size));\n  --_weight: var(--quartz-nav-page-weight);\n  --_color: var(--quartz-nav-color);\n}\n.quartz-nav [data-level="1"] > .quartz-nav__item--folder {\n  --_size: var(--quartz-nav-level-1-size);\n  --_weight: var(--quartz-nav-level-1-weight);\n  --_color: var(--quartz-nav-color-heading);\n}\n.quartz-nav [data-level="2"] > .quartz-nav__item--folder {\n  --_size: var(--quartz-nav-level-2-size);\n  --_weight: var(--quartz-nav-level-2-weight);\n  --_color: var(--quartz-nav-color-heading);\n}\n.quartz-nav [data-level="3"] > .quartz-nav__item--folder {\n  --_size: var(--quartz-nav-level-3-size);\n  --_weight: var(--quartz-nav-level-3-weight);\n  --_color: var(--quartz-nav-color);\n}\n.quartz-nav [data-level="4"] > .quartz-nav__item--folder {\n  --_color: var(--quartz-nav-color);\n}\n.quartz-nav [data-level="1"] > .quartz-nav__item--page {\n  --_size: min(var(--quartz-nav-level-1-size), var(--quartz-nav-page-size));\n}\n.quartz-nav [data-level="2"] > .quartz-nav__item--page {\n  --_size: min(var(--quartz-nav-level-2-size), var(--quartz-nav-page-size));\n}\n.quartz-nav [data-level="3"] > .quartz-nav__item--page {\n  --_size: min(var(--quartz-nav-level-3-size), var(--quartz-nav-page-size));\n}\n.quartz-nav .quartz-nav__item > .quartz-nav__link,\n.quartz-nav .quartz-nav__item > .quartz-nav__folder > .quartz-nav__summary {\n  font-size: var(--_size);\n  font-weight: var(--_weight);\n  color: var(--_color);\n}\n.quartz-nav .quartz-nav__item--folder > .quartz-nav__link,\n.quartz-nav .quartz-nav__item--folder > .quartz-nav__folder > .quartz-nav__summary {\n  font-family: var(--quartz-nav-folder-font);\n}\n.quartz-nav .quartz-nav__link.active {\n  color: var(--quartz-nav-color-active);\n  font-weight: var(--quartz-nav-weight-active);\n  background-color: var(--quartz-nav-bg-active);\n}\n.quartz-nav .quartz-nav__link.active-trail,\n.quartz-nav .quartz-nav__item.active-trail > .quartz-nav__folder > .quartz-nav__summary {\n  color: var(--quartz-nav-color-trail);\n}\n.quartz-nav .quartz-nav__icon {\n  flex: none;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: var(--quartz-nav-icon-size);\n  height: var(--quartz-nav-icon-size);\n}\n.quartz-nav span.quartz-nav__icon {\n  height: 1lh;\n}\n.quartz-nav svg.quartz-nav__icon {\n  margin-block: calc((1lh - var(--quartz-nav-icon-size)) / 2);\n}\n.quartz-nav svg.quartz-nav__icon {\n  color: var(--quartz-nav-color-icon);\n}\n.quartz-nav .active > svg.quartz-nav__icon,\n.quartz-nav .active-trail > svg.quartz-nav__icon,\n.quartz-nav .quartz-nav__item.active-trail > .quartz-nav__folder > .quartz-nav__summary svg.quartz-nav__icon {\n  color: currentColor;\n}\n.quartz-nav .quartz-nav__icon--folder + .quartz-nav__icon--folder-open {\n  display: none;\n}\n.quartz-nav details[open] > .quartz-nav__summary .quartz-nav__icon--folder,\n.quartz-nav .quartz-nav__item:has(> details[open]) > .quartz-nav__link .quartz-nav__icon--folder {\n  display: none;\n}\n.quartz-nav details[open] > .quartz-nav__summary .quartz-nav__icon--folder + .quartz-nav__icon--folder-open,\n.quartz-nav .quartz-nav__item:has(> details[open]) > .quartz-nav__link .quartz-nav__icon--folder + .quartz-nav__icon--folder-open {\n  display: inline-flex;\n}\n.quartz-nav .quartz-nav__summary {\n  cursor: pointer;\n  list-style: none;\n}\n.quartz-nav .quartz-nav__summary::-webkit-details-marker {\n  display: none;\n}\n.quartz-nav .quartz-nav__summary::before, .quartz-nav .quartz-nav__summary::after {\n  content: none !important;\n  display: none !important;\n}\n.quartz-nav .quartz-nav__summary > .quartz-nav__link {\n  flex: 1;\n  min-width: 0;\n  padding: 0;\n  border-radius: 0;\n  background: none;\n  font: inherit;\n  color: inherit;\n  cursor: inherit;\n}\n.quartz-nav .quartz-nav__chevron {\n  display: inline-flex;\n  align-items: center;\n  height: 1lh;\n  flex: none;\n  margin-left: auto;\n  color: var(--quartz-nav-color-muted);\n  transition: transform var(--quartz-nav-transition);\n}\n.quartz-nav details[open] > .quartz-nav__summary .quartz-nav__chevron {\n  transform: rotate(var(--quartz-nav-chevron-open-rotate));\n}\n.quartz-nav .quartz-nav__sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0 0 0 0);\n  white-space: nowrap;\n  border: 0;\n}\n.quartz-nav .quartz-nav__item--split {\n  position: relative;\n}\n.quartz-nav .quartz-nav__item--split > .quartz-nav__link {\n  padding-right: calc(var(--quartz-nav-toggle-size) + 0.25rem);\n}\n.quartz-nav .quartz-nav__summary--toggle {\n  position: absolute;\n  top: 0;\n  right: 0;\n  align-items: center;\n  justify-content: center;\n  width: var(--quartz-nav-toggle-size);\n  height: var(--quartz-nav-row-height);\n  padding: 0;\n}\n.quartz-nav .quartz-nav__folder[data-animate][open] > .quartz-nav__list {\n  animation: quartz-nav-drop var(--quartz-nav-transition);\n}\n.quartz-nav .quartz-nav__list .quartz-nav__list {\n  padding-left: var(--quartz-nav-indent);\n}\n.quartz-nav .quartz-nav__root {\n  margin-bottom: 0.5rem;\n  font-family: var(--quartz-nav-heading-font);\n  font-size: 1.05rem;\n}\n.quartz-nav .quartz-nav__root-link {\n  color: var(--quartz-nav-color-heading);\n}\n.quartz-nav .quartz-nav__jump {\n  display: flex;\n  align-items: center;\n  gap: 0.35rem;\n}\n.quartz-nav .quartz-nav__select {\n  max-width: 100%;\n}\n.quartz-nav .quartz-nav__select,\n.quartz-nav .quartz-nav__go {\n  font: inherit;\n  color: var(--quartz-nav-color-heading);\n  background-color: var(--quartz-nav-bg-panel);\n  border: 1px solid var(--quartz-nav-border);\n  border-radius: var(--quartz-nav-panel-radius);\n  padding: 0.35rem 0.5rem;\n  transition: border-color var(--quartz-nav-transition), color var(--quartz-nav-transition);\n}\n.quartz-nav .quartz-nav__go {\n  cursor: pointer;\n}\n.quartz-nav .quartz-nav__go:hover {\n  border-color: var(--quartz-nav-color-hover);\n  color: var(--quartz-nav-color-hover);\n}\n.quartz-nav .quartz-nav__toggle,\n.quartz-nav .quartz-nav__burger,\n.quartz-nav .quartz-nav__backdrop,\n.quartz-nav .quartz-nav__close,\n.quartz-nav .quartz-nav__rail-backdrop,\n.quartz-nav .quartz-nav__mobile-select {\n  display: none;\n}\n.quartz-nav.quartz-nav--bar > .quartz-nav__panel > .quartz-nav__list,\n.quartz-nav.quartz-nav--bar > .quartz-nav__panel > .quartz-nav__tabs, .quartz-nav.quartz-nav--dropdown > .quartz-nav__panel > .quartz-nav__list,\n.quartz-nav.quartz-nav--dropdown > .quartz-nav__panel > .quartz-nav__tabs, .quartz-nav.quartz-nav--mega > .quartz-nav__panel > .quartz-nav__list,\n.quartz-nav.quartz-nav--mega > .quartz-nav__panel > .quartz-nav__tabs, .quartz-nav.quartz-nav--tabs > .quartz-nav__panel > .quartz-nav__list,\n.quartz-nav.quartz-nav--tabs > .quartz-nav__panel > .quartz-nav__tabs {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--quartz-nav-gap);\n}\n.quartz-nav.quartz-nav--bar > .quartz-nav__panel > [data-level="1"] > .quartz-nav__divider, .quartz-nav.quartz-nav--dropdown > .quartz-nav__panel > [data-level="1"] > .quartz-nav__divider, .quartz-nav.quartz-nav--mega > .quartz-nav__panel > [data-level="1"] > .quartz-nav__divider, .quartz-nav.quartz-nav--tabs > .quartz-nav__panel > [data-level="1"] > .quartz-nav__divider {\n  align-self: stretch;\n  margin: var(--quartz-nav-divider-gap) 0;\n  border-block-start: 0;\n  border-inline-start: 1px solid var(--quartz-nav-divider-color);\n}\n.quartz-nav.quartz-nav--bar .quartz-nav__list .quartz-nav__list > .quartz-nav__divider, .quartz-nav.quartz-nav--tabs .quartz-nav__subtabs > .quartz-nav__divider, .quartz-nav.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list > .quartz-nav__divider {\n  align-self: stretch;\n  margin: 0;\n  border-block-start: 0;\n  border-inline-start: 1px solid var(--quartz-nav-divider-color);\n}\n.quartz-nav.quartz-nav--columns > .quartz-nav__panel > .quartz-nav__list > .quartz-nav__divider {\n  grid-column: 1/-1;\n  margin: 0;\n}\n.quartz-nav.quartz-nav--bar > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__link,\n.quartz-nav.quartz-nav--bar > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > details > summary,\n.quartz-nav.quartz-nav--bar .quartz-nav__subtabs .quartz-nav__link, .quartz-nav.quartz-nav--dropdown > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__link,\n.quartz-nav.quartz-nav--dropdown > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > details > summary,\n.quartz-nav.quartz-nav--dropdown .quartz-nav__subtabs .quartz-nav__link, .quartz-nav.quartz-nav--mega > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__link,\n.quartz-nav.quartz-nav--mega > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > details > summary,\n.quartz-nav.quartz-nav--mega .quartz-nav__subtabs .quartz-nav__link, .quartz-nav.quartz-nav--tabs > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__link,\n.quartz-nav.quartz-nav--tabs > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > details > summary,\n.quartz-nav.quartz-nav--tabs .quartz-nav__subtabs .quartz-nav__link {\n  white-space: nowrap;\n}\n.quartz-nav.quartz-nav--align-center > .quartz-nav__panel > [data-level="1"] {\n  justify-content: center;\n}\n.quartz-nav.quartz-nav--align-right > .quartz-nav__panel > [data-level="1"] {\n  justify-content: flex-end;\n}\n.quartz-nav.quartz-nav--align-full > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item {\n  flex: 1 1 0;\n  min-width: max-content;\n  text-align: center;\n}\n.quartz-nav.quartz-nav--align-full > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__link,\n.quartz-nav.quartz-nav--align-full > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__folder > .quartz-nav__summary {\n  justify-content: center;\n}\n.quartz-nav.quartz-nav--align-full > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__folder > .quartz-nav__summary > .quartz-nav__link {\n  flex: 0 1 auto;\n}\n.quartz-nav.quartz-nav--tabs.quartz-nav--align-center .quartz-nav__subtabs {\n  justify-content: center;\n}\n.quartz-nav.quartz-nav--tabs.quartz-nav--align-right .quartz-nav__subtabs {\n  justify-content: flex-end;\n}\n.quartz-nav.quartz-nav--bar > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item, .quartz-nav.quartz-nav--dropdown > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item, .quartz-nav.quartz-nav--mega > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item, .quartz-nav.quartz-nav--tabs > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item {\n  --_size: var(--quartz-nav-level-1-size);\n  --_weight: var(--quartz-nav-bar-weight);\n  --_color: var(--quartz-nav-color);\n}\n.quartz-nav.quartz-nav--bar .quartz-nav__list .quartz-nav__list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--quartz-nav-nested-gap);\n  padding-left: 0;\n}\n.quartz-nav.quartz-nav--bar .quartz-nav__item--parent {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--quartz-nav-nested-gap);\n}\n.quartz-nav.quartz-nav--bar .quartz-nav__item--parent > .quartz-nav__link .quartz-nav__text::after {\n  content: ":"/"";\n}\n.quartz-nav.quartz-nav--dropdown .quartz-nav__item--folder, .quartz-nav.quartz-nav--mega .quartz-nav__item--folder, .quartz-nav.quartz-nav--flyout .quartz-nav__item--folder {\n  position: relative;\n}\n.quartz-nav.quartz-nav--dropdown .quartz-nav__folder > .quartz-nav__list .quartz-nav__link, .quartz-nav.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list .quartz-nav__link, .quartz-nav.quartz-nav--flyout .quartz-nav__folder > .quartz-nav__list .quartz-nav__link {\n  white-space: nowrap;\n}\n.quartz-nav.quartz-nav--dropdown .quartz-nav__folder > .quartz-nav__list, .quartz-nav.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list, .quartz-nav.quartz-nav--flyout .quartz-nav__folder > .quartz-nav__list {\n  position: absolute;\n  z-index: var(--quartz-nav-panel-z);\n  min-width: var(--quartz-nav-panel-min-width);\n  padding: var(--quartz-nav-panel-padding);\n  background: var(--quartz-nav-bg-panel);\n  border: 1px solid var(--quartz-nav-border);\n  border-radius: var(--quartz-nav-panel-radius);\n  box-shadow: var(--quartz-nav-shadow);\n}\n.quartz-nav.quartz-nav--dropdown .quartz-nav__folder > .quartz-nav__list, .quartz-nav.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list {\n  top: calc(100% + 0.25rem);\n  left: 0;\n}\n.quartz-nav.quartz-nav--dropdown .quartz-nav__folder .quartz-nav__list .quartz-nav__list, .quartz-nav.quartz-nav--mega .quartz-nav__folder .quartz-nav__list .quartz-nav__list {\n  position: static;\n  min-width: 0;\n  padding: 0 0 0 var(--quartz-nav-indent);\n  background: none;\n  border: 0;\n  box-shadow: none;\n}\n.quartz-nav.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  gap: var(--quartz-nav-column-gap);\n  min-width: var(--quartz-nav-mega-min-width);\n  padding: calc(var(--quartz-nav-panel-padding) * 2);\n}\n.quartz-nav.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list > .quartz-nav__item {\n  flex: 1 1 var(--quartz-nav-column-min-width);\n}\n.quartz-nav.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list > .quartz-nav__item > .quartz-nav__list {\n  padding-left: 0;\n}\n.quartz-nav .quartz-nav__folder > .quartz-nav__list[popover] {\n  inset: auto;\n  margin: 0;\n  width: max-content;\n  max-width: calc(100vw - 1rem);\n  color: inherit;\n  overflow: visible;\n}\n.quartz-nav.quartz-nav--dropdown .quartz-nav__folder > .quartz-nav__list--flip, .quartz-nav.quartz-nav--mega .quartz-nav__folder > .quartz-nav__list--flip {\n  left: auto;\n  right: 0;\n}\n.quartz-nav.quartz-nav--flyout {\n  --quartz-nav-chevron-open-rotate: -90deg;\n}\n.quartz-nav.quartz-nav--flyout .quartz-nav__folder > .quartz-nav__list {\n  top: 0;\n  left: calc(100% + 0.25rem);\n}\n.quartz-nav.quartz-nav--flyout .quartz-nav__folder[data-animate][open] > .quartz-nav__list {\n  animation-name: quartz-nav-fly;\n}\n.quartz-nav.quartz-nav--flyout-left {\n  --quartz-nav-chevron-open-rotate: 90deg;\n}\n.quartz-nav.quartz-nav--flyout-left .quartz-nav__folder > .quartz-nav__list {\n  left: auto;\n  right: calc(100% + 0.25rem);\n}\n.quartz-nav.quartz-nav--flyout-left .quartz-nav__folder[data-animate][open] > .quartz-nav__list {\n  animation-name: quartz-nav-fly-left;\n}\n.quartz-nav.quartz-nav--tabs .quartz-nav__tabs {\n  border-bottom: 1px solid var(--quartz-nav-border);\n}\n.quartz-nav.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item > .quartz-nav__link {\n  padding: 0.35rem 0.5rem;\n  border-radius: 0;\n  border-bottom: 2px solid transparent;\n  margin-bottom: -1px;\n  transition: color var(--quartz-nav-transition), border-color var(--quartz-nav-transition);\n}\n.quartz-nav.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item > .quartz-nav__link:hover, .quartz-nav.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item > .quartz-nav__link:focus-visible {\n  background: none;\n}\n.quartz-nav.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item.active > .quartz-nav__link,\n.quartz-nav.quartz-nav--tabs .quartz-nav__tabs > .quartz-nav__item.active-trail > .quartz-nav__link {\n  color: var(--quartz-nav-color-active);\n  border-bottom-color: var(--quartz-nav-color-active);\n}\n.quartz-nav.quartz-nav--tabs .quartz-nav__subtabs {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--quartz-nav-nested-gap);\n  padding: 0.35rem 0 0;\n}\n.quartz-nav.quartz-nav--tabs .quartz-nav__subtabs .quartz-nav__list {\n  display: none;\n}\n.quartz-nav.quartz-nav--columns > .quartz-nav__panel > .quartz-nav__list {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(var(--quartz-nav-column-min-width), 1fr));\n  gap: var(--quartz-nav-column-gap);\n}\n.quartz-nav.quartz-nav--columns .quartz-nav__list .quartz-nav__list {\n  padding-left: 0;\n}\n.quartz-nav.quartz-nav--columns > .quartz-nav__panel > .quartz-nav__list > .quartz-nav__item > .quartz-nav__link {\n  margin-bottom: 0.25rem;\n}\n.quartz-nav.quartz-nav--tree .quartz-nav__item > .quartz-nav__link.active, .quartz-nav.quartz-nav--accordion .quartz-nav__item > .quartz-nav__link.active, .quartz-nav.quartz-nav--flyout .quartz-nav__item > .quartz-nav__link.active, .quartz-nav.quartz-nav--rail .quartz-nav__item > .quartz-nav__link.active {\n  position: relative;\n}\n.quartz-nav.quartz-nav--tree .quartz-nav__item > .quartz-nav__link.active::after, .quartz-nav.quartz-nav--accordion .quartz-nav__item > .quartz-nav__link.active::after, .quartz-nav.quartz-nav--flyout .quartz-nav__item > .quartz-nav__link.active::after, .quartz-nav.quartz-nav--rail .quartz-nav__item > .quartz-nav__link.active::after {\n  content: "";\n  position: absolute;\n  inset-inline-start: calc(var(--quartz-nav-item-padding-x) * -1);\n  inset-block: 0.3em;\n  width: var(--quartz-nav-accent-bar);\n  border-radius: 1px;\n  background: var(--quartz-nav-color-active);\n}\n.quartz-nav.quartz-nav--tree .quartz-nav__list .quartz-nav__list, .quartz-nav.quartz-nav--accordion .quartz-nav__list .quartz-nav__list {\n  border-left: 1px solid var(--quartz-nav-border);\n  margin-left: calc(var(--quartz-nav-item-padding-x) + 0.1rem);\n  padding-left: calc(var(--quartz-nav-indent) - var(--quartz-nav-item-padding-x));\n}\n.quartz-nav.quartz-nav--tree .quartz-nav__list .quartz-nav__list:has(> .quartz-nav__item.active), .quartz-nav.quartz-nav--accordion .quartz-nav__list .quartz-nav__list:has(> .quartz-nav__item.active) {\n  border-left-color: var(--quartz-nav-color-active);\n}\n.quartz-nav.quartz-nav--pager {\n  display: flex;\n  justify-content: space-between;\n  gap: 1rem;\n  margin: 1.5rem 0;\n  padding-top: 1rem;\n  border-top: 1px solid var(--quartz-nav-border);\n}\n.quartz-nav.quartz-nav--pager .quartz-nav__prev,\n.quartz-nav.quartz-nav--pager .quartz-nav__next {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.5rem;\n  max-width: 48%;\n  padding: 0.5rem 0.75rem;\n  border: 1px solid var(--quartz-nav-border);\n  border-radius: var(--quartz-nav-panel-radius);\n  color: var(--quartz-nav-color);\n  text-decoration: none;\n  transition: border-color var(--quartz-nav-transition), color var(--quartz-nav-transition);\n}\n.quartz-nav.quartz-nav--pager .quartz-nav__prev:hover, .quartz-nav.quartz-nav--pager .quartz-nav__prev:focus-visible,\n.quartz-nav.quartz-nav--pager .quartz-nav__next:hover,\n.quartz-nav.quartz-nav--pager .quartz-nav__next:focus-visible {\n  border-color: var(--quartz-nav-color-hover);\n  color: var(--quartz-nav-color-hover);\n}\n.quartz-nav.quartz-nav--pager .quartz-nav__next {\n  margin-left: auto;\n  text-align: right;\n}\n.quartz-nav.quartz-nav--pager .quartz-nav__prev--empty,\n.quartz-nav.quartz-nav--pager .quartz-nav__next--empty {\n  display: none;\n}\n.quartz-nav.quartz-nav--pager .quartz-nav__pager-body {\n  display: flex;\n  flex-direction: column;\n}\n.quartz-nav.quartz-nav--pager .quartz-nav__next .quartz-nav__pager-body {\n  align-items: flex-end;\n}\n.quartz-nav.quartz-nav--pager .quartz-nav__pager-icon {\n  display: inline-flex;\n  flex: none;\n  color: var(--quartz-nav-color-muted);\n}\n.quartz-nav.quartz-nav--pager .quartz-nav__pager-label {\n  font-size: 0.8em;\n  color: var(--quartz-nav-color-muted);\n}\n.quartz-nav.quartz-nav--pager .quartz-nav__pager-title {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.4em;\n}\n@media (max-width: __NAV_BP_MOBILE__) {\n  .quartz-nav.quartz-nav--pager {\n    flex-direction: column;\n  }\n  .quartz-nav.quartz-nav--pager .quartz-nav__prev,\n  .quartz-nav.quartz-nav--pager .quartz-nav__next {\n    max-width: 100%;\n  }\n  .quartz-nav.quartz-nav--pager .quartz-nav__next {\n    margin-left: 0;\n    text-align: left;\n  }\n  .quartz-nav.quartz-nav--pager .quartz-nav__next .quartz-nav__pager-body {\n    align-items: flex-start;\n  }\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-trigger {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0.25rem;\n  border: 0;\n  border-radius: var(--quartz-nav-radius);\n  background: none;\n  color: var(--quartz-nav-color-heading);\n  font: inherit;\n  cursor: pointer;\n  transition: background-color var(--quartz-nav-transition), color var(--quartz-nav-transition);\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-trigger:hover {\n  background-color: var(--quartz-nav-bg-hover);\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-trigger[aria-expanded=true] {\n  color: var(--quartz-nav-color-active);\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-trigger:focus-visible {\n  outline: 2px solid var(--quartz-nav-focus);\n  outline-offset: 2px;\n}\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel {\n  position: fixed;\n  inset: var(--quartz-nav-rail-top, var(--_rail-top, 0px)) auto 0 0;\n  z-index: var(--quartz-nav-rail-z);\n  box-sizing: border-box;\n  width: var(--quartz-nav-rail-width);\n  height: auto;\n  max-width: none;\n  margin: 0;\n  padding: 0;\n  overflow: hidden auto;\n  overscroll-behavior: contain;\n  scrollbar-width: none;\n  color: inherit;\n  background: var(--quartz-nav-bg-panel);\n  border: 0;\n  border-right: 1px solid var(--quartz-nav-border);\n  transition: transform var(--quartz-nav-transition), width var(--quartz-nav-transition), visibility var(--quartz-nav-transition), box-shadow var(--quartz-nav-transition);\n}\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > * {\n  box-sizing: border-box;\n  width: var(--quartz-nav-rail-open-width);\n}\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > .quartz-nav__list {\n  padding-block: 0.5rem;\n}\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > .quartz-nav__root {\n  margin: 0;\n  padding-top: 0.5rem;\n}\n.quartz-nav.quartz-nav--rail.quartz-nav--rail-right > .quartz-nav__panel {\n  inset: var(--quartz-nav-rail-top, var(--_rail-top, 0px)) 0 0 auto;\n  border-right: 0;\n  border-left: 1px solid var(--quartz-nav-border);\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-head {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  min-height: var(--quartz-nav-rail-row-height);\n  padding-block: 0.25rem 0;\n  padding-inline: var(--quartz-nav-rail-width) var(--quartz-nav-item-padding-x);\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-head > .quartz-nav__title {\n  flex: 1;\n  min-width: 0;\n  margin: 0;\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-pin {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  margin-inline-start: auto;\n  padding: 0.3rem;\n  border: 0;\n  border-radius: var(--quartz-nav-radius);\n  background: none;\n  color: var(--quartz-nav-color-muted);\n  font: inherit;\n  cursor: pointer;\n  transition: background-color var(--quartz-nav-transition), color var(--quartz-nav-transition);\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-pin .quartz-nav__icon {\n  margin: 0;\n  color: currentColor;\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-pin .quartz-nav__icon--unpin {\n  display: none;\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-pin:hover {\n  color: var(--quartz-nav-color-hover);\n  background-color: var(--quartz-nav-bg-hover);\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-pin:focus-visible {\n  outline: 2px solid var(--quartz-nav-focus);\n  outline-offset: 1px;\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-pin[aria-pressed=true] {\n  color: var(--quartz-nav-color-active);\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-pin[aria-pressed=true] .quartz-nav__icon--pin {\n  display: none;\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__rail-pin[aria-pressed=true] .quartz-nav__icon--unpin {\n  display: inline-flex;\n}\n.quartz-nav.quartz-nav--rail[data-rail-instant] > .quartz-nav__panel {\n  transition: none;\n}\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__link,\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > details > .quartz-nav__summary,\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > .quartz-nav__root > .quartz-nav__link {\n  align-items: center;\n  gap: 0;\n  min-height: var(--quartz-nav-rail-row-height);\n  padding-block: 0;\n  padding-inline: 0 var(--quartz-nav-item-padding-x);\n  border-radius: 0;\n}\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__link > .quartz-nav__icon,\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__link > .quartz-nav__link > .quartz-nav__icon,\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > details > .quartz-nav__summary > .quartz-nav__icon,\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > details > .quartz-nav__summary > .quartz-nav__link > .quartz-nav__icon,\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > .quartz-nav__root > .quartz-nav__link > .quartz-nav__icon,\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > .quartz-nav__root > .quartz-nav__link > .quartz-nav__link > .quartz-nav__icon {\n  box-sizing: border-box;\n  width: var(--quartz-nav-rail-icon-size);\n  height: var(--quartz-nav-rail-icon-size);\n  margin-block: 0;\n  margin-inline: calc((var(--quartz-nav-rail-width) - var(--quartz-nav-rail-icon-size)) / 2);\n  font-size: calc(var(--quartz-nav-rail-icon-size) * 0.8);\n  line-height: 1;\n}\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__link > .quartz-nav__link,\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > details > .quartz-nav__summary > .quartz-nav__link,\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > .quartz-nav__root > .quartz-nav__link > .quartz-nav__link {\n  align-items: center;\n  gap: 0;\n}\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__link .quartz-nav__chevron,\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > details > .quartz-nav__summary .quartz-nav__chevron,\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > .quartz-nav__root > .quartz-nav__link .quartz-nav__chevron {\n  height: auto;\n}\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item--split > .quartz-nav__link {\n  padding-right: calc(var(--quartz-nav-toggle-size) + 0.25rem);\n}\n.quartz-nav.quartz-nav--rail > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__summary--toggle {\n  top: calc((var(--quartz-nav-rail-row-height) - var(--quartz-nav-row-height)) / 2);\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__item > .quartz-nav__link.active::after {\n  inset-inline-start: 0;\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__monogram {\n  border-radius: 50%;\n  background: var(--quartz-nav-bg-hover);\n  color: var(--quartz-nav-color-heading);\n  font-family: var(--quartz-nav-heading-font);\n  font-weight: 600;\n}\n.quartz-nav.quartz-nav--rail .active > .quartz-nav__monogram,\n.quartz-nav.quartz-nav--rail .active-trail > .quartz-nav__monogram,\n.quartz-nav.quartz-nav--rail .quartz-nav__item.active-trail > details > .quartz-nav__summary .quartz-nav__monogram {\n  background: var(--quartz-nav-color-active);\n  color: var(--quartz-nav-bg-panel);\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__list .quartz-nav__list {\n  margin-inline: calc(var(--quartz-nav-rail-width) / 2) 0;\n  padding-inline: calc(var(--quartz-nav-rail-width) / 2 - var(--quartz-nav-item-padding-x)) 0;\n  border: 0;\n  border-inline-start: 1px solid var(--quartz-nav-border);\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__list .quartz-nav__list:has(> .quartz-nav__item.active) {\n  border-inline-start-color: var(--quartz-nav-color-active);\n}\n.quartz-nav.quartz-nav--rail .quartz-nav__list .quartz-nav__list .quartz-nav__list {\n  margin-inline: calc(var(--quartz-nav-item-padding-x) + 0.1rem) 0;\n  padding-inline: calc(var(--quartz-nav-indent) - var(--quartz-nav-item-padding-x)) 0;\n}\n.quartz-nav.quartz-nav--rail[data-rail-state=part] > .quartz-nav__panel .quartz-nav__list .quartz-nav__list, .quartz-nav.quartz-nav--rail.quartz-nav--rail-icons:not([data-rail-state=open]) > .quartz-nav__panel .quartz-nav__list .quartz-nav__list {\n  display: none;\n}\n.quartz-nav.quartz-nav--rail[data-rail-state=part] > .quartz-nav__panel > .quartz-nav__rail-head, .quartz-nav.quartz-nav--rail.quartz-nav--rail-icons:not([data-rail-state=open]) > .quartz-nav__panel > .quartz-nav__rail-head {\n  visibility: hidden;\n}\n.quartz-nav.quartz-nav--rail.quartz-nav--rail-hidden:not([data-rail-state=part], [data-rail-state=open]) > .quartz-nav__panel {\n  visibility: hidden;\n  transform: translateX(-100%);\n}\n.quartz-nav.quartz-nav--rail.quartz-nav--rail-hidden.quartz-nav--rail-right:not([data-rail-state=part],\n[data-rail-state=open]) > .quartz-nav__panel {\n  transform: translateX(100%);\n}\n.quartz-nav.quartz-nav--rail[data-rail-state=open] > .quartz-nav__panel, .quartz-nav.quartz-nav--rail:not([data-rail-state]):focus-within > .quartz-nav__panel {\n  visibility: visible;\n  width: var(--quartz-nav-rail-open-width);\n  transform: none;\n  scrollbar-width: thin;\n  box-shadow: var(--quartz-nav-shadow);\n}\n.quartz-nav.quartz-nav--rail[data-rail-pushing] > .quartz-nav__panel {\n  box-shadow: none;\n}\n@media not all and (max-width: __NAV_BP_MOBILE__) {\n  .quartz-nav details[data-mobile-collapsible] > .quartz-nav__summary--toggle {\n    visibility: hidden;\n  }\n  .quartz-nav .quartz-nav__item--split:has(details[data-mobile-collapsible]) > .quartz-nav__link {\n    padding-right: var(--quartz-nav-item-padding-x);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .quartz-nav {\n    --quartz-nav-transition: 0s;\n  }\n}\n@media all and (max-width: __NAV_BP_MOBILE__) {\n  .quartz-nav.quartz-nav--mobile-hidden {\n    display: none;\n  }\n  .quartz-nav.quartz-nav--mobile-accordion > .quartz-nav__panel > .quartz-nav__list,\n  .quartz-nav.quartz-nav--mobile-accordion > .quartz-nav__panel > .quartz-nav__tabs,\n  .quartz-nav.quartz-nav--mobile-accordion .quartz-nav__subtabs,\n  .quartz-nav.quartz-nav--mobile-accordion .quartz-nav__item--parent, .quartz-nav.quartz-nav--mobile-offcanvas > .quartz-nav__panel > .quartz-nav__list,\n  .quartz-nav.quartz-nav--mobile-offcanvas > .quartz-nav__panel > .quartz-nav__tabs,\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__subtabs,\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__item--parent {\n    display: block;\n  }\n  .quartz-nav.quartz-nav--mobile-accordion > .quartz-nav__panel > [data-level="1"] > .quartz-nav__divider,\n  .quartz-nav.quartz-nav--mobile-accordion .quartz-nav__list .quartz-nav__list > .quartz-nav__divider,\n  .quartz-nav.quartz-nav--mobile-accordion .quartz-nav__subtabs > .quartz-nav__divider, .quartz-nav.quartz-nav--mobile-offcanvas > .quartz-nav__panel > [data-level="1"] > .quartz-nav__divider,\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__list .quartz-nav__list > .quartz-nav__divider,\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__subtabs > .quartz-nav__divider {\n    margin: var(--quartz-nav-divider-gap) 0;\n    border-inline-start: 0;\n    border-block-start: 1px solid var(--quartz-nav-divider-color);\n  }\n  .quartz-nav.quartz-nav--mobile-accordion .quartz-nav__list .quartz-nav__list,\n  .quartz-nav.quartz-nav--mobile-accordion .quartz-nav__folder > .quartz-nav__list,\n  .quartz-nav.quartz-nav--mobile-accordion .quartz-nav__folder > .quartz-nav__list--flip, .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__list .quartz-nav__list,\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__folder > .quartz-nav__list,\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__folder > .quartz-nav__list--flip {\n    display: block;\n    position: static;\n    min-width: 0;\n    padding: 0 0 0 var(--quartz-nav-indent);\n    background: none;\n    border: 0;\n    box-shadow: none;\n  }\n  .quartz-nav.quartz-nav--mobile-accordion .quartz-nav__item--parent > .quartz-nav__link .quartz-nav__text::after, .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__item--parent > .quartz-nav__link .quartz-nav__text::after {\n    content: none;\n  }\n  .quartz-nav.quartz-nav--mobile-accordion > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item, .quartz-nav.quartz-nav--mobile-offcanvas > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item {\n    text-align: start;\n    min-width: 0;\n  }\n  .quartz-nav.quartz-nav--mobile-accordion .quartz-nav__link,\n  .quartz-nav.quartz-nav--mobile-accordion .quartz-nav__summary, .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__link,\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__summary {\n    white-space: normal;\n  }\n  .quartz-nav.quartz-nav--mobile-accordion > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__link,\n  .quartz-nav.quartz-nav--mobile-accordion > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > details > summary, .quartz-nav.quartz-nav--mobile-offcanvas > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > .quartz-nav__link,\n  .quartz-nav.quartz-nav--mobile-offcanvas > .quartz-nav__panel > [data-level="1"] > .quartz-nav__item > details > summary {\n    justify-content: flex-start;\n  }\n  .quartz-nav.quartz-nav--mobile-accordion .quartz-nav__folder[data-animate][open] > .quartz-nav__list, .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__folder[data-animate][open] > .quartz-nav__list {\n    animation-name: quartz-nav-drop;\n  }\n  .quartz-nav.quartz-nav--rail .quartz-nav__rail-backdrop {\n    display: block;\n    position: fixed;\n    inset: 0;\n    z-index: calc(var(--quartz-nav-rail-z) - 1);\n    background: var(--quartz-nav-backdrop);\n    visibility: hidden;\n    opacity: 0;\n    transition: opacity var(--quartz-nav-transition), visibility var(--quartz-nav-transition);\n  }\n  .quartz-nav.quartz-nav--rail[data-rail-state=open] > .quartz-nav__rail-backdrop {\n    visibility: visible;\n    opacity: 1;\n  }\n  .quartz-nav.quartz-nav--rail.quartz-nav--rail-icons:not([data-rail-state=open]) > .quartz-nav__panel {\n    visibility: hidden;\n    transform: translateX(-100%);\n  }\n  .quartz-nav.quartz-nav--rail.quartz-nav--rail-icons.quartz-nav--rail-right:not([data-rail-state=open]) > .quartz-nav__panel {\n    transform: translateX(100%);\n  }\n  .quartz-nav.quartz-nav--rail.quartz-nav--rail-icons:not([data-rail-state]):focus-within > .quartz-nav__panel {\n    visibility: visible;\n    transform: none;\n  }\n  .quartz-nav.quartz-nav--rail.quartz-nav--mobile-select > .quartz-nav__rail-trigger {\n    display: none;\n  }\n  .quartz-nav.quartz-nav--rail .quartz-nav__rail-pin {\n    display: none;\n  }\n  .quartz-nav.quartz-nav--mobile-select .quartz-nav__mobile-select {\n    display: block;\n  }\n  .quartz-nav.quartz-nav--mobile-select .quartz-nav__panel {\n    display: none;\n  }\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__burger {\n    display: inline-flex;\n    padding: 0.25rem;\n    border-radius: var(--quartz-nav-radius);\n    color: var(--quartz-nav-color-heading);\n    cursor: pointer;\n    transition: background-color var(--quartz-nav-transition);\n  }\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__burger:hover {\n    background-color: var(--quartz-nav-bg-hover);\n  }\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__toggle {\n    display: block;\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    margin: -1px;\n    padding: 0;\n    overflow: hidden;\n    clip: rect(0 0 0 0);\n    white-space: nowrap;\n    border: 0;\n  }\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__panel {\n    position: fixed;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    z-index: var(--quartz-nav-offcanvas-z);\n    width: var(--quartz-nav-offcanvas-width);\n    overflow-y: auto;\n    padding: var(--quartz-nav-offcanvas-padding);\n    padding-top: calc(var(--quartz-nav-offcanvas-padding) + 2rem);\n    box-sizing: border-box;\n    background: var(--quartz-nav-bg-panel);\n    box-shadow: var(--quartz-nav-shadow);\n    transform: translateX(-100%);\n    transition: transform var(--quartz-nav-transition);\n  }\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__close {\n    display: inline-flex;\n    position: absolute;\n    top: 0.5rem;\n    right: 0.5rem;\n    padding: 0.25rem;\n    border-radius: var(--quartz-nav-radius);\n    color: var(--quartz-nav-color-muted);\n    cursor: pointer;\n  }\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__close:hover {\n    color: var(--quartz-nav-color-hover);\n    background-color: var(--quartz-nav-bg-hover);\n  }\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__backdrop {\n    display: block;\n    position: fixed;\n    inset: 0;\n    z-index: calc(var(--quartz-nav-offcanvas-z) - 1);\n    background: var(--quartz-nav-backdrop);\n    visibility: hidden;\n    opacity: 0;\n    transition: opacity var(--quartz-nav-transition), visibility var(--quartz-nav-transition);\n  }\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__toggle:checked ~ .quartz-nav__panel {\n    transform: translateX(0);\n  }\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__toggle:checked ~ .quartz-nav__backdrop {\n    visibility: visible;\n    opacity: 1;\n  }\n  .quartz-nav.quartz-nav--mobile-offcanvas .quartz-nav__toggle:focus-visible ~ .quartz-nav__burger {\n    outline: 2px solid var(--quartz-nav-focus);\n    outline-offset: 2px;\n  }\n}\n\n:root[saved-theme=dark] .quartz-nav {\n  --quartz-nav-shadow: 0 6px 24px rgba(0, 0, 0, 0.6);\n  --quartz-nav-backdrop: rgba(0, 0, 0, 0.55);\n}';

// src/scripts/navigations.inline.ts
var navigations_inline_default = 'var Ye=["dropdown","mega","flyout"],x="quartz-nav-lock",ee="quartz-nav-rail-push",je="quartz-nav-rail-restore";function Ie(e){return`quartz-nav:${e}`}function Ge(e){try{let n=localStorage.getItem(Ie(e)),t=n?JSON.parse(n):{};return t!==null&&typeof t=="object"?t:{}}catch{return{}}}function Xe(e,n){try{localStorage.setItem(Ie(e),JSON.stringify(n))}catch{}}function Oe(e){let n=e.dataset.bpMobile;return n?window.matchMedia(`(max-width: ${n})`):void 0}function De(e){!e.open&&e.dataset.animate===void 0&&(e.dataset.animate="")}function Ze(e){e.querySelectorAll("summary.quartz-nav__summary").forEach(n=>{let t=n.parentElement;if(!(t instanceof HTMLDetailsElement))return;let l=()=>De(t);n.addEventListener("click",l),window.addCleanup(()=>n.removeEventListener("click",l))})}function et(e){let n=new Set;return e.querySelectorAll("details[data-folder][name]").forEach(t=>{t.dataset.trail==="true"&&n.add(t.getAttribute("name")??"")}),n}function tt(e){let n=e.dataset.quartzNav??"",t=e.dataset.persist==="true",l=e.dataset.expandActive==="true",a=Oe(e),u=t?Ge(n):{},c=l?et(e):new Set,r=[];if(e.querySelectorAll("details[data-folder]").forEach(i=>{let f=i.dataset.folder??"",m=i.dataset.trail==="true",g=t&&f in u?u[f]===!0:void 0,E=g===!0&&!m&&c.has(i.getAttribute("name")??"\\0");if(i.dataset.mobileCollapsible!==void 0){let H=()=>{let k=t&&f in u?u[f]===!0:!1;i.open=!(a?.matches??!1)||m||k&&!E};H(),r.push(H)}else g!==void 0&&!(l&&m)&&!E&&(i.open=g);if(!t)return;let p=()=>{u[f]=i.open,Xe(n,u)};i.addEventListener("toggle",p),window.addCleanup(()=>i.removeEventListener("toggle",p))}),a&&r.length>0&&typeof a.addEventListener=="function"){let i=()=>r.forEach(f=>f());a.addEventListener("change",i),window.addCleanup(()=>a.removeEventListener("change",i))}}function Fe(e){let n=e.parentElement;for(;n&&n!==document.body;){let t=getComputedStyle(n);if(t.overflow!=="visible"||t.overflowX!=="visible"||t.overflowY!=="visible"||t.maskImage&&t.maskImage!=="none"||t.clipPath&&t.clipPath!=="none"||t.contain&&t.contain!=="none")return n;n=n.parentElement}return null}var te=e=>typeof e.showPopover=="function";function nt(e){if(te(e)){e.setAttribute("popover","manual");try{e.showPopover()}catch{}}e.style.position="fixed"}function Be(e){if(te(e)&&e.hasAttribute("popover")){try{e.hidePopover()}catch{}e.removeAttribute("popover")}e.style.position="",e.style.top="",e.style.left="",e.style.right=""}function ot(e){let t=(e.dataset.variant??"")==="flyout";if(t&&e.dataset.flyoutSide==="auto"){let c=e.getBoundingClientRect(),r=c.width>0&&c.left+c.width/2>window.innerWidth/2;e.classList.toggle("quartz-nav--flyout-left",r)}let l=Fe(e)!==null,a=new Set;if(e.querySelectorAll("details.quartz-nav__folder").forEach(c=>{let r=c.querySelector(":scope > ul");if(!r)return;let i=()=>{r.classList.remove("quartz-nav__list--flip"),Be(r),a.delete(r)},f=()=>{if(i(),!c.open)return;let m=c.getBoundingClientRect(),g=c.parentElement?.closest("details.quartz-nav__folder")!==null;if(l&&!g&&m.width>0){let p=t&&e.classList.contains("quartz-nav--flyout-left");nt(r),r.style.top=`${t?m.top:m.bottom+4}px`,p?(r.style.left="auto",r.style.right=`${window.innerWidth-m.left+4}px`):(r.style.right="auto",r.style.left=`${t?m.right+4:m.left}px`),a.add(r)}if(t)return;let E=r.getBoundingClientRect();E.width>0&&E.right>window.innerWidth&&(r.style.position==="fixed"?(r.style.left="auto",r.style.right=`${window.innerWidth-m.right}px`):r.classList.add("quartz-nav__list--flip"))};c.addEventListener("toggle",f),window.addCleanup(()=>c.removeEventListener("toggle",f))}),!l)return;let u=()=>{for(let c of a){let r=c.parentElement;r instanceof HTMLDetailsElement&&(r.open=!1)}};document.addEventListener("scroll",u,!0),window.addCleanup(()=>document.removeEventListener("scroll",u,!0))}function rt(e){if(!Ye.includes(e.dataset.variant??""))return;ot(e);let n=()=>Array.from(e.querySelectorAll("details.quartz-nav__folder")),t=r=>{for(let i of n())i!==r&&!(r&&i.contains(r))&&(i.open=!1)};for(let r of n()){let i=()=>{if(!r.open)return;let f=r.parentElement?.parentElement;if(f)for(let m of f.querySelectorAll(":scope > li > details"))m!==r&&(m.open=!1)};r.addEventListener("toggle",i),window.addCleanup(()=>r.removeEventListener("toggle",i))}let l=r=>{(!(r.target instanceof Node)||!e.contains(r.target))&&t()},a=r=>{if(r.key!=="Escape")return;let i=document.activeElement,f=n().find(m=>m.open&&i instanceof Node&&m.contains(i));t(),f?.querySelector("summary")?.focus()},u=()=>t();document.addEventListener("click",l),document.addEventListener("keydown",a),document.addEventListener("prenav",u),window.addCleanup(()=>document.removeEventListener("click",l)),window.addCleanup(()=>document.removeEventListener("keydown",a)),window.addCleanup(()=>document.removeEventListener("prenav",u)),e.dataset.trigger==="hover"&&window.matchMedia("(hover: hover)").matches&&e.querySelectorAll("li.quartz-nav__item--folder").forEach(r=>{let i=r.querySelector(":scope > details");if(!i)return;let f,m=()=>{f&&clearTimeout(f),De(i),i.open=!0},g=()=>{f=setTimeout(()=>{i.open=!1},150)},E=p=>{(!(p.relatedTarget instanceof Node)||!r.contains(p.relatedTarget))&&g()};r.addEventListener("mouseenter",m),r.addEventListener("mouseleave",g),r.addEventListener("focusin",m),r.addEventListener("focusout",E),window.addCleanup(()=>{f&&clearTimeout(f),r.removeEventListener("mouseenter",m),r.removeEventListener("mouseleave",g),r.removeEventListener("focusin",m),r.removeEventListener("focusout",E)})})}function it(e){if(e.dataset.mobile!=="offcanvas")return;let n=e.querySelector("input.quartz-nav__toggle");if(!n)return;let t=e.querySelector(".quartz-nav__panel"),l=()=>{document.documentElement.classList.toggle(x,n.checked),n.setAttribute("aria-expanded",String(n.checked))},a=()=>{if(!n.checked)return;let c=document.activeElement;n.checked=!1,l(),t&&c instanceof Node&&t.contains(c)&&n.focus()},u=c=>{c.key==="Escape"&&a()};l(),n.addEventListener("change",l),document.addEventListener("keydown",u),document.addEventListener("prenav",a),window.addCleanup(()=>{n.removeEventListener("change",l),document.removeEventListener("keydown",u),document.removeEventListener("prenav",a),document.documentElement.classList.remove(x)})}function $e(e,n){let t=e;for(;t&&t!==document.body&&t!==document.documentElement;){let l=getComputedStyle(t).position;if(l==="sticky"||l==="fixed"){let a=t.getBoundingClientRect();if(a.top<=window.innerHeight*.15&&(!n||a.width>=window.innerWidth/2)&&a.height>0&&a.height<=window.innerHeight*.3)return t}t=t.parentElement}return null}function st(e){let n=$e(e.parentElement,!1);if(!n&&typeof document.elementsFromPoint=="function"){let t=[1,.05,.1].map(l=>Math.max(1,Math.round(window.innerHeight*l)));for(let l of t){for(let a of document.elementsFromPoint(window.innerWidth/2,l))if(!e.contains(a)&&(n=$e(a,!0),n))break;if(n)break}}return n}var B={left:new Map,right:new Map};function at(e){let n=0;for(let t of B[e].values())n=Math.max(n,t.px);return n}function Ke(e){let n=document.documentElement,t=[...B[e].values()],l=t.some(r=>r.can),a=t.reduce((r,i)=>i.css&&(!r||i.px>r.px)?i:r,void 0),u=n.style.getPropertyValue(`--quartz-nav-rail-offset-${e}`);n.classList.toggle(`quartz-nav-rail-push-${e}`,l),n.classList.toggle(`quartz-nav-rail-${e}`,a!==void 0);let c=a?a.px>0?`${a.px}px`:a.css:"0px";l?n.style.setProperty(`--quartz-nav-rail-offset-${e}`,c):n.style.removeProperty(`--quartz-nav-rail-offset-${e}`),n.style.getPropertyValue(`--quartz-nav-rail-offset-${e}`)!==u&&document.dispatchEvent(new CustomEvent(ee,{detail:e}))}function lt(e){if(e.dataset.variant!=="rail")return;let n=e.querySelector("button.quartz-nav__rail-trigger"),t=e.querySelector(":scope > .quartz-nav__panel");if(!n||!t)return;let l=e.querySelector(":scope > .quartz-nav__rail-backdrop"),a=t.querySelector("button.quartz-nav__rail-pin"),u=e.dataset.railRest==="icons",c=e.dataset.railContent==="push"?"push":"overlay",r=o=>o==="push"||o==="overlay"?o:c,i=r(e.dataset.railHoverContent),f=r(e.dataset.railPinContent),m=[c,i,f].includes("push"),g=e.dataset.railOnNavigate==="keep",E=Oe(e),p=()=>E?.matches??!1,H=window.matchMedia("(hover: hover)").matches,k=e.dataset.railExpand??"hover",Ve=H&&k==="hover",ne=H&&(k==="hover"||k==="strip"),N=document.documentElement,b=e.classList.contains("quartz-nav--rail-right")?"right":"left",We=b==="left"?"right":"left",z=e.dataset.quartzNav??"",$=`quartz-nav:${z}:rail-pinned`,V=`quartz-nav:${z}:rail-carry`,oe=`quartz-nav:${z}:rail-strip`,Je=`quartz-nav:${z}:rail-top`,W=a!==null&&e.dataset.railStartPinned==="true",J=`quartz-nav:${z}:rail-unpinned`,d="closed",S=!1,w=!1,P=!1,A=0,Q=0,re=!1,ie=-1,C,y=()=>w&&!p(),se=o=>o==="local"?window.localStorage:window.sessionStorage,L=(o,s,v)=>{try{let O=se(o);v===null?O.removeItem(s):O.getItem(s)!==v&&O.setItem(s,v)}catch{}},U=(o,s)=>{try{return se(o).getItem(s)}catch{return null}},K=(o=>{let s=/^([0-9.]+)(px|rem|em)$/.exec((o??"").trim());return s?Number(s[1])*(s[2]==="px"?1:16):NaN})(e.dataset.bpMobile),Y=()=>({side:b,px:Q,bp:Number.isFinite(K)?K:0,...re?{over:!0}:{}}),ae=o=>{let s=document.createElement("div");s.style.cssText=`position:absolute;visibility:hidden;pointer-events:none;width:var(${o})`,e.append(s);let v=s.getBoundingClientRect().width;return s.remove(),v},Qe=o=>!(o>0)||!(K>0)?!0:window.innerWidth-at(We)-o>K,le=(o,s)=>getComputedStyle(e).getPropertyValue(o).trim()||s,T=()=>{let o=!p(),s=d==="part"||d==="open"&&S,v=y()&&d==="open"?f:s?i:c,D=v==="push"?d==="open"?"--quartz-nav-rail-open-width":d==="part"||u?"--quartz-nav-rail-width":"":u&&c==="push"?"--quartz-nav-rail-width":"",Ce=o&&D!=="",_e=Ce?Math.round(ae(D)+ae("--quartz-nav-rail-gap")):0,F=Ce&&Qe(_e);Q=F?_e:0,re=F&&d==="open"&&v!=="push";let Re="";if(F){let xe=le(D,D==="--quartz-nav-rail-open-width"?"20rem":"3.5rem"),Ne=le("--quartz-nav-rail-gap","0px");Re=/^0[a-z]*$/.test(Ne)?xe:`calc(${xe} + ${Ne})`}B[b].set(e,{px:Q,css:Re,can:m&&o}),Ke(b),F&&d==="open"&&v==="push"?e.dataset.railPushing="":delete e.dataset.railPushing,y()&&d==="open"&&L("local",$,JSON.stringify(Y())),u&&d==="closed"&&o&&L("local",oe,c==="push"?JSON.stringify(Y()):null)},q,j=(o=!1)=>{(o||q===void 0||q&&!q.isConnected)&&(q=st(e));let s=q?Math.max(0,Math.round(q.getBoundingClientRect().bottom)):0;e.style.setProperty("--_rail-top",`${s}px`),s!==ie&&(ie=s,L("local",Je,String(s)))},M=()=>{C&&clearTimeout(C),C=void 0},h=(o,s=!1)=>{M(),o!=="closed"&&j(),d=o,S=o==="open"&&s,P=!1,e.dataset.railState=o,n.setAttribute("aria-expanded",String(o==="open")),N.classList.toggle(x,o==="open"&&p()),T()},G=o=>{w=o,a?.setAttribute("aria-pressed",String(o)),T(),o||L("local",$,null),W&&L("local",J,o?null:"true")},X=(o,s)=>{M(),C=setTimeout(()=>h(o),s)},_=()=>{if(d==="closed")return;let o=document.activeElement;h("closed"),(!u||p())&&o instanceof Node&&t.contains(o)&&n.focus()},ce=()=>{y()||_()},Z=Fe(e)!==null&&te(t);if(Z){t.setAttribute("popover","manual");try{t.showPopover()}catch{t.removeAttribute("popover"),Z=!1}}let Ue=()=>{let o=U("session",V);if(L("session",V,null),!o)return null;try{let s=JSON.parse(o);return Date.now()-Number(s.at)<1e4?{hover:s.how==="hover"}:null}catch{return null}},de=()=>{e.dataset.railInstant="",N.classList.add("quartz-nav-rail-instant"),requestAnimationFrame(()=>requestAnimationFrame(()=>delete e.dataset.railInstant))};a||L("local",$,null),u||L("local",oe,null),W||L("local",J,null);let ue=a!==null&&(U("local",$)!==null||W&&U("local",J)===null),fe=Ue();ue&&!p()?(de(),G(!0),h("open")):fe&&g&&!p()?(de(),h("open",fe.hover),P=!0):(ue&&(w=!0,a?.setAttribute("aria-pressed","true")),h("closed"));let me=()=>{d==="open"?(p()||G(!1),_()):h("open")},pe=()=>{G(!w),w&&d!=="open"?h("open"):w&&S?(S=!1,T()):!w&&d==="open"&&ne&&!p()&&(P=!0)},ve=()=>{d==="closed"&&!p()?h("part"):d==="part"&&M()},Ee=()=>{d==="part"&&X("closed",700)},he=()=>{M(),d!=="open"&&!p()&&h("open",!0)},ge=()=>{d==="open"&&(S||P)&&!y()&&X("closed",300)},Le=o=>{!P||d!=="open"||y()||(o.target instanceof Node&&e.contains(o.target)?M():C||X("closed",300))},we=o=>{if(!g||y()||d!=="open"||p()||o.button!==0||o.metaKey||o.ctrlKey||o.shiftKey||o.altKey)return;let s=o.target instanceof Element?o.target.closest("a[href]"):null;if(!(s instanceof HTMLAnchorElement)||!t.contains(s)||s.target&&s.target!=="_self"||s.hasAttribute("download"))return;let v=new URL(s.href,window.location.href);v.origin===window.location.origin&&(v.pathname===window.location.pathname&&v.search===window.location.search||(A=Date.now(),L("session",V,JSON.stringify({how:S?"hover":"click",at:A,...Y()}))))},ye=()=>{d!=="open"&&h("open")},be=o=>{let s=o.relatedTarget;s instanceof Node&&!e.contains(s)&&ce()},Se=o=>{d!=="closed"&&(!(o.target instanceof Node)||!e.contains(o.target))&&ce()},Te=o=>{if(o.key!=="Escape"||d==="closed"||y())return;let s=document.activeElement,v=s instanceof Node&&e.contains(s);_(),v&&n.focus()},qe=()=>{let o=A>0&&Date.now()-A<1e4;A=0,!y()&&!o&&h("closed")},R=0,I=!1,Me=()=>{R||(R=requestAnimationFrame(()=>{R=0,(d!=="closed"||u)&&j(I),I&&T(),I=!1}))},He=()=>{(d!=="closed"||u)&&Me()},ke=()=>{I=!0,Me()},ze=o=>{o.detail!==b&&T()},Pe=()=>{p()&&d==="part"||p()&&w&&d==="open"?h("closed"):!p()&&w&&d!=="open"?h("open"):T(),N.classList.toggle(x,d==="open"&&p())};n.addEventListener("click",me),a?.addEventListener("click",pe),t.addEventListener("focusin",ye),t.addEventListener("click",we),t.addEventListener("mouseleave",ge),document.addEventListener("mousemove",Le,{passive:!0}),e.addEventListener("focusout",be),l?.addEventListener("click",_),document.addEventListener("click",Se),document.addEventListener("keydown",Te),document.addEventListener("prenav",qe),window.addEventListener("resize",ke),document.addEventListener(ee,ze),window.addEventListener("scroll",He,{passive:!0}),Ve&&(n.addEventListener("mouseenter",ve),n.addEventListener("mouseleave",Ee)),ne&&t.addEventListener("mouseenter",he);let Ae=E&&typeof E.addEventListener=="function";Ae&&E.addEventListener("change",Pe),u&&j(!0),window.addCleanup(()=>{M(),n.removeEventListener("click",me),a?.removeEventListener("click",pe),t.removeEventListener("focusin",ye),t.removeEventListener("click",we),document.removeEventListener("mousemove",Le),e.removeEventListener("focusout",be),l?.removeEventListener("click",_),document.removeEventListener("click",Se),document.removeEventListener("keydown",Te),document.removeEventListener("prenav",qe),window.removeEventListener("resize",ke),document.removeEventListener(ee,ze),window.removeEventListener("scroll",He),R&&cancelAnimationFrame(R),n.removeEventListener("mouseenter",ve),n.removeEventListener("mouseleave",Ee),t.removeEventListener("mouseenter",he),t.removeEventListener("mouseleave",ge),Ae&&E.removeEventListener("change",Pe),Z&&Be(t),N.classList.remove(x),B[b].delete(e),Ke(b)})}function ct(){document.getElementById(je)?.remove();let e=document.documentElement;e.classList.contains("quartz-nav-rail-instant")&&requestAnimationFrame(()=>requestAnimationFrame(()=>e.classList.remove("quartz-nav-rail-instant")))}function dt(e){e.querySelectorAll("select.quartz-nav__select").forEach(n=>{let t=()=>{let i=n.value;if(!i)return;let f=new URL(i,window.location.href);typeof window.spaNavigate=="function"?window.spaNavigate(f,!1):window.location.assign(f.toString())},l=!1,a=i=>{i.key==="Enter"?(i.preventDefault(),t()):(i.key.startsWith("Arrow")||i.key==="Home"||i.key==="End")&&(l=!0)},u=()=>{l=!1},c=()=>{l||t()};n.addEventListener("keydown",a),n.addEventListener("pointerdown",u),n.addEventListener("change",c),window.addCleanup(()=>{n.removeEventListener("keydown",a),n.removeEventListener("pointerdown",u),n.removeEventListener("change",c)});let r=e.querySelector(`button[data-select="${n.id}"]`);r&&(r.addEventListener("click",t),window.addCleanup(()=>r.removeEventListener("click",t)))})}function ut(e){let n=e.dataset.variant??"";if(!["tree","accordion","flyout"].includes(n))return;let t=e.querySelector(".quartz-nav__panel"),l=t?.querySelector("a.active");!t||!l||t.scrollHeight<=t.clientHeight||typeof l.scrollIntoView=="function"&&l.scrollIntoView({block:"nearest"})}function ft(){document.querySelectorAll("nav[data-quartz-nav]").forEach(e=>{Ze(e),tt(e),rt(e),it(e),lt(e),dt(e),ut(e)}),ct()}document.addEventListener("nav",ft);\n';

// src/scripts/rail-restore.inline.ts
var rail_restore_inline_default = '(()=>{let b="quartz-nav-rail-restore",y=/^quartz-nav:(.+):rail-(pinned|carry|strip|top)$/,z=t=>{if(!t)return null;try{let s=JSON.parse(t);return s!==null&&typeof s=="object"?s:null}catch{return null}},q=t=>t!==null&&(t.side==="left"||t.side==="right")&&typeof t.px=="number"&&t.px>=0&&typeof t.bp=="number",m=t=>/^[A-Za-z0-9_-]+$/.test(t);try{let t=new Map,s=new Map,v=(e,n)=>{for(let p=0;p<e.length;p++){let i=e.key(p),o=i?y.exec(i):null;if(!i||!o||!m(o[1]))continue;let l=o[1],u=o[2];if(u==="top"){let c=Number(e.getItem(i));!n&&Number.isFinite(c)&&c>=0&&s.set(l,c);continue}if(u==="carry"!==n)continue;let r=z(e.getItem(i));if(u==="carry"&&!(r&&Date.now()-Number(r.at)<1e4)||!q(r))continue;let h=t.get(l);(!h||h.kind==="strip"&&u!=="strip")&&t.set(l,{side:r.side,px:r.px,bp:r.bp,over:r.over===!0,kind:u})}};v(localStorage,!1),v(sessionStorage,!0);let f=window.innerWidth,a=[];for(let[e,n]of s)a.push(`nav[data-quartz-nav="${e}"]{--_rail-top:${n}px}`);let d={left:0,right:0},g=[...t].sort(([,e],[,n])=>e.side===n.side?0:e.side==="left"?-1:1),_=!1;for(let[e,n]of g){if(f<=n.bp)continue;_=!0;let p=n.kind==="strip"?".quartz-nav--rail-icons":"",i=`nav[data-quartz-nav="${e}"].quartz-nav--rail-${n.side}${p}`;n.kind!=="strip"&&(a.push(`${i}>.quartz-nav__panel{visibility:visible;transform:none;width:var(--quartz-nav-rail-open-width);transition:none}`,`${i}>.quartz-nav__panel .quartz-nav__rail-head{visibility:visible}`,`${i}>.quartz-nav__panel .quartz-nav__list .quartz-nav__list{display:block}`),n.kind==="pinned"&&a.push(`${i} .quartz-nav__rail-pin{color:var(--quartz-nav-color-active)}`,`${i} .quartz-nav__rail-pin .quartz-nav__icon--pin{display:none}`,`${i} .quartz-nav__rail-pin .quartz-nav__icon--unpin{display:inline-flex}`));let o=n.side==="left"?d.right:d.left,l=n.px>0&&f-o-n.px>n.bp;l&&(d[n.side]=Math.max(d[n.side],n.px),a.push(`body:has(${i}){padding-${n.side}:${n.px}px}`)),n.kind!=="strip"&&(!l||n.over)&&a.push(`${i}>.quartz-nav__panel{box-shadow:var(--quartz-nav-shadow)}`)}if(_&&document.documentElement.classList.add("quartz-nav-rail-instant"),a.length>0){let e=document.createElement("style");e.id=b,e.textContent=a.join(`\n`),document.head.append(e)}}catch{}})();\n';

// src/components/Navigation.tsx
var Navigation_default = ((userOpts) => {
  const opts = resolveOptions(userOpts);
  const id = opts.id || `nav-${shortHash(JSON.stringify({ ...opts, id: "" }))}`;
  const breakpoints = resolveBreakpoints(opts.breakpoints);
  const css = applyBreakpoints(navigations_default, breakpoints);
  const Navigation = (props) => {
    const { fileData, allFiles, displayClass, cfg } = props;
    const slug2 = typeof fileData?.slug === "string" ? fileData.slug : "";
    if (!slug2) return null;
    const files = Array.isArray(allFiles) ? allFiles : [];
    const siteLocale = typeof cfg?.locale === "string" ? cfg.locale : void 0;
    const langs = languageIndex(files);
    const page = fileData ?? {};
    const auto = opts.language === "auto";
    const all = opts.language === "all";
    const fixed = auto || all ? void 0 : langs.languages.find((l) => l === opts.language) ?? langs.languages.find((l) => l === opts.language.split(/[-_]/)[0]);
    if (!auto && !all && !fixed && langs.languages.length > 0) {
      warnOnce(
        `language-unknown:${opts.language}`,
        `\`language: ${opts.language}\` matches no page language (${langs.languages.join(", ")}).`
      );
    }
    const langDir = all ? void 0 : languageDirectory(langs, opts.rootPath);
    let scopeOpts = opts;
    let language;
    if (langDir && (auto || fixed === langDir.lang)) {
      if (opts.hideOutsideRoot && !slug2.startsWith(`${opts.rootPath}/`)) return null;
      scopeOpts = { ...opts, rootPath: langDir.path, hideOutsideRoot: false };
      language = langDir.lang;
    } else if (!all) {
      language = auto ? languageOfPage(page, langs, siteLocale) : fixed ?? opts.language;
    }
    const locale = language ? localeFor(language, siteLocale) : siteLocale;
    const tree = treeFromFiles(files, opts, locale, language);
    const key = language ? placementIn(page, langs, language)?.key : void 0;
    const scope = resolveScope(tree, slug2, scopeOpts, key ?? slug2);
    if (!scope) return null;
    const ctx = {
      opts: scopeOpts,
      id,
      slug: slug2,
      tree,
      scope,
      t: i18n(locale),
      displayClass,
      mobileBreakpoint: breakpoints.mobile,
      contentDir: contentDirOf(props),
      svgIcons: { drawn: 0 }
    };
    switch (opts.variant) {
      case "select":
        return renderSelect(ctx);
      case "pager":
        return renderPager(ctx);
      default:
        return renderNavigation(ctx);
    }
  };
  Navigation.css = css;
  Navigation.beforeDOMLoaded = rail_restore_inline_default;
  Navigation.afterDOMLoaded = navigations_inline_default;
  return Navigation;
});
function contentDirOf(props) {
  const ctx = props.ctx;
  if (ctx === null || typeof ctx !== "object") return void 0;
  const argv = ctx.argv;
  if (argv === null || typeof argv !== "object") return void 0;
  const dir = argv.directory;
  return typeof dir === "string" && dir ? dir : void 0;
}

export { LucideIcon, Navigation_default, buildTree, chainOf, defaultOptions, flatten, hasLucideIcon, lucideIconNames, lucideName, resolveOptions, resolveScope, treeFromFiles };
//# sourceMappingURL=chunk-UEDV4ROK.js.map
//# sourceMappingURL=chunk-UEDV4ROK.js.map