import {
  LandingService
} from "./chunk-3W5QFCP6.js";
import {
  NgxMaskDirective
} from "./chunk-4HPDM2KW.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-USROZ7PW.js";
import {
  environment
} from "./chunk-IBJWGIJV.js";
import {
  DomSanitizer,
  Router,
  RouterLink
} from "./chunk-C2NWBPZH.js";
import {
  CommonModule,
  Component,
  DecimalPipe,
  ElementRef,
  Inject,
  NgClass,
  PLATFORM_ID,
  SlicePipe,
  __commonJS,
  __toESM,
  inject,
  isPlatformBrowser,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeResourceUrl,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-GRLISYEV.js";

// node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/qrcode/lib/can-promise.js"(exports, module) {
    "use strict";
    module.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/qrcode/lib/core/utils.js"(exports) {
    "use strict";
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version) {
      if (!version) throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
    };
    exports.getBCHDigit = function(data) {
      let digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    "use strict";
    exports.L = { bit: 1 };
    exports.M = { bit: 0 };
    exports.Q = { bit: 3 };
    exports.H = { bit: 2 };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports.isValid = function isValid(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
    "use strict";
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module.exports = BitBuffer;
  }
});

// node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
    "use strict";
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved) this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module.exports = BitMatrix;
  }
});

// node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    "use strict";
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version) {
      if (version === 1) return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i = 1; i < posCount - 1; i++) {
        positions[i] = positions[i - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i = 0; i < posLength; i++) {
        for (let j = 0; j < posLength; j++) {
          if (i === 0 && j === 0 || // top-left
          i === 0 && j === posLength - 1 || // bottom-left
          i === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    "use strict";
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    "use strict";
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data) {
      const size = data.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module2 = data.get(row, col);
          if (module2 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module2;
            sameCountCol = 1;
          }
          module2 = data.get(col, row);
          if (module2 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module2;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0) points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data) {
      const size = data.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
      const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask(pattern, data) {
      const size = data.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data.isReserved(row, col)) continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data, setupFormatFunc) {
      const numPatterns = Object.keys(exports.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p = 0; p < numPatterns; p++) {
        setupFormatFunc(p);
        exports.applyMask(p, data);
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    "use strict";
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/qrcode/lib/core/galois-field.js"(exports) {
    "use strict";
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x = 1;
      for (let i = 0; i < 255; i++) {
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1;
        if (x & 256) {
          x ^= 285;
        }
      }
      for (let i = 255; i < 512; i++) {
        EXP_TABLE[i] = EXP_TABLE[i - 255];
      }
    })();
    exports.log = function log(n) {
      if (n < 1) throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports.mul = function mul(x, y) {
      if (x === 0 || y === 0) return 0;
      return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
    };
  }
});

// node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/qrcode/lib/core/polynomial.js"(exports) {
    "use strict";
    var GF = require_galois_field();
    exports.mul = function mul(p1, p2) {
      const coeff = new Uint8Array(p1.length + p2.length - 1);
      for (let i = 0; i < p1.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i = 0; i < divisor.length; i++) {
          result[i] ^= GF.mul(divisor[i], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0) offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i = 0; i < degree; i++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
      }
      return poly;
    };
  }
});

// node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
    "use strict";
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree) this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data.length + this.degree);
      paddedData.set(data);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module.exports = ReedSolomonEncoder;
  }
});

// node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/qrcode/lib/core/version-check.js"(exports) {
    "use strict";
    exports.isValid = function isValid(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/qrcode/lib/core/regex.js"(exports) {
    "use strict";
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/qrcode/lib/core/mode.js"(exports) {
    "use strict";
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10) return mode.ccBits[0];
      else if (version < 27) return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr)) return exports.KANJI;
      else return exports.BYTE;
    };
    exports.toString = function toString(mode) {
      if (mode && mode.id) return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/qrcode/lib/core/version.js"(exports) {
    "use strict";
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined") mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED) return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d = version << 12;
      while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
      }
      return version << 12 | d;
    };
  }
});

// node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/qrcode/lib/core/format-info.js"(exports) {
    "use strict";
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data = errorCorrectionLevel.bit << 3 | mask;
      let d = data << 10;
      while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
      }
      return (data << 10 | d) ^ G15_MASK;
    };
  }
});

// node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
    "use strict";
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i, group, value;
      for (i = 0; i + 3 <= this.data.length; i += 3) {
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i;
      if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module.exports = NumericData;
  }
});

// node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
    "use strict";
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i;
      for (i = 0; i + 2 <= this.data.length; i += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
      }
    };
    module.exports = AlphanumericData;
  }
});

// node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
    "use strict";
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        this.data = new TextEncoder().encode(data);
      } else {
        this.data = new Uint8Array(data);
      }
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i = 0, l = this.data.length; i < l; i++) {
        bitBuffer.put(this.data[i], 8);
      }
    };
    module.exports = ByteData;
  }
});

// node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
    "use strict";
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i;
      for (i = 0; i < this.data.length; i++) {
        let value = Utils.toSJIS(this.data[i]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module.exports = KanjiData;
  }
});

// node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
  "node_modules/dijkstrajs/dijkstra.js"(exports, module) {
    "use strict";
    var dijkstra = {
      single_source_shortest_paths: function(graph, s, d) {
        var predecessors = {};
        var costs = {};
        costs[s] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u;
              }
            }
          }
        }
        if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
          var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while (u) {
          nodes.push(u);
          predecessor = predecessors[u];
          u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(
          predecessors,
          d
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T = dijkstra.PriorityQueue, t = {}, key;
          opts = opts || {};
          for (key in T) {
            if (T.hasOwnProperty(key)) {
              t[key] = T[key];
            }
          }
          t.queue = [];
          t.sorter = opts.sorter || T.default_sorter;
          return t;
        },
        default_sorter: function(a, b) {
          return a.cost - b.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(value, cost) {
          var item = { value, cost };
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    if (typeof module !== "undefined") {
      module.exports = dijkstra;
    }
  }
});

// node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/qrcode/lib/core/segments.js"(exports) {
    "use strict";
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i = 0; i < nodes.length; i++) {
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i + j;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (let n = 0; n < prevNodeIds.length; n++) {
            const prevNodeId = prevNodeIds[n];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n = 0; n < prevNodeIds.length; n++) {
        graph[prevNodeIds[n]].end = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString(data, version) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i = 1; i < path.length - 1; i++) {
        optimizedSegs.push(graph.table[path[i]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data) {
      return exports.fromArray(
        getSegmentsFromString(data, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/qrcode/lib/core/qrcode.js"(exports) {
    "use strict";
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r) continue;
          for (let c = -1; c <= 7; c++) {
            if (col + c <= -1 || size <= col + c) continue;
            if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r = 8; r < size - 8; r++) {
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i = 0; i < 18; i++) {
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i, mod;
      for (i = 0; i < 15; i++) {
        mod = (bits >> i & 1) === 1;
        if (i < 6) {
          matrix.set(i, 8, mod, true);
        } else if (i < 8) {
          matrix.set(i + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i, 8, mod, true);
        }
        if (i < 8) {
          matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
          matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (!matrix.isReserved(row, col - c)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i = 0; i < remainingByte; i++) {
        buffer.put(i % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b = 0; b < ecTotalBlocks; b++) {
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b] = buffer.slice(offset, offset + dataSize);
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i, r;
      for (i = 0; i < maxDataSize; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i < dcData[r].length) {
            data[index++] = dcData[r][i];
          }
        }
      }
      for (i = 0; i < ecCount; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i];
        }
      }
      return data;
    }
    function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/qrcode/lib/renderer/utils.js"(exports) {
    "use strict";
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
          return [c, c];
        }));
      }
      if (hexCode.length === 6) hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions(options) {
      if (!options) options = {};
      if (!options.color) options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
      const size = qr.modules.size;
      const data = qr.modules.data;
      const scale = exports.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i = 0; i < symbolSize; i++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    "use strict";
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas, size) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style) canvas.style = {};
      canvas.height = size;
      canvas.width = size;
      canvas.style.height = size + "px";
      canvas.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render(qrData, canvas, options) {
      let opts = options;
      let canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image = ctx.createImageData(size, size);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts) opts = {};
      const canvasEl = exports.render(qrData, canvas, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    "use strict";
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x, y) {
      let str = cmd + x;
      if (typeof y !== "undefined") str += " " + y;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i = 0; i < data.length; i++) {
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
          lineLength++;
          if (!(i > 0 && col > 0 && data[i - 1])) {
            path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i + 1])) {
            path += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path;
    }
    exports.render = function render(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/qrcode/lib/browser.js"(exports) {
    "use strict";
    var canPromise = require_can_promise();
    var QRCode2 = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode2.create(text, opts);
            resolve(renderFunc(data, canvas, opts));
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode2.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e) {
        cb(e);
      }
    }
    exports.create = QRCode2.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// src/app/paginas/inicio/inicio.component.ts
