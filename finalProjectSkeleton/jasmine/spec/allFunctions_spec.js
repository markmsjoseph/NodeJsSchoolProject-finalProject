//setup
describe("Hello World", function(){
  it("should return hello world",function(){
    expect(helloWorld()).toEqual('Hello World');
  })
});

//swapping
describe("Swap Elements", function(){
  it("should swap elements",function(){
    expect(randomArray()).toEqual([3,2]);
  })
});

//randomize
describe("Random Elements", function(){
  it("should return a random array",function(){
    expect(randomArrays()).toEqual("something random");
  })
});


describe("mouse clicked on block", function(){
  it("should return a whole number indicating on which block mouse was clicked",function(){
    expect(onCanvasClick()).toEqual(4);
  })
});
