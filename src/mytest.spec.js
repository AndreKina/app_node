// Grouped tests
// Normally one describe by file
describe("Test example", () => {
  let repository = undefined

  beforeEach(() => {
    repository = null
  })

  it("result of the sum of 2 + 2 must be", () => {
    const a = 2
    const b = 2
    const result = a + b

    expect(result).toEqual(4)
    // expect(result).toHave => Matchers
  })

  it("result of the sum of 3 + 3 must be", () => {
    expect(6).toEqual(3 + 3)
  })
})
