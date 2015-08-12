import * as Immutable from 'immutable';

import {
} from './models';

export {
};

export interface RecordClass<T extends Immutable.Map<string, void>> {
    new (): T;
    new (values: T): T;
}

export interface RecordCtor<R, T extends Immutable.Map<string, any>> {
    (defaultValues: T | R, name?: string): RecordClass<T>
}

function fromJSDefault(json) {
    if (Array.isArray(json)) {
        return (Immutable.Seq as any).Indexed(json).map(fromJSDefault).toList();
    }
    if (isPlainObj(json)) {
        return (Immutable.Seq as any).Keyed(json).map(fromJSDefault).toMap();
    }
    return json;
}

function isPlainObj(value) {
    return value && (value.constructor === Object || value.constructor === undefined);
}

export let allRecords = {
}
