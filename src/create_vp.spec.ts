describe('create vp test', () => {
    // const testData = {
    //     id: 'did:example:489398593#test',
    //     controller: 'did:example:489398593',
    //     privateKeyBase58: '5D6Pa8dSwApdnfg7EZR8WnGfvLDCZPZGsZ5Y1ELL9VDj',
    //     publicKeyBase58:
    //         'oqpWYKaZD9M1Kbe94BVXpr8WTdFBNZyKv48cziTiQUeuhm7sBhCABMyYG4kcMrseC68YTFFgyhiNeBKjzdKk9MiRWuLv5H4FFujQsQK2KTAtzU8qTBiZqBHMmnLF4PL7Ytu',
    // };

    const mockKeyPair = {
        secretKey: [
            42, 39, 136, 73, 155, 226, 55, 131, 121, 137, 42, 169, 47, 181, 177,
            17, 54, 119, 21, 204, 130, 146, 0, 161, 207, 215, 88, 53, 245, 86,
            73, 101,
        ],
        publicKey: [
            139, 157, 165, 3, 31, 191, 225, 197, 87, 167, 167, 132, 24, 87, 36,
            61, 50, 132, 80, 87, 82, 29, 100, 71, 202, 45, 189, 18, 133, 209,
            198, 100, 166, 192, 50, 144, 178, 40, 201, 128, 173, 51, 30, 194,
            192, 81, 242, 65, 18, 234, 53, 108, 198, 33, 132, 187, 18, 130, 209,
            250, 199, 180, 21, 15, 146, 164, 89, 131, 240, 144, 55, 49, 17, 123,
            19, 197, 0, 218, 220, 103, 36, 109, 105, 121, 227, 230, 115, 178,
            83, 34, 97, 178, 77, 89, 22, 175,
        ],
    };
    test('should Buffer 2 key pair', async () => {
        jest.mock('@mattrglobal/bbs-signatures', () => ({
            generateBls12381G2KeyPair: () => mockKeyPair,
        }));
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const signaure = require('@mattrglobal/bbs-signatures');
        expect(await signaure.generateBls12381G2KeyPair()).toEqual(mockKeyPair);
    });
});
