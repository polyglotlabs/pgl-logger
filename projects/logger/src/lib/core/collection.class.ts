//NOTE: experimental
export class Collection<T = any> {
    private _value: T[] = [];
    push(value: T): void {
        this._value.push(value);
    }
    indexOf(value: T): number {
        return this._value.indexOf(value);
    }
}
