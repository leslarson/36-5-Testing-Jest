const {MarkovMachine} = require('./markov');

describe('Markov - Instance methods', function () {
    let mm;
    beforeEach(function() {
        mm = new MarkovMachine("The Cat in The Hat");
    })

    afterEach(function() {
        mm = undefined;
    })

    test('makeChains() method', function() {

        // mm.chains should be a Map object with the following:
        // {'The' => [ 'Cat', 'Hat' ], 'Cat' => [ 'in' ], 'in' => [ 'The' ], 'Hat' => [ null ]}
        expect(mm.chains).toBeInstanceOf(Map);
        expect(mm.chains.has('The')).toEqual(true);
        expect(mm.chains.get('The')).toEqual(['Cat', 'Hat']);
        expect(mm.chains.has('Cat')).toEqual(true);
        expect(mm.chains.get('Cat')).toEqual(['in']);
    })

    test('makeText() method', function() {

        // Make sure that at least one of the words in the original text is in the resulting makeText() text
        words = ("The Cat in The Hat").split(' ');
        testWord = mm.makeText().split(' ')[0];
        expect(words.includes(testWord)).toEqual(true);
    })
})

describe('Markov - Class method', function() {
    
    test('getRandomWord', function() { 
        
        // getRandomWord() should always return a single word from a given array of any length

        // test array with one element
        expect(MarkovMachine.getRandomWord(['is'])).toEqual('is');
        
        // test array with multiple elements
        let multiples = ['one', 'bear', 'is', 'too', 'many'];
        // expect(MarkovMachine.getRandomWord(['one', 'bear', 'is', 'too', 'many'])).toEqual(expect.any(String));
        expect(multiples.includes(MarkovMachine.getRandomWord(multiples))).toEqual(true);
    })
})