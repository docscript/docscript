import { generateInline, expect, typeRef } from './utils';
import { CoreType } from '../tools';
import {
    isInterfaceReflection,
    InterfaceReflection,
} from '../ast/interface';

import {
    isCallSignatureReflection,
    isTypeReferenceReflection,
    isMethodSignatureReflection,
    isPropertySignatureReflection,
    isFunctionTypeReflection,
    SignatureReflection
} from '../ast/type';

describe('interface-call', () => {
    let module = generateInline(`
        interface Test<T> {
            <I>(a: I): Test<I>
            method<I>(a: I): Test<I>
            property?: <I>(a: I) => Test<I>
        }
    `);

    let iface = module.items[0];

    if (isInterfaceReflection(iface)) {
        let callSig = iface.members[0];
        if (isCallSignatureReflection(callSig)) {
            it ('call signature reflection', () => {
                testSignature(iface, callSig);
            });
        } else {
            expect(false).to.true;
        }

        let methodSig = iface.members[1];
        if (isMethodSignatureReflection(methodSig)) {
            it ('method signature reflection', () => {
                expect(methodSig.name).equal('method');
                testSignature(iface, methodSig);
            });
        } else {
            expect(false).to.true;
        }

        let propertySig = iface.members[2];
        if (isPropertySignatureReflection(propertySig)) {
            it ('property signature with function type reflection', () => {
                expect(propertySig.name).equal('property');
                expect(propertySig.optional).true;
                let type = propertySig.type;
                if (isFunctionTypeReflection(type)) {
                    testSignature(iface, type.signature);
                } else {
                    expect(false).to.true;
                }
            });
        } else {
            expect(false).to.true;
        }
    } else {
        expect(false).to.true;
    }
});

function testSignature(iface: InterfaceReflection, callSig: SignatureReflection) {
    expect(callSig.typeParameters[0].name).equal('I');
    expect(callSig.typeParameters[0].id).to.ok;
    expect(callSig.parameters[0].name).equal('a');
    expect(typeRef(callSig.parameters[0].type)).equal(callSig.typeParameters[0].id);
    let type = callSig.type;
    if (isTypeReferenceReflection(type)) {
        expect(type.typeName).equal('Test');
        let targetType = type.targetType;
        if (isTypeReferenceReflection(targetType)) {
            expect(targetType.ref).equal(iface.id);
        } else {
            expect(false).to.true;
        }
        expect(typeRef(type.typeArguments[0])).equal(callSig.typeParameters[0].id);
    } else {
        expect(false).to.true;
    }
}
