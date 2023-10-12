/** Textual markov chain generator */

// I had never heard of a Markov Machine or Markov Chain, so I spent quite a bit of time
// researching that on the web. What an interesting concept.
// I can see how this could be very interesting with a HUGE set of text to build from.

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    // The comments above call them "chains", so I will as well
    let chains = new Map();
    // debugger;
    for (let i = 0; i < this.words.length; i++) {
      let currentWord = this.words[i];

      // if currentWord is the last word, make theNextWord NULL
      let theNextWord = '';
      if (!this.words[i + 1]) {
        theNextWord = null;
      } else {
        theNextWord = this.words[i + 1];
      }

      // if currentWord is already in the Map, then add to its 'value' array
      // else, add currentWord as a new key, and its theNextWord array entry
      if (chains.has(currentWord)) {
        chains.get(currentWord).push(theNextWord);
      } else {
        chains.set(currentWord, [theNextWord]);
      }
    }
    // Tie the chains to this instance
    this.chains = chains;
  }
  
  /** return random text from chains */
  
  makeText(numWords = 100) {
    // Make an array from all chain keys,
    // then append random words until I hit a NULL
    
    // Going to build an array as we 'crawl' the chain.
    // later, we'll join the elements together in a string
    const outputArray = [];

    // Pick a random starting point for the new text
    // from all available keys in the chains Map
    let key = MarkovMachine.getRandomWord(Array.from(this.chains.keys()));
    
    // Add the key to the output array, then randomly pick one of its values as the next key to push
    // Keep doing this until I hit the numWords limit or the NULL
    while (outputArray.length < numWords && key !== null) {
      outputArray.push(key);
      key = MarkovMachine.getRandomWord(this.chains.get(key));
    }
    
    // Join all the elements together and return as a string
    return outputArray.join(" ");
  }
 
  // return a randomly chosen word from either the keys or from the values,
  // depending on which part of the program calls this function
  // I chose to use a static method because this functionality isn't really related to the instantiated
  // instance. I just needed a routine that could return a random "x" from keys/values "y"
  static getRandomWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}

module.exports = {MarkovMachine};