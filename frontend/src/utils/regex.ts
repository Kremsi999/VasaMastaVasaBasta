export const passwordRegex = /^[A-Za-z](?=.*[A-Z])(?=(?:.*[a-z]){3})(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,9}$/
export const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const dinersRegex =/^(300|301|302|303)\d{12}$|^(36|38)\d{13}$/
export const masterCardRegex = /^(51|52|53|54|55)\d{14}$/
export const visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/