var QRCode = __toESM(require_browser());
var _forTrack0 = ($index, $item) => $item.k;
var _forTrack1 = ($index, $item) => $item.model;
var _forTrack2 = ($index, $item) => $item.key;
var _forTrack3 = ($index, $item) => $item.name;
var _forTrack4 = ($index, $item) => $item.label;
function InicioComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 255);
    \u0275\u0275text(1, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 256);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "slice");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind3(4, 2, ctx_r0.serviceStatusMessage, 0, 80), "", ctx_r0.serviceStatusMessage.length > 80 ? "\u2026" : "");
  }
}
function InicioComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 255);
    \u0275\u0275text(1, "\xB7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 257);
    \u0275\u0275text(3, "Ver status");
    \u0275\u0275elementEnd();
  }
}
function InicioComponent_For_234_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 108);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r2.t);
  }
}
function InicioComponent_For_316_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 258);
    \u0275\u0275listener("click", function InicioComponent_For_316_Template_div_click_0_listener() {
      const $index_r4 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.setHowStep($index_r4));
    });
    \u0275\u0275elementStart(1, "div", 259);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 260)(4, "div", 261);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 262);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const step_r5 = ctx.$implicit;
    const $index_r4 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.howStep === $index_r4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate($index_r4 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(step_r5.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(step_r5.desc);
  }
}
function InicioComponent_For_423_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 263);
    \u0275\u0275listener("click", function InicioComponent_For_423_Template_button_click_0_listener() {
      const $index_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectLayout($index_r7));
    });
    \u0275\u0275elementStart(1, "span", 264);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 265)(4, "div", 266);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 267);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 268);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 269);
    \u0275\u0275element(10, "polyline", 57);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const layout_r8 = ctx.$implicit;
    const $index_r7 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.selectedLayout === $index_r7);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(layout_r8.materialIcon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(layout_r8.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(layout_r8.specialty);
    \u0275\u0275advance();
    \u0275\u0275classProp("visible", ctx_r0.selectedLayout === $index_r7);
  }
}
function InicioComponent_Conditional_430_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275element(0, "div", 270);
    \u0275\u0275elementStart(1, "iframe", 271);
    \u0275\u0275listener("load", function InicioComponent_Conditional_430_Template_iframe_load_1_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onPreviewIframeLoad());
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("hidden", !ctx_r0.previewIframeLoading);
    \u0275\u0275advance();
    \u0275\u0275classProp("visible", !ctx_r0.previewIframeLoading);
    \u0275\u0275property("src", ctx_r0.previewIframeUrl, \u0275\u0275sanitizeResourceUrl);
  }
}
function InicioComponent_Conditional_431_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 176);
    \u0275\u0275text(1, "Pr\xE9via dispon\xEDvel no navegador");
    \u0275\u0275elementEnd();
  }
}
function InicioComponent_Conditional_433_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 178);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r0.qrCodeDataUrl, \u0275\u0275sanitizeUrl);
  }
}
function InicioComponent_For_445_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 272);
    \u0275\u0275listener("click", function InicioComponent_For_445_Template_button_click_0_listener() {
      const $index_r11 = \u0275\u0275restoreView(_r10).$index;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.selectForm($index_r11));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const form_r12 = ctx.$implicit;
    const $index_r11 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("active", ctx_r0.selectedFormIdx === $index_r11);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(form_r12.title);
  }
}
function InicioComponent_Conditional_455_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 192);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 67);
    \u0275\u0275element(2, "path", 273)(3, "polyline", 274);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div")(5, "div", 275);
    \u0275\u0275text(6, "Formul\xE1rio enviado com sucesso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 276);
    \u0275\u0275text(8, "Este \xE9 apenas um exemplo. Em produ\xE7\xE3o, os dados seriam salvos e o PDF gerado automaticamente.");
    \u0275\u0275elementEnd()()();
  }
}
function InicioComponent_Conditional_456_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 280);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r13 = \u0275\u0275nextContext();
    const field_r15 = ctx_r13.$implicit;
    const \u0275$index_849_r16 = ctx_r13.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("for", "lpDemoField_" + ctx_r0.selectedFormIdx + "_" + \u0275$index_849_r16);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(field_r15.label);
  }
}
function InicioComponent_Conditional_456_For_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "textarea", 287);
    \u0275\u0275twoWayListener("ngModelChange", function InicioComponent_Conditional_456_For_2_Case_2_Template_textarea_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r17);
      const field_r15 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.demoFormValues[field_r15.label], $event) || (ctx_r0.demoFormValues[field_r15.label] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r13 = \u0275\u0275nextContext();
    const field_r15 = ctx_r13.$implicit;
    const \u0275$index_849_r16 = ctx_r13.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", "lpDemoField_" + ctx_r0.selectedFormIdx + "_" + \u0275$index_849_r16)("placeholder", field_r15.placeholder ?? "");
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.demoFormValues[field_r15.label]);
    \u0275\u0275property("name", "demo_" + field_r15.label);
  }
}
function InicioComponent_Conditional_456_For_2_Case_3_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 290);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r19 = ctx.$implicit;
    \u0275\u0275property("value", opt_r19);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(opt_r19);
  }
}
function InicioComponent_Conditional_456_For_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 282)(1, "select", 288);
    \u0275\u0275twoWayListener("ngModelChange", function InicioComponent_Conditional_456_For_2_Case_3_Template_select_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r18);
      const field_r15 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.demoFormValues[field_r15.label], $event) || (ctx_r0.demoFormValues[field_r15.label] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(2, "option", 289);
    \u0275\u0275text(3, "Selecione");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, InicioComponent_Conditional_456_For_2_Case_3_For_5_Template, 2, 2, "option", 290, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r13 = \u0275\u0275nextContext();
    const field_r15 = ctx_r13.$implicit;
    const \u0275$index_849_r16 = ctx_r13.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("id", "lpDemoField_" + ctx_r0.selectedFormIdx + "_" + \u0275$index_849_r16);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.demoFormValues[field_r15.label]);
    \u0275\u0275property("name", "demo_" + field_r15.label);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(field_r15.options);
  }
}
function InicioComponent_Conditional_456_For_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 283)(1, "input", 291);
    \u0275\u0275twoWayListener("ngModelChange", function InicioComponent_Conditional_456_For_2_Case_4_Template_input_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r20);
      const field_r15 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.demoFormValues[field_r15.label], $event) || (ctx_r0.demoFormValues[field_r15.label] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 292);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 293);
    \u0275\u0275element(4, "polyline", 294);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span", 295);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r13 = \u0275\u0275nextContext();
    const field_r15 = ctx_r13.$implicit;
    const \u0275$index_849_r16 = ctx_r13.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("id", "lpDemoField_" + ctx_r0.selectedFormIdx + "_" + \u0275$index_849_r16);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.demoFormValues[field_r15.label]);
    \u0275\u0275property("name", "demo_" + field_r15.label);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(field_r15.label);
  }
}
function InicioComponent_Conditional_456_For_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 296);
    \u0275\u0275text(1, "Assine com o dedo (celular) ou mouse (computador) no espa\xE7o abaixo.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "canvas", 297);
    \u0275\u0275listener("mousedown", function InicioComponent_Conditional_456_For_2_Case_5_Template_canvas_mousedown_2_listener($event) {
      \u0275\u0275restoreView(_r21);
      const \u0275$index_849_r16 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.startDemoSignature($event, \u0275$index_849_r16));
    })("mousemove", function InicioComponent_Conditional_456_For_2_Case_5_Template_canvas_mousemove_2_listener($event) {
      \u0275\u0275restoreView(_r21);
      const \u0275$index_849_r16 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.moveDemoSignature($event, \u0275$index_849_r16));
    })("mouseup", function InicioComponent_Conditional_456_For_2_Case_5_Template_canvas_mouseup_2_listener() {
      \u0275\u0275restoreView(_r21);
      const \u0275$index_849_r16 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.endDemoSignature(\u0275$index_849_r16));
    })("mouseleave", function InicioComponent_Conditional_456_For_2_Case_5_Template_canvas_mouseleave_2_listener() {
      \u0275\u0275restoreView(_r21);
      const \u0275$index_849_r16 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.endDemoSignature(\u0275$index_849_r16));
    })("touchstart", function InicioComponent_Conditional_456_For_2_Case_5_Template_canvas_touchstart_2_listener($event) {
      \u0275\u0275restoreView(_r21);
      const \u0275$index_849_r16 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.startDemoSignature($event, \u0275$index_849_r16));
    })("touchmove", function InicioComponent_Conditional_456_For_2_Case_5_Template_canvas_touchmove_2_listener($event) {
      \u0275\u0275restoreView(_r21);
      const \u0275$index_849_r16 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      ctx_r0.moveDemoSignature($event, \u0275$index_849_r16);
      return \u0275\u0275resetView($event.preventDefault());
    })("touchend", function InicioComponent_Conditional_456_For_2_Case_5_Template_canvas_touchend_2_listener() {
      \u0275\u0275restoreView(_r21);
      const \u0275$index_849_r16 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.endDemoSignature(\u0275$index_849_r16));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 298)(4, "span", 299);
    \u0275\u0275text(5, "Escreva sua assinatura no campo acima");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 300);
    \u0275\u0275listener("click", function InicioComponent_Conditional_456_For_2_Case_5_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r21);
      const \u0275$index_849_r16 = \u0275\u0275nextContext().$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.clearDemoSignature(\u0275$index_849_r16));
    });
    \u0275\u0275text(7, "Limpar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const \u0275$index_849_r16 = \u0275\u0275nextContext().$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("id", ctx_r0.signatureDemoCanvasId(\u0275$index_849_r16));
  }
}
function InicioComponent_Conditional_456_For_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 301);
    \u0275\u0275twoWayListener("ngModelChange", function InicioComponent_Conditional_456_For_2_Case_6_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r22);
      const field_r15 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.demoFormValues[field_r15.label], $event) || (ctx_r0.demoFormValues[field_r15.label] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r13 = \u0275\u0275nextContext();
    const field_r15 = ctx_r13.$implicit;
    const \u0275$index_849_r16 = ctx_r13.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", "lpDemoField_" + ctx_r0.selectedFormIdx + "_" + \u0275$index_849_r16)("leadZeroDateTime", true);
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.demoFormValues[field_r15.label]);
    \u0275\u0275property("name", "demo_" + field_r15.label);
  }
}
function InicioComponent_Conditional_456_For_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 302);
    \u0275\u0275twoWayListener("ngModelChange", function InicioComponent_Conditional_456_For_2_Case_7_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r23);
      const field_r15 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.demoFormValues[field_r15.label], $event) || (ctx_r0.demoFormValues[field_r15.label] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r13 = \u0275\u0275nextContext();
    const field_r15 = ctx_r13.$implicit;
    const \u0275$index_849_r16 = ctx_r13.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", "lpDemoField_" + ctx_r0.selectedFormIdx + "_" + \u0275$index_849_r16)("placeholder", field_r15.placeholder ?? "000.000.000-00");
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.demoFormValues[field_r15.label]);
    \u0275\u0275property("name", "demo_" + field_r15.label);
  }
}
function InicioComponent_Conditional_456_For_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 303);
    \u0275\u0275twoWayListener("ngModelChange", function InicioComponent_Conditional_456_For_2_Case_8_Template_input_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r24);
      const field_r15 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r0.demoFormValues[field_r15.label], $event) || (ctx_r0.demoFormValues[field_r15.label] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r13 = \u0275\u0275nextContext();
    const field_r15 = ctx_r13.$implicit;
    const \u0275$index_849_r16 = ctx_r13.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", "lpDemoField_" + ctx_r0.selectedFormIdx + "_" + \u0275$index_849_r16)("placeholder", field_r15.placeholder ?? "");
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.demoFormValues[field_r15.label]);
    \u0275\u0275property("name", "demo_" + field_r15.label);
  }
}
function InicioComponent_Conditional_456_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 277);
    \u0275\u0275conditionalCreate(1, InicioComponent_Conditional_456_For_2_Conditional_1_Template, 2, 2, "label", 280);
    \u0275\u0275conditionalCreate(2, InicioComponent_Conditional_456_For_2_Case_2_Template, 1, 4, "textarea", 281)(3, InicioComponent_Conditional_456_For_2_Case_3_Template, 6, 3, "div", 282)(4, InicioComponent_Conditional_456_For_2_Case_4_Template, 7, 4, "label", 283)(5, InicioComponent_Conditional_456_For_2_Case_5_Template, 8, 1)(6, InicioComponent_Conditional_456_For_2_Case_6_Template, 1, 4, "input", 284)(7, InicioComponent_Conditional_456_For_2_Case_7_Template, 1, 4, "input", 285)(8, InicioComponent_Conditional_456_For_2_Case_8_Template, 1, 4, "input", 286);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_13_0;
    const field_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(field_r15.type !== "checkbox" ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_13_0 = field_r15.type) === "textarea" ? 2 : tmp_13_0 === "select" ? 3 : tmp_13_0 === "checkbox" ? 4 : tmp_13_0 === "signature" ? 5 : tmp_13_0 === "date" ? 6 : tmp_13_0 === "cpf" ? 7 : 8);
  }
}
function InicioComponent_Conditional_456_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 193);
    \u0275\u0275repeaterCreate(1, InicioComponent_Conditional_456_For_2_Template, 9, 2, "div", 277, _forTrack4);
    \u0275\u0275elementStart(3, "button", 278);
    \u0275\u0275listener("click", function InicioComponent_Conditional_456_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.submitDemoForm());
    });
    \u0275\u0275text(4, " Enviar formul\xE1rio (demo) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 279);
    \u0275\u0275text(6, "Este formul\xE1rio \xE9 apenas uma demonstra\xE7\xE3o. Nenhum dado \xE9 enviado.");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.selectedDemoForm.fields);
  }
}
function InicioComponent_For_468_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 196)(1, "div", 304);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 305)(4, "div", 306);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "div", 307);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 308);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const t_r25 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1('"', t_r25.text, '"');
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("background", "var(--brand)");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(t_r25.initials);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(t_r25.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", t_r25.clinic, " \xB7 ", t_r25.specialty);
  }
}
function InicioComponent_Conditional_506_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 205)(1, "span");
    \u0275\u0275text(2, "Carregando planos\u2026");
    \u0275\u0275elementEnd()();
  }
}
function InicioComponent_Conditional_507_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 206);
    \u0275\u0275text(1, "Nenhum plano dispon\xEDvel no momento. ");
    \u0275\u0275elementStart(2, "a", 309);
    \u0275\u0275text(3, "Fale conosco");
    \u0275\u0275elementEnd()();
  }
}
function InicioComponent_Conditional_508_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 312);
    \u0275\u0275text(1, "Mais popular");
    \u0275\u0275elementEnd();
  }
}
function InicioComponent_Conditional_508_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " R$0");
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "/m\xEAs");
    \u0275\u0275elementEnd();
  }
}
function InicioComponent_Conditional_508_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "/m\xEAs");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r26 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" R$ ", \u0275\u0275pipeBind3(1, 1, plan_r26.value, "1.0-0", "pt-BR"));
  }
}
function InicioComponent_Conditional_508_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 316);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r26 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(plan_r26.description);
  }
}
function InicioComponent_Conditional_508_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 316);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r26 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.isPlanoGratis(plan_r26) ? "Ideal para testar o produto." : "Recursos completos para sua opera\xE7\xE3o.");
  }
}
function InicioComponent_Conditional_508_For_2_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 318);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 52);
    \u0275\u0275element(2, "polyline", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, "API REST + Webhooks");
    \u0275\u0275elementEnd();
  }
}
function InicioComponent_Conditional_508_For_2_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 319);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 67);
    \u0275\u0275element(2, "line", 322)(3, "line", 323);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, "API & Webhooks");
    \u0275\u0275elementEnd();
  }
}
function InicioComponent_Conditional_508_For_2_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 324);
    \u0275\u0275listener("click", function InicioComponent_Conditional_508_For_2_Conditional_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r27);
      const ctx_r27 = \u0275\u0275nextContext();
      const plan_r26 = ctx_r27.$implicit;
      const \u0275$index_1026_r29 = ctx_r27.$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.irComeceComPlano(plan_r26, \u0275$index_1026_r29));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r27 = \u0275\u0275nextContext();
    const plan_r26 = ctx_r27.$implicit;
    const \u0275$index_1026_r29 = ctx_r27.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.ctaPlanoLabel(plan_r26, \u0275$index_1026_r29));
  }
}
function InicioComponent_Conditional_508_For_2_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 325);
    \u0275\u0275listener("click", function InicioComponent_Conditional_508_For_2_Conditional_27_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r27 = \u0275\u0275nextContext();
      const plan_r26 = ctx_r27.$implicit;
      const \u0275$index_1026_r29 = ctx_r27.$index;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.irComeceComPlano(plan_r26, \u0275$index_1026_r29));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r27 = \u0275\u0275nextContext();
    const plan_r26 = ctx_r27.$implicit;
    const \u0275$index_1026_r29 = ctx_r27.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.ctaPlanoLabel(plan_r26, \u0275$index_1026_r29));
  }
}
function InicioComponent_Conditional_508_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 311);
    \u0275\u0275conditionalCreate(1, InicioComponent_Conditional_508_For_2_Conditional_1_Template, 2, 0, "span", 312);
    \u0275\u0275elementStart(2, "div", 313);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 314);
    \u0275\u0275conditionalCreate(5, InicioComponent_Conditional_508_For_2_Conditional_5_Template, 3, 0)(6, InicioComponent_Conditional_508_For_2_Conditional_6_Template, 4, 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 315);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, InicioComponent_Conditional_508_For_2_Conditional_9_Template, 2, 1, "div", 316)(10, InicioComponent_Conditional_508_For_2_Conditional_10_Template, 2, 1, "div", 316);
    \u0275\u0275elementStart(11, "div", 317)(12, "div", 318);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(13, "svg", 52);
    \u0275\u0275element(14, "polyline", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, "Fichas e consentimentos digitais");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "div", 318);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(17, "svg", 52);
    \u0275\u0275element(18, "polyline", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275text(19, "Assinatura digital + PDF");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(20, "div", 318);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(21, "svg", 52);
    \u0275\u0275element(22, "polyline", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275text(23, "Protocolo e hist\xF3rico");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(24, InicioComponent_Conditional_508_For_2_Conditional_24_Template, 4, 0, "div", 318)(25, InicioComponent_Conditional_508_For_2_Conditional_25_Template, 5, 0, "div", 319);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(26, InicioComponent_Conditional_508_For_2_Conditional_26_Template, 2, 1, "button", 320)(27, InicioComponent_Conditional_508_For_2_Conditional_27_Template, 2, 1, "button", 321);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const plan_r26 = ctx.$implicit;
    const \u0275$index_1026_r29 = ctx.$index;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("featured", ctx_r0.isPlanoRecomendado(\u0275$index_1026_r29));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.isPlanoRecomendado(\u0275$index_1026_r29) ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(plan_r26.name);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isPlanoGratis(plan_r26) ? 5 : 6);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.isPlanoGratis(plan_r26) ? "Para sempre" : "Cobran\xE7a mensal");
    \u0275\u0275advance();
    \u0275\u0275conditional(plan_r26.description ? 9 : 10);
    \u0275\u0275advance(15);
    \u0275\u0275conditional(ctx_r0.isPlanoRecomendado(\u0275$index_1026_r29) || \u0275$index_1026_r29 >= 1 ? 24 : 25);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.isPlanoRecomendado(\u0275$index_1026_r29) ? 26 : 27);
  }
}
function InicioComponent_Conditional_508_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 207);
    \u0275\u0275repeaterCreate(1, InicioComponent_Conditional_508_For_2_Template, 28, 9, "div", 310, _forTrack2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.planos);
  }
}
function InicioComponent_Conditional_585_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 326);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("success", ctx_r0.demonstracaoSucesso)("error", !ctx_r0.demonstracaoSucesso);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.demonstracaoFeedback);
  }
}
function InicioComponent_Conditional_609_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Enviando\u2026 ");
  }
}
function InicioComponent_Conditional_610_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Quero uma demonstra\xE7\xE3o ");
  }
}
var STATUS_LABELS = {
  operational: "Todos os sistemas operacionais",
  degraded: "Desempenho degradado",
  outage: "Interrup\xE7\xE3o nos servi\xE7os",
  maintenance: "Manuten\xE7\xE3o em andamento"
};
var LANDING_HASH_LEGACY = {
  "#features": "#funcionalidades",
  "#preview": "#demonstracao",
  "#pricing": "#planos",
  "#faq": "#duvidas",
  "#demo": "#contato"
};
var InicioComponent = class _InicioComponent {
  ano = (/* @__PURE__ */ new Date()).getFullYear();
  lpTheme = "dark";
  menuAberto = false;
  landingTrialDias = 14;
  planos = [];
  carregandoLanding = true;
  serviceStatusKey = "operational";
  serviceStatusLabel = STATUS_LABELS["operational"];
  serviceStatusMessage = null;
  statusPageUrl = environment.apiUrl ? `${environment.apiUrl}/status` : "/status";
  demonstracao = { name: "", clinic: "", email: "", phone: "", message: "" };
  demonstracaoEnviando = false;
  demonstracaoFeedback = "";
  demonstracaoSucesso = false;
  heroEmail = "";
  howStep = 0;
  faqOpenIndex = 0;
  heroSlide = 0;
  selectedLayout = 0;
  /** URL sanitizada para iframe da prévia real (/l/demo/:id?embed=1) */
  previewIframeUrl = null;
  previewIframeLoading = true;
  qrCodeDataUrl = "";
  selectedFormIdx = 0;
  demoFormValues = {};
  demoFormSubmitted = false;
  lpLogoMarquee;
  demoLayouts = [
    { model: 1, name: "Gen\xE9rico", specialty: "Cl\xEDnica Geral", materialIcon: "view_quilt", clinicName: "Cl\xEDnica S\xE3o Paulo", description: "Vers\xE1til para qualquer \xE1rea", accentLight: "#3b82f6", accentDark: "#60a5fa" },
    { model: 2, name: "Perfil Solo", specialty: "Dermatologia", materialIcon: "person", clinicName: "Dra. Ana Costa", description: "Ideal para profissional solo", accentLight: "#5a9e72", accentDark: "#9ec9aa" },
    { model: 3, name: "Est\xE9tica", specialty: "Harmoniza\xE7\xE3o", materialIcon: "diamond", clinicName: "Studio Belle", description: "Premium e sofisticado", accentLight: "#e8c97a", accentDark: "#e8c97a" },
    { model: 4, name: "Odontologia", specialty: "Odontologia", materialIcon: "dentistry", clinicName: "OdontoSmile", description: "Conv\xEAnios e especialidades", accentLight: "#0ea5e9", accentDark: "#38bdf8" },
    { model: 5, name: "Equipe", specialty: "Multidisciplinar", materialIcon: "groups", clinicName: "Instituto Sa\xFAde", description: "Destaque para a equipe", accentLight: "#6366f1", accentDark: "#818cf8" },
    { model: 6, name: "Veterin\xE1ria", specialty: "Pets", materialIcon: "pets", clinicName: "VetCare Animal", description: "Foco em tutores e pets", accentLight: "#0d9488", accentDark: "#2dd4bf" },
    { model: 7, name: "Pediatria", specialty: "Crian\xE7as", materialIcon: "child_care", clinicName: "Crescer Pediatria", description: "Acolhimento para fam\xEDlias", accentLight: "#38bdf8", accentDark: "#7dd3fc" },
    { model: 8, name: "Nutri\xE7\xE3o", specialty: "Nutri\xE7\xE3o cl\xEDnica", materialIcon: "nutrition", clinicName: "Nutri Vida", description: "\xC1reas e conv\xEAnios", accentLight: "#65a30d", accentDark: "#a3e635" }
  ];
  demoForms = [
    {
      key: "anamnese",
      title: "Anamnese Cl\xEDnica",
      description: "Ficha de anamnese geral para primeiro atendimento",
      fields: [
        { label: "Nome completo", type: "text", placeholder: "Ex: Maria Fernanda Silva" },
        { label: "Data de nascimento", type: "date" },
        { label: "Alergias conhecidas", type: "textarea", placeholder: "Descreva alergias a medicamentos, alimentos..." },
        { label: "Medicamentos em uso", type: "textarea", placeholder: "Liste medicamentos e dosagens..." },
        { label: "Possui plano de sa\xFAde?", type: "select", options: ["Sim", "N\xE3o"] },
        { label: "Motivo do atendimento", type: "textarea", placeholder: "Descreva brevemente o motivo..." }
      ]
    },
    {
      key: "consentimento",
      title: "Termo de Consentimento",
      description: "Consentimento informado para procedimentos",
      fields: [
        { label: "Nome completo", type: "text", placeholder: "Nome conforme documento" },
        { label: "CPF", type: "cpf", placeholder: "000.000.000-00" },
        { label: "Procedimento", type: "select", options: ["Botox", "Preenchimento", "Peeling", "Limpeza de pele", "Outro"] },
        { label: "Li e compreendi os riscos", type: "checkbox" },
        { label: "Assinatura", type: "signature" }
      ]
    },
    {
      key: "satisfacao",
      title: "Pesquisa de Satisfa\xE7\xE3o",
      description: "Feedback p\xF3s-atendimento",
      fields: [
        { label: "Como avalia o atendimento?", type: "select", options: ["Excelente", "Bom", "Regular", "Ruim"] },
        { label: "O tempo de espera foi adequado?", type: "select", options: ["Sim", "N\xE3o"] },
        { label: "Recomendaria para um amigo?", type: "select", options: ["Com certeza", "Provavelmente", "Talvez", "N\xE3o"] },
        { label: "Sugest\xF5es de melhoria", type: "textarea", placeholder: "O que podemos melhorar?" }
      ]
    }
  ];
  testimonials = [
    { name: "Dra. Camila R\xEAgo", clinic: "Est\xE9tica Avan\xE7ada", specialty: "Harmoniza\xE7\xE3o", text: "Eliminamos 100% do papel na recep\xE7\xE3o. Quem chega j\xE1 traz a ficha pronta e a assinatura digital feita.", initials: "CR" },
    { name: "Dr. Rafael Mendes", clinic: "OdontoCenter", specialty: "Odontologia", text: "A equipe parou de perder tempo digitando fichas. Agora \xE9 tudo autom\xE1tico \u2014 do link no Instagram ao PDF no prontu\xE1rio.", initials: "RM" },
    { name: "Dra. Juliana Alves", clinic: "Cl\xEDnica Integrar", specialty: "Psicologia", text: "O contrato terap\xEAutico digital \xE9 perfeito. A pessoa assina antes da primeira sess\xE3o, sem constrangimento.", initials: "JA" }
  ];
  howSteps = [
    { title: "Crie seus formul\xE1rios", desc: "Escolha entre 86 templates ou crie do zero. Personaliza em minutos.", icon: "edit_document" },
    { title: "Publique no seu perfil", desc: "Cole o link na bio do Instagram ou WhatsApp. No ar em segundos.", icon: "link" },
    { title: "Cliente preenche antes", desc: "Abre pelo celular, preenche e assina digitalmente.", icon: "smartphone" },
    { title: "PDF gerado na hora", desc: "A ficha chega formatada em PDF, pronta para arquivar.", icon: "picture_as_pdf" }
  ];
  platformId;
  sanitizer = inject(DomSanitizer);
  landingService = inject(LandingService);
  router = inject(Router);
  host = inject(ElementRef);
  animObserver = null;
  animFallbackId = null;
  heroInterval = null;
  /** Se o evento load do iframe não disparar (ex.: app Angular aninhado), libera a prévia. */
  previewIframeLoadFallbackId = null;
  constructor(platformId) {
    this.platformId = platformId;
    const chips = [
      "Cl\xEDnica Geral",
      "Est\xE9tica",
      "Odontologia",
      "Psicologia",
      "Pediatria",
      "Veterin\xE1ria",
      "Fisioterapia",
      "Oftalmologia",
      "Dermatologia",
      "Laborat\xF3rio"
    ];
    this.lpLogoMarquee = [
      ...chips.map((t, i) => ({ k: "a" + i, t })),
      ...chips.map((t, i) => ({ k: "b" + i, t }))
    ];
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      let saved = localStorage.getItem("gestgo-lp-theme");
      if (saved !== "dark" && saved !== "light") {
        const legacy = localStorage.getItem("zm-lp-theme");
        if (legacy === "dark" || legacy === "light") {
          saved = legacy;
          localStorage.setItem("gestgo-lp-theme", legacy);
          localStorage.removeItem("zm-lp-theme");
        }
      }
      if (saved === "dark" || saved === "light") {
        this.lpTheme = saved;
      } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        this.lpTheme = "light";
      }
    }
    this.landingService.getLanding().subscribe({
      next: (data) => {
        this.landingTrialDias = data.trial_days ?? 14;
        this.planos = data.plans ?? [];
        this.carregandoLanding = false;
        this.scheduleObserveAnims();
      },
      error: () => {
        this.landingTrialDias = 14;
        this.planos = [];
        this.carregandoLanding = false;
        this.scheduleObserveAnims();
      }
    });
    this.landingService.getStatus().subscribe({
      next: (payload) => {
        const key = payload?.status ?? "operational";
        this.serviceStatusKey = key in STATUS_LABELS ? key : "operational";
        this.serviceStatusLabel = STATUS_LABELS[this.serviceStatusKey] ?? STATUS_LABELS["operational"];
        this.serviceStatusMessage = payload?.message?.trim() || null;
      },
      error: () => {
        this.serviceStatusKey = "operational";
        this.serviceStatusLabel = STATUS_LABELS["operational"];
        this.serviceStatusMessage = null;
      }
    });
    this.selectLayout(0);
    this.initDemoFormValues();
  }
  ngAfterViewInit() {
    this.scheduleObserveAnims();
    if (isPlatformBrowser(this.platformId)) {
      this.migrarHashLegadoLanding();
      this.heroInterval = setInterval(() => {
        this.heroSlide = (this.heroSlide + 1) % 3;
      }, 4e3);
    }
  }
  ngOnDestroy() {
    this.animObserver?.disconnect();
    this.animObserver = null;
    if (this.animFallbackId != null) {
      clearTimeout(this.animFallbackId);
      this.animFallbackId = null;
    }
    if (this.heroInterval != null) {
      clearInterval(this.heroInterval);
      this.heroInterval = null;
    }
    if (this.previewIframeLoadFallbackId != null) {
      clearTimeout(this.previewIframeLoadFallbackId);
      this.previewIframeLoadFallbackId = null;
    }
  }
  /** Atualiza URL e rolagem quando o usuário abre links antigos (#features, #pricing, etc.). */
  migrarHashLegadoLanding() {
    const hash = window.location.hash;
    const next = LANDING_HASH_LEGACY[hash];
    if (!next)
      return;
    const { pathname, search } = window.location;
    window.history.replaceState(null, "", `${pathname}${search}${next}`);
    const id = next.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
  }
  scheduleObserveAnims() {
    if (!isPlatformBrowser(this.platformId))
      return;
    requestAnimationFrame(() => this.observeAnims());
  }
  observeAnims() {
    if (!isPlatformBrowser(this.platformId))
      return;
    const root = this.host.nativeElement;
    if (this.animFallbackId != null) {
      clearTimeout(this.animFallbackId);
      this.animFallbackId = null;
    }
    this.animObserver?.disconnect();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), i * 50);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: "100px 0px 100px 0px" });
    this.animObserver = obs;
    const reveal = (el) => {
      el.classList.add("visible");
    };
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    root.querySelectorAll(".anim").forEach((el) => {
      const r = el.getBoundingClientRect();
      const nearViewport = r.bottom > -120 && r.top < vh + 120;
      if (nearViewport) {
        reveal(el);
      } else {
        obs.observe(el);
      }
    });
    this.animFallbackId = setTimeout(() => {
      root.querySelectorAll(".anim:not(.visible)").forEach(reveal);
      this.animFallbackId = null;
    }, 3200);
  }
  toggleLpTheme() {
    this.lpTheme = this.lpTheme === "dark" ? "light" : "dark";
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("gestgo-lp-theme", this.lpTheme);
      localStorage.removeItem("zm-lp-theme");
    }
  }
  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
  focusCaptureEmail() {
    if (!isPlatformBrowser(this.platformId))
      return;
    const el = this.host.nativeElement.querySelector("#capture-email");
    el?.focus();
  }
  isPlanoRecomendado(index) {
    return this.planos.length >= 2 && index === 1;
  }
  isPlanoGratis(plan) {
    return plan.value <= 0 || /grat/i.test(plan.name) || plan.key === "free";
  }
  ctaPlanoLabel(plan, index) {
    if (this.planos.length >= 3 && index === this.planos.length - 1) {
      return "Falar com vendas";
    }
    return this.isPlanoGratis(plan) ? "Come\xE7ar gr\xE1tis" : "Come\xE7ar trial gr\xE1tis";
  }
  irComece(planKey) {
    const raw = this.heroEmail?.trim() ?? "";
    const queryParams = {};
    if (raw)
      queryParams["email"] = raw;
    if (planKey)
      queryParams["plan"] = planKey;
    void this.router.navigate(["/comece"], { queryParams: Object.keys(queryParams).length ? queryParams : void 0 });
  }
  irComeceComPlano(plan, index) {
    if (this.planos.length >= 3 && index === this.planos.length - 1) {
      if (isPlatformBrowser(this.platformId)) {
        document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    void this.router.navigate(["/comece"], { queryParams: { plan: plan.key } });
  }
  toggleFaq(index) {
    this.faqOpenIndex = this.faqOpenIndex === index ? -1 : index;
  }
  setHowStep(i) {
    this.howStep = i;
  }
  selectLayout(idx) {
    this.selectedLayout = idx;
    this.previewIframeLoading = true;
    this.generateQrCode();
    this.syncPreviewIframe();
  }
  onPreviewIframeLoad() {
    if (this.previewIframeLoadFallbackId != null) {
      clearTimeout(this.previewIframeLoadFallbackId);
      this.previewIframeLoadFallbackId = null;
    }
    this.previewIframeLoading = false;
  }
  syncPreviewIframe() {
    if (!isPlatformBrowser(this.platformId))
      return;
    if (this.previewIframeLoadFallbackId != null) {
      clearTimeout(this.previewIframeLoadFallbackId);
      this.previewIframeLoadFallbackId = null;
    }
    const layout = this.demoLayouts[this.selectedLayout];
    const path = this.router.serializeUrl(this.router.createUrlTree(["/l", "demo", String(layout.model)], { queryParams: { embed: "1" } }));
    const url = `${window.location.origin}${path}`;
    this.previewIframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.previewIframeLoadFallbackId = setTimeout(() => {
      this.previewIframeLoadFallbackId = null;
      this.previewIframeLoading = false;
    }, 3500);
  }
  selectForm(idx) {
    this.selectedFormIdx = idx;
    this.demoFormSubmitted = false;
    this.initDemoFormValues();
  }
  submitDemoForm() {
    this.demoFormSubmitted = true;
    this.scrollLandingElementIntoView("lp-demo-form-card");
    setTimeout(() => {
      this.demoFormSubmitted = false;
      this.initDemoFormValues();
    }, 3e3);
  }
  /** Evita “sumir” o feedback quando a altura da página muda após enviar (demo ou contato). */
  scrollLandingElementIntoView(elementId) {
    if (!isPlatformBrowser(this.platformId))
      return;
    setTimeout(() => {
      document.getElementById(elementId)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
      });
    }, 0);
  }
  /** Valores iniciais por tipo (checkbox boolean, data string vazia para máscara dd/mm/aaaa). */
  initDemoFormValues() {
    const form = this.demoForms[this.selectedFormIdx];
    if (!form) {
      this.demoFormValues = {};
      return;
    }
    const next = {};
    for (const f of form.fields) {
      if (f.type === "checkbox") {
        next[f.label] = false;
      } else if (f.type === "date") {
        next[f.label] = "";
      } else {
        next[f.label] = "";
      }
    }
    this.demoFormValues = next;
  }
  /** Id estável do canvas de assinatura (demo landing), por índice do campo. */
  signatureDemoCanvasId(idx) {
    return `lpdemo_sig_${this.selectedFormIdx}_${idx}`;
  }
  startDemoSignature(e, idx) {
    e.preventDefault();
    const canvas = this.getDemoSignatureCanvas(idx);
    if (!canvas)
      return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    ctx.strokeStyle = this.lpTheme === "dark" ? "#d4c9bb" : "#1e1b18";
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    const pos = this.getDemoSignaturePoint(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    canvas._signing = true;
  }
  moveDemoSignature(e, idx) {
    e.preventDefault();
    const canvas = this.getDemoSignatureCanvas(idx);
    if (!canvas || !canvas._signing)
      return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    const pos = this.getDemoSignaturePoint(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }
  endDemoSignature(idx) {
    const canvas = this.getDemoSignatureCanvas(idx);
    const field = this.demoForms[this.selectedFormIdx]?.fields[idx];
    if (canvas) {
      canvas._signing = false;
      if (field) {
        this.demoFormValues[field.label] = canvas.toDataURL("image/png");
      }
    }
  }
  clearDemoSignature(idx) {
    const canvas = this.getDemoSignatureCanvas(idx);
    const field = this.demoForms[this.selectedFormIdx]?.fields[idx];
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (field) {
      this.demoFormValues[field.label] = "";
    }
  }
  getDemoSignatureCanvas(idx) {
    if (!isPlatformBrowser(this.platformId))
      return null;
    return document.getElementById(this.signatureDemoCanvasId(idx));
  }
  getDemoSignaturePoint(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e instanceof TouchEvent && e.touches.length) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    const me = e;
    return { x: (me.clientX - rect.left) * scaleX, y: (me.clientY - rect.top) * scaleY };
  }
  generateQrCode() {
    if (!isPlatformBrowser(this.platformId))
      return;
    const layout = this.demoLayouts[this.selectedLayout];
    const path = this.router.serializeUrl(this.router.createUrlTree(["/l", "demo", String(layout.model)]));
    const url = `${window.location.origin}${path}`;
    QRCode.toDataURL(url, {
      width: 160,
      margin: 1,
      color: {
        dark: this.lpTheme === "dark" ? "#ffffff" : "#09090b",
        light: "#00000000"
      }
    }).then((dataUrl) => {
      this.qrCodeDataUrl = dataUrl;
    }).catch(() => {
      this.qrCodeDataUrl = "";
    });
  }
  enviarDemonstracao() {
    this.demonstracaoEnviando = true;
    this.demonstracaoFeedback = "";
    this.demonstracaoSucesso = false;
    this.landingService.enviarDemonstracao(this.demonstracao).subscribe({
      next: (data) => {
        this.demonstracaoEnviando = false;
        if (data.success) {
          this.demonstracaoFeedback = data.message || "Mensagem enviada. Entraremos em contato em breve.";
          this.demonstracaoSucesso = true;
          this.demonstracao = { name: "", clinic: "", email: "", phone: "", message: "" };
        } else if (data.errors) {
          this.demonstracaoFeedback = Object.values(data.errors).flat().join("\n");
        } else {
          this.demonstracaoFeedback = data.message || "N\xE3o foi poss\xEDvel enviar. Tente novamente.";
        }
        this.scrollLandingElementIntoView("lp-demo-contato-card");
      },
      error: () => {
        this.demonstracaoEnviando = false;
        this.demonstracaoFeedback = "Erro de conex\xE3o. Voc\xEA pode enviar direto pelo WhatsApp.";
        this.scrollLandingElementIntoView("lp-demo-contato-card");
      }
    });
  }
  get selectedDemoLayout() {
    return this.demoLayouts[this.selectedLayout];
  }
  get selectedDemoForm() {
    return this.demoForms[this.selectedFormIdx];
  }
  static \u0275fac = function InicioComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InicioComponent)(\u0275\u0275directiveInject(PLATFORM_ID));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InicioComponent, selectors: [["app-pagina-inicio"]], decls: 658, vars: 70, consts: [[1, "lp-page"], [1, "grid-bg"], [1, "status-bar", 2, "margin-top", "58px"], ["target", "_blank", "rel", "noopener noreferrer", 1, "status-inner", "status-bar-link", 3, "href"], [1, "status-dot", 3, "ngClass"], [1, "nav-inner"], [1, "nav-left"], ["routerLink", "/", 1, "nav-logo"], [1, "logo-mark"], ["src", "assets/logo/logo.png", "alt", "Gestgo", "width", "26", "height", "26"], [1, "logo-name"], [1, "nav-links"], ["href", "#funcionalidades"], ["href", "#demonstracao"], ["href", "#planos"], ["href", "#duvidas"], [1, "nav-right"], ["type", "button", "aria-label", "Abrir menu", 1, "lp-menu-btn", 3, "click"], ["width", "18", "height", "18", "viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["d", "M4 6h16M4 12h16M4 18h16"], ["type", "button", "aria-label", "Alternar tema", 1, "theme-toggle", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "icon-moon"], ["d", "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2", 1, "icon-sun"], ["cx", "12", "cy", "12", "r", "5"], ["x1", "12", "y1", "1", "x2", "12", "y2", "3"], ["x1", "12", "y1", "21", "x2", "12", "y2", "23"], ["x1", "4.22", "y1", "4.22", "x2", "5.64", "y2", "5.64"], ["x1", "18.36", "y1", "18.36", "x2", "19.78", "y2", "19.78"], ["x1", "1", "y1", "12", "x2", "3", "y2", "12"], ["x1", "21", "y1", "12", "x2", "23", "y2", "12"], ["x1", "4.22", "y1", "19.78", "x2", "5.64", "y2", "18.36"], ["x1", "18.36", "y1", "5.64", "x2", "19.78", "y2", "4.22"], ["routerLink", "/autenticacao", 1, "nav-login"], ["type", "button", 1, "nav-cta", 3, "click"], [1, "lp-mobile-nav"], ["href", "#funcionalidades", 3, "click"], ["href", "#demonstracao", 3, "click"], ["href", "#planos", 3, "click"], ["href", "#duvidas", 3, "click"], ["routerLink", "/autenticacao", 3, "click"], ["type", "button", 1, "nav-cta", 2, "width", "100%", 3, "click"], [1, "hero"], [1, "hero-grid"], [1, "hero-text"], [1, "hero-eyebrow", "anim"], [1, "hero-eyebrow-dot"], [1, "anim", "anim-d1"], [1, "hero-sub", "anim", "anim-d2"], [1, "hero-capture", "anim", "anim-d3"], ["id", "capture-email", "type", "email", "name", "hero_email", "placeholder", "seu@email.com.br", "autocomplete", "email", 1, "capture-input", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "capture-btn", 3, "click"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5"], ["points", "13 17 18 12 13 7"], [1, "hero-note", "anim", "anim-d3"], [1, "hero-social", "anim"], [1, "hs-item"], ["points", "20 6 9 17 4 12"], [1, "hs-sep"], [1, "hero-visual", "anim"], [1, "hero-browser"], [1, "browser-bar"], [1, "b-dots"], [1, "b-dot", 2, "background", "#ff5f57"], [1, "b-dot", 2, "background", "#ffbd2e"], [1, "b-dot", 2, "background", "#28ca41"], [1, "b-url"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "2"], ["x", "3", "y", "11", "width", "18", "height", "11", "rx", "2"], ["d", "M7 11V7a5 5 0 0110 0v4"], [1, "browser-slides"], [1, "browser-slide"], [1, "b-slide-header"], [1, "b-slide-title"], [1, "b-slide-sub"], [1, "b-kpi-row"], [1, "b-kpi"], [1, "b-kpi-val"], [1, "b-kpi-label"], [1, "b-kpi-val", 2, "color", "var(--brand)"], [1, "b-list"], [1, "b-list-row"], [1, "b-list-dot"], [1, "b-badge"], [1, "b-template-grid"], [1, "b-template-card"], [1, "b-tc-icon"], [1, "material-symbols-outlined"], [1, "b-tc-name"], [1, "b-tc-cat"], [1, "b-pdf-preview"], [1, "b-pdf-line", "w80"], [1, "b-pdf-line", "w60"], [1, "b-pdf-spacer"], [1, "b-pdf-field"], [1, "b-pdf-field-label"], [1, "b-pdf-field-val"], [1, "b-pdf-sig"], [1, "b-pdf-sig-label"], [1, "b-pdf-sig-line"], [1, "browser-dots"], ["type", "button", "aria-label", "Slide 1", 1, "bd", 3, "click"], ["type", "button", "aria-label", "Slide 2", 1, "bd", 3, "click"], ["type", "button", "aria-label", "Slide 3", 1, "bd", 3, "click"], [1, "logos"], [1, "logos-label"], [2, "overflow", "hidden"], [1, "logos-track"], [1, "logo-chip"], ["id", "funcionalidades", 1, "features"], [1, "container"], [1, "section-header", "anim"], [1, "eyebrow"], [1, "section-title"], [1, "section-sub"], [1, "feat-grid", "anim"], [1, "feat-card"], [1, "feat-icon"], ["d", "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"], ["d", "M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"], [1, "feat-title"], [1, "feat-desc"], ["d", "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"], ["points", "14 2 14 8 20 8"], ["x1", "16", "y1", "13", "x2", "8", "y2", "13"], ["x1", "16", "y1", "17", "x2", "8", "y2", "17"], ["d", "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"], ["points", "7 10 12 15 17 10"], ["x1", "12", "y1", "15", "x2", "12", "y2", "3"], ["d", "M12 20h9"], ["d", "M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"], ["points", "22 12 18 12 15 21 9 3 6 12 2 12"], [1, "how"], [1, "how-grid", "anim"], [1, "how-steps-list"], [1, "how-step", 3, "active"], [1, "how-visual"], [1, "phone-wrap"], [1, "phone-frame"], [1, "phone-screen"], [1, "ph-screen-slide"], [1, "ph-header-bar"], [1, "ph-body-inner"], [1, "ph-template-item"], ["aria-hidden", "true", 1, "material-symbols-outlined", "ph-row-ic"], [1, "ph-template-item", "ph-template-add"], [1, "ph-cover-demo"], [1, "ph-avatar-demo"], [1, "ph-body-inner", 2, "padding-top", "8px"], [1, "ph-clinic-name"], [1, "ph-clinic-tag"], [1, "ph-wpp-btn"], [1, "ph-doc-link"], [1, "ph-form-field"], [1, "ph-input-mock"], [1, "ph-sig-mock"], [1, "ph-submit-btn"], [1, "ph-proto-status"], [1, "ph-proto-dot"], [1, "ph-proto-pdf"], [1, "ph-pdf-icon"], [1, "ph-pdf-name"], [1, "ph-pdf-size"], [1, "ph-proto-timeline"], [1, "ph-tl-item"], [1, "ph-tl-dot"], ["id", "demonstracao", 1, "preview-section"], [1, "preview-grid", "anim"], [1, "preview-layouts"], [1, "preview-layouts-label"], ["role", "list", 1, "preview-layouts-grid"], ["type", "button", "role", "listitem", 1, "preview-layout-card", 3, "active"], [1, "preview-phone-col"], [1, "preview-iframe-hint"], [1, "phone-wrap", "preview-phone"], [1, "phone-screen", "lp-phone-iframe-screen"], [1, "lp-iframe-fallback"], [1, "preview-qr-wrap"], ["alt", "QR Code para preview no celular", 1, "preview-qr-img", 3, "src"], [1, "preview-qr-label"], [1, "demo-forms-section", "anim"], [1, "demo-forms-header"], [1, "eyebrow", 2, "text-align", "left"], [1, "demo-forms-title"], [1, "demo-form-tabs"], ["type", "button", 1, "demo-form-tab", 3, "active"], ["id", "lp-demo-form-card", 1, "demo-form-card"], [1, "demo-form-card-header"], [1, "demo-form-card-logo"], ["src", "assets/logo/logo.png", "alt", "", "width", "20", "height", "20"], [1, "demo-form-card-title"], [1, "demo-form-card-sub"], [1, "demo-form-success"], [1, "demo-form-fields"], [1, "social-proof"], [1, "testimonials-grid", "anim"], [1, "testimonial-card"], [1, "numbers"], [1, "numbers-grid", "anim"], [1, "num-card"], [1, "num-val"], [1, "num-unit"], [1, "num-label"], [1, "num-desc"], ["id", "planos", 1, "pricing"], [1, "lp-plans-loading", "anim"], [1, "lp-plans-empty", "anim"], [1, "pricing-grid", "anim"], [1, "hero-note", "anim", 2, "margin-top", "32px", "margin-bottom", "0", "text-align", "center"], ["id", "duvidas", 1, "faq"], [1, "faq-wrap"], [1, "faq-list", "anim"], [1, "faq-item"], ["type", "button", 1, "faq-q", 3, "click"], ["x1", "12", "y1", "5", "x2", "12", "y2", "19"], ["x1", "5", "y1", "12", "x2", "19", "y2", "12"], [1, "faq-a"], ["id", "contato", 1, "lp-demo"], [1, "container", "lp-demo-grid"], [1, "lp-demo-label"], ["href", "https://wa.me/5534996460818?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Gestgo.", "target", "_blank", "rel", "noopener noreferrer", 1, "lp-wa"], ["fill", "currentColor", "viewBox", "0 0 24 24", "aria-hidden", "true", 1, "h-5", "w-5"], ["d", "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"], ["id", "lp-demo-contato-card", 1, "lp-demo-card"], [1, "demo-card-title"], [1, "demo-card-sub"], [1, "demo-feedback", 3, "success", "error"], [3, "ngSubmit"], [1, "demo-field"], [1, "lp-form-label"], ["type", "text", "name", "demo_name", "placeholder", "Seu nome", "required", "", 1, "lp-form-input", 3, "ngModelChange", "ngModel"], ["type", "text", "name", "demo_clinic", "placeholder", "Nome fantasia, marca ou consult\xF3rio", "required", "", 1, "lp-form-input", 3, "ngModelChange", "ngModel"], [1, "demo-row"], ["type", "email", "name", "demo_email", "placeholder", "email@seunegocio.com.br", "required", "", 1, "lp-form-input", 3, "ngModelChange", "ngModel"], ["type", "tel", "name", "demo_phone", "mask", "(00) 0000-0000||(00) 00000-0000", "placeholder", "(00) 00000-0000", "inputmode", "numeric", "autocomplete", "tel", "required", "", 1, "lp-form-input", 3, "ngModelChange", "dropSpecialCharacters", "ngModel"], ["name", "demo_message", "rows", "3", "placeholder", "Conte rapidamente seu cen\xE1rio.", 1, "lp-form-input", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "capture-btn", 2, "width", "100%", "justify-content", "center", "margin-top", "4px", 3, "disabled"], [1, "demo-form-note", 2, "margin-top", "10px", "text-align", "center"], [1, "footer-inner"], [1, "footer-col"], ["routerLink", "/", 1, "footer-logo"], [1, "fl-icon"], ["src", "assets/logo/logo.png", "alt", "", "width", "22", "height", "22", "role", "presentation"], [1, "fl-name"], [1, "footer-tagline"], [1, "footer-col-title"], ["routerLink", "/privacidade"], ["routerLink", "/termos-de-uso"], ["href", "#contato"], ["target", "_blank", "rel", "noopener noreferrer", 3, "href"], ["href", "https://wa.me/5534996460818", "target", "_blank", "rel", "noopener noreferrer"], [1, "footer-bottom"], [1, "footer-copy"], [1, "lp-sticky-cta"], ["routerLink", "/comece", 1, "capture-btn"], [1, "status-msg-sep"], [1, "status-msg"], [1, "status-link"], [1, "how-step", 3, "click"], [1, "how-step-num"], [1, "how-step-body"], [1, "how-step-title"], [1, "how-step-desc"], ["type", "button", "role", "listitem", 1, "preview-layout-card", 3, "click"], ["aria-hidden", "true", 1, "material-symbols-outlined", "plc-icon"], [1, "plc-body"], [1, "plc-name"], [1, "plc-specialty"], [1, "plc-check"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", "stroke-width", "3"], ["aria-hidden", "true", 1, "lp-iframe-skeleton"], ["title", "Pr\xE9via da p\xE1gina p\xFAblica no modelo selecionado", "referrerpolicy", "strict-origin-when-cross-origin", 1, "lp-preview-iframe", 3, "load", "src"], ["type", "button", 1, "demo-form-tab", 3, "click"], ["d", "M22 11.08V12a10 10 0 11-5.93-9.14"], ["points", "22 4 12 14.01 9 11.01"], [1, "demo-form-success-title"], [1, "demo-form-success-sub"], [1, "fp-field-group"], ["type", "button", 1, "capture-btn", "demo-submit-btn", 3, "click"], [1, "demo-form-note"], [1, "fp-field-label"], ["rows", "4", 1, "fp-input", "fp-textarea", 3, "id", "placeholder", "ngModel", "name"], [1, "fp-select-wrap"], [1, "fp-check-row"], ["type", "text", "mask", "00/00/0000", "placeholder", "dd/mm/aaaa", "inputmode", "numeric", "autocomplete", "bday", 1, "fp-input", 3, "id", "leadZeroDateTime", "ngModel", "name"], ["type", "text", "mask", "000.000.000-00", "inputmode", "numeric", "autocomplete", "off", 1, "fp-input", 3, "id", "placeholder", "ngModel", "name"], ["type", "text", 1, "fp-input", 3, "id", "placeholder", "ngModel", "name"], ["rows", "4", 1, "fp-input", "fp-textarea", 3, "ngModelChange", "id", "placeholder", "ngModel", "name"], ["spellcheck", "false", "autocomplete", "off", 1, "fp-input", "fp-select", 3, "ngModelChange", "id", "ngModel", "name"], ["value", ""], [3, "value"], ["type", "checkbox", 1, "fp-check-native", 3, "ngModelChange", "id", "ngModel", "name"], ["aria-hidden", "true", 1, "fp-check-box"], ["viewBox", "0 0 12 12", "fill", "none", "stroke", "currentColor", "stroke-width", "2.5", 1, "fp-check-svg"], ["points", "2 6 5 9 10 3"], [1, "fp-check-label"], [1, "fp-sig-help"], ["width", "400", "height", "120", 1, "fp-sig-canvas", 3, "mousedown", "mousemove", "mouseup", "mouseleave", "touchstart", "touchmove", "touchend", "id"], [1, "fp-sig-footer"], [1, "fp-field-hint"], ["type", "button", 1, "fp-link-btn", 3, "click"], ["type", "text", "mask", "00/00/0000", "placeholder", "dd/mm/aaaa", "inputmode", "numeric", "autocomplete", "bday", 1, "fp-input", 3, "ngModelChange", "id", "leadZeroDateTime", "ngModel", "name"], ["type", "text", "mask", "000.000.000-00", "inputmode", "numeric", "autocomplete", "off", 1, "fp-input", 3, "ngModelChange", "id", "placeholder", "ngModel", "name"], ["type", "text", 1, "fp-input", 3, "ngModelChange", "id", "placeholder", "ngModel", "name"], [1, "tc-text"], [1, "tc-author"], [1, "tc-avatar"], [1, "tc-name"], [1, "tc-role"], ["href", "#contato", 1, "status-link", 2, "margin-left", "6px"], [1, "price-card", 3, "featured"], [1, "price-card"], [1, "price-top-badge"], [1, "price-plan"], [1, "price-amt"], [1, "price-period"], [1, "price-desc"], [1, "price-feats"], [1, "pf"], [1, "pf", "off"], ["type", "button", 1, "p-btn", "p-btn-green"], ["type", "button", 1, "p-btn", "p-btn-outline"], ["x1", "18", "y1", "6", "x2", "6", "y2", "18"], ["x1", "6", "y1", "6", "x2", "18", "y2", "18"], ["type", "button", 1, "p-btn", "p-btn-green", 3, "click"], ["type", "button", 1, "p-btn", "p-btn-outline", 3, "click"], [1, "demo-feedback"]], template: function InicioComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "a", 3);
      \u0275\u0275element(4, "span", 4);
      \u0275\u0275elementStart(5, "span");
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(7, InicioComponent_Conditional_7_Template, 5, 6);
      \u0275\u0275conditionalCreate(8, InicioComponent_Conditional_8_Template, 4, 0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "nav")(10, "div", 5)(11, "div", 6)(12, "a", 7)(13, "div", 8);
      \u0275\u0275element(14, "img", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 10);
      \u0275\u0275text(16, "Gestgo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 11)(18, "a", 12);
      \u0275\u0275text(19, "Funcionalidades");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "a", 13);
      \u0275\u0275text(21, "Demonstra\xE7\xE3o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "a", 14);
      \u0275\u0275text(23, "Planos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "a", 15);
      \u0275\u0275text(25, "D\xFAvidas");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 16)(27, "button", 17);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_27_listener() {
        return ctx.toggleMenu();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(28, "svg", 18);
      \u0275\u0275element(29, "path", 19);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(30, "button", 20);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_30_listener() {
        return ctx.toggleLpTheme();
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(31, "svg", 21);
      \u0275\u0275element(32, "path", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "svg", 23);
      \u0275\u0275element(34, "circle", 24)(35, "line", 25)(36, "line", 26)(37, "line", 27)(38, "line", 28)(39, "line", 29)(40, "line", 30)(41, "line", 31)(42, "line", 32);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(43, "a", 33);
      \u0275\u0275text(44, "Entrar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "button", 34);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_45_listener() {
        return ctx.focusCaptureEmail();
      });
      \u0275\u0275text(46, "Come\xE7ar gr\xE1tis");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(47, "div", 35)(48, "a", 36);
      \u0275\u0275listener("click", function InicioComponent_Template_a_click_48_listener() {
        return ctx.toggleMenu();
      });
      \u0275\u0275text(49, "Funcionalidades");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "a", 37);
      \u0275\u0275listener("click", function InicioComponent_Template_a_click_50_listener() {
        return ctx.toggleMenu();
      });
      \u0275\u0275text(51, "Demonstra\xE7\xE3o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "a", 38);
      \u0275\u0275listener("click", function InicioComponent_Template_a_click_52_listener() {
        return ctx.toggleMenu();
      });
      \u0275\u0275text(53, "Planos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "a", 39);
      \u0275\u0275listener("click", function InicioComponent_Template_a_click_54_listener() {
        return ctx.toggleMenu();
      });
      \u0275\u0275text(55, "D\xFAvidas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "a", 40);
      \u0275\u0275listener("click", function InicioComponent_Template_a_click_56_listener() {
        return ctx.toggleMenu();
      });
      \u0275\u0275text(57, "Entrar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "button", 41);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_58_listener() {
        ctx.focusCaptureEmail();
        return ctx.toggleMenu();
      });
      \u0275\u0275text(59, "Come\xE7ar gr\xE1tis");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(60, "section", 42)(61, "div", 43)(62, "div", 44)(63, "div", 45);
      \u0275\u0275element(64, "div", 46);
      \u0275\u0275text(65, " Lan\xE7amento \xB7 ");
      \u0275\u0275elementStart(66, "span");
      \u0275\u0275text(67, "Seja um early adopter");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(68, "h1", 47);
      \u0275\u0275text(69, " Fichas digitais que chegam");
      \u0275\u0275element(70, "br");
      \u0275\u0275elementStart(71, "em");
      \u0275\u0275text(72, "antes do atendimento");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(73, "p", 48);
      \u0275\u0275text(74, " Voc\xEA publica um ");
      \u0275\u0275elementStart(75, "strong");
      \u0275\u0275text(76, "link na bio");
      \u0275\u0275elementEnd();
      \u0275\u0275text(77, ". O cliente preenche a ficha pelo celular. Voc\xEA atende com tudo pronto \u2014 sem papel, sem retrabalho. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "div", 49)(79, "input", 50);
      \u0275\u0275twoWayListener("ngModelChange", function InicioComponent_Template_input_ngModelChange_79_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.heroEmail, $event) || (ctx.heroEmail = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "button", 51);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_80_listener() {
        return ctx.irComece();
      });
      \u0275\u0275text(81, " Criar conta gr\xE1tis ");
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(82, "svg", 52);
      \u0275\u0275element(83, "polyline", 53);
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(84, "p", 54);
      \u0275\u0275text(85);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "div", 55)(87, "div", 56);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(88, "svg", 52);
      \u0275\u0275element(89, "polyline", 57);
      \u0275\u0275elementEnd();
      \u0275\u0275text(90, " 86+ templates prontos ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275element(91, "div", 58);
      \u0275\u0275elementStart(92, "div", 56);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(93, "svg", 52);
      \u0275\u0275element(94, "polyline", 57);
      \u0275\u0275elementEnd();
      \u0275\u0275text(95, " Assinatura digital ");
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275element(96, "div", 58);
      \u0275\u0275elementStart(97, "div", 56);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(98, "svg", 52);
      \u0275\u0275element(99, "polyline", 57);
      \u0275\u0275elementEnd();
      \u0275\u0275text(100, " LGPD nativo ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(101, "div", 59)(102, "div", 60)(103, "div", 61)(104, "div", 62);
      \u0275\u0275element(105, "div", 63)(106, "div", 64)(107, "div", 65);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(108, "div", 66);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(109, "svg", 67);
      \u0275\u0275element(110, "rect", 68)(111, "path", 69);
      \u0275\u0275elementEnd();
      \u0275\u0275text(112, " app.gestgo.com.br ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(113, "div", 70)(114, "div", 71)(115, "div", 72)(116, "div", 73);
      \u0275\u0275text(117, "Painel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(118, "div", 74);
      \u0275\u0275text(119, "Cl\xEDnica S\xE3o Paulo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(120, "div", 75)(121, "div", 76)(122, "div", 77);
      \u0275\u0275text(123, "3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(124, "div", 78);
      \u0275\u0275text(125, "Pendentes");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(126, "div", 76)(127, "div", 77);
      \u0275\u0275text(128, "86");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(129, "div", 78);
      \u0275\u0275text(130, "Templates");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(131, "div", 76)(132, "div", 79);
      \u0275\u0275text(133, "24");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(134, "div", 78);
      \u0275\u0275text(135, "Respostas");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(136, "div", 80)(137, "div", 81);
      \u0275\u0275element(138, "div", 82);
      \u0275\u0275elementStart(139, "span");
      \u0275\u0275text(140, "Pesquisa de Satisfa\xE7\xE3o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(141, "span", 83);
      \u0275\u0275text(142, "Ativo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(143, "div", 81);
      \u0275\u0275element(144, "div", 82);
      \u0275\u0275elementStart(145, "span");
      \u0275\u0275text(146, "Anamnese B\xE1sica");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(147, "span", 83);
      \u0275\u0275text(148, "Ativo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(149, "div", 81);
      \u0275\u0275element(150, "div", 82);
      \u0275\u0275elementStart(151, "span");
      \u0275\u0275text(152, "Termo de Consentimento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(153, "span", 83);
      \u0275\u0275text(154, "Ativo");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(155, "div", 71)(156, "div", 72)(157, "div", 73);
      \u0275\u0275text(158, "Templates");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(159, "div", 74);
      \u0275\u0275text(160, "11 especialidades \xB7 86 modelos");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(161, "div", 84)(162, "div", 85)(163, "div", 86)(164, "span", 87);
      \u0275\u0275text(165, "medical_services");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(166, "div", 88);
      \u0275\u0275text(167, "Anamnese Geral");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(168, "div", 89);
      \u0275\u0275text(169, "Cl\xEDnica Geral");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(170, "div", 85)(171, "div", 86)(172, "span", 87);
      \u0275\u0275text(173, "spa");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(174, "div", 88);
      \u0275\u0275text(175, "Ficha Est\xE9tica");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(176, "div", 89);
      \u0275\u0275text(177, "Harmoniza\xE7\xE3o");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(178, "div", 85)(179, "div", 86)(180, "span", 87);
      \u0275\u0275text(181, "dentistry");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(182, "div", 88);
      \u0275\u0275text(183, "Anamnese Odonto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(184, "div", 89);
      \u0275\u0275text(185, "Odontologia");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(186, "div", 85)(187, "div", 86)(188, "span", 87);
      \u0275\u0275text(189, "psychology");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(190, "div", 88);
      \u0275\u0275text(191, "Contrato Terap\xEAutico");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(192, "div", 89);
      \u0275\u0275text(193, "Psicologia");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(194, "div", 71)(195, "div", 72)(196, "div", 73);
      \u0275\u0275text(197, "Protocolo #247");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(198, "div", 74);
      \u0275\u0275text(199, "Ficha preenchida \xB7 PDF gerado");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(200, "div", 90);
      \u0275\u0275element(201, "div", 91)(202, "div", 92)(203, "div", 93);
      \u0275\u0275elementStart(204, "div", 94)(205, "div", 95);
      \u0275\u0275text(206, "Nome completo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(207, "div", 96);
      \u0275\u0275text(208, "Maria Fernanda Silva");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(209, "div", 94)(210, "div", 95);
      \u0275\u0275text(211, "Data de nascimento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(212, "div", 96);
      \u0275\u0275text(213, "12/05/1988");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(214, "div", 94)(215, "div", 95);
      \u0275\u0275text(216, "Alergias");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(217, "div", 96);
      \u0275\u0275text(218, "Nenhuma conhecida");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(219, "div", 93);
      \u0275\u0275elementStart(220, "div", 97)(221, "div", 98);
      \u0275\u0275text(222, "Assinatura digital");
      \u0275\u0275elementEnd();
      \u0275\u0275element(223, "div", 99);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(224, "div", 100)(225, "button", 101);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_225_listener() {
        return ctx.heroSlide = 0;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(226, "button", 102);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_226_listener() {
        return ctx.heroSlide = 1;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(227, "button", 103);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_227_listener() {
        return ctx.heroSlide = 2;
      });
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(228, "div", 104)(229, "div", 105);
      \u0275\u0275text(230, "Especialidades atendidas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(231, "div", 106)(232, "div", 107);
      \u0275\u0275repeaterCreate(233, InicioComponent_For_234_Template, 2, 1, "span", 108, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(235, "section", 109)(236, "div", 110)(237, "div", 111)(238, "span", 112);
      \u0275\u0275text(239, "Funcionalidades");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(240, "h2", 113);
      \u0275\u0275text(241, "Tudo que seu neg\xF3cio precisa");
      \u0275\u0275element(242, "br");
      \u0275\u0275elementStart(243, "em");
      \u0275\u0275text(244, "no digital");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(245, "p", 114);
      \u0275\u0275text(246, "Do link na bio ao PDF assinado \u2014 sem papel, sem retrabalho.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(247, "div", 115)(248, "div", 116)(249, "div", 117);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(250, "svg", 67);
      \u0275\u0275element(251, "path", 118)(252, "path", 119);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(253, "div", 120);
      \u0275\u0275text(254, "Link na bio profissional");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(255, "div", 121);
      \u0275\u0275text(256, "P\xE1gina p\xFAblica com identidade visual, hor\xE1rios, WhatsApp e fichas \u2014 tudo em um link.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(257, "div", 116)(258, "div", 117);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(259, "svg", 67);
      \u0275\u0275element(260, "path", 122)(261, "polyline", 123)(262, "line", 124)(263, "line", 125);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(264, "div", 120);
      \u0275\u0275text(265, "86+ templates prontos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(266, "div", 121);
      \u0275\u0275text(267, "Fichas de anamnese, termos e acompanhamentos para 11 especialidades.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(268, "div", 116)(269, "div", 117);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(270, "svg", 67);
      \u0275\u0275element(271, "rect", 68)(272, "path", 69);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(273, "div", 120);
      \u0275\u0275text(274, "Assinatura digital");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(275, "div", 121);
      \u0275\u0275text(276, "Assinatura com o dedo no celular. Validade jur\xEDdica, LGPD e normas do conselho de classe.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(277, "div", 116)(278, "div", 117);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(279, "svg", 67);
      \u0275\u0275element(280, "path", 126)(281, "polyline", 127)(282, "line", 128);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(283, "div", 120);
      \u0275\u0275text(284, "PDF autom\xE1tico");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(285, "div", 121);
      \u0275\u0275text(286, "Cada ficha preenchida gera um PDF formatado. Zero digita\xE7\xE3o manual.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(287, "div", 116)(288, "div", 117);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(289, "svg", 67);
      \u0275\u0275element(290, "path", 129)(291, "path", 130);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(292, "div", 120);
      \u0275\u0275text(293, "Templates personaliz\xE1veis");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(294, "div", 121);
      \u0275\u0275text(295, "Adicione campos, reordene perguntas e salve como modelo reutiliz\xE1vel.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(296, "div", 116)(297, "div", 117);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(298, "svg", 67);
      \u0275\u0275element(299, "polyline", 131);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(300, "div", 120);
      \u0275\u0275text(301, "API & Webhooks");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(302, "div", 121);
      \u0275\u0275text(303, "Integre com prontu\xE1rio ou CRM via API documentada e webhooks.");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(304, "section", 132)(305, "div", 110)(306, "div", 111)(307, "span", 112);
      \u0275\u0275text(308, "Como funciona");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(309, "h2", 113);
      \u0275\u0275text(310, "4 passos. ");
      \u0275\u0275elementStart(311, "em");
      \u0275\u0275text(312, "Zero papel.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(313, "div", 133)(314, "div", 134);
      \u0275\u0275repeaterCreate(315, InicioComponent_For_316_Template, 8, 5, "div", 135, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(317, "div", 136)(318, "div", 137)(319, "div", 138)(320, "div", 139)(321, "div", 140)(322, "div", 141);
      \u0275\u0275text(323, "Gestgo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(324, "div", 142)(325, "div", 143)(326, "span", 144);
      \u0275\u0275text(327, "medical_services");
      \u0275\u0275elementEnd();
      \u0275\u0275text(328, " Anamnese Geral");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(329, "div", 143)(330, "span", 144);
      \u0275\u0275text(331, "spa");
      \u0275\u0275elementEnd();
      \u0275\u0275text(332, " Ficha Est\xE9tica");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(333, "div", 143)(334, "span", 144);
      \u0275\u0275text(335, "dentistry");
      \u0275\u0275elementEnd();
      \u0275\u0275text(336, " Odonto completa");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(337, "div", 145);
      \u0275\u0275text(338, "+ Criar template");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(339, "div", 140);
      \u0275\u0275element(340, "div", 146);
      \u0275\u0275elementStart(341, "div", 147);
      \u0275\u0275text(342, "CL");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(343, "div", 148)(344, "div", 149);
      \u0275\u0275text(345, "Seu neg\xF3cio");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(346, "div", 150);
      \u0275\u0275text(347, "Dermatologia \xB7 Est\xE9tica");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(348, "div", 151);
      \u0275\u0275text(349, "Falar pelo WhatsApp");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(350, "div", 152)(351, "span", 144);
      \u0275\u0275text(352, "article");
      \u0275\u0275elementEnd();
      \u0275\u0275text(353, " Ficha do procedimento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(354, "div", 152)(355, "span", 144);
      \u0275\u0275text(356, "edit_document");
      \u0275\u0275elementEnd();
      \u0275\u0275text(357, " Termo de consentimento");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(358, "div", 140)(359, "div", 141);
      \u0275\u0275text(360, "Ficha do Procedimento");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(361, "div", 142)(362, "div", 153)(363, "label");
      \u0275\u0275text(364, "Nome completo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(365, "div", 154);
      \u0275\u0275text(366, "Maria Fernanda");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(367, "div", 153)(368, "label");
      \u0275\u0275text(369, "Alergias");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(370, "div", 154);
      \u0275\u0275text(371, "Nenhuma");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(372, "div", 153)(373, "label");
      \u0275\u0275text(374, "Assinatura");
      \u0275\u0275elementEnd();
      \u0275\u0275element(375, "div", 155);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(376, "div", 156);
      \u0275\u0275text(377, "Enviar");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(378, "div", 140)(379, "div", 141);
      \u0275\u0275text(380, "Protocolo #247");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(381, "div", 142)(382, "div", 157);
      \u0275\u0275element(383, "div", 158);
      \u0275\u0275text(384, " PDF gerado com sucesso ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(385, "div", 159)(386, "div", 160);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(387, "svg", 67);
      \u0275\u0275element(388, "path", 122)(389, "polyline", 123);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(390, "div")(391, "div", 161);
      \u0275\u0275text(392, "ficha_procedimento.pdf");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(393, "div", 162);
      \u0275\u0275text(394, "42 KB \xB7 Assinado digitalmente");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(395, "div", 163)(396, "div", 164);
      \u0275\u0275element(397, "div", 165);
      \u0275\u0275text(398, "PDF gerado");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(399, "div", 164);
      \u0275\u0275element(400, "div", 165);
      \u0275\u0275text(401, "Assinado digitalmente");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(402, "div", 164);
      \u0275\u0275element(403, "div", 165);
      \u0275\u0275text(404, "Formul\xE1rio preenchido");
      \u0275\u0275elementEnd()()()()()()()()()()();
      \u0275\u0275elementStart(405, "section", 166)(406, "div", 110)(407, "div", 111)(408, "span", 112);
      \u0275\u0275text(409, "Experimente ao vivo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(410, "h2", 113);
      \u0275\u0275text(411, "Veja como sua p\xE1gina");
      \u0275\u0275element(412, "br");
      \u0275\u0275elementStart(413, "em");
      \u0275\u0275text(414, "aparece para quem acessa");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(415, "p", 114);
      \u0275\u0275text(416, "Escolha um layout, escaneie o QR code no celular e veja a p\xE1gina funcionando.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(417, "div", 167)(418, "div", 168)(419, "div", 169);
      \u0275\u0275text(420, "Escolha o layout");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(421, "div", 170);
      \u0275\u0275repeaterCreate(422, InicioComponent_For_423_Template, 11, 7, "button", 171, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(424, "div", 172)(425, "p", 173);
      \u0275\u0275text(426, "Pr\xE9via ao vivo \u2014 a mesma p\xE1gina que o cliente v\xEA no celular");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(427, "div", 174)(428, "div", 138)(429, "div", 175);
      \u0275\u0275conditionalCreate(430, InicioComponent_Conditional_430_Template, 2, 5)(431, InicioComponent_Conditional_431_Template, 2, 0, "div", 176);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(432, "div", 177);
      \u0275\u0275conditionalCreate(433, InicioComponent_Conditional_433_Template, 1, 1, "img", 178);
      \u0275\u0275elementStart(434, "div", 179);
      \u0275\u0275text(435, "Escaneie para ver no celular");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(436, "div", 180)(437, "div", 181)(438, "div")(439, "div", 182);
      \u0275\u0275text(440, "Formul\xE1rios");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(441, "h3", 183);
      \u0275\u0275text(442, "Veja como o cliente preenche");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(443, "div", 184);
      \u0275\u0275repeaterCreate(444, InicioComponent_For_445_Template, 2, 3, "button", 185, _forTrack2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(446, "div", 186)(447, "div", 187)(448, "div", 188);
      \u0275\u0275element(449, "img", 189);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(450, "div")(451, "div", 190);
      \u0275\u0275text(452);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(453, "div", 191);
      \u0275\u0275text(454);
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(455, InicioComponent_Conditional_455_Template, 9, 0, "div", 192)(456, InicioComponent_Conditional_456_Template, 7, 0, "div", 193);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(457, "section", 194)(458, "div", 110)(459, "div", 111)(460, "span", 112);
      \u0275\u0275text(461, "Depoimentos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(462, "h2", 113);
      \u0275\u0275text(463, "Quem usa, ");
      \u0275\u0275elementStart(464, "em");
      \u0275\u0275text(465, "recomenda");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(466, "div", 195);
      \u0275\u0275repeaterCreate(467, InicioComponent_For_468_Template, 11, 7, "div", 196, _forTrack3);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(469, "section", 197)(470, "div", 110)(471, "div", 198)(472, "div", 199)(473, "div", 200);
      \u0275\u0275text(474, "30");
      \u0275\u0275elementStart(475, "span", 201);
      \u0275\u0275text(476, "min");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(477, "div", 202);
      \u0275\u0275text(478, "Para configurar tudo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(479, "div", 203);
      \u0275\u0275text(480, "Cadastre seu neg\xF3cio, escolha templates e publique. Sem TI, sem treinamento.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(481, "div", 199)(482, "div", 200);
      \u0275\u0275text(483, "86+");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(484, "div", 202);
      \u0275\u0275text(485, "Templates cl\xEDnicos prontos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(486, "div", 203);
      \u0275\u0275text(487, "Criados com profissionais de sa\xFAde para 11 especialidades.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(488, "div", 199)(489, "div", 200);
      \u0275\u0275text(490, "0");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(491, "div", 202);
      \u0275\u0275text(492, "Papel necess\xE1rio");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(493, "div", 203);
      \u0275\u0275text(494, "Fichas, termos e consentimentos 100% digitais com assinatura v\xE1lida.");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(495, "section", 204)(496, "div", 110)(497, "div", 111)(498, "span", 112);
      \u0275\u0275text(499, "Planos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(500, "h2", 113);
      \u0275\u0275text(501, "Simples, ");
      \u0275\u0275elementStart(502, "em");
      \u0275\u0275text(503, "sem surpresas");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(504, "p", 114);
      \u0275\u0275text(505);
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(506, InicioComponent_Conditional_506_Template, 3, 0, "div", 205)(507, InicioComponent_Conditional_507_Template, 4, 0, "div", 206)(508, InicioComponent_Conditional_508_Template, 3, 0, "div", 207);
      \u0275\u0275elementStart(509, "p", 208);
      \u0275\u0275text(510);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(511, "section", 209)(512, "div", 110)(513, "div", 111)(514, "span", 112);
      \u0275\u0275text(515, "D\xFAvidas");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(516, "h2", 113);
      \u0275\u0275text(517, "Perguntas ");
      \u0275\u0275elementStart(518, "em");
      \u0275\u0275text(519, "frequentes");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(520, "div", 210)(521, "div", 211)(522, "div", 212)(523, "button", 213);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_523_listener() {
        return ctx.toggleFaq(0);
      });
      \u0275\u0275text(524, "A assinatura digital tem valor legal?");
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(525, "svg", 67);
      \u0275\u0275element(526, "line", 214)(527, "line", 215);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(528, "div", 216)(529, "p");
      \u0275\u0275text(530, "Sim. Atende aos requisitos da MP 2.200-2/2001 e tem validade jur\xEDdica equivalente \xE0 assinatura manuscrita para prontu\xE1rio e consentimento informado.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(531, "div", 212)(532, "button", 213);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_532_listener() {
        return ctx.toggleFaq(1);
      });
      \u0275\u0275text(533, "O sistema \xE9 compat\xEDvel com a LGPD?");
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(534, "svg", 67);
      \u0275\u0275element(535, "line", 214)(536, "line", 215);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(537, "div", 216)(538, "p");
      \u0275\u0275text(539, "Sim. Conformidade LGPD desde o in\xEDcio \u2014 coleta consentimento expl\xEDcito, exibe pol\xEDtica de privacidade e permite exclus\xE3o dos dados.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(540, "div", 212)(541, "button", 213);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_541_listener() {
        return ctx.toggleFaq(2);
      });
      \u0275\u0275text(542, "Quanto tempo leva para configurar?");
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(543, "svg", 67);
      \u0275\u0275element(544, "line", 214)(545, "line", 215);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(546, "div", 216)(547, "p");
      \u0275\u0275text(548, "Menos de 30 minutos. Cadastre seu neg\xF3cio, escolha templates e j\xE1 tem o link para o Instagram.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(549, "div", 212)(550, "button", 213);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_550_listener() {
        return ctx.toggleFaq(3);
      });
      \u0275\u0275text(551, "Posso personalizar os formul\xE1rios?");
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(552, "svg", 67);
      \u0275\u0275element(553, "line", 214)(554, "line", 215);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(555, "div", 216)(556, "p");
      \u0275\u0275text(557, "Sim. Todos os templates s\xE3o edit\xE1veis. Tamb\xE9m pode criar do zero para procedimentos espec\xEDficos.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(558, "div", 212)(559, "button", 213);
      \u0275\u0275listener("click", function InicioComponent_Template_button_click_559_listener() {
        return ctx.toggleFaq(4);
      });
      \u0275\u0275text(560, "Preciso cancelar meu Linktree?");
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(561, "svg", 67);
      \u0275\u0275element(562, "line", 214)(563, "line", 215);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(564, "div", 216)(565, "p");
      \u0275\u0275text(566, "N\xE3o. Pode testar em paralelo. A maioria migra naturalmente na primeira semana.");
      \u0275\u0275elementEnd()()()()()()();
      \u0275\u0275elementStart(567, "section", 217)(568, "div", 218)(569, "div")(570, "div", 219);
      \u0275\u0275text(571, "Contato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(572, "h3");
      \u0275\u0275text(573, "Ficou com alguma d\xFAvida?");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(574, "p");
      \u0275\u0275text(575, "Fale com a gente pelo WhatsApp ou preencha o formul\xE1rio. Respondemos em at\xE9 1 hora no hor\xE1rio comercial.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(576, "a", 220);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(577, "svg", 221);
      \u0275\u0275element(578, "path", 222);
      \u0275\u0275elementEnd();
      \u0275\u0275text(579, " Falar no WhatsApp ");
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(580, "div", 223)(581, "div", 224);
      \u0275\u0275text(582, "Agendar demonstra\xE7\xE3o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(583, "p", 225);
      \u0275\u0275text(584, "Resposta em at\xE9 1 hora no hor\xE1rio comercial.");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(585, InicioComponent_Conditional_585_Template, 2, 5, "div", 226);
      \u0275\u0275elementStart(586, "form", 227);
      \u0275\u0275listener("ngSubmit", function InicioComponent_Template_form_ngSubmit_586_listener() {
        return ctx.enviarDemonstracao();
      });
      \u0275\u0275elementStart(587, "div", 228)(588, "label", 229);
      \u0275\u0275text(589, "Nome *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(590, "input", 230);
      \u0275\u0275twoWayListener("ngModelChange", function InicioComponent_Template_input_ngModelChange_590_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.demonstracao.name, $event) || (ctx.demonstracao.name = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(591, "div", 228)(592, "label", 229);
      \u0275\u0275text(593, "Neg\xF3cio ou marca *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(594, "input", 231);
      \u0275\u0275twoWayListener("ngModelChange", function InicioComponent_Template_input_ngModelChange_594_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.demonstracao.clinic, $event) || (ctx.demonstracao.clinic = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(595, "div", 232)(596, "div", 228)(597, "label", 229);
      \u0275\u0275text(598, "E-mail *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(599, "input", 233);
      \u0275\u0275twoWayListener("ngModelChange", function InicioComponent_Template_input_ngModelChange_599_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.demonstracao.email, $event) || (ctx.demonstracao.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(600, "div", 228)(601, "label", 229);
      \u0275\u0275text(602, "WhatsApp *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(603, "input", 234);
      \u0275\u0275twoWayListener("ngModelChange", function InicioComponent_Template_input_ngModelChange_603_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.demonstracao.phone, $event) || (ctx.demonstracao.phone = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(604, "div", 228)(605, "label", 229);
      \u0275\u0275text(606, "Mensagem");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(607, "textarea", 235);
      \u0275\u0275twoWayListener("ngModelChange", function InicioComponent_Template_textarea_ngModelChange_607_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.demonstracao.message, $event) || (ctx.demonstracao.message = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(608, "button", 236);
      \u0275\u0275conditionalCreate(609, InicioComponent_Conditional_609_Template, 1, 0)(610, InicioComponent_Conditional_610_Template, 1, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(611, "p", 237);
      \u0275\u0275text(612, "Ao enviar, voc\xEA concorda em ser contatado.");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(613, "footer")(614, "div", 238)(615, "div", 239)(616, "a", 240)(617, "div", 241);
      \u0275\u0275element(618, "img", 242);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(619, "span", 243);
      \u0275\u0275text(620, "Gestgo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(621, "p", 244);
      \u0275\u0275text(622, "Fichas digitais que chegam antes do atendimento.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(623, "div", 239)(624, "div", 245);
      \u0275\u0275text(625, "Produto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(626, "a", 12);
      \u0275\u0275text(627, "Funcionalidades");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(628, "a", 13);
      \u0275\u0275text(629, "Demonstra\xE7\xE3o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(630, "a", 14);
      \u0275\u0275text(631, "Planos");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(632, "a", 15);
      \u0275\u0275text(633, "D\xFAvidas");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(634, "div", 239)(635, "div", 245);
      \u0275\u0275text(636, "Legal");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(637, "a", 246);
      \u0275\u0275text(638, "Privacidade");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(639, "a", 247);
      \u0275\u0275text(640, "Termos de uso");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(641, "div", 239)(642, "div", 245);
      \u0275\u0275text(643, "Suporte");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(644, "a", 248);
      \u0275\u0275text(645, "Contato");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(646, "a", 249);
      \u0275\u0275text(647, "Status");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(648, "a", 250);
      \u0275\u0275text(649, "WhatsApp");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(650, "div", 251)(651, "span", 252);
      \u0275\u0275text(652);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(653, "div", 253)(654, "a", 254);
      \u0275\u0275text(655);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(656, "svg", 52);
      \u0275\u0275element(657, "polyline", 53);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275attribute("data-theme", ctx.lpTheme);
      \u0275\u0275advance(3);
      \u0275\u0275property("href", ctx.statusPageUrl, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance();
      \u0275\u0275property("ngClass", "op-" + ctx.serviceStatusKey);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.serviceStatusLabel);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.serviceStatusKey !== "operational" && ctx.serviceStatusMessage ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.serviceStatusKey === "operational" ? 8 : -1);
      \u0275\u0275advance(39);
      \u0275\u0275classProp("open", ctx.menuAberto);
      \u0275\u0275advance(32);
      \u0275\u0275twoWayProperty("ngModel", ctx.heroEmail);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("Sem cart\xE3o \xB7 ", ctx.landingTrialDias, " dias gr\xE1tis \xB7 Cancele quando quiser");
      \u0275\u0275advance(29);
      \u0275\u0275classProp("active", ctx.heroSlide === 0);
      \u0275\u0275advance(41);
      \u0275\u0275classProp("active", ctx.heroSlide === 1);
      \u0275\u0275advance(39);
      \u0275\u0275classProp("active", ctx.heroSlide === 2);
      \u0275\u0275advance(31);
      \u0275\u0275classProp("active", ctx.heroSlide === 0);
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.heroSlide === 1);
      \u0275\u0275advance();
      \u0275\u0275classProp("active", ctx.heroSlide === 2);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.lpLogoMarquee);
      \u0275\u0275advance(82);
      \u0275\u0275repeater(ctx.howSteps);
      \u0275\u0275advance(6);
      \u0275\u0275classProp("active", ctx.howStep === 0);
      \u0275\u0275advance(18);
      \u0275\u0275classProp("active", ctx.howStep === 1);
      \u0275\u0275advance(19);
      \u0275\u0275classProp("active", ctx.howStep === 2);
      \u0275\u0275advance(20);
      \u0275\u0275classProp("active", ctx.howStep === 3);
      \u0275\u0275advance(44);
      \u0275\u0275repeater(ctx.demoLayouts);
      \u0275\u0275advance(8);
      \u0275\u0275conditional(ctx.previewIframeUrl ? 430 : 431);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.qrCodeDataUrl ? 433 : -1);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.demoForms);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.selectedDemoForm.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.selectedDemoForm.description);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.demoFormSubmitted ? 455 : 456);
      \u0275\u0275advance(12);
      \u0275\u0275repeater(ctx.testimonials);
      \u0275\u0275advance(38);
      \u0275\u0275textInterpolate1("Trial de ", ctx.landingTrialDias, " dias gr\xE1tis, sem cart\xE3o. Cancele quando quiser.");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.carregandoLanding ? 506 : ctx.planos.length === 0 ? 507 : 508);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" * Trial de ", ctx.landingTrialDias, " dias sem cart\xE3o. Ap\xF3s o per\xEDodo, ative o plano escolhido. ");
      \u0275\u0275advance(13);
      \u0275\u0275classProp("open", ctx.faqOpenIndex === 0);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("open", ctx.faqOpenIndex === 0);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("open", ctx.faqOpenIndex === 1);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("open", ctx.faqOpenIndex === 1);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("open", ctx.faqOpenIndex === 2);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("open", ctx.faqOpenIndex === 2);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("open", ctx.faqOpenIndex === 3);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("open", ctx.faqOpenIndex === 3);
      \u0275\u0275advance(4);
      \u0275\u0275classProp("open", ctx.faqOpenIndex === 4);
      \u0275\u0275advance(5);
      \u0275\u0275classProp("open", ctx.faqOpenIndex === 4);
      \u0275\u0275advance(21);
      \u0275\u0275conditional(ctx.demonstracaoFeedback ? 585 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.demonstracao.name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.demonstracao.clinic);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.demonstracao.email);
      \u0275\u0275advance(4);
      \u0275\u0275property("dropSpecialCharacters", true);
      \u0275\u0275twoWayProperty("ngModel", ctx.demonstracao.phone);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.demonstracao.message);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.demonstracaoEnviando);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.demonstracaoEnviando ? 609 : 610);
      \u0275\u0275advance(37);
      \u0275\u0275property("href", ctx.statusPageUrl, \u0275\u0275sanitizeUrl);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("\xA9 ", ctx.ano, " Gestgo. Todos os direitos reservados.");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" Come\xE7ar gr\xE1tis \xB7 ", ctx.landingTrialDias, " dias ");
    }
  }, dependencies: [CommonModule, NgClass, RouterLink, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, NgxMaskDirective, SlicePipe, DecimalPipe], styles: [`

[_nghost-%COMP%] {
  display: block;
}
.lp-page[_ngcontent-%COMP%] {
  --sans:
    "Geist",
    system-ui,
    sans-serif;
  --radius: 12px;
  font-family: var(--sans);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  overflow-x: hidden;
  scroll-behavior: smooth;
  transition: background 0.3s, color 0.3s;
}
.lp-page[data-theme=dark][_ngcontent-%COMP%] {
  --bg: #09090b;
  --bg2: #111113;
  --bg3: #18181b;
  --surface: #1c1c1f;
  --border: rgba(255,255,255,0.07);
  --border2: rgba(255,255,255,0.13);
  --border3: rgba(255,255,255,0.22);
  --text: #fafafa;
  --text2: #a1a1aa;
  --text3: #52525b;
  --nav-bg: rgba(9,9,11,0.85);
  --card-bg: #111113;
  --feat-bg: #111113;
  --grid-line: rgba(255,255,255,0.04);
  --brand: #3b82f6;
  --brand-dark: #1d4ed8;
  --brand-bg: rgba(59,130,246,0.12);
  --brand-bd: rgba(59,130,246,0.28);
  --hero-glow: rgba(59,130,246,0.1);
  --brand-pulse: rgba(59,130,246,0.45);
}
.lp-page[data-theme=light][_ngcontent-%COMP%] {
  --bg: #ffffff;
  --bg2: #f8f8fa;
  --bg3: #f1f1f5;
  --surface: #ffffff;
  --border: rgba(0,0,0,0.07);
  --border2: rgba(0,0,0,0.12);
  --border3: rgba(0,0,0,0.2);
  --text: #09090b;
  --text2: #52525b;
  --text3: #a1a1aa;
  --nav-bg: rgba(255,255,255,0.88);
  --card-bg: #ffffff;
  --feat-bg: #f8f8fa;
  --grid-line: rgba(0,0,0,0.04);
  --brand: #1d4ed8;
  --brand-dark: #1e40af;
  --brand-bg: rgba(29,78,216,0.1);
  --brand-bd: rgba(30,64,175,0.22);
  --hero-glow: rgba(29,78,216,0.08);
  --brand-pulse: rgba(29,78,216,0.4);
}
.lp-page[_ngcontent-%COMP%]   *[_ngcontent-%COMP%], 
.lp-page[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]::before, 
.lp-page[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]::after {
  box-sizing: border-box;
}
.lp-page[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  color: inherit;
  text-decoration: none;
}
.lp-page[_ngcontent-%COMP%]   .grid-bg[_ngcontent-%COMP%] {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(
      90deg,
      var(--grid-line) 1px,
      transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image:
    radial-gradient(
      ellipse 70% 70% at 50% 0%,
      black 40%,
      transparent 100%);
  mask-image:
    radial-gradient(
      ellipse 70% 70% at 50% 0%,
      black 40%,
      transparent 100%);
}
.lp-page[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%] {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  backdrop-filter: blur(20px) saturate(1.4);
  background: var(--nav-bg);
  border-bottom: 1px solid var(--border);
  transition: background 0.3s, border-color 0.3s;
}
.lp-page[_ngcontent-%COMP%]   .nav-inner[_ngcontent-%COMP%] {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.lp-page[_ngcontent-%COMP%]   .nav-left[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 32px;
}
.lp-page[_ngcontent-%COMP%]   .nav-logo[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 9px;
}
.lp-page[_ngcontent-%COMP%]   .logo-mark[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--brand);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  padding: 4px;
}
.lp-page[data-theme=light][_ngcontent-%COMP%]   .logo-mark[_ngcontent-%COMP%] {
  border-color: rgba(30, 64, 175, 0.35);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
.lp-page[_ngcontent-%COMP%]   .logo-mark[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.lp-page[_ngcontent-%COMP%]   .logo-name[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.4px;
}
.lp-page[_ngcontent-%COMP%]   .nav-links[_ngcontent-%COMP%] {
  display: flex;
  gap: 24px;
}
.lp-page[_ngcontent-%COMP%]   .nav-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--text2);
  transition: color 0.15s;
}
.lp-page[_ngcontent-%COMP%]   .nav-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
  color: var(--text);
}
.lp-page[_ngcontent-%COMP%]   .nav-right[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
}
.lp-page[_ngcontent-%COMP%]   .theme-toggle[_ngcontent-%COMP%] {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--border2);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text2);
  transition: all 0.15s;
}
.lp-page[_ngcontent-%COMP%]   .theme-toggle[_ngcontent-%COMP%]:hover {
  background: var(--bg3);
  color: var(--text);
}
.lp-page[_ngcontent-%COMP%]   .theme-toggle[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 15px;
  height: 15px;
}
.lp-page[_ngcontent-%COMP%]   .icon-sun[_ngcontent-%COMP%] {
  display: none;
}
.lp-page[_ngcontent-%COMP%]   .icon-moon[_ngcontent-%COMP%] {
  display: block;
}
.lp-page[data-theme=light][_ngcontent-%COMP%]   .icon-sun[_ngcontent-%COMP%] {
  display: block;
}
.lp-page[data-theme=light][_ngcontent-%COMP%]   .icon-moon[_ngcontent-%COMP%] {
  display: none;
}
.lp-page[_ngcontent-%COMP%]   .nav-login[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--text2);
  padding: 7px 14px;
  border-radius: 8px;
  border: 1px solid var(--border2);
  background: transparent;
  cursor: pointer;
  font-family: var(--sans);
  transition: all 0.15s;
}
.lp-page[_ngcontent-%COMP%]   a.nav-login[_ngcontent-%COMP%]:hover {
  color: var(--text);
  border-color: var(--border3);
}
.lp-page[_ngcontent-%COMP%]   .nav-cta[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  padding: 7px 16px;
  border-radius: 8px;
  background: var(--brand);
  border: none;
  cursor: pointer;
  font-family: var(--sans);
  transition: background 0.15s, transform 0.1s;
}
.lp-page[_ngcontent-%COMP%]   .nav-cta[_ngcontent-%COMP%]:hover {
  background: var(--brand-dark);
}
.lp-page[_ngcontent-%COMP%]   .nav-cta[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.lp-page[_ngcontent-%COMP%]   .lp-menu-btn[_ngcontent-%COMP%] {
  display: none;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--border2);
  background: transparent;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: var(--text2);
}
.lp-page[_ngcontent-%COMP%]   .lp-mobile-nav[_ngcontent-%COMP%] {
  display: none;
  border-top: 1px solid var(--border);
  background: var(--nav-bg);
  padding: 16px 24px 20px;
  flex-direction: column;
  gap: 12px;
}
.lp-page[_ngcontent-%COMP%]   .lp-mobile-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text2);
}
.lp-page[_ngcontent-%COMP%]   .lp-mobile-nav.open[_ngcontent-%COMP%] {
  display: flex;
}
.lp-page[_ngcontent-%COMP%]   .status-bar[_ngcontent-%COMP%] {
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: center;
  padding: 7px 24px;
  transition: background 0.3s;
}
.lp-page[_ngcontent-%COMP%]   .status-inner[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text2);
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
.lp-page[_ngcontent-%COMP%]   .status-bar-link[_ngcontent-%COMP%] {
  text-decoration: none;
  color: inherit;
  max-width: 100%;
}
.lp-page[_ngcontent-%COMP%]   .status-msg-sep[_ngcontent-%COMP%] {
  color: var(--border2);
}
.lp-page[_ngcontent-%COMP%]   .status-msg[_ngcontent-%COMP%] {
  color: var(--text3);
  max-width: min(320px, 90vw);
}
.lp-page[_ngcontent-%COMP%]   .status-dot[_ngcontent-%COMP%] {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  animation: _ngcontent-%COMP%_lp-pulse-dot 2s ease-in-out infinite;
}
.lp-page[_ngcontent-%COMP%]   .status-dot.op-operational[_ngcontent-%COMP%] {
  background: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .status-dot.op-degraded[_ngcontent-%COMP%] {
  background: #eab308;
  animation: _ngcontent-%COMP%_lp-pulse-amber 2s ease-in-out infinite;
}
.lp-page[_ngcontent-%COMP%]   .status-dot.op-outage[_ngcontent-%COMP%] {
  background: #ef4444;
  animation: _ngcontent-%COMP%_lp-pulse-red 2s ease-in-out infinite;
}
.lp-page[_ngcontent-%COMP%]   .status-dot.op-maintenance[_ngcontent-%COMP%] {
  background: #6366f1;
  animation: _ngcontent-%COMP%_lp-pulse-indigo 2s ease-in-out infinite;
}
@keyframes _ngcontent-%COMP%_lp-pulse-dot {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 0 0 var(--brand-pulse);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 0 0 4px transparent;
  }
}
@keyframes _ngcontent-%COMP%_lp-pulse-amber {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.45);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(234, 179, 8, 0);
  }
}
@keyframes _ngcontent-%COMP%_lp-pulse-red {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.45);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0);
  }
}
@keyframes _ngcontent-%COMP%_lp-pulse-indigo {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.45);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0);
  }
}
.lp-page[_ngcontent-%COMP%]   .status-link[_ngcontent-%COMP%] {
  color: var(--brand);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.lp-page[_ngcontent-%COMP%]   section[_ngcontent-%COMP%] {
  position: relative;
  z-index: 1;
}
.lp-page[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%] {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
}
.lp-page[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {
  text-align: center;
  margin-bottom: 64px;
}
.lp-page[_ngcontent-%COMP%]   .eyebrow[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brand);
  margin-bottom: 12px;
  display: block;
}
.lp-page[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.12;
  margin-bottom: 14px;
}
.lp-page[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {
  font-style: normal;
  font-weight: 700;
}
.lp-page[_ngcontent-%COMP%]   .section-sub[_ngcontent-%COMP%] {
  font-size: 16px;
  color: var(--text2);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.65;
}
.lp-page[_ngcontent-%COMP%]   .hero[_ngcontent-%COMP%] {
  padding: 80px 24px 80px;
  background:
    radial-gradient(
      ellipse 100% 50% at 50% 0%,
      var(--hero-glow) 0%,
      transparent 65%);
}
.lp-page[_ngcontent-%COMP%]   .hero-grid[_ngcontent-%COMP%] {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}
.lp-page[_ngcontent-%COMP%]   .hero-text[_ngcontent-%COMP%] {
}
.lp-page[_ngcontent-%COMP%]   .hero-eyebrow[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border2);
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text2);
  margin-bottom: 28px;
  background: var(--bg2);
  transition: background 0.3s, border-color 0.3s;
}
.lp-page[_ngcontent-%COMP%]   .hero-eyebrow-dot[_ngcontent-%COMP%] {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .hero-eyebrow[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  color: var(--brand);
  font-weight: 600;
}
.lp-page[_ngcontent-%COMP%]   .hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.08;
  margin: 0 0 20px;
}
.lp-page[_ngcontent-%COMP%]   .hero[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {
  font-style: normal;
  font-weight: 700;
  color: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .hero-sub[_ngcontent-%COMP%] {
  font-size: clamp(15px, 1.6vw, 17px);
  color: var(--text2);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 0 32px;
}
.lp-page[_ngcontent-%COMP%]   .hero-sub[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {
  color: var(--text);
  font-weight: 500;
}
.lp-page[_ngcontent-%COMP%]   .hero-capture[_ngcontent-%COMP%] {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}
.lp-page[_ngcontent-%COMP%]   .capture-input[_ngcontent-%COMP%] {
  padding: 13px 18px;
  border-radius: 10px;
  border: 1px solid var(--border2);
  background: var(--bg2);
  color: var(--text);
  font-size: 14px;
  font-family: var(--sans);
  width: 240px;
  max-width: 100%;
  outline: none;
  transition: border-color 0.15s, background 0.3s;
}
.lp-page[_ngcontent-%COMP%]   .capture-input[_ngcontent-%COMP%]::placeholder {
  color: var(--text3);
}
.lp-page[_ngcontent-%COMP%]   .capture-input[_ngcontent-%COMP%]:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-bg);
}
.lp-page[_ngcontent-%COMP%]   .capture-btn[_ngcontent-%COMP%] {
  padding: 13px 22px;
  border-radius: 10px;
  background: var(--brand);
  color: #fff;
  border: none;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--sans);
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  display: inline-flex;
  align-items: center;
  gap: 7px;
}
.lp-page[_ngcontent-%COMP%]   .capture-btn[_ngcontent-%COMP%]:hover {
  background: var(--brand-dark);
}
.lp-page[_ngcontent-%COMP%]   .capture-btn[_ngcontent-%COMP%]:active {
  transform: scale(0.98);
}
.lp-page[_ngcontent-%COMP%]   .capture-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 14px;
  height: 14px;
}
.lp-page[_ngcontent-%COMP%]   .capture-btn[_ngcontent-%COMP%]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.lp-page[_ngcontent-%COMP%]   .hero-note[_ngcontent-%COMP%] {
  font-size: 12px;
  color: var(--text3);
  margin-bottom: 32px;
}
.lp-page[_ngcontent-%COMP%]   .hero-social[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.lp-page[_ngcontent-%COMP%]   .hs-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: var(--text2);
}
.lp-page[_ngcontent-%COMP%]   .hs-item[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 14px;
  height: 14px;
  color: var(--brand);
  flex-shrink: 0;
}
.lp-page[_ngcontent-%COMP%]   .hs-sep[_ngcontent-%COMP%] {
  width: 1px;
  height: 16px;
  background: var(--border2);
}
.lp-page[_ngcontent-%COMP%]   .hero-visual[_ngcontent-%COMP%] {
  perspective: 1200px;
}
.lp-page[_ngcontent-%COMP%]   .hero-browser[_ngcontent-%COMP%] {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border2);
  background: var(--bg2);
  box-shadow: 0 0 0 1px var(--border), 0 40px 100px rgba(0, 0, 0, 0.35);
  transition: border-color 0.3s, background 0.3s;
  transform: rotateY(-3deg) rotateX(1deg);
}
.lp-page[_ngcontent-%COMP%]   .browser-bar[_ngcontent-%COMP%] {
  background: var(--bg3);
  border-bottom: 1px solid var(--border);
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.lp-page[_ngcontent-%COMP%]   .b-dots[_ngcontent-%COMP%] {
  display: flex;
  gap: 6px;
}
.lp-page[_ngcontent-%COMP%]   .b-dot[_ngcontent-%COMP%] {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.lp-page[_ngcontent-%COMP%]   .b-url[_ngcontent-%COMP%] {
  flex: 1;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 5px 12px;
  font-size: 11px;
  color: var(--text3);
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 280px;
  margin: 0 auto;
}
.lp-page[_ngcontent-%COMP%]   .b-url[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 11px;
  height: 11px;
  flex-shrink: 0;
}
.lp-page[_ngcontent-%COMP%]   .browser-slides[_ngcontent-%COMP%] {
  position: relative;
  min-height: 280px;
  overflow: hidden;
}
.lp-page[_ngcontent-%COMP%]   .browser-slide[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  padding: 20px;
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.35s, transform 0.35s;
  pointer-events: none;
}
.lp-page[_ngcontent-%COMP%]   .browser-slide.active[_ngcontent-%COMP%] {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
  position: relative;
}
.lp-page[_ngcontent-%COMP%]   .b-slide-header[_ngcontent-%COMP%] {
  margin-bottom: 16px;
}
.lp-page[_ngcontent-%COMP%]   .b-slide-title[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 3px;
}
.lp-page[_ngcontent-%COMP%]   .b-slide-sub[_ngcontent-%COMP%] {
  font-size: 11px;
  color: var(--text3);
}
.lp-page[_ngcontent-%COMP%]   .b-kpi-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}
.lp-page[_ngcontent-%COMP%]   .b-kpi[_ngcontent-%COMP%] {
  background: var(--bg3);
  border-radius: 9px;
  padding: 12px;
  text-align: center;
}
.lp-page[_ngcontent-%COMP%]   .b-kpi-val[_ngcontent-%COMP%] {
  font-size: 20px;
  font-weight: 700;
}
.lp-page[_ngcontent-%COMP%]   .b-kpi-label[_ngcontent-%COMP%] {
  font-size: 10px;
  color: var(--text3);
  margin-top: 2px;
}
.lp-page[_ngcontent-%COMP%]   .b-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.lp-page[_ngcontent-%COMP%]   .b-list-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
}
.lp-page[_ngcontent-%COMP%]   .b-list-row[_ngcontent-%COMP%]:last-child {
  border: none;
}
.lp-page[_ngcontent-%COMP%]   .b-list-dot[_ngcontent-%COMP%] {
  width: 8px;
  height: 8px;
  border-radius: 3px;
  background: var(--brand-bg);
  border: 1px solid var(--brand-bd);
  flex-shrink: 0;
}
.lp-page[_ngcontent-%COMP%]   .b-list-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-of-type {
  flex: 1;
  font-weight: 500;
}
.lp-page[_ngcontent-%COMP%]   .b-badge[_ngcontent-%COMP%] {
  font-size: 9px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 20px;
  background: var(--brand-bg);
  color: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .b-template-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.lp-page[_ngcontent-%COMP%]   .b-template-card[_ngcontent-%COMP%] {
  background: var(--bg3);
  border-radius: 10px;
  padding: 14px;
  border: 1px solid var(--border);
}
.lp-page[_ngcontent-%COMP%]   .b-tc-icon[_ngcontent-%COMP%] {
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text2);
}
.lp-page[_ngcontent-%COMP%]   .b-tc-icon[_ngcontent-%COMP%]   .material-symbols-outlined[_ngcontent-%COMP%] {
  font-size: 22px;
  font-variation-settings:
    "FILL" 0,
    "wght" 300,
    "GRAD" 0,
    "opsz" 24;
}
.lp-page[_ngcontent-%COMP%]   .b-tc-name[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
}
.lp-page[_ngcontent-%COMP%]   .b-tc-cat[_ngcontent-%COMP%] {
  font-size: 10px;
  color: var(--text3);
}
.lp-page[_ngcontent-%COMP%]   .b-pdf-preview[_ngcontent-%COMP%] {
}
.lp-page[_ngcontent-%COMP%]   .b-pdf-line[_ngcontent-%COMP%] {
  height: 8px;
  border-radius: 4px;
  background: var(--bg3);
  margin-bottom: 6px;
}
.lp-page[_ngcontent-%COMP%]   .b-pdf-line.w80[_ngcontent-%COMP%] {
  width: 80%;
}
.lp-page[_ngcontent-%COMP%]   .b-pdf-line.w60[_ngcontent-%COMP%] {
  width: 60%;
}
.lp-page[_ngcontent-%COMP%]   .b-pdf-spacer[_ngcontent-%COMP%] {
  height: 12px;
}
.lp-page[_ngcontent-%COMP%]   .b-pdf-field[_ngcontent-%COMP%] {
  margin-bottom: 10px;
}
.lp-page[_ngcontent-%COMP%]   .b-pdf-field-label[_ngcontent-%COMP%] {
  font-size: 9px;
  font-weight: 600;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}
.lp-page[_ngcontent-%COMP%]   .b-pdf-field-val[_ngcontent-%COMP%] {
  font-size: 12px;
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
}
.lp-page[_ngcontent-%COMP%]   .b-pdf-sig[_ngcontent-%COMP%] {
  margin-top: 16px;
}
.lp-page[_ngcontent-%COMP%]   .b-pdf-sig-label[_ngcontent-%COMP%] {
  font-size: 9px;
  font-weight: 600;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}
.lp-page[_ngcontent-%COMP%]   .b-pdf-sig-line[_ngcontent-%COMP%] {
  height: 40px;
  border: 1px dashed var(--border2);
  border-radius: 8px;
  background: var(--bg3);
}
.lp-page[_ngcontent-%COMP%]   .browser-dots[_ngcontent-%COMP%] {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 12px;
  border-top: 1px solid var(--border);
}
.lp-page[_ngcontent-%COMP%]   .bd[_ngcontent-%COMP%] {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: var(--border2);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;
}
.lp-page[_ngcontent-%COMP%]   .bd.active[_ngcontent-%COMP%] {
  background: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .logos[_ngcontent-%COMP%] {
  padding: 40px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}
.lp-page[_ngcontent-%COMP%]   .logos-label[_ngcontent-%COMP%] {
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text3);
  margin-bottom: 20px;
}
.lp-page[_ngcontent-%COMP%]   .logos-track[_ngcontent-%COMP%] {
  display: flex;
  gap: 40px;
  animation: _ngcontent-%COMP%_lp-scroll-logos 25s linear infinite;
  width: max-content;
}
@keyframes _ngcontent-%COMP%_lp-scroll-logos {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
.lp-page[_ngcontent-%COMP%]   .logos-track[_ngcontent-%COMP%]:hover {
  animation-play-state: paused;
}
.lp-page[_ngcontent-%COMP%]   .logo-chip[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text3);
  white-space: nowrap;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg2);
  transition: background 0.3s, border-color 0.3s;
}
.lp-page[_ngcontent-%COMP%]   .logo-chip[_ngcontent-%COMP%]:hover {
  color: var(--text2);
  border-color: var(--border2);
}
.lp-page[_ngcontent-%COMP%]   .features[_ngcontent-%COMP%] {
  padding: 100px 0;
}
.lp-page[_ngcontent-%COMP%]   .feat-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.lp-page[_ngcontent-%COMP%]   .feat-card[_ngcontent-%COMP%] {
  background: var(--feat-bg);
  padding: 28px;
  transition: background 0.2s;
}
.lp-page[_ngcontent-%COMP%]   .feat-card[_ngcontent-%COMP%]:hover {
  background: var(--bg3);
}
.lp-page[_ngcontent-%COMP%]   .feat-icon[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: var(--brand-bg);
  border: 1px solid var(--brand-bd);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.lp-page[_ngcontent-%COMP%]   .feat-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 17px;
  height: 17px;
  color: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .feat-title[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 7px;
}
.lp-page[_ngcontent-%COMP%]   .feat-desc[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.6;
}
.lp-page[_ngcontent-%COMP%]   .how[_ngcontent-%COMP%] {
  padding: 100px 0;
  background: var(--bg2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.lp-page[_ngcontent-%COMP%]   .how-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}
.lp-page[_ngcontent-%COMP%]   .how-steps-list[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.lp-page[_ngcontent-%COMP%]   .how-step[_ngcontent-%COMP%] {
  display: flex;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: opacity 0.2s;
}
.lp-page[_ngcontent-%COMP%]   .how-step[_ngcontent-%COMP%]:last-child {
  border: none;
}
.lp-page[_ngcontent-%COMP%]   .how-step-num[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--border2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--text3);
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.2s;
}
.lp-page[_ngcontent-%COMP%]   .how-step.active[_ngcontent-%COMP%]   .how-step-num[_ngcontent-%COMP%] {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
}
.lp-page[_ngcontent-%COMP%]   .how-step-body[_ngcontent-%COMP%] {
  flex: 1;
}
.lp-page[_ngcontent-%COMP%]   .how-step-title[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  transition: color 0.2s;
}
.lp-page[_ngcontent-%COMP%]   .how-step.active[_ngcontent-%COMP%]   .how-step-title[_ngcontent-%COMP%] {
  color: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .how-step-desc[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.6;
}
.lp-page[_ngcontent-%COMP%]   .how-visual[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  justify-content: center;
}
.lp-page[_ngcontent-%COMP%]   .phone-wrap[_ngcontent-%COMP%] {
  position: relative;
}
.lp-page[_ngcontent-%COMP%]   .phone-frame[_ngcontent-%COMP%] {
  width: 220px;
  background: var(--bg3);
  border: 1px solid var(--border2);
  border-radius: 28px;
  overflow: hidden;
  padding: 10px;
}
.lp-page[_ngcontent-%COMP%]   .phone-screen[_ngcontent-%COMP%] {
  border-radius: 20px;
  overflow: hidden;
  min-height: 380px;
  position: relative;
  background: var(--bg2);
}
.lp-page[_ngcontent-%COMP%]   .ph-screen-slide[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 0.35s, transform 0.35s;
  pointer-events: none;
  overflow-y: auto;
}
.lp-page[_ngcontent-%COMP%]   .ph-screen-slide.active[_ngcontent-%COMP%] {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
  position: relative;
}
.lp-page[_ngcontent-%COMP%]   .ph-header-bar[_ngcontent-%COMP%] {
  padding: 12px 14px;
  font-size: 12px;
  font-weight: 700;
  border-bottom: 1px solid var(--border);
}
.lp-page[_ngcontent-%COMP%]   .ph-body-inner[_ngcontent-%COMP%] {
  padding: 12px 14px;
}
.lp-page[_ngcontent-%COMP%]   .ph-template-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 6px;
}
.lp-page[_ngcontent-%COMP%]   .ph-row-ic[_ngcontent-%COMP%] {
  font-size: 16px;
  flex-shrink: 0;
  color: var(--text2);
  font-variation-settings:
    "FILL" 0,
    "wght" 300,
    "GRAD" 0,
    "opsz" 24;
}
.lp-page[_ngcontent-%COMP%]   .ph-template-add[_ngcontent-%COMP%] {
  border-style: dashed;
  color: var(--brand);
  text-align: center;
}
.lp-page[_ngcontent-%COMP%]   .ph-cover-demo[_ngcontent-%COMP%] {
  height: 56px;
  background:
    linear-gradient(
      135deg,
      #0b1628,
      #1a2540);
  border-radius: 10px;
  margin-bottom: -12px;
}
.lp-page[_ngcontent-%COMP%]   .ph-avatar-demo[_ngcontent-%COMP%] {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--brand);
  border: 2px solid var(--bg3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  color: #fff;
  margin-left: 12px;
  position: relative;
  z-index: 2;
}
.lp-page[_ngcontent-%COMP%]   .ph-clinic-name[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 700;
  margin-top: 6px;
}
.lp-page[_ngcontent-%COMP%]   .ph-clinic-tag[_ngcontent-%COMP%] {
  font-size: 9px;
  color: var(--text3);
  margin-bottom: 8px;
}
.lp-page[_ngcontent-%COMP%]   .ph-wpp-btn[_ngcontent-%COMP%] {
  background: #22c55e;
  border-radius: 8px;
  padding: 8px;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 8px;
}
.lp-page[_ngcontent-%COMP%]   .ph-doc-link[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  margin-bottom: 5px;
}
.lp-page[_ngcontent-%COMP%]   .ph-form-field[_ngcontent-%COMP%] {
  margin-bottom: 10px;
}
.lp-page[_ngcontent-%COMP%]   .ph-form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
  font-size: 9px;
  font-weight: 600;
  color: var(--text3);
  display: block;
  margin-bottom: 3px;
}
.lp-page[_ngcontent-%COMP%]   .ph-input-mock[_ngcontent-%COMP%] {
  padding: 7px 10px;
  border: 1px solid var(--border);
  border-radius: 7px;
  font-size: 10px;
  background: var(--bg3);
}
.lp-page[_ngcontent-%COMP%]   .ph-sig-mock[_ngcontent-%COMP%] {
  height: 50px;
  border: 1px dashed var(--border2);
  border-radius: 8px;
  background: var(--bg3);
}
.lp-page[_ngcontent-%COMP%]   .ph-submit-btn[_ngcontent-%COMP%] {
  background: var(--brand);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  margin-top: 6px;
}
.lp-page[_ngcontent-%COMP%]   .ph-proto-status[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  color: #22c55e;
  margin-bottom: 14px;
}
.lp-page[_ngcontent-%COMP%]   .ph-proto-dot[_ngcontent-%COMP%] {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text3);
}
.lp-page[_ngcontent-%COMP%]   .ph-proto-pdf[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  margin-bottom: 14px;
}
.lp-page[_ngcontent-%COMP%]   .ph-pdf-icon[_ngcontent-%COMP%] {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--brand-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}
.lp-page[_ngcontent-%COMP%]   .ph-pdf-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 16px;
  height: 16px;
  color: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .ph-pdf-name[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 600;
}
.lp-page[_ngcontent-%COMP%]   .ph-pdf-size[_ngcontent-%COMP%] {
  font-size: 9px;
  color: var(--text3);
}
.lp-page[_ngcontent-%COMP%]   .ph-proto-timeline[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.lp-page[_ngcontent-%COMP%]   .ph-tl-item[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: var(--text2);
}
.lp-page[_ngcontent-%COMP%]   .ph-tl-dot[_ngcontent-%COMP%] {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--text3);
}
.lp-page[_ngcontent-%COMP%]   .preview-section[_ngcontent-%COMP%] {
  padding: 100px 0;
  background: var(--bg2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.lp-page[_ngcontent-%COMP%]   .preview-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px 32px;
  align-items: start;
  margin-bottom: 80px;
}
.lp-page[_ngcontent-%COMP%]   .preview-layouts-label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text3);
  margin-bottom: 12px;
}
.lp-page[_ngcontent-%COMP%]   .preview-layouts-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  align-content: start;
}
.lp-page[_ngcontent-%COMP%]   .preview-layout-card[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 16px 8px 14px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card-bg);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  text-align: center;
  font-family: var(--sans);
  margin: 0;
  color: var(--text);
  min-height: 0;
  position: relative;
}
.lp-page[_ngcontent-%COMP%]   .preview-layout-card[_ngcontent-%COMP%]:hover {
  border-color: var(--border2);
}
.lp-page[_ngcontent-%COMP%]   .preview-layout-card.active[_ngcontent-%COMP%] {
  border-color: var(--brand-bd);
  background: var(--brand-bg);
}
.lp-page[_ngcontent-%COMP%]   .plc-icon[_ngcontent-%COMP%] {
  font-size: 26px;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--text2);
  font-variation-settings:
    "FILL" 0,
    "wght" 300,
    "GRAD" 0,
    "opsz" 24;
  line-height: 1;
}
.lp-page[_ngcontent-%COMP%]   .preview-layout-card[_ngcontent-%COMP%]:hover   .plc-icon[_ngcontent-%COMP%], 
.lp-page[_ngcontent-%COMP%]   .preview-layout-card.active[_ngcontent-%COMP%]   .plc-icon[_ngcontent-%COMP%] {
  color: var(--text);
}
.lp-page[_ngcontent-%COMP%]   .plc-body[_ngcontent-%COMP%] {
  flex: 1;
  min-width: 0;
}
.lp-page[_ngcontent-%COMP%]   .plc-name[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
}
.lp-page[_ngcontent-%COMP%]   .plc-specialty[_ngcontent-%COMP%] {
  font-size: 10px;
  color: var(--text2);
  line-height: 1.2;
  margin-top: 2px;
}
.lp-page[_ngcontent-%COMP%]   .plc-check[_ngcontent-%COMP%] {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid var(--border2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  flex-shrink: 0;
  position: absolute;
  top: 8px;
  right: 8px;
}
.lp-page[_ngcontent-%COMP%]   .plc-check.visible[_ngcontent-%COMP%] {
  opacity: 1;
  border-color: var(--brand);
  background: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .plc-check[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 10px;
  height: 10px;
  color: #fff;
}
.lp-page[_ngcontent-%COMP%]   .preview-phone-col[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  position: sticky;
  top: 90px;
}
.lp-page[_ngcontent-%COMP%]   .preview-iframe-hint[_ngcontent-%COMP%] {
  font-size: 11px;
  color: var(--text3);
  text-align: center;
  max-width: 340px;
  line-height: 1.4;
  margin: 0;
}
.lp-page[_ngcontent-%COMP%]   .preview-phone[_ngcontent-%COMP%]   .phone-frame[_ngcontent-%COMP%] {
  width: 340px;
}
.lp-page[_ngcontent-%COMP%]   .preview-phone[_ngcontent-%COMP%]   .phone-screen[_ngcontent-%COMP%] {
  min-height: 0;
}
.lp-page[_ngcontent-%COMP%]   .lp-phone-iframe-screen[_ngcontent-%COMP%] {
  position: relative;
  height: 600px;
  background: var(--bg3);
  border-radius: 20px;
  overflow: hidden;
}
.lp-page[_ngcontent-%COMP%]   .lp-preview-iframe[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  opacity: 0;
  transition: opacity 0.35s ease;
}
.lp-page[_ngcontent-%COMP%]   .lp-preview-iframe.visible[_ngcontent-%COMP%] {
  opacity: 1;
}
.lp-page[_ngcontent-%COMP%]   .lp-iframe-skeleton[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(
      110deg,
      var(--bg3) 0%,
      var(--bg2) 45%,
      var(--bg3) 90%);
  background-size: 200% 100%;
  animation: _ngcontent-%COMP%_lp-shimmer 1.2s ease-in-out infinite;
  transition: opacity 0.25s ease;
}
.lp-page[_ngcontent-%COMP%]   .lp-iframe-skeleton.hidden[_ngcontent-%COMP%] {
  opacity: 0;
  pointer-events: none;
}
@keyframes _ngcontent-%COMP%_lp-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
.lp-page[_ngcontent-%COMP%]   .lp-iframe-fallback[_ngcontent-%COMP%] {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 13px;
  color: var(--text3);
  text-align: center;
}
.lp-page[_ngcontent-%COMP%]   .ph-demo-cover[_ngcontent-%COMP%] {
  height: 60px;
  border-radius: 10px;
  margin-bottom: -14px;
}
.lp-page[_ngcontent-%COMP%]   .ph-demo-avatar[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 2px solid var(--bg3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  margin-left: 12px;
  position: relative;
  z-index: 2;
}
.lp-page[_ngcontent-%COMP%]   .ph-demo-clinic-name[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 700;
  margin-top: 6px;
}
.lp-page[_ngcontent-%COMP%]   .ph-demo-specialty[_ngcontent-%COMP%] {
  font-size: 10px;
  font-weight: 600;
}
.lp-page[_ngcontent-%COMP%]   .preview-qr-wrap[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.lp-page[_ngcontent-%COMP%]   .preview-qr-img[_ngcontent-%COMP%] {
  width: 120px;
  height: 120px;
}
.lp-page[_ngcontent-%COMP%]   .preview-qr-label[_ngcontent-%COMP%] {
  font-size: 11px;
  color: var(--text3);
  text-align: center;
}
.lp-page[_ngcontent-%COMP%]   #lp-demo-form-card[_ngcontent-%COMP%], 
.lp-page[_ngcontent-%COMP%]   #lp-demo-contato-card[_ngcontent-%COMP%] {
  scroll-margin-top: 96px;
}
.lp-page[_ngcontent-%COMP%]   .demo-forms-section[_ngcontent-%COMP%] {
}
.lp-page[_ngcontent-%COMP%]   .demo-forms-header[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 20px 24px;
  margin-bottom: 28px;
}
.lp-page[_ngcontent-%COMP%]   .demo-forms-title[_ngcontent-%COMP%] {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-top: 6px;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-tabs[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  min-width: min(100%, 420px);
}
.lp-page[_ngcontent-%COMP%]   .demo-form-tab[_ngcontent-%COMP%] {
  padding: 9px 12px;
  border-radius: 10px;
  border: 1px solid var(--border2);
  background: transparent;
  color: var(--text2);
  font-size: 12px;
  font-weight: 600;
  font-family: var(--sans);
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s,
    background 0.15s;
  text-align: center;
  line-height: 1.25;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-tab[_ngcontent-%COMP%]:hover {
  border-color: var(--border3);
  color: var(--text);
}
.lp-page[_ngcontent-%COMP%]   .demo-form-tab.active[_ngcontent-%COMP%] {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%] {
  border: 1px solid var(--border2);
  border-radius: 16px;
  background: var(--card-bg);
  padding: 28px;
  max-width: min(600px, 100%);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card-header[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card-logo[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: var(--brand);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 4px;
  flex-shrink: 0;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card-title[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 600;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card-sub[_ngcontent-%COMP%] {
  font-size: 12px;
  color: var(--text2);
}
.lp-page[_ngcontent-%COMP%]   .demo-form-fields[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-field-group[_ngcontent-%COMP%] {
  margin-bottom: 1.15rem;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-field-group[_ngcontent-%COMP%]:last-of-type {
  margin-bottom: 0;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-field-label[_ngcontent-%COMP%] {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--text);
  margin-bottom: 0.375rem;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-field-hint[_ngcontent-%COMP%] {
  font-size: 0.6875rem;
  color: var(--text3);
  margin-top: 0;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-input[_ngcontent-%COMP%], 
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-select[_ngcontent-%COMP%] {
  width: 100%;
  padding: 0.75rem 0.875rem;
  border-radius: 0.75rem;
  border: 1.5px solid var(--border2);
  font-family: var(--sans);
  font-size: 0.875rem;
  color: var(--text);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background-color 0.2s;
  -webkit-appearance: none;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-input[_ngcontent-%COMP%] {
  background-color: var(--bg2);
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-input[_ngcontent-%COMP%]::placeholder {
  color: var(--text3);
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-input[_ngcontent-%COMP%]:focus, 
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-select[_ngcontent-%COMP%]:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-bg);
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-textarea[_ngcontent-%COMP%] {
  resize: vertical;
  min-height: 5.5rem;
  line-height: 1.45;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-select-wrap[_ngcontent-%COMP%] {
  position: relative;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-select[_ngcontent-%COMP%] {
  cursor: pointer;
  padding-right: 2.25rem;
  appearance: none;
  background-color: var(--bg2);
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2352525b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.875rem center;
  background-size: 12px 8px;
  text-decoration: none;
  text-decoration-line: none;
}
.lp-page[data-theme=dark][_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-select[_ngcontent-%COMP%] {
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2360a5fa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-check-row[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-check-native[_ngcontent-%COMP%] {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-check-box[_ngcontent-%COMP%] {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.375rem;
  border: 2px solid var(--border3);
  flex-shrink: 0;
  margin-top: 0.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, border-color 0.15s;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-check-svg[_ngcontent-%COMP%] {
  width: 0.75rem;
  height: 0.75rem;
  color: #fff;
  opacity: 0;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-check-native[_ngcontent-%COMP%]:checked    + .fp-check-box[_ngcontent-%COMP%] {
  background: var(--brand);
  border-color: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-check-native[_ngcontent-%COMP%]:checked    + .fp-check-box[_ngcontent-%COMP%]   .fp-check-svg[_ngcontent-%COMP%] {
  opacity: 1;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-check-native[_ngcontent-%COMP%]:focus-visible    + .fp-check-box[_ngcontent-%COMP%] {
  box-shadow: 0 0 0 3px var(--brand-bg);
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-check-label[_ngcontent-%COMP%] {
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--text);
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-sig-help[_ngcontent-%COMP%] {
  font-size: 0.75rem;
  color: var(--text2);
  margin: 0 0 0.75rem;
  line-height: 1.45;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-sig-canvas[_ngcontent-%COMP%] {
  display: block;
  width: 100%;
  max-width: 100%;
  height: 7.5rem;
  border-radius: 0.75rem;
  border: 1.5px solid var(--border2);
  background: var(--bg2);
  cursor: crosshair;
  touch-action: none;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-sig-footer[_ngcontent-%COMP%] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-link-btn[_ngcontent-%COMP%] {
  border: none;
  background: transparent;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--sans);
  color: var(--text2);
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  transition: color 0.15s, background 0.15s;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-card[_ngcontent-%COMP%]   .fp-link-btn[_ngcontent-%COMP%]:hover {
  color: #ef5350;
  background: rgba(239, 83, 80, 0.08);
}
.lp-page[_ngcontent-%COMP%]   .demo-submit-btn[_ngcontent-%COMP%] {
  width: 100%;
  justify-content: center;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-note[_ngcontent-%COMP%] {
  font-size: 11px;
  color: var(--text3);
  text-align: center;
  margin-top: 8px;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-success[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.2);
}
.lp-page[_ngcontent-%COMP%]   .demo-form-success[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 24px;
  height: 24px;
  color: #22c55e;
  flex-shrink: 0;
  margin-top: 2px;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-success-title[_ngcontent-%COMP%] {
  font-size: 14px;
  font-weight: 600;
  color: #22c55e;
  margin-bottom: 4px;
}
.lp-page[_ngcontent-%COMP%]   .demo-form-success-sub[_ngcontent-%COMP%] {
  font-size: 12px;
  color: var(--text2);
  line-height: 1.5;
}
.lp-page[_ngcontent-%COMP%]   .social-proof[_ngcontent-%COMP%] {
  padding: 100px 0;
}
.lp-page[_ngcontent-%COMP%]   .testimonials-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.lp-page[_ngcontent-%COMP%]   .testimonial-card[_ngcontent-%COMP%] {
  padding: 28px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card-bg);
}
.lp-page[_ngcontent-%COMP%]   .tc-text[_ngcontent-%COMP%] {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text2);
  margin-bottom: 20px;
  font-style: italic;
}
.lp-page[_ngcontent-%COMP%]   .tc-author[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 12px;
}
.lp-page[_ngcontent-%COMP%]   .tc-avatar[_ngcontent-%COMP%] {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
}
.lp-page[_ngcontent-%COMP%]   .tc-name[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 600;
}
.lp-page[_ngcontent-%COMP%]   .tc-role[_ngcontent-%COMP%] {
  font-size: 11px;
  color: var(--text3);
}
.lp-page[_ngcontent-%COMP%]   .numbers[_ngcontent-%COMP%] {
  padding: 80px 0;
}
.lp-page[_ngcontent-%COMP%]   .numbers-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.lp-page[_ngcontent-%COMP%]   .num-card[_ngcontent-%COMP%] {
  padding: 28px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card-bg);
  text-align: center;
}
.lp-page[_ngcontent-%COMP%]   .num-card[_ngcontent-%COMP%]:hover {
  border-color: var(--brand-bd);
}
.lp-page[_ngcontent-%COMP%]   .num-val[_ngcontent-%COMP%] {
  font-size: 48px;
  font-weight: 700;
  color: var(--brand);
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 8px;
}
.lp-page[_ngcontent-%COMP%]   .num-unit[_ngcontent-%COMP%] {
  font-size: 24px;
  font-weight: 500;
}
.lp-page[_ngcontent-%COMP%]   .num-label[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
}
.lp-page[_ngcontent-%COMP%]   .num-desc[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.6;
}
.lp-page[_ngcontent-%COMP%]   .pricing[_ngcontent-%COMP%] {
  padding: 100px 0;
  background: var(--bg2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.lp-page[_ngcontent-%COMP%]   .pricing-grid[_ngcontent-%COMP%] {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  align-items: stretch;
}
.lp-page[_ngcontent-%COMP%]   .price-card[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  flex: 1 1 300px;
  max-width: 380px;
  min-height: 100%;
  padding: 28px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card-bg);
}
.lp-page[_ngcontent-%COMP%]   .price-card.featured[_ngcontent-%COMP%] {
  flex: 1 1 320px;
  max-width: 400px;
  border-color: var(--brand-bd);
  position: relative;
  overflow: hidden;
}
.lp-page[_ngcontent-%COMP%]   .price-card.featured[_ngcontent-%COMP%]::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .price-top-badge[_ngcontent-%COMP%] {
  display: inline-flex;
  background: var(--brand);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.04em;
  margin-bottom: 14px;
  text-transform: uppercase;
}
.lp-page[_ngcontent-%COMP%]   .price-plan[_ngcontent-%COMP%] {
  font-size: 12px;
  font-weight: 700;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}
.lp-page[_ngcontent-%COMP%]   .price-amt[_ngcontent-%COMP%] {
  font-size: 38px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 3px;
}
.lp-page[_ngcontent-%COMP%]   .price-amt[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
  font-size: 15px;
  font-weight: 400;
  color: var(--text2);
}
.lp-page[_ngcontent-%COMP%]   .price-period[_ngcontent-%COMP%] {
  font-size: 12px;
  color: var(--text3);
  margin-bottom: 18px;
}
.lp-page[_ngcontent-%COMP%]   .price-desc[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.6;
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}
.lp-page[_ngcontent-%COMP%]   .price-feats[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 9px;
  flex: 1 1 auto;
  margin-bottom: 22px;
  min-height: 0;
}
.lp-page[_ngcontent-%COMP%]   .pf[_ngcontent-%COMP%] {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
}
.lp-page[_ngcontent-%COMP%]   .pf[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 15px;
  height: 15px;
  color: var(--brand);
  flex-shrink: 0;
  margin-top: 2px;
}
.lp-page[_ngcontent-%COMP%]   .pf.off[_ngcontent-%COMP%] {
  color: var(--text3);
}
.lp-page[_ngcontent-%COMP%]   .pf.off[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  color: var(--text3);
}
.lp-page[_ngcontent-%COMP%]   .p-btn[_ngcontent-%COMP%] {
  width: 100%;
  padding: 12px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--sans);
  cursor: pointer;
  border: none;
  transition: all 0.15s;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.lp-page[_ngcontent-%COMP%]   .p-btn-green[_ngcontent-%COMP%] {
  background: var(--brand);
  color: #fff;
}
.lp-page[_ngcontent-%COMP%]   .p-btn-green[_ngcontent-%COMP%]:hover {
  background: var(--brand-dark);
}
.lp-page[_ngcontent-%COMP%]   .p-btn-outline[_ngcontent-%COMP%] {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border2);
}
.lp-page[_ngcontent-%COMP%]   .p-btn-outline[_ngcontent-%COMP%]:hover {
  border-color: var(--border3);
}
.lp-page[_ngcontent-%COMP%]   .faq[_ngcontent-%COMP%] {
  padding: 100px 0;
}
.lp-page[_ngcontent-%COMP%]   .faq-wrap[_ngcontent-%COMP%] {
  max-width: 660px;
  margin: 0 auto;
}
.lp-page[_ngcontent-%COMP%]   .faq-list[_ngcontent-%COMP%] {
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}
.lp-page[_ngcontent-%COMP%]   .faq-item[_ngcontent-%COMP%] {
  border-bottom: 1px solid var(--border);
}
.lp-page[_ngcontent-%COMP%]   .faq-item[_ngcontent-%COMP%]:last-child {
  border: none;
}
.lp-page[_ngcontent-%COMP%]   .faq-q[_ngcontent-%COMP%] {
  width: 100%;
  padding: 18px 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  font-family: var(--sans);
  text-align: left;
  transition: background 0.15s;
}
.lp-page[_ngcontent-%COMP%]   .faq-q[_ngcontent-%COMP%]:hover {
  background: var(--bg2);
}
.lp-page[_ngcontent-%COMP%]   .faq-q[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  width: 15px;
  height: 15px;
  color: var(--text3);
  flex-shrink: 0;
  transition: transform 0.2s, color 0.2s;
}
.lp-page[_ngcontent-%COMP%]   .faq-q.open[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {
  transform: rotate(45deg);
  color: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .faq-a[_ngcontent-%COMP%] {
  padding: 0 20px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}
.lp-page[_ngcontent-%COMP%]   .faq-a.open[_ngcontent-%COMP%] {
  max-height: 320px;
  padding: 0 20px 18px;
}
.lp-page[_ngcontent-%COMP%]   .faq-a[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.7;
}
.lp-page[_ngcontent-%COMP%]   .lp-demo[_ngcontent-%COMP%] {
  padding: 80px 0;
  border-top: 1px solid var(--border);
}
.lp-page[_ngcontent-%COMP%]   .lp-demo-grid[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}
.lp-page[_ngcontent-%COMP%]   .lp-demo-card[_ngcontent-%COMP%] {
  border-radius: 16px;
  border: 1px solid var(--border2);
  background: var(--card-bg);
  padding: 28px;
}
.lp-page[_ngcontent-%COMP%]   .lp-demo-label[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brand);
  margin-bottom: 10px;
}
.lp-page[_ngcontent-%COMP%]   .lp-demo[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}
.lp-page[_ngcontent-%COMP%]   .lp-demo[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
  font-size: 14px;
  color: var(--text2);
  line-height: 1.65;
}
.lp-page[_ngcontent-%COMP%]   .demo-card-title[_ngcontent-%COMP%] {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}
.lp-page[_ngcontent-%COMP%]   .demo-card-sub[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--text2);
  margin-bottom: 16px;
}
.lp-page[_ngcontent-%COMP%]   .demo-feedback[_ngcontent-%COMP%] {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 13px;
  margin-bottom: 16px;
}
.lp-page[_ngcontent-%COMP%]   .demo-feedback.success[_ngcontent-%COMP%] {
  background: var(--brand-bg);
  border: 1px solid var(--brand-bd);
  color: var(--brand);
}
.lp-page[_ngcontent-%COMP%]   .demo-feedback.error[_ngcontent-%COMP%] {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #b91c1c;
}
.lp-page[_ngcontent-%COMP%]   .demo-field[_ngcontent-%COMP%] {
  margin-bottom: 12px;
}
.lp-page[_ngcontent-%COMP%]   .demo-row[_ngcontent-%COMP%] {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.lp-page[_ngcontent-%COMP%]   .lp-form-label[_ngcontent-%COMP%] {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--text2);
  margin-bottom: 4px;
}
.lp-page[_ngcontent-%COMP%]   .lp-form-input[_ngcontent-%COMP%] {
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--border2);
  background: var(--bg2);
  color: var(--text);
  font-size: 14px;
  font-family: var(--sans);
  outline: none;
}
.lp-page[_ngcontent-%COMP%]   .lp-form-input[_ngcontent-%COMP%]:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-bg);
}
.lp-page[_ngcontent-%COMP%]   .lp-wa[_ngcontent-%COMP%] {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px 20px;
  border-radius: 10px;
  background: #25d366;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}
.lp-page[_ngcontent-%COMP%]   .lp-wa[_ngcontent-%COMP%]:hover {
  background: #20bd5a;
}
.lp-page[_ngcontent-%COMP%]   footer[_ngcontent-%COMP%] {
  border-top: 1px solid var(--border);
  padding: 48px 24px 0;
  background: var(--bg);
  transition: background 0.3s;
}
.lp-page[_ngcontent-%COMP%]   .footer-inner[_ngcontent-%COMP%] {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 32px;
  padding-bottom: 32px;
}
.lp-page[_ngcontent-%COMP%]   .footer-col[_ngcontent-%COMP%] {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.lp-page[_ngcontent-%COMP%]   .footer-col-title[_ngcontent-%COMP%] {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text3);
  margin-bottom: 4px;
}
.lp-page[_ngcontent-%COMP%]   .footer-col[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--text2);
  transition: color 0.15s;
}
.lp-page[_ngcontent-%COMP%]   .footer-col[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
  color: var(--text);
}
.lp-page[_ngcontent-%COMP%]   .footer-logo[_ngcontent-%COMP%] {
  display: flex;
  align-items: center;
  gap: 8px;
}
.lp-page[_ngcontent-%COMP%]   .fl-icon[_ngcontent-%COMP%] {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: var(--brand);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 4px;
}
.lp-page[data-theme=light][_ngcontent-%COMP%]   .fl-icon[_ngcontent-%COMP%] {
  border-color: rgba(30, 64, 175, 0.35);
}
.lp-page[_ngcontent-%COMP%]   .fl-icon[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.lp-page[_ngcontent-%COMP%]   .fl-name[_ngcontent-%COMP%] {
  font-size: 13px;
  font-weight: 600;
}
.lp-page[_ngcontent-%COMP%]   .footer-tagline[_ngcontent-%COMP%] {
  font-size: 13px;
  color: var(--text3);
  line-height: 1.5;
  max-width: 240px;
}
.lp-page[_ngcontent-%COMP%]   .footer-bottom[_ngcontent-%COMP%] {
  border-top: 1px solid var(--border);
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px 0;
}
.lp-page[_ngcontent-%COMP%]   .footer-copy[_ngcontent-%COMP%] {
  font-size: 12px;
  color: var(--text3);
}
@keyframes _ngcontent-%COMP%_lp-fade-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.lp-page[_ngcontent-%COMP%]   .anim[_ngcontent-%COMP%] {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .lp-page[_ngcontent-%COMP%]   .anim[_ngcontent-%COMP%] {
    opacity: 1;
    transform: none;
  }
  .lp-page[_ngcontent-%COMP%]   .anim.visible[_ngcontent-%COMP%] {
    animation: none;
  }
}
.lp-page[_ngcontent-%COMP%]   .anim.visible[_ngcontent-%COMP%] {
  animation: _ngcontent-%COMP%_lp-fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.lp-page[_ngcontent-%COMP%]   .anim-d1[_ngcontent-%COMP%] {
  animation-delay: 0.05s;
}
.lp-page[_ngcontent-%COMP%]   .anim-d2[_ngcontent-%COMP%] {
  animation-delay: 0.1s;
}
.lp-page[_ngcontent-%COMP%]   .anim-d3[_ngcontent-%COMP%] {
  animation-delay: 0.15s;
}
.lp-page[_ngcontent-%COMP%]   .lp-sticky-cta[_ngcontent-%COMP%] {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  background: var(--nav-bg);
  border-top: 1px solid var(--border);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
.lp-page[_ngcontent-%COMP%]   .lp-sticky-cta[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
  width: 100%;
  justify-content: center;
}
.lp-page[_ngcontent-%COMP%]   .lp-plans-loading[_ngcontent-%COMP%] {
  text-align: center;
  padding: 48px 24px;
  color: var(--text3);
  font-size: 14px;
}
.lp-page[_ngcontent-%COMP%]   .lp-plans-empty[_ngcontent-%COMP%] {
  text-align: center;
  padding: 48px 24px;
  border: 1px dashed var(--border2);
  border-radius: 14px;
  color: var(--text2);
  font-size: 14px;
}
@media (max-width: 900px) {
  .lp-page[_ngcontent-%COMP%]   .hero-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .lp-page[_ngcontent-%COMP%]   .hero[_ngcontent-%COMP%] {
    text-align: center;
  }
  .lp-page[_ngcontent-%COMP%]   .hero-text[_ngcontent-%COMP%] {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .lp-page[_ngcontent-%COMP%]   .hero-sub[_ngcontent-%COMP%] {
    max-width: 520px;
    margin: 0 auto 32px;
  }
  .lp-page[_ngcontent-%COMP%]   .hero-capture[_ngcontent-%COMP%] {
    justify-content: center;
  }
  .lp-page[_ngcontent-%COMP%]   .hero-browser[_ngcontent-%COMP%] {
    transform: none;
    max-width: 480px;
    margin: 0 auto;
  }
  .lp-page[_ngcontent-%COMP%]   .feat-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr 1fr;
  }
  .lp-page[_ngcontent-%COMP%]   .how-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .lp-page[_ngcontent-%COMP%]   .preview-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .lp-page[_ngcontent-%COMP%]   .preview-layouts-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(3, 1fr);
    max-width: 520px;
    margin: 0 auto;
  }
  .lp-page[_ngcontent-%COMP%]   .preview-phone-col[_ngcontent-%COMP%] {
    position: static;
  }
  .lp-page[_ngcontent-%COMP%]   .preview-phone[_ngcontent-%COMP%]   .phone-frame[_ngcontent-%COMP%] {
    width: min(380px, calc(100vw - 48px));
  }
  .lp-page[_ngcontent-%COMP%]   .testimonials-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .lp-page[_ngcontent-%COMP%]   .numbers-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr 1fr;
  }
  .lp-page[_ngcontent-%COMP%]   .pricing-grid[_ngcontent-%COMP%] {
    flex-direction: column;
    align-items: stretch;
  }
  .lp-page[_ngcontent-%COMP%]   .price-card[_ngcontent-%COMP%], 
   .lp-page[_ngcontent-%COMP%]   .price-card.featured[_ngcontent-%COMP%] {
    max-width: none;
    flex: none;
  }
  .lp-page[_ngcontent-%COMP%]   .nav-links[_ngcontent-%COMP%] {
    display: none;
  }
  .lp-page[_ngcontent-%COMP%]   .lp-menu-btn[_ngcontent-%COMP%] {
    display: flex;
  }
  .lp-page[_ngcontent-%COMP%]   .nav-right[_ngcontent-%COMP%]   .nav-login[_ngcontent-%COMP%], 
   .lp-page[_ngcontent-%COMP%]   .nav-right[_ngcontent-%COMP%]   .nav-cta[_ngcontent-%COMP%] {
    display: none;
  }
  .lp-page[_ngcontent-%COMP%]   .lp-demo-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .lp-page[_ngcontent-%COMP%]   .footer-inner[_ngcontent-%COMP%] {
    grid-template-columns: 1fr 1fr;
  }
  .lp-page[_ngcontent-%COMP%]   .demo-forms-header[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
  .lp-page[_ngcontent-%COMP%]   .demo-form-tabs[_ngcontent-%COMP%] {
    min-width: 0;
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .lp-page[_ngcontent-%COMP%]   .feat-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .lp-page[_ngcontent-%COMP%]   .numbers-grid[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .lp-page[_ngcontent-%COMP%]   .demo-row[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .lp-page[_ngcontent-%COMP%]   .footer-inner[_ngcontent-%COMP%] {
    grid-template-columns: 1fr;
  }
  .lp-page[_ngcontent-%COMP%]   .lp-sticky-cta[_ngcontent-%COMP%] {
    display: block;
  }
  .lp-page[_ngcontent-%COMP%] {
    padding-bottom: 72px;
  }
  .lp-page[_ngcontent-%COMP%]   .preview-layouts-grid[_ngcontent-%COMP%] {
    grid-template-columns: repeat(2, 1fr);
  }
}
/*# sourceMappingURL=inicio.component.css.map */`] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InicioComponent, [{
    type: Component,
    args: [{ selector: "app-pagina-inicio", standalone: true, imports: [CommonModule, RouterLink, FormsModule, NgxMaskDirective], template: `<div class="lp-page" [attr.data-theme]="lpTheme">\r
  <div class="grid-bg"></div>\r
\r
  <!-- STATUS BAR -->\r
  <div class="status-bar" style="margin-top: 58px">\r
    <a [href]="statusPageUrl" target="_blank" rel="noopener noreferrer" class="status-inner status-bar-link">\r
      <span class="status-dot" [ngClass]="'op-' + serviceStatusKey"></span>\r
      <span>{{ serviceStatusLabel }}</span>\r
      @if (serviceStatusKey !== 'operational' && serviceStatusMessage) {\r
        <span class="status-msg-sep">\xB7</span>\r
        <span class="status-msg">{{ serviceStatusMessage | slice: 0 : 80 }}{{ serviceStatusMessage.length > 80 ? '\u2026' : '' }}</span>\r
      }\r
      @if (serviceStatusKey === 'operational') {\r
        <span class="status-msg-sep">\xB7</span>\r
        <span class="status-link">Ver status</span>\r
      }\r
    </a>\r
  </div>\r
\r
  <!-- NAV -->\r
  <nav>\r
    <div class="nav-inner">\r
      <div class="nav-left">\r
        <a routerLink="/" class="nav-logo">\r
          <div class="logo-mark"><img src="assets/logo/logo.png" alt="Gestgo" width="26" height="26" /></div>\r
          <span class="logo-name">Gestgo</span>\r
        </a>\r
        <div class="nav-links">\r
          <a href="#funcionalidades">Funcionalidades</a>\r
          <a href="#demonstracao">Demonstra\xE7\xE3o</a>\r
          <a href="#planos">Planos</a>\r
          <a href="#duvidas">D\xFAvidas</a>\r
        </div>\r
      </div>\r
      <div class="nav-right">\r
        <button type="button" class="lp-menu-btn" (click)="toggleMenu()" aria-label="Abrir menu">\r
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>\r
        </button>\r
        <button type="button" class="theme-toggle" (click)="toggleLpTheme()" aria-label="Alternar tema">\r
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>\r
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>\r
        </button>\r
        <a routerLink="/autenticacao" class="nav-login">Entrar</a>\r
        <button type="button" class="nav-cta" (click)="focusCaptureEmail()">Come\xE7ar gr\xE1tis</button>\r
      </div>\r
    </div>\r
    <div class="lp-mobile-nav" [class.open]="menuAberto">\r
      <a href="#funcionalidades" (click)="toggleMenu()">Funcionalidades</a>\r
      <a href="#demonstracao" (click)="toggleMenu()">Demonstra\xE7\xE3o</a>\r
      <a href="#planos" (click)="toggleMenu()">Planos</a>\r
      <a href="#duvidas" (click)="toggleMenu()">D\xFAvidas</a>\r
      <a routerLink="/autenticacao" (click)="toggleMenu()">Entrar</a>\r
      <button type="button" class="nav-cta" style="width: 100%" (click)="focusCaptureEmail(); toggleMenu()">Come\xE7ar gr\xE1tis</button>\r
    </div>\r
  </nav>\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 HERO \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  <section class="hero">\r
    <div class="hero-grid">\r
      <div class="hero-text">\r
        <div class="hero-eyebrow anim">\r
          <div class="hero-eyebrow-dot"></div>\r
          Lan\xE7amento \xB7 <span>Seja um early adopter</span>\r
        </div>\r
        <h1 class="anim anim-d1">\r
          Fichas digitais que chegam<br /><em>antes do atendimento</em>\r
        </h1>\r
        <p class="hero-sub anim anim-d2">\r
          Voc\xEA publica um <strong>link na bio</strong>. O cliente preenche a ficha pelo celular. Voc\xEA atende com tudo pronto \u2014 sem papel, sem retrabalho.\r
        </p>\r
        <div class="hero-capture anim anim-d3">\r
          <input id="capture-email" class="capture-input" type="email" [(ngModel)]="heroEmail" name="hero_email" placeholder="seu@email.com.br" autocomplete="email" />\r
          <button type="button" class="capture-btn" (click)="irComece()">\r
            Criar conta gr\xE1tis\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="13 17 18 12 13 7"/></svg>\r
          </button>\r
        </div>\r
        <p class="hero-note anim anim-d3">Sem cart\xE3o \xB7 {{ landingTrialDias }} dias gr\xE1tis \xB7 Cancele quando quiser</p>\r
        <div class="hero-social anim">\r
          <div class="hs-item">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>\r
            86+ templates prontos\r
          </div>\r
          <div class="hs-sep"></div>\r
          <div class="hs-item">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>\r
            Assinatura digital\r
          </div>\r
          <div class="hs-sep"></div>\r
          <div class="hs-item">\r
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>\r
            LGPD nativo\r
          </div>\r
        </div>\r
      </div>\r
      <div class="hero-visual anim">\r
        <div class="hero-browser">\r
          <div class="browser-bar">\r
            <div class="b-dots">\r
              <div class="b-dot" style="background: #ff5f57"></div>\r
              <div class="b-dot" style="background: #ffbd2e"></div>\r
              <div class="b-dot" style="background: #28ca41"></div>\r
            </div>\r
            <div class="b-url">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>\r
              app.gestgo.com.br\r
            </div>\r
          </div>\r
          <div class="browser-slides">\r
            <div class="browser-slide" [class.active]="heroSlide === 0">\r
              <div class="b-slide-header">\r
                <div class="b-slide-title">Painel</div>\r
                <div class="b-slide-sub">Cl\xEDnica S\xE3o Paulo</div>\r
              </div>\r
              <div class="b-kpi-row">\r
                <div class="b-kpi"><div class="b-kpi-val">3</div><div class="b-kpi-label">Pendentes</div></div>\r
                <div class="b-kpi"><div class="b-kpi-val">86</div><div class="b-kpi-label">Templates</div></div>\r
                <div class="b-kpi"><div class="b-kpi-val" style="color: var(--brand)">24</div><div class="b-kpi-label">Respostas</div></div>\r
              </div>\r
              <div class="b-list">\r
                <div class="b-list-row"><div class="b-list-dot"></div><span>Pesquisa de Satisfa\xE7\xE3o</span><span class="b-badge">Ativo</span></div>\r
                <div class="b-list-row"><div class="b-list-dot"></div><span>Anamnese B\xE1sica</span><span class="b-badge">Ativo</span></div>\r
                <div class="b-list-row"><div class="b-list-dot"></div><span>Termo de Consentimento</span><span class="b-badge">Ativo</span></div>\r
              </div>\r
            </div>\r
            <div class="browser-slide" [class.active]="heroSlide === 1">\r
              <div class="b-slide-header">\r
                <div class="b-slide-title">Templates</div>\r
                <div class="b-slide-sub">11 especialidades \xB7 86 modelos</div>\r
              </div>\r
              <div class="b-template-grid">\r
                <div class="b-template-card"><div class="b-tc-icon"><span class="material-symbols-outlined">medical_services</span></div><div class="b-tc-name">Anamnese Geral</div><div class="b-tc-cat">Cl\xEDnica Geral</div></div>\r
                <div class="b-template-card"><div class="b-tc-icon"><span class="material-symbols-outlined">spa</span></div><div class="b-tc-name">Ficha Est\xE9tica</div><div class="b-tc-cat">Harmoniza\xE7\xE3o</div></div>\r
                <div class="b-template-card"><div class="b-tc-icon"><span class="material-symbols-outlined">dentistry</span></div><div class="b-tc-name">Anamnese Odonto</div><div class="b-tc-cat">Odontologia</div></div>\r
                <div class="b-template-card"><div class="b-tc-icon"><span class="material-symbols-outlined">psychology</span></div><div class="b-tc-name">Contrato Terap\xEAutico</div><div class="b-tc-cat">Psicologia</div></div>\r
              </div>\r
            </div>\r
            <div class="browser-slide" [class.active]="heroSlide === 2">\r
              <div class="b-slide-header">\r
                <div class="b-slide-title">Protocolo #247</div>\r
                <div class="b-slide-sub">Ficha preenchida \xB7 PDF gerado</div>\r
              </div>\r
              <div class="b-pdf-preview">\r
                <div class="b-pdf-line w80"></div>\r
                <div class="b-pdf-line w60"></div>\r
                <div class="b-pdf-spacer"></div>\r
                <div class="b-pdf-field"><div class="b-pdf-field-label">Nome completo</div><div class="b-pdf-field-val">Maria Fernanda Silva</div></div>\r
                <div class="b-pdf-field"><div class="b-pdf-field-label">Data de nascimento</div><div class="b-pdf-field-val">12/05/1988</div></div>\r
                <div class="b-pdf-field"><div class="b-pdf-field-label">Alergias</div><div class="b-pdf-field-val">Nenhuma conhecida</div></div>\r
                <div class="b-pdf-spacer"></div>\r
                <div class="b-pdf-sig">\r
                  <div class="b-pdf-sig-label">Assinatura digital</div>\r
                  <div class="b-pdf-sig-line"></div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
          <div class="browser-dots">\r
            <button type="button" class="bd" [class.active]="heroSlide === 0" (click)="heroSlide = 0" aria-label="Slide 1"></button>\r
            <button type="button" class="bd" [class.active]="heroSlide === 1" (click)="heroSlide = 1" aria-label="Slide 2"></button>\r
            <button type="button" class="bd" [class.active]="heroSlide === 2" (click)="heroSlide = 2" aria-label="Slide 3"></button>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </section>\r
\r
  <!-- LOGOS MARQUEE -->\r
  <div class="logos">\r
    <div class="logos-label">Especialidades atendidas</div>\r
    <div style="overflow: hidden">\r
      <div class="logos-track">\r
        @for (row of lpLogoMarquee; track row.k) {\r
          <span class="logo-chip">{{ row.t }}</span>\r
        }\r
      </div>\r
    </div>\r
  </div>\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 FEATURES \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  <section class="features" id="funcionalidades">\r
    <div class="container">\r
      <div class="section-header anim">\r
        <span class="eyebrow">Funcionalidades</span>\r
        <h2 class="section-title">Tudo que seu neg\xF3cio precisa<br /><em>no digital</em></h2>\r
        <p class="section-sub">Do link na bio ao PDF assinado \u2014 sem papel, sem retrabalho.</p>\r
      </div>\r
      <div class="feat-grid anim">\r
        <div class="feat-card">\r
          <div class="feat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></div>\r
          <div class="feat-title">Link na bio profissional</div>\r
          <div class="feat-desc">P\xE1gina p\xFAblica com identidade visual, hor\xE1rios, WhatsApp e fichas \u2014 tudo em um link.</div>\r
        </div>\r
        <div class="feat-card">\r
          <div class="feat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>\r
          <div class="feat-title">86+ templates prontos</div>\r
          <div class="feat-desc">Fichas de anamnese, termos e acompanhamentos para 11 especialidades.</div>\r
        </div>\r
        <div class="feat-card">\r
          <div class="feat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>\r
          <div class="feat-title">Assinatura digital</div>\r
          <div class="feat-desc">Assinatura com o dedo no celular. Validade jur\xEDdica, LGPD e normas do conselho de classe.</div>\r
        </div>\r
        <div class="feat-card">\r
          <div class="feat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></div>\r
          <div class="feat-title">PDF autom\xE1tico</div>\r
          <div class="feat-desc">Cada ficha preenchida gera um PDF formatado. Zero digita\xE7\xE3o manual.</div>\r
        </div>\r
        <div class="feat-card">\r
          <div class="feat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>\r
          <div class="feat-title">Templates personaliz\xE1veis</div>\r
          <div class="feat-desc">Adicione campos, reordene perguntas e salve como modelo reutiliz\xE1vel.</div>\r
        </div>\r
        <div class="feat-card">\r
          <div class="feat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>\r
          <div class="feat-title">API & Webhooks</div>\r
          <div class="feat-desc">Integre com prontu\xE1rio ou CRM via API documentada e webhooks.</div>\r
        </div>\r
      </div>\r
    </div>\r
  </section>\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 COMO FUNCIONA \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  <section class="how">\r
    <div class="container">\r
      <div class="section-header anim">\r
        <span class="eyebrow">Como funciona</span>\r
        <h2 class="section-title">4 passos. <em>Zero papel.</em></h2>\r
      </div>\r
      <div class="how-grid anim">\r
        <div class="how-steps-list">\r
          @for (step of howSteps; track $index) {\r
            <div class="how-step" [class.active]="howStep === $index" (click)="setHowStep($index)">\r
              <div class="how-step-num">{{ $index + 1 }}</div>\r
              <div class="how-step-body">\r
                <div class="how-step-title">{{ step.title }}</div>\r
                <div class="how-step-desc">{{ step.desc }}</div>\r
              </div>\r
            </div>\r
          }\r
        </div>\r
        <div class="how-visual">\r
          <div class="phone-wrap">\r
            <div class="phone-frame">\r
              <div class="phone-screen">\r
                <div class="ph-screen-slide" [class.active]="howStep === 0">\r
                  <div class="ph-header-bar">Gestgo</div>\r
                  <div class="ph-body-inner">\r
                    <div class="ph-template-item"><span class="material-symbols-outlined ph-row-ic" aria-hidden="true">medical_services</span> Anamnese Geral</div>\r
                    <div class="ph-template-item"><span class="material-symbols-outlined ph-row-ic" aria-hidden="true">spa</span> Ficha Est\xE9tica</div>\r
                    <div class="ph-template-item"><span class="material-symbols-outlined ph-row-ic" aria-hidden="true">dentistry</span> Odonto completa</div>\r
                    <div class="ph-template-item ph-template-add">+ Criar template</div>\r
                  </div>\r
                </div>\r
                <div class="ph-screen-slide" [class.active]="howStep === 1">\r
                  <div class="ph-cover-demo"></div>\r
                  <div class="ph-avatar-demo">CL</div>\r
                  <div class="ph-body-inner" style="padding-top: 8px">\r
                    <div class="ph-clinic-name">Seu neg\xF3cio</div>\r
                    <div class="ph-clinic-tag">Dermatologia \xB7 Est\xE9tica</div>\r
                    <div class="ph-wpp-btn">Falar pelo WhatsApp</div>\r
                    <div class="ph-doc-link"><span class="material-symbols-outlined ph-row-ic" aria-hidden="true">article</span> Ficha do procedimento</div>\r
                    <div class="ph-doc-link"><span class="material-symbols-outlined ph-row-ic" aria-hidden="true">edit_document</span> Termo de consentimento</div>\r
                  </div>\r
                </div>\r
                <div class="ph-screen-slide" [class.active]="howStep === 2">\r
                  <div class="ph-header-bar">Ficha do Procedimento</div>\r
                  <div class="ph-body-inner">\r
                    <div class="ph-form-field"><label>Nome completo</label><div class="ph-input-mock">Maria Fernanda</div></div>\r
                    <div class="ph-form-field"><label>Alergias</label><div class="ph-input-mock">Nenhuma</div></div>\r
                    <div class="ph-form-field"><label>Assinatura</label><div class="ph-sig-mock"></div></div>\r
                    <div class="ph-submit-btn">Enviar</div>\r
                  </div>\r
                </div>\r
                <div class="ph-screen-slide" [class.active]="howStep === 3">\r
                  <div class="ph-header-bar">Protocolo #247</div>\r
                  <div class="ph-body-inner">\r
                    <div class="ph-proto-status">\r
                      <div class="ph-proto-dot"></div>\r
                      PDF gerado com sucesso\r
                    </div>\r
                    <div class="ph-proto-pdf">\r
                      <div class="ph-pdf-icon">\r
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>\r
                      </div>\r
                      <div>\r
                        <div class="ph-pdf-name">ficha_procedimento.pdf</div>\r
                        <div class="ph-pdf-size">42 KB \xB7 Assinado digitalmente</div>\r
                      </div>\r
                    </div>\r
                    <div class="ph-proto-timeline">\r
                      <div class="ph-tl-item"><div class="ph-tl-dot"></div>PDF gerado</div>\r
                      <div class="ph-tl-item"><div class="ph-tl-dot"></div>Assinado digitalmente</div>\r
                      <div class="ph-tl-item"><div class="ph-tl-dot"></div>Formul\xE1rio preenchido</div>\r
                    </div>\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </section>\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 EXPERIMENTE AO VIVO \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  <section class="preview-section" id="demonstracao">\r
    <div class="container">\r
      <div class="section-header anim">\r
        <span class="eyebrow">Experimente ao vivo</span>\r
        <h2 class="section-title">Veja como sua p\xE1gina<br /><em>aparece para quem acessa</em></h2>\r
        <p class="section-sub">Escolha um layout, escaneie o QR code no celular e veja a p\xE1gina funcionando.</p>\r
      </div>\r
\r
      <div class="preview-grid anim">\r
        <div class="preview-layouts">\r
          <div class="preview-layouts-label">Escolha o layout</div>\r
          <div class="preview-layouts-grid" role="list">\r
            @for (layout of demoLayouts; track layout.model) {\r
              <button type="button" class="preview-layout-card" role="listitem" [class.active]="selectedLayout === $index" (click)="selectLayout($index)">\r
                <span class="material-symbols-outlined plc-icon" aria-hidden="true">{{ layout.materialIcon }}</span>\r
                <div class="plc-body">\r
                  <div class="plc-name">{{ layout.name }}</div>\r
                  <div class="plc-specialty">{{ layout.specialty }}</div>\r
                </div>\r
                <div class="plc-check" [class.visible]="selectedLayout === $index">\r
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>\r
                </div>\r
              </button>\r
            }\r
          </div>\r
        </div>\r
\r
        <div class="preview-phone-col">\r
          <p class="preview-iframe-hint">Pr\xE9via ao vivo \u2014 a mesma p\xE1gina que o cliente v\xEA no celular</p>\r
          <div class="phone-wrap preview-phone">\r
            <div class="phone-frame">\r
              <div class="phone-screen lp-phone-iframe-screen">\r
                @if (previewIframeUrl) {\r
                  <div class="lp-iframe-skeleton" [class.hidden]="!previewIframeLoading" aria-hidden="true"></div>\r
                  <iframe\r
                    class="lp-preview-iframe"\r
                    [class.visible]="!previewIframeLoading"\r
                    [src]="previewIframeUrl"\r
                    title="Pr\xE9via da p\xE1gina p\xFAblica no modelo selecionado"\r
                    referrerpolicy="strict-origin-when-cross-origin"\r
                    (load)="onPreviewIframeLoad()"\r
                  ></iframe>\r
                } @else {\r
                  <div class="lp-iframe-fallback">Pr\xE9via dispon\xEDvel no navegador</div>\r
                }\r
              </div>\r
            </div>\r
          </div>\r
          <div class="preview-qr-wrap">\r
            @if (qrCodeDataUrl) {\r
              <img [src]="qrCodeDataUrl" alt="QR Code para preview no celular" class="preview-qr-img" />\r
            }\r
            <div class="preview-qr-label">Escaneie para ver no celular</div>\r
          </div>\r
        </div>\r
      </div><!-- /preview-grid -->\r
\r
      <!-- FORMS DEMO -->\r
      <div class="demo-forms-section anim">\r
        <div class="demo-forms-header">\r
          <div>\r
            <div class="eyebrow" style="text-align: left">Formul\xE1rios</div>\r
            <h3 class="demo-forms-title">Veja como o cliente preenche</h3>\r
          </div>\r
          <div class="demo-form-tabs">\r
            @for (form of demoForms; track form.key) {\r
              <button type="button" class="demo-form-tab" [class.active]="selectedFormIdx === $index" (click)="selectForm($index)">{{ form.title }}</button>\r
            }\r
          </div>\r
        </div>\r
\r
        <div class="demo-form-card" id="lp-demo-form-card">\r
          <div class="demo-form-card-header">\r
            <div class="demo-form-card-logo">\r
              <img src="assets/logo/logo.png" alt="" width="20" height="20" />\r
            </div>\r
            <div>\r
              <div class="demo-form-card-title">{{ selectedDemoForm.title }}</div>\r
              <div class="demo-form-card-sub">{{ selectedDemoForm.description }}</div>\r
            </div>\r
          </div>\r
\r
          @if (demoFormSubmitted) {\r
            <div class="demo-form-success">\r
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>\r
              <div>\r
                <div class="demo-form-success-title">Formul\xE1rio enviado com sucesso</div>\r
                <div class="demo-form-success-sub">Este \xE9 apenas um exemplo. Em produ\xE7\xE3o, os dados seriam salvos e o PDF gerado automaticamente.</div>\r
              </div>\r
            </div>\r
          } @else {\r
            <div class="demo-form-fields">\r
              @for (field of selectedDemoForm.fields; track field.label; let idx = $index) {\r
                <div class="fp-field-group">\r
                  @if (field.type !== 'checkbox') {\r
                    <label class="fp-field-label" [attr.for]="'lpDemoField_' + selectedFormIdx + '_' + idx">{{ field.label }}</label>\r
                  }\r
                  @switch (field.type) {\r
                    @case ('textarea') {\r
                      <textarea\r
                        [id]="'lpDemoField_' + selectedFormIdx + '_' + idx"\r
                        class="fp-input fp-textarea"\r
                        [placeholder]="field.placeholder ?? ''"\r
                        [(ngModel)]="demoFormValues[field.label]"\r
                        [name]="'demo_' + field.label"\r
                        rows="4"\r
                      ></textarea>\r
                    }\r
                    @case ('select') {\r
                      <div class="fp-select-wrap">\r
                        <select\r
                          [id]="'lpDemoField_' + selectedFormIdx + '_' + idx"\r
                          class="fp-input fp-select"\r
                          [(ngModel)]="demoFormValues[field.label]"\r
                          [name]="'demo_' + field.label"\r
                          spellcheck="false"\r
                          autocomplete="off"\r
                        >\r
                          <option value="">Selecione</option>\r
                          @for (opt of field.options; track opt) {\r
                            <option [value]="opt">{{ opt }}</option>\r
                          }\r
                        </select>\r
                      </div>\r
                    }\r
                    @case ('checkbox') {\r
                      <label class="fp-check-row">\r
                        <input\r
                          [id]="'lpDemoField_' + selectedFormIdx + '_' + idx"\r
                          type="checkbox"\r
                          [(ngModel)]="demoFormValues[field.label]"\r
                          [name]="'demo_' + field.label"\r
                          class="fp-check-native"\r
                        />\r
                        <span class="fp-check-box" aria-hidden="true">\r
                          <svg class="fp-check-svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5">\r
                            <polyline points="2 6 5 9 10 3" />\r
                          </svg>\r
                        </span>\r
                        <span class="fp-check-label">{{ field.label }}</span>\r
                      </label>\r
                    }\r
                    @case ('signature') {\r
                      <p class="fp-sig-help">Assine com o dedo (celular) ou mouse (computador) no espa\xE7o abaixo.</p>\r
                      <canvas\r
                        [id]="signatureDemoCanvasId(idx)"\r
                        width="400"\r
                        height="120"\r
                        class="fp-sig-canvas"\r
                        (mousedown)="startDemoSignature($event, idx)"\r
                        (mousemove)="moveDemoSignature($event, idx)"\r
                        (mouseup)="endDemoSignature(idx)"\r
                        (mouseleave)="endDemoSignature(idx)"\r
                        (touchstart)="startDemoSignature($event, idx)"\r
                        (touchmove)="moveDemoSignature($event, idx); $event.preventDefault()"\r
                        (touchend)="endDemoSignature(idx)"\r
                      ></canvas>\r
                      <div class="fp-sig-footer">\r
                        <span class="fp-field-hint">Escreva sua assinatura no campo acima</span>\r
                        <button type="button" class="fp-link-btn" (click)="clearDemoSignature(idx)">Limpar</button>\r
                      </div>\r
                    }\r
                    @case ('date') {\r
                      <input\r
                        [id]="'lpDemoField_' + selectedFormIdx + '_' + idx"\r
                        type="text"\r
                        class="fp-input"\r
                        mask="00/00/0000"\r
                        [leadZeroDateTime]="true"\r
                        placeholder="dd/mm/aaaa"\r
                        inputmode="numeric"\r
                        autocomplete="bday"\r
                        [(ngModel)]="demoFormValues[field.label]"\r
                        [name]="'demo_' + field.label"\r
                      />\r
                    }\r
                    @case ('cpf') {\r
                      <input\r
                        [id]="'lpDemoField_' + selectedFormIdx + '_' + idx"\r
                        type="text"\r
                        class="fp-input"\r
                        mask="000.000.000-00"\r
                        [placeholder]="field.placeholder ?? '000.000.000-00'"\r
                        inputmode="numeric"\r
                        autocomplete="off"\r
                        [(ngModel)]="demoFormValues[field.label]"\r
                        [name]="'demo_' + field.label"\r
                      />\r
                    }\r
                    @default {\r
                      <input\r
                        [id]="'lpDemoField_' + selectedFormIdx + '_' + idx"\r
                        type="text"\r
                        class="fp-input"\r
                        [placeholder]="field.placeholder ?? ''"\r
                        [(ngModel)]="demoFormValues[field.label]"\r
                        [name]="'demo_' + field.label"\r
                      />\r
                    }\r
                  }\r
                </div>\r
              }\r
              <button type="button" class="capture-btn demo-submit-btn" (click)="submitDemoForm()">\r
                Enviar formul\xE1rio (demo)\r
              </button>\r
              <p class="demo-form-note">Este formul\xE1rio \xE9 apenas uma demonstra\xE7\xE3o. Nenhum dado \xE9 enviado.</p>\r
            </div>\r
          }\r
        </div>\r
      </div>\r
    </div>\r
  </section>\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SOCIAL PROOF \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  <section class="social-proof">\r
    <div class="container">\r
      <div class="section-header anim">\r
        <span class="eyebrow">Depoimentos</span>\r
        <h2 class="section-title">Quem usa, <em>recomenda</em></h2>\r
      </div>\r
      <div class="testimonials-grid anim">\r
        @for (t of testimonials; track t.name) {\r
          <div class="testimonial-card">\r
            <div class="tc-text">"{{ t.text }}"</div>\r
            <div class="tc-author">\r
              <div class="tc-avatar" [style.background]="'var(--brand)'">{{ t.initials }}</div>\r
              <div>\r
                <div class="tc-name">{{ t.name }}</div>\r
                <div class="tc-role">{{ t.clinic }} \xB7 {{ t.specialty }}</div>\r
              </div>\r
            </div>\r
          </div>\r
        }\r
      </div>\r
    </div>\r
  </section>\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 N\xDAMEROS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  <section class="numbers">\r
    <div class="container">\r
      <div class="numbers-grid anim">\r
        <div class="num-card">\r
          <div class="num-val">30<span class="num-unit">min</span></div>\r
          <div class="num-label">Para configurar tudo</div>\r
          <div class="num-desc">Cadastre seu neg\xF3cio, escolha templates e publique. Sem TI, sem treinamento.</div>\r
        </div>\r
        <div class="num-card">\r
          <div class="num-val">86+</div>\r
          <div class="num-label">Templates cl\xEDnicos prontos</div>\r
          <div class="num-desc">Criados com profissionais de sa\xFAde para 11 especialidades.</div>\r
        </div>\r
        <div class="num-card">\r
          <div class="num-val">0</div>\r
          <div class="num-label">Papel necess\xE1rio</div>\r
          <div class="num-desc">Fichas, termos e consentimentos 100% digitais com assinatura v\xE1lida.</div>\r
        </div>\r
      </div>\r
    </div>\r
  </section>\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 PRICING \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  <section class="pricing" id="planos">\r
    <div class="container">\r
      <div class="section-header anim">\r
        <span class="eyebrow">Planos</span>\r
        <h2 class="section-title">Simples, <em>sem surpresas</em></h2>\r
        <p class="section-sub">Trial de {{ landingTrialDias }} dias gr\xE1tis, sem cart\xE3o. Cancele quando quiser.</p>\r
      </div>\r
\r
      @if (carregandoLanding) {\r
        <div class="lp-plans-loading anim"><span>Carregando planos\u2026</span></div>\r
      } @else if (planos.length === 0) {\r
        <div class="lp-plans-empty anim">Nenhum plano dispon\xEDvel no momento. <a href="#contato" class="status-link" style="margin-left: 6px">Fale conosco</a></div>\r
      } @else {\r
        <div class="pricing-grid anim">\r
          @for (plan of planos; track plan.key; let i = $index) {\r
            <div class="price-card" [class.featured]="isPlanoRecomendado(i)">\r
              @if (isPlanoRecomendado(i)) {\r
                <span class="price-top-badge">Mais popular</span>\r
              }\r
              <div class="price-plan">{{ plan.name }}</div>\r
              <div class="price-amt">\r
                @if (isPlanoGratis(plan)) {\r
                  R$0<span>/m\xEAs</span>\r
                } @else {\r
                  R$ {{ plan.value | number: '1.0-0' : 'pt-BR' }}<span>/m\xEAs</span>\r
                }\r
              </div>\r
              <div class="price-period">{{ isPlanoGratis(plan) ? 'Para sempre' : 'Cobran\xE7a mensal' }}</div>\r
              @if (plan.description) {\r
                <div class="price-desc">{{ plan.description }}</div>\r
              } @else {\r
                <div class="price-desc">{{ isPlanoGratis(plan) ? 'Ideal para testar o produto.' : 'Recursos completos para sua opera\xE7\xE3o.' }}</div>\r
              }\r
              <div class="price-feats">\r
                <div class="pf"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Fichas e consentimentos digitais</div>\r
                <div class="pf"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Assinatura digital + PDF</div>\r
                <div class="pf"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>Protocolo e hist\xF3rico</div>\r
                @if (isPlanoRecomendado(i) || i >= 1) {\r
                  <div class="pf"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>API REST + Webhooks</div>\r
                } @else {\r
                  <div class="pf off"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>API & Webhooks</div>\r
                }\r
              </div>\r
              @if (isPlanoRecomendado(i)) {\r
                <button type="button" class="p-btn p-btn-green" (click)="irComeceComPlano(plan, i)">{{ ctaPlanoLabel(plan, i) }}</button>\r
              } @else {\r
                <button type="button" class="p-btn p-btn-outline" (click)="irComeceComPlano(plan, i)">{{ ctaPlanoLabel(plan, i) }}</button>\r
              }\r
            </div>\r
          }\r
        </div>\r
      }\r
      <p class="hero-note anim" style="margin-top: 32px; margin-bottom: 0; text-align: center">\r
        * Trial de {{ landingTrialDias }} dias sem cart\xE3o. Ap\xF3s o per\xEDodo, ative o plano escolhido.\r
      </p>\r
    </div>\r
  </section>\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 FAQ \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  <section class="faq" id="duvidas">\r
    <div class="container">\r
      <div class="section-header anim">\r
        <span class="eyebrow">D\xFAvidas</span>\r
        <h2 class="section-title">Perguntas <em>frequentes</em></h2>\r
      </div>\r
      <div class="faq-wrap">\r
        <div class="faq-list anim">\r
          <div class="faq-item">\r
            <button type="button" class="faq-q" [class.open]="faqOpenIndex === 0" (click)="toggleFaq(0)">A assinatura digital tem valor legal?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>\r
            <div class="faq-a" [class.open]="faqOpenIndex === 0"><p>Sim. Atende aos requisitos da MP 2.200-2/2001 e tem validade jur\xEDdica equivalente \xE0 assinatura manuscrita para prontu\xE1rio e consentimento informado.</p></div>\r
          </div>\r
          <div class="faq-item">\r
            <button type="button" class="faq-q" [class.open]="faqOpenIndex === 1" (click)="toggleFaq(1)">O sistema \xE9 compat\xEDvel com a LGPD?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>\r
            <div class="faq-a" [class.open]="faqOpenIndex === 1"><p>Sim. Conformidade LGPD desde o in\xEDcio \u2014 coleta consentimento expl\xEDcito, exibe pol\xEDtica de privacidade e permite exclus\xE3o dos dados.</p></div>\r
          </div>\r
          <div class="faq-item">\r
            <button type="button" class="faq-q" [class.open]="faqOpenIndex === 2" (click)="toggleFaq(2)">Quanto tempo leva para configurar?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>\r
            <div class="faq-a" [class.open]="faqOpenIndex === 2"><p>Menos de 30 minutos. Cadastre seu neg\xF3cio, escolha templates e j\xE1 tem o link para o Instagram.</p></div>\r
          </div>\r
          <div class="faq-item">\r
            <button type="button" class="faq-q" [class.open]="faqOpenIndex === 3" (click)="toggleFaq(3)">Posso personalizar os formul\xE1rios?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>\r
            <div class="faq-a" [class.open]="faqOpenIndex === 3"><p>Sim. Todos os templates s\xE3o edit\xE1veis. Tamb\xE9m pode criar do zero para procedimentos espec\xEDficos.</p></div>\r
          </div>\r
          <div class="faq-item">\r
            <button type="button" class="faq-q" [class.open]="faqOpenIndex === 4" (click)="toggleFaq(4)">Preciso cancelar meu Linktree?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>\r
            <div class="faq-a" [class.open]="faqOpenIndex === 4"><p>N\xE3o. Pode testar em paralelo. A maioria migra naturalmente na primeira semana.</p></div>\r
          </div>\r
        </div>\r
      </div>\r
    </div>\r
  </section>\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 DEMO / CONTATO \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  <section class="lp-demo" id="contato">\r
    <div class="container lp-demo-grid">\r
      <div>\r
        <div class="lp-demo-label">Contato</div>\r
        <h3>Ficou com alguma d\xFAvida?</h3>\r
        <p>Fale com a gente pelo WhatsApp ou preencha o formul\xE1rio. Respondemos em at\xE9 1 hora no hor\xE1rio comercial.</p>\r
        <a href="https://wa.me/5534996460818?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Gestgo." target="_blank" rel="noopener noreferrer" class="lp-wa">\r
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>\r
          Falar no WhatsApp\r
        </a>\r
      </div>\r
      <div class="lp-demo-card" id="lp-demo-contato-card">\r
        <div class="demo-card-title">Agendar demonstra\xE7\xE3o</div>\r
        <p class="demo-card-sub">Resposta em at\xE9 1 hora no hor\xE1rio comercial.</p>\r
        @if (demonstracaoFeedback) {\r
          <div class="demo-feedback" [class.success]="demonstracaoSucesso" [class.error]="!demonstracaoSucesso">{{ demonstracaoFeedback }}</div>\r
        }\r
        <form (ngSubmit)="enviarDemonstracao()">\r
          <div class="demo-field">\r
            <label class="lp-form-label">Nome *</label>\r
            <input class="lp-form-input" type="text" name="demo_name" [(ngModel)]="demonstracao.name" placeholder="Seu nome" required />\r
          </div>\r
          <div class="demo-field">\r
            <label class="lp-form-label">Neg\xF3cio ou marca *</label>\r
            <input class="lp-form-input" type="text" name="demo_clinic" [(ngModel)]="demonstracao.clinic" placeholder="Nome fantasia, marca ou consult\xF3rio" required />\r
          </div>\r
          <div class="demo-row">\r
            <div class="demo-field">\r
              <label class="lp-form-label">E-mail *</label>\r
              <input class="lp-form-input" type="email" name="demo_email" [(ngModel)]="demonstracao.email" placeholder="email&#64;seunegocio.com.br" required />\r
            </div>\r
            <div class="demo-field">\r
              <label class="lp-form-label">WhatsApp *</label>\r
              <input\r
                class="lp-form-input"\r
                type="tel"\r
                name="demo_phone"\r
                mask="(00) 0000-0000||(00) 00000-0000"\r
                [dropSpecialCharacters]="true"\r
                [(ngModel)]="demonstracao.phone"\r
                placeholder="(00) 00000-0000"\r
                inputmode="numeric"\r
                autocomplete="tel"\r
                required\r
              />\r
            </div>\r
          </div>\r
          <div class="demo-field">\r
            <label class="lp-form-label">Mensagem</label>\r
            <textarea class="lp-form-input" name="demo_message" [(ngModel)]="demonstracao.message" rows="3" placeholder="Conte rapidamente seu cen\xE1rio."></textarea>\r
          </div>\r
          <button type="submit" class="capture-btn" style="width: 100%; justify-content: center; margin-top: 4px" [disabled]="demonstracaoEnviando">\r
            @if (demonstracaoEnviando) { Enviando\u2026 } @else { Quero uma demonstra\xE7\xE3o }\r
          </button>\r
          <p class="demo-form-note" style="margin-top: 10px; text-align: center">Ao enviar, voc\xEA concorda em ser contatado.</p>\r
        </form>\r
      </div>\r
    </div>\r
  </section>\r
\r
  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 FOOTER \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\r
  <footer>\r
    <div class="footer-inner">\r
      <div class="footer-col">\r
        <a routerLink="/" class="footer-logo">\r
          <div class="fl-icon"><img src="assets/logo/logo.png" alt="" width="22" height="22" role="presentation" /></div>\r
          <span class="fl-name">Gestgo</span>\r
        </a>\r
        <p class="footer-tagline">Fichas digitais que chegam antes do atendimento.</p>\r
      </div>\r
      <div class="footer-col">\r
        <div class="footer-col-title">Produto</div>\r
        <a href="#funcionalidades">Funcionalidades</a>\r
        <a href="#demonstracao">Demonstra\xE7\xE3o</a>\r
        <a href="#planos">Planos</a>\r
        <a href="#duvidas">D\xFAvidas</a>\r
      </div>\r
      <div class="footer-col">\r
        <div class="footer-col-title">Legal</div>\r
        <a routerLink="/privacidade">Privacidade</a>\r
        <a routerLink="/termos-de-uso">Termos de uso</a>\r
      </div>\r
      <div class="footer-col">\r
        <div class="footer-col-title">Suporte</div>\r
        <a href="#contato">Contato</a>\r
        <a [href]="statusPageUrl" target="_blank" rel="noopener noreferrer">Status</a>\r
        <a href="https://wa.me/5534996460818" target="_blank" rel="noopener noreferrer">WhatsApp</a>\r
      </div>\r
    </div>\r
    <div class="footer-bottom">\r
      <span class="footer-copy">\xA9 {{ ano }} Gestgo. Todos os direitos reservados.</span>\r
    </div>\r
  </footer>\r
\r
  <div class="lp-sticky-cta">\r
    <a routerLink="/comece" class="capture-btn">\r
      Come\xE7ar gr\xE1tis \xB7 {{ landingTrialDias }} dias\r
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="13 17 18 12 13 7"/></svg>\r
    </a>\r
  </div>\r
</div>\r
`, styles: [`/* src/app/paginas/inicio/inicio.component.css */
:host {
  display: block;
}
.lp-page {
  --sans:
    "Geist",
    system-ui,
    sans-serif;
  --radius: 12px;
  font-family: var(--sans);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  overflow-x: hidden;
  scroll-behavior: smooth;
  transition: background 0.3s, color 0.3s;
}
.lp-page[data-theme=dark] {
  --bg: #09090b;
  --bg2: #111113;
  --bg3: #18181b;
  --surface: #1c1c1f;
  --border: rgba(255,255,255,0.07);
  --border2: rgba(255,255,255,0.13);
  --border3: rgba(255,255,255,0.22);
  --text: #fafafa;
  --text2: #a1a1aa;
  --text3: #52525b;
  --nav-bg: rgba(9,9,11,0.85);
  --card-bg: #111113;
  --feat-bg: #111113;
  --grid-line: rgba(255,255,255,0.04);
  --brand: #3b82f6;
  --brand-dark: #1d4ed8;
  --brand-bg: rgba(59,130,246,0.12);
  --brand-bd: rgba(59,130,246,0.28);
  --hero-glow: rgba(59,130,246,0.1);
  --brand-pulse: rgba(59,130,246,0.45);
}
.lp-page[data-theme=light] {
  --bg: #ffffff;
  --bg2: #f8f8fa;
  --bg3: #f1f1f5;
  --surface: #ffffff;
  --border: rgba(0,0,0,0.07);
  --border2: rgba(0,0,0,0.12);
  --border3: rgba(0,0,0,0.2);
  --text: #09090b;
  --text2: #52525b;
  --text3: #a1a1aa;
  --nav-bg: rgba(255,255,255,0.88);
  --card-bg: #ffffff;
  --feat-bg: #f8f8fa;
  --grid-line: rgba(0,0,0,0.04);
  --brand: #1d4ed8;
  --brand-dark: #1e40af;
  --brand-bg: rgba(29,78,216,0.1);
  --brand-bd: rgba(30,64,175,0.22);
  --hero-glow: rgba(29,78,216,0.08);
  --brand-pulse: rgba(29,78,216,0.4);
}
.lp-page *,
.lp-page *::before,
.lp-page *::after {
  box-sizing: border-box;
}
.lp-page a {
  color: inherit;
  text-decoration: none;
}
.lp-page .grid-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(
      90deg,
      var(--grid-line) 1px,
      transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image:
    radial-gradient(
      ellipse 70% 70% at 50% 0%,
      black 40%,
      transparent 100%);
  mask-image:
    radial-gradient(
      ellipse 70% 70% at 50% 0%,
      black 40%,
      transparent 100%);
}
.lp-page nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  backdrop-filter: blur(20px) saturate(1.4);
  background: var(--nav-bg);
  border-bottom: 1px solid var(--border);
  transition: background 0.3s, border-color 0.3s;
}
.lp-page .nav-inner {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.lp-page .nav-left {
  display: flex;
  align-items: center;
  gap: 32px;
}
.lp-page .nav-logo {
  display: flex;
  align-items: center;
  gap: 9px;
}
.lp-page .logo-mark {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--brand);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  padding: 4px;
}
.lp-page[data-theme=light] .logo-mark {
  border-color: rgba(30, 64, 175, 0.35);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
.lp-page .logo-mark img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.lp-page .logo-name {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.4px;
}
.lp-page .nav-links {
  display: flex;
  gap: 24px;
}
.lp-page .nav-links a {
  font-size: 13px;
  color: var(--text2);
  transition: color 0.15s;
}
.lp-page .nav-links a:hover {
  color: var(--text);
}
.lp-page .nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.lp-page .theme-toggle {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--border2);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text2);
  transition: all 0.15s;
}
.lp-page .theme-toggle:hover {
  background: var(--bg3);
  color: var(--text);
}
.lp-page .theme-toggle svg {
  width: 15px;
  height: 15px;
}
.lp-page .icon-sun {
  display: none;
}
.lp-page .icon-moon {
  display: block;
}
.lp-page[data-theme=light] .icon-sun {
  display: block;
}
.lp-page[data-theme=light] .icon-moon {
  display: none;
}
.lp-page .nav-login {
  font-size: 13px;
  color: var(--text2);
  padding: 7px 14px;
  border-radius: 8px;
  border: 1px solid var(--border2);
  background: transparent;
  cursor: pointer;
  font-family: var(--sans);
  transition: all 0.15s;
}
.lp-page a.nav-login:hover {
  color: var(--text);
  border-color: var(--border3);
}
.lp-page .nav-cta {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  padding: 7px 16px;
  border-radius: 8px;
  background: var(--brand);
  border: none;
  cursor: pointer;
  font-family: var(--sans);
  transition: background 0.15s, transform 0.1s;
}
.lp-page .nav-cta:hover {
  background: var(--brand-dark);
}
.lp-page .nav-cta:active {
  transform: scale(0.98);
}
.lp-page .lp-menu-btn {
  display: none;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid var(--border2);
  background: transparent;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: var(--text2);
}
.lp-page .lp-mobile-nav {
  display: none;
  border-top: 1px solid var(--border);
  background: var(--nav-bg);
  padding: 16px 24px 20px;
  flex-direction: column;
  gap: 12px;
}
.lp-page .lp-mobile-nav a {
  font-size: 14px;
  color: var(--text2);
}
.lp-page .lp-mobile-nav.open {
  display: flex;
}
.lp-page .status-bar {
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: center;
  padding: 7px 24px;
  transition: background 0.3s;
}
.lp-page .status-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text2);
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
.lp-page .status-bar-link {
  text-decoration: none;
  color: inherit;
  max-width: 100%;
}
.lp-page .status-msg-sep {
  color: var(--border2);
}
.lp-page .status-msg {
  color: var(--text3);
  max-width: min(320px, 90vw);
}
.lp-page .status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  animation: lp-pulse-dot 2s ease-in-out infinite;
}
.lp-page .status-dot.op-operational {
  background: var(--brand);
}
.lp-page .status-dot.op-degraded {
  background: #eab308;
  animation: lp-pulse-amber 2s ease-in-out infinite;
}
.lp-page .status-dot.op-outage {
  background: #ef4444;
  animation: lp-pulse-red 2s ease-in-out infinite;
}
.lp-page .status-dot.op-maintenance {
  background: #6366f1;
  animation: lp-pulse-indigo 2s ease-in-out infinite;
}
@keyframes lp-pulse-dot {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 0 0 var(--brand-pulse);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 0 0 4px transparent;
  }
}
@keyframes lp-pulse-amber {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.45);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(234, 179, 8, 0);
  }
}
@keyframes lp-pulse-red {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.45);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0);
  }
}
@keyframes lp-pulse-indigo {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.45);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0);
  }
}
.lp-page .status-link {
  color: var(--brand);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.lp-page section {
  position: relative;
  z-index: 1;
}
.lp-page .container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
}
.lp-page .section-header {
  text-align: center;
  margin-bottom: 64px;
}
.lp-page .eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brand);
  margin-bottom: 12px;
  display: block;
}
.lp-page .section-title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.12;
  margin-bottom: 14px;
}
.lp-page .section-title em {
  font-style: normal;
  font-weight: 700;
}
.lp-page .section-sub {
  font-size: 16px;
  color: var(--text2);
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.65;
}
.lp-page .hero {
  padding: 80px 24px 80px;
  background:
    radial-gradient(
      ellipse 100% 50% at 50% 0%,
      var(--hero-glow) 0%,
      transparent 65%);
}
.lp-page .hero-grid {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}
.lp-page .hero-text {
}
.lp-page .hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--border2);
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text2);
  margin-bottom: 28px;
  background: var(--bg2);
  transition: background 0.3s, border-color 0.3s;
}
.lp-page .hero-eyebrow-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--brand);
}
.lp-page .hero-eyebrow span {
  color: var(--brand);
  font-weight: 600;
}
.lp-page .hero h1 {
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.08;
  margin: 0 0 20px;
}
.lp-page .hero h1 em {
  font-style: normal;
  font-weight: 700;
  color: var(--brand);
}
.lp-page .hero-sub {
  font-size: clamp(15px, 1.6vw, 17px);
  color: var(--text2);
  line-height: 1.7;
  max-width: 480px;
  margin: 0 0 32px;
}
.lp-page .hero-sub strong {
  color: var(--text);
  font-weight: 500;
}
.lp-page .hero-capture {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}
.lp-page .capture-input {
  padding: 13px 18px;
  border-radius: 10px;
  border: 1px solid var(--border2);
  background: var(--bg2);
  color: var(--text);
  font-size: 14px;
  font-family: var(--sans);
  width: 240px;
  max-width: 100%;
  outline: none;
  transition: border-color 0.15s, background 0.3s;
}
.lp-page .capture-input::placeholder {
  color: var(--text3);
}
.lp-page .capture-input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-bg);
}
.lp-page .capture-btn {
  padding: 13px 22px;
  border-radius: 10px;
  background: var(--brand);
  color: #fff;
  border: none;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--sans);
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  display: inline-flex;
  align-items: center;
  gap: 7px;
}
.lp-page .capture-btn:hover {
  background: var(--brand-dark);
}
.lp-page .capture-btn:active {
  transform: scale(0.98);
}
.lp-page .capture-btn svg {
  width: 14px;
  height: 14px;
}
.lp-page .capture-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.lp-page .hero-note {
  font-size: 12px;
  color: var(--text3);
  margin-bottom: 32px;
}
.lp-page .hero-social {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.lp-page .hs-item {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: var(--text2);
}
.lp-page .hs-item svg {
  width: 14px;
  height: 14px;
  color: var(--brand);
  flex-shrink: 0;
}
.lp-page .hs-sep {
  width: 1px;
  height: 16px;
  background: var(--border2);
}
.lp-page .hero-visual {
  perspective: 1200px;
}
.lp-page .hero-browser {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border2);
  background: var(--bg2);
  box-shadow: 0 0 0 1px var(--border), 0 40px 100px rgba(0, 0, 0, 0.35);
  transition: border-color 0.3s, background 0.3s;
  transform: rotateY(-3deg) rotateX(1deg);
}
.lp-page .browser-bar {
  background: var(--bg3);
  border-bottom: 1px solid var(--border);
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.lp-page .b-dots {
  display: flex;
  gap: 6px;
}
.lp-page .b-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.lp-page .b-url {
  flex: 1;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 5px 12px;
  font-size: 11px;
  color: var(--text3);
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 280px;
  margin: 0 auto;
}
.lp-page .b-url svg {
  width: 11px;
  height: 11px;
  flex-shrink: 0;
}
.lp-page .browser-slides {
  position: relative;
  min-height: 280px;
  overflow: hidden;
}
.lp-page .browser-slide {
  position: absolute;
  inset: 0;
  padding: 20px;
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 0.35s, transform 0.35s;
  pointer-events: none;
}
.lp-page .browser-slide.active {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
  position: relative;
}
.lp-page .b-slide-header {
  margin-bottom: 16px;
}
.lp-page .b-slide-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 3px;
}
.lp-page .b-slide-sub {
  font-size: 11px;
  color: var(--text3);
}
.lp-page .b-kpi-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}
.lp-page .b-kpi {
  background: var(--bg3);
  border-radius: 9px;
  padding: 12px;
  text-align: center;
}
.lp-page .b-kpi-val {
  font-size: 20px;
  font-weight: 700;
}
.lp-page .b-kpi-label {
  font-size: 10px;
  color: var(--text3);
  margin-top: 2px;
}
.lp-page .b-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.lp-page .b-list-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
}
.lp-page .b-list-row:last-child {
  border: none;
}
.lp-page .b-list-dot {
  width: 8px;
  height: 8px;
  border-radius: 3px;
  background: var(--brand-bg);
  border: 1px solid var(--brand-bd);
  flex-shrink: 0;
}
.lp-page .b-list-row span:first-of-type {
  flex: 1;
  font-weight: 500;
}
.lp-page .b-badge {
  font-size: 9px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 20px;
  background: var(--brand-bg);
  color: var(--brand);
}
.lp-page .b-template-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.lp-page .b-template-card {
  background: var(--bg3);
  border-radius: 10px;
  padding: 14px;
  border: 1px solid var(--border);
}
.lp-page .b-tc-icon {
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text2);
}
.lp-page .b-tc-icon .material-symbols-outlined {
  font-size: 22px;
  font-variation-settings:
    "FILL" 0,
    "wght" 300,
    "GRAD" 0,
    "opsz" 24;
}
.lp-page .b-tc-name {
  font-size: 12px;
  font-weight: 600;
}
.lp-page .b-tc-cat {
  font-size: 10px;
  color: var(--text3);
}
.lp-page .b-pdf-preview {
}
.lp-page .b-pdf-line {
  height: 8px;
  border-radius: 4px;
  background: var(--bg3);
  margin-bottom: 6px;
}
.lp-page .b-pdf-line.w80 {
  width: 80%;
}
.lp-page .b-pdf-line.w60 {
  width: 60%;
}
.lp-page .b-pdf-spacer {
  height: 12px;
}
.lp-page .b-pdf-field {
  margin-bottom: 10px;
}
.lp-page .b-pdf-field-label {
  font-size: 9px;
  font-weight: 600;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}
.lp-page .b-pdf-field-val {
  font-size: 12px;
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
}
.lp-page .b-pdf-sig {
  margin-top: 16px;
}
.lp-page .b-pdf-sig-label {
  font-size: 9px;
  font-weight: 600;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}
.lp-page .b-pdf-sig-line {
  height: 40px;
  border: 1px dashed var(--border2);
  border-radius: 8px;
  background: var(--bg3);
}
.lp-page .browser-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  padding: 12px;
  border-top: 1px solid var(--border);
}
.lp-page .bd {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: var(--border2);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;
}
.lp-page .bd.active {
  background: var(--brand);
}
.lp-page .logos {
  padding: 40px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}
.lp-page .logos-label {
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text3);
  margin-bottom: 20px;
}
.lp-page .logos-track {
  display: flex;
  gap: 40px;
  animation: lp-scroll-logos 25s linear infinite;
  width: max-content;
}
@keyframes lp-scroll-logos {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
.lp-page .logos-track:hover {
  animation-play-state: paused;
}
.lp-page .logo-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text3);
  white-space: nowrap;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg2);
  transition: background 0.3s, border-color 0.3s;
}
.lp-page .logo-chip:hover {
  color: var(--text2);
  border-color: var(--border2);
}
.lp-page .features {
  padding: 100px 0;
}
.lp-page .feat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.lp-page .feat-card {
  background: var(--feat-bg);
  padding: 28px;
  transition: background 0.2s;
}
.lp-page .feat-card:hover {
  background: var(--bg3);
}
.lp-page .feat-icon {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: var(--brand-bg);
  border: 1px solid var(--brand-bd);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.lp-page .feat-icon svg {
  width: 17px;
  height: 17px;
  color: var(--brand);
}
.lp-page .feat-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 7px;
}
.lp-page .feat-desc {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.6;
}
.lp-page .how {
  padding: 100px 0;
  background: var(--bg2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.lp-page .how-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}
.lp-page .how-steps-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.lp-page .how-step {
  display: flex;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: opacity 0.2s;
}
.lp-page .how-step:last-child {
  border: none;
}
.lp-page .how-step-num {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--border2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--text3);
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.2s;
}
.lp-page .how-step.active .how-step-num {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
}
.lp-page .how-step-body {
  flex: 1;
}
.lp-page .how-step-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  transition: color 0.2s;
}
.lp-page .how-step.active .how-step-title {
  color: var(--brand);
}
.lp-page .how-step-desc {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.6;
}
.lp-page .how-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}
.lp-page .phone-wrap {
  position: relative;
}
.lp-page .phone-frame {
  width: 220px;
  background: var(--bg3);
  border: 1px solid var(--border2);
  border-radius: 28px;
  overflow: hidden;
  padding: 10px;
}
.lp-page .phone-screen {
  border-radius: 20px;
  overflow: hidden;
  min-height: 380px;
  position: relative;
  background: var(--bg2);
}
.lp-page .ph-screen-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 0.35s, transform 0.35s;
  pointer-events: none;
  overflow-y: auto;
}
.lp-page .ph-screen-slide.active {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
  position: relative;
}
.lp-page .ph-header-bar {
  padding: 12px 14px;
  font-size: 12px;
  font-weight: 700;
  border-bottom: 1px solid var(--border);
}
.lp-page .ph-body-inner {
  padding: 12px 14px;
}
.lp-page .ph-template-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  margin-bottom: 6px;
}
.lp-page .ph-row-ic {
  font-size: 16px;
  flex-shrink: 0;
  color: var(--text2);
  font-variation-settings:
    "FILL" 0,
    "wght" 300,
    "GRAD" 0,
    "opsz" 24;
}
.lp-page .ph-template-add {
  border-style: dashed;
  color: var(--brand);
  text-align: center;
}
.lp-page .ph-cover-demo {
  height: 56px;
  background:
    linear-gradient(
      135deg,
      #0b1628,
      #1a2540);
  border-radius: 10px;
  margin-bottom: -12px;
}
.lp-page .ph-avatar-demo {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: var(--brand);
  border: 2px solid var(--bg3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  color: #fff;
  margin-left: 12px;
  position: relative;
  z-index: 2;
}
.lp-page .ph-clinic-name {
  font-size: 13px;
  font-weight: 700;
  margin-top: 6px;
}
.lp-page .ph-clinic-tag {
  font-size: 9px;
  color: var(--text3);
  margin-bottom: 8px;
}
.lp-page .ph-wpp-btn {
  background: #22c55e;
  border-radius: 8px;
  padding: 8px;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 8px;
}
.lp-page .ph-doc-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
  margin-bottom: 5px;
}
.lp-page .ph-form-field {
  margin-bottom: 10px;
}
.lp-page .ph-form-field label {
  font-size: 9px;
  font-weight: 600;
  color: var(--text3);
  display: block;
  margin-bottom: 3px;
}
.lp-page .ph-input-mock {
  padding: 7px 10px;
  border: 1px solid var(--border);
  border-radius: 7px;
  font-size: 10px;
  background: var(--bg3);
}
.lp-page .ph-sig-mock {
  height: 50px;
  border: 1px dashed var(--border2);
  border-radius: 8px;
  background: var(--bg3);
}
.lp-page .ph-submit-btn {
  background: var(--brand);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  margin-top: 6px;
}
.lp-page .ph-proto-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  color: #22c55e;
  margin-bottom: 14px;
}
.lp-page .ph-proto-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text3);
}
.lp-page .ph-proto-pdf {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  margin-bottom: 14px;
}
.lp-page .ph-pdf-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--brand-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}
.lp-page .ph-pdf-icon svg {
  width: 16px;
  height: 16px;
  color: var(--brand);
}
.lp-page .ph-pdf-name {
  font-size: 11px;
  font-weight: 600;
}
.lp-page .ph-pdf-size {
  font-size: 9px;
  color: var(--text3);
}
.lp-page .ph-proto-timeline {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.lp-page .ph-tl-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  color: var(--text2);
}
.lp-page .ph-tl-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--text3);
}
.lp-page .preview-section {
  padding: 100px 0;
  background: var(--bg2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.lp-page .preview-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px 32px;
  align-items: start;
  margin-bottom: 80px;
}
.lp-page .preview-layouts-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text3);
  margin-bottom: 12px;
}
.lp-page .preview-layouts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  align-content: start;
}
.lp-page .preview-layout-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 16px 8px 14px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card-bg);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  text-align: center;
  font-family: var(--sans);
  margin: 0;
  color: var(--text);
  min-height: 0;
  position: relative;
}
.lp-page .preview-layout-card:hover {
  border-color: var(--border2);
}
.lp-page .preview-layout-card.active {
  border-color: var(--brand-bd);
  background: var(--brand-bg);
}
.lp-page .plc-icon {
  font-size: 26px;
  width: 28px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--text2);
  font-variation-settings:
    "FILL" 0,
    "wght" 300,
    "GRAD" 0,
    "opsz" 24;
  line-height: 1;
}
.lp-page .preview-layout-card:hover .plc-icon,
.lp-page .preview-layout-card.active .plc-icon {
  color: var(--text);
}
.lp-page .plc-body {
  flex: 1;
  min-width: 0;
}
.lp-page .plc-name {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
}
.lp-page .plc-specialty {
  font-size: 10px;
  color: var(--text2);
  line-height: 1.2;
  margin-top: 2px;
}
.lp-page .plc-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid var(--border2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  flex-shrink: 0;
  position: absolute;
  top: 8px;
  right: 8px;
}
.lp-page .plc-check.visible {
  opacity: 1;
  border-color: var(--brand);
  background: var(--brand);
}
.lp-page .plc-check svg {
  width: 10px;
  height: 10px;
  color: #fff;
}
.lp-page .preview-phone-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  position: sticky;
  top: 90px;
}
.lp-page .preview-iframe-hint {
  font-size: 11px;
  color: var(--text3);
  text-align: center;
  max-width: 340px;
  line-height: 1.4;
  margin: 0;
}
.lp-page .preview-phone .phone-frame {
  width: 340px;
}
.lp-page .preview-phone .phone-screen {
  min-height: 0;
}
.lp-page .lp-phone-iframe-screen {
  position: relative;
  height: 600px;
  background: var(--bg3);
  border-radius: 20px;
  overflow: hidden;
}
.lp-page .lp-preview-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  opacity: 0;
  transition: opacity 0.35s ease;
}
.lp-page .lp-preview-iframe.visible {
  opacity: 1;
}
.lp-page .lp-iframe-skeleton {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(
      110deg,
      var(--bg3) 0%,
      var(--bg2) 45%,
      var(--bg3) 90%);
  background-size: 200% 100%;
  animation: lp-shimmer 1.2s ease-in-out infinite;
  transition: opacity 0.25s ease;
}
.lp-page .lp-iframe-skeleton.hidden {
  opacity: 0;
  pointer-events: none;
}
@keyframes lp-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
.lp-page .lp-iframe-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-size: 13px;
  color: var(--text3);
  text-align: center;
}
.lp-page .ph-demo-cover {
  height: 60px;
  border-radius: 10px;
  margin-bottom: -14px;
}
.lp-page .ph-demo-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 2px solid var(--bg3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  color: #fff;
  margin-left: 12px;
  position: relative;
  z-index: 2;
}
.lp-page .ph-demo-clinic-name {
  font-size: 13px;
  font-weight: 700;
  margin-top: 6px;
}
.lp-page .ph-demo-specialty {
  font-size: 10px;
  font-weight: 600;
}
.lp-page .preview-qr-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.lp-page .preview-qr-img {
  width: 120px;
  height: 120px;
}
.lp-page .preview-qr-label {
  font-size: 11px;
  color: var(--text3);
  text-align: center;
}
.lp-page #lp-demo-form-card,
.lp-page #lp-demo-contato-card {
  scroll-margin-top: 96px;
}
.lp-page .demo-forms-section {
}
.lp-page .demo-forms-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 20px 24px;
  margin-bottom: 28px;
}
.lp-page .demo-forms-title {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-top: 6px;
}
.lp-page .demo-form-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  min-width: min(100%, 420px);
}
.lp-page .demo-form-tab {
  padding: 9px 12px;
  border-radius: 10px;
  border: 1px solid var(--border2);
  background: transparent;
  color: var(--text2);
  font-size: 12px;
  font-weight: 600;
  font-family: var(--sans);
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s,
    background 0.15s;
  text-align: center;
  line-height: 1.25;
}
.lp-page .demo-form-tab:hover {
  border-color: var(--border3);
  color: var(--text);
}
.lp-page .demo-form-tab.active {
  background: var(--brand);
  border-color: var(--brand);
  color: #fff;
}
.lp-page .demo-form-card {
  border: 1px solid var(--border2);
  border-radius: 16px;
  background: var(--card-bg);
  padding: 28px;
  max-width: min(600px, 100%);
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.lp-page .demo-form-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}
.lp-page .demo-form-card-logo {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: var(--brand);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 4px;
  flex-shrink: 0;
}
.lp-page .demo-form-card-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.lp-page .demo-form-card-title {
  font-size: 15px;
  font-weight: 600;
}
.lp-page .demo-form-card-sub {
  font-size: 12px;
  color: var(--text2);
}
.lp-page .demo-form-fields {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.lp-page .demo-form-card .fp-field-group {
  margin-bottom: 1.15rem;
}
.lp-page .demo-form-card .fp-field-group:last-of-type {
  margin-bottom: 0;
}
.lp-page .demo-form-card .fp-field-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--text);
  margin-bottom: 0.375rem;
}
.lp-page .demo-form-card .fp-field-hint {
  font-size: 0.6875rem;
  color: var(--text3);
  margin-top: 0;
}
.lp-page .demo-form-card .fp-input,
.lp-page .demo-form-card .fp-select {
  width: 100%;
  padding: 0.75rem 0.875rem;
  border-radius: 0.75rem;
  border: 1.5px solid var(--border2);
  font-family: var(--sans);
  font-size: 0.875rem;
  color: var(--text);
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    background-color 0.2s;
  -webkit-appearance: none;
}
.lp-page .demo-form-card .fp-input {
  background-color: var(--bg2);
}
.lp-page .demo-form-card .fp-input::placeholder {
  color: var(--text3);
}
.lp-page .demo-form-card .fp-input:focus,
.lp-page .demo-form-card .fp-select:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-bg);
}
.lp-page .demo-form-card .fp-textarea {
  resize: vertical;
  min-height: 5.5rem;
  line-height: 1.45;
}
.lp-page .demo-form-card .fp-select-wrap {
  position: relative;
}
.lp-page .demo-form-card .fp-select {
  cursor: pointer;
  padding-right: 2.25rem;
  appearance: none;
  background-color: var(--bg2);
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2352525b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.875rem center;
  background-size: 12px 8px;
  text-decoration: none;
  text-decoration-line: none;
}
.lp-page[data-theme=dark] .demo-form-card .fp-select {
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2360a5fa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
}
.lp-page .demo-form-card .fp-check-row {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
}
.lp-page .demo-form-card .fp-check-native {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}
.lp-page .demo-form-card .fp-check-box {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.375rem;
  border: 2px solid var(--border3);
  flex-shrink: 0;
  margin-top: 0.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, border-color 0.15s;
}
.lp-page .demo-form-card .fp-check-svg {
  width: 0.75rem;
  height: 0.75rem;
  color: #fff;
  opacity: 0;
}
.lp-page .demo-form-card .fp-check-native:checked + .fp-check-box {
  background: var(--brand);
  border-color: var(--brand);
}
.lp-page .demo-form-card .fp-check-native:checked + .fp-check-box .fp-check-svg {
  opacity: 1;
}
.lp-page .demo-form-card .fp-check-native:focus-visible + .fp-check-box {
  box-shadow: 0 0 0 3px var(--brand-bg);
}
.lp-page .demo-form-card .fp-check-label {
  font-size: 0.8125rem;
  line-height: 1.45;
  color: var(--text);
}
.lp-page .demo-form-card .fp-sig-help {
  font-size: 0.75rem;
  color: var(--text2);
  margin: 0 0 0.75rem;
  line-height: 1.45;
}
.lp-page .demo-form-card .fp-sig-canvas {
  display: block;
  width: 100%;
  max-width: 100%;
  height: 7.5rem;
  border-radius: 0.75rem;
  border: 1.5px solid var(--border2);
  background: var(--bg2);
  cursor: crosshair;
  touch-action: none;
}
.lp-page .demo-form-card .fp-sig-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.lp-page .demo-form-card .fp-link-btn {
  border: none;
  background: transparent;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: var(--sans);
  color: var(--text2);
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  border-radius: 0.5rem;
  transition: color 0.15s, background 0.15s;
}
.lp-page .demo-form-card .fp-link-btn:hover {
  color: #ef5350;
  background: rgba(239, 83, 80, 0.08);
}
.lp-page .demo-submit-btn {
  width: 100%;
  justify-content: center;
}
.lp-page .demo-form-note {
  font-size: 11px;
  color: var(--text3);
  text-align: center;
  margin-top: 8px;
}
.lp-page .demo-form-success {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.2);
}
.lp-page .demo-form-success svg {
  width: 24px;
  height: 24px;
  color: #22c55e;
  flex-shrink: 0;
  margin-top: 2px;
}
.lp-page .demo-form-success-title {
  font-size: 14px;
  font-weight: 600;
  color: #22c55e;
  margin-bottom: 4px;
}
.lp-page .demo-form-success-sub {
  font-size: 12px;
  color: var(--text2);
  line-height: 1.5;
}
.lp-page .social-proof {
  padding: 100px 0;
}
.lp-page .testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.lp-page .testimonial-card {
  padding: 28px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card-bg);
}
.lp-page .tc-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text2);
  margin-bottom: 20px;
  font-style: italic;
}
.lp-page .tc-author {
  display: flex;
  align-items: center;
  gap: 12px;
}
.lp-page .tc-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
}
.lp-page .tc-name {
  font-size: 13px;
  font-weight: 600;
}
.lp-page .tc-role {
  font-size: 11px;
  color: var(--text3);
}
.lp-page .numbers {
  padding: 80px 0;
}
.lp-page .numbers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.lp-page .num-card {
  padding: 28px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card-bg);
  text-align: center;
}
.lp-page .num-card:hover {
  border-color: var(--brand-bd);
}
.lp-page .num-val {
  font-size: 48px;
  font-weight: 700;
  color: var(--brand);
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 8px;
}
.lp-page .num-unit {
  font-size: 24px;
  font-weight: 500;
}
.lp-page .num-label {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
}
.lp-page .num-desc {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.6;
}
.lp-page .pricing {
  padding: 100px 0;
  background: var(--bg2);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.lp-page .pricing-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  align-items: stretch;
}
.lp-page .price-card {
  display: flex;
  flex-direction: column;
  flex: 1 1 300px;
  max-width: 380px;
  min-height: 100%;
  padding: 28px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--card-bg);
}
.lp-page .price-card.featured {
  flex: 1 1 320px;
  max-width: 400px;
  border-color: var(--brand-bd);
  position: relative;
  overflow: hidden;
}
.lp-page .price-card.featured::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--brand);
}
.lp-page .price-top-badge {
  display: inline-flex;
  background: var(--brand);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.04em;
  margin-bottom: 14px;
  text-transform: uppercase;
}
.lp-page .price-plan {
  font-size: 12px;
  font-weight: 700;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}
.lp-page .price-amt {
  font-size: 38px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 3px;
}
.lp-page .price-amt span {
  font-size: 15px;
  font-weight: 400;
  color: var(--text2);
}
.lp-page .price-period {
  font-size: 12px;
  color: var(--text3);
  margin-bottom: 18px;
}
.lp-page .price-desc {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.6;
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}
.lp-page .price-feats {
  display: flex;
  flex-direction: column;
  gap: 9px;
  flex: 1 1 auto;
  margin-bottom: 22px;
  min-height: 0;
}
.lp-page .pf {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
}
.lp-page .pf svg {
  width: 15px;
  height: 15px;
  color: var(--brand);
  flex-shrink: 0;
  margin-top: 2px;
}
.lp-page .pf.off {
  color: var(--text3);
}
.lp-page .pf.off svg {
  color: var(--text3);
}
.lp-page .p-btn {
  width: 100%;
  padding: 12px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--sans);
  cursor: pointer;
  border: none;
  transition: all 0.15s;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.lp-page .p-btn-green {
  background: var(--brand);
  color: #fff;
}
.lp-page .p-btn-green:hover {
  background: var(--brand-dark);
}
.lp-page .p-btn-outline {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border2);
}
.lp-page .p-btn-outline:hover {
  border-color: var(--border3);
}
.lp-page .faq {
  padding: 100px 0;
}
.lp-page .faq-wrap {
  max-width: 660px;
  margin: 0 auto;
}
.lp-page .faq-list {
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}
.lp-page .faq-item {
  border-bottom: 1px solid var(--border);
}
.lp-page .faq-item:last-child {
  border: none;
}
.lp-page .faq-q {
  width: 100%;
  padding: 18px 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  font-family: var(--sans);
  text-align: left;
  transition: background 0.15s;
}
.lp-page .faq-q:hover {
  background: var(--bg2);
}
.lp-page .faq-q svg {
  width: 15px;
  height: 15px;
  color: var(--text3);
  flex-shrink: 0;
  transition: transform 0.2s, color 0.2s;
}
.lp-page .faq-q.open svg {
  transform: rotate(45deg);
  color: var(--brand);
}
.lp-page .faq-a {
  padding: 0 20px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}
.lp-page .faq-a.open {
  max-height: 320px;
  padding: 0 20px 18px;
}
.lp-page .faq-a p {
  font-size: 13px;
  color: var(--text2);
  line-height: 1.7;
}
.lp-page .lp-demo {
  padding: 80px 0;
  border-top: 1px solid var(--border);
}
.lp-page .lp-demo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}
.lp-page .lp-demo-card {
  border-radius: 16px;
  border: 1px solid var(--border2);
  background: var(--card-bg);
  padding: 28px;
}
.lp-page .lp-demo-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brand);
  margin-bottom: 10px;
}
.lp-page .lp-demo h3 {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}
.lp-page .lp-demo p {
  font-size: 14px;
  color: var(--text2);
  line-height: 1.65;
}
.lp-page .demo-card-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}
.lp-page .demo-card-sub {
  font-size: 13px;
  color: var(--text2);
  margin-bottom: 16px;
}
.lp-page .demo-feedback {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 13px;
  margin-bottom: 16px;
}
.lp-page .demo-feedback.success {
  background: var(--brand-bg);
  border: 1px solid var(--brand-bd);
  color: var(--brand);
}
.lp-page .demo-feedback.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #b91c1c;
}
.lp-page .demo-field {
  margin-bottom: 12px;
}
.lp-page .demo-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.lp-page .lp-form-label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: var(--text2);
  margin-bottom: 4px;
}
.lp-page .lp-form-input {
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--border2);
  background: var(--bg2);
  color: var(--text);
  font-size: 14px;
  font-family: var(--sans);
  outline: none;
}
.lp-page .lp-form-input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-bg);
}
.lp-page .lp-wa {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px 20px;
  border-radius: 10px;
  background: #25d366;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
}
.lp-page .lp-wa:hover {
  background: #20bd5a;
}
.lp-page footer {
  border-top: 1px solid var(--border);
  padding: 48px 24px 0;
  background: var(--bg);
  transition: background 0.3s;
}
.lp-page .footer-inner {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 32px;
  padding-bottom: 32px;
}
.lp-page .footer-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.lp-page .footer-col-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text3);
  margin-bottom: 4px;
}
.lp-page .footer-col a {
  font-size: 13px;
  color: var(--text2);
  transition: color 0.15s;
}
.lp-page .footer-col a:hover {
  color: var(--text);
}
.lp-page .footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.lp-page .fl-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: var(--brand);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 4px;
}
.lp-page[data-theme=light] .fl-icon {
  border-color: rgba(30, 64, 175, 0.35);
}
.lp-page .fl-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.lp-page .fl-name {
  font-size: 13px;
  font-weight: 600;
}
.lp-page .footer-tagline {
  font-size: 13px;
  color: var(--text3);
  line-height: 1.5;
  max-width: 240px;
}
.lp-page .footer-bottom {
  border-top: 1px solid var(--border);
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px 0;
}
.lp-page .footer-copy {
  font-size: 12px;
  color: var(--text3);
}
@keyframes lp-fade-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.lp-page .anim {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .lp-page .anim {
    opacity: 1;
    transform: none;
  }
  .lp-page .anim.visible {
    animation: none;
  }
}
.lp-page .anim.visible {
  animation: lp-fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.lp-page .anim-d1 {
  animation-delay: 0.05s;
}
.lp-page .anim-d2 {
  animation-delay: 0.1s;
}
.lp-page .anim-d3 {
  animation-delay: 0.15s;
}
.lp-page .lp-sticky-cta {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  background: var(--nav-bg);
  border-top: 1px solid var(--border);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
.lp-page .lp-sticky-cta a {
  width: 100%;
  justify-content: center;
}
.lp-page .lp-plans-loading {
  text-align: center;
  padding: 48px 24px;
  color: var(--text3);
  font-size: 14px;
}
.lp-page .lp-plans-empty {
  text-align: center;
  padding: 48px 24px;
  border: 1px dashed var(--border2);
  border-radius: 14px;
  color: var(--text2);
  font-size: 14px;
}
@media (max-width: 900px) {
  .lp-page .hero-grid {
    grid-template-columns: 1fr;
  }
  .lp-page .hero {
    text-align: center;
  }
  .lp-page .hero-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .lp-page .hero-sub {
    max-width: 520px;
    margin: 0 auto 32px;
  }
  .lp-page .hero-capture {
    justify-content: center;
  }
  .lp-page .hero-browser {
    transform: none;
    max-width: 480px;
    margin: 0 auto;
  }
  .lp-page .feat-grid {
    grid-template-columns: 1fr 1fr;
  }
  .lp-page .how-grid {
    grid-template-columns: 1fr;
  }
  .lp-page .preview-grid {
    grid-template-columns: 1fr;
  }
  .lp-page .preview-layouts-grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 520px;
    margin: 0 auto;
  }
  .lp-page .preview-phone-col {
    position: static;
  }
  .lp-page .preview-phone .phone-frame {
    width: min(380px, calc(100vw - 48px));
  }
  .lp-page .testimonials-grid {
    grid-template-columns: 1fr;
  }
  .lp-page .numbers-grid {
    grid-template-columns: 1fr 1fr;
  }
  .lp-page .pricing-grid {
    flex-direction: column;
    align-items: stretch;
  }
  .lp-page .price-card,
  .lp-page .price-card.featured {
    max-width: none;
    flex: none;
  }
  .lp-page .nav-links {
    display: none;
  }
  .lp-page .lp-menu-btn {
    display: flex;
  }
  .lp-page .nav-right .nav-login,
  .lp-page .nav-right .nav-cta {
    display: none;
  }
  .lp-page .lp-demo-grid {
    grid-template-columns: 1fr;
  }
  .lp-page .footer-inner {
    grid-template-columns: 1fr 1fr;
  }
  .lp-page .demo-forms-header {
    grid-template-columns: 1fr;
    align-items: stretch;
  }
  .lp-page .demo-form-tabs {
    min-width: 0;
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .lp-page .feat-grid {
    grid-template-columns: 1fr;
  }
  .lp-page .numbers-grid {
    grid-template-columns: 1fr;
  }
  .lp-page .demo-row {
    grid-template-columns: 1fr;
  }
  .lp-page .footer-inner {
    grid-template-columns: 1fr;
  }
  .lp-page .lp-sticky-cta {
    display: block;
  }
  .lp-page {
    padding-bottom: 72px;
  }
  .lp-page .preview-layouts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
/*# sourceMappingURL=inicio.component.css.map */
`] }]
  }], () => [{ type: void 0, decorators: [{
    type: Inject,
    args: [PLATFORM_ID]
  }] }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InicioComponent, { className: "InicioComponent", filePath: "src/app/paginas/inicio/inicio.component.ts", lineNumber: 75 });
})();
export {
  InicioComponent
};
//# sourceMappingURL=chunk-M62U5VWV.js.map
