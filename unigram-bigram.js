function tokenize(text) {
  if (typeof text !== 'string' || !text.trim()) {
    return { unigrams: [], bigrams: [] };
  }
  const words = text.trim().toLowerCase().split(/\s+/);

  const unigrams = words;
  const bigrams = [];
  const trigrams = [];

  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(`${words[i]} ${words[i + 1]}`);
  }

  for (let i = 0; i < words.length - 2; i++) {
    trigrams.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }

  return { unigrams, bigrams, trigrams };
}

// Example usage
const input = "I love coding in JavaScript";
const { unigrams, bigrams, trigrams } = tokenize(input);

// Expected output:
// Unigrams: [ 'i', 'love', 'coding', 'in', 'javascript' ]
// Bigrams: [ 'i love', 'love coding', 'coding in', 'in javascript' ]
// Trigrams: [ 'i love coding', 'love coding in', 'coding in javascript' ]
console.log("Unigrams:", unigrams);
console.log("Bigrams:", bigrams);
console.log("Trigrams:", trigrams);

function tokenize(text, maxN = 3) {
    if (typeof text !== 'string' || !text.trim()) {
        // Return empty arrays for all n-grams up to maxN
        const result = {};
        for (let n = 1; n <= maxN; n++) {
            result[`${n === 1 ? 'unigrams' : n === 2 ? 'bigrams' : n === 3 ? 'trigrams' : n + 'grams'}`] = [];
        }
        return result;
    }

    const words = text.trim().toLowerCase().split(/\s+/);
    const result = {};

    for (let n = 1; n <= maxN; n++) {
        const ngrams = [];
        for (let i = 0; i <= words.length - n; i++) {
            ngrams.push(words.slice(i, i + n).join(' '));
        }
        let key;
        if (n === 1) key = 'unigrams';
        else if (n === 2) key = 'bigrams';
        else if (n === 3) key = 'trigrams';
        else key = `${n}grams`;
        result[key] = ngrams;
    }

    return result;
}

