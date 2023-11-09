/**
 * @jest-environment jsdom
 */

const {shuffleArray, CheckAnswers, loadNextQuestion} = require("./battle")

beforeEach(()=>{
    jest.resetAllMocks()
})


// Set the test suite
describe("jest-environment jsdom", () => {
    it("loadNextQuestion", () => {
        // Set up a DOM
        const parser = new DOMParser();
        const dom = parser.parseFromString('<p id="start">Begineth Battle!</p>', 'text/html');

        // Mock the querySelector to return the element from the DOM
        jest.spyOn(document, 'querySelector').mockImplementation(selector => dom.querySelector(selector));

        // Spy on the loadNextQuestion function
        const loadNextQuestionSpy = jest.fn();
        // Mock the function to be used in the event listener
        jest.spyOn(window, 'loadNextQuestion').mockImplementation(loadNextQuestionSpy);

        // Trigger the click event on the startButton
        const startButton = document.querySelector('#start');
        startButton.click();

        // Expectations
        expect(startButton).toBeDefined();
        expect(startButton.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
        expect(loadNextQuestionSpy).toHaveBeenCalled();
    });
});

// describe("jest-environment jsdom", () => {
//     it("should trigger shuffleArray on button click", () => {
//         // Your shuffleArray implementation
//         function shuffleArray(array) {
//             for (let i = array.length - 1; i > 0; i--) {
//                 let j = Math.floor(Math.random() * (i + 1));
//                 let temp = array[i];
//                 array[i] = array[j];
//                 array[j] = temp;
//             }
//             return array;
//         }

//         // Mock DOM environment
//         const html = '<html><body><main><button id="myButton">Click me</button></main></body></html>';
//         document.body.innerHTML = html;

//         // Original array
//         const originalArray = [4,5,6,7,8,9];

//         // Add event listener to the button
//         const button = document.getElementById('myButton');
//         button.addEventListener('click', () => {
//             shuffleArray(originalArray);
//             // Call other functions to display questions or perform other actions
//         });

//         // Simulate a button click
//         button.click();

//         // Retrieve the shuffled array (modify this based on your actual implementation)
//         const shuffledArray = shuffleArray(originalArray);

//         // Expectations
//         expect(shuffledArray).not.toEqual(originalArray);
//         expect(shuffledArray.length).toBe(originalArray.length);
//         expect(shuffledArray).toEqual(expect.arrayContaining(originalArray));
//     });
// });


// const each = require("jest-each").default;
// const { shuffleArray, CheckAnswers } = require("./battle");

// describe("shuffleArray", () => {
    
//     it("Exists", () => {
//         expect(shuffleArray).toBeDefined();
//     })

//     it("Is a function", () => {
//         expect(shuffleArray instanceof Function).toEqual(true);
//     })

//     it('shuffles an array', () => {
//         const originalArray = [1, 2, 3, 4, 5];
//         const shuffledArray = shuffleArray(originalArray);
    
//         // Check if the shuffled array has the same elements
//         expect(shuffledArray).toEqual(expect.arrayContaining(originalArray));
    
//         // Check if the shuffled array is not the same as the original array
//         expect(shuffledArray).not.toEqual(originalArray);
//       });
    
//       it('returns an array of the same length', () => {
//         const originalArray = [1, 2, 3, 4, 5];
//         const shuffledArray = shuffleArray(originalArray);
    
//         expect(shuffledArray.length).toBe(originalArray.length);
//       });
// })

// describe("checkAnswers", () => {
    
//     it("Exists", () => {
//         expect(CheckAnswers).toBeDefined();
//     })

//     it("Is a function", () => {
//         expect(CheckAnswers instanceof Function).toEqual(true);
//     })



// })