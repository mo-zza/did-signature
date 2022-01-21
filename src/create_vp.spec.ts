import {
    blsCreateProof,
    blsSign,
    blsVerify,
    blsVerifyProof,
    generateBls12381G2KeyPair,
} from '@mattrglobal/bbs-signatures';

describe('create vp test', () => {
    // const testData = {
    //     id: 'did:example:489398593#test',
    //     controller: 'did:example:489398593',
    //     privateKeyBase58: '5D6Pa8dSwApdnfg7EZR8WnGfvLDCZPZGsZ5Y1ELL9VDj',
    //     publicKeyBase58:
    //         'oqpWYKaZD9M1Kbe94BVXpr8WTdFBNZyKv48cziTiQUeuhm7sBhCABMyYG4kcMrseC68YTFFgyhiNeBKjzdKk9MiRWuLv5H4FFujQsQK2KTAtzU8qTBiZqBHMmnLF4PL7Ytu',
    // };
    const messageExample_1 = 'message1';
    const messageExample_2 = 'message2';

    const testMessageResult = [
        Uint8Array.from(Buffer.from(messageExample_1, 'utf-8')),
        Uint8Array.from(Buffer.from(messageExample_2, 'utf-8')),
    ];

    test('should be object', async () => {
        const keyPair = await generateBls12381G2KeyPair();
        expect(typeof keyPair).toBe('object');
    });

    test('should be uint 8 array', () => {
        const message = [
            Uint8Array.from(Buffer.from(messageExample_1, 'utf-8')),
            Uint8Array.from(Buffer.from(messageExample_2, 'utf-8')),
        ];
        expect(message).toStrictEqual(testMessageResult);
    });

    test('should type Uint8Array(112)', async () => {
        const keyPair = await generateBls12381G2KeyPair();
        const message = [
            Uint8Array.from(Buffer.from(messageExample_1, 'utf-8')),
            Uint8Array.from(Buffer.from(messageExample_2, 'utf-8')),
        ];
        const sign = await blsSign({
            keyPair,
            messages: message,
        });
    });

    test('should be verified', async () => {
        const keyPair = await generateBls12381G2KeyPair();
        const message = [
            Uint8Array.from(Buffer.from(messageExample_1, 'utf-8')),
            Uint8Array.from(Buffer.from(messageExample_2, 'utf-8')),
        ];
        const signature = await blsSign({
            keyPair,
            messages: message,
        });
        const isVerified = await blsVerify({
            publicKey: keyPair.publicKey,
            messages: message,
            signature,
        });
        const shouldResult = { verified: true, error: undefined };
        expect(isVerified).toEqual(shouldResult);
    });

    test('should be proof', async () => {
        const keyPair = await generateBls12381G2KeyPair();
        const messages = [
            Uint8Array.from(Buffer.from(messageExample_1, 'utf-8')),
            Uint8Array.from(Buffer.from(messageExample_2, 'utf-8')),
        ];
        const signature = await blsSign({
            keyPair,
            messages: messages,
        });
        const proof = await blsCreateProof({
            signature,
            publicKey: keyPair.publicKey,
            messages,
            nonce: Uint8Array.from(Buffer.from('nonce', 'utf8')),
            revealed: [0],
        });
        console.log(proof);

        const isProofVerified = await blsVerifyProof({
            proof,
            publicKey: keyPair.publicKey,
            messages: messages.slice(0, 1),
            nonce: Uint8Array.from(Buffer.from('nonce', 'utf8')),
        });
        console.log(isProofVerified);
        const sholudResult = { verified: true, error: undefined };
        expect(isProofVerified).toEqual(sholudResult);
    });
});
