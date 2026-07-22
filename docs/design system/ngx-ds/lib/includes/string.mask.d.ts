declare class StringMask {
    constructor(pattern: string, options?: any);
    process(value: string): { result: string, valid: boolean };
    apply(value: string): string;
    validate(value: string): boolean;
    static process(value: string, pattern: string, options?: any): { result: string, valid: boolean };
    static apply(value: string, pattern: string, options?: any): string;
    static validate(value: string, pattern: string, options?: any): boolean;
}

export = StringMask;
