'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.visaRegex =
    exports.masterCardRegex =
    exports.dinersRegex =
    exports.emailRegex =
    exports.passwordRegex =
        void 0
exports.passwordRegex =
    /^(?=[A-Za-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_])(?=.*[a-z].*[a-z].*[a-z])[A-Za-z][A-Za-z0-9\W_]{5,9}$/
exports.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
exports.dinersRegex = /^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
exports.masterCardRegex = /^(51|52|53|54|55)\d{14}$/
exports.visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/
