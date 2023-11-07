const each = require("jest-each").default;
const { shuffleArray, CheckAnswers } = require("./battle");

describe("shuffleArray", () => {
    
    it("Exists", () => {
        expect(shuffleArray).toBeDefined();
    })

    it("Is a function", () => {
        expect(shuffleArray instanceof Function).toEqual(true);
    })

    it('shuffles an array', () => {
        const originalArray = [1, 2, 3, 4, 5];
        const shuffledArray = shuffleArray(originalArray);
    
        // Check if the shuffled array has the same elements
        expect(shuffledArray).toEqual(expect.arrayContaining(originalArray));
    
        // Check if the shuffled array is not the same as the original array
        expect(shuffledArray).not.toEqual(originalArray);
      });
    
      it('returns an array of the same length', () => {
        const originalArray = [1, 2, 3, 4, 5];
        const shuffledArray = shuffleArray(originalArray);
    
        expect(shuffledArray.length).toBe(originalArray.length);
      });
})

describe("checkAnswers", () => {
    
    it("Exists", () => {
        expect(CheckAnswers).toBeDefined();
    })

    it("Is a function", () => {
        expect(CheckAnswers instanceof Function).toEqual(true);
    })



})